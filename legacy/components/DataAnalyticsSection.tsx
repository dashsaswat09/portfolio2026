import React from 'react';
import TiltCard from './TiltCard';
import ShootingStarsBackground from './ShootingStarsBackground';
import { BarChart3, Calendar, TrendingUp, Award, Database, Code, Brain } from 'lucide-react';

interface DataAnalyticsSectionProps {
  setActiveTab: (tab: string) => void;
}

const DataAnalyticsSection: React.FC<DataAnalyticsSectionProps> = ({ setActiveTab }) => {
  const internships = [
    {
      title: "Product Analyst Intern",
      company: "InstaPrepsAI",
      type: "EdTech",
      duration: "June '25 - Present",
      achievements: [
        "Built KPI dashboards and conducted SQL-based analysis on 5k+ records to drive the launch of the Student Admin Assessment platform",
        "Improved onboarding activation 18% by performing cohort and funnel analysis on 3k+ users"
      ]
    },
    {
      title: "Data Analyst and Strategic Intern",
      company: "Vecmocon Technologies",
      duration: "May '24 - July '24",
      achievements: [
        "Engineered Random Forest model on 50k+ IoT and BMS datapoints, cutting 3W-EV leasing income uncertainty by 35%",
        "Boosted route classification accuracy 27% by analyzing vehicle travel data with OpenStreetMap"
      ]
    }
  ];

  const projects = [
    {
      title: "AtliQ Hotels Revenue Optimization",
      achievements: [
        "Constructed 6 predictive forecasting models achieving 85% accuracy",
        "Identified a critical 22.2 percentage point weekend-to-weekday performance gap",
        "Engineered dynamic pricing where a 15% discount lifted Standard occupancy by 7.3%"
      ]
    },
    {
      title: "Vendor Performance & Profitability Analysis",
      achievements: [
        "Examined 10k+ sales and inventory records",
        "Achieved a 72% reduction in unit cost through regression-based bulk purchase analysis",
        "Identified $2.71M in slow-moving inventory and a 65.69% over-reliance on top vendors"
      ]
    },
    {
      title: "Credit Card Fraud Detection",
      achievements: [
        "Achieved 81.05% accuracy with a Random Forest model",
        "Secured 86.08% F1 score by resolving data imbalance with Random Under Sampling, enhancing model accuracy by 26%"
      ]
    }
  ];

  const competitions = [
    {
      title: "American Express Campus Challenge 2024",
      subtitle: "Decision Science Track",
      achievement: "Ranked 9th out of 4,518 participants",
      description: "Achieved 69.9% accuracy in predicting the 'Winner Team' of a T20 match"
    },
    {
      title: "Top PM Fellow @NextLeap (Zomato)",
      description: "Focused on user research and metrics (functional/non-functional) to enhance customer engagement"
    }
  ];

  const skills = [
    {
      category: "Programming & Libraries",
      items: ["Python", "SQL", "NoSQL", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch"]
    },
    {
      category: "Statistical & Analytical Skills",
      items: ["Hypothesis Testing", "t-test", "Chi-Square", "ANOVA", "Regression Analysis", "Correlation", "Sampling", "Confidence Intervals"]
    },
    {
      category: "Data Visualization & Tools",
      items: ["Tableau", "Power BI", "MS Excel"]
    }
  ];

  return (
    <div className="min-h-screen relative bg-background text-foreground overflow-hidden">
      <ShootingStarsBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Data & Analytics</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Advanced analytics and machine learning expertise to drive business insights, predict outcomes, and optimize performance
        </p>
      </div>

      {/* Internships */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <BarChart3 className="text-teal-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Internships</h2>
        </div>
        
        <div className="space-y-8">
          {internships.map((internship, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-8 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{internship.title}</h3>
                  <p className="text-lg text-teal-600 dark:text-teal-400 font-semibold mb-1">{internship.company}</p>
                  {internship.type && <p className="text-gray-700 dark:text-gray-300 mb-2">{internship.type}</p>}
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

      {/* Projects */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Database className="text-teal-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Projects</h2>
        </div>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-8 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{project.title}</h3>
              
              <div className="space-y-3">
                {project.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start">
                    <Brain className="text-teal-500 mr-3 mt-1 flex-shrink-0" size={16} />
                    <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Competitions & Achievements */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Award className="text-teal-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Competitions & Achievements</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {competitions.map((competition, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{competition.title}</h3>
              {competition.subtitle && (
                <p className="text-teal-600 dark:text-teal-400 font-semibold mb-2">{competition.subtitle}</p>
              )}
              {competition.achievement && (
                <p className="text-teal-700 dark:text-teal-300 font-semibold mb-2">{competition.achievement}</p>
              )}
              <p className="text-gray-700 dark:text-gray-300">{competition.description}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Skills and Expertise */}
      <section>
        <div className="flex items-center mb-8">
          <Code className="text-teal-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Skills and Expertise</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-teal-100/80 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 rounded-full text-sm font-medium border border-teal-200/50 dark:border-teal-700/50"
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

export default DataAnalyticsSection;