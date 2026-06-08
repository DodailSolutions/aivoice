"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Cuisine = {
  id: string;
  cuisine: string;
  restaurant: string;
  blurb: string;
  emoji: string;
};

const CUISINES: Cuisine[] = [
  { id: "indian", cuisine: "Indian", restaurant: "Spice Heritage", blurb: "Curries, tandoor plates, biryanis, and combo specials with spice levels.", emoji: "🍛" },
  { id: "italian", cuisine: "Italian", restaurant: "Trattoria Bella", blurb: "Wood-fired pizzas, fresh pastas, and build-your-own combos.", emoji: "🍕" },
  { id: "chinese", cuisine: "Chinese", restaurant: "Golden Wok", blurb: "Wok classics, noodles, and family combo packs.", emoji: "🥡" },
  { id: "mexican", cuisine: "Mexican", restaurant: "Casa Fiesta", blurb: "Tacos, burritos, and platters with customizable fillings.", emoji: "🌮" },
];

const MENU_BASE = "https://www.aivoicehq.com/sample-menus";

export default function MenusClient({ initialContent }: { initialContent: any }) {
  const cuisines = initialContent?.menus?.cuisines || CUISINES;
  const [active, setActive] = useState<any>(cuisines[0] || CUISINES[0]);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const content = initialContent;

  useEffect(() => {
    if (cuisines && cuisines.length > 0) {
      setActive(cuisines[0]);
    }
  }, [initialContent, cuisines]);

  return (
    <div className="relative overflow-hidden pt-24 pb-16" suppressHydrationWarning>
      {/* Background glow blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-blob" />
      <div className="absolute bottom-1/4 left-12 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-float-blob" style={{ animationDelay: "-6s" }} />

      {/* Hero */}
      <section data-reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 text-center space-y-6" suppressHydrationWarning>
        <div className="badge-orange mx-auto w-fit" suppressHydrationWarning>Live Demo</div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-main tracking-tight leading-tight uppercase" suppressHydrationWarning>
          {content?.menus?.hero?.title || "ORDER FROM A REAL MENU"}
        </h1>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" suppressHydrationWarning>
          {content?.menus?.hero?.subtitle || "Call the line, pick a cuisine when the AI asks, then order from the menu below. The AI handles modifiers, spice levels, combos, and pickup time — then sends a clean ticket to the kitchen."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2" suppressHydrationWarning>
          <a
            href="tel:+12402486423"
            suppressHydrationWarning
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 btn-shine bg-orange text-charcoal font-bold text-base rounded-full shadow-glow hover:bg-orange/95 hover:-translate-y-0.5 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call (240) 248-6423
          </a>
        </div>
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest" suppressHydrationWarning>
          Free · about two minutes · answered on the first ring
        </p>
      </section>

      {/* Cuisine selector */}
      <section data-reveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4" suppressHydrationWarning>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4" suppressHydrationWarning>
          {cuisines.map((c: any) => {
            const selected = c.id === active.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setActive(c);
                  setLightbox(null);
                }}
                suppressHydrationWarning
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  selected
                    ? "bg-orange/10 border-orange/60 shadow-[0_0_25px_rgba(234,88,12,0.15)] ring-1 ring-orange/30 -translate-y-0.5"
                    : "bg-charcoal-2 border-border-subtle hover:border-orange/30 hover:-translate-y-0.5 hover:shadow-soft"
                }`}
                aria-pressed={selected}
              >
                <div className="text-2xl sm:text-3xl mb-1.5" suppressHydrationWarning>{c.emoji}</div>
                <div className={`font-heading font-bold text-sm sm:text-base ${selected ? "text-orange" : "text-text-main"}`} suppressHydrationWarning>
                  {c.cuisine}
                </div>
                <div className="text-2xs text-text-muted mt-0.5 truncate" suppressHydrationWarning>{c.restaurant}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active menu */}
      <section data-reveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" suppressHydrationWarning>
        <div className="bg-charcoal-2 border border-border-subtle shadow-card rounded-3xl overflow-hidden" suppressHydrationWarning>
          {/* Header */}
          <div className="bg-charcoal-3 px-5 sm:px-10 py-5 sm:py-6 border-b border-border-subtle flex items-center justify-between gap-3" suppressHydrationWarning>
            <div className="min-w-0" suppressHydrationWarning>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-text-main truncate" suppressHydrationWarning>
                {active.restaurant}
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1" suppressHydrationWarning>{active.blurb}</p>
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl flex-shrink-0" suppressHydrationWarning>{active.emoji}</span>
          </div>

          {/* Image grid */}
          <div className="p-5 sm:p-8 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" suppressHydrationWarning>
            {[1, 2, 3, 4, 5, 6].map((n) => {
              const src = `${MENU_BASE}/${active.id}-${n}.webp`;
              return (
                <button
                  key={`${active.id}-${n}`}
                  onClick={() => setLightbox(n)}
                  suppressHydrationWarning
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-border-subtle shadow-soft hover-scale-card bg-charcoal-3"
                  aria-label={`Open page ${n} of ${active.restaurant} menu`}
                >
                  <Image
                    src={src}
                    alt={`${active.restaurant} menu page ${n}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 inline-flex items-center px-2 py-0.5 rounded-full bg-black/70 text-2xs font-mono font-bold text-white">
                    {n} / 6
                  </span>
                  <span className="absolute inset-0 bg-orange/0 group-hover:bg-orange/10 transition-colors" />
                  <span className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/70 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="bg-charcoal-3 px-5 sm:px-10 py-5 sm:py-6 border-t border-border-subtle text-center" suppressHydrationWarning>
            <p className="text-sm text-text-muted mb-3" suppressHydrationWarning>
              Ready to try it? Call the line and order from the <strong className="text-text-main">{active.restaurant}</strong> menu.
            </p>
            <a
              href="tel:+12402486423"
              suppressHydrationWarning
              className="inline-flex items-center justify-center gap-2 px-6 py-3 btn-shine bg-orange text-charcoal font-bold text-sm rounded-full shadow-glow hover:bg-orange/95 transition-all"
            >
              Call (240) 248-6423
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          suppressHydrationWarning
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
            suppressHydrationWarning
            onClick={() => setLightbox(null)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-2xl aspect-[3/4] animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <Image
              src={`${MENU_BASE}/${active.id}-${lightbox}.webp`}
              alt={`${active.restaurant} menu page ${lightbox}`}
              fill
              sizes="100vw"
              className="object-contain rounded-2xl"
              priority
            />
            {/* Page nav */}
            <div className="absolute -bottom-12 inset-x-0 flex items-center justify-center gap-2" suppressHydrationWarning>
              <button
                onClick={() => setLightbox(((lightbox + 5 - 1) % 6) + 1)}
                suppressHydrationWarning
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-white/80 font-mono text-xs tabular-nums px-3" suppressHydrationWarning>
                {lightbox} / 6
              </span>
              <button
                onClick={() => setLightbox((lightbox % 6) + 1)}
                suppressHydrationWarning
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
