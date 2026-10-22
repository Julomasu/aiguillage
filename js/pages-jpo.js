/* Portes ouvertes : repères, questions à poser, et un planning personnel avec rappel dans l'agenda du téléphone (.ics ou Google Agenda).
   Les dates précises ne sont pas publiées en données ouvertes : chaque élève ajoute les siennes depuis le site de l'établissement. */
(function () {
  const TYPES = [["jpo", "Journée portes ouvertes"], ["salon", "Salon de l'orientation"], ["visio", "Visioconférence"], ["immersion", "Immersion / stage"]];

  const QUESTIONS = [
    "Combien d'élèves réussissent la 1re année ? Et combien changent de voie ?",
    "Que sont devenus les diplômé·es il y a 1, 2 et 3 ans ? Où travaillent-ils ?",
    "Quelle part de cours, de projets et de stages ? Quel emploi du temps type ?",
    "Y a-t-il de l'alternance ? Comment trouve-t-on l'entreprise ?",
    "Combien coûte vraiment l'année (frais, matériel, déplacements) ? Y a-t-il des aides ?",
    "Quel accompagnement en cas de difficulté ? Quels dispositifs pour les boursier·es ?",
    "Où se loger ? Résidence Crous, colocation, distance avec le campus ?",
    "Peut-on parler à des étudiant·es sans les profs ?",
    "Quelle poursuite d'études après (master, école, passerelles) ?",
    "Qu'est-ce qui fait qu'un dossier est retenu ? Que regardez-vous en premier ?"
  ];

  const evts = () => A.etat.jpo || (A.etat.jpo = []);

  /* ——— Calendrier (format iCalendar) */
  const pad = n => String(n).padStart(2, "0");
  const flottant = (date, heure) => date.replace(/-/g, "") + "T" + (heure || "10:00").replace(":", "") + "00";
  const echapper = t => String(t).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

  function vevent(e) {
    const debut = flottant(e.date, e.heure);
    const fin = new Date(`${e.date}T${e.heure || "10:00"}`); fin.setHours(fin.getHours() + 2);
    const finStr = `${fin.getFullYear()}${pad(fin.getMonth() + 1)}${pad(fin.getDate())}T${pad(fin.getHours())}${pad(fin.getMinutes())}00`;
    const maintenant = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    return ["BEGIN:VEVENT", `UID:${e.id}@aiguillage`, `DTSTAMP:${maintenant}`, `DTSTART:${debut}`, `DTEND:${finStr}`,
      `SUMMARY:${echapper((TYPES.find(t => t[0] === e.type) || TYPES[0])[1] + " : " + e.nom)}`,
      `LOCATION:${echapper(e.lieu || "")}`,
      `DESCRIPTION:${echapper("Pense à préparer tes questions (voir Aiguillage). " + (e.note || ""))}`,
      "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Porte ouverte demain", "TRIGGER:-P1D", "END:VALARM",
      "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Porte ouverte dans 1 heure", "TRIGGER:-PT1H", "END:VALARM",
      "END:VEVENT"].join("\r\n");
  }

  const calendrier = liste => ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Aiguillage//FR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", ...liste.map(vevent), "END:VCALENDAR"].join("\r\n") + "\r\n";

  function telecharger(nom, texte) {
    const url = URL.createObjectURL(new Blob([texte], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = nom;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function lienGoogle(e) {
    const debut = flottant(e.date, e.heure);
    const fin = new Date(`${e.date}T${e.heure || "10:00"}`); fin.setHours(fin.getHours() + 2);
    const finStr = `${fin.getFullYear()}${pad(fin.getMonth() + 1)}${pad(fin.getDate())}T${pad(fin.getHours())}${pad(fin.getMinutes())}00`;
    const q = new URLSearchParams({ action: "TEMPLATE", text: (TYPES.find(t => t[0] === e.type) || TYPES[0])[1] + " : " + e.nom, dates: debut + "/" + finStr, location: e.lieu || "", details: "Prépare tes questions avec Aiguillage. " + (e.note || "") });
    return "https://calendar.google.com/calendar/render?" + q.toString();
  }

  const dateFr = e => new Date(`${e.date}T${e.heure || "10:00"}`).toLocaleString(A.locale, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
  const recherche = nom => "https://duckduckgo.com/?q=" + encodeURIComponent(nom + " journée portes ouvertes");

  A.pages.jpo = function (el) {
    const ville = A.etat.ville;
    const liste = evts().slice().sort((a, b) => (a.date + (a.heure || "")).localeCompare(b.date + (b.heure || "")));
    const aujourdhui = new Date().toISOString().slice(0, 10);
    el.innerHTML = `
      <section class="tete-page">
        <p class="surtitre">Rencontrer les formations</p>
        <h1>Portes ouvertes</h1>
        <p class="chapo">Les portes ouvertes sont le meilleur moyen de parler à des étudiant·es et de voir les locaux. Les dates sont publiées par chaque établissement : trouve-les ici, ajoute-les à ton planning, et reçois un rappel sur ton téléphone.</p>
      </section>

      <section class="bloc">
        <h2>1. Trouve les établissements près de chez toi</h2>
        <div class="carte-outils">
          <label class="champ"><span>Ta ville</span><input id="jpo-ville" list="jpo-villes" type="search" autocomplete="off" placeholder="Ex. Nantes" value="${A.e(ville ? ville.nom + " (" + ville.dep + ")" : "")}"><datalist id="jpo-villes"></datalist></label>
          <label class="champ"><span>Mot-clé</span><input id="jpo-mot" type="search" autocomplete="off" placeholder="Ex. informatique, droit, IUT"></label>
          <label class="champ champ-rayon"><span>Rayon : <b id="jpo-rayon-val">30 km</b></span><input id="jpo-rayon" type="range" min="5" max="100" step="5" value="30"></label>
        </div>
        <div id="jpo-resultats" class="jpo-resultats"><p class="petit">Choisis ta ville pour voir les établissements.</p></div>
        <p class="petit">Pour chaque établissement, la recherche te mène à sa page officielle. Repère aussi les salons (étudiant, apprentissage) et les « Journées de l'orientation » de ta région, en général entre l'automne et le début du printemps. Les dates changent chaque année.</p>
      </section>

      <section class="bloc">
        <h2>2. Mon planning</h2>
        <form class="jpo-form" id="jpo-form" onsubmit="return false">
          <label class="champ"><span>Établissement ou salon</span><input id="jpo-nom" required placeholder="Ex. IUT de Nantes" autocomplete="off"></label>
          <label class="champ"><span>Type</span><select id="jpo-type">${TYPES.map(t => `<option value="${t[0]}">${t[1]}</option>`).join("")}</select></label>
          <label class="champ"><span>Date</span><input id="jpo-date" type="date" required min="${aujourdhui}"></label>
          <label class="champ"><span>Heure</span><input id="jpo-heure" type="time" value="10:00"></label>
          <label class="champ jpo-large"><span>Lieu (facultatif)</span><input id="jpo-lieu" placeholder="Adresse ou « en ligne »" autocomplete="off"></label>
          <button type="submit" class="btn btn-signal">Ajouter au planning</button>
        </form>
        ${liste.length ? `<ul class="jpo-liste">${liste.map(e => `
          <li class="jpo-evt ${e.date < aujourdhui ? "passe" : ""}">
            <div><strong>${A.e(e.nom)}</strong><span class="petit">${A.e((TYPES.find(t => t[0] === e.type) || TYPES[0])[1])} · ${A.e(dateFr(e))}${e.lieu ? " · " + A.e(e.lieu) : ""}</span></div>
            <div class="jpo-actions">
              <button type="button" class="btn-coche" data-ics="${e.id}">Agenda du téléphone (.ics)</button>
              <a class="btn-coche" href="${lienGoogle(e)}" target="_blank" rel="noopener">Google Agenda</a>
              <button type="button" class="btn-texte" data-suppr="${e.id}">Supprimer</button>
            </div>
          </li>`).join("")}</ul>
          <div class="actions"><button type="button" class="btn btn-ligne" data-ics-tout>Tout exporter (.ics)</button></div>
          <p class="petit">Le fichier .ics s'ouvre avec l'application Agenda (Android, iPhone, Outlook…). Chaque événement a deux rappels : la veille et 1 heure avant. Tes dates restent sur cet appareil.</p>` : `<p class="vide-inline">Aucune date pour l'instant. Ajoute ta première porte ouverte ci-dessus.</p>`}
      </section>

      <section class="bloc">
        <h2>3. Les questions à poser</h2>
        <ol class="questions">${QUESTIONS.map(q => `<li>${A.e(q)}</li>`).join("")}</ol>
        <aside class="encart encart-savais"><strong>Astuce</strong><p>Si tu ne peux pas te déplacer, demande une visio ou contacte les étudiant·es via les pages « Anciens élèves » (voir <a href="#reseau">LinkedIn & réseau</a>). Beaucoup d'établissements proposent aussi des immersions d'une journée pour les lycéen·nes.</p></aside>
      </section>`;

    // Établissements proches
    let psup = null, villes = null;
    const chercher = () => {
      if (!psup) return;
      const zone = A.$("#jpo-resultats"), rayon = Number(A.$("#jpo-rayon").value), mot = A.sansAccents(A.$("#jpo-mot").value.trim());
      const saisie = A.$("#jpo-ville").value, m = saisie.match(/^(.*?)\s*\((\w+)\)\s*$/), nom = A.sansAccents(m ? m[1] : saisie).trim();
      const v = nom && villes.find(x => A.sansAccents(x[0]) === nom && (!m || x[1] === m[2]));
      if (!v) { zone.innerHTML = `<p class="petit">Choisis ta ville pour voir les établissements.</p>`; return; }
      A.etat.ville = { nom: v[0], dep: v[1], lat: v[2], lon: v[3] }; A.sauver();
      const parEtab = new Map();
      psup.lignes.forEach(r => {
        if (r.lat == null) return;
        const d = A.distanceKm(v[2], v[3], r.lat, r.lon);
        if (d > rayon) return;
        if (mot && !A.sansAccents(r.intitule + " " + r.etab + " " + r.fili).includes(mot)) return;
        const e = parEtab.get(r.etab) || { etab: r.etab, ville: r.ville, d, n: 0, public: r.public, fam: new Set() };
        e.n++; e.d = Math.min(e.d, d); e.fam.add(r.famille.nom); parEtab.set(r.etab, e);
      });
      const l = [...parEtab.values()].sort((a, b) => a.d - b.d);
      zone.innerHTML = l.length ? `<p class="petit">${l.length} établissement${l.length > 1 ? "s" : ""} à moins de ${rayon} km de ${A.e(v[0])}.</p>
        <div class="jpo-grille">${l.slice(0, 24).map(e => `
          <article class="jpo-etab"><strong>${A.e(e.etab)}</strong><span class="petit">${A.e(e.ville)} · ${Math.round(e.d)} km · ${e.public ? "Public" : "Privé"} · ${e.n} formation${e.n > 1 ? "s" : ""}</span>
            <span class="petit">${[...e.fam].slice(0, 4).map(A.e).join(", ")}</span>
            <div class="jpo-actions"><a class="lien-fleche" href="${recherche(e.etab)}" target="_blank" rel="noopener">Trouver la date</a>
            <button type="button" class="btn-texte" data-prefill="${A.e(e.etab)}|${A.e(e.ville)}">Ajouter au planning</button></div></article>`).join("")}</div>
        ${l.length > 24 ? `<p class="petit">24 établissements affichés sur ${l.length} : réduis le rayon ou ajoute un mot-clé.</p>` : ""}` : `<p class="vide-inline">Aucun établissement dans ce rayon avec ce mot-clé.</p>`;
    };
    Promise.all([A.parcoursup(), A.donnees("villes")]).then(([p, v]) => {
      if (A.lireHash().page !== "jpo") return;
      psup = p; villes = v.lignes;
      A.$("#jpo-villes").innerHTML = v.lignes.slice(0, 600).map(x => `<option value="${A.e(x[0])} (${x[1]})"></option>`).join("");
      chercher();
    }).catch(() => { A.$("#jpo-resultats").innerHTML = A.messageErreurDonnees; });

    A.$("#jpo-ville").addEventListener("change", chercher);
    A.$("#jpo-mot").addEventListener("input", () => { clearTimeout(chercher.t); chercher.t = setTimeout(chercher, 200); });
    A.$("#jpo-rayon").addEventListener("input", ev => { A.$("#jpo-rayon-val").textContent = ev.target.value + " km"; chercher(); });

    A.$("#jpo-form").addEventListener("submit", () => {
      const nom = A.$("#jpo-nom").value.trim(), date = A.$("#jpo-date").value;
      if (!nom || !date) { A.toast("Il manque une information", "Indique l'établissement et la date", "📅"); return; }
      evts().push({ id: "jpo" + Date.now().toString(36), nom, type: A.$("#jpo-type").value, date, heure: A.$("#jpo-heure").value || "10:00", lieu: A.$("#jpo-lieu").value.trim() });
      A.sauver();
      A.gagner(10, "jpo-ajout", "Porte ouverte ajoutée à ton planning");
      A.activite("jpo", "x");
      A.ajouterUnique(A.etat.check, "c3"); A.sauver(); A.verifierTampons();
      A.pages.jpo(el);
    });

    el.onclick = ev => {
      const b = ev.target.closest("button");
      if (!b) return;
      if (b.dataset.prefill) { const [nom, v] = b.dataset.prefill.split("|"); A.$("#jpo-nom").value = nom; A.$("#jpo-lieu").value = v; A.$("#jpo-date").focus(); }
      else if (b.dataset.suppr) { A.etat.jpo = evts().filter(e => e.id !== b.dataset.suppr); A.sauver(); A.pages.jpo(el); }
      else if (b.dataset.ics) { const e = evts().find(x => x.id === b.dataset.ics); if (e) { telecharger("porte-ouverte.ics", calendrier([e])); A.toast("Fichier prêt", "Ouvre-le pour l'ajouter à ton agenda", "📅"); } }
      else if ("icsTout" in b.dataset) { telecharger("mes-portes-ouvertes.ics", calendrier(evts())); A.toast("Fichier prêt", `${evts().length} événement(s) avec rappels`, "📅"); }
    };
  };
})();
