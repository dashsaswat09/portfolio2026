import type { CaseStudy } from "./types";

// Featured case studies, in display order.
// Text starting with "Scenario:" is a best-case placeholder showing what belongs there.
// Replace it with what actually happened and change the status to "verified".
// Artifacts: drop files into public/artifacts/<slug>/ and fill in `file`.

export const caseStudies: CaseStudy[] = [
  {
    slug: "instaprepsai-onboarding",
    company: "InstaPrepsAI",
    role: "Product Management Intern, then Product Analyst Intern",
    period: "2025",
    domain: "EdTech · B2B and B2C",
    ownership: "owned",
    title: "Rebuilding onboarding so students reach their first test",
    oneLiner: "Funnel analysis found where new users stalled; a relaunched, A/B-tested onboarding followed.",
    tags: ["Onboarding", "Funnel analysis", "SQL", "A/B testing"],
    planet: { light: "#7fd8f5", dark: "#1b3f73" },
    summary: {
      problem: "Students signed up but dropped off before they reached their first test.",
      did: "Ran cohort and funnel analysis on 3,000+ users, found where onboarding lost people, and A/B tested a relaunched flow.",
      outcome: "Monthly active users grew 67% to 1,397, and onboarding activation rose 18%.",
      status: "review",
    },
    metrics: [
      { label: "Monthly active users", value: "+67%", context: "to 1,397 — VERIFY baseline month and window", status: "review" },
      { label: "Onboarding activation", value: "+18%", context: "VERIFY: how activation was defined", status: "review" },
      { label: "Users analysed", value: "3,000+", context: "cohort and funnel analysis", status: "review" },
    ],
    sections: [
      {
        id: "context",
        heading: "Context",
        status: "review",
        body: [
          "InstaPrepsAI sells test-preparation tools to students and to the schools that teach them. I joined the product team as an intern and later moved into a product analyst role.",
        ],
      },
      {
        id: "users",
        heading: "Users and what they needed",
        status: "placeholder",
        body: [
          "Scenario: Two users mattered — students preparing for an exam, who wanted to attempt a real test within minutes of signing up, and school admins, who wanted to see their students' progress without chasing them.",
        ],
      },
      {
        id: "discovery",
        heading: "Finding the drop-off",
        status: "review",
        body: [
          "I built KPI dashboards and ran SQL analysis on 5,000+ records to see where new users stalled. Cohort and funnel analysis on 3,000+ users showed most of the loss happened during onboarding, before a student's first test.",
        ],
      },
      {
        id: "role",
        heading: "What I owned",
        status: "placeholder",
        body: [
          "Scenario: I owned the analysis, the problem statement and the PRD for the new flow, and ran the experiment readout. Design produced the screens; two engineers built them. Replace with the real split of who did what.",
        ],
      },
      {
        id: "constraints",
        heading: "Constraints",
        status: "placeholder",
        body: [
          "Scenario: One sprint of engineering time, no budget for new tooling, and the school-facing product had to keep working unchanged throughout.",
        ],
      },
      {
        id: "execution",
        heading: "What we shipped",
        status: "review",
        body: [
          "We relaunched onboarding based on that behavioural analysis and tested the changes with A/B experiments before rolling them out.",
          "Separately, I led a six-person team that launched a Student Admin Assessment platform for schools in nine days.",
        ],
      },
      {
        id: "measurement",
        heading: "How we measured it",
        status: "placeholder",
        body: [
          "Scenario: Primary metric was activation — the share of new sign-ups who finished a first test within 24 hours. Guardrail was day-7 retention. The test ran for two weeks with a 50/50 split.",
        ],
      },
      {
        id: "results",
        heading: "Results",
        status: "review",
        body: ["Monthly active users grew 67%, to 1,397. Onboarding activation rose 18%."],
      },
      {
        id: "lessons",
        heading: "Trade-offs and what I'd do differently",
        status: "placeholder",
        body: [
          "Scenario: Shortening onboarding meant collecting less profile data up front, which made personalised recommendations weaker in the first week. Next time I'd instrument the funnel before the redesign, not during it, so the baseline is cleaner.",
        ],
      },
    ],
    decisions: [
      {
        title: "Put the first test before profile setup",
        context: "Scenario: Most drop-off happened on the profile screens, before students saw any value.",
        options: ["Shorten the profile form", "Move the first test ahead of profile setup", "Add progress indicators"],
        choice: "Move the first test ahead of profile setup.",
        why: "Scenario: It attacked the cause — no value before effort — rather than making the effort feel smaller.",
        status: "placeholder",
      },
    ],
    artifacts: [
      { id: "funnel", title: "Onboarding funnel, before and after", kind: "dashboard", caption: "Step-by-step conversion from sign-up to first test.", status: "placeholder" },
      { id: "flows", title: "Old vs. new onboarding screens", kind: "screenshot", caption: "The steps removed or reordered.", status: "placeholder" },
      { id: "experiment", title: "A/B test readout", kind: "chart", caption: "Activation by variant, with sample sizes.", status: "placeholder" },
      { id: "prd", title: "PRD — Student Admin Assessment platform", kind: "prd", caption: "Scope and requirements for the nine-day launch.", status: "placeholder" },
    ],
  },
  {
    slug: "nexorea",
    company: "Nexorea",
    role: "Co-founder and Product Head",
    period: "From May 2025",
    domain: "AI mental wellness",
    ownership: "owned",
    title: "Turning 40 interviews into an AI-first diary",
    oneLiner: "User interviews reframed a wellness chatbot into a private, AI-first diary.",
    tags: ["0→1", "User research", "AI product", "Privacy"],
    planet: { light: "#c4a8ff", dark: "#3a2470", ring: true },
    summary: {
      problem: "People wanted help processing their feelings but didn't trust or keep using existing wellness apps.",
      did: "Interviewed 40+ potential users, reframed the idea as an AI-first diary, and built a mobile-first MVP designed for privacy.",
      outcome: "85% of new users completed onboarding; conversational AI with five emotional personas raised retention 25%.",
      status: "review",
    },
    metrics: [
      { label: "User interviews", value: "40+", status: "review" },
      { label: "Onboarding completion", value: "85%", context: "VERIFY: number of users and period", status: "review" },
      { label: "Retention", value: "+25%", context: "VERIFY: which retention, compared with what", status: "review" },
    ],
    sections: [
      {
        id: "context",
        heading: "Context",
        status: "review",
        body: ["I co-founded Nexorea to build an AI companion for everyday mental wellness, and led product."],
      },
      {
        id: "discovery",
        heading: "What the interviews changed",
        status: "review",
        body: [
          "Over 40+ interviews, the clearest need wasn't therapy-style advice. People wanted a private place to write things down and make sense of them. That reframed the product from a chatbot into an AI-first diary.",
        ],
      },
      {
        id: "role",
        heading: "What I owned",
        status: "placeholder",
        body: [
          "Scenario: I ran the interviews, wrote the product spec and the chat-system PRD, and prioritised the MVP backlog. My co-founder owned engineering. Replace with the real split.",
        ],
      },
      {
        id: "built",
        heading: "What we built",
        status: "review",
        body: [
          "A mobile-first MVP with privacy-by-design choices in the user experience, and a conversational AI with five emotional personas so replies matched how the user felt.",
        ],
      },
      {
        id: "safety",
        heading: "Safety and trust",
        status: "placeholder",
        body: [
          "Scenario: Because the product touched mental health, we defined what the AI must never do, routed crisis language to human helplines, and kept entries private by default.",
        ],
      },
      {
        id: "results",
        heading: "Results",
        status: "review",
        body: ["85% of new users completed onboarding. The persona-based AI raised retention 25%."],
      },
      {
        id: "lessons",
        heading: "What I'd do differently",
        status: "placeholder",
        body: [
          "Scenario: I'd test willingness to pay earlier. Strong engagement from a small group told us people valued it, not that they'd pay for it.",
        ],
      },
    ],
    decisions: [
      {
        title: "Diary first, chat second",
        context: "Scenario: Interviewees distrusted apps that talked at them, but kept private journals.",
        options: ["Chat-first companion", "AI-first diary with optional conversation"],
        choice: "AI-first diary with optional conversation.",
        why: "Scenario: It matched a habit people already had, and lowered the trust bar for a first session.",
        status: "placeholder",
      },
    ],
    artifacts: [
      { id: "synthesis", title: "Interview synthesis", kind: "diagram", caption: "Themes from 40+ interviews and how they changed the product.", status: "placeholder" },
      { id: "personas", title: "Five emotional personas", kind: "document", caption: "How the AI's tone changes with the user's mood.", status: "placeholder" },
      { id: "mvp", title: "MVP screens", kind: "screenshot", caption: "Diary entry, reflection and persona chat.", status: "placeholder" },
      { id: "prd", title: "PRD — chat system", kind: "prd", caption: "Requirements and guardrails for the conversational AI.", status: "placeholder" },
    ],
  },
  {
    slug: "habuild-attendance",
    company: "Habuild",
    role: "Product Management Intern",
    period: "Aug – Nov 2024",
    domain: "Health tech · B2C",
    ownership: "contributed",
    title: "Two features that lifted class attendance 19% in three months",
    oneLiner: "A social reason to show up, and a way to take a break without cancelling.",
    tags: ["Retention", "Habit loops", "Subscriptions"],
    planet: { light: "#ffc58a", dark: "#7a3418" },
    summary: {
      problem: "Members of an online yoga programme were skipping live classes and quietly churning.",
      did: "Launched 'Yoga Together', for practising with others, and 'Pause My Subscription', so members could take a break without cancelling.",
      outcome: "Class attendance rose 19% within three months of launch.",
      status: "review",
    },
    metrics: [{ label: "Class attendance", value: "+19%", context: "within three months of launch — VERIFY baseline", status: "review" }],
    sections: [
      {
        id: "context",
        heading: "Context",
        status: "review",
        body: [
          "Habuild runs live online yoga classes on a subscription. Attendance is the habit that keeps members subscribed, so it was the metric that mattered.",
        ],
      },
      {
        id: "discovery",
        heading: "Why members stopped showing up",
        status: "placeholder",
        body: [
          "Scenario: Exit surveys and member calls showed two patterns: people who practised alone lost motivation after a few weeks, and people with a busy month cancelled rather than skip, then never came back.",
        ],
      },
      {
        id: "built",
        heading: "What we shipped",
        status: "review",
        body: [
          "Yoga Together let members practise alongside people they knew, adding a social reason to show up.",
          "Pause My Subscription gave members who needed a break an option other than cancelling.",
        ],
      },
      {
        id: "role",
        heading: "What I contributed",
        status: "placeholder",
        body: [
          "Scenario: I wrote the session-management PRD, defined the pause rules, and tracked attendance after launch. The wider product team owned design and rollout.",
        ],
      },
      {
        id: "results",
        heading: "Results",
        status: "review",
        body: ["Class attendance rose 19% within three months of launch."],
      },
      {
        id: "lessons",
        heading: "What I'd do differently",
        status: "placeholder",
        body: [
          "Scenario: Two features launched close together, so we couldn't cleanly attribute the lift. I'd stagger launches or hold out a control group.",
        ],
      },
    ],
    decisions: [
      {
        title: "Offer a pause instead of fighting cancellations",
        context: "Scenario: Cancelling was the only option for members who needed a short break.",
        options: ["Discount to stay", "Pause for up to a month", "Do nothing"],
        choice: "Pause for up to a month.",
        why: "Scenario: It kept the relationship alive at no cost, and a paused member is far easier to bring back than a cancelled one.",
        status: "placeholder",
      },
    ],
    artifacts: [
      { id: "flow", title: "Pause My Subscription flow", kind: "figma", caption: "From the cancel button to the pause offer.", status: "placeholder" },
      { id: "attendance", title: "Attendance trend", kind: "chart", caption: "Weekly attendance before and after launch.", status: "placeholder" },
      { id: "prd", title: "PRD — session management", kind: "prd", caption: "Rules for pausing and resuming sessions.", status: "placeholder" },
    ],
  },
  {
    slug: "portfolio-assistant",
    company: "This portfolio",
    role: "Product owner and builder",
    period: "2026",
    domain: "AI product · LLM grounding",
    ownership: "independent",
    title: "An AI guide that refuses to make things up",
    oneLiner: "A grounded assistant: curated answers first, a cheap model second, an honest 'I don't know' always.",
    tags: ["AI product", "Guardrails", "Evals", "Cost control"],
    planet: { light: "#8ff0c8", dark: "#0f4a4a" },
    summary: {
      problem: "A portfolio chatbot that invents one metric does more damage than having no chatbot.",
      did: "Designed a layered assistant: pre-written answers for common questions, a small model grounded only in approved content, and a refusal path for everything else.",
      outcome: "Scenario: Passed 30 of 30 adversarial test questions without inventing a fact, at under ₹X a month.",
      status: "placeholder",
    },
    metrics: [
      { label: "Eval questions passed", value: "—", context: "fill in after the eval script runs", status: "placeholder" },
      { label: "Monthly running cost", value: "—", context: "fill in after a month live", status: "placeholder" },
    ],
    sections: [
      {
        id: "problem",
        heading: "The problem",
        status: "review",
        body: [
          "Recruiters skim. A few want to ask a direct question instead — what did he own at Nexorea, where's the resume. A chatbot can answer that in seconds, but an AI that invents a single number in a hiring context is worse than no chatbot at all.",
        ],
      },
      {
        id: "architecture",
        heading: "How it works",
        status: "review",
        body: [
          "Suggested questions are answered from pre-written text in the browser, with no model call. Typed questions go to a server route that sends the model only approved portfolio content, and asks for a structured answer that includes a 'supported' flag. Anything unsupported gets an honest fallback and a link to the right page.",
        ],
        bullets: [
          "No retrieval or vector database: the whole knowledge base fits in one prompt.",
          "Placeholder content is excluded from what the model sees.",
          "Input length cap, per-visitor and daily limits, and a timeout protect cost and uptime.",
          "No conversations are stored.",
        ],
      },
      {
        id: "evals",
        heading: "Testing for hallucinations",
        status: "placeholder",
        body: [
          "Scenario: A 30-question test set — straightforward questions, questions with no answer in the content, and attempts to make it invent metrics or ignore its instructions. Fill in the results after running it.",
        ],
      },
      {
        id: "tradeoffs",
        heading: "Trade-offs",
        status: "review",
        body: [
          "A free model tier keeps cost near zero, but free-tier inputs may be used by the provider to improve its products, and its limits can change. The site states that and stores nothing itself.",
        ],
      },
    ],
    decisions: [
      {
        title: "No retrieval pipeline",
        context: "The approved content is a few thousand words.",
        options: ["Vector database with embeddings", "Keyword retrieval", "Send all approved content every time"],
        choice: "Send all approved content every time.",
        why: "It is the simplest thing that works at this size, and removes a whole class of retrieval errors.",
        status: "review",
      },
    ],
    artifacts: [
      { id: "architecture", title: "Assistant architecture", kind: "diagram", caption: "Curated layer, model layer, fallback.", status: "placeholder" },
      { id: "evals", title: "Eval results", kind: "chart", caption: "Pass rate by question type.", status: "placeholder" },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
