import { NextResponse } from "next/server";

import { connectToDatabase } from "../../../../../lib/mongodb";
import Admin from "../../../../../models/Admin";
import { comparePassword, getAdminTokenFromRequest, verifyAdminToken } from "../../../../../utils/auth";

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
    const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";
    const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";
    const confirmPassword = typeof body?.confirmPassword === "string" ? body.confirmPassword : "";

    if (!currentPassword) {
      return json({ success: false, message: "Current password is required." }, 400);
    }

    if (!newPassword) {
      return json({ success: false, message: "New password is required." }, 400);
    }

    if (newPassword.length < 8) {
      return json({ success: false, message: "New password must be at least 8 characters long." }, 400);
    }

    if (newPassword !== confirmPassword) {
      return json({ success: false, message: "Confirm password does not match." }, 400);
    }

    await connectToDatabase();

    const admin = await Admin.findById(auth.payload.adminId).select("+password");

    if (!admin) {
      return json({ success: false, message: "Admin not found." }, 404);
    }

    const isValidPassword = await comparePassword(currentPassword, admin.password);

    if (!isValidPassword) {
      return json({ success: false, message: "Current password is incorrect." }, 401);
    }

    admin.password = newPassword;
    await admin.save();

    return json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    return json({ success: false, message: "Unable to update password." }, 500);
  }
}
