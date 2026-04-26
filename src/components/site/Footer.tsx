import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { LogoImage } from "@/components/site/LogoImage";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/partnerships", label: "R&D / Partnerships" },
  { href: "/blog", label: "Blog / News" },
  { href: "/useful-links", label: "Useful Links" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" }
];

const defaultLogo = "/mgbg-logo-mark.png?v=2";

export async function Footer() {
  const settings = await getSiteSettings();
  const logo = settings?.logo?.trim() || defaultLogo;

  return (
    <footer className="bg-ink text-white">
      <div className="container-shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              {logo ? (
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white p-1.5 shadow-sm">
                  <LogoImage
                    src={logo}
                    fallbackSrc={defaultLogo}
                    alt={settings?.siteName || "MGBG Inc."}
                    className="h-full w-full object-contain"
                  />
                </span>
              ) : (
                <span className="grid h-11 w-11 place-items-center rounded-full bg-teal text-sm font-bold">MG</span>
              )}
              <div>
                <p className="font-bold">{settings?.siteName || "MGBG Inc."}</p>
                <p className="text-sm text-white/[0.62]">{settings?.tagline || "Meta Genie Business Group"}</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/[0.68]">
              {settings?.footerText ||
                "MGBG Inc. enables organizations with business consulting, project management, leadership development, R&D support, and partnership strategy."}
            </p>
            <div className="mt-6 flex gap-3">
              {settings?.linkedin ? <Social href={settings.linkedin} label="LinkedIn" icon={<Linkedin />} /> : null}
              {settings?.facebook ? <Social href={settings.facebook} label="Facebook" icon={<Facebook />} /> : null}
              {settings?.instagram ? <Social href={settings.instagram} label="Instagram" icon={<Instagram />} /> : null}
              {settings?.youtube ? <Social href={settings.youtube} label="YouTube" icon={<Youtube />} /> : null}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Navigate</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/70">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Contact</h2>
            <div className="mt-5 grid gap-4 text-sm text-white/[0.72]">
              {settings?.contactEmail ? (
                <ContactLine icon={<Mail />} value={settings.contactEmail} href={`mailto:${settings.contactEmail}`} />
              ) : null}
              {settings?.phone ? <ContactLine icon={<Phone />} value={settings.phone} href={`tel:${settings.phone}`} /> : null}
              {settings?.address ? <ContactLine icon={<MapPin />} value={settings.address} /> : null}
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-6 text-sm text-white/[0.52]">
          © {new Date().getFullYear()} {settings?.siteName || "MGBG Inc."}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, icon }: { href: string; label: string; icon: React.ReactElement }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/[0.15] text-white/70 transition hover:border-teal hover:text-white"
    >
      {icon}
    </a>
  );
}

function ContactLine({
  icon,
  value,
  href
}: {
  icon: React.ReactElement;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="flex gap-3">
      <span className="mt-0.5 text-teal [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
      <span>{value}</span>
    </span>
  );
  return href ? (
    <a href={href} className="transition hover:text-white">
      {content}
    </a>
  ) : (
    content
  );
}
