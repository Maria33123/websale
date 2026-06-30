"use client";

import Link from "next/link";
import { useState } from "react";

import { ToolLogo } from "@/app/components/tool-logo";
import {
  getAvailabilityLabel,
  getProductsForCategory,
  getSortedProductCategories,
  type Product,
  type ProductCategory,
} from "@/app/data/directory";

const TELEGRAM_PURCHASE_URL = "https://telegram.me/coreychen111";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.5 18.5 6v5.2c0 4.1-2.6 7.8-6.5 9.3-3.9-1.5-6.5-5.2-6.5-9.3V6L12 3.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="m9.4 12 1.8 1.8 3.8-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function availabilityTone(product: Product) {
  if (product.availability === "in-stock") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (product.availability === "limited") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-500";
}

function TopNoticeBox() {
  return (
    <section className="soft-card mb-10 rounded-[32px] p-8 sm:p-10">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          购买前请仔细阅读
        </h1>

        <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
          购买前请务必仔细阅读商品详情、使用说明及注意事项，并确认该商品符合你的使用需求。
        </p>

        <p className="mx-auto mt-3 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
          未阅读介绍直接下单的，默认视为已了解并同意商品说明、使用规则及售后政策。
        </p>
      </div>
    </section>
  );
}

function ProductDetailBox({ product }: { product: Product }) {
  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-slate-50/70 p-6 sm:p-7">
      <div className="mb-4 flex items-center gap-2 text-base font-bold text-slate-800">
        <ShieldIcon />
        商品详情介绍
      </div>

      <p className="whitespace-pre-line text-sm leading-8 text-slate-600 sm:text-base sm:leading-8">
        {product.details}
      </p>
    </div>
  );
}

function ProductDetailModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  if (!product) return null;

  const isOutOfStock = product.availability === "out-of-stock";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="关闭详情弹窗"
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <section className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-2xl">
        <div className="shrink-0 border-b border-slate-100 bg-white px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#247e70]">商品详情</p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                {product.name}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex w-fit shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${availabilityTone(
                    product,
                  )}`}
                >
                  {getAvailabilityLabel(product.availability, "zh")}
                </span>

                <p className="text-sm leading-6 text-slate-500">
                  {product.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="关闭"
              onClick={onClose}
              className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <ProductDetailBox product={product} />
        </div>

        <div className="shrink-0 border-t border-slate-100 bg-white/95 px-6 py-4 shadow-[0_-16px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              再看看
            </button>

            {isOutOfStock ? (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-6 py-3 text-sm font-bold text-slate-400"
              >
                暂时缺货
              </button>
            ) : (
              <a
                href={TELEGRAM_PURCHASE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#55cdb1] bg-[#247e70] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#1f6f63] hover:shadow-md"
              >
                立即购买
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductRow({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (product: Product) => void;
}) {
  const isOutOfStock = product.availability === "out-of-stock";

  function openDetail() {
    if (isOutOfStock) return;
    onOpen(product);
  }

  return (
    <article
      role="button"
      tabIndex={isOutOfStock ? -1 : 0}
      onClick={openDetail}
      onKeyDown={(event) => {
        if (isOutOfStock) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDetail();
        }
      }}
      className={`soft-card rounded-[22px] p-5 transition ${
        isOutOfStock
          ? "cursor-not-allowed opacity-50 grayscale"
          : "cursor-pointer hover:-translate-y-0.5 hover:border-[#55cdb1] hover:shadow-lg"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 grid gap-2 sm:grid-cols-[150px_120px_minmax(0,1fr)] sm:items-center">
          <h3 className="text-lg font-semibold text-slate-950">
            {product.name}
          </h3>

          <span
            className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${availabilityTone(
              product,
            )}`}
          >
            {getAvailabilityLabel(product.availability, "zh")}
          </span>

          <p className="truncate text-sm leading-6 text-slate-500">
            {product.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-12 pr-6 sm:justify-end">
          <p className="text-xl font-bold text-slate-950">{product.price}</p>

          {isOutOfStock ? (
            <button
              type="button"
              disabled
              className="inline-flex shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-bold text-slate-400"
            >
              暂时缺货
            </button>
          ) : (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openDetail();
              }}
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full border border-[#b9e8de] bg-white px-5 py-3 text-sm font-bold text-[#247e70] shadow-sm transition hover:-translate-y-0.5 hover:border-[#55cdb1] hover:shadow-md"
            >
              查看详情
              <ArrowIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductSection({
  category,
  onOpen,
}: {
  category: ProductCategory;
  onOpen: (product: Product) => void;
}) {
  const categoryProducts = getProductsForCategory(category.slug, "zh");

  return (
    <section id={category.slug} className="scroll-mt-8">
      <div className="grid gap-4">
        {categoryProducts.map((product) => (
          <ProductRow key={product.id} product={product} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

export default function ZhHome() {
  const sortedCategories = getSortedProductCategories("zh");

  const [activeCategory, setActiveCategory] =
    useState<ProductCategory["slug"]>(sortedCategories[0]?.slug ?? "chatgpt");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleNavClick(id: ProductCategory["slug"]) {
    setActiveCategory(id);

    document.getElementById(id)?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  return (
    <main className="fresh-page min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-end">
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#55cdb1] hover:text-[#247e70]"
          >
            English
          </Link>
        </div>

        <TopNoticeBox />

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="soft-glass rounded-[28px] p-4">
              <p className="mb-3 px-2 text-sm font-bold text-slate-500">
                工具列表
              </p>

              <div className="grid gap-2">
                {sortedCategories.map((category) => {
                  const isActive = activeCategory === category.slug;

                  return (
                    <button
                      key={category.slug}
                      type="button"
                      onClick={() => handleNavClick(category.slug)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                        isActive
                          ? "bg-white text-slate-950 shadow-sm ring-1 ring-slate-200"
                          : "text-slate-500 hover:bg-white/70 hover:text-slate-950"
                      }`}
                    >
                      <ToolLogo slug={category.slug} className="size-10" />

                      <span className="min-w-0">
                        <span className="block font-bold">{category.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="grid gap-10">
              {sortedCategories.map((category) => (
                <ProductSection
                  key={category.slug}
                  category={category}
                  onOpen={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
