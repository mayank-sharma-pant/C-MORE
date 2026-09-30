import Link from "next/link";
import { getDestinations, getGallery, getInquiries, getPackages, getPosts, getTestimonials } from "@/lib/content";

export default async function AdminHome() {
  const [packages, destinations, gallery, posts, testimonials, inquiries] = await Promise.all([
    getPackages(),
    getDestinations(),
    getGallery(),
    getPosts(),
    getTestimonials(),
    getInquiries(),
  ]);
  const cards = [
    ["Packages", packages.length, "/admin/packages"],
    ["Destinations", destinations.length, "/admin/destinations"],
    ["Gallery", gallery.length, "/admin/gallery"],
    ["Journal", posts.length, "/admin/blogs"],
    ["Testimonials", testimonials.length, "/admin/testimonials"],
    ["Enquiries", inquiries.length, "/admin/inquiries"],
  ] as const;

  return (
    <div>
      <h1 className="font-display text-3xl">What is on the site</h1>
      <p className="mt-3 max-w-xl text-muted">Change a card here and the public pages update. Prices, photos, and the day-by-day notes all live in this desk.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, count, href]) => (
          <Link key={href} href={href} className="rounded-[1.4rem] bg-white p-6 transition hover:-translate-y-0.5">
            <p className="font-display text-3xl">{count}</p>
            <p className="mt-2 text-muted">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
