/* Accueil : le plan du réseau en miniature + les portes d'entrée. */
(function () {
  /* Petit plan radial : le bac au centre, une ligne par domaine. */
  A.miniPlan = function () {
    const cx = 200, cy = 200, n = A.lignes.length;
    let traits = "", gares = "";
    A.lignes.forEach((l, i) => {
      const ang = (-90 + i * 360 / n) * Math.PI / 180;
      const x2 = cx + Math.cos(ang) * 168, y2 = cy + Math.sin(ang) * 168;
      const coude = i % 2 ? 0.55 : 0.45;
      const xm = cx + Math.cos(ang) * 168 * coude, ym = cy + Math.sin(ang) * 168 * coude;
      traits += `<path class="mp-trait" style="--d:${i * 70}ms" d="M${cx} ${cy} L${xm.toFixed(1)} ${ym.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${l.couleur}"/>`;
      [0.45, 0.72, 1].forEach((k, j) => {
        const x = cx + Math.cos(ang) * 168 * k, y = cy + Math.sin(ang) * 168 * k;
        gares += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${j === 2 ? 7 : 4.5}" class="mp-gare" stroke="${l.couleur}"/>`;
      });
    });
    return `<svg class="mini-plan" viewBox="0 0 400 400" role="img" aria-label="Plan stylisé : dix lignes partent du bac vers dix grands domaines">
      ${traits}${gares}
      <circle cx="${cx}" cy="${cy}" r="30" class="mp-centre"/>
      <text x="${cx}" y="${cy + 5}" text-anchor="middle" class="mp-texte">BAC</text>
    </svg>`;
  };


  /* Toutes les fonctions du site, rangées par besoin : chaque porte a son icône pour qu'on comprenne d'un coup d'œil. */
  const GROUPES = [
    { id: "trouver", cols: 3, icone: "🧭", titre: "Se trouver", portes: [
      { id: "test", i: "🎯", c: "#FFC629", nom: "Le test", desc: "18 situations, ton profil, les métiers et formations qui te correspondent." },
      { id: "plan", i: "🚇", c: "#2F5BEA", nom: "L'arborescence", desc: "Bac, domaines, formations, métiers : vois où mène chaque voie selon ton bac." },
      { id: "metiers", i: "💼", c: "#E4572E", nom: "Les métiers", desc: "Journée type, salaire, études, et ce qu'on ne te dit pas toujours." }
    ] },
    { id: "choisir", cols: 4, icone: "🏫", titre: "Choisir sa formation ou son école", portes: [
      { id: "formations", i: "⚖️", c: "#1B998B", nom: "BTS, BUT, prépa, fac…", desc: "Coût, sélection, encadrement : compare les formations côte à côte." },
      { id: "ecoles", i: "🏫", c: "#E85D9E", nom: "Les écoles", desc: "IÉSEG, École Bleue, Epitech… toutes les écoles, même celles hors Parcoursup." },
      { id: "carte", i: "🗺️", c: "#3BB3E0", nom: "La carte", desc: "Les formations près de chez toi, avec leur vrai taux d'accès sur Parcoursup." },
      { id: "comparer", i: "🔀", c: "#7A3FD1", nom: "Comparer 2 formations", desc: "Taux d'accès, places, profil des admis, emploi : deux formations précises face à face." }
    ] },
    { id: "preparer", cols: 3, icone: "📝", titre: "Préparer son dossier", portes: [
      { id: "calendrier", i: "📅", c: "#F2A71B", nom: "Le calendrier", desc: "Parcoursup étape par étape" },
      { id: "jpo", i: "🚪", c: "#E4572E", nom: "Portes ouvertes", desc: "Ton planning et tes rappels agenda" },
      { id: "budget", i: "💶", c: "#9C6644", nom: "Ton budget", desc: "Loyer de ta ville, bourse, APL : combien il te restera chaque mois." },
      { id: "aides", i: "🧾", c: "#1B998B", nom: "Budget & aides", desc: "Ce que ça coûte, ce qu'on te doit" },
      { id: "reseau", i: "🔗", c: "#6BBF59", nom: "LinkedIn & réseau", desc: "Vois ce qu'ont fait les gens avant toi et ose leur écrire." },
      { id: "decodeur", i: "🔓", c: "#7A3FD1", nom: "Le décodeur", desc: "« Oui-si », ECTS, CVEC, DSE… le jargon expliqué simplement." }
    ] },
    { id: "plus", cols: 3, icone: "✨", titre: "Aller plus loin", portes: [
      { id: "assistant", i: "💬", c: "#F6D23B", nom: "Pose ta question", desc: "Un assistant qui répond à partir des fiches et des données officielles." },
      { id: "defis", i: "🏆", c: "#E85D9E", nom: "Défis de la semaine", desc: "3 défis, 25 km chacun" },
      { id: "temoignages", i: "🗣️", c: "#2F5BEA", nom: "Témoignages", desc: "Des étudiant·es racontent" },
      { id: "classe", i: "🧑‍🏫", c: "#1B998B", nom: "Espace enseignant·e", desc: "Lancer le test en classe" },
      { id: "vraifaux", i: "✅", c: "#17824F", nom: "Vrai ou faux", desc: "12 idées reçues" },
      { id: "carnet", i: "📓", c: "#9C6644", nom: "Mon carnet", desc: "Km, tampons, favoris" }
    ] }
  ];

  A.pages.accueil = function (el) {
    const s = A.etat, { n, suivant } = A.niveau();
    const profil = s.profil;
    const nbTampons = Object.keys(s.badges).length;
    el.innerHTML = `
      <section class="hero">
        <div class="hero-texte">
          <p class="surtitre">Orientation après le bac</p>
          <h1>Dix lignes, des centaines de gares.<br><span class="surligne">Trouve ton trajet.</span></h1>
          <p class="chapo">Aiguillage t'aide à comprendre les études supérieures sans jargon : quel bac mène où, combien ça coûte, ce qu'on fait vraiment dans chaque métier. Gratuit, sans inscription.</p>
          <div class="actions">
            <a class="btn btn-signal" href="#test">${profil ? "Refaire le test" : "Faire le test (5 min)"}</a>
            <a class="btn btn-ligne" href="#plan">Explorer le plan</a>
          </div>
        </div>
        <div class="hero-plan">${A.miniPlan()}</div>
      </section>

      ${profil ? `
      <section class="bandeau-profil">
        <div>
          <p class="surtitre">Ton profil</p>
          <p class="bp-code"><span>${profil.code}</span> ${A.e(A.profils[profil.code[0]].nom)} · ${A.e(A.profils[profil.code[1]].nom)}</p>
        </div>
        <a class="btn btn-ligne" href="#resultat">Voir mes résultats</a>
      </section>` : ""}

      ${GROUPES.map(g => `
      <section class="groupe-portes" aria-labelledby="gp-${g.id}">
        <h2 class="gp-titre" id="gp-${g.id}"><span aria-hidden="true">${g.icone}</span>${A.e(g.titre)}</h2>
        <div class="portes" style="--cols:${g.cols}">
          ${g.portes.map(f => `<a class="porte" href="#${f.id}" style="--c:${f.c}">
            <span class="porte-ico" aria-hidden="true">${f.i}</span>
            <span class="porte-corps"><strong>${A.e(f.nom)}</strong><span>${A.e(f.desc)}</span></span>
          </a>`).join("")}
        </div>
      </section>`).join("")}

      <section class="carte-progres">
        <div class="cp-niveau">
          <p class="surtitre">Ton carnet de voyage</p>
          <p class="cp-km"><span data-km>${s.km}</span> km</p>
          <p class="cp-nom">${A.e(n.nom)}</p>
          ${suivant ? `<div class="jauge" role="progressbar" aria-label="Progression vers le niveau suivant" aria-valuemin="${n.km}" aria-valuemax="${suivant.km}" aria-valuenow="${s.km}"><span style="width:${Math.round((s.km - n.km) / (suivant.km - n.km) * 100)}%"></span></div>
          <p class="petit">Encore ${suivant.km - s.km} km pour devenir ${A.e(suivant.nom)}</p>` : `<p class="petit">Niveau maximum atteint. Respect.</p>`}
        </div>
        <div class="cp-tampons">
          <p class="petit">${nbTampons} tampon${nbTampons > 1 ? "s" : ""} sur ${A.badges.length}</p>
          <div class="mini-tampons">${A.badges.map(b => `<span class="mini-tampon ${s.badges[b.id] ? "ok" : ""}" title="${A.e(b.nom)}">${s.badges[b.id] ? b.emoji : "·"}</span>`).join("")}</div>
          <a class="lien-fleche" href="#carnet">Ouvrir mon carnet</a>
        </div>
      </section>

      ${A.blocDefis(true)}

      <section class="vf-teaser">
        <div>
          <p class="surtitre">Vrai ou faux ?</p>
          <p class="vf-teaser-q">« ${A.e(A.vraiFaux[0].q)} »</p>
        </div>
        <a class="btn btn-ligne" href="#vraifaux">Jouer (12 questions)</a>
      </section>
    `;
  };
})();
