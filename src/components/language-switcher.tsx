"use client";

import { ChevronDown, Languages } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type Language = { code: string; label: string };

export const languages: Language[] = [
  { code: "en", label: "English" },
  { code: "sq", label: "Albanian" },
  { code: "ar", label: "Arabic" },
  { code: "bn", label: "Bengali" },
  { code: "bg", label: "Bulgarian" },
  { code: "ca", label: "Catalan" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "zh-TW", label: "Chinese (Traditional)" },
  { code: "hr", label: "Croatian" },
  { code: "cs", label: "Czech" },
  { code: "da", label: "Danish" },
  { code: "nl", label: "Dutch" },
  { code: "et", label: "Estonian" },
  { code: "tl", label: "Filipino" },
  { code: "fi", label: "Finnish" },
  { code: "fr", label: "French" },
  { code: "gl", label: "Galician" },
  { code: "de", label: "German" },
  { code: "el", label: "Greek" },
  { code: "gu", label: "Gujarati" },
  { code: "iw", label: "Hebrew" },
  { code: "hi", label: "Hindi" },
  { code: "hu", label: "Hungarian" },
  { code: "id", label: "Indonesian" },
  { code: "it", label: "Italian" },
  { code: "ja", label: "Japanese" },
  { code: "kn", label: "Kannada" },
  { code: "ko", label: "Korean" },
  { code: "lv", label: "Latvian" },
  { code: "lt", label: "Lithuanian" },
  { code: "ms", label: "Malay" },
  { code: "ml", label: "Malayalam" },
  { code: "mt", label: "Maltese" },
  { code: "mr", label: "Marathi" },
  { code: "ne", label: "Nepali" },
  { code: "no", label: "Norwegian" },
  { code: "or", label: "Odia (Oriya)" },
  { code: "fa", label: "Persian" },
  { code: "pl", label: "Polish" },
  { code: "pt", label: "Portuguese (Brazil)" },
  { code: "pa", label: "Punjabi (Gurmukhi)" },
  { code: "ro", label: "Romanian" },
  { code: "ru", label: "Russian" },
  { code: "sr", label: "Serbian" },
  { code: "sk", label: "Slovak" },
  { code: "sl", label: "Slovenian" },
  { code: "es", label: "Spanish" },
  { code: "sv", label: "Swedish" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "th", label: "Thai" },
  { code: "tr", label: "Turkish" },
  { code: "uk", label: "Ukrainian" },
  { code: "ur", label: "Urdu" },
  { code: "uz", label: "Uzbek" },
  { code: "vi", label: "Vietnamese" },
];

const shortcuts = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "hi", label: "Hindi" },
] as const;

const included = languages
  .filter((language) => language.code !== "en")
  .map((language) => language.code)
  .join(",");

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string,
        ) => void;
      };
    };
  }
}

function readLang() {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (!match) return "en";
  const code = decodeURIComponent(match[1]).split("/")[2];
  if (!code || code === "en") return "en";
  return languages.some((language) => language.code === code) ? code : "en";
}

function writeLang(code: string) {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`];
  const parts = host.split(".");
  if (parts.length > 2) domains.push(`.${parts.slice(-2).join(".")}`);

  for (const domain of domains) {
    const domainPart = domain ? `; domain=${domain}` : "";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}`;
  }

  if (code === "en") return;
  const value = `/en/${code}`;
  document.cookie = `googtrans=${value}; path=/`;
  document.cookie = `googtrans=${value}; path=/; domain=${host}`;
}

function applyLanguage(code: string) {
  writeLang(code);
  window.location.reload();
}

function shortCode(code: string | null) {
  if (!code || code === "en") return "EN";
  if (code === "zh-CN") return "ZH";
  if (code === "zh-TW") return "ZH-T";
  return code.slice(0, 2).toUpperCase();
}

function Flag({ code }: { code: string }) {
  if (code === "fr") {
    return (
      <svg viewBox="0 0 20 14" className="h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-black/10" aria-hidden>
        <rect width="6.67" height="14" fill="#0055a4" />
        <rect x="6.67" width="6.66" height="14" fill="#fff" />
        <rect x="13.33" width="6.67" height="14" fill="#ef4135" />
      </svg>
    );
  }
  if (code === "de") {
    return (
      <svg viewBox="0 0 20 14" className="h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-black/10" aria-hidden>
        <rect width="20" height="4.67" fill="#000" />
        <rect y="4.67" width="20" height="4.66" fill="#dd0000" />
        <rect y="9.33" width="20" height="4.67" fill="#ffce00" />
      </svg>
    );
  }
  if (code === "hi") {
    return (
      <svg viewBox="0 0 20 14" className="h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-black/10" aria-hidden>
        <rect width="20" height="4.67" fill="#ff9933" />
        <rect y="4.67" width="20" height="4.66" fill="#fff" />
        <rect y="9.33" width="20" height="4.67" fill="#138808" />
        <circle cx="10" cy="7" r="1.5" fill="none" stroke="#000080" strokeWidth="0.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 14" className="h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-black/10" aria-hidden>
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="#fff" strokeWidth="2.4" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="#c8102e" strokeWidth="1.1" />
      <path d="M10 0 V14 M0 7 H20" stroke="#fff" strokeWidth="4" />
      <path d="M10 0 V14 M0 7 H20" stroke="#c8102e" strokeWidth="2" />
    </svg>
  );
}

function ensureTranslator() {
  window.googleTranslateElementInit = () => {
    const host = document.getElementById("google_translate_element");
    if (!host || host.childElementCount > 0 || !window.google?.translate) return;
    new window.google.translate.TranslateElement(
      { pageLanguage: "en", includedLanguages: included, autoDisplay: false },
      "google_translate_element",
    );
    const code = readLang();
    if (code === "en") return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
      const started = document.documentElement.classList.contains("translated-ltr") && document.querySelector("font");
      if (started || tries > 40) {
        window.clearInterval(timer);
        return;
      }
      if (!combo || tries % 4 !== 0) return;
      combo.value = code;
      const event = document.createEvent("HTMLEvents");
      event.initEvent("change", true, true);
      combo.dispatchEvent(event);
    }, 250);
  };

  if (document.getElementById("google-translate-script")) {
    window.googleTranslateElementInit();
    return;
  }

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

export function LanguageSwitcher({ solid = true, variant = "bar" }: { solid?: boolean; variant?: "bar" | "menu" }) {
  const [lang, setLang] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  useEffect(() => {
    const currentLang = readLang();
    setLang(currentLang);
    document.documentElement.lang = currentLang === "iw" ? "he" : currentLang;
    ensureTranslator();
  }, []);

  useEffect(() => {
    if (!lang || lang === "en") return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank") return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname.startsWith("/admin")) return;
      event.preventDefault();
      window.location.assign(url.href);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lang]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(code: string) {
    setOpen(false);
    if (code === lang) return;
    applyLanguage(code);
  }

  if (variant === "menu") {
    return (
      <label className="notranslate mt-6 block text-sm text-white/70">
        Language
        <select
          aria-label="Select language"
          value={lang ?? "en"}
          onChange={(event) => choose(event.target.value)}
          className="mt-2 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  const shortcut = shortcuts.find((item) => item.code === lang);

  return (
    <div ref={rootRef} className="notranslate relative">
      <div id="google_translate_element" className="google-translate-host" aria-hidden="true" />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[12px] transition-colors ${
          solid
            ? "border-line bg-white/80 text-ink hover:bg-white"
            : "border-white/30 bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        {shortcut ? <Flag code={shortcut.code} /> : <Languages size={14} />}
        <span>{lang ? shortCode(lang) : "EN"}</span>
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-white text-ink shadow-xl">
          <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
            {shortcuts.map((item) => (
              <button
                key={item.code}
                type="button"
                title={item.label}
                aria-label={item.label}
                onClick={() => choose(item.code)}
                className={`rounded-md p-1 transition ${lang === item.code ? "bg-mist ring-1 ring-saffron" : "hover:bg-mist"}`}
              >
                <Flag code={item.code} />
              </button>
            ))}
          </div>
          <ul id={listId} role="listbox" aria-label="Select language" className="max-h-72 overflow-y-auto py-1">
            {languages.map((language) => (
              <li key={language.code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={language.code === lang}
                  onClick={() => choose(language.code)}
                  className={`block w-full px-3 py-2 text-left text-[13px] ${
                    language.code === lang ? "bg-ink text-white" : "text-ink hover:bg-mist"
                  }`}
                >
                  {language.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
