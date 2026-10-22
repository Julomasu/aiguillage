/* Témoignages d'étudiant·es : affichage des textes publiés (data/temoignages.json) et formulaire de dépôt.
   Circuit gratuit et modéré : le formulaire pré-remplit une « issue » GitHub ; un·e modérateur·rice relit puis ajoute le label
   « approuvé » ; un workflow publie le texte (voir .github/workflows/temoignages.yml). Aucune donnée n'est stockée par le site. */
(function () {
  const TYPES = ["BTS", "BUT", "Licence", "Prépa", "École d'ingé", "École de commerce", "Santé", "Social", "Autre"];
  const BACS = ["Général", "Technologique", "Professionnel"];
  const filtre = { type: "", texte: "" };
  const brouillon = { prenom: "", type: "BUT", formation: "", ville: "", annee: String(new Date().getFullYear()), bac: "Général", texte: "", conseil: "" };

  const QUESTIONS = ["Comment se passe une journée type ?", "Qu'est-ce qui t'a le plus surpris·e ?", "Qu'est-ce qui est le plus dur ?", "Combien d'heures de travail perso par semaine ?", "Comment as-tu trouvé ton logement ?", "Tu referais le même choix ?"];

  function carte(t) {
    const bac = { Général: "g", Technologique: "t", Professionnel: "p" }[t.bac];
    return `<article class="temoin">
      <header><strong>${A.e(t.prenom)}</strong><span class="petit">${A.e(t.formation)} · ${A.e(t.ville)} · depuis ${A.e(t.annee)}</span>
        <span class="temoin-tags"><span class="puce puce-statique">${A.e(t.type)}</span><span class="puce puce-statique">Bac ${A.e(t.bac.toLowerCase())}</span></span></header>
      <p>${A.e(t.texte)}</p>
      ${t.conseil ? `<p class="temoin-conseil"><strong>Ce que j'aurais aimé savoir :</strong> ${A.e(t.conseil)}</p>` : ""}
      ${bac ? "" : ""}
    </article>`;
  }

  function lienDepot() {
    const d = A.CONFIG && A.CONFIG.depotGithub;
    if (!d || !/^[\w.-]+\/[\w.-]+$/.test(d)) return null;
    const q = new URLSearchParams({ template: "temoignage.yml", title: "Témoignage : " + brouillon.formation, prenom: brouillon.prenom, type: brouillon.type,
      formation: brouillon.formation, ville: brouillon.ville, annee: brouillon.annee, bac: brouillon.bac, texte: brouillon.texte, conseil: brouillon.conseil });
    return `https://github.com/${d}/issues/new?${q.toString()}`;
  }

  const texteBrut = () => `Prénom ou pseudo : ${brouillon.prenom}\nFormation : ${brouillon.type} · ${brouillon.formation}\nVille : ${brouillon.ville}\nAnnée d'entrée : ${brouillon.annee}\nBac : ${brouillon.bac}\n\nTémoignage :\n${brouillon.texte}\n\nCe que j'aurais aimé savoir avant :\n${brouillon.conseil}`;

  const contientCoordonnees = t => [/https?:\/\//i, /www\./i, /[\w.+-]+@[\w-]+\.\w+/, /(?:\+?\d[\s.-]?){9,}/, /@\w{3,}/].some(p => p.test(t));

  A.pages.temoignages = function (el) {
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Par des étudiant·es, pour les lycéen·nes</p>
        <h1>Témoignages</h1>
        <p class="chapo">Ce que personne ne te dit dans les brochures : comment ça se passe vraiment. Chaque texte est relu par une personne avant d'être publié.</p>
      </section>
      <div class="filtres">
        <label class="recherche"><span class="sr">Chercher un témoignage</span><input id="tem-q" type="search" placeholder="Chercher : BUT, droit, Rennes…" autocomplete="off"></label>
        <div class="puces" role="group" aria-label="Type de formation">
          <button type="button" class="puce" data-type="" aria-pressed="true">Tous</button>
          ${TYPES.map(t => `<button type="button" class="puce" data-type="${A.e(t)}" aria-pressed="false">${A.e(t)}</button>`).join("")}
        </div>
      </div>
      <div id="tem-liste" class="temoins" aria-live="polite"><p class="petit">Chargement…</p></div>

      <section class="bloc" id="deposer">
        <h2>Tu es étudiant·e ? Raconte ton parcours</h2>
        <p class="petit">5 minutes, sans ton nom de famille ni coordonnées. Ça aidera des centaines de lycéen·nes qui hésitent.</p>
        <form class="tem-form" id="tem-form" onsubmit="return false">
          <label class="champ"><span>Prénom ou pseudo</span><input id="tf-prenom" maxlength="40" autocomplete="off"></label>
          <label class="champ"><span>Type de formation</span><select id="tf-type">${TYPES.map(t => `<option ${t === brouillon.type ? "selected" : ""}>${A.e(t)}</option>`).join("")}</select></label>
          <label class="champ"><span>Ta formation</span><input id="tf-formation" maxlength="90" placeholder="Ex. BUT Techniques de commercialisation" autocomplete="off"></label>
          <label class="champ"><span>Ville</span><input id="tf-ville" maxlength="50" autocomplete="off"></label>
          <label class="champ"><span>Année d'entrée</span><input id="tf-annee" maxlength="4" inputmode="numeric" value="${A.e(brouillon.annee)}"></label>
          <label class="champ"><span>Ton bac</span><select id="tf-bac">${BACS.map(b => `<option>${b}</option>`).join("")}</select></label>
          <label class="champ tem-large"><span>Ton témoignage <b id="tf-n1" class="petit">0/600</b></span><textarea id="tf-texte" rows="5" maxlength="600" placeholder="Comment ça se passe vraiment ? Ce qui t'a surpris·e, ce qui est dur, ce qui est bien."></textarea></label>
          <label class="champ tem-large"><span>Ce que j'aurais aimé savoir avant (facultatif) <b id="tf-n2" class="petit">0/300</b></span><textarea id="tf-conseil" rows="2" maxlength="300"></textarea></label>
          <p class="petit tem-large" id="tf-alerte" role="alert"></p>
          <div class="actions tem-large" id="tf-actions"></div>
        </form>
        <details class="bud-details"><summary>Pour t'aider : des questions à te poser</summary>
          <ul class="conseils-msg">${QUESTIONS.map(q => `<li>${A.e(q)}</li>`).join("")}</ul></details>
        <p class="petit">En envoyant ton texte, tu acceptes qu'il soit publié sous ce prénom ou pseudo. Tu peux demander son retrait à tout moment.</p>
      </section>`;

    A.donnees("temoignages").then(d => { maj(d.temoignages || []); donnees = d.temoignages || []; })
      .catch(() => { A.$("#tem-liste").innerHTML = A.messageErreurDonnees; });
    let donnees = [];

    function maj(liste) {
      const q = A.sansAccents(filtre.texte.trim());
      const l = liste.filter(t => (!filtre.type || t.type === filtre.type) && (!q || A.sansAccents(t.formation + " " + t.ville + " " + t.texte + " " + t.type).includes(q)));
      A.$("#tem-liste").innerHTML = liste.length
        ? (l.length ? l.map(carte).join("") : `<p class="vide-inline">Aucun témoignage ne correspond à ta recherche.</p>`)
        : `<div class="panneau-vide"><p class="surtitre">Bientôt ici</p><p>Les premiers témoignages arrivent. Si tu es étudiant·e, sois la première personne à écrire : le formulaire est juste en dessous.</p>
            <p class="petit">En attendant, tu peux poser tes questions à de vrais étudiant·es avec le <a href="#reseau">tuto LinkedIn & réseau</a>.</p></div>`;
    }

    const majForm = () => {
      ["prenom", "formation", "ville", "annee", "texte", "conseil"].forEach(k => { brouillon[k] = A.$("#tf-" + k).value; });
      brouillon.type = A.$("#tf-type").value; brouillon.bac = A.$("#tf-bac").value;
      A.$("#tf-n1").textContent = brouillon.texte.length + "/600"; A.$("#tf-n2").textContent = brouillon.conseil.length + "/300";
      const tout = [brouillon.prenom, brouillon.formation, brouillon.ville, brouillon.texte, brouillon.conseil].join(" ");
      const complet = brouillon.prenom.trim() && brouillon.formation.trim() && brouillon.ville.trim() && /^20\d\d$/.test(brouillon.annee) && brouillon.texte.trim().length >= 40;
      const alerte = contientCoordonnees(tout) ? "Retire les liens, adresses e-mail et numéros : ils ne seront pas publiés." : (!complet ? "Remplis tous les champs obligatoires et écris au moins 40 caractères." : "");
      A.$("#tf-alerte").textContent = alerte;
      const lien = lienDepot(), pret = !alerte;
      const mail = A.CONFIG && A.CONFIG.emailTemoignages;
      A.$("#tf-actions").innerHTML = `
        ${lien ? `<a class="btn btn-signal ${pret ? "" : "desactive"}" ${pret ? `href="${A.e(lien)}" target="_blank" rel="noopener"` : `aria-disabled="true"`}>Envoyer à la modération</a>` : ""}
        <button type="button" class="btn ${lien ? "btn-ligne" : "btn-signal"}" data-copier-tem ${pret ? "" : "disabled"}>Copier mon texte</button>
        ${!lien ? `<span class="petit">L'envoi automatique n'est pas encore activé sur ce site : copie ton texte et transmets-le à l'équipe${mail ? " à " + A.e(mail) : ""}.</span>` : (lien ? `<span class="petit">Un compte GitHub gratuit est nécessaire pour envoyer. Sinon, copie ton texte${mail ? " et écris à " + A.e(mail) : ""}.</span>` : "")}`;
    };
    el.oninput = ev => {
      if (ev.target.id === "tem-q") { filtre.texte = ev.target.value; maj(donnees); }
      else if (ev.target.id && ev.target.id.startsWith("tf-")) majForm();
    };
    el.onchange = ev => { if (ev.target.id === "tf-type" || ev.target.id === "tf-bac") majForm(); };
    el.onclick = ev => {
      const t = ev.target.closest("[data-type]");
      if (t) { filtre.type = t.dataset.type; A.$$("[data-type]").forEach(x => x.setAttribute("aria-pressed", String(x === t))); maj(donnees); return; }
      if (ev.target.closest("[data-copier-tem]")) {
        const ok = () => A.toast("Texte copié", "Envoie-le à l'équipe pour publication", "📋");
        try { navigator.clipboard.writeText(texteBrut()).then(ok, () => A.toast("Copie impossible", "Sélectionne ton texte à la main", "⚠️")); } catch (e) { A.toast("Copie impossible", "Sélectionne ton texte à la main", "⚠️"); }
      }
    };
    majForm();
  };
})();
