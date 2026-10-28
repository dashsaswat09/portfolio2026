import React from 'react';
import { MapPin, Calendar, Trophy, Users, Settings, BarChart3 } from 'lucide-react';

interface AboutSectionProps {
  setActiveTab: (tab: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full mx-auto mb-8 flex items-center justify-center">
          <img
            src="src/assets/images/Profile photo.jpeg"
            alt="profile Logo"
            className="w-50 h-50 object-cover rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Saswat Dash
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          Multi-disciplinary professional with expertise in Product Management, Data Analytics, and Mechanical Engineering
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 text-gray-500">
          <div className="flex items-center space-x-2">
            <MapPin size={18} />
            <span>IIT Kharagpur</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={18} />
            <span>Expected Graduation: 2026</span>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300 mb-6 text-center">Professional Summary</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div 
            className="text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => setActiveTab('product')}
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Management</h3>
            <p className="text-gray-600">
              Driving user growth and product innovation through data-driven decision making and strategic thinking
            </p>
          </div>
          <div 
            className="text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => setActiveTab('data')}
          >
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data & Analytics</h3>
            <p className="text-gray-600">
              Leveraging advanced analytics and machine learning to extract insights and optimize business performance
            </p>
          </div>
          <div 
            className="text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => setActiveTab('mechanical')}
          >
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mechanical Core</h3>
            <p className="text-gray-600">
              Expertise in design, manufacturing, and process optimization with hands-on engineering experience
            </p>
          </div>
        </div>
      </div>

      {/* Key Achievements */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="text-yellow-500" size={32} />
            <span className="text-2xl font-bold text-gray-900">9th</span>
          </div>
          <p className="text-gray-600">American Express Campus Challenge out of 4,518 participants</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-blue-500" size={32} />
            <span className="text-2xl font-bold text-gray-900">67%</span>
          </div>
          <p className="text-gray-600">MAU growth achieved at InstaPrepsAI through strategic relaunch</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="text-teal-500" size={32} />
            <span className="text-2xl font-bold text-gray-900">85%</span>
          </div>
          <p className="text-gray-600">Model accuracy achieved in AtliQ Hotels Revenue Optimization</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <Settings className="text-orange-500" size={32} />
            <span className="text-2xl font-bold text-gray-900">55%</span>
          </div>
          <p className="text-gray-600">Increase in formability through warm forming process development</p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;