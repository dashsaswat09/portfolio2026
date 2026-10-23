"use client";

import { useEffect, useRef } from "react";

// Black sky with twinkling stars and occasional shooting stars, drawn on a canvas.
// Look inspired by voxlet-ui's "Space Box"; this is an original implementation.

type Props = {
  /** Stars per 10,000 px² of canvas. */
  density?: number;
  minSize?: number;
  maxSize?: number;
  shooting?: boolean;
  className?: string;
};

type Star = { x: number; y: number; r: number; phase: number; speed: number; base: number; tint: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number; len: number };

export function Starfield({ density = 1.1, minSize = 0.4, maxSize = 1.6, shooting = false, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1;
    let stars: Star[] = [];
    const meteors: Meteor[] = [];
    let raf = 0;
    let running = true;
    let nextMeteor = 0.6;
    let last = performance.now();
    let t = 0;

    const seed = () => {
      const count = Math.round(((w * h) / 10_000) * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: minSize + Math.pow(Math.random(), 2.4) * (maxSize - minSize),
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 2.2,
        base: 0.25 + Math.random() * 0.45,
        tint: Math.random(),
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw(0);
    };

    const spawn = () => {
      const fromTop = Math.random() < 0.6;
      const speed = 520 + Math.random() * 520; // px/s
      const angle = (20 + Math.random() * 25) * (Math.PI / 180);
      meteors.push({
        x: fromTop ? Math.random() * w * 0.8 : -40,
        y: fromTop ? -40 : Math.random() * h * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 1 + Math.random() * 1.4,
        len: 90 + Math.random() * 110,
      });
    };

    function draw(dt: number) {
      ctx!.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = reduced ? 1 : 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
        const a = Math.min(1, s.base + (1 - s.base) * tw * tw);
        const c = s.tint > 0.85 ? "255,228,200" : s.tint > 0.6 ? "200,225,255" : "255,255,255";
        ctx!.fillStyle = `rgba(${c},${a})`;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r * (0.85 + 0.25 * tw), 0, Math.PI * 2);
        ctx!.fill();
        if (s.r > 1.1) {
          ctx!.fillStyle = `rgba(${c},${a * 0.12})`;
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      if (!shooting || reduced) return;
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life += dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        const fade = Math.min(1, m.life * 4) * Math.max(0, 1 - m.life / m.max);
        const mag = Math.hypot(m.vx, m.vy);
        const tx = m.x - (m.vx / mag) * m.len;
        const ty = m.y - (m.vy / mag) * m.len;
        const g = ctx!.createLinearGradient(m.x, m.y, tx, ty);
        g.addColorStop(0, `rgba(235,250,255,${0.95 * fade})`);
        g.addColorStop(0.3, `rgba(127,227,247,${0.45 * fade})`);
        g.addColorStop(1, "rgba(127,227,247,0)");
        ctx!.strokeStyle = g;
        ctx!.lineWidth = 1.6;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(m.x, m.y);
        ctx!.lineTo(tx, ty);
        ctx!.stroke();
        ctx!.fillStyle = `rgba(255,255,255,${fade})`;
        ctx!.beginPath();
        ctx!.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
        if (m.life > m.max || m.x > w + 200 || m.y > h + 200) meteors.splice(i, 1);
      }
    }

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      if (shooting) {
        nextMeteor -= dt;
        if (nextMeteor <= 0) {
          spawn();
          nextMeteor = 0.8 + Math.random() * 2.2;
        }
      }
      draw(dt);
      if (running) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduced || running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    if (reduced) running = false;
    else raf = requestAnimationFrame(loop);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density, minSize, maxSize, shooting]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
