import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans-condensed/500.css";
import "@fontsource/ibm-plex-sans-condensed/600.css";
import "./globals.css";
import { profile } from "@/content";
import { SiteNav } from "@/components/site-nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { AssistantProvider } from "@/components/assistant/assistant-provider";

const description =
  "Saswat Dash — engineer turned product builder. Case studies in onboarding, retention and AI products from InstaPrepsAI, Nexorea and Habuild.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: "Saswat Dash — Product Manager", template: "%s · Saswat Dash" },
  description,
  openGraph: {
    type: "website",
    url: profile.site,
    siteName: "Saswat Dash",
    title: "Saswat Dash — Product Manager",
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Saswat Dash — The Product Universe" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#05070f", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <AssistantProvider>
          <SiteNav resumeHref={profile.resume.href} />
          <main id="main">{children}</main>
          <footer className="footer">
            <div className="wrap footer__inner">
              <div>
                <p className="footer__name">{profile.name}</p>
                <p className="muted">Product · {profile.education.school} {profile.education.year}</p>
              </div>
              <nav aria-label="Footer" className="footer__links">
                <a href={`mailto:${profile.email}`}>Email</a>
                <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
                <a href={profile.github} target="_blank" rel="noopener">GitHub</a>
                <a href={profile.resume.href} target="_blank" rel="noopener">Resume</a>
                <Link href="/contact">Contact</Link>
              </nav>
            </div>
          </footer>
        </AssistantProvider>
      </body>
    </html>
  );
}
