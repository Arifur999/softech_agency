import type { ISectionIntro } from "@/types/common.types";
import type { IFeatureCard } from "@/types/home.types";

export const WHY_SOFTECH_INTRO: ISectionIntro = {
  badge: "WHY IS SOFTTECH",
  heading: {
    lead: "We start with the business problem",
    accent: "not the technology.",
  },
  description:
    "Before we think about features, we think about the people using the software and the work they need to get done. That helps us build simpler tools that solve real problems instead of adding more complexity.",
};

export const WORKFLOW_CARD = {
  eyebrow: "INDUSTRY-FOCUSED",
  icon: "/icons/why-softech/glyph-workflow.svg",
  disc: "/icons/why-softech/disc-84.svg",
  title: "Workflow-first",
  description:
    "We learn the real process first, then design the software around it. Every part of the product has a reason to be there.",
  texture: "/images/why-softech/workflow-texture.png",
  /** Nodes 1:511 / 1:516 / 1:517 — the last step is the filled one. */
  steps: ["A", "B", "C"],
} as const;

export const WHY_SOFTECH_PRINCIPLES: IFeatureCard[] = [
  {
    icon: "/icons/why-softech/glyph-understand.svg",
    title: "Understand the business first",
    description: "We start with the realities of the industry, not a generic feature list.",
  },
  {
    icon: "/icons/why-softech/glyph-simple.svg",
    title: "Keep the experience simple",
    description:
      "Good software should make work easier to understand, not give your team more things to figure out.",
  },
  {
    icon: "/icons/why-softech/icon-next.svg",
    title: "Build for what's next",
    description:
      "We don't just solve today's problem. We leave room for the business to grow.",
  },
];

/** Discs pair with the glyphs above; the third export already contains its own. */
export const PRINCIPLE_DISCS = [
  "/icons/why-softech/disc-understand.svg",
  "/icons/why-softech/disc-simple.svg",
  undefined,
];
