"use client";

import { useState } from "react";

type LogoImageProps = {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
};

export function LogoImage({ src, fallbackSrc, alt, className }: LogoImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
