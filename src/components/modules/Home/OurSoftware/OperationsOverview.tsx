import { StatTile } from "@/components/modules/Home/OurSoftware/StatTile";
import { FURNIFY, FURNIFY_BARS, FURNIFY_STATS } from "@/data/home/ourSoftware";

/** Figma node 1:198 — the white mock panel inside the Furnify card. */
export function OperationsOverview() {
  const tallest = Math.max(...FURNIFY_BARS);

  return (
    <div className="flex w-full flex-col gap-4 rounded-[12px] border border-[#dfe4ec] bg-white px-5 py-5 drop-shadow-[0px_4px_12px_rgba(108,171,255,0.32)] lg:px-7 lg:py-6">
      <div className="flex items-start justify-between text-black">
        <p className="font-ui text-[15px] font-semibold lg:text-[16px]">{FURNIFY.panelTitle}</p>
        <p className="text-[12px]">{FURNIFY.panelDelta}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-[22px]">
        {FURNIFY_STATS.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      <div className="flex h-[96px] items-end justify-between gap-2">
        {FURNIFY_BARS.map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-[4px] bg-linear-to-b from-[#6cabff] to-[#a5c5fb]"
            style={{ height: `${(height / tallest) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
