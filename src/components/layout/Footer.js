"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteMeta } from "@/data/siteMeta";
import { navigation } from "@/data/navigation";
import { homeContent } from "@/data/homeContent";
import { contactContent } from "@/data/contactContent";

export default function Footer() {
  const { language } = useLanguage();
  const meta = siteMeta[language];
  const nav = navigation[language];
  const home = homeContent[language];
  const contact = contactContent[language];

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
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">{home.footerDescription}</p>
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
            <p>{contact.address}</p>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4">
        <p className="mx-auto max-w-7xl px-4 text-sm text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {meta.shortName}. {nav.copyrightText}
        </p>
      </div>
    </footer>
  );
}
