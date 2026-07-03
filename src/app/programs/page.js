"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ResponsiveImage from "@/components/common/ResponsiveImage";
import EmptyState from "@/components/common/EmptyState";
import { siteMeta } from "@/data/siteMeta";
import { programsPageContent } from "@/data/programsPageContent";

export default function ProgramsPage() {
  const { language } = useLanguage();
  const meta = siteMeta[language];
  const content = programsPageContent[language];

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
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-8 py-3 font-medium text-white transition-colors hover:bg-slate-700"
            >
              {content.cta.primaryLabel}
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-8 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50"
            >
              {content.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.overview.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.overview.text}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.detailedProgramsHeading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.detailedProgramsIntro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.detailedPrograms.length > 0 ? (
              content.detailedPrograms.map((program) => (
                <article
                  key={program.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-sm font-semibold text-slate-700">
                      {program.iconPlaceholder}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{program.title}</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <ResponsiveImage
                      src={program.imagePath}
                      alt={program.imageAltText}
                      variant="programCard"
                      className="rounded-lg border border-slate-200"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{program.shortDescription}</p>
                  <div className="mt-5 rounded-lg bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Who benefits</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{program.whoBenefits}</p>
                  </div>
                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Services offered</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      {program.servicesOffered.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3">
                <EmptyState
                  title="No programs are available right now"
                  description="Program content will appear here when the service-area data is present."
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.supportSection.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.supportSection.text}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.supportSection.points.map((point) => (
              <article
                key={point}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <p className="text-sm leading-7 text-slate-600">{point}</p>
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
              href="/contact"
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