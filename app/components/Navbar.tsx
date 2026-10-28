'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Insights', href: '/insights' },
  ];

  return (
    <>
      {/* Floating Capsule Header Container */}
      <header className="fixed top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center justify-between md:justify-start gap-1 sm:gap-1.5 p-1.5 rounded-full bg-[#DDD4C5]/95 backdrop-blur-md border border-[#171614]/10 transition-all duration-300 ${
            scrolled
              ? 'shadow-[0_12px_32px_rgba(23,22,20,0.12)] border-[#171614]/15'
              : 'shadow-[0_6px_24px_-4px_rgba(23,22,20,0.08),0_1px_2px_rgba(23,22,20,0.04)]'
          }`}
        >
          {/* Left Circular Mark Badge */}
          <Link
            href="/"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#B84A2B] hover:bg-[#9E3E23] flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 shadow-[0_2px_8px_rgba(184,74,43,0.3)]"
            aria-label="Nuberu Home"
          >
            <Image
              src="/images/nuberu_mark_white.svg"
              alt="NUBERU"
              width={20}
              height={16}
              priority
              className="w-4.5 sm:w-5 h-auto block"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-0.5 sm:gap-1 px-1 lg:px-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[13.5px] font-medium tracking-[-0.01em] transition-colors relative ${
                    isActive
                      ? 'text-[#B84A2B] bg-[#171614]/[0.04]'
                      : 'text-[#171614] hover:text-[#B84A2B] hover:bg-[#171614]/[0.03]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Thin Vertical Divider */}
          <div className="hidden md:block h-4.5 w-[1px] bg-[#171614]/15 mx-1" aria-hidden="true" />

          {/* Desktop CTA Pill Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#F4EFE6] bg-[#B84A2B] hover:bg-[#9E3E23] px-4.5 py-2 rounded-full tracking-[-0.01em] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(184,74,43,0.25)] shrink-0"
            >
              <span>Talk to Us</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </Link>
          </div>

          {/* Mobile Right Controls: Compact CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-1.5 pl-1.5">
            <Link
              href="/contact"
              className="text-xs font-semibold text-[#F4EFE6] bg-[#B84A2B] px-3.5 py-1.5 rounded-full shrink-0"
            >
              Talk to Us
            </Link>

            <button
              type="button"
              className="flex flex-col justify-center items-center w-8 h-8 gap-1 rounded-full hover:bg-[#171614]/5 transition-colors shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={`block w-4 h-[1.5px] bg-[#171614] transition-transform duration-300 ${
                  mobileOpen ? 'translate-y-[5.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`block w-4 h-[1.5px] bg-[#171614] transition-opacity duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-4 h-[1.5px] bg-[#171614] transition-transform duration-300 ${
                  mobileOpen ? '-translate-y-[5.5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Floating Card */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-x-4 top-20 max-w-sm mx-auto bg-white/95 backdrop-blur-xl border border-[#171614]/10 rounded-3xl p-6 shadow-2xl z-50 flex flex-col items-center md:hidden"
            >
              <ul className="flex flex-col items-center gap-4 text-center w-full">
                {navLinks.map((link) => (
                  <li key={link.label} className="w-full">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-base font-medium text-[#171614] hover:text-[#B84A2B] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2 w-full">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-[#F4EFE6] bg-[#B84A2B] py-3 px-6 rounded-full shadow-md"
                  >
                    <span>Talk to Us</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
