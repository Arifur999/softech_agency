import { cn } from "@/lib/utils";

/** Figma node 1:619 — the #f2f7ff rail holding four pills. */
export function ChipRow({ chips }: { chips: string[] | null }) {
  const items = chips ?? [null, null, null, null];

  return (
    <div className="flex h-[49px] w-full items-center gap-2 rounded-[32px] border border-[#dae8ff] bg-[#f2f7ff] px-[14px] py-3 lg:gap-[13px]">
      {items.map((chip, index) => (
        <span
          key={index}
          className={cn(
            "flex h-[31px] flex-1 items-center justify-center rounded-[32px] bg-[#fefeff] px-2",
            "font-ui text-[13px] text-[#252525] lg:text-[14px]",
          )}
        >
          {chip ?? (
            <span aria-hidden className="h-[7px] w-full max-w-[62px] rounded-[6px] bg-[#f2f2f8]" />
          )}
        </span>
      ))}
    </div>
  );
}
