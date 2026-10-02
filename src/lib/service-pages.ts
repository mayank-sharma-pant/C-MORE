export type ServiceMatch =
  | { kind: "all" }
  | { kind: "themes"; themes: string[] }
  | { kind: "slugs"; slugs: string[] }
  | { kind: "none" };

export interface ServicePage {
  slug: string;
  title: string;
  eyebrow: string;
  lede: string;
  image: string;
  paragraphs: string[];
  interest: string;
  match: ServiceMatch;
}

export const servicePages: ServicePage[] = [
  {
    slug: "inbound",
    title: "Inbound tours",
    eyebrow: "Services · incoming",
    lede: "Travellers arrive in India. The Green Park desk meets them with a car, a guide, and a route written before they fly.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1800&q=80",
    paragraphs: [
      "C More has been an incoming operator since 1991. The published catalogue is that work: private and small-group journeys that start in New Delhi and move through Rajasthan, the rivers, the hills, Kerala, and the islands.",
      "Hotels, cars, and guides are confirmed in writing. The fare is not printed on this site. The office sends it once the dates and the room category are known.",
    ],
    interest: "Inbound tour",
    match: { kind: "all" },
  },
  {
    slug: "outbound",
    title: "Outbound tours",
    eyebrow: "Services · departures",
    lede: "The India catalogue is what this site lists. A journey that leaves India is written by the same desk, and confirmed before anyone travels.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=80",
    paragraphs: [
      "The old site kept an outbound page beside the India programmes. One published route already crosses the border: Best of North & West India with Nepal. Other departures are not given a public itinerary or a fare here.",
      "Tell the office the country, the dates, and who is travelling. They reply with a plan. Nothing on this page is a quoted price.",
    ],
    interest: "Outbound tour",
    match: { kind: "slugs", slugs: ["north-west-india-nepal"] },
  },
  {
    slug: "heritage-cultural",
    title: "Heritage & cultural tours",
    eyebrow: "Services · heritage",
    lede: "Forts, palaces, and cities rebuilt on older cities. These are the routes the office has written from New Delhi since 1991.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=80",
    paragraphs: [
      "A heritage programme is the buildings and the life around them: Amber and the City Palace, the Taj and Fatehpur Sikri, the desert forts, and the longer circuits that reach Khajuraho or Nepal.",
      "Guests stay in a mix of comfortable hotels and heritage properties. The guide and the car stay with the group, and the office confirms both before travel.",
    ],
    interest: "Heritage and cultural tour",
    match: { kind: "themes", themes: ["culture-heritage", "monuments"] },
  },
  {
    slug: "beach-island",
    title: "Beach & island tours",
    eyebrow: "Services · coast",
    lede: "The backwaters, the Arabian coast, and the Andaman islands, planned from the same Green Park desk as the northern forts.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=80",
    paragraphs: [
      "Kerala programmes use the lakes and a houseboat where the route calls for one. The Andaman journey covers Port Blair, Havelock, Neil, and the limestone caves at Baratang.",
      "Sun, Sand & Cave Temples adds the coast and the rock-cut temples to a longer line. Ferries and beach time are written into the day-by-day plan, not left for the guest to arrange on arrival.",
    ],
    interest: "Beach and island tour",
    match: { kind: "slugs", slugs: ["kerala-coconut", "kerala-luxury-cruise", "andaman-nicobar", "sun-sand-caves"] },
  },
  {
    slug: "pilgrimage",
    title: "Pilgrimage tours",
    eyebrow: "Services · pilgrimage",
    lede: "Temples, ghats, and the Buddhist sites, planned as a journey rather than a list of gates.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1800&q=80",
    paragraphs: [
      "The Taj, Temple & Ganges tour holds the river, the temple towns, and Agra in one line. Footsteps of Buddha follows the places tied to his life. The eastern Golden Triangle moves through Kolkata, Puri, and the Northeast.",
      "Where a shrine does not admit visitors from outside the faith, the itinerary says so. The office does not send a guest to a closed door.",
    ],
    interest: "Pilgrimage tour",
    match: { kind: "themes", themes: ["religious-pilgrimage"] },
  },
  {
    slug: "ayurveda-wellness",
    title: "Ayurveda & wellness",
    eyebrow: "Services · wellness",
    lede: "Treatment time in Kerala, with the backwaters and the spice hills around it, rather than a clinic dropped into an empty week.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=80",
    paragraphs: [
      "The Ayurveda holiday is built around Alleppey, Thekkady, and Kumarakom. Consultations and therapies sit inside the same plan as the houseboat and the hills, so the days are not only treatment.",
      "The coconut holiday and the Kerala cruise are the other southern routes when the point is rest on the water. The desk confirms the centre and the room before you travel.",
    ],
    interest: "Ayurveda and wellness",
    match: { kind: "slugs", slugs: ["ayurveda-holidays", "kerala-coconut", "kerala-luxury-cruise"] },
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
