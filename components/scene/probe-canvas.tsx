"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { onProbeMood, type ProbeMood } from "./probe-state";

// A companion probe built entirely in code: no model files to download.
// Front of the probe faces +z (the camera).

const damp = THREE.MathUtils.damp;

function useWindowPointer() {
  const p = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: PointerEvent) => {
      p.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", h, { passive: true });
    return () => window.removeEventListener("pointermove", h);
  }, []);
  return p;
}

function radialTexture(inner: string, outer: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, inner);
  grd.addColorStop(1, outer);
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function flameTexture() {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createLinearGradient(0, 0, 0, 128);
  grd.addColorStop(0, "rgba(140,240,255,0)");
  grd.addColorStop(0.6, "rgba(110,215,255,0.16)");
  grd.addColorStop(1, "rgba(225,250,255,0.7)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 4, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Probe({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const eyeMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: "#8ff4ff", toneMapped: false }), []);
  const eyeMat = useRef<THREE.MeshBasicMaterial>(eyeMaterial);
  const halo = useRef<THREE.SpriteMaterial>(null);
  const tip = useRef<THREE.MeshBasicMaterial>(null);
  const flame = useRef<THREE.Mesh>(null);
  const pointer = useWindowPointer();
  const mood = useRef<ProbeMood>("idle");
  const blink = useRef({ next: 2.5, t: -1 });
  const born = useRef<number | null>(null);

  useEffect(() => onProbeMood((m) => (mood.current = m)), []);

  const tex = useMemo(
    () => ({
      halo: radialTexture("rgba(140,240,255,0.9)", "rgba(140,240,255,0)"),
      flame: flameTexture(),
    }),
    [],
  );

  // Visor: a spherical cap on the front of the shell.
  const visorGeo = useMemo(
    () => new THREE.SphereGeometry(1.006, 96, 64, Math.PI / 2 - 0.82, 1.64, Math.PI / 2 - 0.5, 0.92),
    [],
  );
  const visorRimGeo = useMemo(
    () => new THREE.SphereGeometry(1.004, 96, 64, Math.PI / 2 - 0.88, 1.76, Math.PI / 2 - 0.56, 1.04),
    [],
  );

  useFrame((state, dt) => {
    const t = state.clock.getElapsedTime();
    if (born.current === null) born.current = t;
    const age = t - born.current;
    const m = mood.current;

    if (root.current) {
      root.current.position.y = reduced ? 0 : Math.sin(t * 1.15) * 0.07;
      root.current.rotation.z = reduced ? 0 : Math.sin(t * 0.7) * 0.025;
    }

    if (head.current) {
      // Look toward the cursor, smoothly.
      const ty = reduced ? 0.25 : pointer.current.x * 0.55 + 0.12;
      const tx = reduced ? 0 : -pointer.current.y * 0.3;
      // Welcome gesture: a friendly tilt in the first two seconds.
      const greet = !reduced && age < 2.4 ? Math.sin(age * 5.2) * Math.exp(-age * 1.3) * 0.32 : 0;
      head.current.rotation.y = damp(head.current.rotation.y, ty, 4, dt);
      head.current.rotation.x = damp(head.current.rotation.x, tx + (m === "thinking" ? -0.12 : 0), 4, dt);
      head.current.rotation.z = damp(head.current.rotation.z, greet + (m === "thinking" ? 0.12 : 0), 6, dt);
    }

    if (ring.current) ring.current.rotation.y += dt * (m === "thinking" ? 2.4 : 0.35) * (reduced ? 0 : 1);

    // Blink every few seconds.
    if (eyes.current) {
      const b = blink.current;
      if (!reduced && t > b.next && b.t < 0) b.t = t;
      let sy = 1;
      if (b.t >= 0) {
        const k = (t - b.t) / 0.16;
        sy = k < 1 ? Math.max(0.08, Math.abs(1 - 2 * k)) : 1;
        if (k >= 1) {
          b.t = -1;
          b.next = t + 2.4 + Math.random() * 3.2;
        }
      }
      const pulse = m === "thinking" ? 0.75 + 0.25 * Math.sin(t * 9) : m === "speaking" ? 0.85 + 0.15 * Math.sin(t * 22) : 1;
      eyes.current.scale.y = damp(eyes.current.scale.y, sy * (m === "thinking" ? 0.55 : 1), 30, dt);
      if (eyeMat.current) eyeMat.current.color.setRGB(0.55 * pulse * 1.6, 0.95 * pulse * 1.6, 1.0 * pulse * 1.6);
      if (halo.current) halo.current.opacity = 0.55 * pulse;
    }

    if (tip.current) {
      const on = m === "thinking" ? Math.sin(t * 12) > 0 : Math.sin(t * 2.2) > 0.6;
      tip.current.color.set(on ? "#d9c8ff" : "#6a4fc4");
    }

    if (flame.current) {
      const f = reduced ? 1 : 0.85 + 0.15 * Math.sin(t * 31) * Math.sin(t * 17);
      flame.current.scale.set(1, f, 1);
    }
  });

  const shell = (
    <meshPhysicalMaterial color="#e8ecf4" roughness={0.3} metalness={0.05} clearcoat={1} clearcoatRoughness={0.1} sheen={0.2} />
  );

  return (
    <group ref={root}>
      <group ref={head}>
        {/* Shell */}
        <mesh castShadow scale={[1, 0.96, 1]}>
          <sphereGeometry args={[1, 128, 96]} />
          {shell}
        </mesh>

        {/* Panel seams */}
        {[0.5, -0.5].map((r) => (
          <mesh key={r} rotation={[0, r, 0]} scale={[1, 0.96, 1]}>
            <torusGeometry args={[0.999, 0.0045, 8, 160]} />
            <meshStandardMaterial color="#79839a" roughness={0.6} />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.6, 0]}>
          <torusGeometry args={[0.769, 0.004, 8, 160]} />
          <meshStandardMaterial color="#79839a" roughness={0.6} />
        </mesh>

        {/* Visor rim (graphite) and glass */}
        <mesh geometry={visorRimGeo}>
          <meshStandardMaterial color="#2a3142" metalness={0.8} roughness={0.35} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={visorGeo}>
          <meshPhysicalMaterial color="#05070d" metalness={0.5} roughness={0.06} clearcoat={1} clearcoatRoughness={0.03} side={THREE.DoubleSide} />
        </mesh>

        {/* Eyes */}
        <group ref={eyes} position={[0, 0.06, 1.0]}>
          {[-0.21, 0.21].map((x) => (
            <mesh key={x} position={[x, 0, 0.012]} rotation={[0, x * 1.05, 0]} material={eyeMaterial}>
              <capsuleGeometry args={[0.055, 0.11, 8, 24]} />
            </mesh>
          ))}
          <sprite scale={[1.1, 0.55, 1]} position={[0, 0, 0.05]}>
            <spriteMaterial ref={halo} map={tex.halo} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
          </sprite>
        </group>

        {/* Side pods */}
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.98, 0.02, -0.05]} rotation={[0, 0, (s * Math.PI) / 2]}>
            <mesh>
              <capsuleGeometry args={[0.17, 0.1, 12, 32]} />
              {shell}
            </mesh>
            <mesh position={[0, s * -0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.12, 0.018, 12, 48]} />
              <meshBasicMaterial color="#7ae6ff" toneMapped={false} />
            </mesh>
            <mesh position={[0, s * -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.02, 32]} />
              <meshStandardMaterial color="#1b2130" metalness={0.9} roughness={0.25} />
            </mesh>
          </group>
        ))}

        {/* Antenna */}
        <group position={[0.32, 0.86, -0.12]} rotation={[0, 0, -0.32]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.012, 0.016, 0.4, 12]} />
            <meshStandardMaterial color="#a9b2c4" metalness={1} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.42, 0]}>
            <sphereGeometry args={[0.04, 24, 16]} />
            <meshBasicMaterial ref={tip} color="#b9a4ff" toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* Equator ring (does not follow the head) */}
      <group ref={ring} rotation={[0.18, 0, -0.08]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.32, 0.03, 24, 200]} />
          <meshStandardMaterial color="#aeb6c8" metalness={1} roughness={0.28} />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.32, 0, Math.sin(a) * 1.32]}>
              <sphereGeometry args={[0.035, 16, 12]} />
              <meshBasicMaterial color={i % 2 ? "#8ff4ff" : "#b9a4ff"} toneMapped={false} />
            </mesh>
          );
        })}
      </group>

      {/* Thruster */}
      <mesh position={[0, -0.97, 0]}>
        <cylinderGeometry args={[0.2, 0.26, 0.1, 48]} />
        <meshStandardMaterial color="#2a3142" metalness={0.9} roughness={0.3} />
      </mesh>
      <sprite position={[0, -1.06, 0]} scale={[0.75, 0.42, 1]}>
        <spriteMaterial map={tex.halo} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.55} />
      </sprite>
      <mesh ref={flame} position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.16, 0.36, 32, 1, true]} />
        <meshBasicMaterial map={tex.flame} transparent depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function ProbeCanvas({ onReady }: { onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener("change", h);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => {
      mq.removeEventListener("change", h);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className="probe-canvas">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0.15, 5.4], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => onReady?.()}
        aria-hidden="true"
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[-3, 4, 4]} intensity={2.2} color="#f4f6ff" />
        <pointLight position={[3, 0.5, -2]} intensity={14} color="#5fd7ff" distance={8} />
        <pointLight position={[-3, -1, -2]} intensity={12} color="#8b6cff" distance={8} />
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[6, 1.5, 1]} rotation-x={Math.PI / 2.4} color="#ffffff" />
          <Lightformer form="rect" intensity={2} position={[-4, 1, 1]} scale={[2, 4, 1]} rotation-y={Math.PI / 2} color="#cfe6ff" />
          <Lightformer form="rect" intensity={2.5} position={[4, 0, -1]} scale={[2, 5, 1]} rotation-y={-Math.PI / 2} color="#7fdfff" />
        </Environment>
        <group scale={0.92}>
          <Probe reduced={reduced} />
        </group>
      </Canvas>
    </div>
  );
}
