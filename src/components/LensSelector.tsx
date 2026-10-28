import React, { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { useLens } from '../contexts/LensContext';
import { lenses } from '../content';

const LensSelector: React.FC = () => {
  const { lens, setLens } = useLens();
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked — the URL bar already holds the shareable link
    }
  };

  return (
    <div className="lens-panel">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p id="lens-label" className="text-sm font-medium text-foreground">I’m hiring for…</p>
        <button onClick={copyLink} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          {copied ? <Check size={12} /> : <Link2 size={12} />}
          {copied ? 'Link copied' : 'Copy link to this view'}
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-labelledby="lens-label">
        {lenses.map((l) => (
          <button
            key={l.id}
            role="radio"
            aria-checked={lens.id === l.id}
            onClick={() => setLens(l.id)}
            className={`chip ${lens.id === l.id ? 'chip-active' : ''}`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LensSelector;
