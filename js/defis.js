/* Défis de la semaine : 3 défis par semaine, les mêmes pour tout le monde (tirés de façon déterministe),
   validés automatiquement quand l'élève fait l'action. Sans serveur : tout est sur l'appareil. */
(function () {
  const POOL = [
    { id: "metiers3", t: "Lis 3 fiches métiers", n: 3, cle: "metier" },
    { id: "lignes3", t: "Explore 3 lignes différentes du plan", n: 3, cle: "ligne" },
    { id: "ligne-x", t: null, n: 3, cle: null },            // défi dynamique : 3 métiers d'une ligne donnée
    { id: "mots5", t: "Décode 5 mots du jargon", n: 5, cle: "mot" },
    { id: "formations2", t: "Regarde 2 fiches formations", n: 2, cle: "formation" },
    { id: "quiz", t: "Termine le vrai ou faux", n: 1, cle: "quiz" },
    { id: "carte", t: "Cherche des formations près de chez toi sur la carte", n: 1, cle: "carte" },
    { id: "budget", t: "Simule ton budget étudiant", n: 1, cle: "budget" },
    { id: "comparer", t: "Compare des formations précises", n: 1, cle: "comparer" },
    { id: "reseau", t: "Valide une étape du tuto LinkedIn", n: 1, cle: "reseau" },
    { id: "jpo", t: "Ajoute une porte ouverte à ton planning", n: 1, cle: "jpo" },
    { id: "assistant", t: "Pose une question à l'assistant", n: 1, cle: "assistant" },
    { id: "test", t: "Fais (ou refais) le test d'orientation", n: 1, cle: "test" }
  ];

  /* Numéro de semaine ISO : « 2026-W43 » (le lundi est le premier jour) */
  A.semaineId = function (date) {
    const d = new Date(Date.UTC((date || new Date()).getFullYear(), (date || new Date()).getMonth(), (date || new Date()).getDate()));
    const jour = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - jour);
    const debutAnnee = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const sem = Math.ceil(((d - debutAnnee) / 86400000 + 1) / 7);
    return `${d.getUTCFullYear()}-W${String(sem).padStart(2, "0")}`;
  };

  function graine(id) { let h = 2166136261; for (const c of id) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  function alea(g) { return () => { g |= 0; g = g + 0x6D2B79F5 | 0; let t = Math.imul(g ^ g >>> 15, 1 | g); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  /* Les 3 défis d'une semaine */
  A.defisDe = function (semaine) {
    const r = alea(graine(semaine));
    const pool = POOL.slice();
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    return pool.slice(0, 3).map(d => {
      if (d.id !== "ligne-x") return d;
      const l = A.lignes[Math.floor(r() * A.lignes.length)];
      return { id: "ligne-" + l.id, t: `Découvre 3 métiers de la ligne ${l.num} (${l.court})`, n: 3, cle: "metier-" + l.id };
    });
  };

  function etatSemaine() {
    const id = A.semaineId();
    const s = A.etat;
    if (!s.semaine || s.semaine.id !== id) s.semaine = { id, faits: {}, valides: [] };
    if (!s.defis) s.defis = { total: 0, semaines: [] };
    return s.semaine;
  }

  /* Série : nombre de semaines consécutives (en comptant la semaine en cours si elle a déjà un défi) avec au moins un défi réussi */
  A.serieDefis = function () {
    const sem = (A.etat.defis && A.etat.defis.semaines) || [];
    let n = 0, d = new Date();
    if (!sem.includes(A.semaineId(d))) d.setDate(d.getDate() - 7);
    while (sem.includes(A.semaineId(d))) { n++; d.setDate(d.getDate() - 7); }
    return n;
  };

  A.progressionDefi = function (defi) {
    const s = etatSemaine();
    return Math.min(defi.n, (s.faits[defi.cle] || []).length);
  };

  /* À appeler quand l'élève fait quelque chose : A.activite("metier", "infirmier") */
  A.activite = function (cle, valeur) {
    const s = etatSemaine();
    const liste = s.faits[cle] || (s.faits[cle] = []);
    const v = String(valeur == null ? "x" : valeur);
    if (!liste.includes(v)) { liste.push(v); A.sauver(); }
    A.defisDe(s.id).forEach(d => {
      if (s.valides.includes(d.id) || (s.faits[d.cle] || []).length < d.n) return;
      s.valides.push(d.id);
      A.etat.defis.total++;
      if (!A.etat.defis.semaines.includes(s.id)) A.etat.defis.semaines.push(s.id);
      A.sauver();
      A.gagner(25, "defi-" + s.id + "-" + d.id, false);
      setTimeout(() => A.toast("Défi réussi !", d.t, "🎯"), 500);
      A.tamponner("defi");
      if (A.serieDefis() >= 3) A.tamponner("serie");
    });
  };

  A.blocDefis = function (compact) {
    const s = etatSemaine(), defis = A.defisDe(s.id), serie = A.serieDefis();
    const jours = 7 - ((new Date().getDay() + 6) % 7);
    return `<section class="defis ${compact ? "defis-compact" : ""}" aria-label="Défis de la semaine">
      <div class="defis-tete"><div><p class="surtitre">Défis de la semaine</p><p class="petit">${jours > 1 ? `Encore ${jours} jours` : "Dernier jour"} · ${serie ? `série de ${serie} semaine${serie > 1 ? "s" : ""}` : "relève un défi pour lancer ta série"}</p></div>
        ${compact ? `<a class="lien-fleche" href="#defis">Tout voir</a>` : ""}</div>
      <ul class="defis-liste">${defis.map(d => {
        const fait = s.valides.includes(d.id), p = A.progressionDefi(d);
        return `<li class="defi ${fait ? "fait" : ""}"><span class="defi-coche" aria-hidden="true">${fait ? "✓" : ""}</span>
          <div><strong>${A.e(d.t)}</strong>${d.n > 1 ? `<span class="petit">${p}/${d.n}</span>` : ""}
            ${d.n > 1 ? `<span class="ins-jauge"><i style="width:${p / d.n * 100}%;background:var(--signal)"></i></span>` : ""}</div>
          <span class="defi-km">${fait ? "+25 km" : "25 km"}</span></li>`;
      }).join("")}</ul></section>`;
  };

  A.pages.defis = function (el) {
    const s = etatSemaine();
    const faits = A.etat.defis.total;
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Reviens chaque semaine</p>
        <h1>Les défis de la semaine</h1>
        <p class="chapo">Trois petits défis qui changent chaque lundi. Ils se valident tout seuls quand tu fais l'action. Chaque défi rapporte 25 km.</p>
      </section>
      ${A.blocDefis(false)}
      <section class="bloc stats-carnet">
        <div><strong>${faits}</strong><span>défis réussis en tout</span></div>
        <div><strong>${A.serieDefis()}</strong><span>semaine(s) de suite</span></div>
        <div><strong>${s.valides.length}/3</strong><span>cette semaine</span></div>
      </section>
      <section class="bloc">
        <h2>Pour aller plus loin</h2>
        <div class="actions"><a class="btn btn-ligne" href="#metiers">Les métiers</a><a class="btn btn-ligne" href="#plan">Le plan</a><a class="btn btn-ligne" href="#carte">La carte</a><a class="btn btn-ligne" href="#decodeur">Le décodeur</a></div>
      </section>`;
  };
})();
