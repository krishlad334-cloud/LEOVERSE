export const products = [
  // ==========================================
  // 1. SUMMER WEAR
  // ==========================================
  {
    id: "leo-sum-01",
    name: "The Resort Camp Collar Linen Shirt",
    subtitle: "100% Pre-Washed French Flax Linen",
    category: "Summer Wear",
    categorySlug: "summer-wear",
    price: 2790,
    salePrice: 2390,
    colors: [
      { name: "Oat Sand", hex: "#D6CEBF" },
      { name: "Sky Blue", hex: "#A8BCCB" },
      { name: "Off White", hex: "#F7F5F0" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Tailored with a relaxed retro Cuban camp collar and straight vented hem for breezy unbuttoned summer wear. Spun from 100% pre-washed French flax linen that breathes gracefully in high heat.",
    details: [
      "100% Pure Normandy French flax linen",
      "Convertible retro Cuban camp collar",
      "Straight hem with side vents tailored to be worn untucked",
      "Genuine Australian mother-of-pearl buttons"
    ],
    fabricCare: "100% Linen. Machine wash cold, gentle cycle. Hang dry in shade.",
    fabric: "Pure Linen",
    fit: "Relaxed Boxy",
    occasion: "Summer",
    rating: 4.8,
    reviewCount: 42,
    isNew: true,
    isBestSeller: true,
    badge: "SUMMER ESSENTIAL",
    featuredOrder: 25,
    isDailyEssential: true,
    inStock: true,
    tags: ["linen", "shirt", "summer", "camp-collar", "beach", "lightweight"]
  },
  {
    id: "leo-sum-02",
    name: "The Lightweight Slub Cotton Tee",
    subtitle: "180 GSM Airy Breathable Organic Cotton",
    category: "Summer Wear",
    categorySlug: "summer-wear",
    price: 1690,
    salePrice: 1390,
    colors: [
      { name: "Chalk White", hex: "#F3EFEA" },
      { name: "Sun Sand", hex: "#D8C7B0" },
      { name: "Sage Tint", hex: "#8F9D8B" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Knitted from textured 180 GSM slub organic cotton with natural micro-channels for airflow. A featherweight, breathable staple for hot coastal afternoons.",
    details: [
      "100% Organic combed slub cotton",
      "Micro-ribbed bound crew neckline",
      "Regular relaxed cut with breathable drape",
      "Blind-stitched sleeve and bottom hems"
    ],
    fabricCare: "100% Cotton. Machine wash gentle cold. Tumble dry low.",
    fabric: "100% Cotton",
    fit: "Tailored Regular",
    occasion: "Summer",
    rating: 4.7,
    reviewCount: 38,
    isNew: false,
    isBestSeller: true,
    badge: "AIRY SLUB",
    featuredOrder: 15,
    isDailyEssential: true,
    inStock: true,
    tags: ["tee", "t-shirt", "summer", "slub", "organic"]
  },
  {
    id: "leo-sum-03",
    name: "The Breathable Linen Drawstring Shorts",
    subtitle: "Relaxed 7-Inch Inseam with Elastic Waist",
    category: "Summer Wear",
    categorySlug: "summer-wear",
    price: 2290,
    salePrice: 1990,
    colors: [
      { name: "Natural Ecru", hex: "#EDE6D6" },
      { name: "Washed Navy", hex: "#232F3E" }
    ],
    sizes: ["30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Airy summer shorts cut from 100% European linen. Features an encased elastic waistband with unbleached cotton drawstrings and deep slash pockets.",
    details: [
      "Pure European washed flax linen",
      "Elasticated waistband with braided cotton drawcords",
      "7-inch inseam tailored to hit just above the knee",
      "Rear buttoned welt pocket"
    ],
    fabricCare: "100% Linen. Machine wash cold. Line dry.",
    fabric: "Pure Linen",
    fit: "Relaxed Boxy",
    occasion: "Summer",
    rating: 4.9,
    reviewCount: 29,
    isNew: true,
    isBestSeller: false,
    badge: "LIMITED",
    featuredOrder: 14,
    isDailyEssential: false,
    inStock: true,
    tags: ["shorts", "linen", "summer", "drawstring"]
  },

  // ==========================================
  // 2. WINTER WEAR
  // ==========================================
  {
    id: "leo-win-01",
    name: "The Double-Faced Wool Tailored Overcoat",
    subtitle: "420 GSM Boiled Australian Merino Wool",
    category: "Winter Wear",
    categorySlug: "winter-wear",
    price: 7890,
    salePrice: 6990,
    colors: [
      { name: "Charcoal Melange", hex: "#2E2E2D" },
      { name: "Toasted Camel", hex: "#9E7348" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80"
    ],
    description: "An architectural single-breasted winter overcoat crafted from double-faced boiled virgin wool. Features clean raglan shoulders and internal hand-stitched cupro lining for smooth seasonal layering.",
    details: [
      "80% Boiled Virgin Wool, 20% Cashmere blend",
      "Notched lapels with horn button fastening",
      "Deep fleece-lined welt hand warmer pockets",
      "Center back walking vent for easy mobility"
    ],
    fabricCare: "Dry clean only. Steam gently on low heat.",
    fabric: "Super 120s Wool",
    fit: "Tailored Regular",
    occasion: "Winter",
    rating: 4.9,
    reviewCount: 51,
    isNew: true,
    isBestSeller: true,
    badge: "WINTER LUXURY",
    featuredOrder: 24,
    isDailyEssential: false,
    inStock: true,
    tags: ["overcoat", "coat", "winter", "wool", "warm"]
  },
  {
    id: "leo-win-02",
    name: "The Heavy Cable-Knit Lambswool Sweater",
    subtitle: "5-Gauge Pure Scottish Lambswool",
    category: "Winter Wear",
    categorySlug: "winter-wear",
    price: 4490,
    salePrice: 3890,
    colors: [
      { name: "Winter Oatmeal", hex: "#D8CEBE" },
      { name: "Forest Night", hex: "#2D382B" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Substantial 5-gauge cable knit spun from pure British lambswool. Rich tactile texture that insulates core warmth while retaining its structured tailored fit.",
    details: [
      "100% Pure British spun lambswool",
      "Traditional fisherman heritage cable knit design",
      "Dense ribbed crew collar, cuffs, and waist hem",
      "Natural thermal temperature regulation"
    ],
    fabricCare: "Hand wash cold with wool detergent. Dry flat.",
    fabric: "Merino Wool",
    fit: "Tailored Regular",
    occasion: "Winter",
    rating: 4.8,
    reviewCount: 34,
    isNew: false,
    isBestSeller: true,
    badge: "PURE WOOL",
    featuredOrder: 13,
    isDailyEssential: true,
    inStock: true,
    tags: ["sweater", "knitwear", "wool", "cable-knit", "winter"]
  },
  {
    id: "leo-win-03",
    name: "The Heavyweight Street Stripe Hoodie",
    subtitle: "480 GSM Organic French Terry Fleece",
    category: "Winter Wear",
    categorySlug: "winter-wear",
    price: 4490,
    salePrice: 3890,
    colors: [
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Heather Grey", hex: "#9E9E9E" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "/images/products/black-street-hoodie-1.jpg",
      "/images/products/black-street-hoodie-2.jpg"
    ],
    description: "Engineered from substantial 480 GSM organic cotton loopback fleece. Cut in an oversized boxy silhouette with clean crossover hood construction (no drawstrings), double-layer hood, and contrast sleeve racing stripes.",
    details: [
      "Heavyweight 480 GSM 100% organic loopback cotton fleece",
      "Retro triple contrast sleeve piping stripes",
      "Clean double-layered hood without strings for minimal aesthetic",
      "Deep front kangaroo pocket with reinforced bar-tack stitching"
    ],
    fabricCare: "100% Organic Cotton. Machine wash gentle cold inside out. Reshape and dry flat.",
    fabric: "Loopback Fleece",
    fit: "Oversized Drop-Shoulder",
    occasion: "Winter",
    rating: 5.0,
    reviewCount: 68,
    isNew: true,
    isBestSeller: true,
    badge: "SELLING FAST",
    featuredOrder: 23,
    isDailyEssential: true,
    inStock: true,
    tags: ["hoodie", "streetwear", "black", "stripes", "oversized", "winter"]
  },

  // ==========================================
  // 3. CASUAL WEAR
  // ==========================================
  {
    id: "leo-cas-01",
    name: "The Essential Oversized Boxy Tee",
    subtitle: "280 GSM Heavy Combed Cotton Drop-Shoulder",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    price: 2490,
    salePrice: 1990,
    colors: [
      { name: "Burgundy Wine", hex: "#5C1D24" },
      { name: "Jet Black", hex: "#191919" },
      { name: "Vintage Bone", hex: "#EDE8DF" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/products/burgundy-oversized-tee-1.jpg",
      "/images/products/burgundy-oversized-tee-2.jpg"
    ],
    description: "An authentic streetwear boxy fit cut with exaggerated dropped shoulders, wide sleeves, and a reinforced micro-ribbed crew collar. Spun from heavy 280 GSM combed cotton that retains its crisp architectural drape without clinging.",
    details: [
      "Substantial 280 GSM 100% combed ringspun cotton",
      "Relaxed dropped shoulders with wide elbow-length sleeves",
      "Thick 1.2-inch bound ribbed neckband with twin-needle collar",
      "Pre-shrunk enzyme washed for an ultra-soft vintage handfeel"
    ],
    fabricCare: "100% Heavy Combed Cotton. Machine wash cold inside out. Hang dry.",
    fabric: "100% Cotton",
    fit: "Oversized Drop-Shoulder",
    occasion: "Casual",
    rating: 4.9,
    reviewCount: 89,
    isNew: true,
    isBestSeller: true,
    badge: "TRENDING NOW",
    featuredOrder: 22,
    isDailyEssential: true,
    inStock: true,
    tags: ["tee", "t-shirt", "burgundy", "oversized", "casual", "boxy"]
  },
  {
    id: "leo-cas-02",
    name: "The Relaxed Skate Twill Chinos",
    subtitle: "9.5oz Heavy Sturdy Cotton Twill",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    price: 3490,
    salePrice: 2990,
    colors: [
      { name: "Sand Beige", hex: "#C8BCA8" },
      { name: "Washed Black", hex: "#222120" }
    ],
    sizes: ["30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Relaxed straight-leg skate chinos engineered from 9.5oz sturdy cotton twill. Cut wide through the thigh and leg for full range of motion and an easy low break.",
    details: [
      "100% Heavy cotton twill 9.5oz",
      "Spacious relaxed straight cut with room for movement",
      "Deep slant side pockets and rear welt pockets",
      "Reinforced crotch gusset for durability"
    ],
    fabricCare: "100% Cotton. Machine wash warm. Line dry recommended.",
    fabric: "Twill",
    fit: "Wide Leg",
    occasion: "Casual",
    rating: 4.8,
    reviewCount: 46,
    isNew: false,
    isBestSeller: true,
    badge: "BESTSELLER",
    featuredOrder: 18,
    isDailyEssential: true,
    inStock: true,
    tags: ["chinos", "pants", "casual", "twill", "trousers"]
  },
  {
    id: "leo-cas-03",
    name: "The Vintage Faded Denim Trucker",
    subtitle: "14oz Heavy Ring-Spun Stonewashed Denim",
    category: "Casual Wear",
    categorySlug: "casual-wear",
    price: 4990,
    salePrice: 4390,
    colors: [
      { name: "Faded Indigo", hex: "#5C738E" },
      { name: "Washed Black", hex: "#262626" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80"
    ],
    description: "A relaxed reinterpretation of the iconic 90s denim trucker jacket. Cut boxy through the chest and shoulders so it layers cleanly over heavy tees and hoodies.",
    details: [
      "100% Heavy 14oz ring-spun cotton denim",
      "Enzyme stonewashed for authentic lived-in fade",
      "Twin chest flap pockets and side welt slash pockets",
      "Custom gunmetal branded button hardware"
    ],
    fabricCare: "100% Cotton Denim. Machine wash cold inside out. Hang dry.",
    fabric: "Denim",
    fit: "Relaxed Boxy",
    occasion: "Casual",
    rating: 4.9,
    reviewCount: 41,
    isNew: false,
    isBestSeller: false,
    badge: "VINTAGE DROP",
    featuredOrder: 12,
    isDailyEssential: false,
    inStock: true,
    tags: ["denim", "jacket", "casual", "trucker", "vintage"]
  },

  // ==========================================
  // 4. FORMAL WEAR
  // ==========================================
  {
    id: "leo-for-01",
    name: "The Italian Wool Tailored Blazer",
    subtitle: "Super 130s Italian Wool Double-Vented",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    price: 8490,
    salePrice: 7490,
    colors: [
      { name: "Obsidian Black", hex: "#1C1C1C" },
      { name: "Navy Blue", hex: "#1A2433" }
    ],
    sizes: ["38", "40", "42", "44", "46"],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Impeccably tailored from Super 130s Italian wool twill. Cut with natural shoulders, notched lapels, and double side vents for boardroom elegance and comfortable movement.",
    details: [
      "Super 130s high-twist Italian wool with wrinkle recovery",
      "Half-canvas chest construction for bespoke drape",
      "Bresciani genuine horn buttons",
      "Internal passport and ticket pockets with cupro lining"
    ],
    fabricCare: "Dry clean only. Steam lightly.",
    fabric: "Super 120s Wool",
    fit: "Tailored Regular",
    occasion: "Formal",
    rating: 4.9,
    reviewCount: 57,
    isNew: true,
    isBestSeller: true,
    badge: "BOARDROOM SIGNATURE",
    featuredOrder: 21,
    isDailyEssential: false,
    inStock: true,
    tags: ["blazer", "suit", "formal", "office", "wool", "jacket"]
  },
  {
    id: "leo-for-02",
    name: "The Pinpoint Oxford Formal Shirt",
    subtitle: "120s Two-Ply Egyptian Giza Cotton",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    price: 2890,
    salePrice: 2490,
    colors: [
      { name: "Crisp White", hex: "#FAF9F6" },
      { name: "French Blue", hex: "#BACCE0" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
    ],
    description: "The definitive executive dress shirt. Woven from 120s two-ply Egyptian long-staple cotton with a semi-spread French collar that holds a tie knot perfectly or sits crisply open.",
    details: [
      "120s two-ply Giza long-staple cotton pinpoint",
      "Fused semi-spread collar with removable brass collar stays",
      "Mother-of-pearl buttons cross-stitched for permanence",
      "Convertible barrel cuffs"
    ],
    fabricCare: "100% Cotton. Machine wash warm. Warm steam press.",
    fabric: "100% Cotton",
    fit: "Tailored Regular",
    occasion: "Formal",
    rating: 4.8,
    reviewCount: 63,
    isNew: false,
    isBestSeller: true,
    badge: "EXECUTIVE",
    featuredOrder: 17,
    isDailyEssential: true,
    inStock: true,
    tags: ["shirt", "formal", "dress-shirt", "office", "white"]
  },
  {
    id: "leo-for-03",
    name: "The Forward-Pleated Dress Trousers",
    subtitle: "Tropical Wool Twill with Side Tab Adjusters",
    category: "Formal Wear",
    categorySlug: "formal-wear",
    price: 3890,
    salePrice: null,
    colors: [
      { name: "Slate Charcoal", hex: "#35383B" },
      { name: "Deep Ink", hex: "#1C2028" }
    ],
    sizes: ["30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Tailored dress trousers featuring a single forward pleat and side tab waist adjusters for a belt-free, sartorial finish. Cut with a medium rise that falls cleanly in an uninterrupted drape.",
    details: [
      "Lightweight breathable tropical wool blend",
      "Internal curtain waistband for comfort",
      "Side tab buckle adjusters eliminate belt bulk",
      "Unfinished hem allows bespoke tailoring length"
    ],
    fabricCare: "Dry clean only.",
    fabric: "Super 120s Wool",
    fit: "Tailored Regular",
    occasion: "Formal",
    rating: 4.8,
    reviewCount: 39,
    isNew: false,
    isBestSeller: false,
    badge: null,
    featuredOrder: 11,
    isDailyEssential: false,
    inStock: true,
    tags: ["trousers", "formal", "pleats", "wool", "pants"]
  },

  // ==========================================
  // 5. WEDDING WEAR
  // ==========================================
  {
    id: "leo-wed-01",
    name: "The Bespoke Satin Peak-Lapel Tuxedo",
    subtitle: "Super 140s Wool with Italian Silk Grosgrain",
    category: "Wedding Wear",
    categorySlug: "wedding-wear",
    price: 12490,
    salePrice: 10990,
    colors: [
      { name: "Black Satin", hex: "#111111" },
      { name: "Midnight Navy", hex: "#111726" }
    ],
    sizes: ["38", "40", "42", "44", "46"],
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=900&q=80"
    ],
    description: "The pinnacle of formal black-tie elegance. Bench-tailored from Super 140s fine wool with hand-finished Italian silk grosgrain peak lapels, covered buttons, and braided side trouser stripes.",
    details: [
      "Super 140s pure worsted wool shell",
      "Hand-finished pure silk satin peak lapels",
      "Single-button satin closure and matching jetted pockets",
      "Includes matching formal trousers with silk side braid"
    ],
    fabricCare: "Dry clean only by formal specialist.",
    fabric: "Super 120s Wool",
    fit: "Tailored Regular",
    occasion: "Wedding",
    rating: 5.0,
    reviewCount: 33,
    isNew: true,
    isBestSeller: true,
    badge: "BLACK TIE LUXURY",
    featuredOrder: 20,
    isDailyEssential: false,
    inStock: true,
    tags: ["tuxedo", "wedding", "suit", "black-tie", "gala"]
  },
  {
    id: "leo-wed-02",
    name: "The Three-Piece Royal Wedding Suit",
    subtitle: "Jacket, Vest & Trousers in Super 120s Wool",
    category: "Wedding Wear",
    categorySlug: "wedding-wear",
    price: 11990,
    salePrice: null,
    colors: [
      { name: "Royal Midnight", hex: "#192231" },
      { name: "Charcoal Herringbone", hex: "#323336" }
    ],
    sizes: ["38", "40", "42", "44"],
    images: [
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=80"
    ],
    description: "A commanding 3-piece wedding ensemble including tailored suit jacket, five-button formal waistcoat, and flat-front trousers. Engineered for grand celebrations and groomsmen stature.",
    details: [
      "Complete 3-piece set: Blazer, Vest & Trousers",
      "Super 120s pure wool with subtle luster",
      "Tailored five-button vest with adjustable cinch back",
      "Bespoke pick-stitch edge detailing"
    ],
    fabricCare: "Dry clean only.",
    fabric: "Super 120s Wool",
    fit: "Tailored Regular",
    occasion: "Wedding",
    rating: 4.9,
    reviewCount: 27,
    isNew: false,
    isBestSeller: true,
    badge: "ROYAL EDITION",
    featuredOrder: 16,
    isDailyEssential: false,
    inStock: true,
    tags: ["wedding", "suit", "three-piece", "vest", "groom"]
  },

  // ==========================================
  // 6. PARTY WEAR
  // ==========================================
  {
    id: "leo-par-01",
    name: "The Lustrous Liquid Viscose Party Shirt",
    subtitle: "Silk-Touch Drape with Cuban Collar",
    category: "Party Wear",
    categorySlug: "party-wear",
    price: 2990,
    salePrice: 2590,
    colors: [
      { name: "Midnight Onyx", hex: "#141414" },
      { name: "Champagne Gold", hex: "#D4C29D" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Crafted from heavy 180 GSM liquid viscose with a fluid, satin-touch handfeel. Designed with a wide open camp collar for evening nightlife and statement party styling.",
    details: [
      "100% High-density liquid rayon viscose",
      "Fluid drape with subtle ambient luster",
      "Relaxed party fit with straight side-split hem",
      "Smoke mother-of-pearl buttons"
    ],
    fabricCare: "Dry clean or hand wash cold. Dry flat.",
    fabric: "Silk Blend",
    fit: "Relaxed Boxy",
    occasion: "Party",
    rating: 4.8,
    reviewCount: 36,
    isNew: true,
    isBestSeller: true,
    badge: "NIGHTLIFE",
    featuredOrder: 19,
    isDailyEssential: false,
    inStock: true,
    tags: ["party", "shirt", "silk", "evening", "designer"]
  },
  {
    id: "leo-par-02",
    name: "The Velvet Evening Statement Jacket",
    subtitle: "Plush Cotton Velvet with Satin Shawl Collar",
    category: "Party Wear",
    categorySlug: "party-wear",
    price: 7990,
    salePrice: 6990,
    colors: [
      { name: "Emerald Night", hex: "#1A3326" },
      { name: "Deep Burgundy", hex: "#4A1820" }
    ],
    sizes: ["38", "40", "42", "44"],
    images: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Sumptuous cotton velvet evening dinner jacket with a sleek contrast satin shawl lapel. The ultimate cocktail and red-carpet statement piece.",
    details: [
      "100% Cotton plush velvet shell",
      "Satin shawl lapel and satin covered buttons",
      "Internal full cupro jacquard lining",
      "Jetted formal pockets"
    ],
    fabricCare: "Dry clean only.",
    fabric: "Silk Blend",
    fit: "Tailored Regular",
    occasion: "Party",
    rating: 4.9,
    reviewCount: 22,
    isNew: true,
    isBestSeller: false,
    badge: "VIP STATEMENT",
    featuredOrder: 10,
    isDailyEssential: false,
    inStock: true,
    tags: ["velvet", "blazer", "party", "evening", "cocktail"]
  },

  // ==========================================
  // 7. SPORTSWEAR
  // ==========================================
  {
    id: "leo-spo-01",
    name: "The Tech-Knit Moisture Wicking Gym Tee",
    subtitle: "4-Way Stretch Anti-Odor Activewear",
    category: "Sportswear",
    categorySlug: "sportswear",
    price: 1790,
    salePrice: 1490,
    colors: [
      { name: "Carbon Grey", hex: "#353839" },
      { name: "Navy Cobalt", hex: "#1E2A3A" },
      { name: "Stealth Black", hex: "#141414" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Engineered from seamless micro-perforated polyester-spandex knit that pulls sweat instantly from the body. Raglan sleeves and flatlock seams prevent friction during intense workouts.",
    details: [
      "88% Recycled Poly, 12% Spandex 4-way stretch",
      "Silver-ion antimicrobial anti-odor treatment",
      "Ergonomic raglan cut for unrestricted shoulder mobility",
      "Reflective minimalist monogram for low-light training"
    ],
    fabricCare: "Machine wash cold gentle. Do not use fabric softener. Air dry.",
    fabric: "Tech Stretch",
    fit: "Tailored Regular",
    occasion: "Sports",
    rating: 4.9,
    reviewCount: 74,
    isNew: false,
    isBestSeller: true,
    badge: "PRO ATHLETIC",
    featuredOrder: 18,
    isDailyEssential: true,
    inStock: true,
    tags: ["gym", "activewear", "sportswear", "tee", "workout", "athletic"]
  },
  {
    id: "leo-spo-02",
    name: "The Wide-Leg Street Track Pant",
    subtitle: "Interlock Knit with Full Contrast Side Piping",
    category: "Sportswear",
    categorySlug: "sportswear",
    price: 3290,
    salePrice: 2890,
    colors: [
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Forest Night", hex: "#222B23" }
    ],
    sizes: ["30", "32", "34", "36", "38"],
    images: [
      "/images/products/wide-track-pants-1.jpg",
      "/images/products/black-street-hoodie-2.jpg"
    ],
    description: "Contemporary wide-leg track pants featuring full-length side contrast stripes, an elasticated waistband with interior cotton drawcords, and concealed ankle zips for customizable hem break.",
    details: [
      "Substantial 320 GSM cotton-poly interlock knit",
      "Contrast full-length side stripe piping",
      "Concealed YKK zippered side hand pockets and rear welt pocket",
      "Relaxed wide straight-leg drape from hip to ankle"
    ],
    fabricCare: "70% Cotton, 30% Polyester. Machine wash cold, gentle cycle. Hang dry.",
    fabric: "Tech Stretch",
    fit: "Wide Leg",
    occasion: "Sports",
    rating: 4.8,
    reviewCount: 53,
    isNew: true,
    isBestSeller: true,
    badge: "TRACK ICON",
    featuredOrder: 17,
    isDailyEssential: false,
    inStock: true,
    tags: ["track-pants", "sweatpants", "sportswear", "wide-leg", "stripes"]
  },

  // ==========================================
  // 8. TRAVEL WEAR
  // ==========================================
  {
    id: "leo-tra-01",
    name: "The Ripstop 6-Pocket Travel Cargo Pants",
    subtitle: "Water-Repellent Cotton Ripstop with Ankle Cinch",
    category: "Travel Wear",
    categorySlug: "travel-wear",
    price: 3690,
    salePrice: 3290,
    colors: [
      { name: "Olive Army", hex: "#4A5243" },
      { name: "Travel Khaki", hex: "#8A7E6B" }
    ],
    sizes: ["30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Built for extended travel and all-day transit. Heavy 100% cotton tear-resistant ripstop with dual bellows cargo pockets, zip passport compartment, and internal ankle cinches.",
    details: [
      "Heavyweight 100% cotton tear-resistant ripstop",
      "Dual bellows side cargo pockets with concealed snaps",
      "Interior ankle toggle cords for tapered or wide hem wear",
      "Concealed interior zip security passport pocket"
    ],
    fabricCare: "100% Cotton Ripstop. Machine wash cold. Line dry.",
    fabric: "Twill",
    fit: "Relaxed Boxy",
    occasion: "Travel",
    rating: 4.9,
    reviewCount: 47,
    isNew: true,
    isBestSeller: true,
    badge: "TRAVEL READY",
    featuredOrder: 16,
    isDailyEssential: true,
    inStock: true,
    tags: ["cargo", "travel", "pants", "ripstop", "utility"]
  },
  {
    id: "leo-tra-02",
    name: "The Heavy Canvas Travel Chore Jacket",
    subtitle: "14oz Washed Duck Cotton with Corduroy Collar",
    category: "Travel Wear",
    categorySlug: "travel-wear",
    price: 4890,
    salePrice: 4290,
    colors: [
      { name: "Camel Tan", hex: "#A87A51" },
      { name: "Deep Charcoal", hex: "#292928" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Rugged yet refined utility jacket built for transit. Heavy 14oz brushed cotton canvas duck with corduroy collar, deep map pockets, and triple-stitched stress points.",
    details: [
      "14oz heavyweight 100% cotton canvas duck",
      "Contrast corduroy turn-down collar",
      "Three large external patch pockets plus interior document pocket",
      "Reinforced heavy metal shank button closure"
    ],
    fabricCare: "100% Cotton. Machine wash cold. Hang dry.",
    fabric: "100% Cotton",
    fit: "Relaxed Boxy",
    occasion: "Travel",
    rating: 4.9,
    reviewCount: 40,
    isNew: false,
    isBestSeller: true,
    badge: "DURABLE CHORE",
    featuredOrder: 15,
    isDailyEssential: false,
    inStock: true,
    tags: ["chore", "jacket", "travel", "canvas", "workwear"]
  },

  // ==========================================
  // 9. BEACH WEAR
  // ==========================================
  {
    id: "leo-bea-01",
    name: "The Tropical Island Linen Beach Shirt",
    subtitle: "Open Weave French Normandy Linen",
    category: "Beach Wear",
    categorySlug: "beach-wear",
    price: 2890,
    salePrice: 2490,
    colors: [
      { name: "Sun Bleached White", hex: "#FAF8F5" },
      { name: "Ocean Sage", hex: "#7E968B" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80"
    ],
    description: "An airy, sun-washed beach overshirt crafted with an open gauze linen weave that welcomes ocean breezes. Perfect worn unbuttoned over swim shorts.",
    details: [
      "100% Open-weave Normandy flax linen",
      "Camp Cuban collar with relaxed open placket",
      "Chest sun-glass loop pocket",
      "Side slit straight hem for breezy movement"
    ],
    fabricCare: "100% Linen. Gentle wash cold. Hang dry in shade.",
    fabric: "Pure Linen",
    fit: "Relaxed Boxy",
    occasion: "Beach",
    rating: 4.8,
    reviewCount: 31,
    isNew: true,
    isBestSeller: true,
    badge: "RESORT",
    featuredOrder: 15,
    isDailyEssential: false,
    inStock: true,
    tags: ["beach", "linen", "shirt", "resort", "vacation"]
  },
  {
    id: "leo-bea-02",
    name: "The Quick-Dry Tailored Beach Swim Shorts",
    subtitle: "6-Inch Tailored Fit with Mesh Lining",
    category: "Beach Wear",
    categorySlug: "beach-wear",
    price: 2190,
    salePrice: 1890,
    colors: [
      { name: "Deep Navy", hex: "#1D2533" },
      { name: "Terracotta Sand", hex: "#B86B52" }
    ],
    sizes: ["30", "32", "34", "36"],
    images: [
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Fast-drying recycled nylon beach shorts cut in a tailored 6-inch silhouette that transitions seamlessly from ocean swimming to outdoor cafe dining.",
    details: [
      "100% Recycled quick-dry nylon with DWR finish",
      "Ultra-soft fine stretch inner mesh brief",
      "Drawstring elastic waistband with matte gunmetal aglets",
      "Rear drainage grommet pocket with zip closure"
    ],
    fabricCare: "Machine wash cold. Rinse after saltwater immersion. Air dry.",
    fabric: "Tech Stretch",
    fit: "Tailored Regular",
    occasion: "Beach",
    rating: 4.7,
    reviewCount: 28,
    isNew: false,
    isBestSeller: false,
    badge: "QUICK DRY",
    featuredOrder: 9,
    isDailyEssential: false,
    inStock: true,
    tags: ["swim", "shorts", "beach", "swimwear", "water"]
  },

  // ==========================================
  // 10. STREETWEAR
  // ==========================================
  {
    id: "leo-str-01",
    name: "The Washed Black Heavy Boxy Tee",
    subtitle: "280 GSM Mineral Washed Drop-Shoulder",
    category: "Streetwear",
    categorySlug: "streetwear",
    price: 2490,
    salePrice: 1990,
    colors: [
      { name: "Washed Onyx", hex: "#222120" },
      { name: "Carbon Slate", hex: "#383B3E" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Mineral-washed black oversized tee with soft vintage fading along the seams and collar. Cut wide and square for an effortless modern streetwear drape.",
    details: [
      "280 GSM combed ringspun cotton",
      "Mineral wash process gives unique patina to every garment",
      "Oversized drop shoulder cut with generous sleeve length",
      "Double-needle bottom hem and sleeve hems"
    ],
    fabricCare: "100% Cotton. Machine wash cold with darks. Line dry.",
    fabric: "100% Cotton",
    fit: "Oversized Drop-Shoulder",
    occasion: "Streetwear",
    rating: 4.9,
    reviewCount: 88,
    isNew: true,
    isBestSeller: true,
    badge: "STREET DROP",
    featuredOrder: 22,
    isDailyEssential: true,
    inStock: true,
    tags: ["streetwear", "boxy", "tee", "black", "oversized"]
  },
  {
    id: "leo-str-02",
    name: "The Baggy Denim Skate Shorts",
    subtitle: "13.5oz Vintage Washed Cotton Jorts",
    category: "Streetwear",
    categorySlug: "streetwear",
    price: 2790,
    salePrice: 2390,
    colors: [
      { name: "Vintage Blue Wash", hex: "#637B99" },
      { name: "Washed Black", hex: "#2B2B2B" }
    ],
    sizes: ["30", "32", "34", "36", "38"],
    images: [
      "/images/products/baggy-denim-shorts-1.jpg",
      "/images/products/burgundy-oversized-tee-2.jpg"
    ],
    description: "90s-inspired knee-length baggy denim jorts crafted from 100% durable 13.5oz ring-spun cotton denim. Features a spacious relaxed thigh cut, classic 5-pocket styling, and heavy antique brass hardware.",
    details: [
      "100% Heavyweight 13.5oz ring-spun cotton denim",
      "Loose baggy fit with knee-length hem",
      "Reinforced belt loops and heavy copper rivets",
      "Garment washed for authentic vintage blue tint and soft drape"
    ],
    fabricCare: "100% Cotton Denim. Machine wash cold inside out. Tumble dry low or line dry.",
    fabric: "Denim",
    fit: "Wide Leg",
    occasion: "Streetwear",
    rating: 4.9,
    reviewCount: 61,
    isNew: true,
    isBestSeller: true,
    badge: "ICONIC JORTS",
    featuredOrder: 19,
    isDailyEssential: false,
    inStock: true,
    tags: ["jorts", "shorts", "denim", "baggy", "skate", "streetwear"]
  },
  {
    id: "leo-str-03",
    name: "The 280 GSM Boxy Tee - Vintage Bone",
    subtitle: "Heavyweight Combed Drop-Shoulder",
    category: "Streetwear",
    categorySlug: "streetwear",
    price: 2490,
    salePrice: 1990,
    colors: [
      { name: "Vintage Bone", hex: "#EDE8DF" },
      { name: "Chalk White", hex: "#F7F5F0" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Architecturally proportioned drop-shoulder tee knitted from heavy 280 GSM ringspun cotton in warm vintage bone. Crisp body drape that holds its boxy silhouette without clinging.",
    details: [
      "280 GSM heavyweight 100% ringspun cotton",
      "High-density twin-needle rib collar",
      "Wide boxy elbow-length sleeves",
      "Pre-washed to resist shrinkage"
    ],
    fabricCare: "100% Cotton. Machine wash cold with like shades. Tumble dry gentle.",
    fabric: "100% Cotton",
    fit: "Oversized Drop-Shoulder",
    occasion: "Streetwear",
    rating: 4.9,
    reviewCount: 57,
    isNew: false,
    isBestSeller: true,
    badge: "CORE ESSENTIAL",
    featuredOrder: 17,
    isDailyEssential: true,
    inStock: true,
    tags: ["boxy", "tee", "bone", "white", "streetwear", "heavyweight"]
  },

  // ==========================================
  // 11. ETHNIC WEAR
  // ==========================================
  {
    id: "leo-eth-01",
    name: "The Royal Embroidered Raw Silk Kurta",
    subtitle: "Pure Bhagalpur Raw Silk with Threadwork",
    category: "Ethnic Wear",
    categorySlug: "ethnic-wear",
    price: 4890,
    salePrice: 4290,
    colors: [
      { name: "Ivory Gold", hex: "#F5F0DF" },
      { name: "Deep Ruby", hex: "#5C1D24" },
      { name: "Midnight Teal", hex: "#1A3C40" }
    ],
    sizes: ["38", "40", "42", "44", "46"],
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Handcrafted from pure Bhagalpur raw silk with delicate tone-on-tone zari and resham threadwork along the mandarin collar and placket. Finished with side slits for stately movement.",
    details: [
      "100% Pure Bhagalpur handloom raw silk",
      "Mandarin collar with intricate hand-guided embroidery",
      "Concealed button placket with antique metallic buttons",
      "Includes tailored cotton-silk churidar bottoms"
    ],
    fabricCare: "Dry clean only to maintain silk luster.",
    fabric: "Raw Silk",
    fit: "Tailored Regular",
    occasion: "Ethnic",
    rating: 5.0,
    reviewCount: 45,
    isNew: true,
    isBestSeller: true,
    badge: "FESTIVE ROYAL",
    featuredOrder: 23,
    isDailyEssential: false,
    inStock: true,
    tags: ["kurta", "ethnic", "silk", "wedding", "festive", "traditional"]
  },
  {
    id: "leo-eth-02",
    name: "The Handwoven Tussar Silk Nehru Bundi Jacket",
    subtitle: "Structured Stand Collar with Horn Buttons",
    category: "Ethnic Wear",
    categorySlug: "ethnic-wear",
    price: 4490,
    salePrice: 3890,
    colors: [
      { name: "Golden Ochre", hex: "#C79D58" },
      { name: "Charcoal Slate", hex: "#2C2F33" }
    ],
    sizes: ["38", "40", "42", "44"],
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1616805765352-beedbad46b2a?auto=format&fit=crop&w=900&q=80"
    ],
    description: "An authentic Nehru bundi jacket tailored from textured Tussar silk. Features structured front canvas interlining, dual lower jetted pockets, and a chest welt pocket for pocket squares.",
    details: [
      "Handwoven Tussar silk with textured slub character",
      "Structured mandarin bandhgala stand collar",
      "Five front metal-rimmed buttons and three functional pockets",
      "Pairs impeccably over kurtas or formal dress shirts"
    ],
    fabricCare: "Dry clean only.",
    fabric: "Raw Silk",
    fit: "Tailored Regular",
    occasion: "Ethnic",
    rating: 4.9,
    reviewCount: 37,
    isNew: true,
    isBestSeller: true,
    badge: "HANDLOOM SILK",
    featuredOrder: 19,
    isDailyEssential: false,
    inStock: true,
    tags: ["nehru-jacket", "bundi", "ethnic", "vest", "jacket", "festive"]
  },
  {
    id: "leo-eth-03",
    name: "The Regal Brocade Festive Sherwani Set",
    subtitle: "Intricate Banarasi Weave with Silk Stole",
    category: "Ethnic Wear",
    categorySlug: "ethnic-wear",
    price: 14990,
    salePrice: 12990,
    colors: [
      { name: "Royal Ivory & Gold", hex: "#F3ECD9" },
      { name: "Groom Maroon", hex: "#4E1A22" }
    ],
    sizes: ["38", "40", "42", "44"],
    images: [
      "https://images.unsplash.com/photo-1616805765352-beedbad46b2a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "An opulent wedding sherwani tailored in Varanasi from rich Banarasi brocade with micro-woven metallic motifs. Includes matching churidar and contrast silk stole.",
    details: [
      "Authentic Banarasi brocade silk with metallic zari weave",
      "Hand-set jeweled buttons along the center placket",
      "Full internal satin lining for maximum comfort during rituals",
      "Complete ensemble: Sherwani, Churidar and Embroidered Stole"
    ],
    fabricCare: "Dry clean only by wedding couture specialist.",
    fabric: "Raw Silk",
    fit: "Tailored Regular",
    occasion: "Ethnic",
    rating: 5.0,
    reviewCount: 29,
    isNew: false,
    isBestSeller: true,
    badge: "WEDDING ROYALE",
    featuredOrder: 15,
    isDailyEssential: false,
    inStock: true,
    tags: ["sherwani", "groom", "ethnic", "wedding", "banarasi"]
  }
];

export default products;
