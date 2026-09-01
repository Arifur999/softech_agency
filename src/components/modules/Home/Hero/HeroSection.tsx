import Image from "next/image";

import { HeroBackdrop } from "@/components/modules/Home/Hero/HeroBackdrop";
import { HeroHeadline } from "@/components/modules/Home/Hero/HeroHeadline";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { PillButton } from "@/components/shared/PillButton";
import { SectionShell } from "@/components/shared/SectionShell";
import { HERO } from "@/data/home/hero";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/data/navigation";

/** Figma node 1:307 — 1920 x 1160. */
export function HeroSection() {
  return (
    <section id="home" className="relative w-full overflow-hidden">
      <HeroBackdrop />

      {/*
        Rectangle 108 (1:354) — a white rect at blur(104.4px) fading the hero
        into the next section. Rendered as a gradient instead: the same wash,
        without a 100px+ compositor blur over a full-bleed element.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[22%] bg-linear-to-b from-transparent to-white"
      />

      <SectionShell
        as="div"
        className="pt-[110px] pb-0 sm:pt-[130px] lg:min-h-[1160px] lg:pt-[166px]"
        innerClassName="relative z-10 flex flex-col items-center"
      >
        <div data-enter style={{ animationDelay: "120ms" }}>
          <SectionBadge>{HERO.badge}</SectionBadge>
        </div>

        <div
          data-enter
          style={{ animationDelay: "340ms" }}
          className="mt-3 flex w-full flex-col items-center gap-5 lg:gap-[19px]"
        >
          <HeroHeadline />

          <p className="max-w-[716px] text-center text-[15px] leading-[1.55] text-ink-700 sm:text-[16px] lg:text-[18px]">
            {HERO.description}
          </p>
        </div>

        <div
          data-enter
          style={{ animationDelay: "580ms" }}
          className="mt-7 flex flex-col items-center gap-4 sm:flex-row lg:mt-[34px] lg:gap-[21px]"
        >
          <PillButton href={PRIMARY_CTA.href} variant="gradient" className="w-[243px]">
            {PRIMARY_CTA.label}
          </PillButton>
          <PillButton href={SECONDARY_CTA.href} variant="outline" className="w-[238px]">
            {SECONDARY_CTA.label}
          </PillButton>
        </div>

        <p
          data-enter
          style={{ animationDelay: "800ms" }}
          className="mt-7 text-center text-[14px] text-ink-900 lg:mt-[34px] lg:text-[16px]"
        >
          {HERO.footnote}
        </p>

        {/* Group 81125 — the tablet pair bleeds off the bottom of the frame. */}
        <div
          data-enter
          style={{ animationDelay: "1000ms" }}
          className="mt-10 w-full max-w-[1312px] lg:mt-[15px]"
        >
          <Image
            src={HERO.showcase.src}
            alt={HERO.showcase.alt}
            width={HERO.showcase.width}
            height={HERO.showcase.height}
            priority
            sizes="(max-width: 1024px) 100vw, 1312px"
            className="h-auto w-full"
          />
        </div>
      </SectionShell>
    </section>
  );
}
