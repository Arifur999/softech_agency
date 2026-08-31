/** A small icon + title + description card. Used by several sections. */
export interface IFeatureCard {
  /** Path to the exported Figma glyph, e.g. `/icons/industry-glyph.svg`. */
  icon: string;
  title: string;
  description: string;
}

/** A stat tile inside the Furnify operations panel. */
export interface IProductStat {
  value: string;
  label: string;
  icon: string;
  /** True when the exported SVG already contains its own disc. */
  iconIsWhole?: boolean;
}

/** The repeated "Order Analytics" mini dashboard card. */
export interface IOrderAnalytics {
  title: string;
  subtitle: string;
  leftLabel: string;
  rightLabel: string;
  /** Percentage of the progress bar that is filled. */
  progress: number;
  footLeft: string;
  footRight: string;
}

/** Which decorative footer a Custom Software card draws. */
export type CustomSoftwareVisual = "track" | "pills" | "bars";

export interface ICustomSoftwareCard {
  number: string;
  icon: string;
  title: string;
  description: string;
  visual: CustomSoftwareVisual;
  /** The middle card wears the blue gradient. */
  highlighted?: boolean;
}

/** A box positioned as percentages of its parent card. */
export interface IBoxPercent {
  left: number;
  top: number;
  width: number;
  height?: number;
}

/** One illustrated step in the How We Work grid. */
export interface IProcessCard {
  title: string;
  lead: string;
  description: string;
  image: string;
  width: number;
  height: number;
  panelColor: string;
  panel: Required<IBoxPercent>;
  text: IBoxPercent;
}

/** One card in the What We Solve grid. */
export interface ISolveCard {
  title: string;
  description: string;
  /** Chip labels; `null` renders the placeholder bars from nodes 1:655 – 1:661. */
  chips: string[] | null;
  linkLabel: string;
  href: string;
  /** The first card carries the stronger border and a drop shadow. */
  featured?: boolean;
}
