import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("terms-conditions", "Terms & Conditions");
}

export default async function TermsPage() {
  const page = await getPage("terms-conditions");
  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={page?.title || "Terms & Conditions"} summary={page?.summary} image={page?.heroImage} />
      <section className="bg-paper py-20">
        <div className="container-shell max-w-3xl">
          <SafeHtml html={page?.content} />
        </div>
      </section>
    </>
  );
}
