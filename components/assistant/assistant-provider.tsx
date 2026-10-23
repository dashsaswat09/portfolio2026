"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { curatedAnswers } from "@/content/assistant";
import type { LinkItem } from "@/content/types";
import { setProbeMood } from "../scene/probe-state";
import { pickIndianVoice, speak, stopSpeaking, voiceSupported } from "./voice";
import { Scheduler } from "./scheduler";

type Msg = { role: "user" | "guide"; text: string; links?: LinkItem[]; note?: string; scheduler?: boolean };

// Requests to meet, talk or check availability open the scheduler directly, without a model call.
const SCHEDULE_INTENT = new RegExp(
  [
    "\\b(schedule|book|arrange|set up|setup|fix|plan)\\b.{0,30}\\b(interview|call|meeting|chat|time|slot|meet)",
    "\\binterview (him|saswat)\\b",
    "\\b(talk|speak|chat|meet|connect) (to|with) (him|saswat)\\b",
    "\\b(is|when is|when's) (he|saswat) (free|available)\\b",
    "\\b(his|saswat'?s) (availability|calendar|schedule)\\b",
    "\\bavailable (to|for) (talk|chat|a call|an interview|interview|meet)",
    "\\b(free|available) (slots?|times?)\\b",
  ].join("|"),
  "i",
);

const SCHEDULE_INTRO =
  "Happy to set that up. Pick the kind of call, then a time that works — times are shown in your time zone, and Saswat's calendar is checked live.";

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
  const [voiceOn, setVoiceOn] = useState(false);
  const [voiceName, setVoiceName] = useState<string | null | undefined>(undefined); // undefined = still checking
  const voiceRef = useRef(false);

  useEffect(() => {
    if (!voiceSupported()) return setVoiceName(null);
    pickIndianVoice().then((v) => setVoiceName(v ? v.name : null));
    try {
      if (localStorage.getItem("guide-voice") === "on") {
        voiceRef.current = true;
        setVoiceOn(true);
      }
    } catch {}
  }, []);

  /** Animate the probe while an answer is "spoken" — aloud if voice is on. */
  const respond = useCallback(async (text: string) => {
    if (voiceRef.current) {
      const ok = await speak(text, { start: () => setProbeMood("speaking"), end: () => setProbeMood("idle") });
      if (ok) return;
    }
    setProbeMood("speaking");
    setTimeout(() => setProbeMood("idle"), 1400);
  }, []);

  const toggleVoice = useCallback(() => {
    const next = !voiceRef.current;
    voiceRef.current = next;
    setVoiceOn(next);
    try {
      localStorage.setItem("guide-voice", next ? "on" : "off");
    } catch {}
    if (next) respond("Namaste! I'm Saswat's portfolio guide. Ask me anything about his work.");
    else {
      stopSpeaking();
      setProbeMood("idle");
    }
  }, [respond]);

  const ask = useCallback(async (opts: { curatedId?: string; question?: string }) => {
    const curated = opts.curatedId ? curatedAnswers.find((c) => c.id === opts.curatedId) : undefined;
    const q = curated?.question ?? opts.question?.trim() ?? "";
    if (!q) return;
    setError("");
    setMsgs((m) => [...m, { role: "user", text: q }]);

    if (curated) {
      setMsgs((m) => [...m, { role: "guide", text: curated.answer, links: curated.links }, ...(curated.action === "schedule" ? [{ role: "guide" as const, text: "", scheduler: true }] : [])]);
      respond(curated.answer);
      return;
    }

    if (SCHEDULE_INTENT.test(q)) {
      setMsgs((m) => [...m, { role: "guide", text: SCHEDULE_INTRO }, { role: "guide", text: "", scheduler: true }]);
      respond(SCHEDULE_INTRO);
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
        ...(data.action === "schedule" ? [{ role: "guide" as const, text: "", scheduler: true }] : []),
      ]);
      respond(data.answer);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't reach the assistant. Check your connection and try again.");
      setProbeMood("idle");
    } finally {
      setBusy(false);
    }
  }, [respond]);

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
    stopSpeaking();
    setProbeMood("idle");
    (opener.current as HTMLElement | null)?.focus?.();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    field.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a, button:not(:disabled), input:not([aria-hidden]), textarea");
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
  const scheduling = msgs[msgs.length - 1]?.scheduler === true; // hide chips while booking

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
          <div className="ask__tools">
            {voiceName !== null && (
              <button
                className={`ask__voice ${voiceOn ? "is-on" : ""}`}
                onClick={toggleVoice}
                aria-pressed={voiceOn}
                disabled={voiceName === undefined}
                tabIndex={isOpen ? 0 : -1}
                title={voiceName ? `Indian English voice: ${voiceName}` : "Checking for an Indian English voice"}
              >
                <span aria-hidden="true">{voiceOn ? "🔊" : "🔈"}</span> Voice {voiceOn ? "on" : "off"}
              </button>
            )}
            <button className="ask__close" onClick={close} tabIndex={isOpen ? 0 : -1}>
              Close
            </button>
          </div>
        </div>
        <div className="ask__log" ref={log} aria-live="polite">
          {msgs.map((m, i) =>
            m.scheduler ? (
              <Scheduler
                key={i}
                tabIndex={isOpen ? 0 : -1}
                onBooked={(summary) => {
                  setMsgs((x) => [...x, { role: "guide", text: summary }]);
                  respond(summary);
                }}
              />
            ) : (
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
            ),
          )}
          {busy && (
            <div className="msg msg--guide msg--thinking" aria-label="Thinking">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>
        <div className="ask__chips" hidden={scheduling}>
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
          Typed questions are sent to Google Gemini to write an answer. Bookings go to Cal.com, which emails the invite. This site stores nothing.
          {voiceName === null && " Voice replies need an Indian English voice, which this device doesn't have."}
        </p>
      </div>
    </Ctx.Provider>
  );
}
