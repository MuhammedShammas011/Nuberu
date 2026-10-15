'use client';

import { motion } from 'framer-motion';

const stages = [
  {
    step: '01',
    name: 'CONSULT',
    subtitle: 'Discovery & Assessment',
    description: 'Understand business outcomes, current environments, constraints and risks.',
    deliverable: 'Current State Assessment & Risk Matrix',
  },
  {
    step: '02',
    name: 'DESIGN',
    subtitle: 'Architecture & Planning',
    description: 'Define target architecture, platform choices, migration plans and delivery roadmap.',
    deliverable: 'Target Architecture & Roadmap',
  },
  {
    step: '03',
    name: 'DEPLOY',
    subtitle: 'Execution & Engineering',
    description: 'Implement agreed infrastructure, cloud, platform, automation and application capabilities.',
    deliverable: 'Production Deployment & Validation',
  },
  {
    step: '04',
    name: 'MANAGE',
    subtitle: 'Day 2 Operations',
    description: 'Support operations, monitoring, protection, optimisation and improvement where contracted.',
    deliverable: '24/7 Operations & Governance',
  },
];

export default function HowWeWork() {
  return (
    <section className="py-28 bg-[#F4EFE6] border-b border-[#171614]/8 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#1E5A63] mb-3">
            Delivery Approach
          </p>
          <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-[#171614] tracking-[-0.03em] leading-[1.1]">
            How We Work.
          </h2>
          <p className="text-[1.05rem] text-[#171614]/65 max-w-[520px] mt-4 leading-relaxed">
            A disciplined four-stage delivery model engineered to manage risk, accelerate implementation, and ensure operational continuity.
          </p>
        </div>

        {/* 4-Stage Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative p-7 rounded-2xl bg-white border border-[#171614]/[0.08] shadow-[0_10px_30px_-15px_rgba(23,22,20,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(23,22,20,0.08)] hover:border-[#B84A2B]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step indicator */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#171614]/[0.06]">
                  <span className="text-sm font-mono font-bold text-[#B84A2B] tracking-wider">
                    STAGE {stage.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#171614]/20" />
                </div>

                <h3 className="text-xl font-bold text-[#171614] tracking-tight mb-1">
                  {stage.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1E5A63] mb-4">
                  {stage.subtitle}
                </p>

                <p className="text-[14.5px] leading-relaxed text-[#171614]/70 mb-6">
                  {stage.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#171614]/[0.05]">
                <span className="text-[11px] font-mono text-[#171614]/40 uppercase block mb-1">
                  Core Output
                </span>
                <span className="text-xs font-medium text-[#171614]/85">
                  {stage.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
