"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteMeta } from "@/data/siteMeta";
import { navigation } from "@/data/navigation";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";

function getExternalLink(url) {
  if (!url) {
    return "";
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `https://${url.replace(/^\/\//, "")}`;
}

export default function Footer() {
  const { language } = useLanguage();
  const meta = siteMeta[language];
  const nav = navigation[language];
  const { settings } = useWebsiteSettings();

  const { contactInformation, socialMedia, footerSettings } = settings;

  const quickLinks = [
    { label: nav.navLinks.home, href: "/" },
    { label: nav.navLinks.about, href: "/about" },
    { label: nav.navLinks.programs, href: "/programs" },
    { label: nav.navLinks.gallery, href: "/gallery" },
    { label: nav.navLinks.contact, href: "/contact" },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logos/nab-logo.jpg"
              alt="NAB logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-sm object-contain"
            />
            <h2 className="text-base font-semibold text-slate-900">{meta.orgName}</h2>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            {footerSettings.organizationShortDescription}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">{nav.quickLinksHeading}</h3>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-slate-600 hover:text-slate-900">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">{nav.contactHeading}</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            {contactInformation.primaryPhone ? (
              <p>
                Phone: <a href={`tel:${contactInformation.primaryPhone}`} className="hover:text-slate-900">{contactInformation.primaryPhone}</a>
              </p>
            ) : null}
            {contactInformation.email ? (
              <p>
                Email: <a href={`mailto:${contactInformation.email}`} className="hover:text-slate-900">{contactInformation.email}</a>
              </p>
            ) : null}
            {contactInformation.whatsappNumber ? (
              <p>
                WhatsApp: <a href={`https://wa.me/${contactInformation.whatsappNumber.replace(/\D/g, "")}`} className="hover:text-slate-900" target="_blank" rel="noreferrer">{contactInformation.whatsappNumber}</a>
              </p>
            ) : null}
            {socialMedia.facebook || socialMedia.instagram || socialMedia.youtube || socialMedia.linkedin ? (
              <div className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Social media</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    ["Facebook", socialMedia.facebook],
                    ["Instagram", socialMedia.instagram],
                    ["YouTube", socialMedia.youtube],
                    ["LinkedIn", socialMedia.linkedin],
                  ].map(([label, url]) =>
                    url ? (
                      <a
                        key={label}
                        href={getExternalLink(url)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 hover:border-slate-400 hover:text-slate-900"
                      >
                        {label}
                      </a>
                    ) : null
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 text-sm text-slate-500 sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {meta.shortName}. {footerSettings.copyrightText}
          </p>
          {footerSettings.developerCredit ? <p>{footerSettings.developerCredit}</p> : null}
        </div>
      </div>
    </footer>
  );
}
