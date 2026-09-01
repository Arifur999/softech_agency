import { PrincipleCard } from "@/components/modules/Home/WhySoftech/PrincipleCard";
import { Reveal, RevealGroup } from "@/components/shared/Reveal";
import { WorkflowCard } from "@/components/modules/Home/WhySoftech/WorkflowCard";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { SectionShell } from "@/components/shared/SectionShell";
import {
  PRINCIPLE_DISCS,
  WHY_SOFTECH_INTRO,
  WHY_SOFTECH_PRINCIPLES,
} from "@/data/home/whySoftech";

/** Figma node 1:477. */
export function WhySoftechSection() {
  return (
    <SectionShell
      className="py-16 lg:py-[76px]"
      innerClassName="flex flex-col items-center gap-12 lg:gap-[84px]"
    >
      <Reveal>
      <SectionIntro
        {...WHY_SOFTECH_INTRO}
        align="center"
        className="max-w-[888px] gap-[19px]"
        badgeClassName="border-[#cdcdcd]"
        headingClassName="text-[30px] sm:text-[40px] lg:text-[52px] xl:text-[62px]"
        accentClassName="font-normal"
        descriptionClassName="leading-[1.5] lg:text-[18px]"
      />
      </Reveal>

      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:gap-[55px]">
        <Reveal variant="left" className="flex flex-1">
          <WorkflowCard />
        </Reveal>

        <RevealGroup variant="right" className="flex flex-col gap-[27px] lg:w-[46%] lg:shrink-0 2xl:w-[722px]">
          {WHY_SOFTECH_PRINCIPLES.map((card, index) => (
            <PrincipleCard key={card.title} {...card} disc={PRINCIPLE_DISCS[index]} />
          ))}
        </RevealGroup>
      </div>
    </SectionShell>
  );
}
