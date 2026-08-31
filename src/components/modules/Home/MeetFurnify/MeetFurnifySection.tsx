import Image from "next/image";

import { PillButton } from "@/components/shared/PillButton";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { SectionShell } from "@/components/shared/SectionShell";
import { MEET_FURNIFY } from "@/data/home/meetFurnify";

/**
 * Figma node 1:6 — the #fcfcfd band with a heavily blurred blue bar behind the
 * tilted dashboard. (The frame also nests a duplicate of the products section
 * at top:1480px, past its own 1191px height, so that copy never renders.)
 */
export function MeetFurnifySection() {
  const { badge, headline, description, cta, image } = MEET_FURNIFY;

  return (
    <section id="furnify" className="relative w-full overflow-hidden bg-[#fcfcfd]">
      {/* Node 1:149 — gradient wash at blur(400px). */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[52%] left-[7.6%] h-[407px] w-[88.5%] bg-linear-to-r from-[#2c87ff] to-[#a5c5fb] blur-[400px]"
      />

      <SectionShell
        as="div"
        className="pt-16 pb-0 lg:pt-[161px]"
        innerClassName="relative z-10 flex flex-col items-center gap-4"
      >
        <div className="flex w-full max-w-[888px] flex-col items-center gap-8 lg:gap-[38px]">
          <div className="flex flex-col items-center gap-5">
            <SectionBadge className="border-[#cdcdcd]">{badge}</SectionBadge>

            <h2 className="text-center text-[30px] leading-[1.25] font-bold text-ink-900 sm:text-[40px] lg:text-[52px] xl:text-[62px]">
              <span className="font-medium text-brand-500">{headline.accent}</span>{" "}
              {headline.lead}
            </h2>

            <p className="text-center text-[15px] text-ink-700 sm:text-[16px] lg:text-[18px]">
              {description}
            </p>
          </div>

          <PillButton href={cta.href} variant="gradient" className="w-[243px]">
            {cta.label}
          </PillButton>
        </div>

        {/* Node 1:163 — the tablet sits at -1.8deg and bleeds off the bottom. */}
        <div className="w-full max-w-[1130px] pt-6 lg:pt-4">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 1024px) 100vw, 1105px"
            className="h-auto w-full -rotate-[1.8deg]"
          />
        </div>
      </SectionShell>
    </section>
  );
}
