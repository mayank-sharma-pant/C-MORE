"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const groups = [
  {
    label: "Catalogue",
    links: [
      ["/admin/packages", "Packages"],
      ["/admin/destinations", "Destinations"],
      ["/admin/gallery", "Gallery"],
    ],
  },
  {
    label: "Stories",
    links: [
      ["/admin/blogs", "Journal"],
      ["/admin/testimonials", "Testimonials"],
    ],
  },
  {
    label: "Office",
    links: [
      ["/admin/inquiries", "Enquiries"],
      ["/admin/newsletter", "Newsletter"],
      ["/admin/settings", "Office details"],
    ],
  },
] as const;

function active(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const nav = (
    <nav className="mt-8 space-y-7">
      <Link
        href="/admin"
        onClick={() => setOpen(false)}
        className={`block border-l-2 px-3 py-1 text-sm ${
          active(pathname, "/admin") ? "border-saffron text-white" : "border-transparent text-white/65"
        }`}
      >
        Day sheet
      </Link>
      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-3 text-[10px] uppercase tracking-[0.22em] text-white/40">{group.label}</p>
          <div className="mt-2 space-y-1">
            {group.links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block border-l-2 px-3 py-1.5 text-sm ${
                  active(pathname, href) ? "border-saffron text-white" : "border-transparent text-white/65 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-mist text-ink lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="hidden bg-ink text-white lg:flex lg:min-h-screen lg:flex-col lg:px-5 lg:py-6">
        <Link href="/admin" className="inline-flex w-fit rounded-sm bg-white px-2 py-1.5">
          <Image src="/logo.png" alt="C More Travel & Tours" width={160} height={48} className="h-8 w-auto" />
        </Link>
        <p className="mt-4 font-display text-xl italic text-white/90">The desk</p>
        {nav}
        <div className="mt-auto pt-8">
          <Link href="/" className="block px-3 text-sm text-saffron">
            View the public site
          </Link>
          <button type="button" onClick={logout} className="mt-3 block px-3 text-sm text-white/60">
            Sign out
          </button>
          <p className="mt-6 px-3 text-[10px] uppercase tracking-[0.2em] text-white/35">Green Park · since 1991</p>
        </div>
      </aside>

      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-ink px-4 py-3 text-white">
          <Link href="/admin" className="rounded-sm bg-white px-1.5 py-1">
            <Image src="/logo.png" alt="C More Travel & Tours" width={140} height={42} className="h-7 w-auto" />
          </Link>
          <button type="button" onClick={() => setOpen((value) => !value)} className="text-sm">
            {open ? "Close" : "Menu"}
          </button>
        </div>
        {open && (
          <div className="bg-ink px-4 pb-6 text-white">
            {nav}
            <Link href="/" className="mt-6 block px-3 text-sm text-saffron">
              View the public site
            </Link>
            <button type="button" onClick={logout} className="mt-3 block px-3 text-sm text-white/60">
              Sign out
            </button>
          </div>
        )}
      </div>

      <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</div>
    </div>
  );
}

export function DeskHeader({
  title,
  lede,
  action,
}: {
  title: string;
  lede?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-saffron">Green Park desk</p>
        <h1 className="mt-2 font-display text-4xl">{title}</h1>
        {lede && <p className="mt-2 max-w-xl text-muted">{lede}</p>}
      </div>
      {action}
    </header>
  );
}

export const fieldClass =
  "mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ink";
