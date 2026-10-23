// Meeting types visitors can book through the AI guide.
// Each `slug` must match an event type in your Cal.com account (cal.com/<username>/<slug>).

export type MeetingType = { id: string; label: string; minutes: number; slug: string; blurb: string };

export const scheduling = {
  /** Saswat's own time zone; shown next to the visitor's times. */
  hostTimeZone: "Asia/Kolkata",
  hostTimeZoneLabel: "IST",
  /** How far ahead visitors can book. */
  daysAhead: 14,
  meetings: [
    { id: "interview", label: "Interview", minutes: 45, slug: "interview", blurb: "For hiring teams with an open role." },
    { id: "intro", label: "Intro chat", minutes: 20, slug: "intro-chat", blurb: "A short first conversation." },
  ] satisfies MeetingType[],
};

export const getMeeting = (id: string) => scheduling.meetings.find((m) => m.id === id);
