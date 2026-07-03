import mongoose from "mongoose";

const ContactInformationSchema = new mongoose.Schema(
  {
    primaryPhone: {
      type: String,
      trim: true,
      default: "",
    },
    secondaryPhone: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    whatsappNumber: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const SocialMediaSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      trim: true,
      default: "",
    },
    instagram: {
      type: String,
      trim: true,
      default: "",
    },
    youtube: {
      type: String,
      trim: true,
      default: "",
    },
    linkedin: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const DonationPanelSchema = new mongoose.Schema(
  {
    enabled: {
      type: Boolean,
      default: false,
    },
    accountHolderName: {
      type: String,
      trim: true,
      default: "",
    },
    bankName: {
      type: String,
      trim: true,
      default: "",
    },
    branchName: {
      type: String,
      trim: true,
      default: "",
    },
    accountNumber: {
      type: String,
      trim: true,
      default: "",
    },
    ifscCode: {
      type: String,
      trim: true,
      default: "",
    },
    upiId: {
      type: String,
      trim: true,
      default: "",
    },
    donationNote: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const OfficeHoursSchema = new mongoose.Schema(
  {
    mondayFriday: {
      type: String,
      trim: true,
      default: "",
    },
    saturday: {
      type: String,
      trim: true,
      default: "",
    },
    sunday: {
      type: String,
      trim: true,
      default: "",
    },
    holidayMessage: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const ContactCategorySchema = new mongoose.Schema(
  {
    value: {
      type: String,
      trim: true,
      default: "",
    },
    labels: {
      en: {
        type: String,
        trim: true,
        default: "",
      },
      gu: {
        type: String,
        trim: true,
        default: "",
      },
    },
  },
  { _id: false }
);

const FooterSettingsSchema = new mongoose.Schema(
  {
    organizationShortDescription: {
      type: String,
      trim: true,
      default: "",
    },
    copyrightText: {
      type: String,
      trim: true,
      default: "",
    },
    developerCredit: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const WebsiteSettingsSchema = new mongoose.Schema(
  {
    contactInformation: {
      type: ContactInformationSchema,
      default: () => ({}),
    },
    socialMedia: {
      type: SocialMediaSchema,
      default: () => ({}),
    },
    donationPanel: {
      type: DonationPanelSchema,
      default: () => ({}),
    },
    officeHours: {
      type: OfficeHoursSchema,
      default: () => ({}),
    },
    contactCategories: {
      type: [ContactCategorySchema],
      default: [],
    },
    footerSettings: {
      type: FooterSettingsSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: true,
    },
  }
);

export default mongoose.models.WebsiteSettings || mongoose.model("WebsiteSettings", WebsiteSettingsSchema);