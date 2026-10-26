'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { servicesData } from '@/app/data/servicesData';

export default function ServicesOverview() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="pt-16 pb-24 lg:pt-20 lg:pb-28 bg-[#F4EFE6] border-b border-[#171614]/8" id="services">
      <div className="container-custom">
        {/* Header matching Hero section hierarchy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#68635B] mb-6">
              SERVICE PORTFOLIO
            </p>
            <h2 className="text-[clamp(3.3rem,6.8vw,5.8rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#171614] m-0">
              Engineered Services.<br />
              Enterprise Delivery.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[1.08rem] leading-[1.62] text-[#555047] max-w-[480px] m-0"
          >
            Targeted service engagements designed to modernize architecture, de-risk workload transitions, and establish Day 2 operational reliability.
          </motion.p>
        </div>

        {/* Minimal Editorial Accordion Index */}
        <div className="border-t border-[#171614]/10 divide-y divide-[#171614]/10">
          {servicesData.map((service, index) => {
            const isOpen = openIdx === index;
            const num = (index + 1).toString().padStart(2, '0');

            return (
              <div
                key={service.slug}
                className={`transition-colors duration-200 ${
                  isOpen ? 'bg-[#171614]/[0.02]' : 'hover:bg-[#171614]/[0.015]'
                }`}
              >
                {/* Row Header */}
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full text-left py-6 sm:py-7 flex items-center justify-between gap-6 cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-5 sm:gap-8 flex-1 min-w-0">
                    {/* Index Numeral */}
                    <span
                      className={`font-mono text-sm sm:text-base font-bold transition-colors duration-200 w-7 shrink-0 ${
                        isOpen ? 'text-[#B84A2B]' : 'text-[#171614]/30 group-hover:text-[#171614]/60'
                      }`}
                    >
                      {num}
                    </span>

                    {/* Title */}
                    <h3
                      className={`text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold tracking-tight transition-colors duration-200 m-0 truncate ${
                        isOpen ? 'text-[#B84A2B]' : 'text-[#171614] group-hover:text-[#B84A2B]'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                    {/* Category Tag */}
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#171614]/40 hidden md:inline-block">
                      {service.category}
                    </span>

                    {/* Animated Toggle Icon */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#B84A2B] text-white rotate-45 shadow-[0_4px_12px_rgba(184,74,43,0.25)]'
                          : 'border border-[#171614]/15 text-[#171614]/60 group-hover:border-[#B84A2B] group-hover:text-[#B84A2B]'
                      }`}
                    >
                      <Plus className="w-4 h-4 transition-transform duration-200" />
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 items-start pl-12 sm:pl-15 pr-2">
                        {/* Left: Summary, Tech Platforms & Action Link */}
                        <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between h-full">
                          <div>
                            <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-[#171614]/75 mb-4 m-0">
                              {service.shortSummary}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {service.platforms.slice(0, 5).map((plat) => (
                                <span
                                  key={plat}
                                  className="font-mono text-[10.5px] px-2.5 py-1 rounded bg-[#171614]/[0.05] text-[#171614]/70"
                                >
                                  {plat}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="pt-2">
                            <Link
                              href={`/services/${service.slug}`}
                              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#171614] hover:text-[#B84A2B] transition-colors group/link py-2 px-4 rounded-full border border-[#171614]/15 hover:border-[#B84A2B] bg-white/70 hover:bg-white shrink-0 w-fit"
                            >
                              <span>Explore Service</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#B84A2B] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </Link>
                          </div>
                        </div>

                        {/* Middle: Core Deliverables */}
                        <div className="md:col-span-3 lg:col-span-3 md:border-l md:border-[#171614]/10 md:pl-6 lg:pl-8">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B84A2B] mb-3 m-0">
                            Core Deliverables
                          </p>
                          <ul className="space-y-2.5 list-none p-0 m-0">
                            {service.deliverables.slice(0, 4).map((item, dIdx) => (
                              <li
                                key={dIdx}
                                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#171614]/80 leading-snug"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B84A2B] mt-1.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right: Authentic Real Image Container Aligned to Right Side */}
                        <div className="md:col-span-4 lg:col-span-4 flex justify-end">
                          <div className="relative w-full aspect-[4/3] max-w-[340px] rounded-2xl overflow-hidden border border-[#171614]/12 shadow-[0_8px_24px_-8px_rgba(23,22,20,0.12)] bg-[#171614]/5 group/img ml-auto">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 340px"
                              className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                            />
                            {/* Authentic lighting vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                            {/* Engineering Tag Badge */}
                            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/95 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/15">
                                {service.category}
                              </span>
                              <span className="font-mono text-[8.5px] uppercase tracking-wider text-white/80 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10">
                                PROD DEPLOY
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Minimal Footer Strip */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-[#171614]/40 tracking-wider m-0">
            07 ENGAGEMENT PRACTICES · ARCHITECTURE, MIGRATION & DAY 2 SRE
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#171614] hover:text-[#B84A2B] transition-colors group"
          >
            <span>View Complete Service Matrix</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B84A2B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
