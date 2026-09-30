import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { activities } from "@/lib/taxonomy";

export const metadata: Metadata = { title: "Packages by activity" };

export default function ActivitiesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages by activity"
        title="Heritage, forts, safari, hills."
        lede="The eight activity lists from the original catalogue, each opening the programmes that actually include that kind of day."
        image="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            <Link key={activity.slug} href={`/activities/${activity.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-ink">
                <Image src={activity.image} alt="" fill className="object-cover photo-zoom" sizes="25vw" />
              </div>
              <h2 className="mt-4 text-xl">{activity.title}</h2>
              <p className="mt-2 text-sm text-muted">{activity.lede}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
