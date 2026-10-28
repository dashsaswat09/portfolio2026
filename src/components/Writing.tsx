import React from 'react';
import { ExternalLink, FileText } from 'lucide-react';
import Section from './Section';
import { visibleWriting } from '../content';

const Writing: React.FC = () => {
  if (!visibleWriting.length) return null;

  return (
    <Section id="writing" eyebrow="Writing" title="PRDs & writing" intro="Requirement docs and essays from the products above.">
      <ul className="grid gap-4 md:grid-cols-2">
        {visibleWriting.map((w) => {
          const body = (
            <>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <FileText size={14} /> {w.type}
                {w.date && <span>· {w.date}</span>}
              </div>
              <h3 className="mt-2 font-semibold text-foreground">{w.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.summary}</p>
            </>
          );
          return (
            <li key={w.id}>
              {w.url ? (
                <a href={w.url} target="_blank" rel="noopener noreferrer" className="card card-link block p-5 group">
                  {body}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                    Read <ExternalLink size={12} />
                  </span>
                </a>
              ) : (
                <div className="card block p-5 border-dashed opacity-70">
                  {body}
                  <span className="pending-chip mt-3">proof pending — add url in content.ts</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default Writing;
