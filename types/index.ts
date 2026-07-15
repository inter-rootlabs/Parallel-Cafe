/* ============================================================
   PARALLEL CAFE — TYPE DEFINITIONS
   Central type definitions for the entire application
   ============================================================ */

// ---- Menu ----

export interface MenuCategory {
  id: string;
  title: string;
  slug: string;
  order: number;
  type: 'food' | 'beverage' | 'dessert';
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;       // category slug
  categoryTitle: string;  // display name
  image?: string;
  isVeg: boolean;
  jainAvailable: boolean;
  isSignature: boolean;
  available: boolean;
}

// ---- Cart ----

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}

// ---- Offers ----

export interface FlatOffer {
  id: string;
  title: string;
  condition: string | null;
}

export interface WeekdayOffer {
  day: string;
  item: string;
  condition: string;
}

export interface CelebrationPackage {
  title: string;
  price: number;
  originalPrice: number;
  inclusions: string[];
  idealFor: string[];
  image?: string;
}

export interface OffersData {
  startingFrom99: {
    price: number;
    items: string[];
  };
  flatOffers: FlatOffer[];
  weekdayOffers: WeekdayOffer[];
  celebrationPackage: CelebrationPackage;
  loyalty: {
    title: string;
    condition: string;
  };
  social: {
    instagram: string;
  };
}

// ---- Booking ----

export interface TimeSlot {
  time: string;       // e.g. "10:00 AM"
  available: boolean;
}

export interface BookingFormData {
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  duration: number;    // hours
  guests: number;
  type: 'screening' | 'gaming';
  addOns?: CartItem[];
}

export interface BookingConfirmation {
  id: string;
  booking: BookingFormData;
  status: 'confirmed' | 'pending';
  message: string;
}

// ---- Tournament ----

export interface Tournament {
  id: string;
  title: string;
  date: string;
  entryFee: number;
  prize: string;
  registrationOpen: boolean;
  image?: string;
}

// ---- Sanity Content ----

export interface SiteSettings {
  logo?: string;
  address: string;
  landmark: string;
  hours: string;
  instagram: string;
  dietaryNote: string;
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  currentOffersImage?: string;
}

export interface SectionHero {
  section: 'cafe' | 'screening' | 'gaming';
  title: string;
  subtitle: string;
  heroImage?: string;
}

// ---- Contact ----

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
}
