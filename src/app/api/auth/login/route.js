import { NextResponse } from "next/server";

import { connectToDatabase } from "../../../../lib/mongodb";
import Admin from "../../../../models/Admin";
import { comparePassword, signAdminToken } from "../../../../utils/auth";

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password) {
      return json({ success: false, message: "Email and password are required." }, 400);
    }

    await connectToDatabase();

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return json({ success: false, message: "Invalid email or password." }, 401);
    }

    const isValidPassword = await comparePassword(password, admin.password);

    if (!isValidPassword) {
      return json({ success: false, message: "Invalid email or password." }, 401);
    }

    const token = signAdminToken({
      adminId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    const response = json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return json({ success: false, message: "Unable to log in." }, 500);
  }
}