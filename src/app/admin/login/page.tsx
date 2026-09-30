"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSending(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setSending(false);
    if (!response.ok) {
      setError("That password is not right.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-6 text-white">
      <form onSubmit={submit} className="w-full max-w-sm">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">C More desk</p>
        <h1 className="mt-3 font-display text-3xl">Sign in</h1>
        <label className="mt-8 block text-sm">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none"
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="mt-3 text-sm text-saffron">{error}</p>}
        <button disabled={sending} className="mt-6 rounded-full bg-saffron px-5 py-3 text-sm">
          {sending ? "Checking…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
