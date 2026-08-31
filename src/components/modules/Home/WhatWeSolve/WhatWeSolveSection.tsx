import { SolveCard } from "@/components/modules/Home/WhatWeSolve/SolveCard";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { SectionShell } from "@/components/shared/SectionShell";
import { WHAT_WE_SOLVE_CARDS, WHAT_WE_SOLVE_INTRO } from "@/data/home/whatWeSolve";

/** Figma node 1:604 — a 3 x 2 grid of uniform cards. */
export function WhatWeSolveSection() {
  return (
    <SectionShell
      className="py-16 lg:py-[76px]"
      innerClassName="flex flex-col items-center gap-12 lg:gap-14"
    >
      <SectionIntro
        {...WHAT_WE_SOLVE_INTRO}
        align="center"
        className="max-w-[1084px] gap-[19px]"
        badgeClassName="border-[#cdcdcd]"
        headingClassName="text-[30px] sm:text-[40px] lg:text-[52px] xl:text-[62px]"
        accentClassName="font-normal"
        descriptionClassName="leading-[1.5] lg:text-[18px]"
      />

      <div className="grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
        {WHAT_WE_SOLVE_CARDS.map((card) => (
          <SolveCard key={card.title} {...card} />
        ))}
      </div>
    </SectionShell>
  );
}
