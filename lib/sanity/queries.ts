import { client, isSanityConfigured } from './client';
import type { MenuItem, MenuCategory, SiteSettings, SectionHero, OffersData } from '@/types';
import menuSeedData from '@/lib/seed/menu.json';
import offersSeedData from '@/lib/seed/offers.json';

/* ============================================================
   GROQ QUERIES
   ============================================================ */

const MENU_ITEMS_QUERY = `*[_type == "menuItem" && available == true] {
  "id": _id,
  name,
  description,
  price,
  "category": category->slug.current,
  "categoryTitle": category->title,
  "image": image.asset->url,
  isVeg,
  jainAvailable,
  isSignature,
  available
} | order(category->order asc, name asc)`;

const MENU_CATEGORIES_QUERY = `*[_type == "menuCategory"] {
  "id": _id,
  title,
  "slug": slug.current,
  order,
  type
} | order(order asc)`;

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  "logo": logo.asset->url,
  address,
  landmark,
  hours,
  instagram,
  dietaryNote,
  homeHeroTitle,
  homeHeroSubtitle,
  "currentOffersImage": currentOffersImage.asset->url
}`;

const SECTION_HERO_QUERY = `*[_type == "sectionHero" && section == $section][0] {
  section,
  title,
  subtitle,
  "heroImage": heroImage.asset->url
}`;

const OFFERS_QUERY = `{
  "flatOffers": *[_type == "offer" && type == "flat" && active == true] {
    "id": _id, title, description, condition
  } | order(priority asc),
  "weekdayOffers": *[_type == "offer" && type == "weekday" && active == true] {
    day, "item": title, condition
  } | order(priority asc),
  "celebrationPackage": *[_type == "celebrationPackage"][0] {
    title, price, originalPrice, inclusions, idealFor,
    "image": image.asset->url
  }
}`;

const TOURNAMENTS_QUERY = `*[_type == "tournament"] {
  "id": _id,
  title,
  date,
  entryFee,
  prize,
  registrationOpen,
  "image": image.asset->url
} | order(date asc)`;

/* ============================================================
   DATA FETCHERS — Sanity-first with seed fallback
   Each function tries Sanity, falls back to seed JSON if
   Sanity is unconfigured or returns empty.
   ============================================================ */

/** Default site settings used when Sanity is not configured */
const defaultSiteSettings: SiteSettings = {
  address: 'Ground Floor, 2006/A, 26th Main, South End Main Road, Jayanagar 9th Block, Bengaluru, Karnataka 560041',
  landmark: 'Near Ragigudda Temple, Jayanagar',
  hours: '10:00 AM – 11:30 PM, all days',
  instagram: '@parallel.cafe',
  dietaryNote: '100% Pure Veg. Jain option available on request (no onion, no garlic).',
  homeHeroTitle: 'Coffee. Food. Play. Screen.',
  homeHeroSubtitle: 'One brand, three experiences — all under one roof in Jayanagar, Bengaluru.',
};

export async function getMenuItems(): Promise<MenuItem[]> {
  if (isSanityConfigured()) {
    try {
      const items = await client.fetch<MenuItem[]>(MENU_ITEMS_QUERY);
      if (items && items.length > 0) return items;
    } catch (e) {
      console.warn('Sanity fetch failed for menu items, using seed data:', e);
    }
  }
  return menuSeedData.items as MenuItem[];
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  if (isSanityConfigured()) {
    try {
      const categories = await client.fetch<MenuCategory[]>(MENU_CATEGORIES_QUERY);
      if (categories && categories.length > 0) return categories;
    } catch (e) {
      console.warn('Sanity fetch failed for categories, using seed data:', e);
    }
  }
  return menuSeedData.categories as MenuCategory[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSanityConfigured()) {
    try {
      const settings = await client.fetch<SiteSettings>(SITE_SETTINGS_QUERY);
      if (settings) return settings;
    } catch (e) {
      console.warn('Sanity fetch failed for site settings, using defaults:', e);
    }
  }
  return defaultSiteSettings;
}

export async function getSectionHero(section: 'cafe' | 'screening' | 'gaming'): Promise<SectionHero | null> {
  if (isSanityConfigured()) {
    try {
      const hero = await client.fetch<SectionHero>(SECTION_HERO_QUERY, { section });
      if (hero) return hero;
    } catch (e) {
      console.warn(`Sanity fetch failed for ${section} hero, using defaults:`, e);
    }
  }
  // Default hero content per section
  const defaults: Record<string, SectionHero> = {
    cafe: {
      section: 'cafe',
      title: 'Good Food. Good Mood. Good Vibes.',
      subtitle: 'Pure veg café serving fresh, made-with-love food and handcrafted coffees in the heart of Jayanagar.',
    },
    screening: {
      section: 'screening',
      title: 'Your Private Cinema Awaits',
      subtitle: 'Intimate screening rooms for movie nights, celebrations, and moments that matter.',
    },
    gaming: {
      section: 'gaming',
      title: 'Level Up Your Game',
      subtitle: 'PS5 gaming zone with tournaments, hourly bookings, and the best gaming experience in Bengaluru.',
    },
  };
  return defaults[section] || null;
}

export async function getOffers(): Promise<OffersData> {
  if (isSanityConfigured()) {
    try {
      const offers = await client.fetch(OFFERS_QUERY);
      if (offers?.flatOffers?.length > 0) {
        return {
          ...offersSeedData,
          flatOffers: offers.flatOffers,
          weekdayOffers: offers.weekdayOffers || offersSeedData.weekdayOffers,
          celebrationPackage: offers.celebrationPackage || offersSeedData.celebrationPackage,
        } as OffersData;
      }
    } catch (e) {
      console.warn('Sanity fetch failed for offers, using seed data:', e);
    }
  }
  return offersSeedData as OffersData;
}

export async function getTournaments() {
  if (isSanityConfigured()) {
    try {
      const tournaments = await client.fetch(TOURNAMENTS_QUERY);
      if (tournaments && tournaments.length > 0) return tournaments;
    } catch (e) {
      console.warn('Sanity fetch failed for tournaments, using defaults:', e);
    }
  }
  // Placeholder tournament data
  return [
    {
      id: 'tour-1',
      title: 'FIFA Championship',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      entryFee: 200,
      prize: '₹5,000 + Trophy',
      registrationOpen: true,
    },
    {
      id: 'tour-2',
      title: 'Gran Turismo Sprint',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      entryFee: 150,
      prize: '₹3,000 + Free Gaming Hours',
      registrationOpen: true,
    },
    {
      id: 'tour-3',
      title: 'Tekken Showdown',
      date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      entryFee: 100,
      prize: '₹2,000 + Goodies',
      registrationOpen: false,
    },
  ];
}
