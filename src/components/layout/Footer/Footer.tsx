import Image from "next/image";
import Link from "next/link";

import { FooterColumn } from "@/components/layout/Footer/FooterColumn";
import { PillButton } from "@/components/shared/PillButton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import {
  FOOTER_BRAND,
  FOOTER_COLUMNS,
  FOOTER_CTA,
  FOOTER_LEGAL,
} from "@/data/footer";

/** Figma node 1:784 — 1920 x 697, a photographic ground under a radial wash. */
export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden lg:min-h-[697px]">
      <Image
        src="/images/footer/backdrop.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Node 1:787 — the radial gradient resolved from its SVG transform. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 126.3% 126.4% at 50% 43%, rgba(4,29,60,0.82) 5.6%, rgba(5,49,104,0.69) 29%, rgba(7,70,149,0.56) 53%, rgba(10,111,237,0.3) 100%)",
        }}
      />

      <SectionShell
        as="div"
        className="relative z-10 flex h-full flex-col justify-center py-14 lg:py-[66px]"
        innerClassName="flex flex-col gap-14 lg:gap-[101px]"
      >
        <div className="flex flex-col gap-8 lg:gap-[42px]">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-start">
            <div className="flex max-w-[645px] flex-col gap-[17px]">
              <SectionHeading
                {...FOOTER_CTA.heading}
                tone="light"
                className="text-[26px] sm:text-[32px] lg:text-[38px] xl:text-[42px]"
                accentClassName="font-normal text-[#bfd2ff]"
              />
              <p className="text-[16px] leading-[1.5] text-white lg:text-[18px]">
                {FOOTER_CTA.description}
              </p>
            </div>

            <PillButton
              href={FOOTER_CTA.button.href}
              variant="gradient"
              className="w-[243px] shrink-0 border-[#4c9bff]"
            >
              {FOOTER_CTA.button.label}
            </PillButton>
          </div>

          <hr className="border-white/25" />
        </div>

        <div className="flex flex-col gap-12 pb-3 lg:gap-[86px]">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div className="flex max-w-[367px] flex-col gap-6 lg:gap-[34px]">
              <Image
                src={FOOTER_BRAND.logo}
                alt="Softech"
                width={FOOTER_BRAND.logoWidth}
                height={FOOTER_BRAND.logoHeight}
                className="h-[60px] w-[189px] object-cover"
              />
              <p className="text-[16px] leading-[1.5] text-white lg:text-[18px]">
                {FOOTER_BRAND.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-10 sm:gap-20 lg:gap-[100px] xl:gap-[211px]">
              {FOOTER_COLUMNS.map((column) => (
                <FooterColumn key={column.title} {...column} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 font-ui text-[14px] text-[#e4e4e4] sm:flex-row sm:items-center sm:justify-between">
            <p>{FOOTER_LEGAL.copyright}</p>

            <div className="flex items-center justify-between gap-10 sm:w-[314px]">
              {FOOTER_LEGAL.links.map((link) => (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>
    </footer>
  );
}
