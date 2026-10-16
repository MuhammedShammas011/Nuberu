'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export interface ScrollRevealTextProps {
  text: string;
  className?: string;
  colorHidden?: string;
  colorRevealed?: string;
  splitMode?: 'Characters' | 'Words';
  revealDirection?: 'Left to Right' | 'Right to Left';
  stagger?: number;
  xOffset?: number;
  yOffset?: number;
  blur?: number;
  scale?: number;
  rotateX?: number;
  perspective?: number;
  offsetStart?: number; // Viewport % where reveal starts (e.g. 85)
  offsetEnd?: number;   // Viewport % where reveal completes (e.g. 25)
  trigger?: 'Scroll' | 'On Load';
  onLoadDuration?: number;
  htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
  previews?: Record<string, { image: string; tag: string }>;
}

interface SpanItem {
  char: string;
  unit: number;
  isSpace: boolean;
  isBold: boolean;
}

interface WordGroup {
  type: 'word' | 'space';
  spans: Array<SpanItem & { idx: number }>;
}

interface TextSegment {
  isBold: boolean;
  phrase: string;
  preview?: { image: string; tag: string };
  wordGroups: WordGroup[];
}

const DEFAULT_PREVIEWS: Record<string, { image: string; tag: string }> = {
  'Technology Neutral': {
    image: '/images/about/tech-neutral.jpg',
    tag: 'Silicon to Compute',
  },
  'Transformation Focused': {
    image: '/images/about/transformation.jpg',
    tag: 'Engineered Velocity',
  },
  'Clarity & Connection': {
    image: '/images/about/clarity-connection.jpg',
    tag: 'Full-Stack Mesh',
  },
};

function renderWordGroup(
  group: WordGroup,
  keyPrefix: string,
  spanRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
) {
  if (group.type === 'word') {
    return (
      <span
        key={keyPrefix}
        data-wg={group.spans[0]?.idx}
        style={{ whiteSpace: 'nowrap', display: 'inline' }}
      >
        {group.spans.map(({ char, idx, isBold }) => (
          <span
            key={idx}
            ref={(el) => {
              spanRefs.current[idx] = el;
            }}
            style={{
              display: 'inline-block',
              fontWeight: isBold ? 650 : 400,
              willChange: 'transform, opacity, color, filter',
            }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  }

  return group.spans.map(({ char, idx }) => (
    <span key={idx} style={{ display: 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
}

function BoldHoverPhrase({
  phrase,
  preview,
  wordGroups,
  spanRefs,
}: {
  phrase: string;
  preview?: { image: string; tag: string };
  wordGroups: WordGroup[];
  spanRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline-block cursor-pointer select-none group/phrase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
    >
      {/* Interactive underlined text */}
      <span className="underline decoration-[#B84A2B]/45 hover:decoration-[#B84A2B] decoration-2 underline-offset-[6px] transition-colors duration-200">
        {wordGroups.map((group, gi) =>
          renderWordGroup(group, `b-${phrase}-${gi}`, spanRefs)
        )}
      </span>

      {/* Very small floating image preview upon the same text */}
      <AnimatePresence>
        {isHovered && preview && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50 pointer-events-none flex flex-col items-center"
          >
            {/* Compact mini card */}
            <span className="block w-28 sm:w-32 h-20 sm:h-22 rounded-lg overflow-hidden border border-[#171614]/20 shadow-[0_12px_28px_rgba(0,0,0,0.22)] bg-[#171614] relative">
              <img
                src={preview.image}
                alt={phrase}
                className="w-full h-full object-cover block"
                loading="eager"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
              <span className="absolute bottom-1.5 left-2 right-2 font-mono text-[8.5px] font-semibold text-white/95 tracking-wider uppercase truncate block text-left">
                {preview.tag}
              </span>
            </span>

            {/* Caret pointing directly at the hovered word */}
            <span className="w-2 h-2 bg-[#171614] rotate-45 -mt-1 shadow-sm block" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/**
 * ScrollRevealText
 * Based on Framer's ScrollRevealText component (by AliThemes.com):
 * https://framer.com/m/ScrollRevealText-vXBxyx.js@ymLCSaN7wX7cJKeayNed
 *
 * Staggered scroll-linked text reveal with character/word splitting,
 * direct DOM manipulation for 60FPS/120FPS performance, CSS color-mix,
 * transform, blur, and opacity interpolation.
 * Enhanced with interactive mini image preview hover popovers for bold phrases.
 */
export default function ScrollRevealText({
  text,
  className = '',
  colorHidden = 'rgba(23, 22, 20, 0.18)',
  colorRevealed = '#171614',
  splitMode = 'Characters',
  revealDirection = 'Left to Right',
  stagger,
  xOffset = 7,
  yOffset = 0,
  blur = 0,
  scale = 1,
  rotateX = 0,
  perspective = 800,
  offsetStart = 85,
  offsetEnd = 25,
  trigger = 'Scroll',
  onLoadDuration = 1.5,
  htmlTag = 'h2',
  previews = DEFAULT_PREVIEWS,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const isVisible = useRef(false);
  const rafId = useRef<number>(0);
  const scheduled = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Parse markdown bold **text**, create spans, and preserve segment boundaries
  const { allSpans, unitCount, segments } = useMemo(() => {
    const rawSegments = String(text).split(/(\*\*.*?\*\*)/g);
    const spans: SpanItem[] = [];
    const textSegments: TextSegment[] = [];
    let unitIdx = 0;

    rawSegments.forEach((segment) => {
      if (!segment) return;
      const isBold = segment.startsWith('**') && segment.endsWith('**');
      const cleanText = isBold ? segment.slice(2, -2) : segment;
      const preview = isBold
        ? previews[cleanText] || previews[cleanText.replace(/&amp;/g, '&')]
        : undefined;

      const tokens = cleanText.split(/(\s+)/);
      const segmentSpans: Array<SpanItem & { idx: number }> = [];

      tokens.forEach((token) => {
        if (!token) return;
        const isSpace = /^\s+$/.test(token);
        const chars = Array.from(token);

        if (isSpace) {
          chars.forEach((ch) => {
            const globalIdx = spans.length;
            const item: SpanItem = { char: ch, unit: -1, isSpace: true, isBold: false };
            spans.push(item);
            segmentSpans.push({ ...item, idx: globalIdx });
          });
        } else if (splitMode === 'Words') {
          const idx = unitIdx++;
          chars.forEach((ch) => {
            const globalIdx = spans.length;
            const item: SpanItem = { char: ch, unit: idx, isSpace: false, isBold };
            spans.push(item);
            segmentSpans.push({ ...item, idx: globalIdx });
          });
        } else {
          // Characters mode
          chars.forEach((ch) => {
            const globalIdx = spans.length;
            const item: SpanItem = { char: ch, unit: unitIdx++, isSpace: false, isBold };
            spans.push(item);
            segmentSpans.push({ ...item, idx: globalIdx });
          });
        }
      });

      // Group segment spans into words and spaces
      const segmentGroups: WordGroup[] = [];
      let current: WordGroup | null = null;

      segmentSpans.forEach((span) => {
        if (span.isSpace) {
          if (current) {
            segmentGroups.push(current);
            current = null;
          }
          segmentGroups.push({ type: 'space', spans: [span] });
        } else {
          if (!current) current = { type: 'word', spans: [] };
          current.spans.push(span);
        }
      });
      if (current) segmentGroups.push(current);

      textSegments.push({
        isBold,
        phrase: cleanText,
        preview,
        wordGroups: segmentGroups,
      });
    });

    if (revealDirection === 'Right to Left') {
      const max = unitIdx - 1;
      spans.forEach((s) => {
        if (!s.isSpace) s.unit = max - s.unit;
      });
    }

    return { allSpans: spans, unitCount: unitIdx, segments: textSegments };
  }, [text, splitMode, revealDirection, previews]);

  // Animation Engine
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalUnits = unitCount;
    if (totalUnits === 0) return;

    spanRefs.current = spanRefs.current.slice(0, allSpans.length);

    // If user prefers reduced motion, show fully revealed
    if (shouldReduceMotion) {
      spanRefs.current.forEach((el, i) => {
        if (!el) return;
        const span = allSpans[i];
        if (!span || span.isSpace) return;
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = '';
        el.style.color = colorRevealed;
      });
      return;
    }

    // Dynamic stagger based on text length to keep animation smooth
    const computedStagger =
      stagger ?? Math.max(0.008, Math.min(0.04, 2.8 / totalUnits));
    const dur = 0.55;
    const totalTime = dur + (totalUnits - 1) * computedStagger;

    const applyProgress = (scrollP: number) => {
      const time = scrollP * totalTime;

      spanRefs.current.forEach((el, i) => {
        if (!el) return;
        const span = allSpans[i];
        if (!span || span.isSpace) return;

        const p =
          totalUnits <= 1
            ? scrollP
            : Math.max(0, Math.min(1, (time - span.unit * computedStagger) / dur));

        // Opacity transition from 0.18 to 1.0
        el.style.opacity = `${0.18 + p * 0.82}`;

        // Transform: translateX, translateY, scale, 3D tilt
        const tx = (-xOffset + xOffset * p).toFixed(1);
        const ty = (yOffset * (1 - p)).toFixed(1);
        let tf = `translateX(${tx}px) translateY(${ty}px)`;

        if (rotateX !== 0) {
          tf = `perspective(${perspective}px) rotateX(${(rotateX * (1 - p)).toFixed(1)}deg) ${tf}`;
        }
        if (scale < 1) {
          tf += ` scale(${(scale + (1 - scale) * p).toFixed(3)})`;
        }
        el.style.transform = tf;

        if (blur > 0) {
          el.style.filter = `blur(${(blur * (1 - p)).toFixed(1)}px)`;
        }

        // Color interpolation via CSS color-mix
        const pct = Math.round(p * 100);
        el.style.color = `color-mix(in srgb, ${colorRevealed} ${pct}%, ${colorHidden})`;
      });
    };

    // On Load trigger
    if (trigger === 'On Load') {
      let started = false;
      applyProgress(0);

      const startAnimation = () => {
        if (started) return;
        started = true;
        const startTime = performance.now();

        const animate = (now: number) => {
          const elapsed = (now - startTime) / 1000;
          const rawP = Math.min(1, elapsed / onLoadDuration);
          applyProgress(1 - Math.pow(1 - rawP, 3));
          if (rawP < 1) rafId.current = requestAnimationFrame(animate);
        };
        rafId.current = requestAnimationFrame(animate);
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            startAnimation();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(container);

      return () => {
        observer.disconnect();
        cancelAnimationFrame(rafId.current);
      };
    }

    // Scroll-linked trigger
    const startFrac = offsetStart / 100;
    const endFrac = offsetEnd / 100;

    const update = () => {
      const vh = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const range = (startFrac - endFrac) * vh;

      if (range <= 0) return;
      const scrollP = Math.max(0, Math.min(1, (startFrac * vh - rect.top) / range));
      applyProgress(scrollP);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) update();
      },
      { rootMargin: '250px' }
    );
    observer.observe(container);

    const onScroll = () => {
      if (!isVisible.current || scheduled.current) return;
      scheduled.current = true;
      rafId.current = requestAnimationFrame(() => {
        update();
        scheduled.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [
    allSpans,
    unitCount,
    shouldReduceMotion,
    stagger,
    xOffset,
    yOffset,
    blur,
    rotateX,
    perspective,
    scale,
    trigger,
    onLoadDuration,
    offsetStart,
    offsetEnd,
    colorHidden,
    colorRevealed,
  ]);

  const Tag = (htmlTag || 'h2') as React.ElementType;

  return (
    <Tag ref={containerRef} className={className}>
      {segments.map((seg, sIdx) => {
        if (seg.isBold) {
          return (
            <BoldHoverPhrase
              key={`seg-${sIdx}`}
              phrase={seg.phrase}
              preview={seg.preview}
              wordGroups={seg.wordGroups}
              spanRefs={spanRefs}
            />
          );
        }

        return (
          <React.Fragment key={`seg-${sIdx}`}>
            {seg.wordGroups.map((group, gi) =>
              renderWordGroup(group, `s${sIdx}-w${gi}`, spanRefs)
            )}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
