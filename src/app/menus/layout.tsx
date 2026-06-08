import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Live Demo & Sample Menus | AI Voice HQ",
  description: "Call our demo line at (240) 248-6423 and experience our AI voice ordering. Browse sample Indian, Italian, Chinese, and Mexican menus that the AI handles with zero lag.",
  keywords: "live demo AI ordering, restaurant voice bot sample, order demo Toast, restaurant phone simulation",
  alternates: {
    canonical: "https://aivoicehq.com/menus",
  },
  openGraph: {
    title: "Interactive Live Demo & Sample Menus | AI Voice HQ",
    description: "Call our demo line at (240) 248-6423 and experience our AI voice ordering. Browse sample Indian, Italian, Chinese, and Mexican menus.",
    url: "https://aivoicehq.com/menus",
  },
};

export default function MenusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
