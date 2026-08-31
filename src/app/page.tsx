import { HeroSection } from "@/components/modules/Home/Hero/HeroSection";
import { OurSoftwareSection } from "@/components/modules/Home/OurSoftware/OurSoftwareSection";
import { WhatIsSoftechSection } from "@/components/modules/Home/WhatIsSoftech/WhatIsSoftechSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsSoftechSection />
      <OurSoftwareSection />
    </>
  );
}
