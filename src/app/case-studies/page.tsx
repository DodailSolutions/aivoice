import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CASE_STUDIES } from "./data";
import CaseStudyArt from "@/components/CaseStudyArt";

export const metadata: Metadata = {
  title: "Case Studies | AI Voice HQ",
  description:
    "How AI Voice HQ rolled out across a multi-location restaurant chain — answering every call during the rush, then tuning each location for catering, combos and specials, and call-driven operations.",
};

export default function CaseStudiesPage() {
  const [feature, ...locations] = CASE_STUDIES;

  return (
    <div className="relative overflow-hidden pt-24 pb-16">
      {/* Background glow blobs */}
      <div className="absolute top-24 left-12 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-blob" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-float-blob" style={{ animationDelay: "-4s" }} />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-orange/5 rounded-full blur-[130px] pointer-events-none -z-10 animate-float-blob" style={{ animationDelay: "-8s" }} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="badge-orange mx-auto w-fit">Operational Proof</div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-text-main tracking-tight">
            ONE CHAIN, ONE PROBLEM: THE RUSH
          </h1>
          <p className="text-text-muted text-base sm:text-lg">
            The same platform rolled out across a multi-location chain — answering every call during peak hours, then tuned at each location to its real operations.
          </p>
        </div>

        {/* Featured (chain overview) */}
        <Link
          href={`/case-studies/${feature.slug}`}
          suppressHydrationWarning
          className="group block bg-charcoal-2 border border-border-subtle shadow-soft rounded-3xl overflow-hidden hover-scale-card mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <CaseStudyArt
              art={feature.art}
              index={feature.index}
              className="lg:col-span-5 min-h-[200px] border-b lg:border-b-0 lg:border-r border-border-subtle"
              iconClass="w-20 h-20"
              numberClass="text-8xl"
            />
            <div className="lg:col-span-7 p-8 sm:p-10 space-y-3">
              <div className="text-2xs font-mono font-bold uppercase tracking-widest text-orange">
                {feature.location} · {feature.focus}
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-main group-hover:text-orange transition-colors">
                {feature.title}
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">{feature.intro}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange pt-1">
                Read the rollout
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </Link>

        {/* Operators intro */}
        <div className="max-w-3xl mb-8 space-y-2">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-main">
            THE OPERATORS
          </h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            Same platform, different operations. The three owners below are representative — each drove a different part of the product.
          </p>
        </div>

        {/* Location grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {locations.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              suppressHydrationWarning
              className="group bg-charcoal-2 border border-border-subtle shadow-soft rounded-2xl overflow-hidden hover-scale-card flex flex-col"
            >
              <div className="relative h-64 overflow-hidden border-b border-border-subtle">
                {study.photo ? (
                  <Image
                    src={study.photo}
                    alt={`${study.owner}, owner — ${study.location}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <CaseStudyArt art={study.art} index={study.index} pattern="h" className="h-full" />
                )}
                {/* Location badge */}
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-2xs font-mono font-bold uppercase tracking-widest text-white">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {study.location}
                </span>
                {/* Watermark number */}
                <span className="absolute bottom-1 right-3 font-heading font-black text-5xl text-white/85 drop-shadow-lg leading-none">
                  {study.index}
                </span>
              </div>
              <div className="p-7 space-y-1.5 flex flex-col flex-1">
                {study.owner && (
                  <h3 className="font-heading font-extrabold text-2xl text-text-main">{study.owner}</h3>
                )}
                <div className="text-2xs font-mono font-bold uppercase tracking-widest text-text-muted">
                  Owner — {study.location.split(",")[0]}
                </div>
                <div className="text-2xs font-mono font-bold uppercase tracking-widest text-orange pt-1">
                  {study.focus}
                </div>
                <p className="font-heading font-bold text-base text-text-main pt-1 group-hover:text-orange transition-colors">
                  {study.title}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange pt-2 mt-auto">
                  Read case study
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-linear-to-br from-charcoal-2 to-charcoal border border-border-active/40 p-8 sm:p-12 rounded-3xl text-center space-y-6">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-main">
            WANT TO RUN A TRIAL AT YOUR RESTAURANT?
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
            Your first month is completely free. Import your menu, try the automated call handler, and see clean tickets reach the kitchen with zero risk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://cal.com/vgaligutta/15min"
              target="_blank"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 btn-shine bg-orange text-charcoal font-bold text-sm rounded-full shadow-glow hover:bg-orange/95 transition-all"
            >
              Start Your Free Trial
            </Link>
            <Link
              href="/pricing"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-charcoal-3 border border-border-subtle hover:border-text-muted text-text-main font-bold text-sm rounded-full transition-all"
            >
              Calculate Your Savings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
