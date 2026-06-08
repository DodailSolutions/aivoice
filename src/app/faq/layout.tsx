import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | AI Voice HQ",
  description: "Get answers to common questions about AI phone ordering integrations, accuracy on complex menus, POS sync (Toast, Clover, Square), catering handoffs, and pricing.",
  keywords: "FAQ restaurant voice assistant, AI phone order integrations, Toast POS voice integration help, Clover POS voice ordering",
  alternates: {
    canonical: "https://aivoicehq.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | AI Voice HQ",
    description: "Get answers to common questions about AI phone ordering, POS sync (Toast, Clover, Square), and catering handoffs.",
    url: "https://aivoicehq.com/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does the AI know my menu?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We configure the AI around your real menu, including items, modifiers, prices, special instructions, meal-period categories, and daily deals. We are built for large menus, including restaurants with 400+ SKUs."
                }
              },
              {
                "@type": "Question",
                "name": "What POS systems do you integrate with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AI Voice HQ integrates with the POS systems your staff already use — including Toast, Clover, Square, NCR Aloha, Lightspeed, and TouchBistro — and routes completed orders into your existing workflow."
                }
              },
              {
                "@type": "Question",
                "name": "How many calls can the AI handle at once?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AI Voice HQ handles up to 20 simultaneous calls per location. During a rush, every caller can be answered without forcing staff to juggle the phone."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to change my phone number?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. We work with your existing phone number through call forwarding. Your customers call the same number they always have, and they just get answered instantly now."
                }
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
