import { profile, about, caseStudies, experience, recognition, moreWork } from "@/content";
import type { Status } from "@/content";

// Builds the plain-text knowledge the model is allowed to use.
// Placeholder content is excluded, so the model can never repeat a made-up scenario.

const ok = (s: Status) => s !== "placeholder";

export function buildKnowledge(): string {
  const out: string[] = [];

  out.push(`# Profile
Name: ${profile.name}
Positioning: ${profile.headline}
Looking for: ${profile.looking}
Education: ${profile.education.degree}, ${profile.education.school}, ${profile.education.year}
Email: ${profile.email}
LinkedIn: ${profile.linkedin}
Content channel: ${profile.channel.name} (${profile.channel.handle}) — ${profile.channel.line}`);

  out.push(`# Scheduling
Visitors can book an interview or an intro chat with Saswat inside this guide; his calendar is checked live. He is based in India (IST).`);

  out.push(`# About`);
  for (const s of about.sections.filter((s) => ok(s.status))) out.push(`## ${s.heading}\n${s.body.join("\n")}`);

  out.push(`# Experience (ownership: owned / contributed / team / independent)`);
  for (const e of experience.filter((e) => ok(e.status))) {
    out.push(
      `- ${e.org} — ${e.role} (${e.period}; ${e.kind}; ${e.ownership}). ${e.line}${e.details ? " " + e.details.join(" ") : ""}${e.slug ? ` Case study: /work/${e.slug}` : ""}`,
    );
  }

  for (const c of caseStudies) {
    out.push(`# Case study: ${c.company} — ${c.title} (/work/${c.slug})
Role: ${c.role}. Period: ${c.period}. Ownership: ${c.ownership}.`);
    if (ok(c.summary.status)) out.push(`Problem: ${c.summary.problem}\nWhat he did: ${c.summary.did}\nOutcome: ${c.summary.outcome}`);
    for (const m of c.metrics.filter((m) => ok(m.status))) out.push(`Metric: ${m.label}: ${m.value}${m.context ? ` (${m.context.replace(/VERIFY:?.*/i, "").trim()})` : ""}`);
    for (const s of c.sections.filter((s) => ok(s.status))) out.push(`## ${s.heading}\n${s.body.join("\n")}${s.bullets ? "\n- " + s.bullets.join("\n- ") : ""}`);
    for (const d of c.decisions.filter((d) => ok(d.status))) out.push(`Decision: ${d.title}. Chose: ${d.choice} Why: ${d.why}`);
  }

  out.push(`# Recognition`);
  for (const r of recognition.filter((r) => ok(r.status))) out.push(`- ${r.name}: ${r.detail}`);
  out.push(`# Other work`);
  for (const w of moreWork.filter((w) => ok(w.status))) out.push(`- ${w.name}: ${w.detail}`);

  return out.join("\n\n");
}
