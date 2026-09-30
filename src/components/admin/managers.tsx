"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteButton } from "@/components/admin/delete-button";
import { fieldClass } from "@/components/admin/shell";
import type { BlogPost, Destination, GalleryImage, Inquiry, SiteSettings, Testimonial } from "@/lib/types";

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

export function DestinationManager({ items }: { items: Destination[] }) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const response = await fetch("/api/admin/destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        region: data.region,
        image: data.image,
        summary: data.summary,
        highlights: lines(String(data.highlights || "")),
      }),
    });
    const body = (await response.json()) as { error?: string };
    if (!response.ok) return setError(body.error || "Could not save.");
    form.reset();
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <ul className="divide-y divide-line rounded-[1.4rem] bg-white">
        {items.map((item) => (
          <li key={item.slug} className="flex items-center justify-between gap-3 px-5 py-4">
            <span className="font-display text-2xl">{item.name}</span>
            <DeleteButton href={`/api/admin/destinations?slug=${item.slug}`} />
          </li>
        ))}
      </ul>
      <form onSubmit={create} className="grid gap-4 rounded-[1.4rem] bg-white p-5">
        <h2 className="font-display text-3xl">Add a place</h2>
        <input name="name" required placeholder="Name" className={fieldClass} />
        <input name="region" placeholder="Region" className={fieldClass} />
        <input name="image" required placeholder="Image address" className={fieldClass} />
        <textarea name="summary" required placeholder="Summary" rows={4} className={fieldClass} />
        <textarea name="highlights" placeholder="Highlights, one per line" rows={4} className={fieldClass} />
        {error && <p className="text-sm text-saffron">{error}</p>}
        <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Save place</button>
      </form>
    </div>
  );
}

export function GalleryManager({ items }: { items: GalleryImage[] }) {
  const router = useRouter();

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    form.reset();
    router.refresh();
  }

  return (
    <div className="grid gap-8">
      <form onSubmit={create} className="grid gap-4 rounded-[1.4rem] bg-white p-5 sm:grid-cols-4">
        <input name="src" required placeholder="Image address" className={fieldClass} />
        <input name="alt" required placeholder="What the photo shows" className={fieldClass} />
        <input name="place" required placeholder="Place" className={fieldClass} />
        <button className="rounded-full bg-ink px-4 py-2 text-sm text-white">Add photo</button>
      </form>
      <ul className="divide-y divide-line rounded-[1.4rem] bg-white">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-3 px-5 py-4">
            <span>{item.place} — {item.alt}</span>
            <DeleteButton href={`/api/admin/gallery?id=${item.id}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogManager({ items }: { items: BlogPost[] }) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const response = await fetch("/api/admin/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        image: data.image,
        excerpt: data.excerpt,
        body: String(data.body || "")
          .split(/\n\s*\n/)
          .map((item) => item.trim())
          .filter(Boolean),
      }),
    });
    const body = (await response.json()) as { error?: string };
    if (!response.ok) return setError(body.error || "Could not save.");
    form.reset();
    router.refresh();
  }

  return (
    <div className="grid gap-8">
      <form onSubmit={create} className="grid gap-4 rounded-[1.4rem] bg-white p-5">
        <h2 className="font-display text-3xl">New story</h2>
        <input name="title" required placeholder="Title" className={fieldClass} />
        <input name="image" required placeholder="Image address" className={fieldClass} />
        <textarea name="excerpt" required placeholder="Short excerpt" rows={2} className={fieldClass} />
        <textarea name="body" required placeholder="Paragraphs, separated by a blank line" rows={6} className={fieldClass} />
        {error && <p className="text-sm text-saffron">{error}</p>}
        <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Publish</button>
      </form>
      <ul className="divide-y divide-line rounded-[1.4rem] bg-white">
        {items.map((item) => (
          <li key={item.slug} className="flex items-center justify-between gap-3 px-5 py-4">
            <span className="font-display text-2xl">{item.title}</span>
            <DeleteButton href={`/api/admin/blogs?slug=${item.slug}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TestimonialManager({ items }: { items: Testimonial[] }) {
  const router = useRouter();

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    form.reset();
    router.refresh();
  }

  return (
    <div className="grid gap-8">
      <form onSubmit={create} className="grid gap-4 rounded-[1.4rem] bg-white p-5">
        <textarea name="quote" required placeholder="Their words" rows={4} className={fieldClass} />
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="name" required placeholder="Name" className={fieldClass} />
          <input name="detail" placeholder="Place or trip" className={fieldClass} />
        </div>
        <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Add note</button>
      </form>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="rounded-[1.4rem] bg-white p-5">
            <p>{item.quote}</p>
            <div className="mt-3 flex items-center justify-between text-sm text-muted">
              <span>{item.name} · {item.detail}</span>
              <DeleteButton href={`/api/admin/testimonials?id=${item.id}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InquiryList({ items }: { items: Inquiry[] }) {
  if (items.length === 0) {
    return <p className="text-lg">No enquiries yet. They will appear here when someone writes from the site.</p>;
  }
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="rounded-[1.4rem] bg-white p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-saffron">{item.kind} · {new Date(item.createdAt).toLocaleString("en-IN")}</p>
          <h2 className="mt-2 font-display text-3xl">{item.name}</h2>
          <p className="text-sm text-muted">{item.email} · {item.phone}</p>
          <p className="mt-3">{item.interest}</p>
          <p className="text-sm text-muted">{item.travellers} {item.dates}</p>
          <p className="mt-3 whitespace-pre-line">{item.message}</p>
        </li>
      ))}
    </ul>
  );
}

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const next: SiteSettings = {
      ...settings,
      phone: String(data.phone),
      phoneAlt: String(data.phoneAlt),
      mobile: String(data.mobile),
      email: String(data.email),
      altEmail: String(data.altEmail),
      whatsapp: String(data.whatsapp),
      hours: String(data.hours),
      address: lines(String(data.address)),
    };
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={save} className="grid max-w-xl gap-4">
      <label className="text-sm">Phone<input name="phone" defaultValue={settings.phone} className={fieldClass} /></label>
      <label className="text-sm">Second phone<input name="phoneAlt" defaultValue={settings.phoneAlt} className={fieldClass} /></label>
      <label className="text-sm">Mobile<input name="mobile" defaultValue={settings.mobile} className={fieldClass} /></label>
      <label className="text-sm">WhatsApp number, country code, no plus<input name="whatsapp" defaultValue={settings.whatsapp} className={fieldClass} /></label>
      <label className="text-sm">Email<input name="email" defaultValue={settings.email} className={fieldClass} /></label>
      <label className="text-sm">Alternate email<input name="altEmail" defaultValue={settings.altEmail} className={fieldClass} /></label>
      <label className="text-sm">Address, one line each<textarea name="address" defaultValue={settings.address.join("\n")} rows={4} className={fieldClass} /></label>
      <label className="text-sm">Hours<input name="hours" defaultValue={settings.hours} className={fieldClass} /></label>
      <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Save office details</button>
      {saved && <p className="text-sm text-garden">Saved. The public site is using these details.</p>}
    </form>
  );
}
