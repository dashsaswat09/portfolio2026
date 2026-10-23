"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { curatedAnswers } from "@/content/assistant";
import type { LinkItem } from "@/content/types";
import { setProbeMood } from "../scene/probe-state";

type Msg = { role: "user" | "guide"; text: string; links?: LinkItem[]; note?: string };

const Ctx = createContext<{ open: (curatedId?: string) => void }>({ open: () => {} });
export const useAssistant = () => useContext(Ctx);

const GREETING: Msg = {
  role: "guide",
  text: "Hi — I'm the guide to Saswat's work. Pick a question or type your own. I only answer from what's on this site, and I'll say so when I don't know.",
};

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const opener = useRef<Element | null>(null);
  const log = useRef<HTMLDivElement>(null);

  const ask = useCallback(async (opts: { curatedId?: string; question?: string }) => {
    const curated = opts.curatedId ? curatedAnswers.find((c) => c.id === opts.curatedId) : undefined;
    const q = curated?.question ?? opts.question?.trim() ?? "";
    if (!q) return;
    setError("");
    setMsgs((m) => [...m, { role: "user", text: q }]);

    if (curated) {
      setProbeMood("speaking");
      setMsgs((m) => [...m, { role: "guide", text: curated.answer, links: curated.links }]);
      setTimeout(() => setProbeMood("idle"), 1400);
      return;
    }

    setBusy(true);
    setProbeMood("thinking");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (!res.ok && !data.answer) throw new Error(data.error || "Something went wrong.");
      setMsgs((m) => [
        ...m,
        {
          role: "guide",
          text: data.answer,
          links: data.links,
          note: data.source === "fallback" ? "Fallback answer" : data.supported === false ? "Not covered on this site" : undefined,
        },
      ]);
      setProbeMood("speaking");
      setTimeout(() => setProbeMood("idle"), 1400);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't reach the assistant. Check your connection and try again.");
      setProbeMood("idle");
    } finally {
      setBusy(false);
    }
  }, []);

  const open = useCallback(
    (curatedId?: string) => {
      opener.current = document.activeElement;
      setOpen(true);
      if (curatedId) ask({ curatedId });
    },
    [ask],
  );

  const close = useCallback(() => {
    setOpen(false);
    (opener.current as HTMLElement | null)?.focus?.();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    field.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a, button, input");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const asked = new Set(msgs.filter((m) => m.role === "user").map((m) => m.text));

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <button className={`ask-launcher ${isOpen ? "is-hidden" : ""}`} onClick={() => open()} aria-label="Ask the AI guide">
        <span className="ask-launcher__eyes" aria-hidden="true" />
        Ask AI
      </button>
      {isOpen && <div className="ask-scrim" onClick={close} aria-hidden="true" />}
      <div
        ref={panel}
        className={`ask ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-title"
        aria-hidden={!isOpen}
        data-lenis-prevent
      >
        <div className="ask__head">
          <h2 id="ask-title">Ask about Saswat's work</h2>
          <button className="ask__close" onClick={close} tabIndex={isOpen ? 0 : -1}>
            Close
          </button>
        </div>
        <div className="ask__log" ref={log} aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={`msg msg--${m.role}`}>
              {m.note && <span className="msg__note">{m.note}</span>}
              <p>{m.text}</p>
              {m.links && m.links.length > 0 && (
                <div className="msg__links">
                  {m.links.map((l) =>
                    l.href.startsWith("/") && !l.href.endsWith(".pdf") ? (
                      <Link key={l.href} href={l.href} onClick={close} tabIndex={isOpen ? 0 : -1}>
                        {l.label} →
                      </Link>
                    ) : (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener" tabIndex={isOpen ? 0 : -1}>
                        {l.label} ↗
                      </a>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
          {busy && (
            <div className="msg msg--guide msg--thinking" aria-label="Thinking">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>
        <div className="ask__chips">
          {curatedAnswers
            .filter((c) => !asked.has(c.question))
            .slice(0, 4)
            .map((c) => (
              <button key={c.id} className="chip" onClick={() => ask({ curatedId: c.id })} tabIndex={isOpen ? 0 : -1}>
                {c.question}
              </button>
            ))}
        </div>
        <form
          className="ask__form"
          onSubmit={(e) => {
            e.preventDefault();
            if (busy) return;
            ask({ question: input });
            setInput("");
          }}
        >
          <label htmlFor="ask-input" className="sr-only">
            Your question
          </label>
          <input
            id="ask-input"
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={300}
            placeholder="Type a question…"
            autoComplete="off"
            tabIndex={isOpen ? 0 : -1}
          />
          <button type="submit" className="btn btn--small" disabled={busy || !input.trim()} tabIndex={isOpen ? 0 : -1}>
            Ask
          </button>
        </form>
        {error && (
          <p className="ask__error" role="alert">
            {error}
          </p>
        )}
        <p className="ask__privacy">
          Typed questions are sent to Google Gemini to write an answer. This site stores nothing.
        </p>
      </div>
    </Ctx.Provider>
  );
}
