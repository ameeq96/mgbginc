import type { AdminField, AdminResourceConfig } from "@/types/admin";

const commonPublishFields: AdminField[] = [
  { name: "featured", label: "Featured", type: "checkbox" },
  { name: "published", label: "Published", type: "checkbox", defaultValue: true }
];

export const serviceConfig: AdminResourceConfig = {
  title: "Services",
  description: "Manage consulting, planning, leadership, R&D, and capacity services shown across the site.",
  endpoint: "/api/admin/services",
  noun: "service",
  fields: [
    { name: "title", label: "Service title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", help: "Leave blank to generate automatically." },
    { name: "icon", label: "Icon name", type: "text", placeholder: "BriefcaseBusiness" },
    { name: "image", label: "Image", type: "media" },
    { name: "shortDescription", label: "Short description", type: "textarea", required: true },
    { name: "fullDescription", label: "Full description", type: "richtext", required: true },
    { name: "order", label: "Display order", type: "number", defaultValue: 0 },
    ...commonPublishFields,
    { name: "seoTitle", label: "SEO title", type: "text" },
    { name: "seoDescription", label: "SEO description", type: "textarea" }
  ],
  columns: [
    { key: "title", label: "Title" },
    { key: "featured", label: "Featured", type: "boolean" },
    { key: "published", label: "Published", type: "boolean" },
    { key: "order", label: "Order" }
  ]
};

export const projectConfig: AdminResourceConfig = {
  title: "Projects / Portfolio",
  description: "Manage projects, client work, partner activity, categories, imagery, status, and featured placement.",
  endpoint: "/api/admin/projects",
  noun: "project",
  fields: [
    { name: "title", label: "Project title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", help: "Leave blank to generate automatically." },
    { name: "clientName", label: "Client / partner name", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "description", label: "Description", type: "richtext", required: true },
    { name: "image", label: "Image / logo", type: "media" },
    { name: "date", label: "Date", type: "date" },
    { name: "status", label: "Status", type: "select", defaultValue: "Active", options: [
      { label: "Active", value: "Active" },
      { label: "Completed", value: "Completed" },
      { label: "Planning", value: "Planning" },
      { label: "Paused", value: "Paused" }
    ] },
    ...commonPublishFields
  ],
  columns: [
    { key: "title", label: "Title" },
    { key: "clientName", label: "Client" },
    { key: "status", label: "Status", type: "status" },
    { key: "featured", label: "Featured", type: "boolean" }
  ]
};

export const partnershipConfig: AdminResourceConfig = {
  title: "Partnerships / R&D",
  description: "Manage research, business, academic, and institutional partnerships.",
  endpoint: "/api/admin/partnerships",
  noun: "partnership",
  fields: [
    { name: "partnerName", label: "Partner name", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", help: "Leave blank to generate automatically." },
    { name: "logo", label: "Logo", type: "media" },
    { name: "description", label: "Description", type: "richtext", required: true },
    { name: "country", label: "Country / location", type: "text" },
    { name: "partnershipType", label: "Partnership type", type: "text" },
    { name: "image", label: "Related image", type: "media" },
    { name: "files", label: "Related files", type: "textarea", help: "Use one URL per line or comma-separated URLs." },
    ...commonPublishFields
  ],
  columns: [
    { key: "partnerName", label: "Partner" },
    { key: "country", label: "Location" },
    { key: "partnershipType", label: "Type" },
    { key: "published", label: "Published", type: "boolean" }
  ]
};

export const expertConfig: AdminResourceConfig = {
  title: "Experts / Team",
  description: "Manage expert profiles, photos, bios, skills, social links, and display order.",
  endpoint: "/api/admin/experts",
  noun: "expert",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "position", label: "Position", type: "text", required: true },
    { name: "photo", label: "Photo", type: "media" },
    { name: "bio", label: "Bio", type: "richtext", required: true },
    { name: "skills", label: "Skills", type: "textarea", help: "Comma-separated skills." },
    { name: "linkedin", label: "LinkedIn", type: "url" },
    { name: "email", label: "Email", type: "email" },
    { name: "displayOrder", label: "Display order", type: "number", defaultValue: 0 },
    ...commonPublishFields
  ],
  columns: [
    { key: "photo", label: "Photo", type: "image" },
    { key: "name", label: "Name" },
    { key: "position", label: "Position" },
    { key: "published", label: "Published", type: "boolean" }
  ]
};

export const blogConfig: AdminResourceConfig = {
  title: "Blog / News",
  description: "Create and publish news, insights, categories, tags, featured images, and SEO content.",
  endpoint: "/api/admin/blog-posts",
  noun: "post",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", help: "Leave blank to generate automatically." },
    { name: "featuredImage", label: "Featured image", type: "media" },
    { name: "category", label: "Category", type: "text" },
    { name: "tags", label: "Tags", type: "textarea", help: "Comma-separated tags." },
    { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "content", label: "Content editor", type: "richtext", required: true },
    { name: "seoTitle", label: "SEO title", type: "text" },
    { name: "seoDescription", label: "SEO description", type: "textarea" },
    { name: "publishedAt", label: "Publish date/time", type: "datetime" },
    { name: "published", label: "Published", type: "checkbox" }
  ],
  columns: [
    { key: "featuredImage", label: "Image", type: "image" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "published", label: "Published", type: "boolean" }
  ]
};

export const testimonialConfig: AdminResourceConfig = {
  title: "Testimonials",
  description: "Manage testimonials, ratings, client/company names, and featured placement.",
  endpoint: "/api/admin/testimonials",
  noun: "testimonial",
  fields: [
    { name: "clientName", label: "Client name", type: "text", required: true },
    { name: "company", label: "Company", type: "text" },
    { name: "photo", label: "Photo / logo", type: "media" },
    { name: "rating", label: "Rating", type: "number", defaultValue: 5 },
    { name: "text", label: "Testimonial text", type: "textarea", required: true },
    ...commonPublishFields
  ],
  columns: [
    { key: "clientName", label: "Client" },
    { key: "company", label: "Company" },
    { key: "rating", label: "Rating", type: "rating" },
    { key: "published", label: "Published", type: "boolean" }
  ]
};

export const usefulLinkConfig: AdminResourceConfig = {
  title: "Useful Links",
  description: "Manage useful resource links and categories.",
  endpoint: "/api/admin/useful-links",
  noun: "link",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "url", label: "URL", type: "url", required: true },
    { name: "category", label: "Category", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "order", label: "Display order", type: "number", defaultValue: 0 },
    { name: "published", label: "Published", type: "checkbox", defaultValue: true }
  ],
  columns: [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "url", label: "URL" },
    { key: "published", label: "Published", type: "boolean" }
  ]
};

export const pageConfig: AdminResourceConfig = {
  title: "Page Builder",
  description: "Edit About, Contact, Privacy Policy, Terms, Useful Links, and other dynamic page content.",
  endpoint: "/api/admin/pages",
  noun: "page",
  fields: [
    { name: "title", label: "Page title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "eyebrow", label: "Eyebrow", type: "text" },
    { name: "summary", label: "Hero summary", type: "textarea" },
    { name: "content", label: "Page content", type: "richtext", required: true },
    { name: "heroImage", label: "Hero image", type: "media" },
    { name: "seoTitle", label: "SEO title", type: "text" },
    { name: "seoDescription", label: "SEO description", type: "textarea" },
    { name: "order", label: "Order", type: "number", defaultValue: 0 },
    { name: "published", label: "Published", type: "checkbox", defaultValue: true }
  ],
  columns: [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "published", label: "Published", type: "boolean" },
    { key: "updatedAt", label: "Updated", type: "date" }
  ]
};
