import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Enquiry" };

export default async function EnquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Enquiry"
        title="Tell us who is travelling."
        lede="Dates, cities, and the kind of hotel. The office replies with a programme rather than a generic quote."
        image="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap max-w-3xl">
          <InquiryForm interest={interest || ""} />
        </div>
      </section>
    </>
  );
}
