import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { SectionHeading } from "@/components/site/SectionHeading";
import { getPage, getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about-us", "About MGBG Inc.");
}

export default async function AboutPage() {
  const [page, services] = await Promise.all([getPage("about-us"), getServices()]);

  return (
    <>
      <PageHero
        eyebrow={page?.eyebrow || "Who We Are"}
        title={page?.title || "About MGBG Inc."}
        summary={page?.summary}
        image={page?.heroImage}
      />
      <section className="bg-paper py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Enabling Business Group"
            title="Practical consulting for leaders who need momentum and trust."
            description="MGBG brings strategy, structure, communication, and implementation support into one focused operating partner."
          />
          <SafeHtml html={page?.content} />
        </div>
      </section>
      <section className="bg-mist py-20">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {[
            ["Strategy", "Business planning, operating clarity, and growth pathways."],
            ["Execution", "Project management, process mapping, and implementation rhythm."],
            ["Partnerships", "R&D, proposal writing, institutional collaboration, and stakeholder communication."]
          ].map(([title, copy]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-paper py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Scope"
            title="A broad operating lens, managed through simple priorities."
            description={`${services.length} service areas can be managed dynamically from the admin dashboard.`}
            align="center"
          />
        </div>
      </section>
    </>
  );
}
