// Expanded Multi-Category Fashion Catalog for LEOVERSE
// Incorporates Men (all categories), Women (all categories), and Kids (all categories)
// Inspired by AJIO layout, typography, tags, and rich product metadata

export const expandedProducts = [
  // ==========================================
  // MEN: FORMAL & CASUAL SHIRTS
  // ==========================================
  {
    id: "leo-men-sh-01",
    name: "The Parisian Poplin Oxford Formal Shirt",
    subtitle: "100% 2-Ply Long-Staple Giza Cotton • Non-Iron Finish",
    brand: "Bespoke Sartorial",
    department: "Men",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    subcategory: "Shirts",
    price: 3490,
    salePrice: 2490,
    discountPercent: 29,
    colors: [
      { name: "Crisp White", hex: "#FFFFFF" },
      { name: "Sky Azure", hex: "#BFD5E2" },
      { name: "French Pink", hex: "#EAD2D2" }
    ],
    sizes: ["38", "39", "40", "42", "44"],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Impeccably tailored from 100% 2-ply Egyptian Giza cotton with a spread collar engineered to frame a four-in-hand tie knot. Features mother-of-pearl buttons and rounded French cuffs.",
    details: [
      "100% Long-staple Egyptian Giza 87 cotton",
      "Semi-spread reinforced collar with removable brass stays",
      "Split back yoke for contoured shoulder movement",
      "Australian Mother-of-Pearl cross-stitched buttons"
    ],
    fabricCare: "100% Cotton. Warm machine wash. Medium iron or steam.",
    fabric: "Giza Cotton",
    fit: "Tailored Slim Fit",
    occasion: "Formal",
    rating: 4.9,
    reviewCount: 48,
    stock: 22,
    isNew: true,
    isBestSeller: true,
    badge: "GIZA LUXE",
    featuredOrder: 55,
    inStock: true,
    tags: ["shirt", "formal", "men", "oxford", "giza cotton", "workwear"]
  },
  {
    id: "leo-men-sh-02",
    name: "Mandarin Collar Silk-Linen Grandad Shirt",
    subtitle: "55% French Linen, 45% Mulberry Silk • Garment Dyed",
    brand: "Riviera Studio",
    department: "Men",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    subcategory: "Shirts",
    price: 3790,
    salePrice: 2890,
    discountPercent: 24,
    colors: [
      { name: "Natural Sage", hex: "#8A9A86" },
      { name: "Warm Ecru", hex: "#EBE3D5" },
      { name: "Midnight Navy", hex: "#1F2937" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "An understated band-collar shirt spun from a luxurious silk-linen blend that marries linen's organic crispness with silk's gentle luster and drape.",
    details: [
      "55% Pure French flax linen, 45% Mulberry silk",
      "Minimalist stand-up band collar (Grandad style)",
      "Curved hemline tailored for untucked styling",
      "Real shell buttons dyed to match fabric tone"
    ],
    fabricCare: "Gentle machine wash cold. Line dry in shade.",
    fabric: "Silk-Linen Blend",
    fit: "Relaxed Fit",
    occasion: "Casual",
    rating: 4.8,
    reviewCount: 36,
    stock: 18,
    isNew: true,
    isBestSeller: false,
    badge: "SILK LINEN",
    featuredOrder: 40,
    inStock: true,
    tags: ["shirt", "mandarin", "linen", "silk", "men", "summer"]
  },

  // ==========================================
  // MEN: T-SHIRTS & POLOS
  // ==========================================
  {
    id: "leo-men-tee-01",
    name: "Mercerized Supima Cotton Knit Polo",
    subtitle: "Double Mercerized 240 GSM • Genuine Shell Placket",
    brand: "Atelier Leo",
    department: "Men",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    subcategory: "T-Shirts",
    price: 2790,
    salePrice: 1990,
    discountPercent: 29,
    colors: [
      { name: "Rich Forest", hex: "#1C362B" },
      { name: "Bespoke Navy", hex: "#1E2B37" },
      { name: "Sand Gold", hex: "#D5A249" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Double mercerized American Supima cotton elevates this classic polo with silk-like sheen, incredible color depth, and anti-pill durability.",
    details: [
      "100% Extra-long staple American Supima cotton",
      "Double-mercerized silky finish",
      "Ribbed collar that holds its shape wash after wash",
      "Trocas shell 3-button placket"
    ],
    fabricCare: "Machine wash cold inside out. Reshape while damp.",
    fabric: "Supima Cotton",
    fit: "Tailored Fit",
    occasion: "Casual",
    rating: 4.9,
    reviewCount: 62,
    stock: 25,
    isNew: true,
    isBestSeller: true,
    badge: "SUPIMA LUXE",
    featuredOrder: 60,
    inStock: true,
    tags: ["polo", "t-shirt", "supima", "men", "knit polo", "classic"]
  },
  {
    id: "leo-men-tee-02",
    name: "Heavyweight 320 GSM Vintage Drop-Shoulder Tee",
    subtitle: "Combed Ring-Spun Cotton • Boxy Architectural Drape",
    brand: "Streetweavers",
    department: "Men",
    category: "Streetwear",
    categorySlug: "streetwear",
    subcategory: "T-Shirts",
    price: 2190,
    salePrice: 1590,
    discountPercent: 27,
    colors: [
      { name: "Washed Charcoal", hex: "#2B2A2E" },
      { name: "Bone White", hex: "#F2EFE8" },
      { name: "Vintage Olive", hex: "#484E3F" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Substantial 320 GSM combed cotton engineered for a bold streetwear silhouette. Features dropped shoulder seams, thick 1.2-inch collar ribbing, and blind-stitch hems.",
    details: [
      "320 GSM 100% Combed ring-spun cotton",
      "Pre-shrunk vintage garment washed",
      "Wide boxy streetwear cut with relaxed drape",
      "Tight dense 1.25-inch ribbed neckband"
    ],
    fabricCare: "Machine wash cold. Do not tumble dry high.",
    fabric: "Heavyweight Cotton",
    fit: "Oversized Boxy",
    occasion: "Casual",
    rating: 4.8,
    reviewCount: 44,
    stock: 30,
    isNew: false,
    isBestSeller: true,
    badge: "320 GSM HEAVY",
    featuredOrder: 45,
    inStock: true,
    tags: ["t-shirt", "oversized", "heavyweight", "streetwear", "men", "vintage"]
  },

  // ==========================================
  // MEN: JEANS & TROUSERS
  // ==========================================
  {
    id: "leo-men-bt-01",
    name: "Japanese Kurabo 14oz Selvedge Denim Jeans",
    subtitle: "Shuttle Loom Woven in Okayama • Red-Line Selvedge ID",
    brand: "Streetweavers",
    department: "Men",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    subcategory: "Jeans",
    price: 6490,
    salePrice: 4890,
    discountPercent: 25,
    colors: [
      { name: "Raw Indigo", hex: "#1A2538" },
      { name: "Black Selvedge", hex: "#151517" }
    ],
    sizes: ["30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Milled on vintage Toyoda shuttle looms in Kojima, Japan. 14oz raw selvedge denim that forms unique personalized fading and honeycomb whiskers with every wear.",
    details: [
      "14oz 100% Pure cotton Kurabo Japanese selvedge denim",
      "Classic red-line selvedge visible on turn-up cuffs",
      "Solid custom brass button fly and hidden pocket rivets",
      "Heavyweight natural veg-tan leather back patch"
    ],
    fabricCare: "Wear often, wash cold inside out, hang dry.",
    fabric: "Japanese Selvedge Denim",
    fit: "Straight Leg",
    occasion: "Casual",
    rating: 5.0,
    reviewCount: 39,
    stock: 14,
    isNew: true,
    isBestSeller: true,
    badge: "OKAYAMA SELVEDGE",
    featuredOrder: 70,
    inStock: true,
    tags: ["jeans", "denim", "selvedge", "japanese", "men", "raw denim"]
  },
  {
    id: "leo-men-bt-02",
    name: "Double-Pleated Italian Wool Trousers",
    subtitle: "Vitale Barberis Canonico Super 120s • Side Adjusters",
    brand: "Bespoke Sartorial",
    department: "Men",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    subcategory: "Trousers",
    price: 5990,
    salePrice: 4490,
    discountPercent: 25,
    colors: [
      { name: "Charcoal Grey", hex: "#3B3D43" },
      { name: "Caramel Camel", hex: "#9E7B58" },
      { name: "Midnight Navy", hex: "#1B2433" }
    ],
    sizes: ["30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "High-waisted sartorial trousers tailored in Biella, Italy with deep double forward pleats, brass side tab buckle adjusters, and a generous 2-inch turn-up cuff.",
    details: [
      "100% Super 120s Italian wool woven in Biella",
      "Extended waistband with tab fastening and zip fly",
      "Polished brass side cinch adjusters (no belt loops)",
      "Internal curtain waistband for all-day comfort"
    ],
    fabricCare: "Dry clean only. Hang on clamp hanger.",
    fabric: "Super 120s Wool",
    fit: "Tapered Pleated",
    occasion: "Formal",
    rating: 4.9,
    reviewCount: 31,
    stock: 16,
    isNew: true,
    isBestSeller: true,
    badge: "SARTORIAL PLEATS",
    featuredOrder: 65,
    inStock: true,
    tags: ["trousers", "pleated", "wool", "formal", "men", "sartorial"]
  },

  // ==========================================
  // MEN: SUITS & BLAZERS
  // ==========================================
  {
    id: "leo-men-sz-01",
    name: "Super 130s Virgin Wool Double-Breasted Blazer",
    subtitle: "Horn Buttons • Unstructured Half-Canvas Construction",
    brand: "Bespoke Sartorial",
    department: "Men",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    subcategory: "Suits & Blazers",
    price: 13990,
    salePrice: 9990,
    discountPercent: 29,
    colors: [
      { name: "Deep Navy", hex: "#182230" },
      { name: "Taupe Camel", hex: "#8F7D6B" }
    ],
    sizes: ["38R", "40R", "42R", "44R"],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
    ],
    description: "The pinnacle of masculine tailoring: a six-on-two double-breasted jacket with wide peak lapels, genuine buffalo horn buttons, and soft Neapolitan spalla camicia shoulders.",
    details: [
      "100% Super 130s Italian virgin wool",
      "Neapolitan shirred sleeve head for fluid arm mobility",
      "Half-canvas horsehair chest piece for custom mold",
      "Fully functional cuff surgeon buttons"
    ],
    fabricCare: "Dry clean only. Steam refresh between wears.",
    fabric: "100% Virgin Wool",
    fit: "Tailored Fit",
    occasion: "Formal",
    rating: 5.0,
    reviewCount: 27,
    stock: 10,
    isNew: true,
    isBestSeller: true,
    badge: "SUPER 130S",
    featuredOrder: 80,
    inStock: true,
    tags: ["blazer", "suit", "double-breasted", "wool", "formal", "men", "luxury"]
  },
  {
    id: "leo-men-sz-02",
    name: "Midnight Navy Satin Peak Lapel Tuxedo Suit",
    subtitle: "2-Piece Ensemble • Pure Wool with Silk Grosgrain Trims",
    brand: "Bespoke Sartorial",
    department: "Men",
    category: "Wedding Wear",
    categorySlug: "wedding-wear",
    subcategory: "Suits & Blazers",
    price: 18990,
    salePrice: 14990,
    discountPercent: 21,
    colors: [
      { name: "Midnight Navy", hex: "#131C29" },
      { name: "Formal Black", hex: "#111113" }
    ],
    sizes: ["38R", "40R", "42R", "44R"],
    images: [
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Architecturally cut for black-tie galas and weddings. Features silk grosgrain peak lapels, covered buttons, and trousers with a matching lateral side stripe.",
    details: [
      "100% Fine Italian worsted wool with silk lapels",
      "Single-button closure with silk grosgrain jetted pockets",
      "Trousers with satin side galon stripe",
      "Includes protective breathable garment travel bag"
    ],
    fabricCare: "Specialist dry clean only.",
    fabric: "Wool & Silk Satin",
    fit: "Formal Slim Fit",
    occasion: "Wedding",
    rating: 4.9,
    reviewCount: 35,
    stock: 8,
    isNew: false,
    isBestSeller: true,
    badge: "BLACK TIE",
    featuredOrder: 85,
    inStock: true,
    tags: ["tuxedo", "suit", "black tie", "wedding", "men", "formal"]
  },

  // ==========================================
  // MEN: JACKETS & OUTERWEAR
  // ==========================================
  {
    id: "leo-men-jk-01",
    name: "Suede Goat Leather Harrington Bomber Jacket",
    subtitle: "Velvety Soft Napped Suede • Ribbed Merino Wool Trim",
    brand: "Atelier Leo",
    department: "Men",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    subcategory: "Jackets & Coats",
    price: 12990,
    salePrice: 9490,
    discountPercent: 27,
    colors: [
      { name: "Cognac Tan", hex: "#945B38" },
      { name: "Espresso", hex: "#2E241E" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Crafted from hand-selected goat suede with an ultra-soft velvety nap. Finished with two-way antique brass zippers and ribbed 100% merino wool collar and cuffs.",
    details: [
      "100% Genuine full-grain goat suede",
      "Antiqued YKK Excella two-way front zip",
      "Smooth cupro lining with internal passport pocket",
      "Raglan shoulder construction for relaxed movement"
    ],
    fabricCare: "Specialist leather and suede clean only.",
    fabric: "Genuine Suede Leather",
    fit: "Regular Bomber",
    occasion: "Casual",
    rating: 4.9,
    reviewCount: 23,
    stock: 9,
    isNew: true,
    isBestSeller: false,
    badge: "GOAT SUEDE",
    featuredOrder: 65,
    inStock: true,
    tags: ["jacket", "bomber", "suede", "leather", "outerwear", "men"]
  },

  // ==========================================
  // MEN: ETHNIC WEAR
  // ==========================================
  {
    id: "leo-men-eth-01",
    name: "Raw Silk Lucknowi Kurta & Churidar Set",
    subtitle: "Hand-Embroidered Chikan Work • Pure Chanderi Silk",
    brand: "Royale Heritage",
    department: "Men",
    category: "Ethnic Wear",
    categorySlug: "ethnic-wear",
    subcategory: "Ethnic Wear",
    price: 6990,
    salePrice: 4990,
    discountPercent: 29,
    colors: [
      { name: "Ivory Pearl", hex: "#F7F5EC" },
      { name: "Royal Teal", hex: "#1A494C" },
      { name: "Blush Rose", hex: "#D6B4B4" }
    ],
    sizes: ["38", "40", "42", "44"],
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80"
    ],
    description: "An authentic regal two-piece festive set handcrafted from pure raw silk with fine tonal Chikankari embroidery around the collar and button placket.",
    details: [
      "100% Pure Raw Chanderi Silk fabric",
      "Artisanal Lucknowi hand-embroidery along placket",
      "Concealed pocket on both side seams",
      "Includes matching tailored silk-blend churidar"
    ],
    fabricCare: "Dry clean only.",
    fabric: "Pure Raw Silk",
    fit: "Comfort Traditional",
    occasion: "Ethnic",
    rating: 5.0,
    reviewCount: 52,
    stock: 18,
    isNew: true,
    isBestSeller: true,
    badge: "LUCKNOWI HERITAGE",
    featuredOrder: 75,
    inStock: true,
    tags: ["kurta", "ethnic", "men", "chikankari", "silk", "wedding", "festive"]
  },
  {
    id: "leo-men-eth-02",
    name: "Hand-Embroidered Velvet Nehru Bundi Jacket",
    subtitle: "Micro-Zari Threadwork • Mandarin Collar Sleeveless",
    brand: "Royale Heritage",
    department: "Men",
    category: "Ethnic Wear",
    categorySlug: "ethnic-wear",
    subcategory: "Ethnic Wear",
    price: 5490,
    salePrice: 3990,
    discountPercent: 27,
    colors: [
      { name: "Emerald Royale", hex: "#133E2B" },
      { name: "Deep Maroon", hex: "#4D1B22" }
    ],
    sizes: ["38", "40", "42", "44"],
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Layer over any solid kurta for instant festive refinement. Cut from micro-pile Italian cotton velvet with delicate antique gold Zari detailing on the mandarin collar.",
    details: [
      "Premium micro-pile velvet fabric with soft luster",
      "Hand-worked metallic gold Zari embroidery",
      "Structured welt breast pocket for pocket square",
      "Enamelled heritage crest buttons"
    ],
    fabricCare: "Dry clean only.",
    fabric: "Cotton Velvet",
    fit: "Tailored Nehru Cut",
    occasion: "Ethnic",
    rating: 4.8,
    reviewCount: 38,
    stock: 15,
    isNew: false,
    isBestSeller: true,
    badge: "NEHRU BUNDI",
    featuredOrder: 60,
    inStock: true,
    tags: ["jacket", "nehru", "bundi", "ethnic", "men", "velvet", "festive"]
  },

  // ==========================================
  // MEN: FOOTWEAR & LEATHER GOODS
  // ==========================================
  {
    id: "leo-men-ft-01",
    name: "Blake-Stitched French Calf Penny Loafers",
    subtitle: "Handcrafted in Florence • Resoleable Leather Sole",
    brand: "Bespoke Sartorial",
    department: "Men",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    subcategory: "Formal Shoes",
    price: 8990,
    salePrice: 6990,
    discountPercent: 22,
    colors: [
      { name: "Burnished Espresso", hex: "#3B2A20" },
      { name: "Antiqued Tan", hex: "#8A542D" }
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Constructed with traditional Italian Blake stitching for flexibility right out of the box. Full-grain French box-calf with hand-antiqued tonal burnishing on toe and heel.",
    details: [
      "100% Full-grain French box calfskin",
      "Blake stitch construction, lightweight and resoleable",
      "Bevelled waist leather sole with brass nails",
      "Calf leather lining and memory foam cushioned insole"
    ],
    fabricCare: "Condition with shoe cream. Store with wooden shoe trees.",
    fabric: "Full-Grain Calfskin",
    fit: "True to Size",
    occasion: "Formal",
    rating: 4.9,
    reviewCount: 41,
    stock: 12,
    isNew: true,
    isBestSeller: true,
    badge: "FLORENTINE LEATHER",
    featuredOrder: 70,
    inStock: true,
    tags: ["shoes", "loafers", "formal", "men", "leather shoes", "handmade"]
  },
  {
    id: "leo-men-ft-03",
    name: "Burnished Crust Leather Chelsea Boots",
    subtitle: "Goodyear Welted • Italian Commando Lug Outsole",
    brand: "Bespoke Sartorial",
    department: "Men",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    subcategory: "Formal Shoes",
    price: 9990,
    salePrice: 7990,
    discountPercent: 20,
    colors: [
      { name: "Midnight Black", hex: "#1A1A1C" },
      { name: "Cognac Brown", hex: "#774828" }
    ],
    sizes: ["41", "42", "43", "44", "45"],
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Sleek Chelsea silhouette crafted with heavy-gauge elastic side gores and a sturdy storm-welted leather sole fitted with Vibram rubber inserts for superior wet-weather grip.",
    details: [
      "Hand-burnished Italian calf crust leather",
      "Durable elasticated side gussets with pull tabs",
      "Storm welted water-resistant construction",
      "Goodyear welt with durable rubber grip inserts"
    ],
    fabricCare: "Apply beeswax balm every season. Air dry naturally.",
    fabric: "Italian Crust Leather",
    fit: "Standard Boot Fit",
    occasion: "Casual",
    rating: 4.8,
    reviewCount: 29,
    stock: 10,
    isNew: false,
    isBestSeller: true,
    badge: "CHELSEA BOOT",
    featuredOrder: 55,
    inStock: true,
    tags: ["boots", "chelsea", "leather", "men", "footwear", "winter"]
  },

  // ==========================================
  // WOMEN: DRESSES & JUMPSUITS
  // ==========================================
  {
    id: "leo-wom-dr-01",
    name: "19 Momme Mulberry Silk Bias-Cut Slip Dress",
    subtitle: "Grade 6A Mulberry Silk • Fluid Liquid Draped Silhouette",
    brand: "Royale Heritage",
    department: "Women",
    category: "Party Wear",
    categorySlug: "party-wear",
    subcategory: "Dresses",
    price: 7490,
    salePrice: 5490,
    discountPercent: 27,
    colors: [
      { name: "Champagne Pearl", hex: "#F3EAD8" },
      { name: "Midnight Noir", hex: "#18181A" },
      { name: "Emerald Jewel", hex: "#1A3B2B" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Cut on the true 45-degree bias, this dress ripples across the body like liquid gold. Made from heavyweight 19 momme pure mulberry silk with slender adjustable straps and a discreet side leg slit.",
    details: [
      "100% Grade 6A pure Mulberry Silk (19 Momme)",
      "True bias cut for flattering drape on all body types",
      "French seams throughout for invisible durability",
      "Delicate adjustable silk spaghetti straps"
    ],
    fabricCare: "Dry clean or delicate silk hand wash cold.",
    fabric: "100% Mulberry Silk",
    fit: "Fluid Bias Fit",
    occasion: "Party",
    rating: 4.9,
    reviewCount: 57,
    stock: 15,
    isNew: true,
    isBestSeller: true,
    badge: "PURE SILK",
    featuredOrder: 85,
    inStock: true,
    tags: ["dress", "silk", "women", "slip dress", "party", "luxury"]
  },
  {
    id: "leo-wom-dr-02",
    name: "French Flax Linen Tiered Maxi Sundress",
    subtitle: "Pre-Washed Normandy Linen • Pockets & Smocked Bodice",
    brand: "Riviera Studio",
    department: "Women",
    category: "Summer Wear",
    categorySlug: "summer-wear",
    subcategory: "Dresses",
    price: 4990,
    salePrice: 3690,
    discountPercent: 26,
    colors: [
      { name: "Terracotta Rose", hex: "#B86A55" },
      { name: "Warm Ecru", hex: "#EAE2D1" },
      { name: "Sky Chambray", hex: "#8DA7BA" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80"
    ],
    description: "A breezy romantic tiered silhouette spun from breathable French linen. Designed with a flexible smocked bodice, ruffled shoulder straps, and two hidden deep side pockets.",
    details: [
      "100% Pre-washed European flax linen",
      "Stretchy smocked bodice fits comfortably across busts",
      "Full tiered maxi skirt with generous sweeping hem",
      "Two functional in-seam side pockets"
    ],
    fabricCare: "Machine wash cold gentle. Hang to dry.",
    fabric: "100% European Linen",
    fit: "Relaxed Maxi",
    occasion: "Summer",
    rating: 4.8,
    reviewCount: 42,
    stock: 20,
    isNew: true,
    isBestSeller: true,
    badge: "SUMMER LINEN",
    featuredOrder: 70,
    inStock: true,
    tags: ["dress", "linen", "women", "sundress", "summer", "maxi"]
  },

  // ==========================================
  // WOMEN: TOPS & SHIRTS
  // ==========================================
  {
    id: "leo-wom-tp-01",
    name: "Crisp Organic Cotton Poplin Oversized Shirt",
    subtitle: "2-Ply GOTS Certified Poplin • Mother-of-Pearl Buttons",
    brand: "Atelier Leo",
    department: "Women",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    subcategory: "Tops & Blouses",
    price: 3290,
    salePrice: 2490,
    discountPercent: 24,
    colors: [
      { name: "Chalk White", hex: "#FFFFFF" },
      { name: "Breton Blue Stripe", hex: "#6E8CA0" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
    ],
    description: "The effortless menswear-inspired boyfriend button-down tailored for women. Cut from crisp high-density cotton poplin with dropped shoulders and elongated French cuffs.",
    details: [
      "100% GOTS certified organic long-staple cotton",
      "Exaggerated pointed collar and chest patch pocket",
      "Curved high-low hem ideal for half-tucks",
      "Natural shell buttons with shank backing"
    ],
    fabricCare: "Machine wash cold. Crisp iron on warm setting.",
    fabric: "Organic Poplin Cotton",
    fit: "Oversized Boyfriend",
    occasion: "Casual",
    rating: 4.9,
    reviewCount: 38,
    stock: 25,
    isNew: false,
    isBestSeller: true,
    badge: "TIMELESS POPLIN",
    featuredOrder: 60,
    inStock: true,
    tags: ["shirt", "poplin", "women", "oversized", "workwear", "minimalist"]
  },
  {
    id: "leo-wom-tp-02",
    name: "Draped Mulberry Silk Cowl Neck Blouse",
    subtitle: "100% Habotai Silk • Sleeveless Evening Elegance",
    brand: "Atelier Leo",
    department: "Women",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    subcategory: "Tops & Blouses",
    price: 4290,
    salePrice: 3190,
    discountPercent: 26,
    colors: [
      { name: "Champagne Gold", hex: "#EADDC6" },
      { name: "Black Caviar", hex: "#1A1A1C" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "A fluid sleeveless blouse with a cascading cowl neckline cut from pure lustrous silk. Pairs harmoniously under blazers or with high-waisted palazzo trousers.",
    details: [
      "100% Pure Mulberry Silk Habotai",
      "Soft graceful cascading cowl drape",
      "Keyhole button closure at back neck",
      "Fully lined front for opaque confidence"
    ],
    fabricCare: "Dry clean recommended.",
    fabric: "100% Silk",
    fit: "Fluid Drape",
    occasion: "Formal",
    rating: 4.8,
    reviewCount: 29,
    stock: 14,
    isNew: true,
    isBestSeller: false,
    badge: "SILK DRAPE",
    featuredOrder: 50,
    inStock: true,
    tags: ["blouse", "silk", "women", "top", "evening", "formal"]
  },

  // ==========================================
  // WOMEN: BLAZERS & TROUSERS
  // ==========================================
  {
    id: "leo-wom-bl-02",
    name: "High-Waisted Wide-Leg Crepe Tailored Trousers",
    subtitle: "Pleated Front • French Hook & Bar • Floor-Sweeping Drape",
    brand: "Atelier Leo",
    department: "Women",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    subcategory: "Trousers",
    price: 4490,
    salePrice: 3290,
    discountPercent: 27,
    colors: [
      { name: "Oatmeal Beige", hex: "#D8CEBE" },
      { name: "Raven Black", hex: "#1A1A1E" }
    ],
    sizes: ["26", "28", "30", "32"],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Architecturally proportioned palazzo trousers cut with a clean ultra-high rise, deep knife pleats, and an elongated fluid wide leg that glides with each stride.",
    details: [
      "Heavyweight fluid crepe fabric with wrinkle resistance",
      "Double knife pleats down front legs",
      "Concealed slide hook and bar waistband fastening",
      "Functional slant pockets and rear welt pockets"
    ],
    fabricCare: "Machine wash delicate cycle in mesh bag. Hang dry.",
    fabric: "Heavy Fluid Crepe",
    fit: "High-Rise Wide Leg",
    occasion: "Formal",
    rating: 4.9,
    reviewCount: 46,
    stock: 20,
    isNew: true,
    isBestSeller: true,
    badge: "PALAZZO DRAPE",
    featuredOrder: 75,
    inStock: true,
    tags: ["trousers", "pants", "women", "wide leg", "formal", "tailored"]
  },

  // ==========================================
  // WOMEN: ETHNIC WEAR
  // ==========================================
  {
    id: "leo-wom-eth-01",
    name: "Chanderi Silk Handloom Zari Embroidered Anarkali",
    subtitle: "3-Piece Set • Handcrafted in Madhya Pradesh • Pure Organza Dupatta",
    brand: "Royale Heritage",
    department: "Women",
    category: "Ethnic Wear",
    categorySlug: "ethnic-wear",
    subcategory: "Ethnic Wear",
    price: 8990,
    salePrice: 6490,
    discountPercent: 28,
    colors: [
      { name: "Mustard Gold", hex: "#D6A33C" },
      { name: "Emerald Forest", hex: "#1C4334" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
    ],
    description: "An ethereal 3-piece anarkali set woven by master artisans in Chanderi. Embellished with delicate gota patti borders, intricate Kashmiri tilla needlework, and a sheer organza dupatta.",
    details: [
      "Pure Chanderi Silk with metallic Zari weft",
      "Intricate hand-done Gota Patti and Tilla embroidery",
      "Cotton mulmul lining for supreme skin comfort",
      "Includes tailored pants and gold scalloped organza dupatta"
    ],
    fabricCare: "Dry clean only by bridal care specialist.",
    fabric: "Pure Chanderi Silk",
    fit: "Flared Anarkali",
    occasion: "Ethnic",
    rating: 5.0,
    reviewCount: 61,
    stock: 12,
    isNew: true,
    isBestSeller: true,
    badge: "CHANDERI WEAVE",
    featuredOrder: 90,
    inStock: true,
    tags: ["anarkali", "ethnic", "women", "suit", "chanderi", "wedding", "festive"]
  },
  {
    id: "leo-wom-eth-02",
    name: "Banarasi Pure Katan Silk Festive Saree with Blouse",
    subtitle: "Handwoven in Varanasi • Real Zari Floral Kadwa Jaal",
    brand: "Royale Heritage",
    department: "Women",
    category: "Ethnic Wear",
    categorySlug: "ethnic-wear",
    subcategory: "Ethnic Wear",
    price: 11990,
    salePrice: 8990,
    discountPercent: 25,
    colors: [
      { name: "Royal Crimson", hex: "#7A1C29" },
      { name: "Rani Pink", hex: "#B82563" }
    ],
    sizes: ["Free Size (5.5m + 0.8m)"],
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Woven over four months by heritage handloom weavers in Varanasi. Pure Katan silk adorned with traditional floral Kadwa gold zari motifs across the body and pallu.",
    details: [
      "100% Certified pure Katan Silk certified with Silk Mark",
      "Authentic Kadwa handloom weave (no loose back threads)",
      "Heavy zari pallu and regal border",
      "Includes unstitched 80cm brocade blouse piece"
    ],
    fabricCare: "Dry clean only. Roll in muslin cloth.",
    fabric: "Pure Katan Silk",
    fit: "Standard Saree",
    occasion: "Wedding",
    rating: 5.0,
    reviewCount: 48,
    stock: 8,
    isNew: false,
    isBestSeller: true,
    badge: "BANARASI SILK",
    featuredOrder: 95,
    inStock: true,
    tags: ["saree", "ethnic", "women", "banarasi", "silk", "wedding", "bridal"]
  },

  // ==========================================
  // WOMEN: FOOTWEAR & HANDBAGS
  // ==========================================
  {
    id: "leo-wom-ft-01",
    name: "Strappy Nappa Leather Square-Toe Mules",
    subtitle: "Handcrafted in Florence • 60mm Architectural Flared Heel",
    brand: "Atelier Leo",
    department: "Women",
    category: "Party Wear",
    categorySlug: "party-wear",
    subcategory: "Footwear",
    price: 6490,
    salePrice: 4890,
    discountPercent: 25,
    colors: [
      { name: "Golden Champagne", hex: "#E2CCA8" },
      { name: "Classic Noir", hex: "#161618" }
    ],
    sizes: ["36", "37", "38", "39", "40"],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Architectural minimalism at its peak. Delicate butter-soft nappa leather straps cross the vamp, seated on a comfortable 60mm flared block heel with padded memory foam insoles.",
    details: [
      "100% Italian buttery nappa lambskin leather",
      "Contemporary modern square toe bed",
      "60mm ergonomic stable flared heel",
      "Double-density padded insole for all-evening comfort"
    ],
    fabricCare: "Wipe with soft cloth. Use leather protector.",
    fabric: "Nappa Leather",
    fit: "True to Size",
    occasion: "Party",
    rating: 4.8,
    reviewCount: 34,
    stock: 15,
    isNew: true,
    isBestSeller: true,
    badge: "NAPPA LEATHER",
    featuredOrder: 65,
    inStock: true,
    tags: ["heels", "shoes", "women", "mules", "sandals", "party"]
  },
  {
    id: "leo-wom-hb-01",
    name: "Structured Calfskin Leather Top-Handle Bag",
    subtitle: "Tuscan Artisan Tanned • Magnetic Flap with Gold Clasp",
    brand: "Atelier Leo",
    department: "Accessories",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    subcategory: "Watches & Accessories",
    price: 8990,
    salePrice: 6490,
    discountPercent: 28,
    colors: [
      { name: "Cognac Tan", hex: "#874D26" },
      { name: "Creamy Ivory", hex: "#F2EBE0" },
      { name: "Midnight Black", hex: "#18181A" }
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80"
    ],
    description: "A timeless trapezoid silhouette structured from firm Tuscan calfskin. Carried by its elegant top handle or worn hands-free with the detachable leather crossbody strap.",
    details: [
      "Full-grain semi-aniline Italian calf leather",
      "Brushed 24k gold-plated brass lock mechanism",
      "Suede microfiber interior lining with zip pocket",
      "Includes adjustable and removable crossbody strap"
    ],
    fabricCare: "Store in included cotton dust bag with tissue stuffing.",
    fabric: "Italian Calf Leather",
    fit: "Medium Handbag",
    occasion: "Formal",
    rating: 4.9,
    reviewCount: 43,
    stock: 12,
    isNew: true,
    isBestSeller: true,
    badge: "TUSCAN LEATHER",
    featuredOrder: 70,
    inStock: true,
    tags: ["bag", "handbag", "leather", "women", "accessories", "tote"]
  },

  // ==========================================
  // KIDS: BOYS CLOTHING
  // ==========================================
  {
    id: "leo-kid-by-02",
    name: "Preppy Pique Cotton Polo & Chino Shorts Set",
    subtitle: "100% Breathable Combed Cotton • Soft Waistband",
    brand: "Urban Minimal",
    department: "Kids",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    subcategory: "Boys Clothing",
    price: 2690,
    salePrice: 1990,
    discountPercent: 26,
    colors: [
      { name: "Navy & Khaki", hex: "#1C2738" },
      { name: "Sky & White", hex: "#8DA7BA" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Classic smart-casual outfit for young boys. Includes a soft breathable cotton pique polo with tipped collar and stretch-twill chino shorts with internal button-hole elastic.",
    details: [
      "100% Breathable cotton pique knit polo shirt",
      "Stretch cotton twill chino shorts with adjustable waist",
      "Easy-snap button closure and functional pockets",
      "Reinforced double stitching throughout for active durability"
    ],
    fabricCare: "Machine wash warm with similar colors.",
    fabric: "100% Organic Cotton",
    fit: "Classic Kids Regular",
    occasion: "Casual",
    rating: 4.8,
    reviewCount: 26,
    stock: 22,
    isNew: true,
    isBestSeller: true,
    badge: "PREPPY ESSENTIAL",
    featuredOrder: 50,
    inStock: true,
    tags: ["kids", "boys", "polo", "shorts", "cotton", "casual", "set"]
  },
  {
    id: "leo-kid-by-04",
    name: "Pure Silk Kurta & Pajama Set for Boys",
    subtitle: "Festive Embroidered Yoke • Pure Cotton Lining",
    brand: "Royale Heritage",
    department: "Kids",
    category: "Ethnic Wear",
    categorySlug: "ethnic-wear",
    subcategory: "Boys Clothing",
    price: 3490,
    salePrice: 2490,
    discountPercent: 29,
    colors: [
      { name: "Royal Gold", hex: "#D4A137" },
      { name: "Powder Blue", hex: "#9EBED4" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Delightful festive ensemble crafted with smooth raw silk blend exterior and a 100% breathable soft cotton lining to keep kids comfortable during ceremonies.",
    details: [
      "Pure Art Silk with soft 100% cotton inner lining",
      "Delicate non-scratchy Resham embroidery on collar and chest",
      "Soft elasticated pajama waistband for easy wear",
      "Anti-chafing smooth seam finishes"
    ],
    fabricCare: "Dry clean or gentle hand wash.",
    fabric: "Silk with Cotton Lining",
    fit: "Comfort Ethnic",
    occasion: "Ethnic",
    rating: 4.9,
    reviewCount: 31,
    stock: 18,
    isNew: false,
    isBestSeller: true,
    badge: "FESTIVE ROYALE",
    featuredOrder: 60,
    inStock: true,
    tags: ["kids", "boys", "kurta", "ethnic", "wedding", "festive"]
  },

  // ==========================================
  // KIDS: GIRLS CLOTHING
  // ==========================================
  {
    id: "leo-kid-gl-01",
    name: "Broderie Anglaise Cotton Eyelet Sundress",
    subtitle: "100% Organic Cotton • Scalloped Hem with Cotton Mulmul Lining",
    brand: "Urban Minimal",
    department: "Kids",
    category: "Summer Wear",
    categorySlug: "summer-wear",
    subcategory: "Girls Clothing",
    price: 2890,
    salePrice: 2190,
    discountPercent: 24,
    colors: [
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Soft Buttercup", hex: "#F7E9B8" },
      { name: "Blush Peach", hex: "#F4D2C5" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80"
    ],
    description: "A dreamy sun dress crafted from fine eyelet embroidered cotton with scalloped edges. Features flutter cap sleeves and a buttoned keyhole back.",
    details: [
      "100% Organic cotton eyelet with floral Broderie Anglaise",
      "Full breathable pure cotton mulmul lining",
      "Delicate flutter frill sleeve detailing",
      "Gentle elasticized back for relaxed flexible fit"
    ],
    fabricCare: "Machine wash cold gentle. Warm iron on reverse.",
    fabric: "Organic Cotton Eyelet",
    fit: "A-Line Flare",
    occasion: "Summer",
    rating: 4.9,
    reviewCount: 37,
    stock: 20,
    isNew: true,
    isBestSeller: true,
    badge: "EYELET COTTON",
    featuredOrder: 55,
    inStock: true,
    tags: ["kids", "girls", "dress", "sundress", "cotton", "summer"]
  },
  {
    id: "leo-kid-gl-03",
    name: "Pastel Chanderi Festive Lehenga Choli for Girls",
    subtitle: "3-Piece Festive Set • Hand Embroidered with Soft Cancan",
    brand: "Royale Heritage",
    department: "Kids",
    category: "Ethnic Wear",
    categorySlug: "ethnic-wear",
    subcategory: "Girls Clothing",
    price: 4990,
    salePrice: 3690,
    discountPercent: 26,
    colors: [
      { name: "Powder Coral", hex: "#E89B88" },
      { name: "Mint Pistachio", hex: "#B4D4BE" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
    images: [
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Magical festive silhouette for young girls. Made from featherlight Chanderi silk with soft gold foil detailing, cotton lining, and a lightweight net dupatta.",
    details: [
      "Featherweight Chanderi Silk with gold border work",
      "100% Soft breathable cotton mulmul inner lining",
      "Comfortable elasticated lehenga waist with drawstring tassels",
      "Back zip on choli blouse with safety guard to avoid pinches"
    ],
    fabricCare: "Dry clean only.",
    fabric: "Chanderi Silk Blend",
    fit: "Festive Lehenga",
    occasion: "Ethnic",
    rating: 5.0,
    reviewCount: 39,
    stock: 14,
    isNew: true,
    isBestSeller: true,
    badge: "GIRLS FESTIVE",
    featuredOrder: 65,
    inStock: true,
    tags: ["kids", "girls", "lehenga", "ethnic", "choli", "wedding"]
  },

  // ==========================================
  // KIDS: TODDLER & UNISEX
  // ==========================================
  {
    id: "leo-kid-td-01",
    name: "Pure Bamboo Muslin Button-Front Romper",
    subtitle: "70% Bamboo, 30% Organic Cotton • Hypoallergenic & Ultra-Soft",
    brand: "Urban Minimal",
    department: "Kids",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    subcategory: "Baby & Toddler",
    price: 1990,
    salePrice: 1490,
    discountPercent: 25,
    colors: [
      { name: "Almond Milk", hex: "#EFE7D8" },
      { name: "Sage Tint", hex: "#A5B79F" }
    ],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"],
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Cloud-soft four-layer muslin woven from organic bamboo and cotton. Natural coconut shell buttons and bottom snap diaper access make changes effortless.",
    details: [
      "70% Bamboo viscose, 30% GOTS certified organic cotton",
      "Four-layer breathable open-weave muslin avoids overheating",
      "Bottom nickel-free poppers for rapid diaper changes",
      "Zero-scratch heat-sealed tags"
    ],
    fabricCare: "Machine wash cold gentle. Gets softer with each wash.",
    fabric: "Bamboo Muslin",
    fit: "Relaxed Baby Fit",
    occasion: "Casual",
    rating: 5.0,
    reviewCount: 45,
    stock: 25,
    isNew: true,
    isBestSeller: true,
    badge: "BAMBOO MUSLIN",
    featuredOrder: 45,
    inStock: true,
    tags: ["kids", "baby", "toddler", "romper", "bamboo", "organic"]
  },

  // ==========================================
  // KIDS: FOOTWEAR
  // ==========================================
  {
    id: "leo-kid-ft-01",
    name: "Soft-Sole Flexible Nappa Leather First Walkers",
    subtitle: "Podiatrist Approved • Non-Slip Suede Bottom Sole",
    brand: "Urban Minimal",
    department: "Kids",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    subcategory: "Kids Footwear",
    price: 2290,
    salePrice: 1690,
    discountPercent: 26,
    colors: [
      { name: "Cognac Camel", hex: "#A8704A" },
      { name: "Cream White", hex: "#F3EDE3" }
    ],
    sizes: ["18 (3-6M)", "19 (6-9M)", "20 (9-12M)", "21 (12-18M)", "22 (18-24M)"],
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Designed to encourage natural foot development. Handcrafted from chrome-free, buttery soft nappa leather with an elasticated ankle that stays securely on little feet.",
    details: [
      "100% Non-toxic vegetable tanned nappa leather",
      "Textured non-slip split suede sole for grip on wood and tile",
      "Elasticized collar prevents slipping off active feet",
      "Spacious wide toe box allows toes to splay naturally"
    ],
    fabricCare: "Spot clean with damp cloth and mild baby soap.",
    fabric: "Chrome-Free Leather",
    fit: "Barefoot First Walker",
    occasion: "Casual",
    rating: 4.9,
    reviewCount: 33,
    stock: 18,
    isNew: true,
    isBestSeller: false,
    badge: "FIRST WALKERS",
    featuredOrder: 35,
    inStock: true,
    tags: ["kids", "shoes", "baby", "leather", "first walkers", "footwear"]
  }
];

export default expandedProducts;
