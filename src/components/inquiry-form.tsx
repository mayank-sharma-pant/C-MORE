"use client";

import { useState } from "react";

export function InquiryForm({
  kind = "enquiry",
  interest = "",
  submitLabel = "Send enquiry",
}: {
  kind?: "enquiry" | "career";
  interest?: string;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, kind }),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error || "The enquiry could not be sent. Call the office instead.");
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <p className="rounded-3xl bg-white p-8 text-lg">
        Received. The Green Park office will reply on the email or phone you gave.
      </p>
    );
  }

  const field =
    "mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none transition focus:border-ink";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[1.6rem] bg-white p-6 shadow-[0_20px_50px_-36px_rgba(16,35,28,0.5)] sm:p-8">
      <label className="text-sm">
        Name
        <input name="name" required className={field} autoComplete="name" />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm">
          Email
          <input name="email" type="email" required className={field} autoComplete="email" />
        </label>
        <label className="text-sm">
          Phone
          <input name="phone" required className={field} autoComplete="tel" />
        </label>
      </div>
      <label className="text-sm">
        {kind === "career" ? "Role you want" : "Journey you have in mind"}
        <input name="interest" defaultValue={interest} className={field} />
      </label>
      {kind === "enquiry" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm">
            Travellers
            <input name="travellers" className={field} placeholder="2 adults" />
          </label>
          <label className="text-sm">
            Approximate dates
            <input name="dates" className={field} placeholder="November, 10 nights" />
          </label>
        </div>
      )}
      <label className="text-sm">
        Message
        <textarea name="message" required rows={5} className={field} />
      </label>
      {error && <p className="text-sm text-saffron">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-ink px-6 py-3 text-white transition hover:bg-garden disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
