import { PillButton } from "@/components/shared/PillButton";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { BUILD_WHATS_NEXT } from "@/data/home/buildWhatsNext";

/** Figma node 1:768 — the full blue closing band. */
export function BuildWhatsNextSection() {
  const { badge, heading, description, primary, secondary } = BUILD_WHATS_NEXT;

  return (
    <SectionShell className="py-16 lg:py-[76px]">
      <div
        className="flex items-center justify-center rounded-[24px] border border-brand-200 px-6 py-12 lg:px-[44px] lg:py-[62px]"
        style={{
          backgroundImage:
            "linear-gradient(181.66deg, rgb(10, 111, 237) 3.5911%, rgb(186, 218, 255) 93.625%)",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-8 lg:gap-[38px]">
          <SectionBadge tone="onDark" className="border-[#8bb6ff]">
            {badge}
          </SectionBadge>

          <div className="flex w-full max-w-[802px] flex-col items-center gap-6">
            <SectionHeading
              {...heading}
              tone="light"
              className="text-center text-[28px] sm:text-[38px] lg:text-[48px] xl:text-[58px]"
              accentClassName="font-normal text-[#e4f0ff]"
            />

            <p className="max-w-[561px] text-center text-[15px] leading-[1.5] text-white lg:text-[18px]">
              {description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <PillButton
                href={primary.href}
                variant="gradient"
                className="w-[243px] border-[#1173ee]"
              >
                {primary.label}
              </PillButton>
              <PillButton
                href={secondary.href}
                variant="outline"
                className="w-[243px] border-2 border-[#1173ee] text-[#1173ee]"
              >
                {secondary.label}
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
