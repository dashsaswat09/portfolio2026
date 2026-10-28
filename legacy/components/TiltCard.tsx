import React, { useRef } from 'react';

interface TiltCardProps {
  className?: string;
  children: React.ReactNode;
}

const MAX_TILT_DEG = 8; // limit tilt

const TiltCard: React.FC<TiltCardProps> = ({ className = '', children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const element = cardRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -MAX_TILT_DEG;
    const rotateY = ((x - centerX) / centerX) * MAX_TILT_DEG;

    element.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    const element = cardRef.current;
    if (!element) return;
    element.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

export default TiltCard;



