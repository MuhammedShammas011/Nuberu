'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ShieldCheck, GitBranch, RefreshCw } from 'lucide-react';

interface MethodologyStage {
  step: string;
  name: string;
  subtitle: string;
  timeline: string;
  mandate: string;
  focus: string;
  governance: string;
  deliverables: string[];
  tooling: string[];
}

const methodologyStages: MethodologyStage[] = [
  {
    step: '01',
    name: 'Consult',
    subtitle: 'Discovery & Assessment',
    timeline: 'Weeks 01–02',
    mandate: 'We audit your workload architecture, dependency trees, security posture, and cloud expenditures to identify operational risks and modernization opportunities.',
    focus: 'Risk & Landscape Audit',
    governance: 'ISO 27001 / SOC 2 Scope',
    deliverables: [
      'Current-state architecture topology audit',
      'Dependency mapping & failure domain matrix',
      'Migration feasibility & TCO model',
    ],
    tooling: ['CloudHealth', 'Trivy', 'Kubescape', 'Well-Architected'],
  },
  {
    step: '02',
    name: 'Design',
    subtitle: 'Architecture & Planning',
    timeline: 'Weeks 03–04',
    mandate: 'We engineer target multi-cloud landing zones, platform specifications, declarative Infrastructure as Code modules, and deterministic cutover runbooks.',
    focus: 'Target Blueprint & IaC',
    governance: 'Deterministic IaC Foundations',
    deliverables: [
      'High-Level Design (HLD) & target blueprints',
      'Modular Terraform / OpenTofu IaC scaffolds',
      'Zero-downtime cutover & rollback runbooks',
    ],
    tooling: ['Terraform', 'OpenTofu', 'Terragrunt', 'Cisco ACI'],
  },
  {
    step: '03',
    name: 'Deploy',
    subtitle: 'Execution & Engineering',
    timeline: 'Weeks 05–10',
    mandate: 'We roll out hardened container platforms, automated GitOps delivery pipelines, execute phased workload migrations, and perform rigorous load validation.',
    focus: 'Production Go-Live',
    governance: 'SLO & Gate-Checked Rollouts',
    deliverables: [
      'Hardened Kubernetes & OpenShift clusters',
      'Declarative GitOps CI/CD delivery pipelines',
      'Production cutover with rollback guarantees',
    ],
    tooling: ['ArgoCD', 'Kubernetes', 'OpenShift', 'GitHub Actions'],
  },
  {
    step: '04',
    name: 'Manage',
    subtitle: 'Day 2 SRE & Governance',
    timeline: 'Continuous',
    mandate: 'Continuous site reliability engineering, telemetry-driven autoscaling, proactive CVE vulnerability remediation, and automated FinOps governance.',
    focus: '24/7 SRE & Governance',
    governance: 'Continuous 99.99% Uptime SLA',
    deliverables: [
      'Proactive 24/7 APM & incident telemetry',
      'Continuous security compliance & patching',
      'FinOps multi-cloud unit economics & rightsizing',
    ],
    tooling: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Datadog'],
  },
];

export default function HowWeWork() {
  const [activeStage, setActiveStage] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28 bg-[#F4EFE6] text-[#171614] relative overflow-hidden" id="delivery-approach">
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
              Delivery Methodology
            </span>
          </div>

          <span className="font-mono text-[11px] font-semibold text-[#171614]/40 tracking-wider uppercase">
            04 PHASES {'//'} SILICON TO DAY 2 SRE
          </span>
        </motion.div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2.5rem,5vw,4.2rem)] font-extrabold tracking-[-0.035em] text-[#171614] leading-[0.98] m-0">
              Disciplined Lifecycle. <br />
              <span className="text-[#171614]/40 font-normal">Predictable Velocity.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-[1.05rem] text-[#171614]/70 leading-relaxed m-0">
              A structured, milestone-governed engineering process designed to eliminate technical debt, prevent vendor lock-in, and guarantee zero-downtime cutover.
            </p>
          </div>
        </div>

        {/* Master Lifecycle Timeline Progress Bar */}
        <div className="relative mb-6">
          <div className="h-[2px] w-full bg-[#171614]/10 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#B84A2B] rounded-full"
              initial={false}
              animate={{
                width: `${((activeStage + 1) / methodologyStages.length) * 100}%`,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          </div>

          {/* Minimal Phase Stepper Ticks */}
          <div className="grid grid-cols-4 pt-2.5 font-mono text-[11px]">
            {methodologyStages.map((stage, idx) => {
              const isSelected = activeStage === idx;
              const isPassed = activeStage >= idx;

              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`text-left transition-colors duration-200 cursor-pointer group flex items-center gap-1.5 ${
                    isSelected
                      ? 'text-[#B84A2B] font-semibold'
                      : isPassed
                      ? 'text-[#171614]/80'
                      : 'text-[#171614]/40 hover:text-[#171614]/70'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-transform ${
                      isSelected ? 'bg-[#B84A2B] scale-125' : isPassed ? 'bg-[#171614]/40' : 'bg-[#171614]/20'
                    }`}
                  />
                  <span className="truncate">
                    {stage.step} {stage.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Unified Architectural 4-Column Monolith Grid */}
        <div className="rounded-2xl border border-[#171614]/10 bg-[#171614]/[0.015] overflow-hidden shadow-[0_20px_45px_-25px_rgba(23,22,20,0.06)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#171614]/10">
            {methodologyStages.map((stage, idx) => {
              const isSelected = activeStage === idx;

              return (
                <div
                  key={stage.step}
                  onMouseEnter={() => setActiveStage(idx)}
                  onClick={() => setActiveStage(idx)}
                  className={`relative p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-[0_12px_32px_-12px_rgba(23,22,20,0.08)] z-10'
                      : 'hover:bg-white/50 bg-transparent'
                  }`}
                >
                  {/* Active Top Accent Line */}
                  {isSelected && (
                    <motion.div
                      layoutId="stage-active-accent"
                      className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#B84A2B]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div>
                    {/* Step Numeral + Timeline Badge */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span
                        className={`font-mono text-3xl sm:text-4xl font-extrabold tracking-tighter transition-colors duration-200 ${
                          isSelected ? 'text-[#B84A2B]' : 'text-[#171614]/25'
                        }`}
                      >
                        {stage.step}
                      </span>

                      <span className="font-mono text-[10.5px] font-semibold text-[#1E5A63] bg-[#1E5A63]/[0.07] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {stage.timeline}
                      </span>
                    </div>

                    {/* Stage Name & Subtitle */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-extrabold tracking-tight text-[#171614] m-0 mb-1">
                        {stage.name}
                      </h3>
                      <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-[#B84A2B]">
                        {stage.subtitle}
                      </p>
                    </div>

                    {/* Mandate Prose */}
                    <p className="text-[13.5px] leading-relaxed text-[#171614]/75 mb-6">
                      {stage.mandate}
                    </p>

                    {/* Key Outputs — Minimalist Typographic List */}
                    <div className="pt-4 border-t border-[#171614]/10 mb-6">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#171614]/40 mb-3">
                        Core Artifacts & Deliverables:
                      </p>
                      <ul className="space-y-2.5 list-none p-0 m-0">
                        {stage.deliverables.map((item, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-2 text-xs text-[#171614]/85 leading-snug"
                          >
                            <span
                              className={`font-mono text-[11px] font-semibold shrink-0 transition-colors ${
                                isSelected ? 'text-[#B84A2B]' : 'text-[#171614]/30'
                              }`}
                            >
                              0{dIdx + 1} ·
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Tooling Stack & Focus Status */}
                  <div className="pt-4 border-t border-[#171614]/10">
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {stage.tooling.map((tool) => (
                        <span
                          key={tool}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#171614]/[0.04] text-[#171614]/60"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#171614]/60">
                      <span>{stage.focus}</span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                          isSelected ? 'text-[#B84A2B] translate-x-1' : 'opacity-30'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Precision Guarantees & Action Bar */}
        <div className="mt-12 sm:mt-14 pt-6 border-t border-[#171614]/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Methodology Telemetry Badges */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 font-mono text-xs text-[#171614]/65">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B84A2B]" />
              <span>Zero-Downtime Migration Protocol</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#1E5A63]" />
              <span>100% Declarative GitOps Scaffolding</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#171614]/40" />
              <span>Direct Principal Architect Engagement</span>
            </div>
          </div>

          {/* Sleek Minimal CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#171614] hover:text-[#B84A2B] transition-colors group"
          >
            <span>Request Methodology Runbook & Scope</span>
            <ArrowUpRight className="w-4 h-4 text-[#B84A2B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
