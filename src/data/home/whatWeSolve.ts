import type { ISectionIntro } from "@/types/common.types";
import type { ISolveCard } from "@/types/home.types";

export const WHAT_WE_SOLVE_INTRO: ISectionIntro = {
  badge: "WHAT WE SOLVE",
  heading: {
    lead: "Less busywork. Less confusion. More time to run",
    accent: "your business.",
  },
  description:
    "As businesses grow, work can get scattered across spreadsheets, apps, messages, and manual tasks. We build software that brings things together and makes everyday work easier to manage.",
};

export const WHAT_WE_SOLVE_CARDS: ISolveCard[] = [
  {
    title: "Too many tools",
    description:
      "Spreadsheets, email, chat, and other tools make simple things harder to keep track of.",
    chips: ["Sheet", "Email", "Chat", "CRM"],
    linkLabel: "Bring it together",
    href: "#contact",
    featured: true,
  },
  {
    title: "Manual work",
    description:
      "If your team keeps copying, pasting, checking, and repeating the same tasks, there's probably a better way.",
    chips: ["Copy", "Paste", "Send", "Repeat"],
    linkLabel: "Automate the busywork",
    href: "#contact",
  },
  {
    title: "Hard to see what's happening",
    description:
      "When important details are spread across different places, it's difficult to know what's happening in the business.",
    chips: null,
    linkLabel: "Clear dashboards",
    href: "#contact",
  },
  {
    title: "Your software shouldn't make work harder.",
    description:
      "When your team has to change the way they work just to use a tool, the tool may be the problem.",
    chips: ["Tool", "-", "You", "↻"],
    linkLabel: "Software shaped around you",
    href: "#contact",
  },
  {
    title: "Growing complexity",
    description:
      "More customers, more orders, and more work can turn simple processes into difficult ones.",
    chips: ["1", "10", "50", "100"],
    linkLabel: "Systems that scale",
    href: "#contact",
  },
  {
    title: "Limited automation",
    description: "Give your team more time for the work that actually needs people.",
    chips: ["Do", "Do", "Do", "Do"],
    linkLabel: "Software does the repeatable",
    href: "#contact",
  },
];
