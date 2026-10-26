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
  image: string;
  icon: LucideIcon;
  callouts: {
    top1: string;
    top2: string;
    bottom: string;
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
    image: '/images/capabilities/infra.jpg',
    icon: Server,
    callouts: {
      top1: 'COMPUTE',
      top2: 'VIRTUALISATION',
      bottom: 'STORAGE',
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
    image: '/images/capabilities/cloud.jpg',
    icon: Cloud,
    callouts: {
      top1: 'HYPERSCALER REGION',
      top2: 'TRANSIT GATEWAY',
      bottom: 'DIRECT CONNECT',
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
    image: '/images/capabilities/containers.jpg',
    icon: Boxes,
    callouts: {
      top1: 'POD ORCHESTRATION',
      top2: 'CONTROL PLANE',
      bottom: 'CSI STORAGE FABRIC',
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
    image: '/images/capabilities/automation.jpg',
    icon: Cpu,
    callouts: {
      top1: 'GITOPS PIPELINE',
      top2: 'DECLARATIVE ENGINE',
      bottom: 'ZERO-DRIFT STATE',
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
    image: '/images/capabilities/modernisation.jpg',
    icon: RefreshCw,
    callouts: {
      top1: 'EVENT BUS / KAFKA',
      top2: 'MICROSERVICE MESH',
      bottom: 'DISTRIBUTED STATE',
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
    image: '/images/capabilities/data-ai.jpg',
    icon: Database,
    callouts: {
      top1: 'NEURAL SYNAPSE',
      top2: 'VECTOR EMBEDDINGS',
      bottom: 'GOVERNED LAKEHOUSE',
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
    image: '/images/capabilities/security.jpg',
    icon: ShieldCheck,
    callouts: {
      top1: 'VAULT ENCLAVE',
      top2: 'ZERO TRUST SHIELD',
      bottom: 'PERIMETER DEFENSE',
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
      tiltX.set(-y * 8);
      tiltY.set(x * 10);
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

  // Subtle wheel navigation inside section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
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

          {/* ── Column 2: Center Interactive 3D Visual Assembly ────── */}
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

              {/* ── Dynamic 3D Feature Image with Smooth Cross-Fade ── */}
              <div className="relative w-[92%] h-[92%] overflow-hidden rounded-[24px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={activeItem.image}
                      alt={`${activeItem.title} modular technology architecture`}
                      fill
                      sizes="(max-width: 768px) 100vw, 540px"
                      priority
                      className="object-contain mix-blend-multiply transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Feature-Specific Animated SVG Overlays ───────── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`overlay-${activeItem.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full pointer-events-none z-20"
                >
                  {/* ──────────────────────────────────────────────────────────
                      01. INFRASTRUCTURE ANIMATION
                      ────────────────────────────────────────────────────────── */}
                  {activeItem.id === 'infrastructure' && (
                    <svg viewBox="0 0 600 600" className="w-full h-full" fill="none">
                      {/* COMPUTE */}
                      <g>
                        <text x="90" y="190" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top1}
                        </text>
                        <path d="M165 186 L230 186 L258 235 L268 250" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.45" />
                        <circle r="2.5" fill="#B84A2B">
                          <animateMotion path="M165 186 L230 186 L258 235 L268 250" dur="3.2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="268" cy="250" r="3.5" fill="#B84A2B" className="animate-pulse" />
                      </g>

                      {/* VIRTUALISATION */}
                      <g>
                        <text x="370" y="125" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top2}
                        </text>
                        <path d="M365 135 L330 170 L330 205 L372 230" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <path d="M330 205 L370 205 L420 235 L420 280" stroke="#68635B" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="2 3" />
                        <circle r="2.5" fill="#DA6A43">
                          <animateMotion path="M365 135 L330 170 L330 205 L372 230" dur="4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="372" cy="230" r="3.5" fill="#B84A2B" />
                        <circle cx="420" cy="280" r="3" fill="#B84A2B" opacity="0.8" />
                      </g>

                      {/* STORAGE */}
                      <g>
                        <text x="85" y="450" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.bottom}
                        </text>
                        <path d="M150 446 L195 446 L235 410 L250 410" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.45" />
                        <circle r="2.5" fill="#B84A2B">
                          <animateMotion path="M150 446 L195 446 L235 410 L250 410" dur="3.6s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="250" cy="410" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* Cube wireframe & LED vents */}
                      <g opacity="0.4">
                        <path d="M272 135 L300 115 L328 135 L300 155 Z" stroke="#B84A2B" strokeWidth="1" />
                        <line x1="300" y1="155" x2="300" y2="182" stroke="#B84A2B" strokeWidth="1" />
                      </g>
                    </svg>
                  )}

                  {/* ──────────────────────────────────────────────────────────
                      02. CLOUD PLATFORMS ANIMATION
                      ────────────────────────────────────────────────────────── */}
                  {activeItem.id === 'cloud' && (
                    <svg viewBox="0 0 600 600" className="w-full h-full" fill="none">
                      {/* Expanding Multi-Cloud Gateway Radar Rings */}
                      <g>
                        <circle cx="300" cy="210" r="28" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.6">
                          <animate attributeName="r" values="24;58;80" dur="3s" repeatCount="indefinite" />
                          <animate attributeName="stroke-opacity" values="0.8;0.3;0" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="300" cy="210" r="28" stroke="#DA6A43" strokeWidth="1" strokeOpacity="0.4">
                          <animate attributeName="r" values="24;58;80" dur="3s" begin="1.5s" repeatCount="indefinite" />
                          <animate attributeName="stroke-opacity" values="0.8;0.3;0" dur="3s" begin="1.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="300" cy="210" r="5" fill="#B84A2B" className="animate-ping" />
                      </g>

                      {/* HYPERSCALER REGION (Top-Left) */}
                      <g>
                        <text x="65" y="160" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top1}
                        </text>
                        <path d="M215 156 L245 156 L265 190" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M215 156 L245 156 L265 190" dur="2.4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="265" cy="190" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* TRANSIT GATEWAY (Top-Right) */}
                      <g>
                        <text x="380" y="140" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top2}
                        </text>
                        <path d="M375 145 L350 170 L320 195" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#DA6A43">
                          <animateMotion path="M375 145 L350 170 L320 195" dur="3.1s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="320" cy="195" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* DIRECT CONNECT (Bottom-Left) */}
                      <g>
                        <text x="65" y="460" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.bottom}
                        </text>
                        <path d="M185 456 L220 456 L260 415 L285 415" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M185 456 L220 456 L260 415 L285 415" dur="2.8s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="285" cy="415" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* Orbiting data packet along the central cloud conduit */}
                      <circle r="3" fill="#FF8A50">
                        <animateMotion path="M190 320 L270 240 L390 240 L440 310" dur="4.2s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  )}

                  {/* ──────────────────────────────────────────────────────────
                      03. CONTAINERS ANIMATION
                      ────────────────────────────────────────────────────────── */}
                  {activeItem.id === 'containers' && (
                    <svg viewBox="0 0 600 600" className="w-full h-full" fill="none">
                      {/* Rotating Helm Wheel Energy Field */}
                      <g transform="translate(300, 110)">
                        <circle cx="0" cy="0" r="34" stroke="#B84A2B" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.5">
                          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="18s" repeatCount="indefinite" />
                        </circle>
                      </g>

                      {/* POD ORCHESTRATION (Top-Left) */}
                      <g>
                        <text x="65" y="175" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top1}
                        </text>
                        <path d="M210 171 L245 171 L280 205" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M210 171 L245 171 L280 205" dur="2.8s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="280" cy="205" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* CONTROL PLANE (Top-Right) */}
                      <g>
                        <text x="380" y="130" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top2}
                        </text>
                        <path d="M375 135 L335 155 L315 155" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#DA6A43">
                          <animateMotion path="M375 135 L335 155 L315 155" dur="3.2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="315" cy="155" r="4" fill="#B84A2B" className="animate-pulse" />
                      </g>

                      {/* CSI STORAGE FABRIC (Bottom-Left) */}
                      <g>
                        <text x="60" y="470" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.bottom}
                        </text>
                        <path d="M215 466 L250 466 L275 440 L300 440" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M215 466 L250 466 L275 440 L300 440" dur="3.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="300" cy="440" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* Container Pod Telemetry Blinks */}
                      <circle cx="225" cy="275" r="3" fill="#FF8A50" className="animate-ping" opacity="0.8" />
                      <circle cx="370" cy="285" r="2.5" fill="#B84A2B" className="animate-pulse" />
                      <circle cx="410" cy="340" r="3" fill="#FF8A50" className="animate-ping" opacity="0.6" />
                    </svg>
                  )}

                  {/* ──────────────────────────────────────────────────────────
                      04. AUTOMATION ANIMATION
                      ────────────────────────────────────────────────────────── */}
                  {activeItem.id === 'automation' && (
                    <svg viewBox="0 0 600 600" className="w-full h-full" fill="none">
                      {/* Automated Laser Scanner Beam Sweeping across build gate */}
                      <g>
                        <line x1="330" y1="210" x2="330" y2="295" stroke="#B84A2B" strokeWidth="2" strokeOpacity="0.8" strokeLinecap="round">
                          <animate attributeName="x1" values="275;385;275" dur="3.6s" repeatCount="indefinite" />
                          <animate attributeName="x2" values="275;385;275" dur="3.6s" repeatCount="indefinite" />
                          <animate attributeName="stroke-opacity" values="0.9;0.4;0.9" dur="3.6s" repeatCount="indefinite" />
                        </line>
                      </g>

                      {/* GITOPS PIPELINE (Top-Left) */}
                      <g>
                        <text x="75" y="180" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top1}
                        </text>
                        <path d="M200 176 L235 176 L250 200 L280 200" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M200 176 L235 176 L250 200 L280 200" dur="2.6s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="280" cy="200" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* DECLARATIVE ENGINE (Top-Right) */}
                      <g>
                        <text x="375" y="135" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top2}
                        </text>
                        <path d="M370 140 L345 160 L345 195" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#DA6A43">
                          <animateMotion path="M370 140 L345 160 L345 195" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="345" cy="195" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* ZERO-DRIFT STATE (Bottom-Left) */}
                      <g>
                        <text x="70" y="475" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.bottom}
                        </text>
                        <path d="M200 471 L245 471 L275 440 L315 440" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M200 471 L245 471 L275 440 L315 440" dur="3.2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="315" cy="440" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* Conveyor delivery pulses moving along the track */}
                      <circle r="3" fill="#FF8A50">
                        <animateMotion path="M190 280 L280 280 L350 310 L430 310" dur="3.8s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  )}

                  {/* ──────────────────────────────────────────────────────────
                      05. MODERNISATION ANIMATION
                      ────────────────────────────────────────────────────────── */}
                  {activeItem.id === 'modernisation' && (
                    <svg viewBox="0 0 600 600" className="w-full h-full" fill="none">
                      {/* Reactive Event Bus Rings Rotating around Microservices */}
                      <g transform="translate(425, 290)">
                        <circle cx="0" cy="0" r="26" stroke="#B84A2B" strokeWidth="1.2" strokeDasharray="3 5" strokeOpacity="0.6">
                          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite" />
                        </circle>
                      </g>
                      <g transform="translate(460, 360)">
                        <circle cx="0" cy="0" r="22" stroke="#DA6A43" strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.5">
                          <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="11s" repeatCount="indefinite" />
                        </circle>
                      </g>

                      {/* EVENT BUS / KAFKA (Top-Left) */}
                      <g>
                        <text x="65" y="165" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top1}
                        </text>
                        <path d="M205 161 L240 161 L265 190 L295 190" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M205 161 L240 161 L265 190 L295 190" dur="2.7s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="295" cy="190" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* MICROSERVICE MESH (Top-Right) */}
                      <g>
                        <text x="370" y="130" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top2}
                        </text>
                        <path d="M365 135 L335 165 L365 190 L395 190" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#DA6A43">
                          <animateMotion path="M365 135 L335 165 L365 190 L395 190" dur="3.4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="395" cy="190" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* DISTRIBUTED STATE (Bottom-Left) */}
                      <g>
                        <text x="70" y="470" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.bottom}
                        </text>
                        <path d="M210 466 L250 466 L280 435 L315 435" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M210 466 L250 466 L280 435 L315 435" dur="3.1s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="315" cy="435" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* Continuous particle flow from monolith to microservices */}
                      <circle r="2.5" fill="#FF8A50">
                        <animateMotion path="M305 285 Q350 260 410 275" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                      <circle r="2.5" fill="#B84A2B">
                        <animateMotion path="M305 320 Q360 300 420 330" dur="2.8s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  )}

                  {/* ──────────────────────────────────────────────────────────
                      06. DATA & AI ANIMATION
                      ────────────────────────────────────────────────────────── */}
                  {activeItem.id === 'data-ai' && (
                    <svg viewBox="0 0 600 600" className="w-full h-full" fill="none">
                      {/* Neural Matrix Synapses Firing on Top Core */}
                      <g>
                        <path d="M280 120 L300 95 L320 120 L300 145 Z" stroke="#B84A2B" strokeWidth="1" strokeOpacity="0.4" />
                        <line x1="280" y1="120" x2="320" y2="120" stroke="#DA6A43" strokeWidth="1" strokeOpacity="0.5" />
                        <circle cx="300" cy="95" r="3.5" fill="#B84A2B">
                          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="fill-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="280" cy="120" r="2.5" fill="#FF8A50" className="animate-ping" opacity="0.7" />
                        <circle cx="320" cy="120" r="2.5" fill="#B84A2B" className="animate-pulse" />
                      </g>

                      {/* NEURAL SYNAPSE (Top-Left) */}
                      <g>
                        <text x="80" y="165" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top1}
                        </text>
                        <path d="M200 161 L240 161 L270 140 L285 140" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M200 161 L240 161 L270 140 L285 140" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="285" cy="140" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* VECTOR EMBEDDINGS (Top-Right) */}
                      <g>
                        <text x="375" y="130" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top2}
                        </text>
                        <path d="M370 135 L335 155 L320 185" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#DA6A43">
                          <animateMotion path="M370 135 L335 155 L320 185" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="320" cy="185" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* GOVERNED LAKEHOUSE (Bottom-Left) */}
                      <g>
                        <text x="70" y="465" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.bottom}
                        </text>
                        <path d="M215 461 L250 461 L280 430 L315 430" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M215 461 L250 461 L280 430 L315 430" dur="3.4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="315" cy="430" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* Data streams flowing up into neural tier */}
                      <circle r="2.5" fill="#FF8A50">
                        <animateMotion path="M300 240 L300 170" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  )}

                  {/* ──────────────────────────────────────────────────────────
                      07. SECURITY ANIMATION
                      ────────────────────────────────────────────────────────── */}
                  {activeItem.id === 'security' && (
                    <svg viewBox="0 0 600 600" className="w-full h-full" fill="none">
                      {/* Rotating Zero-Trust Perimeter Radar Sweep */}
                      <g transform="translate(300, 340)">
                        <circle cx="0" cy="0" r="165" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="3 7" />
                        <line x1="0" y1="0" x2="165" y2="0" stroke="#FF8A50" strokeWidth="1.8" strokeOpacity="0.75">
                          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="7s" repeatCount="indefinite" />
                        </line>
                      </g>

                      {/* Geodesic Dome Shield Ripple Pulse */}
                      <g>
                        <ellipse cx="300" cy="270" rx="140" ry="110" stroke="#B84A2B" strokeWidth="1" strokeOpacity="0.3">
                          <animate attributeName="stroke-opacity" values="0.15;0.6;0.15" dur="3.5s" repeatCount="indefinite" />
                        </ellipse>
                      </g>

                      {/* VAULT ENCLAVE (Top-Left) */}
                      <g>
                        <text x="80" y="170" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top1}
                        </text>
                        <path d="M195 166 L230 166 L260 210 L285 210" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M195 166 L230 166 L260 210 L285 210" dur="2.6s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="285" cy="210" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* ZERO TRUST SHIELD (Top-Right) */}
                      <g>
                        <text x="375" y="130" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.top2}
                        </text>
                        <path d="M370 135 L330 155 L330 190" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#DA6A43">
                          <animateMotion path="M370 135 L330 155 L330 190" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="330" cy="190" r="3.5" fill="#B84A2B" className="animate-pulse" />
                      </g>

                      {/* PERIMETER DEFENSE (Bottom-Left) */}
                      <g>
                        <text x="65" y="470" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] fill-[#68635B]">
                          {activeItem.callouts.bottom}
                        </text>
                        <path d="M210 466 L245 466 L270 435 L300 435" stroke="#B84A2B" strokeWidth="1.2" strokeOpacity="0.5" />
                        <circle r="3" fill="#B84A2B">
                          <animateMotion path="M210 466 L245 466 L270 435 L300 435" dur="3.2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="300" cy="435" r="3.5" fill="#B84A2B" />
                      </g>

                      {/* Vault lock status beacons */}
                      <circle cx="310" cy="300" r="4" fill="#B84A2B" className="animate-ping" opacity="0.75" />
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
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
