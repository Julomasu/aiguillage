/* Espace étudiant·es : passerelles, admissions parallèles, tests d'admission (Tage Mage, GMAT…). Données : js/data/passerelles.js */
(function () {
  let de = null, vers = null, ouvert = null;

  const chip = (g, o, actif) => `<button type="button" class="puce puce-dom" data-${g}="${o.id}" aria-pressed="${actif}">${o.emoji} ${A.e(o.nom)}</button>`;

  function carteTest(t) {
    return `
      <details class="test-fiche" id="epreuve-${t.id}"${ouvert === t.id ? " open" : ""}>
        <summary><span class="tf-ico" aria-hidden="true">${t.emoji}</span><span class="tf-titre"><strong>${A.e(t.nom)}</strong><span class="petit">${A.e(t.genre)}</span></span></summary>
        <div class="tf-corps">
          <p>${A.e(t.resume)}</p>
          <dl class="tf-liste">
            <dt>Pour qui</dt><dd>${A.e(t.pour)}</dd>
            <dt>Format</dt><dd>${A.e(t.format)}</dd>
            <dt>Score</dt><dd>${A.e(t.score)}</dd>
            <dt>Prix</dt><dd>${A.e(t.prix)}</dd>
            <dt>Quand</dt><dd>${A.e(t.quand)}</dd>
            <dt>Validité</dt><dd>${A.e(t.validite)}</dd>
            <dt>Où il est demandé</dt><dd>${A.e(t.ecoles)}</dd>
          </dl>
          <h3>Conseils</h3>
          <ul>${t.conseils.map(c => `<li>${A.e(c)}</li>`).join("")}</ul>
          ${t.note ? `<p class="petit">${A.e(t.note)}</p>` : ""}
          <p class="petit"><a href="${A.e(t.lien)}" target="_blank" rel="noopener">Site officiel</a> · Prix et dates changent : vérifie toujours avant de t'inscrire.</p>
        </div>
      </details>`;
  }

  function carteVoie(v) {
    const tests = v.tests.map(id => A.TESTS.find(t => t.id === id)).filter(Boolean);
    const objectif = A.PASS_VERS.find(o => o.id === v.vers);
    return `
      <article class="voie">
        <header>
          <span class="voie-ico" aria-hidden="true">${objectif.emoji}</span>
          <div><h3>${A.e(v.nom)}</h3><p class="voie-entree">Tu entres : ${A.e(v.entree)}</p></div>
        </header>
        <p>${A.e(v.resume)}</p>
        <ul class="voie-etapes">${v.comment.map(c => `<li>${A.e(c)}</li>`).join("")}</ul>
        <dl class="tf-liste">
          <dt>Quand</dt><dd>${A.e(v.quand)}</dd>
          <dt>Coût</dt><dd>${A.e(v.cout)}</dd>
          <dt>À vérifier</dt><dd>${A.e(v.verifier)}</dd>
        </dl>
        ${tests.length ? `<p class="tests-liens"><span class="petit">Tests à passer :</span> ${tests.map(t => `<a class="puce puce-lien" href="#epreuve-${t.id}">${t.emoji} ${A.e(t.nom)}</a>`).join(" ")}</p>` : ""}
      </article>`;
  }

  function resultats() {
    const liste = A.VOIES.filter(v => (!de || v.de.includes(de)) && (!vers || v.vers === vers));
    if (!liste.length) return `<div class="vide"><p>Pas de chemin listé pour cette combinaison. Essaie de changer un des deux choix, ou écris-nous pour qu'on l'ajoute.</p></div>`;
    return `<div class="voies">${liste.map(carteVoie).join("")}</div>`;
  }

  function dessiner(el) {
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Pour les étudiant·es</p>
        <h1>Passerelles et tests d'admission</h1>
        <p class="chapo">Tu as déjà un BTS, un BUT ou une licence et tu veux viser plus haut, changer de voie ou partir à l'étranger ? Voici les chemins, les tests (Tage Mage, GMAT, IAE-Message…) et les concours, avec les conditions, les dates et les prix.</p>
      </section>

      <section class="bloc">
        <h2>1. D'où pars-tu ?</h2>
        <div class="puces" id="pass-de">${A.PASS_DE.map(o => chip("de", o, de === o.id)).join("")}</div>
        <h2>2. Où veux-tu aller ?</h2>
        <div class="puces" id="pass-vers">${A.PASS_VERS.map(o => chip("vers", o, vers === o.id)).join("")}</div>
        <p class="petit"><button type="button" class="btn btn-fantome" data-reset${de || vers ? "" : " disabled"}>Tout afficher</button></p>
        <div id="pass-resultats">${resultats()}</div>
      </section>

      <section class="bloc">
        <h2>Les tests et concours en détail</h2>
        <div class="tests-fiches">${A.TESTS.map(carteTest).join("")}</div>
      </section>

      <aside class="encart encart-savais"><strong>Bon à savoir</strong>
        <p>Un test d'aptitude se prépare : avec 6 à 10 semaines de travail régulier, on gagne plusieurs dizaines de points. Plusieurs écoles et dispositifs offrent un tarif réduit ou la gratuité aux boursier·ères : demande avant de payer.</p></aside>
      <p class="petit">Les informations (prix, dates, places) sont des repères pour 2025-2026. Elles évoluent : confirme-les sur le site de l'organisateur. Il manque un chemin ? <a href="https://github.com/Julomasu/aiguillage/issues" target="_blank" rel="noopener">Propose-le ici</a>.</p>`;

    el.onclick = ev => {
      const bd = ev.target.closest("[data-de]"), bv = ev.target.closest("[data-vers]"), br = ev.target.closest("[data-reset]");
      if (bd) de = de === bd.dataset.de ? null : bd.dataset.de;
      else if (bv) vers = vers === bv.dataset.vers ? null : bv.dataset.vers;
      else if (br) { de = null; vers = null; }
      else return;
      dessiner(el);
    };
  }

  A.pages.passerelles = function (el) { ouvert = null; dessiner(el); };

  /* #epreuve-<id> : la page, avec le test demandé ouvert et visible */
  A.pages.epreuve = function (el, id) {
    ouvert = id;
    dessiner(el);
    const d = document.getElementById("epreuve-" + id);
    if (d) setTimeout(() => d.scrollIntoView({ block: "start" }), 50);
  };
})();
