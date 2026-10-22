/* Fiches métiers : qui recrute, comment y entrer, ce qu'il faut savoir (2/4 : finance, commerce, conseil, produit). Voir metiers-acces-1.js pour le format. */
A.METIERS_ACCES = A.METIERS_ACCES || {};
Object.assign(A.METIERS_ACCES, {
  "analyste-ma": {
    emp: [
      ["Grandes banques d'affaires internationales (« bulge bracket »)", "Goldman Sachs, Morgan Stanley, J.P. Morgan, Bank of America, Citi, Deutsche Bank, Barclays, UBS", "Équipes à Paris et Londres, très gros deals, volumes importants."],
      ["Banques françaises et européennes", "BNP Paribas, Société Générale (CIB), Crédit Agricole CIB, Natixis, HSBC, Santander"],
      ["Boutiques indépendantes de conseil (le « haut de gamme » du M&A)", "Rothschild & Co, Lazard, Perella Weinberg, PJT Partners, Evercore, Centerview, Moelis, Houlihan Lokey", "Moins de volume mais des deals pointus ; les équipes sont petites et la responsabilité arrive vite."],
      ["Boutiques et banques du mid-market", "Oddo BHF, Cambon Partners, Clearwater International, Lincoln International, Eight Advisory, Ricol Lasteyrie, Arkéa Banque Entreprises et Institutionnels"],
      ["Cabinets d'audit et de conseil (équipes transactions)", "Deloitte, EY, KPMG, PwC (Transaction Services, Corporate Finance)", "Une porte d'entrée plus accessible, puis on peut basculer en banque."],
      ["Fonds d'investissement et directions de la stratégie", "Ardian, Eurazeo, PAI Partners ; directions « corporate development » de grands groupes (LVMH, TotalEnergies, Safran…)", "Souvent un second poste après 2 ou 3 ans en banque."]
    ],
    acces: [
      "Vise un stage de 6 mois pendant ton master 1 ou ton année de césure : c'est la porte d'entrée presque obligatoire. Les candidatures s'ouvrent un an à l'avance.",
      "Les recruteurs ciblent les grandes écoles de commerce (HEC, ESSEC, ESCP, EDHEC, emlyon), Dauphine, Sciences Po, et les écoles d'ingénieurs avec un master de finance. Le nom de l'école ouvre les entretiens, mais pas le poste.",
      "Rejoins les associations de finance de ton école (clubs de finance, concours d'investissement) : on y prépare les entretiens et on y rencontre les anciens.",
      "Fais d'abord un stage plus accessible (audit, conseil financier, banque de détail, fonds) pour construire ton CV : beaucoup de banquiers viennent de là.",
      "Prépare des entretiens techniques (comptabilité, valorisation, LBO) et des entretiens de motivation : chaque banque en enchaîne plusieurs, souvent avec des tests de calcul.",
      "Une fois en poste, on est « analyste » 2 à 3 ans, puis « associate ». Une grande partie des analystes quitte la banque pour un fonds ou une entreprise après 2 ou 3 ans."
    ],
    net: [3, "C'est l'un des métiers où le réseau compte le plus : alumni, cafés d'information, contacts LinkedIn et recommandations pèsent autant que le CV. Écris tôt à des anciens de ton école, pose des questions précises, remercie, puis reste en contact. Ça se travaille 12 à 18 mois avant les candidatures."],
    sav: ["Comptabilité : compte de résultat, bilan, tableau de flux", "Valorisation d'entreprise : actualisation des flux (DCF), multiples de comparables et de transactions", "Notions de LBO (rachat avec effet de levier)", "Excel et modélisation financière, présentation claire en PowerPoint", "Anglais courant, à l'écrit comme à l'oral", "Suivre l'actualité des deals (Les Échos, Financial Times, Mergermarket)"],
    out: ["Excel (raccourcis clavier, modèles) et PowerPoint", "Bloomberg, Capital IQ, FactSet, Refinitiv", "Mergermarket, Pitchbook", "Lectures : « Investment Banking » (Rosenbaum & Pearl), « Finance d'entreprise » (Vernimmen)", "Formations en ligne de modélisation (Wall Street Prep, Breaking Into Wall Street)"],
    evo: "Analyste (2-3 ans), associate, vice-president, director, managing director. Sorties fréquentes vers le private equity, un fonds de dette, la direction financière ou la stratégie d'un grand groupe."
  },
  "private-equity": {
    emp: [
      ["Grands fonds français", "Ardian, Eurazeo, PAI Partners, Tikehau Capital, Cinven (Paris), Bridgepoint (Paris)"],
      ["Fonds de taille moyenne", "Weinberg Capital Partners, Chequers Capital, Parquest, Argos Wityu, IK Partners"],
      ["Fonds internationaux (bureaux à Paris)", "KKR, Carlyle, EQT, CVC, Apollo, Permira"],
      ["Capital-risque et croissance (venture)", "Partech, Eurazeo Growth, Idinvest (Eurazeo), Alven, Index Ventures"],
      ["Investisseurs publics et familiaux", "Bpifrance, family offices, fonds de fonds"]
    ],
    acces: [
      "Le profil type est un ancien·ne analyste de 2 à 3 ans en banque d'affaires (M&A) ou en transaction services : l'entrée directe après l'école existe mais reste rare.",
      "Les fonds recrutent parfois via des cabinets spécialisés de chasse de têtes dès l'année suivant ton début en banque : sois visible sur LinkedIn et entretiens ces contacts.",
      "Un stage dans un fonds (en césure ou en M2) est possible, surtout dans les petits fonds et en capital-risque, mais très concurrentiel.",
      "Les entretiens contiennent un cas pratique de LBO ou de valorisation, souvent à faire à la maison en quelques heures, et un test de jugement d'investissement.",
      "En venture, on valorise surtout un portefeuille de projets (start-up, associations d'entrepreneurs) et une vraie connaissance d'un secteur."
    ],
    net: [3, "Le réseau est décisif : les postes se trouvent par des anciens de ton école, des banquiers et des chasseurs de têtes. Garde de bonnes relations avec les équipes avec qui tu travailles en banque."],
    sav: ["Modélisation LBO complète", "Analyse stratégique d'un secteur et d'une entreprise", "Lecture de documents juridiques de base (pacte d'actionnaires, SPA)", "Due diligence financière et commerciale", "Négociation, relation avec les dirigeants"],
    out: ["Excel avancé, PowerPoint", "Capital IQ, Pitchbook", "Notions de fiscalité des holdings"],
    evo: "Analyste, associate, principal, directeur d'investissement, partner. Sorties vers la direction générale d'une participation ou la création de son propre fonds."
  },
  trader: {
    emp: [
      ["Grandes banques de marché", "BNP Paribas, Société Générale, Natixis, Crédit Agricole CIB, J.P. Morgan, Goldman Sachs, Morgan Stanley"],
      ["Sociétés de gestion et hedge funds", "Amundi, Lazard Frères Gestion, Carmignac, Capital Fund Management, Qube, Millennium"],
      ["Négoce de matières premières", "TotalEnergies Trading, Trafigura, Vitol, Louis Dreyfus Company, Cargill"],
      ["Sociétés de trading pour compte propre", "Optiver, Citadel Securities, Jane Street, Flow Traders, Susquehanna (bureaux à Londres, Amsterdam, Paris)"]
    ],
    acces: [
      "Master de finance de marché, école d'ingénieurs (parcours mathématiques financières) ou école de commerce avec majeure marchés.",
      "Stage d'été puis stage de fin d'études en salle de marché ; la banque garde les meilleur·es pour l'embauche.",
      "Pour les rôles « quant » ou en trading algorithmique : maths, probabilités, code (Python, C++) sont décisifs, et des tests de logique mathématique s'ajoutent aux entretiens.",
      "Les entretiens ressemblent à des tests de calcul mental, de probabilités et de décision sous incertitude, plus un entretien de motivation.",
      "Les parcours en négoce de matières premières passent beaucoup par les écoles spécialisées (Genève, Londres) et les stages."
    ],
    net: [3, "Les salles de marché recrutent beaucoup par cooptation et alumni ; les stages d'été sont la meilleure manière d'être vu·e."],
    sav: ["Probabilités, statistiques, calcul stochastique de base", "Produits financiers (actions, taux, devises, dérivés)", "Fonctionnement des marchés et de la liquidité", "Gestion du risque et de la position", "Suivi de l'actualité économique mondiale"],
    out: ["Python, C++ ou R", "Excel, Bloomberg", "Plateformes d'exécution"],
    evo: "Trader junior, trader senior, responsable d'un desk, gérant·e de portefeuille, quant. Les postes sont en baisse dans les salles traditionnelles à cause de l'automatisation."
  },
  actuaire: {
    emp: [
      ["Assureurs", "AXA, CNP Assurances, Allianz France, Generali, Groupama, Covéa, MAIF"],
      ["Réassureurs", "SCOR, Munich Re, Swiss Re"],
      ["Cabinets de conseil actuariel", "Milliman, Willis Towers Watson, Mercer, Aon, Addactis, Actuaris"],
      ["Mutuelles et institutions de retraite", "Malakoff Humanis, Harmonie Mutuelle, AG2R La Mondiale, Agirc-Arrco"]
    ],
    acces: [
      "Master actuariat (ISFA Lyon, ENSAE, Dauphine, Paris-Saclay, ISUP, EURIA) ou école d'ingénieurs avec option actuariat, reconnu par l'Institut des actuaires.",
      "L'alternance est très répandue : un contrat de 1 ou 2 ans dans une compagnie d'assurance te fait entrer dans le métier.",
      "Prépare dès la licence maths-éco ou maths appliquées : le niveau en probabilités compte.",
      "Passe des examens de l'Institut des actuaires (certification) : ils sont reconnus par les employeurs.",
      "Les entretiens contiennent des exercices de probabilités et un cas sur un portefeuille d'assurance."
    ],
    net: [2, "Le milieu est petit : les promotions d'actuariat et les stages alimentent le réseau ; les alumni de ton master te recommandent facilement."],
    sav: ["Probabilités, statistiques, modèles de survie", "Mathématiques financières", "Fonctionnement d'un contrat d'assurance", "Réglementation de l'assurance (Solvabilité II)", "Programmation (R, Python, SAS) et SQL"],
    out: ["R, Python, SAS", "SQL", "Excel avancé", "Outils de modélisation actuarielle (Prophet, Igloo)"],
    evo: "Actuaire senior, responsable de la tarification, directeur technique, chief risk officer."
  },
  auditeur: {
    emp: [
      ["Les « Big Four »", "Deloitte, EY, KPMG, PwC", "Recrutent des milliers de jeunes diplômé·es par an ; formation structurée."],
      ["Cabinets de taille intermédiaire", "Mazars, BDO, Grant Thornton, RSM, Forvis Mazars, Baker Tilly"],
      ["Cabinets d'expertise comptable régionaux", "Cabinets indépendants, réseaux (In Extenso, Fiducial)"],
      ["Audit interne en entreprise", "Banques, groupes du CAC 40"]
    ],
    acces: [
      "Master comptabilité-contrôle-audit (CCA), DSCG, école de commerce majeure audit, ou école d'ingénieurs puis master.",
      "Stage de 6 mois (souvent en janvier-juin : la « busy season ») : les Big Four convertissent ensuite le stage en CDI.",
      "Candidate aux forums écoles-entreprises et aux concours d'études de cas : les Big Four recrutent en volume, le réseau est moins déterminant qu'en M&A.",
      "L'expertise comptable passe par le DEC (diplôme d'expertise comptable) : beaucoup préparent le DSCG en parallèle.",
      "Après 2 à 4 ans, beaucoup d'auditeur·rices passent en direction financière, en contrôle de gestion ou en banque d'affaires."
    ],
    net: [1, "Le recrutement est massif et standardisé : le dossier, les tests et l'entretien comptent plus que le réseau."],
    sav: ["Normes comptables (French GAAP, IFRS)", "Méthodologie d'audit (contrôle interne, échantillonnage)", "Comptabilité générale approfondie", "Fiscalité d'entreprise de base", "Excel et analyse de données", "Anglais"],
    out: ["Excel avancé", "Outils d'analyse de données (Power BI, Alteryx)", "ERP (SAP, Oracle)", "DCG et DSCG (diplômes de comptabilité)"],
    evo: "Senior, manager, directeur·rice, associé·e ; sortie fréquente vers la direction financière ou le contrôle de gestion."
  },
  "controleur-gestion": {
    emp: [["Grands groupes", "Danone, L'Oréal, LVMH, TotalEnergies, Airbus, Carrefour"], ["Banques et assurances", "BNP Paribas, AXA, Société Générale"], ["PME et ETI", "Entreprises de toutes tailles, souvent en direction administrative et financière"], ["Cabinets de conseil", "Les Big Four et cabinets spécialisés en pilotage de performance"]],
    acces: ["BUT GEA, licence de gestion puis master CCA ou finance, école de commerce, école d'ingénieurs avec master de gestion.", "L'alternance en contrôle de gestion est très courante et débouche souvent sur un CDI.", "Une première expérience en audit ou en comptabilité facilite l'accès aux grands groupes.", "Montre ta maîtrise d'Excel (tableaux croisés, macros, modèles) en entretien."],
    net: [1, "Les recrutements sont réguliers : les alternances et les stages suffisent."],
    sav: ["Comptabilité générale et analytique", "Budget, reporting, indicateurs de performance", "Analyse d'écarts", "Excel avancé et SQL de base", "Bases de la finance d'entreprise"],
    out: ["Excel, Power BI, Tableau", "ERP (SAP, Oracle) et outils de consolidation", "Anglais pour les groupes internationaux"],
    evo: "Responsable contrôle de gestion, directeur·rice financier·ère (DAF), directeur·rice administratif·ve et financier·ère."
  },
  "gestion-patrimoine": {
    emp: [["Banques privées", "BNP Paribas Wealth Management, Société Générale Private Banking, Rothschild & Co, Edmond de Rothschild"], ["Réseaux bancaires et assurances", "Crédit Agricole, Banque Populaire, AXA, Generali"], ["Cabinets indépendants (CGP)", "Cabinets de conseillers en gestion de patrimoine, plateformes de courtage"], ["Family offices et sociétés de gestion", "Amundi, Lazard Frères Gestion, family offices"]],
    acces: ["Licence ou master en gestion de patrimoine (universités, écoles de commerce) ; certains passent un diplôme universitaire après un BUT ou une licence.", "Le métier est réglementé : il faut une certification AMF et une inscription auprès de l'ORIAS (courtage et conseil en investissements).", "On débute souvent comme conseiller·ère clientèle en banque, puis on évolue vers le patrimonial.", "La prospection et la relation client sont essentielles : la clientèle se construit sur la confiance et la recommandation."],
    net: [3, "Beaucoup de clientèle vient du bouche-à-oreille ; le réseau personnel et professionnel pèse dès que l'on s'installe ou monte en gamme."],
    sav: ["Fiscalité du particulier (impôt sur le revenu, succession, immobilier)", "Droit civil (famille, régimes matrimoniaux, successions)", "Produits d'épargne (assurance-vie, PER, actions, immobilier)", "Déontologie et réglementation AMF", "Communication et vente de conseil"],
    out: ["Certification AMF", "Inscription ORIAS", "Logiciels de simulation patrimoniale", "Excel"],
    evo: "Conseiller·ère senior, banquier·ère privé, directeur·rice d'agence, installation en indépendant·e."
  },
  "risk-manager": {
    emp: [["Banques", "BNP Paribas, Société Générale, Crédit Agricole, Natixis, HSBC"], ["Assurances et réassurances", "AXA, CNP Assurances, SCOR, Allianz"], ["Régulateurs et institutions", "Banque de France, ACPR, Autorité des marchés financiers"], ["Cabinets de conseil et grands groupes", "Wavestone, Accenture, KPMG ; directions des risques de l'industrie et de l'énergie"]],
    acces: ["Master de finance, d'actuariat ou de gestion des risques ; école d'ingénieurs avec option finance.", "Commence souvent en stage ou en alternance dans une direction des risques ou en audit interne.", "Prépare les certifications FRM ou PRM : elles sont reconnues par les banques.", "Les régulateurs (Banque de France, ACPR) recrutent par concours et par candidature directe."],
    net: [2, "Les contacts de stage et d'alternance sont précieux ; le métier est moins « réseau » que la banque d'affaires."],
    sav: ["Risque de marché, de crédit, de liquidité, opérationnel", "Statistiques et modèles de risque (VaR)", "Réglementation bancaire (Bâle III, Solvabilité II)", "Programmation (Python, SQL)", "Capacité à synthétiser pour la direction"],
    out: ["Python, R, SQL", "Excel avancé", "Certifications FRM, PRM"],
    evo: "Responsable des risques d'un métier, directeur·rice des risques (CRO), régulateur."
  },
  "analyste-esg": {
    emp: [["Sociétés de gestion", "Amundi, Mirova (Natixis), Candriam, BNP Paribas Asset Management"], ["Agences de notation extra-financière", "MSCI, Sustainalytics (Morningstar), Moody's ESG, Ethifinance"], ["Banques et assurances", "BNP Paribas, AXA, Crédit Agricole, Société Générale"], ["Cabinets et entreprises", "Cabinets de conseil en développement durable, directions RSE de grands groupes"]],
    acces: ["Master de finance durable, d'économie de l'environnement ou école de commerce/ingénieurs avec option finance verte.", "Stage ou alternance dans une société de gestion ou une banque : beaucoup d'équipes ESG recrutent des juniors.", "Passe des certifications reconnues (CFA ESG, Finance for Climate, SFDR basics).", "Tiens-toi au courant de la réglementation européenne (CSRD, taxonomie, SFDR) : elle structure le métier."],
    net: [2, "Le secteur est jeune et en croissance : les événements, les associations et les alumni aident à se faire connaître."],
    sav: ["Bases de l'analyse financière", "Enjeux climatiques et sociaux, notions de science du climat", "Réglementation européenne (CSRD, taxonomie, SFDR)", "Lecture de rapports de durabilité", "Statistiques et analyse de données"],
    out: ["Excel, Python", "Bases de données ESG (MSCI, Bloomberg, Sustainalytics)", "Certifications CFA ESG"],
    evo: "Analyste senior, responsable de l'investissement responsable, directeur·rice RSE."
  },
  comptable: {
    emp: [["Cabinets d'expertise comptable", "Mazars, BDO, Grant Thornton, In Extenso, cabinets régionaux"], ["Entreprises de toutes tailles", "Services comptabilité des PME, ETI et grands groupes"], ["Associations et collectivités", "Mairies, hôpitaux, associations"], ["Banques et assurances", "Services comptables et de contrôle"]],
    acces: ["BTS comptabilité et gestion, BUT GEA, DCG : on est embauché·e dès bac+2 ou bac+3.", "L'alternance est la voie classique : les cabinets forment leurs futur·es comptables.", "Un stage ou un contrat en cabinet est la meilleure manière de démarrer.", "Les entretiens vérifient la rigueur, l'aisance avec Excel et la connaissance d'un logiciel comptable."],
    net: [1, "Le métier recrute dans toute la France : un bon dossier et un stage suffisent."],
    sav: ["Comptabilité générale (écritures, bilan, résultat)", "TVA et fiscalité courante", "Paie de base", "Excel", "Rigueur et respect des échéances"],
    out: ["Logiciels comptables (Sage, EBP, Cegid, QuickBooks)", "Excel", "DCG puis DSCG pour évoluer"],
    evo: "Chef·fe comptable, responsable comptable, expert·e-comptable (DEC), contrôleur·se de gestion."
  },
  "expert-comptable": {
    emp: [["Cabinets de dimension internationale", "Deloitte, EY, KPMG, PwC, Mazars"], ["Cabinets indépendants et réseaux", "In Extenso, Fiducial, Baker Tilly, cabinets régionaux"], ["Installation à son compte", "Reprise ou création d'un cabinet"], ["Entreprises", "Directions financières (poste de DAF)"]],
    acces: ["Le parcours passe par le DCG (3 ans après le bac), le DSCG (2 ans) puis le DEC (diplôme d'expertise comptable) avec un stage de 3 ans en cabinet : de l'ordre de 8 ans après le bac.", "On travaille en cabinet pendant les études, souvent en alternance : l'employeur finance la préparation.", "Pour s'installer, il faut ensuite acheter ou créer une clientèle : le réseau et la réputation pèsent.", "Les Big Four et les cabinets moyens recrutent massivement des profils DCG-DSCG."],
    net: [2, "Pour entrer en cabinet, le dossier suffit ; pour s'installer, le réseau d'affaires et le bouche-à-oreille sont essentiels."],
    sav: ["Comptabilité approfondie (consolidation, IFRS)", "Fiscalité des entreprises et du dirigeant", "Droit des sociétés et droit social", "Audit et contrôle de gestion", "Conseil au dirigeant"],
    out: ["Logiciels de comptabilité (Cegid, Sage)", "Excel", "DCG, DSCG, DEC"],
    evo: "Associé·e de cabinet, commissaire aux comptes, DAF, créateur·rice de cabinet."
  },
  "analyste-financier": {
    emp: [["Sociétés de gestion d'actifs", "Amundi, Carmignac, Lazard Frères Gestion, Edmond de Rothschild AM, Natixis IM"], ["Banques (recherche actions)", "Oddo BHF, BNP Paribas Exane, Société Générale, Kepler Cheuvreux"], ["Compagnies d'assurance (placements)", "AXA, CNP Assurances, Generali"], ["Fonds et family offices", "Hedge funds, private equity, family offices"]],
    acces: ["Master de finance, école de commerce ou d'ingénieurs puis master finance de marché ; la certification CFA est très appréciée.", "Stage ou alternance dans une société de gestion ou un bureau de recherche : c'est la voie standard.", "Construis un portefeuille fictif ou une note d'analyse d'une entreprise : montre ta méthode et ta rigueur.", "Les entretiens demandent souvent de défendre une idée d'investissement (« pitch d'action »)."],
    net: [3, "Le milieu est restreint : les stages, les anciens et les chasseurs de têtes comptent beaucoup."],
    sav: ["Analyse financière (bilan, résultat, flux)", "Valorisation (DCF, multiples)", "Suivi des marchés et de la macroéconomie", "Excel et modélisation", "Rédaction claire et anglais"],
    out: ["Excel, Bloomberg, FactSet", "CFA (niveaux 1 à 3)", "Python (en plus)"],
    evo: "Gérant·e de portefeuille, analyste senior, directeur·rice de la recherche, directeur·rice des investissements."
  },
  "consultant-strategie": {
    emp: [["Cabinets de stratégie internationaux", "McKinsey, Boston Consulting Group (BCG), Bain & Company"], ["Cabinets de stratégie de second rang", "Roland Berger, Oliver Wyman, Kearney, Strategy&, L.E.K. Consulting, Accenture Strategy"], ["Grands cabinets généralistes", "Deloitte, EY-Parthenon, PwC, Capgemini Invent, Wavestone"], ["Boutiques et cabinets français", "Archer, Advancy, Eight Advisory, Eden McCallum"]],
    acces: ["Écoles de commerce et d'ingénieurs les plus sélectives, Sciences Po, universités avec un parcours très solide.", "Les cabinets recrutent par candidature, puis par « cas » : des exercices de raisonnement chiffré à résoudre à l'oral. Entraîne-toi avec des anciens, des livres (Case in Point) et des associations (« clubs conseil »).", "Les stages (6 mois) sont la voie classique d'entrée : MBB et les cabinets de stratégie recrutent surtout depuis le stage ou la première année après l'école.", "Les cabinets de conseil généralistes sont plus accessibles et permettent ensuite de rejoindre la stratégie."],
    net: [3, "Les cabinets de stratégie sont très sélectifs : les associations de conseil, les alumni et les entretiens « blancs » avec d'anciens consultant·es font une vraie différence."],
    sav: ["Raisonnement structuré et esprit de synthèse", "Calcul mental et lecture de chiffres", "Analyse de marché et de concurrence", "Excel, PowerPoint", "Communication orale claire, anglais"],
    out: ["Excel", "PowerPoint", "Livre « Case in Point » et plateformes de cas", "Notions de stratégie (Porter, matrices de portefeuille)"],
    evo: "Consultant·e, manager, principal, associé·e ; sorties vers un poste de direction en entreprise ou le private equity."
  },
  commercial: {
    emp: [["Industrie et distribution", "Schneider Electric, L'Oréal, Danone, Michelin, Carrefour, Leroy Merlin"], ["Tech et logiciel (SaaS)", "Salesforce, SAP, Microsoft, Doctolib, Qonto, Alan"], ["Services et conseil", "Orange Business, Capgemini, banques, assurances"], ["PME et commerce de proximité", "Tout secteur, souvent le premier employeur de jeunes commerciaux"]],
    acces: ["BTS NDRC ou MCO, BUT TC, école de commerce, ou même une formation courte : on peut démarrer tôt car le métier recrute à tous les niveaux.", "L'alternance est excellente : elle te place dans une équipe commerciale et débouche souvent sur un CDI.", "Les entreprises tech recrutent beaucoup de « SDR » (prospection) juniors, une voie d'entrée classique vers le commercial.", "Les entretiens contiennent une mise en situation : vends un produit, gère une objection."],
    net: [2, "Le réseau aide à décrocher les postes en grands comptes ; en début de carrière, la motivation et l'aisance à l'oral suffisent."],
    sav: ["Techniques de vente et de négociation", "Connaissance de ton produit et de ton marché", "Prospection (téléphone, LinkedIn)", "Suivi des chiffres et d'un CRM", "Écoute du client"],
    out: ["CRM (Salesforce, HubSpot)", "LinkedIn Sales Navigator", "Excel", "Anglais pour les grands comptes"],
    evo: "Commercial·e confirmé·e, responsable grands comptes, directeur·rice commercial·e, entrepreneur·e."
  },
  marketing: {
    emp: [["Grande consommation et luxe", "L'Oréal, Danone, LVMH, Kering, Unilever, Nestlé"], ["Tech et e-commerce", "Doctolib, Back Market, Booking.com, Amazon, Spotify"], ["Agences et conseil", "Publicis, Havas, Dentsu, agences digitales"], ["Autres secteurs", "Banques, assurances, sport, culture, institutions"]],
    acces: ["BUT TC ou MMI, école de commerce avec majeure marketing, master marketing à l'université.", "Alternance ou stage de 6 mois : c'est l'entrée principale, surtout dans les grands groupes.", "Montre des projets concrets : une page de marque, une campagne, un blog ou une chaîne qui a de l'audience.", "Les groupes de grande consommation et de luxe ont des programmes d'entrée très sélectifs : candidate un an à l'avance."],
    net: [2, "Le réseau d'alumni et les associations marketing de ton école aident pour les grands groupes ; les profils créatifs peuvent aussi se faire remarquer par leurs projets."],
    sav: ["Études de marché et comportement du consommateur", "Marketing digital (SEO, réseaux sociaux, publicité en ligne)", "Analyse de données (Google Analytics)", "Création de contenu et storytelling", "Gestion d'un budget"],
    out: ["Google Analytics, Google Ads, Meta Ads", "Excel, Power BI", "Canva, Figma", "Outils de CRM et d'emailing"],
    evo: "Chef·fe de produit, responsable marketing, directeur·rice marketing, directeur·rice de marque."
  },
  rh: {
    emp: [["Grands groupes", "L'Oréal, Danone, LVMH, Airbus, banques, assurances"], ["Cabinets de recrutement et d'intérim", "Randstad, Adecco, Manpower, Michael Page, Hays"], ["PME et ETI", "Souvent un poste polyvalent RH"], ["Administration et associations", "Collectivités, hôpitaux, associations"]],
    acces: ["Licence ou master RH (universités, IAE), école de commerce, ou psychologie puis master en psychologie du travail.", "L'alternance est la voie principale : elle te place dans un service RH.", "On débute souvent en recrutement, en paie ou en gestion administrative du personnel avant un poste de généraliste.", "Maîtrise les bases du droit du travail : elles servent dès le premier jour."],
    net: [2, "Le réseau aide pour les grandes entreprises, mais les cabinets de recrutement et les PME embauchent beaucoup."],
    sav: ["Droit du travail", "Recrutement et entretien", "Paie et administration du personnel", "Gestion des compétences et formation", "Communication et gestion de conflit"],
    out: ["SIRH (Workday, SAP SuccessFactors, Lucca)", "Logiciels de paie", "LinkedIn Recruiter"],
    evo: "Responsable RH, DRH, consultant·e RH, chasseur·se de têtes."
  },
  "conseiller-bancaire": {
    emp: [["Banques de réseau", "Crédit Agricole, BNP Paribas, Société Générale, LCL, Caisse d'Épargne, Banque Populaire, Crédit Mutuel"], ["Banques en ligne et néo-banques", "Boursorama, Qonto, N26, Revolut"], ["Banques privées et assurances", "BNP Paribas Wealth Management, AXA, Allianz"]],
    acces: ["BTS banque ou BTS NDRC, BUT TC, licence banque-assurance : on peut débuter dès bac+2.", "L'alternance est très répandue : les banques recrutent beaucoup de jeunes en alternance dans leurs agences.", "Les entretiens vérifient l'aisance relationnelle, l'intérêt pour l'économie et la rigueur.", "Le conseil en investissement demande ensuite une certification AMF."],
    net: [1, "Les banques recrutent beaucoup de juniors : le dossier et l'alternance suffisent."],
    sav: ["Produits bancaires (comptes, crédits, épargne)", "Réglementation (lutte anti-blanchiment, protection du client)", "Relation client et vente de conseil", "Calcul de crédit de base", "Suivi d'un portefeuille de clients"],
    out: ["Outils internes de la banque", "Certification AMF", "Excel"],
    evo: "Conseiller·ère clientèle professionnelle ou patrimoniale, directeur·rice d'agence, chargé·e d'affaires entreprises."
  },
  logisticien: {
    emp: [["Transport et logistique", "Geodis, DHL, Kuehne+Nagel, CMA CGM, XPO Logistics, Gefco"], ["Distribution et e-commerce", "Amazon, Carrefour, Leclerc, Decathlon, Cdiscount"], ["Industrie", "Airbus, Renault, Stellantis, Danone, L'Oréal (supply chain)"], ["Prestataires et conseil", "ID Logistics, Fiege, cabinets de conseil en supply chain"]],
    acces: ["BTS GTLA, BUT MLT, licence pro logistique ou master supply chain, école d'ingénieurs ou de commerce.", "L'alternance est excellente : elle te donne une expérience concrète dès l'école.", "Commence comme exploitant·e, assistant·e logistique ou planificateur·rice, puis monte en responsabilités.", "Les stages en entrepôt, en transport ou en achats te font comprendre le métier."],
    net: [1, "Le secteur manque de monde : le dossier et l'alternance suffisent."],
    sav: ["Gestion des stocks et des flux", "Transport (routier, maritime, aérien) et douane de base", "Planification et prévision de la demande", "Excel et analyse de données", "Anglais"],
    out: ["ERP (SAP, Oracle)", "WMS et TMS (logiciels d'entrepôt et de transport)", "Excel, Power BI"],
    evo: "Responsable logistique, responsable supply chain, directeur·rice supply chain, consultant·e."
  },
  "product-manager": {
    emp: [["Start-up et scale-up", "Doctolib, Alan, Qonto, BlaBlaCar, Back Market, Swile"], ["Grandes entreprises du numérique", "Google, Microsoft, Amazon, Spotify, Booking.com"], ["Banques, assurances, énergie", "Équipes digitales de BNP Paribas, AXA, EDF, Orange"], ["Conseil", "Accenture, Capgemini Invent, Wavestone, McKinsey Digital"]],
    acces: ["Pas de diplôme unique : écoles d'ingénieurs, de commerce, universités ou écoles de design.", "On devient souvent PM après quelques années comme développeur·se, designer, analyste data ou chef de projet : le métier s'apprend sur le terrain.", "Quelques entreprises recrutent des PM juniors en alternance ou stage : candidate aux postes « associate product manager » ou « product owner ».", "Prépare des cas de produit (priorisation, métriques) pour les entretiens, et montre un projet que tu as lancé."],
    net: [2, "Beaucoup de postes se trouvent par cooptation et dans les communautés produit (Product Tank, ADPList) ; un projet visible aide."],
    sav: ["Recherche utilisateur et priorisation", "Métriques produit (acquisition, rétention, revenu)", "Notions techniques (API, base de données)", "Méthodes agiles (Scrum, Kanban)", "Communication avec les équipes tech et business"],
    out: ["Jira, Notion, Figma", "Amplitude, Mixpanel, Google Analytics", "SQL de base"],
    evo: "Senior PM, group PM, head of product, chief product officer, fondateur·rice."
  },
  "ingenieur-ia": {
    emp: [["Laboratoires et start-up d'IA", "Mistral AI, Hugging Face, Kyutai, H, Poolside (Paris), Owkin"], ["Grandes entreprises du numérique", "Google, Meta, Microsoft, Amazon (équipes à Paris)"], ["Industrie et conseil", "Thales, Safran, Capgemini, Atos, Accenture, Sopra Steria"], ["Recherche publique", "INRIA, CNRS, CEA, laboratoires universitaires"]],
    acces: ["Master en IA ou data (parcours d'écoles d'ingénieurs, MVA, master d'apprentissage automatique) : le bac+5 est quasi obligatoire.", "Un stage de fin d'études ou une thèse en laboratoire ou en start-up IA est la porte d'entrée classique.", "Publie ou reproduis des travaux (GitHub, Kaggle, Hugging Face) : ils servent de preuve de niveau.", "Les entretiens contiennent des questions de maths (algèbre, probabilités), d'apprentissage automatique et de code."],
    net: [2, "La communauté IA française est dense : les laboratoires, les anciens de master et les cooptations comptent beaucoup."],
    sav: ["Algèbre linéaire, probabilités, optimisation", "Apprentissage automatique et apprentissage profond", "Python, PyTorch ou TensorFlow", "Ingénierie des données et mise en production", "Lecture d'articles scientifiques en anglais"],
    out: ["Python, PyTorch, TensorFlow", "Git, Docker", "GPU et plateformes cloud (AWS, GCP, Azure)", "Hugging Face"],
    evo: "Ingénieur·e ML senior, chercheur·se, lead IA, directeur·rice de l'IA, fondateur·rice de start-up."
  }
});
