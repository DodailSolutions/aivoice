import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudy } from "../data";
import CaseStudyArt from "@/components/CaseStudyArt";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study | AI Voice HQ" };
  return {
    title: `${study.title} | AI Voice HQ Case Study`,
    description: study.intro,
  };
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <div className="relative overflow-hidden pt-24 pb-16">
      {/* Background glow blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-blob" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-orange/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-float-blob" style={{ animationDelay: "-6s" }} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/case-studies"
          suppressHydrationWarning
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-muted hover:text-orange transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All case studies
        </Link>

        {/* Header */}
        <header className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-2xs font-mono font-bold uppercase tracking-widest">
            <span className="text-orange">Case Study {study.index}</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-muted">{study.location}</span>
            {study.owner && (
              <>
                <span className="text-text-muted">·</span>
                <span className="text-text-muted">Owner: {study.owner}</span>
              </>
            )}
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-main tracking-tight leading-tight">
            {study.title}
          </h1>
          <div className="badge-orange w-fit">{study.focus}</div>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed pt-2">
            {study.intro}
          </p>
        </header>

        {/* Banner — owner photo when available, illustration otherwise */}
        {study.photo ? (
          <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-border-subtle shadow-soft mb-10 bg-charcoal-3">
            <Image
              src={study.photo}
              alt={`${study.owner}, owner — ${study.location}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover object-top"
            />
            {/* Scrim for caption legibility */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/70 to-transparent pointer-events-none" />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-2xs font-mono font-bold uppercase tracking-widest text-white">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {study.location}
            </span>
            {study.owner && (
              <span className="absolute bottom-4 left-4 font-heading font-extrabold text-2xl text-white drop-shadow-lg">
                {study.owner}
                <span className="block text-2xs font-mono font-bold uppercase tracking-widest text-white/80 mt-0.5">
                  Owner — {study.location.split(",")[0]}
                </span>
              </span>
            )}
          </div>
        ) : (
          <CaseStudyArt
            art={study.art}
            index={study.index}
            className="h-48 sm:h-56 rounded-2xl border border-border-subtle shadow-soft mb-10"
            iconClass="w-20 h-20"
            numberClass="text-8xl"
          />
        )}

        {/* Problem */}
        <section className="bg-charcoal-2 border border-border-subtle shadow-soft rounded-2xl p-8 mb-8 space-y-3">
          <div className="text-2xs font-mono font-bold uppercase tracking-widest text-danger">
            The Problem
          </div>
          <h2 className="font-heading font-bold text-xl text-text-main">{study.problem.heading}</h2>
          <p className="text-sm text-text-muted leading-relaxed">{study.problem.body}</p>
        </section>

        {/* Quote */}
        {study.quote && (
          <blockquote className="relative bg-charcoal-2 border-l-4 border-orange pl-6 pr-4 py-5 my-10 rounded-r-2xl shadow-soft">
            <p className="font-heading font-semibold text-xl sm:text-2xl text-text-main leading-snug italic">
              &ldquo;{study.quote}&rdquo;
            </p>
          </blockquote>
        )}

        {/* Solutions */}
        <section className="space-y-4 mb-10">
          <h2 className="font-heading font-extrabold text-2xl text-text-main">What we built</h2>
          <div className="space-y-4">
            {study.solutions.map((s, i) => (
              <div
                key={s.title}
                className="bg-charcoal-2 border border-border-subtle shadow-soft rounded-2xl p-6 flex gap-4"
              >
                <div className="w-9 h-9 flex-shrink-0 bg-orange/10 rounded-lg flex items-center justify-center font-heading font-bold text-orange">
                  {i + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-base text-text-main">{s.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="bg-charcoal-2 border border-border-subtle shadow-soft rounded-2xl p-8 mb-12 space-y-4">
          <div className="text-2xs font-mono font-bold uppercase tracking-widest text-success">
            The Outcome
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {study.results.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-text-muted leading-relaxed">
                <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-linear-to-br from-charcoal-2 to-charcoal border border-border-active/40 p-8 sm:p-10 rounded-3xl text-center space-y-5">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-main">
            WANT THIS AT YOUR RESTAURANT?
          </h2>
          <p className="text-text-muted text-sm max-w-lg mx-auto leading-relaxed">
            We launch in 48 hours and tune the deployment to your menu and calling patterns during the first month.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://cal.com/vgaligutta/15min"
              target="_blank"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 btn-shine bg-orange text-charcoal font-bold text-sm rounded-full shadow-glow hover:bg-orange/95 transition-all"
            >
              Book Your Meeting
            </Link>
            <Link
              href="/menus"
              suppressHydrationWarning
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
