import { ClipboardCheck, Database, TrendingUp, UserRound } from "lucide-react";
import type { ComponentType } from "react";

import { PanelHeader } from "@/components/modules/Home/OurApproach/PanelHeader";
import { APPROACH_PROBLEM } from "@/data/home/ourApproach";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  user: UserRound,
  trend: TrendingUp,
  clipboard: ClipboardCheck,
  database: Database,
};

/** The "Identified Issues" list inside the first approach card. */
export function IssuesPanel() {
  const { panelTitle, issues, total } = APPROACH_PROBLEM;

  return (
    <div className="flex flex-col gap-4 rounded-[16px] border border-[#ececf0] bg-[#fefdfd] p-4 lg:p-5">
      <PanelHeader title={panelTitle} />

      <ul className="flex flex-col gap-1">
        {issues.map(({ label, value, icon }) => {
          const Icon = ICONS[icon];
          return (
            <li key={label} className="flex items-center gap-3 py-1.5">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#fdeaed]">
                <Icon className="size-4 text-[#f4364c]" />
              </span>
              <span className="flex-1 text-[14px] text-ink-900 lg:text-[15px]">{label}</span>
              <span className="text-[14px] text-ink-900 lg:text-[15px]">{value}</span>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3 rounded-[12px] bg-[#fdeef1] px-3 py-2.5">
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#fbd9de]">
          <TrendingUp className="size-4 text-[#f4364c]" />
        </span>
        <span className="flex-1 text-[14px] font-semibold text-[#f4364c] lg:text-[15px]">
          {total.label}
        </span>
        <span className="text-[16px] font-bold text-[#f4364c] lg:text-[18px]">{total.value}</span>
      </div>
    </div>
  );
}
