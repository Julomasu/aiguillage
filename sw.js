/* Service worker : rend le site installable et utilisable hors ligne.
   Pages et scripts : réseau d'abord (pour recevoir les mises à jour), cache en secours.
   Données (data/) : cache d'abord, rafraîchi en arrière-plan. Fonds de carte et API : jamais mis en cache ici. */
const CACHE = "aiguillage-v8";
const ESSENTIEL = [
  "./", "index.html", "manifest.webmanifest", "css/style.css",
  "js/data/formations.js", "js/data/metiers.js", "js/data/contenus.js", "js/core.js", "js/defis.js", "js/i18n.js",
  "js/pages-accueil.js", "js/pages-test.js", "js/pages-plan.js", "js/pages-fiches.js", "js/pages-outils.js",
  "js/pages-carte.js", "js/pages-comparer.js", "js/pages-jpo.js", "js/pages-ecoles.js", "js/pages-classe.js", "js/pages-temoignages.js", "js/config.js", "js/pages-budget.js", "js/pages-assistant.js", "js/pages-reseau.js",
  "data/parcoursup-stats.json", "data/villes.json", "data/loyers.json", "icones/icone-192.png"
];

self.addEventListener("install", ev => {
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(ESSENTIEL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", ev => {
  ev.waitUntil(caches.keys()
    .then(cles => Promise.all(cles.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", ev => {
  const url = new URL(ev.request.url);
  if (ev.request.method !== "GET" || url.origin !== location.origin || url.pathname.includes("/api/")) return;
  if (url.pathname.includes("/data/") || url.pathname.includes("/vendor/")) {
    ev.respondWith(caches.open(CACHE).then(async c => {
      const enCache = await c.match(ev.request);
      const frais = fetch(ev.request).then(r => { if (r.ok) c.put(ev.request, r.clone()); return r; }).catch(() => enCache);
      return enCache || frais;
    }));
    return;
  }
  ev.respondWith(fetch(ev.request)
    .then(r => { if (r.ok) { const copie = r.clone(); caches.open(CACHE).then(c => c.put(ev.request, copie)); } return r; })
    .catch(() => caches.match(ev.request).then(r => r || caches.match("index.html"))));
});
