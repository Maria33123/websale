export type RiskLevel = "low" | "medium" | "high";

export type Availability = "in-stock" | "limited" | "out-of-stock";

export type AiTool = {
  slug: string;
  name: string;
  shortName: string;
  symbol: string;
  accent: string;
  summary: string;
  officialPrice: string;
  officialUrl: string;
  bestFor: string[];
  cautions: string[];
};

export type Platform = {
  slug: string;
  name: string;
  homepageUrl: string;
  sourceUrl: string;
  summary: string;
  feeModel: string;
  riskLevel: RiskLevel;
  rules: string[];
  accent: string;
};

export type PriceOffer = {
  id: string;
  toolSlug: string;
  platformSlug: string;
  normalizedProduct: string;
  planName: string;
  countrySlug: string;
  countryName: string;
  regionLabel: string;
  priceMonthlyUsd: number;
  priceLabel: string;
  billingNote: string;
  availability: Availability;
  riskLevel: RiskLevel;
  updatedAt: string;
  tags: string[];
};

export type CountryPricePage = {
  slug: string;
  countryName: string;
  currency: string;
  summary: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
};

export type SeoLink = {
  href: string;
  label: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const aiTools: AiTool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    shortName: "ChatGPT",
    symbol: "CG",
    accent: "#55cdb1",
    summary:
      "Compare ChatGPT Plus, Pro, and Team subscription paths across official pricing and vetted sharing platforms.",
    officialPrice: "Plus $20/mo, Pro $200/mo",
    officialUrl: "https://chatgpt.com/",
    bestFor: ["Writing", "Coding", "Office workflows", "Multimodal tasks"],
    cautions: [
      "Shared seats may have usage contention.",
      "Regional pricing can change without notice.",
      "Very low prices should be checked against refund terms.",
    ],
  },
  {
    slug: "claude",
    name: "Claude",
    shortName: "Claude",
    symbol: "CL",
    accent: "#a68cf0",
    summary:
      "Track Claude Pro and Max alternatives for long-context work, research writing, and code review.",
    officialPrice: "Pro $20/mo, Max from $100/mo",
    officialUrl: "https://claude.ai/",
    bestFor: ["Long context", "Code review", "Research writing", "Knowledge work"],
    cautions: [
      "Availability varies by region.",
      "Higher-tier plans can swing heavily in price.",
      "Review collaboration and seat-sharing rules first.",
    ],
  },
  {
    slug: "gemini",
    name: "Gemini",
    shortName: "Gemini",
    symbol: "GM",
    accent: "#62b5f6",
    summary:
      "Compare Gemini Advanced and Google ecosystem bundles for research, study, and document workflows.",
    officialPrice: "Advanced from $19.99/mo",
    officialUrl: "https://gemini.google.com/",
    bestFor: ["Google Workspace", "Study notes", "Long-document summaries", "Sheets"],
    cautions: [
      "Some benefits are tied to Google One.",
      "Regional taxes can change the final price.",
      "Confirm family or seat restrictions before subscribing.",
    ],
  },
  {
    slug: "grok",
    name: "Grok",
    shortName: "Grok",
    symbol: "GX",
    accent: "#f2a94f",
    summary:
      "Monitor Grok and X Premium bundle pricing for trend monitoring, social context, and opinion drafting.",
    officialPrice: "Premium / Premium+ varies by region",
    officialUrl: "https://x.ai/",
    bestFor: ["Trend tracking", "Social context", "Opinion drafts", "Live discussion"],
    cautions: [
      "Benefits are often tied to X subscriptions.",
      "Regional app-store pricing may differ from web pricing.",
      "Check access boundaries before joining a shared plan.",
    ],
  },
];

export const platforms: Platform[] = [
  {
    slug: "gamsgo",
    name: "GamsGo",
    homepageUrl: "https://www.gamsgo.com/",
    sourceUrl: "https://www.gamsgo.com/",
    summary:
      "A subscription-sharing marketplace used as one tracked source for monthly AI tool access prices and seat availability.",
    feeModel: "Marketplace price plus possible service fee",
    riskLevel: "medium",
    rules: [
      "Check whether the seat is shared or dedicated.",
      "Review the refund window before subscribing.",
      "Prefer listings with clear support and replacement rules.",
    ],
    accent: "#55cdb1",
  },
  {
    slug: "spliiit",
    name: "Spliiit",
    homepageUrl: "https://www.spliiit.com/",
    sourceUrl: "https://www.spliiit.com/",
    summary:
      "A subscription split marketplace tracked for shared plan fees, platform protection, and recurring-seat rules.",
    feeModel: "Shared subscription price plus platform fee",
    riskLevel: "medium",
    rules: [
      "Check whether the seat is stable long term.",
      "Include platform fees when comparing prices.",
      "Confirm region, household, and seat restrictions.",
    ],
    accent: "#62b5f6",
  },
  {
    slug: "official",
    name: "Official",
    homepageUrl: "#",
    sourceUrl: "#",
    summary:
      "Official pricing is used as a benchmark so readers can understand real savings and trade-offs.",
    feeModel: "Official list price",
    riskLevel: "low",
    rules: [
      "Most predictable access and support.",
      "Usually more expensive than shared options.",
      "Best baseline for calculating real discounts.",
    ],
    accent: "#8b98a8",
  },
];

export const priceOffers: PriceOffer[] = [
  {
    id: "chatgpt-plus-gamsgo-us",
    toolSlug: "chatgpt",
    platformSlug: "gamsgo",
    normalizedProduct: "ChatGPT Plus",
    planName: "Plus shared seat",
    countrySlug: "united-states",
    countryName: "United States",
    regionLabel: "US baseline",
    priceMonthlyUsd: 8.9,
    priceLabel: "$8.90/mo",
    billingNote: "Sample tracked marketplace price",
    availability: "in-stock",
    riskLevel: "medium",
    updatedAt: "2026-06-14",
    tags: ["lowest", "shared", "plus"],
  },
  {
    id: "chatgpt-plus-spliiit-fr",
    toolSlug: "chatgpt",
    platformSlug: "spliiit",
    normalizedProduct: "ChatGPT Plus",
    planName: "Plus split subscription",
    countrySlug: "france",
    countryName: "France",
    regionLabel: "EU split",
    priceMonthlyUsd: 10.4,
    priceLabel: "$10.40/mo",
    billingNote: "Estimated with platform fee",
    availability: "limited",
    riskLevel: "medium",
    updatedAt: "2026-06-14",
    tags: ["eu", "shared", "plus"],
  },
  {
    id: "chatgpt-plus-official-us",
    toolSlug: "chatgpt",
    platformSlug: "official",
    normalizedProduct: "ChatGPT Plus",
    planName: "Official Plus",
    countrySlug: "united-states",
    countryName: "United States",
    regionLabel: "Official benchmark",
    priceMonthlyUsd: 20,
    priceLabel: "$20/mo",
    billingNote: "Verify final billing terms on the official source",
    availability: "in-stock",
    riskLevel: "low",
    updatedAt: "2026-06-14",
    tags: ["official", "baseline"],
  },
  {
    id: "claude-pro-spliiit-us",
    toolSlug: "claude",
    platformSlug: "spliiit",
    normalizedProduct: "Claude Pro",
    planName: "Pro shared seat",
    countrySlug: "united-states",
    countryName: "United States",
    regionLabel: "US split",
    priceMonthlyUsd: 9.8,
    priceLabel: "$9.80/mo",
    billingNote: "Sample tracked marketplace price",
    availability: "in-stock",
    riskLevel: "medium",
    updatedAt: "2026-06-14",
    tags: ["pro", "shared"],
  },
  {
    id: "claude-max-gamsgo-us",
    toolSlug: "claude",
    platformSlug: "gamsgo",
    normalizedProduct: "Claude Max",
    planName: "Max shared seat",
    countrySlug: "united-states",
    countryName: "United States",
    regionLabel: "US split",
    priceMonthlyUsd: 34.5,
    priceLabel: "$34.50/mo",
    billingNote: "Higher-tier plan, availability changes quickly",
    availability: "limited",
    riskLevel: "high",
    updatedAt: "2026-06-14",
    tags: ["max", "limited"],
  },
  {
    id: "gemini-advanced-gamsgo-us",
    toolSlug: "gemini",
    platformSlug: "gamsgo",
    normalizedProduct: "Gemini Advanced",
    planName: "Advanced shared seat",
    countrySlug: "united-states",
    countryName: "United States",
    regionLabel: "US split",
    priceMonthlyUsd: 7.5,
    priceLabel: "$7.50/mo",
    billingNote: "Sample tracked marketplace price",
    availability: "in-stock",
    riskLevel: "medium",
    updatedAt: "2026-06-14",
    tags: ["advanced", "google"],
  },
  {
    id: "gemini-advanced-official-us",
    toolSlug: "gemini",
    platformSlug: "official",
    normalizedProduct: "Gemini Advanced",
    planName: "Official Advanced",
    countrySlug: "united-states",
    countryName: "United States",
    regionLabel: "Official benchmark",
    priceMonthlyUsd: 19.99,
    priceLabel: "$19.99/mo",
    billingNote: "Taxes and bundle terms may vary",
    availability: "in-stock",
    riskLevel: "low",
    updatedAt: "2026-06-14",
    tags: ["official", "baseline"],
  },
  {
    id: "grok-premium-gamsgo-us",
    toolSlug: "grok",
    platformSlug: "gamsgo",
    normalizedProduct: "Grok Premium",
    planName: "Premium shared seat",
    countrySlug: "united-states",
    countryName: "United States",
    regionLabel: "X ecosystem",
    priceMonthlyUsd: 6.9,
    priceLabel: "$6.90/mo",
    billingNote: "Sample tracked marketplace price",
    availability: "in-stock",
    riskLevel: "medium",
    updatedAt: "2026-06-14",
    tags: ["x", "premium"],
  },
  {
    id: "grok-premium-spliiit-eu",
    toolSlug: "grok",
    platformSlug: "spliiit",
    normalizedProduct: "Grok Premium",
    planName: "Premium split subscription",
    countrySlug: "germany",
    countryName: "Germany",
    regionLabel: "EU split",
    priceMonthlyUsd: 8.3,
    priceLabel: "$8.30/mo",
    billingNote: "Sample tracked marketplace price",
    availability: "out-of-stock",
    riskLevel: "medium",
    updatedAt: "2026-06-14",
    tags: ["out-of-stock", "x"],
  },
];

export const countryPricePages: CountryPricePage[] = [
  {
    slug: "turkey",
    countryName: "Turkey",
    currency: "TRY",
    summary:
      "A long-tail price page for readers comparing official regional pricing, billing taxes, and subscription-sharing risks.",
  },
  {
    slug: "india",
    countryName: "India",
    currency: "INR",
    summary:
      "A regional benchmark page for AI subscription prices across Gemini, ChatGPT, Claude, and shared-access marketplaces.",
  },
  {
    slug: "united-states",
    countryName: "United States",
    currency: "USD",
    summary:
      "The baseline page for calculating discounts against official USD pricing and marketplace subscription splits.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-subscription-fatigue-2026",
    title: "AI Subscription Fatigue 2026: How to Reduce Tool Overlap",
    description:
      "A practical guide to cutting redundant AI subscriptions while keeping the tools that matter.",
    category: "Buyer guide",
    readTime: "6 min",
  },
  {
    slug: "shared-ai-subscription-risks",
    title: "7 Checks Before Joining a Shared AI Subscription",
    description:
      "A risk checklist covering seats, refunds, access boundaries, privacy, and support terms.",
    category: "Risk checklist",
    readTime: "5 min",
  },
];

export const seoLinks: SeoLink[] = [
  {
    href: "/tools/chatgpt",
    label: "ChatGPT price guide",
    description: "Official ChatGPT plan prices, shared-seat options, and risk notes.",
  },
  {
    href: "/tools/chatgpt/price/turkey",
    label: "ChatGPT price in Turkey",
    description: "Regional pricing, billing caveats, and source verification notes.",
  },
  {
    href: "/tools/chatgpt/compare/plus-vs-pro",
    label: "ChatGPT Plus vs Pro",
    description: "Compare plan limits, price differences, and who should upgrade.",
  },
  {
    href: "/platforms/gamsgo",
    label: "GamsGo review",
    description: "Platform rules, refund checks, and AI subscription availability.",
  },
  {
    href: "/platforms/spliiit",
    label: "Spliiit review",
    description: "Shared subscription fees, seat rules, and buyer protections.",
  },
  {
    href: "/blog/ai-subscription-fatigue-2026",
    label: "AI subscription fatigue 2026",
    description: "A guide to reducing duplicate AI subscriptions without losing coverage.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What is the cheapest way to get ChatGPT Plus?",
    answer:
      "The cheapest tracked option is usually a shared-seat marketplace listing, but the lowest usable price should also factor in availability, refund terms, seat rules, and platform risk.",
  },
  {
    question: "Does PriceAI process subscriptions or payments?",
    answer:
      "No. PriceAI is a content and comparison site. It does not process payments, provide subscription fulfillment, or store customer orders. Source buttons send readers to external platforms or official sites for verification.",
  },
  {
    question: "What does lowest usable price mean?",
    answer:
      "Lowest usable price means the lowest tracked monthly price that is currently in stock or limited stock, excluding out-of-stock listings and highlighting obvious risk notes.",
  },
  {
    question: "Are shared AI subscriptions safe?",
    answer:
      "Shared subscriptions can be cheaper, but they carry trade-offs such as seat contention, replacement rules, platform fees, privacy boundaries, and refund limitations. Always verify terms on the destination platform.",
  },
  {
    question: "Why can official AI subscription prices differ by country?",
    answer:
      "Official prices may vary because of taxes, app-store fees, billing currency, regional availability, and local pricing experiments. Always use the final billed price on the original source as the source of truth.",
  },
];

export function getTool(slug: string) {
  return aiTools.find((tool) => tool.slug === slug);
}

export function getPlatform(slug: string) {
  return platforms.find((platform) => platform.slug === slug);
}

export function sortOffers(offers: PriceOffer[]) {
  const availabilityWeight: Record<Availability, number> = {
    "in-stock": 0,
    limited: 1,
    "out-of-stock": 2,
  };

  return [...offers].sort((first, second) => {
    const availabilityDelta =
      availabilityWeight[first.availability] -
      availabilityWeight[second.availability];

    if (availabilityDelta !== 0) {
      return availabilityDelta;
    }

    return first.priceMonthlyUsd - second.priceMonthlyUsd;
  });
}

export function getOffersForTool(toolSlug: string) {
  return sortOffers(priceOffers.filter((offer) => offer.toolSlug === toolSlug));
}

export function getLowestAvailableOffer(toolSlug: string) {
  return getOffersForTool(toolSlug).find(
    (offer) => offer.availability !== "out-of-stock",
  );
}

export function getPlatformName(slug: string) {
  return getPlatform(slug)?.name ?? "Unknown";
}

export function getRiskLabel(riskLevel: RiskLevel) {
  const labels: Record<RiskLevel, string> = {
    low: "Low risk",
    medium: "Review terms",
    high: "High volatility",
  };

  return labels[riskLevel];
}

export function getAvailabilityLabel(availability: Availability) {
  const labels: Record<Availability, string> = {
    "in-stock": "In stock",
    limited: "Limited",
    "out-of-stock": "Out of stock",
  };

  return labels[availability];
}
