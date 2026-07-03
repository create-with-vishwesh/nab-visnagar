const fs = require("fs");
const path = require("path");
const Module = require("module");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const srcRoot = path.resolve(__dirname, "../src");
const originalJsLoader = Module._extensions[".js"];

function transformEsmToCommonJs(source) {
  return source
    .replace(/import\s+([A-Za-z0-9_$]+)\s+from\s+["']([^"']+)["'];/g, "const $1 = require(\"$2\");")
    .replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g, "const {$1} = require(\"$2\");")
    .replace(/export\s+async\s+function\s+([A-Za-z0-9_$]+)\s*\(/g, "exports.$1 = async function $1(")
    .replace(/export\s+function\s+([A-Za-z0-9_$]+)\s*\(/g, "exports.$1 = function $1(")
    .replace(/export\s+default\s+/g, "module.exports = ");
}

Module._extensions[".js"] = function loadSrcAsCommonJs(module, filename) {
  if (filename.startsWith(srcRoot)) {
    const source = fs.readFileSync(filename, "utf8");
    module._compile(transformEsmToCommonJs(source), filename);
    return;
  }

  originalJsLoader(module, filename);
};

const AdminModel = require("../src/models/Admin");
const { hashPassword } = require("../src/utils/auth");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable before running the seed.");
}

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

const Admin = AdminModel || mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function seedAdmin() {
  await mongoose.connect(MONGODB_URI, {
    dbName: "nab_website",
  });

  const existingAdmin = await Admin.findOne({ email: "admin@nabvisnagar.org" }).select("_id");

  if (existingAdmin) {
    console.log("Admin already exists. No changes made.");
    return;
  }

  await Admin.create({
    name: "Admin",
    email: "admin@nabvisnagar.org",
    password: "admin123",
    role: "admin",
  });

  console.log("Admin seed completed successfully.");
}

seedAdmin()
  .catch((error) => {
    console.error("Admin seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });