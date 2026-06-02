import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Bed, Bath, Square, Car, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProperty, formatPrice } from '@/lib/cbf';
import { useSiteUser } from '@/hooks/useSiteUser';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1200&auto=format&fit=crop';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSiteUser();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id!),
    enabled: !!id,
  });

  const whaNum = user?.telefono_usuario?.replace(/\D/g, '') ?? '';
  const whaMsg = property ? encodeURIComponent(`Hola Sophia, me interesa la propiedad: ${property.nombre}`) : '';
  const whaUrl = `https://wa.me/${whaNum}?text=${whaMsg}`;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen sophia-container py-12 animate-pulse">
          <div className="h-6 bg-sophia-jade/40 rounded-full w-1/4 mb-8" />
          <div className="aspect-video bg-sophia-jade/40 rounded-3xl mb-8" />
          <div className="h-10 bg-sophia-jade/40 rounded-full w-1/2 mb-4" />
          <div className="h-4 bg-sophia-jade/30 rounded-full w-1/3" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="font-serif text-2xl text-sophia-cream/50 mb-4 font-light">Propiedad no encontrada</p>
            <Link to="/mapa" className="font-sans text-xs uppercase tracking-[0.16em] text-sophia-gold hover:text-sophia-goldlt transition-colors">
              Ver todas las propiedades
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const images = property.imagenes_propiedades ?? [];
  const mainImage = images[0]?.image_url ?? FALLBACK_IMG;
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.municipio].filter(Boolean).join(', ') || 'Riviera Maya';

  return (
    <>
      <Helmet>
        <title>{property.nombre} — Sophia Henin</title>
        <meta name="description" content={property.descripcion ?? property.nombre} />
      </Helmet>

      <Navbar />

      <main className="pt-[72px] min-h-screen">
        {/* Back */}
        <div className="sophia-container pt-8 pb-4">
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-sophia-cream/45 hover:text-sophia-cream/80 transition-colors"
          >
            <ArrowLeft size={14} />
            Ver todas las propiedades
          </Link>
        </div>

        {/* Images */}
        <div className="sophia-container mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-3xl overflow-hidden">
            <div className="aspect-[4/3] md:aspect-auto md:row-span-2">
              <img src={mainImage} alt={property.nombre} className="w-full h-full object-cover" />
            </div>
            {images.slice(1, 3).map((img, i) => (
              <div key={i} className="aspect-[4/3]">
                <img src={img.image_url} alt={`${property.nombre} ${i + 2}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="sophia-container pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Details */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-sans text-[10px] tracking-[0.16em] uppercase px-3 py-1 rounded-full bg-sophia-gold/20 text-sophia-goldlt border border-sophia-gold/30">
                  {badge}
                </span>
                {property.tipo && (
                  <span className="font-sans text-[10px] tracking-[0.14em] uppercase px-3 py-1 rounded-full bg-sophia-jade/40 text-sophia-cream/60 border border-sophia-gold/10 capitalize">
                    {property.tipo}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-sophia-cream font-light text-3xl md:text-4xl mb-3 leading-tight">
                {property.nombre}
              </h1>

              {location && (
                <p className="flex items-center gap-1.5 font-sans text-sm text-sophia-cream/45 mb-8">
                  <MapPin size={13} className="text-sophia-gold/60" />
                  {location}
                </p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {property.habitaciones != null && (
                  <div className="sophia-glass rounded-2xl p-4 text-center">
                    <Bed size={18} className="mx-auto mb-2 text-sophia-gold/60" />
                    <p className="font-serif text-sophia-cream text-xl font-light">{property.habitaciones}</p>
                    <p className="font-sans text-[10px] text-sophia-cream/40 uppercase tracking-[0.14em] mt-1">Recámaras</p>
                  </div>
                )}
                {property.banios != null && (
                  <div className="sophia-glass rounded-2xl p-4 text-center">
                    <Bath size={18} className="mx-auto mb-2 text-sophia-gold/60" />
                    <p className="font-serif text-sophia-cream text-xl font-light">{property.banios}</p>
                    <p className="font-sans text-[10px] text-sophia-cream/40 uppercase tracking-[0.14em] mt-1">Baños</p>
                  </div>
                )}
                {property.area != null && (
                  <div className="sophia-glass rounded-2xl p-4 text-center">
                    <Square size={18} className="mx-auto mb-2 text-sophia-gold/60" />
                    <p className="font-serif text-sophia-cream text-xl font-light">{property.area}</p>
                    <p className="font-sans text-[10px] text-sophia-cream/40 uppercase tracking-[0.14em] mt-1">m²</p>
                  </div>
                )}
                {property.estacionamientos != null && (
                  <div className="sophia-glass rounded-2xl p-4 text-center">
                    <Car size={18} className="mx-auto mb-2 text-sophia-gold/60" />
                    <p className="font-serif text-sophia-cream text-xl font-light">{property.estacionamientos}</p>
                    <p className="font-sans text-[10px] text-sophia-cream/40 uppercase tracking-[0.14em] mt-1">Est.</p>
                  </div>
                )}
              </div>

              {property.descripcion && (
                <div>
                  <h2 className="font-serif text-sophia-cream text-xl font-light mb-4">Descripción</h2>
                  <div className="sophia-divider mb-5" />
                  <p className="font-sans text-sophia-cream/55 leading-relaxed whitespace-pre-line text-sm">
                    {property.descripcion}
                  </p>
                </div>
              )}
            </div>

            {/* Contact Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 sophia-glass rounded-3xl p-6">
                <p className="font-serif text-sophia-cream text-3xl font-light mb-1">{formatPrice(property.precio)}</p>
                <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-sophia-cream/40 mb-6">
                  {badge === 'Renta' ? 'por mes' : 'precio total'}
                </p>

                {user && (
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-sophia-gold/15">
                    {user.imagen_perfil_usuario ? (
                      <img src={user.imagen_perfil_usuario} alt={user.nombre_usuario} className="w-11 h-11 rounded-full object-cover" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-sophia-jade/60 flex items-center justify-center font-serif text-sophia-gold text-lg">
                        {user.nombre_usuario[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-serif text-sophia-cream font-light">{user.nombre_usuario}</p>
                      <p className="font-sans text-xs text-sophia-cream/40">Asesora Inmobiliaria</p>
                    </div>
                  </div>
                )}

                <a
                  href={whaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans text-xs uppercase tracking-[0.14em] transition-colors mb-3"
                >
                  <MessageCircle size={15} />
                  Contactar por WhatsApp
                </a>

                <div className="sophia-divider mx-auto my-5" />

                <div className="space-y-3">
                  <p className="font-serif text-sophia-cream text-base font-light">¿No es lo que buscas?</p>
                  <p className="font-sans text-xs text-sophia-cream/40 leading-relaxed">
                    Usa nuestra búsqueda inteligente para perfilar tu propiedad ideal en 6 pasos.
                  </p>
                  <Link
                    to="/solicita-inmueble"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-sophia-gold/35 text-sophia-gold hover:bg-sophia-gold hover:text-sophia-forest font-sans text-xs uppercase tracking-[0.14em] transition-all duration-300"
                  >
                    <Sparkles size={13} />
                    Búsqueda Inteligente
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PropertyDetail;
