"use client";

// Adapted from Osmo's parallax-scrolling component (osmo.supply): same layered
// GSAP ScrollTrigger timeline, rebuilt for this site: a canvas starfield (twinkling + shooting
// stars, in the style of voxlet-ui's Space Box) behind a planet-horizon foreground, scoped
// cleanup, and no animation when the visitor prefers reduced motion.

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Starfield } from "@/components/scene/starfield";

type Layer = { depth: "far" | "mid" | "content" | "near"; yPercent: number };

const LAYERS: Layer[] = [
  { depth: "far", yPercent: 45 },
  { depth: "mid", yPercent: 32 },
  { depth: "content", yPercent: 22 },
  { depth: "near", yPercent: 6 },
];

export function ParallaxHero({ children, label }: { children: ReactNode; label: string }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      LAYERS.forEach((l, i) => {
        tl.to(`[data-parallax-layer="${l.depth}"]`, { yPercent: l.yPercent, ease: "none" }, i === 0 ? 0 : "<");
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="parallax" aria-label={label}>
      <div className="parallax__layer parallax__layer--far" data-parallax-layer="far" aria-hidden="true">
        <Starfield className="parallax__stars" density={1.4} minSize={0.35} maxSize={1.2} shooting />
      </div>
      <div className="parallax__layer parallax__layer--mid" data-parallax-layer="mid" aria-hidden="true">
        <Starfield className="parallax__stars" density={0.12} minSize={1} maxSize={2.1} />
      </div>
      <div className="parallax__content" data-parallax-layer="content">
        {children}
      </div>
      <div className="parallax__layer parallax__layer--near" data-parallax-layer="near" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/space/layer-near.webp" alt="" />
      </div>
      <div className="parallax__fade" data-parallax-fade aria-hidden="true" />
    </section>
  );
}
