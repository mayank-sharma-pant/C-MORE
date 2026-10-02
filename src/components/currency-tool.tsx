"use client";

import { useMemo, useState } from "react";

const rates: Record<string, number> = {
  USD: 1,
  INR: 83,
  EUR: 0.92,
  GBP: 0.78,
};

export function CurrencyTool() {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");

  const result = useMemo(() => {
    const value = Number(amount);
    if (!Number.isFinite(value)) return "—";
    const usd = value / rates[from];
    return (usd * rates[to]).toLocaleString("en-IN", { maximumFractionDigits: 2 });
  }, [amount, from, to]);

  const select = "rounded-2xl border border-line bg-white px-4 py-3";

  return (
    <div className="rounded-[1.6rem] bg-white p-6">
      <p className="text-sm text-muted">Indicative rates only. The office confirms the fare in writing.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          Amount
          <input value={amount} onChange={(event) => setAmount(event.target.value)} className={`${select} mt-2 w-full`} inputMode="decimal" />
        </label>
        <label className="text-sm">
          From
          <select value={from} onChange={(event) => setFrom(event.target.value)} className={`${select} mt-2 w-full`}>
            {Object.keys(rates).map((code) => <option key={code}>{code}</option>)}
          </select>
        </label>
        <label className="text-sm">
          To
          <select value={to} onChange={(event) => setTo(event.target.value)} className={`${select} mt-2 w-full`}>
            {Object.keys(rates).map((code) => <option key={code}>{code}</option>)}
          </select>
        </label>
      </div>
      <p className="mt-8 font-display text-3xl">{result} <span className="text-2xl text-muted">{to}</span></p>
    </div>
  );
}
