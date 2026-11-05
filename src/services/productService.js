import { products as initialProducts } from '../data/products';
import { categories as initialCategories } from '../data/categories';
import { subscribeToPublishedProducts } from './firebase';

// Enhanced initial product catalog incorporating existing products + modern fashion additions
const SUPPLEMENTAL_PRODUCTS = [
  // --- MEN'S FOOTWEAR ---
  {
    id: "leo-foot-01",
    name: "Minimalist Italian Calfskin Low Sneakers",
    subtitle: "Handcrafted in Florence • Margom Rubber Sole",
    brand: "Riviera Studio",
    department: "Men",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    subcategory: "Sneakers",
    price: 6990,
    salePrice: 4890,
    discountPercent: 30,
    colors: [
      { name: "Monochrome White", hex: "#FFFFFF" },
      { name: "Pebble Grey", hex: "#C0BFBA" },
      { name: "Midnight Black", hex: "#1B1B1E" }
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Sleek low-profile court sneakers crafted from full-grain Italian calf leather with padded leather lining and durable stitched Margom cupsole.",
    details: [
      "100% Full-grain Florentine calfskin upper",
      "Stitched Italian rubber outsole for longevity",
      "Soft antimicrobial calfskin interior lining",
      "Waxed tonal cotton laces with metal aglets"
    ],
    fabricCare: "Wipe with damp cloth. Nourish periodically with leather balm.",
    fabric: "Genuine Leather",
    fit: "True to Size",
    occasion: "Casual",
    rating: 4.9,
    reviewCount: 56,
    stock: 14,
    isNew: true,
    isBestSeller: true,
    badge: "HERITAGE SNEAKER",
    featuredOrder: 50,
    inStock: true,
    tags: ["shoes", "sneakers", "leather", "white sneaker", "footwear", "luxury"]
  },
  {
    id: "leo-foot-02",
    name: "Burnished Penny Loafers in Antiqued Cognac",
    subtitle: "Goodyear Welted • Full-Grain French Calf",
    brand: "Bespoke Sartorial",
    department: "Men",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    subcategory: "Formal Shoes",
    price: 9490,
    salePrice: 7590,
    discountPercent: 20,
    colors: [
      { name: "Cognac Brown", hex: "#7E482C" },
      { name: "Espresso", hex: "#382923" }
    ],
    sizes: ["41", "42", "43", "44"],
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Traditional Goodyear-welted penny loafers with hand-burnished crust calfskin and a stacked oak bark-tanned leather sole.",
    details: [
      "Goodyear welt construction, resoleable",
      "Hand-antiqued patina finish",
      "Stacked leather heel with brass nail accents",
      "Padded leather insole for all-day comfort"
    ],
    fabricCare: "Use cedar shoe trees. Condition with saphir cream.",
    fabric: "French Calfskin",
    fit: "Regular Dress Fit",
    occasion: "Formal",
    rating: 4.8,
    reviewCount: 31,
    stock: 8,
    isNew: false,
    isBestSeller: true,
    badge: "HAND-BURNISHED",
    featuredOrder: 45,
    inStock: true,
    tags: ["shoes", "loafers", "formal", "leather", "wedding", "dress shoes"]
  },

  // --- ACCESSORIES ---
  {
    id: "leo-acc-01",
    name: "The Atelier Automatic Chronograph 40mm",
    subtitle: "Sapphire Crystal • Italian Leather Strap",
    brand: "Atelier Leo",
    department: "Accessories",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    subcategory: "Watches & Accessories",
    price: 15990,
    salePrice: 11990,
    discountPercent: 25,
    colors: [
      { name: "Sunburst Silver", hex: "#D8D8D8" },
      { name: "Emerald Sunray", hex: "#1C3C30" }
    ],
    sizes: ["40mm"],
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"
    ],
    description: "A refined mechanical chronograph timepiece featuring dual subdials, anti-reflective domed sapphire crystal, and vegetable-tanned Tuscan leather strap.",
    details: [
      "40mm 316L Surgical Grade Stainless Steel Case",
      "Double-domed scratch-resistant Sapphire Crystal",
      "Automatic mechanical movement with 42h power reserve",
      "5 ATM / 50 meters water resistance"
    ],
    fabricCare: "Wipe with microfiber cloth. Avoid steam environments.",
    fabric: "316L Steel & Leather",
    fit: "Adjustable 40mm",
    occasion: "Formal",
    rating: 4.9,
    reviewCount: 64,
    stock: 9,
    isNew: true,
    isBestSeller: true,
    badge: "TIMEPIECE",
    featuredOrder: 60,
    inStock: true,
    tags: ["watch", "accessories", "chronograph", "automatic", "luxury"]
  },
  {
    id: "leo-acc-02",
    name: "Architectural Acetate Sunglasses",
    subtitle: "Mazzucchelli Acetate • Polarized Carl Zeiss Lenses",
    brand: "Riviera Studio",
    department: "Accessories",
    category: "Summer Wear",
    categorySlug: "summer-wear",
    subcategory: "Watches & Accessories",
    price: 3490,
    salePrice: 2490,
    discountPercent: 28,
    colors: [
      { name: "Havana Tortoise", hex: "#4A3525" },
      { name: "Obsidian Black", hex: "#1B1B1E" }
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Bold bevelled-edge shades handcrafted from Italian Mazzucchelli acetate with 100% UVA/UVB polarized Carl Zeiss optic lenses.",
    details: [
      "Italian custom cured acetate frame",
      "German 5-barrel riveted hinges",
      "Zeiss CR-39 scratch resistant polarized lenses",
      "Includes hard travel case and microfiber cloth"
    ],
    fabricCare: "Clean with microfiber and lens spray.",
    fabric: "Acetate",
    fit: "Universal Fit",
    occasion: "Summer",
    rating: 4.7,
    reviewCount: 29,
    stock: 18,
    isNew: false,
    isBestSeller: true,
    badge: "ZEISS OPTICS",
    featuredOrder: 35,
    inStock: true,
    tags: ["sunglasses", "eyewear", "accessories", "summer", "beach"]
  },

  // --- WOMEN'S CAPSULE ---
  {
    id: "leo-wom-01",
    name: "Tailored Double-Breasted Linen Blazer",
    subtitle: "100% European Flax • Mother of Pearl Buttons",
    brand: "Atelier Leo",
    department: "Women",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    subcategory: "Jackets & Coats",
    price: 5490,
    salePrice: 4290,
    discountPercent: 22,
    colors: [
      { name: "Bone White", hex: "#F3EFE6" },
      { name: "Sage Mist", hex: "#9DAAA2" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    description: "An unstructured, effortless double-breasted silhouette tailored from pre-washed European flax linen with peak lapels and horn buttons.",
    details: [
      "100% Breathable European linen",
      "Subtle shoulder padding for sharp silhouette",
      "Fully lined in breathable viscose",
      "Double back vent"
    ],
    fabricCare: "Dry clean only or gentle hand wash cold.",
    fabric: "100% Linen",
    fit: "Relaxed Tailored",
    occasion: "Formal",
    rating: 4.9,
    reviewCount: 38,
    stock: 12,
    isNew: true,
    isBestSeller: true,
    badge: "WOMEN'S ATELIER",
    featuredOrder: 70,
    inStock: true,
    tags: ["women", "blazer", "linen", "formal", "jacket"]
  },
  {
    id: "leo-wom-02",
    name: "Pure Mulberry Silk Slip Midi Dress",
    subtitle: "19 Momme Grade 6A Silk • Bias Cut Draped Silhouette",
    brand: "Royale Heritage",
    department: "Women",
    category: "Party Wear",
    categorySlug: "party-wear",
    subcategory: "Dresses",
    price: 6490,
    salePrice: 4990,
    discountPercent: 23,
    colors: [
      { name: "Champagne Gold", hex: "#E7D8C5" },
      { name: "Noir Black", hex: "#1C1C1E" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Cut on the bias for a liquid fluid drape, our 19 momme Mulberry silk slip dress flows naturally over contours with delicate adjustable straps.",
    details: [
      "100% Mulberry Silk 19 Momme Grade 6A",
      "Bias cut for natural fluid contour",
      "Adjustable silk spaghetti straps",
      "Side slit for ease of movement"
    ],
    fabricCare: "Dry clean or hand wash with silk detergent.",
    fabric: "Pure Silk",
    fit: "Fluid Bias Fit",
    occasion: "Party",
    rating: 4.8,
    reviewCount: 47,
    stock: 10,
    isNew: true,
    isBestSeller: true,
    badge: "PURE SILK",
    featuredOrder: 65,
    inStock: true,
    tags: ["women", "silk", "dress", "party", "luxury"]
  },

  // --- KIDS CAPSULE ---
  {
    id: "leo-kid-01",
    name: "Organic Cotton Henley Tee & Linen Shorts Set",
    subtitle: "GOTS Certified Organic • Gentle On Young Skin",
    brand: "Urban Minimal",
    department: "Kids",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    subcategory: "Boys Clothing",
    price: 2490,
    salePrice: 1790,
    discountPercent: 28,
    colors: [
      { name: "Oat & Olive", hex: "#8A947A" },
      { name: "Navy & White", hex: "#232F3E" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Two-piece relaxed set featuring a soft slub cotton henley shirt paired with breathable elasticated linen shorts.",
    details: [
      "100% GOTS certified organic combed cotton",
      "Pre-washed pure linen shorts with soft elastic waist",
      "Wooden button accents",
      "Reinforced knee seams for active play"
    ],
    fabricCare: "Machine wash warm, tumble dry gentle.",
    fabric: "Organic Cotton & Linen",
    fit: "Comfort Kids Fit",
    occasion: "Casual",
    rating: 4.9,
    reviewCount: 22,
    stock: 15,
    isNew: true,
    isBestSeller: false,
    badge: "ORGANIC SET",
    featuredOrder: 40,
    inStock: true,
    tags: ["kids", "boys", "organic", "linen", "summer", "set"]
  }
];

// Helper to determine brand name for existing products if missing
function resolveBrand(product) {
  if (product.brand) return product.brand;
  const name = product.name.toLowerCase();
  const cat = (product.category || '').toLowerCase();
  if (cat.includes('ethnic') || cat.includes('wedding')) return 'Royale Heritage';
  if (cat.includes('street') || name.includes('oversized') || name.includes('hoodie')) return 'Streetweavers';
  if (cat.includes('summer') || cat.includes('beach') || name.includes('camp collar') || name.includes('linen')) return 'Riviera Studio';
  if (cat.includes('formal') || name.includes('blazer') || name.includes('suit')) return 'Bespoke Sartorial';
  if (cat.includes('sport') || name.includes('track') || name.includes('gym')) return 'AeroSport';
  return 'Atelier Leo';
}

// Helper to resolve subcategory
function resolveSubcategory(product) {
  if (product.subcategory) return product.subcategory;
  const name = (product.name || '').toLowerCase();
  if (name.includes('dress') || name.includes('saree') || name.includes('anarkali') || name.includes('lehenga') || name.includes('frock')) return 'Dresses';
  if (name.includes('top') || name.includes('blouse')) return 'Tops & Blouses';
  if (name.includes('romper') || name.includes('baby') || name.includes('toddler')) return 'Baby & Toddler';
  if (name.includes('t-shirt') || name.includes('tee')) return 'T-Shirts';
  if (name.includes('shirt')) return 'Shirts';
  if (name.includes('jean') || name.includes('denim')) return 'Jeans';
  if (name.includes('trouser') || name.includes('chino') || name.includes('pant') || name.includes('jogger')) return 'Trousers';
  if (name.includes('blazer') || name.includes('suit') || name.includes('tuxedo')) return 'Suits & Blazers';
  if (name.includes('jacket') || name.includes('coat') || name.includes('overshirt') || name.includes('bomber') || name.includes('trench')) return 'Jackets & Coats';
  if (name.includes('hoodie') || name.includes('sweat')) return 'Hoodies & Sweats';
  if (name.includes('kurta') || name.includes('sherwani') || name.includes('bundi') || name.includes('nehru')) return 'Ethnic Wear';
  if (name.includes('short') || name.includes('swim')) return 'Shorts';
  if (name.includes('sneaker')) return 'Sneakers';
  if (name.includes('shoe') || name.includes('loafer') || name.includes('boot') || name.includes('heel') || name.includes('flat') || name.includes('mule')) return 'Formal Shoes';
  if (name.includes('watch') || name.includes('glass') || name.includes('belt') || name.includes('wallet') || name.includes('bag') || name.includes('duffle')) return 'Watches & Accessories';
  return 'Clothing';
}

// Combine and normalize all products
const ALL_RAW_PRODUCTS = [
  ...initialProducts.map((p) => {
    const brand = resolveBrand(p);
    const subcategory = resolveSubcategory(p);
    const mrp = p.price || 2490;
    const salePrice = p.salePrice || mrp;
    const discount = mrp > salePrice ? Math.round(((mrp - salePrice) / mrp) * 100) : 0;
    return {
      ...p,
      brand,
      department: p.department || 'Men',
      subcategory,
      mrp,
      price: mrp,
      salePrice,
      sellingPrice: salePrice,
      discountPercent: discount,
      discount: discount,
      stock: p.stock !== undefined ? p.stock : (p.inStock ? 16 : 0),
      isFeatured: p.isBestSeller || p.featuredOrder > 20,
      isNew: p.isNew ?? false,
      isBestSeller: p.isBestSeller ?? false,
      rating: p.rating || 4.7,
      reviewCount: p.reviewCount || 28,
      isPublished: true,
    };
  }),
  ...SUPPLEMENTAL_PRODUCTS.map((p) => ({ ...p, isPublished: true }))
];

// Reactive Dynamic Catalog connected to Firebase Firestore
let dynamicProducts = [...ALL_RAW_PRODUCTS];

if (typeof window !== 'undefined') {
  subscribeToPublishedProducts((firestoreProducts) => {
    if (firestoreProducts && firestoreProducts.length > 0) {
      const mapped = firestoreProducts.map((p) => {
        const mrp = Number(p.price || p.mrp || 2490);
        const salePrice = Number(p.salePrice || p.sellingPrice || mrp);
        const discount = Number(
          p.discountPercent || p.discount || (mrp > salePrice ? Math.round(((mrp - salePrice) / mrp) * 100) : 0)
        );
        return {
          ...p,
          brand: p.brand || resolveBrand(p),
          department: p.department || 'Men',
          subcategory: p.subcategory || resolveSubcategory(p),
          mrp,
          price: mrp,
          salePrice,
          sellingPrice: salePrice,
          discountPercent: discount,
          discount,
          stock: p.stock !== undefined ? Number(p.stock) : 12,
          inStock: (p.stock !== undefined ? Number(p.stock) : 12) > 0,
          isPublished: p.isPublished !== false,
          rating: Number(p.rating || 4.8),
          reviewCount: Number(p.reviewCount || 16),
        };
      });

      const fsMap = new Map(mapped.map((p) => [p.id, p]));
      dynamicProducts = [
        ...mapped,
        ...ALL_RAW_PRODUCTS.filter((baseP) => !fsMap.has(baseP.id)),
      ];
      window.dispatchEvent(new CustomEvent('leoverse:products_updated', { detail: dynamicProducts }));
    }
  });
}

/**
 * Listen to real-time catalog changes (add, edit, toggle from Admin Studio)
 */
export function subscribeCatalogUpdates(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = (e) => callback(e.detail || dynamicProducts);
  window.addEventListener('leoverse:products_updated', handler);
  return () => window.removeEventListener('leoverse:products_updated', handler);
}

// In-memory / localStorage storage keys
const RECENTLY_VIEWED_KEY = 'leoverse_recently_viewed';
const ORDERS_KEY = 'leoverse_orders';
const ADDRESSES_KEY = 'leoverse_addresses';

export const BRANDS = [
  'Atelier Leo',
  'Royale Heritage',
  'Riviera Studio',
  'Urban Minimal',
  'Streetweavers',
  'Bespoke Sartorial',
  'AeroSport'
];

export const DEPARTMENTS = ['Men', 'Women', 'Kids', 'Accessories'];

export const MEGA_MENU_CONFIG = {
  men: {
    title: 'Men',
    href: '/men',
    columns: [
      {
        title: 'Clothing',
        items: [
          { label: 'T-Shirts & Polos', href: '/products?department=Men&subcategory=T-Shirts' },
          { label: 'Casual & Linen Shirts', href: '/products?department=Men&subcategory=Shirts' },
          { label: 'Jeans & Denim', href: '/products?department=Men&subcategory=Jeans' },
          { label: 'Tailored Trousers & Chinos', href: '/products?department=Men&subcategory=Trousers' },
          { label: 'Jackets & Coats', href: '/products?department=Men&subcategory=Jackets+%26+Coats' },
          { label: 'Suits & Blazers', href: '/products?department=Men&subcategory=Suits+%26+Blazers' },
          { label: 'Ethnic Kurtas & Bundis', href: '/products?department=Men&subcategory=Ethnic+Wear' }
        ]
      },
      {
        title: 'Footwear',
        items: [
          { label: 'Sneakers & Trainers', href: '/products?department=Men&subcategory=Sneakers' },
          { label: 'Formal Shoes & Loafers', href: '/products?department=Men&subcategory=Formal+Shoes' },
          { label: 'Casual Sliders & Sandals', href: '/products?department=Men&subcategory=Footwear' }
        ]
      },
      {
        title: 'Accessories',
        items: [
          { label: 'Luxury Chronographs', href: '/products?department=Accessories&subcategory=Watches+%26+Accessories' },
          { label: 'Italian Leather Belts & Wallets', href: '/products?department=Accessories' },
          { label: 'Polarized Sunglasses', href: '/products?department=Accessories' }
        ]
      },
      {
        title: 'Shop By Occasion',
        items: [
          { label: 'Riviera Summer Edit', href: '/category/summer-wear' },
          { label: 'Boardroom Formal', href: '/category/formal-wear' },
          { label: 'Wedding & Royal Festive', href: '/category/wedding-wear' },
          { label: 'Streetwear Culture', href: '/category/streetwear' },
          { label: 'High-Altitude Winter', href: '/category/winter-wear' }
        ]
      }
    ],
    featuredPromo: {
      tag: 'NEW LAUNCH',
      title: 'Summer Linen Capsule',
      desc: '100% French flax linen shirts & relaxed pleated chinos.',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
      link: '/category/summer-wear'
    }
  },
  women: {
    title: 'Women',
    href: '/women',
    columns: [
      {
        title: 'Apparel',
        items: [
          { label: 'Silk & Linen Dresses', href: '/products?department=Women&subcategory=Dresses' },
          { label: 'Tops & Silk Blouses', href: '/products?department=Women&subcategory=Tops+%26+Blouses' },
          { label: 'Tailored Blazers & Coats', href: '/products?department=Women&subcategory=Jackets+%26+Coats' },
          { label: 'Wide-Leg Trousers', href: '/products?department=Women&subcategory=Trousers' }
        ]
      },
      {
        title: 'Ethnic & Festive',
        items: [
          { label: 'Banarasi Sarees', href: '/products?department=Women&subcategory=Ethnic+Wear' },
          { label: 'Chanderi Anarkali Sets', href: '/products?department=Women&subcategory=Ethnic+Wear' },
          { label: 'Festive Lehengas', href: '/products?department=Women&subcategory=Ethnic+Wear' }
        ]
      },
      {
        title: 'Footwear & Bags',
        items: [
          { label: 'Leather Heels & Mules', href: '/products?department=Women&subcategory=Footwear' },
          { label: 'Italian Calfskin Handbags', href: '/products?department=Accessories' },
          { label: 'Hand-Woven Raffia Totes', href: '/products?department=Accessories' }
        ]
      }
    ],
    featuredPromo: {
      tag: 'FEATURED DROP',
      title: 'Silk & Tailoring',
      desc: 'Fluid silk slips paired with sharp architectural blazers.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      link: '/women'
    }
  },
  kids: {
    title: 'Kids',
    href: '/kids',
    columns: [
      {
        title: 'Boys Clothing',
        items: [
          { label: 'Polo & Chino Sets', href: '/products?department=Kids&subcategory=Boys+Clothing' },
          { label: 'Linen Shirts & Shorts', href: '/products?department=Kids&subcategory=Boys+Clothing' },
          { label: 'Festive Silk Kurtas', href: '/products?department=Kids&subcategory=Boys+Clothing' }
        ]
      },
      {
        title: 'Girls Clothing',
        items: [
          { label: 'Eyelet Cotton Sundresses', href: '/products?department=Kids&subcategory=Girls+Clothing' },
          { label: 'Linen Tiered Frocks', href: '/products?department=Kids&subcategory=Girls+Clothing' },
          { label: 'Pastel Festive Lehengas', href: '/products?department=Kids&subcategory=Girls+Clothing' }
        ]
      },
      {
        title: 'Baby & Footwear',
        items: [
          { label: 'Bamboo Muslin Rompers', href: '/products?department=Kids&subcategory=Baby+%26+Toddler' },
          { label: 'Soft-Sole First Walkers', href: '/products?department=Kids&subcategory=Kids+Footwear' },
          { label: 'Canvas Slip-On Shoes', href: '/products?department=Kids&subcategory=Kids+Footwear' }
        ]
      }
    ],
    featuredPromo: {
      tag: 'GOTS ORGANIC',
      title: 'Gentle Pure Cottons',
      desc: 'Breathable, chemical-free sets for active little explorers.',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
      link: '/kids'
    }
  },
  accessories: {
    title: 'Accessories',
    href: '/products?department=Accessories',
    columns: [
      {
        title: 'Timepieces',
        items: [
          { label: 'Automatic Chronographs', href: '/products?department=Accessories' },
          { label: 'Minimalist Dress Watches', href: '/products?department=Accessories' },
          { label: 'Italian Leather Straps', href: '/products?department=Accessories' }
        ]
      },
      {
        title: 'Eyewear',
        items: [
          { label: 'Handcrafted Acetate Shades', href: '/products?department=Accessories' },
          { label: 'Polarized Aviators', href: '/products?department=Accessories' },
          { label: 'Wayfarer Classics', href: '/products?department=Accessories' }
        ]
      },
      {
        title: 'Leather Goods',
        items: [
          { label: 'Weekender Duffle Bags', href: '/products?department=Accessories' },
          { label: 'Bifold Cardholders & Wallets', href: '/products?department=Accessories' },
          { label: 'Full Grain Leather Belts', href: '/products?department=Accessories' }
        ]
      }
    ],
    featuredPromo: {
      tag: 'LUXURY ESSENTIALS',
      title: 'Handcrafted Accessories',
      desc: 'Architectural chronographs, Carl Zeiss shades, and leather craft.',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
      link: '/products?department=Accessories'
    }
  }
};

/**
 * Service API: Get filtered, sorted, paginated products
 */
export function getProductCatalog(filters = {}) {
  const {
    department = 'All',
    category = 'All',
    subcategory = 'All',
    brand = 'All',
    minPrice = 0,
    maxPrice = Infinity,
    size = 'All',
    color = 'All',
    discountMin = 0,
    ratingMin = 0,
    inStockOnly = false,
    search = '',
    filterType = 'all', // 'new', 'bestseller', 'sale', 'featured'
    sort = 'featured', // 'featured', 'price-asc', 'price-desc', 'newest', 'discount', 'rating', 'bestselling'
    page = 1,
    limit = 12
  } = filters;

  let list = dynamicProducts.filter((p) => p.isPublished !== false);

  // 1. Department filter
  if (department && department !== 'All') {
    list = list.filter((p) => p.department && p.department.toLowerCase() === department.toLowerCase());
  }

  // 2. Category filter
  if (category && category !== 'All') {
    const target = category.toLowerCase();
    list = list.filter((p) =>
      (p.category && p.category.toLowerCase() === target) ||
      (p.categorySlug && p.categorySlug.toLowerCase() === target)
    );
  }

  // 3. Subcategory filter
  if (subcategory && subcategory !== 'All') {
    const targetSub = subcategory.toLowerCase();
    list = list.filter((p) => p.subcategory && p.subcategory.toLowerCase() === targetSub);
  }

  // 4. Brand filter (supports array or string)
  if (brand && brand !== 'All') {
    const brandArr = Array.isArray(brand) ? brand.map(b => b.toLowerCase()) : [brand.toLowerCase()];
    if (brandArr.length > 0) {
      list = list.filter((p) => p.brand && brandArr.includes(p.brand.toLowerCase()));
    }
  }

  // 5. Size filter (supports array or string)
  if (size && size !== 'All') {
    const sizeArr = Array.isArray(size) ? size : [size];
    if (sizeArr.length > 0) {
      list = list.filter((p) => p.sizes && p.sizes.some((s) => sizeArr.includes(s)));
    }
  }

  // 6. Color filter (supports array or string)
  if (color && color !== 'All') {
    const colorArr = Array.isArray(color) ? color.map(c => c.toLowerCase()) : [color.toLowerCase()];
    if (colorArr.length > 0) {
      list = list.filter((p) =>
        p.colors && p.colors.some((c) => colorArr.includes((typeof c === 'object' ? c.name : c).toLowerCase()))
      );
    }
  }

  // 7. Price range
  list = list.filter((p) => {
    const price = p.sellingPrice ?? p.salePrice ?? p.price;
    return price >= minPrice && price <= maxPrice;
  });

  // 8. Discount minimum
  if (discountMin > 0) {
    list = list.filter((p) => (p.discountPercent || p.discount || 0) >= discountMin);
  }

  // 9. Rating minimum
  if (ratingMin > 0) {
    list = list.filter((p) => (p.rating || 0) >= ratingMin);
  }

  // 10. In stock only
  if (inStockOnly) {
    list = list.filter((p) => p.inStock && (p.stock === undefined || p.stock > 0));
  }

  // 11. Special filter type
  if (filterType === 'new') list = list.filter((p) => p.isNew);
  if (filterType === 'bestseller') list = list.filter((p) => p.isBestSeller);
  if (filterType === 'sale') list = list.filter((p) => (p.discountPercent || 0) > 0);
  if (filterType === 'featured') list = list.filter((p) => p.isFeatured);

  // 12. Search query (multi-field matching)
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand && p.brand.toLowerCase().includes(q);
      const matchCat = p.category && p.category.toLowerCase().includes(q);
      const matchSub = p.subcategory && p.subcategory.toLowerCase().includes(q);
      const matchDesc = p.description && p.description.toLowerCase().includes(q);
      const matchTags = p.tags && p.tags.some((t) => t.toLowerCase().includes(q));
      return matchName || matchBrand || matchCat || matchSub || matchDesc || matchTags;
    });
  }

  // 13. Sorting
  switch (sort) {
    case 'price-asc':
      list.sort((a, b) => (a.sellingPrice ?? a.salePrice ?? a.price) - (b.sellingPrice ?? b.salePrice ?? b.price));
      break;
    case 'price-desc':
      list.sort((a, b) => (b.sellingPrice ?? b.salePrice ?? b.price) - (a.sellingPrice ?? a.salePrice ?? a.price));
      break;
    case 'newest':
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id.localeCompare(a.id));
      break;
    case 'discount':
      list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
      break;
    case 'rating':
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'bestselling':
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      break;
    case 'featured':
    default:
      list.sort((a, b) => (b.featuredOrder || 0) - (a.featuredOrder || 0));
      break;
  }

  const totalCount = list.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const paginatedProducts = list.slice(offset, offset + limit);

  return {
    products: paginatedProducts,
    allMatching: list,
    totalCount,
    totalPages,
    currentPage: page,
    limit
  };
}

/**
 * Get product by ID or Slug
 */
export function getProductByIdOrSlug(idOrSlug) {
  if (!idOrSlug) return null;
  const match = dynamicProducts.find(
    (p) =>
      p.id === idOrSlug ||
      p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === idOrSlug
  );
  return match || null;
}

/**
 * Get all categories
 */
export function getAllCategories() {
  return initialCategories;
}

/**
 * Recently Viewed Storage
 */
export function getRecentlyViewed() {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!raw) return [];
    const ids = JSON.parse(raw);
    if (!Array.isArray(ids)) return [];
    return ids
      .map((id) => ALL_RAW_PRODUCTS.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, 8);
  } catch {
    return [];
  }
}

export function recordProductView(productId) {
  if (!productId) return;
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    let ids = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(ids)) ids = [];
    ids = [productId, ...ids.filter((id) => id !== productId)].slice(0, 10);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error('Failed to record product view', err);
  }
}

/**
 * Saved Addresses Management
 */
const DEFAULT_ADDRESSES = [
  {
    id: "addr-01",
    name: "Dev Sharma",
    phone: "+91 98765 43210",
    addressLine1: "Flat 402, Highmont Residences",
    addressLine2: "Off Linking Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    isDefault: true,
    tag: "Home"
  },
  {
    id: "addr-02",
    name: "Dev Sharma",
    phone: "+91 98765 43210",
    addressLine1: "Tower B, Level 14, Prestige Tech Park",
    addressLine2: "Outer Ring Road, Kadubeesanahalli",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
    isDefault: false,
    tag: "Office"
  }
];

export function getSavedAddresses() {
  try {
    const raw = localStorage.getItem(ADDRESSES_KEY);
    if (!raw) {
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(DEFAULT_ADDRESSES));
      return DEFAULT_ADDRESSES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ADDRESSES;
  }
}

export function saveAddress(newAddr) {
  try {
    const current = getSavedAddresses();
    let updated;
    if (newAddr.id) {
      updated = current.map((a) => (a.id === newAddr.id ? { ...a, ...newAddr } : a));
    } else {
      const generated = {
        ...newAddr,
        id: `addr-${Date.now()}`
      };
      if (generated.isDefault) {
        updated = [generated, ...current.map((a) => ({ ...a, isDefault: false }))];
      } else {
        updated = [generated, ...current];
      }
    }
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save address', err);
    return [];
  }
}

export function deleteAddress(addressId) {
  try {
    const current = getSavedAddresses();
    const updated = current.filter((a) => a.id !== addressId);
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete address', err);
    return [];
  }
}

/**
 * Orders Management
 */
const DEFAULT_STORED_ORDERS = [
  {
    orderId: 'LEO-2026-8941',
    date: 'October 28, 2026',
    status: 'In Transit',
    trackingNumber: 'DEL-IND-994821',
    courier: 'Bluedart Express Air',
    estimatedDelivery: 'November 8, 2026',
    total: 5880,
    paymentMethod: 'UPI / QR Code',
    shippingAddress: 'Flat 402, Highmont Residences, Bandra West, Mumbai - 400050',
    items: [
      {
        id: 'leo-str-01',
        productId: 'leo-str-01',
        name: 'The Essential Oversized Boxy Tee',
        selectedColor: 'Burgundy Wine',
        selectedSize: 'L',
        price: 1990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'leo-str-02',
        productId: 'leo-str-02',
        name: 'The Heavyweight Street Stripe Hoodie',
        selectedColor: 'Jet Black',
        selectedSize: 'XL',
        price: 3890,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

export function getCustomerOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(DEFAULT_STORED_ORDERS));
      return DEFAULT_STORED_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_STORED_ORDERS;
  } catch {
    return DEFAULT_STORED_ORDERS;
  }
}

export function saveCustomerOrder(order) {
  try {
    const current = getCustomerOrders();
    const updated = [order, ...current];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return order;
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
    return order;
  }
}

export function getCustomerOrderById(orderId) {
  const orders = getCustomerOrders();
  return orders.find((o) => o.orderId === orderId || o.orderId.toLowerCase() === (orderId || '').toLowerCase()) || null;
}

export function getLiveProducts() {
  return dynamicProducts;
}

export default {
  ALL_RAW_PRODUCTS,
  getLiveProducts,
  BRANDS,
  DEPARTMENTS,
  MEGA_MENU_CONFIG,
  getProductCatalog,
  getProductByIdOrSlug,
  getAllCategories,
  getRecentlyViewed,
  recordProductView,
  getSavedAddresses,
  saveAddress,
  deleteAddress,
  getCustomerOrders,
  saveCustomerOrder,
  getCustomerOrderById
};
