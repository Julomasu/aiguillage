/* Noyau : état sauvegardé, petits utilitaires, progression (km & tampons), routeur. */
(function () {
  const CLE = "aiguillage.v1";

  const etatInitial = () => ({
    km: 0, gains: {}, badges: {}, lus: [], lignes: [], favs: [], profil: null,
    check: [], flips: [], vfBest: 0, compare: [], ville: null, budget: null, compareF: [],
    reglages: { theme: "system", taille: 1, calme: false, voix: 1 }
  });

  function charger() {
    try {
      const brut = localStorage.getItem(CLE);
      if (brut) return Object.assign(etatInitial(), JSON.parse(brut));
    } catch (e) { /* stockage indisponible : on garde l'état en mémoire */ }
    return etatInitial();
  }

  A.etat = charger();

  A.sauver = function () {
    try { localStorage.setItem(CLE, JSON.stringify(A.etat)); } catch (e) { /* idem */ }
  };

  A.reinitialiser = function () {
    const reglages = A.etat.reglages;
    A.etat = etatInitial();
    A.etat.reglages = reglages;
    A.sauver();
  };

  /* ——— Utilitaires */
  A.e = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };
  A.$ = (sel, racine) => (racine || document).querySelector(sel);
  A.$$ = (sel, racine) => Array.from((racine || document).querySelectorAll(sel));
  A.euros = n => n.toLocaleString("fr-FR") + " €";
  A.ajouterUnique = (liste, v) => { if (!liste.includes(v)) liste.push(v); return liste.length; };

  A.pastilleLigne = function (id, avecNom) {
    const l = A.ligneParId[id];
    return `<span class="pastille" style="--c:${l.couleur};--ct:${l.texte}" title="Ligne ${l.num} · ${A.e(l.nom)}">` +
      `<b>${l.num}</b>${avecNom === false ? "" : `<span>${A.e(l.court)}</span>`}</span>`;
  };

  A.tagAcces = function (niv) {
    const a = A.acces[niv];
    return `<span class="acces ${a.classe}"><i aria-hidden="true"></i>${a.label}</span>`;
  };

  A.niveauEtudes = function (n) {
    if (n === 0) return "Bac ou moins";
    if (n <= 2) return "Bac+1 à +2";
    if (n <= 3) return "Bac+3";
    if (n <= 5) return "Bac+5";
    return "Bac+6 et plus";
  };

  /* ——— Données ouvertes (data/*.json), chargées à la demande et gardées en mémoire */
  const cacheDonnees = {};
  A.donnees = function (nom) {
    if (!cacheDonnees[nom]) {
      cacheDonnees[nom] = fetch("data/" + nom + ".json")
        .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
        .catch(e => { delete cacheDonnees[nom]; throw e; });
    }
    return cacheDonnees[nom];
  };

  A.messageErreurDonnees = `<p class="vide-inline">Les données n'ont pas pu être chargées. Si tu as ouvert <code>index.html</code> directement depuis ton disque, lance plutôt le site avec <code>node serveur/serveur.mjs</code> ou <code>python3 -m http.server</code>.</p>`;

  /* Formations Parcoursup décodées en objets ; familles regroupées pour les filtres et la carte */
  A.FAMILLES = [
    { id: "bts", nom: "BTS", fili: ["BTS"], couleur: "#F2A71B" },
    { id: "but", nom: "BUT", fili: ["BUT"], couleur: "#2F5BEA" },
    { id: "licence", nom: "Licence", fili: ["Licence"], couleur: "#7A3FD1" },
    { id: "cpge", nom: "Prépa", fili: ["CPGE"], couleur: "#E85D9E" },
    { id: "inge", nom: "École d'ingé", fili: ["Ecole d'Ingénieur"], couleur: "#1B998B" },
    { id: "commerce", nom: "École de commerce", fili: ["Ecole de Commerce"], couleur: "#3BB3E0" },
    { id: "sante", nom: "Santé", fili: ["PASS", "Licence_Las", "IFSI"], couleur: "#E4572E" },
    { id: "social", nom: "Social", fili: ["EFTS"], couleur: "#6BBF59" },
    { id: "autre", nom: "Autres", fili: ["Autre formation"], couleur: "#9C6644" }
  ];
  A.familleDeFili = {};
  A.FAMILLES.forEach(f => f.fili.forEach(x => { A.familleDeFili[x] = f; }));

  A.parcoursup = function () {
    if (!A._psup) {
      A._psup = A.donnees("parcoursup").then(d => {
        const c = d.colonnes;
        const lignes = d.lignes.map(l => {
          const o = {};
          c.forEach((k, i) => { o[k] = l[i]; });
          o.fili = d.filieres[o.fili];
          o.famille = A.familleDeFili[o.fili] || A.FAMILLES[A.FAMILLES.length - 1];
          return o;
        });
        return { session: d.session, source: d.source, lignes };
      });
      A._psup.catch(() => { A._psup = null; });
    }
    return A._psup;
  };

  /* ——— Insertion professionnelle (InserSup) */
  A.insertion = () => A.donnees("insertion");
  A.recordInsertion = function (cle, ins) {
    if (!cle || !ins) return null;
    const [type, disc] = cle;
    if (disc) return (ins.disciplines[type] || {})[disc] || null;
    return ins.types[type] || null;
  };

  /* Bloc « Et après ? » en chiffres : emploi, stabilité, salaire, poursuite d'études */
  A.blocInsertion = function (r) {
    if (!r) return "";
    const poursuite = Math.round(r.p / (r.n + r.p) * 100);
    const smic = A.chiffres ? A.chiffres.smicNetMensuel : 1478;
    const jauge = (v, couleur) => `<span class="ins-jauge"><i style="width:${v}%;background:${couleur}"></i></span>`;
    return `<div class="insertion">
      <div class="ins-chiffres">
        <div><span class="petit">En emploi salarié à 18 mois</span><strong>${r.e} %</strong>${jauge(r.e, "var(--ok)")}</div>
        ${r.s != null ? `<div><span class="petit">Dont emploi stable (CDI, fonction publique…)</span><strong>${r.s} %</strong>${jauge(r.s, "#2F5BEA")}</div>` : ""}
        <div><span class="petit">Poursuivent leurs études</span><strong>${poursuite} %</strong>${jauge(poursuite, "#F2A71B")}</div>
      </div>
      ${r.q ? `<div class="ins-salaire"><span class="petit">Salaire net mensuel, temps plein, à 18 mois</span>
        <div class="sal-piste"><span class="sal-smic" style="left:${Math.min(96, smic / 3500 * 100)}%"><i>SMIC net</i></span>
        <span class="sal-barre" style="left:${r.q[0] / 3500 * 100}%;width:${(r.q[2] - r.q[0]) / 3500 * 100}%"></span>
        <span class="sal-pt sal-pt-fin" style="left:${r.q[1] / 3500 * 100}%"></span></div>
        <div class="sal-valeurs"><span>1 sur 4 gagne moins de <b>${A.euros(r.q[0])}</b></span><span>Médiane <b>${A.euros(r.q[1])}</b></span><span>1 sur 4 gagne plus de <b>${A.euros(r.q[2])}</b></span></div></div>` : `<p class="petit">Salaire non publié pour ce diplôme (effectifs trop faibles).</p>`}
      <p class="petit">${r.n.toLocaleString("fr-FR")} diplômé·es de la promotion ${r.pe} ont quitté les études : les pourcentages d'emploi ne concernent qu'eux, pas celles et ceux qui continuent en master. Source : InserSup, ministère de l'Enseignement supérieur.</p>
    </div>`;
  };

  A.lienParcoursup = id => "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=" + id;

  A.correspond = function (ligne, matcher) {
    if (!matcher) return false;
    const [fili, motif] = matcher;
    return ligne.fili === fili && (!motif || new RegExp(motif, "i").test(ligne.intitule));
  };

  A.distanceKm = function (lat1, lon1, lat2, lon2) {
    const r = Math.PI / 180, dLat = (lat2 - lat1) * r, dLon = (lon2 - lon1) * r;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(dLon / 2) ** 2;
    return 12742 * Math.asin(Math.sqrt(a));
  };

  A.sansAccents = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  /* ——— Toasts */
  A.toast = function (titre, detail, icone) {
    const zone = A.$("#toasts");
    if (!zone) return;
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `<span class="toast-ico" aria-hidden="true">${icone || "🎫"}</span><div><strong>${A.e(titre)}</strong>${detail ? `<span>${A.e(detail)}</span>` : ""}</div>`;
    zone.appendChild(t);
    setTimeout(() => t.classList.add("sortie"), 3200);
    setTimeout(() => t.remove(), 3700);
  };

  /* ——— Progression : chaque action ne rapporte des km qu'une fois */
  A.niveau = function () {
    let n = A.niveaux[0], suivant = null;
    for (let i = 0; i < A.niveaux.length; i++) {
      if (A.etat.km >= A.niveaux[i].km) { n = A.niveaux[i]; suivant = A.niveaux[i + 1] || null; }
    }
    return { n, suivant };
  };

  A.gagner = function (km, cle, message) {
    if (cle && A.etat.gains[cle]) return false;
    if (cle) A.etat.gains[cle] = 1;
    const avant = A.niveau().n;
    A.etat.km += km;
    A.sauver();
    if (message !== false) A.toast(`+${km} km`, message || "Tu avances sur ton trajet", "🚆");
    const apres = A.niveau().n;
    if (apres !== avant) setTimeout(() => A.toast("Nouveau niveau !", apres.nom, "🏅"), 600);
    A.majCompteur();
    return true;
  };

  A.tamponner = function (id) {
    if (A.etat.badges[id]) return;
    const b = A.badges.find(x => x.id === id);
    if (!b) return;
    A.etat.badges[id] = Date.now();
    A.sauver();
    setTimeout(() => A.toast("Tampon débloqué : " + b.nom, b.desc, b.emoji), 400);
    A.gagner(30, "badge-" + id, false);
  };

  A.verifierTampons = function () {
    const s = A.etat;
    if (s.profil) A.tamponner("profil");
    if (s.lus.length >= 5) A.tamponner("curieux");
    if (s.lus.length >= 15) A.tamponner("lecteur");
    if (s.lignes.length >= 5) A.tamponner("cartographe");
    if (s.flips.length >= 10) A.tamponner("decodeur");
    if (s.vfBest >= 10) A.tamponner("mythbuster");
    if (A.checklist.filter(c => s.check.includes(c.id)).length >= 5) A.tamponner("organise");
    if (s.favs.length >= 3) A.tamponner("collection");
  };

  A.majCompteur = function () {
    A.$$("[data-km]").forEach(el => { el.textContent = A.etat.km; });
  };

  A.basculerFavori = function (id) {
    const i = A.etat.favs.indexOf(id);
    if (i >= 0) A.etat.favs.splice(i, 1);
    else { A.etat.favs.push(id); A.gagner(5, "fav-" + id, "Ajouté à ton carnet"); }
    A.sauver();
    A.verifierTampons();
    return i < 0;
  };

  /* ——— Réglages d'accessibilité */
  A.appliquerReglages = function () {
    const r = A.etat.reglages, root = document.documentElement;
    if (r.theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", r.theme);
    root.style.setProperty("--zoom", [1, 1.12, 1.25][r.taille] || 1);
    root.classList.toggle("calme", !!r.calme);
    if (!synthese) root.classList.add("sans-voix");
  };

  /* ——— Compatibilité métier / profil */
  A.compatibilite = function (metier, profil) {
    if (!profil) return null;
    const s = profil.scores;
    const [a, b] = metier.riasec.split("");
    let score = (2 * s[a] + s[b]) / 3;
    // Départage : un métier dont les formations sont accessibles depuis ton bac remonte un peu
    const meilleurAcces = Math.max(...metier.formations.map(fid => A.formationParId[fid].acces[profil.bac || "g"]));
    score += (meilleurAcces - 2) * 4 + (metier.recrute - 2) * 2;
    if (profil.duree === "court" && metier.niveau > 3) score -= 12;
    if (profil.duree === "long" && metier.niveau < 2) score -= 6;
    return Math.max(5, Math.min(99, Math.round(score)));
  };

  /* Score d'une formation pour un profil : accès selon le bac + spécialités + préférences */
  A.scoreFormation = function (f, profil) {
    const bac = profil.bac || "g";
    let s = f.acces[bac] * 20;
    const atouts = bac === "g" ? (profil.specs || []) : bac === "t" ? [profil.serie] : [];
    const communs = f.ideal.filter(x => atouts.includes(x)).length;
    s += Math.min(communs, 2) * 12;
    const type = A.typeParId[f.type];
    if (profil.alternance === "oui" && type.alternance) s += 10;
    const longue = ["pass-las", "ecole-inge", "iep", "ecole-commerce", "cpge"].includes(f.type);
    if (profil.duree === "court" && longue) s -= 15;
    if (profil.duree === "court" && ["bts", "court", "but"].includes(f.type)) s += 8;
    if (profil.duree === "long" && longue) s += 6;
    return s;
  };

  /* ——— Routeur : #accueil, #metiers, #metier-infirmier, #formation-bts-sio, #type-bts… */
  A.pages = {};
  const PARAMETRES = ["metier", "formation", "type", "classe"];
  const ONGLET = { metier: "metiers", formation: "formations", type: "formations", comparer: "carte", classe: "classe" };

  A.lireHash = function () {
    const h = (location.hash || "").replace(/^#/, "") || "accueil";
    for (const p of PARAMETRES) {
      if (h.startsWith(p + "-")) return { page: p, param: h.slice(p.length + 1) };
    }
    return { page: A.pages[h] ? h : "accueil", param: null };
  };

  A.aller = function (cible) {
    if (location.hash === "#" + cible) A.rendre();
    else location.hash = cible;
  };

  /* ——— Lecture à voix haute (synthèse vocale du navigateur, gratuite et hors ligne) */
  const synthese = "speechSynthesis" in window ? window.speechSynthesis : null;
  let lectureEnCours = false;

  function texteALire(racine) {
    const exclus = "script,style,svg,canvas,button,input,select,textarea,kbd,.sr,.toasts,[hidden],[aria-hidden='true']";
    const marcheur = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT, {
      acceptNode: n => n.nodeValue.trim() && !n.parentElement.closest(exclus) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    const morceaux = [];
    for (let n = marcheur.nextNode(); n; n = marcheur.nextNode()) {
      let t = n.nodeValue.replace(/\s+/g, " ").trim();
      const bloc = n.parentElement.closest("h1,h2,h3,li,p,td,th,dt,dd,summary");
      if (bloc && /^H[1-3]$/.test(bloc.tagName) && !/[.!?:]$/.test(t)) t += ".";
      morceaux.push(t);
    }
    return morceaux.join(" ").replace(/\s+([.,;:!?])/g, "$1").replace(/(\d) %/g, "$1 pour cent").replace(/€/g, " euros").replace(/\bbac\+/gi, "bac plus ");
  }

  function decouper(texte) {
    const phrases = texte.match(/[^.!?]+[.!?]*/g) || [texte], blocs = [];
    let courant = "";
    phrases.forEach(p => {
      if ((courant + p).length > 220 && courant) { blocs.push(courant); courant = ""; }
      courant += p;
    });
    if (courant.trim()) blocs.push(courant);
    return blocs;
  }

  A.arreterLecture = function () {
    if (synthese) synthese.cancel();
    lectureEnCours = false;
    majBoutonAudio();
  };

  A.basculerLecture = function () {
    if (!synthese) return;
    if (lectureEnCours) { A.arreterLecture(); return; }
    const blocs = decouper(texteALire(A.$("#app")));
    if (!blocs.length) return;
    const voix = synthese.getVoices().find(v => /^fr/i.test(v.lang));
    lectureEnCours = true;
    majBoutonAudio();
    blocs.forEach((b, i) => {
      const u = new SpeechSynthesisUtterance(b);
      u.lang = "fr-FR"; if (voix) u.voice = voix;
      u.rate = A.etat.reglages.voix || 1;
      if (i === blocs.length - 1) { u.onend = () => { lectureEnCours = false; majBoutonAudio(); }; }
      u.onerror = () => { lectureEnCours = false; majBoutonAudio(); };
      synthese.speak(u);
    });
    A.gagner(5, "audio", "Lecture à voix haute activée");
  };

  function majBoutonAudio() {
    const b = A.$("#btn-audio");
    if (!b) return;
    b.setAttribute("aria-pressed", String(lectureEnCours));
    b.querySelector("span").textContent = lectureEnCours ? "Arrêter" : "Écouter";
  }

  A.rendre = function () {
    if (lectureEnCours) A.arreterLecture();
    const { page, param } = A.lireHash();
    const main = A.$("#app");
    const rendu = A.pages[page] || A.pages.accueil;
    main.classList.remove("entree");
    rendu(main, param);
    void main.offsetWidth;
    main.classList.add("entree");
    const onglet = ONGLET[page] || page;
    A.$$("[data-nav]").forEach(a => {
      const actif = a.dataset.nav === onglet;
      a.classList.toggle("actif", actif);
      if (actif) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    fermerPlus();
    window.scrollTo(0, 0);
    const titre = A.$("h1", main);
    if (titre) {
      titre.setAttribute("tabindex", "-1");
      if (A.premierRenduFait) titre.focus({ preventScroll: true });
      document.title = page === "accueil" ? "Aiguillage" : titre.textContent.trim() + " · Aiguillage";
    }
    A.premierRenduFait = true;
  };

  /* ——— Menu « Plus » et réglages */
  function fermerPlus() {
    const p = A.$("#plus");
    if (p) p.hidden = true;
    A.$$("[data-ouvre-plus]").forEach(b => b.setAttribute("aria-expanded", "false"));
  }

  A.demarrer = function () {
    A.appliquerReglages();
    if (!A.etat.badges.depart) {
      A.etat.badges.depart = Date.now();
      A.sauver();
    }
    A.majCompteur();

    document.addEventListener("click", ev => {
      const plus = ev.target.closest("[data-ouvre-plus]");
      const panneau = A.$("#plus");
      if (plus) {
        const ouvrir = panneau.hidden;
        fermerPlus();
        panneau.hidden = !ouvrir;
        plus.setAttribute("aria-expanded", String(ouvrir));
        if (ouvrir) { const premier = A.$("a, button", panneau); if (premier) premier.focus(); }
        return;
      }
      if (!panneau.hidden && !ev.target.closest("#plus")) fermerPlus();

      const reg = ev.target.closest("[data-reglage]");
      if (reg) {
        const [cle, val] = reg.dataset.reglage.split(":");
        const r = A.etat.reglages;
        if (cle === "theme") r.theme = val;
        if (cle === "taille") r.taille = Number(val);
        if (cle === "calme") r.calme = !r.calme;
        if (cle === "voix") r.voix = Number(val);
        A.sauver();
        A.appliquerReglages();
        majBoutonsReglages();
      }
    });
    document.addEventListener("keydown", ev => { if (ev.key === "Escape") fermerPlus(); });

    majBoutonsReglages();
    // Application installable et hors ligne (sans effet dans l'aperçu claude.ai, où les service workers sont refusés)
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register("sw.js").catch(() => { /* non disponible ici */ });
    }
    if (synthese) synthese.getVoices(); // charge la liste des voix
    document.addEventListener("click", ev => { if (ev.target.closest("#btn-audio")) A.basculerLecture(); });
    window.addEventListener("hashchange", A.rendre);
    A.rendre();
  };

  function majBoutonsReglages() {
    const r = A.etat.reglages;
    A.$$("[data-reglage]").forEach(b => {
      const [cle, val] = b.dataset.reglage.split(":");
      const actif = cle === "theme" ? r.theme === val : cle === "taille" ? r.taille === Number(val) : cle === "voix" ? r.voix === Number(val) : !!r.calme;
      b.setAttribute("aria-pressed", String(actif));
    });
  }
})();
