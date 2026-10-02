"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
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
      body: JSON.stringify({ username, password }),
    });
    setSending(false);
    if (!response.ok) {
      setError("That name or password does not open the desk.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-mist px-6 py-16 text-ink">
      <form onSubmit={submit} className="w-full max-w-md overflow-hidden rounded-[1.6rem] bg-card shadow-[0_24px_60px_-32px_rgba(42,28,22,0.45)]">
        <div className="h-1.5 bg-saffron" />
        <div className="px-8 py-10">
          <Image src="/logo.png" alt="C More Travel & Tours" width={180} height={54} className="h-10 w-auto" />
          <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-saffron">Green Park office</p>
          <h1 className="mt-2 font-display text-4xl">Open the desk</h1>
          <p className="mt-3 text-sm text-muted">Packages, photos, and the notes people send from the site live here.</p>
          <label className="mt-8 block text-sm">
            Name
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-line bg-mist px-4 py-3 outline-none focus:border-ink"
              autoComplete="username"
              required
            />
          </label>
          <label className="mt-4 block text-sm">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-line bg-mist px-4 py-3 outline-none focus:border-ink"
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="mt-3 text-sm text-saffron">{error}</p>}
          <button disabled={sending} className="mt-6 rounded-full bg-ink px-5 py-3 text-sm text-white disabled:opacity-60">
            {sending ? "Checking…" : "Enter"}
          </button>
        </div>
      </form>
    </main>
  );
}
