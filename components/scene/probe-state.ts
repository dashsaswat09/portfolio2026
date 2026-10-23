// Tiny shared state so the chat panel can make the probe react.

export type ProbeMood = "idle" | "thinking" | "speaking";

const EVENT = "probe:mood";

export function setProbeMood(mood: ProbeMood) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ProbeMood>(EVENT, { detail: mood }));
}

export function onProbeMood(cb: (m: ProbeMood) => void) {
  const h = (e: Event) => cb((e as CustomEvent<ProbeMood>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}
