/* Accueil : une phrase pour comprendre le site, trois étapes, puis les cinq grandes parties. */
(function () {
  const ETAPES = [
    ["🎯", "Découvre ce qui te ressemble", "Le test te propose des métiers et des formations à partir de ce que tu aimes faire.", "#test"],
    ["🏫", "Compare les formations", "Coût, sélection, débouchés, écoles près de chez toi : tout est au même endroit.", "#formations"],
    ["🧾", "Prépare tes démarches", "Aides, budget, calendrier Parcoursup : ce qu'il faut faire, et quand.", "#parcours"]
  ];

  A.pages.accueil = function (el) {
    const profil = A.etat.profil;
    el.innerHTML = `
      <section class="hero">
        <div class="hero-texte">
          <p class="surtitre">Orientation après le bac</p>
          <h1>Choisis tes études <span class="surligne">sans te perdre.</span></h1>
          <p class="chapo">Métiers, formations, écoles, aides : Aiguillage t'explique les études supérieures sans jargon, avec les chiffres officiels. Gratuit, sans inscription.</p>
          <div class="actions">
            <a class="btn btn-signal" href="#test">${profil ? "Refaire le test" : "Faire le test (5 min)"}</a>
            <a class="btn btn-ligne" href="#metiers">Voir les métiers</a>
          </div>
        </div>
        <ol class="hero-etapes">${ETAPES.map(([ico, titre, texte, lien], i) => `
          <li><a href="${lien}"><span class="he-num" aria-hidden="true">${i + 1}</span><span class="he-ico" aria-hidden="true">${ico}</span>
            <span class="he-corps"><strong>${A.e(titre)}</strong><span>${A.e(texte)}</span></span></a></li>`).join("")}
        </ol>
      </section>

      ${profil ? `
      <section class="bandeau-profil">
        <div>
          <p class="surtitre">Ton profil</p>
          <p class="bp-code"><span>${profil.code}</span> ${A.e(A.profils[profil.code[0]].nom)} · ${A.e(A.profils[profil.code[1]].nom)}</p>
        </div>
        <a class="btn btn-ligne" href="#resultat">Voir mes résultats</a>
      </section>` : ""}

      <section class="hubs" aria-label="Les cinq grandes parties du site">
        ${A.HUBS.map(h => `
        <article class="hub-carte" style="--c:${h.c}">
          <a class="hub-tete" href="#${h.pages[0][0]}">
            <span class="hub-ico" aria-hidden="true">${h.emoji}</span>
            <span class="hub-corps"><strong>${A.e(h.nom)}</strong><span>${A.e(h.id === "metiers" ? h.desc.replace("Des fiches", A.metiers.length + " fiches") : h.desc)}</span></span>
          </a>
          ${h.pages.length > 1 ? `<ul class="hub-liens">${h.pages.map(([id, ico, nom]) => `<li><a href="#${id}"><span aria-hidden="true">${ico}</span><span>${A.e(nom)}</span></a></li>`).join("")}</ul>` : ""}
        </article>`).join("")}
      </section>
    `;
  };
})();
