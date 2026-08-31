import { ProcessCard } from "@/components/modules/Home/HowWeWork/ProcessCard";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { SectionShell } from "@/components/shared/SectionShell";
import { HOW_WE_WORK_INTRO, HOW_WE_WORK_ROWS } from "@/data/home/howWeWork";

/** Figma node 1:552 — two cards, then three, each row sharing its widths. */
export function HowWeWorkSection() {
  return (
    <SectionShell
      id="how-it-works"
      className="py-16 lg:py-[76px]"
      innerClassName="flex flex-col items-center gap-12 lg:gap-[69px]"
    >
      <SectionIntro
        {...HOW_WE_WORK_INTRO}
        className="w-full max-w-[847px] gap-[19px] self-start"
        badgeClassName="border-[#cdcdcd]"
        headingClassName="text-[30px] sm:text-[40px] lg:text-[52px] xl:text-[62px]"
        accentClassName="font-normal"
        descriptionClassName="leading-[1.5] lg:text-[18px]"
      />

      <div className="flex w-full flex-col gap-6 lg:gap-8">
        {HOW_WE_WORK_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col gap-6 md:flex-row md:items-center lg:gap-8">
            {row.map((step) => (
              <div key={step.title} style={{ flexGrow: step.width, flexBasis: 0 }}>
                <ProcessCard {...step} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
