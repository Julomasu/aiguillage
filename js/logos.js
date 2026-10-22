/* Logos : petites pastilles avec le logo d'une école, d'une entreprise ou d'un site officiel.
   - Le logo est l'icône du site de l'organisme, chargée par ton navigateur (service de favicons de Google) ; aucune donnée n'est envoyée à Aiguillage.
   - Sans logo connu, ou hors ligne, ou si tu désactives les logos (menu Plus → Affichage), la pastille affiche les initiales sur fond coloré.
   - LinkedIn et quelques logos très utilisés sont dessinés en local (SVG), sans appel externe.
   Les logos et marques appartiennent à leurs propriétaires ; ils servent uniquement à identifier l'organisme. */
(function () {
  /* Écoles : identifiant de l'annuaire → site officiel (uniquement des sites dont je suis certain) */
  A.LOGO_ECOLES = {
    "hec-paris": "hec.edu", "essec-business-school": "essec.edu", "escp-business-school": "escp.eu", "emlyon-business-school": "em-lyon.com",
    "edhec-business-school": "edhec.edu", "skema-business-school": "skema.edu", "kedge-business-school": "kedge.edu", "neoma-business-school": "neoma-bs.fr",
    "audencia": "audencia.com", "grenoble-ecole-de-management": "grenoble-em.com", "tbs-education": "tbs-education.fr", "rennes-school-of-business": "rennes-sb.com",
    "montpellier-business-school": "montpellier-bs.com", "burgundy-school-of-business": "bsb-education.com", "em-normandie": "em-normandie.com",
    "em-strasbourg-business-school": "em-strasbourg.com", "excelia-business-school": "excelia-group.com", "essca-school-of-management": "essca.fr",
    "ieseg-school-of-management": "ieseg.fr", "icn-business-school": "icn-artem.com", "esce-international-business-school": "esce.fr", "edc-paris-business-school": "edcparis.edu",
    "esdes-business-school": "esdes.fr", "emlv-ecole-de-management-leonard-de-vinci": "emlv.fr", "psb-paris-school-of-business": "psbedu.paris", "inseec-grande-ecole": "inseec.com",
    "ipag-business-school": "ipag.fr", "isc-paris": "iscparis.com", "esg-management-school": "esg.fr", "iseg-marketing-communication-school": "iseg.fr",
    "sciences-po-paris": "sciencespo.fr", "ecole-polytechnique": "polytechnique.edu", "centralesupelec": "centralesupelec.fr", "mines-paris-psl": "minesparis.psl.eu",
    "ecole-des-ponts-paristech": "enpc.fr", "telecom-paris": "telecom-paris.fr", "insa-lyon": "insa-lyon.fr", "epitech": "epitech.eu", "epita": "epita.fr",
    "esiee-paris": "esiee.fr", "efrei-paris": "efrei.fr", "ynov-campus": "ynov.com", "gobelins-l-ecole-de-l-image": "gobelins.fr", "penninghen-esag": "penninghen.com",
    "ecole-estienne": "ecole-estienne.paris", "esmod": "esmod.com", "amos-sport-business-school": "amos-business-school.eu", "les-ecoles-de-conde": "ecoles-conde.com",
    "vatel": "vatel.fr", "ferrandi-paris": "ferrandi-paris.fr", "institut-paul-bocuse": "institutpaulbocuse.com", "ecole-42": "42.fr", "rubika": "rubika-edu.com",
    "isart-digital": "isartdigital.com", "enac": "enac.fr", "isae-supaero": "isae-supaero.fr", "arts-et-metiers": "artsetmetiers.fr", "estp-paris": "estp.fr",
    "ecole-du-louvre": "ecoledulouvre.fr", "ens-louis-lumiere": "ens-louis-lumiere.fr", "la-femis": "femis.fr", "celsa-sorbonne-universite": "celsa.fr",
    "cours-florent": "coursflorent.fr", "universite-paris-dauphine-psl": "dauphine.psl.eu", "sorbonne-universite": "sorbonne-universite.fr",
    "ecole-normale-superieure-de-lyon": "ens-lyon.fr", "ensae-paris": "ensae.fr"
  };

  /* Entreprises et organismes cités dans « Qui recrute » (nom exact → site) */
  A.LOGO_ENTREPRISES = {
    "Airbus": "airbus.com", "Safran": "safran-group.com", "Thales": "thalesgroup.com", "Dassault Aviation": "dassault-aviation.com", "ArianeGroup": "arianegroup.com",
    "Stellantis": "stellantis.com", "Renault": "renaultgroup.com", "Valeo": "valeo.com", "Alstom": "alstom.com", "SNCF": "sncf.com", "EDF": "edf.fr", "Engie": "engie.com",
    "TotalEnergies": "totalenergies.com", "Schneider Electric": "se.com", "Veolia": "veolia.com", "Capgemini": "capgemini.com", "Alten": "alten.com", "Accenture": "accenture.com",
    "Sopra Steria": "soprasteria.com", "VINCI": "vinci.com", "Bouygues": "bouygues.com", "Eiffage": "eiffage.com", "BNP Paribas": "bnpparibas.com", "Société Générale": "societegenerale.com",
    "Crédit Agricole": "credit-agricole.com", "AXA": "axa.com", "Natixis": "natixis.com", "HSBC": "hsbc.fr", "Santander": "santander.com", "Goldman Sachs": "goldmansachs.com",
    "Morgan Stanley": "morganstanley.com", "J.P. Morgan": "jpmorgan.com", "Bank of America": "bankofamerica.com", "Citi": "citigroup.com", "Deutsche Bank": "db.com",
    "Barclays": "barclays.com", "UBS": "ubs.com", "Rothschild & Co": "rothschildandco.com", "Lazard": "lazard.com", "Evercore": "evercore.com", "Deloitte": "deloitte.com",
    "EY": "ey.com", "KPMG": "kpmg.com", "PwC": "pwc.com", "Ardian": "ardian.com", "Eurazeo": "eurazeo.com", "Amundi": "amundi.com", "L'Oréal": "loreal.com", "Danone": "danone.com",
    "LVMH": "lvmh.com", "Kering": "kering.com", "Hermès": "hermes.com", "Chanel": "chanel.com", "Nestlé": "nestle.com", "Michelin": "michelin.com", "Carrefour": "carrefour.com",
    "Decathlon": "decathlon.com", "Leroy Merlin": "leroymerlin.fr", "Amazon": "amazon.com", "Google": "google.com", "Microsoft": "microsoft.com", "Meta": "meta.com",
    "Orange": "orange.com", "Doctolib": "doctolib.fr", "BlaBlaCar": "blablacar.com", "Qonto": "qonto.com", "Alan": "alan.com", "Back Market": "backmarket.com", "Criteo": "criteo.com",
    "Datadog": "datadoghq.com", "Ubisoft": "ubisoft.com", "Netflix": "netflix.com", "Salesforce": "salesforce.com", "SAP": "sap.com", "Sanofi": "sanofi.com", "Servier": "servier.com",
    "Pierre Fabre": "pierre-fabre.com", "Ipsen": "ipsen.com", "Ramsay Santé": "ramsaysante.fr", "Elsan": "elsan.care", "AP-HP": "aphp.fr", "Mistral AI": "mistral.ai",
    "Hugging Face": "huggingface.co", "McKinsey": "mckinsey.com", "Boston Consulting Group (BCG)": "bcg.com", "Bain & Company": "bain.com", "Roland Berger": "rolandberger.com",
    "Oliver Wyman": "oliverwyman.com", "Wavestone": "wavestone.com", "Publicis": "publicisgroupe.com", "Havas": "havas.com", "Dentsu": "dentsu.com", "Sodexo": "sodexo.com",
    "Elior": "elior.com", "Accor": "group.accor.com", "Hilton": "hilton.com", "Marriott": "marriott.com", "Air France": "airfrance.fr", "Transavia": "transavia.com",
    "easyJet": "easyjet.com", "Ryanair": "ryanair.com", "Emirates": "emirates.com", "Qatar Airways": "qatarairways.com", "France Télévisions": "francetelevisions.fr",
    "Le Monde": "lemonde.fr", "AFP": "afp.com", "TF1": "tf1.fr", "M6": "m6.fr", "Canal+": "canalplus.com", "Radio France": "radiofrance.fr", "Gallimard": "gallimard.fr",
    "Hachette": "hachette.fr", "Mediapart": "mediapart.fr", "IKEA": "ikea.com", "Maisons du Monde": "maisonsdumonde.com", "AFNOR": "afnor.org", "Bureau Veritas": "bureauveritas.com",
    "CNRS": "cnrs.fr", "INRAE": "inrae.fr", "CEA": "cea.fr", "Bpifrance": "bpifrance.fr", "Naval Group": "naval-group.com", "Lactalis": "lactalis.com", "Bonduelle": "bonduelle.com",
    "Limagrain": "limagrain.com", "Bayer": "bayer.com", "Vestas": "vestas.com", "Siemens": "siemens.com", "Egis": "egis-group.com", "Artelia": "arteliagroup.com", "Setec": "setec.com",
    "Nexity": "nexity.fr", "Icade": "icade.fr", "Orpea": "orpea.com", "Clariane": "clariane.com", "Michael Page": "michaelpage.fr", "Randstad": "randstad.fr", "Adecco": "adecco.fr"
  };

  /* Sites officiels et services connus (affichés à côté des liens de la page Aides) */
  const logosActifs = () => A.etat.reglages.logos !== false;

  const initiales = nom => {
    const mots = String(nom).replace(/\([^)]*\)/g, "").split(/[\s'’\-·/&,.]+/).filter(m => m.length > 1 && !/^(de|du|des|la|le|les|et|of|the|école|ecole|institut|université|universite)$/i.test(m));
    return (mots.length ? mots.slice(0, 2).map(m => m[0]).join("") : String(nom).slice(0, 2)).toUpperCase();
  };
  const teinte = nom => { let h = 7; for (const c of String(nom)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };

  /* A.logo(nom, domaine, taille) : pastille ronde ou carrée avec logo si on connaît le site */
  A.logo = function (nom, domaine, taille, emoji) {
    const t = taille || 40;
    const img = domaine && logosActifs()
      ? `<img src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(domaine)}&sz=128" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" width="${t}" height="${t}">`
      : "";
    return `<span class="logo" style="--t:${t}px;--h:${teinte(nom)}" aria-hidden="true"><b>${A.e(!domaine && emoji ? emoji : initiales(nom))}</b>${img}</span>`;
  };

  const EMOJI_CAT = { commerce: "💼", ingenieur: "⚙️", numerique: "💻", "art-design": "🎨", media: "🎬", "sciences-po": "🏛️", universite: "🎓", sante: "⚕️", "social-sport": "🤝",
    hotellerie: "🍽️", architecture: "📐", "aero-maritime": "✈️", "service-public": "🛡️", droit: "⚖️", agro: "🌱", culture: "🎭", lycee: "🏫", autre: "🏫" };
  A.logoEcole = (o, t) => A.logo(o.n, A.LOGO_ECOLES[o.id], t, EMOJI_CAT[(o.c || [])[0]] || "🏫");

  /* Logo LinkedIn dessiné en local (pas d'appel externe) */
  A.logoLinkedIn = t => `<svg class="logo-svg" style="--t:${t || 28}px" viewBox="0 0 24 24" aria-hidden="true"><path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;

  /* Logo d'un site à partir de son adresse (page Aides, tests…) */
  A.logoSite = function (url, nom, t) {
    let h = "";
    try { h = new URL(url).hostname.replace(/^www\./, ""); } catch (e) { /* adresse relative */ }
    if (/linkedin\.com$/.test(h)) return A.logoLinkedIn(t);
    return A.logo(nom || h, h, t);
  };

  /* Liste d'employeurs : « Airbus, Safran, Thales » devient des pastilles avec logo quand les noms sont reconnus */
  A.employeursHtml = function (texte) {
    const parts = String(texte).split(/,\s*(?![^()]*\))/).map(x => x.trim()).filter(Boolean);
    const connu = nom => A.LOGO_ENTREPRISES[nom.replace(/\s*\([^)]*\)\s*$/, "")];
    if (!parts.length || parts.some(p => p.length > 40) || !parts.some(connu)) return `<p>${A.e(texte)}</p>`;
    return `<ul class="emp-noms">${parts.map(p => `<li>${A.logo(p, connu(p), 20)}<span>${A.e(p)}</span></li>`).join("")}</ul>`;
  };

  /* Si une image ne charge pas (hors ligne, site bloqué), on la retire : les initiales restent */
  document.addEventListener("error", ev => {
    const im = ev.target;
    if (im && im.tagName === "IMG" && im.closest(".logo")) im.remove();
  }, true);
  /* Les favicons très petits ou le globe par défaut de Google ne valent pas mieux que les initiales */
  document.addEventListener("load", ev => {
    const im = ev.target;
    if (im && im.tagName === "IMG" && im.closest(".logo") && im.naturalWidth && im.naturalWidth < 24) im.remove();
  }, true);
})();
