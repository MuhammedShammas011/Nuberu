'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      className="pt-[116px] bg-[#F4EFE6] relative flex flex-col justify-between"
      id="hero"
      aria-label="Hero — One System. Many Capabilities."
    >
      <div className="container-custom pb-16 pt-4 grid grid-cols-1 lg:grid-cols-[1.15fr_0.95fr] gap-12 lg:gap-14 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="flex flex-col">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#4A6B7C] mb-6">
            ONE SYSTEM. MANY CAPABILITIES.
          </p>

          <h1 className="text-[clamp(3.4rem,5.8vw,5.75rem)] font-[550] leading-[1.02] tracking-[-0.04em] text-[#171614] m-0">
            Here Infrastructure<br />
            Enables<br />
            Transformation.
          </h1>

          <p className="text-[1.15rem] sm:text-[1.2rem] leading-[1.6] text-[#555047] max-w-[520px] mt-6 mb-9">
            Nuberu connects infrastructure, cloud and modern technologies to create simpler, 
            scalable and resilient technology environments.
          </p>

          <div className="flex items-center gap-3.5 flex-wrap">
            <Link
              href="/contact"
              id="hero-cta-primary"
              className="inline-flex items-center justify-center text-[14.5px] font-medium text-[#F4EFE6] bg-[#171614] hover:bg-[#2b2925] px-7 py-3.5 rounded-full tracking-[-0.01em] border border-[#171614] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(23,22,20,0.15)]"
            >
              Start a conversation
            </Link>
            <Link
              href="#capabilities"
              id="hero-cta-secondary"
              className="inline-flex items-center justify-center text-[14.5px] font-medium text-[#171614] bg-transparent hover:bg-[#171614]/5 px-7 py-3.5 rounded-full tracking-[-0.01em] border border-[#171614] transition-all hover:-translate-y-0.5"
            >
              See capabilities
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Card with Floating Brand Badge */}
        <div className="flex justify-center lg:justify-end items-center">
          <div className="relative w-full max-w-[520px] aspect-[1/1.05] rounded-[36px] overflow-hidden shadow-[0_24px_60px_-15px_rgba(23,22,20,0.14)] bg-[#2c201d] group">
            <Image
              src="/images/vr_hero.png"
              alt="Futuristic VR Headset Portrait in Amber Light"
              width={580}
              height={620}
              priority
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />

            {/* Floating Brand Badge */}
            <div
              className="absolute bottom-7 left-7 w-[72px] h-[72px] bg-[#B84A2B] rounded-[18px] flex items-center justify-center shadow-[0_8px_24px_rgba(184,74,43,0.35)] z-10 transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true"
            >
              <Image
                src="/images/nuberu_mark_white.svg"
                alt="Nuberu Mark"
                width={36}
                height={28}
                className="w-9 h-auto block"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Capabilities Full-Width Bar */}
      <div className="w-full bg-[#171614] py-5 mt-auto overflow-x-auto" role="navigation" aria-label="Capability areas">
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
