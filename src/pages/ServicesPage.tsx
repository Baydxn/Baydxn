import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Terminal, Palette, Layout, Cpu } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { ServiceCard } from '../components/ServiceCard';
import { Reveal } from '../components/Reveal';
import { RevealText } from '../components/RevealText';
import { services } from '../data/services';


export const ServicesPage: React.FC = () => {
  return (
    <PageLayout chapterNumber="03" chapterTitle="SERVICES / WHAT I BUILD" subtitle="CHAPTER 03 — CAPABILITIES &amp; DELIVERABLES">
      {/* Editorial Header */}
      <section className="pb-16 border-b border-zinc-800/80">
        <div className="max-w-4xl">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            SCOPE &amp; DISCIPLINES
          </span>
          <RevealText
            as="h1"
            lines={['WHAT I', 'BUILD']}
            lineClassNames={['text-white', 'text-outline']}
            stagger={0.09}
            className="mt-4 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02]"
          />
          <Reveal delay={0.3}>
            <p className="mt-4 text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed">
              Purpose-built digital solutions spanning frontend engineering, interface architecture, brand visual systems, and full-stack product development.
            </p>
          </Reveal>
        </div>

        {/* Quick Discipline Anchors */}
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            01 Web Development
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Layout className="w-3.5 h-3.5 text-zinc-400" />
            02 UI / UX Design
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Palette className="w-3.5 h-3.5 text-zinc-400" />
            03 Graphic &amp; Brand
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            04 Digital Products
          </span>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Reveal key={service.id} delay={idx * 0.08} y={30}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Engagement Banner */}
      <section className="mt-12 p-8 sm:p-12 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            CUSTOM SCOPE OR HYBRID NEEDS?
          </span>
          <h3 className="mt-2 font-display font-bold text-2xl text-white">
            Need a combined design + engineering engagement?
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl">
            Whether building a zero-to-one MVP or redesigning an existing web application, I handle both the creative aesthetic and the technical infrastructure.
          </p>
        </div>

        <NavLink
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shrink-0"
        >
          <span>Schedule Scoping Session</span>
          <ArrowRight className="w-4 h-4" />
        </NavLink>
      </section>
    </PageLayout>
  );
};
