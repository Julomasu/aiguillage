/* « Ta situation » : un parcours à embranchements (revenus, aides, études payantes, prêt, ville…) qui débouche sur un plan personnalisé :
   aides auxquelles tu peux prétendre, façon de financer, où étudier, formations adaptées. Les réponses restent sur l'appareil (A.etat.parcours).
   Les montants et conditions sont des repères : la page renvoie vers les sites officiels. */
(function () {
  /* ——— L'arbre : chaque nœud a des options ; `suite` donne le nœud suivant (fonction des réponses déjà données) */
  const NOEUDS = {
    statut: { q: "Où en es-tu ?", aide: "Ça change les aides et les démarches possibles.", options: [
      ["lycee", "🎒", "Lycéen·ne", "Seconde, première ou terminale"],
      ["etudiant", "🎓", "Déjà étudiant·e", "Je veux me réorienter ou changer de voie"],
      ["autre", "🔄", "Hors études", "Reprise d'études, année de pause ou reconversion"]],
      suite: () => "revenus" },
    revenus: { q: "Quels sont à peu près les revenus de ta famille ?", aide: "Pas de chiffre exact : ça sert à savoir si une bourse est probable. Le simulateur te donnera le détail.", options: [
      ["faibles", "🌱", "Modestes", "Un ou deux salaires proches du Smic, ou moins"],
      ["moyens", "🌤️", "Moyens", "Des revenus corrects, avec plusieurs enfants ou charges"],
      ["aises", "☀️", "Confortables", "Pas de bourse probable"],
      ["nsp", "🤷", "Je ne sais pas", "On regardera ensemble"]],
      suite: () => "situation" },
    situation: { q: "Qu'est-ce qui te concerne ?", aide: "Plusieurs réponses possibles. Chacune peut ouvrir des aides précises.", multi: true, options: [
      ["handicap", "♿", "Un handicap ou un trouble de santé", "Aménagements, aides spécifiques"],
      ["salarie", "💼", "Je travaille à côté", "Emploi, service civique, job étudiant"],
      ["ase", "🏠", "Je suis sans soutien familial", "Aide sociale à l'enfance, foyer, autonomie précoce"],
      ["etranger", "🌍", "Nationalité hors Union européenne", "Frais, titre de séjour, aides"],
      ["sportif", "🏅", "Sportif·ve de haut niveau", "Statut, aménagements"],
      ["parent", "👶", "J'ai un enfant à charge", "Aides CAF, garde, logement"],
      ["aucun", "✅", "Rien de tout ça", "Ça va aussi"]],
      suite: () => "payer" },
    payer: { q: "Es-tu prêt·e à payer tes études ?", aide: "Beaucoup de formations sont gratuites ou presque. Les écoles privées coûtent de 7 000 à 15 000 € par an.", options: [
      ["non", "🆓", "Non, je vise le gratuit", "BTS, BUT, licence, prépa publique, école publique"],
      ["peu", "💶", "Un peu", "Jusqu'à ~3 000 € par an (écoles publiques, certaines privées)"],
      ["oui", "🎯", "Oui, si la formation vaut le coup", "École privée, 7 000 à 15 000 € par an"],
      ["nsp", "🤷", "Je ne sais pas", "Je veux d'abord voir les possibilités"]],
      suite: r => (r.payer === "oui" || r.payer === "peu") ? "financer" : "rester" },
    financer: { q: "Comment comptes-tu payer ?", aide: "Il y a presque toujours une solution, mais certaines coûtent plus cher que d'autres à long terme.", options: [
      ["famille", "👪", "Ma famille paie", "Ou prend en charge une partie"],
      ["alternance", "🏭", "L'alternance", "L'entreprise paie l'école et je touche un salaire"],
      ["pret", "🏦", "Un prêt bancaire", "Je rembourse après mes études"],
      ["bourses", "🎁", "Bourses et aides de l'école", "Réductions, bourses d'excellence ou sociales"],
      ["nsp", "🤷", "Pas encore décidé", "Montre-moi les options"]],
      suite: r => r.financer === "pret" ? "pret" : "rester" },
    pret: { q: "Pour un prêt, qui se porte caution ?", aide: "C'est la question qui décide du type de prêt à demander.", options: [
      ["parents", "👪", "Un parent ou proche se porte caution", "Prêt étudiant classique"],
      ["aucune", "🛡️", "Personne : je veux un prêt sans caution", "Prêt garanti par l'État"],
      ["nsp", "🤷", "Je ne sais pas", "On compare les deux"]],
      suite: () => "rester" },
    rester: { q: "Veux-tu rester dans ta ville ou ta région ?", aide: "Étudier près de chez toi évite le loyer : c'est souvent 400 à 800 € d'économisés par mois.", options: [
      ["oui", "🏡", "Oui, rester près de chez moi", "Je regarde ce qui existe sur place"],
      ["non", "🧳", "Non, je suis prêt·e à partir", "Une autre ville, voire un autre pays"],
      ["nsp", "🤷", "Ça dépend de la formation", "Je veux voir les deux"]],
      suite: r => r.rester === "oui" ? "local" : "ailleurs" },
    local: { q: "Si tu restes, où dormiras-tu ?", aide: "", options: [
      ["parents", "🏠", "Chez mes parents", "Pas de loyer, un peu de transport"],
      ["logement", "🛏️", "Dans mon propre logement", "Même ville, mais je prends mon indépendance"]],
      suite: () => "rythme" },
    ailleurs: { q: "Plutôt où ?", aide: "Le loyer varie du simple au double selon la ville.", options: [
      ["paris", "🗼", "Paris / Île-de-France", "Plus d'offres, mais le logement le plus cher"],
      ["grande", "🏙️", "Une grande ville", "Lyon, Lille, Toulouse, Bordeaux, Nantes, Rennes…"],
      ["moyenne", "🏘️", "Une ville moyenne", "Loyers plus doux, formations moins nombreuses"],
      ["etranger", "✈️", "À l'étranger", "Erasmus, master, études complètes"],
      ["partout", "🧭", "Peu importe", "Je choisis d'abord la formation"]],
      suite: r => r.ailleurs === "paris" ? "paris" : "rythme" },
    paris: { q: "Paris coûte cher. Quel plan pour te loger ?", aide: "Un studio privé dépasse souvent 800 € par mois. Les solutions existent, mais elles se préparent tôt.", options: [
      ["crous", "🏛️", "Une résidence Crous ou une cité U", "Demande dès janvier ; priorité aux boursier·ères"],
      ["alternance", "💼", "L'alternance", "Le salaire paie le loyer"],
      ["coloc", "👥", "Une colocation ou une résidence privée", "Plus cher mais plus facile à trouver"],
      ["rer", "🚆", "Rester chez mes parents et prendre le RER", "Zéro loyer, du transport"]],
      suite: () => "rythme" },
    rythme: { q: "Quelle durée d'études te convient ?", aide: "", options: [
      ["court", "⚡", "Courte (2 à 3 ans)", "Bosser vite"],
      ["moyen", "🎯", "3 à 5 ans", "Le cas le plus courant"],
      ["long", "🔭", "5 ans et plus", "Ingénieur·e, santé, droit, recherche…"],
      ["nsp", "🤷", "Je ne sais pas", "On verra"]],
      suite: () => "domaine" },
    domaine: { q: "Sais-tu déjà dans quel domaine tu veux aller ?", aide: "Si tu hésites, le test des métiers est fait pour ça.", options: [] /* rempli par les lignes + « pas encore » */,
      suite: () => null }
  };

  const ORDRE_CLE = ["statut", "revenus", "situation", "payer", "financer", "pret", "rester", "local", "ailleurs", "paris", "rythme", "domaine"];

  const rep = () => A.etat.parcours || (A.etat.parcours = {});
  let noeud = null;           // nœud affiché

  function options(id) {
    if (id === "domaine") return A.lignes.map(l => [l.id, "", l.nom, ""]).concat([["aucun", "🧭", "Pas encore", "Je lance le test des métiers"]]);
    return NOEUDS[id].options;
  }

  function nomRep(id, v) {
    if (id === "domaine") return v === "aucun" ? "Pas encore de domaine" : (A.ligneParId[v] || {}).nom;
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
        <p class="surtitre">Ta situation · question ${ici}</p>
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
          ${ch.length ? `<button type="button" class="btn-texte" data-retour>← Question précédente</button>` : `<a class="btn-texte" href="#test">← Retour</a>`}
          ${n.multi ? `<button type="button" class="btn btn-signal" data-ok ${Array.isArray(courant) && courant.length ? "" : "disabled"}>Continuer</button>` : ""}
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
    if (!noeud) A.gagner(40, "parcours", "Ton parcours est tracé");
    dessiner(el);
    const h = A.$("h1", el); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }

  /* ——— Aides, financement, lieu : calculés à partir des réponses */
  const lien = (t, u) => `<a href="${u}" target="_blank" rel="noopener">${A.e(t)}</a>`;

  function aides(r) {
    const L = [], f = Array.isArray(r.situation) ? r.situation : [];
    const alt = r.financer === "alternance";
    if (r.revenus === "faibles") L.push(["Bourse sur critères sociaux (Crous)", "Très probable", "Elle t'exonère des frais d'inscription et de la CVEC, et se verse sur 10 mois. Le dossier social se fait sur Messervices.etudiant.gouv.fr, dès le 15 janvier (DSE).", "https://www.messervices.etudiant.gouv.fr"]);
    else if (r.revenus === "moyens") L.push(["Bourse sur critères sociaux (Crous)", "Possible", "Les échelons montent jusqu'à des revenus assez élevés si la famille est nombreuse. Fais le dossier : c'est gratuit et ça ne coûte rien d'essayer.", "https://www.messervices.etudiant.gouv.fr"]);
    else if (r.revenus === "nsp") L.push(["Bourse sur critères sociaux (Crous)", "À tester", "Simule ton droit sur Messervices.etudiant.gouv.fr avant de te décourager : le calcul prend 5 minutes.", "https://www.messervices.etudiant.gouv.fr"]);
    if (r.revenus !== "aises") L.push(["Aide d'urgence du Crous", "En cas de coup dur", "Une aide ponctuelle ou annuelle si tu fais face à un problème financier. Parle à l'assistant·e social·e du Crous.", "https://www.etudiant.gouv.fr/fr/les-aides-d-urgence-du-crous-1304"]);
    L.push(["Repas Crous à 1 €", "Pour tout le monde", "Un repas par service dans les restaurants universitaires.", "https://www.etudiant.gouv.fr/fr/comment-beneficier-du-repas-crous-a-1-euro-3017"]);
    if (r.statut === "lycee" && r.revenus !== "aises" && (r.rester === "non" || r.rester === "nsp")) L.push(["Aide à la mobilité Parcoursup", "500 €", "Pour les lycéen·nes boursier·ères qui acceptent une formation hors de leur académie.", "https://www.parcoursup.gouv.fr"]);
    if (r.rester !== "oui" || r.local === "logement") {
      L.push(["APL (CAF)", "Selon loyer et revenus", "Aide au logement, même en résidence Crous ou colocation. À demander dès que tu as ton bail.", "https://www.caf.fr"]);
      L.push(["Garantie Visale", "Gratuite", "Action Logement se porte garant à ta place si tes parents ne peuvent pas.", "https://www.visale.fr"]);
      L.push(["Logement Crous", "Loyers modérés", "Demande dès le DSE : les boursier·ères sont prioritaires.", "https://trouverunlogement.lescrous.fr"]);
    }
    if (alt) L.push(["Apprentissage", "Salaire + études gratuites", "Ta formation est financée par l'entreprise et tu touches un salaire. Les apprenti·es de 18 ans et plus ont aussi une aide au permis de 500 €.", "https://www.alternance.emploi.gouv.fr"]);
    if (f.includes("handicap")) L.push(["Aides liées au handicap", "À demander tôt", "Référent handicap de ton établissement, aménagements d'examens, accompagnement. Une AAH est possible sur dossier MDPH, parfois cumulable avec la bourse.", "https://www.service-public.fr/particuliers/vosdroits/N12230"]);
    if (f.includes("salarie")) L.push(["Statut d'étudiant·e salarié·e", "Selon l'établissement", "Dispense d'assiduité, examens aménagés. Demande-le au secrétariat dès la rentrée.", "https://www.etudiant.gouv.fr"]);
    if (f.includes("ase")) L.push(["Soutien sans famille", "Priorité possible", "Un contrat jeune majeur de l'aide sociale à l'enfance et la priorité bourse/logement existent selon ta situation. Ton éducateur·rice ou le Crous t'aident à monter le dossier.", "https://www.etudiant.gouv.fr/fr/les-aides-d-urgence-du-crous-1304"]);
    if (f.includes("etranger")) L.push(["Étudiant·e hors Union européenne", "Frais différenciés", "Les droits d'inscription sont plus élevés dans le public pour les non-européen·nes (sauf exceptions). Renseigne-toi sur les exonérations des universités et sur Campus France.", "https://www.campusfrance.org"]);
    if (f.includes("sportif")) L.push(["Statut de sportif·ve de haut niveau", "Aménagements", "Emploi du temps adapté, tutorat, accueil dans des établissements partenaires. Ton club ou fédération te renseigne.", "https://www.sports.gouv.fr"]);
    if (f.includes("parent")) L.push(["Aides CAF et Crous pour étudiant·es parents", "À cumuler", "Allocations familiales, mode de garde, aide du Crous. Parle à l'assistant·e social·e du Crous pour tout regrouper.", "https://www.caf.fr"]);
    return L;
  }

  function mensualite(capital, annees, tauxAn) {
    const n = Math.max(1, Math.round(annees * 12)), t = tauxAn / 100 / 12;
    return t === 0 ? capital / n : capital * t / (1 - Math.pow(1 + t, -n));
  }

  function blocFinancement(r) {
    if (r.payer === "non" || !r.payer) return `<p>Tu vises le gratuit : c'est le plus malin si tu ne sais pas encore où tu vas. <strong>Un BTS, un BUT, une licence ou une prépa publique</strong> coûtent presque rien (0 à environ 300 € par an, 0 € si tu es boursier·ère), et les masters publics donnent d'excellents diplômes.</p>`;
    let h = "";
    if (r.payer === "nsp") h += `<p>Tu hésites : compare d'abord avec le <a href="#budget">simulateur de budget</a>. Une école privée coûte 7 000 à 15 000 € par an, soit <strong>25 000 à 75 000 €</strong> sur un cursus complet.</p>`;
    const f = r.financer;
    if (f === "famille") h += `<p><strong>Ta famille finance.</strong> Pense à vérifier ce que vaut le diplôme : <em>visé par l'État</em>, <em>grade de master</em>, accréditation CTI pour les ingénieurs, inscription au RNCP. Le prix ne garantit pas la reconnaissance.</p>`;
    if (f === "alternance") h += `<p><strong>L'alternance.</strong> L'école est gratuite pour toi et tu es payé·e. Il faut trouver l'entreprise : commence tes candidatures dès l'automne, en parallèle de Parcoursup. Les écoles ont souvent un service carrière qui t'aide.</p>`;
    if (f === "bourses") h += `<p><strong>Bourses et aides des écoles.</strong> Demande avant de t'inscrire : remise pour boursier·ères du Crous, bourses au mérite, fonds des fondations de l'école, étalement des frais. Beaucoup d'écoles en proposent sans le dire.</p>`;
    if (f === "nsp") h += `<p>Plusieurs pistes se cumulent : <strong>alternance</strong> (école gratuite + salaire), <strong>bourses d'école</strong>, <strong>prêt</strong> pour le reste. Regarde les trois avant de choisir.</p>`;
    if (f === "pret" || f === "nsp") {
      const c = r.pret;
      h += `<div class="pret-bloc"><h3>Le prêt bancaire, concrètement</h3>`;
      if (c === "parents" || c === "nsp") h += `<p><strong>Avec caution.</strong> Le prêt étudiant classique se négocie en banque : la caution d'un parent ou proche et une assurance sont demandées. Fais jouer la concurrence entre au moins 3 banques (la tienne, celle de tes parents, une banque en ligne) : les taux et les frais varient beaucoup.</p>`;
      if (c === "aucune" || c === "nsp") h += `<p><strong>Sans caution.</strong> Un prêt étudiant garanti par l'État existe, ouvert aux 18-28 ans sans condition de ressources ni caution personnelle, jusqu'à 20 000 € (à vérifier sur service-public.fr). Certaines banques acceptent un <em>différé</em> : tu ne rembourses qu'à la fin des études.</p>`;
      h += `<ul><li>Compare le <strong>TAEG</strong> (taux tout compris) et pas seulement le taux.</li><li>Choisis un <strong>différé</strong> si tu veux commencer à rembourser quand tu travailles, sachant que les intérêts courent.</li><li>Garde la mensualité sous <strong>10 à 15 %</strong> de ton premier salaire.</li></ul>
        <div class="pret-simu" id="pret-simu">
          <label class="champ"><span>Montant emprunté</span><input type="number" id="pret-m" min="1000" max="100000" step="500" value="15000"></label>
          <label class="champ"><span>Durée de remboursement (ans)</span><input type="number" id="pret-d" min="1" max="12" step="1" value="7"></label>
          <label class="champ"><span>Taux annuel indicatif (%)</span><input type="number" id="pret-t" min="0" max="10" step="0.1" value="3"></label>
          <p class="pret-res" id="pret-res" aria-live="polite"></p>
        </div>
        <p class="petit">Simulation indicative. Le vrai taux dépend de ta banque et de la date. Compare plusieurs offres.</p></div>`;
    }
    return h;
  }

  function blocLieu(r) {
    const o = [];
    if (r.rester === "oui" && r.local === "parents") o.push(`<p><strong>Tu restes chez tes parents.</strong> Pas de loyer : c'est ton plus gros atout financier. Regarde la <a href="#carte">carte des formations</a> autour de chez toi (rayon de 30 à 50 km) et vérifie les transports.</p>`);
    if (r.rester === "oui" && r.local === "logement") o.push(`<p><strong>Ta ville, mais ton logement.</strong> Tu as droit à l'APL et à la garantie Visale. Compte le loyer de ta ville dans le <a href="#budget">simulateur</a>.</p>`);
    if (r.rester === "nsp") o.push(`<p>Tu hésites entre rester et partir : lance la <a href="#carte">carte</a> pour voir ce qui existe près de chez toi, puis compare avec une autre ville dans le <a href="#budget">simulateur de budget</a>.</p>`);
    if (r.ailleurs === "paris") {
      o.push(`<p><strong>Paris.</strong> Beaucoup de formations et d'entreprises, mais un loyer souvent supérieur à 800 € pour un studio privé.</p>`);
      const p = r.paris;
      if (p === "crous") o.push(`<p>Demande une résidence Crous ou une cité universitaire <strong>dès le 15 janvier</strong>, et dépose plusieurs vœux ; en parallèle, prépare une solution privée.</p>`);
      if (p === "alternance") o.push(`<p>L'alternance est la voie la plus solide à Paris : l'entreprise t'aide parfois à te loger (Action Logement), et le salaire couvre le loyer.</p>`);
      if (p === "coloc") o.push(`<p>Regarde les résidences étudiantes privées et les colocations ; cherche tôt (mai-juillet) et active la garantie Visale.</p>`);
      if (p === "rer") o.push(`<p>Rester en Île-de-France chez tes parents réduit fortement le budget. Compte l'abonnement de transport (tarif jeune) et les trajets longs.</p>`);
    }
    if (r.ailleurs === "grande") o.push(`<p><strong>Une grande ville.</strong> Très bonne offre de formations avec des loyers plus bas qu'à Paris. Compare dans le <a href="#budget">simulateur</a>.</p>`);
    if (r.ailleurs === "moyenne") o.push(`<p><strong>Une ville moyenne.</strong> Loyers doux et petites classes (IUT, BTS), mais moins de choix de formations. Regarde la <a href="#carte">carte</a>.</p>`);
    if (r.ailleurs === "etranger") o.push(`<p><strong>À l'étranger.</strong> Erasmus+ pour un semestre ou une année, ou un cursus complet. Regarde les tests de langue (<a href="#epreuve-toefl-ielts">TOEFL / IELTS</a>), les <a href="#passerelles">passerelles</a> et le site Campus France.</p>`);
    if (r.ailleurs === "partout") o.push(`<p>Tu choisis d'abord la formation : explore l'<a href="#ecoles">annuaire des écoles</a> et la <a href="#carte">carte</a>, puis calcule ton budget par ville.</p>`);
    return o.join("");
  }

  function formationsAdaptees(r) {
    const choix = A.types.filter(t => {
      if (r.payer === "non" && t.coutNiv > 1) return false;
      if (r.rythme === "court" && !/2|3/.test(t.duree) ) return false;
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
        <p class="surtitre">Ton plan</p>
        <h1>Voici ce que ta situation ouvre</h1>
        <p class="chapo">Aides auxquelles tu peux prétendre, façon de financer, lieu d'études et formations qui collent. Tout reste sur ton appareil.</p>
        <div class="puces">${resume.concat(flags).map(x => `<span class="puce puce-statique">${A.e(x)}</span>`).join("")}</div>
        <p class="petit"><button type="button" class="btn-texte" data-modifier>Modifier mes réponses</button> · <button type="button" class="btn-texte" data-effacer>Tout effacer</button></p>
      </section>

      <section class="bloc">
        <h2>💶 Tes aides</h2>
        <div class="aides-liste">${L.map(([t, m, tx, u]) => `<article class="aide-ligne"><div><h3>${A.e(t)}</h3><p>${A.e(tx)}</p></div><div class="aide-cote"><strong>${A.e(m)}</strong><a href="${A.e(u)}" target="_blank" rel="noopener">Site officiel</a></div></article>`).join("")}</div>
        <p class="petit">Conditions et montants évoluent chaque année : confirme sur les sites officiels. Pour le détail : <a href="#aides">Budget & aides</a>.</p>
      </section>

      <section class="bloc">
        <h2>🏦 Comment financer</h2>
        ${blocFinancement(r)}
      </section>

      <section class="bloc">
        <h2>📍 Où étudier</h2>
        ${blocLieu(r) || "<p>Tu n'as pas encore choisi de lieu. Regarde la <a href=\"#carte\">carte</a> pour voir ce qui existe près de toi.</p>"}
        <p><a class="btn btn-ligne" href="#budget">Calculer mon budget par ville</a></p>
      </section>

      <section class="bloc">
        <h2>🎓 Formations qui collent à ta situation</h2>
        <div class="liste-formations">${types.map(t => `<a class="ligne-formation" href="#type-${t.id}"><strong>${A.e(t.nom)}</strong><span>${A.e(t.duree)} · ${A.e(t.cout)}</span></a>`).join("")}</div>
        <p class="petit">Filtrées selon ton budget et ta durée d'études. Compare-les dans <a href="#formations">le comparateur</a>.</p>
      </section>

      <section class="bloc">
        <h2>🧭 Et côté métier ?</h2>
        ${dom ? `<p>Tu vises le domaine <strong>${A.e(dom.nom)}</strong>. Quelques métiers pour t'inspirer :</p><div class="grille-metiers">${metiersDom.map(m => A.carteMetier(m, A.compatibilite(m, A.etat.profil))).join("")}</div><p><a href="#metiers">Voir tous les métiers</a></p>`
        : `<p>Tu ne sais pas encore quel métier te correspond ? Le test te propose des métiers à partir de ce que tu aimes faire.</p><p><a class="btn btn-signal" href="#test">Lancer le test des métiers</a></p>`}
      </section>

      <section class="bloc">
        <h2>🌳 Tout l'arbre des possibilités</h2>
        <p class="petit">Voici toutes les questions et réponses possibles. Ton chemin est en gras.</p>
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
      const fin = base ? `<p class="petit arbre-suite">Ensuite : ${A.e(NOEUDS[base].q)}</p>` : `<p class="petit arbre-suite">Ensuite : ton plan.</p>`;
      return `<div class="arbre-noeud"><p class="arbre-q">${A.e(n.q)}</p><ul>${lis}</ul>${fin}</div>`;
    }).join("");
    return `<div class="arbre"><details><summary>Afficher l'arbre complet</summary>${blocs}</details></div>`;
  }

  function brancherPret(el) {
    const m = A.$("#pret-m", el); if (!m) return;
    const d = A.$("#pret-d", el), t = A.$("#pret-t", el), out = A.$("#pret-res", el);
    const maj = () => {
      const cap = Number(m.value) || 0, ans = Number(d.value) || 1, taux = Number(t.value) || 0;
      const mens = mensualite(cap, ans, taux), total = mens * Math.round(ans * 12);
      out.innerHTML = `Mensualité : <strong>${Math.round(mens).toLocaleString(A.locale)} €</strong> par mois pendant ${Math.round(ans * 12)} mois · coût du crédit : <strong>${Math.round(total - cap).toLocaleString(A.locale)} €</strong>.`;
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
