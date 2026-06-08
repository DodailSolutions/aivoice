import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost } from "../data";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Blog | AI Voice HQ" };
  return { title: `${post.title} | AI Voice HQ`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="relative overflow-hidden pt-24 pb-16">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-muted hover:text-orange transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All posts
        </Link>

        <header className="space-y-4 mb-10">
          <div className="flex items-center gap-3 text-2xs font-mono text-text-muted">
            <span className="text-orange font-bold uppercase tracking-widest">{post.tag}</span>
            <span className="w-1 h-1 bg-border-subtle rounded-full" />
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-border-subtle rounded-full" />
            <span>{post.readTime}</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-main tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-text-muted">
            By <span className="text-text-main font-semibold">{post.author}</span>
          </p>
          <p className="text-lg text-text-muted leading-relaxed border-l-4 border-orange pl-5 py-1">
            {post.excerpt}
          </p>
        </header>

        <div className="space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-base text-text-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-linear-to-br from-charcoal-2 to-charcoal border border-border-active/40 p-8 sm:p-10 rounded-3xl text-center space-y-5 mt-14">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-main">
            SEE IT ON YOUR OWN MENU
          </h2>
          <p className="text-text-muted text-sm max-w-lg mx-auto leading-relaxed">
            Book a 15-minute call and we will walk through exactly how AI Voice HQ would handle your menu and modifiers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://cal.com/vgaligutta/15min"
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 btn-shine bg-orange text-charcoal font-bold text-sm rounded-full shadow-glow hover:bg-orange/95 transition-all"
            >
              Book Your Meeting
            </Link>
            <Link
              href="/menus"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-charcoal-3 border border-border-subtle hover:border-text-muted text-text-main font-bold text-sm rounded-full transition-all"
            >
              Try the Live Demo
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
