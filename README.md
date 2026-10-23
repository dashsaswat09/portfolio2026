# Saswat Dash — The Product Universe

Personal portfolio for PM / APM roles. Next.js 15 (App Router) + TypeScript, plain CSS, React Three Fiber for the
companion probe, GSAP + Lenis for the parallax hero, Gemini for the AI guide.

## Run it

```bash
npm install
cp .env.example .env.local   # optional: add GEMINI_API_KEY for typed questions
npm run dev                  # http://localhost:3000
npm run check:content        # lists every placeholder and unverified claim
npm run build
```

## Where things live

| Path | What it is |
| --- | --- |
| `content/` | **All site text.** Profile, case studies, experience, curated AI answers. Edit here only. |
| `content/types.ts` | The content model, including the `status` on every claim. |
| `public/artifacts/<slug>/` | Drop screenshots, dashboards, PRD images here (see README in each folder). |
| `public/resume.pdf` | **Placeholder** — replace with the real resume. |
| `public/space/` | Parallax layers (generated, original art). |
| `app/` | Routes: `/`, `/work`, `/work/[slug]`, `/experience`, `/about`, `/contact`, `/api/ask`, sitemap, robots, 404. |
| `components/scene/` | The 3D probe, its SVG fallback, and the lazy loader. |
| `components/ui/parallax-scrolling.tsx` | Parallax hero (adapted from Osmo's component). |
| `components/assistant/` | The AI guide panel. |
| `lib/ai/` | Knowledge builder, prompt, Gemini client, rate limits. |

## Content status — read this before publishing

Every claim has a `status`:

- `verified` — you've confirmed it. Shows everywhere.
- `review` — from your resume or old site. Shows everywhere; preview builds mark it with a blue rail. Confirm baselines and dates.
- `placeholder` — a best-case **scenario** showing what belongs there. It is not true. Preview builds show it with an amber
  "Placeholder — replace" badge. **Production hides it automatically**, and the AI guide never sees it.

Workflow: replace the text, set `status: "verified"`, run `npm run check:content` until it reports 0 placeholders.

## AI guide

- Suggested questions → pre-written answers in `content/assistant.ts` (no API call).
- Typed questions → `POST /api/ask` → Gemini, given only non-placeholder content, must return `{answer, supported, links}`.
  Links are filtered to real pages. No conversations are stored.
- No `GEMINI_API_KEY` or provider error → honest fallback message. The rest of the site never depends on it.
- Limits (per instance): 6/min and 30/day per visitor, 300/day total. Gemini's own free-tier quota is the real ceiling.
- Free tier: Google may use free-tier inputs to improve its products. The panel tells visitors this.

## Setting up Gemini and interview booking

Step-by-step: see [SETUP.md](SETUP.md).

## Deploy (Vercel project `portfolio2026`)

1. Vercel → Settings → Environment Variables: add `GEMINI_API_KEY` (and optionally `GEMINI_MODEL`).
2. Push a branch → preview deployment (shows placeholders, blocked from search engines).
3. Merge to `main` → production at saswatdash.in (placeholders hidden).

## Performance notes

- Hero text is server-rendered HTML; the 3D probe loads after idle, only on screens ≥ 760px with WebGL, and pauses off-screen.
- Mobile and no-WebGL visitors get the SVG probe. Reduced-motion turns off parallax, smooth scroll and probe animation.
