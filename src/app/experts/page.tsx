import type { Metadata } from "next";
import { ExpertCard } from "@/components/site/Cards";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { getExperts, getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("experts", "Experts & Team");
}

export default async function ExpertsPage() {
  const [page, experts] = await Promise.all([getPage("experts"), getExperts()]);

  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={page?.title || "Experts & Team"} summary={page?.summary} image={page?.heroImage} />
      <section className="bg-paper py-20">
        <div className="container-shell">
          <SafeHtml html={page?.content} className="max-w-3xl" />
          {experts.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {experts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Experts will appear here once they are published.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
