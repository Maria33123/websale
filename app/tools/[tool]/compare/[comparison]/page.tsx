import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aiTools, getLowestAvailableOffer, getTool } from "@/app/data/directory";

type Props = {
  params: Promise<{ tool: string; comparison: string }>;
};

const comparisons = ["plus-vs-pro"];

export function generateStaticParams() {
  return aiTools.flatMap((tool) =>
    comparisons.map((comparison) => ({
      tool: tool.slug,
      comparison,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: toolSlug, comparison } = await params;
  const tool = getTool(toolSlug);

  if (!tool || !comparisons.includes(comparison)) {
    return {};
  }

  return {
    title: `${tool.name} ${comparison.replaceAll("-", " ")} | PriceAI`,
    description: `Compare ${tool.name} plan pricing, official benchmarks, tracked lower-cost sources, and buyer-risk notes.`,
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { tool: toolSlug, comparison } = await params;
  const tool = getTool(toolSlug);

  if (!tool || !comparisons.includes(comparison)) {
    notFound();
  }

  const lowest = getLowestAvailableOffer(tool.slug);

  return (
    <main className="fresh-page min-h-screen px-4 py-10 text-slate-700 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <Link href={`/tools/${tool.slug}`} className="text-sm font-semibold text-[#247e70]">
          Back to {tool.name}
        </Link>
        <div className="soft-glass mt-6 rounded-[22px] p-6">
          <p className="text-sm font-semibold text-[#247e70]">Plan comparison</p>
          <h1 className="mt-2 text-3xl font-semibold capitalize text-slate-950">
            {tool.name} {comparison.replaceAll("-", " ")}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Compare official pricing against the lowest tracked lower-cost source
            before choosing a plan.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="soft-card rounded-2xl p-5">
            <h2 className="font-semibold text-slate-950">Official benchmark</h2>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {tool.officialPrice}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Best for readers who need predictable access, official support, and
              clear billing ownership.
            </p>
          </article>
          <article className="soft-card rounded-2xl p-5">
            <h2 className="font-semibold text-slate-950">Lowest tracked option</h2>
            <p className="mt-2 text-2xl font-semibold text-[#d95c9d]">
              {lowest?.priceLabel ?? "Not tracked"}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Best for readers who prioritize price and are willing to review
              seat rules, availability, source reliability, and refund terms.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
