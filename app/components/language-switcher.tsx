"use client";

import Link from "next/link";
import { useState, type FocusEvent } from "react";
import type { Locale } from "@/app/data/i18n";

function GlobeIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M3.5 12h17M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5M12 3.5C9.8 5.8 8.7 8.6 8.7 12s1.1 6.2 3.3 8.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" className="size-3.5" viewBox="0 0 24 24" fill="none">
      <path
        d="m7 10 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const isChinese = locale === "zh";
  const currentLanguage = isChinese ? "中文" : "EN";
  const languageOptions = [
    { label: "EN", href: "/", active: !isChinese },
    { label: "中文", href: "/zh", active: isChinese },
  ];

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget;

    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setOpen(false);
    }
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={handleBlur}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold text-slate-600 transition hover:bg-white/70 hover:text-slate-950 focus-visible:bg-white/80 sm:px-3"
      >
        <GlobeIcon />
        <span>{currentLanguage}</span>
        <ChevronIcon />
      </button>

      <div
        className={`absolute right-0 top-full z-50 min-w-32 pt-2 ${
          open ? "block" : "hidden group-hover:block group-focus-within:block"
        }`}
      >
        <div
          role="menu"
          aria-label={label}
          className="rounded-2xl border border-white/80 bg-white/86 p-1.5 shadow-[0_18px_42px_rgba(31,41,55,0.14)] backdrop-blur-2xl"
        >
          {languageOptions.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              role="menuitem"
              aria-current={option.active ? "page" : undefined}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition ${
                option.active
                  ? "bg-[#e9faf5] text-[#247e70]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              {option.label}
              {option.active ? (
                <span className="ml-4 size-1.5 rounded-full bg-[#55cdb1]" />
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
