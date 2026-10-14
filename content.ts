// All site text lives here. Edit this file to update the portfolio.
// Anything marked VERIFY in the README should be checked before you publish.

export const profile = {
  name: "Saswat Dash",
  headline:
    "Product person with three PM internships, two startups, and a day job buying for one of India's largest oil companies.",
  looking:
    "Looking for an APM or product role at a startup or product company. Open to hybrid roles in Bengaluru, Delhi NCR, Mumbai, Pune, Hyderabad and Chennai.",
  email: "saswat.dash.iitkgp@gmail.com",
  linkedin: "", // VERIFY: paste your LinkedIn URL; the link is hidden while empty
  github: "https://github.com/dashsaswat09",
  channel: {
    name: "Why It's Built",
    handle: "@whyitsbuilt",
    instagram: "https://www.instagram.com/whyitsbuilt", // VERIFY
    youtube: "https://www.youtube.com/@whyitsbuilt", // VERIFY
    line: "Short breakdowns of why everyday products are designed the way they are. I use it to learn in public.",
  },
  titleBlock: [
    { k: "Discipline", v: "Product" },
    { k: "Now", v: "Procurement, HPCL" },
    { k: "Trained as", v: "Mechanical engineer, IIT Kharagpur" },
    { k: "Revision", v: "Oct 2026" },
  ],
};

export type CaseStudy = {
  slug: string;
  company: string;
  role: string;
  period: string;
  kind: string;
  title: string;
  result: string;
  summary: { problem: string; did: string; outcome: string };
  sections: { heading: string; body: string[] }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "instaprepsai-relaunch",
    company: "InstaPrepsAI",
    role: "Product Management Intern, then Product Analyst Intern",
    period: "2025",
    kind: "EdTech, B2B and B2C",
    title: "Relaunching onboarding to grow monthly users 67%",
    result: "Monthly active users up 67%, to 1,397",
    summary: {
      problem: "Students signed up but dropped off before they reached their first test.",
      did: "Ran cohort and funnel analysis on 3,000+ users, found where onboarding lost people, and A/B tested a relaunched flow.",
      outcome: "Monthly active users grew 67% to 1,397, and onboarding activation rose 18%.",
    },
    sections: [
      {
        heading: "Context",
        body: [
          "InstaPrepsAI sells test-preparation tools to students and to the schools that teach them. I joined the product team as an intern and later moved into a product analyst role.",
        ],
      },
      {
        heading: "Finding the drop-off",
        body: [
          "I built KPI dashboards and ran SQL analysis on 5,000+ records to see where new users stalled. Cohort and funnel analysis on 3,000+ users showed that most of the loss happened during onboarding, before a student's first test.",
        ],
      },
      {
        heading: "What we shipped",
        body: [
          "We relaunched onboarding based on that behavioural analysis and tested the changes with A/B experiments before rolling them out.",
          "Separately, I led a six-person team that launched a Student Admin Assessment platform for schools in nine days.",
        ],
      },
      {
        heading: "Results",
        body: [
          "Monthly active users grew 67%, to 1,397. Onboarding activation rose 18%.",
        ],
      },
    ],
  },
  {
    slug: "habuild-attendance",
    company: "Habuild",
    role: "Product Management Intern",
    period: "Aug – Nov 2024",
    kind: "Health tech, B2C",
    title: "Two features that lifted class attendance 19% in three months",
    result: "Class attendance up 19% in three months",
    summary: {
      problem: "Members of an online yoga programme were skipping live classes and quietly churning.",
      did: "Launched 'Yoga Together', for practising with others, and 'Pause My Subscription', so members could take a break without cancelling.",
      outcome: "Class attendance rose 19% within three months of launch.",
    },
    sections: [
      {
        heading: "Context",
        body: [
          "Habuild runs live online yoga classes on a subscription. Attendance is the habit that keeps members subscribed, so it was the metric that mattered.",
        ],
      },
      {
        heading: "What we shipped",
        body: [
          "Yoga Together let members practise alongside people they knew, adding a social reason to show up.",
          "Pause My Subscription gave members who needed a break an option other than cancelling.",
        ],
      },
      {
        heading: "Results",
        body: ["Class attendance rose 19% within three months of launch."],
      },
    ],
  },
  {
    slug: "nexorea",
    company: "Nexorea",
    role: "Co-founder and Product Head",
    period: "From May 2025",
    kind: "AI mental wellness",
    title: "Turning 40 interviews into an AI-first diary",
    result: "85% onboarding completion on the first MVP",
    summary: {
      problem: "People wanted help processing their feelings but didn't trust or keep using existing wellness apps.",
      did: "Interviewed 40+ potential users, reframed the idea as an AI-first diary, and built a mobile-first MVP designed for privacy.",
      outcome: "85% of new users completed onboarding, and conversational AI with five emotional personas raised retention 25%.",
    },
    sections: [
      {
        heading: "Context",
        body: ["I co-founded Nexorea to build an AI companion for everyday mental wellness, and led product."],
      },
      {
        heading: "What the interviews changed",
        body: [
          "Over 40 interviews, the clearest need wasn't therapy-style advice. People wanted a private place to write things down and make sense of them. That reframed the product from a chatbot into an AI-first diary.",
        ],
      },
      {
        heading: "What we built",
        body: [
          "A mobile-first MVP with privacy-by-design choices in the user experience, and a conversational AI with five emotional personas so replies matched how the user felt.",
        ],
      },
      {
        heading: "Results",
        body: ["85% of new users completed onboarding. The persona-based AI raised retention 25%."],
      },
    ],
  },
  {
    slug: "airtcraft",
    company: "AirtCraft",
    role: "Founder",
    period: "Past venture",
    kind: "B2B art consultancy",
    title: "From a marketplace thesis to a B2B art consultancy",
    result: "Pivoted after research with 167 artists and 253 buyers",
    summary: {
      problem: "Academy-trained fine artists struggle to find steady buyers, and companies struggle to find original art for gifting and offices.",
      did: "Researched both sides, designed a marketplace, then pivoted to a consultancy that matches artists with corporate gifting and office collections.",
      outcome: "Took the venture to launch with a GTM strategy, artist outreach and a live website, then paused it when I joined HPCL.",
    },
    sections: [
      {
        heading: "Where it started",
        body: [
          "AirtCraft began as my B.Tech project: an artisanal marketplace. I surveyed 167 artists and 253 consumers to understand what stopped each side from finding the other, and designed a revenue model with four streams.",
        ],
      },
      {
        heading: "Why I pivoted",
        body: [
          "A consumer marketplace needs heavy demand generation before it works. Corporate buyers already spend on gifting and office decor every year, and one client can mean many pieces. So I rebuilt the idea as a B2B consultancy connecting fine artists with companies.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "A go-to-market plan aimed at the Diwali corporate-gifting season, competitive positioning, outreach material for artists, and the airtcraft.in website.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "I paused AirtCraft when I joined HPCL, whose policy doesn't allow running a business alongside the job. The biggest lesson: test who pays before building for both sides.",
        ],
      },
    ],
  },
];

export const experience = [
  { org: "HPCL", role: "Officer Engineer, Procurement", period: "2026 – now", line: "Buying for one of India's largest oil refiners and marketers." },
  { org: "Nexorea", role: "Co-founder and Product Head", period: "From May 2025", line: "AI mental-wellness startup.", slug: "nexorea" },
  { org: "InstaPrepsAI", role: "PM Intern, then Product Analyst Intern", period: "2025", line: "MAU up 67% to 1,397; activation up 18%.", slug: "instaprepsai-relaunch" },
  { org: "Devlaunch", role: "Product Management Intern", period: "Apr – Jul 2025", line: "37 user interviews turned into PRDs; bounce rate down 12%, DAU up 5%." },
  { org: "Habuild", role: "Product Management Intern", period: "Aug – Nov 2024", line: "Class attendance up 19% in three months.", slug: "habuild-attendance" },
  { org: "Vecmocon Technologies", role: "Data Analyst and Strategy Intern", period: "May – Jul 2024", line: "Random-forest model on 50,000+ IoT and battery data points cut EV leasing income uncertainty 35%." },
  { org: "AirtCraft", role: "Founder", period: "Past venture", line: "B2B art consultancy for corporate gifting and offices.", slug: "airtcraft" },
];

export const recognition = [
  { name: "Top PM Fellow, NextLeap", detail: "Redesigned Zomato's review flow, projected to raise detailed reviews 24%." },
  { name: "Campus winner, Tata Elxsi TELIPORT", detail: "Navigation product concept, projected to improve accuracy 27%." },
  { name: "9th of 4,518, American Express Campus Challenge 2024", detail: "Decision Science track." },
];

export const moreWork = [
  { name: "Vendor performance analysis", detail: "Analysed 10,000+ sales and inventory records; flagged $2.71M of slow-moving stock and a 65.7% reliance on top vendors. Self-directed project." },
  { name: "Hotel revenue analysis", detail: "Found a 22.2-point gap between weekend and weekday occupancy and tested discount scenarios. Course project on the AtliQ Hotels dataset." },
  { name: "PRDs", detail: "Written for InstaPrepsAI's assessment platform, Devlaunch's community features, Nexorea's chat system and Habuild's session management." },
];

export const education = {
  school: "IIT Kharagpur",
  degree: "Dual degree: B.Tech Mechanical Engineering and M.Tech Manufacturing Science",
  year: "2026",
};
