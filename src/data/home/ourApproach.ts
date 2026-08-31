import type { ISectionIntro } from "@/types/common.types";

export const OUR_APPROACH_INTRO: ISectionIntro = {
  badge: "OUR APPROACH",
  heading: {
    lead: "Technology should adapt to the business not the",
    accent: "other way around.",
  },
  description:
    "Good software starts by understanding the work, not by choosing the technology. We look at what people need to do, where the work gets difficult, and what would make it easier  then build from there. Good software starts by understanding the work, not by choosing the technology. We look at what people need to do, where the work gets difficult, and what would make it easier  then build from there.",
};

export const APPROACH_PROBLEM = {
  title: { lead: "Start with the", accent: "real problem" },
  lines: [
    "We don't add features just because we can.",
    "We first ask what is slowing the business",
    "down and what actually needs to change.",
  ],
  panelTitle: "Identified Issues",
  issues: [
    { label: "Slow Onboarding", value: "23", icon: "user" },
    { label: "High Drop-off", value: "18", icon: "trend" },
    { label: "Manual Processes", value: "14", icon: "clipboard" },
    { label: "Data Silos", value: "09", icon: "database" },
  ],
  total: { label: "Issues Found", value: "64" },
} as const;

export const APPROACH_SIMPLE = {
  title: { lead: "Make the complex", accent: "feel simple" },
  lines: [
    "A business can have complicated processes",
    "without needing complicated software.",
    "We turn busy, confusing work into clear",
    "steps people can follow.",
  ],
  panelTitle: "Process Simplified",
  stats: [
    { label: "Processes", value: "24", delta: "Simplified" },
    { label: "Time Saved", value: "156h", delta: "+35%" },
    { label: "Efficiency", value: "78%", delta: "+28%" },
  ],
} as const;

export const APPROACH_REAL_LIFE = {
  title: { lead: "Build for real life" },
  lines: [
    "Software has to work beyond the demo.",
    "It needs to fit real people, real decisions,",
    "and the way work happens every day.",
  ],
  panelTitle: "Real Impact",
  chart: {
    /** Values in thousands, plotted across the Jan–Jun axis. */
    max: 80,
    ticks: [80, 60, 40, 20, 0],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: [
      {
        name: "Business Growth",
        color: "#22c55e",
        badge: "+68%",
        points: [30, 37, 41, 43, 49, 50, 57, 61, 60, 61, 66],
      },
      {
        name: "Operational Efficiency",
        color: "#2563eb",
        badge: "+32%",
        points: [10, 13, 15, 16, 20, 19, 23, 27, 25, 25, 29],
      },
    ],
  },
} as const;

export const APPROACH_PERIOD = "This Month";
