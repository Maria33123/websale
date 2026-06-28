import type { Metadata } from "next";
import { LocalizedHome } from "@/app/components/localized-home";

export const metadata: Metadata = {
  title: "AI 订阅价格比价 | ChatGPT、Claude、Gemini 价格 | PriceAI",
  description:
    "比较 ChatGPT、Claude、Gemini 和 Grok 的订阅价格、官方基准、可核验来源、库存状态和买家风险说明。",
  alternates: {
    canonical: "/zh",
    languages: {
      en: "/",
      "zh-CN": "/zh",
    },
  },
  openGraph: {
    title: "AI 订阅价格比价 | PriceAI",
    description:
      "用 PriceAI 比较 AI 订阅价格、来源规则和防坑说明，再去原始来源核验。",
    siteName: "PriceAI",
    locale: "zh_CN",
    type: "website",
  },
};

export default function ZhHome() {
  return <LocalizedHome locale="zh" />;
}
