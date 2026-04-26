import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendAdminNotification } from "@/lib/mail";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid inquiry." }, { status: 400 });
  }
  try {
    const submission = await prisma.contactSubmission.create({ data: parsed.data });
    await sendAdminNotification({
      subject: `New MGBG inquiry from ${submission.name}`,
      html: `<p><strong>${submission.name}</strong> submitted a contact inquiry.</p><p>${submission.message}</p><p>Email: ${submission.email}</p>`
    });
    return NextResponse.json({ ok: true });
  } catch {
    await sendAdminNotification({
      subject: `New MGBG inquiry from ${parsed.data.name}`,
      html: `<p><strong>${parsed.data.name}</strong> submitted a contact inquiry.</p><p>${parsed.data.message}</p><p>Email: ${parsed.data.email}</p>`
    }).catch(() => undefined);
    return NextResponse.json({ ok: true, preview: true });
  }
}
