import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';

import { PageLayout } from '../components/PageLayout';
import { TestimonialCard } from '../components/TestimonialCard';
import { Reveal } from '../components/Reveal';
import { RevealText } from '../components/RevealText';
import { testimonials } from '../data/testimonials';

export const TestimoniesPage: React.FC = () => {
  return (
    <PageLayout chapterNumber="07" chapterTitle="TESTIMONIES / CLIENT WORDS" subtitle="CHAPTER 07 — CLIENT TRUST &amp; COLLABORATION">
      {/* Header */}
      <section className="pb-16 border-b border-zinc-800/80">
        <div className="max-w-4xl">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            TESTIMONIALS &amp; FEEDBACK
          </span>
          <RevealText
            as="h1"
            lines={['WORDS FROM PEOPLE', "I'VE WORKED WITH"]}
            lineClassNames={['text-white', 'text-outline']}
            stagger={0.075}
            className="mt-4 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02]"
          />
          <Reveal delay={0.3}>
            <p className="mt-4 text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed">
              Honest reflections on communication, code discipline, visual poise, and the craft of turning digital concepts into production reality.
            </p>
          </Reveal>
        </div>

        {/* Transparency Banner as mandated by specifications */}
        <div className="mt-8 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3 text-xs font-mono text-zinc-400 max-w-3xl">
          <Info className="w-4 h-4 text-zinc-300 mt-0.5 shrink-0" />
          <div>
            <strong className="text-zinc-200">EDITORIAL INTEGRITY NOTE:</strong> The records below demonstrate the exact formatting and layout structure of client quotes. Bayd XN does not publish fabricated results or artificial endorsements. Entries can be quickly updated in <code className="text-zinc-200 font-bold">src/data/testimonials.ts</code> or wired to your database.
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Reveal key={testimonial.id} delay={idx * 0.08} y={28}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Collaboration Invitation Banner */}
      <section className="mt-8 p-8 sm:p-12 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            NEXT SUCCESS STORY
          </span>
          <h3 className="mt-2 font-display font-bold text-2xl text-white">
            Let's build something worthy of your highest praise.
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl">
            From the initial roadmap to the final deployment push, expect clarity, relentless attention to detail, and a finished product you'll take pride in sharing.
          </p>
        </div>

        <NavLink
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shrink-0"
        >
          <span>Initiate Collaboration</span>
          <ArrowRight className="w-4 h-4" />
        </NavLink>
      </section>
    </PageLayout>
  );
};
