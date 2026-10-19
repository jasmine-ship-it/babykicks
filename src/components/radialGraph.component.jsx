import * as d3 from "d3";
import React, { useContext, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { ProfileContext } from "../contexts/profile.context";

const HOURS = d3.range(24);
const BAR_COLOR = "#0091BB";
const GRID_COLOR = "#CFDDE5";

// Radial bar chart of today's kicks per hour, one bar per hour
const RadialPlot = ({ width = 400 }) => {
  const height = width;
  const innerRadius = 60;
  const outerRadius = width / 2 - 30;

  const { currentProfile } = useContext(ProfileContext);
  const history = currentProfile.history;

  // Sum the kick counts of today's sessions, grouped by the hour each started
  const data = useMemo(() => {
    const today = new Date().toDateString();
    const totals = d3.rollup(
      (history ?? []).filter(
        (entry) =>
          entry.startTime && new Date(entry.startTime).toDateString() === today
      ),
      (entries) => d3.sum(entries, (entry) => entry.strength),
      (entry) => new Date(entry.startTime).getHours()
    );
    return HOURS.map((hour) => ({ hour, kicks: totals.get(hour) ?? 0 }));
  }, [history]);

  const totalKicks = d3.sum(data, (d) => d.kicks);

  // Scales: angle = hour of day, radius = number of kicks
  const x = useMemo(
    () => d3.scaleBand().domain(HOURS).range([0, 2 * Math.PI]).align(0),
    []
  );

  const y = useMemo(
    () =>
      d3
        .scaleRadial()
        .domain([0, d3.max(data, (d) => d.kicks) || 1])
        .range([innerRadius, outerRadius]),
    [data, outerRadius]
  );

  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius((d) => y(d.kicks))
    .startAngle((d) => x(d.hour))
    .endAngle((d) => x(d.hour) + x.bandwidth())
    .padAngle(0.02)
    .padRadius(innerRadius);

  // d3 angles start at 12 o'clock and go clockwise
  const pointAt = (angle, radius) => [
    Math.sin(angle) * radius,
    -Math.cos(angle) * radius,
  ];

  if (totalKicks === 0) {
    return <Typography paragraph>No kicks recorded today yet.</Typography>;
  }

  return (
    <svg
      width="100%"
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      style={{ maxWidth: width, height: "auto" }}
      role="img"
      aria-label="Today's baby kicks by hour of the day"
    >
      {/* Grid rings */}
      {y.ticks(4).map((tick) => (
        <g key={tick}>
          <circle r={y(tick)} fill="none" stroke={GRID_COLOR} />
          <text y={-y(tick)} dy="-0.3em" textAnchor="middle" fontSize={10}>
            {tick}
          </text>
        </g>
      ))}

      {/* Bars */}
      {data.map((d) => (
        <path key={d.hour} d={arc(d)} fill={BAR_COLOR}>
          <title>{`${String(d.hour).padStart(2, "0")}:00 – ${d.kicks} kicks`}</title>
        </path>
      ))}

      {/* Outer ring with a tick mark and label for every hour */}
      <circle r={outerRadius} fill="none" stroke={GRID_COLOR} />
      {HOURS.map((hour) => {
        const angle = x(hour) + x.bandwidth() / 2;
        const [t1x, t1y] = pointAt(angle, outerRadius);
        const [t2x, t2y] = pointAt(angle, outerRadius + 5);
        const [lx, ly] = pointAt(angle, outerRadius + 17);
        return (
          <g key={hour}>
            <line x1={t1x} y1={t1y} x2={t2x} y2={t2y} stroke={GRID_COLOR} />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={9}
            >
              {`${String(hour).padStart(2, "0")}:00`}
            </text>
          </g>
        );
      })}

      {/* Total in the centre */}
      <text textAnchor="middle" dy="-0.2em" fontSize={22} fontWeight="bold">
        {totalKicks}
      </text>
      <text textAnchor="middle" dy="1.4em" fontSize={11}>
        kicks today
      </text>
    </svg>
  );
};

export default RadialPlot;
