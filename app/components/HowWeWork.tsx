'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const phases = [
  {
    step: '01',
    name: 'Consult',
    tag: 'Discovery',
    desc: 'We audit your architecture, map dependencies, and identify risks before a single line changes.',
    img: '/images/methodology/consult.jpg',
    accent: '#B84A2B',
  },
  {
    step: '02',
    name: 'Design',
    tag: 'Blueprint',
    desc: 'Target architectures, IaC scaffolds, and zero-downtime cutover runbooks — designed to last.',
    img: '/images/methodology/design.jpg',
    accent: '#1E5A63',
  },
  {
    step: '03',
    name: 'Deploy',
    tag: 'Execution',
    desc: 'Hardened clusters, GitOps pipelines, and phased migrations with rollback guarantees.',
    img: '/images/methodology/deploy.jpg',
    accent: '#B84A2B',
  },
  {
    step: '04',
    name: 'Manage',
    tag: 'Day 2 SRE',
    desc: 'Continuous reliability engineering, security patching, and FinOps governance — ongoing.',
    img: '/images/methodology/manage.jpg',
    accent: '#1E5A63',
  },
] as const;

export default function HowWeWork() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      className="py-24 sm:py-32 bg-[#171614] text-[#F4EFE6] overflow-hidden"
      id="delivery-approach"
    >
      <div className="container-custom">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B84A2B]" />
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#B84A2B]">
              Delivery Methodology
            </span>
          </span>

          <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-extrabold tracking-[-0.03em] leading-[1] m-0">
            How we{' '}
            <span className="text-[#F4EFE6]/30 font-light italic">work.</span>
          </h2>
        </motion.div>

        {/* ── Phase Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F4EFE6]/10 rounded-2xl overflow-hidden">
          {phases.map((phase, idx) => {
            const isHovered = hovered === idx;

            return (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex flex-col bg-[#171614] cursor-default overflow-hidden group"
              >
                {/* Image block */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#1a1917]">
                  <Image
                    src={phase.img}
                    alt={phase.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Overlay tint on hover */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `${phase.accent}22`,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />
                  {/* Step number top-left */}
                  <span
                    className="absolute top-4 left-4 font-mono text-xs font-bold px-2 py-0.5 rounded backdrop-blur-sm"
                    style={{
                      color: phase.accent,
                      background: `${phase.accent}18`,
                      border: `1px solid ${phase.accent}30`,
                    }}
                  >
                    {phase.step}
                  </span>
                </div>

                {/* Text block */}
                <div className="p-6 flex flex-col gap-2 flex-1">
                  {/* Tag */}
                  <span
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300"
                    style={{ color: isHovered ? phase.accent : '#F4EFE6' + '50' }}
                  >
                    {phase.tag}
                  </span>

                  {/* Name */}
                  <h3 className="text-xl font-bold tracking-tight text-[#F4EFE6] m-0">
                    {phase.name}
                  </h3>

                  {/* Desc */}
                  <p className="text-[13.5px] leading-relaxed text-[#F4EFE6]/55 m-0">
                    {phase.desc}
                  </p>
                </div>

                {/* Bottom accent line on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{ background: phase.accent }}
                  initial={false}
                  animate={{ width: isHovered ? '100%' : '0%' }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 font-mono text-[11px] text-[#F4EFE6]/30 tracking-wider text-center"
        >
          From first audit to continuous SRE — end-to-end, no hand-offs.
        </motion.p>

      </div>
    </section>
  );
}
