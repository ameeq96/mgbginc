import { cache } from "react";
import {
  fallbackExperts,
  fallbackHomeContent,
  fallbackPages,
  fallbackPartnerships,
  fallbackPosts,
  fallbackProjects,
  fallbackServices,
  fallbackSiteSettings,
  fallbackTestimonials,
  fallbackUsefulLinks
} from "@/lib/fallback-content";
import { prisma } from "@/lib/prisma";

async function safeQuery<T>(label: string, query: () => Promise<T>, fallback: T) {
  try {
    return await query();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Using fallback content for ${label}.`, error);
    }
    return fallback;
  }
}

export const getSiteSettings = cache(async () => {
  return safeQuery("site settings", () => prisma.siteSetting.findUnique({ where: { id: "site" } }), fallbackSiteSettings);
});

export const getHomeContent = cache(async () => {
  return safeQuery("home content", () => prisma.homeContent.findUnique({ where: { id: "home" } }), fallbackHomeContent);
});

export const getPage = cache(async (slug: string) => {
  return safeQuery(
    `page ${slug}`,
    () => prisma.page.findFirst({ where: { slug, published: true } }),
    fallbackPages.find((page) => page.slug === slug) || null
  );
});

export const getFeaturedServices = cache(async (take = 6) => {
  return safeQuery(
    "featured services",
    () =>
      prisma.service.findMany({
        where: { published: true, featured: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        take
      }),
    fallbackServices.slice(0, take)
  );
});

export const getServices = cache(async () => {
  return safeQuery(
    "services",
    () =>
      prisma.service.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }]
      }),
    fallbackServices
  );
});

export const getFeaturedProjects = cache(async (take = 4) => {
  return safeQuery(
    "featured projects",
    () =>
      prisma.project.findMany({
        where: { published: true, featured: true },
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
        take
      }),
    fallbackProjects.slice(0, take)
  );
});

export const getProjects = cache(async () => {
  return safeQuery(
    "projects",
    () =>
      prisma.project.findMany({
        where: { published: true },
        orderBy: [{ date: "desc" }, { createdAt: "desc" }]
      }),
    fallbackProjects
  );
});

export const getPartnerships = cache(async (take?: number) => {
  return safeQuery(
    "partnerships",
    () =>
      prisma.partnership.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        ...(take ? { take } : {})
      }),
    take ? fallbackPartnerships.slice(0, take) : fallbackPartnerships
  );
});

export const getExperts = cache(async (take?: number) => {
  return safeQuery(
    "experts",
    () =>
      prisma.expert.findMany({
        where: { published: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
        ...(take ? { take } : {})
      }),
    take ? fallbackExperts.slice(0, take) : fallbackExperts
  );
});

export const getTestimonials = cache(async (take?: number) => {
  return safeQuery(
    "testimonials",
    () =>
      prisma.testimonial.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        ...(take ? { take } : {})
      }),
    take ? fallbackTestimonials.slice(0, take) : fallbackTestimonials
  );
});

export const getPosts = cache(async (take?: number) => {
  return safeQuery(
    "posts",
    () =>
      prisma.blogPost.findMany({
        where: { published: true },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        ...(take ? { take } : {})
      }),
    take ? fallbackPosts.slice(0, take) : fallbackPosts
  );
});

export const getPost = cache(async (slug: string) => {
  return safeQuery(
    `post ${slug}`,
    () => prisma.blogPost.findFirst({ where: { slug, published: true } }),
    fallbackPosts.find((post) => post.slug === slug) || null
  );
});

export const getUsefulLinks = cache(async () => {
  return safeQuery(
    "useful links",
    () =>
      prisma.usefulLink.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { title: "asc" }]
      }),
    fallbackUsefulLinks
  );
});
