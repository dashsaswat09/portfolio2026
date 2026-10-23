"use client";

// Adapted from Osmo's parallax-scrolling component (osmo.supply): same layered
// GSAP ScrollTrigger timeline, rebuilt for this site — original space artwork instead of
// hotlinked photos, scoped cleanup, and no animation when the visitor prefers reduced motion.

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/space/layer-far.webp" alt="" fetchPriority="high" />
      </div>
      <div className="parallax__layer parallax__layer--mid" data-parallax-layer="mid" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/space/layer-mid.webp" alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/space/moon.webp" alt="" className="parallax__moon" />
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
