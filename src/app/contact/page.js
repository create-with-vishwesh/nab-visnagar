"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { contactPageContent } from "@/data/contactPageContent";
import { getContactCategoryOptions } from "@/utils/website-settings";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";

const FORM_STATE_COPY = {
  en: {
    required: "Please complete this field.",
    invalidEmail: "Enter a valid email address or phone number.",
    invalidMessage: "Your message should be at least 20 characters.",
    submitting: "Sending message...",
    success: "Thank you. Your message has been sent.",
    error: "We couldn't send your message. Please try again.",
  },
  gu: {
    required: "કૃપા કરીને આ ફીલ્ડ પૂરી કરો.",
    invalidEmail: "માન્ય ઈમેલ સરનામું અથવા ફોન નંબર દાખલ કરો.",
    invalidMessage: "તમારો સંદેશ ઓછામાં ઓછો 20 અક્ષરોનો હોવો જોઈએ.",
    submitting: "સંદેશ મોકલી રહ્યા છીએ...",
    success: "આભાર. તમારો સંદેશ મોકલવામાં આવ્યો છે.",
    error: "તમારો સંદેશ મોકલી શકાયો નથી. કૃપા કરીને ફરી પ્રયાસ કરો.",
  },
};

const FORM_FIELDS = ["name", "contact", "category", "message"];

function validateContactForm(values, strings, allowedCategoryValues) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = strings.required;
  }

  if (!values.contact.trim()) {
    errors.contact = strings.required;
  } else if (!/[\w.+-]+@\w+\.\w+|\d{7,}/.test(values.contact.trim())) {
    errors.contact = strings.invalidEmail;
  }

  if (!values.category.trim()) {
    errors.category = strings.required;
  } else if (!allowedCategoryValues.includes(values.category.trim())) {
    errors.category = strings.required;
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
  const content = contactPageContent[language];
  const formCopy = FORM_STATE_COPY[language] || FORM_STATE_COPY.en;
  const { settings } = useWebsiteSettings();

  const categoryOptions = useMemo(
    () => getContactCategoryOptions(settings.contactCategories, language),
    [language, settings.contactCategories]
  );
  const allowedCategoryValues = useMemo(
    () => categoryOptions.map((category) => category.value),
    [categoryOptions]
  );

  const [values, setValues] = useState({
    name: "",
    contact: "",
    category: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const fieldLabels = useMemo(() => {
    return {
      name: content.contactForm.labels.name,
      contact: content.contactForm.labels.contact,
      category: content.contactForm.labels.category,
      message: content.contactForm.labels.message,
    };
  }, [content.contactForm.labels]);

  const handleChange = (field) => (event) => {
    const nextValue = event.target.value;

    setValues((currentValues) => ({
      ...currentValues,
      [field]: nextValue,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }

    if (submitError) {
      setSubmitError("");
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

    const nextErrors = validateContactForm(values, formCopy, allowedCategoryValues);
    setErrors(nextErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const nextTouched = FORM_FIELDS.reduce(
      (accumulator, field) => ({
        ...accumulator,
        [field]: true,
      }),
      {}
    );

    const nextErrors = validateContactForm(values, formCopy, allowedCategoryValues);

    setTouched(nextTouched);
    setErrors(nextErrors);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || formCopy.error);
      }

      setStatus("success");
      setValues({
        name: "",
        contact: "",
        category: "",
        message: "",
      });
      setTouched({});
      setErrors({});
    } catch (error) {
      setSubmitError(error.message || formCopy.error);
      setStatus("error");
    }
  };

  const hasValidationErrors = Object.keys(errors).length > 0;
  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  const { contactInformation, officeHours } = settings;
  const phoneHref = contactInformation.primaryPhone ? `tel:${contactInformation.primaryPhone}` : "";
  const emailHref = contactInformation.email ? `mailto:${contactInformation.email}` : "";
  const whatsappHref = contactInformation.whatsappNumber
    ? `https://wa.me/${contactInformation.whatsappNumber.replace(/\D/g, "")}`
    : "";

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
              {content.contactInfo.heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{content.contactInfo.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {content.contactInfo.labels.primaryPhone}
              </p>
              {contactInformation.primaryPhone ? (
                <p className="mt-3 text-base leading-7 text-slate-700">
                  <a href={phoneHref} className="hover:text-slate-900">
                    {contactInformation.primaryPhone}
                  </a>
                </p>
              ) : null}
              {contactInformation.secondaryPhone ? (
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {content.contactInfo.labels.secondaryPhone}: {contactInformation.secondaryPhone}
                </p>
              ) : null}
            </article>
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {content.contactInfo.labels.email}
              </p>
              {contactInformation.email ? (
                <p className="mt-3 text-base leading-7 text-slate-700">
                  <a href={emailHref} className="hover:text-slate-900">
                    {contactInformation.email}
                  </a>
                </p>
              ) : null}
            </article>
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {content.contactInfo.labels.whatsappNumber}
              </p>
              {contactInformation.whatsappNumber ? (
                <p className="mt-3 text-base leading-7 text-slate-700">
                  <a href={whatsappHref} className="hover:text-slate-900" target="_blank" rel="noreferrer">
                    {contactInformation.whatsappNumber}
                  </a>
                </p>
              ) : null}
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">{content.officeHours.heading}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{content.officeHours.intro}</p>
              <dl className="mt-6 space-y-4">
                <div className="flex items-start justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
                  <dt className="text-sm font-medium text-slate-500">{content.officeHours.labels.mondayFriday}</dt>
                  <dd className="text-sm text-slate-700">{officeHours.mondayFriday}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
                  <dt className="text-sm font-medium text-slate-500">{content.officeHours.labels.saturday}</dt>
                  <dd className="text-sm text-slate-700">{officeHours.saturday}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
                  <dt className="text-sm font-medium text-slate-500">{content.officeHours.labels.sunday}</dt>
                  <dd className="text-sm text-slate-700">{officeHours.sunday}</dd>
                </div>
                <div className="rounded-lg bg-slate-50 px-4 py-3">
                  <dt className="text-sm font-medium text-slate-500">{content.officeHours.labels.holidayMessage}</dt>
                  <dd className="mt-2 text-sm text-slate-700">{officeHours.holidayMessage}</dd>
                </div>
              </dl>
            </article>
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">{content.contactCategories.heading}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{content.contactCategories.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {categoryOptions.map((option) => (
                  <span key={option.value} className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                    {option.label}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">{content.contactForm.heading}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{content.contactForm.text}</p>
              <form className="mt-6 space-y-4" noValidate onSubmit={handleSubmit} aria-busy={isSubmitting}>
                <div aria-live="polite" className="min-h-6 text-sm">
                  {isSuccess ? <p className="font-medium text-emerald-700">{formCopy.success}</p> : null}
                  {status === "error" && submitError ? <p className="font-medium text-rose-700">{submitError}</p> : null}
                  {status === "error" && !submitError && hasValidationErrors ? <p className="font-medium text-rose-700">{formCopy.error}</p> : null}
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
                  <label htmlFor="contact-category" className="mb-2 block text-sm font-medium text-slate-700">
                    {fieldLabels.category}
                  </label>
                  <select
                    id="contact-category"
                    name="category"
                    value={values.category}
                    onChange={handleChange("category")}
                    onBlur={handleBlur("category")}
                    aria-invalid={Boolean(touched.category && errors.category)}
                    aria-describedby={touched.category && errors.category ? "contact-category-error" : undefined}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  >
                    <option value="">{fieldLabels.category}</option>
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {touched.category && errors.category ? (
                    <p id="contact-category-error" className="mt-2 text-sm font-medium text-rose-700">
                      {errors.category}
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
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{content.cta.heading}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{content.cta.text}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/programs"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
                  >
                    {content.cta.primaryLabel}
                  </Link>
                  <Link
                    href="/support"
                    className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                  >
                    {content.cta.secondaryLabel}
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}