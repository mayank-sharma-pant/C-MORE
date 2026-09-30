import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Green Park, New Delhi."
        lede="Call, write, or send the form. Mr Kamal Brahma is the person the office names on the contact page."
        image="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4 text-lg">
            {settings.address.map((line) => <p key={line}>{line}</p>)}
            <p><a href={`tel:${settings.phone}`}>{settings.phone}</a></p>
            <p>{settings.phoneAlt}</p>
            <p><a href={`tel:${settings.mobile}`}>{settings.mobile}</a></p>
            <p><a className="text-saffron" href={`mailto:${settings.email}`}>{settings.email}</a></p>
            <p><a href={`mailto:${settings.altEmail}`}>{settings.altEmail}</a></p>
            <p className="text-sm text-muted">{settings.hours}</p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
