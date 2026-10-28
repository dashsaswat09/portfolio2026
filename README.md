# Saswat Dash — Portfolio

Single-page portfolio built with Vite, React, TypeScript and Tailwind.

## Run it
Double-click `start-portfolio.command`, or:

```bash
npm install
npm run dev
```

## Update content
**Everything lives in [`src/content.ts`](src/content.ts)** — roles, projects, PRDs, skills, links. Components never need editing for content changes.

- New job / internship → add to `roles` (newest first, `current: true` on the present one).
- New project → add to `work` (`featured: true` shows it by default).
- Proof of work → set `proof.url` to a public Drive link or a file in `public/proof/`.
- Résumé → save as `public/resume.pdf` and set `profile.resumeUrl = '/resume.pdf'`.

Items with no proof URL are hidden in production and shown as "proof pending" in dev. See [`PROOF_CHECKLIST.md`](PROOF_CHECKLIST.md).

## Deploy
`npm run build` outputs static files to `dist/` — deploy to Vercel, Netlify or GitHub Pages as-is.

The previous version of the site is kept in `legacy/` for reference and is not part of the build.
