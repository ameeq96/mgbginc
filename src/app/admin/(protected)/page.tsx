import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Handshake,
  MessageSquare,
  Newspaper,
  UsersRound
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    serviceCount,
    projectCount,
    partnershipCount,
    expertCount,
    postCount,
    bookingCount,
    messageCount,
    recentBookings,
    recentMessages
  ] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.partnership.count(),
    prisma.expert.count(),
    prisma.blogPost.count(),
    prisma.consultationRequest.count({ where: { status: "NEW" } }),
    prisma.contactSubmission.count({ where: { replied: false } }),
    prisma.consultationRequest.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 4 })
  ]);

  const stats = [
    { label: "Services", value: serviceCount, href: "/admin/services", icon: BriefcaseBusiness },
    { label: "Projects", value: projectCount, href: "/admin/projects", icon: FileText },
    { label: "Partnerships", value: partnershipCount, href: "/admin/partnerships", icon: Handshake },
    { label: "Experts", value: expertCount, href: "/admin/experts", icon: UsersRound },
    { label: "Posts", value: postCount, href: "/admin/blog", icon: Newspaper },
    { label: "New bookings", value: bookingCount, href: "/admin/bookings", icon: CalendarDays },
    { label: "Unreplied messages", value: messageCount, href: "/admin/messages", icon: MessageSquare }
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-lg bg-ink p-6 text-white shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Control Center</p>
        <h1 className="mt-3 text-3xl font-semibold">MGBG website dashboard</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
          Manage public content, page copy, media, consultation requests, contact inquiries, SEO, and publishing status from one admin area.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal/10 text-teal">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-3xl font-semibold text-ink">{stat.value}</span>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-600">{stat.label}</p>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-ink">Recent consultation requests</h2>
          <div className="mt-5 divide-y divide-slate-200">
            {recentBookings.length ? (
              recentBookings.map((booking) => (
                <div key={booking.id} className="py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-ink">{booking.name}</p>
                    <span className="rounded-full bg-gold/[0.15] px-3 py-1 text-xs font-semibold text-gold">
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{booking.email}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{booking.message}</p>
                </div>
              ))
            ) : (
              <p className="py-6 text-sm text-slate-500">No consultation requests yet.</p>
            )}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-ink">Recent contact inquiries</h2>
          <div className="mt-5 divide-y divide-slate-200">
            {recentMessages.length ? (
              recentMessages.map((message) => (
                <div key={message.id} className="py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-ink">{message.name}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${message.replied ? "bg-teal/10 text-tealDark" : "bg-slate-100 text-slate-500"}`}>
                      {message.replied ? "Replied" : "Unreplied"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{message.email}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{message.message}</p>
                </div>
              ))
            ) : (
              <p className="py-6 text-sm text-slate-500">No contact inquiries yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
