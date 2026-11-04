import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, HeartHandshake, Sparkles, Dumbbell, Coffee } from 'lucide-react';

export const OccasionCollections = () => {
  const occasions = [
    {
      id: 'formal',
      name: 'Formal Wear',
      headline: 'Boardroom Precision',
      description: 'Super 130s wool blazers & crisp pinpoint shirts',
      link: '/shop?category=formal-wear',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      icon: Briefcase,
    },
    {
      id: 'wedding',
      name: 'Wedding Wear',
      headline: 'Bespoke Celebration',
      description: 'Handcrafted tuxedos & three-piece suits',
      link: '/shop?category=wedding-wear',
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
      icon: HeartHandshake,
    },
    {
      id: 'party',
      name: 'Party Wear',
      headline: 'Evening Statements',
      description: 'Liquid viscose party shirts & velvet dinner jackets',
      link: '/shop?category=party-wear',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      icon: Sparkles,
    },
    {
      id: 'sports',
      name: 'Sportswear',
      headline: 'High-Impact Performance',
      description: 'Moisture-wicking tees & tech track pants',
      link: '/shop?category=sportswear',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
      icon: Dumbbell,
    },
    {
      id: 'casual',
      name: 'Casual Wear',
      headline: 'Effortless Daily Rotation',
      description: 'Heavy 280 GSM boxy tees & relaxed chinos',
      link: '/shop?category=casual-wear',
      image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=800&q=80',
      icon: Coffee,
    }
  ];

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#77746E] dark:text-[#C5A880] block mb-1">
            Curated By Event & Life Rhythm
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#242321] dark:text-white">
            Occasion Collections.
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#77746E] dark:text-[#D1C9BE] mt-1">
            Never underdressed, never over-formalized. Exactly right for the room.
          </p>
        </div>

        <Link
          to="/shop"
          className="group flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#242321] dark:text-white hover:text-[#77746E] dark:hover:text-[#C5A880] transition-colors"
        >
          <span>Explore All Outfits</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 5-Column Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {occasions.map((occ) => {
          const Icon = occ.icon;
          return (
            <Link
              key={occ.id}
              to={occ.link}
              className="group relative flex flex-col bg-[#FAF9F6] dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] bg-[#242321] overflow-hidden">
                <img
                  src={occ.image}
                  alt={occ.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-[#FAF9F6] p-1.5 border border-white/10 rounded-md">
                  <Icon className="w-3.5 h-3.5 text-[#C5A880]" />
                </div>

                {/* Text Content */}
                <div className="absolute bottom-3 left-3 right-3 text-[#FAF9F6] space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block">
                    {occ.headline}
                  </span>
                  <h3 className="text-base font-bold uppercase tracking-wider text-[#FAF9F6]">
                    {occ.name}
                  </h3>
                  <p className="text-[11px] text-[#EAE5DC]/80 line-clamp-2">
                    {occ.description}
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="p-2.5 bg-[#FAF9F6] dark:bg-[#18181C] border-t border-[#D8D2C8] dark:border-[#27272A] flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#242321] dark:text-white group-hover:bg-[#252522] group-hover:text-[#FAF9F6] dark:group-hover:bg-[#C5A880] dark:group-hover:text-black transition-colors">
                <span>View Outfits</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default OccasionCollections;
