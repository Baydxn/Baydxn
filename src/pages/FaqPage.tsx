import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

import { PageLayout } from '../components/PageLayout';
import { FaqAccordion } from '../components/FaqAccordion';
import { Reveal } from '../components/Reveal';
import { RevealText } from '../components/RevealText';
import { faqs } from '../data/faqs';
import { siteConfig } from '../data/siteConfig';

export const FaqPage: React.FC = () => {
  return (
    <PageLayout chapterNumber="08" chapterTitle="FAQ / QUESTIONS, ANSWERED" subtitle="CHAPTER 08 — COMMON INQUIRIES &amp; CLARIFICATIONS">
      {/* Header */}
      <section className="pb-16 border-b border-zinc-800/80">
        <div className="max-w-4xl">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            KNOWLEDGE BASE
          </span>
          <RevealText
            as="h1"
            lines={['QUESTIONS,', 'ANSWERED.']}
            lineClassNames={['text-white', 'text-outline']}
            stagger={0.11}
            className="mt-4 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02]"
          />
          <Reveal delay={0.28}>
            <p className="mt-4 text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed">
              Direct answers concerning capabilities, end-to-end design and engineering services, backend integrations, and commissioning new work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 max-w-4xl">
        <FaqAccordion items={faqs} />
      </section>

      {/* Direct Question CTA Banner */}
      <section className="mt-8 p-8 sm:p-12 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-4xl">
        <div>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            STILL HAVE AN UNANSWERED QUESTION?
          </span>
          <h3 className="mt-2 font-display font-bold text-2xl text-white">
            Ask Bayd directly on WhatsApp.
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-md">
            I'm happy to clarify project timelines, technical feasibility, or custom budget considerations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={siteConfig.social.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>

          <NavLink
            to="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-zinc-800 text-zinc-200 font-medium text-xs hover:bg-zinc-700 transition-colors"
          >
            <span>Contact Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </section>
    </PageLayout>
  );
};
