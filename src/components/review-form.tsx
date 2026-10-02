"use client";

import { useState } from "react";

export function ReviewForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error || "The note could not be sent. Write to the office instead.");
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <p className="rounded-[1.6rem] bg-white p-8 text-lg">
        Received. The office reads every note before it appears on this page.
      </p>
    );
  }

  const field = "mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none transition focus:border-ink";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[1.6rem] bg-white p-6 sm:p-8">
      <div>
        <h2 className="font-display text-3xl">Write a note</h2>
        <p className="mt-2 text-sm text-muted">If you travelled with C More, the desk will publish your words after reading them.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm">
          Name
          <input name="name" required className={field} autoComplete="name" />
        </label>
        <label className="text-sm">
          Email, for the office only
          <input name="email" type="email" required className={field} autoComplete="email" />
        </label>
      </div>
      <label className="text-sm">
        Where you went
        <input name="detail" className={field} placeholder="Golden Triangle, March" />
      </label>
      <label className="text-sm">
        Your note
        <textarea name="quote" required minLength={20} rows={5} className={field} placeholder="What the journey was actually like." />
      </label>
      {error && <p className="text-sm text-saffron">{error}</p>}
      <button disabled={status === "sending"} className="w-fit rounded-full bg-ink px-5 py-3 text-sm text-white disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send the note"}
      </button>
    </form>
  );
}
