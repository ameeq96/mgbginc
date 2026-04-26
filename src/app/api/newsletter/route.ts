import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional()
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email.toLowerCase() },
      update: { active: true, name: parsed.data.name || null },
      create: { email: parsed.data.email.toLowerCase(), name: parsed.data.name || null }
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true, preview: true });
  }
}
