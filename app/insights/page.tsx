import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { insightsData } from '../data/insightsData';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical Insights & Guides | Nuberu',
  description:
    'Approved architectural guidance, cloud migration considerations, and technical notes from Nuberu’s platform engineering team.',
};

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-[#F4EFE6]">
        {/* Hero */}
        <section className="py-20 border-b border-[#171614]/10">
          <div className="container-custom">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#B84A2B] block mb-4">
              Engineering Knowledge
            </span>
            <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.96] max-w-5xl mb-6">
              Technical Insights & Guides.
            </h1>
            <p className="text-xl sm:text-2xl text-[#171614]/75 max-w-3xl leading-relaxed">
              In-depth architectural analysis, workload migration methodologies, and container operational playbooks from our senior practice leads.
            </p>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-20">
          <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
            {insightsData.map((item) => (
              <article
                key={item.slug}
                className="p-8 rounded-3xl bg-white border border-[#171614]/10 shadow-[0_20px_50px_-20px_rgba(23,22,20,0.06)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#171614]/50 mb-6 pb-4 border-b border-[#171614]/[0.06]">
                    <span className="font-semibold text-[#B84A2B] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span>{item.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-[1.65rem] font-extrabold text-[#171614] tracking-tight leading-snug mb-4">
                    {item.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-[#171614]/70 mb-8">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#171614]/[0.06] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#171614]/50">
                    {item.authorRole} · {item.date}
                  </span>
                  <Link
                    href={`/insights/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#171614] hover:text-[#B84A2B] transition-colors"
                  >
                    Read
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
