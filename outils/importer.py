"""Import des données ouvertes officielles -> fichiers JSON légers dans data/.

Sources :
  - Parcoursup 2025 (MESR) : fr-esr-parcoursup, data.enseignementsup-recherche.gouv.fr (Licence Ouverte)
  - ROME 4.0 (France Travail) : arborescence principale, appellations de métiers (Licence Ouverte)
  - Contours des départements : github.com/gregoiredavid/france-geojson (Licence Ouverte, d'après IGN)
  - Carte des loyers 2025 (ANIL / DHUP) : indicateur appartements 1-2 pièces, par commune (Licence Ouverte)

Usage :
  python3 outils/importer.py --telecharger      # télécharge tout puis convertit
  python3 outils/importer.py                    # convertit les fichiers déjà présents dans donnees-brutes/

Le script n'utilise que la bibliothèque standard, sauf openpyxl pour lire le ROME au format .xlsx.
"""
import argparse, csv, glob, io, json, math, os, re, statistics, sys, urllib.request
from collections import defaultdict

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRUT = os.path.join(RACINE, "donnees-brutes")
SORTIE = os.path.join(RACINE, "data")

PSUP_API = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/exports/json"
PSUP_CHAMPS = ["session", "cod_aff_form", "g_ea_lib_vx", "ville_etab", "dep", "fili", "fil_lib_voe_acc", "detail_forma",
               "contrat_etab", "select_form", "g_olocalisation_des_formations", "capa_fin", "voe_tot", "taux_acces_ens",
               "part_acces_gen", "part_acces_tec", "part_acces_pro", "pct_bours"]
ROME_PAGE = "https://www.data.gouv.fr/api/1/datasets/58da857388ee384902e505f5/"
GEOJSON = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson"
LOYERS = "https://static.data.gouv.fr/resources/carte-des-loyers-indicateurs-de-loyers-dannonce-par-commune-en-2025/20251211-144934/pred-app12-mef-dhup.csv"

# Grands domaines du ROME -> lignes d'Aiguillage (les sous-domaines listés à part sont prioritaires)
ROME_LIGNES = {"A": "nature", "B": "art", "C": "commerce", "D": "commerce", "E": "art", "F": "batiment", "G": "tourisme",
               "H": "industrie", "I": "industrie", "J": "sante", "K": "social", "L": "art", "M": "commerce", "N": "commerce"}
ROME_SOUS = {"K17": "droit", "K19": "droit", "K21": "batiment", "K24": "social", "M18": "numerique", "N2": "tourisme",
             "A14": "nature", "E11": "art", "H12": "industrie", "I14": "industrie"}


def telecharger(url, chemin):
    print("  ↓", url)
    req = urllib.request.Request(url, headers={"User-Agent": "aiguillage-import/1.0"})
    with urllib.request.urlopen(req, timeout=300) as r, open(chemin, "wb") as f:
        f.write(r.read())


def ecrire(nom, obj):
    os.makedirs(SORTIE, exist_ok=True)
    chemin = os.path.join(SORTIE, nom)
    with open(chemin, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, separators=(",", ":"))
    print(f"  → data/{nom} ({os.path.getsize(chemin) // 1024} Ko)")


# ——— Parcoursup
def nom_ville(nom):
    """« Paris  6e  Arrondissement » -> « Paris » (idem Lyon, Marseille) ; espaces normalisés."""
    nom = re.sub(r"\s+", " ", nom).strip()
    return re.sub(r"^(Paris|Lyon|Marseille) \d+(er|e)( Arrondissement)?$", r"\1", nom, flags=re.I)


def lire_parcoursup():
    lignes = []
    for f in sorted(glob.glob(os.path.join(BRUT, "psup-*.json"))):
        with open(f, encoding="utf-8") as fh:
            lignes += json.load(fh)
    vus, uniques = set(), []
    for r in lignes:
        if r["cod_aff_form"] not in vus:
            vus.add(r["cod_aff_form"])
            uniques.append(r)
    return uniques


def convertir_parcoursup(rows, session):
    filieres = sorted({r["fili"] for r in rows})
    sortie, villes = [], defaultdict(lambda: [[], [], 0])
    for r in rows:
        geo = r.get("g_olocalisation_des_formations") or {}
        lat, lon = geo.get("lat"), geo.get("lon")
        intitule = (r.get("fil_lib_voe_acc") or "").strip()
        detail = (r.get("detail_forma") or "").strip()
        if detail and detail.lower() not in intitule.lower():
            intitule = f"{intitule} – {detail}" if intitule else detail
        sortie.append([
            int(r["cod_aff_form"]), r.get("g_ea_lib_vx") or "", nom_ville(r.get("ville_etab") or ""), r.get("dep") or "",
            filieres.index(r["fili"]), intitule,
            1 if (r.get("contrat_etab") or "").startswith("Public") else 0,
            1 if r.get("select_form") == "formation sélective" else 0,
            round(lat, 4) if lat is not None else None, round(lon, 4) if lon is not None else None,
            r.get("capa_fin"), r.get("voe_tot"), r.get("taux_acces_ens"),
            r.get("part_acces_gen"), r.get("part_acces_tec"), r.get("part_acces_pro"),
            round(r["pct_bours"]) if r.get("pct_bours") is not None else None,
        ])
        if lat is not None and r.get("ville_etab"):
            v = villes[(nom_ville(r["ville_etab"]), r.get("dep") or "")]
            v[0].append(lat); v[1].append(lon); v[2] += r.get("capa_fin") or 0
    ecrire("parcoursup.json", {
        "source": "Parcoursup, session " + session + " (MESR, Licence Ouverte)",
        "session": session,
        "filieres": filieres,
        "colonnes": ["id", "etab", "ville", "dep", "fili", "intitule", "public", "selective", "lat", "lon",
                     "places", "voeux", "taux", "gen", "tec", "pro", "bours"],
        "lignes": sortie,
    })
    # Médiane plutôt que moyenne : certains établissements ont des sites loin de leur ville de rattachement
    liste_villes = sorted(([nom, dep, round(statistics.median(la), 4), round(statistics.median(lo), 4), len(la), places]
                           for (nom, dep), (la, lo, places) in villes.items()), key=lambda v: -v[5])
    ecrire("villes.json", {"colonnes": ["nom", "dep", "lat", "lon", "formations", "places"], "lignes": liste_villes})

    # Statistiques par filière, pondérées par le nombre de places
    stats = {}
    for i, fili in enumerate(filieres):
        rs = [r for r in rows if r["fili"] == fili]
        places = sum(r.get("capa_fin") or 0 for r in rs)
        pond = lambda cle: round(sum((r.get(cle) or 0) * (r.get("capa_fin") or 0) for r in rs) / places, 1) if places else None
        taux = [r["taux_acces_ens"] for r in rs if r.get("taux_acces_ens") is not None]
        stats[fili] = {"formations": len(rs), "places": places, "voeux": sum(r.get("voe_tot") or 0 for r in rs),
                       "tauxMedian": statistics.median(taux) if taux else None,
                       "partGen": pond("part_acces_gen"), "partTec": pond("part_acces_tec"), "partPro": pond("part_acces_pro"),
                       "boursiers": pond("pct_bours"), "public": sum(1 for r in rs if (r.get("contrat_etab") or "").startswith("Public"))}
    ecrire("parcoursup-stats.json", {"session": session, "filieres": stats})


# ——— ROME
def lire_rome():
    """Renvoie une liste de lignes [lettre, domaine, fiche, libellé, code OGR] depuis le .xlsx ou sa version texte."""
    xlsx = glob.glob(os.path.join(BRUT, "*rome*arbo*.xlsx"))
    if xlsx:
        import openpyxl
        feuille = openpyxl.load_workbook(xlsx[0], read_only=True).worksheets[-1]
        return [[("" if c is None else str(c)).strip() for c in row[:5]] for row in feuille.iter_rows(values_only=True)]
    md = os.path.join(BRUT, "rome-arbo.md")
    with open(md, encoding="utf-8") as f:
        return [[c.strip() for c in l.strip().strip("|").split("|")][:5] for l in f if l.startswith("| ")]


def convertir_rome(rows):
    domaines, fiches, appellations, vus = {}, {}, [], set()
    for lettre, dom, fic, libelle, ogr in (r + [""] * (5 - len(r)) for r in rows):
        if not re.fullmatch(r"[A-N]", lettre or ""):
            continue
        if not dom:
            domaines[lettre] = libelle
            continue
        if not fic:
            domaines[lettre + dom] = libelle
            continue
        code = f"{lettre}{dom}{fic}"
        ligne = ROME_SOUS.get(lettre + dom) or ROME_SOUS.get(lettre + dom[0]) or ROME_LIGNES[lettre]
        if code not in fiches:
            fiches[code] = [libelle, ligne, lettre + dom]
        cle = (libelle.lower(), code)
        if cle not in vus:
            vus.add(cle)
            appellations.append([libelle, code])
    ecrire("rome.json", {"source": "ROME 4.0, France Travail (Licence Ouverte)", "domaines": domaines,
                         "fiches": fiches, "appellations": appellations})


# ——— Contours des départements (projection simple, simplification Douglas-Peucker)
def simplifier_anneau(points, eps):
    """Un anneau est fermé : on le coupe en deux pour que Douglas-Peucker ait deux extrémités distinctes."""
    milieu = len(points) // 2
    return rdp(points[:milieu + 1], eps)[:-1] + rdp(points[milieu:], eps)


def rdp(points, eps):
    if len(points) < 3:
        return points
    (x1, y1), (x2, y2) = points[0], points[-1]
    dmax, idx = 0, 0
    for i in range(1, len(points) - 1):
        x0, y0 = points[i]
        num = abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1)
        den = math.hypot(y2 - y1, x2 - x1) or 1e-9
        if num / den > dmax:
            dmax, idx = num / den, i
    if dmax > eps:
        return rdp(points[:idx + 1], eps)[:-1] + rdp(points[idx:], eps)
    return [points[0], points[-1]]


def convertir_contours():
    with open(os.path.join(BRUT, "departements.geojson"), encoding="utf-8") as f:
        geo = json.load(f)
    deps = []
    for feat in geo["features"]:
        g = feat["geometry"]
        polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
        anneaux = []
        for poly in polys:
            pts = simplifier_anneau([(round(x, 3), round(y, 3)) for x, y in poly[0]], 0.01)
            if len(pts) >= 4:
                anneaux.append([v for p in pts for v in p])
        deps.append([feat["properties"]["code"], feat["properties"]["nom"], anneaux])
    ecrire("france.json", {"source": "france-geojson (d'après IGN, Licence Ouverte)", "departements": deps})


# ——— Loyers
def convertir_loyers():
    """Fichier national complet si présent, sinon l'extrait des villes étudiantes (API tabulaire de data.gouv)."""
    chemin = os.path.join(BRUT, "loyers-app12.csv")
    extrait = os.path.join(BRUT, "loyers-villes.json")
    if os.path.exists(chemin):
        with open(chemin, "rb") as f:
            brut = f.read()
        try:
            texte = brut.decode("utf-8-sig")
        except UnicodeDecodeError:
            texte = brut.decode("latin-1")
        separateur = csv.Sniffer().sniff(texte[:5000], delimiters=";,").delimiter
        lignes = list(csv.DictReader(io.StringIO(texte), delimiter=separateur))
    elif os.path.exists(extrait):
        with open(extrait, encoding="utf-8") as f:
            lignes = json.load(f)
    else:
        print("  (loyers : aucun fichier, étape ignorée)")
        return
    # Les arrondissements de Paris, Lyon et Marseille sont regroupés (moyenne) sous le nom de la ville
    groupes = defaultdict(list)
    for r in lignes:
        try:
            m2 = float(str(r["loypredm2"]).replace(",", "."))
        except (KeyError, ValueError):
            continue
        groupes[(nom_ville(r["LIBGEO"]), r["DEP"])].append(m2)
    sortie = [[nom, dep, round(sum(v) / len(v), 2)] for (nom, dep), v in sorted(groupes.items())]
    ecrire("loyers.json", {"source": "Carte des loyers 2025, ANIL / DHUP (Licence Ouverte) : loyer d'annonce charges comprises, appartements 1-2 pièces",
                           "colonnes": ["nom", "dep", "eurosM2"], "lignes": sortie})


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--telecharger", action="store_true", help="télécharger les sources officielles avant conversion")
    args = ap.parse_args()
    os.makedirs(BRUT, exist_ok=True)

    if args.telecharger:
        print("Téléchargement…")
        for f in glob.glob(os.path.join(BRUT, "psup-*.json")):
            os.remove(f)
        telecharger(PSUP_API + "?select=" + ",".join(PSUP_CHAMPS), os.path.join(BRUT, "psup-tout.json"))
        telecharger(GEOJSON, os.path.join(BRUT, "departements.geojson"))
        telecharger(LOYERS, os.path.join(BRUT, "loyers-app12.csv"))
        with urllib.request.urlopen(ROME_PAGE, timeout=60) as r:
            ressources = json.load(r)["resources"]
        xlsx = next(x["url"] for x in ressources if x["url"].endswith(".xlsx") and "arbo" in x["url"].lower())
        telecharger(xlsx, os.path.join(BRUT, "rome-arboprincipale.xlsx"))

    print("Conversion…")
    rows = lire_parcoursup()
    if not rows:
        sys.exit("Aucun fichier psup-*.json dans donnees-brutes/. Lance avec --telecharger.")
    session = str(rows[0].get("session") or "2025")
    convertir_parcoursup(rows, session)
    convertir_rome(lire_rome())
    convertir_contours()
    convertir_loyers()
    print("Terminé.")


if __name__ == "__main__":
    main()
