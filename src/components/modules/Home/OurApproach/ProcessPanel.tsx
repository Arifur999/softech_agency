import { PanelHeader } from "@/components/modules/Home/OurApproach/PanelHeader";
import { ProcessDiagram } from "@/components/modules/Home/OurApproach/ProcessDiagram";
import { APPROACH_SIMPLE } from "@/data/home/ourApproach";

/** The "Process Simplified" panel inside the second approach card. */
export function ProcessPanel() {
  const { panelTitle, stats } = APPROACH_SIMPLE;

  return (
    <div className="flex flex-col gap-4 rounded-[16px] border border-[#ececf0] bg-[#fdfdfd] p-4 lg:p-5">
      <PanelHeader title={panelTitle} />

      <ProcessDiagram />

      <div className="flex gap-2 lg:gap-3">
        {stats.map(({ label, value, delta }) => (
          <div
            key={label}
            className="flex flex-1 flex-col items-center gap-1 rounded-[12px] border border-[#ececf0] px-2 py-3"
          >
            <p className="text-[12px] text-ink-700 lg:text-[13px]">{label}</p>
            <p className="text-[20px] font-bold text-ink-900 lg:text-[24px]">{value}</p>
            <p className="text-[12px] text-brand-600 lg:text-[13px]">{delta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
