import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionShellProps {
  children: ReactNode;
  /** Applied to the outer <section>, for full-bleed backgrounds. */
  className?: string;
  /** Applied to the inner max-width container. */
  innerClassName?: string;
  as?: ElementType;
  id?: string;
}

/**
 * Every section shares the same horizontal rhythm. Figma lays its content out
 * across ~1640px inside the 1920px frame. The cap plus the 2xl gutter land on
 * exactly 1640px at 1920, while narrower gutters below that keep mid-size
 * laptops from being squeezed by padding meant for a 1920 canvas.
 */
export function SectionShell({
  children,
  className,
  innerClassName,
  as: Tag = "section",
  id,
}: SectionShellProps) {
  return (
    <Tag id={id} className={cn("relative w-full", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-[1704px] px-5 sm:px-8 lg:px-10 xl:px-14 2xl:px-8",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
