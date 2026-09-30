import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getTestimonials } from "@/lib/content";

export const metadata: Metadata = { title: "Testimonials" };

export default async function TestimonialsPage() {
  const items = await getTestimonials();
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Notes sent back to the office."
        lede="Letters and messages from people who travelled with C More, kept in their words."
        image="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
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
