import { NextResponse } from "next/server";

import { contactCategoryValues } from "../../../data/contactCategories";
import { connectToDatabase } from "../../../lib/mongodb";
import Contact from "../../../models/Contact";
import WebsiteSettings from "../../../models/WebsiteSettings";
import { defaultWebsiteSettings, getContactCategoryValues, normalizeWebsiteSettings } from "../../../utils/website-settings";

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

function isEmailLike(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request) {
  try {
    let body;

    try {
      body = await request.json();
    } catch (error) {
      return json({ success: false, message: "Invalid request body." }, 400);
    }

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const contactValue = typeof body?.contact === "string"
      ? body.contact.trim()
      : typeof body?.email === "string"
        ? body.email.trim()
        : typeof body?.phone === "string"
          ? body.phone.trim()
          : "";
    const category = typeof body?.category === "string" ? body.category.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !contactValue || !category || !message) {
      return json({ success: false, message: "Name, contact, category, and message are required." }, 400);
    }

    await connectToDatabase();

    const settings = await WebsiteSettings.findOne({});
    const normalizedSettings = normalizeWebsiteSettings(settings || defaultWebsiteSettings);
    const allowedCategories = getContactCategoryValues(normalizedSettings.contactCategories);

    if (!allowedCategories.includes(category) && !contactCategoryValues.includes(category)) {
      return json({ success: false, message: "Invalid contact category." }, 400);
    }

    const email = isEmailLike(contactValue) ? contactValue.toLowerCase() : contactValue;
    const phone = isEmailLike(contactValue) ? "" : contactValue;

    const savedContact = await Contact.create({
      name,
      email,
      phone,
      category,
      subject: category,
      message,
      status: "new",
    });

    return json({ success: true, message: "Contact message saved.", data: savedContact }, 201);
  } catch (error) {
    return json({ success: false, message: "Unable to save contact message." }, 500);
  }
}