import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DEPARTMENTS = [
  {
    id: "tailoring",
    name: "Men's Tailoring & Suiting",
    dept: "Men's Tailoring",
    tagline: "Super 120s Virgin Wool Blazers, Tuxedos & Pleated Trousers",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    badge: "ATELIER EDIT",
    subcategories: ["Virgin Wool Blazers", "Satin Peak Tuxedos", "Forward-Pleat Trousers", "Double-Breasted Suits"]
  },
  {
    id: "apparel",
    name: "Men's Casuals & Linens",
    dept: "Men's Apparel",
    tagline: "French Flax Linen, Cuban Camp Collars & Supima Tees",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
    badge: "RIVIERA LINEN",
    subcategories: ["French Flax Linen", "Oxford Formals", "Resort Camp Collars", "Relaxed Chinos"]
  },
  {
    id: "ethnic",
    name: "Traditional Ethnic Wear",
    dept: "Men's Ethnic",
    tagline: "Handcrafted Raw Silk Kurtas, Nehru Bundis & Sherwanis",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80",
    badge: "ROYAL HERITAGE",
    subcategories: ["Raw Silk Kurtas", "Nehru Bundi Jackets", "Hand-Embroidered Sets", "Sherwanis"]
  },
  {
    id: "accessories",
    name: "Footwear & Accessories",
    dept: "Men's Accessories",
    tagline: "Blake Loafers, Swiss Chronographs & Tuscan Calfskin",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    badge: "SWISS & TUSCAN",
    subcategories: ["Blake Penny Loafers", "Swiss Chronographs", "Tuscan Leather Duffles", "Silk Ties"]
  }
];

export const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#A68962] dark:text-[#C5A880] block mb-1">
            Curated Menswear Ateliers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#1E1E1E] dark:text-white">
            Shop by Wardrobe Department.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
            Distinct ateliers for Bespoke Tailoring, French Linens, Heritage Ethnic, and Handcrafted Accessories.
          </p>
        </div>

        <Link
          to="/shop"
          className="text-xs uppercase tracking-[0.14em] font-bold text-[#1E1E1E] dark:text-gray-200 hover:text-[#A68962] dark:hover:text-[#C5A880] border-b-2 border-[#1E1E1E] dark:border-gray-400 pb-1 transition-colors inline-flex items-center space-x-1"
        >
          <span>Explore Entire Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Large Department Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DEPARTMENTS.map((dept) => (
          <Link
            key={dept.id}
            to={`/shop?department=${encodeURIComponent(dept.dept)}`}
            className="group flex flex-col bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] hover:border-[#A68962] dark:hover:border-[#C5A880] rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] bg-[#EAE5DC] dark:bg-[#202026] overflow-hidden">
              <img
                src={dept.image}
                alt={dept.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Department Badge */}
              <span className="absolute top-3 left-3 bg-[#C5A880] text-black text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                {dept.badge}
              </span>

              {/* Title on Image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-serif font-bold">{dept.name}</h3>
                <p className="text-[11px] text-gray-200 line-clamp-1 mt-0.5">{dept.tagline}</p>
              </div>
            </div>

            {/* Subcategories pill footer */}
            <div className="p-4 bg-white dark:bg-[#18181C] flex flex-col justify-between flex-1 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {dept.subcategories.map((sub, i) => (
                  <span key={i} className="text-[10px] bg-[#F8F6F2] dark:bg-[#202026] text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded font-medium border border-[#EBE6DD] dark:border-[#2A2A34]">
                    {sub}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-[#27272A] flex items-center justify-between text-xs font-bold text-[#A68962] dark:text-[#C5A880] group-hover:text-black dark:group-hover:text-white transition">
                <span>View Atelier</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
