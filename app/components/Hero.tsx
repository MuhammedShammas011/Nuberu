'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      className="min-h-screen lg:min-h-[100dvh] pt-[92px] sm:pt-[104px] lg:pt-[114px] bg-[#F4EFE6] relative flex flex-col justify-between overflow-hidden"
      id="hero"
      aria-label="Hero — One System. Many Capabilities."
    >
      <div className="container-custom pt-4 sm:pt-6 pb-0 grid grid-cols-1 lg:grid-cols-[0.96fr_1.14fr] gap-6 lg:gap-8 items-end flex-1">
        {/* Left Column: Text & CTAs */}
        <div className="flex flex-col justify-between self-stretch h-full pt-1 sm:pt-2 lg:pt-3">
          {/* Top Headline Block */}
          <div>
            <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#4A6B7C] mb-2.5 sm:mb-3.5">
              ONE SYSTEM. MANY CAPABILITIES.
            </p>

            <h1 className="text-[clamp(1.6rem,3.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#171614] m-0">
              Here Infrastructure<br />
              <span className="text-[#B84A2B]">Enables Transformation.</span>
            </h1>
          </div>

          {/* Bottom Description & CTAs Block */}
          <div className="mt-8 lg:mt-auto pb-6 sm:pb-8 lg:pb-10">
            <p className="text-[0.95rem] sm:text-[1.05rem] leading-[1.58] text-[#555047] max-w-[480px] mb-5 sm:mb-6">
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
        </div>

        {/* Right Column: Isolated Portrait PNG */}
        <div className="flex justify-center items-end self-end w-full relative z-10">
          <div className="relative w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[650px] xl:max-w-[710px] 2xl:max-w-[760px] flex items-end justify-center -mb-3 sm:-mb-5 lg:-mb-6 xl:-mb-8 -translate-x-2 sm:-translate-x-4 lg:-translate-x-6 xl:-translate-x-8 group">
            <Image
              src="/assets/a_clean_high_resolution_isolated_png_style_portra.png"
              alt="Futuristic Portrait in Amber Light"
              width={780}
              height={712}
              priority
              className="w-full h-auto object-contain object-bottom select-none drop-shadow-[0_24px_50px_rgba(23,22,20,0.15)] block align-bottom transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Capabilities Full-Width Bar */}
      <div className="w-full bg-[#171614] py-4 sm:py-4.5 mt-auto overflow-x-auto no-scrollbar relative z-10" role="navigation" aria-label="Capability areas">
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
