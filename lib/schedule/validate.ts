export function validTimeZone(tz: unknown): tz is string {
  if (typeof tz !== "string" || tz.length > 64) return false;
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export const validEmail = (e: unknown): e is string =>
  typeof e === "string" && e.length <= 160 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

export const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";

export const ipOf = (req: Request) => (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";

// Separate, stricter limit for bookings than for questions.
const bookings = new Map<string, number[]>();
export function bookingAllowed(ip: string) {
  const now = Date.now();
  const perDay = Number(process.env.BOOKING_LIMIT_PER_VISITOR_DAY || 3);
  const list = (bookings.get(ip) ?? []).filter((t) => now - t < 86_400_000);
  if (list.length >= perDay) return false;
  list.push(now);
  bookings.set(ip, list);
  if (bookings.size > 5000) bookings.clear();
  return true;
}
