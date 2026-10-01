import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, BookX } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { RevealText } from '../components/RevealText';

export const NotFoundPage: React.FC = () => {
  return (
    <PageLayout chapterNumber="00" chapterTitle="INDEX ERROR / 404" subtitle="FOLIO ERRATUM • PAGE UNRECORDED">
      <div className="py-24 sm:py-32 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-300 mb-8 shadow-xl">
          <BookX className="w-8 h-8" />
        </div>

        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">
          ERROR 404 • CHAPTER MISSING
        </span>

        <RevealText
          as="h1"
          text="THIS PAGE DOESN'T EXIST."
          className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight"
        />

        <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
          "Looks like we turned the wrong page."
        </p>

        <div className="mt-10 flex items-center gap-4">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all shadow-xl"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK HOME</span>
          </NavLink>

          <NavLink
            to="/work"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs hover:text-white hover:border-zinc-700 transition-all"
          >
            <span>VIEW WORK [04]</span>
          </NavLink>
        </div>
      </div>
    </PageLayout>
  );
};
