import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const statements = [
  'I design.',
  'I build.',
  'I refine.',
  'I deliver.'
];

export const RotatingHeroText: React.FC = () => {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % statements.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [reduce]);

  const textClass =
    'font-display font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight underline decoration-zinc-700 underline-offset-8';

  // Static, accessible rendering when motion is disabled.
  if (reduce) {
    return (
      <div className="inline-flex items-center h-14 sm:h-16 align-middle">
        <span className={textClass}>I design. I build. I deliver.</span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center h-14 sm:h-16 overflow-hidden align-middle"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={statements[index]}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={textClass}
        >
          {statements[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
