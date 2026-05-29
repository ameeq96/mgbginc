import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { ensureDatabaseUrl } from "../src/lib/database-url";
import { slugify } from "../src/lib/format";

ensureDatabaseUrl();

const prisma = new PrismaClient();

const heroImage =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=85";
const leadershipImage =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=85";
const planningImage =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85";
const researchImage =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85";
const agriTraitImage = "/agri-trait-gene-bank.png";

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@mgbginc.ca").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
  const adminPasswordHash = await bcrypt.hash(adminPassword, 12);
  const shouldResetAdminPassword = process.env.RESET_ADMIN_PASSWORD === "true";

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: shouldResetAdminPassword ? { passwordHash: adminPasswordHash } : {},
    create: {
      name: "MGBG Admin",
      email: adminEmail,
      role: "ADMIN",
      passwordHash: adminPasswordHash
    }
  });

  await prisma.siteSetting.upsert({
    where: { id: "site" },
    update: {
      logo: "/mgbg-logo-mark.png"
    },
    create: {
      id: "site",
      logo: "/mgbg-logo-mark.png",
      siteName: "MGBG Inc.",
      tagline: "Meta Genie Business Group",
      contactEmail: "hello@mgbginc.ca",
      phone: "+1 (555) 248-1120",
      address: "United States",
      linkedin: "https://www.linkedin.com",
      footerText:
        "MGBG Inc. enables organizations with consulting, project management, leadership development, and partnership strategy.",
      seoTitle: "MGBG Inc. | Strategic Business Consulting & Project Management",
      seoDescription:
        "Meta Genie Business Group helps organizations simplify strategy, manage projects, build leadership, and unlock sustainable business growth."
    }
  });

  await prisma.homeContent.upsert({
    where: { id: "home" },
    update: {},
    create: {
      id: "home",
      heroTitle: "Building Strategic Partnerships for Sustainable Business Growth",
      heroSubtitle:
        "MGBG Inc. helps organizations simplify strategy, manage projects, build leadership, and unlock profitable growth.",
      heroImage,
      servicesDescription:
        "From business planning to employee welfare strategy, our advisory model brings clarity to complex growth work.",
      projectsDescription:
        "A focused look at how MGBG supports planning, execution, research enablement, and operating capacity.",
      partnershipsDescription:
        "We connect business, research, and institutional partners around practical outcomes and measurable progress.",
      testimonialsDescription:
        "Leaders trust MGBG for measured judgment, organized execution, and strong partner communication.",
      expertsDescription:
        "Our experts blend consulting discipline with hands-on project, people, and partnership experience.",
      contactCtaDescription:
        "Start with a focused conversation about your strategy, team capacity, partnership opportunity, or grant pathway."
    }
  });

  const pages = [
    {
      slug: "about-us",
      title: "About MGBG Inc.",
      eyebrow: "Who We Are",
      summary:
        "MGBG Inc. is an enabling business group built for practical strategy, project execution, leadership development, and partnership growth.",
      heroImage: leadershipImage,
      content:
        "<p>Meta Genie Business Group helps organizations move from ambition to execution. We support business management, project management, leadership development, people management, and partnership strategy with a practical, high-trust approach.</p><p>Our work is designed for leaders who need a clearer plan, stronger operating rhythm, and capable partners around the table. We simplify complex requirements into strategic pathways that teams can understand, own, and execute.</p><h2>How We Work</h2><p>We listen first, map the operating reality, identify constraints, and build a practical plan for sustainable progress. Our consulting model combines strategic analysis, process mapping, communication planning, and hands-on implementation support.</p>"
    },
    {
      slug: "services",
      title: "Services",
      eyebrow: "What We Do",
      summary:
        "Consulting, planning, people development, research support, grant writing, process mapping, and partnership development.",
      heroImage: planningImage,
      content:
        "<p>MGBG services are built around the moments when organizations need clarity, structure, and credible execution support. Each engagement is shaped around business goals, stakeholder needs, and measurable outcomes.</p>"
    },
    {
      slug: "projects",
      title: "Projects & Portfolio",
      eyebrow: "Proof of Work",
      summary:
        "Explore representative projects across strategy, project planning, research partnerships, and operational capacity.",
      heroImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=85",
      content:
        "<p>Our project portfolio reflects the range of work required to turn strategy into coordinated execution, from stakeholder engagement and process mapping to planning documentation and partnership support.</p>"
    },
    {
      slug: "partnerships",
      title: "R&D and Partnerships",
      eyebrow: "Collaborative Growth",
      summary:
        "MGBG helps connect business, academic, and institutional partners around applied research and development opportunities.",
      heroImage: researchImage,
      content:
        "<p>Research and development partnerships help organizations test ideas, access expertise, build evidence, and create new growth pathways. MGBG supports partner identification, communication, proposal preparation, and coordination.</p>"
    },
    {
      slug: "experts",
      title: "Experts & Team",
      eyebrow: "People Behind the Work",
      summary:
        "A practical team of consultants, planners, facilitators, and development experts.",
      heroImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=85",
      content:
        "<p>Our team brings together strategic planning, people management, communications, research support, and project delivery experience.</p>"
    },
    {
      slug: "blog",
      title: "Blog & News",
      eyebrow: "Insights",
      summary:
        "Ideas and updates on leadership, strategy, project management, and partnership development.",
      heroImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85",
      content:
        "<p>Read practical insights from the MGBG team on building capacity, communicating clearly, and moving work through complex systems.</p>"
    },
    {
      slug: "testimonials",
      title: "Testimonials",
      eyebrow: "Client Trust",
      summary:
        "What clients and partners value about working with MGBG Inc.",
      heroImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=85",
      content:
        "<p>Trust is earned through clarity, reliability, and care in execution. These testimonials reflect the standard we work to maintain.</p>"
    },
    {
      slug: "contact",
      title: "Contact",
      eyebrow: "Start a Conversation",
      summary:
        "Reach out to discuss consulting, planning, partnership development, research support, or project management needs.",
      heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=85",
      content:
        "<p>Tell us what you are building, improving, or trying to clarify. The MGBG team will review your note and follow up with next steps.</p>"
    },
    {
      slug: "book-free-consultation",
      title: "Book Free Consultation",
      eyebrow: "Free Discovery Call",
      summary:
        "Schedule an initial conversation with MGBG to clarify needs, priorities, and possible next steps.",
      heroImage: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=85",
      content:
        "<p>Use this form to request a free consultation. Share the challenge, preferred timing, and service area you want to discuss.</p>"
    },
    {
      slug: "useful-links",
      title: "Useful Links",
      eyebrow: "Resources",
      summary:
        "Curated business, funding, leadership, and research resources for organizations and partners.",
      heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85",
      content:
        "<p>Browse curated links that may help with business planning, grant exploration, research collaboration, and operating capacity.</p>"
    },
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      eyebrow: "Legal",
      summary: "How MGBG Inc. handles website information and inquiry submissions.",
      heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85",
      content:
        "<p>MGBG Inc. collects information that visitors submit through contact, consultation, and newsletter forms. This information is used to respond to inquiries, provide requested services, and improve communication.</p><p>We do not sell personal information. Form submissions may be stored securely in our website database and may be shared internally with authorized team members for response and service delivery.</p><p>To request updates or removal of submitted information, contact us through the website contact form.</p>"
    },
    {
      slug: "terms-conditions",
      title: "Terms & Conditions",
      eyebrow: "Legal",
      summary: "Website terms for using MGBG Inc. content and inquiry tools.",
      heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85",
      content:
        "<p>By using this website, you agree to use its content and forms responsibly. Website content is provided for general informational purposes and does not create a consulting engagement unless confirmed in a written agreement.</p><p>MGBG Inc. may update website content, service descriptions, and these terms at any time. Unauthorized use, copying, or misuse of website materials is not permitted.</p>"
    }
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page
    });
  }

  const services = [
    {
      title: "Business Consulting",
      icon: "BriefcaseBusiness",
      image: planningImage,
      shortDescription:
        "Strategic advisory for organizations that need sharper priorities, operating clarity, and profitable growth pathways.",
      fullDescription:
        "We help leaders understand constraints, identify opportunities, build realistic strategy, and create execution plans that align people, processes, and partnerships.",
      order: 1,
      featured: true
    },
    {
      title: "Project Planning & Management",
      icon: "Milestone",
      image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=1400&q=85",
      shortDescription:
        "Structured planning, stakeholder coordination, timelines, reporting, and delivery support for complex initiatives.",
      fullDescription:
        "MGBG builds project plans, governance rhythms, communications, and practical management systems that keep work visible and accountable.",
      order: 2,
      featured: true
    },
    {
      title: "Leadership Development",
      icon: "UsersRound",
      image: leadershipImage,
      shortDescription:
        "Leadership programs and facilitation that build decision quality, team alignment, and management confidence.",
      fullDescription:
        "We design development sessions, leadership pathways, and coaching structures that help teams communicate better and lead through change.",
      order: 3,
      featured: true
    },
    {
      title: "People Management",
      icon: "Handshake",
      image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1400&q=85",
      shortDescription:
        "People systems, roles, communication expectations, and employee welfare planning for stronger organizational health.",
      fullDescription:
        "We support people management with role clarity, communication frameworks, performance rhythms, employee health considerations, and welfare planning.",
      order: 4,
      featured: true
    },
    {
      title: "Research & Development",
      icon: "FlaskConical",
      image: researchImage,
      shortDescription:
        "Research partnership support, applied innovation planning, documentation, and coordination between partners.",
      fullDescription:
        "We help organizations define research questions, connect with partners, prepare collaboration materials, and structure R&D initiatives.",
      order: 5,
      featured: true
    },
    {
      title: "Grant & Proposal Writing",
      icon: "FilePenLine",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=85",
      shortDescription:
        "Grant strategy, proposal writing, supporting documentation, and submission readiness for fundable opportunities.",
      fullDescription:
        "MGBG helps teams translate ideas into credible proposals with clear outcomes, budgets, work plans, partner roles, and evidence.",
      order: 6,
      featured: true
    },
    {
      title: "Business Planning",
      icon: "ChartNoAxesCombined",
      shortDescription:
        "Business plans, market assumptions, growth models, operating structures, and investor-ready narratives.",
      fullDescription:
        "We create business plans that connect mission, market, operating capacity, financial logic, and practical action.",
      order: 7,
      featured: false
    },
    {
      title: "Infrastructure & Capacity Planning",
      icon: "Network",
      shortDescription:
        "Capacity reviews and infrastructure planning that help organizations scale without losing operating control.",
      fullDescription:
        "We assess systems, staffing, workflows, and partner dependencies to build realistic capacity plans for growth.",
      order: 8,
      featured: false
    },
    {
      title: "Process Mapping",
      icon: "Workflow",
      shortDescription:
        "Clear process maps that expose bottlenecks, decision points, ownership, and improvement opportunities.",
      fullDescription:
        "We map how work actually moves through teams, then help redesign workflows around clarity, accountability, and speed.",
      order: 9,
      featured: false
    },
    {
      title: "Communication Strategies",
      icon: "MessagesSquare",
      shortDescription:
        "Stakeholder messaging, internal communication plans, and partner communication systems for complex initiatives.",
      fullDescription:
        "MGBG creates communication strategies that improve trust, reduce ambiguity, and keep stakeholders aligned.",
      order: 10,
      featured: false
    },
    {
      title: "Employee Health & Welfare Plans",
      icon: "HeartPulse",
      shortDescription:
        "Employee welfare planning that supports retention, resilience, and a healthier operating culture.",
      fullDescription:
        "We help leadership teams design welfare considerations, feedback loops, and practical employee support plans.",
      order: 11,
      featured: false
    }
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: slugify(service.title) },
      update: {},
      create: { ...service, slug: slugify(service.title), published: true }
    });
  }

  const projects = [
    {
      title: "R&D Partnership Readiness Program",
      clientName: "Agriculture and Applied Research Partners",
      category: "Research & Development",
      description:
        "Structured partner communication, proposal readiness, and operating planning for applied research collaboration.",
      image: researchImage,
      date: new Date("2025-08-15"),
      status: "Active",
      featured: true
    },
    {
      title: "Leadership Capacity Blueprint",
      clientName: "Growth-stage Service Organization",
      category: "Leadership Development",
      description:
        "Designed a leadership development path, manager communication rhythm, and accountability framework for a growing team.",
      image: leadershipImage,
      date: new Date("2025-06-02"),
      status: "Completed",
      featured: true
    },
    {
      title: "Grant Proposal Operating Kit",
      clientName: "Community Innovation Group",
      category: "Grant & Proposal Writing",
      description:
        "Built proposal templates, project narratives, budget logic, and evidence structure for repeat funding opportunities.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
      date: new Date("2025-03-20"),
      status: "Completed",
      featured: true
    }
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: slugify(project.title) },
      update: {},
      create: { ...project, slug: slugify(project.title), published: true }
    });
  }

  const partnerships = [
    {
      partnerName: "University of Agriculture, Faisalabad",
      description:
        "A research and development relationship focused on applied innovation, institutional knowledge exchange, and practical collaboration pathways.",
      country: "Pakistan",
      partnershipType: "Academic R&D Partnership",
      image: researchImage,
      featured: true
    },
    {
      partnerName: "Strategic Business Advisors Network",
      description:
        "A cross-functional advisory network supporting project planning, business development, and implementation capacity.",
      country: "United States",
      partnershipType: "Professional Network",
      image: planningImage,
      featured: true
    }
  ];

  for (const partnership of partnerships) {
    await prisma.partnership.upsert({
      where: { slug: slugify(partnership.partnerName) },
      update: {},
      create: { ...partnership, slug: slugify(partnership.partnerName), published: true }
    });
  }

  const experts = [
    {
      name: "Dr. Samina Qureshi",
      position: "R&D Partnership Lead",
      photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=85",
      bio: "Samina supports research collaboration, proposal framing, and partner alignment for applied innovation projects.",
      skills: "R&D Strategy, Proposal Development, Partnership Design",
      displayOrder: 1,
      featured: true
    },
    {
      name: "Michael Grant",
      position: "Project Management Advisor",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
      bio: "Michael helps teams build delivery plans, governance rhythms, reporting practices, and risk controls.",
      skills: "Project Planning, Risk Management, Stakeholder Reporting",
      displayOrder: 2,
      featured: true
    },
    {
      name: "Aisha Bennett",
      position: "Leadership & People Strategy Consultant",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
      bio: "Aisha designs leadership development, communication systems, and employee welfare planning for growing teams.",
      skills: "Leadership Development, People Management, Communications",
      displayOrder: 3,
      featured: true
    }
  ];

  for (const expert of experts) {
    await prisma.expert.upsert({
      where: { id: `${slugify(expert.name)}-seed` },
      update: {},
      create: { id: `${slugify(expert.name)}-seed`, ...expert, published: true }
    });
  }

  const testimonials = [
    {
      clientName: "Nadia Rahman",
      company: "Operations Director",
      rating: 5,
      text: "MGBG turned a complicated planning challenge into a practical roadmap our leadership team could actually use.",
      featured: true
    },
    {
      clientName: "James Porter",
      company: "Innovation Program Lead",
      rating: 5,
      text: "Their mix of project discipline and partnership thinking helped us organize stakeholders and move faster.",
      featured: true
    },
    {
      clientName: "Farah Siddiqui",
      company: "Executive Sponsor",
      rating: 5,
      text: "The team brought clarity, thoughtful communication, and a strong sense of ownership to every stage.",
      featured: true
    }
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `${slugify(testimonial.clientName)}-seed` },
      update: {},
      create: { id: `${slugify(testimonial.clientName)}-seed`, ...testimonial, published: true }
    });
  }

  const links = [
    {
      title: "U.S. Small Business Administration",
      url: "https://www.sba.gov/",
      category: "Business Planning",
      description: "Tools and guidance for business planning, funding, and growth.",
      order: 1
    },
    {
      title: "Grants.gov",
      url: "https://www.grants.gov/",
      category: "Grant Research",
      description: "A central source for U.S. federal grant opportunity discovery.",
      order: 2
    },
    {
      title: "Project Management Institute",
      url: "https://www.pmi.org/",
      category: "Project Management",
      description: "Professional project management standards, resources, and learning.",
      order: 3
    }
  ];

  for (const link of links) {
    await prisma.usefulLink.upsert({
      where: { id: `${slugify(link.title)}-seed` },
      update: {},
      create: { id: `${slugify(link.title)}-seed`, ...link, published: true }
    });
  }

  await prisma.mediaAsset.upsert({
    where: { id: "mgbg-logo-mark-seed" },
    update: {
      filename: "mgbg-logo-mark.png",
      url: "/uploads/mgbg-logo-mark.png",
      mimeType: "image/png",
      size: 185243,
      altText: "MGBG shield logo mark"
    },
    create: {
      id: "mgbg-logo-mark-seed",
      filename: "mgbg-logo-mark.png",
      url: "/uploads/mgbg-logo-mark.png",
      mimeType: "image/png",
      size: 185243,
      altText: "MGBG shield logo mark"
    }
  });

  await prisma.mediaAsset.upsert({
    where: { id: "mgbg-logo-lockup-seed" },
    update: {
      filename: "mgbg-logo-lockup.png",
      url: "/uploads/mgbg-logo-lockup.png",
      mimeType: "image/png",
      size: 206228,
      altText: "Meta Genie Business Group Inc logo lockup"
    },
    create: {
      id: "mgbg-logo-lockup-seed",
      filename: "mgbg-logo-lockup.png",
      url: "/uploads/mgbg-logo-lockup.png",
      mimeType: "image/png",
      size: 206228,
      altText: "Meta Genie Business Group Inc logo lockup"
    }
  });

  await prisma.mediaAsset.upsert({
    where: { id: "agri-trait-gene-bank-image-seed" },
    update: {
      url: agriTraitImage,
      filename: "agri-trait-gene-bank.png",
      mimeType: "image/png",
      size: 560027,
      altText: "Agri Trait and Gene Bank agriculture biotechnology collage"
    },
    create: {
      id: "agri-trait-gene-bank-image-seed",
      filename: "agri-trait-gene-bank.png",
      url: agriTraitImage,
      mimeType: "image/png",
      size: 560027,
      altText: "Agri Trait and Gene Bank agriculture biotechnology collage"
    }
  });

  const posts = [
    {
      title: "MGBG Launches Agri Trait & Gene Bank",
      category: "News",
      tags: "agriculture,genetics,biotechnology,agri trait gene bank",
      excerpt:
        "MGBG launched an Agricultural Genetics and Biotech Division named Agri Trait & Gene Bank.",
      featuredImage: agriTraitImage,
      content:
        "<p>MGBG launched an Agricultural Genetics and Biotech Division named <strong>Agri Trait &amp; Gene Bank</strong>.</p><h2>Purpose of the Division</h2><p>Agri Trait &amp; Gene Bank develops and stores functional crop germplasm with novel genes and traits. Its mission is to capture natural diversity and engineer genetics to develop polished germplasm containing high-value traits.</p><h2>Value for Crops and Breeding Programs</h2><p>The designed crop plants will add value to the ecosystem and commercial landscape by reducing the effects of genetic erosion and assisting breeding programs in developing crop varieties that are resilient to biotic and abiotic stresses, resistant to diseases, and enhanced in nutritional value.</p><h2>Scientific and Industry Leadership</h2><p>Agri Trait &amp; Gene Bank will be run by experienced, highly qualified scientists, industry and regulatory experts, and visionary investors. The program will use the latest techniques in genetic engineering and biotechnology in its trait-finding missions.</p>",
      published: true,
      publishedAt: new Date("2026-04-26")
    },
    {
      title: "How Strategic Partnerships Create Practical Growth",
      category: "Partnerships",
      tags: "partnerships,strategy,growth",
      excerpt:
        "Strong partnerships work when shared goals, operating roles, and communication rhythms are clear from the beginning.",
      featuredImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
      content:
        "<p>Strategic partnerships create value when organizations define the outcome, clarify who owns each part of the work, and keep communication predictable. The strongest partnerships are built around complementary strengths and visible accountability.</p><h2>Start With Shared Outcomes</h2><p>Partnerships become practical when every party can name the goal, the value being created, and the responsibilities required to move from conversation to execution. MGBG helps organizations translate early interest into a structured pathway with clear priorities.</p><h2>Build an Operating Rhythm</h2><p>A strong partnership needs more than a memorandum or introduction. It needs governance, communication, timelines, documentation, and a rhythm for decisions. These systems keep stakeholders aligned and reduce confusion as work becomes more complex.</p><h2>Turn Collaboration Into Progress</h2><p>MGBG helps partners move from initial interest to structured collaboration through planning, documentation, and practical coordination. The result is a partnership model that can support sustainable growth, funding readiness, research activity, and operational capacity.</p>",
      published: true,
      publishedAt: new Date("2025-10-05")
    },
    {
      title: "Process Mapping as a Leadership Tool",
      category: "Operations",
      tags: "process,leadership,operations",
      excerpt:
        "Process maps do more than document workflows. They help leadership teams see friction and choose better interventions.",
      featuredImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85",
      content:
        "<p>When teams map how work actually moves, hidden delays and unclear decisions become visible. That visibility gives leaders a better basis for prioritizing change.</p><p>A useful map shows roles, handoffs, decision points, and the information needed to keep work moving.</p>",
      published: true,
      publishedAt: new Date("2025-09-10")
    }
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: slugify(post.title) },
      update: {
        ...post,
        seoTitle: post.title,
        seoDescription: post.excerpt
      },
      create: {
        ...post,
        slug: slugify(post.title),
        seoTitle: post.title,
        seoDescription: post.excerpt
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
