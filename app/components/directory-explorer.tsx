"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolLogo } from "@/app/components/tool-logo";
import {
  aiTools,
  getLowestAvailableOffer,
  getOffersForTool,
  getPlatform,
  getPlatformName,
  platforms,
  priceOffers,
  type AiTool,
  type PriceOffer,
} from "@/app/data/directory";
import { getHomeCopy, type HomeCopy, type Locale } from "@/app/data/i18n";

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="m20 20-4.2-4.2m1.2-5.3a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path
        d="m7 7 10 10M17 7 7 17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3 19 6v5.2c0 4.3-2.8 7.7-7 9.8-4.2-2.1-7-5.5-7-9.8V6l7-3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="m9.5 12 1.7 1.7 3.6-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function getToolText(copy: HomeCopy, tool: AiTool) {
  return copy.tools[tool.slug] ?? {
    summary: tool.summary,
    bestFor: tool.bestFor,
    cautions: tool.cautions,
  };
}

function getOfferText(copy: HomeCopy, offer: PriceOffer) {
  return copy.offers[offer.id] ?? {
    planName: offer.planName,
    countryName: offer.countryName,
    regionLabel: offer.regionLabel,
    billingNote: offer.billingNote,
  };
}

function getPlatformText(copy: HomeCopy, platformSlug: string) {
  const platform = getPlatform(platformSlug);

  return copy.platforms[platformSlug] ?? {
    summary: platform?.summary ?? "",
    feeModel: platform?.feeModel ?? "",
  };
}

function hasQueryMatch(
  tool: AiTool,
  offer: PriceOffer,
  query: string,
  copy: HomeCopy,
) {
  const platformName = getPlatformName(offer.platformSlug);
  const toolText = getToolText(copy, tool);
  const offerText = getOfferText(copy, offer);
  const haystack = [
    tool.name,
    toolText.summary,
    tool.officialPrice,
    ...toolText.bestFor,
    ...toolText.cautions,
    offer.normalizedProduct,
    offerText.planName,
    offerText.countryName,
    offerText.regionLabel,
    offer.priceLabel,
    offerText.billingNote,
    platformName,
    ...offer.tags,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
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
      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${availabilityTone(
        offer,
      )}`}
    >
      {copy.availability[offer.availability]}
    </span>
  );
}

function RiskBadge({ offer, copy }: { offer: PriceOffer; copy: HomeCopy }) {
  return (
    <span className={`text-sm font-semibold ${riskTone(offer)}`}>
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

function getComparisonRows() {
  return aiTools.map((tool) => {
    const lowestOffer = getLowestAvailableOffer(tool.slug);

    return {
      tool,
      offer: lowestOffer,
    };
  });
}

function PriceComparisonTable({ copy }: { copy: HomeCopy }) {
  const rows = getComparisonRows();

  return (
    <section
      id="comparison-table"
      className="soft-glass min-w-0 rounded-[22px] p-5 sm:p-6"
    >
      <div className="flex flex-col gap-3 border-b border-slate-200/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#247e70]">
            {copy.table.kicker}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {copy.table.title}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          {copy.table.description}
        </p>
      </div>

      <div className="mt-5 w-full max-w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-[860px] border-separate border-spacing-y-3 text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.14em] text-slate-400">
              <th className="px-3 py-2 font-semibold">{copy.table.headers.tool}</th>
              <th className="px-3 py-2 font-semibold">
                {copy.table.headers.officialPrice}
              </th>
              <th className="px-3 py-2 font-semibold">
                {copy.table.headers.lowestTracked}
              </th>
              <th className="px-3 py-2 font-semibold">
                {copy.table.headers.platform}
              </th>
              <th className="px-3 py-2 font-semibold">
                {copy.table.headers.availability}
              </th>
              <th className="px-3 py-2 font-semibold">{copy.table.headers.risk}</th>
              <th className="px-3 py-2 font-semibold">
                {copy.table.headers.updated}
              </th>
              <th className="px-3 py-2 font-semibold">
                {copy.table.headers.source}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ tool, offer }) => {
              const toolText = getToolText(copy, tool);

              return (
                <tr key={tool.slug}>
                  <td className="rounded-l-2xl border-y border-l border-slate-200/70 bg-white/74 px-3 py-4">
                    <div className="flex items-center gap-3">
                      <ToolLogo slug={tool.slug} />
                      <div>
                        <p className="font-semibold text-slate-950">{tool.name}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {toolText.bestFor.slice(0, 2).join(" / ")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-y border-slate-200/70 bg-white/74 px-3 py-4 font-semibold text-slate-700">
                    {tool.officialPrice}
                  </td>
                  <td className="border-y border-slate-200/70 bg-white/74 px-3 py-4">
                    <p className="font-semibold text-[#d95c9d]">
                      {offer?.priceLabel ?? "Not tracked"}
                    </p>
                    {offer ? (
                      <p className="mt-1 text-xs text-slate-400">
                        {offer.normalizedProduct}
                      </p>
                    ) : null}
                  </td>
                  <td className="border-y border-slate-200/70 bg-white/74 px-3 py-4 font-semibold text-slate-700">
                    {offer ? getPlatformName(offer.platformSlug) : "N/A"}
                  </td>
                  <td className="border-y border-slate-200/70 bg-white/74 px-3 py-4">
                    {offer ? <AvailabilityBadge offer={offer} copy={copy} /> : null}
                  </td>
                  <td className="border-y border-slate-200/70 bg-white/74 px-3 py-4">
                    {offer ? <RiskBadge offer={offer} copy={copy} /> : null}
                  </td>
                  <td className="border-y border-slate-200/70 bg-white/74 px-3 py-4 text-slate-500">
                    {offer?.updatedAt ?? "N/A"}
                  </td>
                  <td className="rounded-r-2xl border-y border-r border-slate-200/70 bg-white/74 px-3 py-4">
                    {offer ? (
                      <a
                        href={getOfferUrl(tool, offer)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#d8ece8] bg-white px-3 text-sm font-semibold text-[#247e70] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f4fffc]"
                      >
                        {copy.labels.verifySource}
                        <ArrowIcon />
                      </a>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
      className={`soft-card grid gap-5 rounded-2xl p-5 md:grid-cols-[1fr_auto_auto] md:items-center ${
        muted ? "opacity-60" : ""
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900">
            {offer.normalizedProduct}
          </h3>
          {isLowest ? (
            <span className="rounded-full bg-[#e9faf5] px-2.5 py-1 text-xs font-semibold text-[#247e70]">
              {copy.labels.lowestUsable}
            </span>
          ) : null}
          <AvailabilityBadge offer={offer} copy={copy} />
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {offerText.planName} via {getPlatformName(offer.platformSlug)} -{" "}
          {offerText.regionLabel}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          {copy.labels.updated} {offer.updatedAt} - {offerText.billingNote}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm md:flex md:items-center md:gap-8">
        <div>
          <p className="text-xs text-slate-400">{copy.labels.monthly}</p>
          <p className="mt-1 font-semibold text-[#d95c9d]">{offer.priceLabel}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">{copy.labels.platform}</p>
          <p className="mt-1 font-semibold text-slate-800">
            {getPlatformName(offer.platformSlug)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400">{copy.labels.risk}</p>
          <p className="mt-1">
            <RiskBadge offer={offer} copy={copy} />
          </p>
        </div>
      </div>

      <a
        href={getOfferUrl(tool, offer)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#d8ece8] bg-white px-4 text-sm font-semibold text-[#247e70] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9ee2d5] hover:bg-[#f4fffc] hover:shadow-md active:translate-y-0 active:scale-[0.98]"
      >
        {copy.labels.verifySource}
        <ArrowIcon />
      </a>
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
    <section id={tool.slug} className="scroll-mt-36">
      <div className="mb-3 px-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ToolLogo slug={tool.slug} className="size-8 rounded-lg" />
              <h2 className="text-lg font-semibold text-slate-900">
                {tool.name} {copy.labels.subscriptionNotes}
              </h2>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              {toolText.summary}
            </p>
          </div>
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden shrink-0 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-white sm:inline-flex"
          >
            {copy.labels.official}: {tool.officialPrice}
          </a>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-white/80 bg-white/58 p-4 shadow-sm backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              {copy.labels.bestFor}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {toolText.bestFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/80 bg-white/58 p-4 shadow-sm backdrop-blur-xl">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              <ShieldIcon />
              {copy.labels.beforeClick}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {toolText.cautions[0]}
            </p>
          </div>
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

function MethodologySection({ copy }: { copy: HomeCopy }) {
  return (
    <section id="methodology" className="soft-glass rounded-[22px] p-5 sm:p-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-[#247e70]">
          {copy.methodology.kicker}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
          {copy.methodology.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {copy.methodology.description}
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {copy.methodology.steps.map((step) => (
          <article key={step.title} className="rounded-2xl border border-white/80 bg-white/64 p-4">
            <h3 className="font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PlatformNotes({ copy }: { copy: HomeCopy }) {
  return (
    <section id="platforms" className="soft-glass rounded-[22px] p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#247e70]">
            {copy.sourceNotes.kicker}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {copy.sourceNotes.title}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          {copy.sourceNotes.description}
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {platforms.map((platform) => {
          const platformText = getPlatformText(copy, platform.slug);

          return (
            <article key={platform.slug} className="soft-card rounded-2xl p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-900">
                  {platform.name}
                </h3>
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: platform.accent }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {platformText.summary}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                {copy.sourceNotes.feeModel}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {platformText.feeModel}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function InternalLinksSection({ copy }: { copy: HomeCopy }) {
  return (
    <section id="guides" className="soft-glass rounded-[22px] p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#247e70]">
            {copy.seoHub.kicker}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {copy.seoHub.title}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          {copy.seoHub.description}
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {copy.seoLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="soft-card rounded-2xl p-5 transition hover:-translate-y-0.5"
          >
            <p className="text-sm font-semibold text-slate-950">{link.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {link.description}
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#247e70]">
              {copy.labels.readGuide}
              <ArrowIcon />
            </p>
          </a>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {copy.blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-slate-200/70 bg-white/64 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-[#247e70]">
                {post.category}
              </p>
              <p className="text-xs text-slate-400">{post.readTime}</p>
            </div>
            <h3 className="mt-2 font-semibold text-slate-900">{post.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {post.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ copy }: { copy: HomeCopy }) {
  return (
    <section id="faq" className="soft-glass rounded-[22px] p-5 sm:p-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-[#247e70]">{copy.faq.kicker}</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
          {copy.faq.title}
        </h2>
      </div>

      <div className="mt-5 grid gap-3">
        {copy.faqItems.map((item) => (
          <article
            key={item.question}
            className="rounded-2xl border border-slate-200/70 bg-white/68 p-5"
          >
            <h3 className="font-semibold text-slate-950">{item.question}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DirectoryExplorer({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale);
  const [query, setQuery] = useState("");
  const [activeTool, setActiveTool] = useState(aiTools[0].slug);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleGroups = useMemo(() => {
    return aiTools
      .map((tool) => {
        const offers = getOffersForTool(tool.slug);
        const toolMatches =
          !normalizedQuery ||
          [
            tool.name,
            getToolText(copy, tool).summary,
            tool.officialPrice,
            ...getToolText(copy, tool).bestFor,
            ...getToolText(copy, tool).cautions,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        const filteredOffers = normalizedQuery
          ? offers.filter((offer) =>
              hasQueryMatch(tool, offer, normalizedQuery, copy),
            )
          : offers;

        return {
          tool,
          offers: toolMatches ? offers : filteredOffers,
        };
      })
      .filter((group) => group.offers.length > 0);
  }, [copy, normalizedQuery]);

  const availableOffers = priceOffers.filter(
    (offer) => offer.availability !== "out-of-stock",
  );
  const lowestVisiblePrice = Math.min(
    ...availableOffers.map((offer) => offer.priceMonthlyUsd),
  );

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
  }, [copy.htmlLang]);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");

    if (aiTools.some((tool) => tool.slug === id)) {
      requestAnimationFrame(() => {
        setActiveTool(id);
        document.getElementById(id)?.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      });
    }
  }, []);

  useEffect(() => {
    let frame = 0;

    function updateActiveTool() {
      frame = 0;

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
      ) {
        setActiveTool(aiTools[aiTools.length - 1].slug);
        return;
      }

      const stickyOffset = 156;
      let currentTool = aiTools[0].slug;

      aiTools.forEach((tool) => {
        const section = document.getElementById(tool.slug);

        if (section && section.getBoundingClientRect().top <= stickyOffset) {
          currentTool = tool.slug;
        }
      });

      setActiveTool(currentTool);
    }

    function scheduleUpdate() {
      if (!frame) {
        frame = requestAnimationFrame(updateActiveTool);
      }
    }

    updateActiveTool();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    setActiveTool(id);
    document.getElementById(id)?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
    window.history.replaceState(null, "", `#${id}`);
  }

  function handleOverviewClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setActiveTool(aiTools[0].slug);
    document.getElementById("comparison-table")?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
    window.history.replaceState(null, "", "#comparison-table");
  }

  return (
    <section id="tools" className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6">
      <div className="soft-glass rounded-[22px] p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/70 pb-4 text-sm font-semibold text-slate-600">
          <span className="rounded-full bg-white/72 px-3 py-1 text-[#247e70]">
            {copy.hero.eyebrowBrand}
          </span>
          <span>{copy.hero.eyebrowText}</span>
        </div>

        <div className="grid gap-8 py-8 sm:py-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <h1 className="bg-gradient-to-r from-slate-950 via-[#2d6f68] to-[#cf5454] bg-clip-text text-3xl font-bold text-transparent sm:text-5xl">
              {copy.hero.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
              {copy.hero.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/80 bg-white/60 p-4 backdrop-blur-xl">
              <p className="text-xs text-slate-400">{copy.hero.trackedTools}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950">
                {aiTools.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/60 p-4 backdrop-blur-xl">
              <p className="text-xs text-slate-400">{copy.hero.trackedOffers}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950">
                {priceOffers.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/60 p-4 backdrop-blur-xl">
              <p className="text-xs text-slate-400">{copy.hero.lowestPrice}</p>
              <p className="mt-1 text-2xl font-semibold text-[#247e70]">
                ${lowestVisiblePrice.toFixed(2)}/mo
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4 text-sm leading-6 text-emerald-950">
          {copy.hero.dataNote}
        </div>
      </div>

      <section className="soft-glass mt-5 rounded-[22px] p-5 sm:p-6">
        <label className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white/78 px-4 text-slate-400 shadow-sm focus-within:border-[#7edbc8]">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="flex size-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 active:scale-95"
            >
              <CloseIcon />
            </button>
          ) : null}
        </label>
      </section>

      <div className="mt-5">
        <PriceComparisonTable copy={copy} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[248px_minmax(0,1fr)] lg:items-start">
        <nav
          id="tool-nav"
          aria-label="AI tool navigation"
          className="lg:sticky lg:top-24"
        >
          <div className="soft-glass rounded-[22px] p-3 sm:p-4">
            <a
              href="#comparison-table"
              onClick={handleOverviewClick}
              className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-slate-500 transition hover:bg-white/70 hover:text-slate-950"
            >
              <span aria-hidden="true">&larr;</span>
              {copy.labels.overview}
            </a>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {aiTools.map((tool) => {
                const lowestOffer = getLowestAvailableOffer(tool.slug);
                const isActive = activeTool === tool.slug;

                return (
                  <a
                    key={tool.slug}
                    href={`#${tool.slug}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(event) => handleNavClick(event, tool.slug)}
                    className={`group flex min-w-[196px] items-center gap-3 rounded-2xl px-3 py-3 text-left transition duration-200 lg:min-w-0 ${
                      isActive
                        ? "bg-white/88 text-slate-950 shadow-[0_10px_24px_rgba(31,41,55,0.10)] ring-1 ring-slate-200/70"
                        : "text-slate-500 hover:bg-white/66 hover:text-slate-950"
                    }`}
                  >
                    <ToolLogo slug={tool.slug} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {tool.name}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-400">
                        {lowestOffer?.priceLabel ?? "N/A"}
                      </span>
                    </span>
                    <span
                      className={`size-1.5 rounded-full transition ${
                        isActive
                          ? "bg-[#55cdb1] opacity-100"
                          : "bg-slate-300 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="min-w-0">
          <div className="flex items-center justify-between px-1 text-sm text-slate-500">
            <span>{copy.labels.details}</span>
            <span>
              {visibleGroups.reduce((total, group) => total + group.offers.length, 0)}{" "}
              {copy.labels.results}
            </span>
          </div>

          <div className="mt-4 grid gap-8">
            {visibleGroups.length > 0 ? (
              visibleGroups.map((group) => (
                <ToolSection
                  key={group.tool.slug}
                  tool={group.tool}
                  offers={group.offers}
                  copy={copy}
                />
              ))
            ) : (
              <div className="soft-card rounded-2xl p-8 text-center text-slate-500">
                {copy.labels.noMatches}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8">
        <MethodologySection copy={copy} />
        <PlatformNotes copy={copy} />
        <InternalLinksSection copy={copy} />
        <FaqSection copy={copy} />
      </div>
    </section>
  );
}
