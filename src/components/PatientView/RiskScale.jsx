import React from "react";
import * as d3 from "d3";
import { Box, Typography } from "@mui/material";
import { calculateBorderline, calculateColor } from "../Utils/Calculator";
import { colorScale } from "../Utils/Calculator";

export default function RiskScale({
  adverseEvent,
  riskRange,
  isHighRisk,
  view,
}) {
  const isView1 = view === "view1";
  const isView2 = view === "view2";
  const isView3 = view === "view3";

  const lowRiskDomain = [0, riskRange[0]];
  const highRiskDomain = [
    [riskRange[0], riskRange[1]],
    [riskRange[1], riskRange[2]],
    [riskRange[2], riskRange[3]],
  ];
  const domain = isHighRisk ? highRiskDomain : lowRiskDomain;
  const mainWidth = 180;
  const height = 23;
  const svgHeight = 25;
  const extraWidth = 25;
  const padding = 2;
  const strokeColor = "black";
  const strokeWidth = 1.5;

  const xScale = d3
    .scaleLinear()
    .domain(isHighRisk ? [domain[0][0], domain[2][1]] : domain)
    .range([padding + extraWidth, padding + extraWidth + mainWidth]);

  const colors = colorScale.domain().map((domainValue) => {
    const colorArray = colorScale(domainValue);
    return colorArray[1];
  });

  const colorArray = calculateColor(adverseEvent.riskScore, riskRange);

  const lineColor = colorArray[3];

  const isUncertainLow =
    adverseEvent.confidenceInterval.low <=
    (isHighRisk ? domain[0][0] : domain[0]);
  const isUncertainHigh =
    adverseEvent.confidenceInterval.high >=
    (isHighRisk ? domain[2][1] : domain[1]);

  const totalExtraBoxes =
    isView3 && isUncertainHigh
      ? calculateBorderline(adverseEvent.confidenceInterval.high, riskRange)
          .length
      : 1;

  // Modify totalWidth calculation to account for extra boxes in view3
  const totalWidth = mainWidth + extraWidth * (1 + totalExtraBoxes); // Changed from extraWidth * 2
  const svgWidth = totalWidth + padding * 2;

  const renderBackgroundSegments = () => {
    if (isHighRisk) {
      return domain.map((range, index) => (
        <rect
          key={index}
          x={xScale(range[0])}
          y={(svgHeight - height) / 2}
          width={xScale(range[1]) - xScale(range[0])}
          height={height}
          fill={colors[index + 1]}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      ));
    }
    return (
      <rect
        x={padding + extraWidth}
        y={(svgHeight - height) / 2}
        width={mainWidth}
        height={height}
        fill={colors[0]}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    );
  };

  const renderUncertaintyEdges = () => {
    const highestColors = calculateColor(
      adverseEvent.confidenceInterval.high,
      riskRange
    );

    const borderlineColor = highestColors[1];

    const borderlineColors = calculateBorderline(
      adverseEvent.confidenceInterval.high,
      riskRange
    );

    return (
      <>
        {isUncertainLow && (
          <rect
            x={padding}
            y={(svgHeight - height) / 2}
            width={extraWidth}
            height={height}
            fill={isHighRisk ? colors[0] : colors[3]}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray="4 2"
          />
        )}
        {isView3
          ? isUncertainHigh &&
            borderlineColors.map((color, index) => (
              <rect
                key={index}
                x={padding + extraWidth + mainWidth + index * extraWidth} // Move each rectangle to the right
                y={(svgHeight - height) / 2}
                width={extraWidth}
                height={height}
                fill={color}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray="4 2"
              />
            ))
          : isUncertainHigh && (
              <rect
                x={padding + extraWidth + mainWidth}
                y={(svgHeight - height) / 2}
                width={extraWidth}
                height={height}
                fill={
                  isHighRisk ? colors[3] : isView1 ? colors[1] : borderlineColor
                }
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray="4 2"
              />
            )}
      </>
    );
  };

  const renderHorizontalLines = (bandStart, bandEnd) => {
    return (
      <>
        <line
          x1={bandStart}
          x2={bandEnd}
          y1={svgHeight / 2}
          y2={svgHeight / 2}
          stroke="black"
          strokeWidth={5}
        />
        <line
          x1={bandStart}
          x2={bandEnd}
          y1={svgHeight / 2}
          y2={svgHeight / 2}
          stroke={lineColor}
          strokeWidth={3}
        />
      </>
    );
  };

  const renderVerticalLines = (bandStart, bandEnd, verticalLineHeight) => {
    return (
      <>
        <line
          x1={bandStart}
          x2={bandStart}
          y1={svgHeight / 2 - verticalLineHeight / 2}
          y2={svgHeight / 2 + verticalLineHeight / 2}
          stroke="black"
          strokeWidth={1}
        />
        <line
          x1={bandEnd}
          x2={bandEnd}
          y1={svgHeight / 2 - verticalLineHeight / 2}
          y2={svgHeight / 2 + verticalLineHeight / 2}
          stroke="black"
          strokeWidth={1}
        />
      </>
    );
  };

  const renderUncertaintyBand = () => {
    const bandStart = isUncertainLow
      ? padding
      : xScale(adverseEvent.confidenceInterval.low);
    const bandEnd = isUncertainHigh
      ? svgWidth - padding
      : xScale(adverseEvent.confidenceInterval.high);
    const verticalLineHeight = 5;

    return (
      <>
        {renderUncertaintyEdges()}
        {renderHorizontalLines(bandStart, bandEnd)}
        {renderVerticalLines(bandStart, bandEnd, verticalLineHeight)}
      </>
    );
  };

  const getRiskScorePosition = () => {
    if (isHighRisk) {
      if (adverseEvent.riskScore < domain[0][0]) return padding + extraWidth;
      if (adverseEvent.riskScore > domain[2][1]) return padding + mainWidth;
    } else {
      if (adverseEvent.riskScore < domain[0]) return padding + extraWidth;
      if (adverseEvent.riskScore > domain[1])
        return padding + extraWidth + mainWidth;
    }
    return xScale(adverseEvent.riskScore);
  };

  return (
    <Box sx={{ mt: 0.8, display: "flex", gap: 2 }}>
      <svg width={svgWidth} height={svgHeight}>
        {renderBackgroundSegments()}
        {renderUncertaintyBand()}
        <circle
          cx={getRiskScorePosition()}
          cy={svgHeight / 2}
          r={5}
          fill="black"
        />
      </svg>
      <Typography
        fontWeight="bold"
        color="black"
        sx={{
          marginLeft: isHighRisk ? -2 : 1,
        }}
      >
        Risk: {Math.round(adverseEvent.riskScore * 100)}%
      </Typography>
    </Box>
  );
}
