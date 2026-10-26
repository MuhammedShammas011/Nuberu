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
      className="pt-20 pb-12 lg:pt-24 lg:pb-14 bg-[#F4EFE6] text-[#171614] border-b border-[#171614]/8"
      id="delivery-approach"
    >
      <div className="container-custom">
        {/* ── Two-column layout matching Hero aesthetic ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">

          {/* LEFT — Hero-style heading + phase rows */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#68635B] mb-6">
                DELIVERY METHODOLOGY
              </p>

              <h2 className="text-[clamp(3.3rem,6.8vw,5.8rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#171614] m-0">
                How We<br />
                Work.
              </h2>

              <p className="text-[1.08rem] leading-[1.62] text-[#555047] max-w-[500px] mt-6 mb-10">
                A disciplined four-stage delivery model engineered to manage risk, accelerate implementation, and ensure operational continuity.
              </p>
            </motion.div>

            {/* Interactive phase rows */}
            <div className="divide-y divide-[#171614]/10 border-t border-b border-[#171614]/10">
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
                    className="w-full text-left group flex items-center gap-5 py-5 sm:py-6 cursor-pointer transition-colors duration-200"
                  >
                    {/* Step */}
                    <span
                      className="font-mono text-[11px] font-bold shrink-0 w-6 transition-colors duration-200"
                      style={{ color: isActive ? phase.accent : '#17161435' }}
                    >
                      {phase.step}
                    </span>

                    {/* Small interactive thumbnail */}
                    <motion.div
                      className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 shadow-sm"
                      animate={{
                        scale: isActive ? 1.12 : 1,
                        rotate: isActive ? 3 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                    >
                      <Image
                        src={phase.img}
                        alt={phase.name}
                        fill
                        className="object-cover"
                        sizes="44px"
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
                        className="text-[1.2rem] sm:text-2xl font-bold tracking-tight leading-none m-0 transition-colors duration-200"
                        style={{ color: isActive ? phase.accent : '#171614' }}
                      >
                        {phase.name}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#171614]/45 mt-1.5 m-0">
                        {phase.tag}
                      </p>
                    </div>

                    {/* Arrow */}
                    <motion.svg
                      width="18" height="18" viewBox="0 0 16 16" fill="none"
                      animate={{
                        x: isActive ? 3 : 0,
                        opacity: isActive ? 1 : 0.25,
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

          {/* RIGHT — Large interactive card matching Hero right-card visual language */}
          <div className="lg:sticky lg:top-28">
            <div className="relative rounded-[32px] overflow-hidden shadow-[0_24px_60px_-15px_rgba(23,22,20,0.12)] bg-[#171614] aspect-[1/1.02] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.img}
                    alt={active.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority
                  />
                  {/* Subtle dark gradient overlay to keep text legible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171614]/75 via-[#171614]/20 to-transparent" />
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
                    <div className="inline-flex items-center gap-2 mb-2 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: active.accent }}
                      />
                      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#F4EFE6]">
                        {active.step} · {active.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F4EFE6] tracking-tight mb-2 m-0">
                      {active.name}
                    </h3>

                    <p className="text-[#F4EFE6]/80 text-[13.5px] sm:text-[14.5px] leading-relaxed m-0 max-w-md">
                      {active.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress dots indicator */}
            <div className="flex items-center gap-2 mt-5 justify-center">
              {phases.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: activeIdx === i ? 24 : 6,
                    height: 6,
                    background: activeIdx === i ? p.accent : '#17161425',
                  }}
                  aria-label={`Go to phase ${p.step}: ${p.name}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* ── Minimal footer note ── */}
        <div className="w-full flex items-center justify-center border-t border-[#171614]/10 mt-8 pt-5 text-center">
          <p className="font-mono text-[11.5px] text-[#171614]/40 tracking-wider text-center m-0 max-w-2xl">
            End-to-end delivery — from first architecture audit to continuous Day 2 SRE.
          </p>
        </div>
      </div>
    </section>
  );
}
