'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const phases = [
  {
    step: '01',
    name: 'Consult',
    tag: 'Discovery & Audit',
    desc: 'We map your architecture, surface risks, and define the path forward.',
    img: '/images/methodology/consult.jpg',
    accent: '#B84A2B',
  },
  {
    step: '02',
    name: 'Design',
    tag: 'Blueprint & IaC',
    desc: 'Target architecture, infrastructure as code, and cutover runbooks.',
    img: '/images/methodology/design.jpg',
    accent: '#1E5A63',
  },
  {
    step: '03',
    name: 'Deploy',
    tag: 'Execution',
    desc: 'Hardened clusters, GitOps pipelines, phased migration with rollback.',
    img: '/images/methodology/deploy.jpg',
    accent: '#B84A2B',
  },
  {
    step: '04',
    name: 'Manage',
    tag: 'Day 2 SRE',
    desc: 'Continuous reliability, security patching, and cost governance.',
    img: '/images/methodology/manage.jpg',
    accent: '#1E5A63',
  },
] as const;

export default function HowWeWork() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      className="py-24 sm:py-32 bg-[#F4EFE6] text-[#171614]"
      id="delivery-approach"
    >
      <div className="container-custom">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-16 pb-5 border-b border-[#171614]/10">
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

        {/* ── Phase rows ── */}
        <div className="space-y-0 divide-y divide-[#171614]/10">
          {phases.map((phase, idx) => {
            const isActive = activeIdx === idx;

            return (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className="group flex items-center gap-6 sm:gap-10 py-7 sm:py-8 cursor-default"
              >
                {/* Step number */}
                <span
                  className="font-mono text-[11px] font-bold shrink-0 transition-colors duration-200"
                  style={{ color: isActive ? phase.accent : '#17161440' }}
                >
                  {phase.step}
                </span>

                {/* Small interactive image */}
                <div className="relative shrink-0">
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden relative shadow-sm"
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      rotate: isActive ? 3 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  >
                    <Image
                      src={phase.img}
                      alt={phase.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                    {/* color overlay */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: phase.accent }}
                      animate={{ opacity: isActive ? 0.15 : 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  </motion.div>

                  {/* Glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: isActive
                        ? `0 0 0 2px ${phase.accent}60, 0 8px 24px -4px ${phase.accent}40`
                        : '0 0 0 0px transparent',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Name */}
                <div className="min-w-[80px] sm:min-w-[120px]">
                  <motion.h3
                    className="text-lg sm:text-2xl font-bold tracking-tight m-0 leading-none transition-colors duration-200"
                    style={{ color: isActive ? phase.accent : '#171614' }}
                  >
                    {phase.name}
                  </motion.h3>
                </div>

                {/* Tag + Desc */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-[#171614]/40 shrink-0">
                    {phase.tag}
                  </span>

                  {/* Description fades in on hover */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        key="desc"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.22 }}
                        className="text-[13px] text-[#171614]/65 leading-snug m-0"
                      >
                        {phase.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accent dot right */}
                <motion.span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: phase.accent }}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.4 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <p className="mt-12 font-mono text-[10.5px] text-[#171614]/30 tracking-wider text-center">
          End-to-end — from first audit to continuous SRE, no hand-offs.
        </p>

      </div>
    </section>
  );
}
