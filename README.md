# Aiguillage

Site d'orientation pour lycéen·nes : comprendre les études supérieures sans jargon, selon son bac et son profil, à partir des données officielles.

## Créer le compte et le dépôt GitHub (une fois, 10 minutes)

1. **Compte** : va sur github.com → *Sign up*. E-mail, mot de passe, nom d'utilisateur (il apparaîtra dans l'adresse du site : `https://<utilisateur>.github.io/aiguillage/`), puis le code reçu par e-mail. Choisis l'offre **Free** : tout ce dont on a besoin est gratuit. Active ensuite l'authentification à deux facteurs (*Settings → Password and authentication*).
2. **Dépôt** : bouton **+** en haut à droite → *New repository*. Nom : `aiguillage`. Visibilité : **Public** (GitHub Pages est gratuit pour les dépôts publics). Ne coche ni README ni .gitignore, puis *Create repository*.
3. **Donner accès à Claude** : ouvre claude.ai/connect-github, connecte ton compte, puis installe l'application GitHub de Claude sur le dépôt `aiguillage` (*Only select repositories*).
4. **Pousser le code** : donne le nom `utilisateur/aiguillage` à Claude, qui rattache le dépôt à la session et envoie le code. Sans Claude : `git remote add origin https://github.com/utilisateur/aiguillage.git && git push -u origin main`.
5. **Publier le site** : *Settings → Pages → Build and deployment → Source : GitHub Actions*. Après la première exécution du workflow, le site est en ligne.
6. **Témoignages et écoles manquantes** : renseigne `depotGithub: "utilisateur/aiguillage"` dans `js/config.js`, puis crée dans *Issues → Labels* les étiquettes `approuvé` (modération des témoignages) et `ecole`.

Ne mets jamais de clé API ni de mot de passe dans le dépôt : il est public.

## Mettre en ligne gratuitement (0 € pour toi et les utilisateurs)

Le site est 100 % statique : il tourne sur **GitHub Pages**, gratuit.

1. Pousse ce dossier sur un dépôt GitHub (public ou privé selon ton offre).
2. Dans le dépôt : *Settings → Pages → Build and deployment → Source : GitHub Actions*.
3. Le workflow `.github/workflows/pages.yml` publie le site à chaque modification de `main`.
4. Le workflow `.github/workflows/donnees.yml` remet à jour les données officielles le 3 de chaque mois (lançable à la main dans l'onglet *Actions*).

Ce qui reste gratuit, et pourquoi :

| Brique | Solution | Coût |
|---|---|---|
| Hébergement | GitHub Pages | 0 € |
| Données | Licence Ouverte, mises à jour par GitHub Actions | 0 € |
| Fond de carte | OpenFreeMap (sans clé, sans limite) + MapLibre embarqué | 0 € |
| Application mobile | PWA : « Ajouter à l'écran d'accueil » sur Android et iPhone, fonctionne hors ligne | 0 € (pas de frais de store) |
| Assistant | Mode guidé, sans IA, qui cherche dans les données du site | 0 € |

L'assistant avec Claude (`serveur/`) reste disponible si un jour tu as un serveur et une clé API : l'API Claude est payante à l'usage, c'est la seule brique qui ne l'est pas.

## Lancer le site en local

```bash
npm install && npm start                 # http://localhost:8000 (assistant en mode guidé)
ANTHROPIC_API_KEY=sk-ant-... npm start   # assistant avec Claude
python3 -m http.server                   # alternative sans Node (mode guidé)
```

Le site doit être servi en HTTP (pas en ouvrant `index.html` à la main), car il charge les données de `data/`.

## Fonctionnalités

| Page | Hash | Contenu |
|---|---|---|
| Accueil | `#accueil` | Mini-plan animé, portes d'entrée, progression |
| Le test | `#test` → `#resultat` | Bac + spécialités/série, 18 situations (modèle RIASEC), préférences ; radar, métiers et formations recommandés |
| Le plan | `#plan` | Arborescence Bac → ligne (domaine) → gare (formation) → métier, accès selon le bac, part réelle des bacs pro/techno admis |
| Métiers | `#metiers`, `#metier-<id>` | 76 fiches détaillées (dont finance : M&A, private equity, trader, actuaire…) + recherche dans les 14 325 intitulés officiels du ROME |
| Formations | `#formations`, `#type-<id>`, `#formation-<id>` | Comparateur de 13 familles, 66 formations, chiffres Parcoursup réels sur chaque fiche |
| Carte | `#carte` | Les 14 252 formations Parcoursup 2025 sur une vraie carte (OpenFreeMap / OpenStreetMap) : rayon autour de sa ville, taux d'accès, places, profil des admis, % boursiers. Deux fonds : **Clair** (style « bright ») et **3D** (vue inclinée, bâtiments en volume, tours dont la hauteur suit le nombre de places). Bouton **Hors Parcoursup** : affiche aussi les écoles qui recrutent en direct. Repli sur une carte simplifiée si le fond est injoignable |
| Écoles | `#ecoles`, `#ecole-<id>` | Annuaire de ~1 900 établissements : tout Parcoursup (campus regroupés, lycées à prépa / DN MADE compris), les écoles d'ingénieurs accréditées CTI, et ~270 écoles **hors Parcoursup** (École Bleue, Epitech, grandes écoles en 5 ans…). Recherche par nom, sigle, ville ; filtres domaine / statut / distance ; fiche avec accès, campus, reconnaissance du diplôme (à vérifier), formations Parcoursup |
| Réseau | `#reseau` | Tuto LinkedIn en 6 étapes, missions « vois ce qu'ont fait les gens avant toi » (outil Anciens élèves), générateur de premier message, sécurité, outils publics gratuits |
| Budget | `#budget` | Reste à vivre : loyers officiels de 217 villes, barème des bourses 2026-2027, APL, job, alternance |
| Assistant | `#assistant` | Chat qui répond à partir des fiches, du profil et des données Parcoursup : mode guidé gratuit, ou Claude quand il est disponible |
| Comparer | `#comparer` | Deux formations précises côte à côte : taux d'accès, places, profil des admis, coût, emploi à 18 mois |
| Portes ouvertes | `#jpo` | Les établissements de sa ville (Parcoursup) + planning personnel avec export agenda `.ics` (rappels la veille et le jour même). Les dates ne sont pas des données ouvertes : chaque personne saisit les siennes |
| Espace prof / Psy-EN | `#classe` | Code de classe, lien à envoyer aux élèves, profils anonymes (code court avec somme de contrôle, sans serveur) et synthèse de la classe |
| Témoignages | `#temoignages` | Formulaire (texte ou lien vidéo) → ticket GitHub → relecture → publication dans `data/temoignages.json` |
| Décodeur, Vrai/faux, Calendrier, Aides, Carnet | `#decodeur`… | Jargon, idées reçues, étapes de terminale, aides, favoris |

Emploi à 18 mois : `data/insertion.json` reprend les lignes nationales d'**InserSup** (MESR). Les BTS et BUT n'y figurent pas : les fiches l'indiquent.

Lecture audio : le bouton « Écouter » du bandeau lit la page avec la synthèse vocale du navigateur (vitesse réglable dans les réglages).

## Anglais

Le bouton **FR / EN** du bandeau change la langue (choix mémorisé ; sans choix, anglais seulement si le navigateur est en anglais et ne propose pas le français).

- `js/i18n.js` : moteur. En anglais, il charge `js/i18n/en-*.js`, remplace les contenus rédigés (`en-data-*.js` : lignes, formations, 76 métiers, lexique, vrai/faux…) puis traduit les textes de l'interface au fil de l'affichage.
- `js/i18n/en-ui.js` (dictionnaire généré), `en-extra.js` (compléments à la main), `en-rules.js` (phrases qui mélangent des données et du texte) : clé française, `{n}` à la place des nombres.
- Tout texte sans traduction reste en français : rien ne casse. Restent volontairement en français : noms de formations et d'établissements issus de Parcoursup, intitulés du ROME, message-type LinkedIn (destiné à des contacts en France).
- Nouveau texte dans l'interface → ajouter sa clé dans `en-extra.js`. Nouveau métier ou formation → ajouter son `id` dans `en-data-metiers*.js` / `en-data-formations.js`.
- L'assistant (mode guidé comme Claude) répond dans la langue du site.

## Témoignages : mise en place

1. Renseigner le dépôt dans `js/config.js` (`depotGithub: "compte/depot"`), sinon le formulaire propose l'envoi par e-mail (`emailTemoignages`).
2. Créer l'étiquette `approuvé` dans le dépôt. `.github/workflows/temoignages.yml` publie le témoignage dans `data/temoignages.json` quand quelqu'un d'autorisé pose cette étiquette sur le ticket : c'est la modération.
3. Voir `outils/temoignage.py` pour la conversion d'un ticket en entrée du fichier.

## Annuaire des écoles : d'où viennent les données

`python3 outils/ecoles.py` fabrique `data/ecoles.json` en fusionnant :
1. **Parcoursup** (`data/parcoursup.json`) : tous les établissements, campus regroupés. Un établissement trouvé là est « Parcoursup », les autres sont « hors Parcoursup ».
2. **Liste CTI** des écoles d'ingénieurs accréditées (`outils/sources/cti-2025-12.json`, extraite de l'arrêté du 11 décembre 2025 sur Légifrance avec `outils/cti_legifrance.py`).
3. **`outils/ecoles_complement.txt`** : liste écrite à la main (sigle, reconnaissance, formations, alias pour retrouver l'école dans Parcoursup). C'est ici qu'on ajoute une école : une ligne, le format est décrit en tête de fichier.

Aucune liste ouverte n'est exhaustive pour le privé hors Parcoursup (le répertoire de l'Onisep, par exemple, bloque les téléchargements automatiques). L'annuaire le dit sur chaque page, et un bouton envoie un signalement (formulaire `.github/ISSUE_TEMPLATE/ecole.yml`). Les informations de reconnaissance (visa, grade, RNCP) sont indicatives : à vérifier sur France compétences.

## Données officielles

| Fichier | Source | Licence |
|---|---|---|
| `data/parcoursup.json`, `villes.json`, `parcoursup-stats.json` | Parcoursup session 2025, jeu `fr-esr-parcoursup` (MESR) | Licence Ouverte |
| `data/rome.json` | ROME 4.0, arborescence principale (France Travail), octobre 2026 | Licence Ouverte |
| `data/loyers.json` | Carte des loyers 2025, appartements 1-2 pièces (ANIL / DHUP) — extrait de 217 villes étudiantes | Licence Ouverte |
| `data/ecoles.json` | Parcoursup 2025 + liste CTI (Légifrance, arrêté du 11 décembre 2025) + complément rédigé à la main (`outils/ecoles_complement.txt`) | Licence Ouverte pour les données publiques |
| `data/france.json` | Contours des départements (france-geojson, d'après IGN) | Licence Ouverte |
| `js/data/contenus.js` → `A.chiffres` | Barème des bourses 2026-2027, droits d'inscription, CVEC, SMIC, plafonds APL (service-public.gouv.fr, caf.fr, info.gouv.fr) | — |

Mise à jour (à faire chaque année, à l'ouverture des nouvelles données Parcoursup) :

```bash
npm run donnees    # télécharge les sources puis régénère data/*.json
```

`outils/importer.py` peut aussi reconvertir les fichiers déjà présents dans `donnees-brutes/` (sans `--telecharger`). Le téléchargement complet récupère la carte des loyers nationale (35 000 communes) au lieu de l'extrait.

Non intégré : le référentiel métiers de l'**Onisep** (son serveur bloque les téléchargements automatisés). Les fiches renvoient vers onisep.fr par des liens de recherche.

## L'assistant

- Par défaut (GitHub Pages, hors ligne) : **mode guidé**, sans IA. Il reconnaît les grands thèmes (BTS/BUT, prépa, alternance, argent, Parcoursup, réseau…), les métiers, les formations et les villes citées, et répond avec les fiches et les formations Parcoursup proches.
- Avec un serveur et une clé : `POST /api/assistant` : `POST /api/assistant` (`serveur/assistant.mjs`), modèle `claude-opus-5-5`, réponse en flux, effort `low`, repli automatique en cas de refus du filtre de sécurité. La page construit le contexte (fiches proches de la question, profil, statistiques, formations Parcoursup autour d'une ville citée) et l'envoie avec la conversation. Limites : 20 requêtes / 10 min par IP, 12 messages, 40 000 caractères de contexte.
- Dans l'aperçu claude.ai : la page passe par la capacité `sample` (le compte Claude de la personne qui regarde).

Les règles de l'assistant existent en double (`js/pages-assistant.js` et `serveur/assistant.mjs`) : les garder identiques.

## Structure

```
index.html               page complète
css/style.css            styles (tokens en haut du fichier)
js/data/*.js             contenus rédigés : lignes, formations, métiers, test, lexique, chiffres officiels
js/core.js               état local, progression, chargement de data/, routeur
js/pages-*.js            une fonction de rendu par page (A.pages.<nom>)
js/config.js            réglages du dépôt (témoignages)
js/i18n.js, js/i18n/     version anglaise
data/*.json              données ouvertes converties (générées)
serveur/                 serveur Node (site + API de l'assistant)
outils/importer.py       import des données officielles
outils/apercu.py         génère apercu.html pour l'aperçu Artifact claude.ai
js/vendor/               MapLibre GL 4.7.1 (licence BSD-3, voir LICENSE.txt)
manifest.webmanifest, sw.js, icones/   application installable (PWA)
.github/workflows/       publication GitHub Pages et mise à jour mensuelle des données
```

Ajouter un métier : un objet dans `A.metiers` avec `formations: [ids]`. Relier une formation à Parcoursup : une entrée dans `PSUP` (`js/data/formations.js`), `[filière, motif sur l'intitulé]`.

Les salaires et certains niveaux d'accès sont des estimations rédigées : à faire relire avant une mise en ligne publique.

## Organisation du site

Cinq pôles, chacun avec sa sous-navigation (définis dans `A.HUBS`, `js/core.js`) : **Me découvrir** (test, résultats, arborescence), **Métiers**, **Formations & écoles** (familles de formations, annuaire, carte, comparer, passerelles), **Démarches & argent** (ta situation, budget, aides, calendrier, portes ouvertes), **Ressources** (réseau, témoignages, décodeur, vrai ou faux). Le menu « Plus » regroupe les ressources et « Mon espace » (favoris, espace enseignant). Les adresses des pages ne changent pas (`#budget`, `#metier-avocat`…). Les aides ont une source unique (`A.aides`, page « Aides »), dont « Ta situation » extrait celles qui te concernent.

## Fiches métiers détaillées, passerelles, « ta situation »

- **Fiches métiers** : chaque métier a une section « Qui recrute », « Comment y entrer, concrètement » (avec le poids du réseau), « Ce qu'il faut savoir » et les tests utiles. Données : `js/data/metiers-acces-1.js` à `-6.js` (les 38 derniers métiers sont dans `js/data/metiers-plus.js`) (format décrit en tête du fichier 1). Les employeurs cités sont des repères, jamais une liste exhaustive.
- **Passerelles et tests** (`#passerelles`) : chemins BTS/BUT/licence vers écoles de commerce, d'ingénieurs, Sciences Po, droit, santé, étranger ; fiches Tage Mage, Tage 2, GMAT, GRE, Score IAE-Message, TOEIC, TOEFL/IELTS, CRFPA, ENM, CRPE/CAPES. Données : `js/data/passerelles.js`. Prix, dates et formats sont des repères à confirmer sur le site de chaque organisateur.
- **Ta situation** (`#parcours`) : parcours à embranchements (revenus, handicap, études payantes, prêt, rester ou partir, Paris…) qui aboutit à un plan d'aides, de financement et de lieu. Il est proposé au début du test (« Tu veux découvrir quel métier est fait pour toi ? ») et à la fin des résultats.
- **Transport** : le simulateur de budget utilise le pass étudiant de la ville (Paris : forfait Imagine R Étudiant, soit environ 44 € par mois en 9 mensualités).
- Version anglaise de ces contenus : `js/i18n/en-data-acces-*.js`, `en-data-passerelles.js`, `en-new-ui.js`.
