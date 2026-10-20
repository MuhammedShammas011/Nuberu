'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const phases = [
  {
    step: '01',
    name: 'Consult',
    tag: 'Discovery & Audit',
    desc: 'We map your architecture, surface risks, and define the path forward before a single line changes.',
    img: '/images/methodology/consult.jpg',
    accent: '#B84A2B',
  },
  {
    step: '02',
    name: 'Design',
    tag: 'Blueprint & IaC',
    desc: 'Target architecture, infrastructure as code, and zero-downtime cutover runbooks — built to last.',
    img: '/images/methodology/design.jpg',
    accent: '#1E5A63',
  },
  {
    step: '03',
    name: 'Deploy',
    tag: 'Execution',
    desc: 'Hardened clusters, declarative GitOps pipelines, phased migrations with guaranteed rollback.',
    img: '/images/methodology/deploy.jpg',
    accent: '#B84A2B',
  },
  {
    step: '04',
    name: 'Manage',
    tag: 'Day 2 SRE',
    desc: 'Continuous reliability engineering, proactive security patching, and FinOps cost governance.',
    img: '/images/methodology/manage.jpg',
    accent: '#1E5A63',
  },
] as const;

export default function HowWeWork() {
  const [activeIdx, setActiveIdx] = useState(0);

  const active = phases[activeIdx];

  return (
    <section
      className="py-24 sm:py-32 bg-[#F4EFE6] text-[#171614]"
      id="delivery-approach"
    >
      <div className="container-custom">

        {/* ── Eyebrow ── */}
        <div className="flex items-center justify-between mb-14 pb-5 border-b border-[#171614]/10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B84A2B]" />
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#B84A2B]">
              Delivery Methodology
            </span>
          </div>
          <span className="font-mono text-[10.5px] text-[#171614]/35 uppercase tracking-wider hidden sm:block">
            04 phases
          </span>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT — heading + phase rows */}
          <div>
            <h2 className="text-[clamp(2.6rem,5vw,4rem)] font-extrabold tracking-[-0.035em] leading-[0.96] mb-12">
              How we{' '}
              <span className="text-[#171614]/25 font-light italic">
                deliver.
              </span>
            </h2>

            <div className="divide-y divide-[#171614]/10">
              {phases.map((phase, idx) => {
                const isActive = activeIdx === idx;

                return (
                  <motion.button
                    key={phase.step}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className="w-full text-left group flex items-center gap-5 py-6 cursor-pointer"
                  >
                    {/* Step */}
                    <span
                      className="font-mono text-[11px] font-bold shrink-0 w-6 transition-colors duration-200"
                      style={{ color: isActive ? phase.accent : '#17161435' }}
                    >
                      {phase.step}
                    </span>

                    {/* Thumbnail */}
                    <motion.div
                      className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0"
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        rotate: isActive ? 4 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                    >
                      <Image
                        src={phase.img}
                        alt={phase.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: phase.accent }}
                        animate={{ opacity: isActive ? 0.18 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>

                    {/* Name + tag */}
                    <div className="flex-1">
                      <p
                        className="text-[1.15rem] sm:text-xl font-bold tracking-tight leading-none m-0 transition-colors duration-200"
                        style={{ color: isActive ? phase.accent : '#171614' }}
                      >
                        {phase.name}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#171614]/40 mt-1 m-0">
                        {phase.tag}
                      </p>
                    </div>

                    {/* Arrow */}
                    <motion.svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      animate={{
                        x: isActive ? 2 : 0,
                        opacity: isActive ? 1 : 0.2,
                      }}
                      transition={{ duration: 0.2 }}
                      style={{ color: phase.accent }}
                      className="shrink-0"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — large image + description panel */}
          <div className="lg:sticky lg:top-32">
            <div className="relative rounded-2xl overflow-hidden bg-[#171614]/[0.04] aspect-[4/3] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.img}
                    alt={active.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171614]/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Bottom text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] mb-2"
                      style={{ color: active.accent }}
                    >
                      {active.step} — {active.tag}
                    </p>
                    <p className="text-[#F4EFE6] text-[14px] sm:text-[15px] leading-relaxed m-0 max-w-xs">
                      {active.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-5 justify-center">
              {phases.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: activeIdx === i ? 24 : 6,
                    height: 6,
                    background: activeIdx === i ? p.accent : '#17161420',
                  }}
                />
              ))}
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <p className="mt-16 font-mono text-[10.5px] text-[#171614]/30 tracking-wider text-center border-t border-[#171614]/10 pt-8">
          End-to-end — from first audit to continuous SRE, no hand-offs.
        </p>

      </div>
    </section>
  );
}
