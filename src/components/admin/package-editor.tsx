"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageField } from "@/components/admin/image-field";
import { fieldClass } from "@/components/admin/shell";
import { activities, themes } from "@/lib/taxonomy";
import type { ItineraryDay, TourPackage } from "@/lib/types";

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function toText(days: ItineraryDay[]) {
  return days
    .map((day) => {
      const meals = day.meals ? `\nMeals: ${day.meals}` : "";
      return `${day.day} — ${day.title}\n${day.description}${meals}`;
    })
    .join("\n\n");
}

function fromText(value: string): ItineraryDay[] {
  return value
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const [first, ...rest] = block.split("\n");
      const [day, title] = first.split("—").map((part) => part.trim());
      let meals = "";
      const body = [...rest];
      if (body.at(-1)?.toLowerCase().startsWith("meals:")) {
        meals = body.pop()!.replace(/^meals:\s*/i, "");
      }
      return {
        day: day || "Day",
        title: title || "",
        description: body.join("\n").trim(),
        meals,
      };
    });
}

const empty: TourPackage = {
  slug: "",
  name: "",
  duration: "6 Nights / 7 Days",
  price: 0,
  currency: "USD",
  priceDisplay: "USD 0",
  image: "",
  locations: [],
  themes: [],
  activities: [],
  summary: "",
  featured: false,
  overview: "",
  itinerary: [],
  included: [],
  excluded: [],
  code: "",
  photos: [],
};

export function PackageEditor({ initial, mode }: { initial?: TourPackage; mode: "create" | "edit" }) {
  const router = useRouter();
  const [pkg, setPkg] = useState<TourPackage>(initial || empty);
  const [locations, setLocations] = useState((initial?.locations || []).join(", "));
  const [itinerary, setItinerary] = useState(toText(initial?.itinerary || []));
  const [included, setIncluded] = useState((initial?.included || []).join("\n"));
  const [excluded, setExcluded] = useState((initial?.excluded || []).join("\n"));
  const [photos, setPhotos] = useState((initial?.photos || []).join("\n"));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function toggle(list: string[], value: string) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const price = Number(pkg.price) || 0;
    const payload: TourPackage & { originalSlug?: string } = {
      ...pkg,
      price,
      priceDisplay: `${pkg.currency} ${price.toLocaleString("en-US")}`,
      locations: locations.split(",").map((item) => item.trim()).filter(Boolean),
      itinerary: fromText(itinerary),
      included: lines(included),
      excluded: lines(excluded),
      code: pkg.code?.trim() || "",
      photos: lines(photos),
      originalSlug: initial?.slug,
    };
    const response = await fetch("/api/admin/packages", {
      method: mode === "create" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = (await response.json()) as { error?: string };
    setSaving(false);
    if (!response.ok) {
      setError(body.error || "Could not save.");
      return;
    }
    router.push("/admin/packages");
    router.refresh();
  }

  return (
    <form onSubmit={save} className="grid max-w-3xl gap-5">
      <label className="text-sm">Name<input className={fieldClass} required value={pkg.name} onChange={(event) => setPkg({ ...pkg, name: event.target.value })} /></label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm">Tour code<input className={fieldClass} value={pkg.code || ""} onChange={(event) => setPkg({ ...pkg, code: event.target.value.toUpperCase() })} placeholder="GTNI" /></label>
        <label className="text-sm">Duration<input className={fieldClass} value={pkg.duration} onChange={(event) => setPkg({ ...pkg, duration: event.target.value })} /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm">Desk fare, not published<input className={fieldClass} type="number" value={pkg.price} onChange={(event) => setPkg({ ...pkg, price: Number(event.target.value) })} /></label>
        <label className="text-sm">Currency
          <select className={fieldClass} value={pkg.currency} onChange={(event) => setPkg({ ...pkg, currency: event.target.value as TourPackage["currency"] })}>
            <option>USD</option>
            <option>INR</option>
          </select>
        </label>
      </div>
      <ImageField label="Cover picture" value={pkg.image} onChange={(image) => setPkg({ ...pkg, image })} required />
      <label className="text-sm">
        More pictures, one address per line. These appear on the public itinerary.
        <textarea className={fieldClass} rows={5} value={photos} onChange={(event) => setPhotos(event.target.value)} />
      </label>
      <label className="text-sm">Places, separated by commas<input className={fieldClass} value={locations} onChange={(event) => setLocations(event.target.value)} /></label>
      <label className="text-sm">Short summary<textarea className={fieldClass} rows={3} value={pkg.summary} onChange={(event) => setPkg({ ...pkg, summary: event.target.value })} /></label>
      <label className="text-sm">Overview<textarea className={fieldClass} rows={5} value={pkg.overview} onChange={(event) => setPkg({ ...pkg, overview: event.target.value })} /></label>
      <fieldset>
        <legend className="text-sm">Themes</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {themes.map((theme) => (
            <label key={theme.slug} className="rounded-full bg-white px-3 py-2 text-sm">
              <input type="checkbox" className="mr-2" checked={pkg.themes.includes(theme.slug)} onChange={() => setPkg({ ...pkg, themes: toggle(pkg.themes, theme.slug) })} />
              {theme.title}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm">Activities</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {activities.map((activity) => (
            <label key={activity.slug} className="rounded-full bg-white px-3 py-2 text-sm">
              <input type="checkbox" className="mr-2" checked={pkg.activities.includes(activity.slug)} onChange={() => setPkg({ ...pkg, activities: toggle(pkg.activities, activity.slug) })} />
              {activity.title}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={pkg.featured} onChange={(event) => setPkg({ ...pkg, featured: event.target.checked })} />
        Show on the home page
      </label>
      <label className="text-sm">
        Day by day. One day per block. First line is “Day 1 — Title”.
        <textarea className={fieldClass} rows={12} value={itinerary} onChange={(event) => setItinerary(event.target.value)} />
      </label>
      <label className="text-sm">Included, one per line<textarea className={fieldClass} rows={4} value={included} onChange={(event) => setIncluded(event.target.value)} /></label>
      <label className="text-sm">Not included, one per line<textarea className={fieldClass} rows={4} value={excluded} onChange={(event) => setExcluded(event.target.value)} /></label>
      {error && <p className="text-sm text-saffron">{error}</p>}
      <button disabled={saving} className="w-fit rounded-full bg-ink px-5 py-3 text-sm text-white">
        {saving ? "Saving…" : "Save package"}
      </button>
    </form>
  );
}
