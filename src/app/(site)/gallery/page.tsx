import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { getGallery } from "@/lib/content";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const images = await getGallery();
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The country, in better light."
        lede="Places that appear on the programmes. The office can replace any of these from the admin desk."
        image="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((image) => (
            <figure key={image.id} className="mb-4 break-inside-avoid overflow-hidden rounded-[1.3rem] bg-white">
              <div className="relative aspect-[4/5]">
                <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="33vw" />
              </div>
              <figcaption className="px-4 py-3 text-sm text-muted">{image.place}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
