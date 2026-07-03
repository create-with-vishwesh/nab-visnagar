import mongoose from "mongoose";

import { comparePassword, hashPassword } from "../utils/auth";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      default: "admin",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre("save", async function adminPasswordHash() {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await hashPassword(this.password);
});

AdminSchema.methods.comparePassword = function compareAdminPassword(plainPassword) {
  return comparePassword(plainPassword, this.password);
};

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);