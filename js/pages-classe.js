/* Mode enseignant·e / Psy-EN, sans serveur ni compte.
   1. L'enseignant·e crée une classe : un code court (ex. K7QM) et un lien à donner aux élèves.
   2. L'élève fait le test ; à la fin il/elle obtient un CODE ANONYME (sans nom) à transmettre à l'enseignant·e.
   3. L'enseignant·e colle les codes : le tableau de classe est calculé dans son navigateur. Rien n'est envoyé nulle part. */
(function () {
  const D = ["R", "I", "A", "S", "E", "C"];
  const LETTRES = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // sans I, L, O, 0, 1 pour éviter les confusions à la dictée
  const DUREE = { court: "c", moyen: "m", long: "l", nsp: "n" }, DUREE_INV = { c: "court", m: "moyen", l: "long", n: "nsp" };
  const ALT = { oui: "o", "peut-etre": "p", non: "n" }, ALT_INV = { o: "oui", p: "peut-etre", n: "non" };
  const LIBELLES = { duree: { court: "2-3 ans", moyen: "3 à 5 ans", long: "5 ans et plus", nsp: "Ne sait pas" }, alt: { oui: "Oui", "peut-etre": "Pourquoi pas", non: "Non" }, bac: { g: "Bac général", t: "Bac techno", p: "Bac pro", x: "Pas encore choisi" } };

  const somme = t => [...t].reduce((s, c, i) => s + c.charCodeAt(0) * (i + 1), 0);
  const controle = t => "0123456789ABCDEFGHJKMNPQRSTUVWXYZ"[somme(t) % 33];

  A.nouveauCodeClasse = () => Array.from({ length: 4 }, () => LETTRES[Math.floor(Math.random() * LETTRES.length)]).join("");

  /* Code anonyme de l'élève : CLASSE.R72I55A30S41E20C18.g.m.o.X  (X = caractère de contrôle contre les fautes de frappe) */
  A.coderProfil = function (classe, p) {
    const sc = D.map(d => d + Math.max(0, Math.min(100, Math.round(p.scores[d]))).toString().padStart(2, "0")).join("");
    const base = `${classe}.${sc}.${p.bacChoisi === false ? "x" : p.bac}.${DUREE[p.duree] || "n"}.${ALT[p.alternance] || "n"}`.toUpperCase();
    return base + "." + controle(base);
  };

  A.decoderProfil = function (texte) {
    const m = String(texte).trim().toUpperCase().replace(/\s+/g, "").match(/^([A-Z0-9]{3,8})\.R(\d{2,3})I(\d{2,3})A(\d{2,3})S(\d{2,3})E(\d{2,3})C(\d{2,3})\.([GTPX])\.([CMLN])\.([OPN])\.([0-9A-Z])$/);
    if (!m) return null;
    const base = texte.trim().toUpperCase().replace(/\s+/g, "").slice(0, -2);
    if (controle(base) !== m[11]) return { erreur: "controle" };
    const scores = {};
    D.forEach((d, i) => { scores[d] = Math.min(100, Number(m[2 + i])); });
    const tri = D.slice().sort((a, b) => scores[b] - scores[a] || D.indexOf(a) - D.indexOf(b));
    return { classe: m[1], scores, code: tri[0] + tri[1], bac: m[8].toLowerCase(), duree: DUREE_INV[m[9].toLowerCase()], alternance: ALT_INV[m[10].toLowerCase()] };
  };

  const classe = () => A.etat.classeProf || null;

  /* ——— Côté élève : atterrissage via le lien de la classe */
  A.pages.classe = function (el, param) {
    if (param) { atterrissage(el, param.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8)); return; }
    espaceEnseignant(el);
  };

  function atterrissage(el, code) {
    A.etat.classe = code; A.sauver();
    const p = A.etat.profil;
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Ta classe</p>
        <h1>Tu rejoins la classe <span class="code-profil">${A.e(code)}</span></h1>
        <p class="chapo">Ton/ta prof t'a demandé de faire le test d'orientation. À la fin, tu auras un <strong>code anonyme</strong> (sans ton nom) à lui donner : il lui permet de voir les profils de la classe, jamais qui est qui.</p>
      </section>
      <div class="actions">
        <a class="btn btn-signal" href="#test">${p ? "Refaire le test" : "Faire le test (5 min)"}</a>
        ${p ? `<a class="btn btn-ligne" href="#resultat">Voir mon code</a>` : ""}
      </div>
      <aside class="encart"><strong>Ce que ça partage</strong><p>Le code contient seulement tes six scores d'intérêts, ton type de bac et tes préférences (durée, alternance). Pas de nom, pas d'adresse, pas d'historique. Tu choisis de le donner ou non.</p></aside>`;
  }

  /* Bloc affiché sur la page de résultats d'un·e élève rattaché·e à une classe */
  A.blocCodeClasse = function () {
    const c = A.etat.classe, p = A.etat.profil;
    if (!c || !p) return "";
    const code = A.coderProfil(c, p);
    return `<aside class="encart code-classe"><strong>Ton code pour la classe ${A.e(c)}</strong>
      <p>Donne ce code à ton/ta prof. Il ne contient pas ton nom.</p>
      <div class="code-ligne"><code id="code-classe">${A.e(code)}</code><button type="button" class="btn btn-ligne" data-copier-code="${A.e(code)}">Copier</button></div>
      <button type="button" class="btn-texte" data-quitter-classe>Quitter la classe</button></aside>`;
  };

  A.brancherCodeClasse = function (el) {
    el.onclick = ev => {
      const b = ev.target.closest("[data-copier-code], [data-quitter-classe]");
      if (!b) return;
      if (b.dataset.copierCode) {
        const ok = () => A.toast("Code copié", "Envoie-le à ton/ta prof", "📋");
        const repli = () => { const z = A.$("#code-classe"), r = document.createRange(); r.selectNodeContents(z); const s = getSelection(); s.removeAllRanges(); s.addRange(r); A.toast("Code sélectionné", "Copie-le avec Ctrl+C ou un appui long", "📋"); };
        try { navigator.clipboard.writeText(b.dataset.copierCode).then(ok, repli); } catch (e) { repli(); }
      } else { delete A.etat.classe; A.sauver(); A.rendre(); }
    };
  };

  /* ——— Côté enseignant·e */
  function espaceEnseignant(el) {
    const c = classe();
    if (!c) {
      el.innerHTML = `
        <section class="tete-page">
          <p class="surtitre">Pour les enseignant·es et les Psy-EN</p>
          <h1>Lancer le test en classe</h1>
          <p class="chapo">Gratuit, sans compte, sans serveur. Tu crées une classe, tes élèves font le test et te donnent un code anonyme, et tu vois les profils de la classe d'un coup d'œil.</p>
        </section>
        <ol class="tuto">
          <li class="tuto-etape"><span class="tuto-num">1</span><div><strong>Crée ta classe</strong><p>Un code court est généré. Donne-le ou envoie le lien à tes élèves.</p></div><span></span></li>
          <li class="tuto-etape"><span class="tuto-num">2</span><div><strong>Les élèves font le test</strong><p>5 minutes, sur téléphone ou ordinateur. À la fin, chacun·e obtient un code anonyme.</p></div><span></span></li>
          <li class="tuto-etape"><span class="tuto-num">3</span><div><strong>Colle les codes</strong><p>Le tableau de classe se calcule dans ton navigateur : profils dominants, types de bac, projets, métiers à explorer.</p></div><span></span></li>
        </ol>
        <form class="jpo-form" id="classe-form" onsubmit="return false">
          <label class="champ jpo-large"><span>Nom de ta classe (visible seulement par toi)</span><input id="classe-nom" placeholder="Ex. Terminale STMG 2" autocomplete="off"></label>
          <button type="submit" class="btn btn-signal">Créer la classe</button>
        </form>
        <aside class="encart"><strong>Données personnelles</strong><p>Aucun nom, aucune adresse e-mail et aucun suivi individuel : seulement des scores et des préférences, sans identité. Les codes restent dans ton navigateur. Pour un usage en établissement, parles-en à ton chef·fe d'établissement, comme pour tout outil numérique.</p></aside>`;
      A.$("#classe-form").addEventListener("submit", () => {
        A.etat.classeProf = { code: A.nouveauCodeClasse(), nom: A.$("#classe-nom").value.trim() || "Ma classe", codes: [] };
        A.sauver(); A.pages.classe(el);
      });
      return;
    }
    const lien = location.href.split("#")[0] + "#classe-" + c.code;
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Espace enseignant·e</p>
        <h1>${A.e(c.nom)}</h1>
        <p class="chapo">Code de la classe : <span class="code-profil">${A.e(c.code)}</span></p>
      </section>
      <section class="bloc">
        <h2>1. Donne le lien à tes élèves</h2>
        <div class="code-ligne"><code id="classe-lien">${A.e(lien)}</code><button type="button" class="btn btn-ligne" data-copier-lien>Copier le lien</button></div>
        <p class="petit">Ils arrivent sur la page de la classe, font le test, et obtiennent leur code anonyme à te transmettre (de vive voix, sur ton ENT, par écrit…).</p>
      </section>
      <section class="bloc">
        <h2>2. Colle les codes reçus</h2>
        <label class="champ"><span>Un code par ligne</span><textarea id="classe-codes" rows="5" placeholder="${A.e(c.code)}.R72I55A30S41E20C18.G.M.O.X" spellcheck="false">${A.e(c.codes.join("\n"))}</textarea></label>
        <div id="classe-etat" class="petit" aria-live="polite"></div>
      </section>
      <div id="classe-tableau"></div>
      <section class="bloc zone-reset">
        <button type="button" class="btn-texte" data-supprimer-classe>Supprimer cette classe</button>
      </section>`;
    const maj = () => {
      const lignes = A.$("#classe-codes").value.split(/[\n;,]+/).map(x => x.trim()).filter(Boolean);
      const profils = [], erreurs = [];
      lignes.forEach(l => {
        const p = A.decoderProfil(l);
        if (!p) erreurs.push(`« ${l.slice(0, 24)} » n'est pas un code valide`);
        else if (p.erreur) erreurs.push(`« ${l.slice(0, 24)} » contient une faute de frappe`);
        else if (p.classe !== c.code) erreurs.push(`« ${l.slice(0, 24)} » vient d'une autre classe`);
        else if (!profils.some(q => q._brut === l.toUpperCase())) { p._brut = l.toUpperCase(); profils.push(p); }
      });
      c.codes = lignes; A.sauver();
      A.$("#classe-etat").innerHTML = `<strong>${profils.length}</strong> profil${profils.length > 1 ? "s" : ""} lu${profils.length > 1 ? "s" : ""}${erreurs.length ? ` · à vérifier : ${erreurs.map(A.e).join(" ; ")}` : ""}`;
      A.$("#classe-tableau").innerHTML = profils.length ? tableau(profils) : "";
    };
    A.$("#classe-codes").addEventListener("input", maj);
    maj();
    el.onclick = ev => {
      const b = ev.target.closest("button");
      if (!b) return;
      if ("copierLien" in b.dataset) {
        const ok = () => A.toast("Lien copié", "Envoie-le à ta classe", "📋");
        const repli = () => { const z = A.$("#classe-lien"), r = document.createRange(); r.selectNodeContents(z); const s = getSelection(); s.removeAllRanges(); s.addRange(r); A.toast("Lien sélectionné", "Copie-le avec Ctrl+C", "📋"); };
        try { navigator.clipboard.writeText(lien).then(ok, repli); } catch (e) { repli(); }
      } else if ("supprimerClasse" in b.dataset) { b.outerHTML = `<span><strong>Supprimer la classe et ses codes ?</strong> <button type="button" class="btn btn-danger" data-supprimer-ok>Oui, supprimer</button></span>`; }
      else if ("supprimerOk" in b.dataset) { delete A.etat.classeProf; A.sauver(); A.pages.classe(el); }
      else if ("exporterCsv" in b.dataset) {
        const profils = c.codes.map(A.decoderProfil).filter(p => p && !p.erreur && p.classe === c.code);
        const csv = "profil;bac;duree;alternance;" + D.join(";") + "\n" + profils.map(p => [p.code, LIBELLES.bac[p.bac], LIBELLES.duree[p.duree], LIBELLES.alt[p.alternance], ...D.map(d => p.scores[d])].join(";")).join("\n") + "\n";
        const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
        const a = document.createElement("a"); a.href = url; a.download = "classe-" + c.code + ".csv"; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }
    };
  }

  /* ——— Tableau de classe : tout est calculé à partir des codes collés */
  function tableau(profils) {
    const n = profils.length;
    const compte = (cle, fn) => { const m = {}; profils.forEach(p => { const k = fn ? fn(p) : p[cle]; m[k] = (m[k] || 0) + 1; }); return m; };
    const barres = (m, libelle, couleur) => `<ul class="barres-h">${Object.entries(m).sort((a, b) => b[1] - a[1]).map(([k, v]) =>
      `<li><span>${A.e(libelle(k))}</span><span class="bh-piste"><i style="width:${v / n * 100}%;${couleur ? "background:" + couleur(k) : ""}"></i></span><b>${v}</b></li>`).join("")}</ul>`;
    const dominant = compte(null, p => p.code[0]);
    const duos = compte(null, p => p.code);
    const moyenne = {}; D.forEach(d => { moyenne[d] = Math.round(profils.reduce((s, p) => s + p.scores[d], 0) / n); });
    const triMoy = D.slice().sort((a, b) => moyenne[b] - moyenne[a]);
    const groupe = { scores: moyenne, code: triMoy[0] + triMoy[1], bac: "g", duree: "moyen", alternance: "peut-etre" };
    // Métiers les plus compatibles avec chaque profil, comptés sur la classe (un·e élève compte pour 1 par métier de son top 8)
    const votes = {};
    profils.forEach(p => {
      const profil = { scores: p.scores, code: p.code, bac: p.bac === "x" ? "g" : p.bac, specs: [], serie: null, duree: p.duree, alternance: p.alternance };
      A.metiers.map(m => ({ m, c: A.compatibilite(m, profil) })).sort((a, b) => b.c - a.c).slice(0, 8).forEach(({ m }) => { votes[m.id] = (votes[m.id] || 0) + 1; });
    });
    const topMetiers = Object.entries(votes).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const petits = n < 5 ? `<p class="petit">Moins de 5 profils : les tendances sont fragiles et chaque élève peut être reconnu·e. Attends d'avoir plus de codes avant de projeter les résultats devant la classe.</p>` : "";
    return `<section class="bloc"><h2>Le tableau de classe</h2>${petits}
      <div class="classe-grille">
        <div class="classe-carte"><h3>Profil dominant</h3>${barres(dominant, k => A.profils[k].nom + " (" + k + ")", k => A.profils[k].couleur)}</div>
        <div class="classe-carte"><h3>Combinaisons les plus fréquentes</h3>${barres(Object.fromEntries(Object.entries(duos).sort((a, b) => b[1] - a[1]).slice(0, 6)), k => k + " · " + A.profils[k[0]].nom + " & " + A.profils[k[1]].nom)}</div>
        <div class="classe-carte"><h3>Bac</h3>${barres(compte("bac"), k => LIBELLES.bac[k])}</div>
        <div class="classe-carte"><h3>Durée d'études souhaitée</h3>${barres(compte("duree"), k => LIBELLES.duree[k])}</div>
        <div class="classe-carte"><h3>Alternance</h3>${barres(compte("alternance"), k => LIBELLES.alt[k])}</div>
        <div class="classe-carte"><h3>Intérêts moyens de la classe</h3><ul class="barres-h">${triMoy.map(d => `<li><span>${A.e(A.profils[d].nom)} (${d})</span><span class="bh-piste"><i style="width:${moyenne[d]}%;background:${A.profils[d].couleur}"></i></span><b>${moyenne[d]}</b></li>`).join("")}</ul></div>
      </div></section>
      <section class="bloc"><h2>Métiers à explorer en classe</h2>
        <p class="petit">Les métiers qui reviennent le plus dans les 8 premières suggestions des élèves.</p>
        <div class="grille-metiers">${topMetiers.map(([id, v]) => `<a class="carte-metier" href="#metier-${id}" style="--c:${A.ligneParId[A.metierParId[id].ligne].couleur}"><span class="cm-emoji" aria-hidden="true">${A.metierParId[id].emoji}</span><span class="cm-corps"><strong>${A.e(A.metierParId[id].nom)}</strong><span class="cm-meta">${v} élève${v > 1 ? "s" : ""} sur ${n}</span></span></a>`).join("")}</div>
        <button type="button" class="btn btn-ligne" data-exporter-csv>Exporter les profils (CSV anonyme)</button>
      </section>
      <aside class="encart"><strong>Pistes pour la séance</strong><p>Fais explorer à chaque élève deux métiers de sa liste, puis la carte des formations près du lycée. Reviens sur les écarts entre intérêts et projets : un profil « Créateur·rice » qui vise la finance peut trouver des métiers qui relient les deux (analyse de données, marketing…). Les résultats sont une boussole, pas un verdict.</p></aside>`;
  }
})();
