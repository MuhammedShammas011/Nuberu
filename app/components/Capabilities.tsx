'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import {
  Server,
  Cloud,
  Boxes,
  Cpu,
  RefreshCw,
  Database,
  ShieldCheck,
  ArrowUpRight,
  Network,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

interface PracticeArea {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  platforms: string[];
  connectedTo: string;
  href: string;
  icon: LucideIcon;
  callouts: {
    compute: string;
    primary: string;
    storage: string;
  };
}

const practiceAreas: PracticeArea[] = [
  {
    id: 'infrastructure',
    number: '01',
    title: 'Infrastructure',
    subtitle: 'DATA CENTRE & VIRTUALISATION',
    summary:
      'Assess, modernise, and engineer high-density compute, SAN storage fabrics, and hypervisor resilience.',
    platforms: ['VMware', 'KVM', 'Pure Storage', 'Cisco'],
    connectedTo: 'Feeds Multi-Cloud Scale',
    href: '/services/datacenter-infrastructure',
    icon: Server,
    callouts: {
      compute: 'COMPUTE',
      primary: 'VIRTUALISATION',
      storage: 'STORAGE',
    },
  },
  {
    id: 'cloud',
    number: '02',
    title: 'Cloud Platforms',
    subtitle: 'LANDING ZONES & MULTI-CLOUD',
    summary:
      'Design multi-cloud landing zones, IAM guardrails, enterprise network peering, and FinOps governance.',
    platforms: ['AWS', 'Azure', 'GCP', 'Landing Zones'],
    connectedTo: 'Hosts Container Workloads',
    href: '/services/cloud-devops',
    icon: Cloud,
    callouts: {
      compute: 'HYPERSCALER',
      primary: 'LANDING ZONES',
      storage: 'MESH PEERING',
    },
  },
  {
    id: 'containers',
    number: '03',
    title: 'Containers',
    subtitle: 'KUBERNETES & OPENSHIFT',
    summary:
      'Production-hardened Kubernetes platforms across bare-metal, edge clusters, and managed hyperscaler services.',
    platforms: ['Kubernetes', 'OpenShift', 'EKS', 'Helm'],
    connectedTo: 'Automated via GitOps',
    href: '/services/container-platforms',
    icon: Boxes,
    callouts: {
      compute: 'POD FABRIC',
      primary: 'K8S CONTROL PLANE',
      storage: 'CSI VOLUMES',
    },
  },
  {
    id: 'automation',
    number: '04',
    title: 'Automation',
    subtitle: 'IAC & DECLARATIVE PIPELINES',
    summary:
      'Eliminate configuration drift with zero-drift IaC, declarative pipelines, and automated release gates.',
    platforms: ['Terraform', 'Ansible', 'ArgoCD', 'GitHub Actions'],
    connectedTo: 'Drives Continuous Delivery',
    href: '/services/cloud-devops',
    icon: Cpu,
    callouts: {
      compute: 'RUNNERS',
      primary: 'GITOPS ENGINE',
      storage: 'STATE LOCKING',
    },
  },
  {
    id: 'modernisation',
    number: '05',
    title: 'Modernisation',
    subtitle: 'ARCHITECTURE & PLATFORM SRE',
    summary:
      'Decouple legacy monolithic applications into distributed, event-driven services with guaranteed Day-2 resilience.',
    platforms: ['Microservices', 'Kafka', 'PostgreSQL', 'Day 2 SRE'],
    connectedTo: 'Closes Loop into Core Systems',
    href: '/services/application-modernisation',
    icon: RefreshCw,
    callouts: {
      compute: 'EVENT BUS',
      primary: 'MICROSERVICES',
      storage: 'PERSISTENCE',
    },
  },
  {
    id: 'data-ai',
    number: '06',
    title: 'Data & AI',
    subtitle: 'DATA PLATFORMS & MLOPS',
    summary:
      'Architect governed data lakes, real-time streaming pipelines, and secure infrastructure foundations for enterprise AI.',
    platforms: ['Snowflake', 'Databricks', 'Apache Spark', 'MLflow'],
    connectedTo: 'Powers Predictive Intelligence',
    href: '/services/cloud-devops',
    icon: Database,
    callouts: {
      compute: 'INFERENCE',
      primary: 'VECTOR PIPELINES',
      storage: 'LAKEHOUSE',
    },
  },
  {
    id: 'security',
    number: '07',
    title: 'Security',
    subtitle: 'ZERO TRUST & CLOUD COMPLIANCE',
    summary:
      'Embed policy-as-code, zero-trust network boundaries, runtime threat detection, and continuous compliance posture.',
    platforms: ['HashiCorp Vault', 'Wiz', 'Trivy', 'Zero Trust'],
    connectedTo: 'Secures All Surface Tiers',
    href: '/services/application-modernisation',
    icon: ShieldCheck,
    callouts: {
      compute: 'ENCLAVES',
      primary: 'ZERO TRUST MESH',
      storage: 'ENCRYPTION',
    },
  },
];

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);

  // Mouse 3D tilt coordinates
  const tiltX = useSpring(0, { stiffness: 120, damping: 20 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 20 });

  const activeItem = practiceAreas[activeIndex];
  const totalCount = practiceAreas.length;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!centerRef.current) return;
      const rect = centerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tiltX.set(-y * 8); // tilts up/down
      tiltY.set(x * 10); // tilts left/right
    },
    [tiltX, tiltY]
  );

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCount);
  }, [totalCount]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCount) % totalCount);
  }, [totalCount]);

  // Optional subtle wheel listener inside the section with cooldown
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      // Only capture when mouse is directly over the practice area list or center
      const now = Date.now();
      if (now - lastScrollTime.current < 650) return;
      if (Math.abs(e.deltaY) < 35) return;

      if (e.deltaY > 0 && activeIndex < totalCount - 1) {
        lastScrollTime.current = now;
        setActiveIndex((prev) => Math.min(totalCount - 1, prev + 1));
      } else if (e.deltaY < 0 && activeIndex > 0) {
        lastScrollTime.current = now;
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    };

    section.addEventListener('wheel', onWheel, { passive: true });
    return () => section.removeEventListener('wheel', onWheel);
  }, [activeIndex, totalCount]);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative bg-[#F4EFE6] pt-24 pb-20 lg:pt-28 lg:pb-28 overflow-hidden select-none"
      aria-label="Capabilities built for what's next"
    >
      <div className="container-custom relative z-10">
        {/* ── Top Header Row ────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#B84A2B] shrink-0" aria-hidden="true" />
            <span className="font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-[#68635B]">
              PRACTICE AREAS
            </span>
          </div>

          <div className="font-mono text-[13px] font-semibold tracking-wider text-[#68635B]">
            <span className="text-[#171614]">{activeItem.number}</span>
            <span className="mx-2 text-[#68635B]/40">—</span>
            <span>0{totalCount}</span>
          </div>
        </div>

        {/* ── Title & Intro Row ─────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12 lg:mb-16">
          <h2 className="text-[clamp(2.5rem,5.2vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#171614] m-0">
            Capabilities<br />
            built for what&apos;s<br />
            next<span className="text-[#B84A2B]">.</span>
          </h2>

          <div className="flex items-start gap-8 max-w-[500px] lg:pt-3">
            <span
              className="w-px h-20 bg-[#171614]/15 shrink-0 hidden sm:block"
              aria-hidden="true"
            />
            <p className="text-[1.08rem] leading-[1.62] text-[#555047] m-0">
              From infrastructure to intelligent automation, we design scalable,
              resilient, and future-ready systems for modern businesses.
            </p>
          </div>
        </div>

        {/* ── 3-Column Workspace ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1.25fr_1fr] xl:grid-cols-[220px_1.35fr_1.05fr] gap-8 lg:gap-10 items-center">
          {/* ── Column 1: Left Navigation ────────────────────────── */}
          <div className="flex flex-col justify-between self-stretch py-2">
            <nav className="flex flex-col gap-1.5" aria-label="Practice areas menu">
              {practiceAreas.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full flex items-center justify-between py-2 text-left transition-all duration-200 group cursor-pointer ${
                      isActive
                        ? 'text-[#B84A2B]'
                        : 'text-[#68635B] hover:text-[#171614]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#B84A2B] shrink-0 shadow-[0_0_8px_rgba(184,74,43,0.5)]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full border border-[#68635B]/40 group-hover:border-[#171614] shrink-0 transition-colors" />
                      )}
                      <span
                        className={`text-[14.5px] tracking-[-0.01em] transition-colors ${
                          isActive ? 'font-semibold text-[#B84A2B]' : 'font-medium'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    <span
                      className={`font-mono text-[12px] tabular-nums transition-colors ${
                        isActive ? 'text-[#B84A2B] font-semibold' : 'text-[#68635B]/60'
                      }`}
                    >
                      {item.number}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Mouse scroll cue */}
            <div className="hidden lg:flex items-center gap-3 pt-12 mt-auto text-[#68635B]">
              <div className="w-[18px] h-[28px] rounded-full border border-[#68635B]/40 flex justify-center pt-1.5 shrink-0">
                <motion.span
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="w-1 h-1.5 bg-[#68635B] rounded-full"
                />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#68635B]/80">
                Scroll or use navigation
              </span>
            </div>
          </div>

          {/* ── Column 2: Center Interactive 3D Server Assembly ────── */}
          <div
            ref={centerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center justify-center min-h-[460px] lg:min-h-[560px] py-4"
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-[540px] aspect-square flex items-center justify-center transition-transform duration-100 ease-out"
            >
              {/* Soft background radial ambient light */}
              <div
                className="absolute inset-0 pointer-events-none rounded-full opacity-60"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(218, 106, 67, 0.14) 0%, rgba(244, 239, 230, 0) 70%)',
                }}
                aria-hidden="true"
              />

              {/* 3D Server Stack Image */}
              <div className="relative w-[92%] h-[92%] overflow-hidden rounded-[24px]">
                <Image
                  src="/images/capabilities/infra.jpg"
                  alt="Nuberu high-density modular infrastructure architecture"
                  width={1024}
                  height={1024}
                  priority
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>

              {/* ── Animated Isometric Overlay SVG ────────────────── */}
              <svg
                viewBox="0 0 600 600"
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                fill="none"
              >
                {/* 1. COMPUTE Callout (Top-Left) */}
                <g className="transition-all duration-500">
                  <text
                    x="90"
                    y="190"
                    className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]"
                  >
                    {activeItem.callouts.compute}
                  </text>
                  <path
                    d="M165 186 L230 186 L258 235 L268 250"
                    stroke="#B84A2B"
                    strokeWidth="1.2"
                    strokeOpacity="0.45"
                  />
                  {/* Tracing pulse dot on compute line */}
                  <circle r="2.5" fill="#B84A2B">
                    <animateMotion
                      path="M165 186 L230 186 L258 235 L268 250"
                      dur="3.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx="268"
                    cy="250"
                    r="3.5"
                    fill="#B84A2B"
                    className="animate-pulse"
                  />
                </g>

                {/* 2. VIRTUALISATION Callout (Top-Right) */}
                <g className="transition-all duration-500">
                  <text
                    x="370"
                    y="125"
                    className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]"
                  >
                    {activeItem.callouts.primary}
                  </text>
                  <path
                    d="M365 135 L330 170 L330 205 L372 230"
                    stroke="#B84A2B"
                    strokeWidth="1.2"
                    strokeOpacity="0.5"
                  />
                  {/* Connecting grid line down-right */}
                  <path
                    d="M330 205 L370 205 L420 235 L420 280"
                    stroke="#68635B"
                    strokeWidth="1"
                    strokeOpacity="0.25"
                    strokeDasharray="2 3"
                  />
                  {/* Tracing pulse dot */}
                  <circle r="2.5" fill="#DA6A43">
                    <animateMotion
                      path="M365 135 L330 170 L330 205 L372 230"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Nodes */}
                  <circle cx="372" cy="230" r="3.5" fill="#B84A2B" />
                  <circle cx="420" cy="280" r="3" fill="#B84A2B" opacity="0.8" />
                  <circle cx="330" cy="170" r="2.5" fill="#68635B" opacity="0.6" />
                </g>

                {/* 3. STORAGE Callout (Bottom-Left) */}
                <g className="transition-all duration-500">
                  <text
                    x="85"
                    y="450"
                    className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]"
                  >
                    {activeItem.callouts.storage}
                  </text>
                  <path
                    d="M150 446 L195 446 L235 410 L250 410"
                    stroke="#B84A2B"
                    strokeWidth="1.2"
                    strokeOpacity="0.45"
                  />
                  <circle r="2.5" fill="#B84A2B">
                    <animateMotion
                      path="M150 446 L195 446 L235 410 L250 410"
                      dur="3.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="250" cy="410" r="3.5" fill="#B84A2B" />
                </g>

                {/* 4. Subtle Wireframe Bounding Lines around the floating cube */}
                <g opacity="0.4">
                  <path
                    d="M272 135 L300 115 L328 135 L300 155 Z"
                    stroke="#B84A2B"
                    strokeWidth="1"
                  />
                  <line x1="300" y1="155" x2="300" y2="182" stroke="#B84A2B" strokeWidth="1" />
                </g>
              </svg>

              {/* Pulsing LED vents on server face */}
              <div
                className="absolute top-[37%] left-[38%] w-2 h-2 rounded-full bg-[#B84A2B] shadow-[0_0_12px_#B84A2B] animate-ping opacity-60 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute top-[48%] left-[38%] w-1.5 h-1.5 rounded-full bg-[#FF8A50] shadow-[0_0_10px_#FF8A50] animate-pulse pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute top-[59%] left-[38%] w-1.5 h-1.5 rounded-full bg-[#B84A2B] shadow-[0_0_10px_#B84A2B] animate-pulse pointer-events-none"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          {/* ── Column 3: Right Details & Controls ────────────────── */}
          <div className="flex flex-col justify-between self-stretch py-2 lg:pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col"
              >
                {/* Practice Icon & Category Row */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-12 h-12 rounded-[14px] bg-[#171614]/[0.05] border border-[#171614]/[0.08] flex items-center justify-center text-[#171614] shrink-0">
                    <activeItem.icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B84A2B]">
                    {activeItem.subtitle}
                  </span>
                </div>

                {/* Practice Title */}
                <h3 className="text-[clamp(2.4rem,3.6vw,3.3rem)] font-extrabold tracking-[-0.035em] text-[#171614] leading-[1.04] m-0 mb-4">
                  {activeItem.title}
                </h3>

                {/* Description */}
                <p className="text-[1.05rem] leading-[1.65] text-[#555047] max-w-[440px] m-0 mb-6">
                  {activeItem.summary}
                </p>

                {/* Platform Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeItem.platforms.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-[10px] bg-[#171614]/[0.045] border border-[#171614]/[0.06] font-mono text-[12px] font-medium text-[#171614]/80 tracking-tight"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions: Button & Network Connection */}
                <div className="flex items-center gap-5 flex-wrap mb-10">
                  <Link
                    href={activeItem.href}
                    id="capabilities-explore-cta"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#B84A2B] hover:bg-[#a13e22] text-white text-[14px] font-semibold tracking-[-0.01em] transition-all hover:shadow-[0_8px_24px_rgba(184,74,43,0.28)] hover:-translate-y-0.5"
                  >
                    Explore Practice <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <div className="inline-flex items-center gap-2 text-[13px] font-medium text-[#1E5A63]">
                    <Network className="w-4 h-4 text-[#1E5A63]" />
                    <span>{activeItem.connectedTo}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Bottom Slider Progress & Arrow Controls ─────────── */}
            <div className="flex items-center justify-between gap-6 pt-6 border-t border-[#171614]/10 mt-auto">
              {/* Progress Slider */}
              <div className="flex items-center gap-3.5 flex-1 max-w-[260px]">
                <span className="font-mono text-[12px] font-semibold tabular-nums text-[#171614]">
                  {activeItem.number}
                </span>

                <div className="relative flex-1 h-[2.5px] bg-[#171614]/15 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 bottom-0 left-0 bg-[#B84A2B] rounded-full"
                    animate={{
                      width: `${((activeIndex + 1) / totalCount) * 100}%`,
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>

                <span className="font-mono text-[12px] tabular-nums text-[#68635B]/70">
                  0{totalCount}
                </span>
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={goToPrev}
                  aria-label="Previous capability"
                  className="w-10 h-10 rounded-full border border-[#171614]/20 hover:border-[#171614]/60 bg-[#171614]/[0.02] hover:bg-[#171614]/[0.08] flex items-center justify-center text-[#171614] transition-all cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={goToNext}
                  aria-label="Next capability"
                  className="w-10 h-10 rounded-full bg-white border border-[#171614]/15 hover:border-[#171614]/40 shadow-sm hover:shadow flex items-center justify-center text-[#171614] transition-all cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cinematic Foreground Depth Blur Element (Bottom-Right) ─── */}
      <div
        className="absolute -bottom-16 -right-10 w-80 h-72 pointer-events-none z-30 opacity-75 hidden xl:block"
        aria-hidden="true"
        style={{
          filter: 'blur(16px)',
          transform: 'rotate(-8deg)',
        }}
      >
        <div className="w-full h-full relative rounded-[32px] border-2 border-[#B84A2B]/40 bg-gradient-to-tr from-[#DDD4C5]/40 via-[#F4EFE6]/20 to-[#DA6A43]/30 shadow-[0_20px_50px_rgba(184,74,43,0.18)]" />
      </div>
    </section>
  );
}
