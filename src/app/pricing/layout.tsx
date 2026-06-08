import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simple, Flat Restaurant AI Phone Ordering Pricing | AI Voice HQ",
  description: "Stop paying unpredictable per-minute rates. AI Voice HQ is flat-rate phone answering at $300/month per location. Get your first month free with 300 orders included.",
  keywords: "restaurant phone system cost, AI voice ordering price, flat-rate voice bot pricing, Toast Clover Square POS integration costs",
  alternates: {
    canonical: "https://aivoicehq.com/pricing",
  },
  openGraph: {
    title: "Simple, Flat Restaurant AI Phone Ordering Pricing | AI Voice HQ",
    description: "Flat-rate phone answering at $300/month per location. First month free, 300 orders included.",
    url: "https://aivoicehq.com/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
