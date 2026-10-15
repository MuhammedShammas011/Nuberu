'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Compass, Cpu, Rocket, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface Stage {
  step: string;
  name: string;
  subtitle: string;
  timeline: string;
  icon: typeof Compass;
  description: string;
  keyDeliverables: string[];
  focusPill: string;
}

const stages: Stage[] = [
  {
    step: '01',
    name: 'CONSULT',
    subtitle: 'Discovery & Assessment',
    timeline: 'Weeks 1–2',
    icon: Compass,
    description: 'We audit your existing workload architecture, technical constraints, security posture, and business objectives.',
    focusPill: 'Risk & Landscape Audit',
    keyDeliverables: [
      'Current-state architecture audit',
      'Cost & migration risk matrix',
      'Dependency mapping & gaps',
    ],
  },
  {
    step: '02',
    name: 'DESIGN',
    subtitle: 'Architecture & Planning',
    timeline: 'Weeks 3–4',
    icon: Cpu,
    description: 'We engineer target multi-cloud topologies, platform specifications, Infrastructure as Code scaffolds, and cutover roadmaps.',
    focusPill: 'Target Blueprint',
    keyDeliverables: [
      'High-Level Design (HLD) blueprint',
      'Terraform / IaC module foundations',
      'Zero-downtime migration strategy',
    ],
  },
  {
    step: '03',
    name: 'DEPLOY',
    subtitle: 'Execution & Engineering',
    timeline: 'Weeks 5–10',
    icon: Rocket,
    description: 'We roll out production-grade clusters, CI/CD automation pipelines, workload migrations, and perform rigorous load testing.',
    focusPill: 'Production Go-Live',
    keyDeliverables: [
      'Hardened cloud / container clusters',
      'Automated deployment pipelines',
      'Production cutover & validation',
    ],
  },
  {
    step: '04',
    name: 'MANAGE',
    subtitle: 'Day 2 Operations',
    timeline: 'Continuous',
    icon: ShieldCheck,
    description: 'Ongoing SRE observability, telemetry-driven autoscaling, proactive vulnerability remediation, and continuous platform governance.',
    focusPill: '24/7 SRE & Governance',
    keyDeliverables: [
      'Proactive monitoring & incident response',
      'FinOps cloud cost governance',
      'Continuous compliance & patching',
    ],
  },
];

export default function HowWeWork() {
  const [activeStage, setActiveStage] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section className="py-24 sm:py-32 bg-[#F4EFE6] relative overflow-hidden" id="delivery-approach">
      {/* Subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#171614 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-20 pb-8 border-b border-[#171614]/10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#171614]/[0.04] border border-[#171614]/[0.08] mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B84A2B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B84A2B]" />
              </span>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-[#171614]/80">
                Delivery Methodology
              </span>
            </div>

            <h2 className="text-[clamp(2.8rem,5.6vw,4.6rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.96] m-0">
              How We Work.
            </h2>
            <p className="text-[1.05rem] sm:text-[1.12rem] text-[#555047] mt-4 leading-relaxed max-w-xl">
              A disciplined, minimal four-stage engineering lifecycle built to de-risk complex transformations and deliver measurable outcomes.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-6 font-mono text-xs text-[#171614]/60 pt-2 md:pt-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E5A63]" />
              <span>4 Structured Phases</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B84A2B]" />
              <span>Zero-Downtime Focus</span>
            </div>
          </div>
        </div>

        {/* Minimal Timeline Connector Line (Desktop) */}
        <div className="hidden lg:block relative mb-6 px-4">
          <div className="h-[1px] w-full bg-[#171614]/10 relative">
            {/* Animated active tracer */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] bg-[#B84A2B] origin-left"
              initial={{ width: '0%' }}
              animate={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            />
          </div>
        </div>

        {/* 4 Minimal Stage Columns / Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5"
        >
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = activeStage === index;

            return (
              <motion.div
                key={stage.step}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { duration: 0.25 } }}
                onMouseEnter={() => setActiveStage(index)}
                onClick={() => setActiveStage(index)}
                className={`group relative rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                  isActive
                    ? 'bg-white shadow-[0_16px_36px_-12px_rgba(23,22,20,0.08)] border-[#B84A2B]/40 ring-1 ring-[#B84A2B]/20'
                    : 'bg-white/60 hover:bg-white border-[#171614]/[0.08] hover:border-[#171614]/20 shadow-[0_4px_20px_-10px_rgba(23,22,20,0.03)]'
                }`}
              >
                {/* Active indicator bar along top border */}
                {isActive && (
                  <motion.div
                    layoutId="active-stage-top-bar"
                    className="absolute top-0 left-6 right-6 h-[2.5px] bg-[#B84A2B] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div>
                  {/* Top Bar: Icon + Step Index */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#171614]/[0.06]">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isActive
                          ? 'bg-[#B84A2B] text-white shadow-sm'
                          : 'bg-[#171614]/[0.05] text-[#171614] group-hover:bg-[#171614]/[0.08]'
                      }`}
                    >
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#171614]/40 tracking-wider">
                        {stage.step} / 04
                      </span>
                    </div>
                  </div>

                  {/* Stage Headline & Timing */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-xl font-extrabold tracking-tight text-[#171614] m-0">
                        {stage.name}
                      </h3>
                      <span className="font-mono text-[11px] font-medium text-[#1E5A63] bg-[#1E5A63]/[0.08] px-2 py-0.5 rounded-full">
                        {stage.timeline}
                      </span>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#B84A2B]">
                      {stage.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[13.5px] leading-relaxed text-[#171614]/70 mb-6">
                    {stage.description}
                  </p>

                  {/* Key Deliverables Minimal List */}
                  <div className="space-y-2 pt-4 border-t border-[#171614]/[0.06]">
                    <p className="font-mono text-[10.5px] uppercase tracking-wider text-[#171614]/40 font-semibold mb-2.5">
                      Key Outputs:
                    </p>
                    {stage.keyDeliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#171614]/80 leading-snug">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors ${
                            isActive ? 'text-[#B84A2B]' : 'text-[#171614]/30 group-hover:text-[#171614]/60'
                          }`}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Pill Indicator */}
                <div className="mt-7 pt-4 border-t border-[#171614]/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#171614]/50 truncate max-w-[170px]">
                    {stage.focusPill}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#B84A2B]/10 text-[#B84A2B] translate-x-0.5'
                        : 'text-[#171614]/30 group-hover:text-[#171614] group-hover:translate-x-0.5'
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Minimal Bottom Banner with CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#171614] text-[#F4EFE6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#B84A2B] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white tracking-tight">
                Require a customized execution plan?
              </h4>
              <p className="text-xs text-[#F4EFE6]/60 mt-0.5">
                Our platform architects assess your infrastructure and formulate milestone-backed scoping.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#171614] bg-[#F4EFE6] hover:bg-white px-6 py-3 rounded-full transition-all hover:shadow-[0_4px_16px_rgba(244,239,230,0.2)] shrink-0 self-stretch sm:self-auto"
          >
            <span>Request Architecture Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
