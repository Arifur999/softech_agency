import type { ISectionIntro } from "@/types/common.types";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

interface SectionIntroProps extends ISectionIntro {
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  headingClassName?: string;
  accentClassName?: string;
  descriptionClassName?: string;
}

/**
 * Badge + two-tone heading + supporting copy. Eight of the twelve sections
 * open with exactly this block, so it lives here once and is fed from
 * `src/data/home/*`.
 */
export function SectionIntro({
  badge,
  heading,
  description,
  descriptionExtra,
  align = "left",
  tone = "dark",
  className,
  headingClassName,
  accentClassName,
  descriptionClassName,
}: SectionIntroProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <SectionBadge tone={tone === "dark" ? "light" : "onDark"}>{badge}</SectionBadge>

      <SectionHeading
        {...heading}
        tone={tone}
        className={cn("mt-5", headingClassName)}
        accentClassName={accentClassName}
      />

      {description ? (
        <p
          className={cn(
            "mt-4 text-[14px] leading-[1.6] sm:text-[15px] lg:text-[16px]",
            tone === "dark" ? "text-ink-700" : "text-white/85",
            centered && "mx-auto",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}

      {descriptionExtra ? (
        <p
          className={cn(
            "text-[14px] leading-[1.6] sm:text-[15px] lg:text-[16px]",
            tone === "dark" ? "text-ink-700" : "text-white/85",
            centered && "mx-auto",
            descriptionClassName,
          )}
        >
          {descriptionExtra}
        </p>
      ) : null}
    </div>
  );
}
