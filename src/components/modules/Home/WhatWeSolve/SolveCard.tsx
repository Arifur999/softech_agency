import { ChipRow } from "@/components/modules/Home/WhatWeSolve/ChipRow";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { cn } from "@/lib/utils";
import type { ISolveCard } from "@/types/home.types";

/** Figma nodes 1:614 … 1:700 — the first card is the emphasised one. */
export function SolveCard({
  title,
  description,
  chips,
  linkLabel,
  href,
  featured,
}: ISolveCard) {
  return (
    <article
      className={cn(
        "flex flex-col justify-between gap-6 rounded-[24px] border bg-[#f9fbff] px-6 py-7 lg:h-[300px] lg:px-[43px] lg:py-8",
        featured
          ? "border-brand-200 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.12)]"
          : "border-[#e5efff]",
      )}
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-[20px] font-medium text-ink-900 lg:text-[24px]">{title}</h3>
        <p className="text-[16px] leading-[1.5] text-ink-700 lg:text-[18px]">{description}</p>
      </div>

      <div className="flex flex-col gap-4">
        <ChipRow chips={chips} />
        <ArrowLink href={href} className="font-ui text-[16px] lg:text-[18px]">
          {linkLabel}
        </ArrowLink>
      </div>
    </article>
  );
}
