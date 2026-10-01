import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/70 text-zinc-400 py-16 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-800/60">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-xs tracking-tighter text-white">
                  BX
                </span>
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  {siteConfig.brand.name}
                </span>
              </div>
              <p className="mt-3 text-sm text-zinc-300 font-medium">
                {siteConfig.brand.tagline}
              </p>
              <p className="mt-2 text-xs text-zinc-400 max-w-sm leading-relaxed">
                Modern tools. Thoughtful engineering. Purpose-built experiences.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE FOR Q4 PROJECTS
              </span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
              INDEX / NAVIGATION
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {siteConfig.routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className="text-zinc-400 hover:text-white transition-colors py-1 flex items-center gap-1.5 group"
                >
                  <span className="font-mono text-[10px] text-zinc-400 group-hover:text-zinc-400">
                    {route.chapter}
                  </span>
                  <span>{route.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
              CONNECT &amp; DIRECT
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href={siteConfig.social.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-zinc-300 hover:text-white group border-b border-zinc-900 pb-1.5"
                >
                  <span>X (Twitter)</span>
                  <span className="font-mono text-zinc-400 group-hover:text-white flex items-center gap-0.5">
                    {siteConfig.social.x}
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-zinc-300 hover:text-white group border-b border-zinc-900 pb-1.5"
                >
                  <span>WhatsApp</span>
                  <span className="font-mono text-zinc-400 group-hover:text-white flex items-center gap-0.5">
                    Direct Chat
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <p>© 2026 Bayd XN. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Craft + Code + Design</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
