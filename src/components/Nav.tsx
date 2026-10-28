import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { LimelightNav } from './limelight-nav';
import ExploreProgress from './ExploreProgress';
import { profile } from '../content';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactElement;
}

const Nav: React.FC<{ items: NavItem[] }> = ({ items }) => {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  // Close the mobile menu on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const sectionIds = useMemo(() => items.map((i) => i.id), [items]);
  const activeIndex = Math.max(0, items.findIndex((i) => i.id === active));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md" ref={menuRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-border text-sm font-bold text-foreground">
              SD
            </span>
            <span className="text-lg font-medium text-foreground">{profile.name}</span>
          </a>

          {/* Desktop: limelight (spotlight) navigation */}
          <div className="hidden lg:flex flex-1 justify-center">
            <LimelightNav
              items={items.map((i) => ({ id: i.id, icon: i.icon, label: i.label, href: `#${i.id}` }))}
              activeIndex={activeIndex}
              onTabChange={(index) => setActive(items[index].id)}
              className="bg-card/50 backdrop-blur-md border-border"
              limelightClassName="bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-blue-600 dark:to-teal-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <ExploreProgress ids={sectionIds} />
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden rounded-lg border border-border bg-card/50 p-2 backdrop-blur-md transition-colors hover:bg-card/80"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-3 pb-2">
            <ul className="grid grid-cols-1 gap-2 rounded-lg border border-border bg-card/50 p-3 backdrop-blur-md sm:grid-cols-2">
              {items.map((i) => (
                <li key={i.id}>
                  <a
                    href={`#${i.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition-colors ${
                      active === i.id ? 'border border-brand/30 bg-brand/15 text-brand' : 'text-foreground hover:bg-card/80'
                    }`}
                  >
                    {React.cloneElement(i.icon, { className: 'h-5 w-5 shrink-0' })}
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Nav;
