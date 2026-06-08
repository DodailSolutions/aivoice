"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const INCLUDED = [
  "First month completely free",
  "First 300 orders included each month",
  "20 simultaneous calls per location",
  "POS & KDS integration",
  "Toast, Clover, Square & more",
  "Large menu and modifier handling",
  "Managed first-month tuning",
  "Call recordings and transcripts",
  "Analytics dashboard",
  "Dedicated support",
];

const FAQS = [
  {
    q: "Is there a setup fee?",
    a: "No. There is no setup fee. The first month is free and includes managed launch — we monitor real calls, review behavior, and tune the deployment to your menu.",
  },
  {
    q: "What happens after the first 300 orders?",
    a: "After 300 orders in a month, additional orders are 70 cents each. There is no per-call charge — only completed orders count toward the meter.",
  },
  {
    q: "How do customers pay for their orders?",
    a: "Most locations accept payment at pickup by default. If you want pre-payment, customers can receive restaurant-branded payment links. AI Voice HQ does not retain PCI card data.",
  },
  {
    q: "What if I want to cancel?",
    a: "There is no contract or commitment. Cancel anytime with no fees or penalties.",
  },
  {
    q: "Do multi-location groups get different pricing?",
    a: "Pricing is per location. For chains rolling out across multiple locations, we have volume arrangements — talk to us and we will walk through what fits.",
  },
];

export default function PricingClient({ initialContent }: { initialContent: any }) {
  const [orders, setOrders] = useState(450);
  const [totalBouncing, setTotalBouncing] = useState(false);
  const content = initialContent;

  const basePrice = content?.pricing?.pricingCard?.basePrice ?? 300;
  const includedOrders = content?.pricing?.pricingCard?.includedOrders ?? 300;
  const overageRate = content?.pricing?.pricingCard?.overageRate ?? 0.70;

  const overage = Math.max(0, orders - includedOrders);
  const monthlyTotal = basePrice + overage * overageRate;

  useEffect(() => {
    setTotalBouncing(true);
    const t = setTimeout(() => setTotalBouncing(false), 150);
    return () => clearTimeout(t);
  }, [monthlyTotal]);

  return (
    <div className="relative overflow-hidden pt-24 pb-16" suppressHydrationWarning>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-blob-side" />

      {/* Hero */}
      <section data-reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-5" suppressHydrationWarning>
        <div className="badge-orange mx-auto w-fit" suppressHydrationWarning>Transparent Pricing</div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-main tracking-tight leading-tight" suppressHydrationWarning>
          PRICED FOR REAL OPERATIONS
        </h1>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" suppressHydrationWarning>
          Transparent monthly pricing per location. First month free. No setup fees, no contracts, no per-call billing.
        </p>
      </section>

      {/* Pricing card */}
      <section data-reveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-4" suppressHydrationWarning>
        <div className="relative bg-charcoal-2 border border-orange-border/50 shadow-glow/15 shadow-xl rounded-3xl p-8 sm:p-12 overflow-hidden hover-scale-card" suppressHydrationWarning>
          {/* Decorative gradient */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-8" suppressHydrationWarning>
            <div className="text-center space-y-2" suppressHydrationWarning>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/10 border border-orange-border text-2xs font-mono font-bold uppercase tracking-widest text-orange" suppressHydrationWarning>
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                Per location · First month free
              </span>
              <div className="flex items-baseline justify-center gap-2 pt-2" suppressHydrationWarning>
                <span className="font-heading font-black text-6xl sm:text-7xl text-text-main text-glow" suppressHydrationWarning>${basePrice}</span>
                <span className="text-text-muted text-lg" suppressHydrationWarning>/month</span>
              </div>
              <p className="text-text-muted text-sm" suppressHydrationWarning>
                Includes <strong className="text-text-main">first {includedOrders} orders</strong>. Then <strong className="text-text-main">${overageRate.toFixed(2)}/order</strong>.
              </p>
            </div>

            {/* Included list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-2" suppressHydrationWarning>
              {INCLUDED.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-text-main" suppressHydrationWarning>
                  <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-snug" suppressHydrationWarning>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-3" suppressHydrationWarning>
              <Link
                href="https://cal.com/vgaligutta/15min"
                target="_blank"
                suppressHydrationWarning
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 btn-shine bg-orange text-charcoal font-bold text-base rounded-full shadow-glow hover:bg-orange/95 hover:-translate-y-0.5 transition-all active:translate-y-0"
              >
                Get Started Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <p className="text-center text-2xs text-text-muted font-mono" suppressHydrationWarning>
                No credit card required. No contracts. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order calculator */}
      <section data-reveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12" suppressHydrationWarning>
        <div className="bg-charcoal-2 border border-border-subtle shadow-soft rounded-2xl p-6 sm:p-8 space-y-6 hover-scale-card" suppressHydrationWarning>
          <div className="text-center space-y-1" suppressHydrationWarning>
            <div className="text-2xs uppercase tracking-widest text-text-muted font-bold font-mono" suppressHydrationWarning>
              Estimate your monthly cost
            </div>
            <h2 className="font-heading font-bold text-xl text-text-main" suppressHydrationWarning>
              Slide to your typical monthly order volume
            </h2>
          </div>

          <div suppressHydrationWarning>
            <div className="flex justify-between items-center text-sm font-semibold mb-2 text-text-main" suppressHydrationWarning>
              <span suppressHydrationWarning>Orders / month</span>
              <span className="text-orange font-mono text-base" suppressHydrationWarning>{orders.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="10"
              value={orders}
              suppressHydrationWarning
              onChange={(e) => setOrders(parseInt(e.target.value))}
              className="w-full h-2 bg-charcoal-3 rounded-lg appearance-none cursor-pointer accent-orange"
            />
            <div className="flex justify-between text-2xs text-text-muted font-mono mt-1" suppressHydrationWarning>
              <span suppressHydrationWarning>50</span>
              <span suppressHydrationWarning>1,000</span>
              <span suppressHydrationWarning>2,000</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center" suppressHydrationWarning>
            <div className="bg-charcoal-3 rounded-xl p-4" suppressHydrationWarning>
              <div className="text-2xs uppercase tracking-widest text-text-muted font-bold font-mono" suppressHydrationWarning>Base</div>
              <div className="text-xl font-heading font-extrabold text-text-main mt-1" suppressHydrationWarning>${basePrice}</div>
              <div className="text-2xs text-text-muted mt-0.5" suppressHydrationWarning>First {includedOrders} orders</div>
            </div>
            <div className="bg-charcoal-3 rounded-xl p-4" suppressHydrationWarning>
              <div className="text-2xs uppercase tracking-widest text-text-muted font-bold font-mono" suppressHydrationWarning>Overage</div>
              <div className="text-xl font-heading font-extrabold text-text-main mt-1" suppressHydrationWarning>
                ${(overage * overageRate).toFixed(2)}
              </div>
              <div className="text-2xs text-text-muted mt-0.5" suppressHydrationWarning>{overage} × ${overageRate.toFixed(2)}</div>
            </div>
            <div className="bg-orange/10 border border-orange-border rounded-xl p-4" suppressHydrationWarning>
              <div className="text-2xs uppercase tracking-widest text-orange font-bold font-mono" suppressHydrationWarning>Monthly</div>
              <div 
                className={`text-xl font-heading font-extrabold text-orange mt-1 transition-transform duration-150 ease-out block ${
                  totalBouncing ? "scale-[1.05]" : "scale-100"
                }`}
                suppressHydrationWarning
              >
                ${monthlyTotal.toFixed(2)}
              </div>
              <div className="text-2xs text-orange/80 mt-0.5" suppressHydrationWarning>Total</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section data-reveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8" suppressHydrationWarning>
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3" suppressHydrationWarning>
          <div className="badge-orange mx-auto w-fit" suppressHydrationWarning>Pricing FAQ</div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-main" suppressHydrationWarning>
            COMMON QUESTIONS
          </h2>
        </div>

        <div className="space-y-3" suppressHydrationWarning>
          {(content?.pricing?.faqs || FAQS).map((faq: any) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section data-reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" suppressHydrationWarning>
        <div className="bg-linear-to-br from-charcoal-2 to-charcoal border border-border-active/40 p-8 sm:p-12 rounded-3xl text-center space-y-5" suppressHydrationWarning>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-text-main" suppressHydrationWarning>
            READY TO START?
          </h2>
          <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed" suppressHydrationWarning>
            Book a 15-minute call. We will walk through your menu, your POS, and how AI Voice HQ would handle your phone flow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2" suppressHydrationWarning>
            <Link
              href="https://cal.com/vgaligutta/15min"
              target="_blank"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 btn-shine bg-orange text-charcoal font-bold text-sm rounded-full shadow-glow hover:bg-orange/95 hover:-translate-y-0.5 transition-all"
            >
              Book a Meeting
            </Link>
            <Link
              href="/menus"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-charcoal-3 border border-border-subtle hover:border-text-muted text-text-main font-bold text-sm rounded-full transition-all"
            >
              Try the Live Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      suppressHydrationWarning
      className={`bg-charcoal-2 border rounded-2xl shadow-soft overflow-hidden transition-all ${
        open ? "border-orange/40" : "border-border-subtle"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        suppressHydrationWarning
        className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
        aria-expanded={open}
      >
        <span className="font-heading font-bold text-sm sm:text-base text-text-main" suppressHydrationWarning>{q}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-orange transition-transform ${open ? "rotate-45" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      {open && (
        <div suppressHydrationWarning className="px-5 sm:px-6 pb-5 -mt-1 text-sm text-text-muted leading-relaxed animate-fadeIn">
          {a}
        </div>
      )}
    </div>
  );
}
