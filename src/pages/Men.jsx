import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Tag,
  Clock,
  ShieldCheck,
  RotateCcw,
  Truck,
  CreditCard,
  Percent,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { getProductCatalog, subscribeCatalogUpdates } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import Breadcrumb from '../components/common/Breadcrumb';
import RecentlyViewedSection from '../components/home/RecentlyViewedSection';

const HERO_SLIDES = [
  {
    tag: 'THE MENSWEAR STATEMENT • SS26',
    title: 'ARCHITECTURAL TAILORING & SARTORIAL',
    desc: 'Structured double-breasted blazers, horn-button jackets, and Italian wool dinner suits crafted for the modern gentleman.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=85',
    link: '/products?department=Men&subcategory=Suits+%26+Blazers',
    cta: 'Explore Suits & Blazers'
  },
  {
    tag: 'RIVIERA SUMMER EDIT',
    title: 'FRENCH FLAX LINENS & MANDARIN COLLARS',
    desc: 'Pre-washed pure European linen shirts, drawstring chinos, and breezy resortwear tailored for effortless summer luxury.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1800&q=85',
    link: '/products?department=Men&subcategory=Shirts',
    cta: 'Shop Linen Shirts'
  },
  {
    tag: 'PRESTIGE FOOTWEAR VAULT',
    title: 'HANDCRAFTED CALFSKIN & MARGOM SOLES',
    desc: 'Minimalist low-top sneakers and Goodyear-welted burnished loafers handcrafted by master artisans in Florence.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1800&q=85',
    link: '/products?department=Men&subcategory=Sneakers',
    cta: 'Shop Footwear Vault'
  }
];

const MEN_CIRCULAR_CATEGORIES = [
  {
    name: 'Casual Shirts',
    sub: 'Shirts',
    img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
    offer: 'Min 30% Off'
  },
  {
    name: 'T-Shirts & Polos',
    sub: 'T-Shirts',
    img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    offer: 'Flat 40% Off'
  },
  {
    name: 'Jeans & Denim',
    sub: 'Jeans',
    img: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80',
    offer: 'Up to 50% Off'
  },
  {
    name: 'Tailored Trousers',
    sub: 'Trousers',
    img: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80',
    offer: 'Min 25% Off'
  },
  {
    name: 'Suits & Blazers',
    sub: 'Suits & Blazers',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    offer: 'Up to 40% Off'
  },
  {
    name: 'Italian Sneakers',
    sub: 'Sneakers',
    img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    offer: 'Flat 30% Off'
  },
  {
    name: 'Formal Shoes',
    sub: 'Formal Shoes',
    img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80',
    offer: 'Min 35% Off'
  },
  {
    name: 'Timepieces',
    sub: 'Watches & Accessories',
    img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    offer: 'Luxury Edits'
  }
];

const WARDROBE_EDITS = [
  {
    title: 'Old Money Aesthetic',
    subtitle: 'Understated Luxury & Neutral Earth Tones',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80',
    link: '/products?department=Men&category=Casual+Wear',
    tag: 'TRENDING NOW'
  },
  {
    title: 'Riviera Resortwear',
    subtitle: 'Breathable Linens & Coastal Silhouettes',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    link: '/products?department=Men&subcategory=Shirts',
    tag: 'SUMMER DROP'
  },
  {
    title: 'Boardroom Sartorial',
    subtitle: 'Double-Breasted Blazers & Crisp Poplins',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    link: '/products?department=Men&subcategory=Suits+%26+Blazers',
    tag: 'POWER DRESSING'
  },
  {
    title: 'Modern Streetweavers',
    subtitle: 'Heavyweight Selvedge & Vintage Washes',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    link: '/products?department=Men&subcategory=Jeans',
    tag: 'URBAN CULTURE'
  }
];

const BRAND_SPOTLIGHT = [
  { name: 'Atelier Leo', badge: 'Min 30% Off', bg: '#2C4152', text: '#FFFFFF', sub: 'Couture Tailoring' },
  { name: 'Riviera Studio', badge: 'Flat 40% Off', bg: '#D5A249', text: '#2C4152', sub: 'Flax & Resortwear' },
  { name: 'Royale Heritage', badge: 'Up to 50% Off', bg: '#1E2D3A', text: '#FFFFFF', sub: 'Festive & Silks' },
  { name: 'Streetweavers', badge: 'Min 25% Off', bg: '#3D405B', text: '#FFFFFF', sub: 'Selvedge Denim' },
  { name: 'Bespoke Sartorial', badge: 'Flat 35% Off', bg: '#4A5568', text: '#FFFFFF', sub: 'Footwear & Belts' },
  { name: 'AeroSport', badge: 'Up to 45% Off', bg: '#2B2D42', text: '#FFFFFF', sub: 'Performance Knit' },
];

const BUDGET_STORES = [
  { label: 'Under ₹1,499', filter: 'maxPrice=1499', desc: 'Everyday Polos & Tees' },
  { label: 'Under ₹2,499', filter: 'maxPrice=2499', desc: 'Premium Linen Shirts' },
  { label: 'Under ₹4,999', filter: 'maxPrice=4999', desc: 'Denim & Court Sneakers' },
  { label: 'Luxury Collectibles', filter: 'minPrice=5000', desc: 'Blazers & Chronographs' },
];

export const Men = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredMen, setFeaturedMen] = useState([]);
  const [newDrops, setNewDrops] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);
  const [countdown, setCountdown] = useState({ hours: 5, minutes: 42, seconds: 18 });

  // Slide Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Flash Sale Countdown
  useEffect(() => {
    const clock = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  // Load Products with real-time update subscription from Admin Studio
  useEffect(() => {
    const refreshCatalog = () => {
      const featured = getProductCatalog({ department: 'Men', filterType: 'bestseller', limit: 8 });
      setFeaturedMen(featured.products);

      const newest = getProductCatalog({ department: 'Men', filterType: 'new', limit: 8 });
      setNewDrops(newest.products);

      const deals = getProductCatalog({ department: 'Men', discountMin: 25, limit: 4 });
      setDealProducts(deals.products);
    };

    refreshCatalog();
    const unsubscribe = subscribeCatalogUpdates(refreshCatalog);
    return () => unsubscribe();
  }, []);

  const breadcrumbs = [{ label: 'Men' }];

  return (
    <div className="space-y-12 pb-20 bg-[#F5F5F5] dark:bg-[#121A21] text-[#2C4152] dark:text-[#F5F5F5] transition-colors">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* 1. AJIO-Style Hero Carousel */}
      <section className="relative overflow-hidden bg-[#2C4152] text-white">
        <div className="relative min-h-[440px] sm:min-h-[540px] flex items-center">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center brightness-[0.55]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2C4152] via-[#2C4152]/70 to-transparent" />

              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-16">
                <div className="max-w-2xl space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#D5A249] text-[#2C4152]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{slide.tag}</span>
                  </span>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight font-serif">
                    {slide.title}
                  </h1>

                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light max-w-lg">
                    {slide.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      to={slide.link}
                      className="px-6 py-3 rounded-lg bg-[#D5A249] text-[#2C4152] font-bold text-xs uppercase tracking-wider hover:bg-[#E4BA68] transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      to="/products?department=Men"
                      className="px-6 py-3 rounded-lg bg-white/15 backdrop-blur-md border border-white/30 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/25 transition-all"
                    >
                      View All Menswear
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicator Dots & Arrows */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide ? 'w-8 bg-[#D5A249]' : 'w-2 bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-[#D5A249] hover:text-[#2C4152] transition-colors hidden sm:block"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-[#D5A249] hover:text-[#2C4152] transition-colors hidden sm:block"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 2. AJIO-Style Bank Offer Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#1A232C] rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#D5A249]/20 text-[#2C4152] dark:text-[#D5A249] rounded-xl shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#2C4152] text-white uppercase">
                  BANK SPECIAL
                </span>
                <span className="text-xs font-bold text-[#2C4152] dark:text-white">
                  10% Instant Discount on HDFC / ICICI / AXIS Cards*
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Plus use code <span className="font-mono font-bold text-[#D5A249] bg-[#D5A249]/10 px-1 py-0.5 rounded">LUXE15</span> for an extra 15% off on orders above ₹2,999.
              </p>
            </div>
          </div>

          <Link
            to="/products?department=Men&discountMin=20"
            className="px-4 py-2 rounded-lg bg-[#2C4152] dark:bg-[#D5A249] text-white dark:text-[#2C4152] text-xs font-bold uppercase tracking-wider hover:bg-[#1E2D3A] dark:hover:bg-[#E4BA68] transition-colors shrink-0"
          >
            Shop Offers
          </Link>
        </div>
      </div>

      {/* 3. Shop Men By Category (Iconic Circular Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5A249]">
              Wardrobe Categories
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2C4152] dark:text-white mt-0.5">
              Explore Menswear Categories
            </h2>
          </div>
          <Link
            to="/products?department=Men"
            className="text-xs font-bold text-[#2C4152] dark:text-gray-300 hover:text-[#D5A249] flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {MEN_CIRCULAR_CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={`/products?department=Men&subcategory=${encodeURIComponent(cat.sub)}`}
              className="group flex flex-col items-center text-center p-3 bg-white dark:bg-[#1A232C] rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#D5A249] transition-all shadow-2xs hover:shadow-sm"
            >
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 p-0.5 border border-gray-200 dark:border-gray-700 group-hover:border-[#D5A249] transition-colors">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition duration-500"
                />
              </div>
              <span className="text-xs font-bold text-[#2C4152] dark:text-gray-100 group-hover:text-[#D5A249] transition-colors mt-2 line-clamp-1">
                {cat.name}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded mt-1">
                {cat.offer}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. AJIO Flash Deal of the Day Rail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#2C4152] to-[#1E2D3A] text-white shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#D5A249] text-[#2C4152] font-bold">
                <Percent className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5A249]">
                  LIMITED TIME FLASH EVENT
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif tracking-wide text-white">
                  Steal Deals of the Day (30% - 60% OFF)
                </h3>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-1.5 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Clock className="w-4 h-4 text-[#D5A249]" />
              <span>Ends in:</span>
              <span className="font-mono text-[#D5A249]">
                {String(countdown.hours).padStart(2, '0')}h : {String(countdown.minutes).padStart(2, '0')}m : {String(countdown.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            {dealProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Wardrobe Curations & Occasion Edits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-gray-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5A249]">
              Curated Looks
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2C4152] mt-0.5">
              The Menswear Capsule Edits
            </h2>
          </div>
          <Link
            to="/products?department=Men"
            className="text-xs font-bold text-[#2C4152] hover:text-[#D5A249] flex items-center gap-1"
          >
            <span>Explore All Looks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WARDROBE_EDITS.map((edit, idx) => (
            <Link
              key={idx}
              to={edit.link}
              className="group relative rounded-xl overflow-hidden aspect-4/5 bg-gray-900 shadow-xs border border-gray-200 flex flex-col justify-end p-5"
            >
              <img
                src={edit.image}
                alt={edit.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="relative z-10 space-y-1">
                <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-[#D5A249] text-[#2C4152] inline-block mb-1">
                  {edit.tag}
                </span>
                <h3 className="text-lg font-bold text-white font-serif group-hover:text-[#D5A249] transition-colors">
                  {edit.title}
                </h3>
                <p className="text-xs text-gray-300 font-light">
                  {edit.subtitle}
                </p>
                <span className="text-xs font-bold text-white group-hover:text-[#D5A249] inline-flex items-center gap-1 pt-1">
                  <span>Shop Capsule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Brand Spotlight Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-gray-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5A249]">
              Fashion Houses
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2C4152] mt-0.5">
              Top Menswear Brands In Spotlight
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BRAND_SPOTLIGHT.map((b, idx) => (
            <Link
              key={idx}
              to={`/products?department=Men&brand=${encodeURIComponent(b.name)}`}
              className="p-4 rounded-xl text-center flex flex-col justify-between items-center transition-all hover:scale-102 shadow-2xs group"
              style={{ backgroundColor: b.bg, color: b.text }}
            >
              <div className="py-2">
                <h4 className="text-sm font-serif font-bold tracking-wider uppercase group-hover:text-[#D5A249] transition-colors">
                  {b.name}
                </h4>
                <span className="text-[10px] opacity-75">{b.sub}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D5A249] text-[#2C4152] mt-2">
                {b.badge}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Budget / Price Point Stores */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BUDGET_STORES.map((store, idx) => (
            <Link
              key={idx}
              to={`/products?department=Men&${store.filter}`}
              className="p-5 rounded-xl bg-white dark:bg-[#1A232C] border border-gray-200 dark:border-gray-800 hover:border-[#D5A249] transition-all shadow-2xs group"
            >
              <span className="text-[10px] font-bold uppercase text-[#D5A249] tracking-wider block">
                PRICE STORE
              </span>
              <h3 className="text-lg font-bold font-serif text-[#2C4152] dark:text-white group-hover:text-[#D5A249] transition-colors mt-0.5">
                {store.label}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{store.desc}</p>
              <span className="text-xs font-bold text-[#2C4152] dark:text-gray-300 inline-flex items-center gap-1 mt-3">
                <span>Browse Store</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D5A249]" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. Men's Bestsellers Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5A249]">
              Customer Favorites
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2C4152] dark:text-white mt-0.5">
              Men's Bestselling Pieces
            </h2>
          </div>
          <Link
            to="/products?department=Men&sort=bestselling"
            className="text-xs font-bold text-[#2C4152] dark:text-gray-300 hover:text-[#D5A249] flex items-center gap-1"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredMen.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 9. Fresh SS26 Runway Drops */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5A249]">
              Fresh Off The Runway
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2C4152] dark:text-white mt-0.5">
              New Men's Arrivals
            </h2>
          </div>
          <Link
            to="/products?department=Men&sort=newest"
            className="text-xs font-bold text-[#2C4152] dark:text-gray-300 hover:text-[#D5A249] flex items-center gap-1"
          >
            <span>Discover All New</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newDrops.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 10. Recently Viewed Products Rail */}
      <RecentlyViewedSection />

      {/* 11. AJIO Trust & Assurance Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-[#1A232C] border border-gray-200 dark:border-gray-800 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#2C4152]/10 dark:bg-white/10 text-[#2C4152] dark:text-[#D5A249]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#2C4152] dark:text-white block">100% Genuine</span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">Handpicked Quality Assured</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D5A249]/20 text-[#2C4152] dark:text-[#D5A249]">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#2C4152] dark:text-white block">15-Day Returns</span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">Hassle-Free Return / Exchange</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#2C4152]/10 dark:bg-white/10 text-[#2C4152] dark:text-[#D5A249]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#2C4152] dark:text-white block">Free Express Delivery</span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">On all orders above ₹1,199</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D5A249]/20 text-[#2C4152] dark:text-[#D5A249]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#2C4152] dark:text-white block">Secure Payments</span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">UPI, Cards, NetBanking, COD</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Men;
