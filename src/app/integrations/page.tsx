import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/data/content-store";

export const metadata: Metadata = {
  title: "Integrations | AI Voice HQ",
  description:
    "AI Voice HQ integrates with the POS systems your restaurant already runs — Toast, Clover, Square, NCR Aloha, Lightspeed, TouchBistro — so the phone call becomes part of the existing workflow.",
};

const POS = [
  { name: "TOAST", note: "Direct integration" },
  { name: "CLOVER", note: "Direct integration" },
  { name: "SQUARE", note: "Direct integration" },
  { name: "NCR ALOHA", note: "Direct integration" },
  { name: "LIGHTSPEED", note: "Direct integration" },
  { name: "TOUCHBISTRO", note: "Direct integration" },
];

const WORKFLOW = [
  {
    title: "Same phone number",
    body: "Customers keep dialing the number they already know. Calls forward into AI Voice HQ — no phone-tree redirects, no separate ordering line.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
  },
  {
    title: "Orders into the existing workflow",
    body: "Completed orders land in the POS or KDS your staff already uses. The phone becomes another order channel, not a separate inbox.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    ),
  },
  {
    title: "Operator-visible after the call",
    body: "Recordings, transcripts, outcomes, and linked orders stay available in the AI Voice HQ dashboard.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    ),
  },
];

export default async function IntegrationsPage() {
  const content = await getContent().catch(() => null);
  const hero = content?.integrations?.hero;
  const posSystems = content?.integrations?.posSystems || POS;

  return (
    <div className="relative overflow-hidden pt-24 pb-16" suppressHydrationWarning>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/8 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-blob" />

      {/* Hero */}
      <section data-reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-5" suppressHydrationWarning>
        <div className="badge-orange mx-auto w-fit" suppressHydrationWarning>Integrations</div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-main tracking-tight leading-tight uppercase" suppressHydrationWarning>
          {hero?.title || "ORDERS LAND WHERE YOUR STAFF ALREADY WORKS"}
        </h1>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" suppressHydrationWarning>
          {hero?.subtitle || "AI Voice HQ integrates with the POS systems your restaurant already runs, so the call becomes part of the operating workflow instead of a separate channel."}
        </p>
      </section>

      {/* Proven order path */}
      <section data-reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8" suppressHydrationWarning>
        <div className="bg-charcoal-2 border border-border-subtle shadow-card rounded-3xl p-8 sm:p-10 space-y-7" suppressHydrationWarning>
          <div className="space-y-3 text-center sm:text-left" suppressHydrationWarning>
            <div className="badge-orange mx-auto sm:mx-0 w-fit" suppressHydrationWarning>Proven order path</div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-main leading-tight" suppressHydrationWarning>
              SAME PATH AS DELIVERY
            </h2>
            <p className="text-text-muted text-base leading-relaxed max-w-3xl mx-auto sm:mx-0" suppressHydrationWarning>
              Phone orders reach the kitchen through the same POS and KDS that already handle your online and delivery orders. The point is not to add a new tool — it&apos;s to put the phone call into the same flow the kitchen already runs on.
            </p>
          </div>

          {/* POS grid */}
          <div className="space-y-3" suppressHydrationWarning>
            <div className="text-2xs font-mono font-bold uppercase tracking-widest text-text-muted" suppressHydrationWarning>
              Integration-capable POS systems include
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" suppressHydrationWarning>
              {posSystems.map((p: any, i: number) => (
                <div
                  key={p.name}
                  data-reveal-item
                  suppressHydrationWarning
                  style={{ transitionDelay: `${i * 40}ms` }}
                  className="bg-charcoal-3 border border-border-subtle rounded-xl px-4 py-4 text-center hover:border-orange/40 hover:bg-charcoal-2 transition-all"
                >
                  <div className="font-heading font-bold text-base sm:text-lg tracking-wider text-text-main" suppressHydrationWarning>
                    {p.name}
                  </div>
                  <div className="text-2xs text-text-muted font-mono mt-0.5" suppressHydrationWarning>{p.note}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted text-center pt-1" suppressHydrationWarning>
              …and many more, connected through integration partners including <strong className="text-text-main">Deliverect</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" suppressHydrationWarning>
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3" suppressHydrationWarning>
          <div className="badge-orange mx-auto w-fit" suppressHydrationWarning>How the workflow lands</div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-text-main" suppressHydrationWarning>
            ONE CHANNEL, NOT ANOTHER INBOX
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6" suppressHydrationWarning>
          {WORKFLOW.map((w, i) => (
            <div
              key={w.title}
              data-reveal-item
              suppressHydrationWarning
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group bg-charcoal-2 border border-border-subtle shadow-soft p-7 rounded-2xl space-y-4 hover:border-orange/40 hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-charcoal transition-colors" suppressHydrationWarning>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {w.icon}
                </svg>
              </div>
              <h3 className="font-heading font-bold text-lg text-text-main" suppressHydrationWarning>{w.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed" suppressHydrationWarning>{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section data-reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" suppressHydrationWarning>
        <div className="bg-linear-to-br from-charcoal-2 to-charcoal border border-border-active/40 p-8 sm:p-12 rounded-3xl text-center space-y-5" suppressHydrationWarning>
          <div className="badge-orange mx-auto w-fit" suppressHydrationWarning>Next step</div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-text-main" suppressHydrationWarning>
            TELL US WHAT YOU RUN
          </h2>
          <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed" suppressHydrationWarning>
            Share your POS, menu structure, and the parts of your phone workflow that are toughest. We&apos;ll walk through how AI Voice HQ would land in it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2" suppressHydrationWarning>
            <Link
              href="https://cal.com/vgaligutta/15min"
              target="_blank"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 btn-shine bg-orange text-charcoal font-bold text-sm rounded-full shadow-glow hover:bg-orange/95 hover:-translate-y-0.5 transition-all"
            >
              Talk to us about your POS
            </Link>
            <Link
              href="/product"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-charcoal-3 border border-border-subtle hover:border-text-muted text-text-main font-bold text-sm rounded-full transition-all"
            >
              See the product
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
