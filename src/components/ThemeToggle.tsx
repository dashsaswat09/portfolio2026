import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className={`theme-toggle-thumb flex items-center justify-center ${theme === 'dark' ? 'dark' : ''}`}>
        {theme === 'light' ? <Sun size={10} className="text-amber-600" /> : <Moon size={10} className="text-gray-700" />}
      </span>
    </button>
  );
};

export default ThemeToggle;
