import { ORDER_ANALYTICS } from "@/data/home/ourSoftware";

/** Figma nodes 1:260 / 1:275 / 1:290 — stacked three deep behind each other. */
export function OrderAnalyticsCard() {
  const { title, subtitle, leftLabel, rightLabel, progress, footLeft, footRight } =
    ORDER_ANALYTICS;

  return (
    <div className="flex w-full flex-col gap-5 rounded-[12px] bg-white px-5 py-4 drop-shadow-[0px_2px_8px_rgba(0,0,0,0.12)] lg:gap-7 lg:px-7 lg:py-[21px]">
      <div className="flex flex-col gap-2 text-[#222] lg:gap-[13px]">
        <p className="font-ui text-[22px] font-bold lg:text-[32px]">{title}</p>
        <p className="font-ui text-[16px] lg:text-[24px]">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-3 lg:gap-[17px]">
        <div className="flex items-center justify-between font-ui text-[14px] text-[#222] lg:text-[16px]">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-[6px] w-full rounded-[4px] bg-[#e8f0ff]">
            <div className="h-full rounded-[4px] bg-[#2663f2]" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center justify-between font-ui text-[14px] text-[#222] lg:text-[16px]">
            <span>{footLeft}</span>
            <span>{footRight}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
