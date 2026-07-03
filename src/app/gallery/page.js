"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ResponsiveImage from "@/components/common/ResponsiveImage";
import EmptyState from "@/components/common/EmptyState";
import { siteMeta } from "@/data/siteMeta";
import { galleryData } from "@/data/galleryData";

export default function GalleryPage() {
  const { language } = useLanguage();
  const meta = siteMeta[language];
  const content = galleryData[language];
  const ui = content.galleryUi;
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(content.items.map((item) => item.category)));

    return ["all", ...uniqueCategories];
  }, [content.items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return content.items;
    }

    return content.items.filter((item) => item.category === activeCategory);
  }, [activeCategory, content.items]);

  const safeActiveAlbumIndex =
    activeAlbumIndex === null || filteredItems.length === 0
      ? null
      : Math.min(activeAlbumIndex, filteredItems.length - 1);
  const activeAlbum = safeActiveAlbumIndex === null ? null : filteredItems[safeActiveAlbumIndex] || null;
  const safeActiveImageIndex =
    activeAlbum && activeAlbum.images.length > 0
      ? Math.min(activeImageIndex, activeAlbum.images.length - 1)
      : 0;
  const activeImageSrc = activeAlbum ? activeAlbum.images[safeActiveImageIndex] || activeAlbum.images[0] : null;

  useEffect(() => {
    if (!activeAlbum) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveAlbumIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveImageIndex((currentIndex) =>
          currentIndex === null ? 0 : (currentIndex + 1) % activeAlbum.images.length
        );
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveImageIndex((currentIndex) =>
          currentIndex === null
            ? 0
            : (currentIndex - 1 + activeAlbum.images.length) % activeAlbum.images.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeAlbum]);

  const closeLightbox = () => setActiveAlbumIndex(null);
  const openLightbox = (index) => {
    setActiveAlbumIndex(index);
    setActiveImageIndex(0);
  };
  const goToPrevious = () => {
    if (!activeAlbum || activeAlbum.images.length === 0) {
      return;
    }

    setActiveImageIndex((currentIndex) =>
      currentIndex === null
        ? 0
        : (currentIndex - 1 + activeAlbum.images.length) % activeAlbum.images.length
    );
  };
  const goToNext = () => {
    if (!activeAlbum || activeAlbum.images.length === 0) {
      return;
    }

    setActiveImageIndex((currentIndex) =>
      currentIndex === null ? 0 : (currentIndex + 1) % activeAlbum.images.length
    );
  };

  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{content.hero.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{content.hero.title}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">{content.hero.intro}</p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{content.introSection.heading}</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.introSection.text}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3" aria-label={ui.categoriesAriaLabel}>
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {category === "all" ? ui.allCategoryLabel : category}
                </button>
              );
            })}
          </div>

          <div className="mt-12">
            {filteredItems.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item, index) => (
                  <article key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-shadow hover:shadow-md">
                    <div className="border-b border-dashed border-slate-300 p-6 text-sm text-slate-500">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600">{item.category}</span>
                      </div>
                      <ResponsiveImage
                        src={item.images[0]}
                        alt={item.altText}
                        variant="galleryCard"
                        className="rounded-lg border border-dashed border-slate-300 bg-white"
                        onClick={() => openLightbox(index)}
                        buttonLabel={ui.openViewerLabel(item.title)}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title={ui.emptyState.title}
                description={ui.emptyState.description}
              />
            )}
          </div>
        </div>
      </section>

      {activeAlbum ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          aria-describedby="gallery-lightbox-description"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label={ui.lightbox.closeDialogLabel}
            onClick={closeLightbox}
          />
          <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-slate-950/30">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{ui.lightbox.previewLabel}</p>
                <h3 id="gallery-lightbox-title" className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                  {activeAlbum.title}
                </h3>
                <p id="gallery-lightbox-description" className="mt-2 text-sm leading-6 text-slate-600">
                  {activeAlbum.description}
                </p>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                aria-label={ui.closePreviewLabel(activeAlbum.title)}
              >
                {ui.lightbox.closeButtonLabel}
              </button>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.6fr_1fr]">
              <div className="bg-slate-950 p-4 sm:p-6">
                <ResponsiveImage
                  src={activeImageSrc}
                  alt={activeAlbum.altText}
                  variant="galleryCard"
                  priority
                  loading="eager"
                  className="rounded-2xl bg-slate-900"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>

              <div className="flex flex-col justify-between gap-6 p-5 sm:p-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600">
                      {activeAlbum.category}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{activeAlbum.altText}</p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    disabled={activeAlbum.images.length <= 1}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                    aria-label={ui.previousImageLabel(activeAlbum.title)}
                  >
                    {ui.lightbox.previousButtonLabel}
                  </button>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Image {safeActiveImageIndex + 1} of {activeAlbum.images.length}
                  </span>
                  <button
                    type="button"
                    onClick={goToNext}
                    disabled={activeAlbum.images.length <= 1}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-900"
                    aria-label={ui.nextImageLabel(activeAlbum.title)}
                  >
                    {ui.lightbox.nextButtonLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <section className="bg-slate-900 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">{meta.shortName}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{ui.cta.heading}</h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">{ui.cta.text}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100">
              {ui.cta.primaryLabel}
            </Link>
            <Link href="/support" className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-8 py-3 font-medium text-white transition-colors hover:bg-slate-800">
              {ui.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}