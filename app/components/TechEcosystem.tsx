'use client';

import { useState, useEffect, useRef } from 'react';
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

/* Single interactive Nuberu mark tile from LogoItself.svg */
function NuberuPatternMark() {
  return (
    <svg
      viewBox="0 0 146 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-8 sm:w-12 sm:h-9 object-contain pointer-events-auto cursor-pointer transition-all duration-700 ease-out opacity-[0.06] hover:!opacity-100 hover:!scale-125 hover:!duration-150 hover:!ease-in hover:!drop-shadow-[0_0_14px_rgba(184,74,43,0.85)] shrink-0 select-none"
      aria-hidden="true"
    >
      <path
        d="M106.561 32.5159L86.803 46.9231C82.7381 49.8902 77.4727 50.6449 72.7218 48.9469L43.0671 38.313C37.6472 36.3749 31.953 40.3884 31.953 46.1341V76.7149C31.953 83.1467 28.8829 89.1839 23.686 92.9744L10.4966 102.596C6.12305 105.786 0 102.665 0 97.2622V28.674C0 22.328 3.03581 16.3593 8.16406 12.6203L20.2386 3.82169C25.6241 -0.105968 32.639 -1.0836 38.8993 1.24899L105.721 26.1699C108.431 27.1818 108.928 30.8007 106.596 32.5159H106.561Z"
        fill="#B84A2B"
      />
      <path
        d="M38.831 79.0127L58.5894 64.6056C62.6543 61.6384 67.9197 60.8837 72.6707 62.5817L102.325 73.2155C107.745 75.1536 113.439 71.1402 113.439 65.3945V34.8137C113.439 28.3819 116.51 22.3446 121.706 18.5542L134.896 8.93224C139.269 5.74209 145.392 8.86367 145.392 14.2663V82.8546C145.392 89.2006 142.357 95.1693 137.228 98.9083L125.154 107.707C119.768 111.635 112.753 112.612 106.493 110.28L39.6715 85.3587C36.9615 84.3467 36.4642 80.7278 38.7967 79.0127H38.831Z"
        fill="#B84A2B"
      />
    </svg>
  );
}

/* Responsive interactive background pattern */
function LogoPatternBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(160);

  useEffect(() => {
    const updateCount = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      if (!clientWidth || !clientHeight) return;

      // Approximate footprint per tile: ~72px wide, ~58px tall with gaps
      const cols = Math.ceil(clientWidth / 72);
      const rows = Math.ceil(clientHeight / 58);
      const total = Math.min(cols * rows + cols * 2, 360);
      setCount((prev) => (Math.abs(prev - total) > 6 ? total : prev));
    };

    updateCount();
    window.addEventListener('resize', updateCount);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(updateCount);
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateCount);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      <div className="w-full h-full flex flex-wrap content-start justify-center items-center gap-6 sm:gap-7 p-4 sm:p-6">
        {Array.from({ length: count }).map((_, idx) => (
          <NuberuPatternMark key={idx} />
        ))}
      </div>
    </div>
  );
}

export default function TechEcosystem() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section
      className="py-28 bg-[#171614] text-[#F4EFE6] border-b border-white/10 relative overflow-hidden"
      id="ecosystem"
    >
      {/* Interactive Background Logo Pattern */}
      <LogoPatternBackground />

      <div className="container-custom relative z-10 pointer-events-none">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pointer-events-auto">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#B84A2B] mb-3">
              Platform Integration
            </p>
            <h2 className="text-[clamp(2.6rem,5.2vw,4.5rem)] font-extrabold text-white tracking-[-0.04em] leading-[0.98]">
              Technology Ecosystem.
            </h2>
          </div>
          <p className="text-[1.05rem] text-[#F4EFE6]/65 max-w-[460px] leading-relaxed">
            Nuberu works across leading cloud providers, container orchestration runtimes, and open-source infrastructure tooling.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-white/10 pointer-events-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-none">
          {ecosystem[activeCategory].technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="p-8 rounded-2xl bg-[#171614]/85 backdrop-blur-md border border-white/10 hover:border-[#B84A2B]/50 hover:bg-[#171614]/95 transition-all flex flex-col justify-between pointer-events-auto shadow-lg"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[#1E5A63] tracking-widest uppercase block mb-3">
                  {tech.code}
                </span>
                <h3 className="text-xl font-extrabold text-white mb-3 tracking-tight">
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
        <p className="text-[11px] font-mono text-[#F4EFE6]/40 mt-12 leading-relaxed pointer-events-auto">
          * Technology platform names reference technical integration capabilities and architectural design patterns. They do not imply exclusive partnership, reseller authorization, or third-party trademark endorsement.
        </p>
      </div>
    </section>
  );
}
  );
}
