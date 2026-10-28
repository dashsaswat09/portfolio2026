import React, { useState } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    link?: string;
    images?: string[]; // Array of additional images for carousel
  };
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ isOpen, onClose, image }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images (main image + additional images)
  const allImages = image?.images && image.images.length > 0 
    ? image.images 
    : image?.src ? [image.src] : [];
  
  const totalImages = allImages.length;
  const currentImage = allImages[currentImageIndex];

  const handlePrevious = React.useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  }, [totalImages]);

  const handleNext = React.useCallback(() => {
    setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  }, [totalImages]);

  // Reset index when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrevious, handleNext, onClose]);

  const handleImageClick = () => {
    if (image?.link) {
      window.open(image.link, '_blank');
    }
  };

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Lightbox */}
      <div className="relative max-w-6xl w-full max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
        >
          <X size={24} className="text-white" />
        </button>

        {/* Image */}
        <div 
          className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-white/20 dark:border-white/10"
        >
          {/* Carousel Navigation - Left */}
          {totalImages > 1 && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
          )}

          {/* Carousel Navigation - Right */}
          {totalImages > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          )}

          {/* Image Counter */}
          {totalImages > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/50 rounded-full text-white text-sm font-medium">
              {currentImageIndex + 1} / {totalImages}
            </div>
          )}

          <div
            onClick={image.link ? handleImageClick : undefined}
            style={{ cursor: image.link ? 'pointer' : 'default' }}
          >
            <img
              src={currentImage}
              alt={image.alt}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>

          {/* Thumbnail Dots */}
          {totalImages > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Image Info */}
          {(image.title || image.description) && (
            <div className="p-6 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
              {image.title && (
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {image.title}
                </h3>
              )}
              {image.description && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {image.description}
                </p>
              )}
              {image.link && (
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400">
                  <ExternalLink size={16} className="mr-2" />
                  <span className="text-sm font-medium">Click to view full project</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;



