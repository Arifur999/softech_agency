import Image from "next/image";

import type { IProcessCard } from "@/types/home.types";

/**
 * Figma nodes 1:563 / 1:571 / 1:580 / 1:588 / 1:596 — an illustration with a
 * flat panel masking part of it and the copy on top. Everything inside is
 * placed in percentages so the card scales as one piece.
 */
export function ProcessCard({
  title,
  lead,
  description,
  image,
  width,
  height,
  panelColor,
  panel,
  text,
}: IProcessCard) {
  return (
    <article
      className="relative w-full overflow-hidden rounded-[12px]"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />

      <div
        aria-hidden
        className="absolute"
        style={{
          backgroundColor: panelColor,
          left: `${panel.left}%`,
          top: `${panel.top}%`,
          width: `${panel.width}%`,
          height: `${panel.height}%`,
        }}
      />

      <div
        className="absolute flex flex-col gap-2 lg:gap-4"
        style={{ left: `${text.left}%`, top: `${text.top}%`, width: `${text.width}%` }}
      >
        <h3 className="text-[18px] font-semibold text-ink-900 sm:text-[22px] lg:text-[26px] xl:text-[32px]">
          {title}
        </h3>
        <p className="text-[13px] leading-[1.5] font-semibold text-ink-700 sm:text-[15px] lg:text-[17px] xl:text-[20px]">
          {lead}
        </p>
        <p className="text-[11px] leading-[1.5] text-ink-700 sm:text-[13px] lg:text-[14px] xl:text-[16px]">
          {description}
        </p>
      </div>
    </article>
  );
}
