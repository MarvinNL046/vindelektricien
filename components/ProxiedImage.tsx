'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProxiedImageProps {
  src?: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

export default function ProxiedImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority = false,
  fallbackSrc = '/images/placeholder.svg',
}: ProxiedImageProps) {
  const [imageSrc, setImageSrc] = useState(
    src ? `/api/image-proxy?url=${encodeURIComponent(src)}` : fallbackSrc
  );

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        onError={handleError}
        unoptimized
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      onError={handleError}
      unoptimized
    />
  );
}