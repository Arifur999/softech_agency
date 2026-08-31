import Image from "next/image";

import { HERO } from "@/data/home/hero";

/**
 * Node 1:340 — 62px Manrope, the bold ink half followed by the light blue
 * half. Figma draws a 1px #979797 selection box (node 1:341) around
 * "business works." with the mage:mouse-pointer cursor (node 1:342) resting
 * on its bottom-right corner, so the box is anchored to the span itself and
 * travels with the text at every breakpoint.
 */
export function HeroHeadline() {
  const { lead, trailLead, accent } = HERO.headline;

  return (
    <h1 className="text-center text-[32px] leading-[1.28] font-bold text-ink-900 sm:text-[42px] lg:text-[52px] xl:text-[62px]">
      {lead}
      <br />
      {trailLead}{" "}
      <span className="relative inline-block rounded-[4px] border border-[#979797] px-2 py-0.5 font-light text-brand-500 sm:px-2.5">
        {accent}
        <Image
          src="/icons/mouse-pointer.svg"
          alt=""
          aria-hidden
          width={24}
          height={24}
          className="absolute -right-3 -bottom-4 size-[18px] -rotate-[14.46deg] sm:size-[22px] lg:-right-4 lg:-bottom-5 lg:size-[24px]"
        />
      </span>
    </h1>
  );
}
