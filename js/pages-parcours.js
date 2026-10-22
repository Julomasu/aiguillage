/* « Ta situation » : un parcours à embranchements (revenus, aides, études payantes, prêt, ville…) qui débouche sur un plan personnalisé :
   aides auxquelles tu peux prétendre, façon de financer, où étudier, formations adaptées. Les réponses restent sur l'appareil (A.etat.parcours).
   Les montants et conditions sont des repères : la page renvoie vers les sites officiels. */
(function () {
  const T = (fr, en) => A.lang === "en" ? en : fr;

  /* ——— L'arbre : chaque nœud a des options [id, icône, titre, détail] ; `suite` donne le nœud suivant (fonction des réponses déjà données) */
  const NOEUDS = {
    statut: { q: T("Où en es-tu ?", "Where are you at?"), aide: T("Ça change les aides et les démarches possibles.", "It changes which aid and procedures apply."), options: [
      ["lycee", "🎒", T("Lycéen·ne", "High-school student"), T("Seconde, première ou terminale", "Year 10, 11 or 12")],
      ["etudiant", "🎓", T("Déjà étudiant·e", "Already a student"), T("Je veux me réorienter ou changer de voie", "I want to change course or direction")],
      ["autre", "🔄", T("Hors études", "Not studying"), T("Reprise d'études, année de pause ou reconversion", "Going back to study, gap year or career change")]],
      suite: () => "revenus" },
    revenus: { q: T("Quels sont à peu près les revenus de ta famille ?", "Roughly what is your family's income?"), aide: T("Pas de chiffre exact : ça sert à savoir si une bourse est probable. Le simulateur te donnera le détail.", "No exact figure needed: it just tells us whether a grant is likely. The simulator gives the details."), options: [
      ["faibles", "🌱", T("Modestes", "Modest"), T("Un ou deux salaires proches du Smic, ou moins", "One or two salaries near the minimum wage, or less")],
      ["moyens", "🌤️", T("Moyens", "Middle"), T("Des revenus corrects, avec plusieurs enfants ou charges", "A decent income, with several children or costs")],
      ["aises", "☀️", T("Confortables", "Comfortable"), T("Pas de bourse probable", "A grant is unlikely")],
      ["nsp", "🤷", T("Je ne sais pas", "I don't know"), T("On regardera ensemble", "We'll look at it together")]],
      suite: () => "situation" },
    situation: { q: T("Qu'est-ce qui te concerne ?", "Which of these apply to you?"), aide: T("Plusieurs réponses possibles. Chacune peut ouvrir des aides précises.", "You can pick several. Each can unlock specific aid."), multi: true, options: [
      ["handicap", "♿", T("Un handicap ou un trouble de santé", "A disability or health condition"), T("Aménagements, aides spécifiques", "Adjustments, specific aid")],
      ["salarie", "💼", T("Je travaille à côté", "I work alongside my studies"), T("Emploi, service civique, job étudiant", "Job, civic service, student job")],
      ["ase", "🏠", T("Je suis sans soutien familial", "I have no family support"), T("Aide sociale à l'enfance, foyer, autonomie précoce", "Child welfare services, care home, early independence")],
      ["etranger", "🌍", T("Nationalité hors Union européenne", "Non-EU nationality"), T("Frais, titre de séjour, aides", "Fees, residence permit, aid")],
      ["sportif", "🏅", T("Sportif·ve de haut niveau", "Elite athlete"), T("Statut, aménagements", "Status, adjustments")],
      ["parent", "👶", T("J'ai un enfant à charge", "I have a dependent child"), T("Aides CAF, garde, logement", "Family benefits, childcare, housing")],
      ["aucun", "✅", T("Rien de tout ça", "None of these"), T("Ça va aussi", "That's fine too")]],
      suite: () => "payer" },
    payer: { q: T("Es-tu prêt·e à payer tes études ?", "Are you ready to pay for your studies?"), aide: T("Beaucoup de formations sont gratuites ou presque. Les écoles privées coûtent de 7 000 à 15 000 € par an.", "Many programmes are free or nearly free. Private schools cost €7,000 to €15,000 a year."), options: [
      ["non", "🆓", T("Non, je vise le gratuit", "No, I'm aiming for free"), T("BTS, BUT, licence, prépa publique, école publique", "BTS, BUT, bachelor's, public prep class, public school")],
      ["peu", "💶", T("Un peu", "A little"), T("Jusqu'à ~3 000 € par an (écoles publiques, certaines privées)", "Up to about €3,000 a year (public schools, some private)")],
      ["oui", "🎯", T("Oui, si la formation vaut le coup", "Yes, if the programme is worth it"), T("École privée, 7 000 à 15 000 € par an", "Private school, €7,000 to €15,000 a year")],
      ["nsp", "🤷", T("Je ne sais pas", "I don't know"), T("Je veux d'abord voir les possibilités", "I want to see the options first")]],
      suite: r => (r.payer === "oui" || r.payer === "peu") ? "financer" : "rester" },
    financer: { q: T("Comment comptes-tu payer ?", "How do you plan to pay?"), aide: T("Il y a presque toujours une solution, mais certaines coûtent plus cher que d'autres à long terme.", "There is almost always a way, but some cost more than others in the long run."), options: [
      ["famille", "👪", T("Ma famille paie", "My family pays"), T("Ou prend en charge une partie", "Or covers part of it")],
      ["alternance", "🏭", T("L'alternance", "Work-study"), T("L'entreprise paie l'école et je touche un salaire", "The company pays the school and I earn a salary")],
      ["pret", "🏦", T("Un prêt bancaire", "A bank loan"), T("Je rembourse après mes études", "I repay after my studies")],
      ["bourses", "🎁", T("Bourses et aides de l'école", "School grants and aid"), T("Réductions, bourses d'excellence ou sociales", "Discounts, merit or need-based grants")],
      ["nsp", "🤷", T("Pas encore décidé", "Not decided yet"), T("Montre-moi les options", "Show me the options")]],
      suite: r => r.financer === "pret" ? "pret" : "rester" },
    pret: { q: T("Pour un prêt, qui se porte caution ?", "For a loan, who acts as guarantor?"), aide: T("C'est la question qui décide du type de prêt à demander.", "This decides which type of loan to look for."), options: [
      ["parents", "👪", T("Un parent ou proche se porte caution", "A parent or relative guarantees it"), T("Prêt étudiant classique", "Standard student loan")],
      ["aucune", "🛡️", T("Personne : je veux un prêt sans caution", "Nobody: I want a loan with no guarantor"), T("Prêt garanti par l'État", "State-guaranteed loan")],
      ["nsp", "🤷", T("Je ne sais pas", "I don't know"), T("On compare les deux", "We compare the two")]],
      suite: () => "rester" },
    rester: { q: T("Veux-tu rester dans ta ville ou ta région ?", "Do you want to stay in your town or region?"), aide: T("Étudier près de chez toi évite le loyer : c'est souvent 400 à 800 € d'économisés par mois.", "Studying near home saves rent: often €400 to €800 a month."), options: [
      ["oui", "🏡", T("Oui, rester près de chez moi", "Yes, stay close to home"), T("Je regarde ce qui existe sur place", "I look at what exists locally")],
      ["non", "🧳", T("Non, je suis prêt·e à partir", "No, I'm ready to leave"), T("Une autre ville, voire un autre pays", "Another city, even another country")],
      ["nsp", "🤷", T("Ça dépend de la formation", "It depends on the programme"), T("Je veux voir les deux", "I want to see both")]],
      suite: r => r.rester === "oui" ? "local" : "ailleurs" },
    local: { q: T("Si tu restes, où dormiras-tu ?", "If you stay, where will you live?"), aide: "", options: [
      ["parents", "🏠", T("Chez mes parents", "At my parents'"), T("Pas de loyer, un peu de transport", "No rent, some travel")],
      ["logement", "🛏️", T("Dans mon propre logement", "In my own place"), T("Même ville, mais je prends mon indépendance", "Same city, but I move out")]],
      suite: () => "rythme" },
    ailleurs: { q: T("Plutôt où ?", "Where to?"), aide: T("Le loyer varie du simple au double selon la ville.", "Rent can double from one city to another."), options: [
      ["paris", "🗼", T("Paris / Île-de-France", "Paris / Île-de-France"), T("Plus d'offres, mais le logement le plus cher", "More choice, but the most expensive housing")],
      ["grande", "🏙️", T("Une grande ville", "A large city"), T("Lyon, Lille, Toulouse, Bordeaux, Nantes, Rennes…", "Lyon, Lille, Toulouse, Bordeaux, Nantes, Rennes…")],
      ["moyenne", "🏘️", T("Une ville moyenne", "A mid-sized city"), T("Loyers plus doux, formations moins nombreuses", "Lower rents, fewer programmes")],
      ["etranger", "✈️", T("À l'étranger", "Abroad"), T("Erasmus, master, études complètes", "Erasmus, master's, a full degree")],
      ["partout", "🧭", T("Peu importe", "Doesn't matter"), T("Je choisis d'abord la formation", "I pick the programme first")]],
      suite: r => r.ailleurs === "paris" ? "paris" : "rythme" },
    paris: { q: T("Paris coûte cher. Quel plan pour te loger ?", "Paris is expensive. What is your housing plan?"), aide: T("Un studio privé dépasse souvent 800 € par mois. Les solutions existent, mais elles se préparent tôt.", "A private studio often costs over €800 a month. Solutions exist, but they need early planning."), options: [
      ["crous", "🏛️", T("Une résidence Crous ou une cité U", "A Crous residence or university hall"), T("Demande dès janvier ; priorité aux boursier·ères", "Apply from January; grant holders get priority")],
      ["alternance", "💼", T("L'alternance", "Work-study"), T("Le salaire paie le loyer", "The salary pays the rent")],
      ["coloc", "👥", T("Une colocation ou une résidence privée", "A flat share or private residence"), T("Plus cher mais plus facile à trouver", "Pricier but easier to find")],
      ["rer", "🚆", T("Rester chez mes parents et prendre le RER", "Stay with my parents and take the RER"), T("Zéro loyer, du transport", "No rent, a longer commute")]],
      suite: () => "rythme" },
    rythme: { q: T("Quelle durée d'études te convient ?", "How long do you want to study?"), aide: "", options: [
      ["court", "⚡", T("Courte (2 à 3 ans)", "Short (2 to 3 years)"), T("Bosser vite", "Start working quickly")],
      ["moyen", "🎯", T("3 à 5 ans", "3 to 5 years"), T("Le cas le plus courant", "The most common case")],
      ["long", "🔭", T("5 ans et plus", "5 years or more"), T("Ingénieur·e, santé, droit, recherche…", "Engineering, health, law, research…")],
      ["nsp", "🤷", T("Je ne sais pas", "I don't know"), T("On verra", "We'll see")]],
      suite: () => "domaine" },
    domaine: { q: T("Sais-tu déjà dans quel domaine tu veux aller ?", "Do you already know which field you want?"), aide: T("Si tu hésites, le test des métiers est fait pour ça.", "If you're unsure, the careers test is made for that."), options: [] /* rempli par les lignes + « pas encore » */,
      suite: () => null }
  };

  const ORDRE_CLE = ["statut", "revenus", "situation", "payer", "financer", "pret", "rester", "local", "ailleurs", "paris", "rythme", "domaine"];

  const rep = () => A.etat.parcours || (A.etat.parcours = {});
  let noeud = null;           // nœud affiché

  function options(id) {
    if (id === "domaine") return A.lignes.map(l => [l.id, "", l.nom, ""]).concat([["aucun", "🧭", T("Pas encore", "Not yet"), T("Je lance le test des métiers", "I'll take the careers test")]]);
    return NOEUDS[id].options;
  }

  function nomRep(id, v) {
    if (id === "domaine") return v === "aucun" ? T("Pas encore de domaine", "No field yet") : (A.ligneParId[v] || {}).nom;
    const o = options(id).find(x => x[0] === v);
    return o ? o[2] : null;
  }

  /* chemin déjà parcouru, dans l'ordre : les nœuds répondus jusqu'au nœud courant */
  function chemin(r) {
    const ids = [];
    let id = "statut";
    for (let n = 0; id && n < 20 && r[id] !== undefined; n++) { ids.push(id); id = NOEUDS[id].suite(r); }
    return ids;
  }

  function prochain(r) {
    let id = "statut";
    for (let n = 0; id && n < 20; n++) { if (r[id] === undefined) return id; id = NOEUDS[id].suite(r); }
    return null; // tout est répondu
  }

  /* ——— Écran question */
  function ecranQuestion(el, id) {
    const r = rep(), n = NOEUDS[id], ch = chemin(r);
    const total = 8, ici = Math.min(ch.length + 1, total);
    const opts = options(id);
    const courant = r[id];
    const choisi = v => n.multi ? (Array.isArray(courant) && courant.includes(v)) : courant === v;
    el.innerHTML = `
      <section class="parcours">
        <p class="surtitre">${T("Ta situation · question " + ici, "Your situation · question " + ici)}</p>
        <div class="tl-fil" aria-hidden="true"><span style="--p:${Math.min(1, ch.length / total)}"></span></div>
        <h1>${A.e(n.q)}</h1>
        ${n.aide ? `<p class="chapo">${A.e(n.aide)}</p>` : ""}
        <div class="choix-parcours${id === "domaine" ? " choix-dense" : ""}" role="${n.multi ? "group" : "radiogroup"}" aria-label="${A.e(n.q)}">
          ${opts.map(([v, ico, nom, desc]) => {
            const l = id === "domaine" ? A.ligneParId[v] : null;
            return `<button type="button" class="choix-p" data-val="${v}" aria-pressed="${choisi(v)}"${l ? ` style="--c:${l.couleur}"` : ""}>
              <span class="cp-ico" aria-hidden="true">${l ? `<i></i>` : ico}</span>
              <span class="cp-txt"><strong>${A.e(nom)}</strong>${desc ? `<span>${A.e(desc)}</span>` : ""}</span>
            </button>`;
          }).join("")}
        </div>
        <div class="actions">
          ${ch.length ? `<button type="button" class="btn-texte" data-retour>${T("← Question précédente", "← Previous question")}</button>` : `<a class="btn-texte" href="#test">${T("← Retour", "← Back")}</a>`}
          ${n.multi ? `<button type="button" class="btn btn-signal" data-ok ${Array.isArray(courant) && courant.length ? "" : "disabled"}>${T("Continuer", "Continue")}</button>` : ""}
        </div>
      </section>`;
    el.onclick = ev => {
      const b = ev.target.closest("button, a");
      if (!b || b.disabled) return;
      if ("retour" in b.dataset) { const last = chemin(r).filter(k => k !== id).pop(); if (last) { delete r[id]; noeud = last; } dessiner(el); return; }
      if ("ok" in b.dataset) { avancer(el); return; }
      const v = b.dataset.val;
      if (v === undefined) return;
      if (n.multi) {
        let cur = Array.isArray(r[id]) ? r[id].slice() : [];
        if (v === "aucun") cur = cur.includes("aucun") ? [] : ["aucun"];
        else { cur = cur.filter(x => x !== "aucun"); cur = cur.includes(v) ? cur.filter(x => x !== v) : cur.concat(v); }
        r[id] = cur; A.sauver(); ecranQuestion(el, id); return;
      }
      r[id] = v;
      nettoyer(r);
      A.sauver();
      avancer(el);
    };
  }

  /* efface les réponses devenues hors-chemin quand on change une réponse */
  function nettoyer(r) {
    const ok = new Set(); let id = "statut";
    for (let n = 0; id && n < 20; n++) { ok.add(id); if (r[id] === undefined) break; id = NOEUDS[id].suite(r); }
    ORDRE_CLE.forEach(k => { if (!ok.has(k)) delete r[k]; });
  }

  function avancer(el) {
    const r = rep();
    noeud = prochain(r);
    if (!noeud) A.gagner(40, "parcours", T("Ton parcours est tracé", "Your path is mapped out"));
    dessiner(el);
    const h = A.$("h1", el); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }

  /* ——— Aides : [titre, montant, texte, lien] calculées à partir des réponses */
  function aides(r) {
    const L = [], f = Array.isArray(r.situation) ? r.situation : [];
    const alt = r.financer === "alternance";
    const MES = "https://www.messervices.etudiant.gouv.fr";
    const bourse = T("Bourse sur critères sociaux (Crous)", "Need-based grant (Crous)");
    if (r.revenus === "faibles") L.push([bourse, T("Très probable", "Very likely"), T("Elle t'exonère des frais d'inscription et de la CVEC, et se verse sur 10 mois. Le dossier social se fait sur Messervices.etudiant.gouv.fr, dès le 15 janvier (DSE).", "It exempts you from tuition fees and the CVEC levy, and is paid over 10 months. Apply for the social file (DSE) on Messervices.etudiant.gouv.fr from 15 January."), MES]);
    else if (r.revenus === "moyens") L.push([bourse, T("Possible", "Possible"), T("Les échelons montent jusqu'à des revenus assez élevés si la famille est nombreuse. Fais le dossier : c'est gratuit et ça ne coûte rien d'essayer.", "The grant tiers reach fairly high incomes if the family is large. Apply: it is free, and trying costs nothing."), MES]);
    else if (r.revenus === "nsp") L.push([bourse, T("À tester", "Worth testing"), T("Simule ton droit sur Messervices.etudiant.gouv.fr avant de te décourager : le calcul prend 5 minutes.", "Check your eligibility on Messervices.etudiant.gouv.fr before giving up: it takes 5 minutes."), MES]);
    if (r.revenus !== "aises") L.push([T("Aide d'urgence du Crous", "Crous emergency aid"), T("En cas de coup dur", "In case of hardship"), T("Une aide ponctuelle ou annuelle si tu fais face à un problème financier. Parle à l'assistant·e social·e du Crous.", "One-off or yearly help if you face a financial problem. Talk to the Crous social worker."), "https://www.etudiant.gouv.fr/fr/les-aides-d-urgence-du-crous-1304"]);
    L.push([T("Repas Crous à 1 €", "Crous meals at €1"), T("Pour tout le monde", "For everyone"), T("Un repas par service dans les restaurants universitaires.", "One meal per service in university restaurants."), "https://www.etudiant.gouv.fr/fr/comment-beneficier-du-repas-crous-a-1-euro-3017"]);
    if (r.statut === "lycee" && r.revenus !== "aises" && (r.rester === "non" || r.rester === "nsp")) L.push([T("Aide à la mobilité Parcoursup", "Parcoursup mobility aid"), T("500 €", "€500"), T("Pour les lycéen·nes boursier·ères qui acceptent une formation hors de leur académie.", "For grant-holding pupils who accept a programme outside their school district (académie)."), "https://www.parcoursup.gouv.fr"]);
    if (r.rester !== "oui" || r.local === "logement") {
      L.push([T("APL (CAF)", "APL housing benefit (CAF)"), T("Selon loyer et revenus", "Depends on rent and income"), T("Aide au logement, même en résidence Crous ou colocation. À demander dès que tu as ton bail.", "Housing benefit, even in a Crous residence or flat share. Apply as soon as you have your lease."), "https://www.caf.fr"]);
      L.push([T("Garantie Visale", "Visale guarantee"), T("Gratuite", "Free"), T("Action Logement se porte garant à ta place si tes parents ne peuvent pas.", "Action Logement acts as your guarantor if your parents cannot."), "https://www.visale.fr"]);
      L.push([T("Logement Crous", "Crous housing"), T("Loyers modérés", "Moderate rents"), T("Demande dès le DSE : les boursier·ères sont prioritaires.", "Apply with your DSE: grant holders get priority."), "https://trouverunlogement.lescrous.fr"]);
    }
    if (alt) L.push([T("Apprentissage", "Apprenticeship"), T("Salaire + études gratuites", "Salary + free tuition"), T("Ta formation est financée par l'entreprise et tu touches un salaire. Seule la CVEC (105 €) reste due : ton employeur peut te la rembourser.", "Your programme is paid by the company and you earn a salary. Only the CVEC levy (€105) remains due: your employer may reimburse it."), "https://www.alternance.emploi.gouv.fr"]);
    if (f.includes("handicap")) L.push([T("Aides liées au handicap", "Disability-related aid"), T("À demander tôt", "Apply early"), T("Référent handicap de ton établissement, aménagements d'examens, accompagnement. Une AAH est possible sur dossier MDPH, parfois cumulable avec la bourse.", "Your school's disability officer, exam adjustments, support. An adult disability allowance (AAH) is possible through an MDPH file, sometimes alongside the grant."), "https://www.service-public.fr/particuliers/vosdroits/N12230"]);
    if (f.includes("salarie")) L.push([T("Statut d'étudiant·e salarié·e", "Working-student status"), T("Selon l'établissement", "Depends on the school"), T("Dispense d'assiduité, examens aménagés. Demande-le au secrétariat dès la rentrée.", "Attendance exemptions, adapted exams. Ask the administration office at the start of the year."), "https://www.etudiant.gouv.fr"]);
    if (f.includes("ase")) L.push([T("Soutien sans famille", "Support without family"), T("Priorité possible", "Possible priority"), T("Un contrat jeune majeur de l'aide sociale à l'enfance et la priorité bourse/logement existent selon ta situation. Ton éducateur·rice ou le Crous t'aident à monter le dossier.", "A young-adult contract from child welfare services and priority for grants and housing may apply. Your caseworker or the Crous can help with the file."), "https://www.etudiant.gouv.fr/fr/les-aides-d-urgence-du-crous-1304"]);
    if (f.includes("etranger")) L.push([T("Étudiant·e hors Union européenne", "Non-EU student"), T("Frais différenciés", "Higher fees"), T("Les droits d'inscription sont plus élevés dans le public pour les non-européen·nes (sauf exceptions). Renseigne-toi sur les exonérations des universités et sur Campus France.", "Public tuition is higher for non-EU students (with exceptions). Ask about university fee waivers and Campus France."), "https://www.campusfrance.org"]);
    if (f.includes("sportif")) L.push([T("Statut de sportif·ve de haut niveau", "Elite athlete status"), T("Aménagements", "Adjustments"), T("Emploi du temps adapté, tutorat, accueil dans des établissements partenaires. Ton club ou fédération te renseigne.", "Adapted timetable, tutoring, partner schools. Your club or federation can tell you more."), "https://www.sports.gouv.fr"]);
    if (f.includes("parent")) L.push([T("Aides CAF et Crous pour étudiant·es parents", "CAF and Crous aid for student parents"), T("À cumuler", "Can be combined"), T("Allocations familiales, mode de garde, aide du Crous. Parle à l'assistant·e social·e du Crous pour tout regrouper.", "Family allowances, childcare, Crous aid. Talk to the Crous social worker to put it all together."), "https://www.caf.fr"]);
    return L;
  }

  function mensualite(capital, annees, tauxAn) {
    const n = Math.max(1, Math.round(annees * 12)), t = tauxAn / 100 / 12;
    return t === 0 ? capital / n : capital * t / (1 - Math.pow(1 + t, -n));
  }

  function blocFinancement(r) {
    if (r.payer === "non" || !r.payer) return `<p>${T(`Tu vises le gratuit : c'est le plus malin si tu ne sais pas encore où tu vas. <strong>Un BTS, un BUT, une licence ou une prépa publique</strong> coûtent presque rien (0 à environ 300 € par an, 0 € si tu es boursier·ère), et les masters publics donnent d'excellents diplômes.`, `You are aiming for free: the smartest move if you don't yet know where you're going. <strong>A BTS, BUT, bachelor's or public prep class</strong> costs almost nothing (€0 to about €300 a year, €0 with a grant), and public master's degrees are excellent.`)}</p>`;
    let h = "";
    if (r.payer === "nsp") h += `<p>${T(`Tu hésites : compare d'abord avec le <a href="#budget">simulateur de budget</a>. Une école privée coûte 7 000 à 15 000 € par an, soit <strong>25 000 à 75 000 €</strong> sur un cursus complet.`, `You're unsure: compare first with the <a href="#budget">budget simulator</a>. A private school costs €7,000 to €15,000 a year, i.e. <strong>€25,000 to €75,000</strong> over a full programme.`)}</p>`;
    const f = r.financer;
    if (f === "famille") h += `<p>${T(`<strong>Ta famille finance.</strong> Pense à vérifier ce que vaut le diplôme : <em>visé par l'État</em>, <em>grade de master</em>, accréditation CTI pour les ingénieurs, inscription au RNCP. Le prix ne garantit pas la reconnaissance.`, `<strong>Your family pays.</strong> Check what the degree is worth: <em>state-recognised (visé)</em>, <em>master's grade</em>, CTI accreditation for engineers, RNCP registration. A high price does not guarantee recognition.`)}</p>`;
    if (f === "alternance") h += `<p>${T(`<strong>L'alternance.</strong> L'école est gratuite pour toi et tu es payé·e. Il faut trouver l'entreprise : commence tes candidatures dès l'automne, en parallèle de Parcoursup. Les écoles ont souvent un service carrière qui t'aide.`, `<strong>Work-study.</strong> The school is free for you and you are paid. You need to find the company: start applying in the autumn, alongside Parcoursup. Schools often have a careers service to help.`)}</p>`;
    if (f === "bourses") h += `<p>${T(`<strong>Bourses et aides des écoles.</strong> Demande avant de t'inscrire : remise pour boursier·ères du Crous, bourses au mérite, fonds des fondations de l'école, étalement des frais. Beaucoup d'écoles en proposent sans le dire.`, `<strong>School grants and aid.</strong> Ask before enrolling: discounts for Crous grant holders, merit scholarships, school foundation funds, payment in instalments. Many schools offer them without advertising.`)}</p>`;
    if (f === "nsp") h += `<p>${T(`Plusieurs pistes se cumulent : <strong>alternance</strong> (école gratuite + salaire), <strong>bourses d'école</strong>, <strong>prêt</strong> pour le reste. Regarde les trois avant de choisir.`, `Several options can be combined: <strong>work-study</strong> (free school + salary), <strong>school grants</strong>, a <strong>loan</strong> for the rest. Look at all three before choosing.`)}</p>`;
    if (f === "pret" || f === "nsp") {
      const c = r.pret;
      h += `<div class="pret-bloc"><h3>${T("Le prêt bancaire, concrètement", "Bank loans, in practice")}</h3>`;
      if (c === "parents" || c === "nsp") h += `<p>${T(`<strong>Avec caution.</strong> Le prêt étudiant classique se négocie en banque : la caution d'un parent ou proche et une assurance sont demandées. Fais jouer la concurrence entre au moins 3 banques (la tienne, celle de tes parents, une banque en ligne) : les taux et les frais varient beaucoup.`, `<strong>With a guarantor.</strong> A standard student loan is negotiated with a bank: a parent or relative as guarantor and insurance are required. Compare at least 3 banks (yours, your parents', an online bank): rates and fees vary a lot.`)}</p>`;
      if (c === "aucune" || c === "nsp") h += `<p>${T(`<strong>Sans caution.</strong> Un prêt étudiant garanti par l'État existe, ouvert aux 18-28 ans sans condition de ressources ni caution personnelle, jusqu'à 20 000 € (à vérifier sur service-public.fr). Certaines banques acceptent un <em>différé</em> : tu ne rembourses qu'à la fin des études.`, `<strong>No guarantor.</strong> A state-guaranteed student loan exists for 18 to 28-year-olds, with no income test and no personal guarantor, up to €20,000 (check on service-public.fr). Some banks offer a <em>deferral</em>: you only start repaying when your studies end.`)}</p>`;
      h += `<ul><li>${T("Compare le <strong>TAEG</strong> (taux tout compris) et pas seulement le taux.", "Compare the <strong>APR (TAEG)</strong>, not just the interest rate.")}</li><li>${T("Choisis un <strong>différé</strong> si tu veux commencer à rembourser quand tu travailles, sachant que les intérêts courent.", "Choose a <strong>deferral</strong> if you want to start repaying once you work, knowing that interest keeps running.")}</li><li>${T("Garde la mensualité sous <strong>10 à 15 %</strong> de ton premier salaire.", "Keep the monthly payment under <strong>10 to 15%</strong> of your first salary.")}</li></ul>
        <div class="pret-simu" id="pret-simu">
          <label class="champ"><span>${T("Montant emprunté", "Amount borrowed")}</span><input type="number" id="pret-m" min="1000" max="100000" step="500" value="15000"></label>
          <label class="champ"><span>${T("Durée de remboursement (ans)", "Repayment period (years)")}</span><input type="number" id="pret-d" min="1" max="12" step="1" value="7"></label>
          <label class="champ"><span>${T("Taux annuel indicatif (%)", "Indicative yearly rate (%)")}</span><input type="number" id="pret-t" min="0" max="10" step="0.1" value="3"></label>
          <p class="pret-res" id="pret-res" aria-live="polite"></p>
        </div>
        <p class="petit">${T("Simulation indicative. Le vrai taux dépend de ta banque et de la date. Compare plusieurs offres.", "Indicative simulation. The real rate depends on your bank and the date. Compare several offers.")}</p></div>`;
    }
    return h;
  }

  function blocLieu(r) {
    const o = [], p = r.paris;
    if (r.rester === "oui" && r.local === "parents") o.push(T(`<p><strong>Tu restes chez tes parents.</strong> Pas de loyer : c'est ton plus gros atout financier. Regarde la <a href="#carte">carte des formations</a> autour de chez toi (rayon de 30 à 50 km) et vérifie les transports.</p>`, `<p><strong>You stay at your parents'.</strong> No rent: your biggest financial advantage. Look at the <a href="#carte">programme map</a> around home (30 to 50 km) and check transport.</p>`));
    if (r.rester === "oui" && r.local === "logement") o.push(T(`<p><strong>Ta ville, mais ton logement.</strong> Tu as droit à l'APL et à la garantie Visale. Compte le loyer de ta ville dans le <a href="#budget">simulateur</a>.</p>`, `<p><strong>Your city, your own place.</strong> You can claim APL housing benefit and the Visale guarantee. Include your city's rent in the <a href="#budget">simulator</a>.</p>`));
    if (r.rester === "nsp") o.push(T(`<p>Tu hésites entre rester et partir : lance la <a href="#carte">carte</a> pour voir ce qui existe près de chez toi, puis compare avec une autre ville dans le <a href="#budget">simulateur de budget</a>.</p>`, `<p>You're torn between staying and leaving: open the <a href="#carte">map</a> to see what exists near home, then compare with another city in the <a href="#budget">budget simulator</a>.</p>`));
    if (r.ailleurs === "paris") {
      o.push(T(`<p><strong>Paris.</strong> Beaucoup de formations et d'entreprises, mais un loyer souvent supérieur à 800 € pour un studio privé.</p>`, `<p><strong>Paris.</strong> Lots of programmes and companies, but a private studio often costs over €800 a month.</p>`));
      if (p === "crous") o.push(T(`<p>Demande une résidence Crous ou une cité universitaire <strong>dès le 15 janvier</strong>, et dépose plusieurs vœux ; en parallèle, prépare une solution privée.</p>`, `<p>Apply for a Crous residence or university hall <strong>from 15 January</strong>, with several choices; meanwhile, prepare a private option.</p>`));
      if (p === "alternance") o.push(T(`<p>L'alternance est la voie la plus solide à Paris : l'entreprise t'aide parfois à te loger (Action Logement), et le salaire couvre le loyer.</p>`, `<p>Work-study is the most solid route in Paris: the employer sometimes helps with housing (Action Logement), and the salary covers rent.</p>`));
      if (p === "coloc") o.push(T(`<p>Regarde les résidences étudiantes privées et les colocations ; cherche tôt (mai-juillet) et active la garantie Visale.</p>`, `<p>Look at private student residences and flat shares; start early (May to July) and activate the Visale guarantee.</p>`));
      if (p === "rer") o.push(T(`<p>Rester en Île-de-France chez tes parents réduit fortement le budget. Compte l'abonnement de transport (tarif jeune) et les trajets longs.</p>`, `<p>Staying with your parents in Île-de-France cuts the budget sharply. Count the transport pass (youth fare) and long commutes.</p>`));
    }
    if (r.ailleurs === "grande") o.push(T(`<p><strong>Une grande ville.</strong> Très bonne offre de formations avec des loyers plus bas qu'à Paris. Compare dans le <a href="#budget">simulateur</a>.</p>`, `<p><strong>A large city.</strong> A very good choice of programmes with lower rents than Paris. Compare in the <a href="#budget">simulator</a>.</p>`));
    if (r.ailleurs === "moyenne") o.push(T(`<p><strong>Une ville moyenne.</strong> Loyers doux et petites classes (IUT, BTS), mais moins de choix de formations. Regarde la <a href="#carte">carte</a>.</p>`, `<p><strong>A mid-sized city.</strong> Gentle rents and small classes (IUT, BTS), but fewer programmes. Look at the <a href="#carte">map</a>.</p>`));
    if (r.ailleurs === "etranger") o.push(T(`<p><strong>À l'étranger.</strong> Erasmus+ pour un semestre ou une année, ou un cursus complet. Regarde les tests de langue (<a href="#epreuve-toefl-ielts">TOEFL / IELTS</a>), les <a href="#passerelles">passerelles</a> et le site Campus France.</p>`, `<p><strong>Abroad.</strong> Erasmus+ for a semester or a year, or a full degree. See the language tests (<a href="#epreuve-toefl-ielts">TOEFL / IELTS</a>), the <a href="#passerelles">pathways</a> and the Campus France site.</p>`));
    if (r.ailleurs === "partout") o.push(T(`<p>Tu choisis d'abord la formation : explore l'<a href="#ecoles">annuaire des écoles</a> et la <a href="#carte">carte</a>, puis calcule ton budget par ville.</p>`, `<p>You pick the programme first: explore the <a href="#ecoles">schools directory</a> and the <a href="#carte">map</a>, then work out your budget by city.</p>`));
    return o.join("");
  }

  function formationsAdaptees(r) {
    const choix = A.types.filter(t => {
      if (r.payer === "non" && t.coutNiv > 1) return false;
      if (r.rythme === "court" && !/2|3/.test(t.duree)) return false;
      if (r.rythme === "long" && t.id === "bts") return false;
      if (t.id === "pass-las" && r.domaine && r.domaine !== "sante") return false;
      return true;
    });
    return (choix.length ? choix : A.types).slice(0, 5);
  }

  /* ——— Bilan */
  function bilan(el) {
    const r = rep();
    const dom = r.domaine && r.domaine !== "aucun" ? A.ligneParId[r.domaine] : null;
    const metiersDom = dom ? A.metiers.filter(m => m.ligne === dom.id).slice(0, 4) : [];
    const resume = chemin(r).filter(k => k !== "situation").map(k => nomRep(k, r[k])).filter(Boolean);
    const flags = (Array.isArray(r.situation) ? r.situation : []).filter(x => x !== "aucun").map(x => nomRep("situation", x));
    const L = aides(r);
    const types = formationsAdaptees(r);
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">${T("Ton plan", "Your plan")}</p>
        <h1>${T("Voici ce que ta situation ouvre", "Here is what your situation opens up")}</h1>
        <p class="chapo">${T("Aides auxquelles tu peux prétendre, façon de financer, lieu d'études et formations qui collent. Tout reste sur ton appareil.", "Aid you can claim, how to fund your studies, where to study and matching programmes. Everything stays on your device.")}</p>
        <div class="puces">${resume.concat(flags).map(x => `<span class="puce puce-statique">${A.e(x)}</span>`).join("")}</div>
        <p class="petit"><button type="button" class="btn-texte" data-modifier>${T("Modifier mes réponses", "Edit my answers")}</button> · <button type="button" class="btn-texte" data-effacer>${T("Tout effacer", "Clear everything")}</button></p>
      </section>

      <section class="bloc">
        <h2><span aria-hidden="true">💶</span> ${T("Tes aides", "Your aid")}</h2>
        <div class="aides-liste">${L.map(([t, m, tx, u]) => `<article class="aide-ligne"><div><h3>${A.e(t)}</h3><p>${A.e(tx)}</p></div><div class="aide-cote"><strong>${A.e(m)}</strong><a href="${A.e(u)}" target="_blank" rel="noopener">${T("Site officiel", "Official site")}</a></div></article>`).join("")}</div>
        <p class="petit">${T(`Conditions et montants évoluent chaque année : confirme sur les sites officiels. Pour le détail : <a href="#aides">Budget & aides</a>.`, `Conditions and amounts change every year: confirm on the official sites. For details: <a href="#aides">Budget & aid</a>.`)}</p>
      </section>

      <section class="bloc">
        <h2><span aria-hidden="true">🏦</span> ${T("Comment financer", "How to fund it")}</h2>
        ${blocFinancement(r)}
      </section>

      <section class="bloc">
        <h2><span aria-hidden="true">📍</span> ${T("Où étudier", "Where to study")}</h2>
        ${blocLieu(r) || T(`<p>Tu n'as pas encore choisi de lieu. Regarde la <a href="#carte">carte</a> pour voir ce qui existe près de toi.</p>`, `<p>You haven't chosen a place yet. Open the <a href="#carte">map</a> to see what exists near you.</p>`)}
        <p><a class="btn btn-ligne" href="#budget">${T("Calculer mon budget par ville", "Work out my budget by city")}</a></p>
      </section>

      <section class="bloc">
        <h2><span aria-hidden="true">🎓</span> ${T("Formations qui collent à ta situation", "Programmes that fit your situation")}</h2>
        <div class="liste-formations">${types.map(t => `<a class="ligne-formation" href="#type-${t.id}"><strong>${A.e(t.nom)}</strong><span>${A.e(t.duree)} · ${A.e(t.cout)}</span></a>`).join("")}</div>
        <p class="petit">${T(`Filtrées selon ton budget et ta durée d'études. Compare-les dans <a href="#formations">le comparateur</a>.`, `Filtered by your budget and study length. Compare them in <a href="#formations">the comparison tool</a>.`)}</p>
      </section>

      <section class="bloc">
        <h2><span aria-hidden="true">🧭</span> ${T("Et côté métier ?", "And what about the career?")}</h2>
        ${dom ? `<p>${T("Tu vises le domaine", "You are aiming for the field")} <strong>${A.e(dom.nom)}</strong>. ${T("Quelques métiers pour t'inspirer :", "A few careers for inspiration:")}</p><div class="grille-metiers">${metiersDom.map(m => A.carteMetier(m, A.compatibilite(m, A.etat.profil))).join("")}</div><p><a href="#metiers">${T("Voir tous les métiers", "See all careers")}</a></p>`
        : `<p>${T("Tu ne sais pas encore quel métier te correspond ? Le test te propose des métiers à partir de ce que tu aimes faire.", "Not sure which career suits you yet? The test suggests careers based on what you enjoy doing.")}</p><p><a class="btn btn-signal" href="#test">${T("Lancer le test des métiers", "Start the careers test")}</a></p>`}
      </section>

      <section class="bloc">
        <h2><span aria-hidden="true">🌳</span> ${T("Tout l'arbre des possibilités", "The full tree of possibilities")}</h2>
        <p class="petit">${T("Voici toutes les questions et réponses possibles. Ton chemin est en gras.", "Here are all the possible questions and answers. Your path is in bold.")}</p>
        ${arbre(r)}
      </section>`;

    el.onclick = ev => {
      const b = ev.target.closest("button");
      if (!b) return;
      if ("modifier" in b.dataset) { noeud = "statut"; dessiner(el); return; }
      if ("effacer" in b.dataset) { A.etat.parcours = {}; A.sauver(); noeud = "statut"; dessiner(el); }
    };
    brancherPret(el);
  }

  /* arbre complet : chaque question une seule fois, ses réponses, et la question qui suit quand ça change selon la réponse */
  function arbre(r) {
    const blocs = ORDRE_CLE.map(id => {
      const n = NOEUDS[id];
      const base = n.suite(Object.assign({}, r, { [id]: n.multi ? ["aucun"] : options(id)[0][0] }));
      const lis = options(id).map(([v, ico, nom]) => {
        const choisi = n.multi ? (Array.isArray(r[id]) && r[id].includes(v)) : r[id] === v;
        const suite = n.suite(Object.assign({}, r, { [id]: n.multi ? [v] : v }));
        const diff = suite && suite !== base && !n.multi ? `<span class="arbre-fleche"> → ${A.e(NOEUDS[suite].q)}</span>` : "";
        return `<li class="${choisi ? "chemin" : ""}">${ico ? A.e(ico) + " " : ""}${choisi ? "<b>" + A.e(nom) + "</b>" : A.e(nom)}${diff}</li>`;
      }).join("");
      const fin = `<p class="petit arbre-suite">${base ? T("Ensuite : ", "Next: ") + A.e(NOEUDS[base].q) : T("Ensuite : ton plan.", "Next: your plan.")}</p>`;
      return `<div class="arbre-noeud"><p class="arbre-q">${A.e(n.q)}</p><ul>${lis}</ul>${fin}</div>`;
    }).join("");
    return `<div class="arbre"><details><summary>${T("Afficher l'arbre complet", "Show the full tree")}</summary>${blocs}</details></div>`;
  }

  function brancherPret(el) {
    const m = A.$("#pret-m", el); if (!m) return;
    const d = A.$("#pret-d", el), t = A.$("#pret-t", el), out = A.$("#pret-res", el);
    const maj = () => {
      const cap = Number(m.value) || 0, ans = Number(d.value) || 1, taux = Number(t.value) || 0;
      const mois = Math.round(ans * 12), mens = mensualite(cap, ans, taux), cout = mens * mois - cap;
      const eur = x => A.lang === "en" ? "€" + Math.round(x).toLocaleString(A.locale) : Math.round(x).toLocaleString(A.locale) + " €";
      out.innerHTML = T(`Mensualité : <strong>${eur(mens)}</strong> par mois pendant ${mois} mois · coût du crédit : <strong>${eur(cout)}</strong>.`,
        `Monthly payment: <strong>${eur(mens)}</strong> for ${mois} months · cost of credit: <strong>${eur(cout)}</strong>.`);
    };
    [m, d, t].forEach(x => x.addEventListener("input", maj)); maj();
  }

  function dessiner(el) {
    if (noeud === null) noeud = prochain(rep());
    if (noeud === null) { bilan(el); return; }
    ecranQuestion(el, noeud);
  }

  A.pages.parcours = function (el) {
    const r = rep();
    noeud = prochain(r);   // reprend là où on s'était arrêté, ou affiche le bilan si tout est répondu
    dessiner(el);
  };
})();
