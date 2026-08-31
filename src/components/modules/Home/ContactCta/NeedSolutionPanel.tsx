import { CONTACT_CTA } from "@/data/home/contactCta";
import { cn } from "@/lib/utils";

/** Figma node 1:743 — the blue panel pairing needs with solutions. */
export function NeedSolutionPanel() {
  const { needsTitle, solutionsTitle, footnote, needs, solutions } = CONTACT_CTA.panel;

  const columns = [
    { title: needsTitle, items: needs, border: "border-[#d2e3ff]" },
    { title: solutionsTitle, items: solutions, border: "border-[#80afff]" },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 rounded-[24px] bg-linear-to-b from-[#0567e7] to-[#a4ccff] px-8 py-12 lg:h-[526px] lg:gap-[84px] lg:px-12 lg:py-[94px]">
      <div className="flex w-full max-w-[656px] flex-col gap-8 sm:flex-row sm:gap-[42px]">
        {columns.map(({ title, items, border }) => (
          <div key={title} className="flex flex-1 flex-col gap-5 lg:gap-7">
            <p className="font-ui text-[15px] font-medium text-white lg:text-[16px]">{title}</p>

            <div className="flex flex-col gap-[15px]">
              {items.map((item) => (
                <p
                  key={item}
                  className={cn(
                    "rounded-[32px] border bg-[#d5e5ff] px-4 py-3 lg:px-6",
                    "font-ui text-[14px] font-medium text-[#2c2c2c] lg:text-[16px]",
                    border,
                  )}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="font-ui text-[15px] font-medium text-[#242424] lg:text-[16px]">{footnote}</p>
    </div>
  );
}
