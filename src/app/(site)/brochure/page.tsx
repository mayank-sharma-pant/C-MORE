import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Flipbook" };

export default async function BrochurePage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Flipbook"
        title="The printed programme, as a file."
        lede="The same brochure that sits on the current site. Open it in a new tab if the preview is slow."
        image="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap">
          <a href={settings.brochurePdf} className="rounded-full bg-ink px-5 py-3 text-sm text-white" target="_blank" rel="noreferrer">
            Open the PDF
          </a>
          <iframe title="C More brochure" src={settings.brochurePdf} className="mt-8 h-[70vh] w-full rounded-[1.4rem] bg-white" />
        </div>
      </section>
    </>
  );
}
