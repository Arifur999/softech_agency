import Image from "next/image";

import { cn } from "@/lib/utils";

interface FeatureIconProps {
  src: string;
  /** Diameter of the #EBF1FE disc behind the glyph. */
  size?: number;
  /** Edge of the glyph itself, which Figma keeps at 26px inside a 44px disc. */
  glyphSize?: number;
  className?: string;
}

/** The pale blue disc + exported glyph pairing Figma repeats across sections. */
export function FeatureIcon({
  src,
  size = 44,
  glyphSize = 26,
  className,
}: FeatureIconProps) {
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-[#EBF1FE]", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt=""
        aria-hidden
        width={glyphSize}
        height={glyphSize}
        style={{ width: glyphSize, height: glyphSize }}
      />
    </span>
  );
}
