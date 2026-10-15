'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  Server,
  Cloud,
  Boxes,
  Cpu,
  RefreshCw,
  ArrowUpRight,
  Network,
  Activity,
  GitBranch,
} from 'lucide-react';

interface CapabilityNode {
  id: string;
  number: string;
  title: string;
  short: string;
  subtitle: string;
  description: string;
  platforms: string[];
  connectedTo: string;
  href: string;
  icon: typeof Server;
}

const capabilities: CapabilityNode[] = [
  {
    id: 'infrastructure',
    number: '01',
    title: 'Infrastructure',
    short: 'Core Systems',
    subtitle: 'Data Centre & Virtualisation',
    description: 'Assess, design and modernise on-premises compute, hypervisors, SAN storage fabrics and hardware lifecycle automation.',
    platforms: ['VMware', 'KVM', 'Pure Storage', 'Cisco'],
    connectedTo: 'Feeds into Cloud & Bare-Metal Platforms',
    href: '/services/datacenter-infrastructure',
    icon: Server,
  },
  {
    id: 'cloud',
    number: '02',
    title: 'Cloud',
    short: 'Multi-Cloud',
    subtitle: 'Landing Zones & Hybrid Scale',
    description: 'Engineer and govern multi-cloud environments across AWS, Azure and GCP with unified security, IAM, and FinOps cost models.',
    platforms: ['AWS', 'Azure', 'GCP', 'Landing Zones'],
    connectedTo: 'Hosts Cloud-Native Container Clusters',
    href: '/services/cloud-devops',
    icon: Cloud,
  },
  {
    id: 'containers',
    number: '03',
    title: 'Containers',
    short: 'Cloud-Native',
    subtitle: 'Kubernetes & OpenShift',
    description: 'Implement hardened container platforms across bare metal, hybrid nodes and managed hyperscalers for portable microservices.',
    platforms: ['Kubernetes', 'OpenShift', 'EKS', 'ROSA'],
    connectedTo: 'Automated via GitOps Release Pipelines',
    href: '/services/container-platforms',
    icon: Boxes,
  },
  {
    id: 'automation',
    number: '04',
    title: 'Automation',
    short: 'Delivery Pipelines',
    subtitle: 'IaC & GitOps Engine',
    description: 'Eliminate configuration drift with Terraform, Ansible, and automated CI/CD release pipelines for repeatable delivery.',
    platforms: ['Terraform', 'Ansible', 'GitLab CI', 'ArgoCD'],
    connectedTo: 'Drives Continuous Modernisation',
    href: '/services/cloud-devops',
    icon: Cpu,
  },
  {
    id: 'transformation',
    number: '05',
    title: 'Transformation',
    short: 'Evolution',
    subtitle: 'Application & Day 2 SRE',
    description: 'Refactor monolithic codebases, modernize legacy databases, decouple domain logic and guarantee Day 2 platform resilience.',
    platforms: ['Microservices', 'PostgreSQL', 'Kafka', 'Day 2 SRE'],
    connectedTo: 'Closes the Loop into Core Infrastructure',
    href: '/services/application-modernisation',
    icon: RefreshCw,
  },
];

export default function Capabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeNode, setActiveNode] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
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
    <section className="py-24 sm:py-32 bg-[#F4EFE6] relative overflow-hidden" id="capabilities">
      {/* Background Architectural Mesh Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#171614 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20 pb-8 border-b border-[#171614]/10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#171614]/[0.04] border border-[#171614]/[0.08] mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E5A63] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E5A63]" />
              </span>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-[#171614]/80">
                Connected Architecture
              </span>
            </div>

            <h2 className="text-[clamp(2.8rem,5.6vw,4.6rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.96] m-0">
              Five Interconnected <br className="hidden sm:block" />
              Capabilities.
            </h2>
            <p className="text-[1.05rem] sm:text-[1.12rem] text-[#555047] mt-4 leading-relaxed max-w-xl">
              Enterprise technology fails when treated as siloed projects. Nuberu unites physical foundations, multi-cloud scale, cloud-native platforms, and continuous automation into one synchronized delivery engine.
            </p>
          </div>

          {/* Telemetry Live Status Indicators */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs text-[#171614]/65 pt-2 lg:pt-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/70 border border-[#171614]/[0.08] shadow-sm">
              <Activity className="w-3.5 h-3.5 text-[#1E5A63] animate-pulse" />
              <span>Mesh State: Synchronized</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/70 border border-[#171614]/[0.08] shadow-sm">
              <GitBranch className="w-3.5 h-3.5 text-[#B84A2B]" />
              <span>5 Active Nodes</span>
            </div>
          </div>
        </div>

        {/* Minimal Animated Interconnection Bus (Desktop) */}
        <div className="hidden lg:block mb-8 px-6">
          <div className="relative">
            {/* Base circuit rail line */}
            <div className="h-[1.5px] w-full bg-[#171614]/15 relative">
              {/* Traveling light pulse animation across the bus */}
              <motion.div
                className="absolute top-[-1.5px] h-[4px] w-24 bg-gradient-to-r from-transparent via-[#B84A2B] to-transparent rounded-full"
                animate={shouldReduceMotion ? undefined : { left: ['-10%', '105%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: 'linear',
                }}
              />

              {/* Highlight line to currently selected/hovered node */}
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-[#B84A2B] origin-left"
                animate={{
                  width: `${((((hoveredIndex !== null ? hoveredIndex : activeNode) + 1) / capabilities.length) * 100)}%`,
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              />
            </div>

            {/* 5 Bus Node Points */}
            <div className="flex justify-between items-center -mt-[9px]">
              {capabilities.map((cap, idx) => {
                const isSelected = (hoveredIndex !== null ? hoveredIndex : activeNode) === idx;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => setActiveNode(idx)}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group flex flex-col items-center cursor-pointer focus:outline-none"
                    aria-label={`Select ${cap.title}`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? 'border-[#B84A2B] bg-[#F4EFE6] scale-125 shadow-[0_0_12px_rgba(184,74,43,0.4)]'
                          : 'border-[#171614]/30 bg-white group-hover:border-[#171614]'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isSelected ? 'bg-[#B84A2B]' : 'bg-transparent'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[10.5px] font-mono tracking-wider mt-2.5 transition-colors ${
                        isSelected ? 'text-[#B84A2B] font-semibold' : 'text-[#171614]/40 group-hover:text-[#171614]'
                      }`}
                    >
                      {`${cap.number} // ${cap.short.toUpperCase()}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5 Interconnected Capability Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            const isSelected = (hoveredIndex !== null ? hoveredIndex : activeNode) === index;

            return (
              <motion.div
                key={cap.id}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { duration: 0.25 } }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveNode(index)}
                className={`group relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'bg-white shadow-[0_20px_40px_-15px_rgba(23,22,20,0.08)] border-[#B84A2B]/40 ring-1 ring-[#B84A2B]/20'
                    : 'bg-white/60 hover:bg-white border-[#171614]/[0.08] hover:border-[#171614]/20 shadow-[0_4px_20px_-10px_rgba(23,22,20,0.03)]'
                }`}
              >
                {/* Active indicator bar along top border */}
                {isSelected && (
                  <motion.div
                    layoutId="active-capability-top-bar"
                    className="absolute top-0 left-5 right-5 h-[2.5px] bg-[#B84A2B] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div>
                  {/* Top Bar: Icon + Monospace Node Index */}
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#171614]/[0.06]">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#B84A2B] text-white shadow-sm'
                          : 'bg-[#171614]/[0.05] text-[#171614] group-hover:bg-[#171614]/[0.08]'
                      }`}
                    >
                      <Icon className="w-5 h-5 stroke-[1.7]" />
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#171614]/40">
                      <span>{cap.number}</span>
                      <span className="text-[#171614]/20">/</span>
                      <span>05</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-extrabold tracking-tight text-[#171614] m-0 mb-1">
                    {cap.title}
                  </h3>
                  <p className="text-[11.5px] font-semibold uppercase tracking-wider text-[#B84A2B] mb-3">
                    {cap.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-[13px] leading-relaxed text-[#171614]/70 mb-5">
                    {cap.description}
                  </p>

                  {/* Interconnected Flow Indicator */}
                  <div className="p-2.5 rounded-lg bg-[#171614]/[0.03] border border-[#171614]/[0.05] mb-5">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-[#1E5A63] font-medium leading-tight">
                      <Network className="w-3 h-3 shrink-0" />
                      <span className="truncate">{cap.connectedTo}</span>
                    </div>
                  </div>

                  {/* Platform & Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cap.platforms.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-[#171614]/[0.04] text-[#171614]/75 text-[10.5px] font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Direct Service Link */}
                <div className="pt-3 border-t border-[#171614]/[0.06] flex items-center justify-between">
                  <Link
                    href={cap.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#171614] group-hover:text-[#B84A2B] transition-colors"
                  >
                    <span>View Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isSelected ? 'bg-[#B84A2B]' : 'bg-[#171614]/15'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Minimal Full-Stack Synthesis Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#171614] text-[#F4EFE6] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#B84A2B] shrink-0 mt-0.5 sm:mt-0">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#B84A2B]">
                  Full-Stack Synergy
                </span>
                <span className="text-[10px] font-mono text-[#F4EFE6]/40 hidden sm:inline">
                  Zero Platform Siloes
                </span>
              </div>
              <p className="text-sm text-[#F4EFE6]/80 mt-1 max-w-2xl leading-relaxed">
                Connect your core infrastructure, multi-cloud platforms, and container workloads under unified automation and Day 2 operational governance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto shrink-0 pt-2 lg:pt-0">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#171614] bg-[#F4EFE6] hover:bg-white px-6 py-3 rounded-full transition-all hover:shadow-[0_4px_16px_rgba(244,239,230,0.2)] flex-1 sm:flex-initial"
            >
              <span>Explore All Services</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
