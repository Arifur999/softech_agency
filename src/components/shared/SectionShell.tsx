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
 * Every section shares the same horizontal rhythm: a 1640px content box
 * inside the 1920px Figma frame, i.e. ~140px gutters on a wide desktop.
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
          "mx-auto w-full max-w-[1640px] px-5 sm:px-8 lg:px-12 xl:px-[140px]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
