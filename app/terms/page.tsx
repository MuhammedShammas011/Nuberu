import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Engagement | Nuberu',
  description: 'Terms of Engagement and advisory engagement guidelines for Nuberu.',
};

export default function TermsPage() {
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
              <FileText className="w-3.5 h-3.5" />
              Legal & Delivery Framework
            </div>
            <h1 className="text-[clamp(2.8rem,5.5vw,4.6rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.98] mb-6">
              Terms of Engagement.
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
                1. Engagement Scope
              </h2>
              <p>
                All consulting services, architecture assessments, implementation pipelines, and managed operational contracts provided by Nuberu are governed by formally executed Statements of Work (SoW) and Master Services Agreements (MSA).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-[#171614] tracking-tight">
                2. Professional Standards & Deliverables
              </h2>
              <p>
                Nuberu delivers engineering capabilities adhering to recognized enterprise quality, security, and operational standards. Work product, architectures, and infrastructure-as-code scripts are validated through structured peer reviews and client verification milestones.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-[#171614] tracking-tight">
                3. Intellectual Property & Confidentiality
              </h2>
              <p>
                Client-specific architecture documents, proprietary systems data, and configuration artifacts remain the exclusive property of the client upon settlement of contracted engagement fees, subject to standard mutual non-disclosure protections.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-[#171614] tracking-tight">
                4. Enquiries
              </h2>
              <p>
                For legal notices or questions regarding our engagement frameworks, contact{' '}
                <a href="mailto:legal@nuberu.tech" className="text-[#B84A2B] font-semibold underline underline-offset-4">
                  legal@nuberu.tech
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
