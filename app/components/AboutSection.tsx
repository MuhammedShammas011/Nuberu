'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollRevealText from './ScrollRevealText';

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28 bg-[#F4EFE6] text-[#171614] relative overflow-hidden" id="about">
      <div className="container-custom relative z-10">
        {/* Top Eyebrow Bar */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between mb-8 sm:mb-10 pb-4 border-b border-[#171614]/10"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#171614]/[0.04] border border-[#171614]/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B84A2B]" />
            <span className="text-[10.5px] font-mono font-semibold uppercase tracking-[0.16em] text-[#B84A2B]">
              About Nuberu
            </span>
          </div>
        </motion.div>

        {/* Prominent Editorial Manifesto Statement with ScrollRevealText Animation */}
        <div className="max-w-5xl">
          <ScrollRevealText
            htmlTag="h2"
            splitMode="Characters"
            xOffset={7}
            offsetStart={85}
            offsetEnd={25}
            colorHidden="rgba(23, 22, 20, 0.2)"
            colorRevealed="#171614"
            className="text-[clamp(1.4rem,2.5vw,2.3rem)] leading-[1.42] text-[#171614] font-normal tracking-[-0.025em] m-0"
            text="Our practice operates across three interconnected commitments: delivering **Technology Neutral** architecture recommendations dictated solely by operational realities and uptime requirements with zero vendor lock-in; engineering **Transformation Focused** outcomes that lower failure rates, eliminate technical debt, and ensure predictable velocity; and establishing **Clarity & Connection** by synchronizing physical compute fabrics, multi-cloud landing zones, and continuous GitOps pipelines into one governed core from silicon to ingress."
          />
        </div>

        {/* Bottom Precision Telemetry Bar */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-[#171614]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#171614]/60">
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
