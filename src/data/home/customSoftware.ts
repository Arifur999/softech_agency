import type { ISectionIntro } from "@/types/common.types";
import type { ICustomSoftwareCard } from "@/types/home.types";

export const CUSTOM_SOFTWARE_INTRO: ISectionIntro = {
  badge: "CUSTOM  SOFTWARE",
  heading: {
    lead: "Your business doesn't have to fit",
    accent: "someone else's software.",
  },
  description:
    "Our products solve repeatable problems across specific industries. Custom software solves the problems that are unique to your business.",
  descriptionExtra:
    "When existing system don't match the way you work, we design and build software around your workflow.",
};

export const CUSTOM_SOFTWARE_CTA = {
  label: "Build Custom Software",
  href: "#contact",
} as const;

/** Every card carries "01" in the design — kept verbatim. */
export const CUSTOM_SOFTWARE_CARDS: ICustomSoftwareCard[] = [
  {
    number: "01",
    icon: "/icons/custom-software/glyph-workflow.svg",
    title: "Built around your workflow",
    description:
      "Your software should match your process 8520 uyhnot force your team to change it.",
    visual: "track",
  },
  {
    number: "01",
    icon: "/icons/custom-software/glyph-designed.svg",
    title: "Designed for your business",
    description:
      "Every workflow, interface, and feature is shaped around your actual requirements.",
    visual: "pills",
    highlighted: true,
  },
  {
    number: "01",
    icon: "/icons/custom-software/glyph-grows.svg",
    title: "Grows with you",
    description: "Start with what matters now. Add more when your business is ready.",
    visual: "bars",
  },
];

/** Bar heights in px from nodes 1:473 – 1:476. */
export const GROWTH_BARS = [37, 57, 75, 85];

/** Pill widths and fills from nodes 1:454 – 1:456. */
export const REQUIREMENT_PILLS = [
  { width: 127, color: "#e5f0ff" },
  { width: 128, color: "#d4e7ff" },
  { width: 127, color: "#92c1ff" },
];
