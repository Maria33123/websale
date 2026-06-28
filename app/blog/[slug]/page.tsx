import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/app/data/directory";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | PriceAI`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="fresh-page min-h-screen px-4 py-10 text-slate-700 sm:px-6">
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-semibold text-[#247e70]">
          Back to guides
        </Link>
        <div className="soft-glass mt-6 rounded-[22px] p-6">
          <p className="text-sm font-semibold text-[#247e70]">{post.category}</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">
            {post.title}
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {post.description}
          </p>
          <p className="mt-4 text-xs text-slate-400">{post.readTime} read</p>
        </div>

        <div className="soft-card mt-6 rounded-2xl p-6 text-sm leading-7 text-slate-600">
          This article page is ready for long-form SEO content. The next step is
          to expand it with original research, screenshots, pricing history, FAQ
          blocks, and internal links to relevant tool and platform pages.
        </div>
      </article>
    </main>
  );
}
