# Saswat Dash — portfolio

A Next.js site. All the words live in `content.ts`; edit that file to change anything on the site.

## Before you publish: check these

The case-study pages are drafts I rebuilt from the one-line bullets on your old site. Where a bullet only gave a result, I wrote plausible context around it. **Read every case study and rewrite anything that isn't exactly true.** An interviewer will ask about each sentence.

Specifically:

1. **Case-study context I filled in.** Check the "Context", "Finding the drop-off", "What the interviews changed" and "Why I pivoted" sections. The reasoning there is my draft, not your words.
2. **LinkedIn.** Paste your URL into `profile.linkedin`. The link stays hidden until you do.
3. **Channel links.** Confirm `instagram.com/whyitsbuilt` and `youtube.com/@whyitsbuilt` are the right addresses.
4. **Dates.** Your HPCL start month; when InstaPrepsAI ended; whether Nexorea is still running.
5. **Nexorea numbers.** "85% onboarding completion" and "retention up 25%": make sure you can say what each was measured against.
6. **Photo.** `public/saswat.jpg` was cropped from a screenshot of your old site. Replace it with the original photo for a sharper image.

What I deliberately left out from the old site: the phone number, the skill tag clouds, the fraud-detection project, the "72% unit cost reduction" and "accelerated iteration by 67%" claims, and the mechanical "Core" section. Add any back only if you can defend it in an interview.

## Run it on your Mac

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Put it on GitHub and Vercel (about 10 minutes)

1. On github.com (signed in as **dashsaswat09**), create a new repository called `portfolio-2026`. Leave it empty: no README, no .gitignore.
2. In Terminal, inside this folder:
   ```bash
   git init
   git add .
   git commit -m "New portfolio"
   git branch -M main
   git remote add origin https://github.com/dashsaswat09/portfolio-2026.git
   git push -u origin main
   ```
3. Go to vercel.com and **sign in with GitHub** using that same account. Click **Add New → Project**, pick `portfolio-2026`, and click **Deploy**. No settings to change.
4. Optional: in the Vercel project, open **Settings → Domains** and add a domain you've bought, such as saswatdash.com.

Every push to `main` now redeploys the site automatically. Write down which accounts you used this time.
