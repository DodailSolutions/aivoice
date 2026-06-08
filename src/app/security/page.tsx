import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security & Data | AI Voice HQ",
  description:
    "How AI Voice HQ handles call recordings, payment data, and retention. Recording disclosure on every call, 24-month retention, restaurant-branded payment links, and no retained PCI card data.",
};

const pillars = [
  {
    title: "Recording disclosure",
    body: "Every call includes a recording notice. Callers are told the conversation is recorded for order accuracy and training before the order begins.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    ),
  },
  {
    title: "24-month retention",
    body: "Recordings, transcripts, and linked orders are retained for 24 months so operators can verify order claims and review accuracy long after the shift.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: "Branded payment links",
    body: "When pre-payment is enabled, customers receive restaurant-branded payment links. Most locations simply accept payment at pickup by default.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    ),
  },
  {
    title: "No retained PCI data",
    body: "AI Voice HQ does not store PCI card data. Payment handling stays inside compliant, restaurant-branded payment flows — never in our systems.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
];

const details = [
  {
    title: "Recording notice",
    body: "Calls handled by AI Voice HQ are recorded with disclosure to the caller. Recordings and transcripts are used for order accuracy, dispute resolution, and tuning the deployment to your restaurant.",
  },
  {
    title: "Payment scope",
    body: "Payment is collected through restaurant-branded links or at pickup. AI Voice HQ does not retain PCI card data — card details never live in our platform.",
  },
  {
    title: "Operator visibility",
    body: "Every call is auditable. Operators can review recordings, transcripts, linked orders, call outcomes, and analytics from the dashboard for the full 24-month retention window.",
  },
];

export default function SecurityPage() {
  return (
    <div className="relative overflow-hidden pt-24 pb-16">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-5">
        <div className="badge-orange mx-auto w-fit">Security &amp; Data</div>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-text-main tracking-tight">
          TRUST BUILT INTO THE PHONE WORKFLOW
        </h1>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          A phone ordering system has to be useful and auditable at the same time. Every call is disclosed, recorded, retained, and reviewable — and we keep payment data out of our systems entirely.
        </p>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-charcoal-2 border border-border-subtle shadow-soft p-6 rounded-2xl space-y-4 hover:border-orange/30 transition-all"
            >
              <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {p.icon}
                </svg>
              </div>
              <h3 className="font-heading font-bold text-base text-text-main">{p.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detail sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {details.map((d) => (
          <div
            key={d.title}
            className="bg-charcoal-2 border border-border-subtle shadow-soft p-8 rounded-2xl space-y-2"
          >
            <h2 className="font-heading font-bold text-xl text-text-main">{d.title}</h2>
            <p className="text-sm text-text-muted leading-relaxed">{d.body}</p>
          </div>
        ))}
      </section>

      {/* Questions / CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-linear-to-br from-charcoal-2 to-charcoal border border-border-active/40 p-8 sm:p-12 rounded-3xl text-center space-y-5">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-main">
            QUESTIONS ABOUT PRIVACY OR DATA?
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
            We are happy to walk through recording disclosure, retention, and payment handling for your locations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:inquiries@aivoicehq.com"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 btn-shine bg-orange text-charcoal font-bold text-sm rounded-full shadow-glow hover:bg-orange/95 transition-all"
            >
              Email inquiries@aivoicehq.com
            </a>
            <Link
              href="/privacy"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-charcoal-3 border border-border-subtle hover:border-text-muted text-text-main font-bold text-sm rounded-full transition-all"
            >
              Read Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
