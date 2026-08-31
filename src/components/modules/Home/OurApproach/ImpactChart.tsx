import { PanelHeader } from "@/components/modules/Home/OurApproach/PanelHeader";
import { APPROACH_REAL_LIFE } from "@/data/home/ourApproach";

const VIEW = { width: 320, height: 190, padX: 6 };

/** The "Real Impact" line chart inside the third approach card. */
export function ImpactChart() {
  const { panelTitle, chart } = APPROACH_REAL_LIFE;
  const { max, ticks, months, series } = chart;

  const toX = (index: number, count: number) =>
    VIEW.padX + (index * (VIEW.width - VIEW.padX * 2)) / (count - 1);
  const toY = (value: number) => VIEW.height - (value / max) * VIEW.height;

  return (
    <div className="flex flex-col gap-4 rounded-[16px] border border-[#ececf0] bg-[#fefefe] p-4 lg:p-5">
      <PanelHeader title={panelTitle} />

      <div className="flex gap-2">
        <div className="flex flex-col justify-between py-px text-[11px] text-ink-500 lg:text-[12px]">
          {ticks.map((tick) => (
            <span key={tick}>{tick === 0 ? "0" : `${tick}K`}</span>
          ))}
        </div>

        <div className="relative flex-1">
          <svg
            viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
            className="w-full"
            role="img"
            aria-label="Business growth and operational efficiency trending upward from January to June"
          >
            {ticks.map((tick) => (
              <line
                key={tick}
                x1="0"
                x2={VIEW.width}
                y1={toY(tick)}
                y2={toY(tick)}
                stroke="#f0f0f4"
                strokeWidth="1"
              />
            ))}

            {series.map(({ name, color, points }) => (
              <g key={name}>
                <polyline
                  fill="none"
                  stroke={color}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points
                    .map((value, index) => `${toX(index, points.length)},${toY(value)}`)
                    .join(" ")}
                />
                {points.map((value, index) => (
                  <circle
                    key={index}
                    cx={toX(index, points.length)}
                    cy={toY(value)}
                    r="3.2"
                    fill={color}
                  />
                ))}
              </g>
            ))}
          </svg>

          {series.map(({ name, color, badge, points }) => (
            <span
              key={name}
              className="absolute -translate-y-1/2 rounded-[8px] px-2 py-1 text-[11px] font-semibold text-white lg:text-[12px]"
              style={{
                backgroundColor: color,
                right: 0,
                top: `${(toY(points[points.length - 1]) / VIEW.height) * 100 - 12}%`,
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between pl-8 text-[11px] text-ink-500 lg:text-[12px]">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {series.map(({ name, color }) => (
          <span key={name} className="inline-flex items-center gap-2 text-[12px] text-ink-900 lg:text-[13px]">
            <span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
