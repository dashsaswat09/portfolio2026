// Lists every claim that still needs Saswat's attention.
// Run: npm run check:content   (exits 1 if placeholders remain, so it can gate a release)
import { caseStudies, about, experience, recognition, moreWork, profile } from "../content/index";

const rows: { where: string; status: string; text: string }[] = [];
const add = (where: string, status: string, text: unknown) => status !== "verified" && rows.push({ where, status, text: String(text).slice(0, 90) });

add("profile.resume", profile.resume.status, profile.resume.href);
about.sections.forEach((s) => add(`about › ${s.heading}`, s.status, s.body[0]));
experience.forEach((e) => add(`experience › ${e.org}`, e.status, e.line));
recognition.forEach((r) => add(`recognition › ${r.name}`, r.status, r.detail));
moreWork.forEach((w) => add(`more work › ${w.name}`, w.status, w.detail));
for (const c of caseStudies) {
  add(`${c.slug} › summary`, c.summary.status, c.summary.outcome);
  c.metrics.forEach((m) => add(`${c.slug} › metric ${m.label}`, m.status, `${m.value} ${m.context ?? ""}`));
  c.sections.forEach((s) => add(`${c.slug} › ${s.heading}`, s.status, s.body[0]));
  c.decisions.forEach((d) => add(`${c.slug} › decision ${d.title}`, d.status, d.why));
  c.artifacts.forEach((a) => !a.file && !a.href && add(`${c.slug} › artifact ${a.title}`, "placeholder", "not uploaded"));
}

const ph = rows.filter((r) => r.status === "placeholder");
const rv = rows.filter((r) => r.status === "review");
const print = (title: string, list: typeof rows) => {
  console.log(`\n${title} (${list.length})`);
  for (const r of list) console.log(`  • ${r.where}\n      ${r.text}`);
};
print("PLACEHOLDERS — replace with what really happened", ph);
print("REVIEW — confirm wording, baselines and dates", rv);
console.log(`\n${ph.length} placeholders, ${rv.length} to review.`);
process.exit(ph.length ? 1 : 0);
