import { NextResponse } from "next/server";
import { getMeeting, scheduling } from "@/content/scheduling";
import { getSlots, ScheduleError, scheduleConfigured } from "@/lib/schedule/cal";
import { validTimeZone } from "@/lib/schedule/validate";

export const runtime = "nodejs";

// GET /api/schedule/slots?type=interview&tz=Asia/Kolkata
// Returns free slots for the next `daysAhead` days. Only free times — never event details.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const meeting = getMeeting(url.searchParams.get("type") || "");
  const tz = url.searchParams.get("tz") || scheduling.hostTimeZone;

  if (!meeting) return NextResponse.json({ error: "Unknown meeting type." }, { status: 400 });
  if (!validTimeZone(tz)) return NextResponse.json({ error: "Unknown time zone." }, { status: 400 });
  if (!scheduleConfigured()) return NextResponse.json({ configured: false, slots: {} });

  const start = new Date();
  const end = new Date(start.getTime() + scheduling.daysAhead * 86_400_000);
  try {
    const slots = await getSlots({
      slug: meeting.slug,
      start: start.toISOString(),
      end: end.toISOString(),
      timeZone: tz,
      minutes: meeting.minutes,
    });
    return NextResponse.json(
      { configured: true, meeting: meeting.id, slots },
      { headers: { "Cache-Control": "private, max-age=30" } },
    );
  } catch (err) {
    console.error("[schedule/slots]", err);
    const msg = err instanceof ScheduleError && err.kind === "timeout" ? "The calendar took too long to respond." : "Couldn't load the calendar.";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
