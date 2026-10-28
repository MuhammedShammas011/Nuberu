import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HowWeWork from '../components/HowWeWork';
import AboutHeroVisual from '../components/AboutHeroVisual';
import { Layers, Link2, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Nuberu | Enterprise Technology Services',
  description:
    'Nuberu brings infrastructure, cloud, containers, automation and modern application capabilities together to help organisations evolve complex technology environments.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F4EFE6] text-[#171614] overflow-hidden">
        {/* Section 1: Hero / Company Overview matching Reference Image */}
        <section className="pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 border-b border-[#171614]/10 relative">
          {/* Subtle Ambient Light Wash */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 75% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(244, 239, 230, 0) 70%)',
            }}
          />

          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Left Column: Headline & Overview */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <span className="w-6 sm:w-8 h-[1.5px] bg-[#B84A2B]" />
                  <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.22em] text-[#B84A2B]">
                    COMPANY OVERVIEW
                  </span>
                </div>

                <h1 className="text-[clamp(2.6rem,5.6vw,5.1rem)] font-bold text-[#171614] tracking-[-0.035em] leading-[1.04] mb-6 sm:mb-7 m-0">
                  Engineering the<br />
                  Next Stage of<br />
                  Enterprise Technology<span className="text-[#B84A2B]">.</span>
                </h1>

                <p className="text-[1.05rem] sm:text-[1.12rem] text-[#555047] leading-[1.62] max-w-[500px] m-0">
                  Nuberu brings infrastructure, cloud, containers, automation and modern application capabilities together to help organisations evolve complex technology environments.
                </p>
              </div>

              {/* Right Column: 3D Isometric Architectural Sculpture */}
              <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end">
                <AboutHeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Clarity, Connection & Transformation matching Reference Image */}
        <section className="py-16 sm:py-24 border-b border-[#171614]/10 bg-[#F4EFE6]">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              {/* Left Column: Number, Title & 3 Feature Badges */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Step Number with Dash */}
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <span className="font-mono text-xs font-bold text-[#171614]">01</span>
                    <span className="w-8 h-[1px] bg-[#171614]/30" />
                  </div>

                  {/* Headline */}
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#171614] tracking-[-0.035em] leading-[1.08] mb-10 sm:mb-14 m-0">
                    Clarity, Connection<br />
                    & Transformation<span className="text-[#B84A2B]">.</span>
                  </h2>
                </div>

                {/* 3 Pillars in a Row matching Reference Image */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 pt-2 sm:pt-4">
                  {/* Pillar 1: Clarity */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-white shadow-[0_2px_10px_rgba(23,22,20,0.06)] border border-[#171614]/[0.08] flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5 text-[#B84A2B]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#171614] leading-tight mb-1 m-0">
                        Clarity
                      </h3>
                      <p className="text-xs text-[#555047] leading-snug m-0">
                        A clear view of what&apos;s possible.
                      </p>
                    </div>
                  </div>

                  {/* Pillar 2: Connection */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-white shadow-[0_2px_10px_rgba(23,22,20,0.06)] border border-[#171614]/[0.08] flex items-center justify-center shrink-0">
                      <Link2 className="w-5 h-5 text-[#B84A2B]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#171614] leading-tight mb-1 m-0">
                        Connection
                      </h3>
                      <p className="text-xs text-[#555047] leading-snug m-0">
                        Bringing people, systems and goals together.
                      </p>
                    </div>
                  </div>

                  {/* Pillar 3: Transformation */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-white shadow-[0_2px_10px_rgba(23,22,20,0.06)] border border-[#171614]/[0.08] flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-5 h-5 text-[#B84A2B]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#171614] leading-tight mb-1 m-0">
                        Transformation
                      </h3>
                      <p className="text-xs text-[#555047] leading-snug m-0">
                        Turning technology into real progress.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Narrative separated by vertical border */}
              <div className="lg:col-span-6 lg:border-l lg:border-[#171614]/10 lg:pl-12 lg:py-2 flex flex-col justify-center space-y-6 text-[14.5px] sm:text-[15.5px] text-[#555047] leading-[1.72]">
                <p className="m-0">
                  From assessment and architecture through implementation, migration and managed operations, our approach is built around clarity, connection and transformation.
                </p>
                <p className="m-0">
                  Modern enterprises rarely struggle with a lack of technology. They struggle with fragmentation: legacy systems disconnected from modern cloud platforms, isolated deployment pipelines, and operational debt that slows release velocity.
                </p>
                <p className="m-0">
                  Nuberu was founded to bridge these divides. We operate with strict technology neutrality—recommending open standards, modular designs, and multi-cloud architectures that eliminate vendor lock-in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work Section Reused */}
        <HowWeWork />

        {/* CTA */}
        <section className="py-20 bg-[#171614] text-[#F4EFE6] text-center">
          <div className="container-custom max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to Discuss Your Architecture?
            </h2>
            <p className="text-base text-[#F4EFE6]/70 mb-8">
              Speak with our senior architects about assessing your current landscape or planning your next modernisation phase.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4EFE6] bg-[#B84A2B] hover:bg-[#9E3E23] px-8 py-4 rounded-full transition-all"
            >
              Start a Conversation
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
