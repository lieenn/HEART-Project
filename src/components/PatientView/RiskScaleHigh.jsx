import React from "react";
import * as d3 from "d3";
import { Box, Typography } from "@mui/material";
import { calculateColor } from "../Utils/Calculator";
import { riskRange } from "../../App";
import { colorScale } from "../Utils/Calculator";

/**
 * Visualizes the risk scale for a high-risk adverse event.
 *
 * Includes a segmented background, an uncertainty band, and a risk score dot.
 * Adjusts the width of the SVG if the uncertainty band
 * extends below the domain minimum.
 *
 * @param {Object} param0 - The adverse event data including riskScore and uncertaintyBand.
 * @returns {JSX.Element} - The rendered risk scale visualization.
 */
export default function RiskScaleHigh({ adverseEvent }) {
  const width = 160;
  const height = 24;
  const domain = [riskRange[0], riskRange[3]];
  const xScale = d3.scaleLinear().domain(domain).range([0, width]);

  const colors = colorScale.domain().map((domainValue) => {
    const colorArray = colorScale(domainValue);
    return colorArray[2]; // Get the tertiary color (third in the array)
  });

  const [textColor, color] = calculateColor(adverseEvent.riskScore);
  const isUncertain = adverseEvent.uncertaintyBand.low < domain[0];
  const extraWidth = isUncertain ? 25 : 0;
  const svgWidth = width + extraWidth;
  const segmentWidth = width / 3;

  return (
    <Box sx={{ mt: 0.8, display: "flex", gap: 2 }}>
      <svg width={svgWidth} height={height + 20}>
        {/* Background Segments */}
        <rect
          x={extraWidth}
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
            x={0}
            y={0}
            width={extraWidth}
            height={height}
            fill={colors[0]}
            stroke="black"
            strokeWidth="3"
            strokeDasharray="4 2"
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
