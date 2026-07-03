"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { siteMeta } from "@/data/siteMeta";
import { navigation } from "@/data/navigation";
import { homeContent } from "@/data/homeContent";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const meta = siteMeta[language];
  const content = navigation[language];
  const home = homeContent[language];

  const navLinks = [
    { label: content.navLinks.home, href: "/" },
    { label: content.navLinks.about, href: "/about" },
    { label: content.navLinks.programs, href: "/programs" },
    { label: content.navLinks.impact, href: "/impact" },
    { label: content.navLinks.gallery, href: "/gallery" },
    { label: content.navLinks.support, href: "/support" },
    { label: content.navLinks.contact, href: "/contact" },
  ];

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-900">
          <Image
            src="/images/logos/nab-logo.jpg"
            alt="NAB logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-sm object-contain"
            priority
          />
          <span>{meta.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="rounded-md text-sm font-medium text-slate-700 transition-colors hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div
            className="inline-flex rounded-full border border-slate-300 bg-white p-1 text-xs font-semibold text-slate-700"
            aria-label="Language toggle"
          >
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={`rounded-full px-3 py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
                language === "en" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("gu")}
              className={`rounded-full px-3 py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
                language === "gu" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              ગુજરાતી
            </button>
          </div>

          <Link
            href="/support"
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            {home.heroSecondaryCta}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <div
            className="inline-flex rounded-full border border-slate-300 bg-white p-1 text-[11px] font-semibold text-slate-700"
            aria-label="Language toggle"
          >
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                language === "en" ? "bg-slate-900 text-white" : "text-slate-700"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("gu")}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                language === "gu" ? "bg-slate-900 text-white" : "text-slate-700"
              }`}
            >
              ગુજરાતી
            </button>
          </div>

          <button
            type="button"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={content.mobileMenuLabel}
          >
            {content.mobileMenuLabel}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/support"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {home.heroSecondaryCta}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
