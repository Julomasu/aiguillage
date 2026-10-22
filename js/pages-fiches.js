/* Fiches métiers, fiches formations, types de formations et comparateur. */
(function () {
  const SMIC = 1867; // SMIC brut mensuel au 1er juin 2026, repère sur les jauges de salaire
  const ECHELLE = 8000;

  /* ——— Composants partagés */
  A.carteMetier = function (m, compat) {
    const l = A.ligneParId[m.ligne];
    const fav = A.etat.favs.includes(m.id);
    return `<a class="carte-metier" href="#metier-${m.id}" style="--c:${l.couleur}">
      <span class="cm-emoji" aria-hidden="true">${m.emoji}</span>
      <span class="cm-corps">
        <strong>${A.e(m.nom)}${fav ? ' <span class="etoile" aria-label="favori">★</span>' : ""}</strong>
        <span class="cm-meta">${A.e(m.etudes)} · dès ${A.euros(m.salaire[0])}</span>
      </span>
      ${compat != null ? `<span class="cm-compat" title="Compatibilité avec ton profil">${compat}%</span>` : A.pastilleLigne(m.ligne, false)}
    </a>`;
  };

  A.ligneFormation = function (f, bac) {
    const type = A.typeParId[f.type];
    return `<a class="ligne-formation" href="#formation-${f.id}">
      <span class="lf-lignes">${f.lignes.map(id => A.pastilleLigne(id, false)).join("")}</span>
      <span class="lf-corps"><strong>${A.e(f.nom)}</strong><span>${A.e(type.nom)} · ${A.e(A.dureeFormation(f))}</span></span>
      ${bac ? A.tagAcces(f.acces[bac]) : ""}
    </a>`;
  };

  function jaugeSalaire(m) {
    const pos = v => Math.min(100, v / ECHELLE * 100);
    return `<div class="salaire">
      <div class="sal-piste">
        <span class="sal-smic" style="left:${pos(SMIC)}%" title="SMIC brut mensuel"><i>SMIC</i></span>
        <span class="sal-barre" style="left:${pos(m.salaire[0])}%;width:${pos(m.salaire[1]) - pos(m.salaire[0])}%"></span>
        <span class="sal-pt" style="left:${pos(m.salaire[0])}%"></span>
        <span class="sal-pt sal-pt-fin" style="left:${pos(m.salaire[1])}%"></span>
      </div>
      <div class="sal-valeurs"><span><b>${A.euros(m.salaire[0])}</b> en début de carrière</span><span><b>${m.salaire[1] >= ECHELLE ? "+ de " : ""}${A.euros(m.salaire[1])}</b> confirmé·e</span></div>
      <p class="petit">Brut mensuel indicatif, hors primes. Ça varie selon la région, le secteur (public/privé) et le statut.</p>
    </div>`;
  }

  const RECRUTE = ["", "Peu de postes, beaucoup de candidat·es", "Recrutement stable", "Ça recrute fort"];

  /* ——— Liste des métiers */
  const filtres = { q: "", ligne: null, niveau: null, favs: false };

  A.pages.metiers = function (el) {
    const p = A.etat.profil;
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">${A.metiers.length} fiches métiers</p>
        <h1>Les métiers</h1>
        <p class="chapo">Ce qu'on fait vraiment, combien on gagne, comment on y arrive.${p ? " Triés selon ta compatibilité." : ""}</p>
      </section>
      <div class="filtres">
        <label class="recherche"><span class="sr">Chercher un métier</span>
          <input id="q-metier" type="search" placeholder="Chercher : infirmier, code, avion…" value="${A.e(filtres.q)}" autocomplete="off">
        </label>
        <div class="puces puces-lignes" role="group" aria-label="Filtrer par domaine">
          <button type="button" class="puce" data-fl="" aria-pressed="${!filtres.ligne}">Tous</button>
          ${A.lignes.map(l => `<button type="button" class="puce puce-ligne" data-fl="${l.id}" aria-pressed="${filtres.ligne === l.id}" style="--c:${l.couleur};--ct:${l.texte}"><b>${l.num}</b>${A.e(l.court)}</button>`).join("")}
        </div>
        <div class="puces" role="group" aria-label="Filtrer par durée d'études">
          ${[["", "Toutes durées"], ["court", "Bac à bac+2"], ["moyen", "Bac+3"], ["long", "Bac+5 et +"]].map(([v, l]) => `<button type="button" class="puce" data-fn="${v}" aria-pressed="${(filtres.niveau || "") === v}">${l}</button>`).join("")}
          <button type="button" class="puce" data-ff aria-pressed="${filtres.favs}">★ Mes favoris</button>
        </div>
      </div>
      <p class="petit" id="nb-metiers" aria-live="polite"></p>
      <div class="grille-metiers" id="grille-metiers"></div>
      <section class="bloc rome" id="rome-zone">
        <h2>Tu ne trouves pas ton métier ?</h2>
        <p class="petit">Tape au moins 3 lettres dans la recherche : on cherche aussi dans les 14 325 intitulés du répertoire officiel des métiers (ROME, France Travail).</p>
      </section>`;

    const maj = () => {
      const q = filtres.q.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      let liste = A.metiers.filter(m => {
        if (filtres.ligne && m.ligne !== filtres.ligne) return false;
        if (filtres.niveau === "court" && m.niveau > 2) return false;
        if (filtres.niveau === "moyen" && m.niveau !== 3) return false;
        if (filtres.niveau === "long" && m.niveau < 5) return false;
        if (filtres.favs && !A.etat.favs.includes(m.id)) return false;
        if (q) {
          const txt = (m.nom + " " + m.accroche + " " + m.competences.join(" ")).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
          if (!txt.includes(q)) return false;
        }
        return true;
      });
      const avecCompat = liste.map(m => ({ m, c: A.compatibilite(m, p) }));
      if (p) avecCompat.sort((a, b) => b.c - a.c);
      A.$("#grille-metiers").innerHTML = avecCompat.length
        ? avecCompat.map(({ m, c }) => A.carteMetier(m, c)).join("")
        : `<p class="vide-inline">Aucun métier ne correspond. Essaie d'enlever un filtre.</p>`;
      A.$("#nb-metiers").textContent = `${avecCompat.length} métier${avecCompat.length > 1 ? "s" : ""}`;
      majRome(q);
    };

    A.$("#q-metier").addEventListener("input", ev => { filtres.q = ev.target.value; maj(); });
    el.onclick = ev => {
      const b = ev.target.closest("button");
      if (!b) return;
      const groupe = b.parentElement;
      if ("fl" in b.dataset) filtres.ligne = b.dataset.fl || null;
      else if ("fn" in b.dataset) filtres.niveau = b.dataset.fn || null;
      else if ("ff" in b.dataset) filtres.favs = !filtres.favs;
      else return;
      if ("ff" in b.dataset) b.setAttribute("aria-pressed", String(filtres.favs));
      else A.$$("button:not([data-ff])", groupe).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      maj();
    };
    maj();
  };

  /* Recherche dans le ROME : intitulés regroupés par fiche officielle */
  let tempoRome;
  function majRome(q) {
    clearTimeout(tempoRome);
    const zone = A.$("#rome-zone");
    if (!zone) return;
    const intro = `<h2>Tu ne trouves pas ton métier ?</h2>`;
    if (q.length < 3) {
      zone.innerHTML = intro + `<p class="petit">Tape au moins 3 lettres dans la recherche : on cherche aussi dans les 14 325 intitulés du répertoire officiel des métiers (ROME, France Travail).</p>`;
      return;
    }
    tempoRome = setTimeout(() => A.donnees("rome").then(rome => {
      const mots = q.split(/\s+/).filter(Boolean);
      const parFiche = new Map();
      for (const [titre, code] of rome.appellations) {
        const t = A.sansAccents(titre);
        if (mots.every(m => t.includes(m))) {
          if (!parFiche.has(code)) parFiche.set(code, []);
          parFiche.get(code).push(titre);
        }
        if (parFiche.size >= 40) break;
      }
      const fiches = [...parFiche.entries()].slice(0, 12);
      zone.innerHTML = `<h2>Dans le répertoire officiel des métiers</h2>
        <p class="petit">${parFiche.size ? `${parFiche.size}${parFiche.size >= 40 ? "+" : ""} fiche${parFiche.size > 1 ? "s" : ""} ROME correspondent à « ${A.e(q)} ».` : `Aucun intitulé officiel ne contient « ${A.e(q)} ». Essaie un mot plus général (ex. « finance », « banque »).`} Ces fiches sont plus succinctes que les nôtres : elles décrivent le métier, les compétences et les débouchés.</p>
        <div class="rome-liste">${fiches.map(([code, titres]) => {
          const [nom, ligne] = rome.fiches[code];
          return `<article class="rome-fiche">
            <div class="rome-tete">${A.pastilleLigne(ligne, false)}<strong>${A.e(nom)}</strong><span class="rome-code">${code}</span></div>
            <p class="petit">${titres.slice(0, 4).map(A.e).join(" · ")}${titres.length > 4 ? ` · +${titres.length - 4}` : ""}</p>
            <div class="rome-liens">
              <a class="lien-fleche" href="https://candidat.francetravail.fr/metierscope/fiche-metier/${code}" target="_blank" rel="noopener">Fiche France Travail</a>
              <a class="lien-fleche" href="https://www.onisep.fr/recherche?text=${encodeURIComponent(nom.split(" / ")[0])}" target="_blank" rel="noopener">Onisep</a>
            </div>
          </article>`;
        }).join("")}</div>
        <p class="petit">Source : ROME 4.0, France Travail (Licence Ouverte).</p>`;
    }).catch(() => { zone.innerHTML = intro + A.messageErreurDonnees; }), 250);
  }

  /* ——— Employeurs, accès concret, réseau et savoirs (js/data/metiers-acces-*.js) */
  const NET = [null, ["Peu important", "Le dossier et les diplômes suffisent."], ["Utile", "Un contact aide, sans être indispensable."], ["Décisif", "Beaucoup d'embauches passent par le réseau."]];

  function blocAcces(m) {
    const d = (A.METIERS_ACCES || {})[m.id];
    if (!d) return "";
    const tst = (d.tst || (A.TESTS_METIERS || {})[m.id] || []).map(id => (A.TESTS || []).find(t => t.id === id)).filter(Boolean);
    const net = NET[d.net[0]];
    return `
        <section class="bloc bloc-acces">
          <h2>Qui recrute</h2>
          <div class="emp-groupes">${d.emp.map(([t, l]) => `<div class="emp-groupe"><h3>${A.e(t)}</h3><p>${A.e(l)}</p></div>`).join("")}</div>
          <p class="petit">Liste indicative et non exhaustive. Vérifie les offres actuelles sur les sites carrière des entreprises.</p>
        </section>

        <section class="bloc bloc-acces">
          <h2>Comment y entrer, concrètement</h2>
          <div class="reseau-jauge" role="group" aria-label="Importance du réseau">
            <span class="petit">Poids du réseau</span>
            <strong>${net[0]}</strong>
            <span class="points" aria-hidden="true">${[1, 2, 3].map(k => `<i class="${k <= d.net[0] ? "on" : ""}"></i>`).join("")}</span>
          </div>
          <p class="reseau-texte">${A.e(d.net[1])}</p>
          <ol class="etapes-acces">${d.acces.map(s => `<li>${A.e(s)}</li>`).join("")}</ol>
          <p class="petit"><a href="#reseau">Voir comment construire ton réseau sur LinkedIn</a></p>
        </section>

        <section class="bloc bloc-acces">
          <h2>Ce qu'il faut savoir et maîtriser</h2>
          <div class="deux-col">
            <div><h3>Connaissances</h3><ul class="liste-sav">${d.sav.map(s => `<li>${A.e(s)}</li>`).join("")}</ul></div>
            <div><h3>Outils et certifications</h3><ul class="liste-sav">${d.out.map(s => `<li>${A.e(s)}</li>`).join("")}</ul></div>
          </div>
          ${tst.length ? `<p class="tests-liens"><span class="petit">Tests et concours utiles :</span> ${tst.map(t => `<a class="puce puce-lien" href="#epreuve-${t.id}">${t.emoji} ${A.e(t.nom)}</a>`).join(" ")}</p>` : ""}
          ${d.evo ? `<p class="evo"><strong>Évolution :</strong> ${A.e(d.evo)}</p>` : ""}
        </section>`;
  }

  /* ——— Fiche métier */
  A.pages.metier = function (el, id) {
    const m = A.metierParId[id];
    if (!m) { A.pages.metiers(el); return; }
    const l = A.ligneParId[m.ligne], p = A.etat.profil;
    const compat = A.compatibilite(m, p);
    const fav = A.etat.favs.includes(m.id);
    const voisins = A.metiers.filter(x => x.id !== m.id && (x.ligne === m.ligne || x.riasec === m.riasec)).slice(0, 4);

    el.innerHTML = `
      <article class="fiche" style="--c:${l.couleur};--ct:${l.texte}">
        <a class="retour" href="#metiers">← Tous les métiers</a>
        <header class="fiche-tete">
          <span class="ft-emoji" aria-hidden="true">${m.emoji}</span>
          <div>
            ${A.pastilleLigne(m.ligne)}
            <h1>${A.e(m.nom)}</h1>
            <p class="chapo">${A.e(m.accroche)}</p>
          </div>
          <button type="button" class="btn-fav" data-fav aria-pressed="${fav}">${fav ? "★ Dans mon carnet" : "☆ Ajouter à mon carnet"}</button>
        </header>

        <div class="chiffres">
          <div><span class="petit">Études</span><strong>${A.e(m.etudes)}</strong></div>
          <div><span class="petit">Emploi</span><strong>${RECRUTE[m.recrute]}</strong><span class="points" aria-hidden="true">${[1, 2, 3].map(k => `<i class="${k <= m.recrute ? "on" : ""}"></i>`).join("")}</span></div>
          <div><span class="petit">Profil</span><strong>${m.riasec.split("").map(d => A.profils[d].nom).join(" + ")}</strong></div>
          ${compat != null ? `<div class="chiffre-compat"><span class="petit">Compatibilité avec toi</span><strong>${compat}%</strong></div>` : `<div><span class="petit">Compatibilité</span><a href="#test">Fais le test</a></div>`}
        </div>

        <section class="bloc">
          <h2>Salaire</h2>
          ${jaugeSalaire(m)}
        </section>

        <section class="bloc">
          <h2>Une journée type</h2>
          <ol class="journee">${m.journee.map(j => { const [h, ...r] = j.split(" : "); return `<li><span class="heure">${A.e(h)}</span><span>${A.e(r.join(" : "))}</span></li>`; }).join("")}</ol>
        </section>

        <div class="deux-col">
          <section class="bloc pour"><h2>Tu vas kiffer</h2><ul>${m.kiffe.map(k => `<li>${A.e(k)}</li>`).join("")}</ul></section>
          <section class="bloc contre"><h2>Moins fun</h2><ul>${m.moins.map(k => `<li>${A.e(k)}</li>`).join("")}</ul></section>
        </div>

        <section class="bloc">
          <h2>Les qualités qui aident</h2>
          <div class="puces">${m.competences.map(c => `<span class="puce puce-statique">${A.e(c)}</span>`).join("")}</div>
        </section>

        <section class="bloc">
          <h2>Comment y aller</h2>
          <ol class="trajet">
            <li class="tr-depart"><span class="tr-gare"></span><span>Ton bac${p ? "" : ""}</span></li>
            ${m.formations.map(fid => {
              const f = A.formationParId[fid];
              return `<li><span class="tr-gare"></span><a href="#formation-${f.id}"><strong>${A.e(f.nom)}</strong><span>${A.e(A.dureeFormation(f))} · ${A.e(f.long)}</span></a>${p ? A.tagAcces(f.acces[p.bac]) : ""}</li>`;
            }).join("")}
            <li class="tr-terminus"><span class="tr-gare"></span><strong>${A.e(m.nom)}</strong></li>
          </ol>
          <p class="petit">Ce sont les chemins les plus courants. Il en existe d'autres (reconversion, passerelles, alternance).</p>
        </section>

        ${blocAcces(m)}

        <aside class="encart encart-savais"><strong>Le savais-tu ?</strong><p>${A.e(m.savais)}</p></aside>

        <section class="bloc">
          <h2>Métiers voisins</h2>
          <div class="grille-metiers">${voisins.map(v => A.carteMetier(v, A.compatibilite(v, p))).join("")}</div>
        </section>

        <p class="petit source">Pour aller plus loin : <a href="https://www.onisep.fr/recherche?text=${encodeURIComponent(m.nom.split("·")[0].split(" /")[0])}" target="_blank" rel="noopener">la fiche Onisep</a>.</p>
      </article>`;

    el.onclick = ev => {
      const b = ev.target.closest("[data-fav]");
      if (!b) return;
      const ajoute = A.basculerFavori(m.id);
      b.setAttribute("aria-pressed", String(ajoute));
      b.textContent = ajoute ? "★ Dans mon carnet" : "☆ Ajouter à mon carnet";
    };

    A.ajouterUnique(A.etat.lus, m.id);
    A.sauver();
    A.gagner(10, "lu-" + m.id, "Fiche lue : " + m.nom);
    A.activite("metier", m.id); A.activite("metier-" + m.ligne, m.id);
    A.verifierTampons();
  };

  /* ——— Formations : types, comparateur, liste */
  let rechercheFormation = "";

  A.pages.formations = function (el) {
    const p = A.etat.profil;
    if (!A.etat.compare.length) A.etat.compare = ["bts", "but", "licence"];
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">${A.types.length} grandes familles · ${A.formations.length} formations</p>
        <h1>Les formations</h1>
        <p class="chapo">BTS, BUT, licence, prépa… Ce n'est pas qu'une question de niveau : le rythme, l'encadrement et le coût changent tout.</p>
      </section>

      <section class="bloc">
        <h2>Le comparateur</h2>
        <p class="petit">Choisis jusqu'à 3 familles de formations.</p>
        <div class="puces" role="group" aria-label="Formations à comparer">
          ${A.types.map(t => `<button type="button" class="puce" data-cmp="${t.id}" aria-pressed="${A.etat.compare.includes(t.id)}">${A.e(t.nom)}</button>`).join("")}
        </div>
        <div class="table-defile" id="comparateur"></div>
      </section>

      <section class="bloc">
        <h2>Les grandes familles</h2>
        <div class="grille-types">${A.types.map(t => `
          <a class="carte-type" href="#type-${t.id}">
            <strong>${A.e(t.nom)}</strong>
            <span class="ct-long">${A.e(t.long)}</span>
            <span class="ct-meta">${A.e(t.duree)} · ${A.e(t.niveau)}</span>
            <span class="ct-resume">${A.e(t.resume)}</span>
          </a>`).join("")}</div>
      </section>

      <section class="bloc">
        <h2>Toutes les formations du plan</h2>
        <label class="recherche"><span class="sr">Chercher une formation</span>
          <input id="q-formation" type="search" placeholder="Chercher : BUT, infirmier, prépa…" value="${A.e(rechercheFormation)}" autocomplete="off">
        </label>
        ${p ? `<p class="petit">Les étiquettes indiquent l'accès depuis ton bac.</p>` : ""}
        <div class="liste-formations" id="liste-formations"></div>
      </section>`;

    const majComparateur = () => {
      const choisis = A.etat.compare.map(id => A.typeParId[id]);
      const jauge = (v, inverse) => `<span class="jauge-mini" aria-label="${v} sur 3">${[1, 2, 3].map(k => `<i class="${k <= v ? (inverse ? "on-chaud" : "on") : ""}"></i>`).join("")}</span>`;
      const lignes = [
        ["Durée", t => A.e(t.duree)],
        ["Niveau", t => A.e(t.niveau)],
        ["Où", t => A.e(t.lieu)],
        ["Coût par an", t => `${jauge(t.coutNiv, true)}<span>${A.e(t.cout)}</span>`],
        ["Sélection", t => `${jauge(t.selNiv, true)}<span>${A.e(t.selection)}</span>`],
        ["Encadrement", t => jauge(t.encadrement)],
        ["Pratique / stages", t => jauge(t.pratique)],
        ["Alternance", t => t.alternance ? "Possible" : "Rare"],
        ["Emploi à 18 mois", t => { const r = A.insRecords && A.recordInsertion(A.insertionDuType[t.id], A.insRecords); return r ? `<b>${r.e} %</b> en emploi salarié${r.q ? `<span>Salaire net médian : ${A.euros(r.q[1])}</span>` : ""}<span class="petit">${Math.round(r.p / (r.n + r.p) * 100)} % poursuivent leurs études</span>` : `<span class="petit">Non publié pour ce diplôme</span>`; }],
        ["Pour toi si…", t => A.e(t.pourQui)],
        ["Et après ?", t => A.e(t.apres)]
      ];
      A.$("#comparateur").innerHTML = choisis.length ? `
        <table class="comparateur">
          <thead><tr><th scope="col"><span class="sr">Critère</span></th>${choisis.map(t => `<th scope="col"><a href="#type-${t.id}">${A.e(t.nom)}</a></th>`).join("")}</tr></thead>
          <tbody>${lignes.map(([nom, f]) => `<tr><th scope="row">${nom}</th>${choisis.map(t => `<td>${f(t)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>` : `<p class="vide-inline">Choisis au moins une formation à comparer.</p>`;
    };

    const majListe = () => {
      const q = rechercheFormation.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      const liste = A.formations.filter(f => !q || (f.nom + " " + f.long + " " + A.typeParId[f.type].nom).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(q));
      const zone = A.$("#liste-formations");
      if (!q) {
        zone.innerHTML = A.lignes.map(l => {
          const fs = A.formations.filter(f => f.lignes[0] === l.id);
          return `<details class="groupe-ligne" style="--c:${l.couleur}"><summary>${A.pastilleLigne(l.id, false)}<strong>${A.e(l.nom)}</strong><span class="petit">${fs.length} formations</span></summary>
            <div class="liste-formations">${fs.map(f => A.ligneFormation(f, p && p.bac)).join("")}</div></details>`;
        }).join("");
        return;
      }
      zone.innerHTML = liste.length ? liste.map(f => A.ligneFormation(f, p && p.bac)).join("") : `<p class="vide-inline">Aucune formation trouvée.</p>`;
    };

    A.$("#q-formation").addEventListener("input", ev => { rechercheFormation = ev.target.value; majListe(); });
    el.onclick = ev => {
      const b = ev.target.closest("[data-cmp]");
      if (!b) return;
      const id = b.dataset.cmp, c = A.etat.compare, i = c.indexOf(id);
      if (i >= 0) c.splice(i, 1);
      else { if (c.length >= 3) c.shift(); c.push(id); }
      A.sauver();
      A.$$("[data-cmp]").forEach(x => x.setAttribute("aria-pressed", String(c.includes(x.dataset.cmp))));
      majComparateur();
      if (c.length >= 2) { A.gagner(15, "comparer", "Formations comparées"); A.tamponner("comparateur"); }
    };
    A.insertion().then(ins => { A.insRecords = ins; majComparateur(); }).catch(() => {});
    majComparateur();
    majListe();
  };

  /* ——— Fiche d'un type de formation */
  A.pages.type = function (el, id) {
    const t = A.typeParId[id];
    if (!t) { A.pages.formations(el); return; }
    const p = A.etat.profil;
    const liste = A.formations.filter(f => f.type === t.id);
    setTimeout(() => A.statsType(t.id, A.$("#psup-type")));
    setTimeout(() => {
      const cle = A.insertionDuType[t.id];
      if (cle) A.insertion().then(ins => {
        const r = A.recordInsertion(cle, ins), z = A.$("#ins-type");
        if (r && z) { z.hidden = false; z.innerHTML = `<h2>Et après, en chiffres</h2><p class="petit">Diplômé·es de : ${A.e(cle[0].toLowerCase())} (France entière).</p>` + A.blocInsertion(r); }
      }).catch(() => {});
    });
    el.innerHTML = `
      <article class="fiche fiche-type">
        <a class="retour" href="#formations">← Toutes les formations</a>
        <header class="fiche-tete">
          <div>
            <p class="surtitre">${A.e(t.long)}</p>
            <h1>${A.e(t.nom)}</h1>
            <p class="chapo">${A.e(t.resume)}</p>
          </div>
        </header>
        <div class="chiffres">
          <div><span class="petit">Durée</span><strong>${A.e(t.duree)}</strong></div>
          <div><span class="petit">Diplôme</span><strong>${A.e(t.niveau)}</strong></div>
          <div><span class="petit">Où</span><strong>${A.e(t.lieu)}</strong></div>
          <div><span class="petit">Coût</span><strong>${A.e(t.cout)}</strong></div>
        </div>
        <div class="deux-col">
          <section class="bloc"><h2>Pour toi si…</h2><p>${A.e(t.pourQui)}</p></section>
          <section class="bloc"><h2>Comment on entre</h2><p>${A.e(t.selection)}</p></section>
        </div>
        <section class="bloc"><h2>Et après ?</h2><p>${A.e(t.apres)}</p></section>
        <aside class="encart encart-savais"><strong>Bon à savoir</strong><p>${A.e(t.bonASavoir)}</p></aside>
        <section class="bloc" id="psup-type" hidden></section>
        <section class="bloc" id="ins-type" hidden></section>
        ${liste.length ? `<section class="bloc"><h2>Exemples sur le plan</h2><div class="liste-formations">${liste.map(f => A.ligneFormation(f, p && p.bac)).join("")}</div></section>` : ""}
      </article>`;
  };

  const FILI_DU_TYPE = { bts: ["BTS"], but: ["BUT"], licence: ["Licence"], cpge: ["CPGE"], "pass-las": ["PASS", "Licence_Las"],
    "ecole-inge": ["Ecole d'Ingénieur"], "ecole-commerce": ["Ecole de Commerce"], de: ["IFSI", "EFTS"] };

  A.statsType = function (typeId, zone) {
    const filis = FILI_DU_TYPE[typeId];
    if (!filis || !zone) return;
    A.donnees("parcoursup-stats").then(st => {
      const s = filis.map(x => st.filieres[x]).filter(Boolean);
      if (!s.length) return;
      const places = s.reduce((a, x) => a + x.places, 0);
      const pond = k => Math.round(s.reduce((a, x) => a + x[k] * x.places, 0) / places);
      zone.hidden = false;
      zone.innerHTML = `<h2>Les chiffres Parcoursup ${st.session}</h2>
        <div class="chiffres chiffres-psup">
          <div><span class="petit">Formations</span><strong>${s.reduce((a, x) => a + x.formations, 0).toLocaleString(A.locale)}</strong></div>
          <div><span class="petit">Places</span><strong>${places.toLocaleString(A.locale)}</strong></div>
          <div><span class="petit">Vœux reçus</span><strong>${s.reduce((a, x) => a + x.voeux, 0).toLocaleString(A.locale)}</strong></div>
          <div><span class="petit">Taux d'accès médian</span><strong>${s[0].tauxMedian} %</strong></div>
        </div>
        <div class="admis admis-grand">
          <span class="admis-barre"><i class="ad-g" style="width:${pond("partGen")}%"></i><i class="ad-t" style="width:${pond("partTec")}%"></i><i class="ad-p" style="width:${pond("partPro")}%"></i></span>
          <span class="admis-leg">Admis : <b>${pond("partGen")} % bac général</b> · <b>${pond("partTec")} % bac techno</b> · <b>${pond("partPro")} % bac pro</b> · ${pond("boursiers")} % boursier·es</span>
        </div>
        <p class="petit">Source : Parcoursup, session ${st.session} (MESR, Licence Ouverte).</p>`;
    }).catch(() => {});
  };

  /* ——— Fiche d'une formation */
  A.pages.formation = function (el, id) {
    const f = A.formationParId[id];
    if (!f) { A.pages.formations(el); return; }
    const t = A.typeParId[f.type], p = A.etat.profil;
    const l = A.ligneParId[f.lignes[0]];
    const metiers = (A.metiersDeFormation[f.id] || []).map(mid => A.metierParId[mid]);
    const nomAtout = x => (A.specialites.find(s => s.id === x) || A.series.find(s => s.id === x) || { nom: x }).nom;
    el.innerHTML = `
      <article class="fiche" style="--c:${l.couleur};--ct:${l.texte}">
        <a class="retour" href="#plan">← Retour au plan</a>
        <header class="fiche-tete">
          <div>
            <div class="pastilles">${f.lignes.map(x => A.pastilleLigne(x)).join("")}</div>
            <h1>${A.e(f.nom)}</h1>
            <p class="surtitre">${A.e(f.long)}</p>
            <p class="chapo">${A.e(f.desc)}</p>
          </div>
        </header>
        <div class="chiffres">
          <div><span class="petit">Type</span><strong><a href="#type-${t.id}">${A.e(t.nom)}</a></strong></div>
          <div><span class="petit">Durée</span><strong>${A.e(A.dureeFormation(f))}</strong></div>
          <div><span class="petit">Coût</span><strong>${A.e(t.cout)}</strong></div>
          <div><span class="petit">Alternance</span><strong>${t.alternance ? "Possible" : "Rare"}</strong></div>
        </div>
        <section class="bloc">
          <h2>Accès selon ton bac</h2>
          <ul class="acces-bacs">${A.bacs.map(b => `<li class="${p && p.bac === b.id ? "le-tien" : ""}"><span>${b.nom}${p && p.bac === b.id ? " <em>(toi)</em>" : ""}</span>${A.tagAcces(f.acces[b.id])}</li>`).join("")}</ul>
          ${f.ideal.length ? `<p class="petit">Atouts : ${f.ideal.map(x => `<span class="puce puce-statique">${A.e(nomAtout(x))}</span>`).join(" ")}</p>` : ""}
        </section>
        <section class="bloc"><h2>Et après ?</h2><p>${A.e(f.apres)}</p></section>
        ${f.insertion ? `<section class="bloc" id="ins-formation"><h2>Et après, en chiffres</h2><p class="petit">Chargement…</p></section>` : ""}
        ${f.psup ? `<section class="bloc" id="psup-formation"><h2>En vrai, sur Parcoursup</h2><p class="petit">Chargement des données officielles…</p></section>` : ""}
        ${metiers.length ? `<section class="bloc"><h2>Ça mène à</h2><div class="grille-metiers">${metiers.map(m => A.carteMetier(m, A.compatibilite(m, p))).join("")}</div></section>` : ""}
        <p class="petit source">Vérifie toujours la fiche officielle : <a href="https://www.parcoursup.gouv.fr" target="_blank" rel="noopener">Parcoursup</a> (taux d'accès, attendus) et <a href="https://www.onisep.fr/recherche?text=${encodeURIComponent(f.long)}" target="_blank" rel="noopener">Onisep</a>.</p>
      </article>`;
    A.gagner(5, "formation-" + f.id, false);
    A.activite("formation", f.id);
    if (f.psup) statsFormation(f);
    if (f.insertion) A.insertion().then(ins => {
      const z = A.$("#ins-formation"), r = A.recordInsertion(f.insertion, ins);
      if (!z) return;
      if (!r) { z.remove(); return; }
      const lib = f.insertion[1] ? `${f.insertion[0]} · ${f.insertion[1].toLowerCase()}` : f.insertion[0];
      z.innerHTML = `<h2>Et après, en chiffres</h2><p class="petit">Diplômé·es de : ${A.e(lib)} (France entière).</p>` + A.blocInsertion(r);
    }).catch(() => { const z = A.$("#ins-formation"); if (z) z.remove(); });
    else if (["bts", "but", "de", "cpge"].includes(f.type)) {
      const note = document.createElement("p");
      note.className = "petit note-ins";
      note.textContent = "Taux d'emploi : le ministère ne publie pas de chiffres à 18 mois pour ce type de diplôme dans le jeu InserSup (les BUT sont trop récents, les BTS suivis ailleurs). Regarde les fiches des licences pros et des écoles qui y font suite.";
      const cible = A.$("#psup-formation") || A.$(".source");
      if (cible) cible.insertAdjacentElement("beforebegin", note);
    }
    el.onclick = ev => {
      if (!ev.target.closest("[data-voir-carte]")) return;
      A.carteDemande = { formation: f.id };
      A.aller("carte");
    };
  };

  /* Agrégats sur toutes les formations Parcoursup qui correspondent à cette formation */
  function statsFormation(f) {
    A.parcoursup().then(psup => {
      const zone = A.$("#psup-formation");
      if (!zone) return;
      const rs = psup.lignes.filter(r => A.correspond(r, f.psup));
      if (!rs.length) { zone.remove(); return; }
      const places = rs.reduce((s, r) => s + (r.places || 0), 0);
      const pond = k => Math.round(rs.reduce((s, r) => s + (r[k] || 0) * (r.places || 0), 0) / Math.max(1, places));
      const taux = rs.map(r => r.taux).filter(t => t != null).sort((a, b) => a - b);
      const med = taux.length ? taux[Math.floor(taux.length / 2)] : null;
      const publics = rs.filter(r => r.public).length;
      const p = A.etat.profil;
      zone.innerHTML = `<h2>En vrai, sur Parcoursup</h2>
        <div class="chiffres chiffres-psup">
          <div><span class="petit">Formations en France</span><strong>${rs.length.toLocaleString(A.locale)}</strong><span class="petit">dont ${publics} publiques</span></div>
          <div><span class="petit">Places</span><strong>${places.toLocaleString(A.locale)}</strong></div>
          <div><span class="petit">Taux d'accès médian</span><strong>${med != null ? med + " %" : "–"}</strong><span class="petit">des candidat·es reçoivent une proposition</span></div>
          <div><span class="petit">Boursier·es parmi les admis</span><strong>${pond("bours")} %</strong></div>
        </div>
        <div class="admis admis-grand">
          <span class="admis-barre"><i class="ad-g" style="width:${pond("gen")}%"></i><i class="ad-t" style="width:${pond("tec")}%"></i><i class="ad-p" style="width:${pond("pro")}%"></i></span>
          <span class="admis-leg">Qui est admis ? <b class="${p && p.bac === "g" ? "toi" : ""}">${pond("gen")} % bac général</b> · <b class="${p && p.bac === "t" ? "toi" : ""}">${pond("tec")} % bac techno</b> · <b class="${p && p.bac === "p" ? "toi" : ""}">${pond("pro")} % bac pro</b></span>
        </div>
        <button type="button" class="btn btn-ligne" data-voir-carte>Voir où la suivre sur la carte</button>
        <p class="petit">Source : Parcoursup, session ${psup.session}. Moyennes pondérées par le nombre de places.</p>`;
    }).catch(() => { const z = A.$("#psup-formation"); if (z) z.remove(); });
  }
})();
