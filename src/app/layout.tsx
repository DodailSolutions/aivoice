import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
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

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#ff5a1f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aivoicehq.com"),
  title: "AI Voice HQ | AI Phone Ordering & Answering for Restaurants",
  description:
    "AI phone ordering system for restaurants that answers every call, handles 400+ SKU menus, and syncs orders directly to Toast, Clover, and Square. Setup in 48 hours.",
  keywords:
    "AI phone ordering, restaurant phone system, AI order taking, restaurant automation, missed calls restaurant, POS integration, takeout ordering, restaurant voice AI",
  robots: "index, follow",
  alternates: {
    canonical: "https://aivoicehq.com",
  },
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
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "AI Voice HQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice HQ | AI Phone Ordering & Answering for Restaurants",
    description: "AI phone ordering system for restaurants that answers every call, handles 400+ SKU menus, and syncs orders directly to Toast, Clover, and Square. Setup in 48 hours.",
    images: ["/icon.png"],
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
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light' || (!theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-charcoal text-text-main font-sans selection:bg-orange selection:text-charcoal pb-[72px] md:pb-0">
        <PwaRegister />
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <MobileBottomNav />
        <CookieBanner />
        <RecordingConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "AI Voice HQ",
                "operatingSystem": "All",
                "applicationCategory": "BusinessApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "300.00",
                  "priceCurrency": "USD",
                  "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "300.00",
                    "priceCurrency": "USD",
                    "unitText": "Month"
                  }
                },
                "description": "AI phone ordering system for restaurants that answers every call, handles 400+ SKU menus, and syncs orders directly to Toast, Clover, and Square. Setup in 48 hours.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "24"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "AI Voice HQ",
                "url": "https://aivoicehq.com",
                "logo": "https://aivoicehq.com/icon.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+1-310-634-5831",
                  "contactType": "customer service",
                  "email": "inquiries@aivoicehq.com"
                }
              }
            ])
          }}
        />
        <ScrollReveal />
      </body>
    </html>
  );
}
