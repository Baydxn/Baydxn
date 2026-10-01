import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Reveal } from '../components/Reveal';
import { RevealText } from '../components/RevealText';
import { projects } from '../data/projects';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();


  const project = projects.find((p) => p.slug === id || p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!project) {
    return (
      <PageLayout chapterNumber="04" chapterTitle="PROJECT NOT FOUND">
        <div className="py-24 text-center max-w-lg mx-auto">
          <h1 className="font-display font-bold text-3xl text-white">Project Not Found</h1>
          <p className="mt-3 text-sm text-zinc-400">
            The project record you requested is not currently present in the folio archive.
          </p>
          <NavLink
            to="/work"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Work Index</span>
          </NavLink>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      chapterNumber="04"
      chapterTitle={`CASE STUDY / ${project.name}`}
      subtitle={`FOLIO ARCHIVE • ${project.year}`}
    >
      {/* Back Button */}
      <div className="mb-8">
        <NavLink
          to="/work"
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO ALL SELECTED WORK</span>
        </NavLink>
      </div>

      {/* Hero Header */}
      <section className="pb-12 border-b border-zinc-800/80">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
            {project.category}
          </span>
          <span className="text-xs font-mono text-zinc-400">
            YEAR: {project.year}
          </span>
          {project.client && (
            <span className="text-xs font-mono text-zinc-400">
              • CLIENT: {project.client}
            </span>
          )}
        </div>

        <RevealText
          as="h1"
          text={project.name}
          stagger={0.11}
          className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]"
        />

        <Reveal delay={0.3}>
          <p className="mt-6 text-lg sm:text-2xl text-zinc-300 max-w-3xl leading-relaxed font-sans">
            {project.shortDescription}
          </p>
        </Reveal>

        {/* Roles & Tech Metadata Strip */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
          <div>
            <span className="text-zinc-400 block mb-1">ROLE</span>
            <span className="text-zinc-200">{project.role}</span>
          </div>
          <div>
            <span className="text-zinc-400 block mb-1">TIMELINE</span>
            <span className="text-zinc-200">{project.year} • 6 Weeks</span>
          </div>
          <div className="col-span-2">
            <span className="text-zinc-400 block mb-1">CORE STACK</span>
            <span className="text-zinc-200">{project.technologies.join(' • ')}</span>
          </div>
        </div>
      </section>

      {/* Main Project Hero Graphic Showcase */}
      <section className="py-12">
        <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-2xl">
          <img
            src={project.heroImage}
            alt={`${project.name} interface presentation`}
            className="w-full h-auto object-cover protected-asset pointer-events-none"
          />
        </div>
      </section>

      {/* Problem & Concept Dual Grid */}
      <section className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-800/80">
        {/* The Problem */}
        <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">
            <span>01</span>
            <span>•</span>
            <span>THE CHALLENGE / PROBLEM</span>
          </div>
          <h3 className="font-display font-bold text-2xl text-white tracking-tight mb-4">
            Identifying The Core Friction
          </h3>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* The Concept */}
        <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">
            <span>02</span>
            <span>•</span>
            <span>THE STRATEGIC CONCEPT</span>
          </div>
          <h3 className="font-display font-bold text-2xl text-white tracking-tight mb-4">
            A Clear Architectural Direction
          </h3>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {project.concept}
          </p>
        </div>
      </section>

      {/* Design Direction & Development */}
      <section className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-800/80">
        {/* Design Direction */}
        <div>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            03 • VISUAL IDENTITY &amp; UX
          </span>
          <h3 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Design Direction
          </h3>
          <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
            {project.designDirection}
          </p>
        </div>

        {/* Development */}
        <div>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            04 • ENGINEERING &amp; STACK
          </span>
          <h3 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Technical Development
          </h3>
          <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
            {project.development}
          </p>
        </div>
      </section>

      {/* Key Features List */}
      <section className="py-12 border-t border-zinc-800/80">
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
          SYSTEM HIGHLIGHTS
        </span>
        <RevealText
          as="h3"
          text="Engineered Features & Capabilities"
          className="mt-2 font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-8"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.features.map((feature, idx) => (
            <Reveal key={feature} delay={idx * 0.06} y={18}>
              <div className="h-full p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 transition-colors flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <p className="text-xs sm:text-sm text-zinc-200">{feature}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery Breakdown */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="py-12 border-t border-zinc-800/80">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            GALLERY / ARTIFACTS
          </span>
          <RevealText
            as="h3"
            text="Interface Details & Systems"
            className="mt-2 font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.galleryImages.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.08} y={20}>
                <div className="h-full p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-600 transition-colors flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-zinc-400">
                      VIEW 0{idx + 1}
                    </span>
                    <h4 className="mt-2 font-display font-bold text-lg text-white">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Outcome Section */}
      <section className="py-12 border-t border-zinc-800/80">
        <div className="p-8 sm:p-12 rounded-2xl bg-zinc-900/80 border border-zinc-700/80">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            FINISHED ARTIFACT &amp; IMPACT
          </span>
          <h3 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-white">
            The Outcome
          </h3>
          <p className="mt-4 text-base sm:text-lg text-zinc-200 leading-relaxed max-w-3xl">
            {project.outcome}
          </p>

          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-zinc-400">
              CRAFTED BY BAYD XN • READY FOR YOUR NEXT DIGITAL PRODUCT
            </span>

            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
            >
              <span>Build Something Similar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
