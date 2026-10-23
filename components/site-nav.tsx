"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAssistant } from "./assistant/assistant-provider";

const links = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav({ resumeHref }: { resumeHref: string }) {
  const path = usePathname();
  const { open } = useAssistant();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <div className="nav__inner">
        <Link href="/" className="nav__mark" aria-label="Saswat Dash, home">
          <span className="nav__dot" aria-hidden="true" />
          Saswat Dash
        </Link>
        <button
          className="nav__toggle"
          aria-expanded={menu}
          aria-controls="nav-links"
          onClick={() => setMenu((m) => !m)}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true">{menu ? "Close" : "Menu"}</span>
        </button>
        <nav id="nav-links" className={`nav__links ${menu ? "is-open" : ""}`} aria-label="Main">
          {links.map((l) => {
            const active = path === l.href || path.startsWith(l.href + "/");
            return (
              <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined} className="nav__link">
                {l.label}
              </Link>
            );
          })}
          <button className="nav__link nav__ask" onClick={() => open()}>
            Ask AI
          </button>
          <a className="btn btn--small" href={resumeHref} target="_blank" rel="noopener">
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
