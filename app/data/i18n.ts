import type { Availability, RiskLevel } from "@/app/data/directory";

export type Locale = "en" | "zh";

type ToolText = {
  summary: string;
  bestFor: string[];
  cautions: string[];
};

type PlatformText = {
  summary: string;
  feeModel: string;
};

type OfferText = {
  planName: string;
  countryName: string;
  regionLabel: string;
  billingNote: string;
};

type GuideLink = {
  href: string;
  label: string;
  description: string;
};

type BlogCard = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
};

type FaqItemText = {
  question: string;
  answer: string;
};

export type HomeCopy = {
  htmlLang: string;
  alternatePath: string;
  alternateLabel: string;
  navbar: {
    links: Array<{ label: string; href: string; active?: boolean; menu?: boolean }>;
    cta: string;
    languageLabel: string;
  };
  hero: {
    eyebrowBrand: string;
    eyebrowText: string;
    title: string;
    description: string;
    trackedTools: string;
    trackedOffers: string;
    lowestPrice: string;
    dataNote: string;
  };
  searchPlaceholder: string;
  table: {
    kicker: string;
    title: string;
    description: string;
    headers: {
      tool: string;
      officialPrice: string;
      lowestTracked: string;
      platform: string;
      availability: string;
      risk: string;
      updated: string;
      source: string;
    };
  };
  labels: {
    verifySource: string;
    lowestUsable: string;
    updated: string;
    monthly: string;
    platform: string;
    risk: string;
    official: string;
    bestFor: string;
    beforeClick: string;
    details: string;
    overview: string;
    results: string;
    noMatches: string;
    readGuide: string;
    subscriptionNotes: string;
  };
  methodology: {
    kicker: string;
    title: string;
    description: string;
    steps: Array<{ title: string; text: string }>;
  };
  sourceNotes: {
    kicker: string;
    title: string;
    description: string;
    feeModel: string;
  };
  seoHub: {
    kicker: string;
    title: string;
    description: string;
  };
  faq: {
    kicker: string;
    title: string;
  };
  availability: Record<Availability, string>;
  risk: Record<RiskLevel, string>;
  tools: Record<string, ToolText>;
  platforms: Record<string, PlatformText>;
  offers: Record<string, OfferText>;
  seoLinks: GuideLink[];
  blogPosts: BlogCard[];
  faqItems: FaqItemText[];
};

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    htmlLang: "en",
    alternatePath: "/zh",
    alternateLabel: "中文",
    navbar: {
      links: [
        { label: "Home", href: "/" },
        { label: "Comparison", href: "#comparison-table", active: true },
        { label: "Methodology", href: "#methodology" },
        { label: "Sources", href: "#platforms", menu: true },
        { label: "FAQ", href: "#faq" },
      ],
      cta: "Compare",
      languageLabel: "Language",
    },
    hero: {
      eyebrowBrand: "PriceAI",
      eyebrowText: "AI subscription price data, source notes, and buyer-risk guides",
      title: "AI Subscription Price Comparison",
      description:
        "Compare ChatGPT, Claude, Gemini, and Grok subscription prices across official plans and shared subscription sources. PriceAI highlights the lowest usable in-stock price, source risk, and updated buyer notes so readers can verify options before subscribing elsewhere.",
      trackedTools: "Tracked AI tools",
      trackedOffers: "Tracked offers",
      lowestPrice: "Lowest in-stock price",
      dataNote:
        "Data quality note: PriceAI currently prioritizes source verification, pricing methodology, and risk checks. We do not process payments or fulfill subscriptions; always verify final price, refund terms, and access rules on the original source before subscribing.",
    },
    searchPlaceholder: "Search ChatGPT, Claude, GamsGo, Turkey, source notes...",
    table: {
      kicker: "Tracked comparison",
      title: "AI subscription price comparison table",
      description:
        "Sorted by the lowest tracked in-stock or limited-stock option. Out-of-stock offers are excluded from the headline price.",
      headers: {
        tool: "Tool",
        officialPrice: "Official price",
        lowestTracked: "Lowest tracked",
        platform: "Platform",
        availability: "Availability",
        risk: "Risk",
        updated: "Updated",
        source: "Source",
      },
    },
    labels: {
      verifySource: "Verify source",
      lowestUsable: "Lowest usable",
      updated: "Updated",
      monthly: "Monthly",
      platform: "Platform",
      risk: "Risk",
      official: "Official",
      bestFor: "Best for",
      beforeClick: "Before you click",
      details: "Tool-level offer details",
      overview: "Back to overview",
      results: "results",
      noMatches: "No matching offers yet.",
      readGuide: "Read guide",
      subscriptionNotes: "subscription price notes",
    },
    methodology: {
      kicker: "Methodology",
      title: "How PriceAI calculates the lowest usable price",
      description:
        "PriceAI is designed for searchers comparing AI subscription costs, not for completing transactions. The first product phase focuses on credible tracked data, transparent methodology, and buyer-risk notes before any recommendation or affiliate layer is added.",
      steps: [
        {
          title: "Normalize plan names",
          text: "Marketplace labels such as shared seat, split plan, Plus access, or premium bundle are mapped back to a standard product name.",
        },
        {
          title: "Exclude unavailable listings",
          text: "The headline price only uses in-stock or limited-stock offers. Out-of-stock entries stay visible in tool sections but are not treated as the best price.",
        },
        {
          title: "Flag risk before price",
          text: "A cheaper subscription is not always better. The table highlights platform risk, refund friction, seat contention, and official benchmark pricing.",
        },
      ],
    },
    sourceNotes: {
      kicker: "Source notes",
      title: "GamsGo, Spliiit, and official benchmark sources",
      description:
        "Source cards summarize fee models and risk signals so readers can verify pricing context without treating PriceAI as a payment or fulfillment site.",
      feeModel: "Fee model",
    },
    seoHub: {
      kicker: "SEO hub",
      title: "Popular AI subscription price guides",
      description:
        "These hub links define the long-tail structure for tool, country, comparison, platform, and buyer-guide pages.",
    },
    faq: {
      kicker: "FAQ",
      title: "AI subscription price comparison FAQ",
    },
    availability: {
      "in-stock": "In stock",
      limited: "Limited",
      "out-of-stock": "Out of stock",
    },
    risk: {
      low: "Low risk",
      medium: "Review terms",
      high: "High volatility",
    },
    tools: {
      chatgpt: {
        summary:
          "Compare ChatGPT Plus, Pro, and Team subscription paths across official pricing and vetted sharing platforms.",
        bestFor: ["Writing", "Coding", "Office workflows", "Multimodal tasks"],
        cautions: [
          "Shared seats may have usage contention.",
          "Regional pricing can change without notice.",
          "Very low prices should be checked against refund terms.",
        ],
      },
      claude: {
        summary:
          "Track Claude Pro and Max alternatives for long-context work, research writing, and code review.",
        bestFor: ["Long context", "Code review", "Research writing", "Knowledge work"],
        cautions: [
          "Availability varies by region.",
          "Higher-tier plans can swing heavily in price.",
          "Review collaboration and seat-sharing rules first.",
        ],
      },
      gemini: {
        summary:
          "Compare Gemini Advanced and Google ecosystem bundles for research, study, and document workflows.",
        bestFor: ["Google Workspace", "Study notes", "Long-document summaries", "Sheets"],
        cautions: [
          "Some benefits are tied to Google One.",
          "Regional taxes can change the final price.",
          "Confirm family or seat restrictions before subscribing.",
        ],
      },
      grok: {
        summary:
          "Monitor Grok and X Premium bundle pricing for trend monitoring, social context, and opinion drafting.",
        bestFor: ["Trend tracking", "Social context", "Opinion drafts", "Live discussion"],
        cautions: [
          "Benefits are often tied to X subscriptions.",
          "Regional app-store pricing may differ from web pricing.",
          "Check access boundaries before joining a shared plan.",
        ],
      },
    },
    platforms: {
      gamsgo: {
        summary:
          "A subscription-sharing marketplace used as one tracked source for monthly AI tool access prices and seat availability.",
        feeModel: "Marketplace price plus possible service fee",
      },
      spliiit: {
        summary:
          "A subscription split marketplace tracked for shared plan fees, platform protection, and recurring-seat rules.",
        feeModel: "Shared subscription price plus platform fee",
      },
      official: {
        summary:
          "Official pricing is used as a benchmark so readers can understand real savings and trade-offs.",
        feeModel: "Official list price",
      },
    },
    offers: {
      "chatgpt-plus-gamsgo-us": {
        planName: "Plus shared seat",
        countryName: "United States",
        regionLabel: "US baseline",
        billingNote: "Sample tracked marketplace price",
      },
      "chatgpt-plus-spliiit-fr": {
        planName: "Plus split subscription",
        countryName: "France",
        regionLabel: "EU split",
        billingNote: "Estimated with platform fee",
      },
      "chatgpt-plus-official-us": {
        planName: "Official Plus",
        countryName: "United States",
        regionLabel: "Official benchmark",
        billingNote: "Verify final billing terms on the official source",
      },
      "claude-pro-spliiit-us": {
        planName: "Pro shared seat",
        countryName: "United States",
        regionLabel: "US split",
        billingNote: "Sample tracked marketplace price",
      },
      "claude-max-gamsgo-us": {
        planName: "Max shared seat",
        countryName: "United States",
        regionLabel: "US split",
        billingNote: "Higher-tier plan, availability changes quickly",
      },
      "gemini-advanced-gamsgo-us": {
        planName: "Advanced shared seat",
        countryName: "United States",
        regionLabel: "US split",
        billingNote: "Sample tracked marketplace price",
      },
      "gemini-advanced-official-us": {
        planName: "Official Advanced",
        countryName: "United States",
        regionLabel: "Official benchmark",
        billingNote: "Taxes and bundle terms may vary",
      },
      "grok-premium-gamsgo-us": {
        planName: "Premium shared seat",
        countryName: "United States",
        regionLabel: "X ecosystem",
        billingNote: "Sample tracked marketplace price",
      },
      "grok-premium-spliiit-eu": {
        planName: "Premium split subscription",
        countryName: "Germany",
        regionLabel: "EU split",
        billingNote: "Sample tracked marketplace price",
      },
    },
    seoLinks: [
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
    ],
    blogPosts: [
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
    ],
    faqItems: [
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
    ],
  },
  zh: {
    htmlLang: "zh-CN",
    alternatePath: "/",
    alternateLabel: "EN",
    navbar: {
      links: [
        { label: "首页", href: "/zh" },
        { label: "比价表", href: "#comparison-table", active: true },
        { label: "方法", href: "#methodology" },
        { label: "来源", href: "#platforms", menu: true },
        { label: "FAQ", href: "#faq" },
      ],
      cta: "查看比价",
      languageLabel: "语言",
    },
    hero: {
      eyebrowBrand: "PriceAI",
      eyebrowText: "AI 订阅价格数据、来源说明和防坑指南",
      title: "AI 订阅价格比价",
      description:
        "比较 ChatGPT、Claude、Gemini 和 Grok 的官方订阅价格与可核验的共享订阅来源。PriceAI 会突出当前可用的低价、来源风险和更新说明，帮助读者在跳转前先理解真实成本。",
      trackedTools: "追踪 AI 工具",
      trackedOffers: "追踪价格记录",
      lowestPrice: "当前可用低价",
      dataNote:
        "数据质量说明：PriceAI 当前优先做好来源核验、比价方法和风险检查。我们不处理付款，也不交付订阅；订阅前请始终在原始来源确认最终价格、退款条款和访问规则。",
    },
    searchPlaceholder: "搜索 ChatGPT、Claude、GamsGo、土耳其、来源说明...",
    table: {
      kicker: "追踪比价",
      title: "AI 订阅价格比价表",
      description:
        "按当前有货或库存有限的低价记录排序。缺货记录不会进入顶部低价计算，但仍保留在工具详情中用于参考。",
      headers: {
        tool: "工具",
        officialPrice: "官方价格",
        lowestTracked: "追踪低价",
        platform: "来源",
        availability: "状态",
        risk: "风险",
        updated: "更新",
        source: "核验",
      },
    },
    labels: {
      verifySource: "核验来源",
      lowestUsable: "当前低价",
      updated: "更新",
      monthly: "月费",
      platform: "来源",
      risk: "风险",
      official: "官方",
      bestFor: "适合场景",
      beforeClick: "跳转前先看",
      details: "工具级价格详情",
      overview: "返回总览",
      results: "条结果",
      noMatches: "暂无匹配记录。",
      readGuide: "阅读指南",
      subscriptionNotes: "订阅价格说明",
    },
    methodology: {
      kicker: "方法",
      title: "PriceAI 如何计算当前可用低价",
      description:
        "PriceAI 面向正在比较 AI 订阅成本的搜索用户，而不是交易平台。第一阶段重点是可信追踪数据、透明方法和防坑说明，等流量与信任建立后再加入推荐或 affiliate 层。",
      steps: [
        {
          title: "统一套餐名称",
          text: "把 shared seat、split plan、Plus access、premium bundle 等不同叫法映射到标准产品名，避免同一产品被拆成多个概念。",
        },
        {
          title: "排除不可用记录",
          text: "顶部低价只使用有货或库存有限的记录。缺货项会继续展示，但不会被当作当前最佳价格。",
        },
        {
          title: "价格前先看风险",
          text: "更便宜不一定更适合。表格会同时标注来源风险、退款摩擦、席位争用和官方基准价格。",
        },
      ],
    },
    sourceNotes: {
      kicker: "来源说明",
      title: "GamsGo、Spliiit 与官方基准来源",
      description:
        "来源卡片会总结费用模型和风险信号，帮助读者理解价格背景，而不是把 PriceAI 当成付款或订阅交付网站。",
      feeModel: "费用模型",
    },
    seoHub: {
      kicker: "SEO hub",
      title: "热门 AI 订阅价格指南",
      description:
        "这些入口定义后续长尾页面结构，覆盖工具、国家、套餐对比、来源评测和防坑指南。",
    },
    faq: {
      kicker: "FAQ",
      title: "AI 订阅价格比价常见问题",
    },
    availability: {
      "in-stock": "有货",
      limited: "库存有限",
      "out-of-stock": "暂时缺货",
    },
    risk: {
      low: "低风险",
      medium: "需核验条款",
      high: "波动较高",
    },
    tools: {
      chatgpt: {
        summary:
          "比较 ChatGPT Plus、Pro 和 Team 的官方价格、共享来源与使用风险。",
        bestFor: ["写作", "编程", "办公流程", "多模态任务"],
        cautions: [
          "共享席位可能存在使用冲突。",
          "区域价格可能随时变化。",
          "过低价格需要重点核验退款与替换规则。",
        ],
      },
      claude: {
        summary:
          "追踪 Claude Pro 和 Max 的低成本来源，适合长上下文、研究写作和代码审阅场景。",
        bestFor: ["长上下文", "代码审阅", "研究写作", "知识工作"],
        cautions: [
          "可用性会随地区变化。",
          "高阶套餐价格波动可能很大。",
          "加入共享方案前先检查协作和席位规则。",
        ],
      },
      gemini: {
        summary:
          "比较 Gemini Advanced 与 Google 生态套餐，适合学习、文档总结和表格工作流。",
        bestFor: ["Google Workspace", "学习笔记", "长文档总结", "Sheets"],
        cautions: [
          "部分权益绑定 Google One。",
          "区域税费可能改变最终价格。",
          "订阅前确认家庭组或席位限制。",
        ],
      },
      grok: {
        summary:
          "监控 Grok 与 X Premium 套餐价格，适合趋势追踪、社交语境和观点草稿。",
        bestFor: ["趋势追踪", "社交语境", "观点草稿", "实时讨论"],
        cautions: [
          "权益通常和 X 订阅绑定。",
          "App Store 区域价格可能不同于网页价格。",
          "加入共享方案前确认访问边界。",
        ],
      },
    },
    platforms: {
      gamsgo: {
        summary:
          "订阅共享市场，是 PriceAI 追踪 AI 工具月费和席位可用性的一个来源。",
        feeModel: "市场价格加可能的服务费",
      },
      spliiit: {
        summary:
          "订阅拆分平台，用于追踪共享套餐费用、平台保护和周期性席位规则。",
        feeModel: "共享订阅价格加平台费",
      },
      official: {
        summary:
          "官方价格作为基准，帮助读者理解真实折扣、稳定性和取舍。",
        feeModel: "官方标价",
      },
    },
    offers: {
      "chatgpt-plus-gamsgo-us": {
        planName: "Plus 共享席位",
        countryName: "美国",
        regionLabel: "美国基准",
        billingNote: "示例追踪市场价格",
      },
      "chatgpt-plus-spliiit-fr": {
        planName: "Plus 拆分订阅",
        countryName: "法国",
        regionLabel: "欧盟拆分",
        billingNote: "已估算平台费用",
      },
      "chatgpt-plus-official-us": {
        planName: "官方 Plus",
        countryName: "美国",
        regionLabel: "官方基准",
        billingNote: "请在官方来源核验最终账单条款",
      },
      "claude-pro-spliiit-us": {
        planName: "Pro 共享席位",
        countryName: "美国",
        regionLabel: "美国拆分",
        billingNote: "示例追踪市场价格",
      },
      "claude-max-gamsgo-us": {
        planName: "Max 共享席位",
        countryName: "美国",
        regionLabel: "美国拆分",
        billingNote: "高阶套餐，可用性变化较快",
      },
      "gemini-advanced-gamsgo-us": {
        planName: "Advanced 共享席位",
        countryName: "美国",
        regionLabel: "美国拆分",
        billingNote: "示例追踪市场价格",
      },
      "gemini-advanced-official-us": {
        planName: "官方 Advanced",
        countryName: "美国",
        regionLabel: "官方基准",
        billingNote: "税费和套餐条款可能变化",
      },
      "grok-premium-gamsgo-us": {
        planName: "Premium 共享席位",
        countryName: "美国",
        regionLabel: "X 生态",
        billingNote: "示例追踪市场价格",
      },
      "grok-premium-spliiit-eu": {
        planName: "Premium 拆分订阅",
        countryName: "德国",
        regionLabel: "欧盟拆分",
        billingNote: "示例追踪市场价格",
      },
    },
    seoLinks: [
      {
        href: "/tools/chatgpt",
        label: "ChatGPT 价格指南",
        description: "ChatGPT 官方套餐价格、共享席位来源和风险说明。",
      },
      {
        href: "/tools/chatgpt/price/turkey",
        label: "土耳其 ChatGPT 价格",
        description: "区域价格、账单差异和来源核验说明。",
      },
      {
        href: "/tools/chatgpt/compare/plus-vs-pro",
        label: "ChatGPT Plus vs Pro",
        description: "比较套餐限制、价格差异和升级场景。",
      },
      {
        href: "/platforms/gamsgo",
        label: "GamsGo 来源评测",
        description: "平台规则、退款检查和 AI 订阅可用性。",
      },
      {
        href: "/platforms/spliiit",
        label: "Spliiit 来源评测",
        description: "共享订阅费用、席位规则和买家保护。",
      },
      {
        href: "/blog/ai-subscription-fatigue-2026",
        label: "AI 订阅疲劳 2026",
        description: "减少重复 AI 订阅，同时保留关键工具的实用指南。",
      },
    ],
    blogPosts: [
      {
        slug: "ai-subscription-fatigue-2026",
        title: "AI Subscription Fatigue 2026：如何减少重复订阅",
        description: "删掉重叠 AI 订阅，同时保留真正有用工具的实用指南。",
        category: "买家指南",
        readTime: "6 分钟",
      },
      {
        slug: "shared-ai-subscription-risks",
        title: "加入共享 AI 订阅前的 7 个检查点",
        description: "覆盖席位、退款、访问边界、隐私和支持条款的风险清单。",
        category: "风险清单",
        readTime: "5 分钟",
      },
    ],
    faqItems: [
      {
        question: "获得 ChatGPT Plus 的低成本方式是什么？",
        answer:
          "通常是共享席位市场中的低价记录，但当前可用低价还要同时考虑库存、退款条款、席位规则和来源风险。",
      },
      {
        question: "PriceAI 会处理订阅或付款吗？",
        answer:
          "不会。PriceAI 是内容与比价网站，不处理付款、不交付订阅，也不保存订单。来源按钮只用于跳转到外部平台或官方站点进行核验。",
      },
      {
        question: "当前可用低价是什么意思？",
        answer:
          "当前可用低价是指有货或库存有限的最低月费记录；缺货项会被排除，并同时展示明显的风险提示。",
      },
      {
        question: "共享 AI 订阅安全吗？",
        answer:
          "共享订阅可能更便宜，但也可能有席位争用、替换规则、平台费用、隐私边界和退款限制。请始终在目标平台核验条款。",
      },
      {
        question: "为什么官方 AI 订阅价格会因国家不同而变化？",
        answer:
          "价格可能受税费、App Store 费用、结算货币、区域可用性和本地定价实验影响。最终应以原始来源显示的实际账单价格为准。",
      },
    ],
  },
};

export function getHomeCopy(locale: Locale) {
  return homeCopy[locale];
}
