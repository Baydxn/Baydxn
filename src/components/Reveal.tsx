import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** Vertical travel distance, in pixels. */
  y?: number;
  /** Animate only the first time it enters the viewport. */
  once?: boolean;
  /** Optional entrance scale (1 = no scale). */
  scale?: number;
}

/**
 * Scroll-triggered editorial reveal.
 * Fades + rises content as it enters the viewport, and degrades to a
 * simple opacity fade when the user prefers reduced motion.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  y = 26,
  once = true,
  scale = 1,
}) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y, scale, filter: 'blur(6px)' }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      }
      viewport={{ once, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};
