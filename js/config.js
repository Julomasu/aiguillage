/* Réglages à renseigner au moment de la mise en ligne. */
A.CONFIG = {
  // Dépôt GitHub qui reçoit les témoignages (formulaire d'issue), ex. "mon-compte/aiguillage". Vide = le formulaire propose seulement de copier le texte.
  depotGithub: "Julomasu/aiguillage",
  // Adresse e-mail (facultative) qui reçoit aussi les témoignages.
  emailTemoignages: "",
  // Identité de l'éditeur, affichée dans les mentions légales. À renseigner avant de communiquer largement sur le site.
  // Un éditeur non professionnel peut rester anonyme (loi du 21 juin 2004, art. 6-III-2) à condition de communiquer son identité à l'hébergeur
  // et d'indiquer ici les coordonnées de l'hébergeur ; un éditeur professionnel doit indiquer nom, adresse, e-mail et directeur de la publication.
  // Ces règles sont à faire valider pour ta situation précise.
  editeur: {
    nom: "",                  // nom et prénom, ou raison sociale
    statut: "",               // ex. « personne physique, non professionnel » ou « association », « société »…
    directeurPublication: "", // souvent identique à l'éditeur
    contact: "",              // adresse e-mail de contact (affichée publiquement)
    adresse: ""               // adresse postale (obligatoire pour un éditeur professionnel ; facultative sinon, si l'identité est donnée à l'hébergeur)
  },
  // Mesure d'audience sans cookie : GoatCounter (gratuit pour un usage non commercial). Renseigner le code du compte
  // (« monsite » pour monsite.goatcounter.com). Vide = aucune mesure et aucun script chargé.
  audience: { goatcounter: "" }
};
