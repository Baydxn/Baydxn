import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BrandedLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'brand' | 'tagline' | 'done'>('brand');

  useEffect(() => {
    // Check if user already saw the loader in this session to prevent annoyance
    const hasSeen = sessionStorage.getItem('bayd_loader_seen');
    if (hasSeen) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => {
      setPhase('tagline');
    }, 700);

    const t2 = setTimeout(() => {
      sessionStorage.setItem('bayd_loader_seen', 'true');
      setPhase('done');
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed inset-0 z-[99999] bg-[#09090b] flex flex-col items-center justify-center text-center p-6 select-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tighter">
            BAYD XN
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'tagline' ? 1 : 0, y: phase === 'tagline' ? 0 : 10 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs sm:text-sm text-zinc-400 tracking-widest uppercase"
          >
            CODE. DESIGN. DIGITAL CRAFT.
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
