'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { servicesData } from '@/app/data/servicesData';

export default function ServicesOverview() {
  return (
    <section className="py-28 bg-[#F4EFE6] border-b border-[#171614]/8" id="services">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#1E5A63] mb-3">
              Service Portfolio
            </p>
            <h2 className="text-[clamp(2.6rem,5.2vw,4.5rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.98]">
              Engineered Services. <br />Enterprise Delivery.
            </h2>
          </div>
          <p className="text-[1.05rem] text-[#171614]/65 max-w-[440px] leading-relaxed">
            Targeted service engagements designed to modernize architecture, de-risk workload transitions, and establish Day 2 operational reliability.
          </p>
        </div>

        {/* Services List / Table */}
        <div className="divide-y divide-[#171614]/10 border-t border-b border-[#171614]/10">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group py-8 lg:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-colors hover:bg-white/40 px-4 -mx-4 rounded-xl"
            >
              <div className="lg:w-1/3">
                <span className="text-xs font-mono font-semibold text-[#B84A2B] tracking-wider block mb-1">
                  0{index + 1} · {service.category}
                </span>
                <Link href={`/services/${service.slug}`}>
                  <h3 className="text-2xl sm:text-[1.7rem] font-extrabold text-[#171614] group-hover:text-[#B84A2B] transition-colors tracking-tight">
                    {service.title}
                  </h3>
                </Link>
              </div>

              <div className="lg:w-1/2">
                <p className="text-[15px] leading-relaxed text-[#171614]/70">
                  {service.shortSummary}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {service.platforms.slice(0, 4).map((plat) => (
                    <span
                      key={plat}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#171614]/[0.05] text-[#171614]/60"
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/6 flex justify-start lg:justify-end">
                <Link
                  href={`/services/${service.slug}`}
                  className="w-11 h-11 rounded-full border border-[#171614]/15 flex items-center justify-center text-[#171614] group-hover:bg-[#B84A2B] group-hover:border-[#B84A2B] group-hover:text-white transition-all duration-200"
                  aria-label={`View details for ${service.title}`}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#171614]/50">
          <p>Detailed service catalogues and scope matrices are available on respective practice pages.</p>
          <Link href="/services" className="font-semibold text-[#B84A2B] hover:underline flex items-center gap-1">
            Browse All Service Deliverables →
          </Link>
        </div>
      </div>
    </section>
  );
}
