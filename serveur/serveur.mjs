// Petit serveur Node sans dépendance (hors SDK Claude) : sert le site et l'API de l'assistant.
// Lancement : ANTHROPIC_API_KEY=... node serveur/serveur.mjs   puis http://localhost:8000
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import { repondre, assistantDisponible } from "./assistant.mjs";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT) || 8000;
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".png": "image/png", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json" };
// Seuls ces dossiers sont servis (pas les données brutes ni le code serveur)
const PUBLICS = ["index.html", "manifest.webmanifest", "sw.js", "css/", "js/", "data/", "icones/", "fonts/"];

async function servirFichier(res, chemin) {
  const relatif = path.relative(RACINE, chemin).split(path.sep).join("/");
  if (relatif.startsWith("..") || !PUBLICS.some(p => relatif === p || relatif.startsWith(p))) return false;
  try {
    if (!(await stat(chemin)).isFile()) return false;
    const contenu = await readFile(chemin);
    res.writeHead(200, { "Content-Type": TYPES[path.extname(chemin)] || "application/octet-stream", "Cache-Control": relatif.startsWith("data/") ? "public, max-age=86400" : "no-cache" });
    res.end(contenu);
    return true;
  } catch { return false; }
}

const serveur = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (url.pathname === "/api/assistant") {
    if (req.method === "GET") { res.writeHead(assistantDisponible() ? 200 : 503).end(); return; }
    if (req.method !== "POST") { res.writeHead(405).end(); return; }
    const abandon = new AbortController();
    res.on("close", () => { if (!res.writableFinished) abandon.abort(); });
    const requete = new Request(url, { method: "POST", headers: req.headers, body: Readable.toWeb(req), duplex: "half", signal: abandon.signal });
    const reponse = await repondre(requete, req.socket.remoteAddress);
    res.writeHead(reponse.status, Object.fromEntries(reponse.headers));
    if (reponse.body) {
      try { for await (const morceau of reponse.body) res.write(morceau); } catch { /* connexion fermée */ }
    }
    res.end();
    return;
  }
  const demande = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  if (await servirFichier(res, path.join(RACINE, path.normalize(demande)))) return;
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Page introuvable");
});

serveur.listen(PORT, () => {
  console.log(`Aiguillage : http://localhost:${PORT}`);
  if (!assistantDisponible()) console.log("Assistant désactivé : définis ANTHROPIC_API_KEY pour l'activer.");
});
