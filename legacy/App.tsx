import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import CustomLimelightNav from './components/CustomLimelightNav';
import StarfallAboutSection from './components/StarfallAboutSection';
import ProductManagementSection from './components/ProductManagementSection';
import DataAnalyticsSection from './components/DataAnalyticsSection';
import MechanicalSection from './components/MechanicalSection';
import EducationSection from './components/EducationSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';

function App() {
  const [activeTab, setActiveTab] = useState('about');

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'about':
        return <StarfallAboutSection setActiveTab={setActiveTab} />;
      case 'product':
        return <ProductManagementSection setActiveTab={setActiveTab} />;
      case 'data':
        return <DataAnalyticsSection setActiveTab={setActiveTab} />;
      case 'mechanical':
        return <MechanicalSection setActiveTab={setActiveTab} />;
      case 'education':
        return <EducationSection setActiveTab={setActiveTab} />;
      case 'resume':
        return <ResumeSection setActiveTab={setActiveTab} />;
      case 'contact':
        return <ContactSection setActiveTab={setActiveTab} />;
      default:
        return <StarfallAboutSection setActiveTab={setActiveTab} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <CustomLimelightNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>
          {renderActiveSection()}
        </main>
        
        {/* Footer */}
        <footer className="bg-background border-t border-border py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground inter-font">
              © 2025 Saswat Dash. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;