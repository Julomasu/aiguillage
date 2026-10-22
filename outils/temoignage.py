"""Transforme une issue GitHub (formulaire « Témoignage d'étudiant·e ») approuvée en entrée de data/temoignages.json.

Usage : ISSUE_NUMBER=12 ISSUE_BODY="..." python3 outils/temoignage.py
Défense en profondeur : même approuvé par un·e modérateur·rice, le texte est nettoyé (balises, liens, e-mails, numéros)
et rejeté s'il contient des coordonnées. Le site échappe de toute façon tout le texte à l'affichage.
"""
import json, os, re, sys

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FICHIER = os.path.join(RACINE, "data", "temoignages.json")
CHAMPS = {
    "Prénom ou pseudo": ("prenom", 40), "Type de formation": ("type", 30), "Ta formation": ("formation", 90), "Ville": ("ville", 50),
    "Année d'entrée dans la formation": ("annee", 4), "Ton bac": ("bac", 20),
    "Ton témoignage (600 caractères maximum)": ("texte", 600),
    "Ce que j'aurais aimé savoir avant (300 caractères maximum)": ("conseil", 300),
}
TYPES = ["BTS", "BUT", "Licence", "Prépa", "École d'ingé", "École de commerce", "Santé", "Social", "Autre"]
INTERDIT = [re.compile(p, re.I) for p in (r"https?://", r"www\.", r"[\w.+-]+@[\w-]+\.\w+", r"(?:\+?\d[\s.-]?){9,}", r"@\w{3,}")]


def nettoyer(t, maxi):
    t = re.sub(r"<[^>]*>", "", t or "")
    t = re.sub(r"[\x00-\x08\x0b-\x1f]", "", t)
    return re.sub(r"[ \t]+", " ", t).strip()[:maxi]


def lire(corps):
    sections = re.split(r"^### ", corps, flags=re.M)[1:]
    res = {}
    for s in sections:
        titre, _, valeur = s.partition("\n")
        cle = CHAMPS.get(titre.strip())
        if cle:
            v = valeur.strip()
            res[cle[0]] = "" if v == "_No response_" else nettoyer(v, cle[1])
    return res


def main():
    numero, corps = os.environ.get("ISSUE_NUMBER", ""), os.environ.get("ISSUE_BODY", "")
    e = lire(corps)
    manque = [k for k in ("prenom", "type", "formation", "ville", "annee", "bac", "texte") if not e.get(k)]
    if manque:
        sys.exit("Champs manquants : " + ", ".join(manque))
    if e["type"] not in TYPES or not re.fullmatch(r"20\d\d", e["annee"]):
        sys.exit("Type de formation ou année invalide")
    for champ in ("prenom", "texte", "conseil", "formation", "ville"):
        if any(p.search(e.get(champ, "")) for p in INTERDIT):
            sys.exit(f"Coordonnées ou lien détectés dans « {champ} » : à retirer avant publication")
    with open(FICHIER, encoding="utf-8") as f:
        data = json.load(f)
    if any(t.get("issue") == numero for t in data["temoignages"]):
        print("Déjà publié.")
        return
    e["issue"] = numero
    data["temoignages"].append(e)
    with open(FICHIER, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print("Témoignage ajouté.")


if __name__ == "__main__":
    main()
