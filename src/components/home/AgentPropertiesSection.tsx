import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';

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
      { threshold: 0.05 }
    );
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* Skeleton card — same arch/glass shape */
const SkeletonCard = () => (
  <div className="sophia-glass rounded-3xl overflow-hidden animate-pulse">
    <div className="aspect-[16/10] bg-sophia-jade/40" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-sophia-jade/40 rounded-full w-3/4" />
      <div className="h-3 bg-sophia-jade/30 rounded-full w-1/2" />
      <div className="flex gap-4 pt-2">
        <div className="h-3 bg-sophia-jade/30 rounded-full w-12" />
        <div className="h-3 bg-sophia-jade/30 rounded-full w-12" />
        <div className="h-3 bg-sophia-jade/30 rounded-full w-16" />
      </div>
    </div>
  </div>
);

export default function AgentPropertiesSection() {
  const ref = useReveal();
  const { properties, isLoading } = useProperties({ limit: 6 });

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="sophia-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div className="sophia-reveal">
            <span
              className="block font-serif font-light text-sophia-gold/15 leading-none select-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}
              aria-hidden="true"
            >
              03
            </span>
            <h2
              className="font-serif font-light text-sophia-cream -mt-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
            >
              Portafolio
              <br />
              <em className="sophia-gold-text not-italic">exclusivo</em>
            </h2>
          </div>
          <Link
            to="/mapa"
            className="sophia-reveal sophia-reveal-d2 font-sans text-[11px] tracking-[0.18em] uppercase text-sophia-cream/50 hover:text-sophia-cream transition-colors self-end border-b border-sophia-cream/20 hover:border-sophia-cream/50 pb-0.5"
          >
            Ver todo el portafolio
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : properties.slice(0, 6).map((p, i) => (
                <div key={p.id} className={`sophia-reveal sophia-reveal-d${Math.min(i + 1, 4)}`}>
                  <PropertyCard property={p} />
                </div>
              ))}
        </div>

        {/* See more */}
        {!isLoading && properties.length > 0 && (
          <div className="sophia-reveal mt-12 flex justify-center">
            <Link
              to="/mapa"
              className="font-sans text-[12px] tracking-[0.18em] uppercase px-10 py-3.5 rounded-full border border-sophia-gold/40 text-sophia-gold hover:bg-sophia-gold hover:text-sophia-forest transition-all duration-300"
            >
              Explorar más propiedades
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
