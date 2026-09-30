import type { Metadata } from "next";
import { PackageExplorer } from "@/components/filters";
import { PageHero } from "@/components/page-hero";
import { getPackages } from "@/lib/content";

export const metadata: Metadata = { title: "Tour packages" };

export default async function PackagesPage() {
  const packages = await getPackages();
  return (
    <>
      <PageHero
        eyebrow="Tour packages"
        title="Published programmes, ready to adjust."
        lede="Prices are per person, starting from the figure on the card. Hotels and the exact days are confirmed before any deposit."
        image="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap">
          <PackageExplorer packages={packages} />
        </div>
      </section>
    </>
  );
}
