/* Contenus éditoriaux : test, décodeur, vrai/faux, calendrier, aides, badges. */

A.profils = {
  R: { nom: "Bâtisseur·se",   couleur: "#F2A71B", phrase: "Tu aimes le concret, le terrain, ce qui se touche et se construit." },
  I: { nom: "Enquêteur·rice", couleur: "#2F5BEA", phrase: "Tu veux comprendre comment le monde fonctionne et résoudre des énigmes." },
  A: { nom: "Créateur·rice",  couleur: "#E85D9E", phrase: "Tu as besoin d'imaginer, d'inventer, de t'exprimer à ta façon." },
  S: { nom: "Allié·e",        couleur: "#E4572E", phrase: "Aider, écouter, transmettre : les autres comptent beaucoup pour toi." },
  E: { nom: "Capitaine",      couleur: "#7A3FD1", phrase: "Tu aimes convaincre, mener un groupe et lancer des projets." },
  C: { nom: "Stratège",       couleur: "#1B998B", phrase: "Tu aimes quand c'est carré : méthode, chiffres, organisation." }
};

/* 18 situations, 3 par dimension, déjà mélangées. */
A.questions = [
  { d: "R", t: "Démonter un objet pour comprendre comment il marche", e: "🔩" },
  { d: "S", t: "Aider un·e ami·e qui traverse une période difficile", e: "💬" },
  { d: "I", t: "Comprendre pourquoi le ciel est bleu ou comment fonctionne le cerveau", e: "🔭" },
  { d: "E", t: "Convaincre ton groupe d'adopter ton idée", e: "🎤" },
  { d: "A", t: "Dessiner, filmer, écrire ou composer de la musique", e: "🎨" },
  { d: "C", t: "Ranger, classer, planifier : que tout soit carré", e: "🗂️" },
  { d: "I", t: "Résoudre une énigme ou un problème de logique bien difficile", e: "🧩" },
  { d: "R", t: "Travailler dehors ou bouger, plutôt que rester assis·e", e: "🏃" },
  { d: "A", t: "Imaginer un look, une déco ou l'univers d'un jeu", e: "✨" },
  { d: "S", t: "Expliquer une notion à quelqu'un qui galère", e: "🧑‍🏫" },
  { d: "C", t: "Gérer un budget, des chiffres, un tableau", e: "📊" },
  { d: "E", t: "Organiser un événement et prendre la tête d'une équipe", e: "🚩" },
  { d: "R", t: "Fabriquer, réparer ou construire quelque chose de tes mains", e: "🛠️" },
  { d: "I", t: "Mener une expérience et analyser les résultats", e: "🧪" },
  { d: "S", t: "T'engager dans un projet utile aux autres (asso, bénévolat)", e: "🤝" },
  { d: "A", t: "Faire les choses à ta façon, sans mode d'emploi", e: "🌀" },
  { d: "E", t: "Lancer ton propre business ou projet", e: "🚀" },
  { d: "C", t: "Suivre une méthode précise et vérifier chaque détail", e: "🔍" }
];

A.reponses = [
  { v: 3, label: "Grave !" },
  { v: 2, label: "Plutôt oui" },
  { v: 1, label: "Bof" },
  { v: 0, label: "Pas du tout" }
];

A.lexique = [
  { mot: "Parcoursup", def: "La plateforme nationale où tu formules tes vœux pour l'enseignement supérieur, de janvier à mars de ta terminale." },
  { mot: "Vœu / sous-vœu", def: "Tu as jusqu'à 10 vœux (plus 10 en apprentissage). Certains vœux regroupent plusieurs établissements : ce sont les sous-vœux (20 max)." },
  { mot: "Vœux non classés", def: "Tes vœux ne sont pas hiérarchisés : les formations ne savent pas lesquels tu préfères. Tu choisis seulement quand tu reçois les réponses." },
  { mot: "Oui-si", def: "Réponse de la fac : tu es admis·e, avec un accompagnement (cours de soutien, année aménagée). Une aide, pas une sanction." },
  { mot: "En attente", def: "Tu es sur liste d'attente. Ta position évolue tous les jours, au fur et à mesure que d'autres candidat·es libèrent des places." },
  { mot: "Phase complémentaire", def: "À partir de mi-juin, tu peux faire de nouveaux vœux dans les formations qui ont encore des places." },
  { mot: "Projet de formation motivé", def: "La « lettre de motivation » de Parcoursup : quelques lignes par vœu pour expliquer pourquoi cette formation." },
  { mot: "Fiche Avenir", def: "L'avis de tes profs et du chef d'établissement, joint à chaque vœu. Tu la vois à la fin de la procédure." },
  { mot: "Taux d'accès", def: "Part des candidat·es qui ont reçu une proposition l'an dernier. Il est affiché sur chaque fiche Parcoursup : regarde-le !" },
  { mot: "ECTS", def: "Crédits européens. Une année validée = 60 ECTS. Ils te permettent de changer de formation ou de pays sans repartir de zéro." },
  { mot: "LMD", def: "Licence (bac+3), Master (bac+5), Doctorat (bac+8) : les trois niveaux des diplômes en Europe." },
  { mot: "Grade de licence", def: "Label de l'État qui garantit qu'un diplôme vaut une licence. Indispensable pour vérifier un bachelor privé." },
  { mot: "RNCP", def: "Le répertoire national des certifications professionnelles. Un diplôme inscrit au RNCP est reconnu par l'État et les employeurs." },
  { mot: "IUT", def: "Institut universitaire de technologie : c'est là qu'on prépare les BUT." },
  { mot: "STS", def: "Section de technicien supérieur : la classe de lycée où l'on prépare un BTS." },
  { mot: "CPGE", def: "Classe préparatoire aux grandes écoles. On dit « prépa », « taupe » pour la prépa maths, « khâgne » pour la prépa littéraire." },
  { mot: "Alternance", def: "Tu partages ton temps entre l'école et une entreprise qui te paie. Contrat d'apprentissage ou de professionnalisation." },
  { mot: "CFA", def: "Centre de formation d'apprentis : l'école quand tu es en apprentissage." },
  { mot: "CROUS", def: "L'organisme qui gère bourses, logements étudiants et restaurants universitaires." },
  { mot: "DSE", def: "Dossier social étudiant : la demande unique pour une bourse et un logement CROUS. À faire au printemps de ta terminale." },
  { mot: "Échelon de bourse", def: "De 0 bis à 7 : plus l'échelon est élevé, plus la bourse est importante. Il dépend des revenus et charges de ta famille." },
  { mot: "CVEC", def: "Contribution vie étudiante et de campus (environ 100 €/an), payée à l'inscription. Gratuite pour les boursier·es." },
  { mot: "MMOPK", def: "Médecine, maïeutique (sage-femme), odontologie (dentaire), pharmacie, kiné : les filières accessibles après PASS ou L.AS." },
  { mot: "CM / TD / TP", def: "Cours magistral (en amphi), travaux dirigés (petit groupe, exercices), travaux pratiques (labo, atelier)." },
  { mot: "Admissions parallèles", def: "Entrer dans une école en 2e ou 3e année après un BTS, un BUT ou une licence, sans passer par la 1re année." },
  { mot: "Année de césure", def: "Une pause de 6 mois à 1 an (stage, voyage, service civique) en gardant ta place dans ta formation." },
  { mot: "Service civique", def: "Une mission indemnisée de 6 à 12 mois dans une asso ou un service public, dès 16 ans. Ça compte dans un dossier." },
  { mot: "Cordées de la réussite", def: "Programme de tutorat où des étudiant·es t'accompagnent et te font découvrir le supérieur. Demande à ton lycée." },
  { mot: "Quota de boursier·es", def: "Chaque formation sur Parcoursup doit accueillir un pourcentage minimum de lycéen·nes boursier·es." },
  { mot: "Psy-EN", def: "Psychologue de l'Éducation nationale, spécialiste de l'orientation. Gratuit, au lycée ou au CIO." }
];

A.vraiFaux = [
  { q: "Avec un bac pro, on ne peut pas faire d'études supérieures.", r: false,
    exp: "Faux. Chaque BTS public réserve des places aux bacs pro, et beaucoup poursuivent ensuite en licence pro, bachelor ou école." },
  { q: "L'ordre de tes vœux sur Parcoursup compte.", r: false,
    exp: "Faux. Les vœux ne sont pas classés. Les formations ne savent pas où tu as candidaté ailleurs." },
  { q: "Une prépa publique coûte très cher.", r: false,
    exp: "Faux. Les prépas des lycées publics sont gratuites. Tu paies seulement l'inscription à l'université partenaire, et rien si tu es boursier·e." },
  { q: "En alternance, tu es payé·e pour étudier.", r: true,
    exp: "Vrai. Tu as un vrai salaire (un pourcentage du SMIC selon ton âge) et l'entreprise ou l'État paie ta formation." },
  { q: "Un « bachelor » est toujours un diplôme reconnu par l'État.", r: false,
    exp: "Faux. Le mot n'est pas protégé. Vérifie le grade de licence ou l'inscription au RNCP avant de t'engager." },
  { q: "Les écoles d'ingénieurs recrutent uniquement après une prépa.", r: false,
    exp: "Faux. Beaucoup recrutent juste après le bac, et une grosse part des ingénieur·es viennent de BUT ou BTS." },
  { q: "Il faut savoir quel métier on veut faire dès la terminale.", r: false,
    exp: "Faux. Choisir un domaine qui t'attire suffit. La plupart des gens découvrent leur métier pendant leurs études." },
  { q: "Les boursier·es ne paient pas de frais d'inscription à l'université.", r: true,
    exp: "Vrai. Les boursier·es du CROUS sont exonéré·es des frais d'inscription et de la CVEC." },
  { q: "On peut se réorienter après une première année ratée.", r: true,
    exp: "Vrai. Tu peux refaire des vœux sur Parcoursup, utiliser des passerelles, ou garder tes crédits ECTS validés." },
  { q: "En BUT, des places sont réservées aux bacs technologiques.", r: true,
    exp: "Vrai. Environ la moitié des places de BUT vont aux bacheliers technologiques." },
  { q: "La fac, c'est pour celles et ceux qui n'ont rien eu d'autre.", r: false,
    exp: "Faux. Certaines licences sont très demandées (droit, psycho, doubles licences) et mènent à des masters d'excellence." },
  { q: "Il existe une aide de l'État si tu es boursier·e et que tu étudies loin de chez toi.", r: true,
    exp: "Vrai. L'aide à la mobilité Parcoursup (500 €) est versée aux lycéen·nes boursier·es qui acceptent une formation hors de leur académie." }
];

/* Calendrier de la terminale : les dates officielles sont publiées sur parcoursup.fr, celles-ci sont des repères habituels. */
A.calendrier = [
  { quand: "Sept. → déc.", titre: "Explorer", texte: "Salons, journées portes ouvertes, semaines de l'orientation. Parle à ton prof principal et au/à la Psy-EN." },
  { quand: "Mi-décembre", titre: "Le moteur de recherche Parcoursup ouvre", texte: "Tu peux consulter les fiches des formations : contenus, attendus, taux d'accès." },
  { quand: "Mi-janvier", titre: "Inscription sur Parcoursup", texte: "Tu crées ton dossier et tu commences à ajouter tes vœux." },
  { quand: "Mi-mars", titre: "Dernier jour pour ajouter des vœux", texte: "Jusqu'à 10 vœux, plus 10 en apprentissage. Les vœux ne sont pas classés." },
  { quand: "Début avril", titre: "Dernier jour pour finaliser ton dossier", texte: "Projets de formation motivés rédigés, vœux confirmés. Sans confirmation, un vœu n'est pas étudié." },
  { quand: "Printemps", titre: "Dossier social étudiant (DSE)", texte: "Demande de bourse et de logement CROUS, même si tu n'es pas sûr·e d'y avoir droit." },
  { quand: "Fin mai / début juin", titre: "Les réponses arrivent", texte: "Oui, oui-si, en attente, non. Réponds dans les délais indiqués, sinon la proposition est perdue." },
  { quand: "Mi-juin", titre: "Bac et phase complémentaire", texte: "Épreuves finales. Si besoin, de nouveaux vœux sont possibles dans les formations qui ont des places." },
  { quand: "Juillet", titre: "Résultats du bac et inscription", texte: "Tu t'inscris administrativement dans la formation que tu as acceptée." }
];

A.checklist = [
  { id: "c1", t: "Repérer 3 domaines qui m'attirent" },
  { id: "c2", t: "Faire le test d'Aiguillage" },
  { id: "c3", t: "Aller à 2 journées portes ouvertes (ou en visio)" },
  { id: "c4", t: "Parler à un·e étudiant·e de la formation qui me tente" },
  { id: "c5", t: "Prendre rendez-vous avec le/la Psy-EN ou mon prof principal" },
  { id: "c6", t: "Regarder le taux d'accès de chaque formation visée" },
  { id: "c7", t: "Créer mon dossier Parcoursup" },
  { id: "c8", t: "Rédiger mes projets de formation motivés" },
  { id: "c9", t: "Faire ma demande de bourse et de logement (DSE)" },
  { id: "c10", t: "Confirmer tous mes vœux avant la date limite" }
];

A.aides = [
  { titre: "Bourse sur critères sociaux", montant: "Échelons 0 bis à 7, sur 10 mois", texte: "Versée par le CROUS selon les revenus de ta famille. Elle t'exonère aussi des frais d'inscription et de la CVEC.", lien: "https://www.messervices.etudiant.gouv.fr", lienTexte: "Simulateur officiel" },
  { titre: "Aide à la mobilité Parcoursup", montant: "500 €", texte: "Pour les lycéen·nes boursier·es qui acceptent une formation hors de leur académie. Un complément de 1 500 € existe pour les bachelier·ères pro boursier·es d'Île-de-France qui partent hors de la région. À demander après ton admission, sur le portail du Crous.", lien: "https://www.parcoursup.gouv.fr", lienTexte: "Parcoursup" },
  { titre: "Logement CROUS", montant: "Loyers modérés", texte: "Chambres et studios en résidence universitaire, attribués en priorité aux boursier·es. Demande via le DSE.", lien: "https://trouverunlogement.lescrous.fr", lienTexte: "Trouver un logement" },
  { titre: "APL (CAF)", montant: "Selon ton loyer et tes revenus", texte: "Aide au logement, même en résidence CROUS ou en colocation. Fais la demande dès que tu as ton bail.", lien: "https://www.caf.fr", lienTexte: "Simuler sur caf.fr" },
  { titre: "Garantie Visale", montant: "Gratuite", texte: "Action Logement se porte garant pour toi auprès du propriétaire si tu n'as personne pour le faire.", lien: "https://www.visale.fr", lienTexte: "visale.fr" },
  { titre: "Apprentissage", montant: "Salaire + formation gratuite", texte: "Ta formation est payée par l'entreprise et tu touches un salaire (un pourcentage du Smic selon ton âge). Seule la CVEC reste due, et ton employeur peut te la rembourser.", lien: "https://www.alternance.emploi.gouv.fr", lienTexte: "Trouver une alternance" },
  { titre: "Restos U", montant: "Repas à 1 €", texte: "Depuis le 4 mai 2026, le repas Crous est à 1 € pour tous les étudiant·es, boursier·es ou non (un repas par service).", lien: "https://www.etudiant.gouv.fr/fr/comment-beneficier-du-repas-crous-1-eu-3123", lienTexte: "etudiant.gouv.fr" }
];

/* Coût annuel indicatif hors logement (droits d'inscription et CVEC 2026-2027). */
A.couts = [
  { f: "BTS public", c: "0 €", niv: 0 },
  { f: "Prépa publique", c: "0 € de scolarité (+ inscription fac ≈ 178 € et CVEC, 0 € si boursier·e)", niv: 0 },
  { f: "Licence / BUT", c: "≈ 178 € + CVEC 105 € (0 € si boursier·e)", niv: 1 },
  { f: "École d'ingé publique", c: "≈ 630 € (2 620 € dans les Écoles centrales)", niv: 1 },
  { f: "École d'ingé privée", c: "6 000 à 10 000 €", niv: 3 },
  { f: "École de commerce", c: "7 000 à 15 000 €", niv: 3 },
  { f: "En apprentissage", c: "Formation gratuite et tu es payé·e (seule la CVEC de 105 € est due)", niv: 0 }
];

A.badges = [
  { id: "depart",     nom: "Premier départ",   emoji: "🎫", desc: "Ouvrir Aiguillage pour la première fois" },
  { id: "profil",     nom: "Profil validé",    emoji: "🧭", desc: "Terminer le test d'orientation" },
  { id: "curieux",    nom: "Curieux·se",       emoji: "👀", desc: "Lire 5 fiches métiers" },
  { id: "lecteur",    nom: "Grand·e lecteur·rice", emoji: "📖", desc: "Lire 15 fiches métiers" },
  { id: "cartographe",nom: "Cartographe",      emoji: "🗺️", desc: "Explorer 5 lignes du plan" },
  { id: "decodeur",   nom: "Décodeur·se",      emoji: "🔓", desc: "Retourner 10 cartes du décodeur" },
  { id: "mythbuster", nom: "Briseur·se de mythes", emoji: "💥", desc: "Faire 10/12 ou plus au vrai ou faux" },
  { id: "organise",   nom: "Organisé·e",       emoji: "✅", desc: "Cocher 5 étapes du calendrier" },
  { id: "collection", nom: "Collectionneur·se",emoji: "⭐", desc: "Mettre 3 métiers en favoris" },
  { id: "comparateur",nom: "Comparateur·rice", emoji: "⚖️", desc: "Comparer 2 types de formations" },
  { id: "budget",     nom: "Budget malin",     emoji: "💶", desc: "Découvrir les aides financières" },
  { id: "defi",       nom: "Défi relevé",      emoji: "🎯", desc: "Réussir un défi de la semaine" },
  { id: "serie",      nom: "Régulier·ère",     emoji: "🔥", desc: "Relever des défis 3 semaines de suite" },
  { id: "reseau",     nom: "Réseauteur·se",    emoji: "🔗", desc: "Valider 6 étapes de la page Réseau & LinkedIn" }
];

/* Niveaux selon les « km » parcourus (XP). */
A.niveaux = [
  { km: 0,   nom: "Voyageur·se débutant·e" },
  { km: 100, nom: "Explorateur·rice" },
  { km: 250, nom: "Aventurier·ère" },
  { km: 500, nom: "Navigateur·rice" },
  { km: 900, nom: "Grand·e cartographe" }
];

/* Chiffres officiels utilisés par le simulateur de budget */
A.chiffres = {
  // Bourse sur critères sociaux 2026-2027, montant annuel versé en 10 mensualités (service-public.gouv.fr, vérifié le 10/04/2026)
  bourses: [
    { id: "aucune", nom: "Pas de bourse", annuel: 0 },
    { id: "0bis", nom: "Échelon 0 bis", annuel: 1454 },
    { id: "1", nom: "Échelon 1", annuel: 2163 },
    { id: "2", nom: "Échelon 2", annuel: 3071 },
    { id: "3", nom: "Échelon 3", annuel: 3828 },
    { id: "4", nom: "Échelon 4", annuel: 4587 },
    { id: "5", nom: "Échelon 5", annuel: 5212 },
    { id: "6", nom: "Échelon 6", annuel: 5506 },
    { id: "7", nom: "Échelon 7", annuel: 6335 }
  ],
  droitsLicence: 178,          // droits d'inscription licence 2026-2027
  cvec: 105,                   // CVEC 2026-2027
  repasCrous: 1,               // repas Crous à 1 € pour tous depuis le 4 mai 2026
  smicNetHoraire: 9.74,        // SMIC net estimé au 1er juin 2026 (1 477,93 € / 151,67 h)
  smicBrutMensuel: 1867.02,
  smicNetMensuel: 1478,        // SMIC net estimé au 1er juin 2026 (info.gouv.fr)
  // Plafonds de loyer pris en compte pour l'APL, personne seule, au 1er octobre 2026 (caf.fr)
  plafondsApl: { zone1: 336.97, zone2: 293.68, zone3: 275.25 }
};
