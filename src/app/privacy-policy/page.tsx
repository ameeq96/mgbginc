import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("privacy-policy", "Privacy Policy");
}

export default async function PrivacyPolicyPage() {
  const page = await getPage("privacy-policy");
  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={page?.title || "Privacy Policy"} summary={page?.summary} image={page?.heroImage} />
      <section className="bg-paper py-20">
        <div className="container-shell max-w-3xl">
          <SafeHtml html={page?.content} />
        </div>
      </section>
    </>
  );
}
