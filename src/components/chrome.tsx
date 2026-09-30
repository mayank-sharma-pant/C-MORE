"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const links: { href: string; label: string; exact?: boolean; children?: { href: string; label: string }[] }[] = [
  { href: "/", label: "Home", exact: true },
  { href: "/about", label: "About" },
  { href: "/packages", label: "Packages" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services", label: "All services" },
      { href: "/services/tour-operators", label: "Tour operators" },
      { href: "/services/mice", label: "MICE" },
    ],
  },
  { href: "/destinations", label: "Destinations" },
  { href: "/brochure", label: "Flipbook" },
  { href: "/awards", label: "Awards" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navTone(solid: boolean, active: boolean) {
  if (active) return solid ? "text-ink" : "text-white";
  return solid ? "text-muted hover:text-ink" : "text-white/75 hover:text-white";
}

export function Navbar({ phone }: { phone?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const solid = scrolled || open;

  useMotionValueEvent(scrollY, "change", (current) => {
    setScrolled(current > 24);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-line/70 bg-mist/90 py-3 text-ink shadow-sm backdrop-blur-xl"
          : "border-0 bg-transparent py-5 text-white shadow-none"
      }`}
    >
      <div className="relative z-[60] wrap flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0 leading-none" onClick={() => setOpen(false)}>
          <span className={`font-display tracking-tight transition-all duration-500 ${solid ? "text-[1.2rem]" : "text-[1.35rem]"}`}>
            C More
          </span>
          <span className={`mt-0.5 block text-[9px] uppercase tracking-[0.22em] ${solid ? "text-muted" : "text-white/65"}`}>
            Travel & Tours · New Delhi
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative">
                <Link href={link.href} className={`relative py-1 text-[13px] transition-colors duration-300 ${navTone(solid, isActive(pathname, link.href))}`}>
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive(pathname, link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
                <div className="invisible absolute top-full left-0 z-50 min-w-[12.5rem] pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-line bg-white py-1 text-ink shadow-xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2.5 text-[13px] hover:bg-mist ${pathname === child.href ? "text-saffron" : "text-muted hover:text-ink"}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-1 text-[13px] transition-colors duration-300 ${navTone(solid, isActive(pathname, link.href, link.exact))}`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive(pathname, link.href, link.exact) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          {phone && (
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className={`hidden text-[13px] transition-colors xl:inline ${solid ? "text-muted hover:text-ink" : "text-white/80 hover:text-white"}`}
            >
              {phone}
            </a>
          )}
          <Link
            href="/enquiry"
            className="hidden rounded-full bg-saffron px-4 py-2 text-[13px] text-white transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Send Inquiry
          </Link>
          <button
            type="button"
            className={`grid h-10 w-10 place-items-center rounded-xl transition-colors lg:hidden ${
              solid ? "bg-white/80 text-ink" : "bg-white/15 text-white backdrop-blur-sm"
            }`}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="fixed inset-0 z-40 bg-ink/95 pt-24 text-white backdrop-blur-xl lg:hidden"
          >
            <div className="wrap flex h-full flex-col justify-center gap-1 pb-16">
              {links.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display py-2 text-3xl"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/enquiry"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex w-fit rounded-full bg-saffron px-5 py-2.5 text-sm text-white"
              >
                Send Inquiry
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-ink text-white">
      <div className="wrap grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-2xl">C More</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Incoming tours from Green Park, New Delhi, since {settings.established}.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/70">
            <a href={settings.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={settings.social.tripadvisor} target="_blank" rel="noreferrer">TripAdvisor</a>
            <a href={settings.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={settings.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Visit</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/awards">Global awards</Link></li>
            <li><Link href="/brochure">Flipbook</Link></li>
            <li><Link href="/blog">Journal</Link></li>
            <li><Link href="/career">Career</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/enquiry">Enquiry</Link></li>
            <li><Link href="/sitemap">Site map</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Travel</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/packages">Tour packages</Link></li>
            <li><Link href="/destinations">Destinations</Link></li>
            <li><Link href="/services/tour-operators">Tour operators</Link></li>
            <li><Link href="/services/mice">MICE</Link></li>
            <li><Link href="/themes">Tour by theme</Link></li>
            <li><Link href="/activities">Packages by activity</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/currency">Currency converter</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Office</p>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            {settings.address.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </p>
          <p className="mt-4 text-sm text-white/80">
            <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}>{settings.phone}</a>
            <span className="block">{settings.phoneAlt}</span>
            <a className="block" href={`tel:+${settings.whatsapp}`}>{settings.mobile}</a>
            <a className="mt-2 block text-saffron" href={`mailto:${settings.email}`}>{settings.email}</a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} C More Travel & Tours. GST {settings.gst}</p>
          <p>Incoming tour organisers. Delhi courts for disputes.</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsApp({ number }: { number: string }) {
  return (
    <a
      href={`https://wa.me/${number}?text=Hello%2C%20I%20would%20like%20to%20plan%20a%20journey%20with%20C%20More.`}
      className="fixed bottom-5 right-5 z-40 rounded-full bg-[#1f6b4a] px-4 py-3 text-sm text-white shadow-lg transition hover:-translate-y-0.5"
      target="_blank"
      rel="noreferrer"
    >
      WhatsApp
    </a>
  );
}
