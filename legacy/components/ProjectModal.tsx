import React from 'react';
import { X, ExternalLink, Download } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    detailedDescription: string;
    proofOfWork?: {
      type: 'pdf' | 'ppt' | 'link' | 'image';
      url: string;
      filename?: string;
    };
    tags?: string[];
    duration?: string;
    role?: string;
  };
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen) return null;

  const handleProofOfWorkClick = () => {
    if (project.proofOfWork?.type === 'link') {
      window.open(project.proofOfWork.url, '_blank');
    } else if (project.proofOfWork?.type === 'pdf' || project.proofOfWork?.type === 'ppt') {
      // In a real implementation, this would download or open the file
      const link = document.createElement('a');
      link.href = project.proofOfWork.url;
      link.download = project.proofOfWork.filename || 'document';
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20 dark:border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
            {project.role && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">{project.role}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Project Info */}
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
              {project.description}
            </p>
            
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Detailed Overview</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.detailedDescription}
              </p>
            </div>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Proof of Work */}
          {project.proofOfWork && (
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Proof of Work</h3>
              <button
                onClick={handleProofOfWorkClick}
                className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-200"
              >
                {project.proofOfWork.type === 'link' ? (
                  <>
                    <ExternalLink className="mr-2" size={20} />
                    View Project
                  </>
                ) : (
                  <>
                    <Download className="mr-2" size={20} />
                    Download {project.proofOfWork.type.toUpperCase()}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;



