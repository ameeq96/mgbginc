import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <main className="admin-grid-bg grid min-h-screen place-items-center bg-ink p-5">
      <LoginForm />
    </main>
  );
}
