"use client";

import { useMemo, useState } from "react";
import { PackageCard } from "@/components/package-card";
import { activities, themes } from "@/lib/taxonomy";
import type { TourPackage } from "@/lib/types";

export function PackageExplorer({
  packages,
  initialTheme = "all",
  initialActivity = "all",
}: {
  packages: TourPackage[];
  initialTheme?: string;
  initialActivity?: string;
}) {
  const [theme, setTheme] = useState(initialTheme);
  const [activity, setActivity] = useState(initialActivity);
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    const list = packages.filter((pkg) => {
      const themeOk = theme === "all" || pkg.themes.includes(theme);
      const activityOk = activity === "all" || pkg.activities.includes(activity);
      return themeOk && activityOk;
    });
    const value = (pkg: TourPackage) =>
      pkg.currency === "INR" ? pkg.price / 83 : pkg.price;
    if (sort === "price-asc") list.sort((a, b) => value(a) - value(b));
    if (sort === "price-desc") list.sort((a, b) => value(b) - value(a));
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [packages, theme, activity, sort]);

  const select =
    "rounded-full border border-line bg-white px-4 py-2 text-sm text-ink";

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <select className={select} value={theme} onChange={(event) => setTheme(event.target.value)} aria-label="Theme">
          <option value="all">All themes</option>
          {themes.map((item) => (
            <option key={item.slug} value={item.slug}>{item.title}</option>
          ))}
        </select>
        <select className={select} value={activity} onChange={(event) => setActivity(event.target.value)} aria-label="Activity">
          <option value="all">All activities</option>
          {activities.map((item) => (
            <option key={item.slug} value={item.slug}>{item.title}</option>
          ))}
        </select>
        <select className={select} value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort">
          <option value="featured">Featured first</option>
          <option value="price-asc">Price, low to high</option>
          <option value="price-desc">Price, high to low</option>
          <option value="name">Name</option>
        </select>
      </div>
      <p className="mt-6 text-sm text-muted">{visible.length} programmes</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((pkg) => (
          <PackageCard key={pkg.slug} pkg={pkg} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-10 text-lg">Nothing in this combination yet. Clear a filter, or send an enquiry and the office will build the route.</p>
      )}
    </div>
  );
}
