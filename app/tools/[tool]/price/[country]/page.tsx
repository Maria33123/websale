import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  aiTools,
  countryPricePages,
  getOffersForTool,
  getPlatformName,
  getTool,
} from "@/app/data/directory";

type Props = {
  params: Promise<{ tool: string; country: string }>;
};

export function generateStaticParams() {
  return aiTools.flatMap((tool) =>
    countryPricePages.map((country) => ({
      tool: tool.slug,
      country: country.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: toolSlug, country: countrySlug } = await params;
  const tool = getTool(toolSlug);
  const country = countryPricePages.find((item) => item.slug === countrySlug);

  if (!tool || !country) {
    return {};
  }

  return {
    title: `${tool.name} Price in ${country.countryName} | PriceAI`,
    description: `Compare ${tool.name} subscription prices, official billing notes, source availability, and buyer-risk checks for ${country.countryName}.`,
  };
}

export default async function CountryPricePage({ params }: Props) {
  const { tool: toolSlug, country: countrySlug } = await params;
  const tool = getTool(toolSlug);
  const country = countryPricePages.find((item) => item.slug === countrySlug);

  if (!tool || !country) {
    notFound();
  }

  const offers = getOffersForTool(tool.slug).filter(
    (offer) => offer.countrySlug === country.slug,
  );

  return (
    <main className="fresh-page min-h-screen px-4 py-10 text-slate-700 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <Link href={`/tools/${tool.slug}`} className="text-sm font-semibold text-[#247e70]">
          Back to {tool.name}
        </Link>
        <div className="soft-glass mt-6 rounded-[22px] p-6">
          <p className="text-sm font-semibold text-[#247e70]">Regional price page</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">
            {tool.name} price in {country.countryName}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            {country.summary}
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Currency focus: <strong>{country.currency}</strong> - Official benchmark:{" "}
            <strong>{tool.officialPrice}</strong>
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <article key={offer.id} className="soft-card rounded-2xl p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-950">
                      {offer.normalizedProduct}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {getPlatformName(offer.platformSlug)} - {offer.regionLabel} -{" "}
                      {offer.billingNote}
                    </p>
                  </div>
                  <p className="text-xl font-semibold text-[#d95c9d]">
                    {offer.priceLabel}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div className="soft-card rounded-2xl p-6 text-sm leading-7 text-slate-600">
              No tracked offer is available for this exact country yet. This page
              is reserved for future automated pricing updates.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
