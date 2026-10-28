import { lazy, Suspense, useEffect, useState } from 'react';
import { User, Briefcase, FolderOpen, Gamepad2, PenTool, GraduationCap, Mail } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LensProvider } from './contexts/LensContext';
import Nav, { type NavItem } from './components/Nav';
import ShootingStarsBackground from './components/ShootingStarsBackground';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Work from './components/Work';
import TenderGame from './components/TenderGame';
import Writing from './components/Writing';
import About from './components/About';
import Contact from './components/Contact';
import { profile, visibleWriting } from './content';

// three.js is large, so the aurora loads in its own chunk, and only once the browser is idle after
// the first paint. The hero text and résumé button never wait on it.
const AuroraBackground = lazy(() => import('./components/AuroraBackground'));

const useAfterFirstPaint = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const start = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 800);
    return () => clearTimeout(id);
  }, []);
  return ready;
};

const navItems: NavItem[] = [
  { id: 'top', label: 'About', icon: <User /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase /> },
  { id: 'work', label: 'Work', icon: <FolderOpen /> },
  { id: 'play', label: 'Try my job', icon: <Gamepad2 /> },
  ...(visibleWriting.length ? [{ id: 'writing', label: 'Writing', icon: <PenTool /> }] : []),
  { id: 'about', label: 'Background', icon: <GraduationCap /> },
  { id: 'contact', label: 'Contact', icon: <Mail /> },
];

function App() {
  const showAurora = useAfterFirstPaint();

  return (
    <ThemeProvider>
      <LensProvider>
        <div className="page-bg" aria-hidden />
        <ShootingStarsBackground />
        {showAurora && (
          <Suspense fallback={null}>
            <AuroraBackground />
          </Suspense>
        )}
        <a href="#experience" className="skip-link">Skip to content</a>
        <Nav items={navItems} />
        <main>
          <Hero />
          <Experience />
          <Work />
          <TenderGame />
          <Writing />
          <About />
          <Contact />
        </main>
        <footer className="border-t border-border py-8">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row justify-between gap-2 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} {profile.name}</p>
            <p>{profile.role}, {profile.orgShort} · {profile.location}</p>
          </div>
        </footer>
      </LensProvider>
    </ThemeProvider>
  );
}

export default App;
