import { OperationsOverview } from "@/components/modules/Home/OurSoftware/OperationsOverview";
import { FeatureIcon } from "@/components/shared/FeatureIcon";
import { PillButton } from "@/components/shared/PillButton";
import { FURNIFY } from "@/data/home/ourSoftware";

/** Figma node 1:181 — the live product card. */
export function FurnifyCard() {
  return (
    <article className="flex flex-1 flex-col justify-center gap-8 rounded-[12px] border border-[#6cabff] bg-[#e4eeff] p-6 sm:p-8 lg:gap-12 lg:p-[38px]">
      <div className="flex flex-col gap-8 lg:gap-[61px]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-[14px]">
            <FeatureIcon
              src={FURNIFY.icon}
              disc={FURNIFY.disc}
              size={84}
              glyphSize={42}
              className="size-[64px] lg:size-[84px]"
            />
            <p className="font-ui text-[30px] font-bold text-[#191919] lg:text-[42px]">
              {FURNIFY.name}
            </p>
          </div>

          <span className="inline-flex h-[30px] shrink-0 items-center gap-1.5 rounded-[16px] bg-[#fbfcff] px-4 font-ui text-[14px] text-[#2663f2]">
            <span aria-hidden className="size-1.5 rounded-full bg-[#2663f2]" />
            {FURNIFY.status}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[24px] font-semibold text-ink-900 lg:text-[32px]">{FURNIFY.title}</h3>
          <p className="text-[16px] leading-[1.5] text-ink-700 lg:text-[18px]">
            {FURNIFY.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:gap-14">
        <OperationsOverview />

        <PillButton
          href={FURNIFY.cta.href}
          variant="gradient"
          className="w-full border-[#2663f2]"
        >
          {FURNIFY.cta.label}
        </PillButton>
      </div>
    </article>
  );
}
