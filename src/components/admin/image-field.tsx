"use client";

import { useState } from "react";
import { fieldClass } from "@/components/admin/shell";

export function ImageField({
  name = "image",
  label = "Picture",
  defaultValue = "",
  value,
  onChange,
  required = false,
}: {
  name?: string;
  label?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}) {
  const [src, setSrc] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [filename, setFilename] = useState("");
  const current = value ?? src;

  function setCurrent(next: string) {
    if (value === undefined) setSrc(next);
    onChange?.(next);
  }

  async function upload(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    setFilename(file.name);
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const payload = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
    setBusy(false);
    if (!response.ok || !payload.url) {
      setError(payload.error || "That picture could not be saved.");
      return;
    }
    setCurrent(payload.url);
  }

  return (
    <div className="text-sm">
      <span>{label}</span>
      <div className="mt-2 flex flex-wrap items-start gap-4">
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current} alt="" className="h-24 w-36 rounded-xl bg-mist object-cover" />
        ) : (
          <div className="grid h-24 w-36 place-items-center rounded-xl bg-mist text-xs text-muted">No picture</div>
        )}
        <div className="min-w-[16rem] flex-1">
          <label className={`relative inline-flex cursor-pointer items-center overflow-hidden rounded-full bg-ink px-4 py-2.5 text-sm text-white ${busy ? "pointer-events-none opacity-60" : ""}`}>
            {busy ? "Saving…" : "Choose a picture"}
            <input
              type="file"
              accept="image/*,.jpg,.jpeg,.png,.webp,.gif"
              disabled={busy}
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                upload(file);
              }}
              className="absolute inset-0 z-10 cursor-pointer opacity-0"
            />
          </label>
          {filename && !error && <p className="mt-2 text-xs text-muted">{filename}</p>}
          <input
            name={name}
            required={required}
            value={current}
            onChange={(event) => setCurrent(event.target.value)}
            placeholder="Or paste an image address"
            className={fieldClass}
          />
          {error && <p className="mt-2 text-xs text-saffron">{error}</p>}
        </div>
      </div>
    </div>
  );
}
