import Link from "next/link";
import { profile, caseStudies, experience } from "@/content";
import { ParallaxHero } from "@/components/ui/parallax-scrolling";
import { ProbeStage } from "@/components/scene/probe-stage";
import { Gate, Planet, OwnershipTag } from "@/components/content-bits";
import { AskButton, AskChips } from "@/components/home-ask";

export default function Home() {
  const headlineMetrics = caseStudies.flatMap((c) => c.metrics.slice(0, 1).map((m) => ({ ...m, company: c.company, slug: c.slug })));

  return (
    <>
      <ParallaxHero label="Introduction">
        <div className="wrap hero">
          <div className="hero__text">
            <p className="eyebrow">Product Manager · APM</p>
            <h1 className="hero__name">{profile.name}</h1>
            <p className="hero__headline">{profile.headline}</p>
            <p className="hero__intro">{profile.intro}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary" href="/work">
                See case studies
              </Link>
              <AskButton className="btn">Ask my AI guide</AskButton>
            </div>
            <p className="hero__links">
              <a href={profile.resume.href} target="_blank" rel="noopener">Resume</a>
              <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>
          <div className="hero__probe">
            <ProbeStage />
          </div>
        </div>
      </ParallaxHero>

      <section className="section wrap" aria-labelledby="impact">
        <h2 id="impact" className="sr-only">Impact at a glance</h2>
        <ul className="impact">
          {headlineMetrics.map((m) => (
            <li key={m.slug}>
              <Gate status={m.status}>
                <Link href={`/work/${m.slug}`} className="impact__item">
                  <span className="impact__value">{m.value}</span>
                  <span className="impact__label">{m.label}</span>
                  <span className="impact__org">{m.company}</span>
                </Link>
              </Gate>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap" aria-labelledby="work-title">
        <div className="section__head">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">Four missions, one way of working</h2>
          <p className="section__lede">Each case study covers the problem, what I decided and why, and what changed.</p>
        </div>
        <ol className="orbit">
          {caseStudies.map((c, i) => (
            <li key={c.slug} className="mission">
              <Link href={`/work/${c.slug}`} className="mission__link">
                <Planet planet={c.planet} size={84} className="mission__planet" />
                <span className="mission__index">Mission {String(i + 1).padStart(2, "0")}</span>
                <span className="mission__company">{c.company}</span>
                <span className="mission__title">{c.title}</span>
                <span className="mission__line">{c.oneLiner}</span>
                <span className="mission__meta">
                  <OwnershipTag value={c.ownership} /> {c.domain}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap split" aria-labelledby="exp-title">
        <div className="section__head">
          <p className="eyebrow">Experience</p>
          <h2 id="exp-title">Where I've worked</h2>
          <Link href="/experience" className="textlink">
            Full timeline →
          </Link>
        </div>
        <ul className="timeline timeline--compact">
          {experience.slice(0, 6).map((e) => (
            <li key={e.org}>
              <span className="timeline__period">{e.period}</span>
              <span className="timeline__org">{e.org}</span>
              <span className="timeline__role">{e.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap ask-band" aria-labelledby="ask-title-home">
        <div>
          <p className="eyebrow">AI guide</p>
          <h2 id="ask-title-home">Short on time? Ask a question.</h2>
          <p className="section__lede">
            It answers only from what's on this site, and says so when it doesn't know. How it was built is itself a{" "}
            <Link href="/work/portfolio-assistant">case study</Link>.
          </p>
        </div>
        <AskChips ids={["who", "best-work", "data", "contact"]} />
      </section>

      <section className="section wrap cta" aria-labelledby="cta-title">
        <h2 id="cta-title">Hiring for a product role?</h2>
        <p className="section__lede">{profile.looking}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a className="btn" href={profile.resume.href} target="_blank" rel="noopener">
            Resume
          </a>
        </div>
      </section>
    </>
  );
}
