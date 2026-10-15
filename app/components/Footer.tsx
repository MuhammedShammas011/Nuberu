'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = 2026;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About Nuberu', href: '/about' },
    { label: 'Technical Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
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
    <footer className="bg-[#171614] text-[#F4EFE6] pt-20 pb-12 border-t border-white/10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-6" aria-label="Nuberu Home">
                <Image
                  src="/images/nuberu_logo_light.svg"
                  alt="NUBERU"
                  width={138}
                  height={32}
                  className="h-7 w-auto block"
                />
              </Link>
              <p className="text-sm leading-relaxed text-[#F4EFE6]/60 max-w-[360px] mb-8">
                Enterprise technology services specialising in infrastructure, cloud, containers, automation, and digital transformation.
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono text-[#F4EFE6]/50">
              <p>Headquarters: London, United Kingdom</p>
              <p>Direct: <a href="mailto:hello@nuberu.tech" className="hover:text-[#B84A2B] transition-colors">hello@nuberu.tech</a></p>
            </div>
          </div>

          {/* Practice Areas */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#B84A2B] mb-5">
              Service Practices
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F4EFE6]/70">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Nav & Legal */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#B84A2B] mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F4EFE6]/70 mb-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-xs text-[#F4EFE6]/60 hover:text-white hover:border-white transition-colors"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-xs text-[#F4EFE6]/60 hover:text-white hover:border-white transition-colors"
                aria-label="GitHub"
              >
                gh
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-xs text-[#F4EFE6]/60 hover:text-white hover:border-white transition-colors"
                aria-label="X"
              >
                x
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F4EFE6]/40 font-mono">
          <p>© {currentYear} Nuberu. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#F4EFE6] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#F4EFE6] transition-colors">
              Terms of Engagement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
