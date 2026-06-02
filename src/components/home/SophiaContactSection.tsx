import { useEffect, useRef, useState } from 'react';
import { useSiteUser } from '@/hooks/useSiteUser';

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

export default function SophiaContactSection() {
  const ref = useReveal();
  const { user } = useSiteUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const whaNum = user?.telefono_usuario?.replace(/\D/g, '') ?? '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola Sophia, soy ${name}. ${message} (${email})`;
    const url = whaNum
      ? `https://wa.me/${whaNum}?text=${encodeURIComponent(text)}`
      : '#';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section ref={ref} className="relative py-28 md:py-40">
      <div className="sophia-container">
        {/* Big display headline */}
        <div className="sophia-reveal mb-2 text-center md:text-left">
          <span
            className="font-serif font-light text-sophia-gold/15 leading-none select-none"
            style={{ fontSize: 'clamp(5rem, 14vw, 11rem)' }}
            aria-hidden="true"
          >
            04
          </span>
        </div>
        <div className="sophia-reveal sophia-reveal-d1 text-center md:text-left mb-16 -mt-6">
          <h2
            className="font-serif font-light text-sophia-cream"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 1.05 }}
          >
            Conectemos
          </h2>
          <p className="font-serif italic text-sophia-gold/65 mt-3" style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}>
            Tu propiedad ideal comienza con una conversación
          </p>
        </div>

        {/* Two-column: form + info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="sophia-reveal sophia-reveal-d2">
            <div className="sophia-glass rounded-3xl p-8 space-y-5">
              <div>
                <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-sophia-gold/70 mb-2">Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Tu nombre completo"
                  required
                  className="w-full bg-transparent border-b border-sophia-gold/20 py-2 text-sophia-cream font-sans text-sm placeholder:text-sophia-cream/30 outline-none focus:border-sophia-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-sophia-gold/70 mb-2">Correo</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="w-full bg-transparent border-b border-sophia-gold/20 py-2 text-sophia-cream font-sans text-sm placeholder:text-sophia-cream/30 outline-none focus:border-sophia-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-sophia-gold/70 mb-2">Mensaje</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="¿Qué tipo de propiedad buscas?"
                  rows={3}
                  className="w-full bg-transparent border-b border-sophia-gold/20 py-2 text-sophia-cream font-sans text-sm placeholder:text-sophia-cream/30 outline-none focus:border-sophia-gold/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full font-sans text-[12px] tracking-[0.18em] uppercase py-3.5 rounded-full bg-sophia-gold text-sophia-forest font-medium hover:bg-sophia-goldlt transition-colors duration-300 mt-2"
              >
                Enviar por WhatsApp
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="sophia-reveal sophia-reveal-d3 flex flex-col justify-center gap-8">
            <div>
              <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-sophia-gold/70 mb-3">Especialista en</p>
              <div className="space-y-2">
                {[
                  'Tulum — Aldea Zama, La Veleta, Zazil Ha',
                  'Playa del Carmen — Playacar, 5ta Avenida',
                  'Holbox y Bacalar',
                  'Inversión y airbnb premium',
                ].map(z => (
                  <div key={z} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-sophia-gold/60 flex-shrink-0" />
                    <p className="font-sans text-sm text-sophia-cream/55">{z}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sophia-divider" />

            {user?.telefono_usuario && (
              <div>
                <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-sophia-gold/70 mb-2">WhatsApp directo</p>
                <a
                  href={`https://wa.me/${whaNum}?text=${encodeURIComponent('Hola Sophia, me interesa una asesoría.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-sophia-cream text-xl font-light hover:text-sophia-gold transition-colors"
                >
                  {user.telefono_usuario}
                </a>
              </div>
            )}

            {user?.correo_usuario && (
              <div>
                <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-sophia-gold/70 mb-2">Correo</p>
                <a
                  href={`mailto:${user.correo_usuario}`}
                  className="font-serif text-sophia-cream text-lg font-light hover:text-sophia-gold transition-colors"
                >
                  {user.correo_usuario}
                </a>
              </div>
            )}

            <a
              href={`https://wa.me/${whaNum}?text=${encodeURIComponent('Hola Sophia, me interesa una asesoría inmobiliaria en la Riviera Maya.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[11px] tracking-[0.18em] uppercase px-8 py-3 rounded-full border border-sophia-gold/40 text-sophia-gold hover:bg-sophia-gold hover:text-sophia-forest transition-all duration-300 self-start"
            >
              Agendar llamada
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
