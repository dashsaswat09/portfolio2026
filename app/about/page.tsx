import type { Metadata } from "next";
import { about, profile } from "@/content";
import { Gate } from "@/components/content-bits";

export const metadata: Metadata = {
  title: "About",
  description: "Saswat Dash — mechanical engineer from IIT Kharagpur moving into product management.",
};

export default function AboutPage() {
  return (
    <div className="wrap page about">
      <header className="page__head about__head">
        <div>
          <p className="eyebrow">About</p>
          <h1>From engineering to product</h1>
          <p className="section__lede">{profile.headline}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="about__photo" src={profile.photo} alt={profile.name} width={304} height={320} />
      </header>
      <div className="about__body">
        {about.sections.map((s) => (
          <Gate key={s.id} status={s.status}>
            <section className="prose">
              <h2>{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          </Gate>
        ))}
        <section className="prose">
          <h2>{profile.channel.name}</h2>
          <p>{profile.channel.line}</p>
          <p className="links-row">
            <a href={profile.channel.instagram} target="_blank" rel="noopener">Instagram ↗</a>
            <a href={profile.channel.youtube} target="_blank" rel="noopener">YouTube ↗</a>
          </p>
        </section>
      </div>
    </div>
  );
}
