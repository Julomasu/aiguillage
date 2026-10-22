/* Réseau & LinkedIn : tutoriel pas à pas, outil « Anciens élèves », générateur de message, sécurité. */
(function () {
  const ETAPES = [
    { id: "r1", titre: "Crée ton compte", texte: "LinkedIn est ouvert dès 16 ans. Utilise ton vrai prénom et ton vrai nom : c'est un réseau professionnel, pas un pseudo de jeu." },
    { id: "r2", titre: "Ajoute une photo simple", texte: "Visage bien visible, fond neutre, lumière du jour. Pas besoin de costume : une photo nette et souriante suffit." },
    { id: "r3", titre: "Écris ton titre", texte: "C'est la ligne sous ton nom. Dis où tu en es et ce qui t'attire, par exemple : « Lycéen en terminale STI2D · passionné de robotique ».", exemple: true },
    { id: "r4", titre: "Remplis « Formation »", texte: "Ajoute ton lycée et ta série ou tes spécialités. C'est ce qui te relie à tes futurs « anciens élèves »." },
    { id: "r5", titre: "Montre ce que tu fais déjà", texte: "Job d'été, baby-sitting, BAFA, club de sport, bénévolat, délégué·e de classe, projet perso : tout ça compte, ajoute-le dans « Expérience » ou « Bénévolat »." },
    { id: "r6", titre: "Règle ta confidentialité", texte: "Dans Préférences > Visibilité, choisis ce que voient les inconnus. Ne mets jamais ton adresse ni ton numéro de téléphone sur ton profil." }
  ];

  const MISSIONS = [
    { id: "m1", titre: "Explore les « Anciens élèves »", texte: "Cherche une école, un IUT ou une université qui t'intéresse, ouvre sa page, puis l'onglet « Anciens élèves ». Filtre par « Ce qu'ils font » ou « Où ils travaillent » : tu vois ce que sont devenus les diplômé·es." },
    { id: "m2", titre: "Remonte le parcours d'un métier", texte: "Cherche un métier (ex. « analyste M&A »), filtre sur « Personnes » et ouvre 5 profils. Note quelles études ils ont faites : tu verras qu'il existe souvent plusieurs chemins." },
    { id: "m3", titre: "Trouve un·e étudiant·e à qui écrire", texte: "Dans les anciens élèves de la formation visée, repère quelqu'un en 1re ou 2e année. C'est la personne idéale pour te dire comment ça se passe vraiment." }
  ];

  const SECURITE = [
    "Personne n'a besoin de ton adresse, de ton numéro ou de photos perso pour te conseiller.",
    "Un stage, une alternance ou une formation ne se paient jamais pour « réserver ta place » auprès d'un inconnu.",
    "Si une conversation te met mal à l'aise, arrête-la, bloque et signale le compte. Parles-en à un adulte de confiance.",
    "Préfère les échanges écrits sur la plateforme, ou une visio avec un adulte de confiance au courant."
  ];

  const OUTILS = [
    { nom: "Mon orientation en ligne (Onisep)", texte: "Des conseiller·ères répondent gratuitement par tchat, mail ou téléphone.", lien: "https://www.monorientationenligne.fr" },
    { nom: "1 jeune 1 solution", texte: "Le site de l'État pour trouver un stage, une alternance, un job ou un service civique.", lien: "https://www.1jeune1solution.gouv.fr" },
    { nom: "La bonne alternance", texte: "Les entreprises qui recrutent des alternant·es près de chez toi, même sans offre publiée.", lien: "https://labonnealternance.apprentissage.beta.gouv.fr" },
    { nom: "Welcome to the Jungle", texte: "Des vidéos de vrais salarié·es qui présentent leur métier et leur entreprise.", lien: "https://www.welcometothejungle.com" },
    { nom: "Les journées portes ouvertes", texte: "Le meilleur moyen de parler à des étudiant·es. Les dates sont sur les fiches Parcoursup des formations.", lien: "https://www.parcoursup.gouv.fr" }
  ];

  const modele = { qui: "etudiant", prenom: "", formation: "", question: "" };

  function message() {
    const p = modele.prenom.trim() || "[prénom]";
    const f = modele.formation.trim() || "[la formation ou le métier]";
    const q = modele.question.trim();
    const bac = A.etat.profil ? ({ g: "en bac général", t: "en bac techno", p: "en bac pro" })[A.etat.profil.bac] : "au lycée";
    if (modele.qui === "etudiant") {
      return `Bonjour ${p}, je suis ${bac} et je m'intéresse à ${f}. J'ai vu que tu y étais : accepterais-tu de répondre à 2 ou 3 questions sur ton expérience ?${q ? " Par exemple : " + q : ""} Merci beaucoup !`;
    }
    return `Bonjour ${p}, je suis ${bac} et votre parcours m'intéresse beaucoup : j'aimerais devenir ${f}. Auriez-vous 10 minutes pour me dire quelles études vous ont le plus servi ?${q ? " " + q : ""} Merci d'avance pour votre aide.`;
  }

  function cocher(id) {
    const n = A.ajouterUnique(A.etat.check, id);
    A.sauver();
    const faites = [...ETAPES, ...MISSIONS].filter(x => A.etat.check.includes(x.id)).length;
    return n;
  }

  A.pages.reseau = function (el) {
    const fait = id => A.etat.check.includes(id);
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Ton réseau, dès le lycée</p>
        <h1>LinkedIn & réseau</h1>
        <p class="chapo">Beaucoup de stages et d'alternances se trouvent grâce à des contacts. Et surtout, tu peux voir ce qu'ont fait les gens avant toi : leurs études, leurs premiers jobs, leurs détours. C'est gratuit, et ça s'apprend en 15 minutes.</p>
      </section>

      <section class="bloc">
        <h2>1. Ton profil en 6 étapes</h2>
        <ol class="tuto">${ETAPES.map((e, i) => `
          <li class="tuto-etape ${fait(e.id) ? "faite" : ""}">
            <span class="tuto-num">${i + 1}</span>
            <div><strong>${A.e(e.titre)}</strong><p>${A.e(e.texte)}</p></div>
            <button type="button" class="btn-coche" data-coche="${e.id}" aria-pressed="${fait(e.id)}">${fait(e.id) ? "Fait ✓" : "C'est fait"}</button>
          </li>`).join("")}
        </ol>
        <div class="apercu-profil" aria-label="Exemple de profil">
          <div class="ap-banniere"></div>
          <div class="ap-corps">
            <span class="ap-photo" aria-hidden="true">🙂</span>
            <strong>Inès Martin</strong>
            <span>Lycéenne en terminale STMG · curieuse du marketing et de l'événementiel</span>
            <span class="petit">Lycée Jean-Moulin · Bénévole au festival de ma ville · BAFA en cours</span>
          </div>
          <p class="petit ap-legende">Exemple fictif : un titre clair et quelques activités suffisent.</p>
        </div>
      </section>

      <section class="bloc">
        <h2>2. Vois ce qu'ont fait les gens avant toi</h2>
        <div class="missions">${MISSIONS.map(m => `
          <article class="mission ${fait(m.id) ? "faite" : ""}">
            <strong>${A.e(m.titre)}</strong>
            <p>${A.e(m.texte)}</p>
            <button type="button" class="btn-coche" data-coche="${m.id}" aria-pressed="${fait(m.id)}">${fait(m.id) ? "Mission réussie ✓" : "Mission faite"}</button>
          </article>`).join("")}
        </div>
        <form class="recherche-li" id="recherche-li" onsubmit="return false">
          <label class="champ"><span>Un métier ou une formation à explorer</span>
            <input id="li-terme" type="search" placeholder="Ex. analyste M&A, BUT GEA, infirmière" autocomplete="off">
          </label>
          <a class="btn btn-signal" id="li-lien" href="https://www.linkedin.com/search/results/people/" target="_blank" rel="noopener">Chercher sur LinkedIn</a>
        </form>
        <p class="petit">Il faut être connecté·e à LinkedIn pour voir les résultats. Sans compte, tape la même recherche dans un moteur de recherche suivi de « LinkedIn ».</p>
      </section>

      <section class="bloc">
        <h2>3. Écris ton premier message</h2>
        <div class="generateur">
          <div class="gen-champs">
            <div class="puces" role="group" aria-label="À qui écris-tu ?">
              <button type="button" class="puce" data-qui="etudiant" aria-pressed="${modele.qui === "etudiant"}">À un·e étudiant·e</button>
              <button type="button" class="puce" data-qui="pro" aria-pressed="${modele.qui === "pro"}">À un·e professionnel·le</button>
            </div>
            <label class="champ"><span>Son prénom</span><input id="gen-prenom" value="${A.e(modele.prenom)}" autocomplete="off"></label>
            <label class="champ"><span>${modele.qui === "etudiant" ? "La formation" : "Le métier"}</span><input id="gen-formation" value="${A.e(modele.formation)}" placeholder="${modele.qui === "etudiant" ? "le BUT TC de Rennes" : "analyste M&A"}" autocomplete="off"></label>
            <label class="champ"><span>Ta question (facultatif)</span><input id="gen-question" value="${A.e(modele.question)}" placeholder="comment se passe la 1re année ?" autocomplete="off"></label>
          </div>
          <div class="gen-sortie">
            <p class="gen-message" id="gen-message" data-i18n-skip>${A.e(message())}</p>
            <p class="petit">Le message est rédigé en français, pour des contacts en France.</p>
            <p class="petit" id="gen-compte"></p>
            <button type="button" class="btn btn-ligne" data-copier>Copier le message</button>
          </div>
        </div>
        <ul class="conseils-msg">
          <li>Court et poli : les gens répondent plus volontiers à un message de 2 ou 3 phrases.</li>
          <li>Personnalisé : montre que tu as regardé son parcours.</li>
          <li>Pas de réponse au bout d'une semaine ? Ce n'est pas personnel, écris à quelqu'un d'autre.</li>
          <li>Après l'échange, remercie : c'est comme ça qu'un contact devient un réseau.</li>
        </ul>
      </section>

      <section class="bloc">
        <h2>4. Les règles de sécurité</h2>
        <ul class="securite">${SECURITE.map(t => `<li>${A.e(t)}</li>`).join("")}</ul>
      </section>

      <section class="bloc">
        <h2>D'autres outils gratuits</h2>
        <a class="bandeau-lien" href="#temoignages"><strong>Lis des témoignages d'étudiant·es</strong><span>Ou écris le tien si tu es déjà dans le supérieur.</span></a>
        <div class="grille-aides">${OUTILS.map(o => `
          <article class="carte-aide"><h3>${A.e(o.nom)}</h3><p>${A.e(o.texte)}</p><a class="lien-fleche" href="${o.lien}" target="_blank" rel="noopener">Ouvrir</a></article>`).join("")}
        </div>
      </section>`;

    const majMessage = () => {
      const t = message();
      A.$("#gen-message").textContent = t;
      A.$("#gen-compte").textContent = `${t.length} caractères` + (t.length > 300 ? " : un peu long pour une invitation, garde-le pour un message après la connexion." : "");
    };
    majMessage();

    el.oninput = ev => {
      const id = ev.target.id;
      if (id === "li-terme") {
        A.$("#li-lien").href = "https://www.linkedin.com/search/results/people/?keywords=" + encodeURIComponent(ev.target.value.trim());
        return;
      }
      const cle = { "gen-prenom": "prenom", "gen-formation": "formation", "gen-question": "question" }[id];
      if (cle) { modele[cle] = ev.target.value; majMessage(); }
    };
    el.onclick = ev => {
      const b = ev.target.closest("button, #li-lien");
      if (!b) return;
      if (b.id === "li-lien") { return; }
      if (b.dataset.coche) {
        const id = b.dataset.coche;
        if (A.etat.check.includes(id)) return;
        cocher(id);
        b.setAttribute("aria-pressed", "true");
        b.textContent = b.closest(".mission") ? "Mission réussie ✓" : "Fait ✓";
        b.closest("li, article").classList.add("faite");
      } else if (b.dataset.qui) {
        modele.qui = b.dataset.qui;
        A.pages.reseau(el);
      } else if ("copier" in b.dataset) {
        const texte = message();
        const ok = () => { A.toast("Message copié", "Colle-le dans LinkedIn", "📋"); };
        const repli = () => {
          const z = A.$("#gen-message"), r = document.createRange();
          r.selectNodeContents(z); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
          A.toast("Texte sélectionné", "Copie-le avec Ctrl+C ou un appui long", "📋");
        };
        try { navigator.clipboard.writeText(texte).then(ok, repli); } catch (e) { repli(); }
      }
    };
  };
})();
