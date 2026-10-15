import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact Nuberu | Enterprise Technology Services',
  description:
    'Talk to our engineering team about your infrastructure, cloud, container, automation, or digital transformation requirements.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-[#F4EFE6]">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
