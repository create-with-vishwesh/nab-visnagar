"use client";

import { useLanguage } from "@/context/LanguageContext";
import { supportPageContent } from "@/data/supportPageContent";
import { QRCodeSVG } from "qrcode.react";
import { buildUpiPaymentUrl } from "@/utils/website-settings";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";

export default function SupportPage() {
  const { language } = useLanguage();
  const content = supportPageContent[language];
  const { settings } = useWebsiteSettings();
  const donationPanel = settings.donationPanel;
  const upiPaymentUrl = buildUpiPaymentUrl(settings);
  const showDonationPanel =
    donationPanel.enabled &&
    (donationPanel.accountHolderName || donationPanel.bankName || donationPanel.accountNumber || donationPanel.ifscCode || donationPanel.upiId);

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
              {content.whySupport.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.whySupport.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.whySupport.points.map((point) => (
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
              {content.waysToSupport.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.waysToSupport.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.waysToSupport.items.map((item) => (
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

      {showDonationPanel ? (
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-10">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Donation Panel
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Use the verified bank details below for contributions.
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Account Holder Name
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-slate-700">{donationPanel.accountHolderName}</dd>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Bank Name
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-slate-700">{donationPanel.bankName}</dd>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Branch Name
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-slate-700">{donationPanel.branchName}</dd>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Account Number
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-slate-700">{donationPanel.accountNumber}</dd>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      IFSC Code
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-slate-700">{donationPanel.ifscCode}</dd>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">UPI ID</dt>
                    <dd className="mt-2 text-sm leading-6 text-slate-700">{donationPanel.upiId}</dd>
                  </div>
                </dl>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Auto-generated QR Code
                  </p>
                  <div className="mt-6 flex justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    {upiPaymentUrl ? (
                      <QRCodeSVG value={upiPaymentUrl} size={220} includeMargin level="M" />
                    ) : null}
                  </div>
                  {donationPanel.donationNote ? (
                    <p className="mt-4 text-sm leading-6 text-slate-600">{donationPanel.donationNote}</p>
                  ) : null}
                </div>
              </div>
            </article>
          </div>
        </section>
      ) : null}

      <section className="bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <article className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.thankYou.heading}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{content.thankYou.text}</p>
          </article>
        </div>
      </section>

    </>
  );
}