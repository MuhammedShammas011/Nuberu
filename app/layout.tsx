import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nuberu | Enterprise Cloud, Infrastructure and Modernisation',
  description:
    'Nuberu connects infrastructure, cloud, containers, automation and modern application capabilities to create simpler, scalable and resilient technology environments.',
  keywords: [
    'Enterprise Cloud',
    'Infrastructure Modernisation',
    'Kubernetes',
    'Red Hat OpenShift',
    'VMware Off Ramp',
    'DevOps Automation',
    'Managed Services',
    'Multi-Cloud Architecture',
  ],
  icons: {
    icon: '/images/nuberu_mark_terracotta.svg',
  },
  openGraph: {
    title: 'Nuberu | Enterprise Technology Services',
    description: 'Here Infrastructure Enables Transformation.',
    url: 'https://nuberu.tech',
    siteName: 'Nuberu',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="bg-[#F4EFE6] text-[#171614] antialiased selection:bg-[#B84A2B] selection:text-[#F4EFE6]">
        {children}
      </body>
    </html>
  );
}
