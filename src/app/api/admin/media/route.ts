import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { requireApiSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/format";

const uploadDir = path.join(process.cwd(), "public", "uploads");

export async function GET() {
  const auth = await requireApiSession();
  if ("error" in auth) return auth.error;
  const media = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(media);
}

export async function POST(request: Request) {
  const auth = await requireApiSession();
  if ("error" in auth) return auth.error;
  const form = await request.formData();
  const file = form.get("file");
  const altText = String(form.get("altText") || "");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Upload a valid file." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Files must be under 8MB." }, { status: 400 });
  }

  await fs.mkdir(uploadDir, { recursive: true });
  const original = file.name || "upload";
  const extension = path.extname(original);
  const name = path.basename(original, extension);
  const filename = `${Date.now()}-${slugify(name) || "asset"}${extension.toLowerCase()}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), bytes);

  const media = await prisma.mediaAsset.create({
    data: {
      filename,
      url: `/uploads/${filename}`,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
      altText: altText || null
    }
  });
  return NextResponse.json(media, { status: 201 });
}
