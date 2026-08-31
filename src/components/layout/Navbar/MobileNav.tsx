"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks } from "@/components/layout/Navbar/NavLinks";
import { PillButton } from "@/components/shared/PillButton";
import { BRAND, PRIMARY_CTA } from "@/data/navigation";

/** Below `lg` the floating nav pill is replaced by this sheet. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="flex size-11 items-center justify-center rounded-full border border-brand-200 bg-white/80 text-ink-900 backdrop-blur-sm lg:hidden"
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] gap-0 sm:w-[340px]">
        <SheetHeader className="border-b border-brand-100">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            width={BRAND.logoWidth}
            height={BRAND.logoHeight}
            className="h-[46px] w-auto"
          />
        </SheetHeader>

        <div className="flex flex-col gap-6 p-4">
          <NavLinks layout="stack" onNavigate={() => setOpen(false)} />
          <PillButton
            href={PRIMARY_CTA.href}
            className="w-full"
            onClick={() => setOpen(false)}
          >
            {PRIMARY_CTA.label}
          </PillButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
