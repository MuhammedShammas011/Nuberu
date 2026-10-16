'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface Principle {
  number: string;
  code: string;
  title: string;
  statement: string;
  signal: string;
}

const principles: Principle[] = [
  {
    number: '01',
    code: 'ARCHITECTURAL INDEPENDENCE',
    title: 'Technology Neutral',
    statement:
      'Unbiased architecture recommendations dictated solely by operational realities, uptime requirements, and commercial constraints.',
    signal: 'Zero Vendor Lock-In',
  },
  {
    number: '02',
    code: 'ENGINEERED VELOCITY',
    title: 'Transformation Focused',
    statement:
      'Engineered outcomes designed to lower failure rates, eliminate technical debt, and guarantee predictable delivery.',
    signal: 'Measurable Agility & Day 2 SRE',
  },
  {
    number: '03',
    code: 'FULL-STACK RIGOR',
    title: 'Clarity & Connection',
    statement:
      'Connecting physical compute fabrics, multi-cloud landing zones, and continuous GitOps pipelines into one synchronized core.',
    signal: 'Silicon to Ingress Governance',
  },
];

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28 bg-[#F4EFE6] text-[#171614] relative overflow-hidden" id="about">
      <div className="container-custom relative z-10">
        {/* Top Editorial Anchor & Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-12 sm:pb-16 border-b border-[#171614]/10 items-start">
          {/* Left Column: Eyebrow + Refined Headline */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#171614]/[0.04] border border-[#171614]/[0.08] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B84A2B]" />
              <span className="text-[10.5px] font-mono font-semibold uppercase tracking-[0.16em] text-[#B84A2B]">
                About Nuberu
              </span>
            </div>

            <h2 className="text-[clamp(2.2rem,4.2vw,3.6rem)] font-extrabold tracking-[-0.035em] leading-[1.02] text-[#171614] m-0">
              Engineering from Silicon to Ingress.
            </h2>
          </div>

          {/* Right Column: Distilled Executive Manifesto */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6 pt-1">
            <p className="text-base sm:text-[1.05rem] text-[#171614]/75 font-normal leading-relaxed m-0">
              Enterprises do not need more fragmented point solutions. They need disciplined technical partners taking end-to-end architectural responsibility from physical rack cabling to multi-cloud Kubernetes ingress.
            </p>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#171614] hover:bg-[#B84A2B] px-5 py-3 rounded-full transition-all hover:shadow-[0_4px_16px_rgba(184,74,43,0.25)] hover:-translate-y-0.5"
              >
                <span>Explore Company Approach</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Minimal Editorial Paragraph Columns (No boxy card containers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-10 sm:pt-14">
          {principles.map((item, index) => {
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="pt-6 border-t border-[#171614]/15 flex flex-col justify-between"
              >
                <div>
                  {/* Eyebrow: Index + Code */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] font-semibold text-[#B84A2B] tracking-wider uppercase">
                      {item.number} {'//'} {item.code}
                    </span>
                  </div>

                  {/* Refined Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#171614] tracking-tight m-0 mb-3">
                    {item.title}
                  </h3>

                  {/* Clean, Small, Minimal Paragraph */}
                  <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-[#171614]/70 font-normal m-0">
                    {item.statement}
                  </p>
                </div>

                {/* Subtle Signal Line */}
                <div className="mt-6 pt-3 border-t border-[#171614]/[0.07] flex items-center gap-2 font-mono text-[11px] text-[#171614]/45">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E5A63]" />
                  <span>{item.signal}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Precision Telemetry Bar */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-[#171614]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#171614]/60">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-center sm:text-left">
            <span>ISO 27001 Methodology</span>
            <span className="text-[#171614]/20 hidden sm:inline">•</span>
            <span>Multi-Cloud Certified</span>
            <span className="text-[#171614]/20 hidden sm:inline">•</span>
            <span>Direct Principal Engagement</span>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171614] hover:text-[#B84A2B] transition-colors group"
          >
            <span>Learn More About Our Team</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#B84A2B]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
