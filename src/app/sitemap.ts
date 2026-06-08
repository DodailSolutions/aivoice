import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "./blog/data";
import { CASE_STUDIES } from "./case-studies/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aivoicehq.com";

  // Static routes
  const staticRoutes = [
    "",
    "/product",
    "/pricing",
    "/integrations",
    "/menus",
    "/faq",
    "/blog",
    "/case-studies",
    "/privacy",
    "/security",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic case study routes
  const caseStudyRoutes = CASE_STUDIES.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
}
