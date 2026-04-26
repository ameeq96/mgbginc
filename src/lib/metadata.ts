import type { Metadata } from "next";
import { absoluteUrl, excerpt } from "@/lib/format";
import { getPage, getSiteSettings } from "@/lib/content";

export async function baseMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title =
    settings?.seoTitle ||
    "MGBG Inc. | Strategic Business Consulting & Project Management";
  const description =
    settings?.seoDescription ||
    "Meta Genie Business Group helps organizations simplify strategy, manage projects, build leadership, and unlock profitable growth.";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    ),
    title: {
      default: title,
      template: `%s | ${settings?.siteName || "MGBG Inc."}`
    },
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl("/"),
      siteName: settings?.siteName || "MGBG Inc.",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export async function pageMetadata(slug: string, fallbackTitle: string): Promise<Metadata> {
  const page = await getPage(slug);
  const settings = await getSiteSettings();
  const title = page?.seoTitle || page?.title || fallbackTitle;
  const description = page?.seoDescription || page?.summary || excerpt(page?.content || "", 155);
  const image = page?.heroImage || settings?.logo || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined
    }
  };
}
