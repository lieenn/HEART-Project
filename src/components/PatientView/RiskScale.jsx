import React from "react";
import * as d3 from "d3";
import { Box, Typography } from "@mui/material";
import { calculateColor } from "../Utils/Calculator";
import { riskRange } from "../../App";
import { colorScale } from "../Utils/Calculator";

/**
 * Reusable component to visualize the risk scale for an adverse event.
 *
 * Includes a segmented background, an uncertainty band, and a risk score dot.
 * Adjusts the width of the SVG based on uncertainty band positions.
 *
 * @param {Object} param0 - The adverse event data, including riskScore and uncertaintyBand.
 * @param {Array} domain - The domain for the x-axis scale.
 * @param {boolean} isHighRisk - Indicates if the scale is for a high-risk event.
 * @returns {JSX.Element} - The rendered risk scale visualization.
 */
export default function RiskScale({
  adverseEvent,
  domain,
  isHighRisk,
  riskRange,
}) {
  const width = 180;
  const height = 24;
  const xScale = d3.scaleLinear().domain(domain).range([0, width]);

  const colors = colorScale.domain().map((domainValue) => {
    const colorArray = colorScale(domainValue);
    return colorArray[2]; // Get the tertiary color (third in the array)
  });

  const [textColor, color] = calculateColor(adverseEvent.riskScore, riskRange);

  const isUncertainLow = adverseEvent.uncertaintyBand.low < domain[0];
  const isUncertainHigh = adverseEvent.uncertaintyBand.high > domain[1];

  const extraWidthLow = isUncertainLow ? 25 : 0;
  const extraWidthHigh = isUncertainHigh ? 25 : 0;
  const svgWidth = width + extraWidthLow + extraWidthHigh;
  const strokeColor = "black";
  const strokeWidth = 1.5;

  return (
    <Box sx={{ mt: 0.8, display: "flex", gap: 2 }}>
      <svg width={svgWidth} height={height + 20}>
        {/* Background Segments */}
        {isHighRisk ? (
          <>
            <rect
              x={extraWidthLow}
              y={0}
              width={width / 3}
              height={height}
              fill={colors[1]}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <rect
              x={extraWidthLow + width / 3}
              y={0}
              width={width / 3}
              height={height}
              fill={colors[2]}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <rect
              x={extraWidthLow + (2 * width) / 3}
              y={0}
              width={width / 3}
              height={height}
              fill={colors[3]}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </>
        ) : (
          <rect
            x={extraWidthLow}
            y={0}
            width={width}
            height={height}
            fill={colors[0]}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        )}

        {/* Uncertainty Band */}
        {isUncertainLow && (
          <rect
            x={0}
            y={0}
            width={extraWidthLow}
            height={height}
            fill={colors[0]}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray="4 2"
          />
        )}

        {isUncertainHigh && (
          <rect
            x={extraWidthLow + width}
            y={0}
            width={extraWidthHigh}
            height={height}
            fill={colors[isHighRisk ? 3 : 1]}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray="4 2"
          />
        )}

        {/* Uncertainty Band Line */}
        <line
          x1={xScale(adverseEvent.uncertaintyBand.low) + extraWidthLow}
          x2={xScale(adverseEvent.uncertaintyBand.high) + extraWidthLow}
          y1={height / 2}
          y2={height / 2}
          stroke={color}
          strokeWidth={4}
        />

        {/* Risk Score Dot */}
        <circle
          cx={xScale(adverseEvent.riskScore) + extraWidthLow}
          cy={height / 2}
          r={5}
          fill="black"
        />
      </svg>
      <Typography fontWeight="bold" color="black">
        Risk: {Math.round(adverseEvent.riskScore * 100)}%
      </Typography>
    </Box>
  );
}
