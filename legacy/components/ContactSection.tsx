import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import ShootingStarsBackground from './ShootingStarsBackground';

interface ContactSectionProps {
  setActiveTab: (tab: string) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ setActiveTab }) => {
  return (
    <div className="min-h-screen relative bg-background text-foreground overflow-hidden">
      <ShootingStarsBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Contact</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Let's connect and explore opportunities for collaboration
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/20 dark:border-white/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="text-blue-600 dark:text-blue-400 mr-4" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                  <p className="text-gray-700 dark:text-gray-300">saswat.dash.iitkgp@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="text-blue-600 dark:text-blue-400 mr-4" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Phone</p>
                  <p className="text-gray-700 dark:text-gray-300">+91 8895406527</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="text-blue-600 dark:text-blue-400 mr-4" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Location</p>
                  <p className="text-gray-700 dark:text-gray-300">Kharagpur, West Bengal, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Links */}
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/20 dark:border-white/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Professional Links</h2>
            
            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/in/saswatdash2003"
                className="flex items-center p-4 bg-white/20 dark:bg-black/30 backdrop-blur-sm rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-200 group"
              >
                <Linkedin className="text-blue-600 dark:text-blue-400 mr-4" size={24} />
                <div className="flex-grow">
                  <p className="font-semibold text-gray-900 dark:text-white">LinkedIn</p>
                  <p className="text-gray-700 dark:text-gray-300">Connect professionally</p>
                </div>
                <ExternalLink className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" size={20} />
              </a>
              
              <a
                href="https://github.com/saswat-projects-hub?tab=repositories"
                className="flex items-center p-4 bg-white/20 dark:bg-black/30 backdrop-blur-sm rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-200 group"
              >
                <Github className="text-gray-800 dark:text-gray-200 mr-4" size={24} />
                <div className="flex-grow">
                  <p className="font-semibold text-gray-900 dark:text-white">GitHub</p>
                  <p className="text-gray-700 dark:text-gray-300">View my code</p>
                </div>
                <ExternalLink className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" size={20} />
              </a>
              
              <a
                href="#"
                className="flex items-center p-4 bg-white/20 dark:bg-black/30 backdrop-blur-sm rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-200 group"
              >
                <ExternalLink className="text-orange-600 dark:text-orange-400 mr-4" size={24} />
                <div className="flex-grow">
                  <p className="font-semibold text-gray-900 dark:text-white">Portfolio</p>
                  <p className="text-gray-700 dark:text-gray-300">Additional projects</p>
                </div>
                <ExternalLink className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/20 dark:border-white/10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to collaborate?</h2>
          <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <a
            href="mailto:your.email@example.com"
            className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-200"
          >
            <Mail className="mr-2" size={20} />
            Send me an email
          </a>
        </div>

        {/* Availability */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100/80 dark:bg-green-900/30 backdrop-blur-sm text-green-800 dark:text-green-200 rounded-full border border-green-200/50 dark:border-green-700/50">
            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-2"></div>
            Available for new opportunities
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactSection;