import { z } from "zod";
import { slugify } from "@/lib/format";

const nullableString = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => (typeof value === "string" && value.trim() ? value.trim() : null));

const optionalString = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => (typeof value === "string" ? value.trim() : ""));

const booleanField = z.coerce.boolean().default(false);
const numberField = z.coerce.number().int().default(0);
const nullableDate = z
  .union([z.string(), z.date(), z.null(), z.undefined()])
  .transform((value) => {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  });

const serviceSchema = z.object({
  title: z.string().min(2),
  slug: optionalString,
  icon: nullableString,
  image: nullableString,
  shortDescription: z.string().min(10),
  fullDescription: z.string().min(10),
  order: numberField,
  featured: booleanField,
  published: booleanField.default(true),
  seoTitle: nullableString,
  seoDescription: nullableString
});

const projectSchema = z.object({
  title: z.string().min(2),
  slug: optionalString,
  clientName: nullableString,
  category: nullableString,
  description: z.string().min(10),
  image: nullableString,
  date: nullableDate,
  status: z.string().min(2).default("Active"),
  featured: booleanField,
  published: booleanField.default(true)
});

const partnershipSchema = z.object({
  partnerName: z.string().min(2),
  slug: optionalString,
  logo: nullableString,
  description: z.string().min(10),
  country: nullableString,
  partnershipType: nullableString,
  image: nullableString,
  files: nullableString,
  featured: booleanField,
  published: booleanField.default(true)
});

const expertSchema = z.object({
  name: z.string().min(2),
  position: z.string().min(2),
  photo: nullableString,
  bio: z.string().min(10),
  skills: nullableString,
  linkedin: nullableString,
  email: nullableString,
  displayOrder: numberField,
  featured: booleanField,
  published: booleanField.default(true)
});

const postSchema = z.object({
  title: z.string().min(2),
  slug: optionalString,
  featuredImage: nullableString,
  category: nullableString,
  tags: nullableString,
  excerpt: nullableString,
  content: z.string().min(10),
  seoTitle: nullableString,
  seoDescription: nullableString,
  published: booleanField,
  publishedAt: nullableDate
});

const testimonialSchema = z.object({
  clientName: z.string().min(2),
  company: nullableString,
  photo: nullableString,
  rating: z.coerce.number().int().min(1).max(5).default(5),
  text: z.string().min(10),
  featured: booleanField,
  published: booleanField.default(true)
});

const usefulLinkSchema = z.object({
  title: z.string().min(2),
  url: z.string().url(),
  category: nullableString,
  description: nullableString,
  order: numberField,
  published: booleanField.default(true)
});

const pageSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  eyebrow: nullableString,
  summary: nullableString,
  content: z.string().min(10),
  heroImage: nullableString,
  seoTitle: nullableString,
  seoDescription: nullableString,
  published: booleanField.default(true),
  order: numberField
});

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: nullableString,
  company: nullableString,
  subject: nullableString,
  message: z.string(),
  replied: booleanField
});

const bookingSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: nullableString,
  company: nullableString,
  serviceInterest: nullableString,
  message: z.string(),
  preferredAt: nullableDate,
  status: z.enum(["NEW", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"]),
  notes: nullableString
});

export type ResourceKey =
  | "services"
  | "projects"
  | "partnerships"
  | "experts"
  | "blog-posts"
  | "testimonials"
  | "useful-links"
  | "pages"
  | "contact-submissions"
  | "consultation-requests";

type ResourceDefinition = {
  model: string;
  schema: z.ZodTypeAny;
  orderBy: Record<string, "asc" | "desc"> | Record<string, "asc" | "desc">[];
  slugFrom?: string;
  adminOnlyDelete?: boolean;
};

export const resourceDefinitions: Record<ResourceKey, ResourceDefinition> = {
  services: {
    model: "service",
    schema: serviceSchema,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    slugFrom: "title"
  },
  projects: {
    model: "project",
    schema: projectSchema,
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    slugFrom: "title"
  },
  partnerships: {
    model: "partnership",
    schema: partnershipSchema,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    slugFrom: "partnerName"
  },
  experts: {
    model: "expert",
    schema: expertSchema,
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }]
  },
  "blog-posts": {
    model: "blogPost",
    schema: postSchema,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    slugFrom: "title"
  },
  testimonials: {
    model: "testimonial",
    schema: testimonialSchema,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
  },
  "useful-links": {
    model: "usefulLink",
    schema: usefulLinkSchema,
    orderBy: [{ order: "asc" }, { title: "asc" }]
  },
  pages: {
    model: "page",
    schema: pageSchema,
    orderBy: [{ order: "asc" }, { title: "asc" }],
    slugFrom: "title"
  },
  "contact-submissions": {
    model: "contactSubmission",
    schema: contactSchema,
    orderBy: { createdAt: "desc" },
    adminOnlyDelete: true
  },
  "consultation-requests": {
    model: "consultationRequest",
    schema: bookingSchema,
    orderBy: { createdAt: "desc" },
    adminOnlyDelete: true
  }
};

export function getResourceDefinition(resource: string) {
  if (resource in resourceDefinitions) {
    return resourceDefinitions[resource as ResourceKey];
  }
  return null;
}

export function normalizeResourceData(definition: ResourceDefinition, input: unknown) {
  const parsed = definition.schema.parse(input) as Record<string, unknown>;
  if (definition.slugFrom) {
    const currentSlug = typeof parsed.slug === "string" ? parsed.slug : "";
    const source = String(parsed[definition.slugFrom] || "");
    parsed.slug = currentSlug ? slugify(currentSlug) : slugify(source);
  }
  if ("published" in parsed && typeof parsed.published === "undefined") {
    parsed.published = true;
  }
  if ("publishedAt" in parsed && parsed.published && !parsed.publishedAt) {
    parsed.publishedAt = new Date();
  }
  return parsed;
}
