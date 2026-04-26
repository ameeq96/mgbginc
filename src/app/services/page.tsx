import type { Metadata } from "next";
import { ServiceCard } from "@/components/site/Cards";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { SectionHeading } from "@/components/site/SectionHeading";
import { getPage, getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("services", "Services");
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getPage("services"), getServices()]);

  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={page?.title || "Services"} summary={page?.summary} image={page?.heroImage} />
      <section className="bg-paper py-20">
        <div className="container-shell">
          <SafeHtml html={page?.content} className="max-w-3xl" />
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
      <section className="bg-mist py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Engagement Model"
            title="Designed for strategy, delivery, and organizational capacity."
            description="Every engagement can combine diagnostic review, planning, documentation, communication, implementation support, and leadership alignment."
            align="center"
          />
        </div>
      </section>
    </>
  );
}

function EmptyState({ label }: { label: string }) {
  return <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">{label}</div>;
}
