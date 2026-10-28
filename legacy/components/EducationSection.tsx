import React from 'react';
import TiltCard from './TiltCard';
import ShootingStarsBackground from './ShootingStarsBackground';
import { GraduationCap, Award, Users, Target, BookOpen } from 'lucide-react';

interface EducationSectionProps {
  setActiveTab: (tab: string) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({ setActiveTab }) => {
  const positionsOfResponsibility = [
    {
      title: "Governor",
      organization: "Public Policy and Governance Society, IIT Kharagpur",
      duration: "May '23 - May '24",
      achievements: [
        "Initiated Diplomatic Discourse Series and orchestrated a large-scale Governance Awareness Program across 15+ cities, reaching over 10K+ participants"
      ]
    },
    {
      title: "LIGHT Head",
      organization: "Gopali Youth Welfare Society",
      duration: "Jan '22 - June '24",
      achievements: [
        "Led a team to manage 13 LIGHT Centers, fostering a network of 450+ students"
      ]
    },
    {
      title: "Secretary Culinary Arts Subcommittee",
      organization: "Technology Students' Gymkhana, IIT Kharagpur",
      duration: "Oct '22 - Apr '23",
      achievements: [
        "Coordinated logistics for 40+ high-profile events, engaging over 15,000 student participants"
      ]
    }
  ];

  const awards = [
    {
      title: "Qualified GATE 2024",
      achievement: "AIR 20556"
    },
    {
      title: "American Express Campus Challenge 2024",
      achievement: "Ranked 9th out of 4,518"
    },
    {
      title: "Tata Elxsi TELIPORT",
      achievement: "Campus Winner out of 7,000+ teams"
    }
  ];

  return (
    <div className="min-h-screen relative bg-background text-foreground overflow-hidden">
      <ShootingStarsBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Education & Skills</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Academic excellence combined with leadership experience and competitive achievements
        </p>
      </div>

      {/* Education */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <GraduationCap className="text-blue-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Education</h2>
        </div>
        
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/20 dark:border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">M.Tech Dual Degree (5Y)</h3>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">Mechanical Engineering (Hons.) and Manufacturing Science and Engineering</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Indian Institute of Technology Kharagpur</p>
              <p className="text-gray-600 dark:text-gray-400">Expected 2026</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-center bg-white/20 dark:bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-white/10">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8.03/10</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">CGPA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positions of Responsibility */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Users className="text-blue-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Positions of Responsibility</h2>
        </div>
        
        <div className="space-y-6">
          {positionsOfResponsibility.map((position, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-8 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{position.title}</h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-1">{position.organization}</p>
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">{position.duration}</span>
              </div>
              
              <div className="space-y-3">
                {position.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start">
                    <Target className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                    <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Awards and Achievements */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Award className="text-blue-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Awards and Achievements</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 text-center">
              <Award className="text-yellow-500 dark:text-yellow-400 mx-auto mb-4" size={40} />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{award.title}</h3>
              <p className="text-orange-600 dark:text-orange-400 font-semibold">{award.achievement}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Core Competencies */}
      <section>
        <div className="flex items-center mb-8">
          <BookOpen className="text-blue-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Core Competencies</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Product & Strategy</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Product Management & Strategy</li>
              <li>• User Research & Analysis</li>
              <li>• A/B Testing & Optimization</li>
              <li>• Agile & Scrum Methodologies</li>
            </ul>
          </div>
          
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Data & Analytics</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Statistical Analysis</li>
              <li>• Machine Learning</li>
              <li>• Data Visualization</li>
              <li>• Business Intelligence</li>
            </ul>
          </div>
          
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Engineering</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• CAD/CAM Design</li>
              <li>• Manufacturing Processes</li>
              <li>• Materials Engineering</li>
              <li>• Process Optimization</li>
            </ul>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default EducationSection;