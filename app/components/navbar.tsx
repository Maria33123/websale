import Link from "next/link";
import { LanguageSwitcher } from "@/app/components/language-switcher";
import { getHomeCopy, type Locale } from "@/app/data/i18n";

function LogoMark() {
  return (
    <span className="relative flex size-8 items-center justify-center rounded-full bg-[#ffb4bd] shadow-sm">
      <span className="flex size-6 items-center justify-center rounded-full bg-white">
        <span className="size-2 rounded-sm bg-[#69c9b1]" />
      </span>
      <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#ffd66b]" />
    </span>
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

export function Navbar({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale);
  const isChinese = locale === "zh";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/72 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={isChinese ? "/zh" : "/"} className="flex min-w-0 items-center gap-3">
          <LogoMark />
          <span className="truncate text-lg font-semibold text-[#57bea6]">
            PriceAI
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <div className="hidden items-center gap-1 md:flex">
            {copy.navbar.links.map((link) => (
              <a
                key={`${link.href}-${link.label}`}
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={`inline-flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-semibold transition ${
                  link.active
                    ? "bg-white/82 text-[#1d1d1f] shadow-sm ring-1 ring-slate-200/70"
                    : "text-slate-500 hover:bg-white/62 hover:text-slate-900"
                }`}
              >
                {link.label}
                {link.menu ? <ChevronIcon /> : null}
              </a>
            ))}
          </div>

          <LanguageSwitcher locale={locale} label={copy.navbar.languageLabel} />
        </div>
      </nav>
    </header>
  );
}
