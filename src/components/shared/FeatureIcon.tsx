import Image from "next/image";

import { cn } from "@/lib/utils";

interface FeatureIconProps {
  /** The exported glyph SVG. */
  src: string;
  /**
   * Optional disc SVG to sit behind the glyph — used where Figma draws a
   * gradient or outlined circle. Without it the flat #EBF1FE disc is drawn
   * in CSS, which is what most of the design uses.
   */
  disc?: string;
  /** Diameter of the disc. */
  size?: number;
  /** Edge of the glyph itself, which Figma keeps well inside the disc. */
  glyphSize?: number;
  className?: string;
}

/** The disc + exported glyph pairing Figma repeats across sections. */
export function FeatureIcon({
  src,
  disc,
  size = 44,
  glyphSize = 26,
  className,
}: FeatureIconProps) {
  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {disc ? (
        <Image src={disc} alt="" aria-hidden fill sizes={`${size}px`} className="object-contain" />
      ) : (
        <span aria-hidden className="absolute inset-0 rounded-full bg-[#EBF1FE]" />
      )}

      <Image
        src={src}
        alt=""
        aria-hidden
        width={glyphSize}
        height={glyphSize}
        style={{ width: glyphSize, height: glyphSize }}
        className="relative"
      />
    </span>
  );
}
