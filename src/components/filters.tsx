"use client";

import { useMemo, useState } from "react";
import { PackageCard } from "@/components/package-card";
import { activities, themes } from "@/lib/taxonomy";
import type { TourPackage } from "@/lib/types";

const budgets = [
  { id: "all", label: "Any budget" },
  { id: "1500", label: "Below 1,500", min: 0, max: 1500 },
  { id: "3000", label: "1,501 to 3,000", min: 1501, max: 3000 },
  { id: "5000", label: "3,001 to 5,000", min: 3001, max: 5000 },
  { id: "10000", label: "5,001 to 10,000", min: 5001, max: 10000 },
  { id: "15000", label: "10,001 to 15,000", min: 10001, max: 15000 },
  { id: "25000", label: "15,001 to 25,000", min: 15001, max: 25000 },
  { id: "above", label: "Above 25,000", min: 25001, max: Number.POSITIVE_INFINITY },
] as const;

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
  const [budget, setBudget] = useState("all");
  const [nights, setNights] = useState("all");
  const [theme, setTheme] = useState(initialTheme);
  const [activity, setActivity] = useState(initialActivity);
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    const band = budgets.find((item) => item.id === budget);
    const needle = query.trim().toLowerCase();
    const list = packages.filter((pkg) => {
      const themeOk = theme === "all" || pkg.themes.includes(theme);
      const activityOk = activity === "all" || pkg.activities.includes(activity);
      const haystack = `${pkg.name} ${pkg.locations.join(" ")} ${pkg.summary}`.toLowerCase();
      const queryOk = !needle || haystack.includes(needle);
      const priceOk = !band || !("min" in band) || (pkg.price >= band.min && pkg.price <= band.max);
      const stay = nightsOf(pkg.duration);
      const nightsOk = nights === "all" || (nights === "99" ? stay > 7 : stay === Number(nights));
      return themeOk && activityOk && queryOk && priceOk && nightsOk;
    });
    const value = (pkg: TourPackage) =>
      pkg.currency === "INR" ? pkg.price / 83 : pkg.price;
    if (sort === "price-asc") list.sort((a, b) => value(a) - value(b));
    if (sort === "price-desc") list.sort((a, b) => value(b) - value(a));
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [packages, query, budget, nights, theme, activity, sort]);

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
        <select className={select} value={budget} onChange={(event) => setBudget(event.target.value)} aria-label="Budget">
          {budgets.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
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
