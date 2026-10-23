"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { ProbeFallback } from "./probe-fallback";

// Loads the 3D probe only when it's worth it: a wide screen, WebGL available,
// and after the page's text has rendered. Otherwise the SVG stays.

const ProbeCanvas = dynamic(() => import("./probe-canvas"), { ssr: false });

class Boundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function ProbeStage() {
  const [mode, setMode] = useState<"svg" | "loading" | "3d">("svg");

  useEffect(() => {
    if (window.innerWidth < 760 || !hasWebGL()) return;
    const start = () => setMode((m) => (m === "svg" ? "loading" : m));
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(start, { timeout: 1500 });
    else setTimeout(start, 600);
  }, []);

  return (
    <div className={`probe-stage probe-stage--${mode}`}>
      <ProbeFallback className="probe-svg" />
      {mode !== "svg" && (
        <Boundary onError={() => setMode("svg")}>
          <ProbeCanvas onReady={() => setMode("3d")} />
        </Boundary>
      )}
    </div>
  );
}
