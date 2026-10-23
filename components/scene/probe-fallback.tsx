// Static SVG version of the probe: shown before the 3D loads, on small screens,
// and whenever WebGL is unavailable.

export function ProbeFallback({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" role="img" aria-label="Companion probe illustration">
      <defs>
        <radialGradient id="pf-shell" cx="38%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#dfe5ef" />
          <stop offset="0.85" stopColor="#8d97ad" />
          <stop offset="1" stopColor="#4c5670" />
        </radialGradient>
        <radialGradient id="pf-visor" cx="40%" cy="30%" r="80%">
          <stop offset="0" stopColor="#2b3550" />
          <stop offset="0.6" stopColor="#070a12" />
          <stop offset="1" stopColor="#020308" />
        </radialGradient>
        <radialGradient id="pf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#8ff4ff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#8ff4ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pf-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dff9ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6fdcff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pf-ring" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5b6478" />
          <stop offset="0.5" stopColor="#e3e8f2" />
          <stop offset="1" stopColor="#5b6478" />
        </linearGradient>
      </defs>
      <path d="M182 318 L218 318 L200 380 Z" fill="url(#pf-flame)" />
      <ellipse cx="200" cy="200" rx="182" ry="40" fill="none" stroke="url(#pf-ring)" strokeWidth="7" opacity="0.55" />
      <rect x="168" y="300" width="64" height="16" rx="6" fill="#2a3142" />
      <ellipse cx="62" cy="200" rx="26" ry="34" fill="url(#pf-shell)" />
      <ellipse cx="338" cy="200" rx="26" ry="34" fill="url(#pf-shell)" />
      <circle cx="200" cy="200" r="132" fill="url(#pf-shell)" />
      <path d="M90 168 Q200 110 310 168 Q322 230 290 262 Q200 300 110 262 Q78 230 90 168 Z" fill="#2a3142" />
      <path d="M96 172 Q200 118 304 172 Q314 228 286 256 Q200 292 114 256 Q86 228 96 172 Z" fill="url(#pf-visor)" />
      <ellipse cx="200" cy="208" rx="100" ry="44" fill="url(#pf-glow)" />
      <rect x="152" y="186" width="20" height="44" rx="10" fill="#9ff6ff" />
      <rect x="228" y="186" width="20" height="44" rx="10" fill="#9ff6ff" />
      <path d="M132 160 Q170 138 214 140" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="6" fill="none" strokeLinecap="round" />
      <line x1="244" y1="80" x2="268" y2="34" stroke="#a9b2c4" strokeWidth="4" />
      <circle cx="270" cy="30" r="8" fill="#b9a4ff" />
      <path d="M18 200 A182 40 0 0 0 382 200" fill="none" stroke="url(#pf-ring)" strokeWidth="7" />
    </svg>
  );
}
