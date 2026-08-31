import type { INavLink } from "@/types/common.types";

export const NAV_LINKS: INavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Custom Software", href: "#custom-software" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const BRAND = {
  name: "Softech",
  logo: "/nav-logo.png",
  logoWidth: 1164,
  logoHeight: 371,
} as const;

export const PRIMARY_CTA = {
  label: "Explore Our Products",
  href: "#products",
} as const;

export const SECONDARY_CTA = {
  label: "Build custom Software",
  href: "#custom-software",
} as const;
