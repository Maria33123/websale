import { DirectoryExplorer } from "@/app/components/directory-explorer";
import { Navbar } from "@/app/components/navbar";
import type { Locale } from "@/app/data/i18n";

export function SiteShell({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <Navbar locale={locale} />
      <DirectoryExplorer locale={locale} />
    </>
  );
}
