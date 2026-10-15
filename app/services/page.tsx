import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';
import { ArrowUpRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise Services Portfolio | Nuberu',
  description:
    'Explore Nuberu’s verified enterprise technology practices across cloud, infrastructure, container platforms, virtualisation, and managed services.',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-[#F4EFE6]">
        {/* Hero */}
        <section className="py-20 border-b border-[#171614]/10">
          <div className="container-custom">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#B84A2B] block mb-4">
              Practices & Solutions
            </span>
            <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.96] max-w-5xl mb-6">
              Enterprise Technology Services.
            </h1>
            <p className="text-xl sm:text-2xl text-[#171614]/75 max-w-3xl leading-relaxed">
              Targeted service architectures designed to modernise infrastructure, accelerate application delivery, and establish Day 2 operational reliability.
            </p>
          </div>
        </section>

        {/* Detailed Service Cards */}
        <section className="py-20">
          <div className="container-custom space-y-16">
            {servicesData.map((service, index) => (
              <div
                key={service.slug}
                id={service.slug}
                className="p-8 sm:p-12 rounded-3xl bg-white border border-[#171614]/10 shadow-[0_20px_50px_-20px_rgba(23,22,20,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
              >
                <div className="lg:col-span-5">
                  <span className="text-xs font-mono font-semibold text-[#B84A2B] tracking-wider uppercase block mb-3">
                    0{index + 1} · {service.category}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171614] tracking-tight leading-snug mb-4">
                    {service.title}
                  </h2>
                  <p className="text-base text-[#171614]/70 leading-relaxed mb-6">
                    {service.fullDescription}
                  </p>

                  <div className="mb-8">
                    <span className="text-xs font-mono text-[#171614]/40 uppercase block mb-2">
                      Key Platforms & Tooling
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.platforms.map((plat) => (
                        <span
                          key={plat}
                          className="text-xs font-mono px-3 py-1 rounded-full bg-[#171614]/[0.05] text-[#171614]/75"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#F4EFE6] bg-[#171614] hover:bg-[#B84A2B] px-6 py-3 rounded-full transition-all"
                  >
                    Dedicated Practice Scope
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="lg:col-span-7 bg-[#F4EFE6]/50 p-6 sm:p-8 rounded-2xl border border-[#171614]/[0.06]">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#1E5A63] font-bold mb-4">
                    Key Capabilities & Engagements
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-3 text-sm text-[#171614]/80 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-[#B84A2B] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#1E5A63] font-bold mb-3">
                    Standard Deliverables
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-[#171614]/70">
                    {service.deliverables.map((del) => (
                      <div key={del} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E5A63]" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advisory Section adhering to Section 7A of Handover */}
        <section className="py-20 bg-[#171614] text-[#F4EFE6] border-t border-white/10">
          <div className="container-custom">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#B84A2B] block mb-3">
              Strategic Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-white mb-6 tracking-tight leading-snug">
              Advisory and Assessment Services
            </h2>
            <p className="text-base text-[#F4EFE6]/70 max-w-2xl leading-relaxed mb-10">
              Every major platform evolution starts with objective evaluation. We assess infrastructure health, cloud readiness, workload compatibility, and total cost of ownership before code is written or servers are moved.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                <h4 className="text-lg font-bold text-white mb-2">Infrastructure Health Audit</h4>
                <p className="text-sm text-[#F4EFE6]/60 leading-relaxed">
                  Evaluate compute, storage, virtualization, power, and operational constraints across current on-premises deployments.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                <h4 className="text-lg font-bold text-white mb-2">Cloud Readiness & TCO</h4>
                <p className="text-sm text-[#F4EFE6]/60 leading-relaxed">
                  Workload compatibility analysis, cost-benefit modeling, and risk mitigation roadmap across AWS, Azure, and Google Cloud.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                <h4 className="text-lg font-bold text-white mb-2">Platform Fit-Gap Analysis</h4>
                <p className="text-sm text-[#F4EFE6]/60 leading-relaxed">
                  Clear architectural comparison of Kubernetes, Red Hat OpenShift, OpenStack, and alternative virtualization runtimes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
