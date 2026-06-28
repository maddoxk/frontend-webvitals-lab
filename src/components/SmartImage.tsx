import { useState } from 'react';
import { buildSrcSet } from '../lib/format';

interface SmartImageProps {
  seed: string;
  alt: string;
  /** Intrinsic display width; height is derived 4:3 to lock aspect ratio (no CLS). */
  width: number;
  placeholder: string;
  /** Eager-load the LCP hero image; everything else stays lazy. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Responsive, lazy, CLS-free image.
 * - Explicit width/height attributes reserve layout space up-front.
 * - A base64 SVG placeholder shows instantly, then blurs up to the real image.
 * - srcset + sizes let the browser pick the smallest sufficient asset.
 */
export function SmartImage({
  seed,
  alt,
  width,
  placeholder,
  priority = false,
  sizes = '(max-width: 600px) 100vw, 400px',
  className,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const height = Math.round((width * 3) / 4);

  return (
    <div
      className={`smart-img ${className ?? ""}`}
      style={{ aspectRatio: "4 / 3", backgroundImage: `url("${placeholder}")` }}
    >
      <img
        src={`https://picsum.photos/seed/${seed}/${width}/${height}`}
        srcSet={buildSrcSet(seed, [width, width * 2])}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        // fetchpriority is valid HTML; cast to keep TS happy across versions
        {...({ fetchpriority: priority ? 'high' : 'auto' } as Record<string, string>)}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'is-loaded' : ''}
      />
    </div>
  );
}
