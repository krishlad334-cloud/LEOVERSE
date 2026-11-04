import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    tag: "HAUTE MENSWEAR SS26",
    headline: "THE ART OF MENSWEAR.",
    subhead: "Unstructured Tailoring & Pure French Linens",
    description: "Curated French flax linens, pure Mulberry silks, and architectural silhouettes engineered for effortless masculine elegance.",
    primaryCta: "Shop New Arrivals",
    primaryLink: "/new-arrivals",
    bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=85",
    theme: "dark"
  },
  {
    id: 2,
    tag: "RIVIERA RESORT EDIT",
    headline: "RIVIERA & TAILORING.",
    subhead: "Retro Cuban Collars & Forward-Pleat Chinos",
    description: "Relaxed retro Cuban camp collars, Super 120s virgin wool blazers, and double-pleated linen trousers.",
    primaryCta: "Explore Shirts & Polos",
    primaryLink: "/shop?department=Men's%20Apparel",
    bgImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1800&q=85",
    theme: "dark"
  },
  {
    id: 3,
    tag: "HERITAGE ETHNIC & FESTIVE",
    headline: "ROYAL KURTAS & SHERWANIS.",
    subhead: "Handcrafted Bundis, Silk Kurtas & Festive Tailoring",
    description: "Regal silhouettes cut from hand-embroidered Raw Silk and pure Chanderi, crafted for weddings and celebrations.",
    primaryCta: "Explore Ethnic Wear",
    primaryLink: "/shop?department=Men's%20Ethnic",
    bgImage: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1800&q=85",
    theme: "dark"
  },
  {
    id: 4,
    tag: "FLASH PROMOTION • 40% OFF",
    headline: "MID-SEASON PRIVATE SALE.",
    subhead: "Use Promo Code LUXE15 For Additional 15% Savings",
    description: "Exclusive markdowns on luxury chronographs, Italian leather duffles, and designer menswear staples.",
    primaryCta: "Shop The Sale",
    primaryLink: "/sale",
    bgImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1800&q=85",
    theme: "dark"
  }
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = BANNERS[currentSlide];

  return (
    <section className="relative w-full bg-[#141416] text-[#FAF9F6] overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center select-none border-b border-[#D8D2C8]/30">
      {/* Background Banner Slides */}
      {BANNERS.map((b, idx) => (
        <div
          key={b.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <img
            src={b.bgImage}
            alt={b.headline}
            className="w-full h-full object-cover object-center brightness-[0.65] contrast-[1.05]"
          />
          {/* Gradients for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36 w-full">
        <div className="max-w-2xl text-[#FAF9F6] space-y-5 sm:space-y-6 animate-in fade-in duration-500">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-md border border-white/20 text-[#FAF9F6] text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{slide.tag}</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-[#C5A880] block">
              LEOVERSE LUXE MENSWEAR
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.02em] uppercase leading-[0.95] drop-shadow-xl text-white">
              {slide.headline}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="font-serif italic text-xl sm:text-2xl text-[#EAE5DC] font-normal drop-shadow-md">
            {slide.subhead}
          </p>

          {/* Editorial Description */}
          <p className="text-xs sm:text-base text-gray-200/90 font-light max-w-lg leading-relaxed drop-shadow-sm">
            {slide.description}
          </p>

          {/* Call to action */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
            <Link
              to={slide.primaryLink}
              className="px-8 py-4 bg-[#C5A880] hover:bg-[#B3956E] text-black font-extrabold tracking-[0.16em] text-xs uppercase rounded-xl transition-all duration-300 shadow-2xl flex items-center space-x-2 cursor-pointer transform hover:scale-105"
            >
              <span>{slide.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Menswear Departments Quick Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-3">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mr-1">Menswear Departments:</span>
            {[
              { label: "Shirts & Polos", link: "/shop?department=Men's%20Apparel" },
              { label: "Suits & Tailoring", link: "/shop?department=Men's%20Tailoring" },
              { label: "Streetwear", link: "/shop?department=Men's%20Casuals" },
              { label: "Ethnic Wear", link: "/shop?department=Men's%20Ethnic" },
              { label: "Accessories", link: "/shop?department=Men's%20Accessories" }
            ].map((chip) => (
              <Link
                key={chip.label}
                to={chip.link}
                className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-white/10 hover:bg-[#C5A880] hover:text-black border border-white/15 transition backdrop-blur-xs"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-2">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex space-x-1.5 px-2">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentSlide === i ? 'w-6 bg-[#C5A880]' : 'w-2 bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % BANNERS.length)}
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
