import React from 'react';
import { ChevronLeft } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface SectionHeaderProps {
  title: string;
  onBackClick: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onBackClick }) => {
  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={onBackClick}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors inter-font text-sm"
          >
            <ChevronLeft size={16} />
            Back to About
          </button>
          <h1 className="text-xl font-semibold text-foreground geist-font">{title}</h1>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default SectionHeader;

