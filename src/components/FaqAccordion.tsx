import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { FaqItem } from '../types';


interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const reduce = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-zinc-800/80 border-y border-zinc-800/80">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-6 transition-colors">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-lg"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
            >
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span className="font-mono text-xs text-zinc-400 tabular group-hover:text-white transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`font-display text-lg sm:text-2xl font-bold transition-colors ${
                    isOpen ? 'text-white' : 'text-zinc-200 group-hover:text-white'
                  }`}
                >
                  {item.question}
                </span>
              </div>

              <div
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                  isOpen
                    ? 'rotate-45 bg-white text-black border-white'
                    : 'border-zinc-800 group-hover:border-zinc-500 bg-zinc-900 text-zinc-400 group-hover:text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${item.id}`}
                  key="panel"
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={
                    reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }
                  }
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pl-8 sm:pl-12 pr-2 sm:pr-16">
                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                      {item.answer}
                    </p>
                    <span className="mt-4 block h-px w-16 bg-zinc-700" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
