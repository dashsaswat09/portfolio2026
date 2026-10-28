import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import Section from './Section';

type Bid = { vendor: string; price: string; facts: string[] };
type Round = { brief: string; requirement: string; bids: Bid[]; answer: number; why: string };

// Simplified illustrations of general public-sector tendering principles — not real HPCL data.
const rounds: Round[] = [
  {
    brief: 'Supply of 200 industrial safety valves',
    requirement: 'Must hold the specified API certification. Delivery within 8 weeks.',
    bids: [
      { vendor: 'Vendor A', price: '₹18.4 L', facts: ['API certificate not submitted', 'Delivery: 6 weeks'] },
      { vendor: 'Vendor B', price: '₹19.9 L', facts: ['All documents compliant', 'Delivery: 7 weeks'] },
      { vendor: 'Vendor C', price: '₹21.2 L', facts: ['All documents compliant', 'Delivery: 5 weeks'] },
    ],
    answer: 1,
    why: 'Price is only compared after technical qualification. Vendor A is cheapest but fails the technical bid, so B is the lowest qualified bidder (L1).',
  },
  {
    brief: 'Annual rate contract for PPE kits',
    requirement: 'Bid security (EMD) is mandatory for all bidders.',
    bids: [
      { vendor: 'Vendor A', price: '₹6.1 L', facts: ['Technically compliant', 'EMD submitted'] },
      { vendor: 'Vendor B', price: '₹5.6 L', facts: ['Technically compliant', 'EMD not submitted'] },
      { vendor: 'Vendor C', price: '₹5.9 L', facts: ['Technically compliant', 'EMD submitted'] },
    ],
    answer: 2,
    why: 'A missing mandatory EMD makes Vendor B’s bid non-responsive, however good the price. C is the lowest responsive bid.',
  },
  {
    brief: 'Pump spares for a depot',
    requirement: 'Required on site within 4 weeks.',
    bids: [
      { vendor: 'Vendor A', price: '₹3.2 L', facts: ['Technically compliant', 'Delivery: 9 weeks'] },
      { vendor: 'Vendor B', price: '₹3.6 L', facts: ['Technically compliant', 'Delivery: 2 weeks — fastest'] },
      { vendor: 'Vendor C', price: '₹3.5 L', facts: ['Technically compliant', 'Delivery: 4 weeks'] },
    ],
    answer: 2,
    why: 'A misses the delivery requirement. B is faster, but beating the requirement isn’t worth paying more for public money — C meets it at the lowest price.',
  },
];

const TenderGame: React.FC = () => {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const done = round >= rounds.length;
  const r = rounds[Math.min(round, rounds.length - 1)];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === r.answer) setCorrect((c) => c + 1);
  };
  const next = () => {
    setPicked(null);
    setRound((n) => n + 1);
  };
  const restart = () => {
    setRound(0);
    setPicked(null);
    setCorrect(0);
  };

  return (
    <Section
      id="play"
      eyebrow="Try my job"
      title="Win the tender"
      intro="A 60-second taste of what I do at HPCL: three tenders, three bids each. Pick the vendor who should win the order."
    >
      <div className="card p-6 sm:p-8">
        {done ? (
          <div className="text-center py-6">
            <p className="text-4xl font-semibold text-foreground">{correct} / {rounds.length}</p>
            <p className="mt-2 text-muted-foreground">
              {correct === rounds.length
                ? 'Spot on — you’d do well on an evaluation committee.'
                : 'The cheapest bid isn’t always the winning one. That’s most of the job.'}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={restart} className="btn-ghost"><RotateCcw size={16} /> Play again</button>
              <a href="#contact" className="btn-primary">Talk to me about it <ArrowRight size={16} /></a>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Tender {round + 1} of {rounds.length}
              </p>
              <div className="flex gap-1" aria-hidden>
                {rounds.map((_, i) => (
                  <span key={i} className={`h-1.5 w-8 rounded-full ${i <= round ? 'bg-brand' : 'bg-muted'}`} />
                ))}
              </div>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-foreground">{r.brief}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{r.requirement}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3" role="group" aria-label="Bids">
              {r.bids.map((b, i) => {
                const state =
                  picked === null ? '' : i === r.answer ? 'bid-correct' : i === picked ? 'bid-wrong' : 'opacity-60';
                return (
                  <button
                    key={b.vendor}
                    onClick={() => pick(i)}
                    disabled={picked !== null}
                    className={`bid-card ${state}`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{b.vendor}</span>
                      {picked !== null && i === r.answer && <CheckCircle2 size={18} className="text-emerald-500" />}
                      {picked === i && i !== r.answer && <XCircle size={18} className="text-red-500" />}
                    </span>
                    <span className="mt-2 block text-2xl font-semibold text-foreground">{b.price}</span>
                    <span className="mt-2 block space-y-1">
                      {b.facts.map((f) => (
                        <span key={f} className="block text-xs text-muted-foreground">{f}</span>
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>

            <div aria-live="polite">
              {picked !== null && (
                <div className="mt-6 flex flex-col gap-4 rounded-xl bg-muted/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-foreground">
                    <strong>{picked === r.answer ? 'Correct. ' : 'Not quite. '}</strong>
                    {r.why}
                  </p>
                  <button onClick={next} className="btn-primary shrink-0">
                    {round + 1 < rounds.length ? 'Next tender' : 'See result'} <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Simplified illustration of general public-sector tendering principles — not real HPCL tenders or data.
            </p>
          </>
        )}
      </div>
    </Section>
  );
};

export default TenderGame;
