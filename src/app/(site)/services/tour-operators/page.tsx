import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = { title: "Tour operators" };

export default function TourOperatorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tour operators · New Delhi"
        title="Honest, careful, and used to the unusual request."
        lede="Established in 1991. The growth has come from hotels, airlines, cars, and a reputation for staying courteous when a plan changes."
        image="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 text-lg text-muted">
            <p>
              An established tour operator, C More is known among agents and clients as an honest, reliable, efficient professional office — an agency with a reputation for service and integrity. Established in 1991, it employs dedicated people and has its registered office in New Delhi.
            </p>
            <p>
              Growth has come from rapport with hotels, airlines, transport agents and associates, and from courtesy, integrity, efficiency, and the ability to cope with the unusual request. Whether the trip is business or a holiday, the same desk gives every part of the journey the care it needs.
            </p>
            <p>
              Operations are headed by Kamal Brahma, owner and chief executive, with more than thirty years in travel marketing and operations, and a master’s in business administration from Geneva.
            </p>
          </div>
          <InquiryForm interest="Tour operator programme" />
        </div>
      </section>
    </>
  );
}
