'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { insightsData } from '@/app/data/insightsData';

// Maps each insight slug to a cover image
const insightImages: Record<string, string> = {
  'architecting-resilient-multi-cloud': '/images/insights/multicloud.jpg',
  'enterprise-kubernetes-day-two-operations': '/images/insights/kubernetes.jpg',
  'strategic-approaches-to-vmware-modernisation': '/images/insights/vmware.jpg',
};

export default function InsightsSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#F4EFE6] border-b border-[#171614]/8" id="insights">
      <div className="container-custom">

        {/* Header — matches Hero / Services section hierarchy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#68635B] mb-6">
              TECHNICAL PERSPECTIVES
            </p>
            <h2 className="text-[clamp(3.3rem,6.8vw,5.8rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#171614] m-0">
              Insights &<br />
              Guides.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[1.08rem] leading-[1.62] text-[#555047] max-w-[480px] m-0"
          >
            Practical architectural guidance, migration considerations, and technical notes from our engineering team.
          </motion.p>
        </div>

        {/* Premium Editorial Cards — Image-first layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {insightsData.map((item, index) => {
            const coverImg = insightImages[item.slug];

            return (
              <motion.article
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[#171614]/[0.07] hover:border-[#171614]/[0.14] hover:shadow-[0_24px_56px_-16px_rgba(23,22,20,0.1)] transition-all duration-400 hover:-translate-y-1"
              >
                {/* Cover Image Block */}
                {coverImg && (
                  <Link
                    href={`/insights/${item.slug}`}
                    className="block relative w-full aspect-[3/2] overflow-hidden bg-[#171614]/5 shrink-0"
                    tabIndex={-1}
                    aria-hidden
                  >
                    <Image
                      src={coverImg}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Subtle dark gradient veil at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171614]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  </Link>
                )}

                {/* Text Content */}
                <div className="flex flex-col flex-1 p-7">
                  {/* Category + Read Time */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.15em] text-[#B84A2B]">
                      {item.category}
                    </span>
                    <span className="font-mono text-[10.5px] text-[#171614]/40 uppercase tracking-wider">
                      {item.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/insights/${item.slug}`} className="flex-1">
                    <h3 className="text-[1.15rem] sm:text-[1.25rem] font-extrabold text-[#171614] group-hover:text-[#B84A2B] transition-colors tracking-tight leading-[1.25] mb-3">
                      {item.title}
                    </h3>
                  </Link>

                  {/* Summary — hidden unless hovering, fades in subtly */}
                  <p className="text-[13.5px] leading-relaxed text-[#171614]/60 mb-6 line-clamp-3">
                    {item.summary}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto pt-5 border-t border-[#171614]/[0.06] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10.5px] text-[#171614]/40 uppercase tracking-wider block">
                        {item.date}
                      </span>
                      <span className="text-xs text-[#171614]/65 mt-0.5 block">
                        {item.authorRole}
                      </span>
                    </div>

                    <Link
                      href={`/insights/${item.slug}`}
                      className="w-9 h-9 rounded-full border border-[#171614]/12 flex items-center justify-center text-[#171614]/60 group-hover:bg-[#B84A2B] group-hover:border-[#B84A2B] group-hover:text-white transition-all duration-300 shrink-0"
                      aria-label={`Read: ${item.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-14 pt-6 border-t border-[#171614]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="font-mono text-[11px] text-[#171614]/40 tracking-wider m-0">
            ARCHITECTURE · MIGRATION · PLATFORM ENGINEERING
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#171614] hover:text-[#B84A2B] transition-colors group"
          >
            <span>All Technical Guides</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B84A2B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
