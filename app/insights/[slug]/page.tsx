import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { insightsData } from '@/app/data/insightsData';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insightsData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = insightsData.find((i) => i.slug === slug);
  if (!item) return { title: 'Insight Not Found | Nuberu' };

  return {
    title: `${item.title} | Nuberu Insights`,
    description: item.summary,
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = insightsData.find((i) => i.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-[#F4EFE6]">
        {/* Navigation */}
        <section className="py-6 border-b border-[#171614]/10 bg-white/40">
          <div className="container-custom">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#171614]/60 hover:text-[#B84A2B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Insights
            </Link>
          </div>
        </section>

        {/* Paper Header */}
        <article className="py-20">
          <div className="container-custom max-w-4xl mx-auto">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#B84A2B] block mb-4">
              {item.category}
            </span>
            <h1 className="text-[clamp(2.8rem,5.5vw,4.6rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.98] mb-6">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-[#171614]/60 font-mono py-4 border-t border-b border-[#171614]/10 mb-12">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#B84A2B]" />
                {item.authorRole}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B84A2B]" />
                {item.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B84A2B]" />
                {item.readTime}
              </span>
            </div>

            {/* Content Body */}
            <div className="prose prose-lg max-w-none text-[#171614]/80 space-y-6 text-base sm:text-lg leading-relaxed">
              <p className="text-xl font-medium text-[#171614] leading-relaxed">
                {item.summary}
              </p>

              <h2 className="text-2xl font-bold text-[#171614] pt-6">
                1. Context and Architectural Drivers
              </h2>
              <p>
                Enterprise infrastructure decisions are no longer dictated by single-vendor roadmaps. As organisations modernize their digital cores, the need for workload portability, cost predictability, and zero-trust security postures demands a disciplined architectural approach.
              </p>

              <h2 className="text-2xl font-bold text-[#171614] pt-6">
                2. Practical Implementation Criteria
              </h2>
              <p>
                Whether decoupling monolithic workloads into containerized services or engineering multi-cloud landing zones, the primary failure mode is operational fragmentation. Teams that succeed establish automated CI/CD governance, declarative infrastructure as code, and continuous observability from day one.
              </p>

              <h2 className="text-2xl font-bold text-[#171614] pt-6">
                3. Summary & Next Steps
              </h2>
              <p>
                A resilient technology environment is built on clarity, connection, and planned transformation. Nuberu works alongside enterprise engineering teams to de-risk these critical evolutions.
              </p>
            </div>

            {/* Article Footer CTA */}
            <div className="mt-16 pt-8 border-t border-[#171614]/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-8 rounded-2xl">
              <div>
                <h4 className="text-base font-bold text-[#171614] mb-1">
                  Discuss this architecture with our team
                </h4>
                <p className="text-xs text-[#171614]/60">
                  Arrange a technical discovery workshop with our senior practice leads.
                </p>
              </div>
              <Link
                href="/contact"
                className="text-xs font-semibold uppercase tracking-wider text-[#F4EFE6] bg-[#B84A2B] hover:bg-[#9E3E23] px-6 py-3 rounded-full transition-all shrink-0"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
