"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    try {
      const currentTheme = document.documentElement.getAttribute("data-theme") || 
                           (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    } catch (e) {}
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const links = [
    { name: "Product", href: "/product" },
    { name: "Integrations", href: "/integrations" },
    { name: "Pricing", href: "/pricing" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-charcoal/90 backdrop-blur-xl border-b border-border-subtle shadow-soft"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" suppressHydrationWarning className="flex items-center gap-2 group">
            <Image
              src="/ai-voice-hq-face.webp"
              alt="AI Voice HQ logo"
              width={40}
              height={40}
              priority
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-heading font-extrabold text-xl tracking-wider text-text-main">
              AI VOICE <span className="text-orange">HQ</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                suppressHydrationWarning
                className={`relative py-1 font-medium text-sm transition-colors hover:text-text-main ${
                  isActive(link.href) ? "text-text-main" : "text-text-muted"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/menus"
                suppressHydrationWarning
                className="text-sm font-medium text-text-muted hover:text-text-main transition-colors"
              >
                Live Demo
              </Link>
              <Link
                href="https://order.aivoicehq.com"
                suppressHydrationWarning
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-text-muted hover:text-text-main transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="https://cal.com/vgaligutta/15min"
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
                className="btn-shine inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-orange text-charcoal font-semibold text-sm shadow-glow hover:bg-orange/90 hover:-translate-y-0.5 transition-all active:translate-y-0"
              >
                Book a Demo
              </Link>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-border-subtle hover:border-orange/60 text-text-muted hover:text-orange flex items-center justify-center transition-colors cursor-pointer mr-1 md:mr-0"
              aria-label="Toggle Dark/Light Mode"
              suppressHydrationWarning
            >
              {/* Sun icon */}
              <svg className="w-5 h-5 theme-sun" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" suppressHydrationWarning>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              {/* Moon icon */}
              <svg className="w-4.5 h-4.5 theme-moon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" suppressHydrationWarning>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            {/* Mobile Menu Toggler */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              suppressHydrationWarning
              className="md:hidden p-2 text-text-muted hover:text-text-main focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-charcoal/95 border-b border-border-subtle backdrop-blur-2xl animate-fadeIn">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                suppressHydrationWarning
                className={`block px-3 py-2 rounded-lg text-base font-semibold transition-colors ${
                  isActive(link.href)
                    ? "bg-orange/10 text-orange"
                    : "text-text-muted hover:bg-charcoal-2 hover:text-text-main"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border-subtle flex flex-col gap-3">
              <Link
                href="/menus"
                onClick={() => setMobileMenuOpen(false)}
                suppressHydrationWarning
                className="w-full text-center py-2.5 rounded-lg border border-border-subtle font-medium text-sm text-text-muted hover:text-text-main"
              >
                Live Demo
              </Link>
              <Link
                href="https://order.aivoicehq.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                suppressHydrationWarning
                className="w-full text-center py-2.5 rounded-lg border border-border-subtle font-medium text-sm text-text-muted hover:text-text-main"
              >
                Sign In
              </Link>
              <Link
                href="https://cal.com/vgaligutta/15min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                suppressHydrationWarning
                className="btn-shine w-full text-center py-2.5 rounded-lg bg-orange font-bold text-sm text-charcoal shadow-glow"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
