/* Pages légales : mentions légales et confidentialité. Le texte décrit ce que le site fait réellement ;
   toute évolution technique (nouveau service externe, nouvelle donnée stockée) doit être reportée ici. */
(function () {
  const e = A.e;
  const MAJ = "octobre 2026";
  const ed = () => A.CONFIG.editeur || {};
  const ligneEd = (libelle, valeur) => valeur ? `<li><strong>${libelle}</strong> : ${e(valeur)}</li>` : "";
  const editeurComplet = () => !!(ed().nom && ed().contact);

  function tete(surtitre, titre, chapo) {
    return `<section class="tete-page"><p class="surtitre">${surtitre}</p><h1>${titre}</h1><p class="chapo">${chapo}</p></section>`;
  }

  A.pages.mentions = function (el) {
    const d = ed();
    el.innerHTML = `
      ${tete("Informations légales", "Mentions légales", "Qui édite ce site, qui l'héberge, d'où viennent les données.")}
      <div class="legal">
        <section>
          <h2>Éditeur du site</h2>
          ${editeurComplet() ? `<ul>
            ${ligneEd("Éditeur", d.nom)}${ligneEd("Statut", d.statut)}${ligneEd("Directeur·rice de la publication", d.directeurPublication || d.nom)}${ligneEd("Adresse", d.adresse)}${ligneEd("Contact", d.contact)}
          </ul>` : `<p class="encart alerte-config"><strong>Informations de l'éditeur à compléter.</strong> Renseigne le nom et l'adresse e-mail de contact dans <code>js/config.js</code> (rubrique <code>editeur</code>) avant de publier le site largement.</p>`}
          <p>Aiguillage est un service d'information gratuit, sans but lucratif et indépendant. Il n'est lié ni au ministère de l'Enseignement supérieur, ni à Parcoursup, ni à l'Onisep, ni à aucun établissement cité.</p>
        </section>
        <section>
          <h2>Hébergement</h2>
          <p>Le site est hébergé par GitHub, Inc. (GitHub Pages), 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis. <a href="https://github.com" target="_blank" rel="noopener">github.com</a>.</p>
        </section>
        <section>
          <h2>Contenus et responsabilité</h2>
          <p>Les informations (salaires, coûts, conditions d'accès, aides, calendriers) sont données à titre indicatif et peuvent être incomplètes ou dépassées. Elles ne remplacent ni les sites officiels (Parcoursup, Onisep, Service-Public, établissements) ni l'avis d'un·e professionnel·le de l'orientation. Vérifie toujours avant de t'engager ou de déposer un dossier.</p>
          <p>Une erreur, une information à mettre à jour, un contenu à retirer ? ${d.contact ? `Écris à <strong>${e(d.contact)}</strong> ou` : ""} ouvre une demande sur <a href="https://github.com/${e(A.CONFIG.depotGithub)}/issues" target="_blank" rel="noopener">le dépôt du projet</a>.</p>
        </section>
        <section>
          <h2>Sources des données et licences</h2>
          <ul>
            <li>Parcoursup (session 2025), jeu de données du ministère de l'Enseignement supérieur et de la Recherche : Licence Ouverte 2.0.</li>
            <li>Répertoire opérationnel des métiers et des emplois (ROME) de France Travail : Licence Ouverte.</li>
            <li>Carte des loyers 2025 (ANIL / DHUP) et barèmes publiés sur Service-Public.gouv.fr : Licence Ouverte.</li>
            <li>Liste des écoles d'ingénieurs accréditées (Commission des titres d'ingénieur, via Légifrance) et compléments rédigés à la main à partir des sites des établissements.</li>
            <li>Fonds de carte : © les contributeurs d'<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> (licence ODbL), servis par <a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a>, données OpenMapTiles. Bibliothèque cartographique MapLibre GL JS (licence BSD-3).</li>
            <li>Polices Barlow et Barlow Condensed : licence SIL Open Font License 1.1.</li>
          </ul>
        </section>
        <section>
          <h2>Logos et marques</h2>
          <p>Les logos et noms d'établissements, d'entreprises et d'organismes appartiennent à leurs propriétaires. Ils sont affichés uniquement pour identifier l'organisme concerné, sans suggérer de partenariat. Ils peuvent être masqués dans « Plus », rubrique Affichage. Pour demander le retrait d'un logo ou d'un nom, utilise les coordonnées ci-dessus.</p>
        </section>
        <section>
          <h2>Droits sur le site</h2>
          <p>Les textes rédigés, la structure et le code d'Aiguillage sont publiés sur <a href="https://github.com/${e(A.CONFIG.depotGithub)}" target="_blank" rel="noopener">GitHub</a>. Les données reprises d'organismes publics restent soumises à leur propre licence.</p>
        </section>
        <p class="petit">Dernière mise à jour : ${MAJ}. Voir aussi la page <a href="#confidentialite">Confidentialité</a>.</p>
      </div>`;
  };

  A.pages.confidentialite = function (el) {
    const configuree = A.audience.configuree();
    const refuse = !!(A.etat.reglages && A.etat.reglages.refusAudience);
    const d = ed();
    el.innerHTML = `
      ${tete("Ta vie privée", "Confidentialité", "Ce que le site garde, ce qu'il n'envoie pas, et les services extérieurs que tu peux déclencher.")}
      <div class="legal">
        <section class="encart">
          <h2>L'essentiel</h2>
          <ul>
            <li>Pas de compte, pas de formulaire d'inscription, <strong>pas de cookie</strong>.</li>
            <li>Tes réponses au test, tes favoris et tes réglages restent <strong>dans ton navigateur</strong>. Le site ne les envoie à personne.</li>
            <li>${configuree ? "Une mesure d'audience sans cookie compte les pages vues, sans te suivre d'un site à l'autre (détails plus bas), et tu peux la refuser." : "Aucune mesure d'audience n'est active."}</li>
          </ul>
        </section>
        <section>
          <h2>Ce qui reste dans ton navigateur</h2>
          <p>Pour fonctionner, le site enregistre sur ton appareil (stockage local du navigateur, qui n'est pas un cookie) : ton profil et tes réponses au test, tes métiers favoris, ta ville et ton budget, la liste de formations à comparer, et tes réglages (thème, taille du texte, langue, logos, voix). Ces données servent uniquement à te les ré-afficher. Tu peux tout effacer depuis « Plus », rubrique « Mes favoris », bouton « Effacer mes données », ou en vidant les données du site dans ton navigateur.</p>
        </section>
        <section>
          <h2>Les services extérieurs qui peuvent voir ton adresse IP</h2>
          <p>Comme pour tout site, ta visite est visible de l'hébergeur. Selon ce que tu utilises, d'autres services reçoivent aussi ton adresse IP :</p>
          <ul>
            <li><strong>Hébergement (GitHub Pages)</strong> : chaque visite génère des journaux techniques standard chez GitHub, Inc. Voir <a href="https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">la politique de confidentialité de GitHub</a>.</li>
            <li><strong>Page Carte</strong> : le fond de carte est chargé depuis OpenFreeMap (tiles.openfreemap.org). Ce service reçoit ton adresse IP et la zone que tu regardes. Rien d'autre n'est envoyé.</li>
            <li><strong>Logos</strong> : les logos des écoles et organismes sont chargés depuis le service d'icônes de Google (google.com/s2/favicons), qui reçoit ton adresse IP et le nom de domaine de chaque organisme affiché. Tu peux l'éviter en désactivant « Logos des écoles » dans « Plus ».</li>
            <li><strong>Polices</strong> : hébergées sur ce site, aucune requête vers Google Fonts.</li>
            <li><strong>Liens sortants</strong> (Parcoursup, Onisep, LinkedIn, sites d'écoles…) : une fois le lien ouvert, tu es sur un autre site, avec sa propre politique.</li>
            <li><strong>Témoignages</strong> : le bouton « Proposer » ouvre un formulaire GitHub. Si tu l'envoies, il est publié comme une demande publique sous ton compte GitHub. Seuls le prénom et le texte que tu choisis de partager sont repris sur le site, après relecture.</li>
            <li><strong>Assistant</strong> : en ligne sur ce site, il fonctionne en mode guidé, entièrement dans ton navigateur. Une installation avec serveur et clé d'API peut proposer un mode avec Claude (Anthropic) : seules tes questions sont alors envoyées à ce service. N'y écris jamais de données personnelles (nom, adresse, numéro…).</li>
          </ul>
        </section>
        <section>
          <h2>Mesure d'audience</h2>
          ${configuree ? `
          <p>Le site utilise GoatCounter, un outil de mesure d'audience qui <strong>n'utilise pas de cookie</strong> et ne crée pas de profil. Il enregistre la page vue, la provenance du lien, et des informations générales sur le navigateur et l'écran, pour savoir quelles pages sont utiles. Seul l'identifiant de la page est transmis, jamais tes réponses au test. Les statistiques sont agrégées.</p>
          <p>Rien n'est compté si ton navigateur envoie le signal « Ne pas me suivre ». Tu peux aussi refuser ici :</p>
          <p class="actions"><button type="button" class="btn btn-ligne" data-refus aria-pressed="${refuse}">${refuse ? "Je refuse la mesure : réactiver" : "Ne pas me compter"}</button></p>
          <p class="petit">Mesure d'audience limitée à l'usage statistique du site, conçue pour relever des exemptions de consentement prévues par la CNIL. Voir <a href="https://goatcounter.com/privacy" target="_blank" rel="noopener">la politique de GoatCounter</a>.</p>` : `<p>Aucune mesure d'audience n'est active : le site ne compte pas ses visites.</p>`}
        </section>
        <section>
          <h2>Mineur·es</h2>
          <p>Le site s'adresse notamment aux lycéen·nes. Il ne demande aucune donnée personnelle et ne publie rien à ton sujet sans que tu aies toi-même envoyé un témoignage.</p>
        </section>
        <section>
          <h2>Tes droits</h2>
          <p>Le site ne conserve pas de données personnelles te concernant en dehors des journaux techniques de l'hébergeur. Pour toute question ou demande (accès, effacement, opposition)${d.contact ? `, écris à <strong>${e(d.contact)}</strong>` : ", utilise les coordonnées des mentions légales"}. Tu peux aussi saisir la CNIL : <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener">cnil.fr/fr/plaintes</a>.</p>
        </section>
        <p class="petit">Dernière mise à jour : ${MAJ}. Voir aussi les <a href="#mentions">mentions légales</a>.</p>
      </div>`;
    el.onclick = ev => {
      const b = ev.target.closest("[data-refus]"); if (!b) return;
      A.audience.basculerRefus(); A.pages.confidentialite(el);
    };
  };
})();
