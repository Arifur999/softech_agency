import Image from "next/image";

import { WORKFLOW_CARD } from "@/data/home/whySoftech";
import { cn } from "@/lib/utils";

/**
 * Nodes 1:506 – 1:517 — three 59px nodes joined by hairlines. Figma draws the
 * first two white and fills the last with the blue gradient.
 */
export function StepTrack() {
  const { steps } = WORKFLOW_CARD;

  return (
    <div className="flex w-full items-center">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <div key={step} className={cn("flex items-center", !isLast && "flex-1")}>
            <span className="relative inline-flex size-[48px] shrink-0 items-center justify-center lg:size-[59px]">
              {isLast ? (
                <Image
                  src="/icons/why-softech/step-active.svg"
                  alt=""
                  aria-hidden
                  fill
                  sizes="59px"
                  className="object-contain"
                />
              ) : (
                <span aria-hidden className="absolute inset-0 rounded-full bg-white" />
              )}
              <span
                className={cn(
                  "relative font-ui text-[20px] font-bold lg:text-[24px]",
                  isLast ? "text-white" : "text-[#282828]",
                )}
              >
                {step}
              </span>
            </span>

            {!isLast ? <span aria-hidden className="h-px flex-1 bg-white" /> : null}
          </div>
        );
      })}
    </div>
  );
}
