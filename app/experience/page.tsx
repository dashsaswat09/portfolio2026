import type { Metadata } from "next";
import Link from "next/link";
import { experience, recognition, moreWork, profile } from "@/content";
import { Gate, OwnershipTag } from "@/components/content-bits";

export const metadata: Metadata = {
  title: "Experience",
  description: "Saswat Dash's experience: HPCL, Nexorea, InstaPrepsAI, Devlaunch, Habuild, Vecmocon and AirtCraft.",
};

const kindLabel = { "full-time": "Full-time", internship: "Internship", startup: "Startup", fellowship: "Fellowship" };

export default function ExperiencePage() {
  return (
    <div className="wrap page">
      <header className="page__head">
        <p className="eyebrow">Experience</p>
        <h1>Timeline</h1>
        <p className="section__lede">
          Tags show what I owned, what I contributed to, and what was independent work.
        </p>
      </header>

      <ol className="timeline">
        {experience.map((e) => (
          <li key={e.org} className="timeline__item">
            <Gate status={e.status}>
              <div className="timeline__when">
                <span className="timeline__period">{e.period}</span>
                <span className="muted">{kindLabel[e.kind]}</span>
              </div>
              <div className="timeline__what">
                <h2>
                  {e.org} <span className="timeline__role">{e.role}</span>
                </h2>
                <p>{e.line}</p>
                {e.details && (
                  <ul>
                    {e.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
                <p className="timeline__tags">
                  <OwnershipTag value={e.ownership} />
                  {e.tools?.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                  {e.slug && (
                    <Link href={`/work/${e.slug}`} className="textlink">
                      Case study →
                    </Link>
                  )}
                </p>
              </div>
            </Gate>
          </li>
        ))}
      </ol>

      <section className="section" aria-labelledby="rec">
        <h2 id="rec">Recognition</h2>
        <ul className="cards">
          {recognition.map((r) => (
            <li key={r.name}>
              <Gate status={r.status}>
                <strong>{r.name}</strong>
                <span>{r.detail}</span>
              </Gate>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="more">
        <h2 id="more">Other work</h2>
        <ul className="cards">
          {moreWork.map((w) => (
            <li key={w.name}>
              <Gate status={w.status}>
                <strong>{w.href ? <a href={w.href} target="_blank" rel="noopener">{w.name} ↗</a> : w.name}</strong>
                <span>{w.detail}</span>
              </Gate>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="edu">
        <h2 id="edu">Education</h2>
        <p>
          <strong>{profile.education.school}</strong> — {profile.education.degree}, {profile.education.year}
        </p>
      </section>
    </div>
  );
}
