import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, Download } from 'lucide-react';
import { profile } from '../content';
import { useLens } from '../contexts/LensContext';

// A small ring in the nav that tracks which section the visitor is on, filling and emptying as they
// scroll. Once every section has been seen, a one-time prompt offers the résumé for the current view.
const ExploreProgress: React.FC<{ ids: string[] }> = ({ ids }) => {
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const { lens } = useLens();
  const resumeUrl = lens.resumeUrl || profile.resumeUrl;

  // A section counts as seen once it covers the middle band of the viewport. Checked on scroll
  // (one rAF per frame) rather than with IntersectionObserver, which misses sections on fast jumps.
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const top = window.innerHeight * 0.4;
      const bottom = window.innerHeight * 0.6;
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      // Current section: the last one whose top has passed the middle of the viewport.
      let idx = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) idx = i;
      });
      setCurrent(atEnd ? ids.length - 1 : idx);
      setSeen((prev) => {
        let next = prev;
        ids.forEach((id, i) => {
          if (next.has(id)) return;
          const rect = document.getElementById(id)?.getBoundingClientRect();
          if (!rect) return;
          const inBand = rect.top < bottom && rect.bottom > top;
          const lastAtEnd = atEnd && i === ids.length - 1 && rect.top < window.innerHeight;
          if (inBand || lastAtEnd) next = new Set(next).add(id);
        });
        return next;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  const complete = ids.every((id) => seen.has(id));
  const position = current + 1;
  const r = 9;
  const circ = 2 * Math.PI * r;

  return (
    <>
      <div
        className="relative flex h-8 w-8 items-center justify-center"
        title={`Section ${position} of ${ids.length}`}
        aria-label={`Section ${position} of ${ids.length}`}
        role="img"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 -rotate-90">
          <circle cx="12" cy="12" r={r} className="fill-none stroke-border" strokeWidth="2.5" />
          <circle
            cx="12"
            cy="12"
            r={r}
            className="fill-none stroke-spark-ink transition-[stroke-dashoffset] duration-500"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - position / ids.length)}
          />
        </svg>
        <span className="absolute text-[9px] font-semibold text-foreground">{position}/{ids.length}</span>
      </div>

      {/* Portalled to <body>: the nav's backdrop-blur makes it the containing block for fixed
          children, which would pin the toast to the header instead of the viewport corner. */}
      {complete && !dismissed && createPortal(
        <div className="explore-toast" role="status">
          <p className="text-sm text-foreground">
            <strong>You’ve seen it all.</strong> Take the résumé for this view, or let’s talk.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {resumeUrl && (
              <a href={resumeUrl} download className="btn-primary !py-1.5 !px-3" onClick={() => setDismissed(true)}>
                <Download size={14} /> {lens.id === 'all' ? 'Résumé' : `${lens.label} résumé`}
              </a>
            )}
            <a href="#contact" className="btn-ghost !py-1.5 !px-3" onClick={() => setDismissed(true)}>
              Get in touch <ArrowRight size={14} />
            </a>
            <button onClick={() => setDismissed(true)} className="p-1.5 text-muted-foreground hover:text-foreground" aria-label="Dismiss">
              <X size={16} />
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default ExploreProgress;
