import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageExplorer } from "@/components/filters";
import { PageHero } from "@/components/page-hero";
import { getPackages } from "@/lib/content";
import { themes } from "@/lib/taxonomy";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const theme = themes.find((item) => item.slug === slug);
  return { title: theme?.title || "Theme" };
}

export default async function ThemePage({ params }: Props) {
  const { slug } = await params;
  const theme = themes.find((item) => item.slug === slug);
  if (!theme) notFound();
  const packages = await getPackages();

  return (
    <>
      <PageHero eyebrow="Tour by theme" title={theme.title} lede={theme.lede} image={theme.image} />
      <section className="section">
        <div className="wrap">
          <p className="max-w-3xl text-lg text-muted">{theme.body}</p>
          <div className="mt-12">
            <PackageExplorer packages={packages} initialTheme={theme.slug} />
          </div>
        </div>
      </section>
    </>
  );
}
