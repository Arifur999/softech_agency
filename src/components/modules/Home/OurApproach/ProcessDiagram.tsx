import { Wand2 } from "lucide-react";

/**
 * The tangle → wand → ordered-flows illustration in the second approach card.
 * The scribble is generated from overlapping ellipses so it stays crisp at any
 * size, and the outgoing flows are drawn as rounded elbow paths.
 */
export function ProcessDiagram() {
  // Deterministic jitter so the loops overlap into a tangle rather than a ring.
  const scribble = Array.from({ length: 18 }, (_, i) => ({
    rx: 16 + ((i * 7) % 15),
    ry: 24 + ((i * 11) % 13),
    angle: (i * 143) % 180,
    cx: ((i * 5) % 11) - 5,
    cy: ((i * 3) % 9) - 4,
  }));

  const flows = [
    { y: 8, bend: 30 },
    { y: 24, bend: 34 },
    { y: 40, bend: 38 },
    { y: 56, bend: 38 },
    { y: 72, bend: 34 },
    { y: 88, bend: 30 },
  ];

  return (
    // The two panels flex and the connectors stay small, so the row can fall
    // below its natural ~322px. With shrink-0 on every child it could not, and
    // it forced the whole card to 404px inside a 390px viewport.
    <div className="flex items-center justify-between gap-1.5 sm:gap-2" aria-hidden>
      <svg
        viewBox="0 0 90 96"
        className="h-[72px] w-full max-w-[80px] min-w-0 flex-1 lg:h-[104px] lg:max-w-[96px]"
      >
        <g transform="translate(45 48)" fill="none" stroke="#8fb8f5" strokeWidth="0.7">
          {scribble.map(({ rx, ry, angle, cx, cy }, i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${angle})`} />
          ))}
        </g>
      </svg>

      <svg viewBox="0 0 40 8" className="h-2 w-3 shrink-0 sm:w-6">
        <line
          x1="0"
          y1="4"
          x2="40"
          y2="4"
          stroke="#8fb8f5"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
      </svg>

      <span className="inline-flex size-[42px] shrink-0 items-center justify-center rounded-[14px] bg-[#eaf2fe] sm:size-[52px] lg:size-[62px]">
        <Wand2 className="size-6 text-brand-600 lg:size-7" />
      </span>

      <svg viewBox="0 0 40 8" className="h-2 w-3 shrink-0 sm:w-6">
        <line
          x1="0"
          y1="4"
          x2="40"
          y2="4"
          stroke="#8fb8f5"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
      </svg>

      <svg
        viewBox="0 0 120 96"
        className="h-[72px] w-full max-w-[110px] min-w-0 flex-1 lg:h-[104px] lg:max-w-[130px]"
      >
        <g fill="none" stroke="#8fb8f5" strokeWidth="1.1" strokeLinecap="round">
          {flows.map(({ y, bend }, i) => (
            <path
              key={i}
              d={`M0 48 H${bend} Q${bend + 10} 48 ${bend + 10} ${y < 48 ? y + 8 : y - 8} V${y} Q${bend + 10} ${y} ${bend + 20} ${y} H108`}
            />
          ))}
          {flows.map(({ y }, i) => (
            <path key={`a${i}`} d={`M104 ${y - 3} L110 ${y} L104 ${y + 3}`} />
          ))}
        </g>
      </svg>
    </div>
  );
}
