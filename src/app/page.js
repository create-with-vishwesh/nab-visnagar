"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { homeContent } from "@/data/homeContent";
import { stats } from "@/data/stats";
import { programs } from "@/data/programs";
import EmptyState from "@/components/common/EmptyState";
import ResponsiveImage from "@/components/common/ResponsiveImage";

export default function HomePage() {
  const { language } = useLanguage();
  const content = homeContent[language];

  return (
    <>
      <section className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${content.heroImage.src})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/80" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
              {content.heroEyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {content.tagline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">
              {content.heroDescription}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100"
              >
                {content.heroPrimaryCta}
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                {content.heroSecondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.number}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 text-center"
              >
                <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{stat.number}</p>
                <p className="mt-2 text-sm font-medium text-slate-600 sm:text-base">
                  {stat.label[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{content.aboutHeading}</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">{content.aboutShort}</p>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center text-base font-medium text-slate-900 hover:text-slate-700"
                >
                  {content.aboutLinkText}
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <ResponsiveImage
                  src={content.aboutImage.src}
                  alt={content.aboutImage.alt}
                  variant="programCard"
                  className="rounded-none"
                  sizes="(max-width: 1024px) 100vw, 40rem"
                />
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{content.missionLabel}</h3>
                    <p className="mt-2 text-sm text-slate-600">{content.mission}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{content.visionLabel}</h3>
                    <p className="mt-2 text-sm text-slate-600">{content.vision}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{content.programsHeading}</h2>
            <p className="mt-4 text-lg text-slate-600">{content.programsSubheading}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.length > 0 ? (
              programs.map((program) => (
                <div
                  key={program.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ResponsiveImage
                    src={program.imagePath}
                    alt={program.altText[language]}
                    variant="programCard"
                    className="rounded-xl border border-slate-200"
                  />
                  <h3 className="text-lg font-semibold text-slate-900">{program.title[language]}</h3>
                  <p className="mt-3 flex-grow text-base text-slate-600">{program.description[language]}</p>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3">
                <EmptyState
                  title="No programs available"
                  description="Program highlights will appear here once the content data is populated."
                />
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-8 py-3 font-medium text-white transition-colors hover:bg-slate-700"
            >
              {content.programsCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-slate-950/30">
            <ResponsiveImage
              src={content.supportImage.src}
              alt={content.supportImage.alt}
              variant="programCard"
              priority={false}
              className="rounded-none"
              sizes="(max-width: 1024px) 100vw, 64rem"
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{content.supportHeading}</h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">{content.supportText}</p>
          <div className="mt-10">
            <Link
              href="/support"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100"
            >
              {content.supportCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}