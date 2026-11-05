import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Percent, Tag, ShieldCheck } from 'lucide-react';
import { getProductCatalog, subscribeCatalogUpdates } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import Breadcrumb from '../components/common/Breadcrumb';

const WOMEN_CIRCULAR_CATEGORIES = [
  {
    name: 'Silk Slip Dresses',
    sub: 'Dresses',
    img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    offer: 'Min 25% Off'
  },
  {
    name: 'Tops & Blouses',
    sub: 'Tops & Blouses',
    img: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=600&q=80',
    offer: 'Flat 20% Off'
  },
  {
    name: 'Tailored Blazers',
    sub: 'Jackets & Coats',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    offer: 'Up to 30% Off'
  },
  {
    name: 'Ethnic & Festive',
    sub: 'Ethnic Wear',
    img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    offer: 'Min 30% Off'
  },
  {
    name: 'Wide-Leg Pants',
    sub: 'Trousers',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    offer: 'Flat 25% Off'
  },
  {
    name: 'Footwear & Heels',
    sub: 'Footwear',
    img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    offer: 'Up to 35% Off'
  }
];

export const Women = () => {
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    const refresh = () => {
      const res = getProductCatalog({ department: 'Women', limit: 40 });
      setWomenProducts(res.products);
    };
    refresh();
    const unsub = subscribeCatalogUpdates(refresh);
    return () => unsub();
  }, []);

  const breadcrumbs = [{ label: 'Women' }];

  return (
    <div className="space-y-10 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Hero Banner */}
      <section className="relative bg-[#1A1817] text-white overflow-hidden min-h-[460px] flex items-center border-b border-[#27272A]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1800&q=85"
            alt="Women's Collection"
            className="w-full h-full object-cover object-[center_35%] brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-[#E7D8C5]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WOMEN'S ATELIER CAPSULE SS26</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
              SILK & <br />
              <span className="text-[#E7D8C5]">TAILORING.</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">
              Fluid 19 momme Mulberry silk slip dresses, unstructured double-breasted European flax linen blazers, and architectural silhouettes.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/products?department=Women"
                className="px-6 py-3 bg-[#D5A249] text-[#2C4152] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#E4BA68] transition inline-flex items-center gap-2 shadow-md"
              >
                <span>Shop All Women</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Value Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#2C4152]/10 via-[#D5A249]/15 to-[#2C4152]/10 border border-[#D5A249]/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D5A249] text-[#2C4152] flex items-center justify-center font-bold">
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#2C4152] dark:text-white block">
                Women's Private Trunk Sale: Flat 15% Off with code LUXE15
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Complimentary luxury gift box packaging & doorstep alterations on all orders.
              </span>
            </div>
          </div>
          <Link
            to="/products?department=Women&discountMin=20"
            className="px-4 py-2 bg-[#2C4152] dark:bg-[#D5A249] text-white dark:text-[#2C4152] rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition"
          >
            Explore Offers
          </Link>
        </div>
      </div>

      {/* Circular Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5A249]">
              Curated Wardrobe
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2C4152] dark:text-white mt-0.5">
              Explore Women's Categories
            </h2>
          </div>
          <Link
            to="/products?department=Women"
            className="text-xs font-bold text-[#2C4152] dark:text-gray-300 hover:text-[#D5A249] flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {WOMEN_CIRCULAR_CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={`/products?department=Women&subcategory=${encodeURIComponent(cat.sub)}`}
              className="group flex flex-col items-center text-center p-3 rounded-2xl bg-white dark:bg-[#1A232C] border border-gray-200 dark:border-gray-800 hover:border-[#D5A249] hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-transparent group-hover:border-[#D5A249] transition-all mb-2">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 className="text-xs font-bold text-[#2C4152] dark:text-white group-hover:text-[#D5A249] transition-colors line-clamp-1">
                {cat.name}
              </h4>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {cat.offer}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#EAE5DC] dark:border-[#27272A]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5A249]">
              Curated Edits ({womenProducts.length} Pieces)
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#2C4152] dark:text-white mt-0.5">
              Featured Women's Styles
            </h2>
          </div>
          <Link
            to="/products?department=Women"
            className="text-xs font-bold uppercase tracking-wider text-[#D5A249] hover:underline flex items-center gap-1"
          >
            <span>View Full Filter View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {womenProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Women;
