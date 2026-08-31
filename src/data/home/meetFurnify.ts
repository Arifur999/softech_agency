import { EXTERNAL_LINKS } from "@/data/externalLinks";

export const MEET_FURNIFY = {
  badge: "OUR FIRST PRODUCT",
  /** Copy is verbatim from the design, including the "urniture" typo in node 1:157. */
  headline: {
    accent: "Meet Furnify",
    lead: "Software made for urniture businesses.",
  },
  description:
    "Run your Complete ecosystem supplier, products, orders, customers, partner, loan, profit and more in one simple place, We built around the way your furniture business works.",
  cta: { label: "Explore Furnify", href: EXTERNAL_LINKS.furnify },
  image: {
    src: "/images/meet-furnify/furnify-dashboard.png",
    width: 1105,
    height: 809,
    alt: "Furnify dashboard shown on a tablet",
  },
} as const;
