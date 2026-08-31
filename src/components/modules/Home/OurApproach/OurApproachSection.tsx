import Image from "next/image";

import { SectionIntro } from "@/components/shared/SectionIntro";
import { SectionShell } from "@/components/shared/SectionShell";
import { OUR_APPROACH_IMAGE, OUR_APPROACH_INTRO } from "@/data/home/ourApproach";

/** Figma node 1:718 — intro over the three-card graphic (a single export). */
export function OurApproachSection() {
  return (
    <SectionShell
      className="py-16 lg:py-[76px]"
      innerClassName="flex flex-col items-end gap-12 lg:gap-[74px]"
    >
      <SectionIntro
        {...OUR_APPROACH_INTRO}
        className="w-full max-w-[1169px] gap-[19px] self-start"
        badgeClassName="border-[#cdcdcd]"
        headingClassName="text-[30px] sm:text-[40px] lg:text-[52px] xl:text-[62px]"
        accentClassName="font-normal"
        descriptionClassName="leading-[1.5] lg:text-[18px]"
      />

      <Image
        src={OUR_APPROACH_IMAGE.src}
        alt={OUR_APPROACH_IMAGE.alt}
        width={OUR_APPROACH_IMAGE.width}
        height={OUR_APPROACH_IMAGE.height}
        sizes="(max-width: 1024px) 100vw, 1640px"
        className="h-auto w-full"
      />
    </SectionShell>
  );
}
