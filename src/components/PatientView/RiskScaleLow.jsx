import React from "react";
import * as d3 from "d3";
import { Box, Typography } from "@mui/material";
import { calculateColor } from "../Utils/Calculator";

export default function RiskScaleLow({ adverseEvent }) {
  const width = 160;
  const height = 24;
  const domain = [0, 0.4];
  const xScale = d3.scaleLinear().domain(domain).range([0, width]);

  // Colors for each segment (3 segments)
  const colors = ["#cbfbf1", "#fff7c9"];
  const [textColor, color] = calculateColor(adverseEvent.riskScore);
  const isUncertain = adverseEvent.uncertaintyBand.high > domain[1];
  const extraWidth = isUncertain
    ? (adverseEvent.uncertaintyBand.high - domain[1]) * 400
    : 0;

  return (
    <Box sx={{ mt: 0.8, display: "flex" }}>
      <svg width={width + extraWidth + 20} height={height + 20}>
        {/* Background Segments */}
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={colors[0]}
          stroke="black"
          strokeWidth="3" // Outline thickness
        />
        {isUncertain && (
          <rect
            x={width}
            y={0}
            width={extraWidth}
            height={height}
            fill={colors[1]}
            stroke="black"
            strokeDasharray="4 2" // Dash pattern: 4px dash, 2px gap
            strokeWidth="3" // Outline thickness
          />
        )}

        {/* Uncertainty Band */}
        <line
          x1={xScale(adverseEvent.uncertaintyBand.low)}
          x2={xScale(adverseEvent.uncertaintyBand.high)}
          y1={height / 2}
          y2={height / 2}
          stroke={color}
          strokeWidth={4}
        />

        {/* Risk Score Dot */}
        <circle
          cx={xScale(adverseEvent.riskScore)}
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
