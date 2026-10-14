import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies } from "../../../content";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  return { title: c ? `${c.title} — Saswat Dash` : "Saswat Dash" };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = caseStudies.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const c = caseStudies[i];
  const next = caseStudies[(i + 1) % caseStudies.length];

  return (
    <div className="wrap">
      <header className="topbar">
        <Link href="/" className="mark">Saswat Dash</Link>
        <nav aria-label="Sections">
          <Link href="/#work">Work</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
      <article className="case">
        <Link className="back" href="/#work">Back to all work</Link>
        <p className="case-meta">
          {c.company}, {c.role}. {c.period}.
        </p>
        <h1>{c.title}</h1>
        <dl className="tldr" aria-label="Summary">
          <dt>Problem</dt>
          <dd>{c.summary.problem}</dd>
          <dt>What I did</dt>
          <dd>{c.summary.did}</dd>
          <dt>Outcome</dt>
          <dd>{c.summary.outcome}</dd>
        </dl>
        {c.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body.map((p, k) => (
              <p key={k}>{p}</p>
            ))}
          </section>
        ))}
        <div className="next-case">
          <span>Next case study</span>
          <Link href={`/work/${next.slug}`}>{next.title}</Link>
        </div>
      </article>
    </div>
  );
}
