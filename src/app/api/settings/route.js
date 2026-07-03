import { NextResponse } from "next/server";

import { connectToDatabase } from "../../../lib/mongodb";
import WebsiteSettings from "../../../models/WebsiteSettings";
import { defaultWebsiteSettings, normalizeWebsiteSettings } from "../../../utils/website-settings";

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET() {
  try {
    await connectToDatabase();

    const settings = await WebsiteSettings.findOne({});

    return json({ success: true, data: normalizeWebsiteSettings(settings || defaultWebsiteSettings) });
  } catch (error) {
    return json({ success: false, message: "Unable to fetch website settings." }, 500);
  }
}