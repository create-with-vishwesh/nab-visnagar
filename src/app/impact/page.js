"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteMeta } from "@/data/siteMeta";
import { stats } from "@/data/stats";
import { impactPageContent } from "@/data/impactPageContent";

export default function ImpactPage() {
  const { language } = useLanguage();
  const meta = siteMeta[language];
  const content = impactPageContent[language];

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
              {content.statsSection.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.statsSection.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.number}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 text-center shadow-sm"
              >
                <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{stat.number}</p>
                <p className="mt-2 text-sm font-medium text-slate-600 sm:text-base">
                  {stat.label[language]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.impactAreasHeading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.impactAreasIntro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.impactAreas.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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
              {content.beneficiariesHeading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.beneficiariesIntro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.beneficiaries.map((item) => (
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
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.environmentHeading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.environmentIntro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.environmentSection.map((item) => (
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
              {content.awardsHeading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.awardsIntro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {content.awards.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            {meta.shortName}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {content.cta.heading}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">{content.cta.text}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100"
            >
              {content.cta.primaryLabel}
            </Link>
            <Link
              href="/support"
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