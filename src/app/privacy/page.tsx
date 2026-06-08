import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AI Voice HQ",
  description: "Review our CCPA and GDPR privacy policies, data collection guidelines, and call recording storage consent disclosures.",
};

export default function PrivacyPage() {
  return (
    <div className="relative pt-24 pb-16">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-sm text-text-muted leading-relaxed">
        <div className="space-y-3">
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
            PRIVACY POLICY
          </h1>
          <p className="text-xs text-text-muted font-mono">Last Updated: May 2026</p>
        </div>

        <p>
          AI Voice HQ (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides an automated conversational voice assistant platform that acts on behalf of restaurant operators to handle phone ordering and reservation queries. This Privacy Policy describes how we collect, use, store, and share information when you visit our website (aivoicehq.com) or interact with our voice AI telephone services.
        </p>

        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-text-main">1. Information We Collect</h3>
          <p>
            We collect information that identifies or relates to you (&quot;Personal Information&quot;) when you place order tickets or request dining tables:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Caller Records:</strong> Name, phone number, physical delivery address, pickup scheduling preferences, and payment information (e.g., credit card links).
            </li>
            <li>
              <strong>Audio Recordings & Transcripts:</strong> Under wiretapping consent regulations, calls processed by our AI are recorded, digitized, and transcribed for order verification and transcription quality assurance.
            </li>
            <li>
              <strong>Usage Data:</strong> IP addresses, browser specifications, and cookie trackers collected when navigating our digital portals.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-text-main">2. Call Recording & Consent Disclosures</h3>
          <p>
            Under state and federal wiretapping statutes (e.g., California Invasion of Privacy Act), call recording requires clear disclosure. AI Voice HQ operates as an agent for restaurant operators:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Automated voice disclosures must be activated at the start of any telephone interaction (&quot;This call is processed and recorded by AI Voice HQ to take your order...&quot;).
            </li>
            <li>
              By continuing the call, you express consent to voice recording, transcription, and logging.
            </li>
            <li>
              Recording archives are kept securely for 24 months for billing validation and order accuracy audits, after which they are deleted.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-text-main">3. Data Sharing & Security</h3>
          <p>
            We do not sell personal data. Reclaimed ordering data is shared exclusively with the restaurant you called and the POS networks (e.g., Toast, Square) necessary to print prep tickets. All payment operations route through PCI-DSS compliant channels; credit card numbers are never logged in cleartext or audio archives.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-text-main">4. CCPA/GDPR Compliance Rights</h3>
          <p>
            Depending on your jurisdiction, you possess rights to request access to call recording logs, request deletion of name/address records, or opt-out of data profiling. Contact us at{" "}
            <a href="mailto:inquiries@aivoicehq.com" suppressHydrationWarning className="text-orange underline font-mono">
              inquiries@aivoicehq.com
            </a>{" "}
            to exercise your data deletion privileges.
          </p>
        </div>
      </section>
    </div>
  );
}
