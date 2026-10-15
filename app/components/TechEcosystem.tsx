'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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

export default function TechEcosystem() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-28 bg-[#171614] text-[#F4EFE6] border-b border-white/10" id="ecosystem">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#B84A2B] mb-3">
              Platform Integration
            </p>
            <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-white tracking-[-0.03em] leading-[1.1]">
              Technology Ecosystem.
            </h2>
          </div>
          <p className="text-[1.05rem] text-[#F4EFE6]/65 max-w-[460px] leading-relaxed">
            Nuberu works across leading cloud providers, container orchestration runtimes, and open-source infrastructure tooling.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-white/10">
          {ecosystem.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(idx)}
              className={`text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all cursor-pointer ${
                activeCategory === idx
                  ? 'bg-[#B84A2B] text-white shadow-[0_4px_12px_rgba(184,74,43,0.3)]'
                  : 'bg-white/[0.04] text-[#F4EFE6]/70 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active Grid of Technologies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ecosystem[activeCategory].technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#B84A2B]/40 hover:bg-white/[0.05] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[#1E5A63] tracking-widest uppercase block mb-3">
                  {tech.code}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {tech.name}
                </h3>
                <p className="text-sm leading-relaxed text-[#F4EFE6]/60">
                  {tech.scope}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#F4EFE6]/40">
                <span>Architecture Verified</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E5A63]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer Note adhering to Handover PDF rules */}
        <p className="text-[11px] font-mono text-[#F4EFE6]/40 mt-12 leading-relaxed">
          * Technology platform names reference technical integration capabilities and architectural design patterns. They do not imply exclusive partnership, reseller authorization, or third-party trademark endorsement.
        </p>
      </div>
    </section>
  );
}
