import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import CookieBanner from "@/components/CookieBanner";
import RecordingConsent from "@/components/RecordingConsent";
import ScrollReveal from "@/components/ScrollReveal";
import PwaRegister from "@/components/PwaRegister";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#ff5a1f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "AI Voice HQ | AI Phone Ordering & Answering for Restaurants",
  description:
    "AI phone ordering system for restaurants that answers every call, handles 400+ SKU menus, and syncs orders directly to Toast, Clover, and Square. Setup in 48 hours.",
  keywords:
    "AI phone ordering, restaurant phone system, AI order taking, restaurant automation, missed calls restaurant, POS integration, takeout ordering, restaurant voice AI",
  robots: "index, follow",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AI Voice HQ",
  },
  openGraph: {
    title: "AI Voice HQ | AI Phone Ordering & Answering for Restaurants",
    description:
      "AI phone ordering system for restaurants that answers every call, handles 400+ SKU menus, and syncs orders directly to Toast, Clover, and Square.",
    url: "https://aivoicehq.com",
    siteName: "AI Voice HQ",
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
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-charcoal text-text-main font-sans selection:bg-orange selection:text-charcoal pb-[72px] md:pb-0">
        <PwaRegister />
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <MobileBottomNav />
        <CookieBanner />
        <RecordingConsent />
        <ScrollReveal />
      </body>
    </html>
  );
}
