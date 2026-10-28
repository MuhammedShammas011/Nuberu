import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HowWeWork from '../components/HowWeWork';
import ModelViewer3D from '../components/ModelViewer3D';
import ApproachDiagram from '../components/ApproachDiagram';
import { ArrowUpRight, ShieldCheck, Cpu, GitMerge } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Nuberu | Enterprise Technology Services',
  description:
    'Nuberu brings infrastructure, cloud, containers, automation and modern application capabilities together to help organisations evolve complex technology environments.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 pb-20 bg-[#F4EFE6] text-[#171614] overflow-hidden">
        {/* Section 1: Hero / Company Overview matching Reference Image */}
        <section className="py-10 sm:py-14 lg:py-16 border-b border-[#171614]/10 relative">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              {/* Left Column: Headline & Overview */}
              <div className="lg:col-span-6 flex flex-col justify-center z-10">
                <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#B84A2B] block mb-4 sm:mb-5">
                  COMPANY OVERVIEW
                </span>

                <h1 className="text-[clamp(2.85rem,5.6vw,5.2rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.96] mb-6 sm:mb-7 m-0">
                  Engineering<br />
                  what comes next<span className="text-[#B84A2B]">.</span>
                </h1>

                <p className="text-lg sm:text-[1.2rem] font-medium text-[#171614] mb-3.5 sm:mb-4 leading-snug">
                  Connected infrastructure. Intelligent cloud. Modern applications.
                </p>

                <p className="text-[15px] sm:text-base text-[#555047] leading-relaxed max-w-xl m-0">
                  Nuberu brings infrastructure, cloud, containers, automation and modern application capabilities together to help organisations evolve complex technology environments.
                </p>
              </div>

              {/* Right Column: 3D Structure matching Reference Image */}
              <div className="lg:col-span-6 w-full relative flex items-center justify-center">
                <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] flex items-center justify-center">
                  {/* Subtle Background Drafting Blueprint Orbit Rings */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-[460px] h-[460px] rounded-full border border-[#171614]/[0.08]" />
                    <div className="w-[340px] h-[340px] rounded-full border border-[#171614]/[0.06]" />
                    <div className="w-[220px] h-[220px] rounded-full border border-[#171614]/[0.05]" />
                  </div>

                  {/* Callout 1: CLOUD INFRASTRUCTURE (Top) */}
                  <div className="absolute top-[8%] left-[24%] sm:left-[30%] flex flex-col items-center pointer-events-none z-20">
                    <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#68635B] text-center leading-tight">
                      CLOUD<br />INFRASTRUCTURE
                    </span>
                    <div className="w-[1px] h-7 sm:h-10 border-l border-dashed border-[#171614]/35 my-1" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/75" />
                  </div>

                  {/* Callout 2: AUTOMATION & OPERATIONS (Top Right) */}
                  <div className="absolute top-[18%] right-[2%] sm:right-[4%] flex items-center gap-2 pointer-events-none z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/75" />
                    <div className="w-7 sm:w-12 border-b border-dashed border-[#171614]/35" />
                    <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#68635B] text-left leading-tight">
                      AUTOMATION<br />& OPERATIONS
                    </span>
                  </div>

                  {/* Callout 3: MODERN APPLICATIONS (Middle Right) */}
                  <div className="absolute top-[52%] right-[0%] sm:right-[2%] flex items-center gap-2 pointer-events-none z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/75" />
                    <div className="w-7 sm:w-10 border-b border-dashed border-[#171614]/35" />
                    <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#68635B] text-left leading-tight">
                      MODERN<br />APPLICATIONS
                    </span>
                  </div>

                  {/* 3D Model Viewer with GLB */}
                  <ModelViewer3D
                    src="/assets/nuberu_abstract_3d_structure.glb"
                    alt="Nuberu abstract 3D infrastructure sculpture"
                    cameraOrbit="0deg 75deg 105%"
                    cameraTarget="0m -0.15m 1.4m"
                    rotationPerSecond="10deg"
                    shadowIntensity="0.75"
                    shadowSoftness="0.7"
                    exposure="1.08"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Our Approach matching Reference Image */}
        <section className="py-16 sm:py-24 border-b border-[#171614]/10">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
              {/* Left Column: Number & Headline */}
              <div className="lg:col-span-4 flex flex-col justify-start">
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="font-mono text-xs font-bold text-[#171614]">01</span>
                  <span className="w-8 h-[1px] bg-[#B84A2B]" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#68635B]">
                    OUR APPROACH
                  </span>
                </div>

                <h2 className="text-[clamp(2.35rem,4.4vw,4.2rem)] font-extrabold text-[#171614] tracking-[-0.035em] leading-[0.98] m-0">
                  Clarity creates<br />
                  connection<span className="text-[#B84A2B]">.</span>
                </h2>
              </div>

              {/* Middle Column: 3 Narrative Paragraphs */}
              <div className="lg:col-span-5 space-y-5 text-[14px] sm:text-[14.5px] text-[#555047] leading-[1.68]">
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

              {/* Right Column: Connected Node Diagram matching Reference Image */}
              <div className="lg:col-span-3 flex items-center justify-center lg:justify-end">
                <ApproachDiagram />
              </div>
            </div>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16 pt-16 border-t border-[#171614]/10">
              <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-[#171614]/[0.08] shadow-[0_4px_20px_rgba(23,22,20,0.03)] hover:shadow-lg transition-all">
                <ShieldCheck className="w-8 h-8 text-[#1E5A63] mb-4" />
                <h3 className="text-xl font-bold text-[#171614] mb-2">Technology Neutral</h3>
                <p className="text-[13.5px] text-[#555047] leading-relaxed m-0">
                  We recommend platform options based solely on workload characteristics, operational capabilities, and total cost of ownership.
                </p>
              </div>

              <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-[#171614]/[0.08] shadow-[0_4px_20px_rgba(23,22,20,0.03)] hover:shadow-lg transition-all">
                <Cpu className="w-8 h-8 text-[#B84A2B] mb-4" />
                <h3 className="text-xl font-bold text-[#171614] mb-2">Engineering First</h3>
                <p className="text-[13.5px] text-[#555047] leading-relaxed m-0">
                  Senior platform engineers and architects lead every stage. We build production-hardened systems, not abstract slide decks.
                </p>
              </div>

              <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-[#171614]/[0.08] shadow-[0_4px_20px_rgba(23,22,20,0.03)] hover:shadow-lg transition-all">
                <GitMerge className="w-8 h-8 text-[#1E5A63] mb-4" />
                <h3 className="text-xl font-bold text-[#171614] mb-2">Connected Delivery</h3>
                <p className="text-[13.5px] text-[#555047] leading-relaxed m-0">
                  We integrate physical data centres, public clouds, Kubernetes clusters, and automated CI/CD into a coherent operational model.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <HowWeWork />

        {/* Closing CTA */}
        <section className="py-20 sm:py-24 bg-[#171614] text-[#F4EFE6] text-center">
          <div className="container-custom max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to Discuss Your Architecture?
            </h2>
            <p className="text-base text-[#F4EFE6]/70 mb-8 leading-relaxed">
              Speak with our senior architects about assessing your current landscape or planning your next modernisation phase.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-[#F4EFE6] bg-[#B84A2B] hover:bg-[#9E3E23] px-8 py-4 rounded-full transition-all shadow-[0_4px_16px_rgba(184,74,43,0.35)]"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
