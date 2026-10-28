import React from 'react';
import { GraduationCap, Users } from 'lucide-react';
import Section from './Section';
import { education, leadership, skills } from '../content';
import { useLens } from '../contexts/LensContext';

const About: React.FC = () => {
  const { lens } = useLens();
  const orderedSkills = lens.id === 'all' ? skills : [...skills].sort((a, b) => Number(b.domain === lens.id) - Number(a.domain === lens.id));

  return (
  <Section id="about" eyebrow="Background" title="Education, leadership & skills">
    <div className="grid gap-5 lg:grid-cols-5">
      <article className="card p-6 lg:col-span-2">
        <GraduationCap className="text-brand" size={22} />
        <h3 className="mt-3 font-semibold text-foreground">{education.school}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{education.degree}</p>
        <p className="mt-1 text-sm text-muted-foreground">{education.detail}</p>
        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-foreground">{education.cgpa}</span>
          <span className="text-sm text-muted-foreground">CGPA</span>
        </div>
        <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
          {education.extras.map((e) => <li key={e}>{e}</li>)}
        </ul>
      </article>

      <article className="card p-6 lg:col-span-3">
        <Users className="text-brand" size={22} />
        <h3 className="mt-3 font-semibold text-foreground">Leadership at IIT Kharagpur</h3>
        <ul className="mt-4 space-y-5">
          {leadership.map((l) => (
            <li key={l.title}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                <p className="font-medium text-foreground">
                  {l.title} <span className="font-normal text-muted-foreground">· {l.org}</span>
                </p>
                <p className="text-xs text-muted-foreground whitespace-nowrap sm:mt-1">{l.period}</p>
              </div>
              {l.points.map((p) => (
                <p key={p} className="mt-1 text-sm text-muted-foreground">{p}</p>
              ))}
            </li>
          ))}
        </ul>
      </article>
    </div>

    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      {orderedSkills.map((s) => (
        <article key={s.group} className={`card p-6 ${s.domain === lens.id ? 'card-current' : ''}`}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.group}</h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {s.items.map((i) => <li key={i} className="tag">{i}</li>)}
          </ul>
        </article>
      ))}
    </div>
  </Section>
  );
};

export default About;
