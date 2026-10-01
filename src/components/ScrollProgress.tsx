import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin monochrome reading-progress bar pinned to the very top of the book.
 * Purely decorative (aria-hidden) and GPU-friendly (transform-only).
 */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-white/80 z-[60] pointer-events-none"
    />
  );
};
