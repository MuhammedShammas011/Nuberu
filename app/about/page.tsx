import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HowWeWork from '../components/HowWeWork';
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
      <main className="pt-28 pb-20 bg-[#F4EFE6]">
        {/* Hero */}
        <section className="py-20 border-b border-[#171614]/10">
          <div className="container-custom">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#B84A2B] block mb-4">
              Company Overview
            </span>
            <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.96] max-w-5xl mb-8">
              Engineering the Next Stage of Enterprise Technology.
            </h1>
            <p className="text-xl sm:text-2xl text-[#171614]/75 max-w-3xl leading-relaxed">
              Nuberu brings infrastructure, cloud, containers, automation and modern application capabilities together to help organisations evolve complex technology environments.
            </p>
          </div>
        </section>

        {/* Narrative */}
        <section className="py-24 border-b border-[#171614]/10">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#171614] tracking-tight leading-[1.05]">
                  Clarity, Connection & Transformation.
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-6 text-base text-[#171614]/70 leading-relaxed">
                <p>
                  From assessment and architecture through implementation, migration and managed operations, our approach is built around clarity, connection and transformation.
                </p>
                <p>
                  Modern enterprises rarely struggle with a lack of technology. They struggle with fragmentation: legacy systems disconnected from modern cloud platforms, isolated deployment pipelines, and operational debt that slows release velocity.
                </p>
                <p>
                  Nuberu was founded to bridge these divides. We operate with strict technology neutrality—recommending open standards, modular designs, and multi-cloud architectures that eliminate vendor lock-in.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-[#171614]/10">
              <div className="p-8 rounded-2xl bg-white border border-[#171614]/10">
                <ShieldCheck className="w-8 h-8 text-[#1E5A63] mb-4" />
                <h3 className="text-xl font-bold text-[#171614] mb-2">Technology Neutral</h3>
                <p className="text-sm text-[#171614]/65 leading-relaxed">
                  We recommend platform options based solely on workload characteristics, operational capabilities, and total cost of ownership.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-[#171614]/10">
                <Cpu className="w-8 h-8 text-[#B84A2B] mb-4" />
                <h3 className="text-xl font-bold text-[#171614] mb-2">Engineering First</h3>
                <p className="text-sm text-[#171614]/65 leading-relaxed">
                  Senior platform engineers and architects lead every stage. We build production-hardened systems, not abstract slide decks.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-[#171614]/10">
                <GitMerge className="w-8 h-8 text-[#1E5A63] mb-4" />
                <h3 className="text-xl font-bold text-[#171614] mb-2">Connected Delivery</h3>
                <p className="text-sm text-[#171614]/65 leading-relaxed">
                  We integrate physical data centres, public clouds, Kubernetes clusters, and automated CI/CD into a coherent operational model.
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
