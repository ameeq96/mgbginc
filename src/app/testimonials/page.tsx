import type { Metadata } from "next";
import { TestimonialCard } from "@/components/site/Cards";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { getPage, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("testimonials", "Testimonials");
}

export default async function TestimonialsPage() {
  const [page, testimonials] = await Promise.all([getPage("testimonials"), getTestimonials()]);

  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={page?.title || "Testimonials"} summary={page?.summary} image={page?.heroImage} />
      <section className="bg-paper py-20">
        <div className="container-shell">
          <SafeHtml html={page?.content} className="max-w-3xl" />
          {testimonials.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Testimonials will appear here once they are published.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
