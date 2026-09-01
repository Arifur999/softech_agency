import { ComingSoonCard } from "@/components/modules/Home/OurSoftware/ComingSoonCard";
import { Reveal, RevealGroup } from "@/components/shared/Reveal";
import { FurnifyCard } from "@/components/modules/Home/OurSoftware/FurnifyCard";
import { ProductToggle } from "@/components/modules/Home/OurSoftware/ProductToggle";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { SectionShell } from "@/components/shared/SectionShell";
import { OUR_SOFTWARE_INTRO } from "@/data/home/ourSoftware";

/** Figma node 1:165 — intro + availability toggle over the two product cards. */
export function OurSoftwareSection() {
  return (
    <SectionShell
      id="products"
      className="py-16 lg:py-[76px]"
      innerClassName="flex flex-col gap-10 lg:gap-16"
    >
      <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <SectionIntro
          {...OUR_SOFTWARE_INTRO}
          className="max-w-[877px]"
          badgeClassName="border-[#cdcdcd]"
          headingClassName="text-[30px] sm:text-[40px] lg:text-[52px] xl:text-[62px]"
          accentClassName="font-normal"
          descriptionClassName="lg:text-[18px]"
        />
        <ProductToggle />
      </Reveal>

      <RevealGroup className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-[52px]" itemClassName="flex flex-1" step={220}>
        <FurnifyCard />
        <ComingSoonCard />
      </RevealGroup>
    </SectionShell>
  );
}
