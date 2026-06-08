"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-charcoal-2 border-t border-border-subtle pt-16 pb-28 md:pb-12 text-sm text-text-muted mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" suppressHydrationWarning className="flex items-center gap-2">
              <Image
                src="/ai-voice-hq-face.webp"
                alt="AI Voice HQ logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="font-heading font-extrabold text-lg text-text-main tracking-wider">
                AI VOICE <span className="text-orange">HQ</span>
              </span>
            </Link>
            <p className="leading-relaxed">
              AI phone ordering and reservation system built for high-volume restaurants. Answers every call, takes orders, and syncs directly to your POS.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="https://www.linkedin.com/company/aivoicehq"
                target="_blank"
                suppressHydrationWarning
                className="hover:text-orange transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/aivoicehq"
                target="_blank"
                suppressHydrationWarning
                className="hover:text-orange transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                </svg>
              </Link>
              <Link
                href="https://www.tiktok.com/@aivoicehq"
                target="_blank"
                suppressHydrationWarning
                className="hover:text-orange transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.14.99 1.13 2.37 1.83 3.86 2.02v3.86c-1.39-.02-2.74-.43-3.91-1.21-.29-.19-.55-.42-.8-.67v6.61c.02 1.65-.4 3.29-1.22 4.71-.82 1.42-2.03 2.54-3.49 3.22-1.46.68-3.1 1-4.71.91-1.61-.09-3.17-.66-4.48-1.65C2.01 20.93.97 19.34.46 17.57c-.51-1.77-.47-3.66.1-5.4.57-1.74 1.71-3.25 3.24-4.32 1.53-1.07 3.39-1.61 5.25-1.54v3.9c-.83-.02-1.66.19-2.39.6-.73.41-1.31 1.03-1.68 1.78-.37.75-.48 1.6-.32 2.43.16.83.58 1.59 1.2 2.16.62.57 1.42.92 2.27 1.01.85.09 1.71-.06 2.46-.43.75-.37 1.34-.97 1.71-1.71.37-.74.49-1.58.33-2.4V0z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Navigation links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-text-main uppercase tracking-wider text-xs">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/product" suppressHydrationWarning className="hover:text-text-main transition-colors">
                  Product
                </Link>
              </li>
              <li>
                <Link href="/pricing" suppressHydrationWarning className="hover:text-text-main transition-colors">
                  Pricing Calculator
                </Link>
              </li>
              <li>
                <Link href="/integrations" suppressHydrationWarning className="hover:text-text-main transition-colors">
                  POS Integrations
                </Link>
              </li>
              <li>
                <Link href="/menus" suppressHydrationWarning className="hover:text-text-main transition-colors">
                  Sample Menus
                </Link>
              </li>
              <li>
                <Link href="/case-studies" suppressHydrationWarning className="hover:text-text-main transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-text-main uppercase tracking-wider text-xs">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/blog" suppressHydrationWarning className="hover:text-text-main transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" suppressHydrationWarning className="hover:text-text-main transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" suppressHydrationWarning className="hover:text-text-main transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" suppressHydrationWarning className="hover:text-text-main transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" suppressHydrationWarning className="hover:text-text-main transition-colors">
                  Security &amp; Data
                </Link>
              </li>
              <li>
                <Link href="https://order.aivoicehq.com" target="_blank" suppressHydrationWarning className="hover:text-text-main transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-text-main uppercase tracking-wider text-xs">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+13106345831" suppressHydrationWarning className="hover:text-text-main transition-colors font-mono">
                  (310) 634-5831
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:inquiries@aivoicehq.com" suppressHydrationWarning className="hover:text-text-main transition-colors font-mono">
                  inquiries@aivoicehq.com
                </a>
              </li>
              <li className="flex items-start gap-2 leading-tight">
                <svg className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  9135 Ermantrude Ct.<br />
                  Vienna, VA 22182, US
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 AI Voice HQ. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>PCI-DSS Compliant</span>
            <span className="w-1.5 h-1.5 bg-success rounded-full" />
            <span>99.9% Uptime SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
