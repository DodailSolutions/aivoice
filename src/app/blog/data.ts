export type BlogSection = { heading: string; paragraphs: string[] };
export type BlogPost = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  sections: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-ai-phone-ordering-breaks-on-real-restaurant-menus",
    title: "Why AI Phone Ordering Breaks on Real Restaurant Menus",
    tag: "Restaurant AI",
    date: "May 13, 2026",
    readTime: "6 min read",
    author: "Vamsi Galigutta",
    excerpt:
      "The real test for restaurant voice AI is not whether it can answer the phone — it is whether it can handle 400+ SKU menus, rotating deals, modifiers, and the operational pressure of a rush.",
    sections: [
      {
        heading: "Voice is becoming a first-class ordering channel again",
        paragraphs: [
          "Phone ordering never went away — it just got harder to staff. Even with apps and online ordering, the phone is still the highest-bandwidth way for a guest to explain exactly what they want and resolve ambiguity in real time.",
          "Modern AI finally makes it possible to turn phone ordering from a bottleneck into an efficient operational channel, without pulling staff off the line to answer every call during a rush.",
        ],
      },
      {
        heading: "Simple menus are not the real benchmark",
        paragraphs: [
          "Most AI demos succeed because they use a tiny menu. Real takeout restaurants don't work that way — they run hundreds of SKUs, daily specials, meal-period categories, discounted bundles, and complex modifier rules.",
          "Handling that requires real engineering: the system has to provide enough menu context for a natural conversation while avoiding information overload, using dynamic context and tools strategically instead of dumping the whole menu into a prompt.",
        ],
      },
      {
        heading: "Accuracy is an operations problem",
        paragraphs: [
          "Getting an order right means handling dish names, accents, background noise, spice preferences, preparation styles, dietary restrictions, and special instructions — often all in the same call.",
          "The system has to balance speed with precision: confirm uncertain details, and ask clarifying questions exactly when the menu rules require them, not on every turn.",
        ],
      },
      {
        heading: "The phone call should leave an audit trail",
        paragraphs: [
          "Operators need transparency and measurement, not a black box. That means visibility into call volume, conversion rates, call types, and transfers — backed by recordings, transcripts, linked orders, and analytics.",
          "When every call is reviewable after the shift, operators can verify claims, settle disputes, and keep improving the deployment.",
        ],
      },
      {
        heading: "The launch model matters as much as the model",
        paragraphs: [
          "A capable model isn't enough on its own. Initial deployments need active monitoring and iterative tuning based on real call patterns and each restaurant's specific requirements during the first month.",
          "That managed launch is what turns a promising demo into a system the kitchen can rely on every night.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
