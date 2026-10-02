import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { TourPackage } from "@/lib/types";

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  return (
    <Link href={`/packages/${pkg.slug}`} className="group block">
      <div className="card-frame relative aspect-[4/5] overflow-hidden rounded-[3px] bg-ink">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="photo-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs text-ink backdrop-blur">
          {pkg.duration}
        </span>
        <span className="card-cta absolute right-4 bottom-4 grid h-12 w-12 place-items-center rounded-full bg-saffron text-white">
          <ArrowUpRight size={18} />
        </span>
        <p className="absolute bottom-4 left-4 max-w-[70%] font-display text-2xl leading-tight text-white">
          {pkg.locations[0]}
        </p>
      </div>
      <h3 className="mt-5 text-[1.35rem] leading-snug">
        <span className="underline-grow">{pkg.name}</span>
      </h3>
      <p className="mt-1.5 text-sm text-muted">{pkg.locations.slice(0, 4).join(" · ")}</p>
      {pkg.code ? <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">Tour code {pkg.code}</p> : null}
    </Link>
  );
}
