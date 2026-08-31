import { FeatureIcon } from "@/components/shared/FeatureIcon";
import type { IFeatureCard } from "@/types/home.types";

interface PrincipleCardProps extends IFeatureCard {
  /** Omitted when the exported icon already carries its own disc. */
  disc?: string;
}

/** Figma nodes 1:519 / 1:532 / 1:542. */
export function PrincipleCard({ icon, disc, title, description }: PrincipleCardProps) {
  return (
    <article className="flex flex-col items-start gap-[18px] rounded-[16px] border border-[#9ec8ff] bg-white px-6 py-7 drop-shadow-[0px_2px_16px_rgba(9,49,102,0.12)] lg:px-[34px] lg:py-8">
      <FeatureIcon src={icon} disc={disc} bare={!disc} size={68} glyphSize={32} />

      <div className="flex flex-col gap-4">
        <h3 className="text-[22px] font-medium text-ink-900 lg:text-[32px]">{title}</h3>
        <p className="text-[16px] leading-[1.5] text-ink-700 lg:text-[18px]">{description}</p>
      </div>
    </article>
  );
}
