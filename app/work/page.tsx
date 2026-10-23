import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/content";
import { Planet, OwnershipTag, Gate } from "@/components/content-bits";

export const metadata: Metadata = {
  title: "Work",
  description: "Product case studies: onboarding at InstaPrepsAI, 0→1 at Nexorea, retention at Habuild, and a grounded AI assistant.",
};

export default function WorkPage() {
  return (
    <div className="wrap page">
      <header className="page__head">
        <p className="eyebrow">Work</p>
        <h1>Case studies</h1>
        <p className="section__lede">What the problem was, what I decided, and what changed.</p>
      </header>
      <ol className="worklist">
        {caseStudies.map((c) => (
          <li key={c.slug}>
            <Link href={`/work/${c.slug}`} className="workrow">
              <Planet planet={c.planet} size={64} />
              <div className="workrow__body">
                <span className="workrow__company">
                  {c.company} · {c.period}
                </span>
                <span className="workrow__title">{c.title}</span>
                <span className="workrow__line">{c.oneLiner}</span>
                <span className="workrow__tags">
                  <OwnershipTag value={c.ownership} />
                  {c.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </span>
              </div>
              <div className="workrow__metric">
                {c.metrics[0] && (
                  <Gate status={c.metrics[0].status} inline>
                    <strong>{c.metrics[0].value}</strong>
                    <span>{c.metrics[0].label}</span>
                  </Gate>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
