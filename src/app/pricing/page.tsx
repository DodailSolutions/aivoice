import PricingClient from "@/components/PricingClient";
import { getContent } from "@/data/content-store";

export default async function PricingPage() {
  const content = await getContent().catch(() => null);
  return <PricingClient initialContent={content} />;
}
