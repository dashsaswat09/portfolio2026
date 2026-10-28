import React from 'react';
import { ExternalLink } from 'lucide-react';
import Section from './Section';
import ProofLinks from './ProofLinks';
import { roles, domainLabels, byLens } from '../content';
import { useLens } from '../contexts/LensContext';

const Experience: React.FC = () => {
  const { lens } = useLens();
  const shown = byLens(roles, lens.id);
  const isRelevant = (domains: string[]) => lens.id === 'all' || domains.includes(lens.id);

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I’ve worked"
      intro={
        lens.id === 'all'
          ? 'From procurement at a Maharatna PSU to product and analytics roles at startups, plus hands-on mechanical design.'
          : `Showing ${lens.label.toLowerCase()} roles first. Other experience follows in brief.`
      }
    >
      <ol className="relative space-y-6 border-l border-border pl-6 sm:pl-8">
        {shown.map((r) => {
          const relevant = isRelevant(r.domains);
          return (
            <li key={r.id} className="relative">
              <span
                className={`absolute -left-[31px] sm:-left-[39px] top-7 h-3 w-3 rounded-full border-2 border-background ${
                  r.current ? 'bg-emerald-500' : 'bg-muted-foreground/50'
                }`}
                aria-hidden
              />
              <article className={`card p-6 sm:p-7 ${r.current ? 'card-current' : ''} ${relevant ? '' : 'opacity-70'}`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {r.title}
                      {r.current && <span className="ml-2 align-middle now-badge">Now</span>}
                    </h3>
                    <p className="mt-0.5 font-medium text-brand">
                      {r.orgUrl ? (
                        <a href={r.orgUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                          {r.org} <ExternalLink size={12} />
                        </a>
                      ) : (
                        r.org
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {r.context}
                      {r.location && ` · ${r.location}`}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">{r.period}</p>
                </div>

                <p className="mt-4 text-foreground/90">{r.summary}</p>
                {relevant && (
                  <ul className="mt-3 space-y-2">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {r.domains.map((d) => (
                      <span key={d} className={`tag ${d === lens.id ? 'tag-active' : ''}`}>{domainLabels[d]}</span>
                    ))}
                  </div>
                  <ProofLinks proof={r.proof} />
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
};

export default Experience;
