import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * A soft, fast light sweep across the viewport on every route change —
 * a "page turning in the light" cue that reinforces the digital-book feel
 * without blocking interaction or hiding the incoming page.
 */
export const PageTurnSweep: React.FC = () => {
  const location = useLocation();
  const reduce = useReducedMotion();
  const firstRender = useRef(true);
  const [sweepKey, setSweepKey] = useState<string | null>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reduce) return;

    setSweepKey(location.pathname);
    const timer = window.setTimeout(() => setSweepKey(null), 1000);
    return () => window.clearTimeout(timer);
  }, [location.pathname, reduce]);

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[45] pointer-events-none overflow-hidden"
    >
      <AnimatePresence>
        {sweepKey && (
          <motion.div
            key={sweepKey}
            initial={{ x: '-70vw', opacity: 0 }}
            animate={{ x: '150vw', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 bottom-0 left-0 w-[45vw] -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
