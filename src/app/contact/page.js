"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteMeta } from "@/data/siteMeta";
import { contactContent } from "@/data/contactContent";
import { contactPageContent } from "@/data/contactPageContent";

const FORM_STATE_COPY = {
  en: {
    required: "Please complete this field.",
    invalidEmail: "Enter a valid email address or phone number.",
    invalidMessage: "Your message should be at least 20 characters.",
    submitting: "Sending locally...",
    success: "Your message is ready. This front-end form is not connected to a backend yet.",
    error: "Please fix the highlighted fields and try again.",
  },
  gu: {
    required: "કૃપા કરીને આ ફીલ્ડ પૂરી કરો.",
    invalidEmail: "માન્ય ઈમેલ સરનામું અથવા ફોન નંબર દાખલ કરો.",
    invalidMessage: "તમારો સંદેશ ઓછામાં ઓછો 20 અક્ષરોનો હોવો જોઈએ.",
    submitting: "સ્થાનિક રીતે મોકલી રહ્યા છીએ...",
    success: "તમારો સંદેશ તૈયાર છે. આ ફ્રન્ટએન્ડ ફોર્મ હજી બેકએન્ડ સાથે જોડાયેલ નથી.",
    error: "કૃપા કરીને હાઇલાઇટ થયેલા ક્ષેત્રો સુધારીને ફરી પ્રયાસ કરો.",
  },
};

const FORM_FIELDS = ["name", "contact", "subject", "message"];

function validateContactForm(values, strings) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = strings.required;
  }

  if (!values.contact.trim()) {
    errors.contact = strings.required;
  } else if (!/[\w.+-]+@\w+\.\w+|\d{7,}/.test(values.contact.trim())) {
    errors.contact = strings.invalidEmail;
  }

  if (!values.subject.trim()) {
    errors.subject = strings.required;
  }

  if (!values.message.trim()) {
    errors.message = strings.required;
  } else if (values.message.trim().length < 20) {
    errors.message = strings.invalidMessage;
  }

  return errors;
}

export default function ContactPage() {
  const { language } = useLanguage();
  const meta = siteMeta[language];
  const contact = contactContent[language];
  const content = contactPageContent[language];
  const formCopy = FORM_STATE_COPY[language] || FORM_STATE_COPY.en;

  const [values, setValues] = useState({
    name: "",
    contact: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const fieldLabels = useMemo(() => {
    const [nameLabel, contactLabel, subjectLabel, messageLabel] = content.contactForm.fields;

    return {
      name: nameLabel,
      contact: contactLabel,
      subject: subjectLabel,
      message: messageLabel,
    };
  }, [content.contactForm.fields]);

  const handleChange = (field) => (event) => {
    const nextValue = event.target.value;

    setValues((currentValues) => ({
      ...currentValues,
      [field]: nextValue,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const handleBlur = (field) => () => {
    setTouched((currentTouched) => ({
      ...currentTouched,
      [field]: true,
    }));

    const nextErrors = validateContactForm(values, formCopy);
    setErrors(nextErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextTouched = FORM_FIELDS.reduce(
      (accumulator, field) => ({
        ...accumulator,
        [field]: true,
      }),
      {}
    );

    const nextErrors = validateContactForm(values, formCopy);

    setTouched(nextTouched);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    window.setTimeout(() => {
      setStatus("success");
      setValues({
        name: "",
        contact: "",
        subject: "",
        message: "",
      });
      setTouched({});
      setErrors({});
    }, 700);
  };

  const hasValidationErrors = Object.keys(errors).length > 0;
  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  const contactRows = [
    {
      label: content.contactCards.addressLabel,
      value: contact.address,
    },
    {
      label: content.contactCards.phoneLabel,
      value: contact.phone,
    },
    {
      label: content.contactCards.emailLabel,
      value: contact.email,
    },
  ];

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
              {content.detailsSection.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.detailsSection.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {contactRows.map((row) => (
              <article
                key={row.label}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {row.label}
                </p>
                <p className="mt-3 text-base leading-7 text-slate-700">{row.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">{content.officeHours.heading}</h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">{content.officeHours.text}</p>
            </article>
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">{content.mapsPlaceholder.heading}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{content.mapsPlaceholder.text}</p>
              <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <iframe
                  src={content.mapsPlaceholder.embedSrc}
                  title={content.mapsPlaceholder.embedTitle}
                  width="600"
                  height="450"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-[320px] w-full border-0 sm:h-[380px]"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.connectSection.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.connectSection.text}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.connectSection.points.map((point) => (
              <article
                key={point.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{point.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">{content.contactForm.heading}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{content.contactForm.text}</p>
              <form className="mt-6 space-y-4" noValidate onSubmit={handleSubmit}>
                <div aria-live="polite" className="min-h-6 text-sm">
                  {isSuccess ? <p className="font-medium text-emerald-700">{formCopy.success}</p> : null}
                  {status === "error" && hasValidationErrors ? <p className="font-medium text-rose-700">{formCopy.error}</p> : null}
                </div>

                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-700">
                    {fieldLabels.name}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    value={values.name}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    aria-invalid={Boolean(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? "contact-name-error" : undefined}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                  {touched.name && errors.name ? (
                    <p id="contact-name-error" className="mt-2 text-sm font-medium text-rose-700">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-contact" className="mb-2 block text-sm font-medium text-slate-700">
                    {fieldLabels.contact}
                  </label>
                  <input
                    id="contact-contact"
                    name="contact"
                    value={values.contact}
                    onChange={handleChange("contact")}
                    onBlur={handleBlur("contact")}
                    aria-invalid={Boolean(touched.contact && errors.contact)}
                    aria-describedby={touched.contact && errors.contact ? "contact-contact-error" : undefined}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                  {touched.contact && errors.contact ? (
                    <p id="contact-contact-error" className="mt-2 text-sm font-medium text-rose-700">
                      {errors.contact}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-slate-700">
                    {fieldLabels.subject}
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange("subject")}
                    onBlur={handleBlur("subject")}
                    aria-invalid={Boolean(touched.subject && errors.subject)}
                    aria-describedby={touched.subject && errors.subject ? "contact-subject-error" : undefined}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                  {touched.subject && errors.subject ? (
                    <p id="contact-subject-error" className="mt-2 text-sm font-medium text-rose-700">
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-700">
                    {fieldLabels.message}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={handleChange("message")}
                    onBlur={handleBlur("message")}
                    aria-invalid={Boolean(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? "contact-message-error" : undefined}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                  {touched.message && errors.message ? (
                    <p id="contact-message-error" className="mt-2 text-sm font-medium text-rose-700">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isSubmitting ? formCopy.submitting : content.contactForm.buttonLabel}
                </button>
              </form>
            </article>

            <div className="space-y-6">
              <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{content.socialLinks.heading}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{content.socialLinks.text}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {content.socialLinks.items.map((item) => (
                    <span key={item} className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600">{item}</span>
                  ))}
                </div>
              </article>

              <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{content.emergencyContact.heading}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{content.emergencyContact.text}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.inquirySection.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.inquirySection.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {content.inquirySection.items.map((item) => (
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
              href="/support"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100"
            >
              {content.cta.secondaryLabel}
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-8 py-3 font-medium text-white transition-colors hover:bg-slate-800"
            >
              {content.cta.primaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}