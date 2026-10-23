// Cal.com API v2 client. Both endpoints used here are public: no API key is needed,
// only the Cal.com username (CAL_USERNAME). Cal.com checks the connected Google Calendar
// for conflicts, adds the video link, and emails both sides.
//
// Mock mode (SCHEDULE_MOCK=1) returns fake slots and fake bookings so the flow can be
// tested before Cal.com is set up. It is refused on production.

const API = "https://api.cal.com/v2";
const SLOTS_VERSION = process.env.CAL_SLOTS_API_VERSION || "2024-09-04";
const BOOKINGS_VERSION = process.env.CAL_BOOKINGS_API_VERSION || "2026-02-25";

export type Slot = { start: string; end: string };
export type SlotsByDay = Record<string, Slot[]>;

export class ScheduleError extends Error {
  constructor(message: string, readonly kind: "config" | "taken" | "upstream" | "timeout") {
    super(message);
  }
}

export const isMock = () => process.env.SCHEDULE_MOCK === "1" && process.env.VERCEL_ENV !== "production";

export function scheduleConfigured() {
  return isMock() || Boolean(process.env.CAL_USERNAME);
}

async function calFetch(path: string, init: RequestInit & { version: string }) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 9000);
  try {
    return await fetch(`${API}${path}`, {
      ...init,
      signal: ctrl.signal,
      headers: { "Content-Type": "application/json", "cal-api-version": init.version, ...(init.headers || {}) },
      cache: "no-store",
    });
  } catch {
    throw new ScheduleError(ctrl.signal.aborted ? "Calendar timed out" : "Calendar unreachable", ctrl.signal.aborted ? "timeout" : "upstream");
  } finally {
    clearTimeout(timer);
  }
}

export async function getSlots(opts: { slug: string; start: string; end: string; timeZone: string; minutes: number }): Promise<SlotsByDay> {
  if (isMock()) return mockSlots(opts);
  const user = process.env.CAL_USERNAME;
  if (!user) throw new ScheduleError("CAL_USERNAME is not set", "config");
  const q = new URLSearchParams({
    eventTypeSlug: opts.slug,
    username: user,
    start: opts.start,
    end: opts.end,
    timeZone: opts.timeZone,
    format: "range",
  });
  const res = await calFetch(`/slots?${q}`, { method: "GET", version: SLOTS_VERSION });
  if (!res.ok) throw new ScheduleError(`Cal.com slots returned ${res.status}`, "upstream");
  const body = (await res.json()) as { data?: Record<string, { start: string; end?: string }[]> };
  const out: SlotsByDay = {};
  for (const [day, list] of Object.entries(body.data ?? {})) {
    out[day] = list.map((s) => ({
      start: s.start,
      end: s.end ?? new Date(new Date(s.start).getTime() + opts.minutes * 60_000).toISOString(),
    }));
  }
  return out;
}

export type BookingInput = {
  slug: string;
  start: string; // ISO
  name: string;
  email: string;
  timeZone: string;
  notes: string;
  company: string;
  role: string;
};

export async function createBooking(b: BookingInput): Promise<{ uid: string; start: string }> {
  if (isMock()) return { uid: `mock-${Date.now()}`, start: b.start };
  const user = process.env.CAL_USERNAME;
  if (!user) throw new ScheduleError("CAL_USERNAME is not set", "config");
  const res = await calFetch(`/bookings`, {
    method: "POST",
    version: BOOKINGS_VERSION,
    body: JSON.stringify({
      start: new Date(b.start).toISOString(),
      eventTypeSlug: b.slug,
      username: user,
      attendee: { name: b.name, email: b.email, timeZone: b.timeZone, language: "en" },
      bookingFieldsResponses: { notes: [b.company && `Company: ${b.company}`, b.role && `Role: ${b.role}`, b.notes].filter(Boolean).join("\n") },
      metadata: { source: "portfolio-guide", company: b.company.slice(0, 120), role: b.role.slice(0, 120) },
    }),
  });
  if (res.status === 409 || res.status === 400) {
    const text = await res.text();
    if (/(not available|already|conflict|taken|busy)/i.test(text) || res.status === 409) {
      throw new ScheduleError("That time was just taken", "taken");
    }
    throw new ScheduleError(`Cal.com rejected the booking: ${text.slice(0, 200)}`, "upstream");
  }
  if (!res.ok) throw new ScheduleError(`Cal.com bookings returned ${res.status}`, "upstream");
  const body = (await res.json()) as { data?: { uid?: string; start?: string } };
  return { uid: body.data?.uid ?? "", start: body.data?.start ?? b.start };
}

// ---------- mock data for previews ----------
function mockSlots({ start, end, minutes }: { start: string; end: string; minutes: number }): SlotsByDay {
  const out: SlotsByDay = {};
  const from = new Date(start);
  const to = new Date(end);
  for (let d = new Date(from); d <= to; d.setUTCDate(d.getUTCDate() + 1)) {
    const dow = d.getUTCDay();
    const day = d.toISOString().slice(0, 10);
    // Weekday evenings 18:30–21:00 IST, Saturday mornings 10:00–12:00 IST.
    const hours = dow === 0 ? [] : dow === 6 ? ["04:30", "05:30"] : ["13:00", "14:00", "15:00"];
    const list = hours
      .map((h) => new Date(`${day}T${h}:00Z`))
      .filter((t) => t.getTime() > Date.now() + 3 * 3600_000 && (Number(day.slice(-2)) + t.getUTCHours()) % 4 !== 0)
      .map((t) => ({ start: t.toISOString(), end: new Date(t.getTime() + minutes * 60_000).toISOString() }));
    if (list.length) out[day] = list;
  }
  return out;
}
