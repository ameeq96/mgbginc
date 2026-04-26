import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendAdminNotification } from "@/lib/mail";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  serviceInterest: z.string().optional(),
  message: z.string().min(10),
  preferredAt: z
    .string()
    .optional()
    .transform((value) => (value ? new Date(value) : null))
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid consultation request." }, { status: 400 });
  }
  try {
    const requestRow = await prisma.consultationRequest.create({ data: parsed.data });
    await sendAdminNotification({
      subject: `New consultation request from ${requestRow.name}`,
      html: `<p><strong>${requestRow.name}</strong> requested a consultation.</p><p>${requestRow.message}</p><p>Email: ${requestRow.email}</p>`
    });
    return NextResponse.json({ ok: true });
  } catch {
    await sendAdminNotification({
      subject: `New consultation request from ${parsed.data.name}`,
      html: `<p><strong>${parsed.data.name}</strong> requested a consultation.</p><p>${parsed.data.message}</p><p>Email: ${parsed.data.email}</p>`
    }).catch(() => undefined);
    return NextResponse.json({ ok: true, preview: true });
  }
}
