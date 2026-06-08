import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/data/content-store";

export const metadata: Metadata = {
  title: "Product | AI Voice HQ",
  description:
    "A voice ordering workflow built for the hard parts of restaurant phone ordering: context, confirmation, menu complexity, and post-call accountability.",
};

const HIGHLIGHTS = [
  {
    title: "Every call answered",
    body: "Answers rush-period calls and handles up to 20 simultaneous conversations per location.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
  },
  {
    title: "Complex menu handling",
    body: "Handles 400+ SKU menus, rotating daily deals, meal-period categories, modifiers, and special requests.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    ),
  },
  {
    title: "POS integration",
    body: "Orders flow into the POS systems your staff already use, including Toast, Clover, Square, and NCR Aloha.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    ),
  },
  {
    title: "Seamless handoff",
    body: "Customers can ask for a real person anytime and get transferred instantly. Catering orders route to your front desk.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
  },
  {
    title: "Managed launch",
    body: "Go live in 48 hours, then get close first-month monitoring and behavior tuning around real calls.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    ),
  },
  {
    title: "Post-call visibility",
    body: "Recordings, transcripts, call outcomes, and analytics help owners understand what happened after the rush.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    ),
  },
];

const NEXT_STEPS = [
  {
    title: "Hear it on a real menu",
    body: "Call the live demo line and order from a sample restaurant — Indian, Italian, Chinese, or Mexican.",
    href: "/menus",
    cta: "Try the live demo",
  },
  {
    title: "See pricing details",
    body: "$300/mo per location, first month free, first 300 orders included, then $0.70 per order.",
    href: "/pricing",
    cta: "See pricing",
  },
  {
    title: "Read implementation case studies",
    body: "How a multi-location chain rolled out — and what each location's owner shaped in the product.",
    href: "/case-studies",
    cta: "Read case studies",
  },
];

export default async function ProductPage() {
  const content = await getContent().catch(() => null);
  const hero = content?.product?.hero;
  const highlights = content?.product?.highlights || HIGHLIGHTS;

  return (
    <div className="relative overflow-hidden pt-24 pb-16" suppressHydrationWarning>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/8 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-blob" />

      {/* Hero */}
      <section data-reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-6" suppressHydrationWarning>
        <div className="badge-orange mx-auto w-fit" suppressHydrationWarning>Product</div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-6xl text-text-main tracking-tight leading-[1.05]" suppressHydrationWarning>
          {hero?.title ? (
            hero.title
          ) : (
            <>
              A VOICE ORDERING <span className="text-orange">WORKFLOW</span> FOR RESTAURANTS
            </>
          )}
        </h1>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" suppressHydrationWarning>
          {hero?.subtitle || "AI Voice HQ is a voice ordering workflow built for the parts of phone ordering that are hard: context, confirmation, menu complexity, and post-call accountability."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2" suppressHydrationWarning>
          <Link
            href="/menus"
            suppressHydrationWarning
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 btn-shine bg-orange text-charcoal font-bold text-base rounded-full shadow-glow hover:bg-orange/95 hover:-translate-y-0.5 transition-all"
          >
            Try the Live Demo
          </Link>
          <Link
            href="https://cal.com/vgaligutta/15min"
            target="_blank"
            suppressHydrationWarning
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-charcoal-2 border border-border-subtle hover:border-text-muted font-bold text-base rounded-full transition-all text-text-main"
          >
            Book a Meeting
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" suppressHydrationWarning>
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3" suppressHydrationWarning>
          <div className="badge-orange mx-auto w-fit" suppressHydrationWarning>Product Highlights</div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-text-main" suppressHydrationWarning>
            BUILT FOR REAL RESTAURANT PHONE ORDERS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" suppressHydrationWarning>
          {highlights.map((h: any, i: number) => {
            const staticHighlight = HIGHLIGHTS.find((sh) => sh.title.toLowerCase() === h.title.toLowerCase()) || HIGHLIGHTS[i % HIGHLIGHTS.length];
            return (
              <div
                key={h.title}
                data-reveal-item
                suppressHydrationWarning
                style={{ transitionDelay: `${i * 50}ms` }}
                className="group bg-charcoal-2 border border-border-subtle shadow-soft p-7 rounded-2xl space-y-3 hover-scale-card"
              >
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-charcoal transition-colors" suppressHydrationWarning>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    {staticHighlight?.icon || (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                    )}
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-text-main" suppressHydrationWarning>{h.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed" suppressHydrationWarning>{h.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Where orders land */}
      <section data-reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12" suppressHydrationWarning>
        <div className="bg-linear-to-br from-charcoal-2 to-charcoal-3 border border-border-subtle shadow-card rounded-3xl p-8 sm:p-12 space-y-6 relative overflow-hidden" suppressHydrationWarning>
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-orange/8 rounded-full blur-3xl pointer-events-none" />
          <div className="relative space-y-5" suppressHydrationWarning>
            <div className="badge-orange w-fit" suppressHydrationWarning>Where orders land</div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-text-main leading-tight" suppressHydrationWarning>
              ORDERS NEED TO REACH THE KITCHEN
            </h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-3xl" suppressHydrationWarning>
              AI Voice HQ integrates with the POS systems your restaurant already runs, so the phone becomes part of the operating workflow, not a separate channel.
            </p>
            <Link
              href="/integrations"
              suppressHydrationWarning
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-charcoal-2 border border-border-subtle hover:border-orange text-text-main font-semibold text-sm rounded-full transition-all"
            >
              See integrations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" suppressHydrationWarning>
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3" suppressHydrationWarning>
          <div className="badge-orange mx-auto w-fit" suppressHydrationWarning>Next steps</div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-main" suppressHydrationWarning>
            EXPLORE FROM HERE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6" suppressHydrationWarning>
          {NEXT_STEPS.map((step, i) => (
            <Link
              key={step.title}
              href={step.href}
              data-reveal-item
              suppressHydrationWarning
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group bg-charcoal-2 border border-border-subtle shadow-soft p-7 rounded-2xl space-y-3 hover-scale-card flex flex-col"
            >
              <h3 className="font-heading font-bold text-lg text-text-main group-hover:text-orange transition-colors" suppressHydrationWarning>
                {step.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed flex-1" suppressHydrationWarning>{step.body}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange pt-1" suppressHydrationWarning>
                {step.cta}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
