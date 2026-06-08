import MenusClient from "@/components/MenusClient";
import { getContent } from "@/data/content-store";

export default async function MenusPage() {
  const content = await getContent().catch(() => null);
  return <MenusClient initialContent={content} />;
}
