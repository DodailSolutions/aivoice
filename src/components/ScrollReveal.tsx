"use client";

import { useEffect } from "react";

/**
 * Progressive-enhancement scroll reveal.
 * Adds `.reveal-on` to <html> so the hidden state in CSS only ever applies
 * when JS is running, then reveals `[data-reveal]` elements as they enter view.
 * Supports per-section staggering via `data-reveal-stagger` on a parent
 * (staggers its direct `[data-reveal]` children).
 */
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    root.classList.add("reveal-on");

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    // Apply stagger delays for grouped children
    document
      .querySelectorAll<HTMLElement>("[data-reveal-stagger]")
      .forEach((group) => {
        const step = Number(group.dataset.revealStagger) || 80;
        group
          .querySelectorAll<HTMLElement>(":scope > [data-reveal]")
          .forEach((child, i) => {
            child.style.setProperty("--reveal-delay", `${i * step}ms`);
          });
      });

    if (prefersReduced) {
      els.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
