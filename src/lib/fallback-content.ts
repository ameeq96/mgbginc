import type {
  BlogPost,
  Expert,
  HomeContent,
  Page,
  Partnership,
  Project,
  Service,
  SiteSetting,
  Testimonial,
  UsefulLink
} from "@prisma/client";

const now = new Date("2026-04-26T00:00:00.000Z");

const heroImage =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=85";
const planningImage =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85";
const leadershipImage =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=85";
const researchImage =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85";
const agriTraitImage = "/agri-trait-gene-bank.png";

export const fallbackSiteSettings: SiteSetting = {
  id: "site",
  logo: "/mgbg-logo-mark.png",
  siteName: "MGBG Inc.",
  tagline: "Meta Genie Business Group",
  contactEmail: "hello@mgbginc.com",
  phone: "+1 (555) 248-1120",
  address: "United States",
  linkedin: "https://www.linkedin.com",
  facebook: null,
  instagram: null,
  x: null,
  youtube: null,
  footerText:
    "MGBG Inc. enables organizations with consulting, project management, leadership development, R&D support, and partnership strategy.",
  seoTitle: "MGBG Inc. | Strategic Business Consulting & Project Management",
  seoDescription:
    "Meta Genie Business Group helps organizations simplify strategy, manage projects, build leadership, and unlock sustainable business growth.",
  createdAt: now,
  updatedAt: now
};

export const fallbackHomeContent: HomeContent = {
  id: "home",
  heroTitle: "Building Strategic Partnerships for Sustainable Business Growth",
  heroSubtitle:
    "MGBG Inc. helps organizations simplify strategy, manage projects, build leadership, and unlock profitable growth.",
  heroImage,
  heroPrimaryText: "Book Free Consultation",
  heroPrimaryLink: "/book-free-consultation",
  heroSecondaryText: "Explore Services",
  heroSecondaryLink: "/services",
  servicesEnabled: true,
  servicesHeading: "Advisory That Moves Work Forward",
  servicesDescription:
    "From business planning to employee welfare strategy, our advisory model brings clarity to complex growth work.",
  projectsEnabled: true,
  projectsHeading: "Selected Projects",
  projectsDescription:
    "A focused look at how MGBG supports planning, execution, research enablement, and operating capacity.",
  partnershipsEnabled: true,
  partnershipsHeading: "Research, Development & Partnerships",
  partnershipsDescription:
    "We connect business, research, and institutional partners around practical outcomes and measurable progress.",
  testimonialsEnabled: true,
  testimonialsHeading: "Trusted By Leaders",
  testimonialsDescription:
    "Leaders trust MGBG for measured judgment, organized execution, and strong partner communication.",
  expertsEnabled: true,
  expertsHeading: "Experts With Practical Range",
  expertsDescription:
    "Our experts blend consulting discipline with hands-on project, people, and partnership experience.",
  newsletterEnabled: true,
  contactCtaHeading: "Need a strategic partner for your next stage?",
  contactCtaDescription:
    "Start with a focused conversation about your strategy, team capacity, partnership opportunity, or grant pathway.",
  createdAt: now,
  updatedAt: now
};

export const fallbackPages: Page[] = [
  page("about-us", "About MGBG Inc.", "Who We Are", leadershipImage),
  page("services", "Services", "What We Do", planningImage),
  page("projects", "Projects & Portfolio", "Proof of Work", "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=85"),
  page("partnerships", "R&D and Partnerships", "Collaborative Growth", researchImage),
  page("experts", "Experts & Team", "People Behind the Work", heroImage),
  page("blog", "Blog & News", "Insights", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85"),
  page("testimonials", "Testimonials", "Client Trust", "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=85"),
  page("contact", "Contact", "Start a Conversation", "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=85"),
  page("book-free-consultation", "Book Free Consultation", "Free Discovery Call", "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=85"),
  page("useful-links", "Useful Links", "Resources", "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85"),
  page("privacy-policy", "Privacy Policy", "Legal", "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85"),
  page("terms-conditions", "Terms & Conditions", "Legal", "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85")
];

export const fallbackServices: Service[] = [
  service("Business Consulting", "BriefcaseBusiness", "Strategic advisory for sharper priorities, operating clarity, and profitable growth pathways.", 1),
  service("Project Planning & Management", "Milestone", "Structured planning, stakeholder coordination, reporting, and delivery support for complex initiatives.", 2),
  service("Leadership Development", "UsersRound", "Leadership programs that build decision quality, team alignment, and management confidence.", 3),
  service("People Management", "Handshake", "People systems, communication expectations, and employee welfare planning for stronger teams.", 4),
  service("Research & Development", "FlaskConical", "Research partnership support, applied innovation planning, documentation, and coordination.", 5),
  service("Grant & Proposal Writing", "FilePenLine", "Clear proposal writing and grant documentation support for fundable, practical opportunities.", 6)
];

export const fallbackProjects: Project[] = [
  project("Growth Strategy Roadmap", "Business Planning", planningImage, 1),
  project("Research Partnership Enablement", "R&D Partnerships", researchImage, 2),
  project("Leadership Capacity Program", "Leadership", leadershipImage, 3)
];

export const fallbackPartnerships: Partnership[] = [
  partnership("Applied Research Network", "United States", "Research Collaboration"),
  partnership("Institutional Capacity Partner", "North America", "Capacity Planning"),
  partnership("Innovation Grant Alliance", "Global", "Proposal Development")
];

export const fallbackExperts: Expert[] = [
  expert("Amina Clarke", "Strategy & Partnerships Lead", leadershipImage, "Strategy, Partnerships, Business Planning", 1),
  expert("Daniel Reed", "Project Management Advisor", planningImage, "Project Delivery, Process Mapping, Reporting", 2),
  expert("Nadia Rahman", "Leadership Development Consultant", heroImage, "Leadership, People Management, Communication", 3)
];

export const fallbackTestimonials: Testimonial[] = [
  testimonial("Nadia Rahman", "Operations Director", "MGBG turned a complicated planning challenge into a practical roadmap our leadership team could actually use."),
  testimonial("James Porter", "Innovation Program Lead", "Their mix of project discipline and partnership thinking helped us organize stakeholders and move faster."),
  testimonial("Sarah Kim", "Executive Director", "The team brought clarity, structure, and calm execution support when our internal capacity was stretched.")
];

export const fallbackPosts: BlogPost[] = [
  {
    id: "fallback-agri-trait",
    title: "MGBG Launches Agri Trait & Gene Bank",
    slug: "mgbg-launches-agri-trait-and-gene-bank",
    featuredImage: agriTraitImage,
    category: "News",
    tags: "Agriculture, Biotechnology, R&D, Partnerships",
    excerpt:
      "MGBG launched an Agricultural Genetics and Biotech Division named Agri Trait & Gene Bank.",
    content:
      "<p>MGBG has launched an Agricultural Genetics and Biotech Division named Agri Trait & Gene Bank.</p><h2>About Agri Trait & Gene Bank</h2><p>The division is dedicated to developing and storing functional crop germplasm with novel genes and traits of agronomic importance.</p><p>Its focus includes crop resilience, disease resistance, improved nutrition, and applied biotechnology partnerships that help move agricultural innovation toward practical use.</p><h2>Partnership Platform</h2><p>The initiative brings together scientists, industry experts, regulatory insight, and investment support to advance sustainable agricultural growth.</p>",
    seoTitle: "MGBG Launches Agri Trait & Gene Bank",
    seoDescription:
      "MGBG launches Agri Trait & Gene Bank, an agricultural genetics and biotech division focused on crop germplasm, novel genes, and applied partnerships.",
    published: true,
    publishedAt: now,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "fallback-strategic-partnerships",
    title: "How Strategic Partnerships Create Practical Growth",
    slug: "how-strategic-partnerships-create-practical-growth",
    featuredImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
    category: "Partnerships",
    tags: "Strategy, Partnerships, Growth",
    excerpt:
      "Strong partnerships work when shared goals, operating roles, and communication rhythms are clear from the beginning.",
    content:
      "<p>Strategic partnerships create practical growth when they are built around shared goals, clear ownership, and reliable communication.</p><h2>Alignment First</h2><p>Partners need to understand what success looks like, who owns each part of the work, and how decisions will be made.</p><h2>Execution Rhythm</h2><p>A strong partnership has reporting, stakeholder updates, and delivery checkpoints that keep momentum visible.</p>",
    seoTitle: "How Strategic Partnerships Create Practical Growth",
    seoDescription:
      "A practical MGBG perspective on partnership strategy, operating roles, communication rhythm, and business growth.",
    published: true,
    publishedAt: new Date("2025-10-05T00:00:00.000Z"),
    createdAt: new Date("2025-10-05T00:00:00.000Z"),
    updatedAt: now
  }
];

export const fallbackUsefulLinks: UsefulLink[] = [
  usefulLink("U.S. Small Business Administration", "https://www.sba.gov", "Business"),
  usefulLink("Grants.gov", "https://www.grants.gov", "Funding"),
  usefulLink("National Science Foundation", "https://www.nsf.gov", "Research")
];

function page(slug: string, title: string, eyebrow: string, heroImage: string): Page {
  return {
    id: `fallback-${slug}`,
    slug,
    title,
    eyebrow,
    summary:
      "MGBG Inc. helps organizations simplify strategy, manage projects, build leadership, and unlock sustainable growth.",
    content:
      "<p>Meta Genie Business Group helps organizations move from ambition to execution with practical consulting, project management, leadership development, people management, research support, and partnership strategy.</p>",
    heroImage,
    seoTitle: title,
    seoDescription:
      "MGBG Inc. provides business consulting, project management, leadership development, R&D support, planning, and partnership development.",
    published: true,
    order: 0,
    createdAt: now,
    updatedAt: now
  };
}

function service(title: string, icon: string, shortDescription: string, order: number): Service {
  const slug = title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    id: `fallback-service-${order}`,
    title,
    slug,
    icon,
    image: null,
    shortDescription,
    fullDescription: shortDescription,
    order,
    featured: true,
    published: true,
    seoTitle: title,
    seoDescription: shortDescription,
    createdAt: now,
    updatedAt: now
  };
}

function project(title: string, category: string, image: string, order: number): Project {
  return {
    id: `fallback-project-${order}`,
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    clientName: "MGBG Client Partner",
    category,
    description:
      "A representative engagement focused on planning clarity, stakeholder alignment, execution rhythm, and measurable operating progress.",
    image,
    date: now,
    status: "Completed",
    featured: true,
    published: true,
    createdAt: now,
    updatedAt: now
  };
}

function partnership(partnerName: string, country: string, partnershipType: string): Partnership {
  return {
    id: `fallback-partner-${partnerName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    partnerName,
    slug: partnerName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    logo: null,
    description:
      "A collaborative relationship focused on practical strategy, applied research, capacity building, and stakeholder coordination.",
    country,
    partnershipType,
    image: null,
    files: null,
    featured: true,
    published: true,
    createdAt: now,
    updatedAt: now
  };
}

function expert(name: string, position: string, photo: string, skills: string, order: number): Expert {
  return {
    id: `fallback-expert-${order}`,
    name,
    position,
    photo,
    bio:
      "An MGBG expert focused on practical planning, clear communication, and disciplined implementation support for organizations and partners.",
    skills,
    linkedin: null,
    email: null,
    displayOrder: order,
    featured: true,
    published: true,
    createdAt: now,
    updatedAt: now
  };
}

function testimonial(clientName: string, company: string, text: string): Testimonial {
  return {
    id: `fallback-testimonial-${clientName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    clientName,
    company,
    photo: null,
    rating: 5,
    text,
    featured: true,
    published: true,
    createdAt: now,
    updatedAt: now
  };
}

function usefulLink(title: string, url: string, category: string): UsefulLink {
  return {
    id: `fallback-link-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title,
    url,
    category,
    description: `Useful ${category.toLowerCase()} resource for planning and partnership research.`,
    order: 0,
    published: true,
    createdAt: now,
    updatedAt: now
  };
}
