import Image from "next/image";
import Link from "next/link";

import { MobileNav } from "@/components/layout/Navbar/MobileNav";
import { NavLinks } from "@/components/layout/Navbar/NavLinks";
import { PillButton } from "@/components/shared/PillButton";
import { BRAND, PRIMARY_CTA } from "@/data/navigation";

/**
 * Figma node 1:312 — the bar floats over the hero, 76px tall, with the logo
 * left, the translucent link pill centred and the gradient CTA right. The
 * Figma numbers are a 1920 layout, so the logo, gaps and CTA all step down
 * below 2xl to keep the row from overflowing on smaller laptops.
 */
export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 pt-4 lg:pt-[15px]">
      <div className="mx-auto flex w-full max-w-[1704px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10 xl:px-14 2xl:px-8">
        <Link href="#home" aria-label={BRAND.name} className="shrink-0">
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            width={BRAND.logoWidth}
            height={BRAND.logoHeight}
            priority
            className="h-[48px] w-auto lg:h-[56px] 2xl:h-[76px]"
          />
        </Link>

        <div className="hidden lg:block">
          <NavLinks />
        </div>

        <PillButton
          href={PRIMARY_CTA.href}
          variant="gradient"
          className="hidden lg:inline-flex lg:w-[200px] 2xl:w-[243px]"
        >
          {PRIMARY_CTA.label}
        </PillButton>

        <MobileNav />
      </div>
    </header>
  );
}
