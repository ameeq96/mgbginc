import type { MetadataRoute } from "next";
import { fallbackPages, fallbackPosts } from "@/lib/fallback-content";
import { absoluteUrl } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([
    prisma.page.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } })
  ]).catch(() => [
    fallbackPages.map(({ slug, updatedAt }) => ({ slug, updatedAt })),
    fallbackPosts.map(({ slug, updatedAt }) => ({ slug, updatedAt }))
  ]);

  const staticRoutes = [
    "",
    "about",
    "services",
    "projects",
    "partnerships",
    "experts",
    "blog",
    "testimonials",
    "contact",
    "book-free-consultation",
    "useful-links",
    "privacy-policy",
    "terms-conditions"
  ];

  const pageRoutes = pages
    .map((page) => publicPathForPage(page.slug))
    .filter((value): value is string => Boolean(value));

  return [
    ...Array.from(new Set([...staticRoutes, ...pageRoutes])).map((path) => ({
      url: absoluteUrl(`/${path}`),
      lastModified: new Date()
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt
    }))
  ];
}

function publicPathForPage(slug: string) {
  const map: Record<string, string> = {
    "about-us": "about",
    services: "services",
    projects: "projects",
    partnerships: "partnerships",
    experts: "experts",
    blog: "blog",
    testimonials: "testimonials",
    contact: "contact",
    "book-free-consultation": "book-free-consultation",
    "useful-links": "useful-links",
    "privacy-policy": "privacy-policy",
    "terms-conditions": "terms-conditions"
  };
  return map[slug];
}
