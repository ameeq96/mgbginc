import type { Metadata } from "next";
import { ProjectCard } from "@/components/site/Cards";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { getPage, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("projects", "Projects & Portfolio");
}

export default async function ProjectsPage() {
  const [page, projects] = await Promise.all([getPage("projects"), getProjects()]);

  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={page?.title || "Projects & Portfolio"} summary={page?.summary} image={page?.heroImage} />
      <section className="bg-paper py-20">
        <div className="container-shell">
          <SafeHtml html={page?.content} className="max-w-3xl" />
          {projects.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Projects will appear here once they are published.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
