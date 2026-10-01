import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { RevealText } from '../components/RevealText';
import { projects } from '../data/projects';
import { ArrowRight } from 'lucide-react';


export const WorkPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = ['all', 'E-commerce', 'Creative Concept', 'Platform'];

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'E-commerce') return project.category.includes('Commerce');
    if (selectedFilter === 'Creative Concept') return project.category.includes('Creative');
    if (selectedFilter === 'Platform') return project.category.includes('Platform');
    return true;
  });

  return (
    <PageLayout chapterNumber="04" chapterTitle="SELECTED WORK / ARCHIVE" subtitle="CHAPTER 04 — CASE STUDIES IN CRAFT &amp; CODE">
      {/* Header */}
      <section className="pb-12 border-b border-zinc-800/80">
        <div className="max-w-4xl">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            PORTFOLIO SHOWCASE
          </span>
          <RevealText
            as="h1"
            lines={['SELECTED', 'WORK']}
            lineClassNames={['text-white', 'text-outline']}
            stagger={0.1}
            className="mt-4 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02]"
          />
          <Reveal delay={0.3}>
            <p className="mt-4 text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed">
              A curated index of digital experiences, custom web applications, and interactive platforms engineered for real people and real businesses.
            </p>
          </Reveal>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                selectedFilter === cat
                  ? 'bg-white text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat === 'all' ? 'All Selected Works (3)' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.09} y={30} className={idx === 0 ? 'md:col-span-2' : ''}>
              <ProjectCard
                project={project}
                featured={idx === 0}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Project Replacement Note */}
      <section className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-xs font-mono text-zinc-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-zinc-200 font-semibold block mb-0.5">
            CONTENT ARCHITECTURE NOTE:
          </span>
          <span>
            Projects are managed dynamically in <code className="text-zinc-300">src/data/projects.ts</code> and ready to connect to any future headless CMS or database.
          </span>
        </div>

        <NavLink
          to="/contact"
          className="inline-flex items-center gap-1.5 text-white hover:text-zinc-300 font-semibold shrink-0"
        >
          <span>Build your project next</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </section>
    </PageLayout>
  );
};
