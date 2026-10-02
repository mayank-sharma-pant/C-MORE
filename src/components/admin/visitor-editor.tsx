"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { fieldClass } from "@/components/admin/shell";

export function VisitorEditor({ initial }: { initial: number }) {
  const router = useRouter();
  const [count, setCount] = useState(String(initial));
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSaved(false);
    const response = await fetch("/api/admin/visitors", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: Number(count) }),
    });
    if (!response.ok) {
      setError("That number could not be saved.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={save} className="rounded-[1.4rem] bg-card p-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-saffron">Visitor counter</p>
      <p className="mt-2 font-display text-3xl tabular-nums">{initial.toLocaleString("en-IN")}</p>
      <label className="mt-4 block text-sm">
        Set the public number
        <input
          value={count}
          onChange={(event) => setCount(event.target.value)}
          inputMode="numeric"
          className={fieldClass}
        />
      </label>
      <button className="mt-4 rounded-full bg-ink px-4 py-2 text-sm text-white">Save count</button>
      {saved && <p className="mt-3 text-sm text-garden">The footer is using this number.</p>}
      {error && <p className="mt-3 text-sm text-saffron">{error}</p>}
    </form>
  );
}
