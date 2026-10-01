import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, BookOpen } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  // (Handled by each NavLink's onClick, so no effect is needed here.)

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Current chapter calculation
  const currentRoute = siteConfig.routes.find((r) => r.path === location.pathname) || {
    chapter: '04',
    label: 'Case Study',
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-zinc-950/85 backdrop-blur-md border-zinc-800/80 py-3 shadow-md'
            : 'bg-zinc-950/40 backdrop-blur-xs border-zinc-900/60 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Chapter indicator */}
          <NavLink
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="Bayd XN Home"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-sm tracking-tighter text-white group-hover:bg-white group-hover:text-black transition-colors duration-200">
              BX
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                BAYD XN
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
                CH. {currentRoute.chapter} / {currentRoute.label}
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/90 rounded-full px-3 py-1.5 backdrop-blur-md">
            {siteConfig.routes.map((route) => {
              const isActive = location.pathname === route.path;
              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={`relative px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-zinc-800/90 shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <span className="font-mono text-[10px] text-zinc-400 mr-1.5">
                    {route.chapter}
                  </span>
                  <span>{route.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action / Mobile Toggle */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 border border-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </NavLink>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open book index'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#09090b] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto no-scrollbar"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation index"
          >
          {/* Giant outlined brand watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-x-0 bottom-16 text-center font-display font-extrabold leading-none text-[24vw] sm:text-[18vw] text-outline-faint opacity-50"
          >
            BAYD XN
          </span>

          {/* Overlay Top Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-zinc-400" />
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                DIGITAL BOOK INDEX
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Route Chapters List */}
          <nav className="flex flex-col gap-2 my-auto py-6 overflow-y-auto">
            {siteConfig.routes.map((route, idx) => {
              const isActive = location.pathname === route.path;
              return (
                <motion.div
                  key={route.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + idx * 0.045,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <NavLink
                    to={route.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-baseline justify-between py-2.5 px-3 rounded-lg border border-transparent transition-all duration-200 ${
                      isActive
                        ? 'bg-zinc-900 border-zinc-800 text-white'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-zinc-400 group-hover:text-zinc-400">
                        [{route.chapter}]
                      </span>
                      <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                        {route.label}
                      </span>
                    </div>
                    <span className="font-accent-italic text-xs text-zinc-400 hidden sm:inline">
                      {route.title}
                    </span>
                  </NavLink>
                </motion.div>
              );
            })}
          </nav>

          {/* Overlay Footer */}
          <div className="border-t border-zinc-800/80 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-zinc-400">
                {siteConfig.brand.name} • {siteConfig.brand.descriptor}
              </p>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                {siteConfig.social.whatsappNumber}
              </p>
            </div>
            <a
              href={siteConfig.social.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-4 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wide hover:bg-zinc-200 transition-colors"
            >
              Direct WhatsApp Chat
            </a>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
