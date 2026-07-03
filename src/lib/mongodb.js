import mongoose from "mongoose";
import { getMongoUri } from "../utils/env";

const globalForMongoose = globalThis;

if (!globalForMongoose.__mongooseCache) {
  globalForMongoose.__mongooseCache = { conn: null, promise: null };
}

const cached = globalForMongoose.__mongooseCache;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoUri = getMongoUri();

    cached.promise = mongoose
      .connect(mongoUri, {
        dbName: "nab_website",
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}