"use client";

import { useEffect } from "react";

/**
 * Progressive-enhancement scroll reveal.
 * Adds `.reveal-on` to <html> so the hidden state in CSS only ever applies
 * when JS is running, then reveals `[data-reveal]` elements as they enter view.
 * Supports per-section staggering via `data-reveal-stagger` on a parent
 * (staggers its direct `[data-reveal]` children).
 * Uses MutationObserver to dynamically observe elements added via client-side routing.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      return;
    }

    root.classList.add("reveal-on");

    const observedElements = new WeakSet<Element>();

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

    // Helper to setup a group's stagger delays
    const setupStagger = (group: HTMLElement) => {
      const step = Number(group.dataset.revealStagger) || 80;
      group
        .querySelectorAll<HTMLElement>(":scope > [data-reveal]")
        .forEach((child, i) => {
          child.style.setProperty("--reveal-delay", `${i * step}ms`);
        });
    };

    // Process all elements in a node/subtree
    const processNode = (node: Node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const element = node as HTMLElement;

      // Handle self reveal
      if (element.matches("[data-reveal]") && !observedElements.has(element)) {
        observedElements.add(element);
        observer.observe(element);
      }

      // Handle self stagger
      if (element.matches("[data-reveal-stagger]")) {
        setupStagger(element);
      }

      // Handle descendants
      element.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (!observedElements.has(el)) {
          observedElements.add(el);
          observer.observe(el);
        }
      });

      element.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
        setupStagger(el);
      });
    };

    // Initial check on mount
    processNode(document.body);

    // Observe changes in the document body
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          processNode(node);
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      root.classList.remove("reveal-on");
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

