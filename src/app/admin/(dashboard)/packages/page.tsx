import Link from "next/link";
import { DeleteButton } from "@/components/admin/delete-button";
import { DeskHeader } from "@/components/admin/shell";
import { getPackages } from "@/lib/content";

export default async function AdminPackagesPage() {
  const packages = await getPackages();
  return (
    <div>
      <DeskHeader
        title="Packages"
        lede="Photos and the day-by-day notes for each tour. Desk fares stay here and are not shown on the public site."
        action={
          <Link href="/admin/packages/new" className="rounded-full bg-ink px-4 py-2 text-sm text-white">
            Add package
          </Link>
        }
      />
      <ul className="divide-y divide-line overflow-hidden rounded-[1.4rem] bg-card">
        {packages.map((pkg) => (
          <li key={pkg.slug} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div>
              <p className="font-display text-2xl">{pkg.name}</p>
              <p className="text-sm text-muted">
                {pkg.duration} · desk fare {pkg.priceDisplay}
                {pkg.featured ? " · Featured" : ""}
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/packages/${pkg.slug}`} className="underline">
                Edit
              </Link>
              <DeleteButton href={`/api/admin/packages?slug=${pkg.slug}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
