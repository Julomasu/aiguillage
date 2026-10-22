/* Carte des formations : les 14 000 formations Parcoursup géolocalisées, autour de ta ville. */
(function () {
  const LAT0 = 46.5, KX = Math.cos(LAT0 * Math.PI / 180);
  const proj = (lat, lon) => [lon * KX, -lat];
  const BORNES = { x0: -5.3 * KX, x1: 9.7 * KX, y0: -51.2, y1: -41.3 };

  const f = { texte: "", rayon: 30, familles: new Set(A.FAMILLES.map(x => x.id)), publicSeul: false, bacPro: false, formation: null, ecole: null, horsPsup: false, voirPlus: 0 };
  let carte = null; // état du canvas (vue, données)

  A.carteDemande = null; // posé par une fiche formation : { formation: id }

  A.pages.carte = function (el) {
    if (carte && carte.vecteur) { carte.vecteur.remove(); carte.vecteur = null; }
    if (A.carteDemande) { f.formation = A.carteDemande.formation || null; f.ecole = A.carteDemande.ecole ? { nom: A.carteDemande.ecole, ids: new Set(A.carteDemande.ids || []) } : null; f.texte = ""; A.carteDemande = null; }
    const p = A.etat.profil;
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Données officielles Parcoursup</p>
        <h1>La carte des formations</h1>
        <p class="chapo">Toutes les formations de Parcoursup, avec leur vrai taux d'accès et le profil des admis l'an dernier. Choisis ta ville pour voir ce qui est accessible sans déménager.</p>
      </section>
      <div class="panneau-filtres">
      <div class="carte-outils">
        <label class="champ"><span>Ta ville</span>
          <input id="carte-ville" list="liste-villes" type="search" autocomplete="off" placeholder="Ex. Lille, Rennes, Pau…" value="${A.e(A.etat.ville ? A.etat.ville.nom : "")}">
          <datalist id="liste-villes"></datalist>
        </label>
        <label class="champ champ-rayon"><span>Rayon : <b id="rayon-val">${f.rayon} km</b></span>
          <input id="carte-rayon" type="range" min="5" max="150" step="5" value="${f.rayon}">
        </label>
        <label class="champ"><span>Mot-clé</span>
          <input id="carte-texte" type="search" autocomplete="off" placeholder="Ex. informatique, droit, design" value="${A.e(f.texte)}">
        </label>
      </div>
      ${f.ecole ? `<p class="filtre-actif">École : <strong>${A.e(f.ecole.nom)}</strong> <button type="button" class="btn-texte" data-retirer-ecole>retirer ce filtre</button></p>` : ""}
      ${f.formation ? `<p class="filtre-actif">Formation : <strong>${A.e(A.formationParId[f.formation].nom)}</strong> <button type="button" class="btn-texte" data-retirer-formation>retirer ce filtre</button></p>` : ""}
      <div class="puces" role="group" aria-label="Types de formation">
        ${A.FAMILLES.map(x => `<button type="button" class="puce puce-famille" data-famille="${x.id}" aria-pressed="${f.familles.has(x.id)}" style="--c:${x.couleur}"><i></i>${A.e(x.nom)}</button>`).join("")}
      </div>
      <div class="puces">
        <button type="button" class="puce" data-public aria-pressed="${f.publicSeul}">Public seulement</button>
        <button type="button" class="puce" data-bacpro aria-pressed="${f.bacPro}">A admis des bacs pro${p && p.bac === "p" ? " (comme toi)" : ""}</button>
      </div>
      </div>
      <div class="carte-zone">
        <div class="carte-boite">
          <div id="carte-vecteur" class="carte-vecteur" hidden></div>
          <div class="carte-style" id="carte-style" role="group" aria-label="Style de carte" hidden>
            <button type="button" data-style="clair" aria-pressed="true">Clair</button>
            <button type="button" data-style="3d" aria-pressed="false">3D</button>
            <button type="button" data-hors-psup aria-pressed="${f.horsPsup}" title="Écoles qui recrutent hors Parcoursup">Hors Parcoursup</button>
          </div>
          <canvas id="carte-canvas" aria-label="Carte de France des formations. La liste à côté contient les mêmes informations."></canvas>
          <div class="carte-zoom">
            <button type="button" data-zoom="1.6" aria-label="Zoomer">+</button>
            <button type="button" data-zoom="0.625" aria-label="Dézoomer">−</button>
            <button type="button" data-recentrer aria-label="Recentrer">⌖</button>
          </div>
          <p class="carte-chargement" id="carte-etat">Chargement des 14 000 formations…</p>
          <p class="carte-mode" id="carte-mode" hidden></p>
        </div>
        <div class="carte-liste" id="carte-liste" aria-live="polite"></div>
      </div>
      <div class="plateau" id="plateau" hidden></div>
      <p class="petit source">Source : Parcoursup, session 2025 (ministère de l'Enseignement supérieur, Licence Ouverte). Taux d'accès = part des candidat·es ayant reçu une proposition. Fond de carte : OpenFreeMap, données © contributeurs OpenStreetMap (sinon contours IGN via france-geojson). Les formations d'outre-mer apparaissent dans la liste, pas sur la carte.</p>`;

    Promise.all([A.parcoursup(), A.donnees("villes"), A.donnees("france")]).then(([psup, villes, france]) => {
      if (A.lireHash().page !== "carte") return;
      carte = { psup, villes: villes.lignes, france: france.departements, vue: null, selection: null };
      A.$("#liste-villes").innerHTML = villes.lignes.slice(0, 600).map(v => `<option value="${A.e(v[0])} (${v[1]})"></option>`).join("");
      A.$("#carte-etat").hidden = true;
      brancher(el);
      recentrer();
      maj();
      majPlateau();
      essayerVraieCarte();
    }).catch(() => { A.$("#carte-etat").innerHTML = A.messageErreurDonnees; });
  };

  function majPlateau() {
    const z = A.$("#plateau");
    if (!z) return;
    const ids = A.compareIds();
    z.hidden = !ids.length;
    if (!ids.length || !carte) return;
    const noms = ids.map(id => carte.psup.lignes.find(r => r.id === id)).filter(Boolean);
    z.innerHTML = `<span><strong>${noms.length}/3</strong> à comparer : ${noms.map(r => A.e((r.intitule || r.fili).slice(0, 38) + " · " + r.ville)).join(" ; ")}</span>
      <span class="plateau-actions"><button type="button" class="btn-texte" data-vider-comparaison>Vider</button><a class="btn btn-signal" href="#comparer">${noms.length > 1 ? "Comparer" : "Voir"}</a></span>`;
  }

  function trouverVille(saisie) {
    if (!saisie || !carte) return null;
    const m = saisie.match(/^(.*?)\s*\((\w+)\)\s*$/);
    const nom = A.sansAccents(m ? m[1] : saisie).trim(), dep = m ? m[2] : null;
    const v = carte.villes.find(v => A.sansAccents(v[0]) === nom && (!dep || v[1] === dep))
      || carte.villes.find(v => A.sansAccents(v[0]).startsWith(nom));
    return v ? { nom: v[0], dep: v[1], lat: v[2], lon: v[3] } : null;
  }

  function filtrees() {
    const q = A.sansAccents(f.texte.trim());
    const matcher = f.formation && A.formationParId[f.formation].psup;
    return carte.psup.lignes.filter(r => {
      if (!f.familles.has(r.famille.id)) return false;
      if (f.publicSeul && !r.public) return false;
      if (f.bacPro && !(r.pro > 0)) return false;
      if (matcher && !A.correspond(r, matcher)) return false;
      if (f.ecole && !f.ecole.ids.has(r.id)) return false;
      if (q && !A.sansAccents(r.intitule + " " + r.etab + " " + r.fili).includes(q)) return false;
      return true;
    });
  }

  function maj() {
    if (!carte) return;
    const ville = A.etat.ville;
    let liste = filtrees();
    carte.toutes = liste;
    if (ville) {
      liste.forEach(r => { r.dist = r.lat == null ? Infinity : A.distanceKm(ville.lat, ville.lon, r.lat, r.lon); });
      liste = liste.filter(r => r.dist <= f.rayon).sort((a, b) => a.dist - b.dist);
    }
    carte.proches = ville ? liste : [];
    dessiner();
    const zone = A.$("#carte-liste");
    if (!ville) {
      zone.innerHTML = `<div class="panneau-vide"><p class="surtitre">${carte.toutes.length.toLocaleString(A.locale)} formations affichées</p>
        <p>Indique ta ville pour voir les formations autour de toi, triées par distance.</p>
        <div class="puces">${carte.villes.slice(0, 8).map(v => `<button type="button" class="puce" data-ville-rapide="${A.e(v[0])} (${v[1]})">${A.e(v[0])}</button>`).join("")}</div></div>`;
      return;
    }
    const n = liste.length, max = 30 + f.voirPlus;
    const places = liste.reduce((s, r) => s + (r.places || 0), 0);
    zone.innerHTML = `
      <div class="carte-resume"><strong>${n.toLocaleString(A.locale)} formation${n > 1 ? "s" : ""}</strong> à moins de ${f.rayon} km de ${A.e(ville.nom)} · ${places.toLocaleString(A.locale)} places</div>
      ${n ? liste.slice(0, max).map(carteFormation).join("") : `<p class="vide-inline">Rien dans ce rayon avec ces filtres. Augmente le rayon ou retire un filtre.</p>`}
      ${n > max ? `<button type="button" class="btn btn-ligne" data-voir-plus>Voir 30 de plus</button>` : ""}`;
  }

  function barreAdmis(r) {
    if (r.gen == null) return "";
    const p = A.etat.profil;
    return `<div class="admis" title="Répartition des admis par bac">
      <span class="admis-barre"><i class="ad-g" style="width:${r.gen}%"></i><i class="ad-t" style="width:${r.tec}%"></i><i class="ad-p" style="width:${r.pro}%"></i></span>
      <span class="admis-leg">Admis : <b class="${p && p.bac === "g" ? "toi" : ""}">${r.gen} % général</b> · <b class="${p && p.bac === "t" ? "toi" : ""}">${r.tec} % techno</b> · <b class="${p && p.bac === "p" ? "toi" : ""}">${r.pro} % pro</b></span>
    </div>`;
  }

  function carteFormation(r) {
    const sel = carte.selection === r.id;
    return `<article class="cf ${sel ? "cf-sel" : ""}" id="cf-${r.id}" style="--c:${r.famille.couleur}">
      <div class="cf-tete"><span class="cf-fam">${A.e(r.famille.nom)}</span>${r.dist != null && isFinite(r.dist) ? `<span class="cf-dist">${r.dist < 1 ? "< 1" : Math.round(r.dist)} km</span>` : ""}</div>
      <h3>${A.e(r.intitule || r.fili)}</h3>
      <p class="petit">${A.e(r.etab)} · ${A.e(r.ville)} · ${r.public ? "Public" : "Privé"}${r.selective ? " · sélective" : ""}</p>
      <div class="cf-chiffres">
        ${r.taux != null ? `<span class="cf-taux"><span class="mini-jauge"><i style="width:${r.taux}%"></i></span>Taux d'accès <b>${r.taux} %</b></span>` : ""}
        ${r.places ? `<span>${r.places} places</span>` : ""}
        ${r.bours != null ? `<span>${r.bours} % boursier·es</span>` : ""}
      </div>
      ${barreAdmis(r)}
      <div class="cf-actions">
        <a class="lien-fleche" href="${A.lienParcoursup(r.id)}" target="_blank" rel="noopener">Fiche Parcoursup</a>
        <button type="button" class="btn-coche" data-cmp-form="${r.id}" aria-pressed="${A.compareIds().includes(r.id)}">${A.compareIds().includes(r.id) ? "Dans la comparaison ✓" : "Comparer"}</button>
      </div>
    </article>`;
  }

  /* ——— Canvas */
  function recentrer() {
    if (carte && carte.vecteur) { recentrerVecteur(); return; }
    const cv = A.$("#carte-canvas");
    if (!cv || !carte) return;
    const v = A.etat.ville;
    const w = cv.clientWidth, h = cv.clientHeight;
    if (v) {
      const [x, y] = proj(v.lat, v.lon), r = f.rayon / 111 * 1.25;
      carte.vue = { cx: x, cy: y, k: Math.min(w, h) / (2 * r) };
    } else {
      const bw = BORNES.x1 - BORNES.x0, bh = BORNES.y1 - BORNES.y0;
      carte.vue = { cx: (BORNES.x0 + BORNES.x1) / 2, cy: (BORNES.y0 + BORNES.y1) / 2, k: Math.min(w / bw, h / bh) * 0.95 };
    }
  }

  function couleurs() {
    const cs = getComputedStyle(document.documentElement);
    return { fond: cs.getPropertyValue("--surface-2").trim(), terre: cs.getPropertyValue("--surface").trim(), trait: cs.getPropertyValue("--rule").trim(), encre: cs.getPropertyValue("--ink").trim(), signal: cs.getPropertyValue("--signal").trim() };
  }

  function dessiner() {
    if (carte && carte.vecteur) { majVecteur(); return; }
    const cv = A.$("#carte-canvas");
    if (!cv || !carte || !carte.vue) return;
    const dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
    if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    const ctx = cv.getContext("2d"), c = couleurs(), { cx, cy, k } = carte.vue;
    const X = x => (x - cx) * k + w / 2, Y = y => (y - cy) * k + h / 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = c.fond; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = c.terre; ctx.strokeStyle = c.trait; ctx.lineWidth = 1;
    carte.france.forEach(([, , anneaux]) => anneaux.forEach(a => {
      ctx.beginPath();
      for (let i = 0; i < a.length; i += 2) {
        const [px, py] = proj(a[i + 1], a[i]);
        i ? ctx.lineTo(X(px), Y(py)) : ctx.moveTo(X(px), Y(py));
      }
      ctx.closePath(); ctx.fill(); ctx.stroke();
    }));
    const v = A.etat.ville, proches = new Set(carte.proches.map(r => r.id));
    const rp = Math.max(1.6, Math.min(5, k / 60));
    carte.points = [];
    carte.toutes.forEach(r => {
      if (r.lat == null) return;
      const [px, py] = proj(r.lat, r.lon), sx = X(px), sy = Y(py);
      if (sx < -10 || sy < -10 || sx > w + 10 || sy > h + 10) return;
      const actif = !v || proches.has(r.id);
      ctx.globalAlpha = actif ? 0.85 : 0.15;
      ctx.fillStyle = r.famille.couleur;
      ctx.beginPath(); ctx.arc(sx, sy, rp, 0, 7); ctx.fill();
      if (actif) carte.points.push([sx, sy, r]);
    });
    ctx.globalAlpha = 1;
    // Repères : noms des villes, d'autant plus nombreux qu'on zoome
    const nbVilles = Math.round(Math.min(400, Math.max(12, k * k / 35)));
    ctx.font = "700 12px " + getComputedStyle(document.body).fontFamily;
    ctx.textAlign = "center"; ctx.lineJoin = "round";
    const occupe = [];
    carte.villes.slice(0, nbVilles).forEach(([nom, , la, lo]) => {
      const [px, py] = proj(la, lo), sx = X(px), sy = Y(py) - 9;
      if (sx < 0 || sy < 10 || sx > w || sy > h) return;
      const lg = ctx.measureText(nom).width;
      if (occupe.some(o => Math.abs(o[0] - sx) < (o[2] + lg) / 2 + 4 && Math.abs(o[1] - sy) < 14)) return;
      occupe.push([sx, sy, lg]);
      ctx.strokeStyle = c.terre; ctx.lineWidth = 3.5; ctx.strokeText(nom, sx, sy);
      ctx.fillStyle = c.encre; ctx.fillText(nom, sx, sy);
    });
    if (v) {
      const [px, py] = proj(v.lat, v.lon), r = f.rayon / 111 * k;
      ctx.strokeStyle = c.encre; ctx.setLineDash([6, 5]); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(X(px), Y(py), r * KX / Math.cos(v.lat * Math.PI / 180), r, 0, 0, 7); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = c.signal; ctx.strokeStyle = c.encre; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(X(px), Y(py), 8, 0, 7); ctx.fill(); ctx.stroke();
    }
    if (carte.selection) {
      const s = carte.points.find(p => p[2].id === carte.selection);
      if (s) { ctx.strokeStyle = c.encre; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(s[0], s[1], rp + 5, 0, 7); ctx.stroke(); }
    }
  }

  function brancher(el) {
    const cv = A.$("#carte-canvas");
    const choisirVille = saisie => {
      const v = trouverVille(saisie);
      if (!v) return;
      A.etat.ville = v; A.sauver();
      f.voirPlus = 0; carte.selection = null;
      recentrer(); maj();
    };
    A.$("#carte-ville").addEventListener("change", ev => choisirVille(ev.target.value));
    A.$("#carte-ville").addEventListener("keydown", ev => { if (ev.key === "Enter") choisirVille(ev.target.value); });
    A.$("#carte-rayon").addEventListener("input", ev => {
      f.rayon = Number(ev.target.value); A.$("#rayon-val").textContent = f.rayon + " km"; f.voirPlus = 0; recentrer(); maj();
    });
    let tempo;
    A.$("#carte-texte").addEventListener("input", ev => { clearTimeout(tempo); tempo = setTimeout(() => { f.texte = ev.target.value; f.voirPlus = 0; maj(); }, 200); });

    el.onclick = ev => {
      const b = ev.target.closest("button");
      if (!b) return;
      if (b.dataset.famille) {
        const id = b.dataset.famille;
        if (f.familles.has(id) && f.familles.size === A.FAMILLES.length) { f.familles = new Set([id]); }
        else if (f.familles.has(id)) { f.familles.delete(id); if (!f.familles.size) f.familles = new Set(A.FAMILLES.map(x => x.id)); }
        else f.familles.add(id);
        A.$$("[data-famille]").forEach(x => x.setAttribute("aria-pressed", String(f.familles.has(x.dataset.famille))));
      } else if ("public" in b.dataset) { f.publicSeul = !f.publicSeul; b.setAttribute("aria-pressed", String(f.publicSeul)); }
      else if ("bacpro" in b.dataset) { f.bacPro = !f.bacPro; b.setAttribute("aria-pressed", String(f.bacPro)); }
      else if (b.dataset.style) changerStyle(b.dataset.style);
      else if ("horsPsup" in b.dataset) basculerEcolesHors(b);
      else if (b.dataset.cmpForm) {
        const id = Number(b.dataset.cmpForm), dedans = A.basculerComparaison(id);
        A.$$(`[data-cmp-form="${id}"]`).forEach(x => { x.setAttribute("aria-pressed", String(dedans)); x.textContent = dedans ? "Dans la comparaison ✓" : "Comparer"; });
        majPlateau(); return;
      }
      else if ("viderComparaison" in b.dataset) { A.etat.compareF = []; A.sauver(); A.$$("[data-cmp-form]").forEach(x => { x.setAttribute("aria-pressed", "false"); x.textContent = "Comparer"; }); majPlateau(); return; }
      else if ("retirerFormation" in b.dataset) { f.formation = null; A.pages.carte(el); return; }
      else if ("retirerEcole" in b.dataset) { f.ecole = null; A.pages.carte(el); return; }
      else if ("voirPlus" in b.dataset) { f.voirPlus += 30; }
      else if (b.dataset.villeRapide) { A.$("#carte-ville").value = b.dataset.villeRapide; choisirVille(b.dataset.villeRapide); return; }
      else if (b.dataset.zoom) { carte.vue.k *= Number(b.dataset.zoom); dessiner(); return; }
      else if ("recentrer" in b.dataset) { recentrer(); dessiner(); return; }
      else return;
      f.voirPlus = 0; maj();
    };

    // Déplacement, zoom molette et pincement
    const pointeurs = new Map();
    let depart = null, bouge = false;
    cv.addEventListener("pointerdown", ev => { cv.setPointerCapture(ev.pointerId); pointeurs.set(ev.pointerId, [ev.offsetX, ev.offsetY]); depart = { x: ev.offsetX, y: ev.offsetY, vue: { ...carte.vue } }; bouge = false; });
    cv.addEventListener("pointermove", ev => {
      if (!pointeurs.has(ev.pointerId)) return;
      const avant = pointeurs.get(ev.pointerId);
      pointeurs.set(ev.pointerId, [ev.offsetX, ev.offsetY]);
      if (pointeurs.size === 2) {
        const [a, b] = [...pointeurs.values()], autre = [...pointeurs.entries()].find(([id]) => id !== ev.pointerId)[1];
        const d1 = Math.hypot(avant[0] - autre[0], avant[1] - autre[1]), d2 = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (d1 > 0) carte.vue.k *= d2 / d1;
        bouge = true; dessiner(); return;
      }
      const dx = ev.offsetX - depart.x, dy = ev.offsetY - depart.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) bouge = true;
      carte.vue.cx = depart.vue.cx - dx / carte.vue.k; carte.vue.cy = depart.vue.cy - dy / carte.vue.k;
      dessiner();
    });
    const fin = ev => {
      pointeurs.delete(ev.pointerId);
      if (!bouge && ev.type === "pointerup") selectionner(ev.offsetX, ev.offsetY);
      if (pointeurs.size === 1) { const [x, y] = [...pointeurs.values()][0]; depart = { x, y, vue: { ...carte.vue } }; }
    };
    cv.addEventListener("pointerup", fin);
    cv.addEventListener("pointercancel", fin);
    cv.addEventListener("wheel", ev => {
      ev.preventDefault();
      const z = ev.deltaY < 0 ? 1.2 : 1 / 1.2, w = cv.clientWidth, h = cv.clientHeight, v = carte.vue;
      const mx = (ev.offsetX - w / 2) / v.k + v.cx, my = (ev.offsetY - h / 2) / v.k + v.cy;
      v.k *= z; v.cx = mx - (ev.offsetX - w / 2) / v.k; v.cy = my - (ev.offsetY - h / 2) / v.k;
      dessiner();
    }, { passive: false });
    if (window.ResizeObserver) new ResizeObserver(() => { if (A.lireHash().page === "carte") dessiner(); }).observe(cv);
  }

  function selectionner(x, y) {
    let meilleur = null, dmin = 14;
    (carte.points || []).forEach(([sx, sy, r]) => { const d = Math.hypot(sx - x, sy - y); if (d < dmin) { dmin = d; meilleur = r; } });
    if (meilleur) montrerSelection(meilleur);
  }

  function montrerSelection(meilleur) {
    carte.selection = meilleur.id;
    majPlateau();
    const zone = A.$("#carte-liste");
    let carteEl = A.$("#cf-" + meilleur.id);
    if (!carteEl) {
      // Formation hors de la liste affichée : on la montre en tête
      zone.insertAdjacentHTML("afterbegin", carteFormation(meilleur));
      carteEl = A.$("#cf-" + meilleur.id);
    }
    A.$$(".cf-sel", zone).forEach(n => n.classList.remove("cf-sel"));
    carteEl.classList.add("cf-sel");
    carteEl.scrollIntoView({ block: "nearest", behavior: document.documentElement.classList.contains("calme") ? "auto" : "smooth" });
    dessiner();
  }

  /* ——— Vraie carte : MapLibre (embarqué dans js/vendor) + fond OpenFreeMap, gratuit et sans clé.
     Si le fond ne charge pas (hors ligne, aperçu claude.ai), on garde la carte simplifiée. */
  /* Deux fonds OpenFreeMap : « bright » (clair, lisible) et « liberty » (bâtiments en volume, pour la vue 3D inclinée). */
  const STYLES = { clair: "https://tiles.openfreemap.org/styles/bright", "3d": "https://tiles.openfreemap.org/styles/liberty" };
  const styleCarte = () => (A.etat.reglages && A.etat.reglages.carte === "3d") ? "3d" : "clair";
  const VUE_3D = { pitch: 58, bearing: -18 };
  let promesseMapLibre = null;

  function chargerMapLibre() {
    if (window.maplibregl) return Promise.resolve();
    if (!promesseMapLibre) {
      promesseMapLibre = new Promise((ok, ko) => {
        const css = document.createElement("link");
        css.rel = "stylesheet"; css.href = "js/vendor/maplibre-gl.css";
        document.head.appendChild(css);
        const js = document.createElement("script");
        js.src = "js/vendor/maplibre-gl.js"; js.onload = ok; js.onerror = ko;
        document.head.appendChild(js);
      });
      promesseMapLibre.catch(() => { promesseMapLibre = null; });
    }
    return promesseMapLibre;
  }

  function modeCarte(texte) {
    const m = A.$("#carte-mode");
    if (m) { m.hidden = !texte; m.textContent = texte || ""; }
  }

  function essayerVraieCarte() {
    if (A.vraieCarteImpossible) { modeCarte("Carte simplifiée : le fond de carte n'est pas joignable ici."); return; }
    chargerMapLibre().then(() => new Promise((ok, ko) => {
      const boite = A.$("#carte-vecteur");
      if (!boite) return ko();
      boite.hidden = false;
      const mode = styleCarte();
      const map = new maplibregl.Map({ container: boite, style: STYLES[mode], center: [2.4, 46.6], zoom: 4.6, pitch: mode === "3d" ? VUE_3D.pitch : 0, bearing: mode === "3d" ? VUE_3D.bearing : 0,
        maxPitch: 75, attributionControl: { compact: true }, cooperativeGestures: false });
      const abandon = setTimeout(() => { map.remove(); ko(); }, 7000);
      map.on("error", () => { if (!map.loaded()) { clearTimeout(abandon); try { map.remove(); } catch (e) { /* déjà retirée */ } ko(); } });
      map.on("load", () => { clearTimeout(abandon); ok(map); });
    })).then(map => {
      if (!carte || A.lireHash().page !== "carte") { map.remove(); return; }
      carte.vecteur = map;
      map.addControl(new maplibregl.NavigationControl({ showCompass: styleCarte() === "3d", visualizePitch: true }), "top-right");
      map.addSource("formations", { type: "geojson", data: geojsonFormations() });
      map.addSource("rayon", { type: "geojson", data: geojsonRayon() });
      map.addLayer({ id: "rayon-fond", type: "fill", source: "rayon", filter: ["==", "$type", "Polygon"], paint: { "fill-color": "#FFC629", "fill-opacity": 0.08 } });
      map.addLayer({ id: "rayon-trait", type: "line", source: "rayon", filter: ["==", "$type", "Polygon"], paint: { "line-color": "#131A33", "line-width": 2, "line-dasharray": [2, 2] } });
      map.addLayer({ id: "formations", type: "circle", source: "formations", paint: {
        "circle-color": ["get", "c"],
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 2.2, 8, 4, 12, 7, 15, 10],
        "circle-opacity": ["case", ["==", ["get", "p"], 1], 0.9, 0.18],
        "circle-stroke-color": "#ffffff", "circle-stroke-width": ["case", ["==", ["get", "s"], 1], 4, 0.6],
        "circle-stroke-opacity": ["case", ["==", ["get", "p"], 1], 1, 0.2]
      } });
      if (styleCarte() === "3d") {
        // Colonnes : chaque formation devient une tour dont la hauteur suit le nombre de places (visibles en zoomant sur une ville)
        map.addSource("colonnes", { type: "geojson", data: geojsonColonnes() });
        map.addLayer({ id: "colonnes", type: "fill-extrusion", source: "colonnes", minzoom: 8, filter: ["==", ["get", "p"], 1], paint: {
          "fill-extrusion-color": ["get", "c"], "fill-extrusion-height": ["get", "h"], "fill-extrusion-base": 0, "fill-extrusion-opacity": 0.88
        } }, "formations");
        map.on("click", "colonnes", ev => {
          const r = carte.toutes.find(x => x.id === ev.features[0].properties.id);
          if (r) montrerSelection(r);
        });
      }
      map.addLayer({ id: "maison", type: "circle", source: "rayon", filter: ["==", "$type", "Point"], paint: { "circle-color": "#FFC629", "circle-radius": 8, "circle-stroke-color": "#131A33", "circle-stroke-width": 3 } });
      if (f.horsPsup) ajouterEcolesHors(map);
      map.on("click", "formations", ev => {
        const id = ev.features[0].properties.id;
        const r = carte.toutes.find(x => x.id === id);
        if (r) montrerSelection(r);
      });
      map.on("mouseenter", "formations", () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", "formations", () => { map.getCanvas().style.cursor = ""; });
      A.$("#carte-canvas").hidden = true;
      A.$(".carte-zoom").hidden = true;
      majBoutonsStyle(true);
      modeCarte("");
      recentrerVecteur();
    }).catch(() => {
      A.vraieCarteImpossible = true;
      majBoutonsStyle(false);
      const boite = A.$("#carte-vecteur");
      if (boite) boite.hidden = true;
      modeCarte("Carte simplifiée : le fond de carte n'est pas joignable ici.");
    });
  }

  /* Écoles hors Parcoursup : points sombres cerclés de jaune, avec une fenêtre vers la fiche de l'école */
  function ecolesHorsPsup() {
    return A.donnees("ecoles").then(d => ({ type: "FeatureCollection", features: d.ecoles.filter(o => !o.ps).flatMap(o => o.v.filter(c => c[2] != null).map(c => ({
      type: "Feature", geometry: { type: "Point", coordinates: [c[3], c[2]] }, properties: { id: o.id, n: o.n, v: c[0] }
    }))) }));
  }

  function ajouterEcolesHors(map) {
    ecolesHorsPsup().then(data => {
      if (carte.vecteur !== map || map.getSource("ecoles")) return;
      map.addSource("ecoles", { type: "geojson", data });
      map.addLayer({ id: "ecoles", type: "circle", source: "ecoles", paint: {
        "circle-color": "#131A33", "circle-stroke-color": "#FFC629", "circle-stroke-width": 2.5,
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 3, 8, 5, 12, 8, 15, 11]
      } }, "maison");
      map.on("click", "ecoles", ev => {
        const p = ev.features[0].properties;
        new maplibregl.Popup({ closeButton: true, offset: 10 }).setLngLat(ev.lngLat)
          .setHTML(`<strong>${A.e(p.n)}</strong><br><span>${A.e(p.v)} · hors Parcoursup</span><br><a href="#ecole-${A.e(p.id)}">Voir la fiche</a>`).addTo(map);
      });
      map.on("mouseenter", "ecoles", () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", "ecoles", () => { map.getCanvas().style.cursor = ""; });
    }).catch(() => { /* annuaire indisponible : la carte reste utilisable */ });
  }

  function basculerEcolesHors(b) {
    f.horsPsup = !f.horsPsup;
    b.setAttribute("aria-pressed", String(f.horsPsup));
    const map = carte && carte.vecteur;
    if (!map) return;
    if (f.horsPsup) ajouterEcolesHors(map);
    else if (map.getLayer("ecoles")) { map.removeLayer("ecoles"); map.removeSource("ecoles"); }
  }

  function geojsonFormations() {
    const proches = new Set((carte.proches || []).map(r => r.id)), v = A.etat.ville;
    return { type: "FeatureCollection", features: carte.toutes.filter(r => r.lat != null).map(r => ({
      type: "Feature", geometry: { type: "Point", coordinates: [r.lon, r.lat] },
      properties: { id: r.id, c: r.famille.couleur, p: !v || proches.has(r.id) ? 1 : 0, s: carte.selection === r.id ? 1 : 0 }
    })) };
  }

  /* Carrés d'environ 140 m de côté autour de chaque formation, extrudés en hauteur selon les places (plafonnées) */
  function geojsonColonnes() {
    const proches = new Set((carte.proches || []).map(r => r.id)), v = A.etat.ville, demi = 70;
    return { type: "FeatureCollection", features: carte.toutes.filter(r => r.lat != null).map(r => {
      const dLat = demi / 110570, dLon = demi / (111320 * Math.cos(r.lat * Math.PI / 180)), h = Math.max(60, Math.min(r.places || 15, 400) * 4);
      return { type: "Feature", properties: { id: r.id, c: r.famille.couleur, h, p: !v || proches.has(r.id) ? 1 : 0 },
        geometry: { type: "Polygon", coordinates: [[[r.lon - dLon, r.lat - dLat], [r.lon + dLon, r.lat - dLat], [r.lon + dLon, r.lat + dLat], [r.lon - dLon, r.lat + dLat], [r.lon - dLon, r.lat - dLat]]] } };
    }) };
  }

  function majBoutonsStyle(visible) {
    const z = A.$("#carte-style");
    if (!z) return;
    z.hidden = !visible;
    const m = styleCarte();
    z.querySelectorAll("[data-style]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.style === m)));
  }

  function changerStyle(mode) {
    if (styleCarte() === mode || !carte || !carte.vecteur) return;
    A.etat.reglages = A.etat.reglages || {};
    A.etat.reglages.carte = mode;
    A.sauver();
    carte.vecteur.remove(); carte.vecteur = null;
    A.$("#carte-vecteur").hidden = true;
    majBoutonsStyle(false);
    modeCarte(A.lang === "en" ? "Loading the map…" : "Chargement de la carte…");
    essayerVraieCarte();
  }

  function geojsonRayon() {
    const v = A.etat.ville;
    if (!v || v.lat == null) return { type: "FeatureCollection", features: [] };
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const a = i / 64 * 2 * Math.PI;
      pts.push([v.lon + f.rayon / (111.32 * Math.cos(v.lat * Math.PI / 180)) * Math.cos(a), v.lat + f.rayon / 110.57 * Math.sin(a)]);
    }
    return { type: "FeatureCollection", features: [
      { type: "Feature", geometry: { type: "Polygon", coordinates: [pts] }, properties: {} },
      { type: "Feature", geometry: { type: "Point", coordinates: [v.lon, v.lat] }, properties: {} }
    ] };
  }

  function majVecteur() {
    const map = carte.vecteur;
    map.getSource("formations").setData(geojsonFormations());
    if (map.getSource("colonnes")) map.getSource("colonnes").setData(geojsonColonnes());
    map.getSource("rayon").setData(geojsonRayon());
  }

  const vue3d = () => styleCarte() === "3d" ? VUE_3D : { pitch: 0, bearing: 0 };

  function recentrerVecteur() {
    const map = carte.vecteur, v = A.etat.ville;
    if (v && v.lat != null) {
      const dLat = f.rayon / 110.57, dLon = f.rayon / (111.32 * Math.cos(v.lat * Math.PI / 180));
      map.fitBounds([[v.lon - dLon, v.lat - dLat], [v.lon + dLon, v.lat + dLat]], { padding: 24, duration: document.documentElement.classList.contains("calme") ? 0 : 600, ...vue3d() });
    } else map.fitBounds([[-5.2, 41.3], [9.6, 51.1]], { padding: 12, duration: 0, ...vue3d() });
  }
})();
