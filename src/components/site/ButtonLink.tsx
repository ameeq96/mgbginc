import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-teal text-white shadow-soft hover:bg-tealDark focus-visible:outline-teal",
  secondary:
    "bg-white text-ink hover:bg-mist focus-visible:outline-white",
  ghost:
    "border border-white/[0.35] text-white hover:bg-white/10 focus-visible:outline-white"
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold transition ${variants[variant]}`}
    >
      {children}
      <ArrowRight aria-hidden className="h-4 w-4" />
    </Link>
  );
}
