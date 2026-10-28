import React from 'react';
import TiltCard from './TiltCard';
import ShootingStarsBackground from './ShootingStarsBackground';
import { Settings, Calendar, TrendingUp, Cog, Wrench, Book } from 'lucide-react';

interface MechanicalSectionProps {
  setActiveTab: (tab: string) => void;
}

const MechanicalSection: React.FC<MechanicalSectionProps> = ({ setActiveTab }) => {
  const internships = [
    {
      title: "Product Development Intern",
      company: "Podhikal Scientific Pvt. Ltd.",
      duration: "May '23 - July '23",
      achievements: [
        "Modeled and optimized the XY motion controller assembly in SolidWorks to minimize vibrations",
        "Prototyped the motion control unit using lightweight alloys, reducing weight by 12%",
        "Designed a micro-fluid cap geometry to regulate droplet size and spray angle for uniform thin-film coating"
      ]
    }
  ];

  const projects = [
    {
      title: "Warm Forming of Magnesium Alloys, Process Development",
      subtitle: "MTP-1",
      duration: "Aug '25 - Present",
      achievements: [
        "Delivered 20% higher process stability by engineering insulation setup and temperature calibration",
        "Observed 55% rise in formability through failure study at warm vs room temperature",
        "Identified 25% finer grains at warm forming through microstructure characterization",
        "Achieved 0.4 mm wall thickness of magnesium sheet using Single Point Incremental Forming"
      ]
    }
  ];

  const coursework = [
    {
      category: "Core",
      items: ["Fluid Mechanics", "Mechanics of Solids", "Heat Transfer", "Design of Machine Elements", "Metal Forming Processes", "Additive Manufacturing", "Applied Thermodynamics"]
    },
    {
      category: "Advanced",
      items: ["Computer Integrated Manufacturing", "Robotics", "Introduction to Hydrogen Energy and Utilization"]
    }
  ];

  const skills = [
    {
      category: "Design & Modeling Tools",
      items: ["SolidWorks", "AutoCAD", "Fusion 360", "NX CAD", "MATLAB", "Simulink"]
    },
    {
      category: "CAM & Manufacturing Tools",
      items: ["Mastercam", "Fusion 360 CAM", "NX CAM", "CNC Machining & Programming", "3D Printing", "Rapid Prototyping"]
    },
    {
      category: "Manufacturing & Materials Expertise",
      items: ["Metal Forming", "Failure Analysis", "Heat Treatment", "Material Behavior Analysis", "Microstructure Characterization"]
    },
    {
      category: "Automation & Robotics",
      items: ["PLC Programming", "Industrial Robots", "Robotic Path Planning"]
    }
  ];

  return (
    <div className="min-h-screen relative bg-background text-foreground overflow-hidden">
      <ShootingStarsBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Mechanical Core</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Expertise in design, manufacturing, material science, and process optimization with hands-on engineering experience
        </p>
        <div className="mt-6">
          <button
            onClick={() => document.getElementById('mechanical-projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            See my Work
          </button>
        </div>
      </div>

      {/* Internships */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Cog className="text-orange-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Internships</h2>
        </div>
        
        <div className="space-y-8">
          {internships.map((internship, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-8 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{internship.title}</h3>
                  <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold mb-1">{internship.company}</p>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                  <Calendar size={18} className="mr-2" />
                  <span className="font-medium">{internship.duration}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {internship.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start">
                    <TrendingUp className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                    <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Major Technical Projects */}
      <section className="mb-16" id="mechanical-projects">
        <div className="flex items-center mb-8">
          <Wrench className="text-orange-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Major Technical Projects</h2>
        </div>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-8 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{project.subtitle}</p>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                  <Calendar size={18} className="mr-2" />
                  <span className="font-medium">{project.duration}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {project.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start">
                    <Settings className="text-orange-500 dark:text-orange-400 mr-3 mt-1 flex-shrink-0" size={16} />
                    <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Coursework Highlights */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Book className="text-orange-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Coursework Highlights</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {coursework.map((courseGroup, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{courseGroup.category}</h3>
              <div className="space-y-2">
                {courseGroup.items.map((course, courseIndex) => (
                  <div key={courseIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">{course}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Skills and Expertise */}
      <section>
        <div className="flex items-center mb-8">
          <Settings className="text-orange-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Skills and Expertise</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skillGroup, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-orange-100/80 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium border border-orange-200/50 dark:border-orange-700/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default MechanicalSection;