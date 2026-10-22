/* Fiches métiers supplémentaires : qui recrute, comment y entrer, ce qu'il faut savoir (5/6 : santé, numérique, industrie, commerce, droit). Format : voir metiers-acces-1.js. */
A.METIERS_ACCES = A.METIERS_ACCES || {};
Object.assign(A.METIERS_ACCES, {
  dentiste: {
    emp: [["Cabinet libéral", "Cabinet seul, en association ou en collaboration avec un·e confrère·sœur"], ["Centres de santé dentaires", "Centres dentaires mutualistes, municipaux ou associatifs, réseaux de centres"], ["Hôpitaux et CHU", "Services d'odontologie des CHU (soins, urgences, enseignement)"], ["Autres", "Armée, industrie dentaire, recherche, assurance"]],
    acces: ["Entrer par PASS ou L.AS, puis réussir la sélection en fin de 1re année : les places en odontologie sont comptées.", "Les 6 années (cycle court) sont suivies d'un stage actif : on soigne dès la 4e année en clinique universitaire.", "On s'installe souvent après 1 à 2 ans de collaboration ou de remplacement dans un cabinet existant.", "Pour une spécialité (orthodontie, chirurgie orale), il faut un internat à l'issue d'un concours."],
    net: [2, "Pour t'installer ou reprendre un cabinet, le réseau de confrères et d'ancien·nes de ta fac compte beaucoup."],
    sav: ["Anatomie de la bouche et du visage", "Soins conservateurs, prothèses, chirurgie orale", "Hygiène, asepsie, radioprotection", "Gestion d'un cabinet (comptabilité, personnel)", "Relation avec les patients anxieux"],
    out: ["Fauteuil, fraise, radiographie numérique", "Logiciels de gestion de cabinet", "CFAO (empreintes numériques)"],
    evo: "Installation à son compte, associé·e de cabinet, spécialiste (orthodontiste, chirurgien·ne oral·e), enseignant·e en odontologie."
  },
  ergotherapeute: {
    emp: [["Hôpitaux et centres de rééducation", "CHU, centres de réadaptation fonctionnelle"], ["Structures médico-sociales", "Instituts pour enfants handicapés, EHPAD, foyers"], ["Libéral", "Cabinet d'ergothérapie ou interventions à domicile"], ["Entreprises et collectivités", "Conseil en ergonomie, aménagement de postes de travail"]],
    acces: ["Candidature sur Parcoursup pour un institut de formation en ergothérapie (3 ans) : dossier et parfois épreuves ou entretien.", "Les stages (environ un an au total) te font connaître des équipes et déterminent souvent ton premier poste.", "Les postes sont nombreux : le métier est en pénurie dans beaucoup de régions.", "Tu peux te spécialiser (main, gériatrie, handicap psychique) par des diplômes universitaires."],
    net: [1, "Les services manquent d'ergothérapeutes : le diplôme et les stages suffisent."],
    sav: ["Anatomie, physiologie, neurologie", "Activités de la vie quotidienne et analyse de l'activité", "Aides techniques et aménagement du logement", "Rééducation de la main et du membre supérieur", "Relation avec les familles et les équipes"],
    out: ["Orthèses et aides techniques", "Logiciels de dessin ou de modélisation", "Bilans standardisés"],
    evo: "Cadre de santé, ergothérapeute spécialisé·e, formateur·rice, consultant·e en ergonomie."
  },
  osteopathe: {
    emp: [["Cabinet libéral", "La grande majorité des ostéopathes sont installé·es à leur compte"], ["Cabinets de groupe et centres de santé", "Cabinets pluridisciplinaires avec kinés et médecins"], ["Sport", "Clubs sportifs professionnels, fédérations"], ["Autres", "Maisons de retraite, entreprises (prévention des troubles musculosquelettiques)"]],
    acces: ["Entrer dans une école agréée par le ministère de la Santé (5 ans) : admission sur dossier et entretien, parfois via Parcoursup ou après une L.AS ou PASS.", "Les frais de scolarité sont élevés (souvent plusieurs milliers d'euros par an) : renseigne-toi sur les prêts et les aides des écoles.", "Les stages en clinique de l'école te forment aux consultations réelles.", "Comme kiné ou dentiste, beaucoup démarrent par des remplacements ou une collaboration avant de s'installer."],
    net: [3, "La clientèle se construit par le bouche-à-oreille et les recommandations de médecins, kinés et sportifs : le réseau est décisif."],
    sav: ["Anatomie et biomécanique", "Physiologie et pathologie", "Techniques manuelles (structurelles, viscérales, crâniennes)", "Diagnostic d'exclusion (savoir orienter vers un médecin)", "Gestion d'un cabinet"],
    out: ["Table de consultation", "Logiciel de gestion de cabinet", "Formation continue obligatoire"],
    evo: "Installation seul·e ou en cabinet de groupe, spécialisation (sport, pédiatrie), enseignement en école."
  },
  dieteticien: {
    emp: [["Hôpitaux et cliniques", "CHU, centres de soins, services de nutrition"], ["Restauration collective", "Sodexo, Elior, Compass, cantines scolaires et d'hôpitaux"], ["Libéral", "Cabinet de diététique ou de nutrition"], ["Industrie agroalimentaire et sport", "Danone, Nestlé, clubs sportifs, applications de nutrition"]],
    acces: ["BTS diététique (2 ans) ou BUT génie biologique parcours diététique (3 ans) : admission sur Parcoursup.", "Les stages (en hôpital, en restauration collective) sont obligatoires et te donnent tes premiers contacts.", "Pour s'installer, il faut déclarer son diplôme à l'ARS : le titre est protégé.", "Démarche une spécialité (nutrition du sportif, troubles du comportement alimentaire) par des formations complémentaires."],
    net: [2, "En libéral, ta réputation et les recommandations de médecins comptent ; en hôpital ou restauration collective, le dossier suffit."],
    sav: ["Nutrition, diététique thérapeutique", "Biochimie et physiologie", "Équilibre alimentaire et textes officiels (PNNS)", "Techniques d'entretien et d'éducation thérapeutique", "Gestion de la restauration collective"],
    out: ["Logiciels d'analyse nutritionnelle", "Tables de composition des aliments (Ciqual)", "Outils de suivi patient"],
    evo: "Diététicien·ne spécialisé·e, responsable qualité en restauration collective, installation à son compte, formateur·rice."
  },
  opticien: {
    emp: [["Chaînes d'optique", "Optic 2000, Krys, Afflelou, Générale d'Optique, Atol, Optical Center"], ["Opticiens indépendants", "Magasin local, souvent un commerce familial"], ["Industrie et laboratoires", "Essilor, Zeiss, Hoya, Ophtalmic Compagnie"], ["Santé", "Cliniques ophtalmologiques, cabinets d'ophtalmologistes"]],
    acces: ["BTS opticien lunetier (2 ans) : admission sur Parcoursup, avec un fort taux d'alternance.", "L'alternance est la voie principale : les chaînes recrutent beaucoup d'apprenti·es.", "Pour ouvrir ton magasin, le diplôme d'opticien est obligatoire et un capital de départ est nécessaire.", "Après quelques années, on peut évoluer vers l'audioprothèse ou la contactologie avec des diplômes complémentaires."],
    net: [1, "Les chaînes recrutent régulièrement : le diplôme et l'alternance suffisent."],
    sav: ["Optique géométrique et physiologique", "Montage et réglage des lunettes", "Réfraction (mesure de la vue)", "Remboursements et mutuelles", "Conseil et vente"],
    out: ["Frontofocomètre, réfractomètre", "Machine de taillage de verres", "Logiciels de gestion de magasin"],
    evo: "Responsable de magasin, opticien·ne indépendant·e, formateur·rice, spécialisation en contactologie ou basse vision."
  },
  psychomotricien: {
    emp: [["Structures de soin", "Hôpitaux, centres de rééducation, CMP"], ["Structures médico-sociales pour enfants", "IME, SESSAD, centres d'action médico-sociale précoce"], ["Libéral", "Cabinet seul ou partagé"], ["Établissements pour personnes âgées", "EHPAD, unités Alzheimer"]],
    acces: ["Entrer dans un institut de formation en psychomotricité (3 ans) : admission sur concours, dossier ou Parcoursup selon l'institut.", "Prépare-toi aux épreuves (culture générale, biologie, entretien) : le nombre de places est limité.", "Les stages sont nombreux et décisifs pour trouver un premier poste.", "Les postes sont nombreux en structure ; le libéral demande de construire une clientèle."],
    net: [1, "Le métier manque de professionnel·les : le diplôme et les stages suffisent."],
    sav: ["Développement psychomoteur de l'enfant", "Neurologie et psychopathologie", "Techniques de relaxation et d'expression corporelle", "Bilan psychomoteur et projet thérapeutique", "Travail avec les familles et les équipes"],
    out: ["Batteries de tests (Bender, NEPSY, M-ABC)", "Matériel de motricité et de relaxation", "Logiciels de suivi"],
    evo: "Psychomotricien·ne spécialisé·e, cadre de santé, formateur·rice, installation en libéral."
  },
  devops: {
    emp: [["ESN et conseil", "Capgemini, Sopra Steria, Accenture, Atos, Wavestone"], ["Éditeurs et scale-up", "Doctolib, Criteo, Datadog, OVHcloud, Scaleway, Qonto"], ["Banques, assurances, grands groupes", "BNP Paribas, AXA, Société Générale, Orange, SNCF"], ["Fournisseurs de cloud", "AWS, Google Cloud, Microsoft Azure (équipes en France)"]],
    acces: ["Bac+3 à bac+5 en informatique : école d'ingénieurs, master, BUT puis licence pro ou école spécialisée.", "L'alternance est très répandue : elle place directement dans une équipe d'exploitation ou de plateforme.", "Entraîne-toi sur un compte cloud gratuit, déploie un projet personnel et montre-le sur GitHub.", "Passe une certification cloud (AWS Cloud Practitioner puis Solutions Architect, Azure AZ-104, Google ACE) : elles pèsent beaucoup dans les entretiens."],
    net: [2, "Les cooptations et les communautés (meetups, DevOps Days) sont fréquentes ; un bon profil GitHub et une certification ouvrent aussi des portes."],
    sav: ["Linux et ligne de commande", "Réseau, DNS, HTTP", "Docker et Kubernetes", "Intégration et déploiement continus (CI/CD)", "Infrastructure as code (Terraform, Ansible)", "Supervision et gestion d'incidents"],
    out: ["Git, GitLab CI ou GitHub Actions", "Terraform, Ansible, Helm", "Prometheus, Grafana", "Certifications AWS, Azure, Kubernetes (CKA)"],
    evo: "DevOps senior, ingénieur·e fiabilité (SRE), architecte cloud, responsable infrastructure."
  },
  "data-analyst": {
    emp: [["Banques et assurances", "BNP Paribas, AXA, Société Générale, Crédit Agricole"], ["Grande distribution et e-commerce", "Carrefour, Decathlon, Cdiscount, Leroy Merlin, Amazon"], ["Conseil et ESN", "Capgemini, Accenture, Sopra Steria, cabinets spécialisés"], ["Start-up et scale-up", "Doctolib, Back Market, BlaBlaCar, Alan, Contentsquare"]],
    acces: ["BUT STID (statistique et informatique décisionnelle), licence maths-info ou éco, master en data, école de commerce ou d'ingénieurs.", "L'alternance ou le stage de 6 mois est le meilleur moyen d'être embauché·e.", "Monte un portfolio de 2 ou 3 analyses sur des données ouvertes (data.gouv.fr, Kaggle) avec un tableau de bord en ligne.", "Les entretiens contiennent un cas d'analyse, un exercice de SQL et une présentation à des non-spécialistes."],
    net: [1, "Les entreprises recrutent beaucoup d'analystes : un bon portfolio et une expérience suffisent."],
    sav: ["Statistiques de base (moyenne, corrélation, tests)", "SQL", "Excel avancé (tableaux croisés dynamiques)", "Visualisation et récit de données", "Notions de Python ou de R"],
    out: ["SQL", "Power BI, Tableau, Looker", "Excel", "Python (pandas), notions de Git"],
    evo: "Data analyst senior, analytics engineer, data scientist, responsable BI, chief data officer."
  },
  "dev-mobile": {
    emp: [["Start-up et scale-up", "Doctolib, BlaBlaCar, Back Market, Deezer, Qonto, Alan"], ["Éditeurs de jeux et d'applications", "Ubisoft, Gameloft, Voodoo, Ankama"], ["Banques et grands groupes", "BNP Paribas, Société Générale, Carrefour, Decathlon, SNCF"], ["ESN et agences", "Capgemini, Sopra Steria, agences d'applications mobiles"]],
    acces: ["BTS SIO option SLAM, BUT informatique, licence ou école d'ingénieurs : on peut démarrer dès Bac+2.", "Publie une application sur l'App Store ou le Play Store, même simple : c'est ta meilleure carte de visite.", "L'alternance est très répandue : de nombreuses équipes forment des apprenti·es.", "Choisis une technologie (Swift, Kotlin, Flutter, React Native) et approfondis-la avant de t'élargir."],
    net: [2, "Un portfolio et une appli publiée comptent plus que le réseau, mais les cooptations restent fréquentes."],
    sav: ["Un langage mobile (Swift, Kotlin, Dart ou TypeScript)", "Interfaces adaptatives et accessibilité", "Appels d'API et gestion des données locales", "Tests et publication sur les stores", "Notions de sécurité et de performance"],
    out: ["Xcode, Android Studio", "Flutter ou React Native", "Git, Firebase", "Figma pour les maquettes"],
    evo: "Développeur·se mobile senior, lead mobile, architecte, product manager, freelance."
  },
  "technicien-support": {
    emp: [["ESN et infogéreurs", "Capgemini, Sopra Steria, Econocom, Computacenter, Orange Business"], ["Directions informatiques", "DSI de grandes entreprises, hôpitaux, collectivités"], ["Distributeurs et prestataires", "Fnac Darty, Boulanger, Apple Store, prestataires de support"], ["Éditeurs", "Services clients techniques de Microsoft, Salesforce, éditeurs français"]],
    acces: ["BTS SIO option SISR, BUT réseaux et télécoms ou bac pro SN : on est recruté·e dès le diplôme.", "L'alternance est la voie la plus rapide : tu travailles sur de vrais tickets dès la première année.", "Passe une certification simple (CompTIA A+, Microsoft MD-102, ITIL Foundation) : elle rassure les recruteurs.", "Montre ta patience et ta pédagogie : les entretiens simulent souvent un dépannage avec un utilisateur."],
    net: [1, "Les recrutements sont réguliers : un CV avec une alternance ou un stage suffit."],
    sav: ["Windows, macOS, bases de Linux", "Réseau (adresse IP, DNS, Wi-Fi)", "Gestion de tickets (ITIL)", "Microsoft 365 et Active Directory", "Communication claire avec les utilisateurs"],
    out: ["Outils de ticketing (GLPI, ServiceNow, Jira Service Management)", "Prise en main à distance", "Certifications CompTIA A+, ITIL"],
    evo: "Technicien·ne niveau 2 ou 3, administrateur·rice systèmes et réseaux, responsable support, chef·fe de projet."
  },
  "chef-projet-it": {
    emp: [["ESN et conseil", "Capgemini, Sopra Steria, Accenture, Atos, Wavestone"], ["Directions informatiques", "DSI de banques, assurances, industrie, distribution"], ["Éditeurs et start-up", "Éditeurs de logiciels, scale-up, agences digitales"], ["Secteur public", "Ministères, collectivités, hôpitaux"]],
    acces: ["Pas de diplôme unique : école d'ingénieurs, master informatique ou MIAGE, école de commerce avec option SI.", "On devient souvent chef·fe de projet après 3 à 5 ans comme développeur·se, analyste ou consultant·e.", "L'alternance en maîtrise d'ouvrage (MOA) ou en PMO est une porte d'entrée directe.", "Certifications recherchées : PMP, Prince2, Scrum Master, ITIL."],
    net: [2, "Beaucoup de postes se trouvent par promotion interne ou cooptation ; ton réseau de collègues et d'anciens clients compte."],
    sav: ["Planning, budget, gestion des risques", "Méthodes agiles (Scrum, Kanban) et cycle en V", "Notions techniques (architecture, bases de données)", "Cahier des charges et recette", "Gestion d'équipe et de parties prenantes"],
    out: ["Jira, Confluence, MS Project", "Excel, PowerPoint", "Certifications PMP, Prince2, Scrum Master"],
    evo: "Directeur·rice de projet, responsable de programme, DSI, consultant·e senior."
  },
  soudeur: {
    emp: [["Chaudronnerie et construction métallique", "PME de fabrication, constructeurs de cuves, Fives, Vallourec"], ["Chantiers navals", "Naval Group, Chantiers de l'Atlantique, CMN"], ["Aéronautique et nucléaire", "Airbus, Safran, Framatome, Orano"], ["Énergie et pétrochimie", "TotalEnergies, Technip Energies, Vinci Énergies, entreprises d'intervention"]],
    acces: ["CAP réalisations industrielles en chaudronnerie ou bac pro TCI (technicien·ne en chaudronnerie industrielle), puis certification de soudeur·se.", "L'apprentissage est la voie royale : les industriels forment et gardent leurs apprenti·es.", "Les certifications (norme ISO 9606 ou qualification nucléaire) sont décisives pour décrocher les postes les mieux payés.", "L'intérim est un bon point d'entrée pour essayer plusieurs entreprises et se faire repérer."],
    net: [1, "Les entreprises manquent de soudeur·ses : une qualification et un bon essai suffisent."],
    sav: ["Procédés de soudage (MIG, MAG, TIG, arc)", "Lecture de plans et de repères de soudure", "Métaux et leur comportement à la chaleur", "Contrôle non destructif de base", "Sécurité (fumées, EPI, travail en hauteur)"],
    out: ["Poste à souder (MIG/MAG, TIG)", "Qualification de soudeur (ISO 9606)", "Habilitation nucléaire selon le site"],
    evo: "Chef·fe d'équipe, contrôleur·se de soudure, coordinateur·rice de soudage, créateur·rice d'entreprise."
  },
  "ingenieur-energie": {
    emp: [["Producteurs et fournisseurs d'énergie", "EDF, Engie, TotalEnergies, Voltalia, Neoen"], ["Bureaux d'études et conseil", "Artelia, Setec, Egis, Tractebel, cabinets spécialisés"], ["Industrie et équipementiers", "Schneider Electric, Siemens, Legrand, Vestas"], ["Collectivités et organismes publics", "ADEME, régions, métropoles, gestionnaires de réseau (RTE, Enedis)"]],
    acces: ["École d'ingénieurs avec parcours énergie (INSA, Centrale, Mines, Polytech, ENSE3…) ou master en énergie et transition.", "Les stages (6 mois de fin d'études) chez un énergéticien ou en bureau d'études sont le chemin d'embauche le plus courant.", "Des certifications comme celles de la RE2020 ou de gestion de projet appuient ton profil.", "Le secteur recrute aussi par VIE (volontariat international en entreprise) sur des projets à l'étranger."],
    net: [2, "Les anciens de ton école et les forums entreprises aident, sans être indispensables."],
    sav: ["Thermodynamique et transferts de chaleur", "Électricité, réseaux et stockage", "Énergies renouvelables (solaire, éolien, biomasse, hydrogène)", "Réglementation énergétique (RE2020, DPE)", "Gestion de projet et analyse économique"],
    out: ["Logiciels de simulation (Pleiades, TRNSYS, PVsyst)", "Python, MATLAB, Excel", "Anglais technique"],
    evo: "Chef·fe de projet énergie, responsable d'études, directeur·rice de site, consultant·e en transition."
  },
  "responsable-qualite": {
    emp: [["Industrie", "Airbus, Safran, Michelin, Renault, Stellantis, Schneider Electric"], ["Agroalimentaire", "Danone, Lactalis, Nestlé, Bonduelle"], ["Santé et pharma", "Sanofi, laboratoires, hôpitaux, fabricants de dispositifs médicaux"], ["Services et organismes de certification", "Bureau Veritas, SGS, AFNOR, cabinets de conseil qualité"]],
    acces: ["BUT mesures physiques, génie industriel ou génie biologique, licence pro qualité, ou école d'ingénieurs avec option qualité.", "L'alternance en qualité est très répandue et débouche souvent sur un CDI.", "Prépare des certifications (auditeur ISO 9001, Lean Six Sigma Green Belt) : elles sont recherchées.", "Les entretiens demandent d'analyser un cas de non-conformité ou de proposer un plan d'amélioration."],
    net: [1, "Le métier recrute dans tous les secteurs : un bon dossier et une alternance suffisent."],
    sav: ["Normes ISO 9001, 14001, 45001", "Audit interne et externe", "Outils qualité (8D, AMDEC, Pareto, 5 pourquoi)", "Statistiques de base (cartes de contrôle)", "Gestion des non-conformités et des réclamations"],
    out: ["Excel, Power BI", "Logiciels qualité (Qualiac, Enovia)", "Certifications Lean Six Sigma, auditeur ISO"],
    evo: "Responsable qualité senior, directeur·rice qualité, auditeur·rice, consultant·e, responsable QHSE."
  },
  acheteur: {
    emp: [["Industrie", "Airbus, Safran, Renault, Stellantis, Schneider Electric, Michelin"], ["Grande distribution et luxe", "Carrefour, Leclerc, LVMH, Kering, L'Oréal"], ["Services et conseil", "Capgemini, Orange, banques, cabinets d'achat"], ["Secteur public", "UGAP, ministères, collectivités, hôpitaux"]],
    acces: ["BUT TC ou GEA, licence pro achats, école de commerce, école d'ingénieurs ou master achats-logistique.", "L'alternance en achats est très recherchée : elle est un vrai raccourci vers le premier poste.", "Les entretiens contiennent une simulation de négociation et un cas chiffré.", "Une première expérience d'assistant·e acheteur·se ou en logistique ouvre ensuite aux postes d'acheteur·se."],
    net: [2, "Les anciens d'école et les contacts en alternance aident, mais le dossier et la négociation en entretien comptent beaucoup."],
    sav: ["Négociation commerciale", "Analyse des coûts et des offres", "Droit des contrats et marchés publics", "Excel et indicateurs", "Anglais courant"],
    out: ["ERP (SAP, Oracle)", "Excel avancé", "Outils d'e-procurement (Coupa, Ariba)", "Certifications CDAF ou CIPS"],
    evo: "Acheteur·se senior, responsable achats, directeur·rice des achats, consultant·e achats."
  },
  "agent-immobilier": {
    emp: [["Réseaux d'agences", "Century 21, Orpi, Laforêt, Guy Hoquet, Nestenn, IAD"], ["Agences indépendantes", "Agence de quartier, souvent familiale"], ["Promoteurs et gestionnaires", "Nexity, Foncia, Bouygues Immobilier, Icade, bailleurs sociaux"], ["Notariat et conseil", "Notaires, chasseurs de biens, cabinets de gestion de patrimoine"]],
    acces: ["BTS professions immobilières, BUT TC, licence pro métiers de l'immobilier : on peut aussi démarrer avec un bac et une formation interne.", "L'alternance est très répandue : les réseaux d'agences recrutent des apprenti·es chaque année.", "Pour exercer, il faut une carte professionnelle (transaction, gestion) : l'employeur ou la CCI t'accompagne.", "Certains réseaux recrutent des négociateur·rices indépendant·es à la commission : c'est une entrée facile mais exigeante."],
    net: [3, "La clientèle se construit sur ta réputation : ton réseau personnel, les recommandations de clients et d'élus locaux pèsent beaucoup."],
    sav: ["Droit de l'immobilier (vente, bail, copropriété)", "Estimation d'un bien", "Négociation et prospection", "Fiscalité immobilière de base", "Diagnostics et urbanisme"],
    out: ["Logiciels de gestion immobilière (Hektor, Apimo)", "Carte professionnelle", "Portails d'annonces et CRM"],
    evo: "Responsable d'agence, directeur·rice de réseau, installation en indépendant·e, expert·e immobilier·ère."
  },
  entrepreneur: {
    emp: [["Création de sa propre entreprise", "Micro-entreprise, SAS, SARL, associations"], ["Incubateurs et accélérateurs", "Station F, Wilco, Réseau Entreprendre, incubateurs d'écoles"], ["Financement", "Bpifrance, business angels, banques, crowdfunding, aides régionales"], ["Reprise d'entreprise", "Reprise d'une PME, d'un commerce ou d'une exploitation"]],
    acces: ["Aucun diplôme n'est obligatoire : on peut démarrer en micro-entreprise dès 18 ans, voire plus tôt avec un statut d'étudiant-entrepreneur.", "Le statut national d'étudiant-entrepreneur (PEPITE) permet de monter ton projet pendant tes études, avec un tuteur et un accès à des incubateurs.", "Teste ton idée vite : premiers clients, prototype ou site, avant d'investir.", "Forme-toi à la gestion, à la vente et à la comptabilité : les écoles, la CCI et les réseaux d'entrepreneur·es proposent des programmes gratuits ou peu chers."],
    net: [3, "Le réseau est essentiel : mentors, clients, investisseurs et pair·es te donnent contacts, conseils et premiers contrats."],
    sav: ["Vente et prospection", "Notions de comptabilité et de trésorerie", "Droit de base (statuts, contrats, propriété intellectuelle)", "Marketing et communication", "Gestion du risque et résilience"],
    out: ["Statut de micro-entrepreneur (URSSAF)", "Outils de gestion (Shine, Pennylane, Qonto)", "Réseaux (Réseau Entreprendre, French Tech, BNI)"],
    evo: "Dirigeant·e d'une PME, serial entrepreneur·e, investisseur·se, repreneur·se."
  },
  "conseiller-assurance": {
    emp: [["Assureurs", "AXA, Allianz, Generali, Groupama, Covéa (MMA, GMF, MAAF), MACIF, MAIF"], ["Bancassurance", "Crédit Agricole (Pacifica), BNP Paribas Cardif, CNP Assurances"], ["Courtiers et agents généraux", "Cabinets de courtage, agences d'assurance indépendantes"], ["Mutuelles de santé", "Harmonie Mutuelle, MGEN, Malakoff Humanis"]],
    acces: ["BTS assurance (2 ans), BUT TC, licence pro assurance-banque-finance : on peut commencer dès Bac+2.", "L'alternance est très répandue : les assureurs recrutent chaque année des apprenti·es en agence.", "Une inscription à l'ORIAS est obligatoire pour conseiller et vendre : ton employeur ou une formation t'y prépare.", "Après quelques années, on peut devenir agent·e général·e (indépendant·e) ou courtier·ère."],
    net: [1, "Les assureurs recrutent beaucoup de juniors : le diplôme et l'alternance suffisent."],
    sav: ["Types de contrats (auto, habitation, santé, prévoyance, vie)", "Notions de droit des assurances", "Évaluation du risque", "Vente-conseil et relation client", "Gestion d'un sinistre"],
    out: ["Logiciels de gestion des contrats", "Inscription ORIAS", "Formation continue obligatoire (15 h par an)"],
    evo: "Conseiller·ère clientèle professionnelle, responsable d'agence, agent·e général·e, souscripteur·rice."
  },
  gendarme: {
    emp: [["Gendarmerie départementale", "Brigades territoriales, brigades de recherches, maisons de protection des familles"], ["Gendarmerie mobile", "Escadrons de maintien de l'ordre"], ["Unités spécialisées", "GIGN, sections de recherches, gendarmerie de l'air et maritime"], ["Services centraux et cyber", "Commandement de la gendarmerie dans le cyberespace, institut de recherche criminelle"]],
    acces: ["Engagement comme gendarme adjoint·e volontaire (sans concours, dès 17 ans) pour tester, puis concours de sous-officier·ère de gendarmerie (niveau bac).", "Pour devenir officier·ère, on passe un concours à Bac+3 ou Bac+5 (École des officiers de la gendarmerie nationale).", "Prépare des épreuves physiques (course, natation, tractions), des tests psychotechniques et un entretien.", "La formation dure environ 1 an en école (Montluçon, Chaumont, Rochefort, Tulle) avant la 1re affectation."],
    net: [1, "L'accès se fait sur concours et sélection : le réseau ne compte pas, la préparation oui."],
    sav: ["Procédure pénale et droit routier", "Rédaction de procès-verbaux", "Condition physique et tir", "Gestion de conflit et sang-froid", "Culture générale et actualité"],
    out: ["Concours de sous-officier·ère de gendarmerie", "Concours d'officier·ère (EOGN)", "Préparation physique"],
    evo: "Sous-officier·ère, adjudant·e, lieutenant·e (par concours interne), officier·ère, spécialisation (cyber, brigade de recherches, GIGN)."
  },
  douanier: {
    emp: [["Direction générale des douanes et droits indirects (DGDDI)", "Services aux frontières, ports, aéroports, services d'enquête (DNRED)"], ["Contrôle des marchandises", "Pôles d'action économique, laboratoires des douanes"], ["Surveillance et lutte anti-trafic", "Brigades de surveillance, garde-côtes, unités cynophiles"], ["Fiscalité", "Collecte de taxes (TVA à l'importation, alcool, tabac, carburants)"]],
    acces: ["Concours de contrôleur·se des douanes (niveau bac) ou d'inspecteur·rice (niveau Bac+3).", "Les épreuves portent sur la culture générale, le droit, l'économie et un oral : prépare-toi un an en avance.", "Les classes préparatoires intégrées (CPI) existent pour les étudiant·es boursier·ères.", "La formation initiale a lieu à l'École nationale des douanes (La Rochelle), puis tu pars en 1re affectation."],
    net: [1, "Concours national : le rang décide, le réseau compte peu."],
    sav: ["Droit douanier et fiscalité", "Économie internationale", "Procédure de contrôle et de perquisition", "Rédaction administrative", "Langues étrangères"],
    out: ["Concours de la douane (catégories B et A)", "Préparation intégrée (CPI) pour boursier·ères", "Anglais"],
    evo: "Inspecteur·rice, inspecteur·rice principal·e, chef·fe de bureau, directeur·rice régional·e."
  },
  "officier-armee": {
    emp: [["Armée de terre", "Régiments, état-major, unités de combat, de logistique et de renseignement"], ["Marine nationale", "Bâtiments de combat, sous-marins, aéronavale, fusiliers marins"], ["Armée de l'air et de l'espace", "Bases aériennes, commandement de l'espace, escadrons de chasse"], ["Services interarmées", "Santé, renseignement, cyberdéfense, gendarmerie"]],
    acces: ["Concours d'entrée aux écoles : Saint-Cyr Coëtquidan (après une prépa ou une licence), École navale, École de l'air et de l'espace, École des officiers de la gendarmerie.", "Une prépa littéraire ou scientifique est souvent la voie normale, mais il existe aussi des admissions sur titre (Bac+3).", "Tu es rémunéré·e dès l'école, et la scolarité est gratuite en échange d'un engagement de service.", "Prépare les épreuves sportives et un oral : les écoles évaluent aussi le leadership et la motivation."],
    net: [1, "Concours national : le rang décide, pas le réseau."],
    sav: ["Géopolitique et culture militaire", "Mathématiques ou lettres (selon la voie)", "Leadership et management d'équipe", "Condition physique", "Langues, surtout l'anglais"],
    out: ["Concours Saint-Cyr, École navale, École de l'air", "Brevets militaires (parachutiste, pilote, plongeur)", "Préparation sportive"],
    evo: "Capitaine, commandant, colonel, général·e, officier·ère d'état-major, postes à l'international."
  }
});
