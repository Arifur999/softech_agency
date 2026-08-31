import { EXTERNAL_LINKS } from "@/data/externalLinks";

export const BUILD_WHATS_NEXT = {
  badge: "BUILD WHAT'S NEXT",
  heading: {
    /** Node 1:774 repeats "your" — kept verbatim. */
    lead: "Better software for the way your",
    accent: "your business works",
  },
  description:
    "Explore software made for your industry, or let's build something made for your business.",
  primary: { label: "Explore Products", href: "#products" },
  secondary: { label: "Build Custom Software", href: EXTERNAL_LINKS.booking },
} as const;
