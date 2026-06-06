import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormularioMultiStep from "@/components/home/FormularioMultiStep";
import { useSiteUser } from "@/hooks/useSiteUser";

export default function SolicitaInmueble() {
  const { user } = useSiteUser();

  return (
    <>
      <Helmet>
        <title>Búsqueda Inteligente — Asesor Demo</title>
        <meta
          name="description"
          content="Completa nuestra solicitud inteligente de 6 pasos para encontrar tu propiedad ideal en Tulum y Riviera Maya."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-28 pb-20">
        <div className="sophia-container">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-sophia-gold/70 mb-4">
              Asesor Demo
            </p>
            <h1 className="font-serif text-sophia-cream font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}>
              Búsqueda Inteligente
            </h1>
            <p className="font-serif italic text-sophia-gold/60 mt-2 text-lg">
              Tu propiedad ideal en la Riviera Maya
            </p>
            <div className="sophia-divider mx-auto mt-6" />
            <p className="font-sans text-sm text-sophia-cream/45 max-w-xl mx-auto leading-relaxed mt-5">
              Cuéntanos sobre tu presupuesto, estilo de vida y preferencias. En 6 pasos encontramos las mejores propiedades para ti.
            </p>
          </div>

          {/* Formulario */}
          <FormularioMultiStep />
        </div>
      </main>

      <Footer />
    </>
  );
}
