import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  heroTitle: z.string().min(5),
  heroSubtitle: z.string().min(10),
  heroImage: z.string().optional().nullable(),
  heroPrimaryText: z.string().min(2),
  heroPrimaryLink: z.string().min(1),
  heroSecondaryText: z.string().min(2),
  heroSecondaryLink: z.string().min(1),
  servicesEnabled: z.coerce.boolean(),
  servicesHeading: z.string().min(2),
  servicesDescription: z.string().optional().nullable(),
  projectsEnabled: z.coerce.boolean(),
  projectsHeading: z.string().min(2),
  projectsDescription: z.string().optional().nullable(),
  partnershipsEnabled: z.coerce.boolean(),
  partnershipsHeading: z.string().min(2),
  partnershipsDescription: z.string().optional().nullable(),
  testimonialsEnabled: z.coerce.boolean(),
  testimonialsHeading: z.string().min(2),
  testimonialsDescription: z.string().optional().nullable(),
  expertsEnabled: z.coerce.boolean(),
  expertsHeading: z.string().min(2),
  expertsDescription: z.string().optional().nullable(),
  newsletterEnabled: z.coerce.boolean(),
  contactCtaHeading: z.string().min(2),
  contactCtaDescription: z.string().optional().nullable()
});

export async function GET() {
  const auth = await requireApiSession();
  if ("error" in auth) return auth.error;
  const home = await prisma.homeContent.upsert({
    where: { id: "home" },
    update: {},
    create: {
      id: "home",
      heroTitle: "Building Strategic Partnerships for Sustainable Business Growth",
      heroSubtitle:
        "MGBG Inc. helps organizations simplify strategy, manage projects, build leadership, and unlock profitable growth."
    }
  });
  return NextResponse.json(home);
}

export async function PUT(request: Request) {
  const auth = await requireApiSession();
  if ("error" in auth) return auth.error;
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid home content." }, { status: 400 });
  }
  const home = await prisma.homeContent.upsert({
    where: { id: "home" },
    update: parsed.data,
    create: { id: "home", ...parsed.data }
  });
  return NextResponse.json(home);
}
