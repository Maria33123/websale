import { SiteShell } from "@/app/components/site-shell";
import {
  aiTools,
  getLowestAvailableOffer,
  getPlatformName,
} from "@/app/data/directory";
import { getHomeCopy, type Locale } from "@/app/data/i18n";

function createFaqJsonLd(locale: Locale) {
  const copy = getHomeCopy(locale);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function createComparisonJsonLd(locale: Locale) {
  const copy = getHomeCopy(locale);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.table.title,
    itemListElement: aiTools.map((tool, index) => {
      const offer = getLowestAvailableOffer(tool.slug);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: tool.name,
          description: copy.tools[tool.slug]?.summary ?? tool.summary,
          offers: offer
            ? {
                "@type": "Offer",
                price: offer.priceMonthlyUsd,
                priceCurrency: "USD",
                availability:
                  offer.availability === "out-of-stock"
                    ? "https://schema.org/OutOfStock"
                    : "https://schema.org/InStock",
                seller: {
                  "@type": "Organization",
                  name: getPlatformName(offer.platformSlug),
                },
              }
            : undefined,
        },
      };
    }),
  };
}

function jsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function LocalizedHome({ locale }: { locale: Locale }) {
  return (
    <main className="fresh-page min-h-screen text-slate-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(createComparisonJsonLd(locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(createFaqJsonLd(locale)) }}
      />
      <SiteShell locale={locale} />
    </main>
  );
}
