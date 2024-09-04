import React from "react";
import * as d3 from "d3";
import { Box, Typography } from "@mui/material";
import { calculateColor } from "../Utils/Calculator";
import { colorScale } from "../Utils/Calculator";

/**
 * Reusable component to visualize the risk scale for an adverse event.
 *
 * Includes a segmented background, an uncertainty band, and a risk score dot.
 * Adjusts the width of the SVG based on uncertainty band positions.
 *
 * @param {Object} adverseEvent - The adverse event data, including riskScore and uncertaintyBand.
 * @param {Array} domain - The domain for the x-axis scale.
 * @param {boolean} isHighRisk - Indicates if the scale is for a high-risk event.
 * @param {Array} riskRange - The range for risk calculation.
 * @returns {JSX.Element} - The rendered risk scale visualization.
 */
export default function RiskScale({
  adverseEvent,
  domain,
  isHighRisk,
  riskRange,
}) {
  const width = 180;
  const height = 23;
  const svgHeight = 25;
  const extraWidth = 25;
  const svgWidth = width + extraWidth + 2; // +2 for stroke width
  const strokeColor = "black";
  const strokeWidth = 1.5;

  const xScale = d3.scaleLinear().domain(domain).range([0, width]);

  const colors = colorScale.domain().map((domainValue) => {
    const colorArray = colorScale(domainValue);
    return colorArray[2]; // Get the tertiary color (third in the array)
  });

  const [textColor, color] = calculateColor(adverseEvent.riskScore, riskRange);

  const isUncertainLow = adverseEvent.uncertaintyBand.low < domain[0];
  const isUncertainHigh = adverseEvent.uncertaintyBand.high >= domain[1];

  const renderBackgroundSegments = () => {
    if (isHighRisk) {
      return [1, 2, 3].map((index) => (
        <rect
          key={index}
          x={extraWidth + ((index - 1) * width) / 3 + 1}
          y={(svgHeight - height) / 2}
          width={width / 3}
          height={height}
          fill={colors[index]}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      ));
    }
    return (
      <rect
        x={1}
        y={(svgHeight - height) / 2}
        width={width}
        height={height}
        fill={colors[0]}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    );
  };

  const renderUncertaintyBand = () => (
    <>
      {isUncertainLow && (
        <rect
          x={1}
          y={(svgHeight - height) / 2}
          width={extraWidth}
          height={height}
          fill={colors[0]}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray="4 2"
        />
      )}
      {isUncertainHigh && (
        <rect
          x={width + 1}
          y={(svgHeight - height) / 2}
          width={extraWidth}
          height={height}
          fill={colors[isHighRisk ? 3 : 1]}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray="4 2"
        />
      )}
      <line
        x1={
          isUncertainLow && isHighRisk
            ? xScale(adverseEvent.uncertaintyBand.low)
            : xScale(adverseEvent.uncertaintyBand.low) + extraWidth
        }
        x2={
          isUncertainHigh && isHighRisk
            ? xScale(adverseEvent.uncertaintyBand.high)
            : xScale(adverseEvent.uncertaintyBand.high) + extraWidth
        }
        y1={svgHeight / 2}
        y2={svgHeight / 2}
        stroke={color}
        strokeWidth={4}
      />
    </>
  );

  return (
    <Box sx={{ mt: 0.8, display: "flex", gap: 2 }}>
      <svg width={svgWidth} height={svgHeight}>
        {renderBackgroundSegments()}
        {renderUncertaintyBand()}
        <circle
          cx={
            isUncertainHigh && isHighRisk
              ? xScale(adverseEvent.riskScore)
              : xScale(adverseEvent.riskScore) + extraWidth
          }
          cy={svgHeight / 2}
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
