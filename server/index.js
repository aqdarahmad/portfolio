import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSystemPrompt } from "./profile.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");

const PORT = Number(process.env.PORT) || 4173;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const GEMINI_API_BASE =
  process.env.GEMINI_API_BASE || "https://generativelanguage.googleapis.com/v1beta";

const MAX_MESSAGES = 12; // conversation turns kept per request
const MAX_CHARS = 800; // per message
const RATE_LIMIT = 15; // requests per IP per minute
const SYSTEM_PROMPT = buildSystemPrompt();

const app = express();
app.set("trust proxy", 1); // Render sits behind a proxy
app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));

// Tiny in-memory rate limiter (enough for a personal site on a single instance).
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of hits) {
    if (times.every((t) => now - t >= 60_000)) hits.delete(ip);
  }
}, 60_000).unref();

function cleanMessages(input) {
  if (!Array.isArray(input) || input.length === 0) return null;
  const msgs = input
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .slice(-MAX_MESSAGES);
  // Gemini needs the conversation to start with and end on a user turn.
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return null;
  return msgs;
}

app.post("/api/chat", async (req, res) => {
  if (rateLimited(req.ip)) {
    return res.status(429).json({ error: "rate_limited" });
  }
  const messages = cleanMessages(req.body?.messages);
  if (!messages) return res.status(400).json({ error: "bad_request" });
  if (!GEMINI_API_KEY) return res.status(503).json({ error: "not_configured" });

  try {
    const response = await fetch(`${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: { temperature: 0.4, maxOutputTokens: 700 },
      }),
      signal: AbortSignal.timeout(25_000),
    });

    if (!response.ok) {
      console.error("Gemini error", response.status, (await response.text()).slice(0, 300));
      return res.status(502).json({ error: "upstream_error" });
    }

    const data = await response.json();
    const reply = (data.candidates?.[0]?.content?.parts || [])
      .map((p) => p.text || "")
      .join("")
      .trim();
    if (!reply) return res.status(502).json({ error: "empty_reply" });
    return res.json({ reply });
  } catch (err) {
    console.error("Chat request failed:", err.name, err.message);
    return res.status(502).json({ error: "upstream_error" });
  }
});

app.use(express.static(DIST, { maxAge: "1h", index: "index.html" }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio running on port ${PORT}`);
  if (!GEMINI_API_KEY) console.warn("GEMINI_API_KEY is not set: the chatbot will be disabled.");
});
