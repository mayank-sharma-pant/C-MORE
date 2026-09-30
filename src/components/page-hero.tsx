import Image from "next/image";
import { Lines } from "@/components/reveal";

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="hero-drift absolute inset-0 -z-10">
        <Image src={image} alt="" fill priority className="object-cover opacity-55" sizes="100vw" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
      <div className="wrap relative flex min-h-[46vh] flex-col justify-end py-16 md:min-h-[58vh] md:py-24">
        <p className="hero-copy eyebrow text-white/70">{eyebrow}</p>
        <Lines
          as="h1"
          onLoad
          delay={0.35}
          className="mt-5 max-w-4xl text-4xl leading-[1.02] tracking-[-0.03em] md:text-6xl"
          lines={[title]}
        />
        {lede && (
          <p className="hero-copy mt-6 max-w-2xl text-base text-white/78 md:text-lg" style={{ animationDelay: "0.7s" }}>
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
