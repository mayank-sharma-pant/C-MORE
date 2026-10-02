import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getDestinations, getPackages, getPosts } from "@/lib/content";
import { activities, themes } from "@/lib/taxonomy";

export const metadata: Metadata = { title: "Site map" };

export default async function SitemapPage() {
  const [packages, destinations, posts] = await Promise.all([getPackages(), getDestinations(), getPosts()]);

  const groups = [
    {
      title: "Office",
      links: [
        ["/", "Home"],
        ["/about", "About us"],
        ["/contact", "Contact"],
        ["/enquiry", "Enquiry"],
        ["/career", "Career"],
        ["/terms", "Terms & conditions"],
        ["/awards", "Global awards"],
        ["/testimonials", "Testimonials"],
        ["/brochure", "Flipbook"],
        ["/currency", "Currency converter"],
        ["/gallery", "Gallery"],
        ["/blog", "Blog"],
        ["/tour-packages.rss", "RSS"],
      ],
    },
    {
      title: "Services",
      links: [
        ["/services", "Our services"],
        ["/services/tour-operators", "Tour operators"],
        ["/services/mice", "MICE services"],
        ["/services/inbound", "Inbound tours"],
        ["/services/outbound", "Outbound tours"],
        ["/services/heritage-cultural", "Heritage & cultural tours"],
        ["/services/beach-island", "Beach & island tours"],
        ["/services/pilgrimage", "Pilgrimage tours"],
        ["/services/ayurveda-wellness", "Ayurveda & wellness"],
      ],
    },
    {
      title: "Tour by theme",
      links: [["/themes", "All themes"], ...themes.map((t) => [`/themes/${t.slug}`, t.title] as const)],
    },
    {
      title: "Packages by activity",
      links: [["/activities", "All activities"], ...activities.map((a) => [`/activities/${a.slug}`, a.title] as const)],
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Site map"
        title="Every page on this site."
        lede="The same map as the old C More catalogue: office pages, every published tour, destination, theme, and activity."
        image="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap grid gap-12 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-2xl">{group.title}</h2>
              <ul className="mt-4 space-y-2 text-muted">
                {group.links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="link-line">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-2xl">Tour packages</h2>
            <ul className="mt-4 space-y-2 text-muted">
              <li>
                <Link href="/packages" className="link-line">
                  All tour packages
                </Link>
              </li>
              {packages.map((pkg) => (
                <li key={pkg.slug}>
                  <Link href={`/packages/${pkg.slug}`} className="link-line">
                    {pkg.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">Packages by destination</h2>
            <ul className="mt-4 space-y-2 text-muted">
              <li>
                <Link href="/destinations" className="link-line">
                  All destinations
                </Link>
              </li>
              {destinations.map((place) => (
                <li key={place.slug}>
                  <Link href={`/destinations/${place.slug}`} className="link-line">
                    {place.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">Journal</h2>
            <ul className="mt-4 space-y-2 text-muted">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="link-line">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
