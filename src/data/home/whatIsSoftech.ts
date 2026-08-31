import type { IFeatureCard } from "@/types/home.types";
import type { ISectionIntro } from "@/types/common.types";

export const WHAT_IS_SOFTECH_INTRO: ISectionIntro = {
  badge: "WHAT IS SOFTTECH",
  heading: {
    lead: "Software built for businesses",
    accent: "we understand.",
  },
  description:
    "Every business works differently. We build software around the way you work  with ready-to-use products for specific industries and custom software when you need something built just for your business.",
};

export const WHAT_IS_SOFTECH_TAGLINE = "The right software for the way you work.";

export const WHAT_IS_SOFTECH_IMAGE = {
  src: "/images/what-is-softech/business-overview.png",
  width: 568,
  height: 719,
  alt: "Business Overview dashboard showing total revenue and monthly growth",
} as const;

export const WHAT_IS_SOFTECH_CARDS: IFeatureCard[] = [
  {
    icon: "/icons/industry-glyph.svg",
    title: "Built for your industry",
    description: "Software made for the needs of businesses like yours.",
  },
  {
    icon: "/icons/business-glyph.svg",
    title: "Built for your business",
    description: "Custom software designed around your own needs and workflow.",
  },
  {
    icon: "/icons/easier-glyph.svg",
    title: "Built to make work easier",
    description: "Simple tools that help you save time, stay organized, and work better.",
  },
];
