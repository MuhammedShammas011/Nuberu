'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import {
  Server,
  Cloud,
  Boxes,
  Cpu,
  RefreshCw,
  ArrowUpRight,
  Network,
  ArrowRight,
} from 'lucide-react';

interface CapabilityNode {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
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
    subtitle: 'Data Centre & Virtualisation',
    summary: 'Assess, modernise, and engineer high-density compute, SAN storage fabrics, and hypervisor resilience.',
    platforms: ['VMware', 'KVM', 'Pure Storage', 'Cisco'],
    connectedTo: 'Feeds Multi-Cloud Scale',
    href: '/services/datacenter-infrastructure',
    icon: Server,
  },
  {
    id: 'cloud',
    number: '02',
    title: 'Cloud Platforms',
    subtitle: 'Landing Zones & Scale',
    summary: 'Design multi-cloud landing zones, IAM guardrails, and FinOps models across AWS, Azure, and GCP.',
    platforms: ['AWS', 'Azure', 'GCP', 'Landing Zones'],
    connectedTo: 'Hosts Container Workloads',
    href: '/services/cloud-devops',
    icon: Cloud,
  },
  {
    id: 'containers',
    number: '03',
    title: 'Containers',
    subtitle: 'Kubernetes & OpenShift',
    summary: 'Hardened container platforms across hybrid nodes and managed hyperscalers for portable microservices.',
    platforms: ['Kubernetes', 'OpenShift', 'EKS'],
    connectedTo: 'Automated via GitOps',
    href: '/services/container-platforms',
    icon: Boxes,
  },
  {
    id: 'automation',
    number: '04',
    title: 'Automation',
    subtitle: 'IaC & Delivery Pipelines',
    summary: 'Eliminate configuration drift with zero-drift IaC, declarative pipelines, and automated release workflows.',
    platforms: ['Terraform', 'Ansible', 'ArgoCD'],
    connectedTo: 'Drives Continuous Modernisation',
    href: '/services/cloud-devops',
    icon: Cpu,
  },
  {
    id: 'transformation',
    number: '05',
    title: 'Modernisation',
    subtitle: 'Architecture & Day 2 SRE',
    summary: 'Decouple monolithic codebases, refactor legacy databases, and guarantee 24/7 Day 2 platform resilience.',
    platforms: ['Microservices', 'PostgreSQL', 'Day 2 SRE'],
    connectedTo: 'Closes Loop into Core Systems',
    href: '/services/application-modernisation',
    icon: RefreshCw,
  },
];

export default function Capabilities() {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeCard, setActiveCard] = useState(1);

  // Measure dynamic horizontal scroll width based on screen width
  useEffect(() => {
    const calculateRange = () => {
      if (scrollTrackRef.current) {
        const totalWidth = scrollTrackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const endPadding = window.innerWidth < 768 ? 48 : 120;
        setScrollRange(Math.max(0, totalWidth - viewportWidth + endPadding));
      }
    };

    calculateRange();
    window.addEventListener('resize', calculateRange);
    return () => window.removeEventListener('resize', calculateRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Track active card index for telemetry
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(5, Math.max(1, Math.round(latest * 4) + 1));
    setActiveCard(idx);
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const smoothX = useSpring(x, {
    stiffness: 170,
    damping: 26,
    mass: 0.2,
  });

  return (
    <section
      ref={targetRef}
      id="capabilities"
      className="relative h-[320vh] bg-[#F4EFE6]"
    >
      {/* Background Architectural Mesh Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#171614 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 sm:py-10 z-10">
        {/* Top Minimal Telemetry & Progress Strip */}
        <div className="container-custom w-full shrink-0">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#171614]/10 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#B84A2B] animate-pulse" />
              <span className="font-semibold text-[#171614] tracking-wider uppercase">
                0{activeCard} / 05 · {capabilities[activeCard - 1]?.title.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[#171614]/50">
              <span className="hidden sm:inline">Scroll to explore architecture</span>
              <div className="w-28 sm:w-36 h-[3px] bg-[#171614]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#B84A2B] origin-left rounded-full"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Horizontal Scrolling Track with Uniform Big Bulky Containers */}
        <div className="my-auto w-full overflow-hidden">
          <motion.div
            ref={scrollTrackRef}
            style={{ x: smoothX }}
            className="flex gap-6 sm:gap-8 items-stretch pl-6 sm:pl-12 md:pl-16 lg:pl-24 pr-12 sm:pr-24 lg:pr-32 w-max py-4"
          >
            {capabilities.map((cap) => {
              const Icon = cap.icon;

              return (
                <div
                  key={cap.id}
                  className="group relative rounded-3xl p-8 sm:p-10 lg:p-12 bg-white/80 hover:bg-white border border-[#171614]/[0.08] hover:border-[#B84A2B]/40 transition-all duration-300 hover:shadow-[0_24px_50px_-16px_rgba(23,22,20,0.1)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ring-1 ring-transparent hover:ring-[#B84A2B]/20 w-[86vw] sm:w-[70vw] md:w-[560px] lg:w-[620px] h-[460px] sm:h-[480px] lg:h-[500px] shrink-0"
                >
                  {/* Top Highlight Accent Line */}
                  <div className="absolute top-0 left-8 right-8 h-[3px] bg-[#B84A2B] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />

                  {/* Top Bar: Chunky Icon Badge + Big Bulky Monospace Numeral */}
                  <div>
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#171614]/[0.06]">
                      <div className="w-14 h-14 rounded-2xl bg-[#171614]/[0.05] text-[#171614] group-hover:bg-[#B84A2B] group-hover:text-white transition-all flex items-center justify-center shadow-xs">
                        <Icon className="w-7 h-7 stroke-[1.8]" />
                      </div>

                      <span className="text-5xl sm:text-6xl font-black font-mono text-[#171614]/15 group-hover:text-[#B84A2B]/40 transition-colors select-none">
                        {cap.number}
                      </span>
                    </div>

                    {/* Category Eyebrow */}
                    <span className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-[#B84A2B] mb-2 block">
                      {cap.subtitle}
                    </span>

                    {/* Big Bulky Title */}
                    <Link href={cap.href} className="block group/link">
                      <h3 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#171614] tracking-[-0.035em] leading-[1.04] m-0 mb-4 group-hover/link:text-[#B84A2B] transition-colors">
                        {cap.title}
                      </h3>
                    </Link>

                    {/* Punchy Summary */}
                    <p className="text-base sm:text-[1.05rem] text-[#171614]/75 leading-relaxed max-w-lg mb-6">
                      {cap.summary}
                    </p>

                    {/* Platform Chips */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {cap.platforms.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-[#171614]/[0.04] group-hover:bg-[#171614]/[0.06] text-[#171614]/80 text-xs font-mono font-medium border border-[#171614]/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Bar: Action Button + Telemetry Connection */}
                  <div className="pt-6 border-t border-[#171614]/[0.06] flex items-center justify-between gap-4">
                    <Link
                      href={cap.href}
                      className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#171614] group-hover:bg-[#B84A2B] px-5 py-3 rounded-full transition-all group-hover:shadow-[0_4px_16px_rgba(184,74,43,0.3)] hover:-translate-y-0.5"
                    >
                      <span>Explore Practice</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>

                    <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#1E5A63]">
                      <Network className="w-3.5 h-3.5 shrink-0" />
                      <span>{cap.connectedTo}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Status Precision Bar */}
        <div className="container-custom w-full shrink-0">
          <div className="pt-4 border-t border-[#171614]/10 flex items-center justify-between font-mono text-xs text-[#171614]/60">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E5A63]" />
              <span>All 5 capabilities connected in one synchronized mesh</span>
            </div>

            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#171614] hover:text-[#B84A2B] transition-colors group"
            >
              <span>Explore All 7 Practice Areas</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
