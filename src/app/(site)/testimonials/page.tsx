import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ReviewForm } from "@/components/review-form";
import { getPublishedTestimonials, getSettings } from "@/lib/content";
import { httpsUrl } from "@/lib/utils";

export const metadata: Metadata = { title: "Testimonials" };

export default async function TestimonialsPage() {
  const [items, settings] = await Promise.all([getPublishedTestimonials(), getSettings()]);
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Notes sent back to the office."
        lede="Letters and messages from people who travelled with C More, kept in their words."
        image="https://ttw.wlimg.com/package-images/photo-big/dir_14/401707/185609.jpg"
      />
      <section className="section">
        <div className="wrap mb-10 grid gap-4 sm:grid-cols-2">
          <a href={httpsUrl(settings.social.tripadvisor)} target="_blank" rel="noreferrer" className="rounded-[1.5rem] bg-white p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-saffron">TripAdvisor</p>
            <p className="mt-3 font-display text-2xl">Reviews of C More Travel & Tours</p>
          </a>
          <a href={httpsUrl(settings.social.miamiHerald)} target="_blank" rel="noreferrer" className="rounded-[1.5rem] bg-white p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-saffron">On media</p>
            <p className="mt-3 font-display text-2xl">Miami Herald, USA</p>
          </a>
        </div>
        <div className="wrap mb-12 max-w-3xl">
          <ReviewForm />
        </div>
        <div className="wrap grid gap-6">
          {items.map((item) => (
            <blockquote key={item.id} className="rounded-[1.5rem] bg-white p-8">
              <p className="font-display text-lg leading-snug md:text-xl">“{item.quote}”</p>
              <footer className="mt-6 text-sm text-muted">{item.name} · {item.detail}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
