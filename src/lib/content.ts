import { revalidatePath } from "next/cache";
import packagesSeed from "../../data/packages.json";
import destinationsSeed from "../../data/destinations.json";
import gallerySeed from "../../data/gallery.json";
import blogsSeed from "../../data/blogs.json";
import testimonialsSeed from "../../data/testimonials.json";
import settingsSeed from "../../data/settings.json";
import { readStore, writeStore } from "@/lib/store";
import type {
  BlogPost,
  Destination,
  GalleryImage,
  Inquiry,
  SiteSettings,
  Testimonial,
  TourPackage,
} from "@/lib/types";

export function refreshSite() {
  [
    "/",
    "/packages",
    "/destinations",
    "/gallery",
    "/blog",
    "/testimonials",
    "/contact",
    "/about",
    "/services",
  ].forEach((path) => revalidatePath(path));
  revalidatePath("/packages/[slug]", "page");
  revalidatePath("/destinations/[slug]", "page");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/themes/[slug]", "page");
  revalidatePath("/activities/[slug]", "page");
  revalidatePath("/services/[slug]", "page");
}

export async function getPackages() {
  return readStore<TourPackage[]>("packages.json", packagesSeed as TourPackage[]);
}

export async function savePackages(packages: TourPackage[]) {
  await writeStore("packages.json", packages);
  refreshSite();
}

export async function getPackage(slug: string) {
  const packages = await getPackages();
  return packages.find((item) => item.slug === slug);
}

export async function getDestinations() {
  return readStore<Destination[]>("destinations.json", destinationsSeed as Destination[]);
}

export async function saveDestinations(destinations: Destination[]) {
  await writeStore("destinations.json", destinations);
  refreshSite();
}

export async function getGallery() {
  return readStore<GalleryImage[]>("gallery.json", gallerySeed as GalleryImage[]);
}

export async function saveGallery(images: GalleryImage[]) {
  await writeStore("gallery.json", images);
  refreshSite();
}

export async function getPosts() {
  return readStore<BlogPost[]>("blogs.json", blogsSeed as BlogPost[]);
}

export async function savePosts(posts: BlogPost[]) {
  await writeStore("blogs.json", posts);
  refreshSite();
}

export async function getTestimonials() {
  return readStore<Testimonial[]>(
    "testimonials.json",
    testimonialsSeed as Testimonial[]
  );
}

export async function getPublishedTestimonials() {
  const items = await getTestimonials();
  return items.filter((item) => item.status !== "pending");
}

export async function saveTestimonials(items: Testimonial[]) {
  await writeStore("testimonials.json", items);
  refreshSite();
}

export async function getSettings() {
  return readStore<SiteSettings>("settings.json", settingsSeed as SiteSettings);
}

export async function saveSettings(settings: SiteSettings) {
  await writeStore("settings.json", settings);
  refreshSite();
}

export async function getInquiries() {
  return readStore<Inquiry[]>("inquiries.json", []);
}

export async function saveInquiries(items: Inquiry[]) {
  await writeStore("inquiries.json", items);
}
