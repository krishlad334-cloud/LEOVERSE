// 100% Pure Menswear Seed Data for LEOVERSE Men's Fashion E-Commerce Platform
// Strictly menswear: Shirts, Trousers, Suiting, Streetwear, Ethnic, Footwear & Accessories

export const seedCategories = [
  {
    id: "cat-men-shirts",
    name: "Shirts & Polos",
    slug: "shirts-polos",
    department: "Men's Apparel",
    subcategories: JSON.stringify(["French Flax Linen", "Oxford Formal", "Camp Collar Resort", "Supima Cotton Tees"]),
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    itemCount: 8
  },
  {
    id: "cat-men-trousers",
    name: "Trousers & Chinos",
    slug: "trousers-chinos",
    department: "Men's Tailoring",
    subcategories: JSON.stringify(["Forward-Pleat Trousers", "Linen Drawstrings", "Gurkha Trousers", "Relaxed Chinos"]),
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=800&q=80",
    itemCount: 6
  },
  {
    id: "cat-men-suiting",
    name: "Suits & Blazers",
    slug: "suits-blazers",
    department: "Men's Tailoring",
    subcategories: JSON.stringify(["Virgin Wool Blazers", "Satin Peak Tuxedos", "Double-Breasted Suits", "Waistcoats"]),
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    itemCount: 5
  },
  {
    id: "cat-men-streetwear",
    name: "Streetwear & Hoodies",
    slug: "streetwear-hoodies",
    department: "Men's Casuals",
    subcategories: JSON.stringify(["280 GSM Boxy Tees", "480 GSM Fleece Hoodies", "Baggy Denims", "Track Trousers"]),
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
    itemCount: 7
  },
  {
    id: "cat-men-ethnic",
    name: "Traditional Ethnic Wear",
    slug: "ethnic-wear",
    department: "Men's Ethnic",
    subcategories: JSON.stringify(["Artisan Kurta Pyjama", "Nehru Bundi Jackets", "Raw Silk Kurtas", "Embroidered Sherwanis"]),
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80",
    itemCount: 5
  },
  {
    id: "cat-men-winter",
    name: "Winter Coats & Knits",
    slug: "winter-outerwear",
    department: "Men's Outerwear",
    subcategories: JSON.stringify(["Virgin Boiled Wool Overcoats", "Cashmere Sweaters", "Suede Flight Jackets", "Shearling Coats"]),
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    itemCount: 6
  },
  {
    id: "cat-men-accessories",
    name: "Footwear & Accessories",
    slug: "accessories-footwear",
    department: "Men's Accessories",
    subcategories: JSON.stringify(["Blake-Stitched Penny Loafers", "Swiss Chronographs", "Tuscan Leather Duffles", "Bifold Wallets"]),
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    itemCount: 8
  }
];

export const seedProducts = [
  {
    id: "prod-men-01",
    name: "The Riviera Camp Collar Linen Shirt",
    brand: "ATELIER LEO",
    department: "Men's Apparel",
    category: "Shirts & Polos",
    categorySlug: "shirts-polos",
    subcategory: "French Flax Linen",
    mrp: 3499,
    sellingPrice: 2449,
    stock: 24,
    sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
    colors: JSON.stringify([
      { name: "Sand Ecru", hex: "#E3DAC9" },
      { name: "Riviera Blue", hex: "#7393B3" },
      { name: "Olive Sage", hex: "#708238" }
    ]),
    description: "Crafted from 100% pre-washed French flax linen for an airy, featherweight drape. Designed with an effortless convertible camp collar and genuine shell buttons.",
    details: JSON.stringify([
      "100% Normandy French flax linen (160 GSM)",
      "Convertible retro Cuban camp collar",
      "Side-vented straight hem tailored to wear untucked",
      "Genuine Australian mother-of-pearl buttons"
    ]),
    fabricCare: "100% Linen. Machine wash cold gentle. Hang dry in shade.",
    fit: "Relaxed Boxy Fit",
    tags: JSON.stringify(["linen", "shirt", "summer", "resort", "bestseller"]),
    rating: 4.9,
    reviewCount: 68,
    isPublished: 1,
    isFeatured: 1,
    isNew: 1,
    isBestSeller: 1,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=900&q=80"
    ],
    videos: [
      {
        url: "/videos/runway-men.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
        title: "Atelier Riviera Linen Shirt Runway Clip",
        duration: 18
      }
    ]
  },
  {
    id: "prod-men-02",
    name: "Architectural Virgin Wool Blazer",
    brand: "LEOVERSE BLACK",
    department: "Men's Tailoring",
    category: "Suits & Blazers",
    categorySlug: "suits-blazers",
    subcategory: "Virgin Wool Blazers",
    mrp: 9999,
    sellingPrice: 6999,
    stock: 12,
    sizes: JSON.stringify(["38R", "40R", "42R", "44R"]),
    colors: JSON.stringify([
      { name: "Charcoal Melange", hex: "#36454F" },
      { name: "Midnight Navy", hex: "#1B1F38" }
    ]),
    description: "Impeccably tailored from Super 120s Italian virgin wool with natural shoulder construction, horn buttons, and cupro half-lining for year-round ease.",
    details: JSON.stringify([
      "100% Italian Virgin Wool (Super 120s)",
      "Unstructured soft shoulder for relaxed modern drape",
      "Mother-of-pearl horn buttons with working surgeon cuffs",
      "Dry clean only"
    ]),
    fabricCare: "100% Virgin Wool. Professional dry clean only.",
    fit: "Modern Structured Tailoring",
    tags: JSON.stringify(["blazer", "wool", "tailoring", "formal", "luxury"]),
    rating: 4.8,
    reviewCount: 34,
    isPublished: 1,
    isFeatured: 1,
    isNew: 0,
    isBestSeller: 1,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80"
    ],
    videos: [
      {
        url: "/videos/hero-fashion-male.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        title: "Virgin Wool Blazer Tailoring Motion",
        duration: 22
      }
    ]
  },
  {
    id: "prod-men-03",
    name: "Heavyweight 280 GSM Oversized Boxy Tee",
    brand: "LEOVERSE STREET",
    department: "Men's Casuals",
    category: "Streetwear & Hoodies",
    categorySlug: "streetwear-hoodies",
    subcategory: "280 GSM Boxy Tees",
    mrp: 2199,
    sellingPrice: 1499,
    stock: 4,
    sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
    colors: JSON.stringify([
      { name: "Burgundy Oxide", hex: "#5C1D24" },
      { name: "Washed Slate", hex: "#4A525A" },
      { name: "Bone White", hex: "#EFECE6" }
    ]),
    description: "Constructed with ultra-dense 280 GSM combed cotton. Features dropped shoulders, a compact high-rib collar that will never bacon, and a relaxed boxy cut.",
    details: JSON.stringify([
      "280 GSM 100% Combed Compact Cotton",
      "Thick 1.25-inch high-rib bound collar",
      "Drop shoulder architecture with wide elbow-length sleeves",
      "Pre-shrunk garment dyed"
    ]),
    fabricCare: "100% Cotton. Machine wash inside-out cold. Tumble dry low.",
    fit: "Oversized Boxy Silhouette",
    tags: JSON.stringify(["streetwear", "heavyweight", "boxy-tee", "trending"]),
    rating: 4.8,
    reviewCount: 92,
    isPublished: 1,
    isFeatured: 1,
    isNew: 1,
    isBestSeller: 1,
    images: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
    ],
    videos: [
      {
        url: "/videos/runway-casual.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
        title: "LEOVERSE Streetwear Studio Reel",
        duration: 15
      }
    ]
  },
  {
    id: "prod-men-04",
    name: "Tailored Forward-Pleat Gurkha Trousers",
    brand: "ATELIER LEO",
    department: "Men's Tailoring",
    category: "Trousers & Chinos",
    categorySlug: "trousers-chinos",
    subcategory: "Forward-Pleat Trousers",
    mrp: 3999,
    sellingPrice: 2899,
    stock: 18,
    sizes: JSON.stringify(["30", "32", "34", "36", "38"]),
    colors: JSON.stringify([
      { name: "British Tan", hex: "#A57143" },
      { name: "Onyx Black", hex: "#1A1A1A" },
      { name: "Oatmeal Cream", hex: "#DFD8CA" }
    ]),
    description: "Classic double forward pleats with a generous high rise and gentle taper towards the hem. Tailored with adjustable side tabs and extended waistband tab.",
    details: JSON.stringify([
      "Twill weave stretch cotton blend (98% Cotton, 2% Elastane)",
      "Gurkha-style side tab adjusters - belt loops omitted for clean line",
      "Blind-hemmed 1.5-inch turn-up cuff"
    ]),
    fabricCare: "Dry clean or wash cold delicate. Warm iron on reverse.",
    fit: "High Rise Relaxed Taper",
    tags: JSON.stringify(["trousers", "pleated", "formal", "chinos"]),
    rating: 4.7,
    reviewCount: 29,
    isPublished: 1,
    isFeatured: 0,
    isNew: 0,
    isBestSeller: 1,
    images: [
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80"
    ],
    videos: []
  },
  {
    id: "prod-men-05",
    name: "Handcrafted Raw Silk Kurta & Bundi Jacket Set",
    brand: "LEOVERSE VIRASAT",
    department: "Men's Ethnic",
    category: "Traditional Ethnic Wear",
    categorySlug: "ethnic-wear",
    subcategory: "Nehru Bundi Jackets",
    mrp: 8499,
    sellingPrice: 5999,
    stock: 14,
    sizes: JSON.stringify(["38", "40", "42", "44"]),
    colors: JSON.stringify([
      { name: "Champagne Ochre", hex: "#C8A165" },
      { name: "Royal Ivory", hex: "#FDFBF7" }
    ]),
    description: "Handcrafted pure raw silk kurta paired with an exquisitely tailored Nehru collar Bundi waistcoat with antique brass coin buttons and churidar.",
    details: JSON.stringify([
      "100% Handloom Matka Silk",
      "Mandarin collar with subtle bullion zardozi piping",
      "Includes 3 pieces: Kurta, Bundi Jacket, and Cotton Silk Churidar",
      "Dry clean only"
    ]),
    fabricCare: "Dry clean only to maintain raw silk luster.",
    fit: "Regal Tailored Silhouette",
    tags: JSON.stringify(["ethnic", "kurta", "wedding", "festive", "silk"]),
    rating: 4.9,
    reviewCount: 41,
    isPublished: 1,
    isFeatured: 1,
    isNew: 1,
    isBestSeller: 1,
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    videos: [
      {
        url: "/videos/runway-lookbook.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=80",
        title: "Artisan Silk Menswear Festive Reel",
        duration: 20
      }
    ]
  },
  {
    id: "prod-men-06",
    name: "Boiled Virgin Wool Raglan Overcoat",
    brand: "LEOVERSE BLACK",
    department: "Men's Outerwear",
    category: "Winter Coats & Knits",
    categorySlug: "winter-outerwear",
    subcategory: "Virgin Boiled Wool Overcoats",
    mrp: 13999,
    sellingPrice: 9999,
    stock: 9,
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    colors: JSON.stringify([
      { name: "Camel Tan", hex: "#C19A6B" },
      { name: "Charcoal Heather", hex: "#2C3539" }
    ]),
    description: "Substantial 650 GSM boiled virgin wool tailored with relaxed raglan sleeves, horn buttons, deep welt pockets, and a dramatic back storm vent.",
    details: JSON.stringify([
      "100% Boiled Virgin Wool (650 GSM)",
      "Raglan shoulder construction for unrestricted layering",
      "Full cupro Bemberg lining",
      "Real buffalo horn buttons"
    ]),
    fabricCare: "Professional dry clean only. Store on wooden hanger.",
    fit: "Architectural Oversized Overcoat",
    tags: JSON.stringify(["overcoat", "wool", "winter", "luxury", "outerwear"]),
    rating: 4.9,
    reviewCount: 27,
    isPublished: 1,
    isFeatured: 1,
    isNew: 1,
    isBestSeller: 1,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80"
    ],
    videos: [
      {
        url: "/videos/hero-fashion-male.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
        title: "Virgin Wool Overcoat Runway Movement",
        duration: 22
      }
    ]
  },
  {
    id: "prod-men-07",
    name: "Atelier Chronograph 316L Steel Watch",
    brand: "LEOVERSE HOROLOGY",
    department: "Men's Accessories",
    category: "Footwear & Accessories",
    categorySlug: "accessories-footwear",
    subcategory: "Swiss Chronographs",
    mrp: 14999,
    sellingPrice: 9999,
    stock: 8,
    sizes: JSON.stringify(["40mm Standard"]),
    colors: JSON.stringify([
      { name: "Sunray Silver", hex: "#C0C0C0" },
      { name: "Obsidian Black", hex: "#1C1C1C" },
      { name: "Rose Gold Trim", hex: "#B76E79" }
    ]),
    description: "Swiss precision quartz movement housed in a surgical-grade 316L stainless steel case. Features anti-reflective sapphire crystal glass and 100M water resistance.",
    details: JSON.stringify([
      "316L Marine-grade stainless steel case & link bracelet",
      "Scratch-resistant Sapphire crystal with anti-reflective coating",
      "Triple sub-dial chronograph with date window",
      "10 ATM / 100 meters water resistance"
    ]),
    fabricCare: "Wipe with microfibre cloth. Pressure test annually.",
    fit: "40mm Case / 20mm Lug Width",
    tags: JSON.stringify(["watch", "accessories", "luxury", "chronograph"]),
    rating: 4.9,
    reviewCount: 88,
    isPublished: 1,
    isFeatured: 1,
    isNew: 1,
    isBestSeller: 1,
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80"
    ],
    videos: [
      {
        url: "/videos/runway-lookbook.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
        title: "Atelier Chronograph 360 Close-up",
        duration: 18
      }
    ]
  },
  {
    id: "prod-men-08",
    name: "Full-Grain Tuscan Leather Weekender Duffle",
    brand: "LEOVERSE ATELIER",
    department: "Men's Accessories",
    category: "Footwear & Accessories",
    categorySlug: "accessories-footwear",
    subcategory: "Tuscan Leather Duffles",
    mrp: 12999,
    sellingPrice: 8499,
    stock: 7,
    sizes: JSON.stringify(["45L Cabin Approved"]),
    colors: JSON.stringify([
      { name: "Cognac Brown", hex: "#9A463D" },
      { name: "Midnight Black", hex: "#111111" }
    ]),
    description: "Handcrafted in Florence from vegetable-tanned full-grain Tuscan calfskin that patinas beautifully over years of travel. Features solid antique brass hardware and reinforced base studs.",
    details: JSON.stringify([
      "100% Certified Tuscan vegetable-tanned full-grain leather",
      "Heavy duty YKK Excella two-way metal zippers",
      "Detachable padded shoulder strap and dual rolled handles",
      "Interior padded 16-inch laptop compartment and shoe garage"
    ]),
    fabricCare: "Condition with leather balm twice yearly. Store in included dustbag.",
    fit: "52cm x 30cm x 28cm (Cabin Approved)",
    tags: JSON.stringify(["leather", "bag", "duffle", "travel", "luxury"]),
    rating: 4.9,
    reviewCount: 52,
    isPublished: 1,
    isFeatured: 1,
    isNew: 0,
    isBestSeller: 1,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80"
    ],
    videos: []
  },
  {
    id: "prod-men-09",
    name: "Handcrafted Italian Leather Penny Loafers",
    brand: "LEOVERSE CALZATURA",
    department: "Men's Accessories",
    category: "Footwear & Accessories",
    categorySlug: "accessories-footwear",
    subcategory: "Blake-Stitched Penny Loafers",
    mrp: 7999,
    sellingPrice: 5299,
    stock: 16,
    sizes: JSON.stringify(["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"]),
    colors: JSON.stringify([
      { name: "Espresso Burnished", hex: "#3D2B1F" },
      { name: "Caviar Black", hex: "#1B1B1B" }
    ]),
    description: "Traditional Blake-stitched construction with supple boxcalf leather and leather soles with rubber injection inserts for all-weather traction.",
    details: JSON.stringify([
      "Blake-welted construction for flexibility and recraftability",
      "Hand-burnished Italian boxcalf leather upper",
      "Breathable full glove-leather lining",
      "Cushioned memory foam arch support"
    ]),
    fabricCare: "Clean with horsehair brush and polish with wax cream.",
    fit: "True to Size (Standard Width)",
    tags: JSON.stringify(["loafers", "shoes", "leather", "formal"]),
    rating: 4.8,
    reviewCount: 63,
    isPublished: 1,
    isFeatured: 1,
    isNew: 1,
    isBestSeller: 1,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"
    ],
    videos: []
  }
];

export const seedOrders = [
  {
    id: "ord-1001",
    orderNumber: "LVO-84920",
    visitorId: "v_101",
    customerName: "Aarav Sharma",
    customerEmail: "aarav.sharma@example.com",
    customerPhone: "+91 98765 43210",
    shippingAddress: "42 Golf Links, New Delhi, 110003",
    paymentMethod: "UPI / PhonePe",
    paymentStatus: "Paid",
    subtotal: 9448,
    discount: 500,
    shippingFee: 0,
    totalAmount: 8948,
    status: "Delivered",
    createdAt: new Date(Date.now() - 18 * 86400000).toISOString(),
    items: [
      { productId: "prod-men-01", productName: "The Riviera Camp Collar Linen Shirt", price: 2449, quantity: 1, size: "L", color: "Riviera Blue" },
      { productId: "prod-men-02", productName: "Architectural Virgin Wool Blazer", price: 6999, quantity: 1, size: "40R", color: "Midnight Navy" }
    ]
  },
  {
    id: "ord-1002",
    orderNumber: "LVO-84921",
    visitorId: "v_102",
    customerName: "Devendra Patel",
    customerEmail: "devendra.patel@example.com",
    customerPhone: "+91 98111 22334",
    shippingAddress: "B-302 Oberoi Woods, Goregaon East, Mumbai, 400063",
    paymentMethod: "Credit Card (HDFC)",
    paymentStatus: "Paid",
    subtotal: 8898,
    discount: 800,
    shippingFee: 0,
    totalAmount: 8098,
    status: "Delivered",
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    items: [
      { productId: "prod-men-04", productName: "Tailored Forward-Pleat Gurkha Trousers", price: 2899, quantity: 1, size: "32", color: "British Tan" },
      { productId: "prod-men-05", productName: "Handcrafted Raw Silk Kurta & Bundi Jacket Set", price: 5999, quantity: 1, size: "40", color: "Champagne Ochre" }
    ]
  },
  {
    id: "ord-1003",
    orderNumber: "LVO-84922",
    visitorId: "v_103",
    customerName: "Rohan Kapoor",
    customerEmail: "rohan.kapoor@example.com",
    customerPhone: "+91 99887 76655",
    shippingAddress: "Penthouse 14, Prestige Silver Oak, Whitefield, Bengaluru, 560066",
    paymentMethod: "Credit Card (Amex)",
    paymentStatus: "Paid",
    subtotal: 18498,
    discount: 1500,
    shippingFee: 0,
    totalAmount: 16998,
    status: "Delivered",
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
    items: [
      { productId: "prod-men-07", productName: "Atelier Chronograph 316L Steel Watch", price: 9999, quantity: 1, size: "40mm Standard", color: "Sunray Silver" },
      { productId: "prod-men-08", productName: "Full-Grain Tuscan Leather Weekender Duffle", price: 8499, quantity: 1, size: "45L Cabin Approved", color: "Cognac Brown" }
    ]
  },
  {
    id: "ord-1004",
    orderNumber: "LVO-84923",
    visitorId: "v_104",
    customerName: "Vikram Singhania",
    customerEmail: "vikram.s@example.com",
    customerPhone: "+91 98200 11223",
    shippingAddress: "Flat 12A, Regency Towers, Alipore, Kolkata, 700027",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    subtotal: 7748,
    discount: 800,
    shippingFee: 0,
    totalAmount: 6948,
    status: "Processing",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    items: [
      { productId: "prod-men-01", productName: "The Riviera Camp Collar Linen Shirt", price: 2449, quantity: 1, size: "M", color: "Sand Ecru" },
      { productId: "prod-men-09", productName: "Handcrafted Italian Leather Penny Loafers", price: 5299, quantity: 1, size: "UK 9", color: "Espresso Burnished" }
    ]
  }
];

export const seedReviews = [
  {
    id: "rev-01",
    productId: "prod-men-01",
    userName: "Siddharth Malhotra",
    rating: 5,
    title: "Incredible drape and breathable linen",
    comment: "The French flax feels substantial yet completely airy. Wore it to a coastal sundowner in Goa and got several compliments on the camp collar cut.",
    verifiedPurchase: 1,
    likesCount: 14,
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString()
  },
  {
    id: "rev-02",
    productId: "prod-men-01",
    userName: "Devendra Patel",
    rating: 5,
    title: "Pure luxury menswear tailoring",
    comment: "Noticeably higher quality than standard high street linen shirts. The mother-of-pearl buttons are authentic and the stitch density is top notch.",
    verifiedPurchase: 1,
    likesCount: 9,
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString()
  },
  {
    id: "rev-03",
    productId: "prod-men-02",
    userName: "Karan Johar B.",
    rating: 5,
    title: "Superb virgin wool blazer",
    comment: "The Super 120s wool drape is immaculate. Perfect for boardroom presentations as well as evening cocktails. Fits true to size.",
    verifiedPurchase: 1,
    likesCount: 22,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: "rev-04",
    productId: "prod-men-07",
    userName: "Sameer Nanda",
    rating: 5,
    title: "Comparable to 50k luxury timepieces",
    comment: "The sapphire glass clarity and sunray dial finish are phenomenal. Solid screw links with zero rattle. Heavy and prestigious.",
    verifiedPurchase: 1,
    likesCount: 31,
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString()
  }
];
