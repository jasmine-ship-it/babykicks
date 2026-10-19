import * as d3 from "d3";
import React, { useContext, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { ProfileContext } from "../contexts/profile.context";

const HOURS = d3.range(24);
const BAR_COLOR = "#0091BB";
const GRID_COLOR = "#CFDDE5";

// Each bar is drawn 15 minutes wide, centred on the session's start time
const BAR_ANGLE = (2 * Math.PI) / (24 * 4);

const formatTime = d3.timeFormat("%H:%M");

// Radial bar chart of today's saved kick sessions, one bar per session
const RadialPlot = ({ width = 400 }) => {
  const height = width;
  const innerRadius = 60;
  const outerRadius = width / 2 - 30;

  const theme = useTheme();
  const { currentProfile } = useContext(ProfileContext);
  const history = currentProfile.history;

  // Keep only today's sessions, one data point per saved session
  const data = useMemo(() => {
    const today = new Date().toDateString();
    return (history ?? [])
      .filter(
        (entry) =>
          entry.startTime && new Date(entry.startTime).toDateString() === today
      )
      .map((entry) => {
        const start = new Date(entry.startTime);
        return {
          start,
          hours:
            start.getHours() + start.getMinutes() / 60 + start.getSeconds() / 3600,
          kicks: entry.strength,
        };
      });
  }, [history]);

  const totalKicks = d3.sum(data, (d) => d.kicks);

  // Scales: angle = time of day, radius = number of kicks
  const x = useMemo(
    () => d3.scaleLinear().domain([0, 24]).range([0, 2 * Math.PI]),
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
    .startAngle((d) => x(d.hours) - BAR_ANGLE / 2)
    .endAngle((d) => x(d.hours) + BAR_ANGLE / 2);

  // d3 angles start at 12 o'clock and go clockwise
  const pointAt = (angle, radius) => [
    Math.sin(angle) * radius,
    -Math.cos(angle) * radius,
  ];

  if (totalKicks === 0) {
    return (
      <Typography paragraph align="center">
        No kicks recorded today yet.
      </Typography>
    );
  }

  return (
    <svg
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      // Fill the available width, but never taller than most of the screen
      style={{
        display: "block",
        margin: "0 auto",
        width: "100%",
        maxWidth: "min(100%, 80vh)",
        height: "auto",
        // SVG text doesn't inherit the MUI theme, so match the page text
        fontFamily: theme.typography.fontFamily,
        fill: theme.palette.text.primary,
      }}
      role="img"
      aria-label="Today's saved baby kick sessions by time of day"
    >
      {/* Grid rings */}
      {y.ticks(4).map((tick) => (
        <g key={tick}>
          <circle r={y(tick)} fill="none" stroke={GRID_COLOR} />
          <text
            y={-y(tick)}
            dy="-0.3em"
            textAnchor="middle"
            fontSize={10}
            fill={theme.palette.text.secondary}
          >
            {tick}
          </text>
        </g>
      ))}

      {/* Bars */}
      {data.map((d, i) => (
        <path key={i} d={arc(d)} fill={BAR_COLOR} fillOpacity={0.85}>
          <title>{`${formatTime(d.start)} – ${d.kicks} kicks`}</title>
        </path>
      ))}

      {/* Outer ring with a tick mark and label for every hour */}
      <circle r={outerRadius} fill="none" stroke={GRID_COLOR} />
      {HOURS.map((hour) => {
        const angle = x(hour);
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
              fill={theme.palette.text.secondary}
            >
              {`${String(hour).padStart(2, "0")}:00`}
            </text>
          </g>
        );
      })}

      {/* Total in the centre */}
      <text textAnchor="middle" dy="-0.2em" fontSize={26}>
        {totalKicks}
      </text>
      <text
        textAnchor="middle"
        dy="1.6em"
        fontSize={11}
        fill={theme.palette.text.secondary}
      >
        kicks today
      </text>
    </svg>
  );
};

export default RadialPlot;
