import React, { createContext, useContext, useEffect, useState } from 'react';
import { lenses, type Lens, type LensId } from '../content';

interface LensContextType {
  lens: Lens;
  setLens: (id: LensId) => void;
}

const LensContext = createContext<LensContextType | undefined>(undefined);

export const useLens = () => {
  const context = useContext(LensContext);
  if (context === undefined) throw new Error('useLens must be used within a LensProvider');
  return context;
};

const readFromUrl = (): LensId => {
  const id = new URLSearchParams(window.location.search).get('for');
  return lenses.some((l) => l.id === id) ? (id as LensId) : 'all';
};

// The selected lens lives in the URL (?for=product) so a tailored view can be shared with a recruiter.
export const LensProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [id, setId] = useState<LensId>(readFromUrl);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (id === 'all') url.searchParams.delete('for');
    else url.searchParams.set('for', id);
    window.history.replaceState(null, '', url);
  }, [id]);

  const lens = lenses.find((l) => l.id === id) ?? lenses[0];

  return <LensContext.Provider value={{ lens, setLens: setId }}>{children}</LensContext.Provider>;
};
