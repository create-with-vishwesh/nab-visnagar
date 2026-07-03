import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getJwtSecret } from "./env";

const PASSWORD_SALT_ROUNDS = 12;
const ADMIN_TOKEN_EXPIRES_IN = "7d";

export async function hashPassword(password) {
  if (typeof password !== "string" || !password.trim()) {
    throw new Error("Password is required.");
  }

  return bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
}

export async function comparePassword(plainPassword, hashedPassword) {
  if (typeof plainPassword !== "string" || !plainPassword.trim()) {
    return false;
  }

  if (typeof hashedPassword !== "string" || !hashedPassword.trim()) {
    return false;
  }

  return bcrypt.compare(plainPassword, hashedPassword);
}

export function signAdminToken(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("A valid token payload is required.");
  }

  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: ADMIN_TOKEN_EXPIRES_IN,
  });
}

export function verifyAdminToken(token) {
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("A valid token is required.");
  }

  return jwt.verify(token, getJwtSecret());
}