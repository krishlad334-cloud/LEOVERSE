import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Snowflake, Waves, Compass } from 'lucide-react';

export const SeasonalCollections = () => {
  const seasons = [
    {
      id: 'summer',
      name: 'Summer Wear',
      subtitle: 'Pure French linen, slub tees & airy shorts',
      link: '/shop?category=summer-wear',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      icon: Sun,
      tag: 'Breezy & Sun-Washed'
    },
    {
      id: 'winter',
      name: 'Winter Wear',
      subtitle: 'Boiled wool overcoats, cable knits & heavy fleece',
      link: '/shop?category=winter-wear',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      icon: Snowflake,
      tag: 'Architectural Warmth'
    },
    {
      id: 'beach',
      name: 'Beach Wear',
      subtitle: 'Resort open-collar shirts & tailored swim sets',
      link: '/shop?category=beach-wear',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      icon: Waves,
      tag: 'Coastal Relaxation'
    },
    {
      id: 'travel',
      name: 'Travel Wear',
      subtitle: '6-pocket ripstop cargo trousers & chore jackets',
      link: '/shop?category=travel-wear',
      image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
      icon: Compass,
      tag: 'Transit & Transit Ease'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#EAE5DC]/50 border-t border-b border-[#D8D2C8] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#77746E] block">
            Dressing For The Climate
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#242321]">
            Seasonal Collections.
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#77746E]">
            Garments engineered to respond to temperature, humidity, and atmospheric transitions.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasons.map((season) => {
            const Icon = season.icon;
            return (
              <Link
                key={season.id}
                to={season.link}
                className="group relative flex flex-col bg-[#FAF9F6] border border-[#D8D2C8] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] bg-[#242321] overflow-hidden">
                  <img
                    src={season.image}
                    alt={season.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Corner icon pill */}
                  <div className="absolute top-3 left-3 bg-[#FAF9F6]/90 backdrop-blur-xs text-[#242321] px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 shadow-xs">
                    <Icon className="w-3 h-3 text-[#242321]" />
                    <span>{season.tag}</span>
                  </div>

                  {/* Bottom Text Over Photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-[#FAF9F6] space-y-1">
                    <h3 className="text-xl font-bold uppercase tracking-wider text-[#FAF9F6]">
                      {season.name}
                    </h3>
                    <p className="text-xs text-[#EAE5DC]/90 line-clamp-2">
                      {season.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Bar */}
                <div className="p-3.5 bg-[#FAF9F6] border-t border-[#D8D2C8] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#242321] group-hover:bg-[#252522] group-hover:text-[#FAF9F6] transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SeasonalCollections;
