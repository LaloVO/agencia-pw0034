import { Link } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';

const BotanicalIcon = ({ size = 32 }: { size?: number }) => (
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

export default function Footer() {
  const { user } = useSiteUser();
  const name = user?.nombre_usuario ?? 'Sophia Henin';
  const phone = user?.telefono_usuario ?? '';
  const email = user?.correo_usuario ?? '';
  const whaNum = phone.replace(/\D/g, '');
  const whaUrl = whaNum
    ? `https://wa.me/${whaNum}?text=${encodeURIComponent('Hola Sophia, me interesa asesoría inmobiliaria.')}`
    : '#';

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      {/* Subtle top gradient fade for seamless connection */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sophia-gold/25 to-transparent" />

      <div className="sophia-container">
        {/* Logo center */}
        <div className="flex flex-col items-center mb-14">
          <BotanicalIcon size={36} />
          <p
            className="font-serif text-sophia-cream tracking-[0.28em] text-base uppercase mt-3"
            style={{ letterSpacing: '0.28em' }}
          >
            Sophia Henin
          </p>
          <p className="font-serif italic text-sophia-gold/70 text-sm mt-1">
            Vivienda en armonía con la naturaleza
          </p>
        </div>

        {/* Three column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-sophia-gold/80 mb-4">Navegación</p>
            <nav className="flex flex-col gap-2.5">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/mapa', label: 'Propiedades' },
                { to: '/solicita-inmueble', label: 'Búsqueda Inteligente' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="font-sans text-sm text-sophia-cream/55 hover:text-sophia-cream/90 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-sophia-gold/80 mb-4">Contacto</p>
            <div className="flex flex-col gap-2.5">
              {phone && (
                <a
                  href={whaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-sophia-cream/55 hover:text-sophia-cream/90 transition-colors"
                >
                  {phone}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="font-sans text-sm text-sophia-cream/55 hover:text-sophia-cream/90 transition-colors"
                >
                  {email}
                </a>
              )}
              <p className="font-sans text-sm text-sophia-cream/40">Tulum · Riviera Maya · México</p>
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-sophia-gold/80 mb-4">Especialidades</p>
            <div className="flex flex-col gap-2.5">
              {['Propiedades en Tulum', 'Inversión inmobiliaria', 'Compradores internacionales', 'Selva y playa'].map(s => (
                <p key={s} className="font-sans text-sm text-sophia-cream/40">{s}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-sophia-gold/12">
          <p className="font-sans text-[11px] text-sophia-cream/30 tracking-wide">
            © {new Date().getFullYear()} {name}. Todos los derechos reservados.
          </p>
          <p className="font-sans text-[11px] text-sophia-cream/20">
            Powered by Homepty
          </p>
        </div>
      </div>
    </footer>
  );
}
