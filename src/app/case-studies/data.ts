export type CaseArtKey = "network" | "calendar" | "tags" | "waveform";

export type CaseStudy = {
  slug: string;
  index: string;
  art: CaseArtKey;
  photo?: string;
  location: string;
  owner?: string;
  focus: string;
  title: string;
  subtitle: string;
  intro: string;
  problem: { heading: string; body: string };
  solutions: { title: string; body: string }[];
  results: string[];
  quote?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "multi-location-rollout",
    index: "01",
    art: "network",
    location: "Multi-Location Chain",
    focus: "The shared problem",
    title: "One Chain, One Problem: The Rush",
    subtitle: "ONE CHAIN, ONE PROBLEM: THE RUSH",
    intro:
      "A multi-location restaurant chain faced a common challenge during peak hours — incoming calls went unanswered while staff were occupied, resulting in lost orders across all locations.",
    problem: {
      heading: "The busiest hour was the leakiest",
      body: "During dinner rushes, no one could answer the phone because everyone was heads-down on the line. Calls rang out while staff served existing customers — orders weren't captured, not because of poor service, but because there was no service available to answer.",
    },
    solutions: [
      {
        title: "Deployed chain-wide",
        body: "AI Voice HQ was rolled out across the entire chain, answering every call on the first ring and routing orders into each location's existing workflow — removing the rush as a barrier to capturing orders.",
      },
      {
        title: "Tuned per location",
        body: "Rather than a one-size-fits-all approach, each location drove its own iteration: Omaha on catering and advance orders, St. Louis on combos and specials, Richmond on call-flow tuning.",
      },
      {
        title: "Shared back to the chain",
        body: "Capabilities developed at a single location became chain-wide features, so every store benefited from what each location learned.",
      },
    ],
    results: [
      "Every call answered, even during peak rush periods",
      "Single unified platform deployed across multiple locations",
      "Each location's workflow customized to its operations",
      "Per-location capabilities promoted to chain-wide features",
    ],
  },
  {
    slug: "omaha-catering",
    index: "02",
    art: "calendar",
    photo: "https://www.aivoicehq.com/case-studies/srinivas.jpg",
    location: "Omaha, NE",
    owner: "Srinivas",
    focus: "Catering & Scheduled Orders",
    title: "Catering Calls That Do Not Get Dropped",
    subtitle: "CATERING CALLS THAT DO NOT GET DROPPED",
    intro:
      "Omaha receives substantial phone volume for forward-looking orders — catering requests, scheduled pickups, and advance party orders — that don't fit a standard immediate-order flow.",
    problem: {
      heading: "Forward-looking orders kept getting dropped",
      body: "Catering and advance orders are a relationship, not a transaction. The previous system funneled everything through an immediate-order flow and dropped the calls that mattered most.",
    },
    solutions: [
      {
        title: "Catering detection & handoff",
        body: "When a caller asks about catering, the AI confirms intent and transfers the call to staff — treating catering as a relationship, not a transaction.",
      },
      {
        title: "Validated scheduling",
        body: "For future orders, the system captures pickup date and time and validates them against the location's real operating hours, including holiday overrides and timezone handling.",
      },
      {
        title: "Location-specific configuration",
        body: "Greeting, questions, and handoff rules were tuned to Omaha's calling patterns and operational needs.",
      },
    ],
    results: [
      "Catering calls now reach a person instead of a generic order flow",
      "Scheduled orders validated against real store hours and holidays",
      "Future-order behavior configurable per location",
      "Conversation patterns documented and refined from real calls",
    ],
  },
  {
    slug: "st-louis-deals",
    index: "03",
    art: "tags",
    photo: "https://www.aivoicehq.com/case-studies/surender.jpg",
    location: "St. Louis, MO",
    owner: "Surender",
    focus: "Deals & Specials",
    title: "A Menu Built on Combos and Specials",
    subtitle: "A MENU BUILT ON COMBOS AND SPECIALS",
    intro:
      "At St. Louis, the entire ordering model centers on deals rather than individual items. Customers order combos, specials, and spice-required items as packages, not separate line items.",
    problem: {
      heading: "Deals, not line items",
      body: "Traditional systems treat combo components as separate items, which produced incorrect orders and pricing errors on a menu where almost everything is a deal.",
    },
    solutions: [
      {
        title: "Combo & special recognition",
        body: "The system models combo components and automatically collapses regular items into the appropriate deal when an order qualifies.",
      },
      {
        title: "Loose item remapping",
        body: "When callers order special components without naming the deal, the cart builder remaps those items onto the correct special — including spice-level selections.",
      },
      {
        title: "Accurate pricing",
        body: "Paid variants are handled correctly, duplicate charges on multi-quantity orders are eliminated, and specials are embedded in the menu schema so kitchen tickets match the ordered deal.",
      },
    ],
    results: [
      "Combos and specials recognized during calls",
      "Loose items automatically remapped into correct deals",
      "Spice-required specials handled without extra prompting",
      "Accurate pricing on paid variants and multi-quantity orders",
    ],
  },
  {
    slug: "richmond-operations",
    index: "04",
    art: "waveform",
    photo: "https://www.aivoicehq.com/case-studies/ram.jpg",
    location: "Richmond, VA",
    owner: "Ram",
    focus: "Operations Shaped by Real Calls",
    title: "Tuned by the Calls Themselves",
    subtitle: "TUNED BY THE CALLS THEMSELVES",
    intro:
      "The most valuable improvements in Richmond came not from feature requests, but from analyzing actual call recordings to find where conversations stalled or orders failed despite clear intent.",
    problem: {
      heading: "The calls told us what to build",
      body: "Reviewing real recordings surfaced patterns where conversations stalled, calls dropped, or orders failed to process cleanly even though the customer's intent was clear.",
    },
    solutions: [
      {
        title: "Idle nudges",
        body: "The AI generates contextual prompts when a caller goes silent, keeping conversation momentum based on observed call patterns.",
      },
      {
        title: "Anonymous caller handling",
        body: "Blocked or anonymous calls get dedicated routing with a clear message and deliberate transfer rules — treated as an intentional decision, not an edge case.",
      },
      {
        title: "Off-hours smart transfers",
        body: "Live-agent transfers remain available outside business hours, with auto-transfer rules accounting for closing time and recent order history.",
      },
      {
        title: "Order recovery",
        body: "When a call ends with a detected but incomplete order, the system reconstructs cart details from the audio to prevent the order being lost.",
      },
    ],
    results: [
      "Idle nudges keep conversations active",
      "Deliberate handling for anonymous callers",
      "Smart transfers tuned to closing time and history",
      "Incomplete orders recovered from call audio",
    ],
    quote:
      "Some of the most useful changes did not come from a feature request — they came from reviewing real Richmond calls.",
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
