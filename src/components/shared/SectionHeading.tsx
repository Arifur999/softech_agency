import type { ElementType } from "react";

import type { ITwoToneHeading } from "@/types/common.types";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends ITwoToneHeading {
  as?: ElementType;
  /** `dark` = ink on light background, `light` = white on a blue band. */
  tone?: "dark" | "light";
  className?: string;
  accentClassName?: string;
}

/**
 * The two-tone headline used by every section: a bold ink half followed by a
 * light blue half. Figma sizes it at 62px on the hero and 52px elsewhere; the
 * responsive ramp below keeps the same proportions down to mobile.
 */
export function SectionHeading({
  lead,
  accent,
  trail,
  as: Tag = "h2",
  tone = "dark",
  className,
  accentClassName,
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-bold leading-[1.22] tracking-[-0.01em]",
        "text-[30px] sm:text-[38px] lg:text-[46px] xl:text-[52px]",
        tone === "dark" ? "text-ink-900" : "text-white",
        className,
      )}
    >
      {lead}
      {accent ? (
        <>
          {" "}
          <span
            className={cn(
              "font-light",
              tone === "dark" ? "text-brand-500" : "text-white/80",
              accentClassName,
            )}
          >
            {accent}
          </span>
        </>
      ) : null}
      {trail ? <> {trail}</> : null}
    </Tag>
  );
}
