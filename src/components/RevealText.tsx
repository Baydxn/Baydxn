import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';

interface RevealTextProps {
  /** Single-line text. Ignored when `lines` is provided. */
  text?: string;
  /** Multi-line text — each entry renders on its own line. */
  lines?: string[];
  /** Optional per-line class names (aligned with `lines`). */
  lineClassNames?: string[];
  /** Semantic tag to render. */
  as?: RevealTag;
  className?: string;
  delay?: number;
  /** Seconds between each word's reveal. */
  stagger?: number;
  once?: boolean;
}

/**
 * Editorial word-by-word headline reveal.
 * Words rise, unblur and settle on an ease-out curve — never a typewriter.
 * Collapses to plain static text under reduced-motion.
 */
export const RevealText: React.FC<RevealTextProps> = ({
  text,
  lines,
  lineClassNames,
  as = 'div',
  className = '',
  delay = 0,
  stagger = 0.052,
  once = true,
}) => {
  const reduce = useReducedMotion();
  const Tag = as as React.ElementType;
  const contentLines = lines && lines.length > 0 ? lines : [text ?? ''];

  if (reduce) {
    return (
      <Tag className={className}>
        {contentLines.map((line, i) => (
          <React.Fragment key={i}>
            <span className={lineClassNames?.[i] ?? ''}>{line}</span>
            {i < contentLines.length - 1 ? <br /> : null}
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  const wordsByLine = contentLines.map((line) => line.split(' '));

  /** Pure word-count of every line before `lineIndex` (no mutation during render). */
  const wordsBefore = (lineIndex: number) =>
    wordsByLine
      .slice(0, lineIndex)
      .reduce((total, words) => total + words.length, 0);

  return (
    <Tag className={className}>
      {contentLines.map((_line, lineIdx) => (
        <span key={lineIdx} className={`block ${lineClassNames?.[lineIdx] ?? ''}`}>
          {wordsByLine[lineIdx].map((word, wIdx) => (
            <motion.span
              key={`${lineIdx}-${wIdx}`}
              className="inline-block will-change-transform"
              initial={{ opacity: 0, y: '0.5em', filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once, margin: '-8%' }}
              transition={{
                duration: 0.7,
                delay: delay + (wordsBefore(lineIdx) + wIdx) * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {wIdx < wordsByLine[lineIdx].length - 1 ? '\u00A0' : ''}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
};
