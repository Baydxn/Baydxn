import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ArrowRight, MessageCircle } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { RotatingHeroText } from '../components/RotatingHeroText';
import { PortraitCard } from '../components/PortraitCard';
import { RevealText } from '../components/RevealText';
import { Reveal } from '../components/Reveal';
import { Marquee } from '../components/Marquee';
import { ProjectCard } from '../components/ProjectCard';
import { ServiceCard } from '../components/ServiceCard';
import { SolutionCard } from '../components/SolutionCard';
import { siteConfig } from '../data/siteConfig';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { solutions } from '../data/solutions';
import { processStages } from '../data/process';
import { testimonials } from '../data/testimonials';

export const HomePage: React.FC = () => {
  return (
    <PageLayout chapterNumber="01" chapterTitle="INDEX / HERO" subtitle="VOLUME 01 — THE DIGITAL FOLIO">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-20 lg:pt-12 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small Label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                BAYD XN • DIGITAL CRAFTSMAN
              </span>
            </div>

            {/* Main Headline — editorial word-by-word reveal */}
            <RevealText
              as="h1"
              lines={['CODE. DESIGN.', 'DIGITAL CRAFT.']}
              lineClassNames={['text-white', 'text-outline']}
              stagger={0.1}
              className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.98]"
            />

            {/* Rotating Typography */}
            <div className="mt-4 flex items-center gap-3">
              <RotatingHeroText />
            </div>

            {/* Supporting Text */}
            <Reveal delay={0.5}>
              <p className="mt-6 text-xl sm:text-2xl text-zinc-200 font-medium max-w-2xl leading-snug">
                I build digital experiences where technology meets thoughtful
                design.
              </p>

              {/* Secondary Paragraph */}
              <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
                From websites and interfaces to visual systems and digital
                products, I turn ideas into polished experiences built for real
                people and real businesses.
              </p>
            </Reveal>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <NavLink
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all duration-200 shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>

              <NavLink
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-900 text-zinc-200 font-medium text-sm border border-zinc-700 hover:border-zinc-500 hover:text-white transition-all duration-200"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </NavLink>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-12 flex items-center gap-2 font-mono text-xs text-zinc-400 tracking-wider">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              <span>SCROLL TO EXPLORE ↓</span>
            </div>
          </div>

          {/* Right Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md lg:max-w-none">
              <PortraitCard initialPortrait="thoughtful" />
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Marquee Divider */}
      <div className="border-y border-zinc-800/80 py-5 bg-zinc-950/40">
        <Marquee
          items={[
            'WEB DEVELOPMENT',
            'UI / UX DESIGN',
            'GRAPHIC & BRAND',
            'PRODUCT ENGINEERING',
            'DIGITAL CRAFT',
          ]}
          itemClassName="font-display font-extrabold text-lg sm:text-2xl tracking-tight text-zinc-400"
          separatorClassName="text-sm"
          speedSeconds={38}
        />
      </div>

      {/* 2. INTRODUCTION / PHILOSOPHY */}
      <section className="py-20 border-t border-zinc-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              [CHAPTER 02 / ABOUT]
            </span>
            <RevealText
              as="h2"
              text="NOT JUST A WEBSITE."
              className="mt-3 font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight"
            />
            <p className="mt-2 text-sm font-mono text-zinc-400">
              A DIGITAL EXPERIENCE BUILT AROUND AN IDEA.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            <p>
              I’m Bayd XN — a web developer, digital designer and visual creative focused on building things that feel as good as they function.
            </p>
            <p>
              I work across code, interface design and visual communication to create digital experiences that are clean, purposeful and memorable.
            </p>
            <p className="text-zinc-400 text-base">
              My approach sits between creative thinking and technical execution — taking an idea from its earliest concept through design, development and a finished product.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <NavLink
                to="/about"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-white hover:text-zinc-300 underline underline-offset-4"
              >
                <span>Read Full Philosophy &amp; Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW */}
      <section className="py-20 border-t border-zinc-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              [CHAPTER 03 / CAPABILITIES]
            </span>
            <RevealText
              as="h2"
              text="WHAT I BUILD"
              className="mt-2 font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
            />
          </div>
          <NavLink
            to="/services"
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span>View All 4 Disciplines &amp; Specs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 4. SELECTED WORK PREVIEW */}
      <section className="py-20 border-t border-zinc-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              [CHAPTER 04 / PORTFOLIO]
            </span>
            <RevealText
              as="h2"
              text="SELECTED WORK"
              className="mt-2 font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
            />
          </div>
          <NavLink
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span>Explore Full Project Archives</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={idx === 0}
            />
          ))}
        </div>
      </section>

      {/* 5. PROBLEM / SOLUTION PREVIEW */}
      <section className="py-20 border-t border-zinc-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              [CHAPTER 06 / SOLUTIONS]
            </span>
            <RevealText
              as="h2"
              text="WHAT ARE YOU TRYING TO SOLVE?"
              className="mt-2 font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
            />
          </div>
          <NavLink
            to="/solutions"
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span>See All Strategic Solutions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.slice(0, 3).map((item) => (
            <SolutionCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 6. PROCESS PREVIEW */}
      <section className="py-20 border-t border-zinc-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              [CHAPTER 05 / METHODOLOGY]
            </span>
            <RevealText
              as="h2"
              text="FROM IDEA TO INTERFACE."
              className="mt-2 font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
            />
          </div>
          <NavLink
            to="/process"
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span>Inspect 6-Stage Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processStages.map((stage, idx) => (
            <Reveal key={stage.number} delay={idx * 0.07} y={20}>
              <div className="h-full p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-600 transition-colors">
                <span className="font-mono text-xs text-zinc-400 tabular">[{stage.number}]</span>
                <h3 className="mt-3 font-display font-bold text-xl text-white">
                  {stage.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  {stage.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIES TEASER */}
      <section className="py-20 border-t border-zinc-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              [CHAPTER 07 / FEEDBACK]
            </span>
            <RevealText
              as="h2"
              text="WORDS FROM PEOPLE I'VE WORKED WITH"
              className="mt-2 font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
            />
          </div>
          <NavLink
            to="/testimonies"
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span>Read Testimonies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
          <blockquote className="font-accent text-2xl sm:text-3xl text-white leading-snug">
            "{testimonials[0].quote}"
          </blockquote>
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800">
            <div>
              <p className="font-display font-bold text-sm text-white">
                {testimonials[0].clientName}
              </p>
              <p className="text-xs text-zinc-400">
                {testimonials[0].role} • {testimonials[0].company}
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
              DEMO CONTENT READY FOR REAL REVIEWS
            </span>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-24 border-t border-zinc-800/80 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            [CHAPTER 09 / COLLABORATION]
          </span>
          <RevealText
            as="h2"
            lines={['HAVE AN IDEA WORTH', 'BUILDING?']}
            lineClassNames={['text-white', 'font-accent-italic text-sheen']}
            stagger={0.09}
            className="mt-4 font-display font-extrabold text-4xl sm:text-6xl tracking-tight leading-[1.05]"
          />
          <Reveal delay={0.35}>
            <p className="mt-4 text-xl sm:text-2xl text-zinc-300 font-medium">
              Let's turn it into something real.
            </p>
          </Reveal>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>START A PROJECT →</span>
            </NavLink>

            <a
              href={siteConfig.social.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-zinc-900 text-white font-semibold text-sm border border-zinc-700 hover:border-zinc-400 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
