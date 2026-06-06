import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const BotanicalIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-sophia-drift">
    <path d="M24 42 L24 18" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M24 32 Q17 27 15.5 19" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M24 32 Q31 27 32.5 19" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M24 25 Q18 20 17.5 13" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <path d="M24 25 Q30 20 30.5 13" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <circle cx="24" cy="16" r="2" fill="#C9A84C"/>
    <circle cx="15.5" cy="18" r="1.6" fill="#C9A84C" opacity="0.7"/>
    <circle cx="32.5" cy="18" r="1.6" fill="#C9A84C" opacity="0.7"/>
    <circle cx="17.5" cy="12.5" r="1.3" fill="#C9A84C" opacity="0.55"/>
    <circle cx="30.5" cy="12.5" r="1.3" fill="#C9A84C" opacity="0.55"/>
  </svg>
);

/* Each floating particle with unique size/speed/position */
const PARTICLES = [
  { size: 3, left: '8%',  delay: 0,    duration: 14 },
  { size: 2, left: '15%', delay: 2.5,  duration: 18 },
  { size: 4, left: '24%', delay: 1,    duration: 12 },
  { size: 2, left: '38%', delay: 4,    duration: 20 },
  { size: 3, left: '52%', delay: 0.5,  duration: 16 },
  { size: 2, left: '63%', delay: 3,    duration: 22 },
  { size: 4, left: '74%', delay: 1.5,  duration: 13 },
  { size: 2, left: '82%', delay: 5,    duration: 17 },
  { size: 3, left: '90%', delay: 2,    duration: 19 },
  { size: 2, left: '45%', delay: 6,    duration: 15 },
  { size: 3, left: '29%', delay: 3.5,  duration: 21 },
  { size: 2, left: '68%', delay: 7,    duration: 14 },
];

export default function AgentHeroSection() {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useSiteUser();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const whaNum = user?.telefono_usuario?.replace(/\D/g, '') ?? '';
  const whaUrl = whaNum
    ? `https://wa.me/${whaNum}?text=${encodeURIComponent('Hola Asesor Demo, me interesa una asesoría inmobiliaria en la Riviera Maya.')}`
    : '#';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/mapa${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Floating botanical particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute bottom-0 rounded-full bg-sophia-gold pointer-events-none select-none"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            animationName: 'float-particle',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            opacity: 0,
          }}
        />
      ))}

      {/* Ghost "SOPHIA" watermark */}
      <span
        aria-hidden="true"
        className="absolute select-none pointer-events-none font-serif font-light text-sophia-cream leading-none"
        style={{
          fontSize: 'clamp(10rem, 28vw, 26rem)',
          opacity: 0.028,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.1em',
        }}
      >
        SOPHIA
      </span>

      {/* Radial green glow — depth */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: '80vw',
          height: '80vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,102,80,0.35) 0%, transparent 65%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {/* Botanical icon */}
        <div
          className={`mb-7 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <BotanicalIcon size={52} />
        </div>

        {/* Name */}
        <div
          className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.22s' }}
        >
          <p
            className="font-serif text-sophia-cream/60 tracking-[0.38em] text-xs md:text-[13px] uppercase mb-4"
            style={{ letterSpacing: '0.38em' }}
          >
            Asesor Demo
          </p>
        </div>

        {/* Main headline */}
        <h1
          className={`font-serif font-light text-sophia-cream leading-[1.12] mb-5 transition-all duration-900 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.8rem)',
            transitionDelay: '0.32s',
          }}
        >
          Vivienda en armonía
          <br />
          <em className="sophia-gold-text not-italic">con la naturaleza</em>
        </h1>

        {/* Subtitle */}
        <p
          className={`font-sans font-light text-sophia-cream/60 leading-relaxed mb-10 max-w-xl transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)', transitionDelay: '0.44s' }}
        >
          Propiedades de lujo en Tulum, Playa del Carmen y Riviera Maya.
          <br className="hidden md:block" />
          Vive donde la selva y el Caribe se encuentran.
        </p>

        {/* Glass search bar */}
        <form
          onSubmit={handleSearch}
          className={`flex items-center gap-2 sophia-glass rounded-full px-4 py-2.5 w-full max-w-lg mb-8 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.54s' }}
        >
          <Search size={15} className="text-sophia-gold/70 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tulum, frente al mar, selva..."
            className="flex-1 bg-transparent text-sophia-cream/90 placeholder:text-sophia-cream/35 font-sans text-sm outline-none"
          />
          <button
            type="submit"
            className="font-sans text-[11px] tracking-[0.14em] uppercase px-4 py-1.5 rounded-full bg-sophia-gold text-sophia-forest hover:bg-sophia-goldlt transition-colors duration-300"
          >
            Buscar
          </button>
        </form>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.64s' }}
        >
          <a
            href={whaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12px] tracking-[0.16em] uppercase px-8 py-3 rounded-full bg-sophia-gold text-sophia-forest font-medium hover:bg-sophia-goldlt transition-colors duration-300"
          >
            Agendar asesoría
          </a>
          <button
            onClick={() => navigate('/mapa')}
            className="font-sans text-[12px] tracking-[0.16em] uppercase px-8 py-3 rounded-full border border-sophia-cream/25 text-sophia-cream/75 hover:border-sophia-cream/50 hover:text-sophia-cream transition-all duration-300"
          >
            Ver propiedades
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`absolute bottom-8 left-0 right-0 flex justify-center transition-all duration-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1.2s' }}
      >
        <ChevronDown size={18} className="text-sophia-cream/30 animate-bounce" />
      </div>
    </section>
  );
}
