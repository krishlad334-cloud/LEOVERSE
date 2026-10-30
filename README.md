# LEOVERSE — Everyday Essentials. Elevated.

A complete, modern, premium clothing brand e-commerce website built with **React.js**, **Vite**, **JavaScript (ES6+)**, and **Tailwind CSS**.

The visual architecture and user experience are meticulously inspired by high-end minimalist editorial fashion branding: featuring warm ivory backdrops, soft beige contrasts, refined grotesque and serif typography, editorial image-and-text compositions, and a deep charcoal aesthetic.

---

## ✦ Brand Identity

- **Brand Name**: LEOVERSE
- **Tagline**: *"Everyday Essentials. Elevated."*
- **Aesthetic**: Premium casual fashion menswear, relaxed streetwear-meets-tailoring, unhurried everyday overshirts, clean chinos, white sneakers, and timeless natural fibers (Australian Merino wool, French Normandy linen, Supima combed cotton, Italian calfskin suede). Zero formal suits/businesswear.

---

## ✦ Color Palette

| Design Element | Color Name | Hex Code |
|---|---|---|
| Primary Background | Warm Ivory | `#F7F5F0` |
| Secondary Background | Soft Beige | `#EAE5DC` |
| Alternate Section | Light Stone | `#DCD5CA` |
| Primary Text | Deep Charcoal | `#242321` |
| Secondary Text | Muted Grey | `#77746E` |
| Borders & Dividers | Warm Grey | `#D8D2C8` |
| Primary Button | Near Black | `#252522` |
| Button Text | Off White | `#FAF9F6` |
| Footer Background | Deep Charcoal | `#252522` |
| Footer Text | Warm White | `#F7F5F0` |

---

## ✦ Tech Stack

- **React 19** — Functional components and hooks.
- **Vite 8** — Next-generation frontend build tooling.
- **Tailwind CSS v4** — Utility-first styling with customized theme variables.
- **React Router DOM v7** — Multi-page client-side routing.
- **Lucide React** — Minimalist vector iconography.
- **React Context API** — State management for Shopping Bag (`CartContext`) and Saved Items (`WishlistContext`).
- **Local Storage** — Client persistence for cart items, quantities, and wishlist selections across browser sessions.

---

## ✦ Architecture & Pages

- **Homepage (`/`)**:
  1. Announcement Bar (*Complimentary shipping above ₹2,999 • 30-day effortless returns*)
  2. Minimalist Navbar with centered LEOVERSE wordmark, navigation links, and badge counters
  3. Hero Section (*"OFF HOURS. ON PURPOSE."*) with wide landscape editorial photography
  4. Brand Value Ticker
  5. Featured Categories (*"Find your everyday."*) with 4 visual category cards
  6. New Arrivals (*"New, not just for now."*) with interactive category tabs and 4-column product grid
  7. Split Editorial Banner (*"Less formal. More you."*) with dark charcoal contrast panel
  8. Daily Essentials (*"The daily rotation."*) with 3 foundational pieces
  9. Brand Story Section (*"Made to stay. Not to stand still."*) with atelier craftsmanship imagery
  10. Journal & Lifestyle Section (*"Notes on a good life."*)
  11. Brand Quote (*"Getting dressed should be the simplest good decision you make each day."*) in Cormorant Garamond
  12. Brand Benefits grid (Thoughtful Materials, Everyday Comfort, Considered Design, Effortless Returns)
  13. Dark Footer with newsletter subscription and prominent **LEOVERSE** wordmark
- **Shop (`/shop`)**: Full product catalog with real-time category filtering, size filter, color swatches, price slider, sorting (featured, newest, price ascending/descending, bestselling), mobile filter drawer, and empty state.
- **Product Details (`/product/:id`)**: High-resolution gallery with thumbnail switcher, color & size selectors, quantity controls, Add to Bag, Instant Checkout, Wishlist toggle, interactive accordions for tailoring specifications, fabric care, shipping details, and a responsive **Size Guide modal**.
- **Shopping Bag (`/cart`)**: Item management, quantity modification, free-shipping progress meter, coupon discounts (`LEO10`, `ELEVATED`), order cost breakdown, and proceed to checkout.
- **Wishlist (`/wishlist`)**: Saved garments with quick "Move to Bag" and removal capabilities.
- **Search (`/search`)**: Real-time query search across product titles, descriptions, categories, and tags, with popular search suggestion pills.
- **Checkout (`/checkout`)**: Multi-step checkout with delivery form validation, shipping state selector, payment method selector (Cards, UPI, Net Banking, COD), order breakdown, and instant order receipt simulation.
- **Account (`/login` & `/register`)**: Elegant auth interfaces with form validation, show/hide password, and demonstration states.
- **Collections (`/collections` & `/collections/:slug`)**: Thematic capsule releases (Pre-Fall 2026, Core Foundations, The Sunday Room, Architectural Wool).
- **Journal (`/journal` & `/journal/:slug`)**: Editorial lifestyle articles on slow fashion, fiber architecture, and minimalist wardrobes.
- **Additional Pages**: `/about`, `/contact`, `/size-guide`, `/shipping-policy`, `/return-policy`, `/privacy-policy`, `/terms`, `/404`.

---

## ✦ Installation & Local Development

### 1. Clone or navigate to the directory
```bash
cd LEOVERSE
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 4. Build for production
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```
# LEOVERSE
