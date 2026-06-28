import type { Metadata } from "next";
import { LocalizedHome } from "@/app/components/localized-home";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "zh-CN": "/zh",
    },
  },
};

export default function Home() {
  return <LocalizedHome locale="en" />;
}
