"use client";

import { useEffect, useState } from "react";

import { ToolLogo } from "@/app/components/tool-logo";
import {
  aiTools,
  getLowestAvailableOffer,
  getOffersForTool,
  getPlatform,
  getPlatformName,
  type AiTool,
  type PriceOffer,
} from "@/app/data/directory";

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

function ShieldIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
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

function availabilityText(offer: PriceOffer) {
  if (offer.availability === "in-stock") return "有货";
  if (offer.availability === "limited") return "库存有限";
  return "暂时缺货";
}

function availabilityTone(offer: PriceOffer) {
  if (offer.availability === "in-stock") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (offer.availability === "limited") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-500";
}

function riskText(offer: PriceOffer) {
  if (offer.riskLevel === "low") return "低风险";
  if (offer.riskLevel === "medium") return "需核验条款";
  return "波动较高";
}

function riskTone(offer: PriceOffer) {
  if (offer.riskLevel === "low") return "text-emerald-700";
  if (offer.riskLevel === "medium") return "text-amber-700";
  return "text-rose-700";
}

function getOfferUrl(tool: AiTool, offer: PriceOffer) {
  const platform = getPlatform(offer.platformSlug);

  return offer.platformSlug === "official"
    ? tool.officialUrl
    : platform?.sourceUrl ?? "#";
}

function TopTextBox() {
  return (
    <section className="soft-card mb-10 rounded-[32px] p-8 sm:p-10">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-4xl">
          购买前请仔细阅读
        </h1>

        <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          购买前请务必仔细阅读商品详情、使用说明及注意事项，并确认该商品符合你的使用需求。
        </p>

        <p className="mx-auto mt-4 max-w-4xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          未阅读介绍直接下单的，默认视为已了解并同意商品说明、使用规则及售后政策。
        </p>
      </div>
    </section>
  );
}


function OfferRow({
  offer,
  tool,
  isLowest,
}: {
  offer: PriceOffer;
  tool: AiTool;
  isLowest: boolean;
}) {
  const muted = offer.availability === "out-of-stock";

  return (
    <article
      className={`soft-card rounded-[22px] p-5 ${
        muted ? "opacity-60" : "ring-1 ring-transparent"
      } ${isLowest ? "border-[#88dcca] bg-white/92 ring-[#55cdb1]/30" : ""}`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-950">
              {offer.normalizedProduct}
            </h3>

            {isLowest ? (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                当前低价
              </span>
            ) : null}

            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${availabilityTone(
                offer,
              )}`}
            >
              {availabilityText(offer)}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {offer.planName} via {getPlatformName(offer.platformSlug)} -{" "}
            {offer.regionLabel}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            更新 {offer.updatedAt} - {offer.billingNote}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm sm:min-w-[360px]">
          <div>
            <p className="text-xs font-medium text-slate-400">月费</p>
            <p className="mt-1 font-bold text-pink-500">{offer.priceLabel}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">来源</p>
            <p className="mt-1 font-bold text-slate-700">
              {getPlatformName(offer.platformSlug)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">风险</p>
            <p className={`mt-1 text-sm font-bold ${riskTone(offer)}`}>
              {riskText(offer)}
            </p>
          </div>
        </div>

        <a
          href={getOfferUrl(tool, offer)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#b9e8de] bg-white px-5 py-3 text-sm font-bold text-[#247e70] shadow-sm transition hover:-translate-y-0.5 hover:border-[#55cdb1] hover:shadow-md"
        >
          核验来源
          <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

function ToolSection({ tool }: { tool: AiTool }) {
  const offers = getOffersForTool(tool.slug);
  const lowestOffer = getLowestAvailableOffer(tool.slug);

  return (
    <section id={tool.slug} className="scroll-mt-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <ToolLogo slug={tool.slug} />

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              {tool.name} 订阅价格说明
            </h2>

            <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">
              {tool.summary}
            </p>
          </div>
        </div>

        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#55cdb1] hover:text-[#247e70]"
        >
          官方：{tool.officialPrice}
        </a>
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-[20px] border border-slate-200/70 bg-white/70 p-5">
          <p className="mb-3 text-sm font-bold text-slate-500">适合场景</p>

          <div className="flex flex-wrap gap-2">
            {tool.bestFor.map((item) => (
              <span
                key={item}
                className="rounded-full bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200/70"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-slate-200/70 bg-white/70 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-500">
            <ShieldIcon />
            跳转前先看
          </div>

          <p className="text-sm leading-6 text-slate-600">
            {tool.cautions[0]}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {offers.map((offer) => (
          <OfferRow
            key={offer.id}
            offer={offer}
            tool={tool}
            isLowest={lowestOffer?.id === offer.id}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [activeTool, setActiveTool] = useState(aiTools[0].slug);

  useEffect(() => {
    document.documentElement.lang = "zh-CN";
  }, []);

  function handleNavClick(id: string) {
    setActiveTool(id);

    document.getElementById(id)?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  const totalOffers = aiTools.reduce(
    (total, tool) => total + getOffersForTool(tool.slug).length,
    0,
  );

  return (
    <main className="fresh-page min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-end">
          <a
            href="/zh"
            className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#55cdb1] hover:text-[#247e70]"
          >
            中文 / EN
          </a>
        </div>

        <TopTextBox />

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="soft-glass rounded-[28px] p-4">
              <p className="mb-3 px-2 text-sm font-bold text-slate-500">
                工具列表
              </p>

              <div className="grid gap-2">
                {aiTools.map((tool) => {
                  const lowestOffer = getLowestAvailableOffer(tool.slug);
                  const isActive = activeTool === tool.slug;

                  return (
                    <button
                      key={tool.slug}
                      type="button"
                      onClick={() => handleNavClick(tool.slug)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                        isActive
                          ? "bg-white text-slate-950 shadow-sm ring-1 ring-slate-200"
                          : "text-slate-500 hover:bg-white/70 hover:text-slate-950"
                      }`}
                    >
                      <ToolLogo slug={tool.slug} className="size-10" />

                      <span className="min-w-0">
                        <span className="block font-bold">{tool.name}</span>
                        <span className="block text-xs text-slate-400">
                          {lowestOffer?.priceLabel ?? "N/A"}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold text-[#247e70]">价格详情</p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  工具级价格详情
                </h2>
              </div>

              <p className="text-sm font-semibold text-slate-400">
                {totalOffers} 条结果
              </p>
            </div>

            <div className="grid gap-10">
              {aiTools.map((tool) => (
                <ToolSection key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}