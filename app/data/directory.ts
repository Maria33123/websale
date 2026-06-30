/**
 * 商品内容数据文件
 *
 * 以后你主要改这里。
 *
 * 页面卡片只显示三块：
 * 1. name：商品名称
 * 2. availability：库存状态
 * 3. description：简短描述
 *
 * details：点击“查看详情”后，弹窗里显示的商品详情介绍。
 * 现在 details 已经改成一整段字符串，不再是数组。
 *
 * 新增商品：
 * 复制 products 里面任意一个商品对象，然后修改内容。
 *
 * 删除商品：
 * 删除 products 里面对应的整个商品对象。
 */

export type Availability = "in-stock" | "limited" | "out-of-stock";

export type RiskLevel = "low" | "medium" | "high";

export type ProductCategory = {
  slug: "chatgpt" | "claude" | "gemini" | "grok";
  name: string;
  shortName: string;
  symbol: string;
  accent: string;
};

export type Product = {
  id: string;
  categorySlug: ProductCategory["slug"];
  name: string;
  availability: Availability;
  description: string;
  price: string;
  details: string;
};

/**
 * 左侧栏分类
 *
 * 想改左侧栏显示名称，就改 name。
 */
export const productCategories: ProductCategory[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    shortName: "ChatGPT",
    symbol: "CG",
    accent: "#55cdb1",
  },
  {
    slug: "claude",
    name: "Claude",
    shortName: "Claude",
    symbol: "CL",
    accent: "#a68cf0",
  },
  {
    slug: "gemini",
    name: "Gemini",
    shortName: "Gemini",
    symbol: "GM",
    accent: "#62b5f6",
  },
  {
    slug: "grok",
    name: "Grok",
    shortName: "Grok",
    symbol: "GX",
    accent: "#f2a94f",
  },
];

/**
 * 商品列表
 *
 * 页面卡片只显示：
 * name + availability + description
 *
 * 弹窗详情显示：
 * details
 */
export const products: Product[] = [
  {
    id: "chatgpt-plus-001",
    categorySlug: "chatgpt",
    name: "ChatGPT Plus",
    availability: "in-stock",
    description: "GPT RT Plus 成品号 每日限量特价（欧洲渠道）",
    price: "$2.5",
    details: `GPT Plus成品号 微软Hotmail邮箱登录 可直接获得原始邮箱（附自建快捷接码平台）

可下载sub2/cpa格式json（带rt+已绑手机号验证）
兑换地址：https://chongzhi.art/

注意事项：账号为一号一绑 欧洲渠道，该商品无质保，无质保，无质保，请谨慎购买
非日抛号 但也请您做好备份
请尽快用完剩余额度 当半周抛使用 会话数据及时保存备份，谢谢
`,
  },

  {
    id: "chatgpt-team-001",
    categorySlug: "chatgpt",
    name: "ChatGPT Team/Business",
    availability: "limited",
    description: "codex只能反代理使用 保证首登，k12渠道（含RT｜CPA+sub2api）",
    price: "$2",
    details: `实时测活验证的ChatGpt team帐号（含 refresh_token）
发货格式：CPA JSON + sub2api 导入 JSON，下载即用，
质保10分钟内首登
`,
  },

  {
    id: "claude-001",
    categorySlug: "claude",
    name: "Claude",
    availability: "out-of-stock",
    description: "暂时无货 · 后续补充",
    price: "",
    details: "Claude 商品暂时无货，后续补充。",
  },

  {
    id: "gemini-001",
    categorySlug: "gemini",
    name: "Gemini Pro",
    availability: "limited",
    description: "Gemini pro一年会员 充值卡密｜充值到您的账号",
    price: "$3",
    details: `Gemini Pro 一年订阅 充值卡密｜充值到您的账号

本商品为 Gemini pro 一年订阅服务 充值卡密，可直接开通到您的个人 Google 账号。
适合希望长期使用 Gemini 高级功能、保留个人账号记录、减少续费频率的用户。

新号老号都可以 已开通会员的不能开 无法覆盖！ 只质保充值成功！只质保充值成功！只质保充值成功！

1.下单付款，获得充值卡密
2.充值前检查账号 开启两步验证 打开身份验证器 关闭支付资料！
设置身份验证器的地址： https://myaccount.google.com/two-step-verification/authenticator2步验证的地址：https://myaccount.google.com/signinoptions/twosv
3.进入 https://1free.qzz.io/ 获取Gemini pro 一年订阅
`,
  },

  {
    id: "grok-001",
    categorySlug: "grok",
    name: "Super Grok",
    availability: "in-stock",
    description: "SuperGrok 独享账号 一月会员 质保20天",
    price: "$12",
    details:  `登陆成功都要改密码，开2fa（没有做的一律不质保），

不要更换绑定的邮箱，容易掉订阅

不要断开账号与推特的连接，断开不质保

质保政策：没有账号了就按照质保时间内的使用天数退差价，如用了10天，质保时间是20天，那么就是退一半的金额。
`,
  },
];

function getAvailabilityWeight(availability: Availability) {
  const weights: Record<Availability, number> = {
    "in-stock": 0,
    limited: 1,
    "out-of-stock": 2,
  };

  return weights[availability];
}

export function getProductsForCategory(categorySlug: ProductCategory["slug"]) {
  return [...products]
    .filter((product) => product.categorySlug === categorySlug)
    .sort(
      (first, second) =>
        getAvailabilityWeight(first.availability) -
        getAvailabilityWeight(second.availability),
    );
}

export function getBestAvailabilityForCategory(
  categorySlug: ProductCategory["slug"],
) {
  const categoryProducts = getProductsForCategory(categorySlug);

  if (categoryProducts.length === 0) {
    return "out-of-stock";
  }

  return categoryProducts[0].availability;
}

export function getSortedProductCategories() {
  return [...productCategories].sort(
    (first, second) =>
      getAvailabilityWeight(getBestAvailabilityForCategory(first.slug)) -
      getAvailabilityWeight(getBestAvailabilityForCategory(second.slug)),
  );
}

export function getAvailabilityLabel(availability: Availability) {
  const labels: Record<Availability, string> = {
    "in-stock": "有货",
    limited: "库存有限",
    "out-of-stock": "暂时缺货",
  };

  return labels[availability];
}

/**
 * 下面是为了兼容项目里旧组件的类型和函数。
 * 你以后不用改下面这些。
 */

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

export const aiTools: AiTool[] = productCategories.map((category) => ({
  slug: category.slug,
  name: category.name,
  shortName: category.shortName,
  symbol: category.symbol,
  accent: category.accent,
  summary: "",
  officialPrice: "",
  officialUrl: "#",
  bestFor: [],
  cautions: [],
}));

export const platforms: Platform[] = [
  {
    slug: "telegram",
    name: "Telegram",
    homepageUrl: "https://telegram.me/coreychen111",
    sourceUrl: "https://telegram.me/coreychen111",
    summary: "通过 Telegram 联系客服购买。",
    feeModel: "联系客服确认",
    riskLevel: "medium",
    rules: ["购买前请确认商品详情、使用规则和售后政策。"],
    accent: "#55cdb1",
  },
];

export const priceOffers: PriceOffer[] = products.map((product) => ({
  id: product.id,
  toolSlug: product.categorySlug,
  platformSlug: "telegram",
  normalizedProduct: product.name,
  planName: product.description,
  countrySlug: "",
  countryName: "",
  regionLabel: product.description,
  priceMonthlyUsd: 0,
  priceLabel: "",
  billingNote: product.details,
  availability: product.availability,
  riskLevel: "medium",
  updatedAt: "",
  tags: [],
}));

export const countryPricePages: CountryPricePage[] = [];

export const blogPosts: BlogPost[] = [];

export const seoLinks: SeoLink[] = [];

export const faqItems: FaqItem[] = [];

export function getTool(slug: string) {
  return aiTools.find((tool) => tool.slug === slug);
}

export function getPlatform(slug: string) {
  return platforms.find((platform) => platform.slug === slug);
}

export function sortOffers(offers: PriceOffer[]) {
  return offers;
}

export function getOffersForTool(toolSlug: string) {
  return priceOffers.filter((offer) => offer.toolSlug === toolSlug);
}

export function getLowestAvailableOffer(toolSlug: string) {
  return getOffersForTool(toolSlug).find(
    (offer) => offer.availability !== "out-of-stock",
  );
}

export function getPlatformName(slug: string) {
  return getPlatform(slug)?.name ?? "未知来源";
}

export function getRiskLabel(riskLevel: RiskLevel) {
  const labels: Record<RiskLevel, string> = {
    low: "低风险",
    medium: "需核验条款",
    high: "波动较高",
  };

  return labels[riskLevel];
}