'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      className="pt-[100px] sm:pt-[114px] lg:pt-[122px] bg-[#F4EFE6] relative flex flex-col justify-between"
      id="hero"
      aria-label="Hero — One System. Many Capabilities."
    >
      <div className="container-custom pt-4 sm:pt-6 pb-0 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-end">
        {/* Left Column: Text & CTAs */}
        <div className="flex flex-col pb-10 sm:pb-13 lg:pb-16">
          <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#4A6B7C] mb-4 sm:mb-5">
            ONE SYSTEM. MANY CAPABILITIES.
          </p>

          <h1 className="text-[clamp(2.18rem,6vw,5.65rem)] font-extrabold leading-[1.03] tracking-[-0.04em] text-[#171614] m-0">
            Here Infrastructure<br />
            Enables<br />
            Transformation.
          </h1>

          <p className="text-[1.04rem] sm:text-[1.2rem] leading-[1.62] text-[#555047] max-w-[530px] mt-5.5 sm:mt-6.5 mb-7.5 sm:mb-9">
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
        <div className="flex justify-center lg:justify-end items-end self-end">
          <div className="relative w-full max-w-[540px] sm:max-w-[590px] lg:max-w-[640px] xl:max-w-[680px] flex items-end justify-center lg:justify-end -mb-2.5 sm:-mb-4 lg:-mb-6 group">
            <Image
              src="/assets/a_clean_high_resolution_isolated_png_style_portra.png"
              alt="Futuristic Portrait in Amber Light"
              width={750}
              height={685}
              priority
              className="w-full h-auto object-contain object-bottom select-none drop-shadow-[0_24px_50px_rgba(23,22,20,0.14)] block align-bottom transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Capabilities Full-Width Bar */}
      <div className="w-full bg-[#171614] py-4 sm:py-5 mt-auto overflow-x-auto no-scrollbar relative z-10" role="navigation" aria-label="Capability areas">
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
