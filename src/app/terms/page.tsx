import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | AI Voice HQ",
  description: "Read our terms of service, billing specifications, flat-rate pricing conditions, and API integration responsibilities.",
};

export default function TermsPage() {
  return (
    <div className="relative pt-24 pb-16">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-sm text-text-muted leading-relaxed">
        <div className="space-y-3">
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
            TERMS OF SERVICE
          </h1>
          <p className="text-xs text-text-muted font-mono">Last Updated: May 2026</p>
        </div>

        <p>
          Welcome to AI Voice HQ (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service govern your access to and use of our restaurant voice AI answering platforms, operator portals, and integrations. By activating our service at your restaurant location, you agree to comply with these terms.
        </p>

        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-text-main">1. Service Scope & Integration Limits</h3>
          <p>
            AI Voice HQ provides telephone conversational call taking, table booking, and POS ticket routing. We coordinate with third-party networks (e.g., Deliverect, Toast, Square) to deliver these services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Operators must maintain valid accounts and active hardware with their respective POS providers.
            </li>
            <li>
              We are not liable for ordering dispatch failures arising from POS network outages, hardware disconnects, or Deliverect api routing errors.
            </li>
            <li>
              Service setup is targets 48 hours from onboarding call menu sync, subject to POS network approval.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-text-main">2. Billing, Flat-Rates, and Cancellations</h3>
          <p>
            We operate on a flat-rate billing system. Unlike overage-heavy models, you pay a fixed fee:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Flat Rate:</strong> Billed at $300/month per active restaurant location, covering unlimited concurrent calls and table reservation bookings.
            </li>
            <li>
              <strong>Overage-Free Guarantee:</strong> We do not levy per-minute or per-call overage fees.
            </li>
            <li>
              <strong>Cancellations:</strong> Services are billed month-to-month. You may cancel your subscription at any time; cancellation takes effect at the end of the current billing cycle.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-text-main">3. Wiretapping Compliance Liability</h3>
          <p>
            Because our AI processes and records live audio calls, operators are legally responsible for ensuring proper disclosure. Operators must verify that call recordings are legal under their local jurisdiction and that their FOH phone systems play the required warning announcements prior to call routing.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-text-main">4. Liability Limitations</h3>
          <p>
            In no event shall AI Voice HQ be liable for lost profits, customer drop-offs, incorrect order fulfillment refunds, or kitchen prep errors arising from conversational misunderstandings. The service is provided &quot;as is&quot; with a 99.9% uptime target.
          </p>
        </div>
      </section>
    </div>
  );
}
