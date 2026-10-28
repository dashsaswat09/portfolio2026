import React from 'react';
import { ExternalLink, FileText, Presentation, Code2, Globe, Figma } from 'lucide-react';
import type { Proof } from '../content';

const icons: Record<Proof['kind'], React.ElementType> = {
  pdf: FileText,
  doc: FileText,
  slides: Presentation,
  code: Code2,
  site: Globe,
  figma: Figma,
};

// Links without a url are hidden on the live site and shown as "pending" in dev,
// so missing proof of work is visible while editing but never ships as a dead "#".
const ProofLinks: React.FC<{ proof?: Proof[] }> = ({ proof }) => {
  if (!proof?.length) return null;
  const visible = proof.filter((p) => p.url || import.meta.env.DEV);
  if (!visible.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((p) => {
        const Icon = icons[p.kind];
        if (!p.url) {
          return (
            <span key={p.label} className="pending-chip" title="Add proof.url in src/content.ts">
              <Icon size={14} /> {p.label} · proof pending
            </span>
          );
        }
        return (
          <a key={p.label} href={p.url} target="_blank" rel="noopener noreferrer" className="proof-link">
            <Icon size={14} /> {p.label} <ExternalLink size={12} className="opacity-60" />
          </a>
        );
      })}
    </div>
  );
};

export default ProofLinks;
