import { BuildWhatsNextSection } from "@/components/modules/Home/BuildWhatsNext/BuildWhatsNextSection";
import { ContactCtaSection } from "@/components/modules/Home/ContactCta/ContactCtaSection";
import { CustomSoftwareSection } from "@/components/modules/Home/CustomSoftware/CustomSoftwareSection";
import { HeroSection } from "@/components/modules/Home/Hero/HeroSection";
import { HowWeWorkSection } from "@/components/modules/Home/HowWeWork/HowWeWorkSection";
import { MeetFurnifySection } from "@/components/modules/Home/MeetFurnify/MeetFurnifySection";
import { OurApproachSection } from "@/components/modules/Home/OurApproach/OurApproachSection";
import { OurSoftwareSection } from "@/components/modules/Home/OurSoftware/OurSoftwareSection";
import { WhatIsSoftechSection } from "@/components/modules/Home/WhatIsSoftech/WhatIsSoftechSection";
import { WhatWeSolveSection } from "@/components/modules/Home/WhatWeSolve/WhatWeSolveSection";
import { WhySoftechSection } from "@/components/modules/Home/WhySoftech/WhySoftechSection";

/** Sections are composed in the y-order they appear in Figma frame 1:4. */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsSoftechSection />
      <OurSoftwareSection />
      <MeetFurnifySection />
      <CustomSoftwareSection />
      <WhySoftechSection />
      <HowWeWorkSection />
      <OurApproachSection />
      <WhatWeSolveSection />
      <ContactCtaSection />
      <BuildWhatsNextSection />
    </>
  );
}
