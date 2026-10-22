"""Extrait la liste des écoles accréditées CTI (arrêté du 11 décembre 2025, Légifrance JORFTEXT000053388481) depuis la page enregistrée en JSON {"markdown": ...}.
Usage : python3 outils/cti_legifrance.py page.json  →  écrit src/cti_ecoles.json (à copier dans outils/sources/). Données : Légifrance, Licence Ouverte."""
import json,re,collections,sys
src=sys.argv[1] if len(sys.argv)>1 else 'src/cti2025.json'
md=json.load(open(src))['markdown']
i=md.find('Tableau 1'); j=md.find('Tableau 2', i+10)
seg=md[i:j]
rows=[l.strip() for l in seg.split('\n') if l.strip().startswith('|')]
ADDR=re.compile(r"^(\d|B\.?P\.?|CS\b|TSA|Campus|Domaine|Technop|Parc|Cité|Immeuble|Site|Espace|Bâtiment|Bât|Rue|Avenue|Boulevard|Place|Quai|Route|Chemin|Allée|Pôle|Zone|ZI|Hôtel|Rond|Impasse|Esplanade|Cours|Mail|Lieu|Villa|Quartier|Hameau|Faculté|Cedex|Chez|Voie|Pavillon|Tour|ZAC|Z\.A|Maison)",re.I)
def clean(t):
    t=re.sub(r"\[([^\]]*)\]\([^)]*\)",r"\1",t); t=t.replace('\\*','').replace('*','')
    return re.sub(r"\s+"," ",t).strip()
schools=[]; cur=None; region=None; acad=None
for r in rows:
    cells=[c.strip() for c in r.strip('|').split('|')]
    if len(cells)<7: 
        c0=cells[0] if cells else ''
        if re.match(r"Région académique",c0): region=c0.replace('Région académique','').strip()
        elif re.match(r"Académie",c0): acad=re.sub(r"^Académie (de |d')",'',c0).strip()
        continue
    c0=cells[0]
    if re.match(r"Région académique",c0): region=c0.replace('Région académique','').strip(); continue
    if re.match(r"Académie",c0): acad=re.sub(r"^Académie (de |d')",'',c0).strip(); continue
    if c0.startswith(('A compter','---','Etablissement','Établissement')): continue
    lines=[clean(x) for x in c0.split('<br>')]; lines=[x for x in lines if x]
    if lines and re.match(r"^\\?[-–] ?sites? ",lines[0]):
        if cur is not None: cur['sites'].append(re.sub(r"^\\?[-–] ?",'',lines[0]))
    elif lines:
        name=[]; k=0
        while k<len(lines) and not ADDR.match(lines[k]) and not lines[k].startswith('(') and 'Décret' not in lines[k] and not re.search(r"\d{5}",lines[k]) and len(name)<2:
            name.append(lines[k]); k+=1
        addr=lines[k:]; m=None
        for x in addr+lines:
            m=re.search(r"(\d{5})\s+([A-ZÉÈÊÀÂÎÔÛÇa-zéèêàâîôûçëï' \-]+?)(?:\s+(?:Cedex|CEDEX)\s*\d*)?$",x)
            if m: break
        st_raw=cells[1]; st='Privé' if 'Privé' in st_raw else 'Consulaire' if 'Consulaire' in st_raw else 'Public'
        cur={'noms':name,'cp':m.group(1) if m else None,'ville':m.group(2).strip().title() if m else None,'statut':st,'region':region,'academie':acad,
             'titres':[],'voies':set(),'sites':[],'specialisation':'école de spécialisation' in c0}
        schools.append(cur)
    if cur is None: continue
    titre=clean(cells[2]); voie=clean(cells[3])
    if titre:
        mm=re.search(r"spécialité ([^(]+?)(?:\s*\(|$)",titre)
        cur['titres'].append(mm.group(1).strip() if mm else 'généraliste')
    if voie:
        cur['voies'].add('apprentissage' if 'apprenti' in voie else 'étudiant' if 'étudiant' in voie else 'continue' if 'continue' in voie else voie)
for s in schools: s['voies']=sorted(s['voies']); s['titres']=sorted(set(s['titres']))
json.dump(schools,open('src/cti_ecoles.json','w'),ensure_ascii=False,indent=0)
print(len(schools), collections.Counter(s['statut'] for s in schools), 'sans ville', sum(1 for s in schools if not s['ville']))
for s in schools[:5]+schools[60:64]: print(s['noms'],s['ville'],s['statut'],s['voies'],s['titres'][:3],s['sites'])
