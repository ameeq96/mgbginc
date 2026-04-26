import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { requireApiSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: Context) {
  const auth = await requireApiSession(["ADMIN"]);
  if ("error" in auth) return auth.error;
  const { id } = await context.params;
  const media = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: "Media not found." }, { status: 404 });

  await prisma.mediaAsset.delete({ where: { id } });
  const diskPath = path.join(process.cwd(), "public", media.url.replace(/^\//, ""));
  await fs.unlink(diskPath).catch(() => undefined);
  return NextResponse.json({ ok: true });
}
