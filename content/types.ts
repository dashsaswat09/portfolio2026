// Shared types for all portfolio content.
//
// Every claim carries a `status`:
//   verified    – Saswat has confirmed it word for word.
//   review      – taken from his resume or old site; true as far as we know, but not yet re-confirmed.
//   placeholder – a best-case scenario written to show the shape of the content. NOT true until replaced.
//
// Placeholders are shown with a badge in development and Vercel previews, are hidden in
// production (VERCEL_ENV=production), and are never sent to the AI assistant.

export type Status = "verified" | "review" | "placeholder";

export type Ownership = "owned" | "contributed" | "team" | "independent";

export type LinkItem = { label: string; href: string };

export type Metric = {
  label: string;
  value: string;
  /** Baseline and measurement window, e.g. "vs. the 4 weeks before launch". */
  context?: string;
  status: Status;
};

export type Decision = {
  title: string;
  context: string;
  options?: string[];
  choice: string;
  why: string;
  status: Status;
};

export type ArtifactKind = "screenshot" | "dashboard" | "prd" | "figma" | "diagram" | "document" | "chart";

export type Artifact = {
  id: string;
  title: string;
  kind: ArtifactKind;
  caption: string;
  /** Path under /public, e.g. "/artifacts/instaprepsai/funnel.png". Empty until uploaded. */
  file?: string;
  /** External link (Figma, Google Doc) instead of a file. */
  href?: string;
  status: Status;
};

export type Section = {
  id: string;
  heading: string;
  status: Status;
  body: string[];
  bullets?: string[];
};

export type Planet = {
  /** Two colours for the procedural planet: lit side, shadow side. */
  light: string;
  dark: string;
  ring?: boolean;
};

export type CaseStudy = {
  slug: string;
  company: string;
  role: string;
  period: string;
  domain: string;
  ownership: Ownership;
  title: string;
  oneLiner: string;
  tags: string[];
  planet: Planet;
  summary: { problem: string; did: string; outcome: string; status: Status };
  metrics: Metric[];
  sections: Section[];
  decisions: Decision[];
  artifacts: Artifact[];
};

export type ExperienceItem = {
  org: string;
  role: string;
  period: string;
  kind: "full-time" | "internship" | "startup" | "fellowship";
  ownership: Ownership;
  line: string;
  details?: string[];
  tools?: string[];
  slug?: string;
  status: Status;
};
