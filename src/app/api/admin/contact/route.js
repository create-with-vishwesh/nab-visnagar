import { NextResponse } from "next/server";

import { connectToDatabase } from "../../../../lib/mongodb";
import Contact from "../../../../models/Contact";
import { getAdminTokenFromRequest, verifyAdminToken } from "../../../../utils/auth";

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

export async function GET(request) {
  const auth = requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  try {
    await connectToDatabase();

    const messages = await Contact.find({}).sort({ createdAt: -1 });

    return json({ success: true, data: messages });
  } catch (error) {
    return json({ success: false, message: "Unable to fetch contact messages." }, 500);
  }
}