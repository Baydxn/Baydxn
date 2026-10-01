import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation, NavLink } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface PageLayoutProps {
  children: React.ReactNode;
  chapterNumber?: string;
  chapterTitle?: string;
  subtitle?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  chapterNumber,
  chapterTitle,
  subtitle,
}) => {
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }, [location.pathname, reduce]);

  // Find current and adjacent routes
  const currentIndex = siteConfig.routes.findIndex((r) => r.path === location.pathname);
  const prevRoute = currentIndex > 0 ? siteConfig.routes[currentIndex - 1] : null;
  const nextRoute =
    currentIndex >= 0 && currentIndex < siteConfig.routes.length - 1
      ? siteConfig.routes[currentIndex + 1]
      : null;

  return (
    <motion.div
      key={location.pathname}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: 18, scale: 0.995, filter: 'blur(6px)' }
      }
      animate={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      }
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: -18, scale: 0.995, filter: 'blur(6px)' }
      }
      transition={{
        duration: reduce ? 0.2 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative overflow-hidden w-full flex-grow pt-24 sm:pt-28 pb-16 book-texture min-h-[85vh] flex flex-col justify-between"
    >
      {/* Giant outlined chapter numeral — a watermark on every page */}
      {chapterNumber && (
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-8 right-0 sm:right-2 font-display font-extrabold leading-[0.75] tabular text-[10rem] sm:text-[16rem] lg:text-[23rem] text-outline-faint opacity-70"
        >
          {chapterNumber}
        </span>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Book Folio Top Strip */}
        <div className="mb-8 pb-4 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span className="uppercase tracking-widest text-[11px]">
              BAYD XN • DIGITAL FOLIO
            </span>
            {chapterNumber && (
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                CH. {chapterNumber}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {chapterTitle && (
              <span className="text-zinc-400 hidden sm:inline">{chapterTitle}</span>
            )}
            <span className="text-zinc-400 font-mono tabular">
              [P. {currentIndex >= 0 ? `0${currentIndex + 1}` : '00'} / 09]
            </span>
          </div>
        </div>

        {/* Subtitle / Chapter Intro if provided */}
        {subtitle && (
          <div className="mb-8 flex items-center gap-3">
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block h-px w-8 sm:w-14 origin-left bg-zinc-600"
            />
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              {subtitle}
            </p>
          </div>
        )}

        {/* Main Content Area */}
        <main>{children}</main>

        {/* Digital Book Pagination Navigation at Bottom */}
        <nav
          className="mt-20 pt-8 border-t border-zinc-800/80 flex items-center justify-between gap-4 text-xs font-mono text-zinc-400"
          aria-label="Digital Book Page Navigation"
        >
          {prevRoute ? (
            <NavLink
              to={prevRoute.path}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-600 hover:text-white transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>
                PREV: <strong className="text-zinc-300 font-normal">{prevRoute.label}</strong>
              </span>
            </NavLink>
          ) : (
            <div />
          )}

          {nextRoute ? (
            <NavLink
              to={nextRoute.path}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-600 hover:text-white transition-all group"
            >
              <span>
                NEXT: <strong className="text-zinc-300 font-normal">{nextRoute.label}</strong>
              </span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-600 hover:text-white transition-all group"
            >
              <span>RETURN TO INDEX [01]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NavLink>
          )}
        </nav>
      </div>
    </motion.div>
  );
};

