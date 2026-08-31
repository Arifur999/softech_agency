import { FeatureIcon } from "@/components/shared/FeatureIcon";
import type { IFeatureCard } from "@/types/home.types";

/** Figma nodes 1:368 / 1:377 / 1:386 — white card, #e8f0ff hairline, 12px radius. */
export function FeatureCard({ icon, title, description }: IFeatureCard) {
  return (
    <article className="flex flex-1 items-start gap-4 rounded-[12px] border border-[#e8f0ff] bg-white px-3 py-4">
      <FeatureIcon src={icon} />

      <div className="flex min-w-0 flex-col gap-4 text-[#1c1c1c]">
        <h3 className="text-[15px] font-bold lg:text-[16px]">{title}</h3>
        <p className="text-[13px] font-light lg:text-[14px]">{description}</p>
      </div>
    </article>
  );
}
