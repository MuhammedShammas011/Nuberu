'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D scene with ssr: false — must be inside a Client Component
const EcosystemScene = dynamic(() => import('./EcosystemScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-[#171614]/20 border-t-[#B84A2B] rounded-full animate-spin" />
    </div>
  ),
});

// ─── Capability Labels ────────────────────────────────────────────────────────
const CAPS = [
  { label: 'INFRASTRUCTURE', accent: false },
  { label: 'CLOUD',          accent: true  },
  { label: 'CONTAINERS',     accent: false },
  { label: 'AUTOMATION',     accent: true  },
  { label: 'TRANSFORMATION', accent: false },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const mouse = useRef<[number, number]>([0, 0]);
  const scrollY = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Detect mobile & track mouse/scroll after mount
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouse = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth  - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    const handleScroll = () => { scrollY.current = window.scrollY; };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      className="relative bg-[#F4EFE6] flex flex-col"
      style={{ minHeight: '100svh' }}
      id="hero"
      aria-label="Hero — One System. Many Capabilities."
    >
      {/* ── Subtle dot grid overlay ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.032] pointer-events-none"
        style={{ backgroundImage:'radial-gradient(#171614 1px,transparent 1px)', backgroundSize:'28px 28px' }}
        aria-hidden="true"
      />

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="container-custom flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 pt-[96px] lg:pt-[80px]">

        {/* LEFT — Text column */}
        <div className="flex flex-col justify-center py-14 lg:py-0 lg:pr-12 z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B84A2B]" aria-hidden="true" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#68635B]">
              ONE SYSTEM. MANY CAPABILITIES.
            </p>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(3rem,6.5vw,5.6rem)] font-extrabold leading-[0.94] tracking-[-0.045em] text-[#171614] m-0 mb-6">
            Here<br />Infrastructure<br />
            <span className="relative inline-block">
              Enables
              <span
                className="absolute bottom-[6%] left-0 w-full h-[3px] bg-[#B84A2B] opacity-70"
                aria-hidden="true"
              />
            </span>
            <br />Transformation.
          </h1>

          {/* Body */}
          <p className="text-[1.05rem] leading-[1.65] text-[#555047] max-w-[460px] mb-9">
            Nuberu connects infrastructure, cloud and modern technologies to create
            simpler, scalable and resilient technology environments for the enterprise.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3.5 flex-wrap">
            <Link
              href="/contact"
              id="hero-cta-primary"
              className="inline-flex items-center justify-center text-[14.5px] font-semibold text-[#F4EFE6] bg-[#171614] hover:bg-[#2b2925] px-7 py-3.5 rounded-full tracking-[-0.01em] border border-[#171614] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(23,22,20,0.18)]"
            >
              Start a conversation
            </Link>
            <Link
              href="#capabilities"
              id="hero-cta-secondary"
              className="inline-flex items-center justify-center text-[14.5px] font-semibold text-[#171614] bg-transparent hover:bg-[#171614]/6 px-7 py-3.5 rounded-full tracking-[-0.01em] border border-[#171614]/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              See capabilities
            </Link>
          </div>

          {/* Ecosystem legend — visible desktop only */}
          <div className="hidden lg:flex flex-wrap items-center gap-5 mt-12 pt-8 border-t border-[#171614]/10">
            {[
              { dot: '#B84A2B', label: 'Infrastructure & Cloud' },
              { dot: '#1E5A63', label: 'Containers & Automation' },
              { dot: '#DDD4C5', label: 'Digital Transformation' },
            ].map(({ dot, label }) => (
              <span key={label} className="flex items-center gap-2 text-[12px] font-medium text-[#68635B] uppercase tracking-[0.1em]">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — 3D Scene column */}
        <div className="relative flex items-center justify-center min-h-[380px] lg:min-h-0">
          {/* Nuberu mark badge */}
          <div
            className="absolute top-6 right-0 z-20 w-[52px] h-[52px] bg-[#B84A2B] rounded-[14px] items-center justify-center shadow-[0_6px_20px_rgba(184,74,43,0.3)] hidden lg:flex"
            aria-hidden="true"
          >
            <Image
              src="/images/nuberu_mark_white.svg"
              alt="Nuberu Mark"
              width={26}
              height={20}
              className="w-[26px] h-auto block"
            />
          </div>

          {/* Architectural label — top left of scene */}
          <div className="absolute top-6 left-0 z-20 hidden lg:flex flex-col gap-1">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#68635B]">
              ECOSYSTEM / LIVE
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B84A2B] animate-pulse" aria-hidden="true" />
              <span className="text-[10px] font-mono text-[#68635B]">Interactive</span>
            </div>
          </div>

          {/* 3D Canvas */}
          <div
            className="w-full h-full absolute inset-0"
            aria-label="Interactive 3D technology ecosystem visualisation"
            role="img"
          >
            {mounted && (
              <EcosystemScene
                mouse={mouse}
                scrollY={scrollY}
                reducedMotion={false}
                isMobile={isMobile}
              />
            )}
          </div>

          {/* Depth vignette — bottom fade into page */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to top, #F4EFE6 0%, transparent 100%)' }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ── Bottom capabilities bar ──────────────────────────────────────── */}
      <div className="w-full bg-[#171614] py-[18px] mt-auto overflow-x-auto" role="navigation" aria-label="Capability areas">
        <div className="container-custom flex justify-between items-center gap-6 min-w-max md:min-w-0">
          {CAPS.map(({ label, accent }) => (
            <Link
              key={label}
              href="#capabilities"
              className={`text-[12.5px] font-semibold uppercase tracking-[0.15em] transition-all hover:-translate-y-0.5 ${
                accent
                  ? 'text-[#B84A2B] hover:text-[#d15634]'
                  : 'text-[#F4EFE6]/80 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
