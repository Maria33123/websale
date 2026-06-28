import { DirectoryExplorer } from "@/app/components/directory-explorer";
import type { Locale } from "@/app/data/i18n";

export function SiteShell({ locale = "en" }: { locale?: Locale }) {
  return <DirectoryExplorer locale={locale} />;
}