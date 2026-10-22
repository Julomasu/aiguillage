"""Construit data/ecoles.json : l'annuaire des établissements d'enseignement supérieur.

Sources, de la plus officielle à la plus rédigée :
  1. data/parcoursup.json            tous les établissements de Parcoursup (hors lycées), regroupés par campus
  2. outils/sources/cti-2025-12.json écoles d'ingénieurs accréditées CTI (Légifrance), y compris celles hors Parcoursup
  3. outils/ecoles_complement.txt    écoles hors Parcoursup ou à enrichir (sigle, reconnaissance, formations), écrit à la main

Un établissement présent dans Parcoursup est marqué « psup ». Tous les autres sont « hors Parcoursup ».
Usage : python3 outils/ecoles.py          (écrit data/ecoles.json, affiche un bilan)
"""
import collections, json, math, os, re, sys, unicodedata

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def norm(s):
    s = unicodedata.normalize("NFD", str(s).lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]+", " ", s).strip()


def slug(s):
    return norm(s).replace(" ", "-")[:60]


MOTS_VIDES = set("de du des la le les l d et en au aux a pour sur ecole ecoles institut national nationale superieure superieur universite universitaire sciences ingenieur ingenieurs ingenierie technologie technologies systemes polytechnique polytechnic ensemble formation".split())

# ——— 1. Parcoursup
ps = json.load(open(os.path.join(RACINE, "data", "parcoursup.json"), encoding="utf-8"))
COL = ps["colonnes"]
lignes = [dict(zip(COL, r)) for r in ps["lignes"]]
for r in lignes:
    r["fili"] = ps["filieres"][r["fili"]]

# coordonnées moyennes par ville (pour placer les écoles qui ne sont pas dans Parcoursup)
acc = collections.defaultdict(list)
for r in lignes:
    if r["lat"] is not None:
        acc[norm(r["ville"])].append((r["lat"], r["lon"], r["dep"]))
VILLES = {}
for k, v in acc.items():
    la = sorted(x[0] for x in v)[len(v) // 2]
    lo = sorted(x[1] for x in v)[len(v) // 2]
    VILLES[k] = (la, lo, collections.Counter(x[2] for x in v).most_common(1)[0][0])
vj = json.load(open(os.path.join(RACINE, "data", "villes.json"), encoding="utf-8"))
for nom, dep, la, lo, *_ in vj["lignes"]:
    VILLES.setdefault(norm(nom), (la, lo, dep))
# Villes courantes absentes des données Parcoursup
VILLES.update({norm(k): v for k, v in {
    "Jouy-en-Josas": (48.7575, 2.1706, "78"), "Écully": (45.7747, 4.7708, "69"), "Guyancourt": (48.7747, 2.0743, "78"), "Marcy-l'Étoile": (45.7833, 4.7167, "69"),
    "Saint-Étienne-du-Rouvray": (49.3786, 1.1044, "76"), "Cergy": (49.0366, 2.0763, "95"), "Gif-sur-Yvette": (48.6969, 2.1344, "91"), "Palaiseau": (48.7143, 2.2467, "91"),
    "Champs-sur-Marne": (48.8409, 2.5846, "77"), "Villeneuve-d'Ascq": (50.6217, 3.1431, "59"), "Sophia Antipolis": (43.6162, 7.0553, "06"), "Maisons-Alfort": (48.8117, 2.4389, "94"),
    "Neuilly-sur-Seine": (48.8848, 2.2685, "92"), "Bry-sur-Marne": (48.8417, 2.5233, "94"), "Cannes-Écluse": (48.3633, 2.9133, "77"), "Guer": (47.9, -2.1167, "56"),
    "Salon-de-Provence": (43.64, 5.0972, "13"), "Courbevoie": (48.8966, 2.2564, "92"), "Paris-La Défense": (48.8918, 2.2386, "92"), "Le Kremlin-Bicêtre": (48.8133, 2.3594, "94"),
    "Ivry-sur-Seine": (48.8145, 2.3869, "94"), "Villejuif": (48.7892, 2.3636, "94"), "Issy-les-Moulineaux": (48.8245, 2.2735, "92"), "Noisy-le-Grand": (48.8431, 2.5517, "93"),
    "Évry-Courcouronnes": (48.6286, 2.4417, "91"), "Saint-Gratien": (48.9728, 2.2858, "95"), "Meudon": (48.8138, 2.2354, "92"), "Sèvres": (48.8228, 2.2108, "92"),
    "Enghien-les-Bains": (48.9708, 2.3067, "95"), "Élancourt": (48.7833, 1.9667, "78"), "Orly": (48.7431, 2.4001, "94"), "Cachan": (48.7922, 2.3319, "94"),
    "Muret": (43.4606, 1.3267, "31"), "Saint-Yan": (46.4153, 4.0222, "71"), "Marne-la-Vallée": (48.8412, 2.5886, "77"), "Pessac": (44.8061, -0.6311, "33"),
    "Talence": (44.8085, -0.5889, "33"), "Villeurbanne": (45.7667, 4.8803, "69"), "Vaulx-en-Velin": (45.7773, 4.9185, "69"), "Saint-Denis": (48.9362, 2.3574, "93"),
    "Roubaix": (50.6942, 3.1746, "59"), "Tourcoing": (50.7239, 3.1612, "59"), "Gardanne": (43.4547, 5.4692, "13"), "Aubière": (45.7467, 3.1111, "63"),
}.items()})


def ville_connue(nom):
    k = norm(nom)
    if k in VILLES:
        return VILLES[k]
    k2 = norm(re.sub(r"\s+\d+(e|er)?$", "", nom))  # Paris 15e → Paris
    return VILLES.get(k2)


KNOWN = set(VILLES)
RE_LYCEE = re.compile(r"^(lycee|lp |lpo |lgt |cite scolaire|ensemble scolaire|institution |college |groupe scolaire|campus des metiers|etablissement regional|epl |eplefpa|maison familiale|mfr|mfreo|ecole regionale du premier degre|greta|cfa |centre de formation d apprentis)")


def base_etab(nom):
    """Regroupe les campus : « IESEG School of Management - Lille » → « IESEG School of Management »."""
    n = nom.strip()
    parts = re.split(r"\s+[-–—]\s+", n)
    if len(parts) > 1:
        tail = norm(parts[-1])
        if re.match(r"^(campus|site|cite|pole|antenne|centre de|ecole de|ville)", tail) or tail in KNOWN or any(tail.startswith(v + " ") for v in KNOWN if len(v) > 4 and tail.startswith(v[0])):
            return " - ".join(parts[:-1]).strip()
    return n


REGLES_CAT = [
    ("sante", r"infirm|paramedic|kinesith|ergotherap|orthophon|orthoptis|podolog|psychomot|sage femme|maieut|manipulateur|radiolog|ostéo|osteo|pharmac|dentaire|odontolog|medecin|veterinaire|sante|opticien|audioproth|dieteti|ambulanc|aide soignant|puericultur"),
    ("architecture", r"architect|paysag"),
    ("media", r"journalis|communication|audiovisuel|cinema|photograph|multimedia|information|image|son\b|radio|television|edition"),
    ("numerique", r"informatique|numerique|cyber|data|jeu video|developpeur|reseau|digital|web\b|intelligence artificielle"),
    ("art-design", r"design|art\b|arts\b|graphi|animation|mode\b|stylisme|textile|luxe|decor|metiers d art|creation|dn made|illustration|bande dessinee"),
    ("hotellerie", r"hotel|tourisme|restauration|cuisine|gastronom|patisser|boulanger|sommelier|voyage"),
    ("social-sport", r"sport|staps|jeunesse|animation socio|educateur|assistant de service social|travail social|social|carrieres sociales|petite enfance|moniteur"),
    ("sciences-po", r"science politique|sciences po|institut d etudes politiques|iep\b"),
    ("droit", r"droit|juridique|notari|avocat|justice"),
    ("agro", r"agri|agro|agronom|viticult|horticult|environnement|foret|nature|eau\b"),
    ("aero-maritime", r"aeronaut|aviation|maritime|navigation|nautique|marine|pilote|aerien"),
    ("service-public", r"police|gendarm|pompier|defense|militaire|douane|penitentiaire|fonction publique|service public"),
    ("commerce", r"commerce|gestion|management|marketing|vente|business|comptab|banque|assurance|finance|negociation|logistique|transport|immobilier"),
    ("ingenieur", r"ingenieur|ingenierie|polytech|genie"),
]
FILI_CAT = {"Ecole de Commerce": "commerce", "Ecole d'Ingénieur": "ingenieur", "IFSI": "sante", "PASS": "sante", "Licence_Las": "sante", "EFTS": "social-sport"}


def classer(nom, formations):
    n = norm(nom)
    cnt = collections.Counter()
    for f in formations:
        if f["fili"] in FILI_CAT:
            cnt[FILI_CAT[f["fili"]]] += 2
        t = norm(f["intitule"])
        for cat, rx in REGLES_CAT:
            if re.search(r"\b(?:" + rx + r")", t):
                cnt[cat] += 1
                break
    for cat, rx in REGLES_CAT:
        if re.search(r"\b(?:" + rx + r")", n):
            cnt[cat] += 2
            break
    if re.match(r"^(universite|iut|ufr|faculte|institut universitaire|institut catholique|ucly|ucl )", n) or re.search(r"\buniversite\b", n):
        cnt["universite"] += 3
    if not cnt:
        return ["autre"]
    top = [c for c, _ in cnt.most_common(2)]
    if len(top) == 2 and cnt[top[1]] < cnt[top[0]] * 0.5:
        top = top[:1]
    return top


def propre(intitule):
    """Raccourcit l'intitulé Parcoursup : « Formation des écoles de commerce … Bac + 5 – Programme Grande École » → « Programme Grande École (Bac+5) »."""
    parts = [p.strip() for p in re.split(r"\s+[–—]\s+", intitule)]
    niveau = ""
    m = re.search(r"Bac\s*\+\s*(\d)", intitule)
    if m:
        niveau = f"Bac+{m.group(1)}"
    lab = parts[-1] if len(parts) > 1 else intitule
    lab = re.sub(r"^(Spécialité|Parcours|Option)\s*:\s*", "", lab).strip()
    lab = re.sub(r"\s+", " ", lab)
    if re.match(r"^(\(en \d|bac |cursus|formation en|double diplome)", norm(lab)) and len(parts) > 1:
        tete = re.sub(r"Formation (des |d'|de |du )?(écoles? )?(de commerce et de management|d'ingénieur|d'ingénieurs|ingénieur)?\s*", "", parts[0], flags=re.I).strip()
        tete = re.sub(r"Bac\s*\+\s*\d", "", tete).strip(" -")
        if "ingénieur" in parts[0].lower() and not tete:
            tete = "Cycle ingénieur"
        if tete and tete.lower() not in lab.lower():
            lab = f"{tete} · {lab}"
    return (f"{lab} ({niveau})" if niveau and niveau not in lab else lab)[:110]


# alias du complément : un lycée cité dans le complément (École Estienne, École Boulle…) est gardé même sans prépa
ALIAS_COMPLEMENT = set()
for _ln in open(os.path.join(RACINE, "outils", "ecoles_complement.txt"), encoding="utf-8"):
    _c = [x.strip() for x in _ln.split("|")]
    if len(_c) == 9 and not _ln.startswith("#"):
        ALIAS_COMPLEMENT.update(norm(a) for a in _c[8].split(";") if len(norm(a)) > 6)
RE_PREPA = re.compile(r"\bcpge\b|classe prepa|dn made|\bdsaa\b|\bdma\b|\bdcg\b|\bdscg\b|metiers d art|prepa")
groupes = collections.OrderedDict()
lycees_gardes = set()
for r in lignes:
    b = base_etab(r["etab"])
    if RE_LYCEE.match(norm(b)):
        # on garde les lycées qui hébergent une prépa, un DN MADE, un DCG… (Louis-le-Grand, École Boulle…) ; les autres lycées sont sur la carte
        if r["fili"] != "CPGE" and not RE_PREPA.search(norm(r["intitule"])) and not any(a in " " + norm(b) + " " for a in (" " + x + " " for x in ALIAS_COMPLEMENT)):
            continue
        lycees_gardes.add(norm(b))
    groupes.setdefault(norm(b), {"noms": collections.Counter(), "rows": []})
    groupes[norm(b)]["noms"][b] += 1
    groupes[norm(b)]["rows"].append(r)

ENT = []   # entités
for k, g in groupes.items():
    rows = g["rows"]
    nom = g["noms"].most_common(1)[0][0]
    pub = sum(1 for r in rows if r["public"]) >= len(rows) / 2
    villes = collections.OrderedDict()
    for r in rows:
        if r["lat"] is not None and r["ville"] not in villes:
            villes[r["ville"]] = [re.sub(r"\s*\d{4,}$", "", r["ville"]).title() if r["ville"].isupper() or re.search(r"\d", r["ville"]) else r["ville"], r["dep"], round(r["lat"], 4), round(r["lon"], 4)]
        elif r["ville"] not in villes:
            villes[r["ville"]] = [r["ville"], r["dep"], None, None]
    progs = collections.OrderedDict()
    tous_ids = [r["id"] for r in rows]
    for r in rows:
        lab = propre(r["intitule"])
        p = progs.setdefault((lab, r["fili"]), {"n": lab, "f": r["fili"], "pl": 0, "id": r["id"], "t": r["taux"], "ids": []})
        p["pl"] += r["places"] or 0
        p["ids"].append(r["id"])
    cats = ["lycee"] if k in lycees_gardes else classer(nom, rows)
    ENT.append({
        "nom": nom, "sigle": "", "alias": set(), "cat": cats, "statut": "public" if pub else "prive",
        "villes": list(villes.values()), "acces": set(["psup"]), "reco": [], "formations": [], "psup": True,
        "ps_formations": [{"n": p["n"], "f": p["f"], "pl": p["pl"], "id": p["id"], "t": p["t"], "k": len(p["ids"])} for p in progs.values()],
        "ps_n": len(rows), "ps_places": sum(r["places"] or 0 for r in rows), "norm": k, "ps_ids": tous_ids,
    })
print(f"Parcoursup : {len(ENT)} établissements hors lycées ({sum(e['ps_n'] for e in ENT)} formations)")

# ——— 3. Complément écrit à la main
STATUTS = {"public", "prive", "consulaire", "associatif"}
complement = []
for ln in open(os.path.join(RACINE, "outils", "ecoles_complement.txt"), encoding="utf-8"):
    ln = ln.strip()
    if not ln or ln.startswith("#"):
        continue
    c = [x.strip() for x in ln.split("|")]
    if len(c) != 9 or c[3] not in STATUTS:
        print("Ligne ignorée :", ln[:80])
        continue
    nom, sigle, cats, statut, villes, acces, reco, formations, alias = c
    complement.append({
        "nom": nom, "sigle": sigle, "cat": [x.strip() for x in cats.split(",")], "statut": statut,
        "villes": [x.strip() for x in villes.split(",") if x.strip()], "acces": set(x.strip() for x in acces.split(",") if x.strip()),
        "reco": [x.strip() for x in reco.split(";") if x.strip()], "formations": [x.strip() for x in formations.split(";") if x.strip()],
        "alias": [a.strip() for a in alias.split(";") if a.strip()],
    })
print(f"Complément : {len(complement)} établissements")


def correspond(alias, e):
    a = " " + norm(alias) + " "
    return len(a) > 4 and a in " " + e["norm"] + " "


# les alias les plus longs d'abord : « unilasalle rouen » avant « unilasalle »
ordre = sorted(range(len(complement)), key=lambda i: -max([len(a) for a in complement[i]["alias"]] + [0]))
utilises = set()
fusions = 0
nouveaux = []
manquants_psup = []
for i in ordre:
    c = complement[i]
    trouves = [j for j, e in enumerate(ENT) if j not in utilises and e["psup"] and any(correspond(a, e) for a in c["alias"])]
    ville_objs = []
    for v in c["villes"]:
        info = ville_connue(v)
        ville_objs.append([v, info[2] if info else None, round(info[0], 4) if info else None, round(info[1], 4) if info else None])
    if trouves:
        fusions += 1
        base = ENT[trouves[0]]
        for j in trouves:
            utilises.add(j)
        vs = collections.OrderedDict()
        for j in trouves:
            for v in ENT[j]["villes"]:
                vs.setdefault(norm(v[0]), v)
        for v in ville_objs:
            vs.setdefault(norm(v[0]), v)
        e = {
            "nom": c["nom"], "sigle": c["sigle"], "alias": set(c["alias"]), "cat": c["cat"], "statut": c["statut"], "villes": list(vs.values()),
            "acces": (c["acces"] - {"psup"}) | {"psup"}, "reco": c["reco"], "formations": c["formations"], "psup": True,
            "ps_formations": [p for j in trouves for p in ENT[j]["ps_formations"]], "ps_n": sum(ENT[j]["ps_n"] for j in trouves),
            "ps_places": sum(ENT[j]["ps_places"] for j in trouves), "norm": norm(c["nom"]), "ps_ids": [i for j in trouves for i in ENT[j]["ps_ids"]],
        }
        nouveaux.append(e)
    else:
        if "psup" in c["acces"]:
            manquants_psup.append(c["nom"])
        nouveaux.append({
            "nom": c["nom"], "sigle": c["sigle"], "alias": set(c["alias"]), "cat": c["cat"], "statut": c["statut"], "villes": ville_objs,
            "acces": c["acces"] - {"psup"}, "reco": c["reco"], "formations": c["formations"], "psup": False,
            "ps_formations": [], "ps_n": 0, "ps_places": 0, "norm": norm(c["nom"]),
        })
ENT = [e for j, e in enumerate(ENT) if j not in utilises] + nouveaux
print(f"Fusions avec Parcoursup : {fusions} ; hors Parcoursup (complément) : {sum(1 for e in nouveaux if not e['psup'])}")
print("Annoncés « Parcoursup » dans le complément mais introuvables dans Parcoursup (à vérifier) :", len(manquants_psup))
for m in manquants_psup:
    print("   -", m)

# ——— 2. CTI (écoles d'ingénieurs)
cti = json.load(open(os.path.join(RACINE, "outils", "sources", "cti-2025-12.json"), encoding="utf-8"))


def jetons(s):
    return {t for t in norm(s).split() if t not in MOTS_VIDES and t not in KNOWN and len(t) > 2}


def acronyme(s):
    return "".join(w[0] for w in norm(s).split() if w not in {"de", "du", "des", "la", "le", "les", "l", "d", "et", "en"})


ajoutes = 0
fusionnes = 0
for s in cti:
    noms = [n for n in s["noms"] if n]
    if not noms:
        continue
    if re.match(r"^(\\|-|–|le décret|décret|siège|point courrier|formations?\b|\.)", noms[0].strip().lower()) or any(("décret" in n.lower() or "créée" in n.lower() or n.lstrip().startswith(("\\", "-", "–"))) for n in noms) or (not s["titres"] and not s["specialisation"]):
        continue
    ecole = re.sub(r"\s+-\s+(Campus|Site|Bâtiment|B\.?P).*$", "", noms[-1])
    parent = noms[0] if len(noms) > 1 else ""
    ville = s["ville"]
    if not ville:
        for n in noms + s.get("sites", []):
            for k in KNOWN:
                if len(k) > 4 and (" " + k + " ") in (" " + norm(n) + " "):
                    ville = next((v[0] for e in ENT for v in e["villes"] if norm(v[0]) == k), k.title())
                    break
            if ville:
                break
    tj = jetons(ecole) | jetons(parent)
    ac = acronyme(ecole)
    cible = None
    for e in ENT:
        if "ingenieur" not in e["cat"] and "agro" not in e["cat"]:
            continue
        ej = jetons(e["nom"]) | set(norm(x) for x in e["alias"]) | {norm(e["sigle"])}
        villes_e = {norm(v[0]) for v in e["villes"]}
        commun = tj & (jetons(e["nom"]) | {norm(x) for x in e["alias"] if " " not in norm(x)})
        if (tj & {norm(x) for x in e["alias"] if " " not in norm(x) and len(norm(x)) >= 4}) or (len(commun) >= 2 and (not ville or norm(ville) in villes_e or len(commun) >= 3)) or (commun and ville and norm(ville) in villes_e and any(len(t) >= 5 for t in commun)) or (ac and len(ac) >= 3 and ac in ej) or any(norm(a) in (norm(ecole), norm(parent)) or (len(norm(a)) > 25 and norm(ecole).startswith(norm(a) + " ")) for a in e["alias"]):
            cible = e
            break
    titres = s["titres"]
    if cible is not None:
        fusionnes += 1
        cible.setdefault("cti", {"specialites": set(), "voies": set()})
        cible["cti"]["specialites"].update(t for t in titres if t != "généraliste")
        cible["cti"]["voies"].update(s["voies"])
        if "Diplôme d'ingénieur (CTI)" not in cible["reco"] and not any("CTI" in r for r in cible["reco"]):
            cible["reco"].append("Diplôme d'ingénieur (CTI)")
        if ville and norm(ville) not in {norm(v[0]) for v in cible["villes"]}:
            info = ville_connue(ville)
            cible["villes"].append([ville, info[2] if info else None, round(info[0], 4) if info else None, round(info[1], 4) if info else None])
        continue
    info = ville_connue(ville) if ville else None
    statut = {"Public": "public", "Privé": "prive", "Consulaire": "consulaire"}.get(s["statut"], "prive")
    nom = ecole if not parent or norm(ecole).startswith(norm(parent).split()[0]) else f"{ecole} ({parent})" if len(ecole) < 45 else ecole
    ENT.append({
        "nom": nom, "sigle": "", "alias": set(), "cat": ["ingenieur"], "statut": statut,
        "villes": [[ville, info[2] if info else None, round(info[0], 4) if info else None, round(info[1], 4) if info else None]] if ville else [],
        "acces": set(["concours"]) if not s["specialisation"] else set(), "reco": ["Diplôme d'ingénieur (CTI)"] if not s["specialisation"] else ["École de spécialisation (CTI)"],
        "formations": [], "psup": False, "ps_formations": [], "ps_n": 0, "ps_places": 0, "norm": norm(nom),
        "cti": {"specialites": set(t for t in titres if t != "généraliste"), "voies": set(s["voies"]), "tutelle": parent},
    })
    ajoutes += 1
print(f"CTI : {fusionnes} entrées fusionnées dans des écoles existantes, {ajoutes} écoles ajoutées")

# ——— Sortie
ids = set()
sortie = []
for e in sorted(ENT, key=lambda e: (-e["ps_n"], norm(e["nom"]))):
    i = slug(e["nom"])
    n = 2
    base_id = i
    while i in ids:
        i = f"{base_id}-{n}"
        n += 1
    ids.add(i)
    o = {"id": i, "n": e["nom"], "c": e["cat"], "st": e["statut"], "v": e["villes"], "a": sorted(e["acces"] | ({"psup"} if e["psup"] else set())), "ps": e["psup"]}
    if e["sigle"]:
        o["s"] = e["sigle"]
    if e["alias"]:
        o["al"] = sorted(e["alias"])
    if e["reco"]:
        o["r"] = e["reco"]
    if e["formations"]:
        o["f"] = e["formations"]
    if e["ps_formations"]:
        o["pf"] = [[p["n"], p["f"], p["pl"], p["t"], p["id"]] for p in sorted(e["ps_formations"], key=lambda p: -p["pl"])[:30]]
        o["pi"] = e["ps_ids"]
        o["pn"] = e["ps_n"]
        o["pp"] = e["ps_places"]
    if e.get("cti"):
        o["cti"] = {"sp": sorted(e["cti"]["specialites"])[:25], "voies": sorted(e["cti"]["voies"])}
    sortie.append(o)

out = {"source": "Parcoursup 2025 (MESR), CTI (Légifrance, arrêté du 11 décembre 2025), liste complétée à la main (outils/ecoles_complement.txt)", "ecoles": sortie}
chemin = os.path.join(RACINE, "data", "ecoles.json")
json.dump(out, open(chemin, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
print(f"{len(sortie)} établissements écrits dans data/ecoles.json ({os.path.getsize(chemin) // 1024} Ko)")
hors = [o for o in sortie if not o["ps"]]
print(f"dont hors Parcoursup : {len(hors)}")
cc = collections.Counter(c for o in sortie for c in o["c"])
print("catégories :", dict(cc.most_common()))
sans_coord = [o["n"] for o in sortie if not any(v[2] for v in o["v"])]
print(f"sans coordonnées : {len(sans_coord)}", sans_coord[:15])
