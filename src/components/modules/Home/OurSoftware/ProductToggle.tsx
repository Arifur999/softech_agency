"use client";

import { useState } from "react";

import { PRODUCT_FILTERS, type ProductFilter } from "@/data/home/ourSoftware";
import { cn } from "@/lib/utils";

/**
 * Figma node 1:175 — a segmented control, 342x64, with the active segment
 * wearing the #2663f2 → #acc5ff gradient. Both product cards stay visible in
 * the design, so this tracks selection without hiding content.
 */
export function ProductToggle() {
  const [active, setActive] = useState<ProductFilter>("live");

  return (
    <div
      role="radiogroup"
      aria-label="Filter products by availability"
      className="flex h-[56px] shrink-0 items-center justify-center gap-3 rounded-[27px] border border-[#ebf1fe] bg-white px-4 drop-shadow-[0px_2px_2px_rgba(38,99,242,0.1)] lg:h-[64px] lg:gap-[19px] lg:px-6"
    >
      {PRODUCT_FILTERS.map(({ value, label }) => {
        const selected = active === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setActive(value)}
            className={cn(
              "flex h-[38px] items-center justify-center rounded-[22px] px-4 font-ui text-[15px] whitespace-nowrap transition-colors lg:h-[42px] lg:text-[18px]",
              selected
                ? "bg-linear-to-r from-[#2663f2] to-[#acc5ff] text-white"
                : "border border-[#f5f5f5] text-[#8c8c8c] hover:text-ink-700",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
