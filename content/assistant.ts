import { profile } from "./profile";
import { caseStudies } from "./case-studies";
import { experience } from "./experience";
import type { LinkItem } from "./types";

// Curated answers: shown instantly in the browser, no model call.
// They are built from the content files so they can't drift from the site.

export type CuratedAnswer = { id: string; question: string; answer: string; links: LinkItem[] };

const featured = caseStudies.filter((c) => c.summary.status !== "placeholder");

export const curatedAnswers: CuratedAnswer[] = [
  {
    id: "who",
    question: "Who is Saswat, and what does he do?",
    answer: `${profile.name} is an engineer moving into product management. He has a dual degree from ${profile.education.school} (${profile.education.year}), three product internships (Habuild, Devlaunch, InstaPrepsAI), and co-founded Nexorea, an AI mental-wellness startup. He currently works in procurement at HPCL and is looking for APM, PM or Product Analyst roles.`,
    links: [
      { label: "About", href: "/about" },
      { label: "Experience", href: "/experience" },
    ],
  },
  {
    id: "best-work",
    question: "What are his strongest case studies?",
    answer: `Start with these: ${featured.map((c) => `${c.company} — ${c.title.toLowerCase()}`).join("; ")}.`,
    links: featured.map((c) => ({ label: c.company, href: `/work/${c.slug}` })),
  },
  {
    id: "nexorea",
    question: "What was his role at Nexorea?",
    answer:
      "He co-founded Nexorea and led product. He interviewed 40+ potential users, reframed the idea from a chatbot into an AI-first diary, and built a mobile-first MVP. 85% of new users completed onboarding.",
    links: [{ label: "Nexorea case study", href: "/work/nexorea" }],
  },
  {
    id: "data",
    question: "How has he used data to improve a product?",
    answer:
      "At InstaPrepsAI he ran cohort and funnel analysis on 3,000+ users and found most new users were lost during onboarding. The relaunched, A/B-tested onboarding coincided with monthly active users growing 67% to 1,397 and activation rising 18%. At Vecmocon he built a random-forest model on 50,000+ IoT and battery data points.",
    links: [{ label: "InstaPrepsAI case study", href: "/work/instaprepsai-onboarding" }],
  },
  {
    id: "engineering",
    question: "How does his engineering background help him as a PM?",
    answer: `He trained as a mechanical engineer at ${profile.education.school}, and his work leans analytical — SQL and funnel analysis, experiment design, and modelling. He can speak with engineers about trade-offs. For his own words on why he moved into product, see the About page.`,
    links: [{ label: "About", href: "/about" }],
  },
  {
    id: "resume",
    question: "Where can I find his resume?",
    answer: "You can download it from the link below, or from the top of any page.",
    links: [{ label: "Resume (PDF)", href: profile.resume.href }],
  },
  {
    id: "contact",
    question: "How can I contact him?",
    answer: `Email ${profile.email}, or message him on LinkedIn.`,
    links: [
      { label: "Email", href: `mailto:${profile.email}` },
      { label: "LinkedIn", href: profile.linkedin },
    ],
  },
];

/** Pages the model is allowed to link to. Anything else is dropped. */
export const allowedLinks: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  ...caseStudies.map((c) => ({ label: `${c.company} case study`, href: `/work/${c.slug}` })),
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Resume (PDF)", href: profile.resume.href },
];

export const experienceCount = experience.length;
