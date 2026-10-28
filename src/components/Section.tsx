import React from 'react';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, eyebrow, title, intro, children }) => (
  <section id={id} className="scroll-mt-24 py-20 sm:py-24">
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl text-muted-foreground">{intro}</p>}
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

export default Section;
