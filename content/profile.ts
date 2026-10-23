import type { Status } from "./types";

export const profile = {
  name: "Saswat Dash",
  role: "Product Manager",
  headline:
    "Engineer turned product builder. Three PM internships, two startups, and a day job in procurement at HPCL.",
  intro:
    "I find where users drop off, decide what to build about it, and measure whether it worked. I'm looking for an APM or product role at a startup or product company.",
  looking:
    "Open to APM, PM and Product Analyst roles — onsite or hybrid in Bengaluru, Delhi NCR, Mumbai, Pune, Hyderabad or Chennai.",
  email: "dashsaswat09@gmail.com",
  linkedin: "https://www.linkedin.com/in/saswatdash2003/",
  github: "https://github.com/dashsaswat09",
  /** Upload the real file to public/resume.pdf and set status to "verified". */
  resume: { href: "/resume.pdf", status: "placeholder" as Status },
  photo: "/saswat.jpg",
  site: "https://saswatdash.in",
  channel: {
    name: "Why It's Built",
    handle: "@whyitsbuilt",
    instagram: "https://www.instagram.com/whyitsbuilt", // VERIFY
    youtube: "https://www.youtube.com/@whyitsbuilt", // VERIFY
    line: "Short breakdowns of why everyday products are designed the way they are. I use it to learn in public.",
  },
  education: {
    school: "IIT Kharagpur",
    degree: "Dual degree — B.Tech Mechanical Engineering + M.Tech Manufacturing Science & Engineering",
    year: "2026",
  },
};

export const about = {
  sections: [
    {
      id: "now",
      heading: "Where I am now",
      status: "review" as Status,
      body: [
        "I work as an Officer Engineer in procurement at HPCL, one of India's largest oil refiners and marketers. Alongside it I'm moving into product management full time.",
      ],
    },
    {
      id: "engineering",
      heading: "Engineering, then product",
      status: "review" as Status,
      body: [
        "I trained as a mechanical engineer at IIT Kharagpur, finishing a dual degree in Mechanical Engineering and Manufacturing Science in 2026. During it I took three product internships — Habuild, Devlaunch and InstaPrepsAI — did data and strategy work at Vecmocon, and started two ventures, AirtCraft and Nexorea.",
      ],
    },
    {
      id: "why-product",
      heading: "Why product",
      status: "placeholder" as Status,
      body: [
        "Scenario: Manufacturing taught me to trace a defect back to the step that caused it. Product work felt like the same discipline applied to people — find the step where users fall out, understand why, fix it, and measure the change. Replace this with your own reason in your own words.",
      ],
    },
    {
      id: "outside",
      heading: "Outside work",
      status: "review" as Status,
      body: [
        "I run Why It's Built, a channel that breaks down why everyday products are designed the way they are. I'm from Puri, Odisha, and based in Bhubaneswar.",
      ],
    },
  ],
};
