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
        lede="The day-by-day programmes published by the office. Hotels and the fare are confirmed in writing before any deposit."
        image="https://ttw.wlimg.com/package-images/photo-big/dir_14/401707/319767.jpg"
      />
      <section className="section">
        <div className="wrap">
          <PackageExplorer packages={packages} />
        </div>
      </section>
    </>
  );
}
