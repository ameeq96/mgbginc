import type { Metadata } from "next";
import { PartnershipCard } from "@/components/site/Cards";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { SectionHeading } from "@/components/site/SectionHeading";
import { getPage, getPartnerships } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("partnerships", "R&D and Partnerships");
}

export default async function PartnershipsPage() {
  const [page, partnerships] = await Promise.all([getPage("partnerships"), getPartnerships()]);

  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={page?.title || "R&D and Partnerships"} summary={page?.summary} image={page?.heroImage} />
      <section className="bg-paper py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Applied Collaboration"
              title="Partnership support from first conversation to structured execution."
            />
            <SafeHtml html={page?.content} className="mt-6" />
          </div>
          {partnerships.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {partnerships.map((partnership) => (
                <PartnershipCard key={partnership.id} partnership={partnership} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Partnerships will appear here once they are published.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
