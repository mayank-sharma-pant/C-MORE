import Link from "next/link";
import { VisitorEditor } from "@/components/admin/visitor-editor";
import { DeskHeader } from "@/components/admin/shell";
import { getDestinations, getGallery, getInquiries, getPackages, getPosts, getTestimonials } from "@/lib/content";
import { getVisitorCount } from "@/lib/visitors";

export default async function AdminHome() {
  const [packages, destinations, gallery, posts, testimonials, inquiries, visitors] = await Promise.all([
    getPackages(),
    getDestinations(),
    getGallery(),
    getPosts(),
    getTestimonials(),
    getInquiries(),
    getVisitorCount(),
  ]);

  const ledger = [
    ["Packages", packages.length, "/admin/packages", "Tours people can book"],
    ["Destinations", destinations.length, "/admin/destinations", "Places on the map"],
    ["Gallery", gallery.length, "/admin/gallery", "Photos on the site"],
    ["Journal", posts.length, "/admin/blogs", "Stories"],
    ["Testimonials", testimonials.length, "/admin/testimonials", "Notes from travellers"],
    ["Enquiries", inquiries.length, "/admin/inquiries", "Messages waiting"],
  ] as const;

  const latest = inquiries.slice(0, 3);
  const featured = packages.filter((item) => item.featured).slice(0, 4);

  return (
    <div>
      <DeskHeader
        title="Day sheet"
        lede="What is on the public site right now. Change it here and the pages update."
      />

      <section className="rounded-[1.6rem] bg-ink px-6 py-7 text-white sm:px-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-saffron">Latest from the site</p>
        {latest.length === 0 ? (
          <div className="mt-4">
            <h2 className="font-display text-3xl">No enquiries waiting</h2>
            <p className="mt-2 max-w-lg text-sm text-white/70">
              When someone writes from the contact, enquiry, or career form, the note appears here.
            </p>
          </div>
        ) : (
          <ul className="mt-5 divide-y divide-white/10">
            {latest.map((item) => (
              <li key={item.id} className="flex flex-wrap items-baseline justify-between gap-3 py-3">
                <div>
                  <p className="font-display text-2xl">{item.name}</p>
                  <p className="text-sm text-white/65">{item.interest || item.kind}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
              </li>
            ))}
          </ul>
        )}
        <Link href="/admin/inquiries" className="mt-5 inline-block text-sm text-saffron">
          Open enquiries
        </Link>
      </section>

      <section className="mt-8 overflow-hidden rounded-[1.6rem] bg-card">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>On the site</span>
          <span>Count</span>
          <span className="sr-only">Open</span>
        </div>
        {ledger.map(([label, count, href, note]) => (
          <Link
            key={href}
            href={href}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line px-6 py-4 last:border-b-0 hover:bg-mist"
          >
            <span>
              <span className="font-display text-2xl">{label}</span>
              <span className="mt-0.5 block text-sm text-muted">{note}</span>
            </span>
            <span className="font-display text-2xl tabular-nums">{count}</span>
            <span className="text-sm text-saffron">Open</span>
          </Link>
        ))}
      </section>

      <div className="mt-8 max-w-md">
        <VisitorEditor initial={visitors} />
      </div>

      {featured.length > 0 && (
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-3xl">Featured packages</h2>
            <Link href="/admin/packages" className="text-sm text-saffron">
              All packages
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {featured.map((pkg) => (
              <li key={pkg.slug}>
                <Link href={`/admin/packages/${pkg.slug}`} className="block rounded-[1.4rem] bg-card px-5 py-4 hover:bg-white">
                  <p className="font-display text-2xl">{pkg.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {pkg.duration} · desk fare {pkg.priceDisplay}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
