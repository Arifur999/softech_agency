import type { ISectionIntro } from "@/types/common.types";
import type { IProcessCard } from "@/types/home.types";

export const HOW_WE_WORK_INTRO: ISectionIntro = {
  badge: "HOW WE WORK",
  heading: {
    lead: "From a business problem to",
    accent: "software that works.",
  },
  description:
    "Whether we're building one of our products or something just for you, we start by understanding the work, then turn what we learn into a practical solution.",
};

/**
 * Each card is an illustration with a white panel masking part of it and the
 * copy sitting on top. `panel` and `text` are the Figma offsets expressed as
 * percentages of the card box, so the whole card scales as one unit.
 */
export const HOW_WE_WORK_STEPS: IProcessCard[] = [
  {
    title: "Understand",
    lead: "First, we learn how the business works.",
    description:
      "We look at the day-to-day work, where things get difficult, and what needs to improve.",
    image: "/images/how-we-work/understand.png",
    width: 809,
    height: 498.976,
    panelColor: "#fffeff",
    panel: { left: 2.1, top: 7.42, width: 50.19, height: 50.7 },
    text: { left: 7.91, top: 19.64, width: 47.71 },
  },
  {
    title: "Define",
    lead: "Then we decide what needs to be solved.",
    description:
      "We narrow down the problem, set clear goals, and decide what the solution should do.",
    image: "/images/how-we-work/define.png",
    width: 788,
    height: 498,
    panelColor: "#fffeff",
    panel: { left: 3.05, top: 8.74, width: 51.52, height: 54.82 },
    text: { left: 9.01, top: 20.58, width: 48.98 },
  },
  {
    title: "Design",
    lead: "We turn the idea into a simple experience.",
    description:
      "From the screens people use to the steps they follow, we design everything to be clear and easy to use.",
    image: "/images/how-we-work/design.png",
    width: 514,
    height: 563,
    panelColor: "#fefefe",
    panel: { left: 9.53, top: 10.3, width: 74.32, height: 39.61 },
    text: { left: 9.53, top: 14.39, width: 78.79 },
  },
  {
    title: "Build",
    lead: "Then we make it real.",
    description:
      "We build the software, connect the systems it needs, and make sure everything works together.",
    image: "/images/how-we-work/build.png",
    width: 538,
    height: 563,
    panelColor: "#fefefe",
    panel: { left: 6.51, top: 8.17, width: 73.05, height: 43.52 },
    text: { left: 10.22, top: 15.63, width: 71.75 },
  },
  {
    title: "Launch & Improve",
    lead: "Launch is just the beginning.",
    description:
      "Once the software is in use, we learn from real feedback and keep improving it as the business grows.",
    image: "/images/how-we-work/launch.png",
    width: 505,
    height: 571,
    panelColor: "#fefefe",
    panel: { left: 3.76, top: 9.28, width: 77.82, height: 45.88 },
    text: { left: 11.88, top: 16.12, width: 80.4 },
  },
];

/** Nodes 1:562 and 1:579 — two cards, then three. */
export const HOW_WE_WORK_ROWS = [HOW_WE_WORK_STEPS.slice(0, 2), HOW_WE_WORK_STEPS.slice(2)];
