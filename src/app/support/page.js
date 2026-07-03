"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteMeta } from "@/data/siteMeta";
import { supportPageContent } from "@/data/supportPageContent";

export default function SupportPage() {
  const { language } = useLanguage();
  const meta = siteMeta[language];
  const content = supportPageContent[language];

  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            {content.hero.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {content.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {content.hero.intro}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.whyDonate.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.whyDonate.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.whyDonate.points.map((point) => (
              <article
                key={point.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{point.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.howDonationsHelp.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.howDonationsHelp.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.howDonationsHelp.items.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.supportImpact.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.supportImpact.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.supportImpact.items.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{content.volunteer.heading}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{content.volunteer.text}</p>
            </article>
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{content.csr.heading}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{content.csr.text}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{content.faq.heading}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.faq.items.map((item) => (
              <article key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <article className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{content.futurePaymentGateway.heading}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{content.futurePaymentGateway.text}</p>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.responsibleNote.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.responsibleNote.text}</p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
              {content.responsibleNote.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              {meta.shortName}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {content.cta.heading}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">{content.cta.text}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100"
            >
              {content.cta.primaryLabel}
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-8 py-3 font-medium text-white transition-colors hover:bg-slate-800"
            >
              {content.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}