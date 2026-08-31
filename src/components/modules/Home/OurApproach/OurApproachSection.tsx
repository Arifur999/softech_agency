import { CircleCheck, TriangleAlert, Zap } from "lucide-react";

import { ApproachCard } from "@/components/modules/Home/OurApproach/ApproachCard";
import { ImpactChart } from "@/components/modules/Home/OurApproach/ImpactChart";
import { IssuesPanel } from "@/components/modules/Home/OurApproach/IssuesPanel";
import { ProcessPanel } from "@/components/modules/Home/OurApproach/ProcessPanel";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { SectionShell } from "@/components/shared/SectionShell";
import {
  APPROACH_PROBLEM,
  APPROACH_REAL_LIFE,
  APPROACH_SIMPLE,
  OUR_APPROACH_INTRO,
} from "@/data/home/ourApproach";

/** Figma node 1:718 — intro over the three approach cards. */
export function OurApproachSection() {
  return (
    <SectionShell
      className="py-16 lg:py-[76px]"
      innerClassName="flex flex-col gap-12 lg:gap-[74px]"
    >
      <SectionIntro
        {...OUR_APPROACH_INTRO}
        className="w-full max-w-[1169px] gap-[19px]"
        badgeClassName="border-[#cdcdcd]"
        headingClassName="text-[30px] sm:text-[40px] lg:text-[52px] xl:text-[62px]"
        accentClassName="font-normal"
        descriptionClassName="leading-[1.5] lg:text-[18px]"
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
        <ApproachCard
          icon={<TriangleAlert className="size-6 text-[#f4364c] lg:size-7" />}
          iconTileClassName="bg-[#fdeaed]"
          title={APPROACH_PROBLEM.title}
          accentClassName="text-[#f4364c]"
          lines={APPROACH_PROBLEM.lines}
        >
          <IssuesPanel />
        </ApproachCard>

        <ApproachCard
          variant="blue"
          icon={<Zap className="size-6 text-brand-600 lg:size-7" />}
          iconTileClassName="bg-white"
          title={APPROACH_SIMPLE.title}
          accentClassName="text-white"
          lines={APPROACH_SIMPLE.lines}
        >
          <ProcessPanel />
        </ApproachCard>

        <ApproachCard
          icon={<CircleCheck className="size-6 text-[#22c55e] lg:size-7" />}
          iconTileClassName="bg-[#e8f8ee]"
          title={APPROACH_REAL_LIFE.title}
          lines={APPROACH_REAL_LIFE.lines}
        >
          <ImpactChart />
        </ApproachCard>
      </div>
    </SectionShell>
  );
}
