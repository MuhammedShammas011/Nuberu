import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { servicesData } from '@/app/data/servicesData';
import { ArrowLeft, ArrowUpRight, CheckCircle, Shield, Server, Layers } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found | Nuberu' };

  return {
    title: `${service.title} | Nuberu`,
    description: service.shortSummary,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-[#F4EFE6]">
        {/* Breadcrumb & Navigation */}
        <section className="py-6 border-b border-[#171614]/10 bg-white/40">
          <div className="container-custom">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#171614]/60 hover:text-[#B84A2B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Services Portfolio
            </Link>
          </div>
        </section>

        {/* Hero */}
        <section className="py-20 border-b border-[#171614]/10">
          <div className="container-custom">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#B84A2B] block mb-4">
              Practice Focus · {service.category}
            </span>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[#171614] tracking-[-0.03em] leading-[1.08] max-w-4xl mb-6">
              {service.title}
            </h1>
            <p className="text-xl sm:text-2xl text-[#171614]/75 max-w-3xl leading-relaxed mb-8">
              {service.shortSummary}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.platforms.map((plat) => (
                <span
                  key={plat}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-[#171614]/[0.06] text-[#171614]/80"
                >
                  {plat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Architecture Scope */}
        <section className="py-20 border-b border-[#171614]/10">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl font-bold text-[#171614] tracking-tight">
                Practice Overview
              </h2>
              <p className="text-base text-[#171614]/70 leading-relaxed">
                {service.fullDescription}
              </p>
              <div className="p-6 rounded-2xl bg-white border border-[#171614]/10 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#1E5A63] font-bold block">
                  Engagement Delivery Model
                </span>
                <p className="text-xs text-[#171614]/65 leading-relaxed">
                  Every engagement follows Nuberu’s disciplined four-stage delivery model: Consult, Design, Deploy, and Manage. We ensure continuous knowledge transfer and clear operational handoffs.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#171614]/10 shadow-[0_20px_50px_-20px_rgba(23,22,20,0.06)]">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#B84A2B] font-bold mb-6">
                Core Engineering Capabilities
              </h3>
              <ul className="space-y-4 mb-10">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3 text-sm text-[#171614]/85 leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-[#B84A2B] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-sm font-mono uppercase tracking-wider text-[#1E5A63] font-bold mb-4">
                Verified Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-[#171614]/80">
                {service.deliverables.map((del) => (
                  <div key={del} className="p-3 rounded-xl bg-[#F4EFE6]/60 border border-[#171614]/5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E5A63]" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#171614] text-[#F4EFE6] text-center">
          <div className="container-custom max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
              Initiate a {service.title} Assessment
            </h2>
            <p className="text-base text-[#F4EFE6]/70 mb-8">
              Discuss your specific architecture requirements, workload compatibility, and target platform constraints with our senior engineering team.
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
