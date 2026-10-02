"use client";

import { useRouter } from "next/navigation";
import { httpsUrl } from "@/lib/utils";
import { useState } from "react";
import { DeleteButton } from "@/components/admin/delete-button";
import { ImageField } from "@/components/admin/image-field";
import { fieldClass } from "@/components/admin/shell";
import type { BlogPost, Destination, GalleryImage, Inquiry, SiteSettings, Testimonial } from "@/lib/types";

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

async function send(url: string, method: string, body?: unknown) {
  const response = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) throw new Error(payload.error || "Could not save.");
}

export function DestinationManager({ items }: { items: Destination[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<string | null>(null);

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await send("/api/admin/destinations", "POST", {
        name: data.name,
        region: data.region,
        image: data.image,
        summary: data.summary,
        highlights: lines(String(data.highlights || "")),
      });
      form.reset();
      setError("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  async function update(event: React.FormEvent<HTMLFormElement>, item: Destination) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await send("/api/admin/destinations", "PUT", {
        ...item,
        name: data.name,
        region: data.region,
        image: data.image,
        summary: data.summary,
        highlights: lines(String(data.highlights || "")),
      });
      setEditing(null);
      setError("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <ul className="divide-y divide-line overflow-hidden rounded-[1.4rem] bg-card">
        {items.map((item) => (
          <li key={item.slug} className="px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-2xl">{item.name}</p>
                <p className="text-sm text-muted">{item.region}</p>
              </div>
              <div className="flex gap-3 text-sm">
                <button type="button" className="underline" onClick={() => setEditing(editing === item.slug ? null : item.slug)}>
                  {editing === item.slug ? "Close" : "Edit"}
                </button>
                <DeleteButton href={`/api/admin/destinations?slug=${item.slug}`} />
              </div>
            </div>
            {editing === item.slug && (
              <form onSubmit={(event) => update(event, item)} className="mt-4 grid gap-3">
                <input name="name" required defaultValue={item.name} className={fieldClass} />
                <input name="region" defaultValue={item.region} className={fieldClass} />
                <ImageField name="image" defaultValue={item.image} required />
                <textarea name="summary" required defaultValue={item.summary} rows={3} className={fieldClass} />
                <textarea name="highlights" defaultValue={item.highlights.join("\n")} rows={3} className={fieldClass} />
                <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Save place</button>
              </form>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={create} className="grid h-fit gap-4 rounded-[1.4rem] bg-card p-5">
        <h2 className="font-display text-3xl">Add a place</h2>
        <input name="name" required placeholder="Name" className={fieldClass} />
        <input name="region" placeholder="Region" className={fieldClass} />
        <ImageField name="image" required />
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
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await send("/api/admin/gallery", "POST", data);
      setFormKey((value) => value + 1);
      setError("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  async function update(event: React.FormEvent<HTMLFormElement>, item: GalleryImage) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await send("/api/admin/gallery", "PUT", { ...item, ...data });
      setEditing(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  return (
    <div className="grid gap-8">
      <form key={formKey} onSubmit={create} className="grid gap-4 rounded-[1.4rem] bg-card p-5 sm:grid-cols-2">
        <ImageField name="src" label="Picture" required />
        <div className="grid content-start gap-4">
        <input name="alt" required placeholder="What the photo shows" className={fieldClass} />
        <input name="place" required placeholder="Place" className={fieldClass} />
        <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Add photo</button>
        </div>
        {error && <p className="text-sm text-saffron sm:col-span-2">{error}</p>}
      </form>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="overflow-hidden rounded-[1.4rem] bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.alt} className="aspect-[4/3] w-full bg-mist object-cover" />
            <div className="px-4 py-4">
              <p className="font-display text-2xl">{item.place}</p>
              <p className="text-sm text-muted">{item.alt}</p>
              <div className="mt-3 flex gap-3 text-sm">
                <button type="button" className="underline" onClick={() => setEditing(editing === item.id ? null : item.id)}>
                  {editing === item.id ? "Close" : "Edit"}
                </button>
                <DeleteButton href={`/api/admin/gallery?id=${item.id}`} />
              </div>
              {editing === item.id && (
                <form onSubmit={(event) => update(event, item)} className="mt-3 grid gap-3">
                  <ImageField name="src" label="Picture" defaultValue={item.src} required />
                  <input name="alt" required defaultValue={item.alt} className={fieldClass} />
                  <input name="place" required defaultValue={item.place} className={fieldClass} />
                  <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Save photo</button>
                </form>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogManager({ items }: { items: BlogPost[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<string | null>(null);

  function bodyFrom(value: string) {
    return value
      .split(/\n\s*\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await send("/api/admin/blogs", "POST", {
        title: data.title,
        image: data.image,
        excerpt: data.excerpt,
        body: bodyFrom(String(data.body || "")),
      });
      form.reset();
      setError("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  async function update(event: React.FormEvent<HTMLFormElement>, item: BlogPost) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await send("/api/admin/blogs", "PUT", {
        ...item,
        title: data.title,
        image: data.image,
        excerpt: data.excerpt,
        body: bodyFrom(String(data.body || "")),
      });
      setEditing(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  return (
    <div className="grid gap-8">
      <form onSubmit={create} className="grid gap-4 rounded-[1.4rem] bg-card p-5">
        <h2 className="font-display text-3xl">New story</h2>
        <input name="title" required placeholder="Title" className={fieldClass} />
        <ImageField required />
        <textarea name="excerpt" required placeholder="Short excerpt" rows={2} className={fieldClass} />
        <textarea name="body" required placeholder="Paragraphs, separated by a blank line" rows={6} className={fieldClass} />
        {error && <p className="text-sm text-saffron">{error}</p>}
        <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Publish</button>
      </form>
      <ul className="divide-y divide-line overflow-hidden rounded-[1.4rem] bg-card">
        {items.map((item) => (
          <li key={item.slug} className="px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-2xl">{item.title}</p>
                <p className="text-sm text-muted">{item.date}</p>
              </div>
              <div className="flex gap-3 text-sm">
                <button type="button" className="underline" onClick={() => setEditing(editing === item.slug ? null : item.slug)}>
                  {editing === item.slug ? "Close" : "Edit"}
                </button>
                <DeleteButton href={`/api/admin/blogs?slug=${item.slug}`} />
              </div>
            </div>
            {editing === item.slug && (
              <form onSubmit={(event) => update(event, item)} className="mt-4 grid gap-3">
                <input name="title" required defaultValue={item.title} className={fieldClass} />
                <ImageField defaultValue={item.image} required />
                <textarea name="excerpt" required defaultValue={item.excerpt} rows={2} className={fieldClass} />
                <textarea name="body" required defaultValue={item.body.join("\n\n")} rows={6} className={fieldClass} />
                <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Save story</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TestimonialManager({ items }: { items: Testimonial[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<string | null>(null);

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await send("/api/admin/testimonials", "POST", data);
      form.reset();
      setError("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  async function publish(item: Testimonial) {
    try {
      await send("/api/admin/testimonials", "PUT", { ...item, status: "published" });
      setError("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  async function update(event: React.FormEvent<HTMLFormElement>, item: Testimonial) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await send("/api/admin/testimonials", "PUT", { ...item, ...data });
      setEditing(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  return (
    <div className="grid gap-8">
      <form onSubmit={create} className="grid gap-4 rounded-[1.4rem] bg-card p-5">
        <h2 className="font-display text-3xl">Add a note</h2>
        <textarea name="quote" required placeholder="Their words" rows={4} className={fieldClass} />
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="name" required placeholder="Name" className={fieldClass} />
          <input name="detail" placeholder="Place or trip" className={fieldClass} />
        </div>
        {error && <p className="text-sm text-saffron">{error}</p>}
        <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Save note</button>
      </form>
      <ul className="space-y-4">
        {[...items].sort((a, b) => Number(b.status === "pending") - Number(a.status === "pending")).map((item) => (
          <li key={item.id} className="rounded-[1.4rem] bg-card p-5">
            <p className="font-display text-2xl leading-snug">&ldquo;{item.quote}&rdquo;</p>
            <div className="mt-3 flex items-center justify-between gap-3 text-sm text-muted">
              <span>
                {item.status === "pending" ? "Waiting · " : ""}
                {item.name}
                {item.detail ? ` · ${item.detail}` : ""}
                {item.email ? ` · ${item.email}` : ""}
              </span>
              <span className="flex gap-3">
                {item.status === "pending" && (
                  <button type="button" className="text-ink underline" onClick={() => publish(item)}>
                    Publish
                  </button>
                )}
                <button type="button" className="text-ink underline" onClick={() => setEditing(editing === item.id ? null : item.id)}>
                  {editing === item.id ? "Close" : "Edit"}
                </button>
                <DeleteButton href={`/api/admin/testimonials?id=${item.id}`} />
              </span>
            </div>
            {editing === item.id && (
              <form onSubmit={(event) => update(event, item)} className="mt-4 grid gap-3">
                <textarea name="quote" required defaultValue={item.quote} rows={4} className={fieldClass} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="name" required defaultValue={item.name} className={fieldClass} />
                  <input name="detail" defaultValue={item.detail} className={fieldClass} />
                </div>
                <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Save note</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InquiryList({ items }: { items: Inquiry[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-[1.6rem] bg-card px-6 py-10">
        <h2 className="font-display text-3xl">Nothing in the tray</h2>
        <p className="mt-2 max-w-lg text-muted">Enquiries and career notes appear here after someone sends a form on the public site.</p>
      </div>
    );
  }
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="rounded-[1.4rem] bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-saffron">
              {item.kind} · {new Date(item.createdAt).toLocaleString("en-IN")}
            </p>
            <DeleteButton href={`/api/admin/inquiries?id=${item.id}`} label="Clear" />
          </div>
          <h2 className="mt-2 font-display text-3xl">{item.name}</h2>
          <p className="text-sm text-muted">
            {item.email}
            {item.phone ? ` · ${item.phone}` : ""}
          </p>
          {item.interest && <p className="mt-3">{item.interest}</p>}
          {(item.travellers || item.dates) && (
            <p className="text-sm text-muted">
              {item.travellers} {item.dates}
            </p>
          )}
          {item.message && <p className="mt-3 whitespace-pre-line">{item.message}</p>}
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
      gst: String(data.gst),
      pan: String(data.pan),
      paypal: httpsUrl(String(data.paypal)),
      social: {
        ...settings.social,
        facebook: httpsUrl(String(data.facebook)),
        instagram: httpsUrl(String(data.instagram)),
        linkedin: httpsUrl(String(data.linkedin)),
        twitter: httpsUrl(String(data.twitter)),
        tripadvisor: httpsUrl(String(data.tripadvisor)),
        touristlink: httpsUrl(String(data.touristlink)),
        miamiHerald: httpsUrl(String(data.miamiHerald)),
        miniWeb: httpsUrl(String(data.miniWeb)),
      },
    };
    await send("/api/admin/settings", "PUT", next);
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={save} className="grid max-w-xl gap-4 rounded-[1.4rem] bg-card p-6">
      <label className="text-sm">
        Phone
        <input name="phone" defaultValue={settings.phone} className={fieldClass} />
      </label>
      <label className="text-sm">
        Second phone
        <input name="phoneAlt" defaultValue={settings.phoneAlt} className={fieldClass} />
      </label>
      <label className="text-sm">
        Mobile
        <input name="mobile" defaultValue={settings.mobile} className={fieldClass} />
      </label>
      <label className="text-sm">
        WhatsApp number, country code, no plus
        <input name="whatsapp" defaultValue={settings.whatsapp} className={fieldClass} />
      </label>
      <label className="text-sm">
        Email
        <input name="email" defaultValue={settings.email} className={fieldClass} />
      </label>
      <label className="text-sm">
        Alternate email
        <input name="altEmail" defaultValue={settings.altEmail} className={fieldClass} />
      </label>
      <label className="text-sm">
        Address, one line each
        <textarea name="address" defaultValue={settings.address.join("\n")} rows={4} className={fieldClass} />
      </label>
      <label className="text-sm">
        Hours
        <input name="hours" defaultValue={settings.hours} className={fieldClass} />
      </label>
      <label className="text-sm">
        GST
        <input name="gst" defaultValue={settings.gst} className={fieldClass} />
      </label>
      <label className="text-sm">
        PAN
        <input name="pan" defaultValue={settings.pan} className={fieldClass} />
      </label>
      <label className="text-sm">
        PayPal link, must start with https://
        <input name="paypal" defaultValue={settings.paypal} className={fieldClass} />
      </label>
      <label className="text-sm">
        Facebook
        <input name="facebook" defaultValue={settings.social.facebook} className={fieldClass} />
      </label>
      <label className="text-sm">
        Instagram
        <input name="instagram" defaultValue={settings.social.instagram} className={fieldClass} />
      </label>
      <label className="text-sm">
        LinkedIn
        <input name="linkedin" defaultValue={settings.social.linkedin} className={fieldClass} />
      </label>
      <label className="text-sm">
        Twitter
        <input name="twitter" defaultValue={settings.social.twitter} className={fieldClass} />
      </label>
      <label className="text-sm">
        TripAdvisor
        <input name="tripadvisor" defaultValue={settings.social.tripadvisor} className={fieldClass} />
      </label>
      <label className="text-sm">
        Touristlink
        <input name="touristlink" defaultValue={settings.social.touristlink} className={fieldClass} />
      </label>
      <label className="text-sm">
        Miami Herald
        <input name="miamiHerald" defaultValue={settings.social.miamiHerald} className={fieldClass} />
      </label>
      <label className="text-sm">
        Mini web
        <input name="miniWeb" defaultValue={settings.social.miniWeb} className={fieldClass} />
      </label>
      <button className="w-fit rounded-full bg-ink px-4 py-2 text-sm text-white">Save office details</button>
      {saved && <p className="text-sm text-garden">Saved. The public site is using these details.</p>}
    </form>
  );
}
