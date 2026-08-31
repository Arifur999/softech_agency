import { CustomSoftwareSection } from "@/components/modules/Home/CustomSoftware/CustomSoftwareSection";
import { HeroSection } from "@/components/modules/Home/Hero/HeroSection";
import { HowWeWorkSection } from "@/components/modules/Home/HowWeWork/HowWeWorkSection";
import { MeetFurnifySection } from "@/components/modules/Home/MeetFurnify/MeetFurnifySection";
import { OurApproachSection } from "@/components/modules/Home/OurApproach/OurApproachSection";
import { OurSoftwareSection } from "@/components/modules/Home/OurSoftware/OurSoftwareSection";
import { WhatIsSoftechSection } from "@/components/modules/Home/WhatIsSoftech/WhatIsSoftechSection";

import { WhySoftechSection } from "@/components/modules/Home/WhySoftech/WhySoftechSection";

import { WhatWeSolveSection } from "@/components/modules/Home/WhatWeSolve/WhatWeSolveSection";

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
    </>
  );
}
