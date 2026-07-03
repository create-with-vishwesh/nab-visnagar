import { NextResponse } from "next/server";

import { connectToDatabase } from "../../../../lib/mongodb";
import Admin from "../../../../models/Admin";
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

function isValidEmail(email) {
  return /.+@.+\..+/.test(email);
}

export async function GET(request) {
  const auth = requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  try {
    await connectToDatabase();

    const admin = await Admin.findById(auth.payload.adminId).lean();

    if (!admin) {
      return json({ success: false, message: "Admin not found." }, 404);
    }

    return json({
      success: true,
      data: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      },
    });
  } catch (error) {
    return json({ success: false, message: "Unable to fetch account details." }, 500);
  }
}

export async function PUT(request) {
  const auth = requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!name) {
      return json({ success: false, message: "Name is required." }, 400);
    }

    if (!email) {
      return json({ success: false, message: "Email is required." }, 400);
    }

    if (!isValidEmail(email)) {
      return json({ success: false, message: "Please enter a valid email address." }, 400);
    }

    await connectToDatabase();

    const existingAdmin = await Admin.findOne({ email, _id: { $ne: auth.payload.adminId } });

    if (existingAdmin) {
      return json({ success: false, message: "An account with that email already exists." }, 409);
    }

    const admin = await Admin.findById(auth.payload.adminId);

    if (!admin) {
      return json({ success: false, message: "Admin not found." }, 404);
    }

    admin.name = name;
    admin.email = email;
    await admin.save();

    return json({
      success: true,
      message: "Profile updated successfully.",
      data: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      },
    });
  } catch (error) {
    return json({ success: false, message: "Unable to update profile." }, 500);
  }
}
