import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Nuberu',
  description: 'Privacy Policy and enterprise data protection standards for Nuberu.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-[#F4EFE6]">
        {/* Navigation Breadcrumb */}
        <section className="py-6 border-b border-[#171614]/10 bg-white/40">
          <div className="container-custom">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#171614]/60 hover:text-[#B84A2B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </div>
        </section>

        {/* Header */}
        <section className="py-20 border-b border-[#171614]/10">
          <div className="container-custom max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#B84A2B] mb-4">
              <Shield className="w-3.5 h-3.5" />
              Data Governance & Compliance
            </div>
            <h1 className="text-[clamp(2.8rem,5.5vw,4.6rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.98] mb-6">
              Privacy Policy.
            </h1>
            <p className="text-lg text-[#171614]/75 leading-relaxed font-mono text-xs">
              Last updated: October 2026 · London, United Kingdom
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="py-20">
          <div className="container-custom max-w-4xl space-y-12 text-[#171614]/80 text-base leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-[#171614] tracking-tight">
                1. Enterprise Commitment to Privacy
              </h2>
              <p>
                Nuberu (&ldquo;Nuberu&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting the privacy, confidentiality, and integrity of business information entrusted to us by our clients, partners, and site visitors. We process data strictly in compliance with applicable United Kingdom General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-[#171614] tracking-tight">
                2. Information Collection & Usage
              </h2>
              <p>
                We only collect information voluntarily submitted through direct business communications, technical discovery forms, and project assessments (such as name, corporate email, job title, and organization). We do not sell, rent, or monetize client data under any circumstances.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-[#171614] tracking-tight">
                3. Technical & Architectural Protection
              </h2>
              <p>
                All data collected via our website is encrypted in transit using TLS 1.3. Information submitted in connection with consulting engagements is subject to confidentiality agreements and strict access controls aligned with ISO 27001 best practices.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-[#171614] tracking-tight">
                4. Contact & Data Rights
              </h2>
              <p>
                To request data verification, updates, or deletion, contact our Data Protection Officer directly at{' '}
                <a href="mailto:privacy@nuberu.tech" className="text-[#B84A2B] font-semibold underline underline-offset-4">
                  privacy@nuberu.tech
                </a>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
