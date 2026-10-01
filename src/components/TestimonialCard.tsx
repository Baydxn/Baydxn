import React from 'react';
import { Quote } from 'lucide-react';
import type { Testimonial } from '../types';


interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div
      className="relative h-full p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-500 transition-all duration-300 shadow-xl flex flex-col justify-between"
      data-cursor="QUOTE"
    >
      <div>
        {/* Top Header with quote icon and project tag */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
          <Quote className="w-5 h-5 text-zinc-400" />
          <span className="text-[11px] font-mono tracking-wider text-zinc-400">
            {testimonial.project}
          </span>
        </div>

        {/* Quote body */}
        <blockquote className="mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
          "{testimonial.quote}"
        </blockquote>
      </div>

      {/* Client Identity & Demo Content Status */}
      <div className="mt-8 pt-5 border-t border-zinc-800/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono text-xs font-bold text-zinc-300">
            {testimonial.avatarPlaceholder || 'CL'}
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-white">
              {testimonial.clientName}
            </h4>
            <p className="text-xs text-zinc-400">
              {testimonial.role} • {testimonial.company}
            </p>
          </div>
        </div>

        {testimonial.isPlaceholderNote && (
          <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/60">
            DEMO / READY FOR REAL COPY
          </span>
        )}
      </div>
    </div>
  );
};
