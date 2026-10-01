import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types';


interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  return (
    <article
      data-cursor="VIEW"
      className={`group relative h-full flex flex-col justify-between rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-500 transition-all duration-300 shadow-xl ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <NavLink
        to={`/work/${project.slug}`}
        className="flex flex-col flex-grow focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-2xl"
        aria-label={`View project details for ${project.name}`}
      >
        {/* Project Visual Showcase */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-950 border-b border-zinc-800/80 grain">
          <img
            src={project.heroImage}
            alt={`${project.name} case study`}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103 protected-asset pointer-events-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

          {/* Hover view label (mirrors the custom cursor state) */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-4 py-2 rounded-full text-[11px] font-mono tracking-widest bg-white text-black font-semibold shadow-2xl">
              VIEW PROJECT
            </span>
          </div>

          {/* Category Chip */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-black/80 text-zinc-300 border border-zinc-700/80 backdrop-blur-md">
              {project.category}
            </span>
          </div>

          {/* Year Chip */}
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-400 bg-black/60 border border-zinc-800 backdrop-blur-md">
              {project.year}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-zinc-200 transition-colors tracking-tight">
                {project.name}
              </h3>
              <div className="w-9 h-9 rounded-full bg-zinc-800 group-hover:bg-white text-zinc-300 group-hover:text-black flex items-center justify-center transition-colors shrink-0">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-2">
              {project.shortDescription}
            </p>
          </div>

          {/* Tech Badges */}
          <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-800/70 text-zinc-300 border border-zinc-700/40"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] font-mono text-zinc-400">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>
      </NavLink>
    </article>
  );
};
