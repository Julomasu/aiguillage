/* Comparateur de formations précises : jusqu'à 3 formations Parcoursup choisies sur la carte, côte à côte. */
(function () {
  const MAX = 3;

  A.compareIds = () => A.etat.compareF || (A.etat.compareF = []);

  /* Ajoute ou retire une formation ; renvoie true si elle est maintenant dans la sélection */
  A.basculerComparaison = function (id) {
    const l = A.compareIds(), i = l.indexOf(id);
    if (i >= 0) { l.splice(i, 1); A.sauver(); return false; }
    if (l.length >= MAX) l.shift();
    l.push(id); A.sauver();
    return true;
  };

  const FILI_INSERTION = {
    "Licence": ["Licence générale"], "Ecole d'Ingénieur": ["Diplôme d'ingénieurs"],
    "Ecole de Commerce": ["Diplôme visé niveau bac + 5 grade master"]
  };

  function cout(r) {
    const c = A.chiffres;
    if (!r.public) return { texte: "Frais privés : souvent 5 000 à 15 000 € par an, à vérifier sur le site de l'école", niv: 3 };
    if (r.fili === "BTS" || r.fili === "CPGE") return { texte: r.fili === "CPGE" ? `Gratuit (+ inscription fac ${A.euros(c.droitsLicence)} + CVEC, 0 € si boursier·e)` : "Gratuit", niv: 1 };
    if (["BUT", "Licence", "PASS", "Licence_Las"].includes(r.fili)) return { texte: `${A.euros(c.droitsLicence)} + CVEC ${A.euros(c.cvec)} (0 € si boursier·e)`, niv: 1 };
    return { texte: "Frais publics, à vérifier sur la fiche Parcoursup", niv: 2 };
  }

  function loyer(r, loyers) {
    const n = A.sansAccents(r.ville);
    const l = loyers.find(x => A.sansAccents(x[0]) === n && x[1] === r.dep);
    return l ? Math.round(l[2] * 18) : null;
  }

  A.pages.comparer = function (el) {
    const ids = A.compareIds();
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Comparateur</p>
        <h1>Compare tes formations</h1>
        <p class="chapo">Choisis jusqu'à ${MAX} formations sur <a href="#carte">la carte</a> avec le bouton « Comparer ». Tu vois côte à côte les vrais chiffres Parcoursup, le coût, le loyer de la ville et l'insertion.</p>
      </section>
      <div id="cmp-zone"><p class="petit">Chargement…</p></div>`;
    if (!ids.length) {
      A.$("#cmp-zone").innerHTML = `<div class="panneau-vide"><p>Aucune formation sélectionnée pour l'instant.</p><a class="btn btn-signal" href="#carte">Ouvrir la carte</a></div>`;
      return;
    }
    Promise.all([A.parcoursup(), A.donnees("loyers"), A.insertion().catch(() => null)]).then(([psup, loyers, ins]) => {
      if (A.lireHash().page !== "comparer") return;
      const rs = ids.map(id => psup.lignes.find(r => r.id === id)).filter(Boolean);
      const ville = A.etat.ville, p = A.etat.profil;
      const barre = r => r.gen == null ? "–" : `<span class="admis-barre"><i class="ad-g" style="width:${r.gen}%"></i><i class="ad-t" style="width:${r.tec}%"></i><i class="ad-p" style="width:${r.pro}%"></i></span><span class="petit">${r.gen} % général · ${r.tec} % techno · ${r.pro} % pro</span>`;
      const meilleur = (cle, sens) => {
        const v = rs.map(r => r[cle]).filter(x => x != null);
        return v.length > 1 ? (sens > 0 ? Math.max(...v) : Math.min(...v)) : null;
      };
      const mTaux = meilleur("taux", 1), mPlaces = meilleur("places", 1);
      const insDe = r => { const cle = FILI_INSERTION[r.fili]; return cle ? A.recordInsertion(cle, ins) : null; };
      const lignes = [
        ["Établissement", r => `${A.e(r.etab)}<span class="petit">${A.e(r.ville)} · ${r.public ? "Public" : "Privé"}</span>`],
        ["Type", r => A.e(r.famille.nom) + (r.selective ? `<span class="petit">Sélective</span>` : `<span class="petit">Non sélective</span>`)],
        ville ? [`Distance de ${A.e(ville.nom)}`, r => r.lat == null ? "–" : `<b>${Math.round(A.distanceKm(ville.lat, ville.lon, r.lat, r.lon))} km</b>`] : null,
        ["Taux d'accès", r => r.taux == null ? "–" : `<b class="${r.taux === mTaux ? "meilleur" : ""}">${r.taux} %</b><span class="petit">des candidat·es ont reçu une proposition</span>`],
        ["Places", r => r.places == null ? "–" : `<b class="${r.places === mPlaces ? "meilleur" : ""}">${r.places}</b>${r.voeux ? `<span class="petit">${r.voeux.toLocaleString(A.locale)} vœux, soit ${(r.voeux / Math.max(1, r.places)).toFixed(1).replace(".", ",")} par place</span>` : ""}`],
        ["Qui est admis", barre],
        p ? [`Admis de ton bac (${{ g: "général", t: "techno", p: "pro" }[p.bac]})`, r => { const v = { g: r.gen, t: r.tec, p: r.pro }[p.bac]; return v == null ? "–" : `<b>${v} %</b>`; }] : null,
        ["Boursier·es admis", r => r.bours == null ? "–" : r.bours + " %"],
        ["Coût par an", r => { const c = cout(r); return `<span class="jauge-mini">${[1, 2, 3].map(k => `<i class="${k <= c.niv ? "on-chaud" : ""}"></i>`).join("")}</span><span class="petit">${A.e(c.texte)}</span>`; }],
        ["Loyer d'un studio de 18 m²", r => { const l = loyer(r, loyers.lignes); return l ? `<b>${A.euros(l)}</b><span class="petit">par mois dans la ville</span>` : `<span class="petit">Pas de donnée pour cette ville</span>`; }],
        ["Emploi à 18 mois", r => { const i = insDe(r); return i ? `<b>${i.e} %</b> en emploi salarié${i.q ? `<span class="petit">Salaire net médian ${A.euros(i.q[1])}</span>` : ""}<span class="petit">France entière, tous diplômes de ce type</span>` : `<span class="petit">Non publié pour ce type</span>`; }],
        ["Fiche officielle", r => `<a class="lien-fleche" href="${A.lienParcoursup(r.id)}" target="_blank" rel="noopener">Parcoursup</a>`]
      ].filter(Boolean);
      A.$("#cmp-zone").innerHTML = `
        <div class="table-defile">
          <table class="comparateur comparateur-precis">
            <thead><tr><th scope="col"><span class="sr">Critère</span></th>${rs.map(r => `<th scope="col"><span class="cmp-fam" style="--c:${r.famille.couleur}">${A.e(r.fili)}</span>${A.e(r.intitule || r.fili)}<button type="button" class="btn-texte" data-retirer="${r.id}">Retirer</button></th>`).join("")}</tr></thead>
            <tbody>${lignes.map(([nom, f]) => `<tr><th scope="row">${nom}</th>${rs.map(r => `<td>${f(r)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table>
        </div>
        <div class="actions">
          <a class="btn btn-ligne" href="#carte">Ajouter une formation</a>
          <a class="btn btn-ligne" href="#budget">Simuler mon budget</a>
        </div>
        <p class="petit source">Sources : Parcoursup session ${psup.session} (taux d'accès, places, admis), carte des loyers 2025 (ANIL), InserSup (emploi). Le taux d'accès change chaque année : il indique l'an dernier, pas tes chances.</p>`;
    }).catch(() => { A.$("#cmp-zone").innerHTML = A.messageErreurDonnees; });

    el.onclick = ev => {
      const b = ev.target.closest("[data-retirer]");
      if (!b) return;
      A.basculerComparaison(b.dataset.retirer.match(/^\d+$/) ? Number(b.dataset.retirer) : b.dataset.retirer);
      A.pages.comparer(el);
    };
  };
})();
