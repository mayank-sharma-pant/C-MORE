import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getDestinations } from "@/lib/content";

export const metadata: Metadata = { title: "Destinations" };

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="The places on the programmes."
        lede="Delhi is where every inbound journey is met. The rest of the map is Rajasthan, the rivers, the hills, and the Buddhist sites."
        image="https://ttw.wlimg.com/package-images/photo-big/dir_14/401707/217247.jpg"
      />
      <section className="section">
        <div className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((place) => (
            <Link key={place.slug} href={`/destinations/${place.slug}`} className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image src={place.image} alt={place.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">{place.region}</p>
                <h2 className="text-2xl">{place.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
