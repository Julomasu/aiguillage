/* L'arborescence : bac → domaine → formations (rangées de la plus accessible à la moins accessible) → métiers. */
(function () {
  const vue = { bac: null, domaine: null, formation: null };

  const CONSEIL = {
    g: "Avec un bac général, presque tout est ouvert : ce sont surtout tes spécialités qui comptent. Pense aussi aux BUT et aux BTS, pas seulement à la fac.",
    t: "Bac techno : environ la moitié des places de BUT te sont réservées, et des prépas existent rien que pour toi (TSI, ECT, TB).",
    p: "Bac pro : chaque BTS public te réserve des places, et tu peux le faire en alternance. C'est là que les bacs pro réussissent le mieux, et rien n'empêche de continuer après."
  };

  const formationsDuDomaine = id => A.formations
    .filter(f => f.lignes.includes(id))
    .sort((a, b) => b.acces[vue.bac] - a.acces[vue.bac] || A.types.indexOf(A.typeParId[a.type]) - A.types.indexOf(A.typeParId[b.type]));

  function detailFormation(f) {
    const metiers = (A.metiersDeFormation[f.id] || []).map(id => A.metierParId[id]);
    return `<div class="gare-detail">
      <p>${A.e(f.desc)}</p>
      <p class="petit"><strong>Et après :</strong> ${A.e(f.apres)}</p>
      ${metiers.length ? `<p class="petit"><strong>Métiers :</strong></p><div class="terminus">${metiers.map(m => `<a class="chip-metier" href="#metier-${m.id}"><span aria-hidden="true">${m.emoji}</span>${A.e(m.nom)}</a>`).join("")}</div>` : ""}
      <a class="lien-fleche" href="#formation-${f.id}">Fiche complète</a>
    </div>`;
  }

  function carteDomaine(l) {
    const liste = formationsDuDomaine(l.id), ouvert = vue.domaine === l.id;
    return `<section class="domaine${ouvert ? " ouvert" : ""}" style="--c:${l.couleur}">
      <button type="button" class="domaine-tete" data-domaine="${l.id}" aria-expanded="${ouvert}">
        <i aria-hidden="true"></i><strong>${A.e(l.nom)}</strong><span class="petit">${liste.length} formations</span><span class="dom-fleche" aria-hidden="true">${ouvert ? "−" : "+"}</span>
      </button>
      ${ouvert ? `<ul class="liste-form-plan">${liste.map(f => {
        const type = A.typeParId[f.type], ouv = vue.formation === f.id;
        return `<li class="${ouv ? "ouverte" : ""}">
          <button type="button" class="gare-btn" data-formation="${f.id}" aria-expanded="${ouv}">
            <span class="g-nom"><strong>${A.e(f.nom)}</strong><span>${A.e(type.nom)} · ${A.e(A.dureeFormation(f))}</span></span>
            ${A.tagAcces(f.acces[vue.bac])}
          </button>
          ${ouv ? detailFormation(f) : ""}
        </li>`;
      }).join("")}</ul>` : ""}
    </section>`;
  }

  function dessiner(el) {
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">L'arborescence</p>
        <h1>Où mène chaque domaine ?</h1>
        <p class="chapo">${A.lignes.length} domaines, ${A.formations.length} formations, ${A.metiers.length} métiers. Choisis ton bac : les formations sont rangées de la plus accessible à la moins accessible.</p>
      </section>
      <div class="plan-bac" role="group" aria-label="Ton bac">
        ${A.bacs.map(b => `<button type="button" class="seg" data-bac="${b.id}" aria-pressed="${vue.bac === b.id}">${b.nom}</button>`).join("")}
      </div>
      <p class="conseil-bac">${CONSEIL[vue.bac]} <span id="conseil-chiffres"></span></p>
      <ul class="legende-acces">${A.acces.slice().reverse().map(a => `<li>${A.tagAcces(a.niv)}</li>`).join("")}</ul>
      <div class="domaines">${A.lignes.map(carteDomaine).join("")}</div>`;
  }

  function chiffresConseil() {
    A.donnees("parcoursup-stats").then(st => {
      const z = A.$("#conseil-chiffres"), f = st.filieres;
      if (!z || !f.BTS || !f.BUT) return;
      const k = { g: "partGen", t: "partTec", p: "partPro" }[vue.bac];
      const nom = { g: "bacs généraux", t: "bacs techno", p: "bacs pro" }[vue.bac];
      z.textContent = `Sur Parcoursup ${st.session}, les ${nom} représentaient ${Math.round(f.BTS[k])} % des admis en BTS, ${Math.round(f.BUT[k])} % en BUT et ${Math.round(f.Licence[k])} % en licence.`;
    }).catch(() => {});
  }

  A.pages.plan = function (el) {
    if (!vue.bac) vue.bac = (A.etat.profil && A.etat.profil.bac) || "g";
    dessiner(el);
    chiffresConseil();
    el.onclick = ev => {
      const t = ev.target.closest("[data-bac], [data-domaine], [data-formation]");
      if (!t) return;
      if (t.dataset.bac) vue.bac = t.dataset.bac;
      else if (t.dataset.domaine) { vue.domaine = vue.domaine === t.dataset.domaine ? null : t.dataset.domaine; vue.formation = null; }
      else if (t.dataset.formation) vue.formation = vue.formation === t.dataset.formation ? null : t.dataset.formation;
      const y = window.scrollY;
      dessiner(el);
      chiffresConseil();
      window.scrollTo(0, y);
      const btn = A.$(`[data-domaine="${vue.domaine}"], [data-formation="${vue.formation}"]`, el);
      if (btn && !t.dataset.bac) btn.focus({ preventScroll: true });
    };
  };
})();
