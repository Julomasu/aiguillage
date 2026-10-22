/* Annuaire des écoles : tous les établissements de Parcoursup, les écoles d'ingénieurs accréditées (CTI) et des écoles
   qui recrutent hors Parcoursup (École Bleue, Epitech, IÉSEG en 5 ans…). Données : data/ecoles.json, générées par outils/ecoles.py. */
(function () {
  const CATS = [
    ["commerce", "Commerce & management", "#3BB3E0"], ["ingenieur", "Ingénieur", "#1B998B"], ["numerique", "Numérique & jeu vidéo", "#2F5BEA"],
    ["art-design", "Art, design & mode", "#E85D9E"], ["media", "Communication, médias & cinéma", "#7A3FD1"], ["sciences-po", "Sciences po & politique", "#7A3FD1"],
    ["universite", "Université", "#7A3FD1"], ["sante", "Santé", "#E4572E"], ["social-sport", "Social & sport", "#6BBF59"],
    ["hotellerie", "Hôtellerie & tourisme", "#3BB3E0"], ["architecture", "Architecture", "#9C6644"], ["agro", "Agro, vivant & nature", "#6BBF59"],
    ["droit", "Droit", "#7A3FD1"], ["service-public", "Service public & armées", "#131A33"], ["aero-maritime", "Air & mer", "#2F5BEA"],
    ["culture", "Culture & spectacle", "#E85D9E"], ["lycee", "Lycées à prépa & DN MADE", "#F2A71B"], ["autre", "Autres", "#9C6644"]
  ];
  const CAT = Object.fromEntries(CATS.map(c => [c[0], { nom: c[1], couleur: c[2] }]));
  const STATUT = { public: "Public", prive: "Privé", consulaire: "Consulaire (CCI)", associatif: "Privé d'intérêt général" };
  const ACCES = {
    psup: "Parcoursup", concours: "Concours ou épreuves d'admission", dossier: "Candidature directe : dossier et entretien", apprentissage: "Alternance possible"
  };
  /* Anglais : les libellés de reconnaissance et de formations sont rédigés en français dans les données ;
     on les traduit par fragments (ce qui n'est pas reconnu reste en français). */
  const FRAGMENTS = [
    [/Bac [Gg]énéral/g, "General bac"], [/Bac [Tt]echno(?:logique)?/g, "Techno bac"], [/Bac [Pp]ro(?:fessionnel)?/g, "Vocational bac"], [/\(en (\d+) ans\)/g, "($1 years)"], [/Double diplôme/g, "Double degree"],
    [/Diplôme d'ingénieur \(CTI\)/g, "Engineering degree (CTI-accredited)"], [/Diplômes? visés?/g, m => /s$/.test(m) ? "State-accredited degrees (diplômes visés)" : "State-accredited degree (diplôme visé)"],
    [/Cursus reconnu par la profession/g, "Course recognised by the profession"], [/Cursus reconnu/g, "Recognised course"],
    [/Formation rémunérée/g, "Paid training"], [/Formation gratuite/g, "Free program"], [/Formation d'officier et de commissaire de police/g, "Police officer and commissioner training"], [/Formation d'officier/g, "Officer training"],
    [/Formation d'auditeur de justice \(rémunéré\)/g, "Trainee-judge training (paid)"], [/Formation de magistrat/g, "Magistrate training"], [/Formation de 24 mois/g, "24-month training"],
    [/Diplômes? d'école/g, m => /s/.test(m) ? "School diplomas" : "School diploma"], [/Prépa artistique privée/g, "Private art prep course"], [/École de spécialisation/g, "Specialization school"],
    [/Diplôme d'État de docteur vétérinaire/g, "State veterinary doctor's degree"], [/Diplôme d'État d'architecte/gi, "State architect's degree"], [/diplôme de notaire/g, "notary diploma"],
    [/Diplôme national supérieur d'expression plastique/g, "National higher diploma in plastic arts"], [/Diplôme de premier cycle, master/g, "First-cycle diploma, master's"], [/Diplôme d'établissement/g, "Institution diploma"],
    [/grades? de licence et de master/g, "licence and master's grades"], [/grade de licence et master/gi, "licence and master's grade"], [/grade de master/gi, m => m[0] === "G" ? "Master's grade" : "master's grade"], [/grade de licence/gi, "licence grade"],
    [/Accréditation américaine \(NECHE\)/g, "American accreditation (NECHE)"], [/Art dramatique, régie, scénographie/g, "Drama, stage management, scenography"], [/BTS en alternance \(gestion, commerce, communication\) et bachelors/g, "Work-study BTS (management, business, communication) and bachelor's degrees"], [/BTS et titres RNCP/g, "BTS and RNCP titles"], [/Bachelor et master en management de l'art et de la culture/g, "Bachelor's and master's in art and culture management"], [/Bachelor et masters en alternance \(vente, commerce\)/g, "Bachelor's and master's in work-study (sales, business)"], [/Bachelor marketing et événementiel sportif \(3 ans\)/g, "Bachelor in sports marketing and events (3 years)"], [/Bachelors \(communication, marketing, événementiel\)/g, "Bachelor's degrees (communication, marketing, events)"], [/Bachelors et masters de design en anglais/g, "Design bachelor's and master's degrees in English"], [/Bachelors et masters en anglais \(relations internationales, business, communication\)/g, "Bachelor's and master's degrees in English (international relations, business, communication)"], [/Bachelors et masters en marketing, communication, digital/g, "Bachelor's and master's degrees in marketing, communication, digital"], [/Bootcamp, pas de diplôme d'État/g, "Bootcamp, no state diploma"], [/Cinéma et audiovisuel \(réalisation, montage, production\)/g, "Film and audiovisual (directing, editing, production)"], [/Cinéma et audiovisuel \(réalisation, scénario, image\)/g, "Film and audiovisual (directing, screenwriting, image)"], [/Cinéma, audiovisuel, jeu vidéo/g, "Film, audiovisual, video games"], [/Cours privé d'art dramatique/g, "Private drama school"], [/Design, digital, jeu vidéo, web/g, "Design, digital, video games, web"], [/Diplôme américain \(The New School\)/g, "American degree (The New School)"], [/Diplôme national supérieur/g, "Higher national diploma"], [/Diplôme national/g, "National diploma"], [/Diplômes de l'école, certains reconnus/g, "School diplomas, some recognised"], [/Développement logiciel \(pédagogie par projets, sans cours\)/g, "Software development (project-based learning, no lectures)"], [/Développement web, data, cybersécurité \(formations courtes\)/g, "Web development, data, cybersecurity (short programmes)"], [/Développement, web, data \(bachelors\)/g, "Development, web, data (bachelor's degrees)"], [/Formation de comédien·ne \(3 ans\)/g, "Actor training (3 years)"], [/Formation gratuite, à vérifier/g, "Free programme, to be checked"], [/Formation reconnue par la profession \(à vérifier\)/g, "Programme recognised by the profession (to be checked)"], [/Ingénieur \(électronique, informatique, télécoms\)/g, "Engineer (electronics, computing, telecoms)"], [/Ingénieur en agriculture, agroalimentaire/g, "Engineer in agriculture and food"], [/Ingénieur en agronomie et agroalimentaire/g, "Engineer in agronomy and food"], [/Journalisme \(5 ans\)/g, "Journalism (5 years)"], [/Licence et master d'économie, parcours internationaux/g, "Bachelor's and master's in economics, international tracks"], [/Management de la culture et du marché de l'art/g, "Management of culture and the art market"], [/Master en management des organisations sportives \(2 ans\)/g, "Master's in sports organisation management (2 years)"], [/Master reconnu/g, "Recognised master's"], [/Masters d'économie \(analyse et politique économiques…\)/g, "Master's in economics (economic analysis and policy…)"], [/Musique \(instrument, pédagogie\)/g, "Music (instrument, teaching)"], [/Musique, danse \(3 à 5 ans\)/g, "Music, dance (3 to 5 years)"], [/Parcours diplômants en ligne en alternance \(développement, data, marketing\)/g, "Online degree tracks in work-study (development, data, marketing)"], [/Pas de diplôme d'État, formation gratuite sur sélection/g, "No state diploma, free programme on selection"], [/Programme Grande École \(accès Bac\+2 ou Bac\+3, concours Passerelle\)/g, "Grande École programme (entry at Bac+2 or Bac+3, Passerelle exam)"], [/Théâtre : jeu, mise en scène, technique/g, "Theatre: acting, directing, technical"], [/Titres RNCP \(niveaux 5 à 7\)/g, "RNCP titles (levels 5 to 7)"], [/Titres RNCP \(niveaux 6 et 7\), à vérifier sur France compétences/g, "RNCP titles (levels 6 and 7), to be checked on France compétences"], [/Titre RNCP \(à vérifier\)/g, "RNCP title (to be checked)"], [/Web, data, cybersécurité \(bootcamps\)/g, "Web, data, cybersecurity (bootcamps)"],
    [/Titres? RNCP niveaux? ([\d, et]+)/g, (m, n) => "RNCP title" + (/Titres/.test(m) ? "s" : "") + ", level" + (/niveaux/.test(m) ? "s " : " ") + n.replace(/ et /g, " and ")], [/Titres RNCP/g, "RNCP titles"], [/titres RNCP/g, "RNCP titles"], [/Titre RNCP/g, "RNCP title"],
    [/niveau (\d)/g, "level $1"], [/certains cursus/g, "some programs"], [/selon les cursus/g, "depending on the program"], [/habilitée par le ministère de la Culture/g, "approved by the Ministry of Culture"],
    [/Diplômes Jeunesse et Sports/g, "Youth and Sports diplomas"], [/brevets d'officier/g, "officer certificates"], [/formations de pilote de ligne et de contrôleur aérien/g, "airline-pilot and air-traffic-controller training"],
    [/Cycle ingénieur polytechnicien/g, "Polytechnique engineering cycle"], [/Cycle ingénieur/g, "Engineering cycle"], [/Tronc commun post-bac puis/g, "Common post-bac core then"],
    [/Programme Grande École/g, "Grande École programme"], [/Programme post-bac/g, "Post-bac programme"], [/Programme en 5 ans/g, "5-year programme"], [/Programmes post-bac/g, "Post-bac programmes"],
    [/Cursus de développeur/g, "Developer program"], [/Cursus de (\d)/g, "$1-year program"], [/Cursus en (\d)(?: à (\d))? ans/g, (m, a, b) => (b ? a + "-" + b : a) + "-year program"], [/Cursus post-bac/g, "Post-bac program"], [/Cursus/g, "Program"], [/cursus post-bac/g, "post-bac program"],
    [/Études vétérinaires/g, "Veterinary studies"], [/établissement privé/g, "private institution"], [/Classes? préparatoires? aux écoles d'art et de design/g, "Prep class for art and design schools"], [/Classes? préparatoires? aux écoles d'art/g, "Prep classes for art schools"],
    [/Classe préparatoire/g, "Prep class"], [/Préparation aux concours des écoles d'art/g, "Preparation for art-school entrance exams"], [/Prépa et cursus en/g, "Prep and program in"],
    [/Formations? courtes? aux métiers du numérique/g, "Short training for digital careers"], [/Formations aux métiers du sport/g, "Training for sports careers"], [/Métiers du son, de l'image, du média/g, "Sound, image and media careers"],
    [/Histoire de l'art et patrimoine/g, "Art history and heritage"], [/Création industrielle/g, "Industrial design"], [/Sport de haut niveau et formation/g, "Elite sport and training"], [/Cadres de direction des collectivités/g, "Senior managers of local authorities"],
    [/Attaché d'administration de l'État/g, "State administration officer"], [/Officiers? de sapeurs-pompiers professionnels/g, "Professional firefighter officers"], [/Officiers? et commissaires? de police/g, "Police officers and commissioners"],
    [/Officier de la marine marchande, ingénieur/g, "Merchant-navy officer, engineer"], [/Officier de l'armée de l'air et de l'espace/g, "Air and space force officer"], [/Officier de l'armée de terre/g, "Army officer"], [/Officier de gendarmerie/g, "Gendarmerie officer"], [/Officier de marine/g, "Navy officer"],
    [/Surveillants, directeurs, conseillers d'insertion/g, "Guards, directors, probation counselors"], [/Éducateurs et directeurs de la PJJ/g, "Youth-justice educators and directors"], [/Inspecteurs, contrôleurs des douanes/g, "Customs inspectors and officers"], [/Inspecteurs, contrôleurs des finances publiques/g, "Public-finance inspectors and officers"],
    [/Gardien de la paix \(1 an en école\)/g, "Police officer (1 year at the school)"], [/Bootcamp développeur web \((\d+) semaines\)/g, "Web-developer bootcamp ($1 weeks)"], [/Formation de développeur web \((\d) ans\)/g, "Web-developer training ($1 years)"],
    [/Cursus en (\d) ans, sans frais \(admission après un test et la « piscine »\)/g, "$1-year program, no fees (admission after a test and the “piscine”)"],
    [/Collège universitaire \((\d) ans, grade de licence\) puis master/g, "University college ($1 years, licence grade) then master's"], [/Licence et master en management/g, "Licence and master's in management"], [/Master et licence en management/g, "Licence and master's in management"],
    [/Licence, master tourisme/g, "Licence, master's in tourism"], [/Master management hôtelier/g, "Master's in hotel management"], [/Master jeux et médias interactifs numériques/g, "Master's in games and interactive digital media"], [/Licence 3, master \(communication, journalisme\)/g, "Year 3 of licence, master's (communication, journalism)"],
    [/Académie ESJ \(post-bac\)/g, "ESJ Academy (post-bac)"], [/Cinéma, photographie, son/g, "Cinema, photography, sound"], [/Réalisation, montage, scénario/g, "Directing, editing, screenwriting"],
    [/Dessin, illustration, BD, animation/g, "Drawing, illustration, comics, animation"], [/Animation 3D, 2D/g, "3D and 2D animation"], [/Effets visuels, animation, jeu vidéo/g, "Visual effects, animation, video games"], [/Jeu vidéo, animation 3D, VFX/g, "Video games, 3D animation, VFX"],
    [/Animation, jeu vidéo, design/g, "Animation, video games, design"], [/Animation, cinéma, jeu vidéo/g, "Animation, cinema, video games"], [/Cinéma, audiovisuel/g, "Cinema, audiovisual"], [/Cinéma, son, spectacle vivant, jeu vidéo/g, "Cinema, sound, live performance, video games"],
    [/Stylisme, modélisme, commerce de la mode/g, "Fashion design, pattern making, fashion business"], [/Stylisme/g, "Fashion design"], [/Photographie, communication, design/g, "Photography, communication, design"], [/Photographie, image/g, "Photography, image"], [/Photographie/g, "Photography"],
    [/Design graphique, animation 3D, jeu vidéo/g, "Graphic design, 3D animation, video games"], [/Design graphique, architecture d'intérieur/g, "Graphic design, interior architecture"], [/Design, motion design, communication visuelle/g, "Design, motion design, visual communication"],
    [/Design, motion, jeu vidéo/g, "Design, motion, video games"], [/Design, direction artistique/g, "Design, art direction"], [/Design, communication visuelle/g, "Design, visual communication"], [/Design, architecture d'intérieur, photographie, mode/g, "Design, interior architecture, photography, fashion"],
    [/Architecture d'intérieur, design graphique, mode, jeu vidéo, animation/g, "Interior architecture, graphic design, fashion, video games, animation"], [/Architecture d'intérieur, design, animation/g, "Interior architecture, design, animation"],
    [/Architecture intérieure, direction artistique, design graphique/g, "Interior architecture, art direction, graphic design"], [/Architecture intérieure et design/g, "Interior architecture and design"], [/Architecture d'intérieur/g, "Interior architecture"],
    [/Journalisme, communication, production \(bachelor \+ mastère\)/g, "Journalism, communication, production (bachelor + master's)"], [/Mastère \(communication, journalisme\)/g, "Master's (communication, journalism)"], [/Mastère/g, "Master's (mastère)"], [/mastères/g, "master's"],
    [/Bachelor et mastères mode et luxe/g, "Bachelor and master's in fashion and luxury"], [/Bachelor arts culinaires et management/g, "Bachelor in culinary arts and management"], [/Bachelor en hôtellerie internationale/g, "Bachelor in international hospitality"], [/Bachelor design/g, "Design bachelor"],
    [/Cuisine, pâtisserie, management/g, "Cooking, pastry, management"], [/Cuisine, pâtisserie/g, "Cooking, pastry"], [/Cours de théâtre/g, "Acting classes"], [/Art dramatique/g, "Drama"], [/Musique, danse/g, "Music, dance"], [/Art/g, "Art"],
    [/Post-diplôme/g, "Post-graduate"], [/Scénographie/g, "Scenography"], [/Design global/g, "Global design"], [/Cycle/g, "Cycle"],
    [/après la prépa/g, "after prépa"], [/après le bac/g, "after the bac"], [/après le Bac\+2/g, "after Bac+2"], [/à partir de Bac\+3/g, "from Bac+3"], [/concours/g, "entrance exam"], [/apprentissage/g, "work-study"],
    [/\((\d+) à (\d+) ans\)/g, "($1 to $2 years)"], [/(\d+) à (\d+) ans/g, "$1 to $2 years"], [/(\d+) ans/g, "$1 years"], [/(\d+) an\b/g, "$1 year"], [/(\d+) semaines/g, "$1 weeks"],
    [/ et /g, " and "], [/ puis /g, " then "], [/ ou /g, " or "], [/\bmétiers\b/g, "careers"], [/sans frais/g, "no fees"], [/rémunérés?/g, "paid"], [/gratuit/g, "free"], [/ingénieur/g, "engineer"]
  ];
  const trData = t => {
    if (A.lang !== "en") return t;
    let r = String(t);
    FRAGMENTS.forEach(([rx, to]) => { r = r.replace(rx, to); });
    return r;
  };

  const PAGE = 30;
  const f = { q: "", cats: new Set(), hors: false, statut: "", rayon: 0, voirPlus: PAGE };
  let donnees = null;

  const sa = s => A.sansAccents(String(s || ""));

  function preparer(d) {
    d.ecoles.forEach(o => {
      o.cle = sa([o.n, o.s, ...(o.al || []), ...o.v.map(v => v[0])].join(" "));
      o.nomCle = sa(o.n + " " + (o.s || ""));
    });
    return d.ecoles;
  }

  function distance(o) {
    const v = A.etat.ville;
    if (!v || v.lat == null) return Infinity;
    let m = Infinity;
    o.v.forEach(c => { if (c[2] != null) m = Math.min(m, A.distanceKm(v.lat, v.lon, c[2], c[3])); });
    return m;
  }

  function filtrer() {
    const mots = sa(f.q).split(/\s+/).filter(Boolean);
    const v = A.etat.ville;
    let liste = donnees.filter(o => {
      if (f.cats.size && !o.c.some(c => f.cats.has(c))) return false;
      if (f.hors && o.ps) return false;
      if (f.statut && o.st !== f.statut) return false;
      if (mots.length && !mots.every(m => o.cle.includes(m))) return false;
      return true;
    });
    if (v && f.rayon) {
      liste.forEach(o => { o.dist = distance(o); });
      liste = liste.filter(o => o.dist <= f.rayon).sort((a, b) => a.dist - b.dist);
    } else {
      liste.forEach(o => { o.dist = v ? distance(o) : Infinity; });
      const q = sa(f.q).trim();
      liste.sort((a, b) => {
        if (q) { const sa_ = a.nomCle.startsWith(q) ? 0 : 1, sb_ = b.nomCle.startsWith(q) ? 0 : 1; if (sa_ !== sb_) return sa_ - sb_; }
        return a.n.localeCompare(b.n, "fr");
      });
    }
    return liste;
  }

  function puceCat(c) {
    const x = CAT[c] || CAT.autre;
    return `<span class="ec-cat" style="--c:${x.couleur}"><i></i>${A.e(x.nom)}</span>`;
  }

  function villesTexte(o, max) {
    const noms = o.v.map(v => v[0]);
    return noms.length <= max ? noms.join(" · ") : noms.slice(0, max).join(" · ") + ` · +${noms.length - max}`;
  }

  function badgeParcoursup(o) {
    return o.ps
      ? `<span class="ec-psup ec-oui">Parcoursup${o.pn ? ` · ${o.pn} formation${o.pn > 1 ? "s" : ""}` : ""}</span>`
      : `<span class="ec-psup ec-non">Hors Parcoursup</span>`;
  }

  function carteEcole(o) {
    const reco = (o.r || []).slice(0, 2).map(r => `<span class="ec-reco">${A.e(trData(r))}</span>`).join("");
    return `<article class="ec" id="ec-${A.e(o.id)}">
      <header>
        <h3><a href="#ecole-${A.e(o.id)}">${A.e(o.n)}</a>${o.s && !sa(o.n).includes(sa(o.s)) ? ` <span class="ec-sigle">${A.e(o.s)}</span>` : ""}</h3>
        ${o.dist != null && o.dist !== Infinity ? `<span class="ec-dist">${o.dist < 1 ? "< 1" : Math.round(o.dist)} km</span>` : ""}
      </header>
      <div class="ec-lignes">${o.c.map(puceCat).join("")}<span class="ec-statut">${A.e(STATUT[o.st] || "")}</span>${badgeParcoursup(o)}</div>
      ${reco ? `<div class="ec-lignes">${reco}</div>` : ""}
      <p class="ec-villes">${A.e(villesTexte(o, 4))}</p>
      <a class="lien-fleche" href="#ecole-${A.e(o.id)}">Voir la fiche</a>
    </article>`;
  }

  function lienSignalement(titre, corps) {
    const d = A.CONFIG && A.CONFIG.depotGithub;
    if (!d) return "";
    const q = new URLSearchParams({ template: "ecole.yml", title: titre });
    if (corps) q.set("body", corps);
    return `https://github.com/${d}/issues/new?${q.toString()}`;
  }

  A.pages.ecoles = function (el) {
    const v = A.etat.ville;
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">L'annuaire</p>
        <h1>Toutes les écoles</h1>
        <p class="chapo" id="ec-chapo">Les établissements de Parcoursup, les écoles d'ingénieurs accréditées, et celles qui recrutent <strong>hors Parcoursup</strong> : écoles de design, de numérique, de cinéma, grandes écoles de commerce en 5 ans…</p>
      </section>
      <div class="panneau-filtres">
      <div class="carte-outils">
        <label class="champ"><span>Nom, sigle ou ville</span>
          <input id="ec-q" type="search" autocomplete="off" placeholder="Ex. IÉSEG, École Bleue, Rennes, design…" value="${A.e(f.q)}">
        </label>
        <label class="champ"><span>Statut</span>
          <select id="ec-statut">
            <option value="">Tous</option>
            ${Object.entries(STATUT).map(([k, t]) => `<option value="${k}"${f.statut === k ? " selected" : ""}>${A.e(t)}</option>`).join("")}
          </select>
        </label>
        <label class="champ"><span>Près de chez toi${v ? ` (${A.e(v.nom)})` : ""}</span>
          <select id="ec-rayon"${v ? "" : " disabled"}>
            <option value="0">Partout en France</option>
            ${[30, 60, 100, 200].map(r => `<option value="${r}"${f.rayon === r ? " selected" : ""}>à moins de ${r} km</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="puces" role="group" aria-label="Domaines">
        ${CATS.map(c => `<button type="button" class="puce puce-dom" data-cat="${c[0]}" aria-pressed="${f.cats.has(c[0])}" style="--c:${c[2]}"><i></i>${A.e(c[1])}<span class="ec-n" data-n="${c[0]}"></span></button>`).join("")}
      </div>
      <div class="puces">
        <button type="button" class="puce" data-hors aria-pressed="${f.hors}">Hors Parcoursup seulement</button>
      </div>
      </div>
      <p class="ec-compte" id="ec-compte" aria-live="polite">Chargement de l'annuaire…</p>
      <div class="ec-liste" id="ec-liste"></div>
      <p class="petit source">Sources : Parcoursup session 2025 (ministère de l'Enseignement supérieur, Licence Ouverte), liste des écoles d'ingénieurs accréditées par la CTI (arrêté du 11 décembre 2025, Légifrance) et liste complétée à la main pour les écoles hors Parcoursup. Aucune liste n'est « complète à 100 % » : il manque forcément des écoles, et les informations sur la reconnaissance des diplômes peuvent changer chaque année. Vérifie toujours sur le site de l'école et sur France compétences.</p>
      <div class="ec-manquante" id="ec-manquante"></div>`;

    A.donnees("ecoles").then(d => {
      if (A.lireHash().page !== "ecoles") return;
      donnees = preparer(d);
      A.$("#ec-chapo").innerHTML = `${donnees.length.toLocaleString(A.locale)} établissements : les ${donnees.filter(o => o.ps).length.toLocaleString(A.locale)} de Parcoursup, les écoles d'ingénieurs accréditées, et <strong>${donnees.filter(o => !o.ps).length.toLocaleString(A.locale)} qui recrutent hors Parcoursup</strong> (écoles de design, de numérique, de cinéma, grandes écoles en 5 ans…).`;
      const n = {};
      donnees.forEach(o => o.c.forEach(c => { n[c] = (n[c] || 0) + 1; }));
      A.$$("[data-n]").forEach(x => { x.textContent = n[x.dataset.n] || 0; });
      brancher(el);
      maj();
    }).catch(() => { A.$("#ec-compte").innerHTML = A.messageErreurDonnees; });
  };

  function brancher(el) {
    let tempo;
    A.$("#ec-q").addEventListener("input", ev => { clearTimeout(tempo); tempo = setTimeout(() => { f.q = ev.target.value; f.voirPlus = PAGE; maj(); }, 160); });
    A.$("#ec-statut").addEventListener("change", ev => { f.statut = ev.target.value; f.voirPlus = PAGE; maj(); });
    A.$("#ec-rayon").addEventListener("change", ev => { f.rayon = Number(ev.target.value); f.voirPlus = PAGE; maj(); });
    el.onclick = ev => {
      const b = ev.target.closest("button");
      if (!b) return;
      if (b.dataset.cat) {
        const id = b.dataset.cat;
        f.cats.has(id) ? f.cats.delete(id) : f.cats.add(id);
        A.$$("[data-cat]").forEach(x => x.setAttribute("aria-pressed", String(f.cats.has(x.dataset.cat))));
      } else if ("hors" in b.dataset) { f.hors = !f.hors; b.setAttribute("aria-pressed", String(f.hors)); }
      else if ("plus" in b.dataset) { f.voirPlus += PAGE; }
      else return;
      f.voirPlus = "plus" in b.dataset ? f.voirPlus : PAGE;
      maj();
    };
  }

  function maj() {
    const liste = filtrer();
    A.$("#ec-compte").innerHTML = `<strong>${liste.length.toLocaleString(A.locale)}</strong> établissement${liste.length > 1 ? "s" : ""}${f.rayon && A.etat.ville ? ` à moins de ${f.rayon} km de ${A.e(A.etat.ville.nom)}` : ""}`;
    const zone = A.$("#ec-liste");
    zone.innerHTML = liste.length
      ? liste.slice(0, f.voirPlus).map(carteEcole).join("") + (liste.length > f.voirPlus ? `<button type="button" class="btn btn-ligne ec-plus" data-plus>Voir plus (${liste.length - f.voirPlus} restants)</button>` : "")
      : `<div class="panneau-vide"><p>Aucun établissement ne correspond. Retire un filtre, ou signale-nous l'école qui manque.</p></div>`;
    const lien = lienSignalement("École manquante : " + f.q.trim(), f.q.trim() ? "Nom de l'école : " + f.q.trim() : "");
    A.$("#ec-manquante").innerHTML = lien
      ? `<p><strong>Une école manque ?</strong> <a href="${lien}" target="_blank" rel="noopener">Signale-la sur GitHub</a> (nom, ville, comment on y entre : on vérifie puis on l'ajoute).</p>`
      : `<p><strong>Une école manque ?</strong> Cet annuaire s'enrichit : une fois le site en ligne, un bouton te permettra de signaler une école ou une erreur.</p>`;
  }

  /* ——— Fiche d'un établissement */
  A.pages.ecole = function (el, id) {
    el.innerHTML = `<p class="carte-chargement">Chargement…</p>`;
    A.donnees("ecoles").then(d => {
      if (A.lireHash().page !== "ecole") return;
      const o = d.ecoles.find(x => x.id === id);
      if (!o) { el.innerHTML = `<section class="tete-page"><h1>École introuvable</h1><p><a class="lien-fleche" href="#ecoles">Retour à l'annuaire</a></p></section>`; return; }
      const dv = distance(o);
      const lienPsup = p => A.lienParcoursup(p);
      const recoTxt = (o.r || []).join(" ");
      const sites = "https://duckduckgo.com/?q=" + encodeURIComponent(o.n + " admission");
      const signaler = lienSignalement("Erreur sur la fiche : " + o.n, "École : " + o.n + " (" + o.id + ")\n\nCe qui est faux ou manquant : ");
      document.title = o.n + " · Aiguillage";
      el.innerHTML = `
        <section class="tete-page ec-tete">
          <a class="retour" href="#ecoles">← L'annuaire</a>
          <p class="surtitre">${o.c.map(c => (CAT[c] || CAT.autre).nom).join(" · ")}</p>
          <h1>${A.e(o.n)}${o.s && !sa(o.n).includes(sa(o.s)) ? ` <small class="ec-sigle">${A.e(o.s)}</small>` : ""}</h1>
          <div class="ec-lignes">${o.c.map(puceCat).join("")}<span class="ec-statut">${A.e(STATUT[o.st] || "")}</span>${badgeParcoursup(o)}</div>
        </section>
        <div class="ec-grille">
          <section class="carte-plate">
            <h2>Comment y entrer</h2>
            <ul class="ec-acces">${o.a.map(a => `<li>${A.e(ACCES[a] || a)}</li>`).join("")}</ul>
            ${o.ps ? "" : `<p class="petit"><strong>Hors Parcoursup</strong> : tu candidates directement auprès de l'école, sur son site, avec son propre calendrier. Regarde les dates dès l'automne de ta terminale : certaines écoles recrutent au fil de l'eau et remplissent leurs places avant le printemps.</p>`}
          </section>
          <section class="carte-plate">
            <h2>Où ?</h2>
            <ul class="ec-campus">${o.v.map(c => `<li>${A.e(c[0])}${c[1] ? ` <span class="petit">(${A.e(c[1])})</span>` : ""}${A.etat.ville && c[2] != null ? ` <span class="ec-dist">${Math.round(A.distanceKm(A.etat.ville.lat, A.etat.ville.lon, c[2], c[3]))} km</span>` : ""}</li>`).join("") || "<li>Lieu non précisé</li>"}</ul>
            ${A.etat.ville ? "" : `<p class="petit">Choisis ta ville sur <a href="#carte">la carte</a> pour voir la distance.</p>`}
          </section>
        </div>
        ${o.r && o.r.length ? `<section class="carte-plate">
          <h2>Reconnaissance du diplôme <span class="petit">(à vérifier)</span></h2>
          <div class="ec-lignes">${o.r.map(r => `<span class="ec-reco">${A.e(trData(r))}</span>`).join("")}</div>
          ${/RNCP/.test(recoTxt) ? `<p class="petit">Un titre RNCP est reconnu par le ministère du Travail (France compétences) : ce n'est ni un diplôme national ni un grade universitaire.</p>` : ""}
          ${/grade/i.test(recoTxt) ? `<p class="petit">Le grade de licence ou de master est accordé par l'État : il garantit des crédits ECTS et la poursuite d'études. Il porte sur une formation précise, pas sur toute l'école.</p>` : ""}
          <p class="petit">Demande à l'école le nom exact du diplôme, puis cherche son numéro sur <a href="https://www.francecompetences.fr/recherche/rncp/" target="_blank" rel="noopener">France compétences</a>. Le <a href="#decodeur">décodeur</a> explique visa, grade et RNCP.</p>
        </section>` : ""}
        ${o.f && o.f.length ? `<section class="carte-plate"><h2>Formations</h2><ul>${o.f.map(x => `<li>${A.e(trData(x))}</li>`).join("")}</ul></section>` : ""}
        ${o.cti && o.cti.sp.length ? `<section class="carte-plate"><h2>Spécialités d'ingénieur accréditées</h2><p>${o.cti.sp.map(s => A.e(s)).join(" · ")}</p><p class="petit">Voies : ${o.cti.voies.map(v => ({ "étudiant": "formation initiale", apprentissage: "apprentissage", continue: "formation continue" }[v] || v)).join(", ")}. Source : liste CTI (Légifrance).</p></section>` : ""}
        ${o.pf && o.pf.length ? `<section class="carte-plate">
          <h2>Dans Parcoursup <span class="petit">(${o.pn} formation${o.pn > 1 ? "s" : ""}, ${(o.pp || 0).toLocaleString(A.locale)} places)</span></h2>
          <ul class="ec-pf">${o.pf.map(p => `<li><span>${A.e(trData(p[0]))}</span> <span class="petit">${p[3] != null ? `taux d'accès ${p[3]} % · ` : ""}${p[2]} place${p[2] > 1 ? "s" : ""}</span> <a href="${lienPsup(p[4])}" target="_blank" rel="noopener">Fiche Parcoursup</a></li>`).join("")}</ul>
          ${o.pn > o.pf.length ? `<p class="petit">${o.pn - o.pf.length} autre${o.pn - o.pf.length > 1 ? "s" : ""} formation${o.pn - o.pf.length > 1 ? "s" : ""} sur la carte.</p>` : ""}
          <button type="button" class="btn btn-signal" data-carte>Voir sur la carte</button>
        </section>` : ""}
        <p class="ec-actions">
          <a class="btn btn-ligne" href="${sites}" target="_blank" rel="noopener">Chercher le site officiel</a>
          ${signaler ? `<a class="btn-texte" href="${signaler}" target="_blank" rel="noopener">Signaler une erreur</a>` : ""}
        </p>
        <p class="petit source">Les informations de cette fiche sont indicatives et peuvent être incomplètes. Les frais de scolarité, les dates et la reconnaissance du diplôme changent : vérifie-les sur le site de l'école.</p>`;
      el.onclick = ev => {
        if (ev.target.closest("[data-carte]")) { A.carteDemande = { ecole: o.n, ids: o.pi || [] }; A.aller("carte"); }
      };
    }).catch(() => { el.innerHTML = A.messageErreurDonnees; });
  };
})();
