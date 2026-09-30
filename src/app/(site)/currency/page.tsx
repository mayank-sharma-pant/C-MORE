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
        lede="Most published programmes are in US dollars. A few, including Footsteps of Buddha, are listed in rupees."
        image="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap max-w-3xl">
          <CurrencyTool />
        </div>
      </section>
    </>
  );
}
