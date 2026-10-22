/* Simulateur de budget étudiant : loyers officiels par ville, bourses 2026-2027, repas à 1 €. */
(function () {
  const C = A.chiffres;
  const FORMATIONS = [
    { id: "univ", nom: "Université (licence, BUT, PASS)", frais: () => C.droitsLicence + C.cvec, exonere: true },
    { id: "cpge", nom: "Prépa publique", frais: () => C.droitsLicence + C.cvec, exonere: true },
    { id: "bts", nom: "BTS public", frais: () => 0, exonere: true },
    { id: "inge", nom: "École d'ingé publique", frais: () => 630 + C.cvec, exonere: true, approx: true },
    { id: "prive", nom: "École privée", frais: () => 8000, exonere: false, approx: true },
    { id: "alternance", nom: "En alternance", frais: () => C.cvec, exonere: true }
  ];
  const LOGEMENTS = [
    { id: "parents", nom: "Chez mes parents" },
    { id: "crous", nom: "Résidence Crous" },
    { id: "coloc", nom: "Colocation" },
    { id: "studio", nom: "Studio" }
  ];

  const defaut = () => ({ logement: "studio", surface: 18, loyerCrous: "", formation: "univ", fraisPrive: 8000, echelon: "aucune",
    apl: "", famille: 0, jobHeures: 0, salaireApprenti: 800, courses: 150, repas: 15, transport: 0, transportManuel: false, tel: 15, loisirs: 50 });

  function etat() {
    if (!A.etat.budget) A.etat.budget = defaut();
    return A.etat.budget;
  }

  /* Pass de transport étudiant par ville, en € par mois (sources : sites des réseaux, 2026-2027).
     Paris / Île-de-France : forfait Imagine R Étudiant 393,30 €/an (Île-de-France Mobilités), souvent payé en 9 mensualités ≈ 44 €.
     Marseille : Pass annuel étudiant RTM 220 €/an. Bordeaux : Pass Jeune annuel TBM 256,80 €/an. Lyon : abonnement mensuel étudiant TCL 26 € (rentrée 2026).
     Ailleurs : ordre de grandeur (20 à 30 € par mois), à vérifier sur le site du réseau local. */
  const T = (fr, en) => A.lang === "en" ? en : fr;
  const IDF = ["75", "77", "78", "91", "92", "93", "94", "95"];
  function transportVille() {
    const v = A.etat.ville;
    if (!v) return { mois: 30, info: T("Valeur de départ : choisis ta ville pour voir le prix du pass étudiant.", "Starting value: choose your city to see the student pass price.") };
    const n = A.sansAccents(v.nom);
    if (IDF.includes(v.dep)) return { mois: 44, info: T("Île-de-France : le forfait Imagine R Étudiant coûte 393,30 € par an (payable en 9 mensualités, soit ≈ 44 € par mois ; ≈ 33 € lissé sur 12 mois). Sans ce forfait, un Navigo mensuel dépasse 90 €.", "Île-de-France: the Imagine R Student pass costs €393.30 a year (payable in 9 instalments, i.e. ≈ €44 a month; ≈ €33 spread over 12 months). Without it, a monthly Navigo exceeds €90.") };
    if (n === "lyon") return { mois: 26, info: T("Lyon : abonnement mensuel étudiant TCL à 26 € (tarif rentrée 2026).", "Lyon: TCL monthly student pass at €26 (autumn 2026 fare).") };
    if (n === "marseille") return { mois: 18, info: T("Marseille : Pass annuel étudiant RTM à 220 € par an (≈ 18 € par mois).", "Marseille: RTM annual student pass at €220 a year (≈ €18 a month).") };
    if (n === "bordeaux") return { mois: 21, info: T("Bordeaux : Pass Jeune annuel TBM à 256,80 € par an (≈ 21 € par mois).", "Bordeaux: TBM annual Youth Pass at €256.80 a year (≈ €21 a month).") };
    return { mois: 25, info: T("Estimation (20 à 30 € par mois selon les réseaux). Vérifie le tarif étudiant sur le site du réseau de ta ville.", "Estimate (€20 to €30 a month depending on the network). Check the student fare on your city network's site.") };
  }

  function loyerVille(loyers) {
    const v = A.etat.ville;
    if (!v) return null;
    const n = A.sansAccents(v.nom);
    const l = loyers.find(x => A.sansAccents(x[0]) === n && x[1] === v.dep);
    return l ? l[2] : null;
  }

  function calculer(b, m2) {
    const form = FORMATIONS.find(x => x.id === b.formation);
    const bourse = C.bourses.find(x => x.id === b.echelon);
    const boursier = bourse.annuel > 0;
    let loyer = 0, loyerInfo = "";
    if (b.logement === "studio") { loyer = m2 ? Math.round(m2 * b.surface) : 0; loyerInfo = m2 ? `${b.surface} m² × ${m2.toFixed(2).replace(".", ",")} €/m²` : "ville sans données"; }
    if (b.logement === "coloc") { loyer = m2 ? Math.round(m2 * 14) : 0; loyerInfo = m2 ? "≈ 14 m² par personne (chambre + parties communes)" : "ville sans données"; }
    if (b.logement === "crous") { loyer = Number(b.loyerCrous) || 0; loyerInfo = b.loyerCrous ? "loyer indiqué" : "à renseigner"; }
    let fraisAn = b.formation === "prive" ? Number(b.fraisPrive) || 0 : form.frais();
    if (boursier && form.exonere) fraisAn = 0;
    const depenses = [
      { id: "loyer", nom: "Logement", v: loyer, info: loyerInfo },
      { id: "courses", nom: "Courses", v: Number(b.courses) || 0 },
      { id: "repas", nom: "Repas Crous", v: (Number(b.repas) || 0) * C.repasCrous, info: `${b.repas} repas à 1 €` },
      { id: "transport", nom: "Transport", v: b.transportManuel ? Number(b.transport) || 0 : transportVille().mois, info: b.transportManuel ? "" : T("pass étudiant de ta ville", "your city's student pass") },
      { id: "tel", nom: "Téléphone, internet", v: Number(b.tel) || 0 },
      { id: "loisirs", nom: "Loisirs, sorties", v: Number(b.loisirs) || 0 },
      { id: "frais", nom: "Frais d'inscription", v: Math.round(fraisAn / 12), info: fraisAn ? `${A.euros(fraisAn)} par an, lissés sur 12 mois` : (boursier ? "exonéré·e grâce à la bourse" : "gratuit") }
    ];
    const ressources = [
      { id: "bourse", nom: "Bourse", v: Math.round(bourse.annuel / 10), info: boursier ? `${A.euros(bourse.annuel)} par an en 10 mensualités` : "" },
      { id: "apl", nom: "APL", v: Number(b.apl) || 0, info: b.logement === "parents" ? "" : (b.apl === "" ? "à estimer sur caf.fr" : "") },
      { id: "famille", nom: "Aide de ta famille", v: Number(b.famille) || 0 },
      { id: "job", nom: "Job étudiant", v: Math.round((Number(b.jobHeures) || 0) * 52 / 12 * C.smicNetHoraire), info: b.jobHeures ? `${b.jobHeures} h/semaine au SMIC net` : "" }
    ];
    if (b.formation === "alternance") ressources.push({ id: "apprenti", nom: "Salaire d'apprenti", v: Number(b.salaireApprenti) || 0 });
    const totD = depenses.reduce((s, x) => s + x.v, 0), totR = ressources.reduce((s, x) => s + x.v, 0);
    return { depenses, ressources, totD, totR, solde: totR - totD, boursier, form };
  }

  const COULEURS_D = ["#E4572E", "#F2A71B", "#F6D23B", "#3BB3E0", "#7A3FD1", "#E85D9E", "#9C6644"];
  const COULEURS_R = ["#1B998B", "#6BBF59", "#2F5BEA", "#3BB3E0", "#7A3FD1"];

  function barre(items, total, echelle, couleurs) {
    return `<div class="bud-barre" style="width:${Math.max(4, total / echelle * 100)}%">${items.filter(x => x.v > 0).map((x, i) =>
      `<i style="flex:${x.v};background:${couleurs[items.indexOf(x) % couleurs.length]}" title="${A.e(x.nom)} : ${A.euros(x.v)}"></i>`).join("")}</div>`;
  }

  function lignes(items, couleurs) {
    return `<ul class="bud-lignes">${items.map((x, i) => `<li><i style="background:${couleurs[i % couleurs.length]}"></i><span>${A.e(x.nom)}${x.info ? `<small>${A.e(x.info)}</small>` : ""}</span><b>${A.euros(x.v)}</b></li>`).join("")}</ul>`;
  }

  function conseils(b, r, m2) {
    const c = [];
    if (r.boursier) c.push("Boursier·e : tu ne paies ni les frais d'inscription dans le public, ni la CVEC. Tu es aussi prioritaire pour un logement Crous.");
    else c.push("Fais quand même ta demande de bourse (DSE) au printemps : les plafonds de revenus sont plus hauts qu'on ne le pense.");
    if (b.logement === "studio" && m2) c.push(`Un logement Crous coûte en général bien moins cher qu'un studio privé. Demande-le avec ton DSE.`);
    if (b.logement !== "parents" && b.apl === "") c.push("Tu as sûrement droit à l'APL, même en colocation ou en résidence Crous. Fais une simulation sur caf.fr puis reporte le montant ici.");
    if (b.jobHeures > 15) c.push("Au-delà d'une quinzaine d'heures par semaine, un job pèse souvent sur la réussite des études. L'alternance peut être une meilleure option.");
    if (r.solde < 0) c.push("Ton budget est dans le rouge : regarde l'alternance (formation gratuite + salaire), le logement Crous, ou une ville moins chère pour la même formation sur la carte.");
    return c;
  }

  A.pages.budget = function (el) {
    const b = etat();
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Simulateur</p>
        <h1>Ton budget étudiant</h1>
        <p class="chapo">Combien il te restera chaque mois, selon la ville, le logement et ta bourse. Les loyers viennent de la carte des loyers officielle, les bourses du barème 2026-2027. Toutes les aides sont détaillées dans <a href="#aides">Budget & aides</a>.</p>
      </section>
      <div class="budget-zone" id="budget-zone"><p class="petit">Chargement des loyers…</p></div>
      <div id="budget-villes"></div>`;

    Promise.all([A.donnees("loyers"), A.donnees("villes")]).then(([loyers, villes]) => {
      if (A.lireHash().page !== "budget") return;
      const L = loyers.lignes;
      const dessiner = () => {
        const m2 = loyerVille(L), r = calculer(b, m2), v = A.etat.ville;
        const echelle = Math.max(r.totD, r.totR, 1);
        A.$("#budget-zone").innerHTML = `
          <form class="budget-form" onsubmit="return false">
            <label class="champ"><span>Ville d'études</span>
              <input id="bud-ville" list="bud-villes" type="search" autocomplete="off" placeholder="Ex. Toulouse" value="${A.e(v ? v.nom + " (" + v.dep + ")" : "")}">
              <datalist id="bud-villes">${L.map(x => `<option value="${A.e(x[0])} (${x[1]})"></option>`).join("")}</datalist>
              <small>${v ? (m2 ? `Loyer moyen d'un 1-2 pièces : <b>${m2.toFixed(2).replace(".", ",")} €/m²</b> charges comprises` : "Pas de donnée de loyer pour cette ville : choisis une grande ville proche.") : "217 villes étudiantes disponibles"}</small>
            </label>
            <fieldset class="champ"><legend>Logement</legend>
              <div class="puces">${LOGEMENTS.map(x => `<button type="button" class="puce" data-logement="${x.id}" aria-pressed="${b.logement === x.id}">${x.nom}</button>`).join("")}</div>
            </fieldset>
            ${b.logement === "studio" ? `<label class="champ"><span>Surface : <b>${b.surface} m²</b></span><input id="bud-surface" type="range" min="10" max="35" value="${b.surface}"></label>` : ""}
            ${b.logement === "crous" ? `<label class="champ"><span>Loyer de la résidence (€/mois)</span><input id="bud-crous" type="number" min="0" inputmode="numeric" placeholder="Regarde sur trouverunlogement.lescrous.fr" value="${A.e(b.loyerCrous)}"></label>` : ""}
            <label class="champ"><span>Formation</span>
              <select id="bud-formation">${FORMATIONS.map(x => `<option value="${x.id}" ${b.formation === x.id ? "selected" : ""}>${x.nom}</option>`).join("")}</select>
            </label>
            ${b.formation === "prive" ? `<label class="champ"><span>Frais de scolarité par an (€)</span><input id="bud-prive" type="number" min="0" value="${b.fraisPrive}"></label>` : ""}
            ${b.formation === "alternance" ? `<label class="champ"><span>Salaire d'apprenti (€/mois)</span><input id="bud-apprenti" type="number" min="0" value="${b.salaireApprenti}"><small>Il dépend de ton âge et de l'année de contrat : vérifie sur alternance.emploi.gouv.fr</small></label>` : ""}
            <label class="champ"><span>Bourse Crous</span>
              <select id="bud-echelon">${C.bourses.map(x => `<option value="${x.id}" ${b.echelon === x.id ? "selected" : ""}>${x.nom}${x.annuel ? " · " + A.euros(Math.round(x.annuel / 10)) + "/mois" : ""}</option>`).join("")}</select>
              <small><a href="https://www.messervices.etudiant.gouv.fr" target="_blank" rel="noopener">Estimer mon échelon (simulateur officiel)</a></small>
            </label>
            ${b.logement !== "parents" ? `<label class="champ"><span>APL (€/mois)</span><input id="bud-apl" type="number" min="0" placeholder="À simuler sur caf.fr" value="${A.e(b.apl)}">
              <small>La CAF tient compte de ton loyer jusqu'à ${A.euros(Math.round(C.plafondsApl.zone1))} (zone 1, ex. Paris), ${A.euros(Math.round(C.plafondsApl.zone2))} (zone 2) ou ${A.euros(Math.round(C.plafondsApl.zone3))} (zone 3). <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F12006" target="_blank" rel="noopener">Comment l'estimer</a></small></label>` : ""}
            <div class="champs-2">
              <label class="champ"><span>Aide de ta famille (€/mois)</span><input id="bud-famille" type="number" min="0" value="${b.famille}"></label>
              <label class="champ"><span>Job : heures/semaine</span><input id="bud-job" type="number" min="0" max="35" value="${b.jobHeures}"></label>
            </div>
            <details class="bud-details"><summary>Ajuster les dépenses du quotidien</summary>
              <div class="champs-2">
                <label class="champ"><span>Courses (€)</span><input id="bud-courses" type="number" min="0" value="${b.courses}"></label>
                <label class="champ"><span>Repas Crous / mois</span><input id="bud-repas" type="number" min="0" max="60" value="${b.repas}"></label>
                <label class="champ"><span>Transport (€/mois)</span><input id="bud-transport" type="number" min="0" value="${b.transportManuel ? b.transport : r.depenses.find(x => x.id === "transport").v}"><small>${A.e(transportVille().info)}</small></label>
                <label class="champ"><span>Téléphone, internet (€)</span><input id="bud-tel" type="number" min="0" value="${b.tel}"></label>
                <label class="champ"><span>Loisirs (€)</span><input id="bud-loisirs" type="number" min="0" value="${b.loisirs}"></label>
              </div>
              <small>Ce sont des valeurs de départ à adapter à ta situation.</small>
            </details>
          </form>
          <section class="budget-resultat" aria-live="polite">
            <p class="surtitre">Reste à vivre par mois</p>
            ${loyerManquant(b, m2) ? `<p class="bud-attente">${A.e(loyerManquant(b, m2))}</p>` : `<p class="bud-solde ${r.solde < 0 ? "neg" : "pos"}">${r.solde >= 0 ? "+" : "−"} ${A.euros(Math.abs(Math.round(r.solde)))}</p>`}
            <div class="bud-comparaison">
              <div><span>Ressources <b>${A.euros(r.totR)}</b></span>${barre(r.ressources, r.totR, echelle, COULEURS_R)}</div>
              <div><span>Dépenses <b>${A.euros(r.totD)}</b></span>${barre(r.depenses, r.totD, echelle, COULEURS_D)}</div>
            </div>
            <div class="bud-colonnes">
              <div><h3>Ressources</h3>${lignes(r.ressources, COULEURS_R)}</div>
              <div><h3>Dépenses</h3>${lignes(r.depenses, COULEURS_D)}</div>
            </div>
            <ul class="bud-conseils">${conseils(b, r, m2).map(c => `<li>${A.e(c)}</li>`).join("")}</ul>
          </section>
          `;
        A.$("#budget-villes").innerHTML = comparatifVilles(L, villes.lignes);
      };

      const majDepuis = id => {
        const val = A.$("#" + id) && A.$("#" + id).value;
        const cles = { "bud-surface": "surface", "bud-crous": "loyerCrous", "bud-prive": "fraisPrive", "bud-apprenti": "salaireApprenti", "bud-apl": "apl", "bud-famille": "famille", "bud-job": "jobHeures", "bud-courses": "courses", "bud-repas": "repas", "bud-transport": "transport", "bud-tel": "tel", "bud-loisirs": "loisirs", "bud-formation": "formation", "bud-echelon": "echelon" };
        if (!cles[id]) return false;
        const cle = cles[id];
        b[cle] = ["loyerCrous", "apl", "formation", "echelon"].includes(cle) ? val : Number(val) || 0;
        if (cle === "transport") b.transportManuel = true;
        return true;
      };

      // On redessine à la sortie du champ (change) pour ne pas perdre le focus pendant la saisie
      el.oninput = ev => { if (ev.target.id === "bud-surface") { majDepuis("bud-surface"); A.sauver(); garderFocus(dessiner, "bud-surface"); } };
      el.onchange = ev => {
        const id = ev.target.id;
        if (id === "bud-ville") {
          const m = ev.target.value.match(/^(.*?)\s*\((\w+)\)\s*$/);
          const nom = A.sansAccents(m ? m[1] : ev.target.value).trim();
          const l = L.find(x => A.sansAccents(x[0]) === nom && (!m || x[1] === m[2]));
          if (l) {
            const coord = villes.lignes.find(x => A.sansAccents(x[0]) === nom && x[1] === l[1]);
            A.etat.ville = { nom: l[0], dep: l[1], lat: coord ? coord[2] : null, lon: coord ? coord[3] : null };
          }
        } else if (!majDepuis(id)) return;
        A.sauver();
        A.gagner(15, "budget", "Budget simulé");
        A.activite("budget", "x");
        garderFocus(dessiner, id);
      };
      el.onclick = ev => {
        const t = ev.target.closest("[data-logement]");
        if (!t) return;
        b.logement = t.dataset.logement; A.sauver(); garderFocus(dessiner, null, t.dataset.logement);
      };
      dessiner();
    }).catch(() => { A.$("#budget-zone").innerHTML = A.messageErreurDonnees; });
  };

  /* Sans loyer, le reste à vivre n'aurait pas de sens : on le dit au lieu d'afficher un chiffre trompeur */
  function loyerManquant(b, m2) {
    if ((b.logement === "studio" || b.logement === "coloc") && !m2) return A.etat.ville ? "Pas de donnée de loyer pour cette ville : choisis la grande ville la plus proche." : "Choisis ta ville d'études pour estimer ton loyer.";
    if (b.logement === "crous" && !b.loyerCrous) return "Indique le loyer de ta résidence Crous.";
    return "";
  }

  function garderFocus(dessiner, id, logement) {
    dessiner();
    const cible = id ? A.$("#" + id) : A.$(`[data-logement="${logement}"]`);
    if (cible) cible.focus({ preventScroll: true });
  }

  /* Loyer d'un studio de 18 m² dans les plus grandes villes étudiantes (par nombre de places Parcoursup) */
  function comparatifVilles(L, villes) {
    const lignes = [];
    for (const v of villes) {
      const l = L.find(x => A.sansAccents(x[0]) === A.sansAccents(v[0]) && x[1] === v[1]);
      if (l) lignes.push([v[0], Math.round(l[2] * 18)]);
      if (lignes.length === 12) break;
    }
    lignes.sort((a, b) => b[1] - a[1]);
    const max = lignes[0][1];
    return `<section class="bloc bud-villes">
      <h2>Un studio de 18 m² dans les 12 plus grandes villes étudiantes</h2>
      <ul class="barres-h">${lignes.map(([n, v]) => `<li><span>${A.e(n)}</span><span class="bh-piste"><i style="width:${v / max * 100}%"></i></span><b>${A.euros(v)}</b></li>`).join("")}</ul>
      <p class="petit">Loyers d'annonce charges comprises, appartements de 1-2 pièces. Source : carte des loyers 2025 (ANIL / ministère du Logement, Licence Ouverte). Paris, Lyon et Marseille : moyenne des arrondissements.</p>
    </section>`;
  }
})();
