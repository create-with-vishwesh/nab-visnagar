import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          The page you were looking for does not exist or has moved. Use the links below to continue.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-8 py-3 font-medium text-white transition-colors hover:bg-slate-700"
          >
            Go home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-8 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100"
          >
            Contact NAB
          </Link>
        </div>
      </div>
    </section>
  );
}