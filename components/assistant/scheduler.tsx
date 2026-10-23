"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { scheduling } from "@/content/scheduling";
import { profile } from "@/content/profile";

type Slot = { start: string; end: string };
type Step = "type" | "slots" | "form" | "sending" | "done";

const visitorTz = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || scheduling.hostTimeZone;
  } catch {
    return scheduling.hostTimeZone;
  }
};

const fmt = (iso: string, tz: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-IN", { timeZone: tz, ...o }).format(new Date(iso));

export function Scheduler({ tabIndex, onBooked }: { tabIndex: number; onBooked: (summary: string) => void }) {
  // onBooked fires once the booking succeeds; its text is spoken and shown in the chat.
  const tz = useMemo(visitorTz, []);
  const sameZone = useMemo(
    () => fmt(new Date().toISOString(), tz, { hour: "numeric", timeZoneName: "short" }) === fmt(new Date().toISOString(), scheduling.hostTimeZone, { hour: "numeric", timeZoneName: "short" }),
    [tz],
  );
  const [step, setStep] = useState<Step>("type");
  const [type, setType] = useState<string>("");
  const [slots, setSlots] = useState<Record<string, Slot[]>>({});
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", notes: "", website: "" });
  const [mock, setMock] = useState(false);
  const meeting = scheduling.meetings.find((m) => m.id === type);

  const load = useCallback(
    async (t: string) => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/schedule/slots?type=${encodeURIComponent(t)}&tz=${encodeURIComponent(tz)}`);
        const data = await res.json();
        if (!res.ok) throw new Error([data.error || "Couldn't load the calendar.", data.detail && `(Setup detail: ${data.detail})`].filter(Boolean).join(" "));
        if (data.configured === false) {
          setError("Booking isn't switched on yet.");
          setSlots({});
          return;
        }
        const s = data.slots as Record<string, Slot[]>;
        setSlots(s);
        const days = Object.keys(s).filter((d) => s[d].length);
        setDay(days[0] ?? "");
        setStep("slots");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Couldn't load the calendar.");
      } finally {
        setLoading(false);
      }
    },
    [tz],
  );

  useEffect(() => {
    if (type) load(type);
  }, [type, load]);

  const days = Object.keys(slots).filter((d) => slots[d].length).slice(0, 10);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!slot || !meeting) return;
    setStep("sending");
    setError("");
    setFieldErrors({});
    try {
      const res = await fetch("/api/schedule/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: meeting.id, start: slot.start, tz }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFieldErrors(data.errors || {});
        setError(data.error || "The booking didn't go through.");
        if (data.taken) {
          setSlot(null);
          await load(meeting.id);
          return;
        }
        setStep("form");
        return;
      }
      setMock(Boolean(data.mock));
      setStep("done");
      onBooked(
        data.mock
          ? `Test booking only (preview mode) — nothing was sent. On the live site this would book ${meeting.label.toLowerCase()} for ${fmt(slot.start, tz, { weekday: "long", hour: "numeric", minute: "2-digit" })}.`
          : `Booked: ${meeting.label} (${meeting.minutes} min) on ${fmt(slot.start, tz, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" })}. A calendar invite with the meeting link is on its way to ${form.email}.`,
      );
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setStep("form");
    }
  }

  const hostTime = (iso: string) => (sameZone ? "" : ` · ${fmt(iso, scheduling.hostTimeZone, { hour: "numeric", minute: "2-digit" })} ${scheduling.hostTimeZoneLabel}`);

  if (step === "done" && slot && meeting) {
    return (
      <div className="sched sched--done" role="status">
        <p className="sched__ok">{mock ? "Test booking (preview mode — nothing was sent)" : "You're booked"}</p>
        <p>
          <strong>{meeting.label}</strong> · {meeting.minutes} min
          <br />
          {fmt(slot.start, tz, { weekday: "long", day: "numeric", month: "long" })},{" "}
          {fmt(slot.start, tz, { hour: "numeric", minute: "2-digit", timeZoneName: "short" })}
        </p>
        <p className="sched__fine">The invite email has links to reschedule or cancel.</p>
      </div>
    );
  }

  return (
    <div className="sched">
      <fieldset className="sched__types" disabled={loading || step === "sending"}>
        <legend className="sr-only">Meeting type</legend>
        {scheduling.meetings.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`sched__type ${type === m.id ? "is-on" : ""}`}
            aria-pressed={type === m.id}
            onClick={() => {
              setSlot(null);
              setStep("type");
              setType(m.id);
            }}
            tabIndex={tabIndex}
          >
            <strong>{m.label}</strong>
            <span>
              {m.minutes} min · {m.blurb}
            </span>
          </button>
        ))}
      </fieldset>

      {loading && <p className="sched__fine" aria-live="polite">Checking Saswat's calendar…</p>}

      {(step === "slots" || step === "form" || step === "sending") && !loading && (
        <>
          {days.length === 0 ? (
            <p className="sched__fine">
              No open times in the next {scheduling.daysAhead} days. <a href={`mailto:${profile.email}`} tabIndex={tabIndex}>Email Saswat</a> to find a time.
            </p>
          ) : (
            <>
              <p className="sched__fine">Times in your time zone ({tz}).</p>
              <div className="sched__days" role="tablist" aria-label="Day">
                {days.map((d) => (
                  <button
                    key={d}
                    role="tab"
                    aria-selected={d === day}
                    className={`sched__day ${d === day ? "is-on" : ""}`}
                    onClick={() => {
                      setDay(d);
                      setSlot(null);
                      setStep("slots");
                    }}
                    tabIndex={tabIndex}
                  >
                    <span>{fmt(slots[d][0].start, tz, { weekday: "short" })}</span>
                    <strong>{fmt(slots[d][0].start, tz, { day: "numeric" })}</strong>
                    <span>{fmt(slots[d][0].start, tz, { month: "short" })}</span>
                  </button>
                ))}
              </div>
              <div className="sched__slots">
                {(slots[day] ?? []).map((s) => (
                  <button
                    key={s.start}
                    className={`sched__slot ${slot?.start === s.start ? "is-on" : ""}`}
                    aria-pressed={slot?.start === s.start}
                    onClick={() => {
                      setSlot(s);
                      setStep("form");
                    }}
                    tabIndex={tabIndex}
                  >
                    {fmt(s.start, tz, { hour: "numeric", minute: "2-digit" })}
                    <small>{hostTime(s.start)}</small>
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {(step === "form" || step === "sending") && slot && meeting && (
        <form className="sched__form" onSubmit={submit} noValidate>
          <p className="sched__summary">
            {meeting.label} · {fmt(slot.start, tz, { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}
          </p>
          {(
            [
              ["name", "Your name", "text", true],
              ["email", "Work email", "email", true],
              ["company", "Company", "text", false],
              ["role", "Role you're hiring for", "text", false],
            ] as const
          ).map(([k, label, kind, req]) => (
            <label key={k} className="sched__field">
              <span>
                {label}
                {req ? "" : " (optional)"}
              </span>
              <input
                type={kind}
                value={form[k]}
                required={req}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                aria-invalid={Boolean(fieldErrors[k])}
                autoComplete={k === "name" ? "name" : k === "email" ? "email" : k === "company" ? "organization" : "off"}
                tabIndex={tabIndex}
              />
              {fieldErrors[k] && <em>{fieldErrors[k]}</em>}
            </label>
          ))}
          <label className="sched__field">
            <span>Anything to prepare? (optional)</span>
            <textarea value={form.notes} rows={2} maxLength={600} onChange={(e) => setForm({ ...form, notes: e.target.value })} tabIndex={tabIndex} />
          </label>
          <input className="sched__hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
          <button type="submit" className="btn btn--primary btn--small" disabled={step === "sending"} tabIndex={tabIndex}>
            {step === "sending" ? "Booking…" : "Confirm booking"}
          </button>
        </form>
      )}

      {error && (
        <p className="ask__error" role="alert">
          {error} {error.includes("isn't switched on") && <a href={`mailto:${profile.email}`} tabIndex={tabIndex}>Email Saswat instead.</a>}
        </p>
      )}
    </div>
  );
}
