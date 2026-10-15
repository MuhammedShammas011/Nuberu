import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import AboutSection from './components/AboutSection';
import HowWeWork from './components/HowWeWork';
import ServicesOverview from './components/ServicesOverview';
import TechEcosystem from './components/TechEcosystem';
import InsightsSection from './components/InsightsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export const metadata = {
  title: 'Nuberu | Enterprise Cloud, Infrastructure and Modernisation',
  description: 'Nuberu connects infrastructure, cloud, containers, automation and modern application capabilities to create simpler, scalable and resilient technology environments.',
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Capabilities />
        <AboutSection />
        <HowWeWork />
        <ServicesOverview />
        <TechEcosystem />
        <InsightsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
