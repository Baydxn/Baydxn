import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const WhatsAppFloating: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside 
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
      aria-label="WhatsApp quick contact"
    >
      {/* Desktop Tooltip */}
      <div
        className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 text-zinc-100 border border-zinc-700/80 backdrop-blur-md shadow-xl text-xs font-medium tracking-wide transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Let's talk</span>
      </div>

      {/* Circular Button */}
      <a
        href={siteConfig.social.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Bayd XN on WhatsApp"
        data-cursor="TALK"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-zinc-900 hover:bg-white text-zinc-100 hover:text-black border border-zinc-700 hover:border-white shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-black"
      >
        {/* Subtle breathing glow */}
        <span className="absolute inset-0 rounded-full bg-white/5 group-hover:bg-white/20 animate-ping opacity-20 pointer-events-none" />

        <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
      </a>
    </aside>
  );
};
