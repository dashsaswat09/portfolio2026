import React, { useMemo } from 'react';

interface ShootingStarsBackgroundProps {
  starCount?: number;
}

const ShootingStarsBackground: React.FC<ShootingStarsBackgroundProps> = ({ starCount = 30 }) => {
  const stars = useMemo(() => {
    return Array.from({ length: starCount }).map((_, i) => {
      const top = Math.random() * 100; // percentage
      const left = Math.random() * 100; // percentage
      const delay = Math.random() * 5; // seconds
      const duration = 2 + Math.random() * 3; // seconds
      return { id: i, top, left, delay, duration };
    });
  }, [starCount]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {stars.map(({ id, top, left, delay, duration }) => (
        <span
          key={id}
          className="shooting-star"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStarsBackground;



