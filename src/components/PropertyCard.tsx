import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { CBFProperty, formatPrice } from '@/lib/cbf';

interface PropertyCardProps {
  property: CBFProperty;
  variant?: 'default' | 'compact';
}

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=800&auto=format&fit=crop';

export default function PropertyCard({ property, variant = 'default' }: PropertyCardProps) {
  const image = property.imagenes_propiedades?.[0]?.image_url ?? FALLBACK_IMG;
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.municipio].filter(Boolean).join(' · ') || 'Riviera Maya';

  if (variant === 'compact') {
    return (
      <Link
        to={`/properties/${property.id}`}
        className="group block sophia-glass rounded-3xl overflow-hidden hover:border-sophia-gold/35 transition-all duration-500"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={property.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sophia-forest/85 via-sophia-forest/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="font-serif text-sophia-cream text-lg font-light">
              {formatPrice(property.precio)}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="font-sans text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full bg-sophia-gold/20 text-sophia-goldlt border border-sophia-gold/30">
              {badge}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-serif text-sophia-cream text-base font-light group-hover:text-sophia-goldlt transition-colors truncate">
            {property.nombre}
          </h3>
          <div className="flex items-center gap-1 mt-1 mb-3">
            <MapPin size={10} className="text-sophia-gold/60 flex-shrink-0" />
            <p className="font-sans text-xs text-sophia-cream/45 truncate">{location}</p>
          </div>
          <div className="flex gap-3 text-[11px] text-sophia-cream/50">
            {property.habitaciones != null && (
              <span className="flex items-center gap-1">
                <Bed size={12} className="text-sophia-gold/50" />
                {property.habitaciones}
              </span>
            )}
            {property.banios != null && (
              <span className="flex items-center gap-1">
                <Bath size={12} className="text-sophia-gold/50" />
                {property.banios}
              </span>
            )}
            {property.area != null && (
              <span className="flex items-center gap-1">
                <Square size={12} className="text-sophia-gold/50" />
                {property.area} m²
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/properties/${property.id}`}
      className="group block sophia-glass rounded-3xl overflow-hidden hover:border-sophia-gold/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(27,58,45,0.5)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={property.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sophia-forest/90 via-sophia-forest/30 to-transparent" />
        <div className="absolute top-4 right-4">
          <span className="font-sans text-[10px] tracking-[0.14em] uppercase px-3 py-1 rounded-full bg-sophia-gold/20 text-sophia-goldlt border border-sophia-gold/35">
            {badge}
          </span>
        </div>
        <div className="absolute bottom-4 left-5">
          <span className="font-serif text-sophia-cream text-2xl font-light">
            {formatPrice(property.precio)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-sophia-cream text-lg font-light group-hover:text-sophia-goldlt transition-colors mb-1.5">
          {property.nombre}
        </h3>
        <div className="flex items-center gap-1.5 mb-4">
          <MapPin size={11} className="text-sophia-gold/60 flex-shrink-0" />
          <p className="font-sans text-xs text-sophia-cream/50">{location}</p>
        </div>
        <div className="flex gap-4 text-xs text-sophia-cream/55 pt-3 border-t border-sophia-gold/10">
          {property.habitaciones != null && (
            <span className="flex items-center gap-1.5">
              <Bed size={13} className="text-sophia-gold/60" />
              {property.habitaciones} rec
            </span>
          )}
          {property.banios != null && (
            <span className="flex items-center gap-1.5">
              <Bath size={13} className="text-sophia-gold/60" />
              {property.banios} baños
            </span>
          )}
          {property.area != null && (
            <span className="flex items-center gap-1.5">
              <Square size={13} className="text-sophia-gold/60" />
              {property.area} m²
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
