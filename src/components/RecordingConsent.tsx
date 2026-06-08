"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RecordingConsent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("recording-disclosure-acknowledged");
    if (!consent) {
      // Small timeout to show after cookie banner or load delay
      const timer = setTimeout(() => {
        setVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem("recording-disclosure-acknowledged", "true");
    setVisible(false);
  };

  if (pathname?.startsWith("/admin") || !visible) return null;

  return (
    <div className="fixed bottom-24 right-4 left-4 md:bottom-6 md:right-6 max-w-md bg-charcoal-3/95 backdrop-blur-xl border border-border-subtle p-5 rounded-2xl shadow-card z-[998] flex flex-col gap-4 animate-slideUp">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange animate-ping" />
          <h4 className="font-heading font-semibold text-text-main text-sm">
            Call Recording Notice
          </h4>
        </div>
        <p className="text-xs text-text-muted leading-relaxed">
          AI Voice HQ acts as an agent on behalf of our restaurant partners. Phone calls processed by our AI are recorded, transcribed, and analyzed for order verification and billing validation in compliance with local wiretapping laws. Read our{" "}
          <Link href="/privacy" className="text-orange underline hover:text-orange/95 font-medium">
            Privacy Policy
          </Link>{" "}
          to review your rights.
        </p>
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={handleAcknowledge}
          className="px-4 py-1.5 rounded-full bg-charcoal-2 border border-orange-border hover:border-orange text-orange text-xs font-bold transition-colors"
        >
          Acknowledge
        </button>
      </div>
    </div>
  );
}
