import Image from "next/image";
import Link from "next/link";

import { MobileNav } from "@/components/layout/Navbar/MobileNav";
import { NavLinks } from "@/components/layout/Navbar/NavLinks";
import { PillButton } from "@/components/shared/PillButton";
import { BRAND, PRIMARY_CTA } from "@/data/navigation";

/**
 * Figma node 1:312 — the bar floats over the hero, 76px tall, with the logo
 * left, the translucent link pill centred and the gradient CTA right.
 */
export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 pt-4 lg:pt-[15px]">
      <div className="mx-auto flex w-full max-w-[1661px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 xl:px-[129px]">
        <Link href="#home" aria-label={BRAND.name} className="shrink-0">
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            width={BRAND.logoWidth}
            height={BRAND.logoHeight}
            priority
            className="h-[54px] w-auto lg:h-[76px]"
          />
        </Link>

        <div className="hidden lg:block">
          <NavLinks />
        </div>

        <PillButton
          href={PRIMARY_CTA.href}
          variant="gradient"
          className="hidden lg:inline-flex lg:w-[243px]"
        >
          {PRIMARY_CTA.label}
        </PillButton>

        <MobileNav />
      </div>
    </header>
  );
}
