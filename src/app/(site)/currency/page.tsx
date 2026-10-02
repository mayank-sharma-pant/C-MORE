import type { Metadata } from "next";
import { CurrencyTool } from "@/components/currency-tool";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Currency converter" };

export default function CurrencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Currency"
        title="A rough exchange, before the quote."
        lede="Convert an amount before you write to the office. Tour fares are confirmed in writing and are not listed on this site."
        image="https://ttw.wlimg.com/package-images/photo-big/dir_14/401707/238421.jpg"
      />
      <section className="section">
        <div className="wrap max-w-3xl">
          <CurrencyTool />
        </div>
      </section>
    </>
  );
}
