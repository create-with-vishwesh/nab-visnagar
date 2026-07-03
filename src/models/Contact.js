import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "General Inquiry",
        "Admission / Student Inquiry",
        "Residential Hostel Inquiry",
        "Rehabilitation & Training Inquiry",
        "Volunteer Inquiry",
        "Donation / Funding Support",
        "CSR / Organization Partnership",
        "Scholarship Inquiry",
        "Media & Press Inquiry",
        "Other",
      ],
    },
    subject: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "read"],
      default: "new",
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);