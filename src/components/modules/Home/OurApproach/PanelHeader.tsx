import { ChevronDown } from "lucide-react";

import { APPROACH_PERIOD } from "@/data/home/ourApproach";

/** The "<title> … This Month ⌄" row every approach panel opens with. */
export function PanelHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[14px] font-bold text-ink-900 lg:text-[15px]">{title}</p>

      <span className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#ececf0] bg-white px-3 py-2 text-[12px] text-ink-900 lg:text-[13px]">
        {APPROACH_PERIOD}
        <ChevronDown aria-hidden className="size-3.5 text-ink-500" />
      </span>
    </div>
  );
}
