"use client";

import { useLanguage } from "@/context/LanguageContext";
import { founderContent } from "@/data/founderContent";
import ResponsiveImage from "@/components/common/ResponsiveImage";

export default function AboutPage() {
  const { language } = useLanguage();
  const content = founderContent[language];

  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-24 lg:py-28">
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
          <div className="grid gap-6 md:grid-cols-2">
            {content.profiles.map((profile, index) => (
              <article
                key={profile.name}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
              >
                <ResponsiveImage
                  src={profile.image.src}
                  alt={profile.image.alt}
                  variant="programCard"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="rounded-none"
                  sizes="(max-width: 768px) 100vw, 36rem"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {profile.role}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                    {profile.name}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-slate-600">{profile.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              {language === "gu" ? "નોંધ" : "Note"}
            </p>
            <p className="mt-3 text-base leading-7 text-slate-600">{content.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}
