import type { ExperienceItem, Status } from "./types";

export const experience: ExperienceItem[] = [
  {
    org: "HPCL",
    role: "Officer Engineer, Procurement",
    period: "2026 – now", // VERIFY start month
    kind: "full-time",
    ownership: "owned",
    line: "Procurement for one of India's largest oil refiners and marketers.",
    status: "review",
  },
  {
    org: "Nexorea",
    role: "Co-founder and Product Head",
    period: "From May 2025", // VERIFY whether still running
    kind: "startup",
    ownership: "owned",
    line: "AI mental-wellness startup. 40+ user interviews, MVP with 85% onboarding completion.",
    tools: ["User interviews", "PRDs", "Figma"],
    slug: "nexorea",
    status: "review",
  },
  {
    org: "InstaPrepsAI",
    role: "PM Intern, then Product Analyst Intern",
    period: "2025", // VERIFY months
    kind: "internship",
    ownership: "owned",
    line: "Funnel analysis and a relaunched onboarding: MAU up 67% to 1,397, activation up 18%.",
    details: ["Led a six-person team that launched a Student Admin Assessment platform in nine days."],
    tools: ["SQL", "KPI dashboards", "A/B testing"],
    slug: "instaprepsai-onboarding",
    status: "review",
  },
  {
    org: "Devlaunch",
    role: "Product Management Intern",
    period: "Apr – Jul 2025",
    kind: "internship",
    ownership: "contributed",
    line: "Turned 37 user interviews into PRDs for community features; bounce rate down 12%, DAU up 5%.",
    tools: ["User interviews", "PRDs"],
    status: "review",
  },
  {
    org: "Habuild",
    role: "Product Management Intern",
    period: "Aug – Nov 2024",
    kind: "internship",
    ownership: "contributed",
    line: "Yoga Together and Pause My Subscription: class attendance up 19% in three months.",
    slug: "habuild-attendance",
    status: "review",
  },
  {
    org: "Vecmocon Technologies",
    role: "Data Analyst and Strategy Intern",
    period: "May – Jul 2024",
    kind: "internship",
    ownership: "owned",
    line: "Random-forest model on 50,000+ IoT and battery data points cut EV leasing income uncertainty 35%.",
    tools: ["Python", "Random forest"],
    status: "review",
  },
  {
    org: "AirtCraft",
    role: "Founder",
    period: "Past venture",
    kind: "startup",
    ownership: "owned",
    line: "B2B art consultancy connecting academy-trained fine artists with corporate gifting and office collections.",
    details: [
      "Started as a B.Tech project: surveyed 167 artists and 253 consumers, designed a four-stream revenue model.",
      "Pivoted from a consumer marketplace to B2B, built the GTM plan around Diwali corporate gifting, and launched airtcraft.in.",
      "Paused on joining HPCL. Lesson: test who pays before building for both sides.",
    ],
    status: "review",
  },
];

export const recognition: { name: string; detail: string; status: Status }[] = [
  { name: "Top PM Fellow, NextLeap", detail: "Redesigned Zomato's review flow, projected to raise detailed reviews 24%.", status: "review" },
  { name: "Campus winner, Tata Elxsi TELIPORT", detail: "Navigation product concept, projected to improve accuracy 27%.", status: "review" },
  { name: "9th of 4,518, American Express Campus Challenge 2024", detail: "Decision Science track.", status: "review" },
];

export const moreWork: { name: string; detail: string; href?: string; status: Status }[] = [
  {
    name: "ClarioRx — product design assignment (Risa Lab)",
    detail: "Design for an AI agentic browser for prior authorization. Got me to the next round. Add the Figma link.",
    status: "placeholder",
  },
  {
    name: "Vendor performance analysis",
    detail: "10,000+ sales and inventory records; flagged $2.71M of slow-moving stock and 65.7% reliance on top vendors. Self-directed.",
    status: "review",
  },
  {
    name: "Hotel revenue analysis",
    detail: "Found a 22.2-point gap between weekend and weekday occupancy and tested discount scenarios. Course project, AtliQ Hotels dataset.",
    status: "review",
  },
];
