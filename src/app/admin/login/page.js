import { redirect } from "next/navigation";

import AdminLoginForm from "../../../components/admin/AdminLoginForm";
import { getAdminSession } from "../../../utils/admin-session";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Admin Login</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Sign in to continue</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Use your admin email and password to access the dashboard.</p>
        <AdminLoginForm />
      </div>
    </div>
  );
}