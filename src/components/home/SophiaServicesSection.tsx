import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const els = el.querySelectorAll('.sophia-reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.06 }
    );
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* Arch card icons */
const Icons = {
  compra: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-sophia-gold">
      <path d="M4 12L14 4L24 12V24H18V18H10V24H4V12Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
      <rect x="11" y="18" width="6" height="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    </svg>
  ),
  renta: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-sophia-gold">
      <circle cx="14" cy="11" r="7" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M14 4 L14 2M14 20 L14 22M7 11 L5 11M21 11 L23 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M8 23 Q14 18 20 23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  inversion: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-sophia-gold">
      <polyline points="4,20 10,13 16,16 24,7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="24" cy="7" r="2" fill="currentColor" opacity="0.7"/>
      <path d="M20 24 L24 24 L24 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    </svg>
  ),
};

const SERVICES = [
  {
    key: 'compra',
    num: '01',
    title: 'Compra',
    tagline: 'Tu propiedad ideal en la Riviera Maya',
    desc: 'Te guío en todo el proceso para encontrar y adquirir la propiedad perfecta: desde la búsqueda hasta la firma. Selva, playa o inversión patrimonial.',
    cta: 'Buscar propiedades',
    to: '/mapa',
  },
  {
    key: 'renta',
    num: '02',
    title: 'Renta',
    tagline: 'Vive el Caribe con libertad',
    desc: 'Opciones de renta temporal y vacacional en los destinos más exclusivos de Tulum y Playa del Carmen, adaptadas a tu estilo de vida.',
    cta: 'Ver rentas',
    to: '/mapa',
  },
  {
    key: 'inversion',
    num: '03',
    title: 'Inversión',
    tagline: 'Patrimonio con plusvalía natural',
    desc: 'Propiedades con alto retorno en zonas de crecimiento acelerado. El Caribe Mexicano como destino de inversión más rentable de Latinoamérica.',
    cta: 'Asesoría de inversión',
    to: '/solicita-inmueble',
  },
];

export default function SophiaServicesSection() {
  const ref = useReveal();
  const navigate = useNavigate();

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="sophia-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="sophia-reveal">
            <span
              className="block font-serif font-light text-sophia-gold/15 leading-none select-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}
              aria-hidden="true"
            >
              02
            </span>
            <h2
              className="font-serif font-light text-sophia-cream -mt-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
            >
              Mi forma
              <br />
              <em className="sophia-gold-text not-italic">de trabajar</em>
            </h2>
          </div>
          <p className="sophia-reveal sophia-reveal-d2 font-sans text-sm text-sophia-cream/45 max-w-xs leading-relaxed">
            Acompañamiento personalizado en cada etapa, desde la primera consulta hasta la entrega de llaves.
          </p>
        </div>

        {/* Arch cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map(({ key, num, title, tagline, desc, cta, to }, i) => (
            <div
              key={key}
              className={`sophia-reveal sophia-reveal-d${i + 1} group cursor-pointer flex justify-center`}
              onClick={() => navigate(to)}
            >
              {/* Arch portal shape — fixed width so radius creates true arch top */}
              <div
                className="relative sophia-glass hover:border-sophia-gold/40 transition-all duration-500 group-hover:bg-white/[0.11] flex flex-col items-center text-center px-6 pt-10 pb-8 overflow-hidden w-full"
                style={{
                  borderRadius: '140px 140px 24px 24px',
                  maxWidth: '280px',
                  minHeight: '400px',
                }}
              >
                {/* Gold arch glow top */}
                <div
                  className="absolute top-0 left-0 right-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    height: '120px',
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className="mb-6 mt-2">
                  {Icons[key as keyof typeof Icons]}
                </div>

                {/* Number */}
                <p className="font-sans text-[10px] tracking-[0.24em] uppercase text-sophia-gold/60 mb-3">{num}</p>

                {/* Title */}
                <h3 className="font-serif text-sophia-cream text-2xl font-light mb-2">{title}</h3>

                {/* Tagline */}
                <p className="font-serif italic text-sophia-gold/70 text-sm mb-4">{tagline}</p>

                {/* Divider */}
                <div className="sophia-divider mb-4" />

                {/* Description */}
                <p className="font-sans text-xs text-sophia-cream/50 leading-relaxed mb-6">{desc}</p>

                {/* CTA */}
                <span className="font-sans text-[11px] tracking-[0.16em] uppercase text-sophia-gold/70 group-hover:text-sophia-gold transition-colors">
                  {cta} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
