import Image from "next/image";

import { GROWTH_BARS, REQUIREMENT_PILLS } from "@/data/home/customSoftware";
import type { CustomSoftwareVisual } from "@/types/home.types";

/** The decorative footer each Custom Software card ends with. */
export function CardVisual({ visual }: { visual: CustomSoftwareVisual }) {
  if (visual === "track") {
    // Nodes 1:430 / 1:434 — two overlapping connector tracks.
    return (
      <div aria-hidden className="relative h-[36px] w-full max-w-[436px]">
        <Image
          src="/icons/custom-software/track-left.svg"
          alt=""
          width={235}
          height={36}
          className="absolute top-0 left-0 h-[36px] w-[235px] max-w-none"
        />
        <Image
          src="/icons/custom-software/track-right.svg"
          alt=""
          width={235}
          height={36}
          className="absolute top-0 left-[201px] h-[36px] w-[235px] max-w-none"
        />
      </div>
    );
  }

  if (visual === "pills") {
    // Nodes 1:453 – 1:457.
    return (
      <div aria-hidden className="flex w-full max-w-[414px] flex-col items-end gap-[13px]">
        <div className="flex w-full items-center gap-4">
          {REQUIREMENT_PILLS.map((pill) => (
            <span
              key={pill.color}
              className="h-[29px] flex-1 rounded-[16px]"
              style={{ backgroundColor: pill.color, maxWidth: pill.width }}
            />
          ))}
        </div>
        <span className="h-[28px] w-full rounded-[32px] bg-[#e2edff]" />
      </div>
    );
  }

  // Nodes 1:473 – 1:476.
  const tallest = Math.max(...GROWTH_BARS);
  return (
    <div aria-hidden className="flex h-[85px] w-full max-w-[414px] items-end gap-[13px]">
      {GROWTH_BARS.map((height, index) => (
        <span
          key={index}
          className="flex-1 rounded-t-[4px] bg-linear-to-b from-[#1d7df2] to-[#7ab5fe]"
          style={{ height: `${(height / tallest) * 100}%` }}
        />
      ))}
    </div>
  );
}
