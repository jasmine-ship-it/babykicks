import * as d3 from "d3";
import { useRef, useEffect, useContext } from "react";
import { ProfileContext } from "../contexts/profile.context";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

export default function LinePlot({
  // Declare the chart dimensions and margins
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}) {
  const { fetchProfileData } = useGoogleAuth();
  const { currentProfile } = useContext(ProfileContext);

  useEffect(() => {
    const data = async () => {
      await fetchProfileData();
    };
    data();
  }, [currentProfile, fetchProfileData]);

  const historyLength = currentProfile.history.length;

  function createTimeValues(currentProfile) {
    let newArray = [];
    for (let i = 0; i < historyLength; i++) {
      newArray.push(currentProfile.history[i].time);
    }
    return newArray;
  }

  const timeAxis = createTimeValues(currentProfile);

  function createCountValues(currentProfile) {
    let newArray = [];
    for (let i = 0; i < historyLength; i++) {
      newArray.push(currentProfile.history[i].count);
    }
    return newArray;
  }
  const countAxis = createCountValues(currentProfile);

  const gx = useRef();
  const gy = useRef();

  const dataX = timeAxis;
  const dataY = countAxis;

  // Declare the x (horizontal position) scale.
  const x = d3
    .scaleUtc()
    .domain([new Date(dataX[0]), new Date(dataX[dataX.length - 1])])
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear(d3.extent(dataY), [
    height - marginBottom,
    marginTop,
  ]);

  const line = d3
    .line()
    .x((d, i) => x(dataX[i]))
    .y((d, i) => y(dataY[i]));

  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

  return (
    // Create the SVG container.
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(dataY)}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {/* Create data points on graph */}
        {dataX.map((d, i) => (
          <circle key={i} cx={x(new Date(dataX[i]))} cy={y(dataY[i])} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
