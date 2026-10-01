import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { PageLayout } from '../components/PageLayout';
import { PortraitCard } from '../components/PortraitCard';
import { Reveal } from '../components/Reveal';
import { RevealText } from '../components/RevealText';
import { siteConfig } from '../data/siteConfig';

const timelineSteps = [
  { step: '01', title: 'IDEA', desc: 'Raw concepts, napkin sketches, and market opportunities filtered for core value.' },
  { step: '02', title: 'DIRECTION', desc: 'Synthesizing technical scope, information architecture, and strategic intent.' },
  { step: '03', title: 'DESIGN', desc: 'Sculpting high-fidelity UI systems, typographic rhythm, and responsive layouts.' },
  { step: '04', title: 'ENGINEERING', desc: 'Developing modular, accessible, sub-second codebases with modern frameworks.' },
  { step: '05', title: 'REFINEMENT', desc: 'Micro-interaction tuning, performance profiling, and removing unnecessary friction.' },
  { step: '06', title: 'LAUNCH', desc: 'Deployment to global edge networks, verified analytics, and public release.' },
];

export const AboutPage: React.FC = () => {
  return (
    <PageLayout chapterNumber="02" chapterTitle="ABOUT / PHILOSOPHY" subtitle="CHAPTER 02 — THE CRAFTSMAN BEHIND THE WORK">
      {/* Editorial Header */}
      <section className="pb-16 border-b border-zinc-800/80">
        <div className="max-w-4xl">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            ORIGIN &amp; PERSPECTIVE
          </span>
          <RevealText
            as="h1"
            text="NOT JUST A WEBSITE."
            className="mt-4 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]"
          />
          <RevealText
            as="p"
            text="A DIGITAL EXPERIENCE BUILT AROUND AN IDEA."
            delay={0.22}
            stagger={0.03}
            className="mt-3 font-accent-italic text-2xl sm:text-3xl lg:text-4xl text-zinc-400 tracking-tight"
          />
        </div>
      </section>

      {/* Main Narrative & Portrait */}
      <section className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Narrative */}
        <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-zinc-300 leading-relaxed">
          <p className="text-xl sm:text-2xl text-white font-medium leading-snug">
            I’m Bayd XN — a web developer, digital designer and visual creative focused on building things that feel as good as they function.
          </p>

          <p>
            I work across code, interface design and visual communication to create digital experiences that are clean, purposeful and memorable.
          </p>

          <p>
            My approach sits between creative thinking and technical execution — taking an idea from its earliest concept through design, development and a finished product.
          </p>

          <p>
            I don't believe great digital work should feel complicated to the people using it. Behind every polished interface is a carefully considered structure, and that's where I like to work.
          </p>

          <blockquote className="p-6 rounded-2xl bg-zinc-900/60 border-l-2 border-white text-white font-display font-bold text-2xl tracking-tight my-6">
            "Ideas are common. Execution is the difference."
          </blockquote>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
              <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-1">
                AESTHETIC DISCIPLINE
              </h4>
              <p className="text-xs text-zinc-400">
                Editorial typography, uncluttered layouts, and harmonious balance without visual noise.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
              <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-1">
                ENGINEERING PRECISION
              </h4>
              <p className="text-xs text-zinc-400">
                Resilient, modular codebases optimized for rapid load times and intuitive maintenance.
              </p>
            </div>
          </div>
        </div>

        {/* Right Portrait */}
        <div className="lg:col-span-5 sticky top-28">
          <PortraitCard initialPortrait="confident" />

          {/* Core positioning tag */}
          <div className="mt-6 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs font-mono text-zinc-400">
            <div className="text-white font-semibold mb-1">CORE POSITIONING:</div>
            <p className="text-zinc-400">
              {siteConfig.brand.positioning}
            </p>
          </div>
        </div>
      </section>

      {/* Visual Timeline / Interactive Flow */}
      <section className="py-20 border-t border-zinc-800/80">
        <div className="mb-12">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            METHODOLOGY ARCHITECTURE
          </span>
          <RevealText
            as="h2"
            text="THE ANATOMY OF EXECUTION"
            className="mt-2 font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          />
          <p className="mt-2 text-sm text-zinc-400">
            How an ambiguous concept converts into an uncompromising digital product.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelineSteps.map((step, idx) => (
              <Reveal key={step.step} delay={idx * 0.07} className="relative">
                <div className="relative group h-full p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-zinc-400 group-hover:text-white transition-colors">
                      STAGE {step.step}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-zinc-300">
                      {idx + 1}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>

                  {idx < timelineSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-zinc-400">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section: "Modern tools. Thoughtful engineering. Purpose-built experiences." */}
      <section className="py-16 border-t border-zinc-800/80">
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            TECHNICAL FOUNDATION
          </span>
          <RevealText
            as="h2"
            text='"Modern tools. Thoughtful engineering. Purpose-built experiences."'
            className="mt-3 font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight"
          />
          <Reveal delay={0.2}>
            <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
              The technology used to build a project is secondary to the quality and longevity of the finished work. I deliberately pick stacks that deliver speed, resilience, and ease of future maintenance.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                'React',
                'TypeScript',
                'Next.js',
                'Vite',
                'Tailwind CSS',
                'Supabase',
                'Firebase',
                'HTML5 / CSS3',
                'REST & WebSockets',
                'Node.js',
                'Figma Systems',
                'Edge Deployments'
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/60 flex items-center justify-between">
          <NavLink
            to="/services"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-white hover:text-zinc-300"
          >
            <span>Proceed to Chapter 03: What I Build</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </section>
    </PageLayout>
  );
};
