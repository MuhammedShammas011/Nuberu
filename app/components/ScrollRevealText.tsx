'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

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
    tag: 'Silicon Core',
  },
  'Transformation Focused': {
    image: '/images/about/transformation.jpg',
    tag: 'Cloud Velocity',
  },
  'Clarity & Connection': {
    image: '/images/about/clarity-connection.jpg',
    tag: 'Unified Mesh',
  },
};

function renderWordGroup(group: WordGroup, keyPrefix: string) {
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
            data-char-idx={idx}
            className={isBold ? 'group-hover/phrase:!text-[#B84A2B] transition-colors duration-200' : undefined}
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
}: {
  phrase: string;
  preview?: { image: string; tag: string };
  wordGroups: WordGroup[];
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates relative to this phrase element
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Organic snappy spring follower
  const springConfig = { damping: 24, stiffness: 280, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Dynamic tilt angle based on horizontal cursor movement velocity
  const prevX = useRef<number>(0);
  const rotateTilt = useMotionValue(0);
  const smoothTilt = useSpring(rotateTilt, { damping: 20, stiffness: 220 });

  const updateCoordinates = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const deltaX = x - prevX.current;
    prevX.current = x;
    const tilt = Math.max(-7, Math.min(7, deltaX * 0.9));
    rotateTilt.set(tilt);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      smoothX.jump(x);
      smoothY.jump(y);
      prevX.current = x;
    }
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateTilt.set(0);
  };

  return (
    <span
      ref={containerRef}
      className="relative inline-block cursor-pointer select-none group/phrase"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerEnter={handleMouseEnter}
      onPointerMove={(e) => updateCoordinates(e.clientX, e.clientY)}
      onPointerLeave={handleMouseLeave}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`${phrase} preview`}
    >
      {/* Interactive underlined text that illuminates in terracotta on hover */}
      <span
        className={`underline decoration-2 underline-offset-[6px] transition-colors duration-200 ${
          isHovered
            ? 'decoration-[#B84A2B] text-[#B84A2B]'
            : 'decoration-[#B84A2B]/40 group-hover/phrase:decoration-[#B84A2B] group-hover/phrase:text-[#B84A2B]'
        }`}
      >
        {wordGroups.map((group, gi) =>
          renderWordGroup(group, `b-${phrase}-${gi}`)
        )}
      </span>

      {/* Floating image preview tracking cursor smoothly across the text */}
      {preview && (
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.82, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.82, y: 6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                left: smoothX,
                top: smoothY,
                rotate: smoothTilt,
              }}
              className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full pb-3 flex flex-col items-center will-change-transform"
            >
              {/* Compact mini card with preview image & tag */}
              <span className="block w-28 sm:w-32 h-18 sm:h-20 rounded-xl overflow-hidden border border-white/20 shadow-[0_16px_36px_-8px_rgba(23,22,20,0.38),0_4px_12px_rgba(23,22,20,0.18)] bg-[#171614] relative">
                <Image
                  src={preview.image}
                  alt={phrase}
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                <span className="absolute bottom-1.5 left-2 right-2 font-mono text-[8.5px] font-semibold text-white/95 tracking-wider uppercase truncate block text-left">
                  {preview.tag}
                </span>
              </span>

              {/* Caret pointing directly upon the hovered cursor position */}
              <span className="w-2.5 h-2.5 bg-[#171614] rotate-45 -mt-1 shadow-sm block border-r border-b border-white/10" />
            </motion.span>
          )}
        </AnimatePresence>
      )}
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

    const charEls = Array.from(
      container.querySelectorAll<HTMLSpanElement>('[data-char-idx]')
    );

    // If user prefers reduced motion, show fully revealed
    if (shouldReduceMotion) {
      charEls.forEach((el) => {
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

      charEls.forEach((el) => {
        const i = Number(el.dataset.charIdx);
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
            />
          );
        }

        return (
          <React.Fragment key={`seg-${sIdx}`}>
            {seg.wordGroups.map((group, gi) =>
              renderWordGroup(group, `s${sIdx}-w${gi}`)
            )}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}