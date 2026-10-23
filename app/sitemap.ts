import type { MetadataRoute } from "next";
import { caseStudies, profile } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/experience", "/about", "/contact"].map((p) => ({ url: `${profile.site}${p}` }));
  const cases = caseStudies.map((c) => ({ url: `${profile.site}/work/${c.slug}` }));
  return [...pages, ...cases];
}
