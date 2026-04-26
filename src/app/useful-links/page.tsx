import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { getPage, getUsefulLinks } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("useful-links", "Useful Links");
}

export default async function UsefulLinksPage() {
  const [page, links] = await Promise.all([getPage("useful-links"), getUsefulLinks()]);

  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={page?.title || "Useful Links"} summary={page?.summary} image={page?.heroImage} />
      <section className="bg-paper py-20">
        <div className="container-shell">
          <SafeHtml html={page?.content} className="max-w-3xl" />
          {links.length ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {link.category ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">{link.category}</p>
                      ) : null}
                      <h2 className="mt-3 text-xl font-semibold text-ink">{link.title}</h2>
                    </div>
                    <ExternalLink className="h-5 w-5 text-slate-400 transition group-hover:text-teal" />
                  </div>
                  {link.description ? <p className="mt-4 text-sm leading-7 text-slate-600">{link.description}</p> : null}
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Useful links will appear here once they are published.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
