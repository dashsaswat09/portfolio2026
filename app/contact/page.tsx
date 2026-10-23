import type { Metadata } from "next";
import { profile } from "@/content";
import { AskButton } from "@/components/home-ask";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Saswat Dash, connect on LinkedIn, or download his resume.",
};

const rows = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, note: "Fastest way to reach me." },
  { label: "LinkedIn", value: "linkedin.com/in/saswatdash2003", href: profile.linkedin, note: "Happy to connect." },
  { label: "Resume", value: "Download PDF", href: profile.resume.href, note: "One page." },
  { label: "GitHub", value: "github.com/dashsaswat09", href: profile.github, note: "Including this site's code." },
];

export default function ContactPage() {
  return (
    <div className="wrap page">
      <header className="page__head">
        <p className="eyebrow">Contact</p>
        <h1>Let's talk</h1>
        <p className="section__lede">{profile.looking}</p>
        <div className="hero__actions">
          <AskButton className="btn btn--primary" start="schedule">
            Book an interview or intro call
          </AskButton>
        </div>
      </header>
      <ul className="contact">
        {rows.map((r) => (
          <li key={r.label}>
            <a href={r.href} target={r.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener" className="contact__row">
              <span className="contact__label">{r.label}</span>
              <span className="contact__value">{r.value}</span>
              <span className="contact__note">{r.note}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
