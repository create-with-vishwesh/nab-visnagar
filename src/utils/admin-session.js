import { cookies } from "next/headers";

import { verifyAdminToken } from "./auth";

export async function getAdminTokenFromCookies() {
  const cookieStore = await cookies();

  return cookieStore.get("admin_token")?.value || null;
}

export async function getAdminSession() {
  const token = await getAdminTokenFromCookies();

  if (!token) {
    return null;
  }

  try {
    return verifyAdminToken(token);
  } catch (error) {
    return null;
  }
}