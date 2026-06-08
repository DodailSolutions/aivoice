import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "./data";

export const metadata: Metadata = {
  title: "Restaurant Voice AI Blog | AI Voice HQ",
  description:
    "Technical guides and operational insights on restaurant voice AI — why phone ordering breaks on 400+ SKU menus, accuracy as an operations problem, and the managed-launch model.",
};

export default function BlogPage() {
  return (
    <div className="relative overflow-hidden pt-24 pb-16">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="badge-orange mx-auto w-fit">Industry Insights</div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-text-main tracking-tight">
            RESTAURANT VOICE AI BLOG
          </h1>
          <p className="text-text-muted text-base sm:text-lg">
            Technical audits, operational guides, and thought leadership on voice AI and restaurant automation.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-charcoal-2 border border-border-subtle shadow-soft rounded-2xl overflow-hidden hover-scale-card flex flex-col"
            >
              <div className="relative h-44 bg-linear-to-br from-charcoal-3 via-charcoal-3 to-orange/10 border-b border-border-subtle flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(0deg,currentColor_0_1px,transparent_1px_24px)] text-text-main" />
                <svg className="w-14 h-14 text-orange relative" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="p-8 space-y-3 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-2xs font-mono text-text-muted">
                  <span className="text-orange font-bold uppercase tracking-widest">{post.tag}</span>
                  <span className="w-1 h-1 bg-border-subtle rounded-full" />
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-border-subtle rounded-full" />
                  <span>{post.readTime}</span>
                </div>
                <h2 className="font-heading font-bold text-xl text-text-main group-hover:text-orange transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-text-muted leading-relaxed flex-1">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
                  Read post
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
