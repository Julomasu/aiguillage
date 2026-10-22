/* Décodeur, vrai ou faux, calendrier, aides, carnet. */
(function () {
  /* ——— Décodeur de jargon */
  let rechercheMot = "";
  A.pages.decodeur = function (el) {
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">${A.lexique.length} mots</p>
        <h1>Le décodeur</h1>
        <p class="chapo">Le supérieur a son propre langage. Retourne les cartes pour le décoder.</p>
      </section>
      <label class="recherche"><span class="sr">Chercher un mot</span>
        <input id="q-mot" type="search" placeholder="Chercher : ECTS, bourse, oui-si…" value="${A.e(rechercheMot)}" autocomplete="off">
      </label>
      <p class="petit"><span id="nb-flips">${A.etat.flips.length}</span> carte${A.etat.flips.length > 1 ? "s" : ""} retournée${A.etat.flips.length > 1 ? "s" : ""} sur ${A.lexique.length}</p>
      <div class="grille-cartes" id="cartes"></div>`;

    const maj = () => {
      const q = rechercheMot.trim().toLowerCase();
      const liste = A.lexique.filter(m => !q || (m.mot + " " + m.def).toLowerCase().includes(q));
      A.$("#cartes").innerHTML = liste.map(m => {
        const vu = A.etat.flips.includes(m.mot);
        return `<button type="button" class="carte-mot ${vu ? "deja" : ""}" aria-pressed="false" data-mot="${A.e(m.mot)}">
          <span class="cm-face"><strong>${A.e(m.mot)}</strong><span class="petit">Toucher pour décoder</span></span>
          <span class="cm-dos">${A.e(m.def)}</span>
        </button>`;
      }).join("") || `<p class="vide-inline">Aucun mot trouvé.</p>`;
    };

    A.$("#q-mot").addEventListener("input", ev => { rechercheMot = ev.target.value; maj(); });
    el.onclick = ev => {
      const c = ev.target.closest(".carte-mot");
      if (!c) return;
      const retournee = c.getAttribute("aria-pressed") !== "true";
      c.setAttribute("aria-pressed", String(retournee));
      if (retournee) {
        const n = A.ajouterUnique(A.etat.flips, c.dataset.mot);
        A.sauver();
        A.$("#nb-flips").textContent = n;
        A.gagner(2, "mot-" + c.dataset.mot, false);
        A.activite("mot", c.dataset.mot);
        A.verifierTampons();
      }
    };
    maj();
  };

  /* ——— Vrai ou faux */
  let vf = null;
  A.pages.vraifaux = function (el) {
    if (!vf || vf.fini) vf = { i: 0, score: 0, repondu: null, fini: false };
    dessinerVF(el);
    el.onclick = ev => {
      const b = ev.target.closest("button");
      if (!b) return;
      if (b.dataset.vf && vf.repondu === null) {
        const q = A.vraiFaux[vf.i], choix = b.dataset.vf === "vrai";
        vf.repondu = choix;
        if (choix === q.r) vf.score++;
        dessinerVF(el);
        const suite = A.$("[data-suite]", el);
        if (suite) suite.focus();
      } else if ("suite" in b.dataset) {
        vf.i++; vf.repondu = null;
        if (vf.i >= A.vraiFaux.length) terminerVF();
        dessinerVF(el);
        const h = A.$("h1", el); if (h) h.focus({ preventScroll: true });
      } else if ("rejouer" in b.dataset) {
        vf = { i: 0, score: 0, repondu: null, fini: false };
        dessinerVF(el);
      }
    };
  };

  function terminerVF() {
    vf.fini = true;
    A.etat.vfBest = Math.max(A.etat.vfBest, vf.score);
    A.sauver();
    A.gagner(40, "vraifaux", "Quiz vrai ou faux terminé");
    A.activite("quiz", "x");
    A.verifierTampons();
  }

  function dessinerVF(el) {
    const total = A.vraiFaux.length;
    if (vf.fini) {
      const msg = vf.score >= 10 ? "Rien ne t'échappe. Tu pourrais conseiller tes potes." : vf.score >= 7 ? "Pas mal du tout ! Quelques idées reçues à corriger." : "Plein d'idées reçues tombées aujourd'hui. C'est exactement le but.";
      el.innerHTML = `<section class="vf vf-fin">
        <p class="surtitre">Vrai ou faux · résultat</p>
        <h1>${vf.score}/${total}</h1>
        <p class="chapo">${msg}</p>
        <p class="petit">Meilleur score : ${A.etat.vfBest}/${total}</p>
        <div class="actions"><button type="button" class="btn btn-signal" data-rejouer>Rejouer</button><a class="btn btn-ligne" href="#decodeur">Ouvrir le décodeur</a></div>
      </section>`;
      return;
    }
    const q = A.vraiFaux[vf.i], rep = vf.repondu;
    const juste = rep !== null && rep === q.r;
    el.innerHTML = `<section class="vf">
      <p class="surtitre">Vrai ou faux · ${vf.i + 1}/${total} · score ${vf.score}</p>
      <div class="vf-barre" aria-hidden="true"><span style="width:${vf.i / total * 100}%"></span></div>
      <div class="vf-carte ${rep === null ? "" : juste ? "juste" : "faux"}">
        <h1>« ${A.e(q.q)} »</h1>
        ${rep === null ? `
          <div class="vf-choix">
            <button type="button" class="btn vf-btn vf-vrai" data-vf="vrai">Vrai</button>
            <button type="button" class="btn vf-btn vf-faux" data-vf="faux">Faux</button>
          </div>` : `
          <div class="vf-reponse" role="status">
            <p class="vf-verdict">${juste ? "Bien vu !" : "Raté !"}</p>
            <p>${A.e(q.exp)}</p>
            <button type="button" class="btn btn-signal" data-suite>${vf.i + 1 < total ? "Question suivante" : "Voir mon score"}</button>
          </div>`}
      </div>
    </section>`;
  }

  /* ——— Calendrier & checklist */
  A.pages.calendrier = function (el) {
    const fait = A.checklist.map(c => c.id).filter(id => A.etat.check.includes(id));
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Année de terminale</p>
        <h1>Le calendrier</h1>
        <p class="chapo">Les grandes étapes, dans l'ordre. Les dates exactes changent chaque année : vérifie-les sur parcoursup.gouv.fr dès décembre.</p>
      </section>
      <div class="calendrier-zone">
        <ol class="frise">${A.calendrier.map(c => `
          <li><span class="fr-quand">${A.e(c.quand)}</span><div><strong>${A.e(c.titre)}</strong><p>${A.e(c.texte)}</p></div></li>`).join("")}
        </ol>
        <section class="checklist">
          <h2>Ma checklist</h2>
          <p class="petit"><span id="nb-check">${fait.length}</span>/${A.checklist.length} étapes faites</p>
          <div class="jauge"><span id="jauge-check" style="width:${fait.length / A.checklist.length * 100}%"></span></div>
          <ul>${A.checklist.map(c => `<li><input type="checkbox" id="chk-${c.id}" data-check="${c.id}" ${fait.includes(c.id) ? "checked" : ""}><label for="chk-${c.id}">${A.e(c.t)}</label></li>`).join("")}</ul>
        </section>
      </div>`;
    el.onchange = ev => {
      const cb = ev.target.closest("[data-check]");
      if (!cb) return;
      const id = cb.dataset.check, liste = A.etat.check, i = liste.indexOf(id);
      if (cb.checked && i < 0) { liste.push(id); A.gagner(5, "check-" + id, "Étape cochée"); }
      if (!cb.checked && i >= 0) liste.splice(i, 1);
      A.sauver();
      const n = A.checklist.filter(c => liste.includes(c.id)).length;
      A.$("#nb-check").textContent = n;
      A.$("#jauge-check").style.width = (n / A.checklist.length * 100) + "%";
      A.verifierTampons();
    };
    el.onclick = null;
  };

  /* ——— Budget & aides */
  A.pages.aides = function (el) {
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Budget</p>
        <h1>Budget & aides</h1>
        <p class="chapo">L'argent ne doit pas décider de ton orientation. Beaucoup de formations sont gratuites, et il existe des aides que peu de gens demandent.</p>
      </section>
      <section class="bloc">
        <h2>Combien coûte une année ?</h2>
        <p class="petit">Frais de scolarité indicatifs (2026-2027), hors logement et vie quotidienne.</p>
        <ul class="couts">${A.couts.map(c => `<li><span class="c-nom">${A.e(c.f)}</span><span class="c-niv" aria-hidden="true">${[1, 2, 3].map(k => `<i class="${k <= c.niv ? "on" : ""}"></i>`).join("")}</span><span class="c-val">${A.e(c.c)}</span></li>`).join("")}</ul>
      </section>
      <section class="bloc">
        <h2>Les aides à connaître</h2>
        <div class="grille-aides">${A.aides.map(a => `
          <article class="carte-aide">
            <span class="ca-montant">${A.e(a.montant)}</span>
            <h3>${A.e(a.titre)}</h3>
            <p>${A.e(a.texte)}</p>
            <a class="lien-fleche" href="${a.lien}" target="_blank" rel="noopener">${A.e(a.lienTexte)}</a>
          </article>`).join("")}</div>
      </section>
      <a class="bandeau-lien" href="#budget"><strong>Simule ton budget</strong><span>Loyer de ta ville, bourse, APL, job : vois ce qu'il te restera chaque mois.</span></a>
      <aside class="encart encart-savais">
        <strong>Le réflexe à avoir</strong>
        <p>Fais ta demande de bourse (DSE) au printemps de ta terminale, même si tu penses ne pas y avoir droit. Les plafonds sont plus hauts qu'on ne croit, et sans demande, aucune chance de l'obtenir.</p>
      </aside>`;
    el.onclick = null;
    A.gagner(10, "aides", "Tu connais tes droits");
    A.tamponner("budget");
  };

  /* ——— Carnet de voyage */
  let confirmerReset = false;
  A.pages.carnet = function (el) {
    const s = A.etat, { n, suivant } = A.niveau(), p = s.profil;
    const favs = s.favs.map(id => A.metierParId[id]).filter(Boolean);
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Ton carnet de voyage</p>
        <h1>${A.e(n.nom)}</h1>
        <p class="carnet-km"><span data-km>${s.km}</span> km parcourus</p>
        ${suivant ? `<div class="jauge"><span style="width:${Math.round((s.km - n.km) / (suivant.km - n.km) * 100)}%"></span></div><p class="petit">Prochain niveau : ${A.e(suivant.nom)} à ${suivant.km} km</p>` : ""}
      </section>

      <section class="bloc">
        <h2>Tes tampons</h2>
        <div class="tampons">${A.badges.map(b => {
          const t = s.badges[b.id];
          return `<div class="tampon ${t ? "obtenu" : ""}">
            <span class="tp-cercle" aria-hidden="true">${t ? b.emoji : "?"}</span>
            <strong>${A.e(b.nom)}</strong>
            <span class="petit">${t ? "Obtenu le " + new Date(t).toLocaleDateString(A.locale) : A.e(b.desc)}</span>
          </div>`;
        }).join("")}</div>
      </section>

      <section class="bloc">
        <h2>Ton profil</h2>
        ${p ? `<p><span class="code-profil">${p.code}</span> ${A.e(A.profils[p.code[0]].nom)} & ${A.e(A.profils[p.code[1]].nom)} · <a href="#resultat">voir les résultats</a></p>` : `<p>Pas encore de profil. <a href="#test">Faire le test</a></p>`}
      </section>

      <section class="bloc">
        <h2>Tes métiers favoris</h2>
        ${favs.length ? `<div class="grille-metiers">${favs.map(m => A.carteMetier(m, A.compatibilite(m, p))).join("")}</div>` : `<p>Aucun favori pour l'instant. Sur une fiche métier, appuie sur « Ajouter à mon carnet ».</p>`}
      </section>

      <section class="bloc stats-carnet">
        <div><strong>${s.lus.length}</strong><span>fiches lues</span></div>
        <div><strong>${s.lignes.length}/${A.lignes.length}</strong><span>lignes explorées</span></div>
        <div><strong>${s.flips.length}</strong><span>mots décodés</span></div>
        <div><strong>${A.checklist.filter(c => s.check.includes(c.id)).length}/${A.checklist.length}</strong><span>étapes cochées</span></div>
      </section>

      <section class="bloc zone-reset">
        <p class="petit">Ton carnet est enregistré seulement sur cet appareil, dans ce navigateur. Aucune donnée n'est envoyée.</p>
        ${confirmerReset ? `<p><strong>Tout effacer ? Ton profil, tes km et tes tampons seront perdus.</strong></p>
          <div class="actions"><button type="button" class="btn btn-danger" data-reset-ok>Oui, tout effacer</button><button type="button" class="btn btn-ligne" data-reset-non>Annuler</button></div>`
          : `<button type="button" class="btn-texte" data-reset>Effacer mon carnet</button>`}
      </section>`;
    el.onclick = ev => {
      const b = ev.target.closest("button");
      if (!b) return;
      if ("reset" in b.dataset) { confirmerReset = true; A.pages.carnet(el); A.$("[data-reset-non]").focus(); }
      if ("resetNon" in b.dataset) { confirmerReset = false; A.pages.carnet(el); }
      if ("resetOk" in b.dataset) { confirmerReset = false; A.reinitialiser(); A.majCompteur(); A.toast("Carnet effacé", "Nouveau départ !", "🧹"); A.pages.carnet(el); }
    };
  };
})();
