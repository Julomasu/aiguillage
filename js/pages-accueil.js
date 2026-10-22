/* Accueil : l'affiche d'ouverture, trois étapes, puis les cinq grandes parties. */
(function () {
  const ETAPES = [
    ["Découvre ce qui te ressemble", "Le test te propose des métiers et des formations à partir de ce que tu aimes faire.", "#test"],
    ["Compare les formations", "Coût, sélection, débouchés, écoles près de chez toi : tout est au même endroit.", "#formations"],
    ["Prépare tes démarches", "Aides, budget, calendrier Parcoursup : ce qu'il faut faire, et quand.", "#parcours"]
  ];
  const CLAIRS = ["#FFC629"];   // fonds clairs : texte sombre

  A.pages.accueil = function (el) {
    const profil = A.etat.profil;
    const nbEcoles = "1 900+";   // remplacé par le nombre exact dès que l'annuaire est chargé
    el.innerHTML = `
      <section class="plein hero"><div class="cadre">
        <p class="surtitre">Orientation après le bac</p>
        <h1>Trouve <em>ta voie.</em></h1>
        <p class="chapo">Métiers, formations, écoles, aides : tout ce qu'il faut pour choisir tes études, avec les chiffres officiels. Gratuit, sans inscription.</p>
        <div class="actions">
          <a class="btn" href="#test">${profil ? "Refaire le test" : "Faire le test · 5 min"}</a>
          <a class="btn btn-ligne" href="#metiers">Voir les métiers</a>
        </div>
        <div class="hero-chiffres">
          <div><strong>${A.metiers.length}</strong><span>métiers</span></div>
          <div><strong>${A.formations.length}</strong><span>formations</span></div>
          <div><strong id="nb-ecoles">${nbEcoles}</strong><span>écoles</span></div>
        </div>
      </div></section>

      ${profil ? `
      <section class="bandeau-profil">
        <div>
          <p class="surtitre">Ton profil</p>
          <p class="bp-code"><span>${profil.code}</span> ${A.e(A.profils[profil.code[0]].nom)} · ${A.e(A.profils[profil.code[1]].nom)}</p>
        </div>
        <a class="btn" href="#resultat">Voir mes résultats</a>
      </section>` : ""}

      <section>
        <div class="titre-section"><h2>Comment ça marche</h2></div>
        <ol class="etapes-home">${ETAPES.map(([titre, texte, lien], i) => `
          <li><a href="${lien}"><span class="num" aria-hidden="true">0${i + 1}</span><span><strong>${A.e(titre)}</strong><p>${A.e(texte)}</p></span></a></li>`).join("")}
        </ol>
      </section>

      <section class="tuiles" aria-label="Les cinq grandes parties du site">
        ${A.HUBS.map(h => `
        <a class="tuile" href="#${h.pages[0][0]}" style="--c:${h.c};--on:${CLAIRS.includes(h.c) ? "#111" : "#fff"}">
          <span class="fond-chiffre" aria-hidden="true">${h.id === "metiers" ? A.metiers.length : h.pages.length}</span>
          <div><h2>${A.e(h.nom)}</h2><p>${A.e(h.id === "metiers" ? h.desc.replace("Des fiches", A.metiers.length + " fiches") : h.desc)}</p></div>
          <div class="bas"><span>${h.pages.length > 1 ? h.pages.length + " rubriques" : "Explorer"}</span><span class="fleche" aria-hidden="true">→</span></div>
        </a>`).join("")}
      </section>

      <section class="lien-paperasse">
        <div><p class="surtitre">Après le bac, l'administration</p><h2>Impôts, logement, micro-entreprise ?</h2><p>Paperasse explique les démarches que personne ne t'apprend, avec les chiffres officiels de 2026.</p></div>
        <a class="btn btn-ligne" href="https://julomasu.github.io/paperasse/" target="_blank" rel="noopener">Ouvrir Paperasse</a>
      </section>

      <section class="plein appel"><div class="cadre">
        <p class="surtitre">5 minutes, pas plus</p>
        <h2>Et si tu commençais par toi ?</h2>
        <div class="actions"><a class="btn" href="#test">Faire le test</a></div>
      </div></section>
    `;
    A.donnees("ecoles").then(d => { const z = A.$("#nb-ecoles"), n = (d.ecoles || []).length; if (z && n) z.textContent = n.toLocaleString(A.locale); }).catch(() => {});
  };
})();
