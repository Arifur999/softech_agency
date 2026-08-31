import Image from "next/image";

import { StepTrack } from "@/components/modules/Home/WhySoftech/StepTrack";
import { FeatureIcon } from "@/components/shared/FeatureIcon";
import { WORKFLOW_CARD } from "@/data/home/whySoftech";

/** Figma node 1:487 — the large gradient card. */
export function WorkflowCard() {
  const { eyebrow, icon, disc, title, description, texture } = WORKFLOW_CARD;

  return (
    <div
      className="relative flex-1 overflow-hidden rounded-[24px] border border-brand-200 p-8 sm:p-10 lg:h-[745px] lg:p-0"
      style={{
        backgroundImage:
          "linear-gradient(131.41deg, rgb(136, 180, 255) 4.2966%, rgb(242, 247, 255) 97.799%)",
      }}
    >
      {/* Node 1:488 — texture at 28%, rotated -15.3deg. */}
      <Image
        src={texture}
        alt=""
        aria-hidden
        width={1158}
        height={997}
        sizes="865px"
        className="pointer-events-none absolute -top-[14.13%] -left-[12.35%] h-[133.83%] w-[133.83%] max-w-none -rotate-[15.3deg] object-cover opacity-28"
      />

      {/* Node 1:489 — the wash that lifts the bottom-right corner. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(227.59deg, rgba(38, 99, 242, 0.07) 3.2027%, rgb(253, 253, 255) 100%)",
        }}
      />

      <div className="relative flex h-full w-full flex-col justify-center gap-16 lg:mx-auto lg:max-w-[719px] lg:gap-[161px]">
        <div className="flex flex-col gap-10 lg:gap-[68px]">
          <div className="flex items-center gap-[14px]">
            <FeatureIcon
              src={icon}
              disc={disc}
              size={84}
              glyphSize={42}
              className="size-[64px] lg:size-[84px]"
            />
            <p className="font-ui text-[14px] font-light text-ink-900 lg:text-[16px]">{eyebrow}</p>
          </div>

          <div className="flex flex-col gap-[19px]">
            <h3 className="text-[30px] font-bold text-[#191919] lg:text-[42px]">{title}</h3>
            <p className="text-[16px] leading-[1.5] text-ink-700 lg:text-[18px]">{description}</p>
          </div>
        </div>

        <StepTrack />
      </div>
    </div>
  );
}
