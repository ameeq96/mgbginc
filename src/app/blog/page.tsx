import type { Metadata } from "next";
import { PostCard } from "@/components/site/Cards";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { getPage, getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("blog", "Blog & News");
}

export default async function BlogPage() {
  const [page, posts] = await Promise.all([getPage("blog"), getPosts()]);

  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={page?.title || "Blog & News"} summary={page?.summary} image={page?.heroImage} />
      <section className="bg-paper py-20">
        <div className="container-shell">
          <SafeHtml html={page?.content} className="max-w-3xl" />
          {posts.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Posts will appear here once they are published.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
