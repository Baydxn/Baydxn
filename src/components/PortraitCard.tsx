import React, { useState, useRef } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface PortraitCardProps {
  initialPortrait?: 'confident' | 'thoughtful';
  className?: string;
}

export const PortraitCard: React.FC<PortraitCardProps> = ({
  initialPortrait = 'thoughtful',
  className = '',
}) => {
  const [activePortrait, setActivePortrait] = useState<'confident' | 'thoughtful'>(initialPortrait);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt degrees (max 6 deg)
    const tiltX = ((y - centerY) / centerY) * -5;
    const tiltY = ((x - centerX) / centerX) * 5;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const togglePortrait = () => {
    setActivePortrait((prev) => (prev === 'thoughtful' ? 'confident' : 'thoughtful'));
  };

  const imageSrc =
    activePortrait === 'confident'
      ? siteConfig.portraits.confident
      : siteConfig.portraits.thoughtful;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group perspective-1000 ${className}`}
      data-cursor="PORTRAIT"
    >
      {/* Outer subtle halo */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 opacity-50 group-hover:opacity-80 transition-opacity duration-500 blur-sm pointer-events-none" />

      {/* Main Frame with 3D tilt */}
      <div
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-700/80 shadow-2xl transition-all duration-300"
      >
        {/* Aspect Ratio Box */}
        <div className="relative aspect-4/5 w-full overflow-hidden bg-zinc-950">
          <img
            src={imageSrc}
            alt="Bayd XN — Digital Craftsman & Technologist"
            className="w-full h-full object-cover grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700 ease-out protected-asset pointer-events-none"
            loading="lazy"
          />

          {/* Editorial Grain Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-85" />

          {/* Top Stamp / Badge */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono tracking-wider text-zinc-300">
            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-zinc-700/60 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-zinc-300" />
              DIGITAL CRAFTSMAN
            </span>
            <button
              onClick={togglePortrait}
              title="Switch portrait pose"
              className="p-1.5 rounded-full bg-black/70 backdrop-blur-md border border-zinc-700/60 hover:text-white hover:border-zinc-500 transition-colors"
              aria-label="Toggle portrait pose"
            >
              <RefreshCw className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
            </button>
          </div>

          {/* Bottom Integrated Caption */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-3.5 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-display font-bold text-white tracking-tight">
                  BAYD XN
                </span>
                <span className="font-mono text-[10px] text-zinc-400">
                  LAGOS / GLOBAL
                </span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-400 leading-tight">
                Web Developer • UI/UX Designer • Digital Product Builder
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
