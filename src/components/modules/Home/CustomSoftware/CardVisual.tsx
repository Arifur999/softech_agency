import { GROWTH_BARS, REQUIREMENT_PILLS } from "@/data/home/customSoftware";
import { cn } from "@/lib/utils";
import type { CustomSoftwareVisual } from "@/types/home.types";

/** The decorative footer each Custom Software card ends with. */
export function CardVisual({ visual }: { visual: CustomSoftwareVisual }) {
  if (visual === "track") {
    // Nodes 1:430 / 1:434 — three 36px nodes joined by 4px connectors. The
    // design overlaps two fixed 235px exports; drawn as flex so it fits any
    // card width instead of forcing a 436px minimum.
    const dots = ["#DBE9FF", "#D3E3FF", "#A5C5FB"];

    return (
      <div aria-hidden className="flex h-[36px] w-full max-w-[436px] items-center">
        {dots.map((color, index) => (
          <div key={color} className={cn("flex items-center", index < dots.length - 1 && "flex-1")}>
            <span
              className="size-[36px] shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
            {index < dots.length - 1 ? <span className="h-1 flex-1 bg-[#9FBCFF]" /> : null}
          </div>
        ))}
      </div>
    );
  }

  if (visual === "pills") {
    // Nodes 1:453 – 1:457.
    return (
      <div aria-hidden className="flex w-full max-w-[414px] flex-col items-end gap-[13px]">
        <div className="flex w-full items-center gap-4">
          {REQUIREMENT_PILLS.map((pill) => (
            <span
              key={pill.color}
              className="h-[29px] flex-1 rounded-[16px]"
              style={{ backgroundColor: pill.color, maxWidth: pill.width }}
            />
          ))}
        </div>
        <span className="h-[28px] w-full rounded-[32px] bg-[#e2edff]" />
      </div>
    );
  }

  // Nodes 1:473 – 1:476.
  const tallest = Math.max(...GROWTH_BARS);
  return (
    <div aria-hidden className="flex h-[85px] w-full max-w-[414px] items-end gap-[13px]">
      {GROWTH_BARS.map((height, index) => (
        <span
          key={index}
          className="flex-1 rounded-t-[4px] bg-linear-to-b from-[#1d7df2] to-[#7ab5fe]"
          style={{ height: `${(height / tallest) * 100}%` }}
        />
      ))}
    </div>
  );
}
