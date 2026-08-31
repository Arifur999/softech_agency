import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ApproachCardProps {
  icon: ReactNode;
  /** Tailwind classes for the rounded tile behind the icon. */
  iconTileClassName: string;
  title: { lead: string; accent?: string };
  accentClassName?: string;
  lines: readonly string[];
  children: ReactNode;
  /** The middle card sits on the blue gradient with inverted text. */
  variant?: "light" | "blue";
}

/** One of the three Our Approach cards: icon, headline, copy, then a panel. */
export function ApproachCard({
  icon,
  iconTileClassName,
  title,
  accentClassName,
  lines,
  children,
  variant = "light",
}: ApproachCardProps) {
  const onBlue = variant === "blue";

  return (
    <article
      className={cn(
        "flex flex-1 flex-col gap-6 rounded-[24px] p-6 lg:p-8",
        onBlue
          ? "text-white"
          : "border border-[#f0f0f3] bg-[#fefdfc] drop-shadow-[0px_2px_12px_rgba(16,24,40,0.06)]",
      )}
      style={
        onBlue
          ? {
              backgroundImage:
                "linear-gradient(180deg, #0779fa 0%, #4a9ffd 46%, #a9cffb 78%, #dfecfd 100%)",
            }
          : undefined
      }
    >
      <span
        className={cn(
          "inline-flex size-[52px] items-center justify-center rounded-[16px] lg:size-[58px]",
          iconTileClassName,
        )}
      >
        {icon}
      </span>

      <div className="flex flex-col gap-3">
        <h3
          className={cn(
            "text-[24px] leading-[1.2] font-bold lg:text-[28px]",
            onBlue ? "text-white" : "text-ink-900",
          )}
        >
          {title.lead}
          {title.accent ? (
            <>
              <br />
              <span className={accentClassName}>{title.accent}</span>
            </>
          ) : null}
        </h3>

        <div className={cn("text-[15px] leading-[1.6] lg:text-[16px]", onBlue ? "text-white/95" : "text-ink-700")}>
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div className="mt-auto">{children}</div>
    </article>
  );
}
