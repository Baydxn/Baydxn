import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Compass, FileCode2, Palette, Hammer, SlidersHorizontal, Rocket } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Reveal } from '../components/Reveal';
import { RevealText } from '../components/RevealText';
import { processStages } from '../data/process';

const stageIcons = [
  Compass,
  FileCode2,
  Palette,
  Hammer,
  SlidersHorizontal,
  Rocket
];

export const ProcessPage: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <PageLayout chapterNumber="05" chapterTitle="PROCESS / FROM IDEA TO INTERFACE" subtitle="CHAPTER 05 — THE SIX-STAGE ARCHITECTURAL BLUEPRINT">
      {/* Header */}
      <section className="pb-16 border-b border-zinc-800/80">
        <div className="max-w-4xl">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            METHODOLOGY &amp; RIGOR
          </span>
          <RevealText
            as="h1"
            lines={['FROM IDEA TO', 'INTERFACE.']}
            lineClassNames={['text-white', 'text-outline']}
            stagger={0.085}
            className="mt-4 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02]"
          />
          <Reveal delay={0.3}>
            <p className="mt-4 text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed">
              A systematic six-stage execution framework that eliminates ambiguity, aligns visual aesthetics with business goals, and ensures high engineering standards.
            </p>
          </Reveal>
        </div>

        {/* Stage Navigation Scrubber */}
        <div className="mt-12 flex overflow-x-auto pb-4 gap-2 no-scrollbar">
          {processStages.map((stage, idx) => (
            <button
              key={stage.number}
              onClick={() => setActiveStage(idx)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                activeStage === idx
                  ? 'bg-white text-black font-bold border-white shadow-lg'
                  : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600'
              }`}
            >
              <span>{stage.number}</span>
              <span>{stage.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Active Stage Spotlight */}
      <section className="py-12">
        {(() => {
          const stage = processStages[activeStage];
          const Icon = stageIcons[activeStage] || Compass;
          return (
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/60 border border-zinc-700/80 shadow-2xl animate-in fade-in duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                      STAGE {stage.number} OF 06
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                      {stage.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    disabled={activeStage === 0}
                    onClick={() => setActiveStage((p) => Math.max(0, p - 1))}
                    className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-mono text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-700"
                  >
                    ← Previous Stage
                  </button>
                  <button
                    disabled={activeStage === processStages.length - 1}
                    onClick={() => setActiveStage((p) => Math.min(processStages.length - 1, p + 1))}
                    className="px-4 py-2 rounded-lg bg-white text-black text-xs font-mono font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-200"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>

              <div className="py-8">
                <h3 className="font-display font-bold text-2xl text-zinc-200 mb-4">
                  {stage.summary}
                </h3>

                <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-6 mb-4">
                  STAGE CHECKPOINTS &amp; ACTIONS
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stage.details.map((detail) => (
                    <div
                      key={detail}
                      className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                      <span className="text-sm text-zinc-300">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Sequential Overview of all 6 Stages */}
      <section className="py-16 border-t border-zinc-800/80">
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-8">
          The Full Sequential Pipeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processStages.map((stage, idx) => (
            <div
              key={stage.number}
              onClick={() => setActiveStage(idx)}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                activeStage === idx
                  ? 'bg-zinc-900 border-white shadow-xl'
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-600'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                <span>STAGE [{stage.number}]</span>
                <span className="text-[10px] text-zinc-400">PHASE {stage.number}</span>
              </div>
              <h4 className="font-display font-bold text-xl text-white">
                {stage.title}
              </h4>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {stage.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Step Banner */}
      <section className="mt-12 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            READY TO COMMENCE DISCOVERY?
          </span>
          <p className="text-sm text-zinc-200 mt-1">
            Let's start at Stage 01 and structure your project for real people.
          </p>
        </div>
        <NavLink
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200"
        >
          <span>Initiate Discovery Stage</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </section>
    </PageLayout>
  );
};
