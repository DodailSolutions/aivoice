"use client";

import Link from "next/link";
import { useState } from "react";

const DEFAULT_FAQS = [
  {
    q: "How does the AI know my menu?",
    a: "We configure the AI around your real menu, including items, modifiers, prices, special instructions, meal-period categories, and daily deals. We are built for large menus, including restaurants with 400+ SKUs.",
  },
  {
    q: "What POS systems do you integrate with?",
    a: "AI Voice HQ integrates with the POS systems your staff already use — including Toast, Clover, Square, NCR Aloha, Lightspeed, and TouchBistro — and routes completed orders into your existing workflow.",
  },
  {
    q: "What happens if the AI can't understand a customer?",
    a: "The AI confirms uncertain details, asks follow-up questions, and can transfer to staff when the situation needs a person. We tune this behavior during the managed first-month launch.",
  },
  {
    q: "How many calls can the AI handle at once?",
    a: "AI Voice HQ handles up to 20 simultaneous calls per location. During a rush, every caller can be answered without forcing staff to juggle the phone.",
  },
  {
    q: "Do I need to change my phone number?",
    a: "No. We work with your existing phone number through call forwarding. Your customers call the same number they always have, and they just get answered instantly now.",
  },
  {
    q: "How long does setup take?",
    a: "Most restaurants can go live within 48 hours. The first month is a managed launch period where we actively monitor calls, review behavior, and tune the deployment around your restaurant.",
  },
  {
    q: "What if I want to cancel?",
    a: "There's no contract or commitment. Cancel anytime with no fees or penalties. We're confident you'll love the service, which is why we offer the first month free.",
  },
  {
    q: "How do customers pay for their orders?",
    a: "Most locations accept payment at pickup by default. If you want pre-payment, customers can receive restaurant-branded payment links. AI Voice HQ does not retain PCI card data.",
  },
  {
    q: "Can the AI handle special requests and dietary restrictions?",
    a: "Yes. The AI is trained on your specific menu and can handle requests like 'no onions', 'extra spicy', 'gluten-free options', and complex modifications. It confirms all special requests back to the customer to ensure accuracy.",
  },
  {
    q: "What if a customer wants to talk to a real person?",
    a: "Anytime a customer says they want to speak with someone, the AI transfers them to your staff immediately. Catering orders are automatically routed to your front desk, and after closing time, calls can be set to auto-transfer to a manager or voicemail.",
  },
  {
    q: "What happens when items are out of stock?",
    a: "The menu syncs live with your POS. When you 86 an item, the AI knows instantly and won't offer it. Better yet, it suggests intelligent replacements like offering Sprite when you're out of 7-Up, so you don't lose the sale.",
  },
  {
    q: "How do I get notified about important calls?",
    a: "High-priority situations like catering inquiries or customer complaints trigger instant SMS alerts to your configured staff numbers. You stay in the loop on what matters without monitoring every call.",
  },
  {
    q: "What languages does the AI support?",
    a: "The AI prefers English but can dynamically switch to many commonly spoken languages including Hindi, Mandarin, French, and Spanish, as well as popular regional languages like Telugu, Tamil, and Bengali.",
  },
  {
    q: "Can I listen to the calls and monitor AI performance?",
    a: "Yes. Calls include a recording notice and recordings are retained for 24 months. Operators can review recordings, transcripts, linked orders, call outcomes, and analytics in the dashboard.",
  },
  {
    q: "Can you use historical recordings during setup?",
    a: "Yes. If a restaurant has historical recordings available, we can use them during onboarding to understand real caller patterns, menu questions, and edge cases before launch.",
  },
];

export default function FaqClient({ initialContent }: { initialContent: any }) {
  const [open, setOpen] = useState<number | null>(0);
  const content = initialContent;

  const hero = content?.faq?.hero;
  const faqsList = content?.faq?.faqs || DEFAULT_FAQS;

  return (
    <div className="relative overflow-hidden pt-24 pb-16" suppressHydrationWarning>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12" suppressHydrationWarning>
        <div className="text-center space-y-4 mb-14" suppressHydrationWarning>
          <div className="badge-orange" suppressHydrationWarning>FAQ</div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-text-main tracking-tight uppercase" suppressHydrationWarning>
            {hero?.title || "EVERYTHING WORTH ASKING"}
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" suppressHydrationWarning>
            {hero?.subtitle || "How AI Voice HQ handles real restaurant operations — menus, POS, languages, payment, recordings, and what happens when a caller wants a real person."}
          </p>
        </div>

        <div className="space-y-3" suppressHydrationWarning>
          {faqsList.map((faq: any, i: number) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                suppressHydrationWarning
                className={`bg-charcoal-2 border rounded-2xl overflow-hidden transition-all ${
                  isOpen ? "border-orange/40" : "border-border-subtle"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  suppressHydrationWarning
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-text-main" suppressHydrationWarning>
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-orange transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {isOpen && (
                  <div suppressHydrationWarning className="px-6 pb-5 -mt-1 text-sm text-text-muted leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-charcoal-2 border border-border-subtle rounded-2xl p-8 text-center space-y-4 hover-scale-card" suppressHydrationWarning>
          <h2 className="font-heading font-bold text-2xl text-text-main" suppressHydrationWarning>
            Still have questions?
          </h2>
          <p className="text-sm text-text-muted max-w-md mx-auto" suppressHydrationWarning>
            Book a 15-minute call and we will walk you through exactly how AI Voice HQ would run on your menu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2" suppressHydrationWarning>
            <Link
              href="https://cal.com/vgaligutta/15min"
              target="_blank"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 btn-shine bg-orange text-charcoal font-bold text-sm rounded-full shadow-glow hover:bg-orange/95 transition-all"
            >
              Book Your Meeting
            </Link>
            <a
              href="mailto:inquiries@aivoicehq.com"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-charcoal-3 border border-border-subtle hover:border-text-muted text-text-main font-bold text-sm rounded-full transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
