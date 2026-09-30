"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  ["/admin", "Overview"],
  ["/admin/packages", "Packages"],
  ["/admin/destinations", "Destinations"],
  ["/admin/gallery", "Gallery"],
  ["/admin/blogs", "Journal"],
  ["/admin/testimonials", "Testimonials"],
  ["/admin/inquiries", "Enquiries"],
  ["/admin/settings", "Office details"],
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-mist text-ink lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="bg-ink text-white lg:min-h-screen">
        <div className="flex items-center justify-between px-5 py-5 lg:block">
          <Link href="/admin" className="font-display text-2xl">C More desk</Link>
          <button type="button" onClick={logout} className="text-sm text-white/70 lg:mt-3 lg:block">
            Sign out
          </button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:block lg:space-y-1 lg:px-3">
          {links.map(([href, label]) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`block whitespace-nowrap rounded-full px-3 py-2 text-sm ${active ? "bg-white text-ink" : "text-white/75"}`}
              >
                {label}
              </Link>
            );
          })}
          <Link href="/" className="block whitespace-nowrap rounded-full px-3 py-2 text-sm text-saffron">
            View site
          </Link>
        </nav>
      </aside>
      <div className="px-5 py-8 sm:px-8">{children}</div>
    </div>
  );
}

export const fieldClass =
  "mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ink";
