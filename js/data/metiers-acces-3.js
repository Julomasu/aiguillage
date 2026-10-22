/* Fiches métiers : qui recrute, comment y entrer, ce qu'il faut savoir (3/4 : droit, sécurité, art, social, nature). Format : voir metiers-acces-1.js.
   tst : identifiants de tests, concours et certifications utiles (voir js/data/passerelles.js), affichés avec un lien vers la page « Passerelles et tests ». */
A.METIERS_ACCES = A.METIERS_ACCES || {};
Object.assign(A.METIERS_ACCES, {
  avocat: {
    emp: [["Grands cabinets d'affaires", "Gide, Bredin Prat, Darrois Villey, Cleary Gottlieb, Linklaters, Clifford Chance, Latham & Watkins, August Debouzy"], ["Cabinets moyens et boutiques", "Cabinets spécialisés (fiscal, social, propriété intellectuelle, contentieux)"], ["Barreaux et cabinets généralistes", "Cabinets de ville, avocat·es pénalistes, familialistes, à leur compte"], ["Directions juridiques", "Avocat·es salarié·es d'entreprise, associations, ONG"]],
    acces: ["Licence de droit, puis master 2 (droit des affaires, fiscal, pénal…), puis examen d'entrée à l'école d'avocats (CRFPA) : environ 18 mois de formation et un stage avant le CAPA.", "Les stages en cabinet pendant le master sont la vraie porte d'entrée : beaucoup de collaborateur·rices sont recruté·es après un stage ou un contrat de « collaborateur élève ».", "Participe aux concours de plaidoiries, aux cliniques juridiques et aux conférences d'éloquence : ils se remarquent dans les CV.", "Dans les grands cabinets d'affaires, l'anglais courant est indispensable ; un LL.M. à l'étranger est souvent un plus."],
    net: [3, "Le réseau pèse beaucoup, surtout pour s'installer et trouver des clients : anciens de ta fac, maîtres de stage, confrères. Écris aux avocat·es que tu rencontres en stage et reste en contact."],
    sav: ["Droit civil, droit des obligations, procédure", "Une matière de spécialisation (affaires, pénal, social, fiscal…)", "Rédaction juridique claire (consultations, conclusions)", "Plaidoirie et prise de parole", "Anglais juridique", "Déontologie de l'avocat"],
    out: ["Bases de données juridiques (Lexis360, Dalloz, Doctrinal)", "Légifrance", "Examen d'entrée CRFPA", "LL.M. (diplôme de droit anglo-saxon) en option"],
    tst: ["crfpa", "toeic"],
    evo: "Collaborateur·rice puis associé·e, installation à son compte, juriste d'entreprise, magistrat·e (concours), enseignement."
  },
  juriste: {
    emp: [["Grandes entreprises (directions juridiques)", "Sociétés du CAC 40 : TotalEnergies, AXA, BNP Paribas, L'Oréal, Airbus, Orange"], ["Banques, assurances, mutuelles", "BNP Paribas, Crédit Agricole, AXA, Generali"], ["PME et ETI", "Souvent un poste de juriste généraliste"], ["Cabinets et administrations", "Cabinets d'avocat·es, collectivités, autorités de régulation"]],
    acces: ["Master de droit des affaires, droit social, droit du numérique ou droit public selon le secteur visé.", "Alternance ou stage de 6 mois en direction juridique : c'est le meilleur chemin vers un premier poste.", "Certains juristes passent d'abord en cabinet d'avocats avant de rejoindre une entreprise.", "Des spécialisations (RGPD, propriété intellectuelle, conformité) ouvrent des postes recherchés."],
    net: [2, "Les stages, les alumni du master et les contacts en cabinet aident ; les offres se trouvent aussi par candidature directe."],
    sav: ["Droit des contrats et des sociétés", "Droit de la conformité et de la protection des données (RGPD)", "Rédaction et négociation de contrats", "Veille juridique", "Anglais juridique"],
    out: ["Bases de données juridiques (Dalloz, Lexis)", "Outils de gestion de contrats", "Certification DPO (délégué·e à la protection des données)"],
    tst: ["toeic"],
    evo: "Responsable juridique, directeur·rice juridique, avocat·e, DPO, compliance officer."
  },
  policier: {
    emp: [["Police nationale", "Sécurité publique, police judiciaire, CRS, police aux frontières, renseignement"], ["Police municipale", "Mairies et communes (concours propre)"], ["Gendarmerie nationale", "Brigades territoriales, sections de recherches"], ["Services spécialisés", "DGSI, police technique et scientifique"]],
    acces: ["Concours de gardien·ne de la paix : accessible avec le bac, sur épreuves écrites, sportives et orales. Prépare-toi en avance au sport et à la culture générale.", "Après le concours, environ 1 an de formation rémunérée en école de police (Nîmes, Oissel, Reims, Toulouse…).", "Des dispositifs d'aide à la préparation existent : « cadets de la République » (formation rémunérée pour préparer le concours).", "Pour devenir officier ou commissaire, on passe un concours à bac+3 ou bac+5 selon le grade ; la police scientifique recrute des profils scientifiques."],
    net: [1, "Le recrutement se fait par concours : le réseau ne compte pas, la préparation oui."],
    sav: ["Culture générale et actualité", "Droit pénal et procédure de base", "Rédaction de procès-verbaux", "Condition physique (tests d'endurance et de natation)", "Sang-froid, déontologie"],
    out: ["Concours de gardien·ne de la paix", "Concours d'officier ou de commissaire", "Préparation physique"],
    tst: [],
    evo: "Brigadier, lieutenant, capitaine, commissaire ; spécialisation (police judiciaire, cyber, brigade canine)."
  },
  diplomate: {
    emp: [["Ministère de l'Europe et des Affaires étrangères", "Ambassades, consulats, représentations à l'ONU, à l'OTAN, à l'Union européenne"], ["Organisations internationales", "ONU, OCDE, Banque mondiale, Commission européenne"], ["Institutions et entreprises", "Think tanks, ONG, grandes entreprises à l'international"]],
    acces: ["Concours du Quai d'Orsay : conseiller·ère des affaires étrangères (bac+5) ou secrétaire des affaires étrangères (bac+3), préparés à Sciences Po, en prépa ENS ou en master d'affaires internationales.", "Prépare plusieurs langues (anglais courant, et si possible une langue rare : arabe, russe, mandarin).", "Les stages en ambassade ou en organisation internationale (VIE, stages au ministère) sont les meilleures références.", "Les concours sont très sélectifs : il faut souvent plusieurs tentatives et une bonne culture générale géopolitique."],
    net: [1, "L'entrée se fait par concours ; ensuite le réseau compte pour les affectations."],
    sav: ["Relations internationales, géopolitique, histoire contemporaine", "Droit international public", "Économie internationale", "Plusieurs langues étrangères", "Rédaction de notes de synthèse"],
    out: ["Concours du Quai d'Orsay", "VIE (volontariat international en entreprise ou en administration)", "Langues (IELTS, TOEFL, DELE, HSK selon la langue)"],
    tst: ["toefl-ielts"],
    evo: "Secrétaire d'ambassade, conseiller·ère, consul·e, ambassadeur·rice, directeur·rice dans une organisation internationale."
  },
  pompier: {
    emp: [["Services départementaux (SDIS)", "Sapeurs-pompiers professionnels et volontaires de chaque département"], ["Brigade de sapeurs-pompiers de Paris", "Unité militaire qui recrute sans concours sur sélection"], ["Marins-pompiers de Marseille", "Bataillon militaire"], ["Autres", "Sécurité civile, pompiers de l'air, pompiers d'entreprise, aéroports"]],
    acces: ["Commence par devenir sapeur-pompier volontaire à partir de 16 ans, ou par les jeunes sapeurs-pompiers (JSP) : c'est la meilleure préparation.", "Le concours de sapeur-pompier professionnel est très sélectif, avec des épreuves sportives et une partie écrite ; il faut souvent plusieurs tentatives.", "Pour Paris ou Marseille, l'engagement se fait sur dossier et sélection (épreuves sportives, entretien).", "La condition physique et la natation sont essentielles : prépare-toi au long cours."],
    net: [1, "Le concours et la sélection sont impersonnels ; être volontaire dans ta caserne aide pour la connaissance du métier."],
    sav: ["Secourisme (PSC1, formation secours à personne)", "Condition physique et natation", "Bases de mécanique et de lecture de plan", "Gestion du stress et travail d'équipe", "Culture générale pour les épreuves écrites"],
    out: ["Concours de sapeur-pompier professionnel", "Formations secours (PSC1, SST)", "Permis B puis permis poids lourd"],
    tst: [],
    evo: "Caporal, sergent, adjudant, lieutenant, capitaine ; spécialités (plongeur, sauvetage déblaiement, risques chimiques)."
  },
  graphiste: {
    emp: [["Agences de communication et de publicité", "Publicis, Havas, BETC, Dragon Rouge, agences de branding"], ["Éditeurs, presse et médias", "Gallimard, Hachette, Le Monde, L'Équipe, France Télévisions"], ["Marques et entreprises", "Studios intégrés de LVMH, Decathlon, Michelin, BlaBlaCar"], ["Freelance et studios", "Studios de design, missions pour start-up et institutions"]],
    acces: ["DN MADE graphisme, BUT MMI, école de design ou d'art (Gobelins, Estienne, Penninghen, ENSAD…) puis portfolio.", "Le portfolio décide : il montre 8 à 12 projets de qualité, bien expliqués, sur Behance ou un site personnel.", "Stages et alternance en agence, puis premiers postes en junior ; beaucoup de graphistes travaillent d'abord en freelance.", "Participe à des concours (Graphisme en France, Prix de la jeune création) et à des salons : ça te fait remarquer."],
    net: [2, "Le portfolio parle d'abord, mais les recommandations et les contacts d'école jouent beaucoup pour décrocher stages et premiers contrats."],
    sav: ["Typographie, mise en page, composition", "Théorie des couleurs", "Direction artistique et identité visuelle", "Culture graphique (histoire du design)", "Écoute du client et du brief"],
    out: ["Suite Adobe (Illustrator, Photoshop, InDesign)", "Figma", "Procreate, After Effects (motion)", "Portfolio en ligne (Behance, Cargo)"],
    tst: [],
    evo: "Directeur·rice artistique, responsable de studio, indépendant·e, designer UX/UI."
  },
  architecte: {
    emp: [["Agences d'architecture", "Ateliers Jean Nouvel, Dominique Perrault Architecture, Wilmotte & Associés, Lacaton & Vassal, Rudy Ricciotti"], ["Promoteurs et groupes de construction", "Nexity, Bouygues Immobilier, VINCI Construction, Icade"], ["Maîtrise d'ouvrage publique", "Collectivités, bailleurs sociaux, État"], ["Bureaux d'études et agences d'urbanisme", "Egis, Artelia, Setec"]],
    acces: ["École nationale supérieure d'architecture (ENSA), puis diplôme d'État d'architecte (bac+5), puis l'HMONP (habilitation, 1 an) pour signer en son nom.", "Les stages en agence (obligatoires) sont ta meilleure porte d'entrée : on est souvent embauché·e dans l'agence où l'on a fait son stage.", "Le portfolio est décisif : projets d'école, relevés, maquettes, plans propres.", "Participe aux concours d'étudiants et aux workshops pour te faire remarquer."],
    net: [3, "Les petites agences recrutent surtout par contacts, recommandations d'enseignant·es et stages : le réseau de ton école et de tes maîtres de stage est précieux."],
    sav: ["Dessin, plan, coupe, perspective", "Histoire de l'architecture et de la ville", "Construction, structure, réglementation", "Conception énergétique et environnementale", "Gestion de chantier"],
    out: ["AutoCAD, Revit, ArchiCAD", "Rhino, SketchUp", "Suite Adobe (InDesign, Photoshop)", "Maquette physique"],
    tst: [],
    evo: "Architecte associé·e, chef·fe de projet, urbaniste, maître d'œuvre, enseignant·e."
  },
  journaliste: {
    emp: [["Agences et presse nationale", "AFP, Le Monde, Le Figaro, Libération, Les Échos, Le Parisien"], ["Presse régionale", "Ouest-France, Sud Ouest, La Voix du Nord, Le Dauphiné libéré"], ["Audiovisuel", "France Télévisions, Radio France, TF1, M6, Canal+, BFM"], ["Médias numériques", "Mediapart, Brut, Konbini, Le HuffPost"]],
    acces: ["Les écoles reconnues par la profession (CFJ, ESJ Lille, IPJ, Sciences Po, CELSA, IJBA, EJT, EPJT, EJDG) sont la voie classique, mais pas obligatoire.", "Fais des stages dans des rédactions locales (presse régionale, radio locale) : tu y apprends vite et tu y signes tes premiers articles.", "Pige (travail à l'article) puis CDD : la plupart des journalistes commencent précaires avant un CDI.", "Constitue un dossier de publications (articles, reportages, podcasts) et demande la carte de presse dès que tu en es éligible."],
    net: [3, "Les rédactions recrutent beaucoup par recommandation : stages, anciens de ton école, rédacteur·rices en chef qui te connaissent."],
    sav: ["Écriture journalistique (angle, titre, attaque)", "Vérification des faits", "Culture générale politique, économique et sociale", "Droit de la presse", "Interview et reportage", "Montage son et vidéo de base"],
    out: ["Logiciels de montage (Audacity, Premiere Pro)", "Réseaux sociaux professionnels", "Carte de presse (commission paritaire)", "Anglais"],
    tst: [],
    evo: "Grand reporter, rédacteur·rice en chef, présentateur·rice, journaliste spécialisé·e, indépendant·e."
  },
  "motion-designer": {
    emp: [["Studios d'animation", "Illumination Mac Guff, Mikros Animation, TeamTO, Xilam, Dwarf Animation, Cube Creative"], ["Jeu vidéo et effets visuels", "Ubisoft, Don't Nod, BUF, Mikros Image"], ["Agences et marques", "Havas, Publicis, studios de motion design, agences digitales"], ["Freelance et télévision", "Chaînes, production audiovisuelle, créateurs de contenu"]],
    acces: ["Écoles reconnues dans l'animation (Gobelins, Rubika, ESMA, ARTFX, ISART Digital, MoPA, Émile Cohl) puis portfolio ou showreel.", "Le showreel (1 minute de tes meilleurs travaux) est la carte de visite : soigne-le et mets-le sur Vimeo.", "Stages et alternance dans des studios, souvent en France (Paris, Angoulême, Lyon, Montpellier) et en Belgique ou au Canada.", "Participe au festival d'Annecy et à des rencontres professionnelles : les studios y repèrent les jeunes."],
    net: [3, "Le milieu est petit : showreel, festivals (Annecy), anciens d'école et recommandations comptent énormément."],
    sav: ["Principes de l'animation (12 principes, timing, rythme)", "Dessin et anatomie", "Modélisation, animation et rendu 3D", "Montage et narration", "Culture du cinéma d'animation"],
    out: ["Blender, Maya, Houdini", "After Effects, Cinema 4D", "Photoshop, Procreate", "Showreel en ligne"],
    tst: [],
    evo: "Animateur·rice senior, lead animation, réalisateur·rice, directeur·rice artistique, indépendant·e."
  },
  "community-manager": {
    emp: [["Marques et grandes entreprises", "Decathlon, L'Oréal, SNCF, Orange, Netflix France"], ["Agences social media", "Havas, Publicis, agences digitales spécialisées"], ["Médias et institutions", "Médias, collectivités, ministères, associations"], ["Start-up et indépendant·es", "Missions pour des PME, créateurs de contenu"]],
    acces: ["BTS communication, BUT info-com ou MMI, école de communication ou de commerce.", "L'alternance est le meilleur moyen d'entrer : de nombreuses entreprises forment des alternant·es sur leurs réseaux.", "Montre un compte à toi, un projet associatif ou un client freelance avec de vrais résultats (statistiques, croissance).", "Les employeurs attendent aussi du montage vidéo court et de l'écriture : prépare un petit portfolio de contenus."],
    net: [1, "Les offres sont nombreuses : un bon portfolio et un stage suffisent à démarrer."],
    sav: ["Plateformes sociales et leur algorithme (Instagram, TikTok, LinkedIn)", "Rédaction et création de contenus", "Analyse des statistiques (portée, engagement)", "Gestion de crise et de modération", "Droit de l'image et publicité"],
    out: ["Canva, CapCut, Premiere Pro", "Outils de planification (Hootsuite, Buffer)", "Google Analytics et statistiques natives", "ChatGPT et outils d'IA pour la création"],
    tst: [],
    evo: "Social media manager, responsable communication digitale, responsable de contenu, consultant·e indépendant·e."
  },
  "ingenieur-son": {
    emp: [["Radio et télévision", "Radio France, France Télévisions, chaînes privées"], ["Salles et festivals", "Philharmonie de Paris, Olympia, festivals de musique"], ["Prestataires de sonorisation", "Dushow, TSF, Novelty, prestataires de tournée"], ["Cinéma, jeu vidéo et studios", "Studios de post-production, studios d'enregistrement, studios de jeu vidéo (Ubisoft)"]],
    acces: ["BTS métiers de l'audiovisuel option son, formations de l'ENS Louis-Lumière, écoles privées (3iS, SAE, ESRA…) ou licence pro métiers du son.", "Les stages en studio, en salle ou chez un prestataire sont la porte d'entrée ; beaucoup commencent comme assistant·e son ou technicien·ne plateau.", "Le statut d'intermittent·e du spectacle structure les débuts : il faut cumuler des heures pour ouvrir ses droits.", "Un portfolio d'enregistrements et de mixes (SoundCloud) est ton CV."],
    net: [3, "Le milieu fonctionne par recommandation : on appelle les technicien·nes dont on connaît le sérieux. Les stages et les premières missions construisent ton carnet d'adresses."],
    sav: ["Acoustique et physique du son", "Prise de son, microphones, câblage", "Mixage, mastering, traitement du signal", "Culture musicale et cinéma", "Réglages de salle et sonorisation en direct"],
    out: ["Pro Tools, Reaper, Logic, Ableton", "Consoles numériques (Yamaha, DiGiCo)", "Plug-ins de traitement (EQ, compresseurs)", "Certifications Pro Tools"],
    tst: [],
    evo: "Ingénieur·e du son en chef, mixeur·se, directeur·rice technique, concepteur·rice sonore."
  },
  styliste: {
    emp: [["Maisons de luxe", "LVMH (Louis Vuitton, Dior), Kering (Saint Laurent, Balenciaga), Chanel, Hermès"], ["Marques de prêt-à-porter", "SMCP (Sandro, Maje), Zadig & Voltaire, Kiabi, Etam, Celio"], ["Bureaux de style et accessoires", "Bureaux de tendances, maroquinerie, lingerie"], ["Créateur·rice indépendant·e", "Lancement de sa propre marque, freelance"]],
    acces: ["DN MADE mode, écoles de mode (ESMOD, Studio Berçot, IFM, La Cambre à Bruxelles) ou formations en couture.", "Les stages dans des maisons de couture ou de luxe sont les plus recherchés : candidate un an à l'avance, avec un book.", "Les concours (Hyères, ANDAM) lancent de jeunes créateur·rices, mais sont très sélectifs.", "Ton book et tes collections d'école sont ta carte de visite : montre un univers personnel et une vraie technique de construction."],
    net: [3, "La mode est un milieu de réseau : assistants et stagiaires sont souvent recommandé·es. Les professeur·es de ton école et les maisons où tu fais ton stage comptent beaucoup."],
    sav: ["Dessin de mode et croquis", "Patronage et couture (technique de construction)", "Culture de la mode et veille des tendances", "Connaissance des matières", "Bases de la production et du sourcing"],
    out: ["Illustrator, Photoshop", "Logiciels de patronage (Lectra, Gerber)", "Machine à coudre et mannequin", "Book et lookbook"],
    tst: [],
    evo: "Assistant·e styliste, styliste, directeur·rice artistique, créateur·rice de sa marque."
  },
  "prof-ecoles": {
    emp: [["Éducation nationale", "Écoles maternelles et élémentaires publiques"], ["Enseignement privé sous contrat", "Écoles privées catholiques ou laïques sous contrat avec l'État"], ["Éducation spécialisée et autres", "Dispositifs d'accueil, enseignement à l'étranger (réseau AEFE)"]],
    acces: ["Licence puis master MEEF (métiers de l'enseignement) : le concours (CRPE) est la porte d'entrée dans le public.", "Les modalités du concours évoluent (passage à bac+3) : vérifie le calendrier officiel pour ta promotion.", "Les stages d'observation et les jobs en périscolaire (BAFA, animation) te donnent de l'expérience pour les épreuves orales.", "Après réussite, tu es affecté·e dans une académie : la région d'affectation dépend de ton rang et des besoins."],
    net: [1, "Concours national : le rang décide, pas le réseau."],
    sav: ["Programmes de l'école primaire (français, maths)", "Didactique et pédagogie de la petite enfance", "Psychologie de l'enfant", "Gestion de classe", "Culture générale et expression écrite pour le concours"],
    out: ["Concours de professeur·e des écoles (CRPE)", "BAFA pour l'expérience", "Outils numériques de classe (ENT, tableaux interactifs)"],
    tst: ["crpe-capes"],
    evo: "Directeur·rice d'école, conseiller·ère pédagogique, inspecteur·rice, enseignant·e spécialisé·e."
  },
  "prof-lycee": {
    emp: [["Éducation nationale", "Collèges et lycées publics"], ["Enseignement privé sous contrat", "Lycées privés sous contrat"], ["Enseignement supérieur et autres", "Lycées agricoles, établissements français à l'étranger (AEFE)"]],
    acces: ["Licence dans ta discipline, puis master MEEF : on passe le CAPES (ou l'agrégation, plus sélective) pour devenir enseignant·e titulaire.", "Les matières en tension (maths, physique-chimie, lettres classiques, allemand, matières techniques) recrutent plus facilement, y compris par contrat.", "Les remplacements comme contractuel·le te permettent d'entrer dans l'enseignement avant le concours.", "Soigne tes épreuves orales : leçon, entretien de motivation."],
    net: [1, "Concours national : le rang décide ; le réseau compte peu."],
    sav: ["Maîtrise approfondie de ta discipline", "Didactique et construction de séquences", "Gestion de classe et pédagogie", "Évaluation des élèves", "Culture de l'institution scolaire"],
    out: ["CAPES ou agrégation", "Outils numériques éducatifs", "Master MEEF"],
    tst: ["crpe-capes"],
    evo: "Professeur·e agrégé·e, professeur·e principal·e, chef·fe d'établissement, inspecteur·rice."
  },
  "educ-spe": {
    emp: [["Associations du secteur social", "APF France handicap, Apprentis d'Auteuil, Croix-Rouge, Fondation Œuvres de bienfaisance"], ["Départements et protection de l'enfance", "Aide sociale à l'enfance, foyers, maisons d'enfants"], ["Établissements médico-sociaux", "IME, ITEP, centres d'hébergement"], ["Justice", "Protection judiciaire de la jeunesse, services pénitentiaires d'insertion et de probation"]],
    acces: ["Diplôme d'État d'éducateur·rice spécialisé·e (DEES), préparé dans un institut de formation (IRTS, ASKORIA…) en 3 ans, avec de longs stages.", "L'admission se fait sur dossier et entretien, parfois via Parcoursup ou en candidature directe.", "Une expérience d'animation, de bénévolat ou de service civique te distingue pour l'entretien.", "À la sortie, les structures recrutent beaucoup : beaucoup de postes sont ouverts."],
    net: [1, "La demande est forte : le dossier et les stages suffisent."],
    sav: ["Psychologie du développement, sociologie", "Législation de la protection de l'enfance", "Accompagnement éducatif au quotidien", "Travail en équipe pluridisciplinaire", "Rédaction de rapports"],
    out: ["Diplôme d'État DEES", "BAFA / BAFD pour l'expérience", "Permis B"],
    tst: [],
    evo: "Coordinateur·rice, chef·fe de service éducatif, directeur·rice d'établissement, formateur·rice."
  },
  "assistant-social": {
    emp: [["Départements et communes", "Services sociaux départementaux, CCAS, mairies"], ["Hôpitaux et établissements de santé", "CHU, cliniques, services de psychiatrie"], ["Organismes de protection sociale", "CAF, MSA, CPAM, Carsat"], ["Éducation nationale et entreprises", "Collèges et lycées, services sociaux d'entreprise"]],
    acces: ["Diplôme d'État d'assistant·e de service social (DEASS) en 3 ans, dans un institut de formation.", "L'admission se fait sur dossier, épreuves et entretien (via Parcoursup ou candidature directe).", "Un engagement associatif, un service civique ou un job au contact du public est un vrai plus.", "À la sortie, les fonctions publiques territoriale et hospitalière recrutent beaucoup, par concours ou contrat."],
    net: [1, "Les employeurs publics recrutent régulièrement : le diplôme suffit."],
    sav: ["Droit de la famille, droit social, droits des étrangers", "Aides et prestations sociales", "Techniques d'entretien et d'écoute", "Travail en réseau avec les partenaires", "Rédaction de rapports sociaux"],
    out: ["Diplôme d'État DEASS", "Logiciels de suivi des dossiers", "Permis B"],
    tst: [],
    evo: "Assistant·e social·e principal·e, cadre socio-éducatif, responsable de service, formateur·rice."
  },
  "coach-sportif": {
    emp: [["Salles de sport et clubs", "Basic-Fit, Fitness Park, L'Orange Bleue, Neoness, Keepcool, Waou"], ["Clubs et fédérations", "Clubs sportifs, fédérations, comités départementaux"], ["Collectivités et entreprises", "Mairies, centres aquatiques, comités d'entreprise, sport-santé"], ["Indépendant·e", "Coaching à domicile ou en ligne, parc, studios"]],
    acces: ["BPJEPS activités de la forme (1 an), licence STAPS ou DEJEPS : le diplôme est obligatoire pour encadrer contre rémunération.", "La carte professionnelle d'éducateur·rice sportif·ve est obligatoire : elle se demande à la préfecture après ton diplôme.", "On débute souvent en salle ou en club avant de monter sa propre clientèle.", "Prépare un CV sportif : certifications, diplômes fédéraux, résultats en compétition."],
    net: [2, "Pour s'installer à son compte, le réseau et la recommandation font la clientèle ; en salle, on recrute par candidature."],
    sav: ["Anatomie et physiologie de l'effort", "Techniques d'entraînement et programmation", "Nutrition de base", "Pédagogie et motivation", "Premiers secours (PSC1)"],
    out: ["BPJEPS, DEJEPS ou licence STAPS", "Carte professionnelle", "Applications de suivi et de coaching", "Certificat de secourisme"],
    tst: [],
    evo: "Coach confirmé·e, responsable de salle, préparateur·rice physique, gérant·e d'une structure, enseignant·e en STAPS."
  },
  veterinaire: {
    emp: [["Cabinets et cliniques vétérinaires", "Cliniques indépendantes, groupes (AniCura, Mon Vétérinaire, Vetoquinol)"], ["Industrie et recherche", "Boehringer Ingelheim, Virbac, Ceva, Zoetis, INRAE"], ["État et santé publique", "Directions départementales de la protection des populations, abattoirs, douanes"], ["Autres", "Élevages, zoos, armée, enseignement"]],
    acces: ["Concours après une prépa BCPST, ou admission directe après le bac pour une partie des places (selon les écoles vétérinaires), puis 5 ou 6 ans d'études.", "Les stages sont obligatoires et très appréciés pour la sélection : fais-en dès le lycée en clinique ou en élevage.", "Le diplôme d'État de docteur vétérinaire permet l'exercice libéral.", "Beaucoup de jeunes vétérinaires commencent comme salarié·es, puis deviennent associé·es."],
    net: [2, "Les stages et les maîtres de stage jouent un rôle décisif pour les premiers postes et les collaborations."],
    sav: ["Biologie, physiologie, pathologie animale", "Anatomie comparée", "Pharmacologie vétérinaire", "Chirurgie de base", "Relation avec les propriétaires"],
    out: ["Logiciels de gestion de clinique", "Échographie, radiologie", "Diplôme d'État de docteur vétérinaire"],
    tst: [],
    evo: "Associé·e de clinique, spécialiste (chirurgie, imagerie), vétérinaire de santé publique, chercheur·se, enseignant·e en école vétérinaire."
  },
  agriculteur: {
    emp: [["Exploitations agricoles", "Exploitation familiale, GAEC, installation hors cadre familial"], ["Coopératives agricoles", "InVivo, Agrial, Terrena, Sodiaal, Tereos"], ["Conseil et accompagnement", "Chambres d'agriculture, centres de gestion, banques agricoles"], ["Salariat agricole", "Exploitations viticoles, maraîchères, élevage, entreprises de travaux agricoles"]],
    acces: ["Bac pro conduite et gestion de l'exploitation agricole (CGEA), BTSA ACSE ou BPREA (brevet professionnel) : le diplôme conditionne les aides.", "L'installation aidée (dotation jeune agriculteur) exige un projet et un parcours validé ; la Chambre d'agriculture t'accompagne.", "La reprise d'une ferme existante passe par les points d'accueil installation et les annonces de la Safer : beaucoup d'agriculteur·rices partent à la retraite dans 10 ans.", "Les stages et l'apprentissage en exploitation sont la meilleure façon d'apprendre et de trouver une ferme."],
    net: [2, "Le milieu fonctionne beaucoup par relations de voisinage et conseils entre agriculteur·rices ; les réseaux de la profession aident à trouver une ferme."],
    sav: ["Agronomie, élevage ou viticulture selon la production", "Gestion d'une exploitation (comptabilité, aides PAC)", "Mécanique et machinisme", "Réglementation environnementale", "Circuits courts et vente directe"],
    out: ["BPREA ou BTSA", "Permis tracteur (CACES)", "Logiciels de gestion agricole", "Dossier d'installation (DJA)"],
    tst: [],
    evo: "Chef·fe d'exploitation, associé·e dans un GAEC, conseiller·ère agricole, responsable de coopérative."
  },
  "charge-environnement": {
    emp: [["Bureaux d'études environnement", "Biotope, Ecosphère, Egis, Artelia, Setec, ANTEA Group"], ["Collectivités et État", "Régions, métropoles, DREAL, parcs naturels"], ["Associations", "LPO, France Nature Environnement, Conservatoires d'espaces naturels"], ["Grands groupes", "Veolia, Suez, EDF, Engie, TotalEnergies"]],
    acces: ["Master en écologie, environnement ou aménagement ; écoles d'ingénieurs avec option environnement.", "Les stages (6 mois) en bureau d'études ou en collectivité sont décisifs : beaucoup sont embauché·es à la fin.", "Les CDD sont fréquents au début ; la capacité à faire des inventaires naturalistes (faune, flore) est un vrai atout.", "Rejoins des associations naturalistes : elles forment et te mettent en contact avec les employeurs."],
    net: [2, "Le milieu est petit : les associations naturalistes et les stages ouvrent beaucoup de portes."],
    sav: ["Écologie, botanique, faune", "Réglementation environnementale (étude d'impact, loi sur l'eau)", "Cartographie (SIG)", "Statistiques de base", "Rédaction de rapports"],
    out: ["QGIS ou ArcGIS", "R ou Python pour les statistiques", "Matériel de terrain (GPS, appareils photo)", "Permis B"],
    tst: [],
    evo: "Chef·fe de projet environnement, ingénieur·e écologue, responsable biodiversité, directeur·rice d'un bureau d'études."
  },
  "tech-eolien": {
    emp: [["Constructeurs d'éoliennes", "Vestas, Siemens Gamesa, Nordex, GE Vernova, Enercon"], ["Exploitants de parcs éoliens", "EDF Renouvelables, Engie Green, TotalEnergies, Neoen, Valorem"], ["Entreprises de maintenance", "Sous-traitants spécialisés en maintenance éolienne"], ["Éolien en mer", "Parcs offshore (Saint-Nazaire, Fécamp, Courseulles-sur-Mer) et leurs prestataires"]],
    acces: ["BTS électrotechnique ou maintenance, bac pro maintenance puis formation éolien ; des centres de formation proposent des cursus dédiés (CAP, titres professionnels).", "Les certifications sécurité (travail en hauteur, GWO — Global Wind Organisation) sont obligatoires : elles se passent en centre agréé.", "Les contrats démarrent souvent en intérim ou en CDD chez un sous-traitant, puis un CDI chez le constructeur ou l'exploitant.", "Prévois d'être mobile : les parcs sont répartis sur tout le territoire, parfois en mer."],
    net: [1, "Les employeurs recrutent beaucoup : une formation reconnue et les certifications suffisent."],
    sav: ["Électrotechnique et mécanique", "Travail en hauteur et sauvetage", "Lecture de schémas et diagnostic", "Sécurité électrique", "Anglais technique"],
    out: ["Certifications GWO (Basic Safety Training, travail en hauteur)", "Habilitation électrique", "Aptitude médicale au travail en hauteur"],
    tst: [],
    evo: "Chef·fe d'équipe, technicien·ne expert·e, responsable de site, ingénieur·e maintenance."
  },
  paysagiste: {
    emp: [["Entreprises du paysage", "Idverde, entreprises régionales du paysage"], ["Agences de paysage et de conception", "Agence Ter, Michel Desvigne Paysagiste, agences indépendantes"], ["Collectivités", "Services espaces verts des mairies et métropoles"], ["Pépinières, parcs et jardins", "Pépinières, jardins historiques, Jardinerie"]],
    acces: ["CAP aménagements paysagers, bac pro, BTSA aménagements paysagers (ouvrier·ère ou technicien·ne), ou ENSP Versailles / ENSNP Blois pour concevoir (paysagiste concepteur·rice, bac+5).", "Les entreprises du paysage recrutent beaucoup en apprentissage : c'est la voie la plus directe.", "Pour concevoir, un portfolio de projets et des stages en agence sont essentiels.", "Les collectivités recrutent par concours ou contrat pour les services espaces verts."],
    net: [1, "Les entreprises recrutent régulièrement ; pour les agences de conception, le portfolio et les stages comptent plus."],
    sav: ["Botanique et connaissance des végétaux", "Techniques de plantation et d'entretien", "Dessin et conception de plans", "Conduite d'engins", "Gestion de chantier et devis"],
    out: ["AutoCAD, SketchUp, Photoshop", "Permis B et CACES", "Certiphyto (utilisation de produits)", "Dessin à main levée"],
    tst: [],
    evo: "Chef·fe d'équipe, conducteur·rice de travaux, paysagiste concepteur·rice, chef·fe d'entreprise."
  }
});
