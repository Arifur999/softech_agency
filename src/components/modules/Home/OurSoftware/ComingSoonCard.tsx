import { OrderAnalyticsCard } from "@/components/modules/Home/OurSoftware/OrderAnalyticsCard";
import { FeatureIcon } from "@/components/shared/FeatureIcon";
import { PillButton } from "@/components/shared/PillButton";
import { COMING_SOON, ORDER_ANALYTICS_OFFSETS } from "@/data/home/ourSoftware";

/** Figma node 1:243 — the upcoming-products card. */
export function ComingSoonCard() {
  return (
    <article className="flex flex-1 flex-col justify-center gap-10 rounded-[12px] border border-[#6cabff] bg-[#f8faff] p-6 sm:p-8 lg:gap-[102px] lg:p-[38px]">
      <div className="flex flex-col gap-8 lg:gap-[61px]">
        <div className="flex items-center gap-7">
          <FeatureIcon
            src={COMING_SOON.icon}
            disc={COMING_SOON.disc}
            size={84}
            glyphSize={42}
            className="size-[64px] lg:size-[84px]"
          />
          <span className="inline-flex h-[30px] items-center rounded-[16px] border border-[#e9e9e9] bg-white px-4 font-ui text-[14px] text-[#2663f2]">
            {COMING_SOON.status}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[24px] font-semibold text-ink-900 lg:text-[32px]">
            {COMING_SOON.title}
          </h3>
          <p className="text-[16px] leading-[1.5] text-ink-700 lg:text-[18px]">
            {COMING_SOON.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-8 lg:gap-14">
        {/*
          Three identical cards fanned out. Only the last is in flow; the two
          behind it are absolutely placed at the Figma offsets, so the stack
          keeps its height without duplicating layout rules.
        */}
        <div className="relative w-full pt-[52px] pl-0 sm:pl-[57px]">
          {ORDER_ANALYTICS_OFFSETS.slice(0, -1).map((offset) => (
            <div
              key={offset.left}
              aria-hidden
              className="pointer-events-none absolute hidden w-[calc(100%-57px)] sm:block"
              style={{ left: offset.left, top: offset.top }}
            >
              <OrderAnalyticsCard />
            </div>
          ))}
          <div className="relative">
            <OrderAnalyticsCard />
          </div>
        </div>

        <PillButton
          href={COMING_SOON.cta.href}
          variant="outline"
          className="w-full border-2 border-[rgba(38,99,242,0.18)]"
        >
          {COMING_SOON.cta.label}
        </PillButton>
      </div>
    </article>
  );
}
