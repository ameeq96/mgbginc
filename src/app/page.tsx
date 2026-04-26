import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, LineChart, ShieldCheck, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/site/ButtonLink";
import {
  ExpertCard,
  PartnershipCard,
  PostCard,
  ProjectCard,
  ServiceCard,
  TestimonialCard
} from "@/components/site/Cards";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  getExperts,
  getFeaturedProjects,
  getFeaturedServices,
  getHomeContent,
  getPartnerships,
  getPosts,
  getTestimonials
} from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [home, services, projects, partnerships, testimonials, experts, posts] = await Promise.all([
    getHomeContent(),
    getFeaturedServices(6),
    getFeaturedProjects(3),
    getPartnerships(3),
    getTestimonials(3),
    getExperts(3),
    getPosts(2)
  ]);

  const heroTitle = home?.heroTitle || "Building Strategic Partnerships for Sustainable Business Growth";
  const heroSubtitle =
    home?.heroSubtitle ||
    "MGBG Inc. helps organizations simplify strategy, manage projects, build leadership, and unlock profitable growth.";
  const heroImage =
    home?.heroImage ||
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=85";
  const proofPoints: { title: string; copy: string; icon: LucideIcon }[] = [
    { title: "Strategy", copy: "Simplified planning pathways for growth and execution.", icon: ShieldCheck },
    { title: "Projects", copy: "Project rhythm, accountability, and stakeholder alignment.", icon: LineChart },
    { title: "Partnerships", copy: "Business, research, and institutional collaboration support.", icon: Globe2 }
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink pt-32 text-white">
        <img src={heroImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,20,35,0.96),rgba(7,20,35,0.78),rgba(7,20,35,0.42))]" />
        <div className="container-shell grid min-h-[820px] content-center pb-16 pt-24">
          <div className="max-w-4xl animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
              Meta Genie Business Group
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-6xl xl:text-7xl">
              {heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.78] md:text-xl">{heroSubtitle}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={home?.heroPrimaryLink || "/book-free-consultation"}>
                {home?.heroPrimaryText || "Book Free Consultation"}
              </ButtonLink>
              <ButtonLink href={home?.heroSecondaryLink || "/services"} variant="ghost">
                {home?.heroSecondaryText || "Explore Services"}
              </ButtonLink>
            </div>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {proofPoints.map(({ title, copy, icon: Icon }) => (
              <div key={title} className="rounded-lg border border-white/[0.15] bg-white/10 p-5 backdrop-blur-xl">
                <Icon className="h-5 w-5 text-gold" />
                <h2 className="mt-4 font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/[0.68]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {posts.length ? (
        <section className="bg-paper pb-8 pt-24">
          <div className="container-shell">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading eyebrow="News" title="News & Updates" />
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-teal">
                View all posts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {home?.servicesEnabled !== false ? (
        <section className={`bg-paper ${posts.length ? "pb-24 pt-8" : "py-24"}`}>
          <div className="container-shell">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Services"
                title={home?.servicesHeading || "Advisory That Moves Work Forward"}
                description={home?.servicesDescription}
              />
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-teal">
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {services.length ? (
              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <EmptyState label="Services will appear here once they are published." />
            )}
          </div>
        </section>
      ) : null}

      {home?.projectsEnabled !== false ? (
        <section className="bg-mist py-24">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Portfolio"
              title={home?.projectsHeading || "Selected Projects"}
              description={home?.projectsDescription}
              align="center"
            />
            {projects.length ? (
              <div className="mt-12 grid gap-6 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <EmptyState label="Featured projects will appear here once they are published." />
            )}
          </div>
        </section>
      ) : null}

      {home?.partnershipsEnabled !== false ? (
        <section className="bg-ink py-24 text-white">
          <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">R&D / Partnerships</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
                {home?.partnershipsHeading || "Research, Development & Partnerships"}
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                {home?.partnershipsDescription ||
                  "We connect business, research, and institutional partners around practical outcomes and measurable progress."}
              </p>
              <Link
                href="/partnerships"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore partnerships <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {partnerships.length ? (
              <div className="grid gap-5 md:grid-cols-2">
                {partnerships.map((partnership) => (
                  <PartnershipCard key={partnership.id} partnership={partnership} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-white/[0.15] p-6 text-white/70">
                Partnerships will appear here once they are published.
              </div>
            )}
          </div>
        </section>
      ) : null}

      {home?.expertsEnabled !== false ? (
        <section className="bg-paper py-24">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Experts"
              title={home?.expertsHeading || "Experts With Practical Range"}
              description={home?.expertsDescription}
            />
            {experts.length ? (
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {experts.map((expert) => (
                  <ExpertCard key={expert.id} expert={expert} />
                ))}
              </div>
            ) : (
              <EmptyState label="Team members will appear here once they are published." />
            )}
          </div>
        </section>
      ) : null}

      {home?.testimonialsEnabled !== false ? (
        <section className="bg-mist py-24">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Testimonials"
              title={home?.testimonialsHeading || "Trusted By Leaders"}
              description={home?.testimonialsDescription}
              align="center"
            />
            {testimonials.length ? (
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            ) : (
              <EmptyState label="Testimonials will appear here once they are published." />
            )}
          </div>
        </section>
      ) : null}

      <section className="bg-paper py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Next Step"
              title={home?.contactCtaHeading || "Need a strategic partner for your next stage?"}
              description={home?.contactCtaDescription}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/book-free-consultation">Book Free Consultation</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">Contact MGBG</ButtonLink>
            </div>
          </div>
          <div className="rounded-lg bg-ink p-8 text-white shadow-soft">
            <CheckCircle2 className="h-8 w-8 text-gold" />
            <h2 className="mt-5 text-2xl font-semibold">A better operating path starts with one clear conversation.</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Bring the opportunity, friction, proposal idea, or partnership question. MGBG will help clarify the practical route forward.
            </p>
          </div>
        </div>
      </section>

      {home?.newsletterEnabled !== false ? (
        <section className="bg-ink py-20 text-white">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Newsletter</p>
              <h2 className="mt-3 text-3xl font-semibold">Business growth notes from MGBG</h2>
              <p className="mt-4 text-white/[0.68]">Receive occasional insight on strategy, partnerships, planning, and leadership.</p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      ) : null}

    </>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="mt-12 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
      {label}
    </div>
  );
}
