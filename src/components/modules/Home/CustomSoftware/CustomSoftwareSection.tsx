import { CustomSoftwareCard } from "@/components/modules/Home/CustomSoftware/CustomSoftwareCard";
import { Reveal, RevealGroup } from "@/components/shared/Reveal";
import { PillButton } from "@/components/shared/PillButton";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { SectionShell } from "@/components/shared/SectionShell";
import {
  CUSTOM_SOFTWARE_CARDS,
  CUSTOM_SOFTWARE_CTA,
  CUSTOM_SOFTWARE_INTRO,
} from "@/data/home/customSoftware";

/** Figma node 1:397. */
export function CustomSoftwareSection() {
  return (
    <SectionShell
      id="custom-software"
      className="py-16 lg:py-[76px]"
      innerClassName="flex flex-col items-center gap-12 lg:gap-[82px]"
    >
      <Reveal className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <SectionIntro
          {...CUSTOM_SOFTWARE_INTRO}
          className="max-w-[932px] gap-4"
          badgeClassName="border-[#cdcdcd]"
          headingClassName="text-[30px] sm:text-[40px] lg:text-[52px] xl:text-[62px]"
          accentClassName="font-normal"
          descriptionClassName="lg:text-[18px]"
        />

        <PillButton
          href={CUSTOM_SOFTWARE_CTA.href}
          variant="gradient"
          className="w-[243px] shrink-0 border-[#1276f1]"
        >
          {CUSTOM_SOFTWARE_CTA.label}
        </PillButton>
      </Reveal>

      <RevealGroup className="flex w-full flex-col gap-7 lg:flex-row lg:items-stretch lg:gap-[28px]" itemClassName="flex flex-1">
        {CUSTOM_SOFTWARE_CARDS.map((card) => (
          <CustomSoftwareCard key={card.title} {...card} />
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
