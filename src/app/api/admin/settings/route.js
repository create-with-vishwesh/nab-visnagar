import { NextResponse } from "next/server";

import { connectToDatabase } from "../../../../lib/mongodb";
import WebsiteSettings from "../../../../models/WebsiteSettings";
import { getAdminTokenFromRequest, verifyAdminToken } from "../../../../utils/auth";
import { normalizeWebsiteSettings } from "../../../../utils/website-settings";

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

function requireAdmin(request) {
  const token = getAdminTokenFromRequest(request);

  if (!token) {
    return { authorized: false, response: json({ success: false, message: "Unauthorized." }, 401) };
  }

  try {
    return { authorized: true, payload: verifyAdminToken(token) };
  } catch (error) {
    return { authorized: false, response: json({ success: false, message: "Unauthorized." }, 401) };
  }
}

export async function PUT(request) {
  const auth = requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const normalizedBody = normalizeWebsiteSettings(body);

    await connectToDatabase();

    const updatedSettings = await WebsiteSettings.findOneAndUpdate(
      {},
      {
        $set: normalizedBody,
        $unset: {
          organizationName: "",
          address: "",
          phone: "",
          email: "",
          googleMap: "",
          socialLinks: "",
          homepageNotice: "",
          heroSettings: "",
          paymentPanel: "",
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return json({ success: true, message: "Website settings updated.", data: normalizeWebsiteSettings(updatedSettings) });
  } catch (error) {
    return json({ success: false, message: "Unable to update website settings." }, 500);
  }
}