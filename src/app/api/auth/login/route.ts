import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateAdmin, setSessionCookie } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
    }

    const user = await authenticateAdmin(parsed.data.email, parsed.data.password);
    if (!user) {
      return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
    }

    await setSessionCookie(user);
    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Admin login failed.", error);
    return NextResponse.json(
      { error: "Admin database is not ready. Check DATABASE_URL on Vercel and run Prisma db push." },
      { status: 503 }
    );
  }
}
