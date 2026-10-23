import { NextResponse } from "next/server";
import { allowedLinks, curatedAnswers } from "@/content/assistant";
import { askGemini, ProviderError } from "@/lib/ai/gemini";
import { checkLimit } from "@/lib/ai/rate-limit";

export const runtime = "nodejs";

const MAX_LEN = 300;

export type AskResponse = {
  answer: string;
  links: { label: string; href: string }[];
  supported: boolean;
  source: "curated" | "model" | "fallback";
  action?: "none" | "schedule";
};

const fallback = (answer: string): AskResponse => ({
  answer,
  links: [
    { label: "Case studies", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
  supported: false,
  source: "fallback",
});

export async function POST(req: Request) {
  let question = "";
  try {
    const body = (await req.json()) as { question?: unknown; curatedId?: unknown };
    if (typeof body.curatedId === "string") {
      const c = curatedAnswers.find((a) => a.id === body.curatedId);
      if (c) return NextResponse.json<AskResponse>({ answer: c.answer, links: c.links, supported: true, source: "curated" });
    }
    question = typeof body.question === "string" ? body.question.trim() : "";
  } catch {
    return NextResponse.json({ error: "Send JSON with a 'question' field." }, { status: 400 });
  }

  if (!question) return NextResponse.json({ error: "Ask a question first." }, { status: 400 });
  if (question.length > MAX_LEN) {
    return NextResponse.json({ error: `Keep questions under ${MAX_LEN} characters.` }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const limit = checkLimit(ip);
  if (!limit.ok) {
    return NextResponse.json<AskResponse>(
      fallback(
        limit.reason === "daily"
          ? "The assistant has hit its daily limit. Everything it knows is on the case-study pages, or you can email Saswat directly."
          : "That's a lot of questions in a short time. Give it a minute, or browse the case studies.",
      ),
      { status: 429 },
    );
  }

  try {
    const out = await askGemini(question);
    const links = out.links
      .map((href) => allowedLinks.find((l) => l.href === href))
      .filter((l): l is { label: string; href: string } => Boolean(l))
      .slice(0, 3);
    return NextResponse.json<AskResponse>({ answer: out.answer, links, supported: out.supported, source: "model", action: out.action });
  } catch (err) {
    const kind = err instanceof ProviderError ? err.kind : "upstream";
    if (kind === "config") console.warn("[ask] GEMINI_API_KEY missing — returning fallback");
    else console.error("[ask]", err);
    return NextResponse.json<AskResponse>(
      fallback("The assistant can't answer right now. The case studies and experience pages have the full detail, or you can email Saswat."),
      { status: 200 },
    );
  }
}
