import React from 'react';
import { Download, FileText, Calendar, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import ShootingStarsBackground from './ShootingStarsBackground';

interface ResumeSectionProps {
  setActiveTab: (tab: string) => void;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ setActiveTab }) => {
  const handleDownloadResume = () => {
    // In a real implementation, this would download the actual resume PDF
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume URL
    link.download = 'Saswat_Dash_Resume.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen relative bg-background text-foreground overflow-hidden">
      <ShootingStarsBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 geist-font">Resume</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto inter-font">
            Download my resume to learn more about my experience and qualifications
          </p>
        </div>

        {/* Resume Preview Card */}
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
                <FileText className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white geist-font">Saswat Dash - Resume</h2>
                <p className="text-gray-700 dark:text-gray-300 inter-font">Multi-disciplinary Professional</p>
              </div>
            </div>
            <button
              onClick={handleDownloadResume}
              className="primary-button px-6 py-3 rounded-lg font-medium text-sm flex items-center gap-2"
            >
              <Download size={16} />
              Download PDF
            </button>
          </div>

          {/* Resume Preview Content */}
          <div className="bg-white/20 dark:bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10">
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="border-b border-white/20 dark:border-white/10 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">saswat.dash.iitkgp@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">+91 8895406527</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Kharagpur, West Bengal, India</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Expected Graduation: 2026</span>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="border-b border-white/20 dark:border-white/10 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Professional Summary</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Multi-disciplinary professional with expertise in Product Management, Data Analytics, and Mechanical Engineering. 
                  Currently pursuing degree at IIT Kharagpur with proven track record of driving user growth, implementing data-driven solutions, 
                  and delivering innovative engineering solutions.
                </p>
              </div>

              {/* Key Achievements */}
              <div className="border-b border-white/20 dark:border-white/10 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Achievements</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• 9th place in American Express Campus Challenge out of 4,518 participants</li>
                  <li>• 67% MAU growth achieved at InstaPrepsAI through strategic relaunch</li>
                  <li>• 85% model accuracy achieved in AtliQ Hotels Revenue Optimization</li>
                  <li>• 55% increase in formability through warm forming process development</li>
                </ul>
              </div>

              {/* Core Competencies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Core Competencies</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Product Management</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Strategic Planning</li>
                      <li>• User Research</li>
                      <li>• A/B Testing</li>
                      <li>• Growth Analytics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Data Analytics</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Machine Learning</li>
                      <li>• Python Programming</li>
                      <li>• Data Visualization</li>
                      <li>• Statistical Analysis</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Mechanical Engineering</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• CAD Design</li>
                      <li>• Manufacturing</li>
                      <li>• Process Optimization</li>
                      <li>• Materials Engineering</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            For detailed experience and project information, please download the full resume or explore the individual sections.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('product')}
              className="glass-button px-6 py-3 rounded-lg font-medium text-sm"
            >
              View Product Experience
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className="glass-button px-6 py-3 rounded-lg font-medium text-sm"
            >
              View Analytics Projects
            </button>
            <button
              onClick={() => setActiveTab('mechanical')}
              className="glass-button px-6 py-3 rounded-lg font-medium text-sm"
            >
              View Engineering Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;

