import Image from "next/image";

import { FeatureCard } from "@/components/modules/Home/WhatIsSoftech/FeatureCard";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { SectionShell } from "@/components/shared/SectionShell";
import {
  WHAT_IS_SOFTECH_CARDS,
  WHAT_IS_SOFTECH_IMAGE,
  WHAT_IS_SOFTECH_INTRO,
  WHAT_IS_SOFTECH_TAGLINE,
} from "@/data/home/whatIsSoftech";

/** Figma node 1:355 — mockup left, copy and three feature cards right. */
export function WhatIsSoftechSection() {
  return (
    <SectionShell
      id="about"
      className="py-16 lg:py-[76px]"
      innerClassName="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-[104px]"
    >
      <Image
        src={WHAT_IS_SOFTECH_IMAGE.src}
        alt={WHAT_IS_SOFTECH_IMAGE.alt}
        width={WHAT_IS_SOFTECH_IMAGE.width}
        height={WHAT_IS_SOFTECH_IMAGE.height}
        sizes="(max-width: 1024px) 90vw, 568px"
        className="h-auto w-full max-w-[420px] shrink-0 lg:max-w-[568px]"
      />

      <div className="flex w-full flex-col gap-10 lg:gap-[102px]">
        <div className="flex flex-col gap-3">
          <SectionIntro
            {...WHAT_IS_SOFTECH_INTRO}
            headingClassName="max-w-[877px] text-[28px] sm:text-[38px] lg:text-[48px] xl:text-[58px]"
            accentClassName="font-normal"
            descriptionClassName="max-w-[877px] leading-[1.5] lg:text-[18px]"
          />
          <p className="font-ui text-[15px] font-medium text-ink-700 lg:text-[18px]">
            {WHAT_IS_SOFTECH_TAGLINE}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
          {WHAT_IS_SOFTECH_CARDS.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
