import HomeClient from "@/components/HomeClient";
import { getContent } from "@/data/content-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Voice HQ | AI Phone Answering & Answering for Restaurants",
  description:
    "AI phone ordering system for restaurants that answers every call, handles 400+ SKU menus, and syncs orders directly to Toast, Clover, and Square. Setup in 48 hours.",
  keywords:
    "AI phone ordering, restaurant phone system, AI order taking, restaurant automation, missed calls restaurant, POS integration, takeout ordering, restaurant voice AI",
  alternates: {
    canonical: "https://aivoicehq.com",
  },
};

export default async function Home() {
  const content = await getContent().catch(() => null);
  return <HomeClient initialContent={content} />;
}
