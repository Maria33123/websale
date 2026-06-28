import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/app/data/directory";

export const metadata: Metadata = {
  title: "AI Subscription Buyer Guides | PriceAI",
  description:
    "Read buyer guides about AI subscription fatigue, shared subscription risks, and price comparison methods.",
};

export default function BlogPage() {
  return (
    <main className="fresh-page min-h-screen px-4 py-10 text-slate-700 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-[#247e70]">
          Back to PriceAI
        </Link>
        <div className="soft-glass mt-6 rounded-[22px] p-6">
          <h1 className="text-3xl font-semibold text-slate-950">
            AI subscription buyer guides
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Long-form guides for reducing subscription overlap, checking shared
            platform risk, and understanding AI tool pricing.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="soft-card rounded-2xl p-5"
            >
              <p className="text-sm font-semibold text-[#247e70]">
                {post.category}
              </p>
              <h2 className="mt-2 font-semibold text-slate-950">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
