import React from "react";
import * as d3 from "d3";
import { Box, Typography } from "@mui/material";
import { calculateColor } from "../Utils/Calculator";

export default function RiskScaleHigh({ adverseEvent }) {
  const width = 160; // Total width of the bar
  const height = 24; // Height of the bar
  const domain = [0.4, 1];
  const xScale = d3.scaleLinear().domain(domain).range([0, width]);

  // Colors for each segment
  const colors = ["#cbfbf1", "#fff7c9", "#f7d1aa", "#fab5a8"];
  const [textColor, color] = calculateColor(adverseEvent.riskScore);

  // Check if the uncertainty band extends below the domain minimum
  const isUncertain = adverseEvent.uncertaintyBand.low < domain[0];

  // Calculate extra width needed for the uncertainty band if it extends below the domain minimum
  const extraWidth = isUncertain
    ? ((domain[0] - adverseEvent.uncertaintyBand.low) * width) /
      (domain[1] - domain[0])
    : 0;

  // Increase SVG width to accommodate the extraWidth on the right side
  const svgWidth = width + extraWidth + 20; // Extra padding for space

  // Calculate segment width
  const segmentWidth = width / 3;

  return (
    <Box sx={{ mt: 0.8, display: "flex" }}>
      <svg width={svgWidth} height={height + 20}>
        {/* Background Segments */}
        <rect
          x={extraWidth} // Start of the first segment is adjusted by extraWidth
          y={0}
          width={segmentWidth}
          height={height}
          fill={colors[1]}
          stroke="black"
          strokeWidth="3"
        />
        <rect
          x={extraWidth + segmentWidth}
          y={0}
          width={segmentWidth}
          height={height}
          fill={colors[2]}
          stroke="black"
          strokeWidth="3"
        />
        <rect
          x={extraWidth + 2 * segmentWidth}
          y={0}
          width={segmentWidth}
          height={height}
          fill={colors[3]}
          stroke="black"
          strokeWidth="3"
        />

        {/* Uncertainty Band */}
        {isUncertain && (
          <rect
            x={0} // Start of the uncertainty band
            y={0}
            width={extraWidth} // Position and width for the uncertainty band
            height={height}
            fill={colors[0]}
            stroke="black"
            strokeWidth="3" // Outline thickness
            strokeDasharray="4 2" // Dashed outline
          />
        )}

        {/* Uncertainty Band Line */}
        <line
          x1={xScale(adverseEvent.uncertaintyBand.low) + extraWidth}
          x2={xScale(adverseEvent.uncertaintyBand.high) + extraWidth}
          y1={height / 2}
          y2={height / 2}
          stroke={color}
          strokeWidth={4}
        />

        {/* Risk Score Dot */}
        <circle
          cx={xScale(adverseEvent.riskScore) + extraWidth}
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
