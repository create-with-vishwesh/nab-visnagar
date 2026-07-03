export function extractGalleryImageUrl(image) {
  if (typeof image === "string") {
    return image.trim();
  }

  if (typeof image?.url === "string") {
    return image.url.trim();
  }

  return "";
}

export function normalizeGalleryImageUrls(images) {
  if (!Array.isArray(images)) {
    return [];
  }

  return Array.from(new Set(images.map(extractGalleryImageUrl).filter(Boolean)));
}

export function normalizeGalleryAlbum(album) {
  if (!album) {
    return album;
  }

  return {
    ...album,
    images: normalizeGalleryImageUrls(album.images),
  };
}

export function normalizeGalleryPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return payload;
  }

  return {
    ...payload,
    images: normalizeGalleryImageUrls(payload.images),
  };
}