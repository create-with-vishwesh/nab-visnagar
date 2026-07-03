"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { defaultWebsiteSettings, normalizeWebsiteSettings } from "@/utils/website-settings";

const initialFormState = normalizeWebsiteSettings(defaultWebsiteSettings);

function cloneCategory(category) {
  return {
    value: category?.value || "",
    labels: {
      en: category?.labels?.en || "",
      gu: category?.labels?.gu || "",
    },
  };
}

function cloneFormSettings(settings) {
  return {
    contactInformation: {
      primaryPhone: settings.contactInformation.primaryPhone || "",
      secondaryPhone: settings.contactInformation.secondaryPhone || "",
      email: settings.contactInformation.email || "",
      whatsappNumber: settings.contactInformation.whatsappNumber || "",
    },
    socialMedia: {
      facebook: settings.socialMedia.facebook || "",
      instagram: settings.socialMedia.instagram || "",
      youtube: settings.socialMedia.youtube || "",
      linkedin: settings.socialMedia.linkedin || "",
    },
    donationPanel: {
      enabled: Boolean(settings.donationPanel.enabled),
      accountHolderName: settings.donationPanel.accountHolderName || "",
      bankName: settings.donationPanel.bankName || "",
      branchName: settings.donationPanel.branchName || "",
      accountNumber: settings.donationPanel.accountNumber || "",
      ifscCode: settings.donationPanel.ifscCode || "",
      upiId: settings.donationPanel.upiId || "",
      donationNote: settings.donationPanel.donationNote || "",
    },
    officeHours: {
      mondayFriday: settings.officeHours.mondayFriday || "",
      saturday: settings.officeHours.saturday || "",
      sunday: settings.officeHours.sunday || "",
      holidayMessage: settings.officeHours.holidayMessage || "",
    },
    contactCategories: Array.isArray(settings.contactCategories) && settings.contactCategories.length > 0
      ? settings.contactCategories.map(cloneCategory)
      : initialFormState.contactCategories.map(cloneCategory),
    footerSettings: {
      organizationShortDescription: settings.footerSettings.organizationShortDescription || "",
      copyrightText: settings.footerSettings.copyrightText || "",
      developerCredit: settings.footerSettings.developerCredit || "",
    },
  };
}

function Section({ title, description, children }) {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-xl font-bold tracking-tight text-slate-900">{title}</h3>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Field({ label, id, value, onChange, type = "text", textarea = false, helperText }) {
  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-900/10";

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700" htmlFor={id}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          className={`${inputClassName} min-h-24`}
        />
      ) : (
        <input id={id} type={type} value={value} onChange={onChange} className={inputClassName} />
      )}
      {helperText ? <p className="mt-2 text-xs leading-5 text-slate-500">{helperText}</p> : null}
    </div>
  );
}

export default function WebsiteSettingsManager() {
  const router = useRouter();
  const [form, setForm] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const sections = useMemo(
    () => [
      {
        title: "Contact Information",
        description: "Primary contact details used by the footer and contact page.",
      },
      {
        title: "Social Media",
        description: "Add verified social profile URLs used on the public footer.",
      },
      {
        title: "Donation / Payment Panel",
        description: "Enable the public donation panel, then enter the verified banking and UPI details.",
      },
      {
        title: "Office Hours",
        description: "Set the office schedule displayed on the contact page.",
      },
      {
        title: "Contact Categories",
        description: "Edit the inquiry categories shown in the contact form.",
      },
      {
        title: "Footer Settings",
        description: "Edit the short description, copyright text, and developer credit used in the footer.",
      },
    ],
    []
  );

  async function loadSettings() {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/settings", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to load website settings.");
      }

      setForm(cloneFormSettings(normalizeWebsiteSettings(data?.data)));
    } catch (error) {
      setErrorMessage(error.message || "Unable to load website settings.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  function updateContactInformation(field, value) {
    setForm((current) => ({
      ...current,
      contactInformation: {
        ...current.contactInformation,
        [field]: value,
      },
    }));
  }

  function updateSocialMedia(field, value) {
    setForm((current) => ({
      ...current,
      socialMedia: {
        ...current.socialMedia,
        [field]: value,
      },
    }));
  }

  function updateDonationPanel(field, value) {
    setForm((current) => ({
      ...current,
      donationPanel: {
        ...current.donationPanel,
        [field]: value,
      },
    }));
  }

  function updateOfficeHours(field, value) {
    setForm((current) => ({
      ...current,
      officeHours: {
        ...current.officeHours,
        [field]: value,
      },
    }));
  }

  function updateFooterSettings(field, value) {
    setForm((current) => ({
      ...current,
      footerSettings: {
        ...current.footerSettings,
        [field]: value,
      },
    }));
  }

  function updateCategory(index, field, value) {
    setForm((current) => ({
      ...current,
      contactCategories: current.contactCategories.map((category, categoryIndex) =>
        categoryIndex === index
          ? {
              ...category,
              ...(field === "value"
                ? { value }
                : {
                    labels: {
                      ...category.labels,
                      [field]: value,
                    },
                  }),
            }
          : category
      ),
    }));
  }

  function addCategory() {
    setForm((current) => ({
      ...current,
      contactCategories: [
        ...current.contactCategories,
        {
          value: "",
          labels: {
            en: "",
            gu: "",
          },
        },
      ],
    }));
  }

  function removeCategory(index) {
    setForm((current) => ({
      ...current,
      contactCategories: current.contactCategories.filter((_, categoryIndex) => categoryIndex !== index),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to save website settings.");
      }

      setForm(cloneFormSettings(normalizeWebsiteSettings(data?.data)));
      setSuccessMessage("Website settings saved.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to save website settings.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Website Settings</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Organization settings</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Edit the current public website settings and save them through the existing admin API.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
      ) : null}

      {successMessage ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          Loading settings...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Section title={sections[0].title} description={sections[0].description}>
              <div className="grid gap-4">
                <Field
                  id="primaryPhone"
                  label="Primary Phone"
                  value={form.contactInformation.primaryPhone}
                  onChange={(event) => updateContactInformation("primaryPhone", event.target.value)}
                />
                <Field
                  id="secondaryPhone"
                  label="Secondary Phone"
                  value={form.contactInformation.secondaryPhone}
                  onChange={(event) => updateContactInformation("secondaryPhone", event.target.value)}
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  value={form.contactInformation.email}
                  onChange={(event) => updateContactInformation("email", event.target.value)}
                />
                <Field
                  id="whatsappNumber"
                  label="WhatsApp Number"
                  value={form.contactInformation.whatsappNumber}
                  onChange={(event) => updateContactInformation("whatsappNumber", event.target.value)}
                  helperText="Use the published WhatsApp number shown on the contact page."
                />
              </div>
            </Section>

            <Section title={sections[1].title} description={sections[1].description}>
              <div className="grid gap-4">
                <Field
                  id="facebook"
                  label="Facebook"
                  value={form.socialMedia.facebook}
                  onChange={(event) => updateSocialMedia("facebook", event.target.value)}
                />
                <Field
                  id="instagram"
                  label="Instagram"
                  value={form.socialMedia.instagram}
                  onChange={(event) => updateSocialMedia("instagram", event.target.value)}
                />
                <Field
                  id="youtube"
                  label="YouTube"
                  value={form.socialMedia.youtube}
                  onChange={(event) => updateSocialMedia("youtube", event.target.value)}
                />
                <Field
                  id="linkedin"
                  label="LinkedIn"
                  value={form.socialMedia.linkedin}
                  onChange={(event) => updateSocialMedia("linkedin", event.target.value)}
                />
              </div>
            </Section>

            <Section title={sections[2].title} description={sections[2].description}>
              <div className="grid gap-4">
                <label className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.donationPanel.enabled}
                    onChange={(event) => updateDonationPanel("enabled", event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                  />
                  Enable Payment Panel
                </label>
                <Field
                  id="accountHolderName"
                  label="Account Holder Name"
                  value={form.donationPanel.accountHolderName}
                  onChange={(event) => updateDonationPanel("accountHolderName", event.target.value)}
                />
                <Field
                  id="bankName"
                  label="Bank Name"
                  value={form.donationPanel.bankName}
                  onChange={(event) => updateDonationPanel("bankName", event.target.value)}
                />
                <Field
                  id="branchName"
                  label="Branch Name"
                  value={form.donationPanel.branchName}
                  onChange={(event) => updateDonationPanel("branchName", event.target.value)}
                />
                <Field
                  id="accountNumber"
                  label="Account Number"
                  value={form.donationPanel.accountNumber}
                  onChange={(event) => updateDonationPanel("accountNumber", event.target.value)}
                />
                <Field
                  id="ifscCode"
                  label="IFSC Code"
                  value={form.donationPanel.ifscCode}
                  onChange={(event) => updateDonationPanel("ifscCode", event.target.value)}
                />
                <Field
                  id="upiId"
                  label="UPI ID"
                  value={form.donationPanel.upiId}
                  onChange={(event) => updateDonationPanel("upiId", event.target.value)}
                  helperText="The public support page will generate the QR code from this UPI ID."
                />
                <Field
                  id="donationNote"
                  label="Donation Note"
                  textarea
                  value={form.donationPanel.donationNote}
                  onChange={(event) => updateDonationPanel("donationNote", event.target.value)}
                />
              </div>
            </Section>

            <Section title={sections[3].title} description={sections[3].description}>
              <div className="grid gap-4">
                <Field
                  id="mondayFriday"
                  label="Monday–Friday"
                  value={form.officeHours.mondayFriday}
                  onChange={(event) => updateOfficeHours("mondayFriday", event.target.value)}
                />
                <Field
                  id="saturday"
                  label="Saturday"
                  value={form.officeHours.saturday}
                  onChange={(event) => updateOfficeHours("saturday", event.target.value)}
                />
                <Field
                  id="sunday"
                  label="Sunday"
                  value={form.officeHours.sunday}
                  onChange={(event) => updateOfficeHours("sunday", event.target.value)}
                />
                <Field
                  id="holidayMessage"
                  label="Holiday Message"
                  textarea
                  value={form.officeHours.holidayMessage}
                  onChange={(event) => updateOfficeHours("holidayMessage", event.target.value)}
                />
              </div>
            </Section>

            <Section title={sections[4].title} description={sections[4].description}>
              <div className="space-y-4">
                {form.contactCategories.map((category, index) => (
                  <div key={`${category.value || "category"}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_1fr_1fr_auto] lg:items-start">
                      <Field
                        id={`category-value-${index}`}
                        label="Value"
                        value={category.value}
                        onChange={(event) => updateCategory(index, "value", event.target.value)}
                      />
                      <Field
                        id={`category-en-${index}`}
                        label="English Label"
                        value={category.labels.en}
                        onChange={(event) => updateCategory(index, "en", event.target.value)}
                      />
                      <Field
                        id={`category-gu-${index}`}
                        label="Gujarati Label"
                        value={category.labels.gu}
                        onChange={(event) => updateCategory(index, "gu", event.target.value)}
                      />
                      <div className="pt-7 lg:pt-9">
                        <button
                          type="button"
                          onClick={() => removeCategory(index)}
                          className="inline-flex items-center justify-center rounded-xl border border-rose-200 px-4 py-3 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addCategory}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
                >
                  Add Category
                </button>
              </div>
            </Section>

            <Section title={sections[5].title} description={sections[5].description}>
              <div className="grid gap-4">
                <Field
                  id="organizationShortDescription"
                  label="Organization Short Description"
                  textarea
                  value={form.footerSettings.organizationShortDescription}
                  onChange={(event) => updateFooterSettings("organizationShortDescription", event.target.value)}
                />
                <Field
                  id="copyrightText"
                  label="Copyright Text"
                  value={form.footerSettings.copyrightText}
                  onChange={(event) => updateFooterSettings("copyrightText", event.target.value)}
                />
                <Field
                  id="developerCredit"
                  label="Developer Credit"
                  value={form.footerSettings.developerCredit}
                  onChange={(event) => updateFooterSettings("developerCredit", event.target.value)}
                />
              </div>
            </Section>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}