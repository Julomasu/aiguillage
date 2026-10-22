/* Le plan : l'arborescence Bac → ligne (domaine) → gare (formation) → terminus (métier). */
(function () {
  const vue = { bac: null, ligne: null, gare: null };
  const W = 760, H = 640, CX = 380, CY = 320, R0 = 62, R1 = 250;

  const CONSEIL = {
    g: "Avec un bac général, presque tout est ouvert : ce sont surtout tes spécialités qui comptent. Pense aussi aux BUT et aux BTS, pas seulement à la fac.",
    t: "Bac techno : environ la moitié des places de BUT te sont réservées, et des prépas existent rien que pour toi (TSI, ECT, TB).",
    p: "Bac pro : chaque BTS public te réserve des places, et tu peux le faire en alternance. C'est là que les bacs pro réussissent le mieux, et rien n'empêche de continuer après."
  };

  const gares = ligneId => A.formations
    .filter(f => f.lignes.includes(ligneId))
    .sort((a, b) => b.acces[vue.bac] - a.acces[vue.bac] || A.types.indexOf(A.typeParId[a.type]) - A.types.indexOf(A.typeParId[b.type]));

  function angle(i) { return (-90 + i * 360 / A.lignes.length) * Math.PI / 180; }

  function plan() {
    let svg = "";
    A.lignes.forEach((l, i) => {
      const a = angle(i), liste = gares(l.id), actif = vue.ligne === l.id, attenue = vue.ligne && !actif;
      const pas = (R1 - R0) / Math.max(1, liste.length - 1);
      const xEnd = CX + Math.cos(a) * (R1 + 22), yEnd = CY + Math.sin(a) * (R1 + 22);
      let points = "";
      liste.forEach((f, j) => {
        const r = R0 + j * pas, x = CX + Math.cos(a) * r, y = CY + Math.sin(a) * r;
        const acc = f.acces[vue.bac];
        points += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${actif ? 8 : 6}" class="pl-gare acc-svg-${acc} ${vue.gare === f.id && actif ? "pl-gare-choisie" : ""}" stroke="${l.couleur}"><title>${A.e(f.nom)} · ${A.acces[acc].label}</title></circle>`;
      });
      const cos = Math.cos(a);
      const ancre = Math.abs(cos) < 0.3 ? "middle" : cos > 0 ? "start" : "end";
      const xT = CX + Math.cos(a) * (R1 + 46), yT = CY + Math.sin(a) * (R1 + 46) + 5;
      svg += `<g class="pl-ligne ${actif ? "actif" : ""} ${attenue ? "attenue" : ""}" data-ligne="${l.id}" role="button" tabindex="0" aria-label="Ligne ${l.num} : ${A.e(l.nom)}" aria-pressed="${actif}">
        <line x1="${CX}" y1="${CY}" x2="${xEnd.toFixed(1)}" y2="${yEnd.toFixed(1)}" stroke="${l.couleur}" class="pl-trait"/>
        <line x1="${CX}" y1="${CY}" x2="${xEnd.toFixed(1)}" y2="${yEnd.toFixed(1)}" class="pl-zone"/>
        ${points}
        <circle cx="${xEnd.toFixed(1)}" cy="${yEnd.toFixed(1)}" r="15" fill="${l.couleur}"/>
        <text x="${xEnd.toFixed(1)}" y="${(yEnd + 5).toFixed(1)}" text-anchor="middle" class="pl-num" fill="${l.texte}">${l.num}</text>
        <text x="${xT.toFixed(1)}" y="${yT.toFixed(1)}" text-anchor="${ancre}" class="pl-nom">${A.e(l.court)}</text>
      </g>`;
    });
    const bacNom = A.bacs.find(b => b.id === vue.bac).nom.replace("Bac ", "");
    return `<svg class="plan-svg" viewBox="0 0 ${W} ${H}" aria-labelledby="plan-titre-svg">
      <title id="plan-titre-svg">Plan des études : 10 lignes partent de ton bac</title>
      ${svg}
      <circle cx="${CX}" cy="${CY}" r="${R0 - 22}" class="pl-centre"/>
      <text x="${CX}" y="${CY - 3}" text-anchor="middle" class="pl-centre-t">BAC</text>
      <text x="${CX}" y="${CY + 14}" text-anchor="middle" class="pl-centre-s">${A.e(bacNom)}</text>
    </svg>`;
  }

  function panneau() {
    if (!vue.ligne) {
      return `<div class="panneau-vide">
        <p class="surtitre">Comment lire le plan</p>
        <p>Chaque ligne colorée est un grand domaine. Chaque gare est une formation, rangée de la plus accessible à la moins accessible depuis ton bac. Choisis une ligne pour voir ses gares et les métiers au terminus.</p>
        <ul class="legende-acces">${A.acces.slice().reverse().map(a => `<li>${A.tagAcces(a.niv)}</li>`).join("")}</ul>
      </div>`;
    }
    const l = A.ligneParId[vue.ligne], liste = gares(l.id);
    const f = vue.gare && A.formationParId[vue.gare];
    return `<div class="panneau-ligne" style="--c:${l.couleur};--ct:${l.texte}">
      <div class="pan-tete"><span class="pan-num">${l.num}</span><div><p class="surtitre">Ligne ${l.num}</p><h2>${A.e(l.nom)}</h2></div></div>
      <nav class="fil" aria-label="Ton trajet">
        <span>${A.e(A.bacs.find(b => b.id === vue.bac).nom)}</span><span aria-hidden="true">→</span>
        <span>${A.e(l.court)}</span>${f ? `<span aria-hidden="true">→</span><strong>${A.e(f.nom)}</strong>` : ""}
      </nav>
      <ol class="gares">${liste.map(g => {
        const ouvert = vue.gare === g.id, type = A.typeParId[g.type];
        const metiers = (A.metiersDeFormation[g.id] || []).map(id => A.metierParId[id]);
        return `<li class="gare acc-l-${g.acces[vue.bac]} ${ouvert ? "ouverte" : ""}">
          <button type="button" class="gare-btn" data-gare="${g.id}" aria-expanded="${ouvert}">
            <span class="g-point" aria-hidden="true"></span>
            <span class="g-nom"><strong>${A.e(g.nom)}</strong><span>${A.e(type.nom)} · ${A.e(A.dureeFormation(g))}</span></span>
            ${A.tagAcces(g.acces[vue.bac])}
          </button>
          ${ouvert ? `<div class="gare-detail">
            <p>${A.e(g.desc)}</p>
            <p class="petit"><strong>Et après :</strong> ${A.e(g.apres)}</p>
            ${metiers.length ? `<p class="petit"><strong>Terminus :</strong></p><div class="terminus">${metiers.map(m => `<a class="chip-metier" href="#metier-${m.id}"><span aria-hidden="true">${m.emoji}</span>${A.e(m.nom)}</a>`).join("")}</div>` : ""}
            <a class="lien-fleche" href="#formation-${g.id}">Fiche complète</a>
          </div>` : ""}
        </li>`;
      }).join("")}</ol>
    </div>`;
  }

  function dessiner(el) {
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">L'arborescence</p>
        <h1>Le plan des études</h1>
        <p class="chapo">Ton bac au centre, dix lignes, ${A.formations.length} formations, ${A.metiers.length} métiers au terminus.</p>
      </section>
      <div class="plan-bac" role="group" aria-label="Ton bac">
        ${A.bacs.map(b => `<button type="button" class="seg" data-bac="${b.id}" aria-pressed="${vue.bac === b.id}">${b.nom}</button>`).join("")}
      </div>
      <p class="conseil-bac">${CONSEIL[vue.bac]} <span id="conseil-chiffres"></span></p>
      <div class="plan-zone">
        <div class="plan-carte">
          <div class="plan-svg-boite">${plan()}</div>
          <div class="puces puces-lignes" role="group" aria-label="Choisir une ligne">
            ${A.lignes.map(l => `<button type="button" class="puce puce-ligne" data-ligne="${l.id}" aria-pressed="${vue.ligne === l.id}" style="--c:${l.couleur};--ct:${l.texte}"><b>${l.num}</b>${A.e(l.court)}${A.etat.lignes.includes(l.id) ? ' <span class="vu" aria-label="explorée">✓</span>' : ""}</button>`).join("")}
          </div>
        </div>
        <div class="plan-panneau" id="panneau" aria-live="polite">${panneau()}</div>
      </div>`;
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

  function choisirLigne(el, id) {
    vue.ligne = vue.ligne === id ? null : id;
    vue.gare = null;
    if (vue.ligne) {
      A.ajouterUnique(A.etat.lignes, id);
      A.sauver();
      A.gagner(10, "ligne-" + id, "Ligne explorée : " + A.ligneParId[id].court);
      A.verifierTampons();
    }
    dessiner(el);
    chiffresConseil();
    if (vue.ligne && window.matchMedia("(max-width: 900px)").matches) {
      A.$("#panneau").scrollIntoView({ behavior: document.documentElement.classList.contains("calme") ? "auto" : "smooth", block: "start" });
    }
  }

  A.pages.plan = function (el) {
    if (!vue.bac) vue.bac = (A.etat.profil && A.etat.profil.bac) || "g";
    dessiner(el);
    chiffresConseil();
    el.onclick = ev => {
      const t = ev.target.closest("[data-bac], [data-ligne], [data-gare]");
      if (!t) return;
      if (t.dataset.bac) { vue.bac = t.dataset.bac; dessiner(el); chiffresConseil(); return; }
      if (t.dataset.ligne) { choisirLigne(el, t.dataset.ligne); return; }
      if (t.dataset.gare) {
        vue.gare = vue.gare === t.dataset.gare ? null : t.dataset.gare;
        const id = vue.gare;
        A.$("#panneau").innerHTML = panneau();
        A.$(".plan-svg-boite").innerHTML = plan();
        const btn = id && A.$(`[data-gare="${id}"]`);
        if (btn) btn.focus({ preventScroll: true });
      }
    };
    el.onkeydown = ev => {
      const g = ev.target.closest("g[data-ligne]");
      if (g && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); choisirLigne(el, g.dataset.ligne); }
    };
  };
})();
