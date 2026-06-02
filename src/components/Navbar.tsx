import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

/* Botanical wheat icon — matches Sophia Henin logo */
const BotanicalIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 24 L14 10" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M14 18 Q10 15 9 11" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M14 18 Q18 15 19 11" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M14 14 Q11 11 10.5 7.5" stroke="#C9A84C" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
    <path d="M14 14 Q17 11 17.5 7.5" stroke="#C9A84C" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
    <circle cx="14" cy="9.5" r="1.2" fill="#C9A84C" opacity="0.8"/>
    <circle cx="9" cy="10.5" r="1" fill="#C9A84C" opacity="0.65"/>
    <circle cx="19" cy="10.5" r="1" fill="#C9A84C" opacity="0.65"/>
    <circle cx="10.5" cy="7" r="0.9" fill="#C9A84C" opacity="0.55"/>
    <circle cx="17.5" cy="7" r="0.9" fill="#C9A84C" opacity="0.55"/>
  </svg>
);

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/mapa', label: 'Propiedades' },
  { to: '/solicita-inmueble', label: 'Búsqueda' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useSiteUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const whaNum = user?.telefono_usuario?.replace(/\D/g, '') ?? '';
  const whaUrl = whaNum
    ? `https://wa.me/${whaNum}?text=${encodeURIComponent('Hola Sophia, me interesa una asesoría inmobiliaria.')}`
    : '#';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'navbar-scrolled' : 'bg-transparent'
        }`}
      >
        <div className="sophia-container flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <BotanicalIcon size={26} />
            <span
              className="font-serif text-sophia-cream tracking-[0.22em] text-sm md:text-[15px] uppercase leading-none"
              style={{ letterSpacing: '0.22em' }}
            >
              Sophia Henin
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`font-sans text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                  location.pathname === to
                    ? 'text-sophia-gold'
                    : 'text-sophia-cream/70 hover:text-sophia-cream'
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href={whaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[11px] tracking-[0.15em] uppercase px-5 py-2 rounded-full border border-sophia-gold/50 text-sophia-gold hover:bg-sophia-gold hover:text-sophia-forest transition-all duration-300"
            >
              Contactar
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-sophia-cream/80 hover:text-sophia-cream transition-colors p-1"
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-[60] bg-sophia-forest/70 backdrop-blur-sm transition-opacity duration-400 ${
            open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setOpen(false)}
        />
        {/* Panel */}
        <aside
          className={`fixed top-0 right-0 bottom-0 z-[70] w-[75vw] max-w-xs flex flex-col transition-transform duration-400 ease-out sophia-glass ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-sophia-gold/15">
            <div className="flex items-center gap-2">
              <BotanicalIcon size={22} />
              <span className="font-serif text-sophia-cream tracking-[0.2em] text-sm uppercase">Sophia Henin</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-sophia-cream/70 hover:text-sophia-cream transition-colors">
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-6 pt-8 flex-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`font-sans text-sm tracking-[0.14em] uppercase py-3 border-b border-sophia-gold/10 transition-colors ${
                  location.pathname === to ? 'text-sophia-gold' : 'text-sophia-cream/75 hover:text-sophia-cream'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-8">
            <a
              href={whaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-sans text-[12px] tracking-[0.15em] uppercase py-3 rounded-full border border-sophia-gold/50 text-sophia-gold hover:bg-sophia-gold hover:text-sophia-forest transition-all duration-300"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </aside>
      </>
    </>
  );
}
