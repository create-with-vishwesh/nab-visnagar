import mongoose from "mongoose";

const GalleryImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
      default: "",
    },
    alt: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const GalleryAlbumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleGu: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    descriptionGu: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [GalleryImageSchema],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.GalleryAlbum || mongoose.model("GalleryAlbum", GalleryAlbumSchema);