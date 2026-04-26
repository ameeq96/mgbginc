import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  logo: z.string().optional().nullable(),
  siteName: z.string().min(2),
  tagline: z.string().optional().nullable(),
  contactEmail: z.string().email().optional().nullable().or(z.literal("")),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  x: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  footerText: z.string().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable()
});

function clean(value: unknown) {
  const parsed = schema.parse(value);
  return Object.fromEntries(
    Object.entries(parsed).map(([key, item]) => [key, item === "" ? null : item])
  );
}

export async function GET() {
  const auth = await requireApiSession();
  if ("error" in auth) return auth.error;
  const settings = await prisma.siteSetting.upsert({
    where: { id: "site" },
    update: {},
    create: { id: "site", siteName: "MGBG Inc." }
  });
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const auth = await requireApiSession(["ADMIN"]);
  if ("error" in auth) return auth.error;
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid settings." }, { status: 400 });
  }
  const settings = await prisma.siteSetting.upsert({
    where: { id: "site" },
    update: clean(body),
    create: { id: "site", ...clean(body) }
  });
  return NextResponse.json(settings);
}
