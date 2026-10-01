import React, { useState } from 'react';
import { ArrowRight, Check, ChevronDown, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { Service } from '../types';


interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group relative h-full flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-500 transition-all duration-300 shadow-xl"
      data-cursor="SERVICE"
    >
      <div>
        {/* Header: Number and Tag */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
            [{service.number}]
          </span>
          <span className="text-[11px] font-mono tracking-wider text-zinc-400 px-2.5 py-0.5 rounded-full bg-zinc-800/60 border border-zinc-700/50">
            SPECIFICATION
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
          {service.title}
        </h3>

        {/* Tagline & Description */}
        <p className="mt-2 text-xs font-mono text-zinc-400">
          {service.tagline}
        </p>
        <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
          {service.description}
        </p>

        {/* Capabilities List */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80">
          <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-3">
            CORE CAPABILITIES
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
            {service.capabilities.map((cap) => (
              <li key={cap} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-white transition-colors shrink-0" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Deliverables Drawer */}
        {expanded && (
          <div className="mt-6 pt-5 border-t border-zinc-800/80 animate-in fade-in duration-300">
            <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-zinc-400" />
              KEY DELIVERABLES
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 mb-4">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-zinc-300 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
              APPLIED TECHNOLOGIES
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="mt-8 pt-5 border-t border-zinc-800/80 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>{expanded ? 'Hide Specs' : 'View Full Specs'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        <NavLink
          to="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-zinc-300 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Commission</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>
    </div>
  );
};
