import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageCard } from "@/components/package-card";
import { PageHero } from "@/components/page-hero";
import { getDestinations, getPackages } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = (await getDestinations()).find((item) => item.slug === slug);
  return { title: place ? `${place.name} tours` : "Destination" };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const place = (await getDestinations()).find((item) => item.slug === slug);
  if (!place) notFound();
  const packages = (await getPackages()).filter((pkg) =>
    pkg.locations.some((location) => location.toLowerCase().includes(place.name.toLowerCase().replace("new ", "")))
  );

  return (
    <>
      <PageHero eyebrow={place.region} title={place.name} lede={place.summary} image={place.image} />
      <section className="section">
        <div className="wrap">
          <ul className="flex flex-wrap gap-2">
            {place.highlights.map((item) => (
              <li key={item} className="rounded-full bg-white px-4 py-2 text-sm">{item}</li>
            ))}
          </ul>
          <h2 className="mt-12 text-2xl">Programmes that stop here</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => <PackageCard key={pkg.slug} pkg={pkg} />)}
          </div>
          {packages.length === 0 && (
            <p className="mt-6 text-muted">No published card lists this stop yet. The office can still add it to a private programme.</p>
          )}
        </div>
      </section>
    </>
  );
}
