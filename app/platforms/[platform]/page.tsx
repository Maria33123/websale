import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlatform, platforms, priceOffers } from "@/app/data/directory";

type Props = {
  params: Promise<{ platform: string }>;
};

export function generateStaticParams() {
  return platforms.map((platform) => ({ platform: platform.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform: platformSlug } = await params;
  const platform = getPlatform(platformSlug);

  if (!platform) {
    return {};
  }

  return {
    title: `${platform.name} AI Subscription Review | PriceAI`,
    description: `Review ${platform.name} fee model, source rules, risk notes, and tracked AI subscription price records.`,
  };
}

export default async function PlatformPage({ params }: Props) {
  const { platform: platformSlug } = await params;
  const platform = getPlatform(platformSlug);

  if (!platform) {
    notFound();
  }

  const offers = priceOffers.filter((offer) => offer.platformSlug === platform.slug);

  return (
    <main className="fresh-page min-h-screen px-4 py-10 text-slate-700 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <Link href="/platforms" className="text-sm font-semibold text-[#247e70]">
          Back to platforms
        </Link>
        <div className="soft-glass mt-6 rounded-[22px] p-6">
          <p className="text-sm font-semibold text-[#247e70]">Source review</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">
            {platform.name} AI subscription source review
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            {platform.summary}
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Fee model: <strong>{platform.feeModel}</strong>
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
          <article className="soft-card rounded-2xl p-5">
            <h2 className="font-semibold text-slate-950">Risk checks</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {platform.rules.map((rule) => (
                <li key={rule}>- {rule}</li>
              ))}
            </ul>
          </article>
          <article className="soft-card rounded-2xl p-5">
            <h2 className="font-semibold text-slate-950">Tracked price records</h2>
            <div className="mt-4 grid gap-3">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="rounded-2xl border border-slate-200/70 bg-white/64 p-4"
                >
                  <p className="font-semibold text-slate-950">
                    {offer.normalizedProduct}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {offer.priceLabel} - {offer.availability} - {offer.updatedAt}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
