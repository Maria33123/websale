import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Subscription Access Plans | ChatGPT, Claude, Gemini, Grok",
  description:
    "Compare available AI subscription access plans, product availability, prices, and purchase notes before contacting support.",
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
      "AI Subscription Access Plans | ChatGPT, Claude, Gemini, Grok",
    description:
      "Compare available AI subscription access plans, product availability, prices, and purchase notes before contacting support.",
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
        <Analytics />
      </body>
    </html>
  );
}
