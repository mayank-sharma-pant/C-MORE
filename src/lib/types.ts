export type Currency = "USD" | "INR";

export interface ItineraryDay {
  day: string;
  title: string;
  description: string;
  meals: string;
}

export interface TourPackage {
  slug: string;
  name: string;
  duration: string;
  price: number;
  currency: Currency;
  priceDisplay: string;
  compareAtDisplay?: string;
  code?: string;
  image: string;
  photos?: string[];
  locations: string[];
  themes: string[];
  activities: string[];
  summary: string;
  featured: boolean;
  overview: string;
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
}

export interface Destination {
  slug: string;
  name: string;
  region: string;
  image: string;
  summary: string;
  highlights: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  place: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  body: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  detail: string;
  email?: string;
  status?: "published" | "pending";
}

export interface Inquiry {
  id: string;
  createdAt: string;
  kind: "enquiry" | "career";
  name: string;
  email: string;
  phone: string;
  interest: string;
  travellers: string;
  dates: string;
  message: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  phoneAlt: string;
  mobile: string;
  email: string;
  altEmail: string;
  whatsapp: string;
  address: string[];
  gst: string;
  pan: string;
  ceo: string;
  established: string;
  ownership: string;
  hours: string;
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    tripadvisor: string;
    touristlink: string;
    miamiHerald: string;
    miniWeb: string;
  };
  paypal: string;
  brochurePdf: string;
  awardUrl: string;
}
