/* Référentiel : lignes (domaines), spécialités du lycée, types de formations et formations concrètes.
   Les infos sont indicatives : elles servent à s'y retrouver, la source officielle reste Parcoursup / Onisep. */
window.A = window.A || {};

A.lignes = [
  { id: "sante",      num: 1,  nom: "Santé & soin",                    court: "Santé",      couleur: "#E4572E", texte: "#fff" },
  { id: "numerique",  num: 2,  nom: "Numérique & tech",                court: "Numérique",  couleur: "#2F5BEA", texte: "#fff" },
  { id: "industrie",  num: 3,  nom: "Industrie & ingénierie",          court: "Industrie",  couleur: "#F2A71B", texte: "#1a1300" },
  { id: "commerce",   num: 4,  nom: "Commerce, gestion & finance",     court: "Commerce",   couleur: "#1B998B", texte: "#fff" },
  { id: "droit",      num: 5,  nom: "Droit, politique & sécurité",     court: "Droit",      couleur: "#7A3FD1", texte: "#fff" },
  { id: "art",        num: 6,  nom: "Art, design & communication",     court: "Art & com",  couleur: "#E85D9E", texte: "#1f0012" },
  { id: "social",     num: 7,  nom: "Éducation, social & sport",       court: "Social",     couleur: "#F6D23B", texte: "#1f1a00" },
  { id: "nature",     num: 8,  nom: "Nature, agriculture & environnement", court: "Nature", couleur: "#6BBF59", texte: "#0d1f08" },
  { id: "batiment",   num: 9,  nom: "Bâtiment & artisanat",            court: "Bâtiment",   couleur: "#9C6644", texte: "#fff" },
  { id: "tourisme",   num: 10, nom: "Hôtellerie, restauration & voyages", court: "Voyages", couleur: "#3BB3E0", texte: "#00202d" }
];

A.bacs = [
  { id: "g", nom: "Bac général" },
  { id: "t", nom: "Bac techno" },
  { id: "p", nom: "Bac pro" }
];

A.specialites = [
  { id: "maths", nom: "Maths" },
  { id: "pc", nom: "Physique-chimie" },
  { id: "svt", nom: "SVT" },
  { id: "nsi", nom: "NSI (informatique)" },
  { id: "si", nom: "Sciences de l'ingénieur" },
  { id: "ses", nom: "SES" },
  { id: "hggsp", nom: "HGGSP" },
  { id: "hlp", nom: "HLP (philo-lettres)" },
  { id: "llcer", nom: "Langues (LLCER)" },
  { id: "lca", nom: "Langues anciennes" },
  { id: "arts", nom: "Arts" },
  { id: "eppcs", nom: "Sport (EPPCS)" },
  { id: "bioeco", nom: "Biologie-écologie" }
];

A.series = [
  { id: "STMG", nom: "STMG", detail: "Management et gestion" },
  { id: "STI2D", nom: "STI2D", detail: "Industrie et développement durable" },
  { id: "STL", nom: "STL", detail: "Laboratoire" },
  { id: "ST2S", nom: "ST2S", detail: "Santé et social" },
  { id: "STD2A", nom: "STD2A", detail: "Design et arts appliqués" },
  { id: "STAV", nom: "STAV", detail: "Agronomie et vivant" },
  { id: "STHR", nom: "STHR", detail: "Hôtellerie et restauration" },
  { id: "S2TMD", nom: "S2TMD", detail: "Musique et danse" }
];

/* Niveau d'accès selon le bac : 3 = voie royale, 2 = accessible, 1 = possible mais exigeant, 0 = très rare */
A.acces = [
  { niv: 0, label: "Très rare",            classe: "acc-0" },
  { niv: 1, label: "Possible, exigeant",   classe: "acc-1" },
  { niv: 2, label: "Accessible",           classe: "acc-2" },
  { niv: 3, label: "Voie royale",          classe: "acc-3" }
];

/* Grands types de formations : ce sont eux qu'on compare.
   encadrement / pratique / selection / cout sur une échelle de 1 à 3 pour le comparateur. */
A.types = [
  {
    id: "bts", nom: "BTS", long: "Brevet de technicien supérieur",
    duree: "2 ans", niveau: "Bac+2", lieu: "Lycée (section de technicien supérieur)",
    cout: "Gratuit dans le public", coutNiv: 1, selection: "Sur dossier via Parcoursup", selNiv: 2,
    encadrement: 3, pratique: 3, alternance: true,
    resume: "Deux ans très concrets, en petite classe, avec des stages. Tu es vite opérationnel·le.",
    pourQui: "Tu aimes le concret, tu veux un cadre proche du lycée et un diplôme qui mène vite à l'emploi.",
    apres: "Emploi direct, licence pro, 3e année de BUT, bachelor, écoles (admissions parallèles), classe prépa ATS.",
    bonASavoir: "Plus de 150 spécialités. Des places sont réservées aux bacs pro dans chaque BTS public."
  },
  {
    id: "but", nom: "BUT", long: "Bachelor universitaire de technologie",
    duree: "3 ans", niveau: "Bac+3 (grade licence)", lieu: "IUT (à l'université)",
    cout: "≈ 178 €/an + CVEC (0 € pour les boursier·es)", coutNiv: 1, selection: "Sur dossier via Parcoursup", selNiv: 2,
    encadrement: 3, pratique: 3, alternance: true,
    resume: "Le mix parfait entre cours, projets et stages (22 à 26 semaines), avec un vrai encadrement.",
    pourQui: "Tu veux un diplôme bac+3 reconnu, du concret, et garder la porte ouverte aux masters et écoles.",
    apres: "Emploi direct, master, école d'ingénieurs ou de commerce (admissions sur titre).",
    bonASavoir: "Environ la moitié des places sont réservées aux bacs technologiques."
  },
  {
    id: "licence", nom: "Licence", long: "Licence universitaire",
    duree: "3 ans", niveau: "Bac+3", lieu: "Université (fac)",
    cout: "≈ 178 €/an + CVEC (0 € pour les boursier·es)", coutNiv: 1, selection: "Souvent non sélective (réponse oui ou oui-si)", selNiv: 1,
    encadrement: 1, pratique: 1, alternance: false,
    resume: "Cours en amphi et en TD, beaucoup d'autonomie, une discipline approfondie.",
    pourQui: "Tu es passionné·e par une matière, tu sais t'organiser seul·e et tu vises un bac+5.",
    apres: "Master (bac+5), concours de la fonction publique, licence pro, écoles.",
    bonASavoir: "Un « oui-si » veut dire : admis·e avec un parcours de soutien adapté. C'est une aide, pas une punition."
  },
  {
    id: "cpge", nom: "Prépa (CPGE)", long: "Classe préparatoire aux grandes écoles",
    duree: "2 ans", niveau: "Bac+2, puis concours", lieu: "Lycée",
    cout: "Gratuit dans le public (+ inscription à l'université sauf boursier·es)", coutNiv: 1, selection: "Sur dossier via Parcoursup", selNiv: 3,
    encadrement: 3, pratique: 1, alternance: false,
    resume: "Deux ans intenses pour préparer les concours des grandes écoles (ingé, commerce, ENS, véto…).",
    pourQui: "Tu aimes travailler beaucoup, tu veux garder plein de portes ouvertes et un cadre exigeant.",
    apres: "Grandes écoles. Et même sans concours, tes crédits te permettent d'entrer en 3e année de licence.",
    bonASavoir: "Il existe des prépas pour les bacs techno : TSI (STI2D, STL), ECT (STMG), TB (STL, STAV)."
  },
  {
    id: "pass-las", nom: "PASS / L.AS", long: "Accès aux études de santé",
    duree: "1 an d'accès, puis 3 à 9 ans", niveau: "Bac+5 à Bac+12", lieu: "Université",
    cout: "≈ 178 €/an + CVEC (0 € pour les boursier·es)", coutNiv: 1, selection: "Dossier, puis sélection très forte en fin d'année", selNiv: 3,
    encadrement: 1, pratique: 1, alternance: false,
    resume: "La porte d'entrée vers médecine, maïeutique (sage-femme), dentaire, pharmacie et kiné (MMOPK).",
    pourQui: "Tu vises une profession médicale et tu es prêt·e à une première année très sélective.",
    apres: "Filières MMOPK, ou poursuite dans la licence de ta mineure / majeure si tu n'es pas admis·e.",
    bonASavoir: "Avec une L.AS, tu suis une licence (droit, bio, psycho…) avec une option santé : c'est un vrai plan B intégré."
  },
  {
    id: "ecole-inge", nom: "École d'ingé post-bac", long: "École d'ingénieurs en 5 ans",
    duree: "5 ans", niveau: "Bac+5 (titre d'ingénieur)", lieu: "École publique ou privée",
    cout: "≈ 600 €/an dans le public, 6 000 à 10 000 €/an dans le privé", coutNiv: 2, selection: "Dossier, parfois concours (Geipi Polytech, Avenir, Puissance Alpha…)", selNiv: 2,
    encadrement: 3, pratique: 2, alternance: true,
    resume: "Prépa intégrée (2 ans) puis cycle ingénieur (3 ans), sans concours au milieu.",
    pourQui: "Tu aimes les sciences, tu veux devenir ingénieur·e sans passer par une prépa classique.",
    apres: "Emploi d'ingénieur·e, doctorat, double diplôme à l'étranger.",
    bonASavoir: "Vérifie que l'école est habilitée par la CTI (commission des titres d'ingénieur)."
  },
  {
    id: "ecole-commerce", nom: "École de commerce", long: "École de commerce et de management",
    duree: "3 à 5 ans", niveau: "Bac+3 (bachelor) à Bac+5", lieu: "École, souvent privée",
    cout: "7 000 à 15 000 €/an", coutNiv: 3, selection: "Concours post-bac (Sésame, Accès…) ou dossier", selNiv: 2,
    encadrement: 2, pratique: 2, alternance: true,
    resume: "Management, marketing, finance, avec stages, projets et souvent un semestre à l'étranger.",
    pourQui: "Tu aimes convaincre, organiser, monter des projets, et tu veux bouger à l'international.",
    apres: "Emploi en entreprise, master spécialisé, entrepreneuriat.",
    bonASavoir: "Regarde si le diplôme a le visa de l'État et le grade licence ou master. L'alternance peut payer les frais."
  },
  {
    id: "de", nom: "Diplôme d'État", long: "Instituts et diplômes spécifiques (santé, social, gestion)",
    duree: "1 à 5 ans", niveau: "Selon le diplôme", lieu: "Institut, lycée ou université",
    cout: "Souvent proche des frais universitaires", coutNiv: 1, selection: "Dossier, parfois oral (Parcoursup ou candidature directe)", selNiv: 2,
    encadrement: 3, pratique: 3, alternance: false,
    resume: "Des formations qui mènent directement à un métier réglementé : infirmier·ère, éducateur·rice, manip radio…",
    pourQui: "Tu sais déjà quel métier tu veux faire et tu veux beaucoup de stages.",
    apres: "Insertion directe (taux d'emploi très élevé), spécialisations, master.",
    bonASavoir: "En IFSI, la moitié de la formation se passe en stage."
  },
  {
    id: "art", nom: "Écoles d'art & archi", long: "DN MADE, écoles d'architecture, Beaux-Arts",
    duree: "3 à 5 ans", niveau: "Bac+3 à Bac+5", lieu: "Lycée, école publique ou privée",
    cout: "Faible dans le public, 6 000 à 10 000 €/an dans le privé", coutNiv: 2, selection: "Dossier artistique, parfois entretien", selNiv: 2,
    encadrement: 3, pratique: 3, alternance: false,
    resume: "Ateliers, projets, créations : tu apprends en faisant.",
    pourQui: "Tu dessines, crées, imagines, et tu as envie d'en faire ton métier.",
    apres: "Emploi en agence ou studio, indépendant·e, master, DSAA.",
    bonASavoir: "Il n'y a pas de bac idéal : ce qui compte, c'est ton dossier et ta curiosité. Pas besoin de « talent inné »."
  },
  {
    id: "iep", nom: "Sciences Po / IEP", long: "Institut d'études politiques",
    duree: "5 ans", niveau: "Bac+5 (master)", lieu: "IEP (Paris et régions)",
    cout: "Modulé selon les revenus des parents (gratuit pour les boursier·es)", coutNiv: 2, selection: "Concours commun ou dossier + oral", selNiv: 3,
    encadrement: 2, pratique: 1, alternance: false,
    resume: "Histoire, droit, éco, sciences politiques, avec une année obligatoire à l'étranger.",
    pourQui: "L'actu, la politique, les débats et l'international te passionnent.",
    apres: "Fonction publique, journalisme, ONG, conseil, diplomatie.",
    bonASavoir: "Des programmes d'égalité des chances (comme les conventions éducation prioritaire) existent : renseigne-toi auprès de ton lycée."
  },
  {
    id: "concours", nom: "Écoles sur concours", long: "Écoles publiques recrutant sur concours",
    duree: "Variable", niveau: "Variable", lieu: "École nationale",
    cout: "Souvent gratuit, parfois rémunéré", coutNiv: 1, selection: "Concours", selNiv: 3,
    encadrement: 3, pratique: 3, alternance: false,
    resume: "Police, pompiers, vétérinaires, aviation civile… Des métiers d'engagement avec une formation dédiée.",
    pourQui: "Tu as une vocation claire et tu es prêt·e à préparer un concours.",
    apres: "Un poste à la sortie, souvent dans la fonction publique.",
    bonASavoir: "Dans les écoles de police ou d'officiers, tu es payé·e pendant ta formation."
  },
  {
    id: "bachelor", nom: "Bachelor privé", long: "Bachelor d'école privée",
    duree: "3 ans", niveau: "Bac+3 (selon reconnaissance)", lieu: "École privée",
    cout: "6 000 à 12 000 €/an", coutNiv: 3, selection: "Dossier et entretien, souvent hors Parcoursup", selNiv: 1,
    encadrement: 2, pratique: 2, alternance: true,
    resume: "Des formations pro et spécialisées (jeu vidéo, digital, luxe…), de qualité très variable.",
    pourQui: "Tu as un projet précis qu'aucune formation publique ne couvre.",
    apres: "Emploi, master (si le diplôme est reconnu).",
    bonASavoir: "« Bachelor » n'est pas un diplôme protégé : cherche le grade de licence ou l'inscription au RNCP."
  },
  {
    id: "court", nom: "Formations courtes", long: "CAP en 1 an, certificats, brevets pro",
    duree: "Quelques semaines à 1 an", niveau: "Certificat ou CAP", lieu: "CFA, lycée pro, organisme",
    cout: "Gratuit en apprentissage, payant sinon", coutNiv: 1, selection: "Candidature directe, entretien", selNiv: 1,
    encadrement: 3, pratique: 3, alternance: true,
    resume: "Pour apprendre un métier vite, souvent en alternance : artisanat, sport, aérien…",
    pourQui: "Tu veux travailler rapidement, apprendre par la pratique, ou changer de voie.",
    apres: "Emploi direct, brevet de maîtrise, création d'entreprise.",
    bonASavoir: "Un CAP en 1 an après le bac est très recherché par les artisans."
  }
];

/* Formations concrètes : stations du plan.
   acces : { g, t, p } ; ideal : spécialités (minuscules) ou séries techno (majuscules) qui aident vraiment. */
A.formations = [
  // Santé
  { id: "pass", nom: "PASS", long: "Parcours d'accès spécifique santé", type: "pass-las", lignes: ["sante"], acces: { g: 3, t: 1, p: 0 }, ideal: ["svt", "pc", "maths", "ST2S", "STL"],
    desc: "Une année de licence avec une majeure santé et une mineure dans une autre discipline. Rythme intense, beaucoup de par cœur et de sciences.",
    apres: "Médecine, maïeutique, dentaire, pharmacie, kiné. Sinon, poursuite en licence dans ta mineure." },
  { id: "las", nom: "L.AS", long: "Licence accès santé", type: "pass-las", lignes: ["sante"], acces: { g: 3, t: 2, p: 0 }, ideal: ["svt", "pc", "ses", "hggsp", "ST2S"],
    desc: "Une licence (droit, psycho, bio, STAPS…) avec une option santé. Tu peux candidater en filière santé après L1, L2 ou L3.",
    apres: "Filières MMOPK, ou continuer ta licence jusqu'au master." },
  { id: "ifsi", nom: "IFSI", long: "Diplôme d'État d'infirmier·ère", type: "de", lignes: ["sante"], acces: { g: 3, t: 3, p: 2 }, ideal: ["svt", "ses", "ST2S"],
    desc: "3 ans en institut de formation, dont la moitié en stage (hôpital, clinique, domicile).",
    apres: "Spécialisations : bloc opératoire, anesthésie, puériculture, infirmier·ère en pratique avancée." },
  { id: "deas", nom: "DEAS", long: "Diplôme d'État d'aide-soignant·e", type: "de", lignes: ["sante"], acces: { g: 2, t: 3, p: 3 }, ideal: ["ST2S"],
    desc: "Environ 1 an en institut (IFAS), sélection sur dossier et entretien, hors Parcoursup.",
    apres: "Emploi immédiat, puis possibilité d'entrer en IFSI pour devenir infirmier·ère." },
  { id: "imrt", nom: "DTS IMRT", long: "Manipulateur·rice en électroradiologie médicale", type: "de", lignes: ["sante"], acces: { g: 3, t: 3, p: 1 }, ideal: ["pc", "svt", "STL", "ST2S"],
    desc: "3 ans pour maîtriser radio, scanner, IRM et radiothérapie. En lycée (DTS) ou en institut (DE).",
    apres: "Emploi direct, très recherché dans les hôpitaux." },
  { id: "ortho", nom: "Orthophonie", long: "Certificat de capacité d'orthophoniste", type: "de", lignes: ["sante"], acces: { g: 3, t: 1, p: 0 }, ideal: ["hlp", "svt", "llcer"],
    desc: "5 ans à l'université, admission sur Parcoursup avec épreuves. Langage, voix, neurosciences.",
    apres: "Exercice en cabinet libéral ou à l'hôpital." },
  { id: "licence-psycho", nom: "Licence de psychologie", long: "Licence de psychologie", type: "licence", lignes: ["sante", "social"], acces: { g: 3, t: 2, p: 1 }, ideal: ["ses", "svt", "hlp", "maths"],
    desc: "Psychologie sociale, clinique, du développement… avec des statistiques et de la biologie. Attention : il faut un master pour être psychologue.",
    apres: "Master de psychologie (sélectif), métiers des RH, du social, de l'éducation." },
  // Numérique
  { id: "bts-sio", nom: "BTS SIO", long: "Services informatiques aux organisations", type: "bts", lignes: ["numerique"], acces: { g: 2, t: 3, p: 3 }, ideal: ["nsi", "maths", "STI2D", "STMG"],
    desc: "Deux options : SISR (réseaux, cybersécurité) ou SLAM (développement d'applications).",
    apres: "Technicien·ne, développeur·se, licence pro, BUT 3e année, bachelor en alternance." },
  { id: "but-info", nom: "BUT Informatique", long: "BUT Informatique", type: "but", lignes: ["numerique"], acces: { g: 3, t: 3, p: 1 }, ideal: ["nsi", "maths", "STI2D"],
    desc: "Développement, bases de données, réseaux, gestion de projet, avec beaucoup de projets en équipe.",
    apres: "Développeur·se, master, école d'ingénieurs." },
  { id: "but-rt", nom: "BUT Réseaux & télécoms", long: "BUT Réseaux et télécommunications", type: "but", lignes: ["numerique"], acces: { g: 3, t: 3, p: 1 }, ideal: ["nsi", "si", "pc", "STI2D"],
    desc: "Réseaux, fibre, 5G, cloud et un parcours dédié à la cybersécurité.",
    apres: "Admin réseaux, analyste cybersécurité, école d'ingénieurs." },
  { id: "but-mmi", nom: "BUT MMI", long: "Métiers du multimédia et de l'internet", type: "but", lignes: ["numerique", "art"], acces: { g: 3, t: 3, p: 1 }, ideal: ["nsi", "arts", "STD2A", "STI2D", "STMG"],
    desc: "Web design, développement web, vidéo, communication digitale : la formation la plus créative des IUT.",
    apres: "UX designer, développeur·se web, chargé·e de com digitale, master." },
  { id: "licence-maths", nom: "Licence de mathématiques", long: "Licence de mathématiques (et MIASHS)", type: "licence", lignes: ["numerique", "commerce"], acces: { g: 3, t: 1, p: 0 }, ideal: ["maths", "nsi", "pc"],
    desc: "Analyse, algèbre, probabilités, programmation. La voie royale vers les métiers de la data, de l'actuariat et de la finance quantitative.",
    apres: "Masters de maths appliquées, data science, actuariat, finance ; enseignement ; écoles d'ingénieurs." },
  { id: "licence-info", nom: "Licence Informatique", long: "Licence Informatique", type: "licence", lignes: ["numerique"], acces: { g: 3, t: 1, p: 0 }, ideal: ["maths", "nsi"],
    desc: "Algorithmique, programmation, maths : une formation théorique et solide.",
    apres: "Masters (IA, data, cybersécurité), écoles d'ingénieurs." },
  { id: "mp2i", nom: "Prépa MP2I", long: "Maths, physique, ingénierie et informatique", type: "cpge", lignes: ["numerique", "industrie"], acces: { g: 3, t: 0, p: 0 }, ideal: ["maths", "nsi", "pc"],
    desc: "La prépa scientifique avec le plus d'informatique. Exigeante en maths.",
    apres: "Concours des écoles d'ingénieurs, ENS." },
  { id: "bachelor-jv", nom: "Bachelor jeu vidéo", long: "Écoles de jeu vidéo et d'animation", type: "bachelor", lignes: ["numerique", "art"], acces: { g: 2, t: 2, p: 1 }, ideal: ["arts", "nsi", "maths", "STD2A"],
    desc: "Game design, programmation, graphisme 3D. Surtout privé et cher : il existe aussi des masters publics (comme le CNAM-Enjmin).",
    apres: "Studios de jeu vidéo, animation, effets spéciaux." },
  // Industrie
  { id: "inge-pb", nom: "École d'ingé post-bac", long: "INSA, UT, réseau Polytech, écoles privées…", type: "ecole-inge", lignes: ["industrie", "numerique", "nature", "batiment"], acces: { g: 3, t: 1, p: 0 }, ideal: ["maths", "pc", "si", "nsi", "svt"],
    desc: "5 ans d'un seul tenant : 2 ans de prépa intégrée puis 3 ans de spécialisation.",
    apres: "Ingénieur·e dans tous les secteurs : énergie, aéro, numérique, santé…" },
  { id: "cpge-sci", nom: "Prépa MPSI / PCSI / PTSI", long: "Prépas scientifiques", type: "cpge", lignes: ["industrie"], acces: { g: 3, t: 0, p: 0 }, ideal: ["maths", "pc", "si"],
    desc: "Maths et physique à haute dose pour préparer les concours des écoles d'ingénieurs.",
    apres: "Écoles d'ingénieurs, ENS, ou 3e année de licence." },
  { id: "cpge-tsi", nom: "Prépa TSI", long: "Technologie et sciences industrielles", type: "cpge", lignes: ["industrie"], acces: { g: 0, t: 3, p: 0 }, ideal: ["STI2D", "STL"],
    desc: "Une prépa réservée aux bacs STI2D et STL, avec des places dédiées dans les écoles d'ingénieurs.",
    apres: "Écoles d'ingénieurs (concours avec places réservées TSI)." },
  { id: "but-gmp", nom: "BUT Génie mécanique", long: "Génie mécanique et productique", type: "but", lignes: ["industrie"], acces: { g: 3, t: 3, p: 1 }, ideal: ["si", "maths", "pc", "STI2D"],
    desc: "Conception 3D, matériaux, fabrication, industrialisation.",
    apres: "Technicien·ne supérieur·e, école d'ingénieurs." },
  { id: "but-geii", nom: "BUT GEII", long: "Génie électrique et informatique industrielle", type: "but", lignes: ["industrie", "nature"], acces: { g: 3, t: 3, p: 1 }, ideal: ["si", "pc", "nsi", "STI2D"],
    desc: "Électronique, automatismes, énergies, systèmes embarqués.",
    apres: "Automaticien·ne, énergies renouvelables, école d'ingénieurs." },
  { id: "bts-ms", nom: "BTS Maintenance des systèmes", long: "BTS Maintenance des systèmes (dont option éolien)", type: "bts", lignes: ["industrie", "nature"], acces: { g: 1, t: 3, p: 3 }, ideal: ["STI2D", "si"],
    desc: "Diagnostiquer et réparer machines et installations : usines, énergie, éoliennes.",
    apres: "Emploi direct (très recherché), licence pro." },
  { id: "bts-aero", nom: "BTS Aéronautique", long: "BTS Aéronautique", type: "bts", lignes: ["industrie", "tourisme"], acces: { g: 2, t: 3, p: 3 }, ideal: ["si", "pc", "STI2D"],
    desc: "Maintenance et contrôle des avions et hélicoptères.",
    apres: "Technicien·ne aéro, licence pro, école d'ingénieurs." },
  { id: "but-chimie", nom: "BUT Chimie", long: "BUT Chimie / BTS Métiers de la chimie", type: "but", lignes: ["industrie", "sante"], acces: { g: 3, t: 3, p: 1 }, ideal: ["pc", "svt", "STL"],
    desc: "Analyses, synthèse, contrôle qualité en laboratoire.",
    apres: "Technicien·ne de labo, école de chimie." },
  // Commerce
  { id: "bts-ndrc", nom: "BTS NDRC", long: "Négociation et digitalisation de la relation client", type: "bts", lignes: ["commerce"], acces: { g: 2, t: 3, p: 3 }, ideal: ["ses", "STMG"],
    desc: "Vendre, prospecter, animer des réseaux, gérer la relation client en ligne.",
    apres: "Commercial·e, bachelor, licence pro." },
  { id: "bts-mco", nom: "BTS MCO", long: "Management commercial opérationnel", type: "bts", lignes: ["commerce"], acces: { g: 2, t: 3, p: 3 }, ideal: ["STMG", "ses"],
    desc: "Gérer un magasin ou un rayon : équipe, ventes, stocks.",
    apres: "Manager de rayon, responsable de boutique, bachelor." },
  { id: "bts-cg", nom: "BTS CG", long: "Comptabilité et gestion", type: "bts", lignes: ["commerce"], acces: { g: 2, t: 3, p: 3 }, ideal: ["STMG", "maths"],
    desc: "Comptabilité, fiscalité, paie, contrôle de gestion.",
    apres: "Comptable, DCG en 2 ans, licence pro." },
  { id: "but-tc", nom: "BUT TC", long: "Techniques de commercialisation", type: "but", lignes: ["commerce"], acces: { g: 3, t: 3, p: 1 }, ideal: ["ses", "maths", "STMG", "llcer"],
    desc: "Marketing, vente, communication, avec des projets réels pour des entreprises.",
    apres: "Marketing, commerce, école de commerce, master." },
  { id: "but-gea", nom: "BUT GEA", long: "Gestion des entreprises et des administrations", type: "but", lignes: ["commerce"], acces: { g: 3, t: 3, p: 1 }, ideal: ["ses", "maths", "STMG"],
    desc: "Compta, finance, RH, gestion : tout ce qui fait tourner une organisation.",
    apres: "Gestionnaire, RH, école de commerce, master." },
  { id: "but-mlt", nom: "BUT MLT", long: "Management de la logistique et des transports", type: "but", lignes: ["commerce", "tourisme"], acces: { g: 3, t: 3, p: 1 }, ideal: ["ses", "maths", "hggsp", "STMG"],
    desc: "Organiser les flux de marchandises de l'usine jusqu'à chez toi.",
    apres: "Logisticien·ne, supply chain, master." },
  { id: "dcg", nom: "DCG", long: "Diplôme de comptabilité et de gestion", type: "de", lignes: ["commerce"], acces: { g: 3, t: 3, p: 1 }, ideal: ["maths", "ses", "STMG"],
    desc: "3 ans (grade licence), souvent en lycée donc gratuit. Première marche vers l'expertise comptable.",
    apres: "DSCG (bac+5), puis diplôme d'expert-comptable." },
  { id: "licence-eco", nom: "Licence éco-gestion", long: "Licence Économie et gestion", type: "licence", lignes: ["commerce"], acces: { g: 3, t: 2, p: 0 }, ideal: ["ses", "maths"],
    desc: "Micro et macro-économie, gestion, statistiques.",
    apres: "Masters finance, banque, management, concours administratifs." },
  { id: "cpge-ec", nom: "Prépa ECG / ECT", long: "Prépas économiques et commerciales", type: "cpge", lignes: ["commerce"], acces: { g: 3, t: 3, p: 0 }, ideal: ["maths", "ses", "hggsp", "STMG"],
    desc: "ECG pour les bacs généraux, ECT réservée aux STMG. Maths, culture générale, langues.",
    apres: "Grandes écoles de commerce (HEC, ESSEC, ESCP…)." },
  { id: "ecole-com-pb", nom: "École de commerce post-bac", long: "Bachelor ou programme en 5 ans", type: "ecole-commerce", lignes: ["commerce"], acces: { g: 3, t: 3, p: 1 }, ideal: ["ses", "llcer", "maths", "STMG"],
    desc: "Recrutement sur concours après le bac. Stages, projets, international.",
    apres: "Management, marketing, finance, master spécialisé." },
  // Droit
  { id: "licence-droit", nom: "Licence de droit", long: "Licence de droit", type: "licence", lignes: ["droit"], acces: { g: 3, t: 2, p: 0 }, ideal: ["hggsp", "ses", "hlp"],
    desc: "Droit civil, constitutionnel, pénal… Beaucoup de lecture, de rédaction et de rigueur.",
    apres: "Master puis école d'avocats, magistrature, notariat, juriste d'entreprise." },
  { id: "iep", nom: "Sciences Po / IEP", long: "Instituts d'études politiques", type: "iep", lignes: ["droit", "art"], acces: { g: 3, t: 1, p: 0 }, ideal: ["hggsp", "ses", "hlp", "llcer"],
    desc: "Pluridisciplinaire : histoire, droit, économie, sciences politiques, langues.",
    apres: "Fonction publique, journalisme, diplomatie, conseil." },
  { id: "but-cj", nom: "BUT Carrières juridiques", long: "BUT Carrières juridiques", type: "but", lignes: ["droit"], acces: { g: 3, t: 3, p: 1 }, ideal: ["ses", "hggsp", "STMG"],
    desc: "Le droit appliqué : banque, assurance, immobilier, collectivités.",
    apres: "Assistant·e juridique, master de droit." },
  { id: "cpge-lit", nom: "Prépa A/L, B/L", long: "Prépas littéraires (hypokhâgne / khâgne)", type: "cpge", lignes: ["droit", "art"], acces: { g: 3, t: 1, p: 0 }, ideal: ["hlp", "hggsp", "llcer", "ses", "lca"],
    desc: "Lettres, philo, histoire, langues : une culture générale de très haut niveau.",
    apres: "ENS, écoles de commerce, IEP, journalisme, ou licence en 3e année." },
  { id: "police", nom: "École de police", long: "Concours de gardien·ne de la paix", type: "concours", lignes: ["droit"], acces: { g: 3, t: 3, p: 3 }, ideal: [],
    desc: "Concours accessible avec le bac, puis environ 1 an de formation rémunérée en école.",
    apres: "Gardien·ne de la paix, puis évolution (officier, brigades spécialisées)." },
  { id: "pompier", nom: "Sapeur-pompier pro", long: "Concours de sapeur-pompier professionnel", type: "concours", lignes: ["droit"], acces: { g: 2, t: 2, p: 3 }, ideal: ["eppcs"],
    desc: "Concours très sélectif avec épreuves sportives. Être pompier volontaire (dès 16 ans) est un énorme atout.",
    apres: "Sapeur-pompier, puis caporal, sous-officier, officier." },
  // Art & com
  { id: "dn-made", nom: "DN MADE", long: "Diplôme national des métiers d'art et du design", type: "art", lignes: ["art"], acces: { g: 3, t: 3, p: 2 }, ideal: ["arts", "STD2A"],
    desc: "3 ans (grade licence) : graphisme, mode, objet, espace, numérique, métiers d'art. Souvent en lycée public.",
    apres: "Graphiste, designer, DSAA, master." },
  { id: "ensa", nom: "École d'architecture", long: "École nationale supérieure d'architecture (ENSA)", type: "art", lignes: ["art", "batiment"], acces: { g: 3, t: 2, p: 1 }, ideal: ["arts", "maths", "pc", "STD2A", "STI2D"],
    desc: "Sur Parcoursup : 3 ans de licence + 2 ans de master. Projets, maquettes, histoire de l'art, technique.",
    apres: "Architecte (après une année d'habilitation pour exercer en ton nom), urbaniste." },
  { id: "beaux-arts", nom: "Beaux-Arts", long: "Écoles supérieures d'art (DNA, DNSEP)", type: "art", lignes: ["art"], acces: { g: 3, t: 3, p: 1 }, ideal: ["arts", "hlp"],
    desc: "Concours d'entrée avec dossier. Art contemporain, illustration, design graphique.",
    apres: "Artiste, illustrateur·rice, graphiste, enseignement." },
  { id: "but-infocom", nom: "BUT Info-com", long: "Information-communication (dont journalisme)", type: "but", lignes: ["art"], acces: { g: 3, t: 3, p: 1 }, ideal: ["hlp", "hggsp", "ses", "llcer", "STMG"],
    desc: "Communication des organisations, publicité, journalisme, métiers du livre.",
    apres: "Chargé·e de com, community manager, école de journalisme." },
  { id: "bts-av", nom: "BTS Audiovisuel", long: "BTS Métiers de l'audiovisuel", type: "bts", lignes: ["art"], acces: { g: 2, t: 3, p: 2 }, ideal: ["arts", "pc", "STI2D", "STD2A"],
    desc: "5 options : image, son, montage, production, techniques d'ingénierie.",
    apres: "Monteur·se, ingé son, cadreur·se, licence pro." },
  { id: "licence-langues", nom: "Licence LEA / LLCER", long: "Licences de langues", type: "licence", lignes: ["art", "tourisme"], acces: { g: 3, t: 2, p: 0 }, ideal: ["llcer", "hlp", "lca"],
    desc: "LEA : deux langues appliquées au commerce et au droit. LLCER : langue, littérature, culture d'un pays.",
    apres: "Traduction, commerce international, tourisme, enseignement." },
  // Social
  { id: "staps", nom: "Licence STAPS", long: "Sciences et techniques des activités physiques et sportives", type: "licence", lignes: ["social"], acces: { g: 3, t: 2, p: 1 }, ideal: ["eppcs", "svt", "ses"],
    desc: "Physiologie, anatomie, psycho, pratique sportive. Plus scientifique qu'on ne le croit.",
    apres: "Coach, prof d'EPS, kiné (via L.AS), management du sport." },
  { id: "pppe", nom: "PPPE", long: "Parcours préparatoire au professorat des écoles", type: "licence", lignes: ["social"], acces: { g: 3, t: 1, p: 0 }, ideal: ["ses", "hlp", "maths", "svt"],
    desc: "Une licence suivie en partie au lycée, avec des stages en école dès la 1re année.",
    apres: "Concours de professeur·e des écoles." },
  { id: "licence-prof", nom: "Licence disciplinaire", long: "Licence (maths, lettres, histoire…) vers l'enseignement", type: "licence", lignes: ["social"], acces: { g: 3, t: 1, p: 0 }, ideal: ["maths", "hlp", "hggsp", "llcer", "pc", "svt"],
    desc: "Tu choisis la matière que tu veux enseigner et tu l'approfondis pendant 3 ans.",
    apres: "Concours d'enseignant·e (collège, lycée), recherche, autres masters." },
  { id: "dees", nom: "DEES", long: "Diplôme d'État d'éducateur·rice spécialisé·e", type: "de", lignes: ["social"], acces: { g: 3, t: 3, p: 2 }, ideal: ["ses", "ST2S"],
    desc: "3 ans (grade licence) avec de longs stages auprès d'enfants, d'ados ou d'adultes en difficulté.",
    apres: "Éducateur·rice spécialisé·e, chef·fe de service." },
  { id: "deass", nom: "DEASS", long: "Diplôme d'État d'assistant·e de service social", type: "de", lignes: ["social"], acces: { g: 3, t: 3, p: 2 }, ideal: ["ses", "ST2S", "hggsp"],
    desc: "3 ans pour accompagner les personnes dans leurs droits : logement, emploi, famille.",
    apres: "Assistant·e social·e en mairie, hôpital, entreprise." },
  { id: "bpjeps", nom: "BPJEPS", long: "Brevet professionnel de la jeunesse, de l'éducation populaire et du sport", type: "court", lignes: ["social"], acces: { g: 2, t: 3, p: 3 }, ideal: ["eppcs"],
    desc: "Environ 1 an, souvent en alternance, hors Parcoursup. Spécialités : fitness, sports collectifs, animation…",
    apres: "Coach sportif, animateur·rice, DEJEPS." },
  { id: "but-cs", nom: "BUT Carrières sociales", long: "BUT Carrières sociales", type: "but", lignes: ["social"], acces: { g: 3, t: 3, p: 1 }, ideal: ["ses", "ST2S"],
    desc: "Animation, éducation, gestion urbaine, services à la personne.",
    apres: "Animateur·rice, coordinateur·rice de projets, master." },
  // Nature
  { id: "veto", nom: "École vétérinaire post-bac", long: "Écoles nationales vétérinaires", type: "concours", lignes: ["nature", "sante"], acces: { g: 3, t: 0, p: 0 }, ideal: ["svt", "pc", "maths"],
    desc: "Une partie des places est ouverte directement après le bac sur Parcoursup, le reste via la prépa BCPST. Très sélectif.",
    apres: "Vétérinaire (6 ans), recherche, santé publique." },
  { id: "bcpst", nom: "Prépa BCPST", long: "Biologie, chimie, physique, sciences de la Terre", type: "cpge", lignes: ["nature"], acces: { g: 3, t: 0, p: 0 }, ideal: ["svt", "pc", "maths"],
    desc: "La prépa des écoles d'agronomie, de vétérinaire et de géologie. (Prépa TB pour les bacs STL et STAV.)",
    apres: "Écoles d'ingénieurs agro, écoles vétérinaires, ENS." },
  { id: "btsa", nom: "BTSA", long: "BTS agricoles (production, paysage, gestion de la nature…)", type: "bts", lignes: ["nature"], acces: { g: 2, t: 3, p: 3 }, ideal: ["svt", "bioeco", "STAV"],
    desc: "En lycée agricole : agronomie, gestion d'exploitation, aménagements paysagers, protection de la nature.",
    apres: "Agriculteur·rice, technicien·ne, licence pro, école d'ingé agro." },
  { id: "agro", nom: "École d'ingé agro", long: "Écoles d'ingénieurs en agronomie et environnement", type: "ecole-inge", lignes: ["nature"], acces: { g: 3, t: 1, p: 0 }, ideal: ["svt", "pc", "maths", "bioeco"],
    desc: "Après le bac (prépa intégrée) ou après une prépa BCPST.",
    apres: "Ingénieur·e environnement, agronome, agroalimentaire." },
  { id: "but-gb", nom: "BUT Génie biologique", long: "BUT Génie biologique", type: "but", lignes: ["nature", "sante"], acces: { g: 3, t: 3, p: 1 }, ideal: ["svt", "pc", "STL", "STAV"],
    desc: "Parcours environnement, agronomie, analyses biologiques, diététique…",
    apres: "Technicien·ne de labo, environnement, école d'ingénieurs." },
  { id: "licence-svt", nom: "Licence Sciences de la vie", long: "Licence SV / STU", type: "licence", lignes: ["nature", "sante"], acces: { g: 3, t: 1, p: 0 }, ideal: ["svt", "pc"],
    desc: "Biologie, écologie, génétique, géologie.",
    apres: "Masters environnement, recherche, enseignement." },
  // Bâtiment
  { id: "but-gccd", nom: "BUT Génie civil", long: "Génie civil – construction durable", type: "but", lignes: ["batiment"], acces: { g: 3, t: 3, p: 1 }, ideal: ["si", "maths", "pc", "STI2D"],
    desc: "Concevoir et construire des bâtiments et ouvrages économes en énergie.",
    apres: "Conducteur·rice de travaux, bureau d'études, école d'ingénieurs." },
  { id: "bts-bat", nom: "BTS Bâtiment / TP", long: "BTS Bâtiment, Travaux publics", type: "bts", lignes: ["batiment"], acces: { g: 2, t: 3, p: 3 }, ideal: ["STI2D", "si"],
    desc: "Organiser et suivre des chantiers, du devis à la livraison.",
    apres: "Chef·fe de chantier, licence pro, école d'ingénieurs." },
  { id: "bts-elec", nom: "BTS Électrotechnique", long: "BTS Électrotechnique", type: "bts", lignes: ["batiment", "industrie"], acces: { g: 1, t: 3, p: 3 }, ideal: ["STI2D", "si", "pc"],
    desc: "Installations électriques, domotique, énergies renouvelables.",
    apres: "Électricien·ne qualifié·e, chargé·e d'affaires, licence pro." },
  { id: "cap-1an", nom: "CAP en 1 an", long: "CAP après le bac (boulangerie, ébénisterie, plomberie…)", type: "court", lignes: ["batiment", "tourisme"], acces: { g: 3, t: 3, p: 3 }, ideal: [],
    desc: "Le bac te dispense des matières générales : tu te concentres sur le métier, souvent en apprentissage.",
    apres: "Emploi direct, brevet professionnel, création d'entreprise." },
  // Voyages
  { id: "bts-mhr", nom: "BTS MHR", long: "Management en hôtellerie-restauration", type: "bts", lignes: ["tourisme"], acces: { g: 2, t: 3, p: 3 }, ideal: ["STHR", "llcer"],
    desc: "Cuisine, service, hébergement, gestion. Stages dans de grandes maisons, parfois à l'étranger.",
    apres: "Chef·fe, responsable d'hôtel, bachelor." },
  { id: "bts-tourisme", nom: "BTS Tourisme", long: "BTS Tourisme", type: "bts", lignes: ["tourisme"], acces: { g: 2, t: 3, p: 3 }, ideal: ["llcer", "hggsp", "STMG", "STHR"],
    desc: "Concevoir et vendre des voyages, accueillir des touristes, deux langues obligatoires.",
    apres: "Conseiller·e voyage, guide, licence pro." },
  { id: "enac", nom: "ENAC (concours)", long: "École nationale de l'aviation civile", type: "concours", lignes: ["tourisme"], acces: { g: 3, t: 1, p: 0 }, ideal: ["maths", "pc"],
    desc: "Concours très sélectifs, préparés en général après une prépa ou un bac+2 scientifique. Formation publique et gratuite.",
    apres: "Pilote de ligne, contrôleur·se aérien·ne, ingénieur·e aéronautique." },
  { id: "cca", nom: "CCA", long: "Certificat de membre d'équipage de cabine", type: "court", lignes: ["tourisme"], acces: { g: 3, t: 3, p: 3 }, ideal: ["llcer"],
    desc: "Quelques semaines de formation (payante), puis recrutement par les compagnies. Anglais indispensable.",
    apres: "Hôtesse de l'air / steward, chef·fe de cabine." }
];

/* Correspondance avec les formations Parcoursup : [filière Parcoursup, motif cherché dans l'intitulé] */
const PSUP = { "pass": [ "PASS", "" ], "las": [ "Licence_Las", "" ], "ifsi": [ "IFSI", "" ], "imrt": [ "Autre formation", "imagerie médicale|manipulateur" ], "ortho": [ "Autre formation", "Orthophoniste" ], "licence-psycho": [ "Licence", "^Psychologie" ], "bts-sio": [ "BTS", "Services informatiques aux organisations" ], "but-info": [ "BUT", "^Informatique$" ], "but-rt": [ "BUT", "Réseaux et télécommunications" ], "but-mmi": [ "BUT", "multimédia" ], "licence-maths": [ "Licence", "^Mathématiques" ], "licence-info": [ "Licence", "^Informatique" ], "mp2i": [ "CPGE", "^MP2I" ], "inge-pb": [ "Ecole d'Ingénieur", "" ], "cpge-sci": [ "CPGE", "^(MPSI|PCSI|PTSI)" ], "cpge-tsi": [ "CPGE", "^TSI" ], "but-gmp": [ "BUT", "Génie mécanique" ], "but-geii": [ "BUT", "Génie électrique" ], "bts-ms": [ "BTS", "Maintenance des systèmes" ], "bts-aero": [ "BTS", "^Aéronautique" ], "but-chimie": [ "BUT", "^Chimie" ], "bts-ndrc": [ "BTS", "Négociation et digitalisation" ], "bts-mco": [ "BTS", "Management Commercial Opérationnel" ], "bts-cg": [ "BTS", "Comptabilité et gestion" ], "but-tc": [ "BUT", "Techniques de commercialisation" ], "but-gea": [ "BUT", "Gestion des entreprises" ], "but-mlt": [ "BUT", "Logistique et des Transports" ], "dcg": [ "Autre formation", "Comptabilité et de Gestion" ], "licence-eco": [ "Licence", "^Econom" ], "cpge-ec": [ "CPGE", "^(ECG|ECT)" ], "ecole-com-pb": [ "Ecole de Commerce", "" ], "licence-droit": [ "Licence", "^Droit" ], "iep": [ "Autre formation", "Sciences Po" ], "but-cj": [ "BUT", "Carrières juridiques" ], "cpge-lit": [ "CPGE", "^(Lettres|B/L)" ], "dn-made": [ "Autre formation", "^(Graphisme|Objet|Espace|Mode|Événement|Matériaux|Spectacle|Numérique|Livre|Patrimoine|Innovation sociale|Ornement)" ], "ensa": [ "Autre formation", "^Architecture" ], "beaux-arts": [ "Autre formation", "Diplôme National d.Art|écoles supérieure d.art" ], "but-infocom": [ "BUT", "Information communication" ], "bts-av": [ "BTS", "audio-visuel" ], "licence-langues": [ "Licence", "^(Langues|LEA)" ], "staps": [ "Licence", "Activités Physiques et Sportives" ], "pppe": [ "Licence", "Professorat des Ecoles" ], "licence-prof": [ "Licence", "^(Lettres|Histoire|Physique|Langues, littératures)" ], "dees": [ "EFTS", "Educateur Spécialisé" ], "deass": [ "EFTS", "Assistant de Service Social" ], "bpjeps": [ "Autre formation", "Educateur sportif" ], "but-cs": [ "BUT", "Carrières sociales" ], "bcpst": [ "CPGE", "^(BCPST|TB)" ], "btsa": [ "BTS", "entreprise agricole|Aménagements paysagers|protection de la nature|Agronomie|élevage|Métiers du Végétal|maitrise de l.eau" ], "agro": [ "Ecole d'Ingénieur", "agro|Agro|environnement|Environnement" ], "but-gb": [ "BUT", "Génie biologique" ], "licence-svt": [ "Licence", "^Sciences de la vie" ], "but-gccd": [ "BUT", "Génie civil" ], "bts-bat": [ "BTS", "^(Bâtiment|Travaux publics)" ], "bts-elec": [ "BTS", "^Electrotechnique" ], "bts-mhr": [ "BTS", "Management en hôtellerie" ], "bts-tourisme": [ "BTS", "^Tourisme" ] };
A.formations.forEach(f => { if (PSUP[f.id]) f.psup = PSUP[f.id]; });

A.typeParId = Object.fromEntries(A.types.map(t => [t.id, t]));
A.formationParId = Object.fromEntries(A.formations.map(f => [f.id, f]));
A.ligneParId = Object.fromEntries(A.lignes.map(l => [l.id, l]));

/* Durées propres aux formations dont la famille a une durée variable */
const DUREES = {
  pass: "1 an, puis 2 à 8 ans", las: "1 à 3 ans, puis 2 à 8 ans", ifsi: "3 ans", deas: "≈ 1 an", imrt: "3 ans", ortho: "5 ans",
  dcg: "3 ans", police: "≈ 1 an après le concours", pompier: "Formation après le concours", "inge-pb": "5 ans", agro: "5 ans",
  "ecole-com-pb": "3 à 5 ans", "dn-made": "3 ans", ensa: "5 ans", "beaux-arts": "3 à 5 ans", dees: "3 ans", deass: "3 ans",
  bpjeps: "≈ 1 an", veto: "6 ans", "cap-1an": "1 an", enac: "2 à 3 ans après le concours", cca: "Quelques semaines"
};
A.formations.forEach(f => { if (DUREES[f.id]) f.duree = DUREES[f.id]; });
A.dureeFormation = f => f.duree || A.typeParId[f.type].duree;
