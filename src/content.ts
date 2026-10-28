/**
 * SINGLE SOURCE OF TRUTH FOR THE WHOLE SITE
 * -----------------------------------------
 * Every word, number and link on the portfolio lives in this file.
 * To update the site, edit here — no component changes needed.
 *
 * Proof of work: set `proof.url` to a public Google Drive / Slides / Docs
 * link (sharing: "Anyone with the link → Viewer") or to a file placed in
 * /public (e.g. "/proof/devlaunch-prd.pdf"). Items without a url show no
 * button in production; in `npm run dev` they show a dashed "Proof pending"
 * chip so you can see what's still missing.
 */

export type Domain = 'product' | 'analytics' | 'engineering' | 'operations';

export type Proof = {
  label: string; // button text, e.g. "Read the teardown"
  kind: 'pdf' | 'slides' | 'doc' | 'site' | 'figma' | 'code';
  url?: string;
};

export type Role = {
  id: string;
  title: string;
  org: string;
  orgUrl?: string;
  context: string; // sector / type of company
  location?: string;
  period: string;
  current?: boolean;
  domains: Domain[];
  summary: string;
  points: string[];
  proof?: Proof[];
};

export type Work = {
  id: string;
  title: string;
  context: string;
  period: string;
  domains: Domain[];
  summary: string;
  impact: { stat: string; label: string }[];
  proof?: Proof[];
  featured?: boolean;
};

export type Writing = {
  id: string;
  type: 'PRD' | 'Blog' | 'Teardown';
  title: string;
  summary: string;
  date?: string;
  url?: string;
};

export const profile = {
  name: 'Saswat Dash',
  role: 'Procurement Officer',
  org: 'Hindustan Petroleum Corporation Limited (HPCL)',
  orgShort: 'HPCL',
  location: 'Kolkata, West Bengal',
  headline: 'Engineer by training. Analyst by habit. Procurement at HPCL by day.',
  intro:
    'I’m a Procurement Officer at HPCL in Kolkata and an IIT Kharagpur dual-degree mechanical engineer. Before HPCL, I shipped products at early-stage startups, co-founded an AI wellness venture, and built analytics models on EV, hotel and inventory data. The common thread: turning messy requirements into decisions people can act on.',
  email: 'dashsaswat09@gmail.com',
  phone: '+91 88954 06527',
  linkedin: 'https://www.linkedin.com/in/saswatdash2003',
  github: 'https://github.com/saswat-projects-hub',
  // General résumé; each lens below can point to a tailored one.
  resumeUrl: '/Saswat_Dash_Resume.pdf',
};

export const highlights = [
  { stat: '#9', label: 'of 4,518 — American Express Campus Challenge' },
  { stat: '1st', label: 'of 7,000+ teams — Tata Elxsi TELIPORT (campus)' },
  { stat: '57%', label: 'MAU growth at InstaPrepsAI' },
  { stat: '50k+', label: 'EV trip records analysed at Vecmocon' },
];

export const roles: Role[] = [
  {
    id: 'hpcl',
    title: 'Procurement Officer',
    org: 'Hindustan Petroleum Corporation Limited',
    orgUrl: 'https://www.hindustanpetroleum.com/',
    context: 'Maharatna PSU · Oil & Gas',
    location: 'Kolkata',
    period: 'Aug 2026 – Present',
    current: true,
    domains: ['operations', 'engineering'],
    summary:
      'Own end-to-end procurement of materials and services for HPCL operations in the Kolkata region — from a department’s requirement to a delivered, paid-for order — within public-sector procurement norms.',
    points: [
      'Review indents from user departments and turn them into clear specifications, quantities and cost estimates',
      'Prepare and float tenders on e-procurement portals; handle bidder queries and pre-bid clarifications',
      'Run techno-commercial evaluation of bids with engineering and finance teams and recommend awards',
      'Issue purchase orders and contracts, then track delivery, inspection and vendor payments to closure',
      'Manage vendor relationships and performance while keeping every step transparent and audit-ready',
    ],
  },
  {
    id: 'nexorea',
    title: 'Co-Founder & Product Head',
    org: 'Nexorea',
    orgUrl: 'https://nexorea.com/',
    context: 'AI mental-wellness startup',
    period: 'May 2025 – Present',
    domains: ['product'],
    summary:
      'Building an empathetic AI companion and diary for mental wellness, from user research through a mobile-first MVP.',
    points: [
      'Ran 48 in-depth user interviews and 7 design sprints over a 12-week pre-MVP',
      'Stress-tested a mobile-first architecture for 6,000+ DAUs; prototypes hit <200 ms latency, 35% faster than baseline',
      'Prototyped a 5-persona voice AI with Google APIs — preferred by 68% of 80+ test users',
      'Built an AI mood dashboard and creative toolkit, validated with 150+ users',
    ],
    proof: [{ label: 'Visit nexorea.com', kind: 'site', url: 'https://nexorea.com/' }],
  },
  {
    id: 'instaprepsai',
    title: 'Product Management & Analyst Intern',
    org: 'InstaPrepsAI',
    context: 'B2B & B2C EdTech',
    period: 'Jun 2025 – Sep 2025',
    domains: ['product', 'analytics'],
    summary:
      'Took an assessment product from idea to launch in 9 days, then fixed the onboarding funnel behind stalled growth.',
    points: [
      'Directed a 6-member team to launch a Student Admin Assessment platform in 9 days',
      'Drove 57% MAU growth (to 1.8k+) with a relaunch strategy built on behavioural analysis and A/B tests',
      'Lifted onboarding activation 18% through cohort and funnel analysis on 3,000+ users',
      'Cut iteration time 50% by leading rapid prototyping with Lovable and Google AI Studio',
    ],
  },
  {
    id: 'devlaunch',
    title: 'Product Management Intern',
    org: 'Devlaunch',
    context: 'B2B SaaS',
    period: 'Apr 2025 – Jun 2025',
    domains: ['product'],
    summary: 'Made a product users visited but didn’t return to into a habit.',
    points: [
      'Grew DAU 5% by integrating gamification — streaks and badges',
      'Cut bounce rate 12% by running 37 user interviews and turning the insights into PRDs',
      'Raised engagement 10% by launching community forums and personalised event reminders',
    ],
  },
  {
    id: 'habuild',
    title: 'Product Management Intern',
    org: 'Habuild',
    context: 'B2C Health-tech',
    period: 'Aug 2024 – Nov 2024',
    domains: ['product'],
    summary: 'Worked on retention for a large online yoga community.',
    points: [
      'Increased class attendance 19% in 3 months by launching “Yoga Together” and “Pause My Subscription”',
    ],
  },
  {
    id: 'vecmocon',
    title: 'Data Analyst & Strategy Intern',
    org: 'Vecmocon Technologies',
    context: 'EV intelligence',
    period: 'May 2024 – Jul 2024',
    domains: ['analytics', 'engineering'],
    summary:
      'Built the analysis behind EV-driver income prediction for an NBFC leasing programme.',
    points: [
      'Analysed 50,000+ EV trip records in SQL to map demand shifts, income variability and route-level supply gaps',
      'Improved route categorisation 27% using OpenStreetMap road tags, speed trends and stop density',
      'Correlated SONAR occupancy with BMS energy use to estimate passenger load',
      'Contributed analysis to UN Green Climate Fund project reporting',
    ],
  },
  {
    id: 'podhikal',
    title: 'Product Development Intern',
    org: 'Podhikal Scientific Pvt. Ltd.',
    context: 'Scientific instruments',
    period: 'May 2023 – Jul 2023',
    domains: ['engineering'],
    summary: 'Mechanical design for a thin-film coating instrument.',
    points: [
      'Modelled and optimised the XY motion-controller assembly in SolidWorks to minimise vibration',
      'Prototyped the motion-control unit in lightweight alloys, cutting weight 12%',
      'Designed a micro-fluid cap geometry to control droplet size and spray angle for uniform coating',
    ],
  },
];

export const work: Work[] = [
  {
    id: 'instaprepsai-teardown',
    title: 'InstaPrepsAI onboarding teardown',
    context: 'Product teardown',
    period: '2025',
    domains: ['product'],
    featured: true,
    summary:
      'Walked the full onboarding journey of an AI exam-prep app for Tier 2/3 students and recommended changes to surface confidence analytics earlier, explain permission prompts, and cut OTP friction.',
    impact: [
      { stat: '7-min', label: 'confidence test analysed end to end' },
      { stat: '3', label: 'priority fixes recommended' },
    ],
    proof: [
      {
        label: 'Read the teardown',
        kind: 'pdf',
        url: 'https://drive.google.com/file/d/1PglgbVnXtXXJofJhgjLO8sOMpYDagbwQ/view?usp=sharing',
      },
    ],
  },
  {
    id: 'bookverse',
    title: 'BookVerse — social reading app',
    context: 'Product case study · MVP on Lovable + Supabase',
    period: 'Sep 2025',
    domains: ['product'],
    featured: true,
    summary:
      'Readers’ notes stay trapped in Kindle while book talk happens on BookTok and Discord. Took a social reading app from problem and hypothesis through RICE and MoSCoW prioritisation to a working MVP and a validation plan.',
    impact: [
      { stat: '90+', label: 'sources analysed in research' },
      { stat: '5', label: 'competing platforms benchmarked' },
    ],
    proof: [{ label: 'Read the case study', kind: 'pdf', url: '/proof/bookverse-case-study.pdf' }],
  },
  {
    id: 'smartchef',
    title: 'SmartChef — cooking companion app',
    context: 'Product design case study',
    period: 'Nov 2025',
    domains: ['product'],
    featured: true,
    summary:
      'Designed a mobile app that answers “what can I cook?” by scanning the ingredients you have, then guides you through recipes with linked timers and an auto-generated grocery list.',
    impact: [
      { stat: '7', label: 'step journey from scan to grocery list' },
      { stat: '3', label: 'step onboarding' },
    ],
    proof: [{ label: 'Read the case study', kind: 'pdf', url: '/proof/smartchef-case-study.pdf' }],
  },
  {
    id: 'clariorx',
    title: 'ClarioRx — prior authorisation agent',
    context: 'Product design assignment · Healthcare AI',
    period: 'Nov 2025',
    domains: ['product'],
    featured: true,
    summary:
      'Designed an AI agentic browser that reads the patient record, fills prior authorisation forms and leaves only the clinical judgement to the coordinator, with confidence scores and a source for every extracted field.',
    impact: [
      { stat: '4', label: 'core screens, dashboard to analytics' },
      { stat: '1', label: 'human sign-off step kept in the loop' },
    ],
    proof: [
      { label: 'Read the design rationale', kind: 'pdf', url: '/proof/clariorx-design-assignment.pdf' },
      {
        label: 'Open in Figma',
        kind: 'figma',
        url: 'https://www.figma.com/design/TZIRnKSvCs1XFM41dvKstv/Risa-Lab?node-id=20-4214&t=ln36qrBr7Zj46JKd-1',
      },
    ],
  },
  {
    id: 'teliport',
    title: 'Tata Elxsi TELIPORT — navigation concept',
    context: 'National competition · Campus Winner',
    period: 'Sep – Oct 2023',
    domains: ['engineering', 'product'],
    featured: true,
    summary:
      'Navigation degrades in dense cities where GPS signals bounce. Proposed algorithm changes to reduce multipath interference and a tool suite to detect signal errors.',
    impact: [
      { stat: '1st', label: 'on campus, of 7,000+ teams nationally' },
      { stat: '27%', label: 'navigation accuracy improvement' },
    ],
    proof: [
      {
        label: 'View the deck',
        kind: 'slides',
        url: 'https://docs.google.com/presentation/d/1eRT-9emmatmp7XKHnSbpCxF58C1QCHfE/view',
      },
    ],
  },
  {
    id: 'vendor-analytics',
    title: 'Vendor performance & profitability',
    context: 'Analytics project',
    period: 'Jul – Aug 2025',
    domains: ['analytics', 'operations'],
    featured: true,
    summary:
      'Which vendors actually make money, and where is capital stuck on shelves? Statistical analysis of 10k+ sales and inventory records.',
    impact: [
      { stat: '$2.71M', label: 'slow-moving inventory exposed' },
      { stat: '65.7%', label: 'over-reliance on top vendors found' },
      { stat: '72%', label: 'unit-cost cut via bulk-purchase regression' },
    ],
    proof: [{ label: 'View analysis', kind: 'code' }],
  },
  {
    id: 'atliq',
    title: 'AtliQ Hotels revenue optimisation',
    context: 'Analytics project',
    period: 'Jun – Jul 2025',
    domains: ['analytics'],
    featured: true,
    summary:
      'Occupancy and pricing strategy for a 25-property hotel portfolio, with a phased roadmap to 65% occupancy.',
    impact: [
      { stat: '46,134', label: 'room-night upside identified' },
      { stat: '22.2 pts', label: 'weekend vs weekday gap' },
      { stat: '+7.3 pts', label: 'Standard occupancy from a 15% discount' },
    ],
    proof: [{ label: 'View dashboard', kind: 'pdf' }],
  },
  {
    id: 'artisanal',
    title: 'AirtCraft — B2B art marketplace',
    context: 'Startup · Co-founder · grew out of my B.Tech thesis at IIT Kharagpur',
    period: '2024 – 2026',
    domains: ['product'],
    featured: true,
    summary:
      'Connected corporates and interior designers with verified Indian artists. Thesis research led us to pivot from a broad consumer marketplace to B2B, and we launched a quote-based platform. It is now on hold.',
    impact: [
      { stat: '481', label: 'artists & buyers surveyed' },
      { stat: '3', label: 'stakeholder groups interviewed before the pivot' },
      { stat: '4', label: 'user dashboards built and launched' },
    ],
    proof: [{ label: 'Read the report', kind: 'pdf', url: '/proof/airtcraft-project-report.pdf' }],
  },
  {
    id: 'warm-forming',
    title: 'Warm forming of magnesium alloys',
    context: 'M.Tech project · IIT Kharagpur',
    period: 'Aug 2025 – 2026',
    domains: ['engineering'],
    featured: true,
    summary:
      'Process development for Single Point Incremental Forming of magnesium sheet at elevated temperature.',
    impact: [
      { stat: '+55%', label: 'formability vs room temperature' },
      { stat: '0.4 mm', label: 'wall thickness achieved' },
      { stat: '25%', label: 'finer grains at warm forming' },
    ],
    proof: [{ label: 'Read the thesis', kind: 'pdf' }],
  },
  {
    id: 'zomato',
    title: 'Zomato review engagement',
    context: 'NextLeap PM Fellowship · Top Fellow',
    period: 'Jun – Jul 2024',
    domains: ['product'],
    summary:
      'Ratings without substance weaken trust. Designed UI changes and a measurement framework to get more detailed reviews.',
    impact: [{ stat: '+24%', label: 'projected detailed reviews' }],
    proof: [{ label: 'Read the case study', kind: 'pdf' }],
  },
  {
    id: 'amex',
    title: 'American Express Campus Challenge',
    context: 'Decision Science track',
    period: 'Jun – Jul 2024',
    domains: ['analytics'],
    summary:
      'Predicted T20 match winners with XGBoost/CatBoost ensembles, SMOTE for class imbalance and grid-search tuning.',
    impact: [
      { stat: '#9', label: 'of 4,518 participants' },
      { stat: '+26%', label: 'accuracy from tuning' },
    ],
    proof: [{ label: 'View code', kind: 'code' }],
  },
  {
    id: 'risk-dashboard',
    title: 'Banking risk analytics dashboard',
    context: 'Analytics project · Power BI',
    period: 'Sep – Oct 2024',
    domains: ['analytics'],
    summary:
      'A Power BI dashboard over 188 client profiles that tracks loans, deposits and fees against goals, with breakdowns by income band and nationality.',
    impact: [
      { stat: '$251M', label: 'loans & deposits in one view' },
      { stat: '188', label: 'client profiles with drill-down' },
    ],
    proof: [
      { label: 'Read the report', kind: 'pdf', url: '/proof/banking-dashboard-report.pdf' },
      { label: 'View the deck', kind: 'slides', url: '/proof/banking-dashboard-deck.pdf' },
    ],
  },
  {
    id: 'fraud',
    title: 'Credit card fraud detection',
    context: 'ML project',
    period: '2024',
    domains: ['analytics'],
    summary: 'Random Forest classifier on a heavily imbalanced dataset, using random under-sampling.',
    impact: [
      { stat: '86.1%', label: 'F1 score' },
      { stat: '81.1%', label: 'accuracy' },
    ],
    proof: [{ label: 'View code', kind: 'code' }],
  },
];

/**
 * PRDs and blogs. Only items with a `url` are shown on the live site.
 * Add new ones as you upload them.
 */
export const writing: Writing[] = [
  {
    id: 'prd-test-scheduling',
    type: 'PRD',
    title: 'Test Scheduling Module',
    summary:
      'Scheduling tests by board and class or by student, with confidence assessment, question tagging and synced admin and student portals.',
    date: 'Jul 2025',
    url: '/proof/prd-test-scheduling-module.pdf',
  },
  {
    id: 'prd-instaprepsai',
    type: 'PRD',
    title: 'InstaPrepsAI — Student Admin Assessment platform',
    summary: 'Requirements for the assessment platform launched in 9 days.',
  },
  {
    id: 'prd-devlaunch',
    type: 'PRD',
    title: 'Devlaunch — gamification & community features',
    summary: 'Streaks, badges, forums and event reminders, from 37 user interviews.',
  },
  {
    id: 'prd-nexorea',
    type: 'PRD',
    title: 'Nexorea — AI companion & persona voice',
    summary: 'Conversation flows, personas and privacy requirements for the MVP.',
  },
  {
    id: 'prd-habuild',
    type: 'PRD',
    title: 'Habuild — Yoga Together & Pause My Subscription',
    summary: 'The two features behind the 19% attendance lift.',
  },
];

// In production only published pieces (with a url) appear; in dev, pending ones show too.
export const visibleWriting = writing.filter((w) => w.url || import.meta.env.DEV);

export const education = {
  degree: 'B.Tech (Hons.) Mechanical Engineering + M.Tech Manufacturing Science & Engineering',
  school: 'Indian Institute of Technology Kharagpur',
  detail: '5-year Dual Degree · 2021 – 2026',
  cgpa: '7.11 / 10',
  extras: ['Qualified GATE 2024 (Mechanical)'],
};

export const leadership = [
  {
    title: 'Governor',
    org: 'Public Policy & Governance Society, IIT Kharagpur',
    period: 'May 2023 – May 2024',
    points: [
      'Led an 86-member team; ran a governance awareness programme across 15+ cities reaching 10,000+ people',
      'Started the Diplomatic Discourse Series with ambassadors and consuls general',
    ],
  },
  {
    title: 'LiGHT Head',
    org: 'Gopali Youth Welfare Society',
    period: 'Jan 2022 – Jun 2024',
    points: [
      'Led 13 LiGHT centres serving 450+ students; raised ₹3L+ in the annual fundraiser',
    ],
  },
  {
    title: 'Secretary, Culinary Arts Subcommittee',
    org: 'Technology Students’ Gymkhana, IIT Kharagpur',
    period: 'Oct 2022 – Apr 2023',
    points: ['Ran logistics for 40+ events engaging 15,000+ students'],
  },
];

export const skills: { group: string; domain: Domain; items: string[] }[] = [
  {
    group: 'Procurement & Operations',
    domain: 'operations',
    items: ['Tendering', 'Bid evaluation', 'Vendor management', 'Contract management', 'Cost estimation', 'Inventory analysis'],
  },
  {
    group: 'Product',
    domain: 'product',
    items: ['User research', 'PRDs', 'A/B testing', 'Figma', 'JIRA', 'Notion', 'RICE', 'AARRR', 'HEART', 'JTBD'],
  },
  {
    group: 'Analytics',
    domain: 'analytics',
    items: ['SQL', 'Python', 'Pandas', 'Scikit-learn', 'Power BI', 'Tableau', 'Excel', 'Amplitude', 'CleverTap', 'Hypothesis testing', 'Regression'],
  },
  {
    group: 'Engineering',
    domain: 'engineering',
    items: ['SolidWorks', 'AutoCAD', 'Fusion 360', 'NX', 'MATLAB', 'Mastercam', 'CNC', 'Metal forming', 'Failure analysis'],
  },
];

export const domainLabels: Record<Domain, string> = {
  operations: 'Operations',
  product: 'Product',
  analytics: 'Analytics',
  engineering: 'Engineering',
};

/**
 * "I'm hiring for…" lenses. Picking one reorders the whole site around that
 * kind of role and swaps the headline and highlight numbers. Shareable via
 * ?for=<id> in the URL, e.g. yoursite.com/?for=product
 */
export type LensId = 'all' | Domain;

export type Lens = {
  id: LensId;
  label: string;
  pitch: string; // replaces the headline under the name
  highlights: { stat: string; label: string }[];
  resumeUrl?: string; // optional tailored résumé for this lens
};

export const lenses: Lens[] = [
  {
    id: 'all',
    label: 'Everything',
    pitch: profile.headline,
    highlights,
  },
  {
    id: 'operations',
    label: 'Procurement & Ops',
    pitch: 'Procurement Officer at HPCL — engineering judgment and data discipline applied to buying right.',
    resumeUrl: '/Saswat_Dash_Resume_Procurement.pdf',
    highlights: [
      { stat: 'HPCL', label: 'Procurement Officer, Kolkata — since Aug 2026' },
      { stat: '$2.71M', label: 'slow-moving inventory exposed in vendor analysis' },
      { stat: '65.7%', label: 'vendor concentration risk identified' },
      { stat: 'GATE', label: 'Qualified 2024 · Mechanical' },
    ],
  },
  {
    id: 'product',
    label: 'Product',
    pitch: 'Product manager who ships fast and proves impact with data — 3 PM internships and a co-founded AI startup.',
    resumeUrl: '/Saswat_Dash_Resume_Product_Manager.pdf',
    highlights: [
      { stat: '9 days', label: 'idea to launched platform at InstaPrepsAI' },
      { stat: '57%', label: 'MAU growth at InstaPrepsAI' },
      { stat: '48', label: 'user interviews for Nexorea' },
      { stat: 'Top', label: 'PM Fellow — NextLeap (Zomato case)' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    pitch: 'Analyst who turns messy operational data — EV telemetry, hotels, inventory — into decisions.',
    resumeUrl: '/Saswat_Dash_Resume_Analyst.pdf',
    highlights: [
      { stat: '#9', label: 'of 4,518 — American Express Campus Challenge' },
      { stat: '50k+', label: 'EV trip records analysed at Vecmocon' },
      { stat: '46,134', label: 'room-night upside found for AtliQ Hotels' },
      { stat: '18%', label: 'onboarding activation lift from funnel analysis' },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    pitch: 'IIT Kharagpur mechanical & manufacturing engineer — from SolidWorks design to forming research.',
    resumeUrl: '/Saswat_Dash_Resume_Engineering.pdf',
    highlights: [
      { stat: '+55%', label: 'formability in magnesium warm forming (M.Tech)' },
      { stat: '1st', label: 'of 7,000+ teams — Tata Elxsi TELIPORT (campus)' },
      { stat: '−12%', label: 'motion-unit weight at Podhikal Scientific' },
      { stat: 'GATE', label: 'Qualified 2024 · Mechanical' },
    ],
  },
];

/** Sort items so those matching the lens come first, keeping original order otherwise. */
export const byLens = <T extends { domains: Domain[] }>(items: T[], lens: LensId): T[] =>
  lens === 'all'
    ? items
    : [...items.filter((i) => i.domains.includes(lens)), ...items.filter((i) => !i.domains.includes(lens))];
