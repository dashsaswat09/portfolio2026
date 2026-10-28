import React from 'react';
import { ArrowRight, Download, Linkedin, MapPin, Briefcase } from 'lucide-react';
import { profile } from '../content';
import { useLens } from '../contexts/LensContext';
import LensSelector from './LensSelector';
import photo from '../assets/images/profile.jpeg';

const Hero: React.FC = () => {
  const { lens } = useLens();
  const resumeUrl = lens.resumeUrl || profile.resumeUrl;

  return (
    <section id="top" className="relative pt-16 pb-16 sm:pt-24 sm:pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="status-pill">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                <Briefcase size={14} /> {profile.role} · {profile.orgShort}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <MapPin size={14} /> {profile.location}
              </span>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground">
              {profile.name}
            </h1>
            <p key={lens.id} className="lens-fade mt-4 text-xl sm:text-2xl gradient-text font-medium leading-snug">
              {lens.pitch}
            </p>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{profile.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#experience" className="btn-primary">
                See my work <ArrowRight size={16} />
              </a>
              {resumeUrl && (
                <a href={resumeUrl} className="btn-ghost" download>
                  <Download size={16} /> Résumé
                </a>
              )}
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>

          <img
            src={photo}
            alt={`Portrait of ${profile.name}`}
            width={176}
            height={176}
            className="h-32 w-32 sm:h-44 sm:w-44 shrink-0 rounded-full object-cover ring-4 ring-background shadow-xl"
          />
        </div>

        <div className="mt-12">
          <LensSelector />
        </div>

        <dl key={lens.id} className="lens-fade mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {lens.highlights.map((h) => (
            <div key={h.label} className="card p-5">
              <dt className="sr-only">{h.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-foreground">{h.stat}</dd>
              <dd className="mt-1 text-sm text-muted-foreground">{h.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
