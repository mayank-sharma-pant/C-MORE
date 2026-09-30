import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const settings = await getSettings();
  const facts = [
    ["Chief executive", settings.ceo],
    ["Ownership", settings.ownership],
    ["Established", settings.established],
    ["Work", "Incoming tour organisers"],
    ["GST", settings.gst],
  ];

  return (
    <>
      <PageHero
        eyebrow="About the office"
        title="We work only as incoming organisers."
        lede="Because we are Indians, and we know the country. Personal care, professionalism, timing, and the best return for the money."
        image="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-lg text-muted">
            <p className="font-display text-xl leading-snug text-ink">
              “There is no happiness for him who does not travel. Therefore, wander. The fortune of him who is sitting sits. It rises when he rises, it sleeps when he sleeps, it moves when he moves. Therefore, wander!”
            </p>
            <p>
              C More looks after luxury and budget travellers alike. The office is built so people from different countries get a programme that fits them, not a brochure that happens to be in print. Personal care, professionalism, timing, and best return value is the alma mater.
            </p>
            <p>
              We work only as incoming tour organisers, because we are Indians and we know the country. Experience in these destinations since {settings.established} is what the planning rests on. Preferred hotels and popular places are combined so the stay is worth the money, and so the memory is worth telling someone about. That memory is the advertising.
            </p>
            <p>
              {settings.ceo} heads operations. He has more than thirty years in travel marketing and operations, and a master’s degree in business administration from Geneva. The registered office is in New Delhi. GST {settings.gst}.
            </p>
            <Link href="/enquiry" className="inline-flex rounded-full bg-ink px-5 py-3 text-sm text-white">
              Write to the office
            </Link>
          </div>
          <dl className="h-fit rounded-[1.6rem] bg-white p-6">
            {facts.map(([label, value]) => (
              <div key={label} className="border-b border-line py-4 last:border-0">
                <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">{label}</dt>
                <dd className="mt-1 font-display text-2xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
