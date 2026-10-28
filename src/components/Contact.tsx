import React from 'react';
import { Mail, Linkedin, Github, Phone, MapPin, Download } from 'lucide-react';
import Section from './Section';
import { profile } from '../content';
import { useLens } from '../contexts/LensContext';

const links = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/saswatdash2003', href: profile.linkedin },
  { icon: Github, label: 'GitHub', value: 'saswat-projects-hub', href: profile.github },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
];

const Contact: React.FC = () => {
  // Same tailored résumé as the hero for the selected view.
  const { lens } = useLens();
  const resumeUrl = lens.resumeUrl || profile.resumeUrl;

  return (
  <Section id="contact" eyebrow="Contact" title="Let’s talk">
    <div className="card p-6 sm:p-10">
      <p className="max-w-xl text-lg text-muted-foreground">
        Happy to chat about procurement and operations, product, analytics — or anything where they overlap.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="btn-primary">
          <Mail size={16} /> {profile.email}
        </a>
        {resumeUrl && (
          <a href={resumeUrl} className="btn-ghost" download>
            <Download size={16} /> Download résumé
          </a>
        )}
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {links.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl p-3 -m-3 hover:bg-muted transition-colors"
            >
              <Icon size={20} className="text-brand shrink-0" />
              <span>
                <span className="block text-xs text-muted-foreground">{label}</span>
                <span className="block text-foreground break-all">{value}</span>
              </span>
            </a>
          </li>
        ))}
        <li className="flex items-center gap-4 p-3 -m-3">
          <MapPin size={20} className="text-brand shrink-0" />
          <span>
            <span className="block text-xs text-muted-foreground">Based in</span>
            <span className="block text-foreground">{profile.location}</span>
          </span>
        </li>
      </ul>
    </div>
  </Section>
);
};

export default Contact;
