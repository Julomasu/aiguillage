// Point d'entrée de l'assistant : reçoit la conversation et le contexte construit par la page,
// et renvoie la réponse de Claude en flux texte (text/plain, morceau par morceau).
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // clé lue dans ANTHROPIC_API_KEY

// Mêmes règles que dans js/pages-assistant.js (utilisées là-bas pour l'aperçu claude.ai) : garder les deux en phase.
const REGLES_FR = `Tu es l'assistant d'orientation d'Aiguillage, un site gratuit qui aide les lycéen·nes français·es à choisir leurs études.
Règles :
- Réponds en français, en tutoyant, avec des phrases simples (niveau lycée). 120 à 250 mots maximum sauf si on te demande plus de détail.
- Appuie-toi d'abord sur les DONNÉES DU SITE fournies ci-dessous. Si une information n'y figure pas, dis-le et renvoie vers Parcoursup, l'Onisep ou le/la Psy-EN du lycée. N'invente jamais un chiffre, un taux d'accès, un salaire ou une date.
- Les chiffres Parcoursup sont ceux de la session 2025. Précise-le quand tu les cites.
- Quand tu parles d'un métier ou d'une formation présent dans les données, ajoute un lien Markdown vers sa fiche, exactement sous la forme [Nom](#metier-identifiant) ou [Nom](#formation-identifiant).
- Sois honnête sur la sélectivité, mais ne décourage jamais : propose toujours au moins un chemin réaliste depuis le bac de la personne, y compris l'alternance et les passerelles.
- Tu ne connais pas les notes de la personne : ne prédis pas ses chances d'admission.
- Pas de sujets hors orientation, études, métiers, vie étudiante : recentre gentiment.`;

const REGLES_EN = `You are the guidance assistant of Aiguillage, a free site that helps French high-school students choose their studies. Many users are English-speaking families or students at French schools abroad.
Rules:
- Answer in English, in a friendly and simple tone (high-school level). 120 to 250 words maximum unless asked for more detail. Keep the French names of degrees and of Parcoursup (BTS, BUT, prépa, licence…) and explain them briefly the first time.
- Rely first on the SITE DATA provided below. If something is not there, say so and point to Parcoursup, Onisep or the school's guidance counselor (Psy-EN). Never invent a figure, an access rate, a salary or a date.
- Parcoursup figures are from the 2025 session. Say so when you quote them.
- When you mention a career or a program present in the data, add a Markdown link to its page, exactly as [Name](#metier-identifier) or [Name](#formation-identifier).
- Be honest about selectivity but never discourage: always offer at least one realistic path from the person's bac, including work-study and bridges.
- You do not know the person's grades: do not predict their chances of admission.
- No topics outside guidance, studies, careers and student life: gently refocus.`;

const LIMITES = { messages: 12, caracteresMessage: 2000, caracteresContexte: 40000, requetesParFenetre: 20, fenetreMs: 10 * 60 * 1000 };
const compteurs = new Map(); // ip -> [horodatages]

function tropDeRequetes(ip) {
  const maintenant = Date.now();
  const recents = (compteurs.get(ip) || []).filter(t => maintenant - t < LIMITES.fenetreMs);
  recents.push(maintenant);
  compteurs.set(ip, recents);
  return recents.length > LIMITES.requetesParFenetre;
}

function valider(corps) {
  if (!corps || !Array.isArray(corps.messages) || typeof corps.contexte !== "string") return null;
  const messages = corps.messages.slice(-LIMITES.messages)
    .filter(m => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map(m => ({ role: m.role, content: m.content.slice(0, LIMITES.caracteresMessage) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return null;
  return { messages, contexte: corps.contexte.slice(0, LIMITES.caracteresContexte), lang: corps.lang === "en" ? "en" : "fr" };
}

export function assistantDisponible() {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

/** Répond à POST /api/assistant. `ip` sert à la limite de débit. Renvoie une Response (API Fetch). */
export async function repondre(requete, ip = "inconnue") {
  if (!assistantDisponible()) return new Response("Assistant non configuré", { status: 503 });
  if (tropDeRequetes(ip)) return new Response("Trop de requêtes", { status: 429 });
  let corps;
  try { corps = valider(await requete.json()); } catch { corps = null; }
  if (!corps) return new Response("Requête invalide", { status: 400 });

  const encodeur = new TextEncoder();
  const flux = new ReadableStream({
    async start(controleur) {
      try {
        const stream = client.beta.messages.stream({
          model: "claude-opus-5-5",
          max_tokens: 16000,
          output_config: { effort: "low" }, // réponses de chat courtes
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default", // si un filtre de sécurité refuse, l'API relance sur le modèle de repli recommandé
          system: [
            { type: "text", text: corps.lang === "en" ? REGLES_EN : REGLES_FR, cache_control: { type: "ephemeral" } },
            { type: "text", text: (corps.lang === "en" ? "SITE DATA:\n" : "DONNÉES DU SITE :\n") + corps.contexte }
          ],
          messages: corps.messages
        }, { signal: requete.signal });

        for await (const evt of stream) {
          if (evt.type === "content_block_delta" && evt.delta.type === "text_delta") {
            controleur.enqueue(encodeur.encode(evt.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controleur.enqueue(encodeur.encode(corps.lang === "en" ? "\n\nI can't answer that question. Rephrase it, or ask your school's Psy-EN." : "\n\nJe ne peux pas répondre à cette question. Reformule-la, ou demande au/à la Psy-EN de ton lycée."));
        } else if (final.stop_reason === "max_tokens") {
          controleur.enqueue(encodeur.encode(corps.lang === "en" ? "\n\n(Answer cut short: ask a more specific question.)" : "\n\n(Réponse coupée : pose une question plus précise.)"));
        }
      } catch (e) {
        if (e instanceof Anthropic.RateLimitError) controleur.enqueue(encodeur.encode(corps.lang === "en" ? "\n\n(Lots of requests right now: try again in a minute.)" : "\n\n(Beaucoup de demandes en ce moment : réessaie dans une minute.)"));
        else if (e instanceof Anthropic.APIUserAbortError || requete.signal?.aborted) { /* la personne a arrêté */ }
        else {
          console.error("assistant :", e);
          controleur.enqueue(encodeur.encode(corps.lang === "en" ? "\n\n(The assistant ran into an error. Try again in a moment.)" : "\n\n(L'assistant a rencontré une erreur. Réessaie dans un instant.)"));
        }
      } finally {
        controleur.close();
      }
    }
  });
  return new Response(flux, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
