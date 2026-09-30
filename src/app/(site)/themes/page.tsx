import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { themes } from "@/lib/taxonomy";

export const metadata: Metadata = { title: "Tour by theme" };

export default function ThemesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Tour by theme"
        title="Choose the reason for the trip."
        lede="The same eight themes as the original C More site: culture, family, pilgrimage, monuments, honeymoon, women-friendly, luxury, and winter."
        image="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap grid gap-8 sm:grid-cols-2">
          {themes.map((theme) => (
            <Link key={theme.slug} href={`/themes/${theme.slug}`} className="group overflow-hidden rounded-[3px] bg-white">
              <div className="relative aspect-[16/9]">
                <Image src={theme.image} alt="" fill className="object-cover photo-zoom" sizes="50vw" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl">{theme.title}</h2>
                <p className="mt-3 text-muted">{theme.lede}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
