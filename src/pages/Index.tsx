import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentHeroSection from '@/components/home/AgentHeroSection';
import AgentIdentitySection from '@/components/home/AgentIdentitySection';
import AgentServicesSection from '@/components/home/AgentServicesSection';
import AgentPropertiesSection from '@/components/home/AgentPropertiesSection';
import AgentContactSection from '@/components/home/AgentContactSection';

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Asesor Demo — Bienes Raíces Riviera Maya</title>
        <meta
          name="description"
          content="Propiedades de lujo en Tulum, Playa del Carmen y Riviera Maya. Asesor Demo, asesora inmobiliaria especialista en vivienda en armonía con la naturaleza."
        />
      </Helmet>

      <Navbar />

      <main>
        <AgentHeroSection />
        <AgentIdentitySection />
        <AgentServicesSection />
        <AgentPropertiesSection />
        <AgentContactSection />
      </main>

      <Footer />
    </>
  );
}
