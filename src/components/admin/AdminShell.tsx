"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpenText,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Handshake,
  Home,
  Image,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Newspaper,
  Settings,
  Star,
  UsersRound
} from "lucide-react";

type AdminShellProps = {
  user: {
    name: string;
    email: string;
    role: string;
  };
  children: React.ReactNode;
};

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/home", label: "Home Page", icon: Home },
  { href: "/admin/services", label: "Services", icon: BriefcaseBusiness },
  { href: "/admin/projects", label: "Projects", icon: FileText },
  { href: "/admin/partnerships", label: "R&D / Partnerships", icon: Handshake },
  { href: "/admin/experts", label: "Experts", icon: UsersRound },
  { href: "/admin/blog", label: "Blog / News", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/media", label: "Media Library", icon: Image },
  { href: "/admin/pages", label: "Page Builder", icon: BookOpenText }
];

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-mist text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-ink text-white lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 p-6">
            <p className="text-lg font-bold">MGBG Admin</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/[0.45]">{user.role}</p>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {nav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    active ? "bg-teal text-white" : "text-white/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/10 p-4">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-white/50">{user.email}</p>
            <button
              type="button"
              onClick={logout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.15] px-4 py-2.5 text-sm font-semibold text-white/[0.78] transition hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-bold">MGBG Admin</p>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-5 pb-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold ${
                  pathname === item.href ? "bg-teal text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="min-h-screen p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
