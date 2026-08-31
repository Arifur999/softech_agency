export const HERO = {
  badge: "SOFTWARE BUILT FOR LOCAL BUSINESSES",
  headline: {
    lead: "We build software that fits",
    /** Second line, split so the accent can wear the Figma selection box. */
    trailLead: "the way your",
    accent: "business works.",
  },
  description:
    "We build software for specific industries, and custom software for businesses that need something built around their own needs.",
  footnote: "Industry-focused SaaS products + custom software",
  background: {
    layerOne: "/images/hero/sky-layer-1.png",
    layerTwo: "/images/hero/sky-layer-2.png",
    bloomOne: "/images/hero/bloom-1.svg",
    bloomTwo: "/images/hero/bloom-2.svg",
  },
  showcase: {
    src: "/images/hero/dashboard-stack.png",
    width: 1312,
    height: 517,
    alt: "E-Finify dashboard shown on two tablets",
  },
} as const;
