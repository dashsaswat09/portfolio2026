import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, shouldShow } from "@/content";
import { ArtifactSlot, Gate, OwnershipTag, Planet } from "@/components/content-bits";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return { title: `${c.company}: ${c.title}`, description: c.oneLiner, openGraph: { title: c.title, description: c.oneLiner } };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const i = caseStudies.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const c = caseStudies[i];
  const next = caseStudies[(i + 1) % caseStudies.length];
  const visibleSections = c.sections.filter((s) => shouldShow(s.status));
  const visibleDecisions = c.decisions.filter((d) => shouldShow(d.status));

  return (
    <article className="case">
      <header className="case__hero">
        <div className="wrap case__hero-inner">
          <div>
            <Link className="textlink" href="/work">
              ← All case studies
            </Link>
            <p className="eyebrow">
              {c.company} · {c.domain}
            </p>
            <h1>{c.title}</h1>
            <p className="case__role">
              {c.role} · {c.period} · <OwnershipTag value={c.ownership} />
            </p>
          </div>
          <Planet planet={c.planet} size={180} className="case__planet" />
        </div>
      </header>

      <div className="wrap case__layout">
        <aside className="case__toc" aria-label="On this page">
          <p className="eyebrow">On this page</p>
          <ul>
            <li><a href="#summary">Summary</a></li>
            {visibleSections.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.heading}</a></li>
            ))}
            {visibleDecisions.length > 0 && <li><a href="#decisions">Key decisions</a></li>}
            <li><a href="#artifacts">Artifacts</a></li>
          </ul>
        </aside>

        <div className="case__body">
          <Gate status={c.summary.status}>
            <dl className="tldr" id="summary">
              <div><dt>Problem</dt><dd>{c.summary.problem}</dd></div>
              <div><dt>What I did</dt><dd>{c.summary.did}</dd></div>
              <div><dt>Outcome</dt><dd>{c.summary.outcome}</dd></div>
            </dl>
          </Gate>

          {c.metrics.length > 0 && (
            <ul className="metrics">
              {c.metrics.map((m) => (
                <li key={m.label}>
                  <Gate status={m.status}>
                    <span className="metrics__value">{m.value}</span>
                    <span className="metrics__label">{m.label}</span>
                    {m.context && <span className="metrics__context">{m.context}</span>}
                  </Gate>
                </li>
              ))}
            </ul>
          )}

          {c.sections.map((s) => (
            <Gate key={s.id} status={s.status}>
              <section id={s.id} className="prose">
                <h2>{s.heading}</h2>
                {s.body.map((p, k) => (
                  <p key={k}>{p}</p>
                ))}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            </Gate>
          ))}

          {visibleDecisions.length > 0 && (
            <section id="decisions" className="prose">
              <h2>Key decisions</h2>
              {c.decisions.map((d) => (
                <Gate key={d.title} status={d.status}>
                  <div className="decision">
                    <h3>{d.title}</h3>
                    <p className="muted">{d.context}</p>
                    {d.options && (
                      <ul className="decision__options">
                        {d.options.map((o) => (
                          <li key={o} className={d.choice.startsWith(o) ? "is-chosen" : ""}>{o}</li>
                        ))}
                      </ul>
                    )}
                    <p><strong>Chose:</strong> {d.choice}</p>
                    <p><strong>Why:</strong> {d.why}</p>
                  </div>
                </Gate>
              ))}
            </section>
          )}

          <section id="artifacts" className="prose">
            <h2>Artifacts</h2>
            <div className="artifacts">
              {c.artifacts.map((a) => (
                <ArtifactSlot key={a.id} artifact={a} slug={c.slug} />
              ))}
            </div>
          </section>

          <nav className="next-case" aria-label="Next case study">
            <span className="eyebrow">Next mission</span>
            <Link href={`/work/${next.slug}`}>
              <Planet planet={next.planet} size={40} /> {next.company}: {next.title} →
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
}
