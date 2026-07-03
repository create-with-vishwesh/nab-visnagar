import { NextResponse } from "next/server";

import { connectToDatabase } from "../../../lib/mongodb";
import GalleryAlbum from "../../../models/GalleryAlbum";
import { normalizeGalleryAlbum } from "../../../utils/gallery";

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET() {
  try {
    await connectToDatabase();

    const albums = await GalleryAlbum.find({}).sort({ displayOrder: 1, createdAt: -1 });
    const normalizedAlbums = albums.map((album) => normalizeGalleryAlbum(album.toObject()));

    return json({ success: true, data: normalizedAlbums });
  } catch (error) {
    return json({ success: false, message: "Unable to fetch gallery albums." }, 500);
  }
}