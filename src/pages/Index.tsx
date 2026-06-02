import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SophiaHeroSection from '@/components/home/SophiaHeroSection';
import SophiaIdentitySection from '@/components/home/SophiaIdentitySection';
import SophiaServicesSection from '@/components/home/SophiaServicesSection';
import SophiaPropertiesSection from '@/components/home/SophiaPropertiesSection';
import SophiaContactSection from '@/components/home/SophiaContactSection';

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Sophia Henin — Bienes Raíces Riviera Maya</title>
        <meta
          name="description"
          content="Propiedades de lujo en Tulum, Playa del Carmen y Riviera Maya. Sophia Henin, asesora inmobiliaria especialista en vivienda en armonía con la naturaleza."
        />
      </Helmet>

      <Navbar />

      <main>
        <SophiaHeroSection />
        <SophiaIdentitySection />
        <SophiaServicesSection />
        <SophiaPropertiesSection />
        <SophiaContactSection />
      </main>

      <Footer />
    </>
  );
}
