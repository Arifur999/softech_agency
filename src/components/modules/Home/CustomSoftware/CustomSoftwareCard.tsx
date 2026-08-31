import Image from "next/image";

import { CardVisual } from "@/components/modules/Home/CustomSoftware/CardVisual";
import { FeatureIcon } from "@/components/shared/FeatureIcon";
import { cn } from "@/lib/utils";
import type { ICustomSoftwareCard } from "@/types/home.types";

/** Figma nodes 1:412 / 1:438 / 1:458 — the middle card wears the gradient. */
export function CustomSoftwareCard({
  number,
  icon,
  title,
  description,
  visual,
  highlighted,
}: ICustomSoftwareCard) {
  return (
    <article
      className={cn(
        "flex flex-1 flex-col items-start justify-between gap-10 rounded-[24px] border border-[#ccdfff] p-8 lg:h-[509px] lg:p-[52px]",
        highlighted &&
          "bg-linear-to-b from-[#4288ff] to-[#e2edff] drop-shadow-[0px_4px_12px_rgba(108,171,255,0.28)]",
      )}
    >
      <div className="flex w-full items-center justify-between">
        <FeatureIcon
          src={icon}
          disc={
            highlighted
              ? "/icons/custom-software/disc-highlight.svg"
              : "/icons/custom-software/disc-light.svg"
          }
          size={84}
          glyphSize={42}
          className="size-[64px] lg:size-[84px]"
        />

        <span className="relative inline-flex size-[56px] items-center justify-center lg:size-[68px]">
          <Image
            src="/icons/custom-software/number-disc.svg"
            alt=""
            aria-hidden
            fill
            sizes="68px"
            className="object-contain"
          />
          <span className="relative text-[20px] font-semibold text-white lg:text-[24px]">
            {number}
          </span>
        </span>
      </div>

      <div className="flex w-full flex-col gap-4">
        <h3 className="text-[24px] font-medium text-ink-900 lg:text-[32px]">{title}</h3>
        <p className="text-[16px] leading-[1.5] text-ink-700 lg:text-[18px]">{description}</p>
      </div>

      <CardVisual visual={visual} />
    </article>
  );
}
