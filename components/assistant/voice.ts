// Speaks the guide's answers with an Indian English voice, using the browser's built-in
// speech engine (Web Speech API). Free and offline-capable, but which voices exist depends
// on the visitor's device: e.g. "Rishi"/"Veena" on Apple, "Heera"/"Ravi" on Windows,
// "English (India)" on Android and ChromeOS.

let cached: SpeechSynthesisVoice | null | undefined;

export const voiceSupported = () => typeof window !== "undefined" && "speechSynthesis" in window;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const v = window.speechSynthesis.getVoices();
    if (v.length) return resolve(v);
    const done = () => resolve(window.speechSynthesis.getVoices());
    window.speechSynthesis.addEventListener("voiceschanged", done, { once: true });
    setTimeout(done, 1500); // some browsers never fire the event
  });
}

/** Best Indian voice on this device: English (India) first, then a Hindi voice, else null. */
export async function pickIndianVoice(): Promise<SpeechSynthesisVoice | null> {
  if (cached !== undefined) return cached;
  if (!voiceSupported()) return (cached = null);
  const voices = await loadVoices();
  const norm = (l: string) => l.toLowerCase().replace("_", "-");
  const enIN = voices.filter((v) => norm(v.lang) === "en-in");
  const preferredNames = /(google|natural|neural|online|rishi|veena|heera|ravi|neerja|prabhat)/i;
  cached =
    enIN.find((v) => preferredNames.test(v.name)) ??
    enIN[0] ??
    voices.find((v) => norm(v.lang) === "hi-in") ??
    null;
  return cached;
}

/** Strip things that sound bad read aloud (arrows, URLs, markdown). */
function speakable(text: string) {
  return text
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[→↗*_#`]/g, "")
    .replace(/\bAPM\b/g, "A P M")
    .replace(/\bPRDs?\b/g, (m) => (m.endsWith("s") ? "P R Ds" : "P R D"))
    .replace(/\bMAU\b/g, "monthly active users")
    .replace(/IIT/g, "I I T")
    .replace(/\s+/g, " ")
    .trim();
}

export async function speak(text: string, on: { start?: () => void; end?: () => void } = {}) {
  if (!voiceSupported()) return false;
  const voice = await pickIndianVoice();
  if (!voice) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(speakable(text));
  u.voice = voice;
  u.lang = voice.lang;
  u.rate = 1;
  u.pitch = 1.05;
  u.onstart = () => on.start?.();
  u.onend = () => on.end?.();
  u.onerror = () => on.end?.();
  window.speechSynthesis.speak(u);
  return true;
}

export function stopSpeaking() {
  if (voiceSupported()) window.speechSynthesis.cancel();
}
