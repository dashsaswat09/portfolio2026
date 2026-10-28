import React, { useState, useEffect, useRef } from 'react';
import { LimelightNav } from './limelight-nav';
import { User, Settings, BarChart3, Cog, GraduationCap, Mail, FileText, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface CustomLimelightNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CustomLimelightNav: React.FC<CustomLimelightNavProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { 
      id: 'about', 
      icon: <User />, 
      label: 'About',
      onClick: () => {
        setActiveTab('about');
        setIsMobileMenuOpen(false);
      }
    },
    { 
      id: 'product', 
      icon: <Settings />, 
      label: 'Product Management',
      onClick: () => {
        setActiveTab('product');
        setIsMobileMenuOpen(false);
      }
    },
    { 
      id: 'data', 
      icon: <BarChart3 />, 
      label: 'Data Analytics',
      onClick: () => {
        setActiveTab('data');
        setIsMobileMenuOpen(false);
      }
    },
    { 
      id: 'mechanical', 
      icon: <Cog />, 
      label: 'Mechanical Core',
      onClick: () => {
        setActiveTab('mechanical');
        setIsMobileMenuOpen(false);
      }
    },
    { 
      id: 'education', 
      icon: <GraduationCap />, 
      label: 'Education',
      onClick: () => {
        setActiveTab('education');
        setIsMobileMenuOpen(false);
      }
    },
    { 
      id: 'resume', 
      icon: <FileText />, 
      label: 'Resume',
      onClick: () => {
        setActiveTab('resume');
        setIsMobileMenuOpen(false);
      }
    },
    { 
      id: 'contact', 
      icon: <Mail />, 
      label: 'Contact',
      onClick: () => {
        setActiveTab('contact');
        setIsMobileMenuOpen(false);
      }
    }
  ];

  const activeIndex = navItems.findIndex(item => item.id === activeTab);

  return (
    <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-border backdrop-blur-md border border-border flex items-center justify-center">
              <span className="geist-font text-sm font-bold text-foreground">SD</span>
            </div>
            <span className="geist-font text-lg font-medium text-foreground">Saswat Dash</span>
          </div>

          {/* Desktop Limelight Navigation */}
          <div className="hidden xl:flex flex-1 justify-center">
            <LimelightNav
              items={navItems}
              activeIndex={activeIndex}
              onTabChange={(index) => navItems[index]?.onClick?.()}
              className="bg-card/50 backdrop-blur-md border-border "
              limelightClassName="bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-blue-600 dark:to-teal-600"
            />
          </div>

          {/* Tablet Navigation (simplified) */}
          <div className="hidden lg:flex xl:hidden flex-1 justify-center">
            <div className="flex items-center space-x-1 bg-card/50 backdrop-blur-md border border-border rounded-lg p-1">
              {navItems.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-card/80 text-foreground'
                  }`}
                  title={item.label}
                >
                  <span className="w-4 h-4">{item.icon}</span>
                </button>
              ))}
              <div className="w-px h-6 bg-border mx-1" />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md hover:bg-card/80 text-foreground transition-colors duration-200"
                title="More"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden lg:flex items-center">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-card/50 backdrop-blur-md border border-border hover:bg-card/80 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4" ref={mobileMenuRef}>
            <div className="bg-card/50 backdrop-blur-md border border-border rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'hover:bg-card/80 text-foreground'
                    }`}
                  >
                    <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>
                    <span className="text-sm font-medium text-left">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tablet Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="hidden lg:flex xl:hidden mt-4 pb-4">
            <div className="bg-card/50 backdrop-blur-md border border-border rounded-lg p-4 w-full">
              <div className="flex flex-wrap gap-2 justify-center">
                {navItems.slice(4).map((item) => (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'hover:bg-card/80 text-foreground'
                    }`}
                  >
                    <span className="w-4 h-4">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomLimelightNav;
