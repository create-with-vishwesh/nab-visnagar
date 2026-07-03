export function getMongoUri() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri || !mongoUri.trim()) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local.");
  }

  return mongoUri.trim();
}

export function getJwtSecret() {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret || !jwtSecret.trim()) {
    throw new Error("Please define the JWT_SECRET environment variable in .env.local.");
  }

  return jwtSecret.trim();
}