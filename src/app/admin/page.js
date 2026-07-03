import { redirect } from "next/navigation";

import { getAdminSession } from "../../utils/admin-session";

const summaryCards = [
  { label: "Contact Messages", description: "Review and update submitted contact messages." },
  { label: "Website Settings", description: "Update contact details, donation settings, categories, and footer text." },
];

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Dashboard</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          This protected admin area is ready for backend workflows. Content management pages can be added here later without changing the public site.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{card.label}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-100 p-6 text-sm leading-6 text-slate-600">
        Use the sidebar to navigate to contact messages and website settings.
      </section>
    </div>
  );
}