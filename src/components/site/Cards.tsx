import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import type { BlogPost, Expert, Partnership, Project, Service, Testimonial } from "@prisma/client";
import { IconBadge } from "@/components/site/IconBadge";
import { excerpt, formatDate, splitList } from "@/lib/format";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal/40 hover:shadow-soft">
      <IconBadge name={service.icon} />
      <h3 className="mt-6 text-xl font-semibold text-ink">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{service.shortDescription}</p>
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-teal">
        <span>Explore service</span>
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      {project.image ? (
        <img src={project.image} alt="" className="h-56 w-full object-cover" />
      ) : (
        <div className="h-56 bg-mist" />
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          {project.category ? <span>{project.category}</span> : null}
          <span>{project.status}</span>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-ink">{project.title}</h3>
        {project.clientName ? <p className="mt-2 text-sm text-slate-500">{project.clientName}</p> : null}
        <p className="mt-4 text-sm leading-7 text-slate-600">{excerpt(project.description, 170)}</p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {formatDate(project.date)}
        </p>
      </div>
    </article>
  );
}

export function PartnershipCard({ partnership }: { partnership: Partnership }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      {partnership.logo ? (
        <img src={partnership.logo} alt="" className="h-12 w-28 object-contain object-left" />
      ) : (
        <div className="inline-flex rounded-full bg-gold/[0.15] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Partner
        </div>
      )}
      <h3 className="mt-6 text-xl font-semibold text-ink">{partnership.partnerName}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{excerpt(partnership.description, 170)}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
        {partnership.country ? <span className="rounded-full bg-mist px-3 py-1">{partnership.country}</span> : null}
        {partnership.partnershipType ? (
          <span className="rounded-full bg-mist px-3 py-1">{partnership.partnershipType}</span>
        ) : null}
      </div>
    </article>
  );
}

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      {expert.photo ? (
        <img src={expert.photo} alt={expert.name} className="h-72 w-full object-cover" />
      ) : (
        <div className="h-72 bg-mist" />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-ink">{expert.name}</h3>
        <p className="mt-1 text-sm font-medium text-teal">{expert.position}</p>
        <p className="mt-4 text-sm leading-7 text-slate-600">{excerpt(expert.bio, 150)}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {splitList(expert.skills).map((skill) => (
            <span key={skill} className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-slate-600">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex gap-1 text-gold">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-5 text-base leading-8 text-slate-700">“{testimonial.text}”</p>
      <div className="mt-6 flex items-center gap-3">
        {testimonial.photo ? (
          <img src={testimonial.photo} alt="" className="h-11 w-11 rounded-full object-cover" />
        ) : (
          <span className="grid h-11 w-11 place-items-center rounded-full bg-teal/10 text-sm font-bold text-teal">
            {testimonial.clientName.slice(0, 2).toUpperCase()}
          </span>
        )}
        <div>
          <p className="font-semibold text-ink">{testimonial.clientName}</p>
          {testimonial.company ? <p className="text-sm text-slate-500">{testimonial.company}</p> : null}
        </div>
      </div>
    </article>
  );
}

export function PostCard({ post }: { post: BlogPost }) {
  const ctaText = post.category?.toLowerCase() === "news" ? "Click to Learn More" : "Read insight";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
    >
      {post.featuredImage ? (
        <img src={post.featuredImage} alt="" className="h-56 w-full object-cover" />
      ) : (
        <div className="h-56 bg-mist" />
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          {post.category ? <span>{post.category}</span> : null}
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
        </div>
        <h3 className="mt-4 text-xl font-semibold leading-snug text-ink">{post.title}</h3>
        {post.excerpt ? <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p> : null}
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-teal">
          <span>{ctaText}</span>
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
