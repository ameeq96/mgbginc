import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FlaskConical,
  Leaf,
  Network,
  Share2,
  ShieldCheck,
  Sparkles,
  Sprout
} from "lucide-react";
import { SafeHtml } from "@/components/site/SafeHtml";
import { getPost, getPosts } from "@/lib/content";
import { excerpt, formatDate, splitList } from "@/lib/format";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || excerpt(post.content),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || excerpt(post.content),
      images: post.featuredImage ? [{ url: post.featuredImage }] : undefined
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPost(slug), getPosts(4)]);
  if (!post) notFound();

  const tags = splitList(post.tags);
  const minutes = readingTime(post.content);
  const article = articleProfile(post.slug);
  const related = posts.filter((item) => item.id !== post.id).slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink pt-32 text-white">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,20,35,0.96),rgba(7,20,35,0.82),rgba(7,20,35,0.48))]" />
        <div className="container-shell pb-20 pt-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-4 py-2 text-sm font-semibold text-white/[0.78] transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
          <div className="mt-10 max-w-4xl">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-gold px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ink">
                {post.category || "Insight"}
              </span>
              <span className="rounded-full border border-white/[0.18] bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/[0.78] backdrop-blur">
                MGBG Knowledge Center
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] md:text-6xl">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/[0.78] md:text-xl">
                {post.excerpt}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/[0.76]">
              <Meta icon={<CalendarDays />} label={formatDate(post.publishedAt || post.createdAt)} />
              <Meta icon={<Clock3 />} label={`${minutes} min read`} />
              <Meta icon={<Share2 />} label="Strategic update" />
            </div>
          </div>
        </div>
      </section>

      <article className="bg-paper py-20">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div>
              {post.featuredImage ? (
                <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
                  <img src={post.featuredImage} alt={post.title} className="aspect-[16/8] w-full object-cover" />
                </figure>
              ) : null}

              <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                <SafeHtml html={post.content} className="article-prose" />
              </div>

              <section className="mt-8 rounded-lg bg-ink p-6 text-white md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Next Step</p>
                    <h2 className="mt-3 text-2xl font-semibold">Discuss this opportunity with MGBG.</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/[0.7]">
                      Bring your partnership, research, project planning, or business growth question into a focused consultation.
                    </p>
                  </div>
                  <Link
                    href="/book-free-consultation"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-teal px-5 text-sm font-semibold text-white transition hover:bg-tealDark"
                  >
                    Book Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            </div>

            <aside className="grid gap-5 lg:sticky lg:top-8">
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal">
                  <article.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-ink">{article.sidebarTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{article.sidebarText}</p>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">Key Focus</h2>
                <div className="mt-5 grid gap-4">
                  {article.points.map((point) => (
                    <div key={point} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-teal" />
                      <p className="text-sm leading-6 text-slate-700">{point}</p>
                    </div>
                  ))}
                </div>
              </section>

              {tags.length ? (
                <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">Topics</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}
            </aside>
          </div>

          {related.length ? (
            <section className="mt-20">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal">More From MGBG</p>
                  <h2 className="mt-3 text-3xl font-semibold text-ink">Related Updates</h2>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-teal">
                  View all news
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                      {item.category || "Insight"}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{item.title}</h3>
                    {item.excerpt ? <p className="mt-3 text-sm leading-6 text-slate-600">{excerpt(item.excerpt, 110)}</p> : null}
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal">
                      Read more
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}

function Meta({ icon, label }: { icon: React.ReactElement; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-white/10 px-4 py-2 backdrop-blur [&_svg]:h-4 [&_svg]:w-4">
      {icon}
      {label}
    </span>
  );
}

function readingTime(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 180));
}

function articleProfile(slug: string) {
  if (slug.includes("agri-trait")) {
    return {
      icon: FlaskConical,
      sidebarTitle: "Agricultural Genetics & Biotech",
      sidebarText:
        "A focused MGBG division for crop germplasm, trait development, genetic diversity, and applied biotechnology partnerships.",
      points: [
        "Functional crop germplasm with novel genes and high-value traits.",
        "Support for breeding programs focused on disease and stress resilience.",
        "A science-led platform supported by industry, regulatory, and investment expertise."
      ]
    };
  }

  if (slug.includes("strategic-partnerships")) {
    return {
      icon: Network,
      sidebarTitle: "Partnership Growth Framework",
      sidebarText:
        "A practical view of how aligned goals, clear ownership, and operating rhythm turn partnerships into measurable business value.",
      points: [
        "Shared goals and partner roles defined before execution starts.",
        "Governance, communication, and reporting rhythms built into the work.",
        "Partnership activity connected to business outcomes and delivery capacity."
      ]
    };
  }

  if (slug.includes("process")) {
    return {
      icon: ShieldCheck,
      sidebarTitle: "Operational Clarity",
      sidebarText:
        "A leadership-focused approach to seeing work clearly, removing friction, and strengthening accountability.",
      points: [
        "Visible ownership across workflows and decision points.",
        "Bottlenecks identified through practical process mapping.",
        "Clear improvement priorities for leadership teams."
      ]
    };
  }

  return {
    icon: Sparkles,
    sidebarTitle: "MGBG Insight",
    sidebarText:
      "A practical MGBG perspective on strategy, people, projects, partnerships, and business growth.",
    points: [
      "Clear strategy translated into practical action.",
      "Useful communication for stakeholders and partners.",
      "Execution support built around measurable progress."
    ]
  };
}
