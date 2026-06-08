import type { CaseArtKey } from "@/app/case-studies/data";

const ICONS: Record<CaseArtKey, React.ReactNode> = {
  // Multi-location chain — connected nodes / network
  network: (
    <>
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path strokeLinecap="round" d="M12 7.4 6.6 15.8M12 7.4l5.4 8.4M7.4 18h9.2" />
    </>
  ),
  // Catering & scheduled orders — calendar
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.2" />
      <path strokeLinecap="round" d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 14 2 2 4-4" />
    </>
  ),
  // Deals & specials — stacked tags
  tags: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7.5a2 2 0 0 1 2-2h4.2a2 2 0 0 1 1.4.6l6 6a2 2 0 0 1 0 2.8l-4.2 4.2a2 2 0 0 1-2.8 0l-6-6a2 2 0 0 1-.6-1.4V7.5Z"
      />
      <circle cx="8" cy="9.6" r="1.2" />
    </>
  ),
  // Call-tuned operations — waveform
  waveform: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2 12h2.2l1.6-5 2.4 11 2.3-14 2.4 17 2-9 1.6 4H22"
    />
  ),
};

const PATTERNS: Record<"v" | "h", string> = {
  v: "[background-image:repeating-linear-gradient(90deg,currentColor_0_1px,transparent_1px_24px)]",
  h: "[background-image:repeating-linear-gradient(0deg,currentColor_0_1px,transparent_1px_22px)]",
};

export default function CaseStudyArt({
  art,
  index,
  className = "",
  pattern = "v",
  iconClass = "w-14 h-14",
  numberClass = "text-6xl",
}: {
  art: CaseArtKey;
  index: string;
  className?: string;
  pattern?: "v" | "h";
  iconClass?: string;
  numberClass?: string;
}) {
  return (
    <div
      className={`relative bg-linear-to-br from-orange/20 via-orange/5 to-charcoal-3 overflow-hidden flex items-center justify-center ${className}`}
    >
      <div className={`absolute inset-0 opacity-[0.07] text-text-main ${PATTERNS[pattern]}`} />
      {/* Big watermark number */}
      <span
        className={`absolute right-4 bottom-2 font-heading font-black text-orange/15 leading-none ${numberClass}`}
        aria-hidden
      >
        {index}
      </span>
      {/* Themed icon */}
      <svg
        className={`relative text-orange ${iconClass}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        {ICONS[art]}
      </svg>
    </div>
  );
}
