/* Assistant d'orientation : répond à partir des fiches du site, du profil et des données Parcoursup.
   Trois moteurs possibles, du plus riche au plus simple :
   - dans l'aperçu claude.ai : la capacité « sample » (Claude, sur le compte de la personne qui regarde) ;
   - sur un serveur avec clé API : POST /api/assistant (serveur/assistant.mjs) ;
   - partout ailleurs (site statique gratuit) : le mode guidé, sans IA, qui cherche dans les données du site. */
(function () {
  const conversation = []; // [{role, content}] gardé en mémoire le temps de la visite
  let enCours = null;      // AbortController de la réponse en cours
  let moteur;              // promesse : "sample" | "api" | null

  const EN = () => A.lang === "en";
  const T = (fr, en) => EN() ? en : fr;

  const SUGGESTIONS_FR = [
    "Quelle différence entre un BTS et un BUT ?",
    "Comment devenir analyste M&A ?",
    "Je suis en bac pro commerce, je peux viser une école de commerce ?",
    "Quelles formations en informatique sans quitter Rennes ?",
    "Combien coûte une année d'études à Lyon ?"
  ];
  const SUGGESTIONS_EN = [
    "What is the difference between a BTS and a BUT?",
    "How do I become an M&A analyst?",
    "I'm doing a vocational bac in sales: can I aim for a business school?",
    "Which computer science programs can I do without leaving Rennes?",
    "How much does a year of studies cost in Lyon?"
  ];
  const suggestions = () => EN() ? SUGGESTIONS_EN : SUGGESTIONS_FR;

  const reglesFr = `Tu es l'assistant d'orientation d'Aiguillage, un site gratuit qui aide les lycéen·nes français·es à choisir leurs études.
Règles :
- Réponds en français, en tutoyant, avec des phrases simples (niveau lycée). 120 à 250 mots maximum sauf si on te demande plus de détail.
- Appuie-toi d'abord sur les DONNÉES DU SITE fournies ci-dessous. Si une information n'y figure pas, dis-le et renvoie vers Parcoursup, l'Onisep ou le/la Psy-EN du lycée. N'invente jamais un chiffre, un taux d'accès, un salaire ou une date.
- Les chiffres Parcoursup sont ceux de la session 2025. Précise-le quand tu les cites.
- Quand tu parles d'un métier ou d'une formation présent dans les données, ajoute un lien Markdown vers sa fiche, exactement sous la forme [Nom](#metier-identifiant) ou [Nom](#formation-identifiant).
- Sois honnête sur la sélectivité, mais ne décourage jamais : propose toujours au moins un chemin réaliste depuis le bac de la personne, y compris l'alternance et les passerelles.
- Tu ne connais pas les notes de la personne : ne prédis pas ses chances d'admission.
- Pas de sujets hors orientation, études, métiers, vie étudiante : recentre gentiment.`;
  const reglesEn = `You are the guidance assistant of Aiguillage, a free site that helps French high-school students choose their studies. Many users are English-speaking families or students at French schools abroad.
Rules:
- Answer in English, in a friendly and simple tone (high-school level). 120 to 250 words maximum unless asked for more detail. Keep the French names of degrees and of Parcoursup (BTS, BUT, prépa, licence…) and explain them briefly the first time.
- Rely first on the SITE DATA provided below. If something is not there, say so and point to Parcoursup, Onisep or the school's guidance counselor (Psy-EN). Never invent a figure, an access rate, a salary or a date.
- Parcoursup figures are from the 2025 session. Say so when you quote them.
- When you mention a career or a program present in the data, add a Markdown link to its page, exactly as [Name](#metier-identifier) or [Name](#formation-identifier).
- Be honest about selectivity but never discourage: always offer at least one realistic path from the person's bac, including work-study and bridges.
- You do not know the person's grades: do not predict their chances of admission.
- No topics outside guidance, studies, careers and student life: gently refocus.`;
  const regles = () => EN() ? reglesEn : reglesFr;

  function detecterMoteur() {
    if (moteur) return moteur;
    moteur = (async () => {
      if (window.claude && window.claude.use) {
        const sample = await window.claude.use("sample");
        if (sample) { A._sample = sample; return "sample"; }
      }
      try {
        const r = await fetch("api/assistant", { method: "GET" });
        if (r.ok) return "api";
      } catch (e) { /* pas de serveur */ }
      return "guide";
    })();
    return moteur;
  }

  /* ——— Contexte : les fiches les plus proches de la question, plus le profil */
  function motsCles(texte) {
    const vides = new Set("the and for what how which does can you your with about between difference best are was was this that from want like have has should would could into than then there their".split(" ").concat("les des une pour avec dans quel quelle quels quelles est que qui quoi comment faire sans mon mes ton tes son ses sur par pas plus moins tout tous etre avoir peux veux bac formation formations etude etudes metier metiers quitter devenir travailler aller apres ville faut entre difference quelle quelles quels dans sans chez".split(" ")));
    return A.sansAccents(texte).split(/[^a-z0-9&]+/).filter(m => m.length > 2 && !vides.has(m));
  }

  /* Un mot compte s'il commence un mot du texte (« entre » ne doit pas trouver « entreprise » au milieu d'une phrase) */
  function score(texte, mots) {
    const t = " " + A.sansAccents(texte).replace(/[^a-z0-9&]+/g, " ") + " ";
    return mots.reduce((s, m) => s + (t.includes(" " + m) ? 1 : 0), 0);
  }

  async function construireContexte(question) {
    const mots = motsCles(conversation.filter(m => m.role === "user").slice(-3).map(m => m.content).join(" ") + " " + question);
    const p = A.etat.profil;
    const lignes = [];
    if (p) {
      const bac = p.bac === "g" ? "bac général" + (p.specs.length ? " (spécialités : " + p.specs.map(id => A.specialites.find(s => s.id === id).nom).join(", ") + ")" : "") : p.bac === "t" ? "bac techno " + (p.serie || "") : "bac pro";
      lignes.push(`PROFIL DE LA PERSONNE : ${bac} ; profil RIASEC ${p.code} (${A.profils[p.code[0]].nom}, ${A.profils[p.code[1]].nom}) ; durée d'études souhaitée : ${p.duree} ; alternance : ${p.alternance}.`);
    } else lignes.push("PROFIL : inconnu (la personne n'a pas fait le test du site).");
    if (A.etat.ville) lignes.push(`VILLE CHOISIE SUR LE SITE : ${A.etat.ville.nom} (${A.etat.ville.dep}).`);

    const metiers = A.metiers.map(m => ({ m, s: score(m.nom + " " + m.accroche + " " + m.competences.join(" ") + " " + A.ligneParId[m.ligne].nom, mots) * 2 + score(m.nom, mots) * 3 }))
      .filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 6).map(x => x.m);
    const forms = A.formations.map(f => ({ f, s: score(f.nom + " " + f.long + " " + f.desc + " " + A.typeParId[f.type].nom, mots) * 2 + score(f.nom + " " + f.long, mots) * 3 }))
      .filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 6).map(x => x.f);
    metiers.forEach(m => m.formations.forEach(id => { if (forms.length < 10 && !forms.includes(A.formationParId[id])) forms.push(A.formationParId[id]); }));
    const types = A.types.filter(t => score(t.nom + " " + t.long, mots) > 0 || forms.some(f => f.type === t.id)).slice(0, 5);

    if (metiers.length) lignes.push("FICHES MÉTIERS :\n" + metiers.map(m =>
      `- #metier-${m.id} ${m.nom} : ${m.accroche} Études : ${m.etudes}. Salaire brut indicatif : ${m.salaire[0]} € débutant, ${m.salaire[1]} € confirmé. Recrutement : ${["", "peu de postes", "stable", "fort"][m.recrute]}. Formations : ${m.formations.map(id => A.formationParId[id].nom).join(", ")}. Le savais-tu : ${m.savais}`).join("\n"));
    if (forms.length) lignes.push("FICHES FORMATIONS :\n" + forms.map(f =>
      `- #formation-${f.id} ${f.nom} (${f.long}) : ${f.desc} Durée : ${A.dureeFormation(f)}. Accès (0 très rare à 3 voie royale) : bac général ${f.acces.g}, techno ${f.acces.t}, pro ${f.acces.p}. Après : ${f.apres}`).join("\n"));
    if (types.length) lignes.push("FAMILLES DE FORMATIONS :\n" + types.map(t =>
      `- ${t.nom} (${t.long}) : ${t.duree}, ${t.niveau}, ${t.lieu}. Coût : ${t.cout}. Sélection : ${t.selection}. Après : ${t.apres}. ${t.bonASavoir}`).join("\n"));

    try {
      const st = await A.donnees("parcoursup-stats");
      lignes.push("STATISTIQUES PARCOURSUP 2025 PAR FILIÈRE (part des admis par bac, pondérée par les places) :\n" + Object.entries(st.filieres).map(([k, v]) =>
        `- ${k} : ${v.formations} formations, ${v.places} places, taux d'accès médian ${v.tauxMedian} %, admis ${v.partGen} % bac général / ${v.partTec} % techno / ${v.partPro} % pro, ${v.boursiers} % boursiers`).join("\n"));
    } catch (e) { /* statistiques indisponibles */ }

    if (/bourse|argent|cout|coute|budget|loyer|logement|apl|crous|payer/.test(A.sansAccents(question))) {
      lignes.push("AIDES ET COÛTS : " + A.aides.map(a => `${a.titre} (${a.montant}) : ${a.texte}`).join(" | ") +
        ` | Bourses 2026-2027 (annuel) : ${A.chiffres.bourses.slice(1).map(b => b.nom + " " + b.annuel + " €").join(", ")}. Droits d'inscription licence 2026-2027 : ${A.chiffres.droitsLicence} €, CVEC ${A.chiffres.cvec} € (0 € pour les boursier·es). Le site a un simulateur de budget : [simulateur](#budget).`);
    }

    const villeCitee = await villeDansQuestion(question);
    if (villeCitee) lignes.push(villeCitee);
    lignes.push("PAGES UTILES DU SITE : [le test](#test), [le plan](#plan), [la carte des formations](#carte), [le simulateur de budget](#budget), [le décodeur du jargon](#decodeur), [le calendrier](#calendrier).");
    return lignes.join("\n\n");
  }

  /* Si la question cite une ville, on joint les formations Parcoursup proches correspondant aux mots-clés */
  async function villeDansQuestion(question) {
    try {
      const [villes, psup] = await Promise.all([A.donnees("villes"), A.parcoursup()]);
      // Les grandes villes sont reconnues même en minuscules ; les petites seulement avec une majuscule (« Sens », « Tours »…)
      const brut = " " + question.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + " ";
      const v = villes.lignes.find(x => x[0].length > 2 && new RegExp("[^A-Za-z]" + x[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[-']/g, ".") + "[^A-Za-z]", x[4] >= 50 && !["Tours", "Sens", "Lens", "Vienne", "Pau"].includes(x[0]) ? "i" : "").test(brut));
      if (!v) return "";
      const mots = motsCles(question).filter(m => !A.sansAccents(v[0]).includes(m));
      let proches = psup.lignes.filter(r => r.lat != null && A.distanceKm(v[2], v[3], r.lat, r.lon) <= 30);
      const filtrees = mots.length ? proches.filter(r => score(r.intitule + " " + r.fili + " " + r.etab, mots) > 0) : [];
      proches = (filtrees.length ? filtrees : proches).sort((a, b) => (b.places || 0) - (a.places || 0)).slice(0, 15);
      return T(`FORMATIONS PARCOURSUP 2025 À MOINS DE 30 KM DE ${v[0].toUpperCase()} (extrait) :\n`, `PARCOURSUP 2025 PROGRAMS WITHIN 30 KM OF ${v[0].toUpperCase()} (excerpt):\n`) + proches.map(r =>
        T(`- ${r.fili} ${r.intitule} — ${r.etab}, ${r.ville} (${r.public ? "public" : "privé"}) : ${r.places} places, taux d'accès ${r.taux} %, admis ${r.gen}/${r.tec}/${r.pro} % (général/techno/pro)`,
          `- ${r.fili} ${r.intitule} — ${r.etab}, ${r.ville} (${r.public ? "public" : "private"}): ${r.places} places, access rate ${r.taux}%, admitted ${r.gen}/${r.tec}/${r.pro}% (general/techno/vocational bac)`)).join("\n") +
        T("\nPour la liste complète, renvoie vers [la carte](#carte).", "\nFor the full list, point to [the map](#carte).");
    } catch (e) { return ""; }
  }

  /* ——— Mode guidé : réponse construite localement à partir des données du site */
  const THEMES = [
    { motif: /\bbts\b.*\bbut\b|\bbut\b.*\bbts\b|difference|comparer|choisir entre|compare|versus|\bvs\b|between/, types: ["bts", "but"] },
    { motif: /\bprepa|cpge|preparatory/, types: ["cpge"] },
    { motif: /\bfac\b|universite|university|licence|bachelor.?s degree/, types: ["licence"] },
    { motif: /medecine|medicine|medical|pass\b|l\.?as\b|sante|health|nurs|doctor/, types: ["pass-las"] },
    { motif: /commerce|management|business school/, types: ["ecole-commerce"] },
    { motif: /ingenieur|inge\b|engineer/, types: ["ecole-inge"] },
    { motif: /alternance|apprenti|work.?study/, types: [],
      texte: () => T("**L'alternance** : tu partages ton temps entre l'école et une entreprise qui te paie, et ta formation est gratuite. C'est possible en BTS, BUT, licence pro, écoles… Pour trouver une entreprise : [La bonne alternance](https://labonnealternance.apprentissage.beta.gouv.fr) et [1 jeune 1 solution](https://www.1jeune1solution.gouv.fr).",
        "**Work-study (alternance)**: you split your time between school and a company that pays you, and your training is free. It is possible in BTS, BUT, licence pro, schools… To find a company: [La bonne alternance](https://labonnealternance.apprentissage.beta.gouv.fr) and [1 jeune 1 solution](https://www.1jeune1solution.gouv.fr) (French sites).") },
    { motif: /bourse|argent|cout|coute|budget|loyer|logement|apl|crous|payer|cher|scholarship|grant|money|cost|rent|housing|afford|expensive|price|tuition|fees/, types: [], texte: null, aides: true },
    { motif: /parcoursup|voeu|voeux|date|calendrier|quand|deadline|when|calendar|apply|application/, types: [], calendrier: true },
    { motif: /linkedin|reseau|contacter|ecrire a|network|contact/, types: [],
      texte: () => T("Pour voir ce qu'ont fait les gens avant toi et oser leur écrire, suis le [tuto LinkedIn & réseau](#reseau).", "To see what people before you did and dare to write to them, follow the [LinkedIn & networking tutorial](#reseau).") },
    { motif: /reorient|rate|redoubl|changer de|change (my )?(course|major|direction|degree)|failed|drop out|retake|switch/, types: [],
      texte: () => T("**Se réorienter, c'est possible** : tu peux refaire des vœux sur Parcoursup, utiliser des passerelles ou garder tes crédits ECTS validés. Parles-en au service d'orientation de ton établissement.", "**Changing direction is possible**: you can make new choices on Parcoursup, use bridges between programs or keep the ECTS credits you passed. Talk to your school's guidance service.") }
  ];

  async function reponseGuidee(question) {
    const q = A.sansAccents(question), mots = motsCles(question), blocs = [];
    THEMES.filter(t => t.motif.test(q)).forEach(t => {
      t.types.forEach(id => {
        const ty = A.typeParId[id];
        blocs.push(`**${ty.nom}** (${ty.long}): ${ty.duree}, ${ty.niveau}. ${ty.resume} ${T("Coût", "Cost")}: ${ty.cout}. ${ty.bonASavoir} [${T("En savoir plus", "Learn more")}](#type-${id})`);
      });
      if (t.texte) blocs.push(t.texte());
      if (t.aides) blocs.push(T(`**Côté argent** : les BTS et prépas publics sont gratuits, la licence coûte ${A.chiffres.droitsLicence} € + ${A.chiffres.cvec} € de CVEC (0 € pour les boursier·es). La bourse va de ${A.euros(A.chiffres.bourses[1].annuel)} à ${A.euros(A.chiffres.bourses[8].annuel)} par an, et le repas Crous coûte 1 €. Calcule ton reste à vivre avec le [simulateur de budget](#budget).`,
        `**Money matters**: public BTS and prépas are free, a licence costs €${A.chiffres.droitsLicence} + €${A.chiffres.cvec} CVEC (€0 for scholarship holders). The scholarship ranges from ${A.euros(A.chiffres.bourses[1].annuel)} to ${A.euros(A.chiffres.bourses[8].annuel)} a year, and a Crous canteen meal costs €1. Work out what you have left to live on with the [budget simulator](#budget).`));
      if (t.calendrier) blocs.push(T("**Le calendrier** :\n", "**The calendar**:\n") + A.calendrier.slice(1, 7).map(c => `- ${c.quand}: ${c.titre}`).join("\n") + T("\n\nLes dates exactes sont publiées sur parcoursup.gouv.fr. Tout est sur [le calendrier](#calendrier).", "\n\nThe exact dates are published on parcoursup.gouv.fr. Everything is on [the calendar](#calendrier)."));
    });
    const qMots = " " + q.replace(/[^a-z0-9]+/g, " ") + " ";
    const mot = A.lexique.find(l => l.mot.length > 3 && qMots.includes(" " + A.sansAccents(l.mot).replace(/[^a-z0-9]+/g, " ").trim() + " "));
    if (mot && !blocs.length) blocs.push(`**${mot.mot}**: ${mot.def}`);

    const metiers = A.metiers.map(m => ({ m, s: score(m.nom, mots) * 3 + score(m.accroche + " " + m.competences.join(" "), mots) }))
      .filter(x => x.s > 1 || (x.s > 0 && score(x.m.nom, mots))).sort((a, b) => b.s - a.s).slice(0, 3);
    if (metiers.length) blocs.push(T("**Métiers qui correspondent** :\n", "**Matching careers**:\n") + metiers.map(({ m }) =>
      T(`- [${m.nom}](#metier-${m.id}) : ${m.accroche} Études : ${m.etudes}, dès ${A.euros(m.salaire[0])} brut par mois.`,
        `- [${m.nom}](#metier-${m.id}): ${m.accroche} Studies: ${m.etudes}, from ${A.euros(m.salaire[0])} gross per month.`)).join("\n"));
    // Quand la question porte sur une famille de formations (BTS, prépa…), on n'ajoute que les formations très proches
    const seuil = THEMES.some(t => t.types.length && t.motif.test(q)) ? 3 : 1;
    const forms = A.formations.map(f => ({ f, s: score(f.nom + " " + f.long, mots) * 2 + score(f.desc, mots) }))
      .filter(x => x.s > seuil).sort((a, b) => b.s - a.s).slice(0, 3);
    if (forms.length) blocs.push(T("**Formations à regarder** :\n", "**Programs to look at**:\n") + forms.map(({ f }) =>
      `- [${f.nom}](#formation-${f.id}): ${f.desc}`).join("\n"));

    const ville = await villeDansQuestion(question);
    if (ville) {
      const lignes = ville.split("\n").filter(l => l.startsWith("- ")).slice(0, 6);
      blocs.push(T(`**Près de chez toi (Parcoursup 2025)** :\n${lignes.join("\n")}\n\nToutes les formations sont sur [la carte](#carte).`,
        `**Near you (Parcoursup 2025)**:\n${lignes.join("\n")}\n\nAll the programs are on [the map](#carte).`));
    }
    if (!blocs.length) {
      return T("Je n'ai rien trouvé de précis dans le site pour cette question. Essaie avec un métier (« infirmière », « trader »), une formation (« BTS », « prépa »), une ville (« formations à Lille ») ou un sujet (« bourse », « alternance », « Parcoursup »).\n\nTu peux aussi poser ta question gratuitement à un·e conseiller·ère de l'Onisep sur [Mon orientation en ligne](https://www.monorientationenligne.fr).",
        "I found nothing specific on the site for that question. Try a career (“nurse”, “trader”), a program (“BTS”, “prépa”), a city (“programs in Lille”) or a topic (“scholarship”, “work-study”, “Parcoursup”).\n\nYou can also ask your question for free to an Onisep advisor on [Mon orientation en ligne](https://www.monorientationenligne.fr) (in French).");
    }
    return blocs.join("\n\n");
  }

  /* ——— Rendu Markdown minimal et sûr (texte échappé d'abord) */
  function rendre(md) {
    const blocs = A.e(md).split(/\n{2,}/);
    return blocs.map(b => {
      const lignes = b.split("\n");
      const enLigne = t => t
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\[([^\]]+)\]\((#[a-z0-9-]+)\)/g, '<a href="$2">$1</a>')
        .replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      if (/^#{1,4}\s/.test(b)) return `<p><strong>${enLigne(b.replace(/^#{1,4}\s/, ""))}</strong></p>`;
      // Regroupe les lignes de liste consécutives ; le reste devient des paragraphes
      let html = "", texte = [], liste = [];
      const vider = () => {
        if (texte.length) html += `<p>${texte.map(enLigne).join("<br>")}</p>`;
        if (liste.length) html += `<ul>${liste.map(l => `<li>${enLigne(l)}</li>`).join("")}</ul>`;
        texte = []; liste = [];
      };
      lignes.forEach(l => {
        const puce = l.match(/^\s*(?:[-*•]|\d+\.)\s(.*)$/);
        if (puce) { if (texte.length) vider(); liste.push(puce[1]); }
        else { if (liste.length) vider(); texte.push(l); }
      });
      vider();
      return html;
    }).join("");
  }

  A.pages.assistant = function (el) {
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Pose tes questions</p>
        <h1>L'assistant d'orientation</h1>
        <p class="chapo">Il répond à partir des fiches du site et des données Parcoursup${A.etat.profil ? ", en tenant compte de ton profil" : ""}. C'est une aide pour réfléchir : vérifie toujours sur Parcoursup et parles-en au/à la Psy-EN de ton lycée.</p>
      </section>
      <div class="chat">
        <div class="chat-fil" id="chat-fil" aria-live="polite"></div>
        <div class="puces chat-suggestions" id="chat-suggestions"></div>
        <form class="chat-saisie" id="chat-form">
          <label class="sr" for="chat-texte">Ta question</label>
          <textarea id="chat-texte" rows="2" maxlength="1500" placeholder="Ex. : je suis en STMG, quelles études pour travailler dans la banque ?"></textarea>
          <button type="submit" class="btn btn-signal" id="chat-envoyer">Envoyer</button>
        </form>
        <p class="petit" id="chat-etat"></p>
      </div>`;
    afficherFil();

    detecterMoteur().then(m => {
      if (A.lireHash().page !== "assistant") return;
      const etat = A.$("#chat-etat");
      if (m === "sample") etat.textContent = "Les réponses utilisent ton compte Claude : la première question te demandera ton accord.";
      else if (m === "api") etat.textContent = "";
      else etat.textContent = "Mode guidé : gratuit et sans IA, il cherche la réponse dans les fiches et les données officielles du site.";
    });

    A.$("#chat-form").addEventListener("submit", ev => { ev.preventDefault(); envoyer(); });
    A.$("#chat-texte").addEventListener("keydown", ev => { if (ev.key === "Enter" && !ev.shiftKey) { ev.preventDefault(); envoyer(); } });
    el.onclick = ev => {
      const s = ev.target.closest("[data-suggestion]");
      if (s) { A.$("#chat-texte").value = s.dataset.suggestion; envoyer(); }
      if (ev.target.closest("[data-stop]") && enCours) enCours.abort();
    };
  };

  function afficherFil() {
    const fil = A.$("#chat-fil");
    if (!fil) return;
    fil.innerHTML = conversation.length ? conversation.map(m =>
      `<div class="bulle bulle-${m.role === "user" ? "moi" : "ia"}">${m.role === "user" ? `<p>${A.e(m.content)}</p>` : rendre(m.content)}</div>`).join("")
      : `<div class="bulle bulle-ia"><p>${T(`Salut ! Je connais les ${A.metiers.length} fiches métiers du site, les formations et les données Parcoursup 2025. Pose-moi une question, ou pars d'un exemple ci-dessous.`,
          `Hi! I know the ${A.metiers.length} career profiles on the site, the programs and the Parcoursup 2025 data. Ask me a question, or start from an example below.`)}</p></div>`;
    A.$("#chat-suggestions").innerHTML = conversation.length ? "" : suggestions().map(s => `<button type="button" class="puce" data-suggestion="${A.e(s)}">${A.e(s)}</button>`).join("");
  }

  async function envoyer() {
    const champ = A.$("#chat-texte"), question = champ.value.trim();
    if (!question || enCours) return;
    const m = await detecterMoteur();
    if (!m) return;
    champ.value = "";
    conversation.push({ role: "user", content: question });
    afficherFil();
    const fil = A.$("#chat-fil");
    fil.insertAdjacentHTML("beforeend", `<div class="bulle bulle-ia en-cours"><p class="ecrit">Je réfléchis…</p><button type="button" class="btn-texte" data-stop>Arrêter</button></div>`);
    const bulle = fil.lastElementChild, zone = A.$(".ecrit", bulle);
    bulle.scrollIntoView({ block: "nearest" });
    A.$("#chat-envoyer").disabled = true;
    enCours = new AbortController();
    let texte = "";
    try {
      const contexte = await construireContexte(question);
      const tours = conversation.slice(-8);
      const montrer = t => { texte = t; zone.outerHTML = `<div class="ecrit">${rendre(t)}</div>`; };
      const majBulle = t => { texte = t; const z = A.$(".ecrit", bulle); if (z) z.innerHTML = rendre(t); };
      let premier = true;
      const surTexte = t => { if (premier) { montrer(t); premier = false; } else majBulle(t); };
      if (m === "guide") {
        texte = await reponseGuidee(question);
        surTexte(texte);
      } else if (m === "sample") {
        const entree = [{ role: "user", content: regles() + "\n\nDONNÉES DU SITE :\n" + contexte + "\n\nLa conversation commence au message suivant." }, { role: "assistant", content: "Compris, je réponds à partir de ces données." }, ...tours];
        const r = await A._sample(entree, { cache: false, signal: enCours.signal, onText: ({ text }) => surTexte(text) });
        texte = r.text; surTexte(texte);
      } else {
        const rep = await fetch("api/assistant", {
          method: "POST", headers: { "Content-Type": "application/json" }, signal: enCours.signal,
          body: JSON.stringify({ messages: tours, contexte, lang: A.lang })
        });
        if (!rep.ok || !rep.body) throw { code: rep.status === 429 ? "rate_limited" : "serveur" };
        const lecteur = rep.body.getReader(), dec = new TextDecoder();
        for (;;) {
          const { done, value } = await lecteur.read();
          if (done) break;
          texte += dec.decode(value, { stream: true });
          surTexte(texte);
        }
      }
      conversation.push({ role: "assistant", content: texte });
      A.gagner(10, "assistant", "Première question posée à l'assistant");
      A.activite("assistant", String(conversation.length));
    } catch (e) {
      const code = e && e.code;
      const msg = code === "cancelled" || (e && e.name === "AbortError") ? "Réponse arrêtée."
        : code === "not_granted" ? "Tu n'as pas autorisé l'assistant à utiliser Claude. Recharge la page pour changer d'avis."
        : code === "rate_limited" ? "Beaucoup de questions d'un coup : réessaie dans une minute."
        : "L'assistant n'a pas pu répondre. Réessaie dans un instant.";
      if (e && e.text) texte = e.text;
      if (texte) conversation.push({ role: "assistant", content: texte + "\n\n(" + msg + ")" });
      else conversation.pop();
      A.$("#chat-etat").textContent = msg;
    } finally {
      enCours = null;
      afficherFil();
      const b = A.$("#chat-envoyer"); if (b) b.disabled = false;
      const f = A.$("#chat-fil"); if (f && f.lastElementChild) f.lastElementChild.scrollIntoView({ block: "nearest" });
    }
  }
})();
