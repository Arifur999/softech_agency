import type { INavLink } from "@/types/common.types";
import { EXTERNAL_LINKS } from "@/data/externalLinks";

export const FOOTER_CTA = {
  heading: {
    lead: "Have a business problem",
    accent: "worth solving?",
  },
  description: "Let's talk about what software could do for it.",
  /** Node 1:797 reads "Lat's Talk" in the design — kept verbatim. */
  button: { label: "Lat's Talk", href: EXTERNAL_LINKS.booking },
} as const;

export const FOOTER_BRAND = {
  logo: "/footer-logo.png",
  logoWidth: 189,
  logoHeight: 60,
  description:
    "Software built for local businesses. Focused SaaS products and custom software designed around real workflows.",
} as const;

export const FOOTER_COLUMNS: { title: string; links: INavLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "All Products", href: "#products" },
      { label: "Furnify", href: EXTERNAL_LINKS.furnify },
      { label: "Coming Soon", href: "#products" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Custom Software", href: "#custom-software" },
      { label: "Automation", href: "#custom-software" },
      { label: "Business Systems", href: "#custom-software" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export const FOOTER_LEGAL = {
  copyright: "© Softtech. All rights reserved.",
  links: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ] satisfies INavLink[],
};
