import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/PublicForms";
import { PageHero } from "@/components/site/PageHero";
import { SafeHtml } from "@/components/site/SafeHtml";
import { getPage, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("contact", "Contact");
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getPage("contact"), getSiteSettings()]);

  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={page?.title || "Contact"} summary={page?.summary} image={page?.heroImage} />
      <section className="bg-paper py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SafeHtml html={page?.content} />
            <div className="mt-8 grid gap-4 text-sm text-slate-600">
              {settings?.contactEmail ? <Info icon={<Mail />} value={settings.contactEmail} /> : null}
              {settings?.phone ? <Info icon={<Phone />} value={settings.phone} /> : null}
              {settings?.address ? <Info icon={<MapPin />} value={settings.address} /> : null}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function Info({ icon, value }: { icon: React.ReactElement; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-teal [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
      <span>{value}</span>
    </div>
  );
}
