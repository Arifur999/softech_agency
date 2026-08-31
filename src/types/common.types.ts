import type { ReactNode } from "react";

/** A headline split into its dark half and its blue half, as drawn in Figma. */
export interface ITwoToneHeading {
  /** Rendered in ink-900, Manrope Bold. */
  lead: string;
  /** Rendered in brand-500, Manrope Light. Optional for single-tone headings. */
  accent?: string;
  /** Optional text after the accent, back in ink-900. */
  trail?: string;
}

/** The badge + heading + subcopy block that opens 8 of the 12 sections. */
export interface ISectionIntro {
  badge: string;
  heading: ITwoToneHeading;
  description?: string;
  /** Second paragraph — a few sections carry one. */
  descriptionExtra?: string;
}

export interface INavLink {
  label: string;
  href: string;
}

export interface IIconCard {
  icon: ReactNode;
  title: string;
  description: string;
}
