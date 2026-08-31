import Image from "next/image";

import { HERO } from "@/data/home/hero";

/**
 * Figma stacks two cloud photographs over a white ground, washes them with a
 * downward gradient, then floats two heavily blurred blue ellipses behind the
 * tablets. Every offset below is node geometry (1:309, 1:310, 1:311, 1:326,
 * 1:327) resolved against the 1920 x 1160 frame.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-white"
    >
      {/* image 19 — node 1:309 at 88% */}
      <div className="absolute -top-[15.05%] -left-[2.83%] h-[117.7%] w-[106.8%] opacity-88">
        <Image
          src={HERO.background.layerOne}
          alt=""
          fill
          priority
          sizes="110vw"
          className="object-cover"
        />
      </div>

      {/* Untitled design (2) — node 1:310 at 48% */}
      <div className="absolute -top-[17.23%] -left-[1.48%] h-[117.3%] w-[101.5%] opacity-48">
        <Image
          src={HERO.background.layerTwo}
          alt=""
          fill
          sizes="105vw"
          className="object-cover"
        />
      </div>

      {/* Rectangle 109 — rgba(217,228,255,0.62) → rgba(240,245,255,0) */}
      <div className="absolute inset-0 bg-linear-to-b from-[rgba(217,228,255,0.62)] to-[rgba(240,245,255,0)]" />

      {/*
        Ellipse 5 (#5EACFF) and Ellipse 6 (#87C0FD). The gaussian blur lives
        inside each SVG, and both are stretched off their natural ratio, so
        they ride as background images rather than <Image>.
      */}
      <div
        className="absolute top-[26.6%] left-[21.54%] h-[90.24%] w-[81.77%] bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO.background.bloomOne})`,
          backgroundSize: "100% 100%",
        }}
      />
      <div
        className="absolute top-[13.05%] -left-[7.84%] h-[115%] w-[73.4%] bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO.background.bloomTwo})`,
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  );
}
