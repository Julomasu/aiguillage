/* Internationalisation : français (par défaut) et anglais.
   - Le choix est mémorisé ; sans choix, on prend la langue du navigateur. Basculer recharge la page.
   - En anglais, js/i18n/en-data-*.js remplacent les contenus rédigés (métiers, formations, lexique…) avant l'affichage,
     et js/i18n/en-ui.js traduit les textes de l'interface au fur et à mesure qu'ils apparaissent (dictionnaire + règles).
   - Tout ce qui n'est pas traduit reste en français : le site fonctionne dans les deux langues. */
(function () {
  const CLE = "aiguillage.lang";
  let lang = "";
  try { lang = localStorage.getItem(CLE) || ""; } catch (e) { /* stockage indisponible */ }
  if (!lang) {
    // Sans choix mémorisé : anglais seulement si le navigateur est en anglais et ne propose pas le français
    const langues = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "fr"]).map(l => String(l).toLowerCase());
    lang = /^en\b/.test(langues[0]) && !langues.some(l => /^fr\b/.test(l)) ? "en" : "fr";
  }
  A.lang = lang;
  document.documentElement.lang = lang;

  A.changerLangue = function (l) {
    try { localStorage.setItem(CLE, l); } catch (e) { /* idem */ }
    location.reload();
  };

  function boutonLangue() {
    const b = document.getElementById("btn-langue");
    if (!b || b.dataset.pret) return;
    b.dataset.pret = "1";
    const autre = lang === "fr" ? "en" : "fr";
    b.textContent = autre.toUpperCase();
    b.setAttribute("aria-label", lang === "fr" ? "Switch to English" : "Passer en français");
    b.setAttribute("lang", autre);
    b.addEventListener("click", () => A.changerLangue(autre));
  }

  function charger(src) {
    return new Promise((ok, ko) => {
      const s = document.createElement("script");
      s.src = src; s.onload = ok; s.onerror = ko;
      document.head.appendChild(s);
    });
  }

  if (lang === "fr") {
    A.langueChargee = Promise.resolve();
    document.addEventListener("DOMContentLoaded", boutonLangue);
    if (document.readyState !== "loading") boutonLangue();
    return;
  }

  A.locale = "en-GB";
  const FICHIERS_EN = ["en-ui", "en-extra", "en-rules", "en-data-base", "en-data-contenus", "en-data-formations", "en-data-metiers1", "en-data-metiers2"];
  A.langueChargee = Promise.all(FICHIERS_EN.map(f => charger("js/i18n/" + f + ".js"))).then(demarrerTraduction).catch(() => {
    // Les fichiers anglais n'ont pas pu être chargés (hors ligne, par exemple) : on reste en français.
    A.lang = "fr"; A.locale = "fr-FR"; document.documentElement.lang = "fr";
  });

  /* ——— Données rédigées : on remplace les champs par leur version anglaise, sur place */
  function superposer() {
    const D = A.EN_DATA || {};
    const parId = (liste, tr) => liste.forEach(o => { const t = tr[o.id]; if (t) Object.assign(o, t); });
    parId(A.lignes, D.lignes || {}); parId(A.specialites, D.specialites || {}); parId(A.series, D.series || {});
    parId(A.bacs, D.bacs || {}); parId(A.types, D.types || {}); parId(A.badges, D.badges || {});
    A.formations.forEach(f => { const t = (D.formations || {})[f.id]; if (t) Object.assign(f, t); });
    A.metiers.forEach(m => { const t = (D.metiers || {})[m.id]; if (t) Object.assign(m, t); });
    A.acces.forEach((a, i) => { if (D.acces && D.acces[i]) a.label = D.acces[i]; });
    Object.keys(A.profils).forEach(k => { if (D.profils && D.profils[k]) Object.assign(A.profils[k], D.profils[k]); });
    A.niveaux.forEach((n, i) => { if (D.niveaux && D.niveaux[i]) n.nom = D.niveaux[i]; });
    const parIndex = (liste, tr) => liste.forEach((o, i) => { if (tr && tr[i]) Object.assign(o, tr[i]); });
    parIndex(A.questions, D.questions); parIndex(A.reponses, D.reponses); parIndex(A.lexique, D.lexique); parIndex(A.vraiFaux, D.vraiFaux);
    parId(A.chiffres.bourses, D.bourses || {}); parIndex(A.calendrier, D.calendrier); parIndex(A.checklist, D.checklist); parIndex(A.aides, D.aides); parIndex(A.couts, D.couts);
    // Mêmes liens d'identifiants : les index construits au chargement pointent vers les mêmes objets, rien à reconstruire.
  }

  /* ——— Interface : dictionnaire par « squelette » (les nombres sont remplacés par {n}) et règles */
  const NOMBRE = /\d+(?:[\s  .,]\d+)*/g;
  const norm = s => s.replace(/[\s  ]+/g, " ").trim();
  /* Nombre français ("1 234,5") ou déjà au format local anglais ("1,234.5") → format anglais. */
  const nombreEn = t => String(t).trim().replace(/[\s\u00a0\u202f](\d{3})/g, ",$1").replace(/,(\d{1,2})(?!\d)/g, ".$1");
  /* "€1,690" (écrit par A.euros en anglais) → "1 690 €", la forme des clés du dictionnaire */
  const eurosVersFr = t => t.replace(/€\s?(\d+(?:[,.]\d+)*)/g, (m, n) => (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(n) ? n.replace(/,/g, " ").replace(".", ",") : n.replace(".", ",")) + " €");
  const EXCLUS = "script,style,svg,canvas,textarea,input,code,kbd,[data-i18n-skip],.bulle-moi,.maplibregl-canvas-container";

  function traduire(texte) {
    const coeur = eurosVersFr(norm(texte));
    if (!coeur) return texte;
    const nombres = coeur.match(NOMBRE) || [];
    const squelette = coeur.replace(NOMBRE, "{n}");
    const UI = A.EN_UI || {};
    let r = UI[squelette];
    if (r !== undefined) {
      let i = 0;
      r = r.replace(/\{n\}/g, () => nombres[i] !== undefined ? nombreEn(nombres[i++]) : "");
    } else {
      for (const [motif, remplacement] of A.EN_RE || []) {
        if (motif.test(coeur)) { r = coeur.replace(motif, remplacement); break; }
      }
    }
    if (r === undefined || r === coeur) return texte;
    return (texte.match(/^\s*/)[0]) + r + (texte.match(/\s*$/)[0]);
  }
  A.traduire = traduire;
  A.nombreEn = nombreEn;

  const faits = new WeakSet();
  const ATTRIBUTS = ["placeholder", "aria-label", "title", "alt"];

  function traduireNoeudTexte(n) {
    if (faits.has(n) || !n.nodeValue.trim()) return;
    if (n.parentElement && n.parentElement.closest(EXCLUS)) return;
    faits.add(n);
    const t = traduire(n.nodeValue);
    if (t !== n.nodeValue) n.nodeValue = t;
  }

  function traduireArbre(racine) {
    if (racine.nodeType === 3) { traduireNoeudTexte(racine); return; }
    if (racine.nodeType !== 1 || racine.closest(EXCLUS)) return;
    const marcheur = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
    const noeuds = [];
    for (let n = marcheur.nextNode(); n; n = marcheur.nextNode()) noeuds.push(n);
    noeuds.forEach(traduireNoeudTexte);
    const els = [racine, ...racine.querySelectorAll("[placeholder],[aria-label],[title],[alt]")];
    els.forEach(e => ATTRIBUTS.forEach(a => {
      const v = e.getAttribute && e.getAttribute(a);
      if (v) { const t = traduire(v); if (t !== v) e.setAttribute(a, t); }
    }));
  }

  function traduireTitre() {
    const m = document.title.match(/^(.*) · Aiguillage$/);
    document.title = m ? traduire(m[1]) + " · Aiguillage" : traduire(document.title);
  }

  function demarrerTraduction() {
    superposer();
    const rendre = A.rendre;
    A.rendre = function () { rendre.apply(this, arguments); traduireTitre(); };
    const obs = new MutationObserver(muts => muts.forEach(m => m.addedNodes.forEach(traduireArbre)));
    obs.observe(document.body, { childList: true, subtree: true });
    traduireArbre(document.body);
    boutonLangue();
  }

})();
