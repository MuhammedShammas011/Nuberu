'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

const principles = [
  {
    title: 'Technology Neutral',
    desc: 'Unbiased architecture recommendations tailored to operational realities and commercial constraints.',
  },
  {
    title: 'Transformation Focused',
    desc: 'Engineered outcomes that deliver tangible agility, lower failure rates, and predictable delivery.',
  },
  {
    title: 'Clarity & Connection',
    desc: 'Connecting platforms, operational telemetry, and engineering practices into a coherent core.',
  },
];

export default function AboutSection() {
  return (
    <section className="py-28 bg-[#171614] text-[#F4EFE6] relative overflow-hidden" id="about">
      {/* Subtle monogram-inspired grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#F4EFE6 1px, transparent 1px), linear-gradient(90deg, #F4EFE6 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Sticky Title & Eyebrow) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#B84A2B] mb-4">
              About Nuberu
            </p>
            <h2 className="text-[clamp(2.1rem,3.8vw,3.4rem)] font-bold tracking-[-0.03em] leading-[1.12] text-white">
              ENGINEERING THE NEXT STAGE OF ENTERPRISE TECHNOLOGY.
            </h2>
            <div className="mt-8 pt-8 border-t border-white/10 hidden lg:block">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#F4EFE6] bg-[#B84A2B] hover:bg-[#9E3E23] px-6 py-3 rounded-full transition-all hover:-translate-y-0.5"
              >
                Explore Company Approach
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column (Core Narrative & Delivery Principles) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col gap-10"
          >
            <p className="text-[clamp(1.2rem,1.8vw,1.5rem)] leading-[1.55] font-normal text-[#F4EFE6]/90">
              Nuberu brings infrastructure, cloud, containers, automation and modern application capabilities together to help organisations evolve complex technology environments. From assessment and architecture through implementation, migration and managed operations, its approach is built around clarity, connection and transformation.
            </p>

            <p className="text-base leading-relaxed text-[#F4EFE6]/60">
              In an era of hyper-complexity, fragmented tools and shifting vendor models, enterprises do not need more point solutions. They need disciplined technical partners capable of taking architectural responsibility from the physical rack to the Kubernetes ingress.
            </p>

            {/* Principles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {principles.map((item, i) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="w-2 h-2 rounded-full bg-[#1E5A63] block mb-4" />
                    <h4 className="text-base font-semibold text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-[#F4EFE6]/55">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:hidden pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#F4EFE6] bg-[#B84A2B] px-6 py-3 rounded-full"
              >
                Explore Company Approach
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
