import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = { title: "Services" };

const services = [
  {
    href: "/services/tour-operators",
    title: "Tour operators",
    text: "Private and small-group journeys for visitors arriving in India. The desk has been in New Delhi since 1991.",
  },
  {
    href: "/services/mice",
    title: "MICE",
    text: "Meetings, incentives, and hosted groups in palaces, forts, the desert, and the hills, supervised on the ground.",
  },
  ...servicePages.map((page) => ({
    href: `/services/${page.slug}`,
    title: page.title,
    text: page.lede,
  })),
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="The work the office actually does."
        lede="Incoming journeys, meetings, and the specialist routes from the old catalogue. Fares stay with the desk."
        image="https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Link key={service.href} href={service.href} className="rounded-[1.6rem] bg-white p-8 transition hover:-translate-y-1">
              <h2 className="text-3xl">{service.title}</h2>
              <p className="mt-4 text-muted">{service.text}</p>
              <span className="mt-6 inline-block text-sm underline decoration-saffron underline-offset-4">Open</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
