'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-[#F4EFE6]/90 backdrop-blur-md shadow-[0_1px_0_rgba(23,22,20,0.06)]'
          : 'bg-[#F4EFE6]'
      }`}
    >
      <div className="container-custom flex items-center justify-between w-full">
        {/* Approved Logo */}
        <Link href="/" className="inline-flex items-center z-50" aria-label="Nuberu Home">
          <Image
            src="/images/nuberu_full_logo.svg"
            alt="NUBERU"
            width={138}
            height={32}
            priority
            className="h-7 w-auto block"
          />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-9 ml-auto mr-9" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[15px] font-medium tracking-[-0.01em] transition-colors relative py-1 ${
                  isActive ? 'text-[#B84A2B]' : 'text-[#171614] hover:text-[#B84A2B]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B84A2B]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="text-[14.5px] font-medium text-[#F4EFE6] bg-[#B84A2B] hover:bg-[#9E3E23] px-6 py-2.5 rounded-full tracking-[-0.01em] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(184,74,43,0.25)]"
          >
            Talk to Us
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-[#171614] transition-transform duration-300 ${
              mobileOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[#171614] transition-opacity duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[#171614] transition-transform duration-300 ${
              mobileOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#F4EFE6] z-40 flex flex-col justify-center items-center px-6 md:hidden"
          >
            <ul className="flex flex-col items-center gap-7 text-center">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-medium text-[#171614] hover:text-[#B84A2B] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-block text-base font-medium text-[#F4EFE6] bg-[#B84A2B] px-8 py-3 rounded-full"
                >
                  Talk to Us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
