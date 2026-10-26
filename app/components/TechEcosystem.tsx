'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ecosystem = [
  {
    category: 'Public Cloud',
    technologies: [
      { name: 'Amazon Web Services', code: 'AWS', scope: 'Compute, VPC, EKS, Storage, Security Hub' },
      { name: 'Microsoft Azure', code: 'Azure', scope: 'AKS, Virtual WAN, Azure DevOps, Defender' },
      { name: 'Google Cloud Platform', code: 'GCP', scope: 'GKE, Anthos, Cloud Run, Cloud SCC' },
    ],
  },
  {
    category: 'Container & Platform',
    technologies: [
      { name: 'Kubernetes', code: 'K8s', scope: 'Cluster architecture, ingress, CNI, storage' },
      { name: 'Red Hat OpenShift', code: 'OpenShift', scope: 'ROSA, ODF, ACM, Enterprise Platform' },
      { name: 'SUSE Rancher', code: 'Rancher', scope: 'Multi-cluster management and governance' },
    ],
  },
  {
    category: 'Automation & IaC',
    technologies: [
      { name: 'HashiCorp Terraform', code: 'Terraform', scope: 'Declarative multi-cloud provisioning' },
      { name: 'Red Hat Ansible', code: 'Ansible', scope: 'Config management, AAP playbooks, OS automation' },
      { name: 'Jenkins & GitLab CI', code: 'CI/CD', scope: 'Automated test, build and release pipelines' },
    ],
  },
  {
    category: 'Observability & Security',
    technologies: [
      { name: 'Prometheus & Grafana', code: 'Telemetry', scope: 'Metrics aggregation, dashboards, alerting' },
      { name: 'HashiCorp Vault', code: 'Vault', scope: 'Secrets lifecycle, PKI, dynamic credentials' },
      { name: 'NeuVector & Aqua', code: 'Runtime', scope: 'Container network firewall, CVE scanning' },
    ],
  },
];

const tickerItems = [
  'Amazon Web Services',
  'Kubernetes',
  'Red Hat OpenShift',
  'HashiCorp Terraform',
  'Microsoft Azure',
  'Google Cloud Platform',
  'SUSE Rancher',
  'Ansible Automation',
  'HashiCorp Vault',
  'Prometheus & Grafana',
  'GitLab CI/CD',
  'NeuVector Security',
];

export default function TechEcosystem() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-24 sm:py-32 bg-[#F4EFE6] text-[#171614] border-b border-[#171614]/8" id="ecosystem">
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
              PLATFORM INTEGRATION
            </p>
            <h2 className="text-[clamp(3.3rem,6.8vw,5.8rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#171614] m-0">
              Technology Ecosystem.<br />
              Neutral & Validated.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[1.08rem] leading-[1.62] text-[#555047] max-w-[480px] m-0"
          >
            Nuberu designs across leading hyperscalers, container platforms, and open-source infrastructure tooling with zero vendor lock-in.
          </motion.p>
        </div>

        {/* Minimal Tab Bar with Animated Gliding Pill */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-[#171614]/10">
          {ecosystem.map((cat, idx) => {
            const isActive = activeCategory === idx;

            return (
              <button
                key={cat.category}
                type="button"
                onClick={() => setActiveCategory(idx)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-medium transition-colors cursor-pointer select-none ${
                  isActive ? 'text-[#F4EFE6]' : 'text-[#171614]/65 hover:text-[#171614]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTechTab"
                    className="absolute inset-0 bg-[#171614] rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] ${
                      isActive ? 'text-[#B84A2B]' : 'text-[#171614]/40'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span>{cat.category}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated Cards Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {ecosystem[activeCategory].technologies.map((tech, i) => {
              const scopeTags = tech.scope.split(',').map((s) => s.trim());

              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="group relative p-7 sm:p-8 rounded-2xl bg-white/70 hover:bg-white border border-[#171614]/[0.08] hover:border-[#B84A2B]/40 transition-all duration-300 hover:shadow-[0_20px_45px_-15px_rgba(23,22,20,0.08)] hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Code Badge & Verification Status */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#171614]/[0.04] border border-[#171614]/[0.08] text-[#171614]/80 tracking-wider">
                        {tech.code}
                      </span>

                      <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-[#1E5A63]">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E5A63] opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1E5A63]" />
                        </span>
                        <span className="uppercase tracking-wider">Verified</span>
                      </div>
                    </div>

                    {/* Technology Name */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#171614] group-hover:text-[#B84A2B] transition-colors mb-4 m-0">
                      {tech.name}
                    </h3>

                    {/* Integration Scope Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {scopeTags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#171614]/[0.035] text-[#171614]/70 group-hover:bg-[#171614]/[0.06] transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-5 border-t border-[#171614]/[0.06] flex items-center justify-between text-xs font-mono text-[#171614]/40">
                    <span>Pattern 0{i + 1}</span>
                    <span className="group-hover:text-[#B84A2B] transition-colors">
                      Architectural Blueprint →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Minimal Continuous Ticker Animation */}
        <div className="mt-14 pt-8 border-t border-[#171614]/10 overflow-hidden relative">
          {/* Subtle edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F4EFE6] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F4EFE6] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-8 whitespace-nowrap will-change-transform"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 32 }}
          >
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#171614]/50"
              >
                <span>{item}</span>
                <span className="text-[#B84A2B]">/</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
