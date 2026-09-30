"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { InquiryForm } from "@/components/inquiry-form";
import { PackageCard } from "@/components/package-card";
import { Lines, Magnetic, Reveal } from "@/components/reveal";
import { activities, themes } from "@/lib/taxonomy";
import type { Destination, SiteSettings, Testimonial, TourPackage } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

const scenes = [
  { place: "Kerala", note: "Houseboat on the backwaters", image: unsplash("1602216056096-3b40cc0c9944") },
  { place: "Jaipur", note: "Amber Fort, the Pink City", image: unsplash("1477587458883-47145ed94245") },
  { place: "Agra", note: "The Taj Mahal", image: unsplash("1564507592333-c60657eea523") },
  { place: "New Delhi", note: "Where every inbound journey starts", image: unsplash("1587474260584-136574528ed5") },
];

const STOP_MS = 5200;

export function HomeView({
  packages,
  destinations,
  testimonials,
  settings,
}: {
  packages: TourPackage[];
  destinations: Destination[];
  testimonials: Testimonial[];
  settings: SiteSettings;
}) {
  const featured = packages.filter((pkg) => pkg.featured).slice(0, 6);
  const phoneHref = `tel:${settings.phone.replace(/[^\d+]/g, "")}`;
  const waHref = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Hello, I found C More Travels and would like to enquire about a tour.")}`;

  return (
    <>
      <Hero settings={settings} phoneHref={phoneHref} />
      <TrustStrip settings={settings} />

      <section className="section">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow text-garden">Hot tour packages</p>
              </Reveal>
              <Lines className="mt-4 text-3xl leading-[1.05] md:text-5xl" lines={["A few of the", <em key="e">published programmes</em>]} />
            </div>
            <Link href="/packages" className="link-arrow hidden text-sm sm:inline-flex">
              All {packages.length} packages <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((pkg, index) => (
              <Reveal key={pkg.slug} delay={(index % 3) * 0.08}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ActivityRail />
      <ThemeRail />
      <DestinationIndex destinations={destinations.slice(0, 8)} />
      <Voices testimonials={testimonials.slice(0, 3)} />
      <Closing settings={settings} phoneHref={phoneHref} waHref={waHref} />
    </>
  );
}

function TrustStrip({ settings }: { settings: SiteSettings }) {
  const items = [
    ["Since", settings.established],
    ["Work", "Incoming only"],
    ["Office", "Green Park, Delhi"],
    ["Run by", settings.ceo],
  ];

  return (
    <section className="border-b border-line bg-white">
      <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
        {items.map(([label, value]) => (
          <div key={label} className="border-line py-5 pr-4 even:pl-4 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:even:pl-8">
            <dt className="text-xs tracking-wide text-muted">{label}</dt>
            <dd className="mt-1 font-display text-lg leading-tight lg:text-xl">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Hero({ settings, phoneHref }: { settings: SiteSettings; phoneHref: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % scenes.length), STOP_MS);
    return () => window.clearTimeout(timer);
  }, [active, reduce]);

  const scene = scenes[active];

  return (
    <section ref={ref} className="relative isolate overflow-hidden text-white">
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 top-0 -bottom-[18%] -z-20">
        <AnimatePresence initial={false}>
          <motion.div
            key={scene.place}
            className="absolute inset-0"
            initial={{ opacity: 0, zIndex: 2 }}
            animate={{ opacity: 1, zIndex: 2 }}
            exit={{
              zIndex: 1,
              opacity: 0,
              transition: { zIndex: { duration: 0 }, opacity: { duration: 0.8 } },
            }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image
              src={scene.image}
              alt={`${scene.place}: ${scene.note}`}
              fill
              priority
              className="object-cover object-[center_20%]"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/15" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink/50 to-transparent" />

      <div className="wrap relative flex min-h-[100svh] flex-col justify-end py-16 pt-28 lg:justify-center lg:py-20">
        <motion.div style={{ y: copyY, opacity: fade }} className="max-w-xl">
          <motion.p
            className="eyebrow text-white/70"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Incoming tours · Green Park, New Delhi · since {settings.established}
          </motion.p>
          <Lines
            as="h1"
            onLoad
            delay={0.15}
            className="hero-title mt-[2.5svh] drop-shadow-[0_2px_24px_rgba(42,28,22,0.45)]"
            lines={["Therefore,", <em key="e" className="text-saffron-soft">wander.</em>]}
          />
          <motion.p
            className="mt-[3svh] max-w-md text-base leading-relaxed text-white/85"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
          >
            C More looks after luxury and budget travellers from one incoming desk. Private cars, hotels, and programmes written for people flying into India — since {settings.established}.
          </motion.p>
          <motion.div
            className="mt-[3.5svh] flex flex-wrap items-center gap-x-7 gap-y-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease }}
          >
            <Magnetic href="/enquiry" className="bg-saffron px-6 py-3.5 text-sm text-white">
              Send Inquiry <ArrowRight size={16} />
            </Magnetic>
            <Link href="/packages" className="link-line text-sm text-white">
              Tour packages
            </Link>
            <a href={phoneHref} className="link-line text-sm text-white">
              {settings.phone}
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-10 flex items-end justify-between gap-4 lg:absolute lg:right-0 lg:bottom-10 lg:mt-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={scene.place}
              className="font-display text-lg italic"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease }}
            >
              <span className="block text-xs not-italic text-white/70">{scene.place}</span>
              {scene.note}
            </motion.p>
          </AnimatePresence>
          <div className="flex gap-1.5">
            {scenes.map((item, index) => (
              <button
                key={item.place}
                type="button"
                aria-label={item.place}
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? "w-7 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const activityOrder = ["family", "jungle-safari", "group", "hill-stations", "heritage", "forts-palaces", "lakes-rivers", "honeymoon"];
const themeOrder = ["culture-heritage", "family-group", "religious-pilgrimage", "monuments", "honeymoon", "women-friendly", "luxury", "winter"];

function ordered<T extends { slug: string }>(items: readonly T[], order: string[]) {
  return order.flatMap((slug) => items.filter((item) => item.slug === slug));
}

function tourLabel(title: string) {
  return /tours$/i.test(title) ? title : `${title} Tours`;
}

function Rail({ children, label }: { children: ReactNode; label: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function move(direction: number) {
    const node = scroller.current;
    if (!node) return;
    const card = node.firstElementChild as HTMLElement | null;
    const width = card ? card.getBoundingClientRect().width + 24 : node.clientWidth;
    node.scrollBy({ left: direction * width, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="relative mt-12">
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <button
        type="button"
        aria-label={`Previous ${label}`}
        onClick={() => move(-1)}
        className="absolute top-[38%] -left-3 z-10 grid size-10 place-items-center rounded-full border border-line bg-white text-ink shadow-sm transition hover:border-ink sm:-left-5"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label={`Next ${label}`}
        onClick={() => move(1)}
        className="absolute top-[38%] -right-3 z-10 grid size-10 place-items-center rounded-full border border-line bg-white text-ink shadow-sm transition hover:border-ink sm:-right-5"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

function ActivityRail() {
  const items = ordered(activities, activityOrder);

  return (
    <section className="section bg-white">
      <div className="wrap">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow text-garden">Packages by activity</p>
            </Reveal>
            <Lines className="mt-4 text-3xl leading-[1.05] md:text-5xl" lines={["Days built around", <em key="e">one kind of travel</em>]} />
          </div>
          <Link href="/activities" className="link-arrow hidden text-sm sm:inline-flex">
            All activities <ArrowRight size={15} />
          </Link>
        </div>
        <Rail label="activities">
          {items.map((activity) => (
            <Link
              key={activity.slug}
              href={`/activities/${activity.slug}`}
              className="group w-[78%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <span className="relative block aspect-[4/3] overflow-hidden rounded-[3px] bg-ink">
                <Image src={activity.image} alt="" fill sizes="(min-width: 1024px) 25vw, 70vw" className="object-cover photo-zoom" />
              </span>
              <span className="mt-4 block text-center font-display text-lg text-saffron">{tourLabel(activity.title)}</span>
            </Link>
          ))}
        </Rail>
        <Link href="/activities" className="link-arrow mt-8 text-sm sm:hidden">
          All activities <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

function ThemeRail() {
  const items = ordered(themes, themeOrder);

  return (
    <section className="section">
      <div className="wrap">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow text-garden">Tour by theme</p>
            </Reveal>
            <Lines className="mt-4 text-3xl leading-[1.05] md:text-5xl" lines={["Choose the reason", <em key="e">for the trip</em>]} />
          </div>
          <Link href="/themes" className="link-arrow hidden text-sm sm:inline-flex">
            All themes <ArrowRight size={15} />
          </Link>
        </div>
        <Rail label="themes">
          {items.map((theme) => (
            <Link
              key={theme.slug}
              href={`/themes/${theme.slug}`}
              className="group flex w-[78%] shrink-0 snap-start flex-col items-center rounded-[3px] bg-white px-4 py-8 sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <span className="relative size-36 overflow-hidden rounded-full bg-ink sm:size-40">
                <Image src={theme.image} alt="" fill sizes="160px" className="object-cover photo-zoom" />
              </span>
              <span className="mt-5 text-center font-display text-lg leading-snug text-saffron">{tourLabel(theme.title)}</span>
              <span className="mt-4 rounded-[3px] bg-ink px-4 py-1.5 text-[12px] tracking-wide text-white">Read more</span>
            </Link>
          ))}
        </Rail>
        <Link href="/themes" className="link-arrow mt-8 text-sm sm:hidden">
          All themes <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

function DestinationIndex({ destinations }: { destinations: Destination[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="wrap">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow text-garden">Destinations</p>
            </Reveal>
            <Lines className="mt-4 text-3xl leading-[1.05] md:text-5xl" lines={["Where the cars", <em key="e">go from Delhi</em>]} />
          </div>
          <Link href="/destinations" className="link-arrow hidden text-sm sm:inline-flex">
            All destinations <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Reveal>
            <div className="border-t border-line">
              {destinations.map((place, index) => (
                <Link
                  key={place.slug}
                  href={`/destinations/${place.slug}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={`dest-row ${active === index ? "is-on" : "is-dim"}`}
                >
                  <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-[2px] lg:hidden">
                    <Image src={place.image} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="dest-name font-display">{place.name}</span>
                  <span className="ml-auto text-sm text-muted">{place.region}</span>
                  <ArrowUpRight size={18} className="dest-arrow hidden lg:block" />
                </Link>
              ))}
            </div>
          </Reveal>

          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-[3px] bg-ink lg:block">
            {destinations.map((place, index) => (
              <motion.div
                key={place.slug}
                className="absolute inset-0 origin-center"
                initial={false}
                animate={{
                  opacity: active === index ? 1 : 0,
                  scale: active === index ? 1 : 1.08,
                }}
                transition={{ duration: reduce ? 0 : 0.7, ease }}
              >
                <Image src={place.image} alt={place.name} fill sizes="320px" className="object-cover" />
              </motion.div>
            ))}
            <p className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 to-transparent p-5 text-white">
              <span className="block font-display text-2xl italic">{destinations[active]?.name}</span>
              <span className="mt-1 block text-sm text-white/70">{destinations[active]?.region}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Voices({ testimonials }: { testimonials: Testimonial[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const item = testimonials[index];

  useEffect(() => {
    if (reduce || testimonials.length < 2) return;
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % testimonials.length), 7000);
    return () => window.clearTimeout(timer);
  }, [index, reduce, testimonials.length]);

  if (!item) return null;

  return (
    <section className="bg-garden py-14 text-white md:py-20">
      <div className="wrap grid gap-10 lg:grid-cols-[14rem_1fr]">
        <div className="flex flex-col justify-between gap-8">
          <p className="eyebrow text-white/60">From people who came</p>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {testimonials.map((entry, dot) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setIndex(dot)}
                  aria-label={`Show note ${dot + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${dot === index ? "w-8 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60"}`}
                />
              ))}
            </div>
            <Link href="/testimonials" className="link-line text-sm text-white/80">All notes</Link>
          </div>
        </div>
        <div>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="font-display text-2xl leading-[1.3] md:text-[2.3rem]">“{item.quote}”</p>
              <footer className="mt-8 text-sm text-white/65">
                {item.name} · {item.detail}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Closing({
  settings,
  phoneHref,
  waHref,
}: {
  settings: SiteSettings;
  phoneHref: string;
  waHref: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.12, 1]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink py-20 text-white md:py-28">
      <motion.div style={{ scale }} className="absolute inset-0 -z-10">
        <Image src={unsplash("1617516202907-ff75846e6667")} alt="" fill className="object-cover opacity-35" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
      <div className="wrap grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow text-saffron">Enquiry</p>
          <Lines className="mt-4 text-3xl leading-[1.05] md:text-5xl" lines={["Send the dates.", <em key="e">The desk replies.</em>]} />
          <p className="mt-6 max-w-md text-white/70">
            {settings.ceo}’s office in Green Park writes the hotels and the car. WhatsApp, phone, or this form — same inbox.
          </p>
          <div className="mt-8 space-y-2 text-sm text-white/80">
            <p><a href={phoneHref} className="link-line">{settings.phone}</a></p>
            <p>
              <a href={waHref} className="link-line" target="_blank" rel="noreferrer">
                WhatsApp {settings.mobile}
              </a>
            </p>
            <p>
              <a href={`mailto:${settings.email}`} className="link-line">
                {settings.email}
              </a>
            </p>
            <p className="pt-2 text-white/55">
              {settings.address[0]}, {settings.address[1]}
            </p>
          </div>
        </div>
        <div className="text-foreground">
          <InquiryForm submitLabel="Send Inquiry" />
        </div>
      </div>
    </section>
  );
}
