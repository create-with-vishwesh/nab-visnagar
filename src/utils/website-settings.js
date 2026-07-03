import { contactCategories as defaultContactCategories } from "@/data/contactCategories";
import { contactContent } from "@/data/contactContent";
import { homeContent } from "@/data/homeContent";
import { navigation } from "@/data/navigation";
import { organizationInfo } from "@/data/organizationInfo";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeCategory(category) {
  if (!category) {
    return null;
  }

  if (typeof category === "string") {
    const value = category.trim();

    if (!value) {
      return null;
    }

    return {
      value,
      labels: {
        en: value,
        gu: value,
      },
    };
  }

  if (typeof category !== "object") {
    return null;
  }

  const value = normalizeText(category.value || category.en || category.label || category.labels?.en);

  if (!value) {
    return null;
  }

  return {
    value,
    labels: {
      en: normalizeText(category.labels?.en || category.en || value) || value,
      gu: normalizeText(category.labels?.gu || category.gu || value) || value,
    },
  };
}

function normalizeCategoryList(categories) {
  const source = Array.isArray(categories) && categories.length > 0 ? categories : defaultContactCategories;
  const normalized = source.map(normalizeCategory).filter(Boolean);

  return normalized.length > 0 ? normalized : defaultContactCategories;
}

function toStringOrFallback(value, fallback = "") {
  const text = normalizeText(value);

  return text || fallback;
}

export const defaultWebsiteSettings = {
  contactInformation: {
    primaryPhone: contactContent.en.phone,
    secondaryPhone: "",
    email: contactContent.en.email,
    whatsappNumber: "",
  },
  socialMedia: {
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  },
  donationPanel: {
    enabled: false,
    accountHolderName: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    donationNote: "",
  },
  officeHours: {
    mondayFriday: "11 am–5 pm",
    saturday: "11 am–5 pm",
    sunday: "Closed",
    holidayMessage: "Please contact the office before visiting on holidays.",
  },
  contactCategories: defaultContactCategories,
  footerSettings: {
    organizationShortDescription:
      homeContent.en.footerDescription || organizationInfo.en.shortSummary || "",
    copyrightText: navigation.en.copyrightText,
    developerCredit: "",
  },
};

export function normalizeWebsiteSettings(settings = {}) {
  const contactInformation = settings.contactInformation || {};
  const socialMedia = settings.socialMedia || settings.socialLinks || {};
  const donationPanel = settings.donationPanel || {};
  const officeHours = settings.officeHours || {};
  const footerSettings = settings.footerSettings || {};
  const legacyOfficeHours = typeof settings.officeHours === "string" ? settings.officeHours.trim() : "";

  return {
    contactInformation: {
      primaryPhone: toStringOrFallback(
        contactInformation.primaryPhone,
        normalizeText(settings.phone) || defaultWebsiteSettings.contactInformation.primaryPhone
      ),
      secondaryPhone: toStringOrFallback(contactInformation.secondaryPhone),
      email: toStringOrFallback(
        contactInformation.email,
        normalizeText(settings.email) || defaultWebsiteSettings.contactInformation.email
      ),
      whatsappNumber: toStringOrFallback(contactInformation.whatsappNumber || settings.whatsappNumber || settings.whatsapp),
    },
    socialMedia: {
      facebook: toStringOrFallback(socialMedia.facebook),
      instagram: toStringOrFallback(socialMedia.instagram),
      youtube: toStringOrFallback(socialMedia.youtube),
      linkedin: toStringOrFallback(socialMedia.linkedin),
    },
    donationPanel: {
      enabled: Boolean(donationPanel.enabled ?? settings.enablePaymentPanel ?? false),
      accountHolderName: toStringOrFallback(donationPanel.accountHolderName || settings.accountHolderName),
      bankName: toStringOrFallback(donationPanel.bankName || settings.bankName),
      branchName: toStringOrFallback(donationPanel.branchName || settings.branchName),
      accountNumber: toStringOrFallback(donationPanel.accountNumber || settings.accountNumber),
      ifscCode: toStringOrFallback(donationPanel.ifscCode || settings.ifscCode),
      upiId: toStringOrFallback(donationPanel.upiId || settings.upiId),
      donationNote: toStringOrFallback(donationPanel.donationNote || settings.donationNote),
    },
    officeHours: {
      mondayFriday: toStringOrFallback(
        officeHours.mondayFriday || settings.officeHours?.mondayFriday,
        legacyOfficeHours || defaultWebsiteSettings.officeHours.mondayFriday
      ),
      saturday: toStringOrFallback(
        officeHours.saturday || settings.officeHours?.saturday,
        defaultWebsiteSettings.officeHours.saturday
      ),
      sunday: toStringOrFallback(
        officeHours.sunday || settings.officeHours?.sunday,
        defaultWebsiteSettings.officeHours.sunday
      ),
      holidayMessage: toStringOrFallback(
        officeHours.holidayMessage || settings.officeHours?.holidayMessage,
        defaultWebsiteSettings.officeHours.holidayMessage
      ),
    },
    contactCategories: normalizeCategoryList(settings.contactCategories),
    footerSettings: {
      organizationShortDescription: toStringOrFallback(
        footerSettings.organizationShortDescription,
        defaultWebsiteSettings.footerSettings.organizationShortDescription
      ),
      copyrightText: toStringOrFallback(
        footerSettings.copyrightText,
        defaultWebsiteSettings.footerSettings.copyrightText
      ),
      developerCredit: toStringOrFallback(footerSettings.developerCredit),
    },
  };
}

export function getContactCategoryOptions(categories, language = "en") {
  const source = normalizeCategoryList(categories);

  return source.map((category) => ({
    value: category.value,
    label: category.labels?.[language] || category.labels?.en || category.value,
  }));
}

export function getContactCategoryValues(categories) {
  return normalizeCategoryList(categories).map((category) => category.value);
}

export function buildUpiPaymentUrl(settings) {
  const upiId = normalizeText(settings?.donationPanel?.upiId);

  if (!upiId) {
    return "";
  }

  const params = new URLSearchParams({
    pa: upiId,
    cu: "INR",
  });

  const accountHolderName = normalizeText(settings?.donationPanel?.accountHolderName);

  if (accountHolderName) {
    params.set("pn", accountHolderName);
  }

  return `upi://pay?${params.toString()}`;
}
