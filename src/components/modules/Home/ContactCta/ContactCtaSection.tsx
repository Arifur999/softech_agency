import { NeedSolutionPanel } from "@/components/modules/Home/ContactCta/NeedSolutionPanel";
import { Reveal } from "@/components/shared/Reveal";
import { PillButton } from "@/components/shared/PillButton";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { CONTACT_CTA } from "@/data/home/contactCta";

/** Figma node 1:728 — the split card on the #f4f9ff panel. */
export function ContactCtaSection() {
  const { badge, heading, primary, secondary } = CONTACT_CTA;

  return (
    <SectionShell id="contact" className="py-16 lg:py-[76px]">
      <div className="flex flex-col items-center gap-10 rounded-[24px] border border-brand-200 bg-[#f4f9ff] px-6 py-10 lg:flex-row lg:gap-[72px] lg:px-[44px] lg:py-[62px]">
        <Reveal variant="left" className="flex w-full flex-col items-start gap-8 lg:max-w-[753px] lg:flex-1 lg:gap-[38px]">
          <SectionBadge className="border-[#8bb6ff] text-[#282828]">{badge}</SectionBadge>

          <div className="flex flex-col items-start gap-6">
            <SectionHeading
              {...heading}
              className="text-[28px] font-medium text-[#282828] sm:text-[38px] lg:text-[48px] xl:text-[58px]"
              accentClassName="font-light"
            />

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
                className="w-[243px] border-2 border-[#1173ee]"
              >
                {secondary.label}
              </PillButton>
            </div>
          </div>
        </Reveal>

        <Reveal variant="right" delay={220} className="w-full lg:flex-1">
          <NeedSolutionPanel />
        </Reveal>
      </div>
    </SectionShell>
  );
}
