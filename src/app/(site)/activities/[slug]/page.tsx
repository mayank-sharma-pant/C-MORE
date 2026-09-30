import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageExplorer } from "@/components/filters";
import { PageHero } from "@/components/page-hero";
import { getPackages } from "@/lib/content";
import { activities } from "@/lib/taxonomy";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = activities.find((item) => item.slug === slug);
  return { title: activity?.title || "Activity" };
}

export default async function ActivityPage({ params }: Props) {
  const { slug } = await params;
  const activity = activities.find((item) => item.slug === slug);
  if (!activity) notFound();
  const packages = await getPackages();

  return (
    <>
      <PageHero eyebrow="By activity" title={activity.title} lede={activity.lede} image={activity.image} />
      <section className="section">
        <div className="wrap">
          <PackageExplorer packages={packages} initialActivity={activity.slug} />
        </div>
      </section>
    </>
  );
}
