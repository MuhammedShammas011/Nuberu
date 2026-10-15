'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Server, Cloud, Boxes, Cpu, RefreshCw } from 'lucide-react';

const capabilities = [
  {
    id: 'infrastructure',
    number: '01',
    title: 'Infrastructure',
    short: 'Core Systems',
    description: 'Assess, design and modernise data centre and on-premises environments, including virtualisation, storage, backup and infrastructure automation.',
    href: '/services/datacenter-infrastructure',
    icon: Server,
  },
  {
    id: 'cloud',
    number: '02',
    title: 'Cloud',
    short: 'Multi-Cloud',
    description: 'Plan, migrate and manage public, private, hybrid and multi-cloud environments with governance, security and cost awareness.',
    href: '/services/cloud-devops',
    icon: Cloud,
  },
  {
    id: 'containers',
    number: '03',
    title: 'Containers',
    short: 'Cloud-Native',
    description: 'Design, deploy and operate Kubernetes and OpenShift environments for cloud-native platforms and modern application delivery.',
    href: '/services/container-platforms',
    icon: Boxes,
  },
  {
    id: 'automation',
    number: '04',
    title: 'Automation',
    short: 'Delivery Pipelines',
    description: 'Reduce repetitive manual work through infrastructure as code, CI/CD pipelines and automated operational workflows.',
    href: '/services/cloud-devops',
    icon: Cpu,
  },
  {
    id: 'transformation',
    number: '05',
    title: 'Transformation',
    short: 'Continuous Evolution',
    description: 'Modernise applications, connect systems and support resilient technology operations through a planned delivery approach.',
    href: '/services/application-modernisation',
    icon: RefreshCw,
  },
];

export default function Capabilities() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-28 bg-[#F4EFE6] border-b border-[#171614]/8" id="capabilities">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#1E5A63] mb-3">
              Connected Architecture
            </p>
            <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-[#171614] tracking-[-0.03em] leading-[1.1]">
              Five Interconnected <br />Capabilities.
            </h2>
          </div>
          <p className="text-[1.05rem] text-[#171614]/65 max-w-[440px] leading-relaxed">
            Enterprise systems require synchronized execution. Nuberu unites infrastructure, cloud, containers and automation into one continuous delivery engine.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative p-8 rounded-2xl bg-[#171614]/[0.02] border border-[#171614]/[0.08] hover:border-[#B84A2B]/40 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(23,22,20,0.06)] transition-all duration-300 flex flex-col justify-between ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-semibold text-[#171614]/40 tracking-wider">
                      {cap.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#171614]/[0.04] text-[#1E5A63] group-hover:bg-[#B84A2B] group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#171614] mb-3 tracking-[-0.02em]">
                    {cap.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#171614]/65 mb-8">
                    {cap.description}
                  </p>
                </div>

                <Link
                  href={cap.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B84A2B] group-hover:text-[#171614] transition-colors pt-4 border-t border-[#171614]/[0.06]"
                >
                  Explore Service
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            );
          })}

          {/* Minimal Architectural Connector Card */}
          <div className="p-8 rounded-2xl bg-[#171614] text-[#F4EFE6] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-semibold text-[#B84A2B] tracking-wider block mb-8">
                FOUNDATION TO TRANSFORMATION
              </span>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-[-0.02em]">
                One Unified Delivery Practice
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[#F4EFE6]/70">
                Eliminate vendor hand-offs and isolated platform siloes. Our architecture integrates strategy, engineering, and operations.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#F4EFE6] hover:text-[#B84A2B] transition-colors pt-4 border-t border-[#F4EFE6]/10"
            >
              View Full Portfolio
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
