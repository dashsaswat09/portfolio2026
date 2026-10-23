import type { MetadataRoute } from "next";
import { profile } from "@/content";

export default function robots(): MetadataRoute.Robots {
  // Keep preview deployments (which show placeholders) out of search engines.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${profile.site}/sitemap.xml` };
}
