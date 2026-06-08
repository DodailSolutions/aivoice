"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CookieBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("cookies-accepted");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  };

  if (pathname?.startsWith("/admin") || !visible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:bottom-6 md:left-6 max-w-md bg-charcoal-3/95 backdrop-blur-xl border border-border-subtle p-5 rounded-2xl shadow-card z-[999] flex flex-col gap-4 animate-slideUp">
      <div className="space-y-1">
        <h4 className="font-heading font-semibold text-text-main text-sm">
          Cookie Consent
        </h4>
        <p className="text-xs text-text-muted leading-relaxed">
          We use cookies to optimize site features, compile analytics, and deliver a personalized experience. By closing this banner, you agree to our cookie policy.
        </p>
      </div>
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => setVisible(false)}
          className="px-3.5 py-1.5 rounded-full border border-border-subtle text-xs font-semibold text-text-muted hover:text-text-main transition-colors"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-1.5 rounded-full bg-orange text-charcoal text-xs font-bold hover:bg-orange/90 transition-colors shadow-glow"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
}
