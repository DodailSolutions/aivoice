import FaqClient from "@/components/FaqClient";
import { getContent } from "@/data/content-store";

export default async function FaqPage() {
  const content = await getContent().catch(() => null);
  return <FaqClient initialContent={content} />;
}
