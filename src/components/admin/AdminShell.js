"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/contact-messages", label: "Contact Messages" },
  { href: "/admin/website-settings", label: "Website Settings" },
  { href: "/admin/account", label: "Account Settings" },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/admin/login";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        {showSidebar ? (
          <aside className="border-b border-slate-200 bg-white px-6 py-8 lg:w-72 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between lg:block">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Admin Panel</p>
                <h1 className="mt-2 text-2xl font-bold text-slate-900">NAB Visnagar</h1>
              </div>
              <form action="/admin/logout" method="post" className="lg:mt-8">
                <button
                  type="submit"
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Logout
                </button>
              </form>
            </div>

            <nav className="mt-8 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        ) : null}

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">{children}</main>
      </div>
    </div>
  );
}