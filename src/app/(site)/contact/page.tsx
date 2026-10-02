import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";
import { getSettings } from "@/lib/content";
import { httpsUrl } from "@/lib/utils";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Green Park, New Delhi."
        lede="Call, write, or send the form. Mr Kamal Brahma is the person the office names on the contact page."
        image="https://ttw.wlimg.com/package-images/photo-big/dir_14/401707/319767.jpg"
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
            <p className="text-sm text-muted">GST {settings.gst}</p>
            <p className="text-sm text-muted">PAN {settings.pan}</p>
            <a href={httpsUrl(settings.paypal)} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-[#ffc439] px-4 py-2 text-sm font-medium text-[#003087]">
              Pay with PayPal
            </a>
            <iframe
              title="Map of C More Travel and Tours, Green Park Extension, New Delhi"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address.join(", "))}&z=16&output=embed`}
              className="mt-4 h-72 w-full rounded-[1.4rem] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
