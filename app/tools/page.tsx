import type { Metadata } from "next";
import Link from "next/link";
import { aiTools, getLowestAvailableOffer, getPlatformName } from "@/app/data/directory";

export const metadata: Metadata = {
  title: "AI Tools Subscription Price Directory | PriceAI",
  description:
    "Browse AI subscription price guides for ChatGPT, Claude, Gemini, and Grok.",
};

export default function ToolsPage() {
  return (
    <main className="fresh-page min-h-screen px-4 py-10 text-slate-700 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-[#247e70]">
          Back to PriceAI
        </Link>
        <div className="soft-glass mt-6 rounded-[22px] p-6">
          <h1 className="text-3xl font-semibold text-slate-950">
            AI tools subscription price directory
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Compare official prices, shared subscription sources, and buyer-risk
            notes for major AI tools.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {aiTools.map((tool) => {
            const offer = getLowestAvailableOffer(tool.slug);

            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="soft-card rounded-2xl p-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-10 items-center justify-center rounded-xl text-xs font-semibold text-white"
                    style={{ backgroundColor: tool.accent }}
                  >
                    {tool.symbol}
                  </span>
                  <div>
                    <h2 className="font-semibold text-slate-950">{tool.name}</h2>
                    <p className="text-sm text-slate-500">
                      Lowest tracked: {offer?.priceLabel ?? "Not tracked"} via{" "}
                      {offer ? getPlatformName(offer.platformSlug) : "N/A"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
