import type { Metadata } from "next";
import { ConsultationForm } from "@/components/site/PublicForms";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { getPage, getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("book-free-consultation", "Book Free Consultation");
}

export default async function BookConsultationPage() {
  const [page, services] = await Promise.all([getPage("book-free-consultation"), getServices()]);

  return (
    <>
      <PageHero
        eyebrow={page?.eyebrow}
        title={page?.title || "Book Free Consultation"}
        summary={page?.summary}
        image={page?.heroImage}
      />
      <section className="bg-paper py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SafeHtml html={page?.content} />
          <ConsultationForm services={services.map((service) => service.title)} />
        </div>
      </section>
    </>
  );
}
