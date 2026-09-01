import { ImageResponse } from "next/og";

import { SITE } from "@/data/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card shown when the site is shared on social or in chat. Drawn here
 * rather than exported from Figma so it stays in sync with the copy, and it
 * never touches the page itself.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundImage:
            "linear-gradient(150deg, #eaf2fe 0%, #ffffff 45%, #dbe8fe 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            letterSpacing: 1,
            color: "#0b72f1",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#0b72f1",
            }}
          />
          SOFTWARE BUILT FOR LOCAL BUSINESSES
        </div>

        <div
          style={{
            marginTop: 28,
            display: "flex",
            flexWrap: "wrap",
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#161616",
            maxWidth: 960,
          }}
        >
          We build software that fits the way your&nbsp;
          <span style={{ color: "#1276f1", fontWeight: 400 }}>business works.</span>
        </div>

        <div
          style={{
            marginTop: 32,
            fontSize: 28,
            color: "#323232",
            maxWidth: 860,
          }}
        >
          Industry-focused SaaS products + custom software
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            fontWeight: 700,
            color: "#161616",
          }}
        >
          softech.agency
        </div>
      </div>
    ),
    size,
  );
}
