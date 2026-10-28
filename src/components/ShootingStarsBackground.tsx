import React, { useMemo } from 'react';

interface ShootingStarsBackgroundProps {
  starCount?: number;
}

// Original shooting-stars layer from the previous portfolio, now fixed behind every section.
const ShootingStarsBackground: React.FC<ShootingStarsBackgroundProps> = ({ starCount = 30 }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: starCount }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      })),
    [starCount]
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {stars.map(({ id, top, left, delay, duration }) => (
        <span
          key={id}
          className="shooting-star"
          style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
        />
      ))}
    </div>
  );
};

export default ShootingStarsBackground;
