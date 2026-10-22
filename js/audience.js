/* Mesure d'audience sans cookie ni identifiant persistant (GoatCounter). Désactivée tant qu'aucun compte n'est renseigné dans js/config.js.
   Aucun comptage : en local, dans l'aperçu claude.ai, si le navigateur envoie « Do Not Track », ou si la personne a refusé (page Confidentialité). */
(function () {
  const code = () => (A.CONFIG.audience && A.CONFIG.audience.goatcounter || "").trim();
  const refus = () => !!(A.etat.reglages && A.etat.reglages.refusAudience);

  A.audience = {
    configuree: () => !!code(),
    actif() {
      return !!code() && !refus() && /^https?:$/.test(location.protocol)
        && !/(^localhost$|^127\.|claude\.ai|claudeusercontent)/.test(location.hostname)
        && navigator.doNotTrack !== "1" && window.doNotTrack !== "1";
    },
    init() {
      if (!this.actif() || this.chargee) return;
      this.chargee = true;
      window.goatcounter = { no_onload: true, endpoint: "https://" + code() + ".goatcounter.com/count" };
      const s = document.createElement("script");
      s.async = true; s.src = "https://gc.zgo.at/count.js";
      s.onload = () => this.compter();
      document.head.appendChild(s);
    },
    // une visite par page vue ; seul l'identifiant de la page est envoyé (par ex. « metier-sommelier »), jamais les réponses du test
    compter() {
      if (!this.actif() || !window.goatcounter || !window.goatcounter.count) return;
      const page = (location.hash || "#accueil").slice(1) || "accueil";
      window.goatcounter.count({ path: "/" + page, title: document.title });
    },
    basculerRefus() { A.etat.reglages.refusAudience = !refus(); A.sauver(); }
  };
})();
