import type { ISectionIntro } from "@/types/common.types";
import type { IOrderAnalytics, IProductStat } from "@/types/home.types";
import { EXTERNAL_LINKS } from "@/data/externalLinks";

export const OUR_SOFTWARE_INTRO: ISectionIntro = {
  badge: "OUR SOFTWARE",
  heading: {
    lead: "Software built for the way different",
    accent: "businesses work.",
  },
  description:
    "We are building Softtech as a collection of focused products each designed around the needs of a particular type of business.",
};

export const PRODUCT_FILTERS = [
  { value: "live", label: "Live" },
  { value: "coming-soon", label: "Coming soon" },
] as const;

export type ProductFilter = (typeof PRODUCT_FILTERS)[number]["value"];

export const FURNIFY = {
  name: "Furnify",
  status: "Live",
  icon: "/icons/our-software/furnify-glyph.svg",
  disc: "/icons/our-software/furnify-circle.svg",
  title: "Software built specifically for furniture businesses.",
  description:
    "Furnify brings the workflows, operations, and tools of a furniture business into one focused platform built specifically for the industry instead of adapted from generic software.",
  cta: { label: "Explore Furnify", href: EXTERNAL_LINKS.furnify },
  panelTitle: "Operations Overview",
  panelDelta: "+18%",
} as const;

export const FURNIFY_STATS: IProductStat[] = [
  { value: "248", label: "Orders", icon: "/icons/our-software/stat-orders.svg" },
  { value: "1.2k", label: "Customers", icon: "/icons/our-software/stat-customers.svg" },
  { value: "$84k", label: "Revenue", icon: "/icons/our-software/stat-revenue.svg", iconIsWhole: true },
];

/** Bar heights in px, straight from nodes 1:232 – 1:238. */
export const FURNIFY_BARS = [39, 71, 57, 49, 64, 77, 57];

export const COMING_SOON = {
  status: "Coming Soon",
  icon: "/icons/our-software/coming-glyph.svg",
  disc: "/icons/our-software/coming-circle.svg",
  title: "More industry-focused software is on the way.",
  description:
    "We're working on new products designed around the workflows of other local-business industries.",
  cta: { label: "See What's Coming", href: "#contact" },
} as const;

export const ORDER_ANALYTICS: IOrderAnalytics = {
  title: "Order Analytics",
  subtitle: "Furnify Dashboard",
  leftLabel: "Orders",
  rightLabel: "Due today",
  progress: 67.81,
  footLeft: "248 Orders",
  footRight: "12 Pending",
};

/** Offsets for the three stacked cards — nodes 1:260 / 1:275 / 1:290. */
export const ORDER_ANALYTICS_OFFSETS = [
  { left: 0, top: 0 },
  { left: 29.38, top: 21.74 },
  { left: 56.65, top: 51.77 },
];
