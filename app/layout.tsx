import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "AI Subscription Price Comparison | ChatGPT, Claude, Gemini Prices | PriceAI",
  description:
    "Compare ChatGPT, Claude, Gemini, and Grok subscription prices across official plans, tracked sources, availability, and buyer-risk notes.",
  keywords: [
    "AI subscription price comparison",
    "ChatGPT Plus price comparison",
    "Claude Pro price comparison",
    "Gemini Advanced price",
    "GamsGo ChatGPT review",
    "Spliiit AI subscription",
  ],
  openGraph: {
    title:
      "AI Subscription Price Comparison | ChatGPT, Claude, Gemini Prices | PriceAI",
    description:
      "Compare AI subscription prices, source rules, and buyer-risk notes before verifying the original provider.",
    siteName: "PriceAI",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
