import Image from "next/image";

import { FeatureIcon } from "@/components/shared/FeatureIcon";
import type { IProductStat } from "@/types/home.types";

/** Figma nodes 1:203 / 1:212 / 1:222 — #eff3fb tile, 26px disc, 24px figure. */
export function StatTile({ value, label, icon, iconIsWhole }: IProductStat) {
  return (
    <div className="flex flex-1 items-start gap-3 rounded-[12px] bg-[#eff3fb] px-3 py-2.5">
      {iconIsWhole ? (
        <Image src={icon} alt="" aria-hidden width={26} height={26} className="size-[26px] shrink-0" />
      ) : (
        <FeatureIcon src={icon} size={26} glyphSize={16} />
      )}

      <div className="flex flex-col gap-[7px] text-[#1c1c1c]">
        <p className="text-[20px] font-bold lg:text-[24px]">{value}</p>
        <p className="text-[14px] lg:text-[16px]">{label}</p>
      </div>
    </div>
  );
}
