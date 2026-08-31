import { DM_Sans, Manrope, Montserrat } from "next/font/google";

/**
 * Manrope carries every headline and paragraph in the design, so it is
 * bound to `--font-sans` and becomes the app-wide default.
 */
export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/** DM Sans is used only for badge pills, button labels and small UI text. */
export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

/** Montserrat Medium is used only for the navbar links. */
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600"],
});

export const fontVariables = `${manrope.variable} ${dmSans.variable} ${montserrat.variable}`;
