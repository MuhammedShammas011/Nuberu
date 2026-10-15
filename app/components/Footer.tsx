'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowUp, Copy, Check, Mail, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;
  const [copied, setCopied] = useState(false);
  const [londonTime, setLondonTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setLondonTime(timeStr);
      } catch {
        setLondonTime('12:00');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@nuberu.tech');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Capabilities', href: '/#capabilities' },
    { label: 'How We Work', href: '/#delivery-approach' },
    { label: 'Services Portfolio', href: '/services' },
    { label: 'About Nuberu', href: '/about' },
    { label: 'Technical Insights', href: '/insights' },
    { label: 'Contact & Engagement', href: '/contact' },
  ];

  const serviceLinks = [
    { label: 'Cloud and DevOps', href: '/services/cloud-devops' },
    { label: 'Data Centre & Infrastructure', href: '/services/datacenter-infrastructure' },
    { label: 'Container Platforms', href: '/services/container-platforms' },
    { label: 'VMware Off Ramp', href: '/services/vmware-offramp' },
    { label: 'Application Modernisation', href: '/services/application-modernisation' },
    { label: 'Security & DevSecOps', href: '/services/security-devsecops' },
    { label: 'Managed Services', href: '/services/managed-services' },
  ];

  return (
    <footer className="bg-[#12110F] text-[#F4EFE6] relative overflow-hidden border-t border-white/[0.08]">
      {/* Subtle architectural noise / radial vignette */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#F4EFE6 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 pt-20 sm:pt-28 pb-12">
        {/* Top Bold Invitation Block */}
        <div className="pb-16 sm:pb-20 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#B84A2B] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#B84A2B] animate-pulse" />
                Let&apos;s Build Resilient Systems
              </span>
              <h2 className="text-[clamp(2.5rem,5.5vw,4.8rem)] font-extrabold text-[#F4EFE6] tracking-[-0.04em] leading-[0.98] m-0">
                Ready to Architect <br className="hidden sm:inline" />
                What&apos;s Next?
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-[#F4EFE6] bg-[#B84A2B] hover:bg-[#9E3E23] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(184,74,43,0.35)]"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-mono text-[#F4EFE6]/80 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all cursor-pointer relative"
                aria-label="Copy direct contact email"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="inline-flex items-center gap-2 text-[#4ade80]"
                    >
                      <Check className="w-4 h-4" />
                      <span>Email Copied!</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="email"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="inline-flex items-center gap-2 text-[#F4EFE6]/80 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                      <span>hello@nuberu.tech</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Main 4-Column Minimalist Grid */}
        <div className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 border-b border-white/10">
          {/* Column 1: Brand & Operating Telemetry */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-6 group" aria-label="Nuberu Home">
                <Image
                  src="/images/nuberu_logo_light.svg"
                  alt="NUBERU"
                  width={142}
                  height={34}
                  className="h-8 w-auto block transition-opacity group-hover:opacity-90"
                />
              </Link>
              <p className="text-sm leading-relaxed text-[#F4EFE6]/65 max-w-[380px] mb-8 font-normal">
                Enterprise technology services specialising in infrastructure modernisation, cloud architectures, container platforms, and Day 2 operational reliability.
              </p>
            </div>

            {/* Live Operational Status Capsule */}
            <div className="space-y-3.5 pt-4">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#F4EFE6]/80">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E5A63] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E5A63]" />
                </span>
                <span>Operational Practice</span>
                <span className="text-white/20">•</span>
                <span className="text-[#F4EFE6]/60">London {londonTime ? `${londonTime} GMT` : 'GMT'}</span>
              </div>

              <div className="flex flex-col gap-1.5 text-xs font-mono text-[#F4EFE6]/50">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B84A2B]" />
                  <span>Headquarters: London, United Kingdom</span>
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#B84A2B]" />
                  <span>Enquiries: <a href="mailto:hello@nuberu.tech" className="text-[#F4EFE6]/70 hover:text-white transition-colors">hello@nuberu.tech</a></span>
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Service Practices */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#B84A2B] mb-6 flex items-center gap-2">
              <span>{'// PRACTICES'}</span>
            </h3>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-[#F4EFE6]/70 hover:text-white transition-all duration-200"
                  >
                    <span className="text-[#B84A2B] opacity-0 -ml-3.5 mr-1.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 font-mono text-xs">
                      →
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 font-medium">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#B84A2B] mb-6 flex items-center gap-2">
              <span>{'// NAVIGATION'}</span>
            </h3>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-[#F4EFE6]/70 hover:text-white transition-all duration-200"
                  >
                    <span className="text-[#B84A2B] opacity-0 -ml-3.5 mr-1.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 font-mono text-xs">
                      →
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 font-medium">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Connect & Network */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#B84A2B] mb-6 flex items-center gap-2">
                <span>{'// CONNECT'}</span>
              </h3>
              
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white hover:text-[#12110F] border border-white/10 hover:border-white text-xs font-mono text-[#F4EFE6]/80 transition-all duration-300"
                >
                  <span className="font-semibold tracking-wider">LINKEDIN</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white hover:text-[#12110F] border border-white/10 hover:border-white text-xs font-mono text-[#F4EFE6]/80 transition-all duration-300"
                >
                  <span className="font-semibold tracking-wider">GITHUB</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white hover:text-[#12110F] border border-white/10 hover:border-white text-xs font-mono text-[#F4EFE6]/80 transition-all duration-300"
                >
                  <span className="font-semibold tracking-wider">X (TWITTER)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#F4EFE6]/40 block mb-1">
                Security & Compliance
              </span>
              <span className="text-xs text-[#F4EFE6]/70 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#1E5A63]" />
                ISO 27001 Methodology
              </span>
            </div>
          </div>
        </div>

        {/* Monumental Architectural Brand Imprint */}
        <div className="py-12 sm:py-16 overflow-hidden select-none pointer-events-none flex items-center justify-center">
          <p className="text-[clamp(4.2rem,15vw,13.5rem)] font-extrabold tracking-[-0.05em] leading-none text-white/[0.04] sm:text-white/[0.05] m-0 text-center uppercase tracking-tight">
            NUBERU
          </p>
        </div>

        {/* Sub-Footer Precision Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#F4EFE6]/50 font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>© {currentYear} NUBERU ENTERPRISE. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-[#F4EFE6]/40">ENTERPRISE CLOUD & MODERNISATION</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Engagement
            </Link>
            
            {/* Minimal Smooth Back-to-Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-[#F4EFE6]/70 hover:text-white transition-colors ml-2 py-1 px-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
