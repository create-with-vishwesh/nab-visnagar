"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const FALLBACK_IMAGE_SRC = "/images/fallback-image.svg";

const IMAGE_VARIANTS = {
  galleryCard: {
    aspectClassName: "aspect-[4/3]",
    sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  },
  programCard: {
    aspectClassName: "aspect-[16/10]",
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
};

export default function ResponsiveImage({
  src,
  alt,
  variant = "galleryCard",
  priority = false,
  className = "",
  imageClassName = "",
  loading = "lazy",
  onClick,
  buttonLabel,
  sizes,
}) {
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_IMAGE_SRC);
  const imageVariant = IMAGE_VARIANTS[variant] || IMAGE_VARIANTS.galleryCard;

  useEffect(() => {
    setCurrentSrc(src || FALLBACK_IMAGE_SRC);
  }, [src]);

  const containerClassName = `relative w-full overflow-hidden bg-slate-100 ${imageVariant.aspectClassName} ${className}`.trim();
  const imageElement = (
    <div className={containerClassName}>
      <Image
        src={currentSrc || FALLBACK_IMAGE_SRC}
        alt={alt}
        fill
        sizes={sizes || imageVariant.sizes}
        priority={priority}
        loading={loading}
        className={`object-cover ${imageClassName}`.trim()}
        onError={() => {
          setCurrentSrc((previousSrc) =>
            previousSrc === FALLBACK_IMAGE_SRC ? previousSrc : FALLBACK_IMAGE_SRC
          );
        }}
      />
    </div>
  );

  if (typeof onClick === "function") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={buttonLabel || alt}
        aria-haspopup="dialog"
        className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
      >
        {imageElement}
      </button>
    );
  }

  return imageElement;
}