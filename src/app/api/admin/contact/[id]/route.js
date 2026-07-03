import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

import { connectToDatabase } from "../../../../../lib/mongodb";
import Contact from "../../../../../models/Contact";
import { getAdminTokenFromRequest, verifyAdminToken } from "../../../../../utils/auth";

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

export async function PATCH(request, context) {
  const auth = requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    return json({ success: false, message: "Invalid contact id." }, 400);
  }

  try {
    const body = await request.json();
    const status = body?.status;

    if (!["new", "read"].includes(status)) {
      return json({ success: false, message: "Status must be 'new' or 'read'." }, 400);
    }

    await connectToDatabase();

    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return json({ success: false, message: "Contact message not found." }, 404);
    }

    return json({ success: true, message: "Contact message updated.", data: updatedMessage });
  } catch (error) {
    return json({ success: false, message: "Unable to update contact message." }, 500);
  }
}

export async function DELETE(request, context) {
  const auth = requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    return json({ success: false, message: "Invalid contact id." }, 400);
  }

  try {
    await connectToDatabase();

    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return json({ success: false, message: "Contact message not found." }, 404);
    }

    return json({ success: true, message: "Contact message deleted." });
  } catch (error) {
    return json({ success: false, message: "Unable to delete contact message." }, 500);
  }
}