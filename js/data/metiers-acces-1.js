/* Fiches métiers : qui recrute, comment y entrer concrètement, ce qu'il faut savoir (1/4 : santé, numérique, industrie).
   emp   : employeurs [type, exemples, remarque facultative]
   acces : étapes concrètes pour entrer
   net   : [1 à 3, phrase] — 1 = on entre surtout par les concours ou le dossier, 3 = le réseau décide beaucoup
   sav   : connaissances à avoir      out : outils, logiciels, certifications      evo : évolution possible
   Les exemples d'entreprises sont là pour te repérer, pas pour être exhaustifs ; vérifie les offres actuelles. */
A.METIERS_ACCES = A.METIERS_ACCES || {};
Object.assign(A.METIERS_ACCES, {
  infirmier: {
    emp: [["Hôpitaux publics et CHU", "AP-HP, Hospices civils de Lyon, CHU de Bordeaux, CHU de Lille"], ["Cliniques privées et groupes de santé", "Ramsay Santé, Elsan, Vivalto Santé"], ["Établissements pour personnes âgées et à domicile", "Korian (Clariane), Orpea, HAD, centres de santé"], ["Autres", "Armée, éducation nationale (infirmier·ère scolaire), entreprises (santé au travail), libéral"]],
    acces: ["Candidature en IFSI sur Parcoursup : le dossier compte (bulletins, projet motivé), pas de concours en général.", "Les stages font la moitié de la formation : c'est là que tu te fais connaître, et beaucoup sont embauchés par leur terrain de stage.", "Après le diplôme, le recrutement est ouvert partout en France : l'offre dépasse la demande.", "Pour une spécialité (bloc opératoire, anesthésie, puériculture), il faut ensuite un concours d'école."],
    net: [1, "On entre par le dossier Parcoursup puis par les stages : le réseau aide peu, la motivation compte."],
    sav: ["Anatomie, physiologie, pharmacologie de base", "Soins infirmiers et hygiène (gestes, asepsie)", "Droit et éthique du soin, secret professionnel", "Calcul de doses", "Communication avec le patient et sa famille"],
    out: ["Dossier de soins informatisé", "Gestes techniques (prise de sang, pansements) appris en TP", "AFGSU (attestation de gestes et soins d'urgence)"],
    evo: "Infirmier·ère spécialisé·e (IBODE, IADE, puéricultrice), infirmier·ère en pratique avancée, cadre de santé, formateur·rice en IFSI."
  },
  medecin: {
    emp: [["Hôpitaux publics et CHU", "AP-HP, CHU, centres hospitaliers régionaux"], ["Cabinet libéral et maisons de santé", "Médecin généraliste ou spécialiste installé·e"], ["Cliniques privées", "Ramsay Santé, Elsan, Vivalto Santé"], ["Industrie, recherche, armée", "Sanofi, laboratoires, INSERM, service de santé des armées"]],
    acces: ["Entrer par PASS ou L.AS, puis réussir la sélection en fin de 1re année.", "Le concours de fin de 2e cycle (les ECOS et l'épreuve classante) décide de ta spécialité et de ta ville : les années de médecine sont très cadrées.", "Beaucoup de gardes et de stages d'externat : c'est le terrain où l'on se fait des contacts utiles pour l'internat.", "Pour une carrière hospitalo-universitaire ou de recherche, on démarre vite un master ou une thèse de science."],
    net: [1, "Le classement aux examens décide presque tout ; le réseau sert surtout ensuite (postes, remplacements, cabinets)."],
    sav: ["Biologie, chimie, physique (programme du PASS)", "Anatomie, physiologie, sémiologie", "Raisonnement clinique", "Éthique médicale et droit de la santé", "Statistiques et lecture d'articles scientifiques"],
    out: ["Plateforme d'entraînement aux ECOS", "Logiciels de dossier patient", "Anglais médical"],
    evo: "Médecin généraliste ou spécialiste, chef de clinique, praticien hospitalier, professeur·e des universités, chef de service."
  },
  kine: {
    emp: [["Cabinet libéral", "Kinésithérapeute installé·e, collaborateur ou remplaçant"], ["Hôpitaux et cliniques", "AP-HP, centres de rééducation fonctionnelle"], ["Sport", "Clubs professionnels, fédérations, INSEP"], ["Autres", "Maisons de retraite, thalassothérapie, centres de santé"]],
    acces: ["Entrer en institut de formation en masso-kinésithérapie après un PASS, une L.AS ou une licence de sciences (dont STAPS).", "Les remplacements en cabinet sont le meilleur moyen de découvrir le métier, trouver un poste et une clientèle.", "Se former à une spécialité (sport, pédiatrie, respiratoire) via des diplômes universitaires."],
    net: [2, "Les remplacements et les collaborations viennent beaucoup du bouche-à-oreille entre confrères."],
    sav: ["Anatomie et biomécanique", "Physiologie et pathologies de l'appareil locomoteur", "Techniques de rééducation et de massage", "Bilan diagnostic kinésithérapique", "Pédagogie du patient (faire adhérer à l'exercice)"],
    out: ["Logiciels de gestion de cabinet", "Matériel de rééducation (électrothérapie, isocinétisme)"],
    evo: "Installation en libéral, spécialisation (sport, neurologie), cadre de santé, enseignement en institut, ostéopathie en complément."
  },
  pharmacien: {
    emp: [["Pharmacie d'officine", "Pharmacie de quartier, groupements (Pharmacie Lafayette, Giphar)"], ["Hôpitaux", "Pharmacie hospitalière des CHU"], ["Industrie pharmaceutique", "Sanofi, Servier, Pierre Fabre, Ipsen"], ["Biologie médicale et autres", "Laboratoires d'analyses (Biogroup, Cerballiance), distribution (Alliance Healthcare)"]],
    acces: ["Entrer par PASS ou L.AS, puis les 6 années de pharmacie.", "En 5e année, on choisit une filière : officine, industrie ou internat (concours pour l'hôpital et la biologie).", "L'officine s'achète souvent entre associés : on commence salarié·e puis on s'installe.", "Les stages en industrie, en 5e année ou en césure, ouvrent les portes des laboratoires."],
    net: [2, "En industrie, les stages et les alumni de la fac comptent ; à l'officine, le réseau sert à trouver une pharmacie à reprendre."],
    sav: ["Pharmacologie et chimie thérapeutique", "Interactions médicamenteuses", "Réglementation du médicament", "Gestion d'une officine (stocks, comptabilité)", "Conseil au patient"],
    out: ["Logiciel de gestion d'officine (LGO)", "Bases de données du médicament", "Anglais scientifique"],
    evo: "Titulaire d'officine, pharmacien·ne hospitalier·ère, responsable qualité ou affaires réglementaires en industrie, directeur·rice de laboratoire."
  },
  "aide-soignant": {
    emp: [["Hôpitaux publics", "AP-HP, CHU, centres hospitaliers"], ["EHPAD et établissements médico-sociaux", "Clariane (ex-Korian), Orpea, structures associatives"], ["Domicile", "SSIAD, services d'aide à domicile, hospitalisation à domicile"], ["Cliniques privées", "Ramsay Santé, Elsan"]],
    acces: ["Entrer en institut de formation d'aides-soignants (environ 1 an) : dossier et entretien, souvent hors Parcoursup.", "Le diplôme se prépare aussi en apprentissage ou en reconversion.", "Les stages débouchent souvent sur des CDD puis des CDI sur place : les services manquent de monde.", "Après quelques années, des passerelles permettent d'entrer en IFSI."],
    net: [1, "On est recruté·e rapidement ; le réseau compte peu, la disponibilité et le sérieux en stage beaucoup."],
    sav: ["Hygiène et soins de confort", "Mobilisation et transferts de patients", "Observation et transmission à l'équipe", "Premiers secours (AFGSU)", "Bientraitance et communication avec les personnes âgées"],
    out: ["Dossier de soins informatisé", "Matériel de manutention"],
    evo: "Infirmier·ère après passerelle, auxiliaire de puériculture, aide-soignant·e référent·e, cadre de proximité."
  },
  "sage-femme": {
    emp: [["Maternités publiques", "AP-HP, CHU, hôpitaux régionaux"], ["Cliniques privées", "Ramsay Santé, Elsan"], ["Libéral", "Cabinet ou maison de naissance"], ["Protection maternelle et infantile", "Centres de PMI des départements"]],
    acces: ["Entrer par PASS ou L.AS, puis les 5 années de maïeutique.", "Les stages en salle de naissance et en consultation te font connaître des équipes qui recrutent.", "En libéral, on rejoint d'abord un cabinet existant ; les remplacements sont fréquents."],
    net: [1, "Le diplôme suffit pour être embauché·e ; le réseau aide pour s'installer en libéral."],
    sav: ["Anatomie et physiologie de la grossesse", "Surveillance fœtale et obstétrique", "Pédiatrie du nouveau-né", "Gynécologie et contraception", "Gestes d'urgence en salle de naissance"],
    out: ["Échographie", "Matériel de monitoring", "Logiciel de dossier périnatal"],
    evo: "Cadre sage-femme, échographiste, enseignement, travail en PMI ou en santé publique."
  },
  "manip-radio": {
    emp: [["Hôpitaux publics", "AP-HP, CHU, centres de lutte contre le cancer"], ["Centres d'imagerie privés", "Groupes d'imagerie médicale, cliniques"], ["Centres de radiothérapie", "Centres Unicancer (Gustave Roussy, Institut Curie)"], ["Industrie", "Fabricants d'équipements d'imagerie (GE HealthCare, Siemens Healthineers, Philips)"]],
    acces: ["Entrer en DTS IMRT au lycée ou en institut après dossier sur Parcoursup, ou en DE de manipulateur·rice.", "Les stages en radiologie, scanner, IRM et radiothérapie sont le principal tremplin vers un poste.", "La pénurie de manipulateur·rices rend l'embauche rapide ; on peut choisir sa spécialité."],
    net: [1, "La pénurie fait que les services te cherchent : le dossier et les stages suffisent."],
    sav: ["Physique des rayonnements et radioprotection", "Anatomie radiologique", "Fonctionnement du scanner, de l'IRM, de la radiothérapie", "Relation avec le patient anxieux", "Hygiène et sécurité"],
    out: ["Consoles de scanner et d'IRM", "Système d'archivage d'images (PACS)", "Dosimétrie"],
    evo: "Dosimétriste, cadre de santé, formateur·rice, ingénieur·e d'application chez un fabricant."
  },
  psychologue: {
    emp: [["Hôpitaux et structures de soin", "CHU, centres médico-psychologiques, centres de santé mentale"], ["Éducation nationale", "Psy-EN dans les collèges, lycées et centres d'information et d'orientation"], ["Entreprises et cabinets", "RH, cabinets de conseil, psychologie du travail"], ["Libéral et associations", "Cabinet, protection de l'enfance, associations"]],
    acces: ["Licence de psychologie, puis master de psychologie : le titre de psychologue exige un master.", "L'entrée en master est sélective : le dossier, les stages et la mention de licence comptent.", "Les stages sont obligatoires et choisis par le master : demande-les tôt et soigne le rapport avec ton tuteur·rice.", "Pour la fonction publique hospitalière ou l'Éducation nationale, on passe un concours."],
    net: [2, "Le stage de master est l'occasion de se faire connaître ; ensuite les postes passent beaucoup par le bouche-à-oreille entre équipes."],
    sav: ["Psychologie du développement, clinique et sociale", "Statistiques et méthodologie de la recherche", "Neurosciences de base", "Entretien clinique et écoute", "Déontologie du psychologue"],
    out: ["Tests psychométriques (appris en master)", "Logiciels de statistiques (SPSS, R)"],
    evo: "Neuropsychologue, psychologue du travail, psychologue clinicien·ne en libéral, Psy-EN, enseignant·e-chercheur·se."
  },
  orthophoniste: {
    emp: [["Libéral", "Cabinet d'orthophonie seul ou en collectif"], ["Hôpitaux et centres de rééducation", "CHU, centres de référence des troubles du langage"], ["Structures médico-sociales", "IME, SESSAD, instituts pour enfants sourds"], ["Autres", "Enseignement, recherche"]],
    acces: ["Concours d'entrée en centre de formation (admission sur Parcoursup avec épreuves) : prépare-toi aux épreuves de langue et de logique.", "Les 5 années comprennent beaucoup de stages en cabinet et à l'hôpital.", "À la sortie, on s'installe souvent en libéral dans une zone où la demande est forte."],
    net: [1, "L'admission en centre de formation est sélective et se joue sur dossier et épreuves ; ensuite la clientèle vient seule."],
    sav: ["Linguistique, phonétique et phonologie", "Troubles du langage oral et écrit (dyslexie, dysphasie)", "Neurologie et anatomie de la voix et de la déglutition", "Pédagogie et jeu avec l'enfant", "Droit et nomenclature des actes"],
    out: ["Batteries de bilans orthophoniques", "Logiciels de rééducation"],
    evo: "Cabinet en collaboration ou en association, spécialisation (voix, neurologie), enseignement, recherche."
  },
  "dev-web": {
    emp: [["ESN et conseil informatique", "Capgemini, Sopra Steria, Accenture, Alten"], ["Éditeurs et start-up françaises", "Doctolib, BlaBlaCar, Qonto, Alan, Contentsquare, Datadog"], ["Grands groupes (équipes internes)", "Banques (BNP Paribas, Société Générale), assurance (AXA), distribution (Carrefour, Leroy Merlin)"], ["Agences web et indépendants", "Agences digitales, freelance"]],
    acces: ["Beaucoup d'entrées par BTS SIO, BUT informatique, licence ou école : le diplôme aide, le portfolio de projets (GitHub) compte autant.", "L'alternance est le meilleur raccourci : tu es embauché·e dans la boîte où tu as fait ton alternance.", "Contribue à un projet open source, fais des hackathons, publie un projet réel : ça se voit sur ton profil.", "Réponds aux offres de développeur·se junior en précisant les technos de ton projet, et passe les tests techniques (algorithmes, exercice à la maison)."],
    net: [2, "Les cooptations et les meetups comptent, mais un bon portfolio ouvre aussi les portes sans réseau."],
    sav: ["Un langage solide (JavaScript/TypeScript, Python ou Java)", "HTML, CSS, HTTP et fonctionnement du web", "Bases de données SQL", "Git et travail en équipe", "Algorithmique de base et tests", "Anglais technique"],
    out: ["Git et GitHub", "Un framework (React, Vue, Symfony, Django…)", "Docker, notions de cloud (AWS, Azure)", "VS Code et son terminal"],
    evo: "Développeur·se senior, lead dev, architecte logiciel, CTO, product manager."
  },
  "data-scientist": {
    emp: [["Banque, assurance, finance", "BNP Paribas, Société Générale, AXA, Crédit Agricole"], ["Tech et e-commerce", "Criteo, Doctolib, Deezer, Cdiscount, Amazon"], ["Conseil et ESN", "Capgemini, Accenture, Sopra Steria, cabinets spécialisés en data"], ["Santé, énergie, industrie", "Sanofi, EDF, Engie, Airbus, TotalEnergies"]],
    acces: ["Master en data science, maths appliquées ou école d'ingénieurs avec parcours data : le niveau bac+5 est la norme.", "Un stage de fin d'études ou une alternance en data est le principal moyen d'être embauché·e.", "Montre des projets sur des vraies données (Kaggle, données ouvertes) et explique tes résultats à des non-spécialistes.", "Les entretiens contiennent des exercices de statistiques, de SQL et de code, et un cas pratique."],
    net: [2, "Les offres circulent beaucoup par cooptation et les communautés (meetups, Kaggle) ; le niveau technique reste décisif."],
    sav: ["Probabilités et statistiques", "Algèbre linéaire", "Python et ses bibliothèques (pandas, scikit-learn)", "SQL", "Apprentissage automatique (régression, arbres, réseaux de neurones)", "Visualisation et communication des résultats"],
    out: ["Python, R", "SQL et entrepôts de données", "Jupyter, Git", "Cloud (AWS, GCP, Azure), Spark"],
    evo: "Data scientist senior, lead data, ingénieur·e machine learning, responsable data, chief data officer."
  },
  cyber: {
    emp: [["ESN et cabinets spécialisés", "Capgemini, Orange Cyberdefense, Thales, Wavestone, Sopra Steria"], ["Grands groupes", "Banques, assurances, énergie, industrie (équipes sécurité internes)"], ["État", "ANSSI, ministère des Armées, DGSI, gendarmerie, police"], ["Éditeurs et start-up", "Sekoia, HarfangLab, Vade, YesWeHack"]],
    acces: ["Bac+3 à bac+5 en informatique avec option sécurité (BUT réseaux et télécoms parcours cyber, écoles d'ingénieurs, masters).", "Participe à des CTF (Capture the Flag), TryHackMe, Root-Me : ce sont des preuves de niveau que les recruteurs regardent.", "L'alternance est très répandue : elle te place directement dans une équipe sécurité.", "Pour l'État, regarde l'ANSSI et les concours du ministère des Armées ; certaines missions demandent une habilitation."],
    net: [2, "La communauté cyber est petite : les événements (FIC, CTF) et la cooptation pèsent beaucoup."],
    sav: ["Réseaux (TCP/IP, DNS, pare-feu)", "Systèmes (Linux, Windows) et Active Directory", "Cryptographie de base", "Vulnérabilités web (OWASP) et tests d'intrusion", "Réglementation (RGPD, NIS 2) et gestion de crise"],
    out: ["Kali Linux, Wireshark, Burp Suite", "SIEM (Splunk, Elastic)", "Certifications (Security+, CEH, OSCP, CISSP plus tard)"],
    evo: "Pentesteur·se, analyste SOC, consultant·e, responsable sécurité (RSSI)."
  },
  "admin-reseau": {
    emp: [["ESN et infogéreurs", "Capgemini, Sopra Steria, Orange Business, Econocom, Computacenter"], ["Entreprises et collectivités", "Équipes informatiques internes des grands groupes, mairies, hôpitaux"], ["Opérateurs", "Orange, SFR, Bouygues Telecom, Free"], ["Intégrateurs", "Spie ICS, Axians, Cegedim"]],
    acces: ["BTS SIO option SISR, BUT réseaux et télécoms ou licence pro : on peut être embauché·e dès bac+2.", "L'alternance est très répandue et te place dans une DSI ou une ESN.", "Passe une certification réseau ou système (Cisco CCNA, Microsoft) : elle est reconnue et rassure les recruteurs.", "Commence par un poste de technicien·ne support ou d'administrateur·rice junior, puis monte en compétences."],
    net: [1, "Les ESN recrutent beaucoup de juniors : un CV avec projets et certifications suffit."],
    sav: ["Modèle OSI, TCP/IP, routage, VLAN", "Linux et Windows Server", "Active Directory, DNS, DHCP", "Virtualisation et cloud", "Scripts (PowerShell, Bash) pour automatiser", "Sauvegardes et supervision"],
    out: ["Cisco Packet Tracer", "VMware, Hyper-V, Proxmox", "Outils de supervision (Zabbix, Nagios)", "Certifications CCNA, AZ-104"],
    evo: "Ingénieur·e systèmes et réseaux, architecte infrastructure, DevOps, responsable de DSI."
  },
  "game-designer": {
    emp: [["Grands studios français", "Ubisoft (Montpellier, Paris, Annecy), Don't Nod, Focus Entertainment"], ["Studios indépendants", "Sandfall Interactive, Amplitude, Dotemu, Motion Twin"], ["Mobile et jeux en ligne", "Gameloft, Voodoo, Ankama"], ["Jeux sérieux et autres", "Serious games, formation, musées"]],
    acces: ["Écoles de jeu vidéo (Rubika, ISART Digital, ENJMIN, Gamagora, Gobelins…) ou licence/master en informatique ou en design, puis portfolio.", "Un portfolio de petits jeux jouables (game jams, prototypes) vaut plus qu'un CV : participe à la Global Game Jam.", "Les stages en studio se décrochent surtout par candidature spontanée avec un projet jouable.", "Le secteur est très concurrentiel : accepte de commencer comme testeur·se ou QA, puis de monter."],
    net: [3, "Le milieu est petit : événements (Game Connection, Gamescom, game jams), alumni d'écoles et cooptation décident beaucoup."],
    sav: ["Boucles de gameplay, équilibrage et progression", "Documents de game design", "Un moteur (Unity ou Unreal) pour prototyper", "Bases de scripting (C#, Blueprints)", "Culture des jeux et analyse critique", "Psychologie du joueur"],
    out: ["Unity, Unreal Engine", "Figma, Miro", "Excel pour équilibrer", "Git, Jira"],
    evo: "Lead game designer, directeur·rice de création, producteur·rice, level designer senior."
  },
  "ux-designer": {
    emp: [["Start-up et scale-up", "Doctolib, Qonto, BlaBlaCar, Alan, Back Market"], ["Agences et conseil", "Accenture Song, Wavestone, Publicis Sapient, agences digitales"], ["Grands groupes", "Banques, assurances, énergie, e-commerce"], ["Freelance", "Missions pour des PME et des start-up"]],
    acces: ["Cursus en design (DN MADE numérique, BUT MMI, écoles de design et de web) puis portfolio.", "Un portfolio de 3 à 5 études de cas expliquant le problème, ta démarche et le résultat vaut plus que le diplôme.", "L'alternance est très répandue : elle te place dans une équipe produit.", "Entraîne-toi aux exercices de recrutement (cas de conception en live) et aux tests d'utilisabilité."],
    net: [2, "Communautés (UX Paris, ADPList, LinkedIn) et cooptation : le portfolio reste l'essentiel."],
    sav: ["Recherche utilisateur et entretiens", "Architecture d'information et parcours", "Principes d'UI (grille, typographie, accessibilité)", "Prototypage et tests d'utilisabilité", "Travail avec les développeurs"],
    out: ["Figma", "Miro, Maze", "Notions de HTML/CSS", "Design systems"],
    evo: "UX lead, product designer, head of design, product manager."
  },
  ingenieur: {
    emp: [["Aéronautique et spatial", "Airbus, Safran, Thales, Dassault Aviation, ArianeGroup"], ["Automobile et transports", "Stellantis, Renault, Valeo, Alstom, SNCF"], ["Énergie et environnement", "EDF, Engie, TotalEnergies, Schneider Electric, Veolia"], ["Conseil et numérique", "Capgemini, Altran (Capgemini Engineering), Alten, Accenture, Sopra Steria"], ["BTP", "VINCI, Bouygues, Eiffage"]],
    acces: ["Diplôme d'ingénieur (CTI) : post-bac en 5 ans, après une prépa ou après un BUT, un BTS ou une licence (admission sur titre).", "Les stages (3 en général, dont un à l'étranger) sont la porte d'entrée : beaucoup d'ingénieur·es sont embauché·es par leur stage de fin d'études.", "L'apprentissage ingénieur te paie et te place dans une entreprise : de plus en plus de grandes écoles le proposent.", "Choisis ta majeure et ton stage en fonction du secteur visé ; les forums école-entreprise font gagner du temps."],
    net: [2, "Les alumni de ton école et les forums entreprises aident beaucoup, sans être indispensables."],
    sav: ["Maths et physique solides", "Sciences de l'ingénieur de ta spécialité", "Gestion de projet (cycle en V, agile)", "Anglais courant", "Une base de programmation (Python, MATLAB)"],
    out: ["Logiciels de conception (CATIA, SolidWorks, AutoCAD)", "MATLAB, Python", "Excel", "Outils de gestion de projet (MS Project, Jira)"],
    evo: "Chef de projet, responsable de bureau d'études, directeur technique, manager, entrepreneur·e."
  },
  "tech-maintenance": {
    emp: [["Industrie", "Airbus, Safran, Michelin, Renault, Stellantis, Danone"], ["Énergie", "EDF, Engie, TotalEnergies"], ["Sous-traitants de maintenance", "Spie, Fayat, Bouygues Energies & Services"], ["Transport", "SNCF, RATP, compagnies aériennes"]],
    acces: ["BTS maintenance des systèmes, BUT génie industriel et maintenance, bac pro maintenance puis BTS : on est embauché·e dès le diplôme.", "L'alternance est la voie royale : les entreprises financent la formation.", "Cherche un contrat en intérim ou en CDD dans une usine : c'est aussi comme ça qu'on entre.", "Des habilitations électriques ou des certifications constructeur sont un plus."],
    net: [1, "Le marché manque de monde : un bon dossier et un stage sérieux suffisent."],
    sav: ["Mécanique, électricité, hydraulique et pneumatique", "Lecture de schémas électriques", "Diagnostic de panne", "Maintenance préventive et GMAO", "Sécurité et habilitations"],
    out: ["GMAO (Maximo, SAP PM)", "Multimètre, oscilloscope", "Habilitation électrique (H0B0, BR)"],
    evo: "Responsable de maintenance, technicien·ne méthodes, responsable d'atelier, ingénieur·e après un cycle complémentaire."
  },
  automaticien: {
    emp: [["Intégrateurs et bureaux d'études", "Sogeti, Spie, Actemium (VINCI), Fives, Endel"], ["Industriels", "Airbus, Safran, Renault, Stellantis, Danone, L'Oréal"], ["Fabricants d'automates et de robots", "Schneider Electric, Siemens, Rockwell Automation, Stäubli"], ["Énergie et process", "EDF, Engie, TotalEnergies, chimie"]],
    acces: ["BTS CIEL ou électrotechnique, BUT GEII, école d'ingénieurs : on commence souvent comme technicien·ne puis on évolue.", "L'alternance est très appréciée dans l'industrie.", "Participe à des concours de robotique (Coupe de France de robotique, Eurobot) : tu apprends et tu te fais repérer.", "Les entretiens contiennent souvent un test de programmation d'automate ou de logique."],
    net: [1, "Les entreprises industrielles recrutent beaucoup : le dossier et un stage convaincant suffisent."],
    sav: ["Électricité et électronique de base", "Programmation d'automates (Grafcet, langage ladder)", "Capteurs, actionneurs, réseaux industriels", "Robotique", "Sécurité des machines"],
    out: ["TIA Portal (Siemens), EcoStruxure (Schneider)", "Logiciels de supervision", "Cobot et robots industriels"],
    evo: "Chef de projet automatisme, responsable d'un site automatisé, ingénieur·e robotique."
  },
  "tech-labo": {
    emp: [["Industrie pharmaceutique et cosmétique", "Sanofi, L'Oréal, Servier, Pierre Fabre"], ["Agroalimentaire", "Danone, Lactalis, Nestlé"], ["Laboratoires d'analyses et de contrôle", "Eurofins, Biogroup, Cerballiance, Mérieux"], ["Recherche publique", "CNRS, Inserm, INRAE, CEA, hôpitaux"]],
    acces: ["BTS bioanalyses et contrôles, BTS métiers de la chimie, BUT chimie ou génie biologique : on est embauché·e dès le diplôme.", "L'alternance est courante et recommandée.", "Les stages en laboratoire te font acquérir la rigueur recherchée (traçabilité, bonnes pratiques).", "Un laboratoire en secteur réglementé (pharma, agro) exige des bonnes pratiques de laboratoire."],
    net: [1, "Le dossier et les stages comptent plus que le réseau."],
    sav: ["Chimie et biologie de base", "Techniques d'analyse (chromatographie, spectrométrie, PCR)", "Bonnes pratiques de laboratoire (BPL)", "Traçabilité et qualité", "Sécurité chimique et biologique"],
    out: ["Logiciels de laboratoire (LIMS)", "Appareils d'analyse", "Excel et statistiques de base"],
    evo: "Responsable de laboratoire, ingénieur·e qualité, technicien·ne supérieur·e puis ingénieur·e par un cycle complémentaire."
  },
  "meca-aero": {
    emp: [["Compagnies aériennes", "Air France, Air France Industries, easyJet, Transavia"], ["Constructeurs", "Airbus, ATR, Dassault Aviation"], ["Maintenance et équipementiers", "Safran, Air France Industries KLM Engineering & Maintenance, Thales, Sabena Technics"], ["Armée et aviation générale", "Armée de l'air, ALAT, aéroclubs"]],
    acces: ["Bac pro aéronautique puis BTS aéronautique : le BTS est la voie royale vers la licence B1 ou B2.", "La licence de maintenance européenne (EASA Part 66) se prépare en école agréée Part 147 : sans elle, on ne signe pas de travail sur avion.", "L'alternance est très appréciée : de grandes entreprises (Air France, Airbus) l'ont pour recruter.", "Les entretiens contiennent un test technique et vérifient ta rigueur et ton anglais technique."],
    net: [1, "Les employeurs recrutent via les écoles agréées et l'alternance : la réputation de ton centre de formation compte."],
    sav: ["Mécanique générale, aérodynamique de base", "Électricité et avionique", "Réglementation EASA (Part 66, Part 145)", "Lecture de documentation technique en anglais", "Rigueur et traçabilité"],
    out: ["Licence B1 / B2 (EASA Part 66)", "Outils de mesure et de contrôle", "Manuels techniques constructeur"],
    evo: "Chef d'équipe, responsable de hangar, ingénieur·e après une formation complémentaire."
  }
});
