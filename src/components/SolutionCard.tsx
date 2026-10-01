import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import type { ProblemSolution } from '../types';


interface SolutionCardProps {
  item: ProblemSolution;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ item }) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('solution');

  return (
    <div
      className="group relative h-full p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-500 transition-all duration-300 shadow-xl flex flex-col justify-between"
      data-cursor="SOLVE"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
            CASE #{item.number}
          </span>
          <div className="flex rounded-full bg-zinc-800/80 p-0.5 border border-zinc-700/60 text-[11px] font-mono">
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-2.5 py-0.5 rounded-full transition-colors ${
                activeTab === 'problem'
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              The Friction
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-2.5 py-0.5 rounded-full transition-colors ${
                activeTab === 'solution'
                  ? 'bg-white text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              The Solution
            </button>
          </div>
        </div>

        {/* Content Area with smooth transition */}
        <div className="mt-6 min-h-[140px] flex flex-col justify-center">
          {activeTab === 'problem' ? (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                <HelpCircle className="w-4 h-4 text-zinc-400" />
                <span>IDENTIFIED PAIN POINT</span>
              </div>
              <blockquote className="font-display text-xl sm:text-2xl text-zinc-300 italic font-medium leading-snug">
                "{item.problem}"
              </blockquote>
            </div>
          ) : (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-200 mb-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>BAYD XN ARCHITECTURAL SOLUTION</span>
              </div>
              <p className="font-display text-xl sm:text-2xl text-white font-bold leading-snug">
                "{item.solution}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Impact Note */}
      <div className="mt-6 pt-5 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
        <span className="font-mono text-[11px] text-zinc-400 line-clamp-1">
          {item.impact}
        </span>
        <button
          onClick={() => setActiveTab(activeTab === 'problem' ? 'solution' : 'problem')}
          className="flex items-center gap-1 font-mono text-zinc-300 hover:text-white shrink-0 ml-2"
        >
          <span>{activeTab === 'problem' ? 'Reveal Fix' : 'View Problem'}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
