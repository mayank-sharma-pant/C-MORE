import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Career" };

export default function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow="Career"
        title="The office is small. The work is specific."
        lede="C More is glad of people whose skill improves an incoming desk: operations, guiding, or a commercial tie-up that lasts."
        image="https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <p className="text-lg text-muted">
            Write with the work you do and the cities you know. Applications land in the same admin inbox as travel enquiries, marked as career notes, so nothing sits in a separate forgotten form.
          </p>
          <InquiryForm kind="career" submitLabel="Send application" />
        </div>
      </section>
    </>
  );
}
