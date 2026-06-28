import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  aiTools,
  getLowestAvailableOffer,
  getOffersForTool,
  getPlatformName,
  getTool,
} from "@/app/data/directory";

type Props = {
  params: Promise<{ tool: string }>;
};

export function generateStaticParams() {
  return aiTools.map((tool) => ({ tool: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getTool(toolSlug);

  if (!tool) {
    return {};
  }

  return {
    title: `${tool.name} Subscription Price Guide | PriceAI`,
    description: `Compare ${tool.name} official prices, shared subscription sources, availability, and buyer-risk notes.`,
  };
}

export default async function ToolPage({ params }: Props) {
  const { tool: toolSlug } = await params;
  const tool = getTool(toolSlug);

  if (!tool) {
    notFound();
  }

  const offers = getOffersForTool(tool.slug);
  const lowest = getLowestAvailableOffer(tool.slug);

  return (
    <main className="fresh-page min-h-screen px-4 py-10 text-slate-700 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-[#247e70]">
          Back to PriceAI
        </Link>
        <div className="soft-glass mt-6 rounded-[22px] p-6">
          <p className="text-sm font-semibold text-[#247e70]">Tool guide</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">
            {tool.name} subscription price guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            {tool.summary}
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Official benchmark: <strong>{tool.officialPrice}</strong>
            {lowest ? (
              <>
                {" "}
                - Lowest tracked: <strong>{lowest.priceLabel}</strong> via{" "}
                <strong>{getPlatformName(lowest.platformSlug)}</strong>
              </>
            ) : null}
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {offers.map((offer) => (
            <article key={offer.id} className="soft-card rounded-2xl p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-slate-950">
                    {offer.normalizedProduct}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {offer.planName} - {getPlatformName(offer.platformSlug)} -{" "}
                    {offer.regionLabel}
                  </p>
                </div>
                <p className="text-xl font-semibold text-[#d95c9d]">
                  {offer.priceLabel}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
