import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireApiSession } from "@/lib/auth";
import { getResourceDefinition, normalizeResourceData } from "@/lib/admin-resources";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{ resource: string; id: string }>;
};

function client(model: string) {
  return (prisma as unknown as Record<string, { update: Function; delete: Function }>)[model];
}

export async function PUT(request: Request, context: Context) {
  const auth = await requireApiSession();
  if ("error" in auth) return auth.error;
  const { resource, id } = await context.params;
  const definition = getResourceDefinition(resource);
  if (!definition) {
    return NextResponse.json({ error: "Resource not found." }, { status: 404 });
  }

  try {
    const body = await request.json();
    const data = normalizeResourceData(definition, body);
    const item = await client(definition.model).update({ where: { id }, data });
    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || "Invalid data." }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to update item." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: Context) {
  const { resource, id } = await context.params;
  const definition = getResourceDefinition(resource);
  if (!definition) {
    return NextResponse.json({ error: "Resource not found." }, { status: 404 });
  }
  const auth = await requireApiSession(definition.adminOnlyDelete ? ["ADMIN"] : undefined);
  if ("error" in auth) return auth.error;

  await client(definition.model).delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
