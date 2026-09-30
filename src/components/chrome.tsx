"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const links: { href: string; label: string; exact?: boolean; children?: { href: string; label: string }[] }[] = [
  { href: "/", label: "Home", exact: true },
  { href: "/about", label: "About Us" },
  { href: "/packages", label: "Tour Packages" },
  {
    href: "/services",
    label: "Our Services",
    children: [
      { href: "/services/tour-operators", label: "Tour Operators" },
      { href: "/services/mice", label: "MICE Services" },
    ],
  },
  { href: "/brochure", label: "Flipbook" },
  { href: "/awards", label: "Global Awards" },
  { href: "/services/mice", label: "MICE Services" },
  { href: "/services/tour-operators", label: "Tour Operators" },
  { href: "/contact", label: "Contact Us" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(!open && current > 160 && current > previous);
  });

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-line bg-mist/95 text-ink backdrop-blur-md"
      animate={{ y: hidden && !reduce ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-xl tracking-tight">C More</span>
          <span className="mt-0.5 block text-[10px] uppercase tracking-[0.22em] text-muted">
            Travel & Tours · New Delhi
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/enquiry" className="hidden rounded-full bg-saffron px-4 py-2 text-sm sm:inline-flex">
            Send Inquiry
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <nav className="hidden border-t border-line lg:block">
        <div className="wrap flex min-h-11 flex-wrap items-center gap-x-5 gap-y-1 py-2 text-[12.5px] text-muted">
          {links.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative h-full">
                <Link
                  href={link.href}
                  className={`inline-flex h-11 items-center ${isActive(pathname, link.href) ? "text-ink" : "hover:text-ink"}`}
                >
                  {link.label}
                </Link>
                <div className="invisible absolute top-full left-0 z-50 min-w-[13rem] opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="border border-line bg-white py-1 shadow-xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2.5 hover:bg-mist hover:text-ink ${pathname === child.href ? "text-ink" : ""}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={isActive(pathname, link.href, link.exact) ? "text-ink" : "hover:text-ink"}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      </nav>
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <div className="px-5 py-3">
              {links.map((link) => (
                <div key={`${link.href}-${link.label}`}>
                  <Link href={link.href} onClick={() => setOpen(false)} className="block py-2.5">
                    {link.label}
                  </Link>
                </div>
              ))}
              <Link
                href="/enquiry"
                onClick={() => setOpen(false)}
                className="mt-2 mb-3 inline-flex rounded-full bg-saffron px-4 py-2 text-sm sm:hidden"
              >
                Send Inquiry
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
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
