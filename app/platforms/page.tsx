import type { Metadata } from "next";
import Link from "next/link";
import { platforms } from "@/app/data/directory";

export const metadata: Metadata = {
  title: "AI Subscription Sources | GamsGo, Spliiit Notes | PriceAI",
  description:
    "Compare AI subscription sources, fee models, refund checks, and buyer-risk notes.",
};

export default function PlatformsPage() {
  return (
    <main className="fresh-page min-h-screen px-4 py-10 text-slate-700 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-[#247e70]">
          Back to PriceAI
        </Link>
        <div className="soft-glass mt-6 rounded-[22px] p-6">
          <h1 className="text-3xl font-semibold text-slate-950">
            AI subscription source notes
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Review platform fee models, risk levels, and buyer checks before
            verifying prices on external sources.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {platforms.map((platform) => (
            <Link
              key={platform.slug}
              href={`/platforms/${platform.slug}`}
              className="soft-card rounded-2xl p-5"
            >
              <h2 className="font-semibold text-slate-950">{platform.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {platform.summary}
              </p>
              <p className="mt-4 text-sm font-semibold text-[#247e70]">
                {platform.feeModel}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
