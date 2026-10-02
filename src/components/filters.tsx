"use client";

import { useMemo, useState } from "react";
import { PackageCard } from "@/components/package-card";
import { activities, themes } from "@/lib/taxonomy";
import type { TourPackage } from "@/lib/types";

const nightOptions = [
  { id: "all", label: "Any length" },
  { id: "1", label: "1 Night & 2 Days" },
  { id: "2", label: "2 Nights & 3 Days" },
  { id: "3", label: "3 Nights & 4 Days" },
  { id: "4", label: "4 Nights & 5 Days" },
  { id: "5", label: "5 Nights & 6 Days" },
  { id: "6", label: "6 Nights & 7 Days" },
  { id: "99", label: "More than 7 nights" },
] as const;

function nightsOf(duration: string) {
  const match = duration.match(/(\d+)\s*night/i);
  return match ? Number(match[1]) : 0;
}

export function PackageExplorer({
  packages,
  initialTheme = "all",
  initialActivity = "all",
}: {
  packages: TourPackage[];
  initialTheme?: string;
  initialActivity?: string;
}) {
  const [query, setQuery] = useState("");
  const [nights, setNights] = useState("all");
  const [theme, setTheme] = useState(initialTheme);
  const [activity, setActivity] = useState(initialActivity);
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = packages.filter((pkg) => {
      const themeOk = theme === "all" || pkg.themes.includes(theme);
      const activityOk = activity === "all" || pkg.activities.includes(activity);
      const haystack = `${pkg.name} ${pkg.locations.join(" ")} ${pkg.summary}`.toLowerCase();
      const queryOk = !needle || haystack.includes(needle);
      const stay = nightsOf(pkg.duration);
      const nightsOk = nights === "all" || (nights === "99" ? stay > 7 : stay === Number(nights));
      return themeOk && activityOk && queryOk && nightsOk;
    });
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "duration") list.sort((a, b) => nightsOf(a.duration) - nightsOf(b.duration));
    return list;
  }, [packages, query, nights, theme, activity, sort]);

  const select =
    "rounded-full border border-line bg-white px-4 py-2 text-sm text-ink";

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Where do you want to go?"
          aria-label="Where do you want to go?"
          className="min-w-[16rem] flex-1 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink"
        />
        <select className={select} value={nights} onChange={(event) => setNights(event.target.value)} aria-label="Number of nights">
          {nightOptions.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
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
          <option value="duration">Shortest first</option>
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
