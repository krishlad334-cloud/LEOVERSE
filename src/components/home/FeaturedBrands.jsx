import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BRANDS } from '../../services/productService';

const BRAND_METADATA = {
  'Atelier Leo': { tagline: 'Haute Menswear & Silks', origin: 'Milan / Mumbai', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' },
  'Riviera Studio': { tagline: 'Pure French Linen & Resort', origin: 'Saint-Tropez', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80' },
  'Royale Heritage': { tagline: 'Raw Silk & Regal Kurtas', origin: 'Varanasi', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=80' },
  'Streetweavers': { tagline: '280 GSM Boxy Streetwear', origin: 'Tokyo / Seoul', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80' },
  'Bespoke Sartorial': { tagline: 'Goodyear Welted Shoes & Suiting', origin: 'Savile Row', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80' },
  'Urban Minimal': { tagline: 'Supima Cottons & Relaxed Chinos', origin: 'Copenhagen', image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80' },
  'AeroSport': { tagline: 'Articulated Tech & Gym Performance', origin: 'Stockholm', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' }
};

export const FeaturedBrands = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 select-none">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#EAE5DC] dark:border-[#27272A] gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A68962] dark:text-[#C5A880]">
            Atelier Labels
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#242321] dark:text-white mt-1">
            Featured Fashion Houses
          </h2>
        </div>
        <Link
          to="/products"
          className="text-xs font-bold uppercase tracking-wider text-[#A68962] hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Explore All Houses</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {BRANDS.slice(0, 4).map((brand) => {
          const meta = BRAND_METADATA[brand] || {
            tagline: 'Luxury Menswear',
            origin: 'Atelier Circle',
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
          };

          return (
            <Link
              key={brand}
              to={`/products?brand=${encodeURIComponent(brand)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#1A1A1D] border border-[#EAE5DC] dark:border-[#27272A] shadow-xs hover:shadow-xl transition-all duration-500"
            >
              <img
                src={meta.image}
                alt={brand}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-1">
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#C5A880] block">
                  {meta.origin}
                </span>
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide group-hover:text-[#C5A880] transition-colors leading-tight">
                  {brand}
                </h3>
                <p className="text-[11px] text-gray-300 font-light line-clamp-1">
                  {meta.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#C5A880] group-hover:translate-x-1 transition-transform">
                  <span>View Collection</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedBrands;
