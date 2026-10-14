import Link from "next/link";
import { profile, caseStudies, experience, recognition, moreWork, education } from "../content";

function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <section className="sheet" aria-label="Introduction">
      <svg className="sheet-frame" aria-hidden="true">
        <rect className="outer" x="0" y="0" width="100%" height="100%" />
      </svg>
      <div className="inner-frame" aria-hidden="true" />
      <span className="zone" style={{ top: 14, left: "25%" }} aria-hidden="true">1</span>
      <span className="zone" style={{ top: 14, left: "50%" }} aria-hidden="true">2</span>
      <span className="zone" style={{ top: 14, left: "75%" }} aria-hidden="true">3</span>
      <span className="zone" style={{ left: 14, top: "33%" }} aria-hidden="true">A</span>
      <span className="zone" style={{ left: 14, top: "66%" }} aria-hidden="true">B</span>
      <div className="sheet-content">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <div className="wrap">
        <header className="topbar">
          <Link href="/" className="mark">Saswat Dash</Link>
          <nav aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#writing">Writing</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <Sheet>
          <div className="hero-grid">
            <div>
              <h1 className="hero-name">{profile.name}</h1>
              <p className="hero-headline">{profile.headline}</p>
              <p className="hero-looking">{profile.looking}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#work">See my work</a>
                <a className="btn" href={`mailto:${profile.email}`}>Email me</a>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="portrait" src="/saswat.jpg" alt="Saswat Dash" width={608} height={640} />
          </div>
          <dl className="title-block" aria-label="At a glance">
            {profile.titleBlock.map((row) => (
              <div key={row.k} style={{ display: "contents" }}>
                <dt>{row.k}</dt>
                <dd className={row.k === "Revision" ? "rev" : undefined}>{row.v}</dd>
              </div>
            ))}
          </dl>
        </Sheet>

        <section className="section" id="work">
          <div className="section-head">
            <h2>Selected work</h2>
            <p className="section-note">Four projects, each with the problem, what I did and what changed.</p>
          </div>
          <ul className="work-list">
            {caseStudies.map((c) => (
              <li className="work-item" key={c.slug}>
                <Link className="work-link" href={`/work/${c.slug}`}>
                  <div className="work-meta">
                    <strong>{c.company}</strong>
                    {c.kind}
                  </div>
                  <div>
                    <h3 className="work-title">{c.title}</h3>
                    <p className="work-result"><span>{c.result}</span></p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="experience">
          <div className="section-head">
            <h2>Experience</h2>
          </div>
          <div className="ledger">
            {experience.map((e) => (
              <div className="ledger-row" key={e.org}>
                <div className="ledger-org">
                  {e.slug ? <Link href={`/work/${e.slug}`}>{e.org}</Link> : e.org}
                </div>
                <div>
                  <p className="ledger-role">{e.role}</p>
                  <p className="ledger-line">{e.line}</p>
                </div>
                <div className="ledger-period">{e.period}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Recognition</h2>
          </div>
          <ul className="plain-list">
            {recognition.map((r) => (
              <li key={r.name}>
                <span className="name">{r.name}</span>
                <span className="detail">{r.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>More work</h2>
          </div>
          <ul className="plain-list">
            {moreWork.map((m) => (
              <li key={m.name}>
                <span className="name">{m.name}</span>
                <span className="detail">{m.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="writing">
          <div className="section-head">
            <h2>Writing</h2>
          </div>
          <ul className="plain-list">
            <li>
              <span className="name">{profile.channel.name}</span>
              <span className="detail">
                {profile.channel.line}{" "}
                <a href={profile.channel.instagram}>Instagram</a> and{" "}
                <a href={profile.channel.youtube}>YouTube</a>, {profile.channel.handle}.
              </span>
            </li>
            <li>
              <span className="name">Education</span>
              <span className="detail">
                {education.school}, {education.year}. {education.degree}.
              </span>
            </li>
          </ul>
        </section>

        <section className="section" id="contact">
          <div className="section-head">
            <h2>Contact</h2>
            <div>
              <p className="contact-line">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <div className="links">
                {profile.linkedin && <a href={profile.linkedin}>LinkedIn</a>}
                <a href={profile.github}>GitHub</a>
                <a href={profile.channel.instagram}>{profile.channel.handle}</a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="wrap footer">© {new Date().getFullYear()} Saswat Dash</footer>
    </>
  );
}
