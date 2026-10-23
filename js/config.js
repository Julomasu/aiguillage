/* Réglages à renseigner au moment de la mise en ligne. */
A.CONFIG = {
  // Dépôt GitHub qui reçoit les témoignages (formulaire d'issue), ex. "mon-compte/aiguillage". Vide = le formulaire propose seulement de copier le texte.
  depotGithub: "Julomasu/aiguillage",
  // Adresse e-mail (facultative) qui reçoit aussi les témoignages.
  emailTemoignages: "",
  // Identité de l'éditeur, affichée dans les mentions légales. À renseigner avant de communiquer largement sur le site.
  // Un éditeur non professionnel peut rester anonyme (loi n° 2004-575 du 21 juin 2004, art. 1-1, II, en vigueur depuis le 23/05/2024 ; Légifrance, vérifié le 2026-10-23)
  // à condition d'avoir communiqué son identité (nom, prénoms, domicile, téléphone) à l'hébergeur : les mentions n'indiquent alors que l'hébergeur.
  // Un éditeur professionnel (revenus réguliers, activité lucrative) doit publier son identité : repasser alors à anonyme: false et remplir les champs ci-dessous.
  // Ces règles sont à faire valider pour ta situation précise.
  editeur: {
    anonyme: true,            // true = éditeur non professionnel anonyme (identité donnée à l'hébergeur) ; les champs ci-dessous restent vides
    nom: "",                  // nom et prénom, ou raison sociale
    statut: "",               // ex. « personne physique, non professionnel » ou « association », « société »…
    directeurPublication: "", // souvent identique à l'éditeur
    contact: "",              // adresse e-mail de contact (affichée publiquement)
    adresse: ""               // adresse postale (obligatoire pour un éditeur professionnel ; facultative sinon, si l'identité est donnée à l'hébergeur)
  },
  // Mesure d'audience sans cookie : GoatCounter (service hébergé gratuit pour un « usage public raisonnable », vérifié sur goatcounter.com le 2026-10-23). Renseigner le code du compte
  // (« monsite » pour monsite.goatcounter.com). Vide = aucune mesure et aucun script chargé.
  audience: { goatcounter: "aiguillage" }
};
