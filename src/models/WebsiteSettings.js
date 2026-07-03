import mongoose from "mongoose";

const SocialLinksSchema = new mongoose.Schema(
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
    x: {
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
    website: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const WebsiteSettingsSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
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
    googleMap: {
      type: String,
      trim: true,
      default: "",
    },
    officeHours: {
      type: String,
      trim: true,
      default: "",
    },
    socialLinks: {
      type: SocialLinksSchema,
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