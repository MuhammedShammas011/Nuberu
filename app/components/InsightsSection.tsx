'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { insightsData } from '@/app/data/insightsData';

export default function InsightsSection() {
  return (
    <section className="py-28 bg-[#F4EFE6] border-b border-[#171614]/8" id="insights">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#1E5A63] mb-3">
              Technical Perspectives
            </p>
            <h2 className="text-[clamp(2.6rem,5.2vw,4.5rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.98]">
              Insights & Guides.
            </h2>
          </div>
          <p className="text-[1.05rem] text-[#171614]/65 max-w-[440px] leading-relaxed">
            Practical architectural guidance, migration considerations, and technical notes from our engineering team.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insightsData.map((item, index) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group p-8 rounded-2xl bg-white border border-[#171614]/[0.08] hover:border-[#B84A2B]/40 hover:shadow-[0_20px_40px_-15px_rgba(23,22,20,0.06)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#171614]/50 mb-6 pb-4 border-b border-[#171614]/[0.06]">
                  <span className="font-semibold text-[#B84A2B] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span>{item.readTime}</span>
                </div>

                <Link href={`/insights/${item.slug}`}>
                  <h3 className="text-xl sm:text-[1.35rem] font-extrabold text-[#171614] group-hover:text-[#B84A2B] transition-colors tracking-tight leading-snug mb-4">
                    {item.title}
                  </h3>
                </Link>

                <p className="text-[14.5px] leading-relaxed text-[#171614]/70 mb-8">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#171614]/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono text-[#171614]/50">
                  {item.authorRole}
                </span>
                <Link
                  href={`/insights/${item.slug}`}
                  className="text-xs font-semibold text-[#171614] group-hover:text-[#B84A2B] flex items-center gap-1 transition-colors"
                >
                  Read Paper
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
