import Link from "next/link";
import { getSiteSettings } from "@/lib/content";
import { LogoImage } from "@/components/site/LogoImage";
import { MobileNav } from "@/components/site/MobileNav";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/partnerships", label: "R&D" },
  { href: "/experts", label: "Experts" },
  { href: "/blog", label: "News" },
  { href: "/contact", label: "Contact" }
];

const defaultLogo = "/mgbg-logo-mark.png?v=2";

export async function Header() {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName || "MGBG Inc.";
  const logo = settings?.logo?.trim() || defaultLogo;

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container-shell">
        <div className="mt-4 flex items-center justify-between rounded-full border border-white/[0.18] bg-ink/[0.82] px-4 py-3 text-white shadow-soft backdrop-blur-xl md:px-5">
          <Link href="/" className="flex items-center gap-3 text-white">
            {logo ? (
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white p-1.5 shadow-sm ring-1 ring-white/20">
                <LogoImage src={logo} fallbackSrc={defaultLogo} alt={siteName} className="h-full w-full object-contain" />
              </span>
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-full bg-teal text-sm font-bold">MG</span>
            )}
            <span className="min-w-0">
              <span className="block text-sm font-bold tracking-wide">{siteName}</span>
              <span className="hidden text-xs text-white/[0.68] sm:block">
                {settings?.tagline || "Meta Genie Business Group"}
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/[0.78] transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/book-free-consultation"
              className="focus-ring rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-mist"
            >
              Book Consultation
            </Link>
          </div>
          <MobileNav links={[...links, { href: "/book-free-consultation", label: "Book Consultation" }]} />
        </div>
      </div>
    </header>
  );
}
