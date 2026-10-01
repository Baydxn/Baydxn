import React from 'react';
import { useReducedMotion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Seconds for one full loop. Larger = slower. */
  speedSeconds?: number;
  reverse?: boolean;
  itemClassName?: string;
  separatorClassName?: string;
}

/**
 * Infinite horizontal ticker used as an editorial divider.
 * Renders the item list twice and translates -50% for a seamless loop.
 * Freezes (static) when the user prefers reduced motion.
 */
export const Marquee: React.FC<MarqueeProps> = ({
  items,
  className = '',
  speedSeconds = 34,
  reverse = false,
  itemClassName = '',
  separatorClassName = '',
}) => {
  const reduce = useReducedMotion();
  const track = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden ${className}`}
    >
      <div
        className={`flex w-max ${reduce ? '' : 'marquee-track'}`}
        style={
          reduce
            ? undefined
            : {
                animationDuration: `${speedSeconds}s`,
                animationDirection: reverse ? 'reverse' : 'normal',
              }
        }
      >
        {track.map((item, idx) => (
          <span
            key={idx}
            className={`flex items-center whitespace-nowrap ${itemClassName}`}
          >
            <span>{item}</span>
            <span
              className={`mx-6 sm:mx-10 select-none text-zinc-700 ${separatorClassName}`}
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};
