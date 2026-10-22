/* Règles de traduction pour les textes qui mélangent des données (déjà en anglais) et des mots de liaison français.
   Chaque règle : [expression, remplacement ou fonction]. Appliquées dans l'ordre au texte normalisé. */
(function () {
  const ne = t => A.nombreEn(t);
  const pl = (n, un, plusieurs) => Number(String(n).replace(/\D/g, "")) === 1 ? un : plusieurs;
  const TYPES_JPO = { "Journée portes ouvertes": "Open day", "Salon de l'orientation": "Orientation fair", "Visioconférence": "Video call", "Immersion / stage": "Immersion / internship" };
  const PUBLIC = { "Public": "Public", "Privé": "Private" };
  const DIPLOMES = {
    "Licence générale": "General licence", "Licence professionnelle": "Licence pro", "Master LMD": "Master's", "Diplôme d'ingénieurs": "Engineering degree",
    "Diplôme visé niveau bac + 5 grade master": "Accredited bac+5 degree (master's level)", "Master MEEF": "Teaching master's (MEEF)",
    "Diplôme visé niveau bac + 3": "Accredited bac+3 degree", "Diplôme visé niveau bac + 4": "Accredited bac+4 degree", "Diplôme visé niveau bac + 5": "Accredited bac+5 degree",
    "Diplôme visé niveau bac + 3 ou bac + 4 grade licence": "Accredited bac+3/4 degree (licence level)", "Bachelor universitaire de technologie": "BUT"
  };
  const DISCIPLINES = { "droit": "law", "psychologie": "psychology", "informatique": "computer science", "mathematiques": "mathematics", "economie et gestion": "economics and management",
    "langues etrangeres appliquees": "applied foreign languages", "staps : entrainement sportif": "sports science (training)", "sciences de la vie": "life sciences",
    "sciences de l'education": "education sciences", "science politique": "political science" };
  const accents = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
  const cle = s => accents(s.toLowerCase()).replace(/\s+/g, " ").trim();
  const DIPLOMES_N = {}; Object.keys(DIPLOMES).forEach(k => { DIPLOMES_N[cle(k)] = DIPLOMES[k]; });
  const JETONS = { "autres": "Other", "sante": "Health", "licence": "Licence", "prepa": "Prépa", "bts": "BTS", "but": "BUT", "ecole d'inge": "Engineering school", "ecole de commerce": "Business school" };

  A.EN_RE = [
    // — Récompenses, toasts
    [/^Fiche lue : (.+)$/, "Profile read: $1"],
    [/^Ligne explorée : (.+)$/, "Line explored: $1"],
    [/^Carte explorée autour de (.+)$/, "Map explored around $1"],
    [/^Tampon débloqué : (.+)$/, "Stamp unlocked: $1"],
    [/^Encore (\d+) km pour devenir (.+)$/, "$1 more km to become $2"],
    [/^Prochain niveau : (.+) à (\d+) km$/, "Next level: $1 at $2 km"],
    [/^Ton code pour la classe (\S+)$/, "Your code for class $1"],
    [/^Tu rejoins la classe (\S+)$/, "You are joining class $1"],
    [/^Obtenu le (.+)$/, "Earned on $1"],
    // — Lignes du plan
    [/^Ligne (\d+) · (.+)$/, "Line $1 · $2"],
    [/^Ligne (\d+) : (.+)$/, "Line $1: $2"],
    [/^Ligne (\d+)$/, "Line $1"],
    // — Fiches, résultats, carnet
    [/^(.+) · dès (.+)$/, "$1 · from $2"],
    [/^Ton profil : (.+)$/, "Your profile: $1"],
    [/^Point de départ : (.+)\.$/, (m, x) => "Starting point: " + x.replace(/^bac général/, "general bac").replace(/^bac techno/, "techno bac").replace(/^bac pro/, "vocational bac")
      .replace(/bac pas encore choisi \(on a pris le bac général comme repère\)/, "bac not chosen yet (we used the general bac as a reference)") + "."],
    [/^Diplômé·es de : (.+) \(France entière\)\.$/, (m, x) => {
      const [t, d] = x.split(" · "); const tt = DIPLOMES_N[cle(t)] || t;
      return "Graduates of: " + tt + (d ? " · " + (DISCIPLINES[accents(d.toLowerCase())] || d.toLowerCase()) : "") + " (all of France).";
    }],
    [/^(\d+) diplômé·es de la promotion (\d+) ont quitté les études/, (m, n, p) => ne(n) + " graduates of the " + p + " class left their studies"],
    [/^dont (\d+) publiques?$/, (m, n) => "of which " + n + " public"],
    [/^Admis : (.*)$/, "Admitted: $1"],
    // — Carte et comparateur
    [/^à moins de (\d+) km de (.+) · ([\d\s  .,]+) places$/, (m, r, v, p) => "within " + r + " km of " + v + " · " + ne(p) + " places"],
    [/^à comparer : (.*)$/, "to compare: $1"],
    [/^(.+) · (Public|Privé)( · sélective)?$/, (m, e, p, s) => e + " · " + PUBLIC[p] + (s ? " · selective" : "")],
    [/^Distance de (.+)$/, "Distance from $1"],
    [/^Admis de ton bac \((.+)\)$/, (m, b) => "Admitted with your bac (" + ({ "général": "general", "techno": "techno", "pro": "vocational" }[b] || b) + ")"],
    [/^(\d[\d\s  ]*) formations? à moins de (\d+) km$/, (m, n, r) => ne(n) + " " + pl(n, "program", "programs") + " within " + r + " km"],
    [/^(\d+) établissements? à moins de (\d+) km de (.+)\.$/, (m, n, r, v) => n + " " + pl(n, "institution", "institutions") + " within " + r + " km of " + v + "."],
    [/^(.+) · (\d+) km · (Public|Privé) · (\d+) formations?$/, (m, v, d, p, n) => v + " · " + d + " km · " + PUBLIC[p] + " · " + n + " " + pl(n, "program", "programs")],
    // — Portes ouvertes
    [/^(Journée portes ouvertes|Salon de l'orientation|Visioconférence|Immersion \/ stage) · (.*)$/, (m, t, r) => TYPES_JPO[t] + " · " + r],
    // — Défis
    [/^Découvre (\d+) métiers de la ligne (\d+) \((.+)\)$/, "Discover $1 careers on line $2 ($3)"],
    [/^Encore (\d+) jours? · (série de (\d+) semaines?|relève un défi pour lancer ta série)$/, (m, j, s, w) =>
      j + " " + pl(j, "day", "days") + " left · " + (w ? w + "-week streak" : "complete a challenge to start your streak")],
    [/^Dernier jour · (série de (\d+) semaines?|relève un défi pour lancer ta série)$/, (m, s, w) => "Last day · " + (w ? w + "-week streak" : "complete a challenge to start your streak")],
    // — Espace enseignant
    [/^profils? lus?( · à vérifier : (.*))?$/, (m, a, d) => "profile(s) read" + (d ? " · to check: " + d
      .replace(/« ([^»]*) » n'est pas un code valide/g, "“$1” is not a valid code")
      .replace(/« ([^»]*) » contient une faute de frappe/g, "“$1” contains a typo")
      .replace(/« ([^»]*) » vient d'une autre classe/g, "“$1” comes from another class") : "")],
    // — Étiquettes de filières séparées par des virgules (portes ouvertes)
    [/^(?:Autres|Santé|Licence|Prépa|BTS|BUT|École d'ingé|École de commerce)(?:, (?:Autres|Santé|Licence|Prépa|BTS|BUT|École d'ingé|École de commerce))+$/, m => m.split(", ").map(j => JETONS[cle(j)] || j).join(", ")],
    [/^(\d+) à (\d+) ans$/, "$1 to $2 years"],
    [/^Salaire net médian : (.+)$/, "Median net salary: $1"],
    // — Assistant guidé : lignes de liste
    [/^: (.*)$/, (m, r) => ": " + A.traduire(r)],
  ];
})();
