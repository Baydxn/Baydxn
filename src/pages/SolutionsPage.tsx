import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { PageLayout } from '../components/PageLayout';
import { SolutionCard } from '../components/SolutionCard';
import { Reveal } from '../components/Reveal';
import { RevealText } from '../components/RevealText';
import { solutions } from '../data/solutions';

export const SolutionsPage: React.FC = () => {
  return (
    <PageLayout chapterNumber="06" chapterTitle="SOLUTIONS / PROBLEM SOLVING" subtitle="CHAPTER 06 — SOLVING REAL FRICTION FOR REAL BUSINESSES">
      {/* Header */}
      <section className="pb-16 border-b border-zinc-800/80">
        <div className="max-w-4xl">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            PROBLEM-FIRST THINKING
          </span>
          <RevealText
            as="h1"
            lines={['WHAT ARE YOU', 'TRYING TO SOLVE?']}
            lineClassNames={['text-white', 'text-outline']}
            stagger={0.07}
            className="mt-4 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02]"
          />
          <Reveal delay={0.3}>
            <p className="mt-4 text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed">
              Great digital craft begins by confronting the exact point of failure. Here is how common brand and product hurdles are systematically resolved.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Solutions Cards Grid */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.08} y={30}>
              <SolutionCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Unlisted Problem Banner */}
      <section className="mt-8 p-8 sm:p-12 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            UNCONVENTIONAL CHALLENGE?
          </span>
          <h3 className="mt-2 font-display font-bold text-2xl text-white">
            Facing a unique technical or architectural roadblock?
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl">
            Whether refactoring legacy code, untangling an awkward checkout journey, or translating an unformed concept into interactive prototypes, let's unpack it together.
          </p>
        </div>

        <NavLink
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shrink-0"
        >
          <span>Discuss Your Specific Problem</span>
          <ArrowRight className="w-4 h-4" />
        </NavLink>
      </section>
    </PageLayout>
  );
};
