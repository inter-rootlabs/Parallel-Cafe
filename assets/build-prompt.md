# BUILD PROMPT FOR GLM 5.2 — Parallel Cafe Multi-Experience Website (Demo Build)

> **How to use this file:** Paste this entire prompt into GLM 5.2, and attach `logo.jpeg`, `menu.webp`, and `offers.webp` alongside it. All critical data has also been transcribed into this prompt as structured JSON so nothing is lost even if image parsing is imperfect.

---

## 0. ROLE & OBJECTIVE

You are a senior frontend engineer building a **demo/prototype website** for **Parallel Cafe**, a Bengaluru café that also operates a **Private Screening room** and a **Gaming zone** (PS5) under one brand. This demo will later be extended into a full production system (real bookings, payments, ordering) by another engineering pass — **so architecture matters as much as visuals.** Build it so that swapping mock logic for real APIs later requires editing isolated service files, not rewriting components.

Output a complete, runnable repository: all files, folder structure, `README.md` with setup steps, and a `.env.local.example`.

---

## 1. PROJECT CONTEXT

**Brand:** Parallel Cafe — one brand, three experiences under one roof:
1. **Cafe** — pure veg, Jain-friendly food & beverage café
2. **Private Screening** — private movie/screening rooms, bookable by the hour
3. **Gaming** — PS5 gaming zone, bookable by the hour, hosts tournaments

Tagline (from logo): **"Coffee · Food · Play · Screen"**

**Business info (use exactly):**
```json
{
  "name": "Parallel Cafe",
  "tagline": "Coffee. Food. Play. Screen.",
  "address": "Ground Floor, 2006/A, 26th Main, South End Main Road, Jayanagar 9th Block, Bengaluru, Karnataka 560041",
  "landmark": "Near Ragigudda Temple, Jayanagar",
  "hours": "10:00 AM – 11:30 PM, all days",
  "instagram": "@parallel.cafe",
  "dietary": "100% Pure Veg. Jain option available on request (no onion, no garlic)."
}
```

**Structure decision:** This is **one Next.js app with three themed sub-sites** reached via routing (`/cafe`, `/private-screening`, `/gaming`), sharing one global header and one long, detailed footer, but each section has its own color theme, hero mood, and content.

**Scope for this demo:**
- Frontend-heavy, backend minimal (Sanity CMS is effectively "the backend" for content).
- Cafe menu: fully real data (provided below), browsable/filterable/sortable like Swiggy/Zomato, **display + local cart UI only** — no real checkout.
- Private Screening & Gaming: booking UI is **fully interactive on the frontend** (date/time/slot selection, validation, confirmation screen) but **does not persist or charge anything** — clearly labeled as a demo flow.
- All monetary/booking actions must end in an honest UI state like *"This is a demo booking flow — no payment has been taken."*

---

## 2. TECH STACK (use exactly this — it is the optimal, lowest-friction path to production)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router, TypeScript)** | File-based routing maps perfectly to /cafe, /private-screening, /gaming; SSR/ISR ready for Sanity content; industry-standard path to production |
| CMS | **Sanity (v3, Studio embedded at `/studio`)** | User-specified. Structured content, image pipeline (CDN + hotspot cropping), great DX |
| Styling | **Tailwind CSS** + CSS custom properties for per-section theming | Fastest way to implement mobile-first responsive design with scoped color tokens |
| Icons | **lucide-react** | Lightweight, consistent, tree-shakeable |
| Forms/validation | **react-hook-form + zod** | Needed now for booking/contact forms, and directly reusable for production payment/booking forms |
| Fonts | **next/font** (self-hosted, no layout shift) — see Section 3.2 | |
| Hosting target | **Vercel** | Zero-config Next.js deploys, preview URLs per PR, trivial env var management |
| Package manager | npm | |

Do **not** introduce Redux/Zustand/global state libraries — React Context + local state is sufficient for cart/theme/booking-form state at this scale.

---

## 3. DESIGN SYSTEM

### 3.1 Color tokens (exact hex — do not alter)

Implement as CSS custom properties, scoped globally for brand chrome, and re-scoped per route segment for section themes.

**Global brand chrome** (header, footer, base neutrals — used everywhere regardless of section):
```css
--brand-ink: #2f3e36;      /* header/footer background, matches logo bg */
--brand-cream: #FAF7F2;    /* neutral light background outside themed sections */
--brand-white: #FFFFFF;
--brand-text-dark: #1A1F1C;
```

**Cafe section theme** (`/cafe`):
```css
--section-primary: #2f3e36;   /* deep forest green — headers, primary buttons */
--section-accent:  #74bd58;   /* fresh green — CTAs, active states, price highlights */
--section-surface: #d3fbd8;   /* pale mint — card backgrounds, section bg */
```

**Private Screening theme** (`/private-screening`):
```css
--section-primary: #b76e79;   /* rose mauve — headers, primary buttons */
--section-accent:  #9c6880;   /* plum — secondary accents, hover states */
--section-surface: #ebdfe4;   /* blush — card backgrounds, section bg */
```

**Gaming theme** (`/gaming`):
```css
--section-primary: #00aab7;   /* teal — primary buttons, headers (use for TEXT on light bg — better contrast than cyan) */
--section-accent:  #7df9ff;   /* electric cyan — glows, borders, decorative accents, large elements only */
--section-surface: #e1ffff;   /* pale cyan — card backgrounds */
--section-highlight: #fcfcd4; /* pale yellow — badges, "hot" tags, tournament highlights */
```

**Accessibility rule:** `#7df9ff` fails contrast for body text on light backgrounds. Use it only for glows, borders, large headline text on dark backgrounds, or decorative shapes. All readable text must resolve to at least WCAG AA contrast — use `--section-primary` (`#00aab7`) or near-black for text in the gaming theme, never small cyan-on-white text.

Implement theming via a `SectionThemeProvider` that sets a `data-theme="cafe"|"screening"|"gaming"` attribute on a wrapping element per route layout, with Tailwind config referencing `var(--section-primary)` etc. so components stay theme-agnostic.

### 3.2 Typography

- **Headings (global, all sections):** `Fraunces` (elegant serif — echoes the serif "PARALLEL" wordmark in the logo). Brand consistency across all three sections.
- **Body (global):** `Inter` — clean, highly legible at small sizes for menu/price lists.
- **Screening-only accent font:** `Cormorant Garamond` (italic) for romantic taglines/quotes only (e.g. hero subheadline).
- **Gaming-only accent font:** `Rajdhani` or `Orbitron` for prices, countdown timers, tournament headers, and stat numbers — gives a tech/HUD feel without breaking global heading consistency (used only for numerals/labels, not full paragraphs).

Load all via `next/font/google` with `display: 'swap'`. Use fluid type scale with `clamp()` so headings scale smoothly from 360px to 1920px viewports.

### 3.3 Shared visual language
- Rounded corners: `rounded-2xl` for cards, `rounded-full` for pills/badges/buttons.
- Soft shadows, no harsh drop-shadows.
- Veg indicator: small green square with green dot (standard Indian veg symbol) next to every menu item — all items are veg, but keep it visible for trust.
- Consistent card pattern reused across Menu items, Offers, Tournaments, Room details: `image top / content bottom / price+CTA row`.

---

## 4. FOLDER STRUCTURE (produce exactly this shape)

```
parallel-cafe/
├── app/
│   ├── layout.tsx                     # Root layout: fonts, global header, footer, cart provider
│   ├── page.tsx                       # Home hub
│   ├── globals.css
│   ├── cafe/
│   │   ├── layout.tsx                 # sets data-theme="cafe"
│   │   └── page.tsx
│   ├── private-screening/
│   │   ├── layout.tsx                 # sets data-theme="screening"
│   │   └── page.tsx
│   ├── gaming/
│   │   ├── layout.tsx                 # sets data-theme="gaming"
│   │   └── page.tsx
│   ├── offers/
│   │   └── page.tsx
│   ├── studio/[[...tool]]/page.tsx    # embedded Sanity Studio
│   └── api/
│       └── contact/route.ts           # stub endpoint, validated, rate-limit-ready
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Footer.tsx
│   │   └── SectionThemeProvider.tsx
│   ├── menu/
│   │   ├── MenuGrid.tsx
│   │   ├── MenuCard.tsx
│   │   ├── MenuFilters.tsx            # category chips, search, sort, jain toggle
│   │   └── CartDrawer.tsx
│   ├── booking/
│   │   ├── BookingWidget.tsx
│   │   ├── DateTimeSlotPicker.tsx
│   │   └── BookingConfirmationModal.tsx
│   ├── offers/
│   │   ├── OfferCard.tsx
│   │   ├── WeekdayOfferStrip.tsx
│   │   └── CelebrationPackageCard.tsx
│   └── ui/                            # Button, Badge, Container, Section, Chip — design-system primitives
├── lib/
│   ├── sanity/
│   │   ├── client.ts                  # read-only client, env-driven
│   │   ├── image.ts                   # urlFor() helper
│   │   └── queries.ts                 # GROQ queries
│   ├── services/
│   │   ├── bookings.service.ts        # createBooking() — MOCKED, swap-ready
│   │   └── orders.service.ts          # createOrder() — MOCKED, swap-ready
│   ├── cart/
│   │   └── cart-context.tsx
│   └── seed/
│       ├── menu.json                  # from Section 6
│       └── offers.json                # from Section 6
├── sanity/
│   ├── sanity.config.ts
│   └── schemaTypes/                   # from Section 5
├── types/
│   └── index.ts
├── public/
│   └── images/                        # logo.jpeg goes here
├── .env.local.example
└── README.md
```

---

## 5. SANITY SCHEMA (generate exactly these document types)

```ts
// siteSettings.ts (singleton)
{
  name: 'siteSettings', type: 'document', title: 'Site Settings',
  fields: [
    { name: 'logo', type: 'image', title: 'Logo' },
    { name: 'address', type: 'text' },
    { name: 'landmark', type: 'string' },
    { name: 'hours', type: 'string' },
    { name: 'instagram', type: 'string' },
    { name: 'dietaryNote', type: 'string' },
    { name: 'homeHeroTitle', type: 'string' },
    { name: 'homeHeroSubtitle', type: 'string' },
  ]
}

// menuCategory.ts
{
  name: 'menuCategory', type: 'document', title: 'Menu Category',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'order', type: 'number' },
    { name: 'type', type: 'string', options: { list: ['food', 'beverage', 'dessert'] } },
  ]
}

// menuItem.ts
{
  name: 'menuItem', type: 'document', title: 'Menu Item',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'price', type: 'number' },
    { name: 'category', type: 'reference', to: [{ type: 'menuCategory' }] },
    { name: 'image', type: 'image' },
    { name: 'isVeg', type: 'boolean', initialValue: true },
    { name: 'jainAvailable', type: 'boolean', initialValue: true },
    { name: 'isSignature', type: 'boolean', title: 'Parallel Special / Signature' },
    { name: 'available', type: 'boolean', initialValue: true },
  ]
}

// offer.ts
{
  name: 'offer', type: 'document', title: 'Offer',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'type', type: 'string', options: { list: ['flat', 'weekday', 'loyalty', 'startingFrom'] } },
    { name: 'day', type: 'string', title: 'Applicable Day (for weekday offers)' },
    { name: 'condition', type: 'string' },
    { name: 'active', type: 'boolean', initialValue: true },
    { name: 'priority', type: 'number' },
  ]
}

// celebrationPackage.ts
{
  name: 'celebrationPackage', type: 'document', title: 'Celebration Package',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'price', type: 'number' },
    { name: 'originalPrice', type: 'number' },
    { name: 'inclusions', type: 'array', of: [{ type: 'string' }] },
    { name: 'idealFor', type: 'array', of: [{ type: 'string' }] },
    { name: 'image', type: 'image' },
  ]
}

// tournament.ts
{
  name: 'tournament', type: 'document', title: 'Gaming Tournament',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'date', type: 'datetime' },
    { name: 'entryFee', type: 'number' },
    { name: 'prize', type: 'string' },
    { name: 'registrationOpen', type: 'boolean', initialValue: true },
    { name: 'image', type: 'image' },
  ]
}

// sectionHero.ts — one document per section (cafe / screening / gaming), editable copy
{
  name: 'sectionHero', type: 'document', title: 'Section Hero',
  fields: [
    { name: 'section', type: 'string', options: { list: ['cafe', 'screening', 'gaming'] } },
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'string' },
    { name: 'heroImage', type: 'image' },
  ]
}
```

Use a **read-only** `NEXT_PUBLIC_SANITY_*` client for all rendering. Never expose a write token client-side.

---

## 6. SEED CONTENT (transcribed from the provided menu.webp and offers.webp — use as-is, this is real production data)

### 6.1 Full menu (write a `lib/seed/menu.json` with this exact structure and also create matching Sanity documents)

```json
{
  "miniMarvels": [
    { "name": "Chipotle Korean Bun", "price": 130 },
    { "name": "Cheese Korean Bun", "price": 99 },
    { "name": "Farm Fresh Sandwich", "price": 99 },
    { "name": "Choco Dreamwich Sandwich", "price": 99 },
    { "name": "Desi Creamy Paneer Sandwich", "price": 120 },
    { "name": "Mini Garlic Pop Slider Burger", "price": 99 },
    { "name": "Just Cold Coffee", "price": 99 },
    { "name": "Filter Coffee", "price": 80 }
  ],
  "starters": [
    { "name": "Cheesy Chaos Nachos", "price": 280 },
    { "name": "Peri Peri French Fries", "price": 199 },
    { "name": "Paneer Chilli", "price": 250 },
    { "name": "Creamy Paneer", "price": 280 },
    { "name": "Paneer Pockets (6 Pcs)", "price": 270 },
    { "name": "Baby Corn Manchurian", "price": 260 },
    { "name": "Cheesy Garlic Bites", "price": 199 }
  ],
  "pasta": [
    { "name": "White Sauce Pasta", "price": 260 },
    { "name": "Red Sauce Pasta", "price": 280 },
    { "name": "Mix Blast Pasta", "price": 300 },
    { "name": "Pesto Pasta", "price": 320 }
  ],
  "pizza": [
    { "name": "Focaccia Paneer Trick", "price": 500 },
    { "name": "Any Focaccia Half Pizza", "price": 300 },
    { "name": "Focaccia Jumbo Veggie Blast", "price": 480 },
    { "name": "Focaccia Chilly Cheese", "price": 450 }
  ],
  "sandwiches": [
    { "name": "Focaccia Paneer Blast", "price": 350 },
    { "name": "Focaccia Veg Loaded", "price": 320 },
    { "name": "Panini Grill Paneer", "price": 280 },
    { "name": "Panini Fried Paneer", "price": 250 },
    { "name": "Panini Veg Loaded", "price": 250 },
    { "name": "Panini Sweet Corn Grill", "price": 230 }
  ],
  "rice": [
    { "name": "Peri Peri Rice", "price": 260 },
    { "name": "Mexican Rice", "price": 260 },
    { "name": "Schezwan Rice", "price": 260 }
  ],
  "parallelSpecial": [
    { "name": "Tiramisu Jumbo Affogato", "price": 450, "isSignature": true },
    { "name": "Chocolate Therapy", "price": 280, "description": "Luxurious blend of melted chocolate and creamy goodness.", "isSignature": true },
    { "name": "Tres'presso Shots (6 Shots)", "price": 350, "description": "A perfect fusion of creamy ice cream & soft truffles.", "isSignature": true },
    { "name": "The Sand Dune", "price": 320, "description": "Espresso topped with velvety vanilla caramel foam.", "isSignature": true },
    { "name": "Bell Pepper Rice With Paprika Sauce", "price": 330, "description": "A smooth & creamy sauce infused with smoky paprika & bell peppers.", "isSignature": true }
  ],
  "mocktails": [
    { "name": "Lemon Iced Tea", "price": 190 },
    { "name": "Black Currant", "price": 190 },
    { "name": "Blue Lagoon", "price": 190 },
    { "name": "Watermelon Mojito", "price": 190 },
    { "name": "Virgin Mojito", "price": 180 },
    { "name": "The Pink Lady", "price": 230 },
    { "name": "Virgin Pina Colada", "price": 250 }
  ],
  "coldCoffees": [
    { "name": "Vietnamese", "price": 280 },
    { "name": "Cold Brew", "price": 250 },
    { "name": "Iced Peach Americano", "price": 250 },
    { "name": "Iced Americano", "price": 150 },
    { "name": "Cappuccino Cold Coffee", "price": 240 },
    { "name": "Hazelnut Cold Coffee", "price": 280 },
    { "name": "Iced Double Shot Espresso", "price": 180 },
    { "name": "Iced Espresso", "price": 130 },
    { "name": "Caramel Cold Coffee", "price": 280 }
  ],
  "matcha": [
    { "name": "Plain Matcha", "price": 260 },
    { "name": "Mango Matcha", "price": 300 },
    { "name": "Strawberry Matcha", "price": 300 }
  ],
  "hotCoffees": [
    { "name": "Flat White", "price": 210 },
    { "name": "Espresso Single Shot", "price": 100 },
    { "name": "Double Shot Espresso", "price": 150 },
    { "name": "Macchiato", "price": 180 },
    { "name": "Cortado", "price": 180 },
    { "name": "Cappuccino", "price": 210 },
    { "name": "Latte", "price": 210 },
    { "name": "Hazelnut Hot Coffee", "price": 250 },
    { "name": "Caramel Hot Coffee", "price": 250 },
    { "name": "Choco Mocha Hot Coffee", "price": 250 },
    { "name": "Spanish", "price": 250 }
  ],
  "affogato": [
    { "name": "Walnut Brownie Affogato", "price": 350 },
    { "name": "Just Affogato", "price": 190 }
  ],
  "bakery": [
    { "name": "Creamy Tiramisu Cake", "price": 199 },
    { "name": "Walnut Brownie", "price": 120 }
  ],
  "cheeseBalls": [
    { "name": "Cheese Balls (Peri Peri)", "price": 250 }
  ],
  "cheeseCakes": [
    { "name": "Biscoff", "price": 350 },
    { "name": "Blueberry", "price": 290 },
    { "name": "Mango Cheese Cake", "price": 320 },
    { "name": "Plain Cheese Cake", "price": 200 }
  ],
  "maggie": [
    { "name": "Plain Maggie", "price": 90 },
    { "name": "Peri Peri Maggie", "price": 120 },
    { "name": "Double Cheese Maggie", "price": 150 }
  ],
  "tea": [
    { "name": "Tea", "price": 50 }
  ],
  "other": [
    { "name": "Red Bull", "price": 150 }
  ]
}
```

All items: `isVeg: true`, `jainAvailable: true` (global banner: *"We serve both Jain & Regular — Jain = no onion, no garlic. Let staff know your preference."*).

### 6.2 Offers (write `lib/seed/offers.json`, matching Sanity `offer`/`celebrationPackage` docs)

```json
{
  "startingFrom99": { "price": 99, "items": ["Maggie", "Sandwiches", "Korean Buns", "Walnut Brownies"] },
  "flatOffers": [
    { "title": "Free 1 Hour PS5 Gaming", "condition": "With birthday celebrations" },
    { "title": "Buy 2 Mocktails, Get 1 Free", "condition": null },
    { "title": "Buy Any Full Pizza, Get 1 Mocktail Free", "condition": null },
    { "title": "20% Off Your Bill", "condition": "Make a reel at Parallel Cafe" }
  ],
  "weekdayOffers": [
    { "day": "Tuesday", "item": "Free Korean Bun", "condition": "On bills above ₹500" },
    { "day": "Wednesday", "item": "Free Cold Coffee", "condition": "On bills above ₹500" },
    { "day": "Thursday", "item": "Free French Fries", "condition": "On bills above ₹500" },
    { "day": "Friday", "item": "Free Walnut Brownie", "condition": "On bills above ₹500" }
  ],
  "celebrationPackage": {
    "title": "Grand Celebrations Package",
    "price": 1999,
    "originalPrice": 2999,
    "inclusions": ["Decoration", "1 Full Pizza", "2 Mocktails", "Fries"],
    "idealFor": ["Birthdays", "Dates", "Proposals", "Celebrations"]
  },
  "loyalty": { "title": "Repeat Customers Get 10% Off", "condition": "On every visit — can be clubbed with any other offer" },
  "social": { "instagram": "@parallel.cafe" }
}
```

**Important:** Structure the Offers page so the hero banner image comes from a single `siteSettings.currentOffersImage` field in Sanity. The client will periodically send a new offers poster (already have two examples: `offers.webp`) — replacing that one Sanity field should be the *entire* update workflow, no developer needed. Design the page so this hero image can stand alone OR be paired with the structured offer cards above (build both: structured cards as the primary always-on-brand layout, with room for the poster image as a hero visual at the top).

### 6.3 Logo
Use the provided `logo.jpeg` (circular emblem, dark green `#2f3e36` background, cream "P" monogram with steam, "PARALLEL CAFE" wordmark, "COFFEE · FOOD · PLAY · SCREEN" tagline) as the site logo — header (small, top-left), footer (larger), and favicon source. Place it in Sanity `siteSettings.logo` as well as `/public/images/logo.jpeg` as a static fallback.

---

## 7. SITE MAP

| Route | Purpose |
|---|---|
| `/` | Home hub — brand hero + 3 tiles into each experience |
| `/cafe` | Full menu, browsable/filterable, cart UI |
| `/private-screening` | Room info, booking widget, add-on menu ordering |
| `/gaming` | PS5 info, tournaments, booking widget |
| `/offers` | All current offers, celebration package, loyalty note |
| `/studio` | Embedded Sanity Studio (content editing) |

---

## 8. PAGE-BY-PAGE SPEC

### 8.1 Home (`/`)
- Full-bleed hero, `--brand-ink` background, logo centered/left, tagline, subtle animated gradient or steam motif (respect `prefers-reduced-motion`).
- Three large tappable experience tiles (Cafe / Private Screening / Gaming), each previewing its section's `--section-primary`/`--section-surface` colors, a one-line description, and an "Explore →" CTA. Mobile: stacked full-width cards. Desktop: 3-column grid.
- Trust strip: "100% Pure Veg" · "Jain-Friendly" · "Open 10 AM – 11:30 PM" · "Jayanagar, Bengaluru".
- Offers teaser: pull 2–3 highest-priority active offers from Sanity, link to `/offers`.
- Instagram CTA: "@parallel.cafe".
- Footer.

### 8.2 Cafe (`/cafe`)
- Hero: cafe theme, headline + subheadline, stock café-ambience background image (warm tones) under a `--brand-ink`/`--section-primary` gradient overlay for text contrast, CTA scrolls to menu.
- USP strip (from menu flyer): "100% Pure Veg Fresh Ingredients" · "Cooked With Care, Served With Smile" · "Pure Taste, Pure Joy."
- **Menu browser (Zomato/Swiggy pattern):**
  - Sticky horizontal category chip bar (all 18 categories from §6.1), active chip highlighted in `--section-accent`. Horizontally scrollable on mobile, no wrap.
  - Search input (filters by name).
  - Sort control: Price Low→High, Price High→Low, Name A–Z.
  - Filter toggles: "Beverages only" / "Food only", plus a static "Jain option available" info badge (not a per-item filter, since it's prep-time customizable for the whole menu).
  - Responsive grid of `MenuCard`: stock food image (see §11), name, description (if provided), price, veg-dot, "ADD" button (adds to local `CartDrawer` — client-state only).
  - `CartDrawer`: slide-up on mobile / slide-in on desktop, shows items + subtotal, and a clearly worded note: *"This is a demo — place your order at the counter. Online ordering launches soon."* No checkout, no payment.
- Gallery strip: 4–6 stock café-interior images.
- CTA banner linking to `/offers`.
- Footer.

### 8.3 Private Screening (`/private-screening`)
- Hero: mauve/plum theme, intimate/romantic tone copy (use the Cormorant Garamond italic accent for a short tagline), stock private-cinema/home-theatre ambience image.
- Room info cards: **2 Screening Rooms · ₹300/hour** — include placeholder specs (screen size, sound system, seating capacity) explicitly commented `{/* PLACEHOLDER — replace with real specs */}`.
- **Booking widget** (fully interactive, demo-only):
  - Date picker (next 14 days), time-slot grid (10:00 AM–11:00 PM in hourly blocks, visually mark a few as "Unavailable" to feel real), duration stepper (1–4 hrs), guest count, name + phone fields (react-hook-form + zod validation).
  - "Reserve Now" → `BookingConfirmationModal` summarizing the request, with the line: *"Demo booking flow — no payment has been taken. In production this will confirm in real time and process payment via Razorpay."*
- "Add food & drinks to your screening" — reuse a compact `MenuGrid` (filterable), adds to the same cart context.
- Feature the **Grand Celebrations Package** card here (₹1999, was ₹2999) since it's the natural upsell for this room.
- Footer.

### 8.4 Gaming (`/gaming`)
- Hero: teal/cyan theme, dark background with neon-glow accent shapes (respect reduced-motion), energetic tone, Rajdhani/Orbitron accent font for the price/stat numerals.
- PS5 Zone card: **1 PS5 available · ₹300/hour**, placeholder game library list (mark placeholder), highlight the offer "Free 1 Hour PS5 Gaming with birthday celebrations."
- Tournament section: 2–3 placeholder `tournament` cards (title, date, entry fee, prize, "Register Interest" button — demo only, opens a simple confirmation toast, no backend).
- **Booking widget:** same pattern as Screening (single-unit availability grid since there's only 1 PS5).
- Footer.

### 8.5 Offers (`/offers`)
- Hero banner area sourced from `siteSettings.currentOffersImage` (Sanity), with structured content below always present regardless of poster image:
  - "Starting from ₹99" strip.
  - Flat offer cards grid (2 mocktails free, pizza+mocktail, reel 20% off, birthday PS5 hour).
  - Weekday offer strip (Tue–Fri, 4 cards).
  - Grand Celebrations Package feature card → CTA "Book a Private Screening" → `/private-screening`.
  - Loyalty note: "Repeat customers get 10% off every visit — stackable with any other offer."
  - Instagram follow CTA.
- Footer.

### 8.6 Global Header
- Logo (left), nav links (Home, Cafe, Private Screening, Gaming, Offers), each nav item gets a small color dot matching its section theme for quick visual wayfinding.
- Mobile: hamburger → full-height slide-in drawer, large tap targets (min 44×44px), same color-dot wayfinding.
- Sticky on scroll; base background always `--brand-ink` regardless of active section (consistent brand chrome).

### 8.7 Global Footer (long, detailed, per user's spec)
Four columns on desktop, accordion-collapsible sections on mobile to avoid an unmanageably long scroll:
1. **Brand:** logo, tagline, one-line brand blurb, Instagram icon link.
2. **Explore:** links to all 5 routes.
3. **Visit Us:** full address, landmark, "Get Directions" (Google Maps link built from the address), hours.
4. **Get in Touch:** placeholder phone, placeholder email, Instagram handle, note that a contact form is available.
Bottom bar: © [current year] Parallel Cafe. All rights reserved. · "Pure Veg & Jain Friendly" badge.

---

## 9. RESPONSIVENESS — MOBILE-FIRST, EVERY DEVICE

This is a hard requirement, not a nice-to-have. Build mobile layout first, then progressively enhance.

- **Breakpoint targets to explicitly test/design for:**
  - 320–374px (iPhone SE / small Android)
  - 375–429px (standard phones)
  - 430–599px (large phones / phablets)
  - 600–767px (small tablets, portrait)
  - 768–1023px (iPad / tablets)
  - 1024–1439px (small laptops)
  - 1440–1919px (desktop)
  - 1920px+ (large desktop — cap content max-width at ~1440px, centered, don't stretch full-bleed text)
- Use Tailwind's default mobile-first breakpoints (`sm md lg xl 2xl`) — never write desktop-first overrides.
- No horizontal scrolling anywhere except intentional chip bars / carousels.
- Touch targets minimum 44×44px on all interactive elements.
- Fluid typography via `clamp()` for all headings.
- All images via `next/image` with correct `sizes` attribute so the right resolution loads per breakpoint.
- Booking widgets and cart drawer must be fully usable one-handed on a phone (bottom-sheet pattern preferred over modal-centered on small screens).
- Test the category chip bar, footer accordion, and nav drawer specifically at 320px width — these are the most likely to break first.

---

## 10. ACCESSIBILITY

- Semantic HTML (`nav`, `main`, `header`, `footer`, `section`, proper heading hierarchy).
- All images have descriptive `alt` text (even placeholders — write real alt text now, e.g. `alt="Iced cold brew coffee in a glass"`, not `alt="stock image"`).
- Color contrast: verify all text meets WCAG AA, especially in the gaming theme (see §3.1 rule on cyan usage).
- All interactive elements keyboard-navigable, visible focus states.
- Icon-only buttons get `aria-label`.
- Respect `prefers-reduced-motion` for any glow/gradient animation.

---

## 11. IMAGES / STOCK PHOTOGRAPHY

No real product photography exists yet — use royalty-free stock imagery via `next/image` with `remotePatterns` configured for `images.unsplash.com` and `images.pexels.com`. Source appropriate food/drink/café/cinema/gaming imagery matching each item/section mood. Mark every stock usage with an inline comment: `{/* STOCK IMAGE — replace with real photography in Sanity before production */}`. Do not use deprecated random-image APIs (e.g. `source.unsplash.com`) — use specific, stable image URLs.

---

## 12. ARCHITECTURE & SECURITY, EVEN AT DEMO STAGE

- All Sanity/config values via environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`). For this demo, use **placeholder values** (`"placeholder-project-id"`, `"production"`) clearly documented in `.env.local.example` — do not fabricate a fake-but-realistic-looking ID that could be mistaken for real.
- No write token anywhere in client code. If `/studio` needs write access, that's handled by Sanity's own auth, not app code.
- `lib/services/bookings.service.ts` and `orders.service.ts`: export async functions (`createBooking()`, `createOrder()`) that currently just resolve a mock promise after a simulated delay — but are written as if they call a real API, so production only needs to change the function body, not any component that calls them.
- `app/api/contact/route.ts`: validate all input server-side with zod, return proper HTTP status codes, include a code comment showing where rate-limiting (e.g. Upstash Redis) would be added in production. Do not actually send email in the demo — return a success response and log server-side only.
- Add basic security headers in `next.config.js` (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`).
- Never commit secrets. `.env.local` must be gitignored; only `.env.local.example` (with placeholder values) is committed.

---

## 13. WHAT MUST BE FULLY FUNCTIONAL vs. DEMO-ONLY (be explicit in code comments)

**Fully functional now:**
- Routing, all pages, all responsive layouts.
- Sanity-driven content (menu, offers, hero copy) — pulling real data via GROQ, not hardcoded in components (seed JSON is for initial import only).
- Menu search/filter/sort.
- Local cart add/remove/subtotal (client state).
- Booking form validation and UI flow end-to-end (just doesn't persist/charge).
- Contact form validation and a real (logged) server response.

**Explicitly demo/placeholder — label clearly wherever shown to the user:**
- Booking confirmation ("no payment taken").
- Cart checkout ("order at counter").
- Tournament registration ("register interest" only).
- Room/game specs (marked as placeholder pending real data).

---

## 14. DELIVERABLE FORMAT

Produce the full repository file-by-file. Include:
1. `README.md` — setup instructions (Node version, `npm install`, `npm run dev`, Sanity Studio access at `/studio`, how to swap placeholder Sanity project ID for a real one).
2. `.env.local.example`.
3. A `PRODUCTION_TODO.md` listing, in priority order, every place a mock/placeholder needs to become real (payment integration, real booking persistence, real room/game specs, real photography, admin auth on `/studio`).

## 15. DO NOT

- Do not implement real payment collection or store any real customer PII.
- Do not hardcode secrets or realistic-looking fake API keys.
- Do not add user authentication or an admin dashboard beyond Sanity Studio — out of scope for this demo.
- Do not use Redux or other heavy state libraries.
- Do not use deprecated/unstable image APIs.
- Do not deviate from the exact hex color values given in Section 3.1.
