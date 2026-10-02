import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";
import { getPackages } from "@/lib/content";
import { getServicePage, servicePages } from "@/lib/service-pages";
import type { TourPackage } from "@/lib/types";

type PublicRoute = { slug: string; name: string; duration: string; code?: string };

type Props = { params: Promise<{ slug: string }> };

function matching(packages: TourPackage[], slug: string): PublicRoute[] {
  const page = getServicePage(slug);
  if (!page || page.match.kind === "none") return [];
  const { match } = page;
  const picked =
    match.kind === "all"
      ? packages
      : match.kind === "slugs"
        ? match.slugs.map((item) => packages.find((pkg) => pkg.slug === item)).filter((pkg): pkg is TourPackage => Boolean(pkg))
        : packages.filter((pkg) => pkg.themes.some((theme) => match.themes.includes(theme)));
  return picked.map((pkg) => ({ slug: pkg.slug, name: pkg.name, duration: pkg.duration, code: pkg.code }));
}

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  return { title: page?.title || "Services" };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();
  const related = matching(await getPackages(), slug);

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lede={page.lede} image={page.image} />
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 text-lg text-muted">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <InquiryForm interest={page.interest} />
        </div>
      </section>
      {related.length > 0 && (
        <section className="pb-20">
          <div className="wrap">
            <h2 className="text-2xl">Routes on this page</h2>
            <ul className="mt-6 divide-y divide-line">
              {related.map((pkg) => (
                <li key={pkg.slug}>
                  <Link href={`/packages/${pkg.slug}`} className="flex items-baseline justify-between gap-6 py-4">
                    <span>
                      <span className="font-display text-2xl">{pkg.name}</span>
                      {pkg.code ? <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-muted">Tour code {pkg.code}</span> : null}
                    </span>
                    <span className="shrink-0 text-sm text-muted">{pkg.duration}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
