'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      className="pt-[100px] sm:pt-[116px] bg-[#F4EFE6] relative flex flex-col justify-between"
      id="hero"
      aria-label="Hero — One System. Many Capabilities."
    >
      <div className="container-custom pb-12 sm:pb-16 pt-4 grid grid-cols-1 lg:grid-cols-[1.15fr_0.95fr] gap-10 lg:gap-14 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="flex flex-col">
          <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#4A6B7C] mb-4 sm:mb-6">
            ONE SYSTEM. MANY CAPABILITIES.
          </p>

          <h1 className="text-[clamp(2.15rem,6.2vw,5.75rem)] font-extrabold leading-[1.04] sm:leading-[1.02] tracking-[-0.04em] text-[#171614] m-0">
            Here Infrastructure<br />
            Enables<br />
            Transformation.
          </h1>

          <p className="text-[1.02rem] sm:text-[1.2rem] leading-[1.6] text-[#555047] max-w-[520px] mt-5 sm:mt-6 mb-7 sm:mb-9">
            Nuberu connects infrastructure, cloud and modern technologies to create simpler, 
            scalable and resilient technology environments.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
            <Link
              href="/contact"
              id="hero-cta-primary"
              className="inline-flex items-center justify-center text-[14.5px] font-medium text-[#F4EFE6] bg-[#171614] hover:bg-[#2b2925] px-7 py-3.5 rounded-full tracking-[-0.01em] border border-[#171614] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(23,22,20,0.15)] text-center"
            >
              Start a conversation
            </Link>
            <Link
              href="#capabilities"
              id="hero-cta-secondary"
              className="inline-flex items-center justify-center text-[14.5px] font-medium text-[#171614] bg-transparent hover:bg-[#171614]/5 px-7 py-3.5 rounded-full tracking-[-0.01em] border border-[#171614] transition-all hover:-translate-y-0.5 text-center"
            >
              See capabilities
            </Link>
          </div>
        </div>

        {/* Right Column: Isolated Portrait PNG */}
        <div className="flex justify-center lg:justify-end items-center">
          <div className="relative w-full max-w-[520px] flex items-center justify-center group">
            <Image
              src="/assets/a_clean_high_resolution_isolated_png_style_portra.png"
              alt="Futuristic Portrait in Amber Light"
              width={650}
              height={595}
              priority
              className="w-full h-auto object-contain select-none drop-shadow-[0_20px_40px_rgba(23,22,20,0.12)] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Capabilities Full-Width Bar */}
      <div className="w-full bg-[#171614] py-4 sm:py-5 mt-auto overflow-x-auto no-scrollbar" role="navigation" aria-label="Capability areas">
        <div className="container-custom flex justify-between items-center gap-6 min-w-max md:min-w-0">
          <Link
            href="#capabilities"
            className="text-[13.5px] font-semibold uppercase tracking-[0.14em] text-[#F4EFE6]/85 hover:text-white transition-all hover:-translate-y-0.5"
          >
            INFRASTRUCTURE
          </Link>
          <Link
            href="#capabilities"
            className="text-[13.5px] font-semibold uppercase tracking-[0.14em] text-[#B84A2B] hover:text-[#d15634] transition-all hover:-translate-y-0.5"
          >
            CLOUD
          </Link>
          <Link
            href="#capabilities"
            className="text-[13.5px] font-semibold uppercase tracking-[0.14em] text-[#F4EFE6]/85 hover:text-white transition-all hover:-translate-y-0.5"
          >
            CONTAINERS
          </Link>
          <Link
            href="#capabilities"
            className="text-[13.5px] font-semibold uppercase tracking-[0.14em] text-[#B84A2B] hover:text-[#d15634] transition-all hover:-translate-y-0.5"
          >
            AUTOMATION
          </Link>
          <Link
            href="#capabilities"
            className="text-[13.5px] font-semibold uppercase tracking-[0.14em] text-[#F4EFE6]/85 hover:text-white transition-all hover:-translate-y-0.5"
          >
            TRANSFORMATION
          </Link>
        </div>
      </div>
    </section>
  );
}
