/* Le test d'orientation (modèle RIASEC de Holland) et la page de résultats. */
(function () {
  const ORDRE = ["R", "I", "A", "S", "E", "C"];
  let t = null; // état du test en cours (non sauvegardé tant qu'il n'est pas fini)

  function nouveauTest() {
    const p = A.etat.profil;
    return { etape: 0, bac: p ? p.bac : null, specs: p ? p.specs.slice() : [], serie: p ? p.serie : null,
      rep: new Array(A.questions.length).fill(null), duree: null, alternance: null };
  }

  A.pages.test = function (el) {
    if (!t) t = nouveauTest();
    dessiner(el);
  };

  function lignePro() {
    const total = A.questions.length;
    const courant = t.etape - 1;
    let gares = "";
    for (let i = 0; i < total; i++) {
      const etat = i < courant ? "faite" : i === courant ? "ici" : "";
      gares += `<span class="tl-gare ${etat}"></span>`;
    }
    return `<div class="tl" aria-hidden="true"><span class="tl-rail" style="--p:${Math.max(0, courant) / (total - 1)}"></span>${gares}</div>`;
  }

  function dessiner(el) {
    const nbQ = A.questions.length;
    if (t.etape === 0) {
      el.innerHTML = `
        <section class="test">
          <p class="surtitre">Le test · étape 1 sur 3</p>
          <h1>D'où pars-tu ?</h1>
          <p class="chapo">Ton bac change les portes qui s'ouvrent facilement. On s'en sert pour te proposer des formations réalistes, pas pour te limiter.</p>
          <fieldset class="groupe">
            <legend>Ton bac (ou celui que tu prépares)</legend>
            <div class="choix-grands">
              ${[["g", "Général", "Avec des spécialités"], ["t", "Technologique", "STMG, STI2D, ST2S…"], ["p", "Professionnel", "Bac pro"], ["x", "Pas encore choisi", "Je suis en seconde"]].map(([id, nom, d]) =>
                `<button type="button" class="choix" data-bac="${id}" aria-pressed="${t.bac === id}"><strong>${nom}</strong><span>${d}</span></button>`).join("")}
            </div>
          </fieldset>
          ${t.bac === "g" ? `
          <fieldset class="groupe">
            <legend>Tes spécialités <span class="petit">(jusqu'à 3)</span></legend>
            <div class="puces">${A.specialites.map(s => `<button type="button" class="puce" data-spec="${s.id}" aria-pressed="${t.specs.includes(s.id)}">${A.e(s.nom)}</button>`).join("")}</div>
          </fieldset>` : ""}
          ${t.bac === "t" ? `
          <fieldset class="groupe">
            <legend>Ta série</legend>
            <div class="puces">${A.series.map(s => `<button type="button" class="puce" data-serie="${s.id}" aria-pressed="${t.serie === s.id}" title="${A.e(s.detail)}">${s.nom}</button>`).join("")}</div>
          </fieldset>` : ""}
          <div class="actions">
            <button type="button" class="btn btn-signal" data-suivant ${t.bac ? "" : "disabled"}>C'est parti</button>
          </div>
        </section>`;
    } else if (t.etape <= nbQ) {
      const i = t.etape - 1, q = A.questions[i];
      el.innerHTML = `
        <section class="test">
          <p class="surtitre">Le test · étape 2 sur 3 · situation ${i + 1}/${nbQ}</p>
          ${lignePro()}
          <div class="carte-q" data-index="${i}">
            <span class="cq-emoji" aria-hidden="true">${q.e}</span>
            <h1 class="cq-titre"><span class="petit">Ça te plairait de…</span>${A.e(q.t)} ?</h1>
          </div>
          <div class="reponses" role="group" aria-label="Ta réponse">
            ${A.reponses.map((r, k) => `<button type="button" class="rep" data-rep="${r.v}" aria-pressed="${t.rep[i] === r.v}"><kbd>${k + 1}</kbd>${r.label}</button>`).join("")}
          </div>
          <div class="actions actions-discret">
            <button type="button" class="btn-texte" data-precedent>← Situation précédente</button>
          </div>
        </section>`;
    } else {
      el.innerHTML = `
        <section class="test">
          <p class="surtitre">Le test · étape 3 sur 3</p>
          <h1>Dernières préférences</h1>
          <fieldset class="groupe">
            <legend>Combien de temps d'études après le bac ?</legend>
            <div class="puces">${[["court", "2-3 ans, je veux bosser vite"], ["moyen", "3 à 5 ans"], ["long", "5 ans et plus, ça me va"], ["nsp", "Je ne sais pas"]].map(([v, l]) =>
              `<button type="button" class="puce" data-duree="${v}" aria-pressed="${t.duree === v}">${l}</button>`).join("")}</div>
          </fieldset>
          <fieldset class="groupe">
            <legend>L'alternance (école + entreprise, payé·e) ?</legend>
            <div class="puces">${[["oui", "Oui, carrément"], ["peut-etre", "Pourquoi pas"], ["non", "Non merci"]].map(([v, l]) =>
              `<button type="button" class="puce" data-alt="${v}" aria-pressed="${t.alternance === v}">${l}</button>`).join("")}</div>
          </fieldset>
          <div class="actions">
            <button type="button" class="btn-texte" data-precedent>← Retour</button>
            <button type="button" class="btn btn-signal" data-finir ${t.duree && t.alternance ? "" : "disabled"}>Voir mon trajet</button>
          </div>
        </section>`;
    }
    brancher(el);
  }

  function brancher(el) {
    el.onclick = ev => {
      const b = ev.target.closest("button");
      if (!b || b.disabled) return;
      if (b.dataset.bac) { t.bac = b.dataset.bac; dessiner(el); return; }
      if (b.dataset.spec) {
        const id = b.dataset.spec, i = t.specs.indexOf(id);
        if (i >= 0) t.specs.splice(i, 1); else if (t.specs.length < 3) t.specs.push(id);
        dessiner(el); return;
      }
      if (b.dataset.serie) { t.serie = b.dataset.serie; dessiner(el); return; }
      if ("suivant" in b.dataset) { t.etape = 1; dessiner(el); focusQ(el); return; }
      if (b.dataset.rep) { repondre(el, Number(b.dataset.rep)); return; }
      if ("precedent" in b.dataset) { t.etape = Math.max(0, t.etape - 1); dessiner(el); focusQ(el); return; }
      if (b.dataset.duree) { t.duree = b.dataset.duree; dessiner(el); return; }
      if (b.dataset.alt) { t.alternance = b.dataset.alt; dessiner(el); return; }
      if ("finir" in b.dataset) finir();
    };
  }

  function focusQ(el) {
    const h = A.$("h1", el);
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }

  function repondre(el, v) {
    const i = t.etape - 1;
    t.rep[i] = v;
    const carte = A.$(".carte-q", el);
    if (carte && !document.documentElement.classList.contains("calme")) {
      carte.classList.add(v >= 2 ? "part-droite" : "part-gauche");
      setTimeout(() => { t.etape++; dessiner(el); focusQ(el); }, 220);
    } else { t.etape++; dessiner(el); focusQ(el); }
  }

  /* Raccourcis clavier 1-4 pendant les questions */
  document.addEventListener("keydown", ev => {
    if (!t || A.lireHash().page !== "test" || t.etape < 1 || t.etape > A.questions.length) return;
    if (ev.target.closest("input, textarea")) return;
    const k = Number(ev.key);
    if (k >= 1 && k <= 4) repondre(A.$("#app"), A.reponses[k - 1].v);
  });

  function finir() {
    const brut = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }, max = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    A.questions.forEach((q, i) => { brut[q.d] += t.rep[i] || 0; max[q.d] += 3; });
    const scores = {};
    ORDRE.forEach(d => { scores[d] = Math.round(brut[d] / max[d] * 100); });
    // Départage stable : en cas d'égalité, l'ordre de l'hexagone de Holland
    const tri = ORDRE.slice().sort((a, b) => scores[b] - scores[a] || ORDRE.indexOf(a) - ORDRE.indexOf(b));
    A.etat.profil = {
      scores, code: tri[0] + tri[1],
      bac: t.bac === "x" ? "g" : t.bac, bacChoisi: t.bac !== "x",
      specs: t.bac === "g" ? t.specs : [], serie: t.bac === "t" ? t.serie : null,
      duree: t.duree, alternance: t.alternance, date: Date.now()
    };
    A.ajouterUnique(A.etat.check, "c2");
    A.sauver();
    A.gagner(80, "test", "Test terminé, ton profil est prêt");
    A.verifierTampons();
    t = null;
    A.aller("resultat");
  }

  /* ——— Résultats */
  function radar(scores) {
    const c = 130, r = 96;
    const pt = (i, k) => {
      const a = (-90 + i * 60) * Math.PI / 180;
      return [c + Math.cos(a) * r * k, c + Math.sin(a) * r * k];
    };
    const grille = [0.33, 0.66, 1].map(k => `<polygon class="rd-grille" points="${ORDRE.map((_, i) => pt(i, k).map(v => v.toFixed(1)).join(",")).join(" ")}"/>`).join("");
    const axes = ORDRE.map((_, i) => { const [x, y] = pt(i, 1); return `<line class="rd-axe" x1="${c}" y1="${c}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join("");
    const forme = ORDRE.map((d, i) => pt(i, Math.max(0.06, scores[d] / 100)).map(v => v.toFixed(1)).join(",")).join(" ");
    const etiquettes = ORDRE.map((d, i) => {
      const [x, y] = pt(i, 1.2);
      return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle" class="rd-lettre">${d}</text>`;
    }).join("");
    const points = ORDRE.map((d, i) => { const [x, y] = pt(i, Math.max(0.06, scores[d] / 100)); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${A.profils[d].couleur}" class="rd-point"/>`; }).join("");
    return `<svg class="radar" viewBox="0 0 260 260" role="img" aria-label="Ton profil : ${ORDRE.map(d => A.profils[d].nom + " " + scores[d] + "%").join(", ")}">${grille}${axes}<polygon class="rd-forme" points="${forme}"/>${points}${etiquettes}</svg>`;
  }

  A.recommandations = function (profil) {
    const metiers = A.metiers.map(m => ({ m, c: A.compatibilite(m, profil) }))
      .sort((a, b) => b.c - a.c).slice(0, 8);
    const cand = {};
    metiers.forEach(({ m }, rang) => m.formations.forEach(fid => {
      const f = A.formationParId[fid];
      cand[fid] = Math.max(cand[fid] || 0, A.scoreFormation(f, profil) + (8 - rang) * 2);
    }));
    const formations = Object.entries(cand).sort((a, b) => b[1] - a[1])
      .map(([id]) => A.formationParId[id]).filter(f => f.acces[profil.bac] > 0).slice(0, 6);
    return { metiers, formations };
  };

  A.pages.resultat = function (el) {
    const p = A.etat.profil;
    if (!p) {
      el.innerHTML = `<section class="vide"><h1>Pas encore de profil</h1><p>Fais le test pour découvrir les métiers et formations qui te correspondent.</p><a class="btn btn-signal" href="#test">Faire le test</a></section>`;
      return;
    }
    const [a, b] = p.code.split("");
    const { metiers, formations } = A.recommandations(p);
    const bacNom = p.bacChoisi === false ? "bac pas encore choisi (on a pris le bac général comme repère)" :
      p.bac === "g" ? "bac général" + (p.specs.length ? " · " + p.specs.map(id => A.specialites.find(s => s.id === id).nom).join(", ") : "") :
      p.bac === "t" ? "bac techno" + (p.serie ? " " + p.serie : "") : "bac pro";
    el.innerHTML = `
      <section class="resultat-tete">
        <div>
          <p class="surtitre">Ton profil</p>
          <h1><span class="code-profil">${p.code}</span> ${A.e(A.profils[a].nom)} & ${A.e(A.profils[b].nom)}</h1>
          <p class="chapo">${A.e(A.profils[a].phrase)} ${A.e(A.profils[b].phrase)}</p>
          <p class="petit">Point de départ : ${A.e(bacNom)}.</p>
          <div class="actions">
            <a class="btn btn-signal" href="#plan">Voir sur le plan</a>
            <a class="btn btn-ligne" href="#test">Refaire le test</a>
          </div>
        </div>
        <div class="radar-boite">${radar(p.scores)}
          <ul class="legende-radar">${ORDRE.map(d => `<li><b style="color:${A.profils[d].couleur}">${d}</b> ${A.e(A.profils[d].nom)} <span>${p.scores[d]}%</span></li>`).join("")}</ul>
        </div>
      </section>

      <section class="bloc">
        <h2>Les métiers qui te ressemblent</h2>
        <div class="grille-metiers">${metiers.map(({ m, c }) => A.carteMetier(m, c)).join("")}</div>
      </section>

      <section class="bloc">
        <h2>Les formations à regarder de près</h2>
        <p class="petit">Classées selon ton bac, tes spécialités et tes préférences. L'étiquette indique à quel point la formation accueille des profils comme le tien.</p>
        <div class="liste-formations">${formations.map(f => A.ligneFormation(f, p.bac)).join("")}</div>
      </section>

      <aside class="encart">
        <strong>Comment lire ces résultats ?</strong>
        <p>Le test s'inspire du modèle RIASEC du psychologue John Holland, utilisé par beaucoup de conseiller·ères d'orientation. C'est une boussole, pas un verdict : tes goûts vont évoluer, et tu peux réussir dans un métier qui n'apparaît pas ici. Pour aller plus loin, prends rendez-vous avec le/la Psy-EN de ton lycée.</p>
      </aside>`;
  };
})();
