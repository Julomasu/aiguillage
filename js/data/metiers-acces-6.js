/* Fiches métiers supplémentaires : qui recrute, comment y entrer, ce qu'il faut savoir (6/6 : art, social, nature, bâtiment, tourisme). Format : voir metiers-acces-1.js. */
A.METIERS_ACCES = A.METIERS_ACCES || {};
Object.assign(A.METIERS_ACCES, {
  photographe: {
    emp: [["Presse et agences", "AFP, Reuters, Getty, Magnum, agences de presse photo, journaux"], ["Mode, luxe et publicité", "Studios de mode, agences de publicité, marques de luxe"], ["Événementiel et portrait", "Mariages, entreprises, institutions, studios de portrait"], ["Indépendant·e", "La majorité des photographes travaillent à leur compte, parfois sous le statut d'auteur·rice"]],
    acces: ["BTS photographie, DN MADE, école d'art ou école spécialisée (ENS Louis-Lumière, École nationale supérieure de la photographie d'Arles, Gobelins, ETPA) : le portfolio décide de l'admission.", "Les stages ou l'assistanat chez un·e photographe confirmé·e sont le meilleur apprentissage et ton premier réseau.", "Démarre un projet personnel cohérent (série, reportage) : il fait ton identité et ton portfolio.", "Pour vivre de la photo, il faut développer plusieurs activités (commandes, tirages, workshops, banques d'images)."],
    net: [3, "Les commandes passent beaucoup par la recommandation, les agences et les rencontres en festivals (Visa pour l'image, Les Rencontres d'Arles)."],
    sav: ["Prise de vue, lumière, composition", "Retouche et post-production", "Culture photographique", "Droit d'auteur et droit à l'image", "Gestion d'entreprise (devis, facturation)"],
    out: ["Appareil photo, optiques, éclairage", "Lightroom, Photoshop, Capture One", "Portfolio en ligne et réseaux sociaux"],
    evo: "Photographe reconnu·e, directeur·rice artistique, retoucheur·se, enseignant·e, éditeur·rice photo."
  },
  "architecte-interieur": {
    emp: [["Agences d'architecture d'intérieur", "Agences indépendantes, studios de design, agences d'hôtellerie et de commerce"], ["Marques et enseignes", "IKEA, Maisons du Monde, Roche Bobois, Ligne Roset, Conforama"], ["Promoteurs et hôtellerie", "Accor, Nexity, groupes d'hôtellerie de luxe"], ["Indépendant·e", "Missions de décoration et de conception pour particuliers et professionnels"]],
    acces: ["DN MADE espace, DSAA design d'espace, école d'architecture d'intérieur (Camondo, Boulle, Penninghen, Condé, ESAD) puis portfolio.", "Les stages en agence ou chez un·e décorateur·rice sont obligatoires et décisifs pour le premier poste.", "Maîtrise le dessin à main levée et un logiciel de 3D (SketchUp, Revit, AutoCAD) : on te les demande dès l'entretien.", "Participe à des salons et concours (Maison&Objet, Les Arcs, Trophées de l'architecture d'intérieur) pour te faire connaître."],
    net: [3, "Les commandes viennent beaucoup de recommandations de client·es, d'architectes et d'artisans : un bon bouche-à-oreille est vital."],
    sav: ["Dessin technique, plans et coupes", "Matériaux, couleurs, lumière", "Ergonomie et normes (accessibilité, incendie)", "Histoire du design et du mobilier", "Gestion de chantier et de budget"],
    out: ["AutoCAD, SketchUp, Revit", "Photoshop, InDesign", "Maquettes et planches d'ambiance"],
    evo: "Architecte d'intérieur senior, directeur·rice artistique, scénographe, installation à son compte."
  },
  realisateur: {
    emp: [["Sociétés de production", "Gaumont, Pathé, Why Not, Mediawan, Banijay, Studio Canal"], ["Télévision", "France Télévisions, TF1, M6, Canal+, Arte"], ["Publicité et clips", "Agences de publicité, sociétés de production de films publicitaires"], ["Plateformes et indépendant·es", "Netflix, Prime Video, YouTube, production indépendante"]],
    acces: ["BTS audiovisuel, licence cinéma, école de cinéma (La Fémis, ENS Louis-Lumière, INSAS, ESEC, Kourtrajmé, EICAR) ou autodidacte avec un court métrage.", "Un court métrage ou un portfolio de films est ta carte de visite : montre-le dans des festivals et en ligne.", "On commence presque toujours comme assistant·e, stagiaire ou monteur·se avant de réaliser.", "Le statut d'intermittent·e du spectacle s'obtient après un certain nombre d'heures sur des productions."],
    net: [3, "Le milieu fonctionne par rencontres et cooptation : producteur·rices, festivals et anciens d'école sont décisifs."],
    sav: ["Écriture et narration", "Direction d'acteur·rices", "Image, son et montage", "Production et budget", "Culture cinématographique"],
    out: ["DaVinci Resolve, Premiere Pro, Final Cut", "Caméras, optiques, éclairage", "Festivals et marchés (Cannes, Clermont-Ferrand)"],
    evo: "Réalisateur·rice, scénariste, producteur·rice, chef·fe monteur·se, directeur·rice de la photographie."
  },
  comedien: {
    emp: [["Théâtres publics et privés", "Comédie-Française, théâtres nationaux, théâtres privés, compagnies"], ["Audiovisuel", "Séries, films, téléfilms, publicités"], ["Doublage et voix", "Studios de doublage, livres audio, jeux vidéo, publicité"], ["Enseignement et médiation", "Ateliers, écoles, conservatoires, interventions en milieu scolaire"]],
    acces: ["Conservatoires (CNSAD, CRR), écoles d'art dramatique (TNS, ENSATT, Cours Florent, Cours Simon) : l'entrée se fait par audition.", "Prépare 2 ou 3 scènes de répertoire et un monologue : les jurys cherchent un tempérament plus qu'une technique parfaite.", "Les premiers rôles se décrochent en compagnie, en court métrage ou en figuration : ils construisent ton CV.", "Prends un·e agent·e quand tu as des rôles à montrer : il ou elle ouvre les castings audiovisuels."],
    net: [3, "Castings, agents, metteur·ses en scène et compagnies : tout passe par les rencontres et la recommandation."],
    sav: ["Jeu d'acteur·rice et travail du texte", "Voix et corps", "Culture théâtrale et cinématographique", "Improvisation", "Droit du travail des intermittent·es"],
    out: ["Showreel (bande démo)", "Plateformes de castings (Cineartistes, CastingGuide)", "Statut d'intermittent·e (heures cumulées)"],
    evo: "Premiers rôles, metteur·se en scène, pédagogue, directeur·rice de compagnie, doublage et voix-off."
  },
  illustrateur: {
    emp: [["Édition", "Éditeurs jeunesse, BD et romans graphiques (Gallimard, Casterman, Delcourt, Dargaud, Glénat)"], ["Presse et agences", "Journaux, magazines, agences de communication"], ["Jeu vidéo et animation", "Ubisoft, Don't Nod, studios d'animation"], ["Indépendant·e", "Commandes de marques, affiches, produits dérivés, vente de ses propres créations"]],
    acces: ["DN MADE illustration, écoles d'arts appliqués ou de bande dessinée (Émile Cohl, Estienne, Gobelins, Pivaut, ENSAD, ESAD Strasbourg) puis portfolio.", "Un portfolio cohérent (10 à 15 images) et un style identifiable comptent plus que le diplôme.", "Participe à des salons et festivals (Angoulême, Montreuil, Annecy) pour présenter ton travail aux éditeur·rices.", "Poste régulièrement sur Instagram et Behance : c'est aujourd'hui un canal de recrutement majeur."],
    net: [3, "Les commandes viennent beaucoup de recommandations, de salons et de réseaux d'illustrateur·rices (agences, collectifs)."],
    sav: ["Dessin, anatomie, perspective", "Couleur et composition", "Narration visuelle", "Contrats et droits d'auteur", "Logiciels de dessin numérique"],
    out: ["Procreate, Photoshop, Clip Studio Paint", "Tablette graphique", "Portfolio en ligne (Behance, Instagram, site)"],
    evo: "Illustrateur·rice reconnu·e, auteur·rice de BD, directeur·rice artistique, character designer, enseignant·e."
  },
  animateur: {
    emp: [["Communes et intercommunalités", "Accueils de loisirs, périscolaire, maisons de quartier, MJC"], ["Associations", "Francas, Ligue de l'enseignement, UCPA, Léo Lagrange, Familles rurales"], ["Centres de vacances et colonies", "Séjours de vacances, centres de loisirs, camps"], ["Établissements spécialisés", "EHPAD, centres sociaux, foyers, structures pour personnes handicapées"]],
    acces: ["BAFA (dès 17 ans) pour débuter, puis BPJEPS loisirs tous publics (1 an) ou BUT carrières sociales parcours animation sociale.", "L'alternance est courante en BPJEPS : tu es payé·e et en poste dès la 1re année.", "Les centres de loisirs recrutent beaucoup à chaque vacances : une excellente façon de tester le métier.", "Pour diriger une structure, un DEJEPS (Bac+3) ou un DESJEPS (Bac+5) est demandé."],
    net: [1, "Le secteur recrute beaucoup : le BAFA ou le BPJEPS et une expérience suffisent."],
    sav: ["Pédagogie et animation de groupe", "Projet éducatif et organisation d'activités", "Sécurité et réglementation des accueils de mineurs", "Premiers secours (PSC1)", "Travail en équipe et avec les familles"],
    out: ["BAFA, BAFD", "BPJEPS, DEJEPS", "PSC1", "Permis B"],
    evo: "Directeur·rice d'accueil de loisirs, coordinateur·rice jeunesse, responsable de structure, chargé·e de mission."
  },
  "educateur-jeunes-enfants": {
    emp: [["Crèches et multi-accueils", "Crèches municipales, associatives ou privées (People & Baby, Babilou, La Maison Bleue)"], ["PMI et protection de l'enfance", "Services de protection maternelle et infantile des départements, ASE"], ["Hôpitaux et structures de soin", "Services de pédiatrie, centres de ressources, CAMSP"], ["Éducation et associations", "Écoles maternelles, ludothèques, lieux d'accueil enfants-parents"]],
    acces: ["Diplôme d'État d'éducateur·rice de jeunes enfants (3 ans) : admission après le bac sur dossier, épreuves et entretien (Parcoursup ou candidature directe).", "Des expériences auprès des enfants (BAFA, babysitting, stages en crèche) comptent beaucoup à l'entretien.", "Les stages (60 semaines environ sur 3 ans) sont ta première porte d'entrée vers un emploi.", "Les postes sont nombreux : crèches, PMI et associations recrutent régulièrement."],
    net: [1, "Le secteur manque de professionnel·les : le diplôme et les stages suffisent."],
    sav: ["Développement de l'enfant de 0 à 7 ans", "Pédagogie et activités d'éveil", "Accueil des familles et accompagnement à la parentalité", "Observation et projet éducatif", "Règles d'hygiène et de sécurité"],
    out: ["Diplôme d'État EJE", "Matériel pédagogique d'éveil", "PSC1"],
    evo: "Directeur·rice de crèche, coordinateur·rice petite enfance, formateur·rice, cadre de la protection de l'enfance."
  },
  "psy-en": {
    emp: [["Éducation nationale", "Collèges, lycées, centres d'information et d'orientation (CIO)"], ["Enseignement agricole", "Lycées agricoles, établissements du ministère de l'Agriculture"], ["Autres", "Établissements privés sous contrat, services d'insertion"]],
    acces: ["Licence de psychologie, puis master de psychologie, puis concours de psychologue de l'Éducation nationale (spécialité éducation, développement et conseil en orientation scolaire et professionnelle).", "La formation dure 2 ans à l'Institut national supérieur du professorat et de l'éducation (INSPE) après le concours.", "Les épreuves portent sur la psychologie, les politiques éducatives et un oral : prépare-les dès le M1.", "Les stages en CIO ou en établissement scolaire te font connaître le métier avant le concours."],
    net: [1, "Concours national : le rang décide, le réseau compte peu."],
    sav: ["Psychologie de l'enfant et de l'adolescent", "Psychologie sociale et des organisations", "Connaissance du système scolaire et des formations", "Techniques d'entretien d'orientation", "Statistiques et méthodes d'évaluation"],
    out: ["Master de psychologie", "Concours de psychologue de l'Éducation nationale", "Outils d'information (Onisep, Parcoursup)"],
    evo: "Directeur·rice de CIO, inspecteur·rice, psychologue spécialisé·e, formateur·rice."
  },
  "ingenieur-agronome": {
    emp: [["Coopératives et agroalimentaire", "InVivo, Agrial, Terrena, Danone, Lactalis, Bonduelle, Roquette"], ["Semences et agrofourniture", "Limagrain, Bayer, Syngenta, Corteva, Vilmorin"], ["Conseil et institutions", "Chambres d'agriculture, INRAE, ministère de l'Agriculture, ONG"], ["Environnement et territoires", "Bureaux d'études, collectivités, ONF, parcs naturels"]],
    acces: ["École d'ingénieurs agronomes (AgroParisTech, Institut Agro, Bordeaux Sciences Agro, VetAgro Sup, ENSAT, ESA…) après une prépa BCPST, ou après un BTSA, un BUT génie biologique ou une licence scientifique.", "Les stages de 2e et 3e année en entreprise, en exploitation et à l'étranger sont déterminants pour trouver un emploi.", "Beaucoup d'écoles proposent l'apprentissage pour financer tes études.", "Choisis une spécialité (productions animales, végétales, agroalimentaire, environnement) cohérente avec ton secteur cible."],
    net: [2, "Les anciens d'école et les forums entreprises aident beaucoup, notamment dans les coopératives et l'agroalimentaire."],
    sav: ["Agronomie, pédologie, physiologie végétale", "Génétique et protection des cultures", "Économie agricole et filières", "Statistiques et modélisation", "Anglais scientifique"],
    out: ["Logiciels de statistiques (R, Python)", "SIG (QGIS)", "Permis B"],
    evo: "Responsable technique, conseiller·ère agricole senior, chef·fe de produit, chercheur·se, directeur·rice d'une coopérative."
  },
  "technicien-forestier": {
    emp: [["Office national des forêts (ONF)", "Agent·es patrimoniaux·les et techniciens forestiers dans les forêts publiques"], ["Coopératives et experts forestiers", "Coopératives forestières, experts, gestionnaires de forêts privées"], ["Entreprises d'exploitation et scieries", "Entreprises de travaux forestiers, scieries"], ["Collectivités et parcs", "Communes forestières, parcs naturels régionaux"]],
    acces: ["Bac pro forêt, BTSA gestion forestière, licence pro : la formation se fait aussi en alternance.", "Le concours de technicien·ne forestier·ère de l'ONF est la voie vers un poste public ; prépare-toi aux épreuves écrites et physiques.", "Les expériences de terrain (stages, chantiers de reboisement) comptent beaucoup.", "Dans le secteur privé, les postes se trouvent par candidature directe auprès des exploitants et des coopératives."],
    net: [2, "Le milieu est petit : stages, chantiers et connaissances locales comptent."],
    sav: ["Dendrologie (reconnaissance des arbres)", "Sylviculture et gestion durable", "Cartographie et GPS", "Réglementation forestière et environnementale", "Sécurité en forêt (tronçonneuse, abattage)"],
    out: ["QGIS, GPS forestier", "Matériel de mesure (compas, dendromètre)", "Certificat de tronçonneuse"],
    evo: "Responsable d'unité territoriale, expert·e forestier·ère, ingénieur·e forestier·ère par passerelle, chef·fe de chantier."
  },
  oenologue: {
    emp: [["Domaines viticoles et caves", "Châteaux et domaines (Bordeaux, Bourgogne, Champagne, Languedoc, Vallée du Rhône)"], ["Maisons de négoce et de champagne", "Moët & Chandon, Veuve Clicquot, Louis Latour, Jean-Claude Boisset"], ["Laboratoires et conseil", "Laboratoires d'analyses œnologiques, cabinets de conseil, coopératives"], ["Fournisseurs et distribution", "Fournisseurs de levures et d'équipements (Lallemand, Laffort), négociants"]],
    acces: ["DNO (diplôme national d'œnologue, 5 ans après le bac) dans les universités de Bordeaux, Montpellier, Reims, Dijon ou Toulouse, ou BTSA viticulture-œnologie puis licence pro.", "Les vendanges, les stages et les saisons dans des domaines français et étrangers sont ton meilleur apprentissage.", "Une expérience à l'étranger (Australie, Chili, Californie, Afrique du Sud) est très valorisée.", "Pour devenir maître de chai, on monte souvent par l'expérience dans un même domaine."],
    net: [3, "Le milieu du vin est petit et très relationnel : les recommandations de viticulteur·rices et d'ancien·nes pèsent beaucoup."],
    sav: ["Viticulture et physiologie de la vigne", "Microbiologie de la fermentation", "Analyse sensorielle (dégustation)", "Chimie du vin", "Réglementation viticole et appellations"],
    out: ["Matériel de laboratoire œnologique", "Logiciels de gestion de cave", "Anglais pour les marchés internationaux"],
    evo: "Directeur·rice technique de domaine, consultant·e œnologue, directeur·rice de production, création de sa propre cuvée."
  },
  macon: {
    emp: [["Entreprises générales du bâtiment", "Vinci Construction, Bouygues, Eiffage et leurs filiales régionales"], ["PME et artisans", "Entreprises locales de maçonnerie (la majorité des emplois)"], ["Promoteurs et constructeurs de maisons", "Constructeurs de maisons individuelles, promoteurs"], ["Rénovation et patrimoine", "Entreprises de restauration de monuments historiques"]],
    acces: ["CAP maçon, bac pro technicien·ne du bâtiment option gros œuvre, puis brevet professionnel : l'apprentissage est la voie dominante.", "Les entreprises recrutent massivement des apprenti·es : un bon dossier et de la motivation suffisent.", "Après quelques années, on devient compagnon, chef d'équipe, puis conducteur de travaux ou artisan.", "Les Compagnons du Devoir offrent un tour de France de formation très reconnu."],
    net: [1, "Le secteur manque de bras : un patron prend volontiers un·e apprenti·e motivé·e."],
    sav: ["Lecture de plans et métrés", "Coulage du béton, maçonnerie de briques et de parpaings", "Ferraillage, coffrage", "Sécurité sur chantier", "Calcul de quantités de matériaux"],
    out: ["Outillage de maçon (truelle, niveau, bétonnière)", "Habilitations sécurité (travail en hauteur, CACES)", "Permis B"],
    evo: "Chef·fe d'équipe, conducteur·rice de travaux, artisan·e à son compte, formateur·rice."
  },
  geometre: {
    emp: [["Cabinets de géomètres-experts", "Cabinets indépendants (nombreux sur tout le territoire), groupes (Geofit, Cabinet Gaudin, Axis Conseils)"], ["Bureaux d'études et ingénierie", "Egis, Setec, Artelia, bureaux d'études de génie civil"], ["Collectivités et institutions", "IGN, services cadastre, métropoles, régions"], ["Construction et énergie", "Vinci Construction, Eiffage, SNCF Réseau, RTE"]],
    acces: ["BTS géomètre-topographe (2 ans), licence pro, ou école d'ingénieurs spécialisée (ESGT au Mans, INSA Strasbourg).", "L'alternance est très appréciée : les cabinets manquent de technicien·nes et forment leurs apprenti·es.", "Pour devenir géomètre-expert (profession réglementée), il faut un diplôme d'ingénieur ou un master, 2 ans de stage, puis l'examen du DPLG ou du diplôme d'État.", "Les cabinets recrutent par candidature directe et via les écoles."],
    net: [1, "Le métier manque de professionnel·les : le diplôme et un bon stage suffisent."],
    sav: ["Topographie et géodésie", "Cartographie, cadastre et droit foncier", "Instruments de mesure (GNSS, tachéomètre, scanner laser, drone)", "Dessin assisté par ordinateur", "Droit de la propriété et de la copropriété"],
    out: ["AutoCAD, Covadis, QGIS", "GNSS, tachéomètre, drone", "Logiciels de nuages de points"],
    evo: "Géomètre-expert (profession libérale), responsable d'agence, chef·fe de projet, expert·e foncier·ère."
  },
  couvreur: {
    emp: [["Entreprises de couverture et charpente", "PME et artisans de toiture (majorité des emplois)"], ["Entreprises générales du bâtiment", "Vinci, Bouygues, Eiffage (filiales de couverture)"], ["Énergie et rénovation", "Installateurs de panneaux solaires, entreprises de rénovation énergétique"], ["Patrimoine", "Entreprises de monuments historiques, Compagnons du Devoir"]],
    acces: ["CAP couvreur ou bac pro technicien·ne du bâtiment option couverture, en apprentissage de préférence.", "Les patrons de couverture cherchent des apprenti·es : un stage ou un contrat te mène vite à l'emploi.", "Obtiens les habilitations de travail en hauteur et d'échafaudage : elles sont exigées sur chantier.", "Après quelques années, on devient chef d'équipe, conducteur de travaux ou artisan."],
    net: [1, "Le secteur manque de bras : la motivation et un bon essai suffisent."],
    sav: ["Matériaux de couverture (tuile, ardoise, zinc, bac acier)", "Étanchéité et isolation de toiture", "Lecture de plans et métrés", "Sécurité du travail en hauteur", "Notions de pose de panneaux solaires"],
    out: ["Outillage de couvreur", "Habilitations travail en hauteur et échafaudage", "Permis B"],
    evo: "Chef·fe d'équipe, conducteur·rice de travaux, artisan·e couvreur·se, formateur·rice."
  },
  sommelier: {
    emp: [["Restaurants gastronomiques et étoilés", "Restaurants étoilés Michelin, tables de grands chefs"], ["Hôtels et palaces", "Ritz Paris, Le Meurice, Plaza Athénée, hôtels de luxe"], ["Caves et cavistes", "Cavistes indépendants, Nicolas, Cavavin"], ["Négoce et production", "Négociants en vin, domaines, importateurs"]],
    acces: ["CAP cuisine ou restaurant, puis mention complémentaire sommellerie (1 an), BTS MHR option sommellerie ou brevet professionnel sommelier.", "Les stages dans de grandes maisons sont la meilleure vitrine : candidate un an à l'avance.", "Participe aux concours (Meilleur Sommelier de France, Meilleur Ouvrier de France) : ils lancent les carrières.", "Visite les vignobles et goûte beaucoup : la mémoire du goût se construit par la pratique."],
    net: [3, "Les recommandations de chef·fes, de sommelier·ères et de domaines pèsent beaucoup pour accéder aux grandes maisons."],
    sav: ["Viticulture, vinification et appellations", "Dégustation et vocabulaire du vin", "Accords mets et vins", "Gestion d'une carte et d'une cave", "Service et relation client"],
    out: ["Tastevin, carafe, tire-bouchon professionnel", "WSET (formation internationale)", "Anglais"],
    evo: "Chef·fe sommelier·ère, directeur·rice des vins, caviste, consultant·e, création de son bar à vins ou de sa cave."
  },
  "guide-touristique": {
    emp: [["Musées et monuments", "Centre des monuments nationaux, musées, châteaux, villes d'art et d'histoire"], ["Offices de tourisme", "Offices de tourisme communaux ou intercommunaux"], ["Agences réceptives et voyagistes", "Agences de voyage, croisiéristes, tour-opérateurs"], ["Indépendant·e", "Guide à son compte, visites privées, free tours"]],
    acces: ["Licence pro guide-conférencier (après un Bac+2 ou Bac+3 en histoire, art, géographie, langues) ou licence/master adapté.", "La carte professionnelle de guide-conférencier est obligatoire pour guider dans un musée ou un monument.", "Perfectionne au moins une langue étrangère, idéalement deux : elles élargissent beaucoup les débouchés.", "Constitue tes propres visites : un circuit original attire les offices de tourisme et les voyagistes."],
    net: [2, "Les offices de tourisme et les agences recrutent par candidature ; les recommandations comptent pour les visites privées."],
    sav: ["Histoire de l'art, histoire locale", "Prise de parole et techniques de visite", "Langues vivantes", "Règlementation du tourisme", "Gestion de groupe"],
    out: ["Carte professionnelle de guide-conférencier", "Langues (niveau C1)", "Outils de réservation en ligne"],
    evo: "Guide spécialisé·e (art, histoire, nature), responsable de service des publics, créateur·rice d'agence, formateur·rice."
  },
  "receptionniste-hotel": {
    emp: [["Grands groupes hôteliers", "Accor, Hilton, Marriott, Hyatt, IHG, Radisson"], ["Palaces et hôtels de luxe", "Le Ritz, Le Meurice, Le Bristol, Plaza Athénée, Four Seasons"], ["Hôtels indépendants et chaînes", "Louvre Hotels, Groupe Barrière, hôtels familiaux"], ["Résidences et hébergements", "Résidences de tourisme, campings haut de gamme, auberges"]],
    acces: ["Bac pro commercialisation et services en restauration ou accueil, BTS MHR (management en hôtellerie-restauration) ou BTS tourisme.", "L'alternance est très appréciée : tu es payé·e, en poste dès la 1re année et souvent embauché·e ensuite.", "Maîtrise l'anglais et une deuxième langue : c'est une exigence dans les hôtels internationaux.", "On démarre souvent à la réception ou au service client, puis on monte vers chef·fe de réception et direction."],
    net: [1, "Les hôtels recrutent beaucoup toute l'année : un bon CV et des langues suffisent."],
    sav: ["Accueil et gestion des réclamations", "Logiciels hôteliers et réservations", "Anglais et une 2e langue", "Notions de comptabilité hôtelière", "Connaissance de la ville et des services locaux"],
    out: ["Logiciels hôteliers (Opera, Protel, Mews)", "Anglais (TOEIC)", "Outils de réservation (Booking, Expedia)"],
    evo: "Chef·fe de réception, directeur·rice adjoint·e, directeur·rice d'hôtel, responsable de relation client."
  }
});
