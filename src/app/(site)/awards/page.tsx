import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Global awards" };

export default async function AwardsPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Global awards"
        title="The public record, and the years underneath it."
        lede="The navigation on the current site points to an International Trade Council verification. The rest of the standing is the work since 1991."
        image="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap grid gap-6 md:grid-cols-3">
          <a href={settings.awardUrl} target="_blank" rel="noreferrer" className="rounded-[1.5rem] bg-white p-6 transition hover:-translate-y-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-saffron">Verification</p>
            <h2 className="mt-3 text-3xl">International Trade Council</h2>
            <p className="mt-3 text-muted">Open the record linked from the existing website.</p>
          </a>
          <article className="rounded-[1.5rem] bg-white p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-saffron">Since</p>
            <h2 className="mt-3 text-3xl">{settings.established}</h2>
            <p className="mt-3 text-muted">Incoming tours only, from the Green Park office.</p>
          </article>
          <article className="rounded-[1.5rem] bg-white p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-saffron">Registered</p>
            <h2 className="mt-3 text-3xl">GST</h2>
            <p className="mt-3 text-muted">{settings.gst}. {settings.ceo}, MBA, Geneva.</p>
          </article>
        </div>
      </section>
    </>
  );
}
