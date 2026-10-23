import { NextResponse } from "next/server";
import { getMeeting, scheduling } from "@/content/scheduling";
import { createBooking, getSlots, isMock, ScheduleError, scheduleConfigured } from "@/lib/schedule/cal";
import { bookingAllowed, clean, ipOf, validEmail, validTimeZone } from "@/lib/schedule/validate";

export const runtime = "nodejs";

// POST /api/schedule/book
// Only called after the visitor fills the form and presses "Confirm" — never by the AI model.
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (clean(b.website, 200)) return NextResponse.json({ ok: true, mock: true });

  const meeting = getMeeting(clean(b.type, 40));
  const name = clean(b.name, 100);
  const email = clean(b.email, 160);
  const company = clean(b.company, 120);
  const role = clean(b.role, 120);
  const notes = clean(b.notes, 600);
  const tz = clean(b.tz, 64);
  const start = clean(b.start, 40);

  const errors: Record<string, string> = {};
  if (!meeting) errors.type = "Pick a meeting type.";
  if (name.length < 2) errors.name = "Enter your name.";
  if (!validEmail(email)) errors.email = "Enter a valid email address.";
  if (!validTimeZone(tz)) errors.tz = "Unknown time zone.";
  if (Number.isNaN(Date.parse(start))) errors.start = "Pick a time.";
  if (Object.keys(errors).length) return NextResponse.json({ error: "Check the highlighted fields.", errors }, { status: 400 });
  if (!scheduleConfigured()) return NextResponse.json({ error: "Booking isn't set up yet. Please email instead." }, { status: 503 });

  if (!bookingAllowed(ipOf(req))) {
    return NextResponse.json({ error: "Too many bookings from this connection today. Please email instead." }, { status: 429 });
  }

  // Re-check the slot is still free, within the booking window.
  const startMs = Date.parse(start);
  if (startMs < Date.now() || startMs > Date.now() + scheduling.daysAhead * 86_400_000) {
    return NextResponse.json({ error: "That time is outside the booking window." }, { status: 400 });
  }
  try {
    const day = await getSlots({
      slug: meeting!.slug,
      start: new Date(startMs - 86_400_000).toISOString(),
      end: new Date(startMs + 86_400_000).toISOString(),
      timeZone: tz,
      minutes: meeting!.minutes,
    });
    const free = Object.values(day).flat().some((s) => Date.parse(s.start) === startMs);
    if (!free) return NextResponse.json({ error: "That time was just taken. Pick another.", taken: true }, { status: 409 });

    const booking = await createBooking({ slug: meeting!.slug, start, name, email, timeZone: tz, notes, company, role });
    return NextResponse.json({ ok: true, uid: booking.uid, start: booking.start, mock: isMock() });
  } catch (err) {
    if (err instanceof ScheduleError && err.kind === "taken") {
      return NextResponse.json({ error: "That time was just taken. Pick another.", taken: true }, { status: 409 });
    }
    console.error("[schedule/book]", err);
    return NextResponse.json({ error: "The booking didn't go through. Please try again or email instead." }, { status: 502 });
  }
}
