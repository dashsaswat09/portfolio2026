import { answerSchema, systemPrompt } from "./prompt";

// Minimal Gemini REST client. No SDK, so no extra dependency.
// Model and limits come from environment variables (see .env.example).

export type ModelAnswer = { answer: string; supported: boolean; links: string[]; action: "none" | "schedule" };

export class ProviderError extends Error {
  constructor(message: string, readonly kind: "config" | "timeout" | "upstream" | "parse") {
    super(message);
  }
}

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

export async function askGemini(question: string): Promise<ModelAnswer> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new ProviderError("GEMINI_API_KEY is not set", "config");
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const timeoutMs = Number(process.env.AI_TIMEOUT_MS || 9000);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      signal: ctrl.signal,
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt() }] },
        contents: [{ role: "user", parts: [{ text: question }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: Number(process.env.AI_MAX_OUTPUT_TOKENS || 400),
          responseMimeType: "application/json",
          responseSchema: answerSchema,
        },
      }),
    });
  } catch (err) {
    throw new ProviderError(ctrl.signal.aborted ? "Model timed out" : "Network error", ctrl.signal.aborted ? "timeout" : "upstream");
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) throw new ProviderError(`Gemini returned ${res.status}`, "upstream");

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  try {
    const parsed = JSON.parse(text) as Partial<ModelAnswer>;
    if (typeof parsed.answer !== "string" || typeof parsed.supported !== "boolean") throw new Error("shape");
    return {
      answer: parsed.answer,
      supported: parsed.supported,
      links: Array.isArray(parsed.links) ? parsed.links.map(String) : [],
      action: parsed.action === "schedule" ? "schedule" : "none",
    };
  } catch {
    throw new ProviderError("Could not parse model output", "parse");
  }
}
