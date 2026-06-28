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
import { getHomeCopy, type HomeCopy, type Locale } from "@/app/data/i18n";

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

function getToolText(copy: HomeCopy, tool: AiTool) {
  return (
    copy.tools[tool.slug] ?? {
      summary: tool.summary,
      bestFor: tool.bestFor,
      cautions: tool.cautions,
    }
  );
}

function getOfferText(copy: HomeCopy, offer: PriceOffer) {
  return (
    copy.offers[offer.id] ?? {
      planName: offer.planName,
      countryName: offer.countryName,
      regionLabel: offer.regionLabel,
      billingNote: offer.billingNote,
    }
  );
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

function riskTone(offer: PriceOffer) {
  if (offer.riskLevel === "low") {
    return "text-emerald-700";
  }

  if (offer.riskLevel === "medium") {
    return "text-amber-700";
  }

  return "text-rose-700";
}

function AvailabilityBadge({
  offer,
  copy,
}: {
  offer: PriceOffer;
  copy: HomeCopy;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${availabilityTone(
        offer,
      )}`}
    >
      {copy.availability[offer.availability]}
    </span>
  );
}

function RiskBadge({ offer, copy }: { offer: PriceOffer; copy: HomeCopy }) {
  return (
    <span className={`text-sm font-bold ${riskTone(offer)}`}>
      {copy.risk[offer.riskLevel]}
    </span>
  );
}

function getOfferUrl(tool: AiTool, offer: PriceOffer) {
  const platform = getPlatform(offer.platformSlug);

  return offer.platformSlug === "official"
    ? tool.officialUrl
    : platform?.sourceUrl ?? "#";
}

function TopTextBox({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";

  return (
    <section className="soft-card mb-8 rounded-[28px] p-6 sm:p-7">
      <div className="mb-5">
        <p className="text-sm font-bold text-[#247e70]">
          {isZh ? "页面说明" : "Page note"}
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          {isZh ? "AI 订阅价格详情" : "AI Subscription Price Details"}
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          {isZh
            ? "你可以在这里填写网站说明、购买提醒、服务规则或重要提示。这一块会和下面的价格详情区域保持同宽。"
            : "You can write page notes, buying reminders, service rules, or important notices here. This block stays aligned with the price details below."}
        </p>
      </div>

      <textarea
        className="min-h-[120px] w-full resize-none rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#55cdb1] focus:ring-4 focus:ring-[#55cdb1]/10"
        placeholder={
          isZh
            ? "在这里输入文字，例如：所有价格仅供参考，购买前请确认账号来源、使用规则和售后政策。"
            : "Type here, for example: All prices are for reference only. Please verify account source, usage rules, and after-sales policy before purchasing."
        }
      />
    </section>
  );
}

function OfferRow({
  offer,
  tool,
  isLowest,
  copy,
}: {
  offer: PriceOffer;
  tool: AiTool;
  isLowest: boolean;
  copy: HomeCopy;
}) {
  const muted = offer.availability === "out-of-stock";
  const offerText = getOfferText(copy, offer);

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
                {copy.labels.lowestUsable}
              </span>
            ) : null}

            <AvailabilityBadge offer={offer} copy={copy} />
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {offerText.planName} via {getPlatformName(offer.platformSlug)} -{" "}
            {offerText.regionLabel}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            {copy.labels.updated} {offer.updatedAt} - {offerText.billingNote}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm sm:min-w-[360px]">
          <div>
            <p className="text-xs font-medium text-slate-400">
              {copy.labels.monthly}
            </p>
            <p className="mt-1 font-bold text-pink-500">{offer.priceLabel}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              {copy.labels.platform}
            </p>
            <p className="mt-1 font-bold text-slate-700">
              {getPlatformName(offer.platformSlug)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              {copy.labels.risk}
            </p>
            <RiskBadge offer={offer} copy={copy} />
          </div>
        </div>

        <a
          href={getOfferUrl(tool, offer)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#b9e8de] bg-white px-5 py-3 text-sm font-bold text-[#247e70] shadow-sm transition hover:-translate-y-0.5 hover:border-[#55cdb1] hover:shadow-md"
        >
          {copy.labels.verifySource}
          <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

function ToolSection({
  tool,
  offers,
  copy,
}: {
  tool: AiTool;
  offers: PriceOffer[];
  copy: HomeCopy;
}) {
  const lowestOffer = getLowestAvailableOffer(tool.slug);
  const toolText = getToolText(copy, tool);

  return (
    <section id={tool.slug} className="scroll-mt-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <ToolLogo slug={tool.slug} />
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              {tool.name} {copy.labels.subscriptionNotes}
            </h2>
            <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">
              {toolText.summary}
            </p>
          </div>
        </div>

        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#55cdb1] hover:text-[#247e70]"
        >
          {copy.labels.official}: {tool.officialPrice}
        </a>
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-[20px] border border-slate-200/70 bg-white/70 p-5">
          <p className="mb-3 text-sm font-bold text-slate-500">
            {copy.labels.bestFor}
          </p>
          <div className="flex flex-wrap gap-2">
            {toolText.bestFor.map((item) => (
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
            {copy.labels.beforeClick}
          </div>
          <p className="text-sm leading-6 text-slate-600">
            {toolText.cautions[0]}
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
            copy={copy}
          />
        ))}
      </div>
    </section>
  );
}

export function DirectoryExplorer({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale);
  const [activeTool, setActiveTool] = useState(aiTools[0].slug);

  const visibleGroups = aiTools.map((tool) => ({
    tool,
    offers: getOffersForTool(tool.slug),
  }));

  const totalOffers = visibleGroups.reduce(
    (total, group) => total + group.offers.length,
    0,
  );

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
  }, [copy.htmlLang]);

  function handleNavClick(id: string) {
    setActiveTool(id);
    document.getElementById(id)?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  return (
    <main className="fresh-page min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-end">
          <a
            href={copy.alternatePath}
            className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#55cdb1] hover:text-[#247e70]"
          >
            {copy.alternateLabel}
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="soft-glass rounded-[28px] p-4">
              <p className="mb-3 px-2 text-sm font-bold text-slate-500">
                {locale === "zh" ? "工具列表" : "Tools"}
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
            <TopTextBox locale={locale} />

            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold text-[#247e70]">
                  {locale === "zh" ? "价格详情" : "Price details"}
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {copy.labels.details}
                </h2>
              </div>

              <p className="text-sm font-semibold text-slate-400">
                {totalOffers} {copy.labels.results}
              </p>
            </div>

            <div className="grid gap-10">
              {visibleGroups.map((group) => (
                <ToolSection
                  key={group.tool.slug}
                  tool={group.tool}
                  offers={group.offers}
                  copy={copy}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}