import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Section from './Section';
import ProofLinks from './ProofLinks';
import { work, domainLabels, byLens } from '../content';
import { useLens } from '../contexts/LensContext';

const Work: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const { lens } = useLens();
  const lensId = lens.id;
  const ordered = byLens(work, lensId);
  // With a lens picked, the projects matching it become the featured set.
  const featured = lensId === 'all' ? ordered.filter((w) => w.featured) : ordered.filter((w) => w.domains.includes(lensId));
  const shown = showAll ? ordered : featured;

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Projects & case studies"
      intro="Each one starts with a real problem and ends with a number I can explain."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {shown.map((w) => (
          <article key={w.id} className="card flex flex-col p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{w.context}</p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">{w.period}</p>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-foreground">{w.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.summary}</p>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
              {w.impact.map((i) => (
                <div key={i.label}>
                  <dt className="sr-only">{i.label}</dt>
                  <dd className="text-xl font-semibold tracking-tight text-foreground">{i.stat}</dd>
                  <dd className="text-xs leading-snug text-muted-foreground">{i.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {w.domains.map((d) => (
                  <span key={d} className={`tag ${d === lens.id ? 'tag-active' : ''}`}>{domainLabels[d]}</span>
                ))}
              </div>
              <ProofLinks proof={w.proof} />
            </div>
          </article>
        ))}
      </div>

      {ordered.length > featured.length && (
        <div className="mt-8 text-center">
          <button onClick={() => setShowAll((s) => !s)} className="btn-ghost" aria-expanded={showAll}>
            {showAll ? 'Show fewer' : `Show all ${work.length} projects`}
            <ChevronDown size={16} className={`transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </Section>
  );
};

export default Work;
