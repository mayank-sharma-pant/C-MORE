import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Itinerary } from "@/components/itinerary";
import { getPackage, getPackages, getSettings } from "@/lib/content";
import { httpsUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  return { title: pkg?.name || "Package" };
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) notFound();
  const [others, settings] = await Promise.all([
    getPackages().then((items) => items.filter((item) => item.slug !== slug).slice(0, 3)),
    getSettings(),
  ]);

  return (
    <article>
      <section className="relative isolate min-h-[52vh] bg-ink text-white">
        <Image src={pkg.image} alt="" fill priority className="object-cover opacity-60" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="wrap relative flex min-h-[52vh] flex-col justify-end py-12 pt-28">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">{pkg.duration}</p>
          <h1 className="mt-3 max-w-4xl text-3xl leading-tight md:text-4xl">{pkg.name}</h1>
          <p className="mt-4 text-white/75">{pkg.locations.join(" · ")}</p>
          <p className="mt-5 text-sm uppercase tracking-[0.18em] text-white/70">Fare confirmed by the office</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="max-w-3xl text-lg text-muted">{pkg.overview}</p>
            <h2 className="mt-12 text-2xl">Day by day</h2>
            <div className="mt-6">
              <Itinerary days={pkg.itinerary} />
            </div>
          </div>
          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            <div className="rounded-[1.4rem] bg-white p-6">
              <h2 className="text-2xl">Included</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {pkg.included.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <h2 className="mt-6 text-2xl">Not included</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {pkg.excluded.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <Link href={`/enquiry?interest=${encodeURIComponent(pkg.name)}`} className="block rounded-full bg-saffron px-5 py-3 text-center text-white">
              Ask for this route
            </Link>
            <a href={httpsUrl(settings.paypal)} target="_blank" rel="noreferrer" className="block rounded-full bg-[#ffc439] px-5 py-3 text-center text-sm font-medium text-[#003087]">
              Pay with PayPal
            </a>
          </aside>
        </div>
      </section>
      {others.length > 0 && (
        <section className="pb-20">
          <div className="wrap">
            <h2 className="text-xl">Other routes</h2>
            <ul className="mt-6 divide-y divide-line">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={`/packages/${item.slug}`} className="flex items-center justify-between py-4">
                    <span className="font-display text-2xl">{item.name}</span>
                    <span className="text-sm text-muted">{item.duration}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
