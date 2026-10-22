/* Fiches métiers : qui recrute, comment y entrer, ce qu'il faut savoir (4/4 : bâtiment, restauration, tourisme et aérien, justice, urbanisme). Format : voir metiers-acces-1.js. */
A.METIERS_ACCES = A.METIERS_ACCES || {};
Object.assign(A.METIERS_ACCES, {
  electricien: {
    emp: [["Entreprises du bâtiment", "Engie Solutions, Spie, Vinci Energies (Actemium, Axians), Eiffage Énergie, Bouygues Energies & Services"], ["Artisans et TPE", "Entreprises d'électricité générale de ta ville (la majorité des emplois)"], ["Industrie et maintenance", "Usines, hôpitaux, centres commerciaux, SNCF, RATP"], ["Énergies renouvelables", "Installateurs de panneaux solaires et de bornes de recharge"]],
    acces: ["CAP électricien·ne, bac pro métiers de l'électricité (MELEC), puis BTS électrotechnique si tu veux évoluer vers le bureau d'études ou la conduite de chantier.", "L'apprentissage est la voie royale : tu es payé·e, tu apprends sur chantier, et beaucoup d'entreprises gardent leurs apprentis.", "Les habilitations électriques (B1, BR, H0…) sont exigées sur les chantiers : ton école ou ton employeur te les fait passer.", "Beaucoup d'électricien·nes finissent par créer leur entreprise après quelques années d'expérience."],
    net: [1, "Le métier manque de bras : un bon dossier d'apprentissage ou un stage suffit à trouver un patron."],
    sav: ["Norme NF C 15-100 (installations électriques)", "Lecture de schémas électriques", "Sécurité et prévention du risque électrique", "Bases de domotique et de bornes de recharge", "Relation client (devis, conseil)"],
    out: ["Habilitations électriques (B1, B2, BR, H0)", "Multimètre, pince ampèremétrique", "Permis B", "Qualification Qualifelec ou RGE (pour le solaire)"],
    evo: "Chef·fe d'équipe, conducteur·rice de travaux, technicien·ne de bureau d'études, artisan·e à son compte."
  },
  "conducteur-travaux": {
    emp: [["Majors du BTP", "Vinci Construction, Bouygues Construction, Eiffage, Colas, NGE, Spie Batignolles"], ["Entreprises régionales", "Entreprises générales de bâtiment et de travaux publics"], ["Promoteurs", "Nexity, Kaufman & Broad, Bouygues Immobilier, Icade"], ["Maîtrise d'ouvrage publique", "Collectivités, bailleurs sociaux, SNCF Réseau"]],
    acces: ["BTS bâtiment, BUT génie civil, licence pro, école d'ingénieur (ESTP, ENTPE, INSA, Polytech…) ou école spécialisée du BTP.", "L'alternance est très répandue : les grands groupes recrutent leurs conducteur·rices de travaux parmi leurs apprenti·es et stagiaires.", "Les premiers postes sont souvent « conducteur·rice de travaux junior » ou « ingénieur·e travaux » sur un chantier, avec de la mobilité géographique.", "Les entreprises recrutent aussi par cooptation : fais-toi remarquer pendant ton stage de fin d'études."],
    net: [2, "Les stages et l'alternance sont la porte d'entrée n°1 ; ensuite les chefs de chantier se recommandent entre eux."],
    sav: ["Lecture de plans et métrés", "Planning et coordination de chantier (méthode PERT, Gantt)", "Règles de sécurité (plan de prévention, PPSPS)", "Droit des marchés de travaux, gestion des sous-traitants", "Budget et suivi de rentabilité"],
    out: ["MS Project, Excel", "Logiciels de métrés (Dimensions, Batiprix)", "Habilitations sécurité (SST, AIPR)", "Permis B"],
    evo: "Chef·fe de chantier, directeur·rice de travaux, directeur·rice de projet, directeur·rice d'agence."
  },
  plombier: {
    emp: [["Artisans et TPE", "Entreprises de plomberie-chauffage locales (la majorité des postes)"], ["Grands groupes de services", "Engie Home Services, Dalkia, Idex, Vinci Facilities"], ["Fabricants et distributeurs", "Saunier Duval, Viessmann, Daikin (installation de pompes à chaleur), Cedeo"], ["Bailleurs sociaux et collectivités", "Maintenance de parcs de logements"]],
    acces: ["CAP installateur·rice sanitaire ou thermique, bac pro TISEC (technicien·ne en installation des systèmes énergétiques et climatiques), puis BTS fluides-énergies-domotique.", "L'apprentissage est la meilleure voie : les patrons recrutent souvent leur successeur parmi leurs apprentis.", "La qualification RGE (reconnu garant de l'environnement) est requise pour installer pompes à chaleur et chaudières aidées : elle ouvre beaucoup de chantiers.", "Reprendre une entreprise d'artisan qui part à la retraite est un chemin courant vers l'indépendance."],
    net: [1, "Les artisans cherchent des apprentis et des salariés : une bonne motivation et un CV suffisent."],
    sav: ["Hydraulique et circuits d'eau", "Chauffage (chaudière, plancher chauffant, pompe à chaleur)", "Soudure et brasure", "Lecture de plans", "Relation client et devis"],
    out: ["Attestation de capacité (manipulation de fluides frigorigènes)", "Qualification RGE (Qualibat, Qualit'EnR)", "Permis B", "Outillage de plomberie (cintreuse, soudure)"],
    evo: "Chef·fe d'équipe, technicien·ne de maintenance, artisan·e à son compte, formateur·rice."
  },
  menuisier: {
    emp: [["Artisans menuisiers et ébénistes", "Ateliers de menuiserie, agencement, escaliers, restauration de mobilier"], ["Industrie et fabricants", "Lapeyre, K par K, Fermob, Mobilier de Fabre"], ["Maisons de luxe et décoration", "Ateliers d'ébénisterie d'art, Hermès, Mobilier national"], ["Chantiers du patrimoine", "Entreprises de restauration de monuments historiques, Compagnons du Devoir"]],
    acces: ["CAP menuisier·ère fabricant·e ou ébéniste, brevet des métiers d'art (BMA), bac pro technicien·ne menuisier-agenceur, DN MADE métiers d'art.", "Le compagnonnage (Compagnons du Devoir) offre un tour de France avec hébergement et formation : une voie d'excellence très reconnue.", "L'apprentissage chez un artisan donne l'accès aux gestes que l'école ne transmet pas.", "Un portfolio de pièces réalisées (photos, mobilier) t'aide à convaincre pour ton premier emploi."],
    net: [2, "Chez les artisans, tout se joue sur la recommandation et sur la qualité de ce que tu as déjà fabriqué."],
    sav: ["Essences de bois et leurs usages", "Dessin technique et lecture de plan", "Usinage (scie, toupie, tour, CNC)", "Assemblages traditionnels", "Finitions et vernis"],
    out: ["Machines-outils à bois", "Logiciels de CAO (SketchUp, Autodesk Inventor, TopSolid)", "Machines à commande numérique", "Compagnonnage"],
    evo: "Chef·fe d'atelier, agenceur·se, ébéniste d'art, artisan·e à son compte, formateur·rice."
  },
  boulanger: {
    emp: [["Boulangeries artisanales", "Artisans de ton quartier, boulangeries réputées (Poilâne, Maison Kayser, Du Pain et des Idées)"], ["Chaînes de boulangerie", "Paul, Brioche Dorée, La Mie Câline, Marie Blachère"], ["Grande distribution", "Rayons boulangerie de supermarchés, Picard"], ["Hôtellerie-restauration et palaces", "Pâtisseries de grands hôtels, traiteurs, chocolatiers"]],
    acces: ["CAP boulanger·ère ou pâtissier·ère (souvent en apprentissage), puis brevet professionnel ou BTM, ou mention complémentaire.", "Les concours (Meilleur Apprenti de France, Meilleur Ouvrier de France, Championnat de la meilleure baguette de Paris) boostent les carrières.", "Beaucoup de boulangers·ères reprennent une boulangerie existante : le métier manque de repreneur·ses.", "Commence par un job d'été ou un stage pour tester le rythme (très tôt le matin) avant de t'engager."],
    net: [2, "Les patrons forment surtout ceux qu'on leur recommande ; l'apprentissage est une vraie période d'essai."],
    sav: ["Fermentation et gestion de la pâte (levain, pousse)", "Hygiène alimentaire (HACCP)", "Pâtisserie de base (pâtes, crèmes)", "Gestion des coûts matières et des stocks", "Vente et relation client"],
    out: ["Four, pétrin, laminoir", "Formation HACCP", "Concours professionnels", "Permis B (livraisons)"],
    evo: "Chef·fe de production, artisan·e à son compte, formateur·rice, pâtissier·ère de palace."
  },
  cuisinier: {
    emp: [["Restaurants gastronomiques", "Restaurants étoilés Michelin, tables de chefs (Ducasse, Robuchon, Pierre Gagnaire, Alain Passard)"], ["Hôtels et palaces", "Le Meurice, Le Bristol, Plaza Athénée, Ritz Paris, Accor"], ["Restauration collective et traiteurs", "Sodexo, Elior, Compass, Potel et Chabot"], ["Brasseries et groupes de restauration", "Groupe Bertrand, Big Mamma, Groupe Flo, Paul Bocuse"]],
    acces: ["CAP cuisine, bac pro cuisine, BTS management en hôtellerie-restauration, puis écoles d'élite (Institut Paul Bocuse, Ferrandi, Le Cordon Bleu).", "Les stages de cuisine dans de grandes maisons (étoilées ou palaces) sont la meilleure carte de visite : candidate un an à l'avance.", "L'apprentissage est la voie dominante : tu apprends en brigade, payé·e dès le départ.", "Les concours (Bocuse d'Or, Meilleur Ouvrier de France, Prix Taittinger) accélèrent les carrières mais sont très sélectifs."],
    net: [3, "Les chefs recommandent leurs anciens commis : en gastronomie, ton premier stage chez un grand nom pèse énormément sur la suite."],
    sav: ["Techniques de base (fonds, sauces, cuissons)", "Hygiène et sécurité alimentaire (HACCP)", "Connaissance des produits de saison", "Organisation d'une brigade", "Calcul de coût matière et gestion des stocks"],
    out: ["Couteaux et matériel professionnel", "Formation HACCP", "Concours culinaires", "Anglais (brigades internationales)"],
    evo: "Chef·fe de partie, sous-chef·fe, chef·fe de cuisine, chef·fe exécutif·ve, restaurateur·rice à son compte."
  },
  pilote: {
    emp: [["Compagnies aériennes françaises", "Air France, Transavia, Air Caraïbes, French bee, Corsair, Air Austral"], ["Compagnies low cost et européennes", "easyJet, Ryanair, Volotea, Lufthansa, KLM"], ["Compagnies étrangères", "Emirates, Qatar Airways, Singapore Airlines (recrutent des pilotes français·es)"], ["Aviation d'affaires et cargo", "NetJets, Dassault Falcon Service, FedEx, DHL, ASL Airlines"]],
    acces: ["Pilote de ligne : formation à l'ENAC (concours après prépa ou admission directe), ou dans une école agréée par la DGAC (Air France Flight Academy, Pan Am International, Fly Academy…), pour obtenir les licences théoriques puis pratiques (CPL, ATPL).", "Le financement est le premier obstacle : 70 000 à 120 000 € dans le privé. Renseigne-toi sur les bourses (Fondation Air France), les prêts avec garantie et les cadets airlines.", "Les compagnies recrutent par épreuves : tests psychotechniques (COMPASS), simulateur, entretien technique et entretien RH. Prépare-les avec des annales.", "L'anglais est exigé au niveau 4 minimum (certification OACI) et le certificat médical classe 1 est indispensable : passe-le avant de te lancer dans les frais."],
    net: [2, "Les compagnies recrutent par concours de sélection ; les contacts et les moniteurs d'école aident à connaître les bons moments de recrutement."],
    sav: ["Météorologie et navigation", "Réglementation aérienne et facteurs humains", "Principes du vol et performances de l'avion", "Anglais aéronautique (phraséologie)", "Gestion de l'équipage (CRM)"],
    out: ["Certificat médical aéronautique classe 1", "Licences PPL, CPL, ATPL, qualification de type", "Test de niveau OACI en anglais", "Simulateurs de vol"],
    evo: "Copilote, commandant de bord, instructeur·rice, examinateur·rice, chef·fe pilote."
  },
  pnc: {
    emp: [["Compagnies françaises", "Air France, Transavia, Air Caraïbes, French bee, Corsair"], ["Compagnies du Golfe", "Emirates, Qatar Airways, Etihad (recrutent en Europe)"], ["Compagnies low cost", "easyJet, Ryanair, Volotea, Vueling"], ["Aviation d'affaires", "Jets privés et compagnies VIP"]],
    acces: ["Le Certificat de formation de sécurité (CFS) puis le certificat d'aptitude (CCA) sont nécessaires : tu les passes en centre agréé (environ 4 à 6 semaines pour le CFS).", "Les compagnies organisent des « open days » de recrutement : consulte leurs pages carrières et prépare un CV sobre et une photo professionnelle.", "Il faut parler au moins une langue étrangère, souvent l'anglais couramment, et être à l'aise en service client.", "Les compagnies étrangères recrutent aussi en France lors de journées de présélection."],
    net: [1, "Les journées de recrutement et les offres sont publiques : le dossier et l'entretien comptent."],
    sav: ["Procédures de sécurité et de secours (évacuation, incendie, premiers secours)", "Anglais courant et service client", "Gestion du stress et des passagers difficiles", "Connaissance de l'avion et des procédures", "Travail en équipe et horaires décalés"],
    out: ["CFS et CCA (certificats obligatoires)", "Certificat médical aéronautique", "Test d'anglais (TOEIC)", "Brevet de natation"],
    tst: ["toeic"],
    evo: "Chef·fe de cabine, instructeur·rice, formateur·rice sécurité, passage au sol (agent·e de piste, responsable service client)."
  },
  "directeur-hotel": {
    emp: [["Grands groupes hôteliers", "Accor, Hilton, Marriott, Hyatt, IHG, Radisson"], ["Palaces et hôtels de luxe", "Ritz Paris, Le Meurice, Cheval Blanc, Four Seasons, Mandarin Oriental"], ["Hôtels indépendants et chaînes françaises", "Louvre Hotels, Groupe Barrière, Pierre & Vacances"], ["Hôtellerie en dehors de l'hôtel", "Résidences de tourisme, cruise lines, gestion d'hôtels (Lagardère Travel Retail)"]],
    acces: ["BTS management en hôtellerie-restauration, bachelor ou master en école hôtelière (Institut Paul Bocuse, Glion, EHL à Lausanne, Vatel, Ferrandi, IMI).", "Les stages en hôtel (6 à 12 mois cumulés) sont indispensables : les grands groupes recrutent sur ton parcours de stages.", "Les débuts passent par la réception, la restauration ou le service des étages ; on devient ensuite chef·fe de service puis directeur·rice adjoint·e.", "L'international est un atout : les groupes proposent des mobilités et des postes à l'étranger."],
    net: [3, "Dans l'hôtellerie de luxe surtout, le réseau des anciens d'école (EHL, Glion) et les recommandations de directeurs comptent énormément."],
    sav: ["Gestion hôtelière (taux d'occupation, RevPAR, yield management)", "Service client et standards de qualité", "Management d'équipes nombreuses et gestion du planning", "Comptabilité hôtelière de base", "Anglais courant, une 2e langue en bonus"],
    out: ["Logiciels hôteliers (Opera, Protel)", "Outils de revenue management", "Anglais courant (TOEIC)", "Mobilité géographique"],
    tst: ["toeic"],
    evo: "Directeur·rice adjoint·e, directeur·rice d'établissement, directeur·rice régional·e, directeur·rice de groupe."
  },
  "controleur-aerien": {
    emp: [["Direction générale de l'aviation civile (DGAC)", "Direction des services de la navigation aérienne (DSNA) : centres en route (Reims, Aix, Brest, Bordeaux, Paris) et aéroports"], ["Aviation militaire", "Armée de l'air et de l'espace, aéronavale"], ["Prestataires privés", "Services de contrôle d'aérodromes confiés à des entreprises (Egis Avia, Sky Futur)"], ["Autres", "Aéroports régionaux, organisations internationales (Eurocontrol)"]],
    acces: ["Concours d'ingénieur·e du contrôle de la navigation aérienne (ICNA) : ouvert au niveau bac+2 scientifique (classes prépas, BTS, licence), puis formation de 3 ans à l'ENAC à Toulouse.", "Les épreuves sont des tests de mathématiques, de physique, d'anglais, des tests psychotechniques et un entretien : annales en ligne.", "Le concours est très sélectif (moins de 5 % de reçu·es) et ouvert une fois par an, souvent de décembre à février : prépare-toi en avance.", "Avant le contrôle opérationnel, tu passes des qualifications de centre et d'aérodrome : la formation se poursuit en emploi."],
    net: [1, "Concours national : le rang décide, le réseau est sans effet."],
    sav: ["Mathématiques et physique (niveau prépa)", "Anglais aéronautique", "Réglementation de la circulation aérienne", "Gestion du stress et attention soutenue", "Représentation spatiale (3D)"],
    out: ["Concours ICNA (DGAC)", "Certificat médical aéronautique classe 3", "Test psychotechniques (annales)", "Anglais niveau 4 OACI"],
    evo: "Contrôleur·se qualifié·e, chef·fe de salle, instructeur·rice, cadre de la DSNA."
  },
  "ingenieur-aero": {
    emp: [["Constructeurs aéronautiques et spatiaux", "Airbus, Safran, Thales, Dassault Aviation, ArianeGroup, Naval Group"], ["Équipementiers", "Liebherr Aerospace, Collins Aerospace, Latécoère, Figeac Aéro, Daher"], ["Agences et recherche", "CNES, ONERA, ESA, DGA, CEA"], ["Start-up du spatial et de la défense", "Exotrail, Isar Aerospace, Loft Orbital, Unseenlabs, Hylight"]],
    acces: ["École d'ingénieurs spécialisée (ISAE-SUPAERO, ENAC, ISAE-ENSMA, ENSMA, Arts et Métiers) ou école généraliste (INSA, Centrale, Mines) avec spécialisation aéro.", "Les stages (stage de 2e année et stage de fin d'études) chez Airbus, Safran ou Thales sont la première étape du recrutement : ce sont eux qui sélectionnent leurs futurs salariés.", "Les grands groupes organisent des forums (Airbus Careers, Safran Forum) et suivent leurs alternant·es de près.", "Certaines carrières spatiales passent par un doctorat, surtout au CNES ou dans la recherche."],
    net: [3, "Les stages et les forums d'écoles ouvrent la porte ; les recommandations internes pèsent aussi dans les grands groupes."],
    sav: ["Mécanique des fluides et aérodynamique", "Résistance des matériaux et structures", "Propulsion, thermodynamique", "Systèmes embarqués et automatique", "Gestion de projet et anglais technique"],
    out: ["CATIA, ANSYS, Matlab/Simulink", "Python", "Normes aéronautiques (EASA)", "Anglais courant"],
    tst: ["toeic"],
    evo: "Chef·fe de projet, expert·e technique, responsable de programme, directeur·rice de bureau d'études."
  },
  magistrat: {
    emp: [["Juridictions judiciaires", "Tribunaux judiciaires, cours d'appel, Cour de cassation, parquets"], ["Administration centrale", "Ministère de la Justice, inspections"], ["Institutions", "Conseil d'État (juges administratifs, recrutement distinct), Conseil constitutionnel"], ["Autres", "Organisations internationales, Cour de justice de l'Union européenne"]],
    acces: ["Trois voies d'accès à l'École nationale de la magistrature (ENM, à Bordeaux) : concours étudiant (bac+4 en droit minimum, souvent un master 1), concours des professionnels du droit, ou concours complémentaire.", "Prépare-toi dans un Institut d'études judiciaires (IEJ) ou en classe préparatoire intégrée « Égalité des chances » (CPI) de l'ENM, qui accompagne les boursier·ères.", "Le concours est très exigeant : droit civil, droit pénal, culture générale, procédure, puis oraux (mises en situation, entretien) ; il faut souvent plusieurs tentatives.", "Après le concours, 31 mois de formation rémunérée à l'ENM, dont 12 mois de stage en juridiction."],
    net: [1, "Concours national : le rang décide ; le réseau compte peu."],
    sav: ["Droit civil, droit pénal et procédure", "Droit public et européen", "Culture générale et actualité", "Rédaction de jugements et d'ordonnances", "Éthique et déontologie du magistrat"],
    out: ["Concours de l'ENM", "Institut d'études judiciaires (IEJ)", "Préparation aux oraux (mises en situation)", "Légifrance, bases de jurisprudence"],
    tst: ["enm"],
    evo: "Juge, procureur·e, juge d'instruction, juge des enfants, président·e de juridiction, magistrat·e à la Cour de cassation."
  },
  notaire: {
    emp: [["Offices notariaux", "Études individuelles ou sociétés de plusieurs notaires (Notaires de France), offices à Paris, Lyon, Bordeaux…"], ["Grands offices parisiens", "Offices de taille importante en droit immobilier, droit des sociétés, droit patrimonial"], ["Organismes proches du notariat", "Chambres des notaires, Conseil supérieur du notariat, organismes de formation"], ["Entreprises et banques", "Directions juridiques et de gestion de patrimoine"]],
    acces: ["Master de droit notarial (ou droit privé + diplôme supérieur du notariat, DSN), puis stage de 2 ans en étude pour devenir notaire assistant·e puis notaire.", "Les offices recrutent leurs collaborateur·rices parmi leurs stagiaires : décroche des stages en étude dès ta licence.", "Pour s'installer, il faut être nommé·e par le ministère : soit en reprenant un office existant (financé par un prêt, après agrément), soit en créant un nouvel office dans les zones ouvertes (tirage au sort depuis 2016).", "Le métier combine droit immobilier, droit de la famille et fiscalité : une double compétence en gestion de patrimoine est recherchée."],
    net: [3, "Le notariat est très lié aux familles et aux relations locales : les stages, les maîtres de stage et les tuteurs ouvrent les offices ; pour reprendre ou associer, le réseau est décisif."],
    sav: ["Droit des biens, droit de la famille et des successions", "Droit immobilier et des sociétés", "Fiscalité du patrimoine", "Rédaction d'actes et déontologie", "Relation client et conseil"],
    out: ["Master de droit notarial / DSN", "Logiciels d'étude (Genapi, Fiducial, iNot)", "Stage de formation professionnelle (2 ans)", "Financement de la reprise d'un office"],
    evo: "Notaire salarié·e, notaire associé·e, notaire titulaire, président·e de chambre des notaires."
  },
  urbaniste: {
    emp: [["Collectivités et agences d'urbanisme", "Mairies, métropoles, régions, agences d'urbanisme (APUR, AURAN, AUDIAR)"], ["Bureaux d'études", "Egis, Artelia, Setec, Urbanis, Citadia"], ["Aménageurs et promoteurs", "Grand Paris Aménagement, SPL/SEM locales, Nexity, Icade, Bouygues Immobilier"], ["État et organismes publics", "DDT/DREAL, Cerema, EPA (Euroméditerranée)"]],
    acces: ["Master en urbanisme et aménagement (Institut d'urbanisme de Paris, Lyon, Grenoble, Sciences Po, École d'urbanisme de Paris, ENPC) ou école d'architecture / ingénieur avec spécialisation.", "Les stages (6 mois) dans une collectivité, une agence ou un aménageur sont déterminants : la plupart des offres de premier poste suivent un stage réussi.", "Le concours de la fonction publique territoriale (attaché·e ou ingénieur·e) ouvre les postes de collectivités.", "Un profil double (SIG, droit de l'urbanisme, concertation) est très recherché."],
    net: [2, "Le milieu est petit : les masters d'urbanisme ont des réseaux d'anciens actifs, et les stages débouchent souvent sur un emploi."],
    sav: ["Droit de l'urbanisme (PLU, SCoT, permis de construire)", "Cartographie et SIG", "Sociologie urbaine et concertation publique", "Transition écologique, mobilités", "Gestion de projet d'aménagement"],
    out: ["QGIS ou ArcGIS", "AutoCAD / SketchUp", "Concours de la fonction publique territoriale", "Suite Adobe pour les rendus"],
    evo: "Chef·fe de projet urbain, directeur·rice de l'urbanisme, directeur·rice d'agence, aménageur·se."
  }
});
