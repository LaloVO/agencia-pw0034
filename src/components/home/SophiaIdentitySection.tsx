import { useEffect, useRef } from 'react';

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
      { threshold: 0.08 }
    );
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
  return ref;
}

const VALUES = [
  { num: '01', title: 'Conocimiento local', desc: 'Especialista en el ecosistema inmobiliario de Tulum y Riviera Maya, con acceso a oportunidades exclusivas antes de salir al mercado.' },
  { num: '02', title: 'Compradores internacionales', desc: 'Acompaño a compradores extranjeros en todo el proceso legal y logístico para adquirir propiedad en México con total seguridad.' },
  { num: '03', title: 'Inversión con propósito', desc: 'Propiedades que integran arquitectura, naturaleza y alto potencial de plusvalía en los destinos más cotizados del Caribe Mexicano.' },
];

export default function SophiaIdentitySection() {
  const ref = useReveal();

  return (
    <section ref={ref} className="relative py-28 md:py-36">
      <div className="sophia-container">
        {/* Gold index */}
        <div className="sophia-reveal sophia-reveal-d1 mb-2">
          <span
            className="font-serif font-light text-sophia-gold/15 select-none leading-none"
            style={{ fontSize: 'clamp(5rem, 14vw, 11rem)' }}
            aria-hidden="true"
          >
            01
          </span>
        </div>

        {/* Headline */}
        <div className="sophia-reveal sophia-reveal-d2 -mt-6 mb-14 max-w-2xl">
          <h2
            className="font-serif font-light text-sophia-cream leading-[1.1]"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)' }}
          >
            Propiedades que
            <br />
            <em className="sophia-gold-text not-italic font-light">respetan la vida</em>
          </h2>
        </div>

        {/* 3-column values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {VALUES.map(({ num, title, desc }) => (
            <div key={num} className="sophia-reveal sophia-reveal-d3">
              <div className="sophia-divider mb-5" />
              <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-sophia-gold/70 mb-3">{num}</p>
              <h3 className="font-serif text-sophia-cream text-xl font-light mb-3">{title}</h3>
              <p className="font-sans text-sm text-sophia-cream/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
