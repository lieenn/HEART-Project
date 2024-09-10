import React from "react";
import { Box } from "@mui/material";
import {
  calculateColor,
  borderLineColor,
  calculateRisk,
} from "./Utils/Calculator";

/**
 * @typedef {Object} Risk
 * @property {number} riskScore - The risk score
 * @property {Object} confidenceInterval - The confidence interval object
 * @property {number} confidenceInterval.low - The lower bound of the confidence interval
 * @property {number} confidenceInterval.high - The upper bound of the confidence interval
 */

/**
 * @typedef {Object} SvgRectangleProps
 * @property {Risk} risk - The risk object containing the risk score
 * @property {number[]} riskRange - The range of risk scores
 * @property {number} width - Width of the rectangle
 * @property {number} height - Height of the rectangle
 * @property {string} text - Text to display in the rectangle
 * @property {"start" | "middle" | "end"} [textAnchor="middle"] - Text alignment
 * @property {React.ReactNode} [children] - Optional child elements
 */

/**
 * SvgRectangle Component
 * @param {SvgRectangleProps} props
 */
export default function SvgRectangle({
  risk,
  riskRange,
  width,
  height,
  text,
  textAnchor = "middle",
  children,
}) {
  const [textColor, color] = calculateColor(risk.riskScore, riskRange);
  const gradient = borderLineColor(risk.riskScore, riskRange);

  const xPosition =
    textAnchor === "start" ? 10 : textAnchor === "end" ? width - 10 : width / 2;

  const isLowRisk =
    risk.riskScore < riskRange[0] &&
    calculateRisk(risk.confidenceInterval.high, riskRange) !== "Minimal";
  const isModerateRisk =
    risk.riskScore >= riskRange[0] &&
    risk.riskScore < riskRange[1] &&
    calculateRisk(risk.confidenceInterval.low, riskRange) === "Minimal";
  const smallBoxWidth = 25;

  const totalWidth =
    isLowRisk || isModerateRisk ? width + smallBoxWidth : width;
  const mainRectWidth = isLowRisk
    ? width
    : isModerateRisk
      ? width + smallBoxWidth
      : totalWidth;

  const getBackground = () => {
    if (isLowRisk) {
      return `linear-gradient(90deg, ${color} 80%, ${gradient} 100%)`;
    } else if (isModerateRisk) {
      return `linear-gradient(90deg, ${gradient} 0%, ${color} 20%)`;
    } else {
      return color;
    }
  };

  const strokeWidth = 2;
  const svgPadding = strokeWidth;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          mb: 1,
          mr: 2,
          position: "relative",
          borderRadius: "3px",
          overflow: "hidden",
          width: `${width}px`,
          height: `${height}px`,
          boxShadow: 1,
          background: getBackground(),
        }}
      >
        <svg width={width} height={height}>
          <text
            x={xPosition}
            y="55%"
            dominantBaseline="middle"
            textAnchor={textAnchor}
            fontSize="16"
            fontFamily="sans-serif"
            fontWeight="800"
            fill={textColor}
          >
            {text}
          </text>
          {children}
        </svg>
      </Box>
      {
        (isLowRisk || isModerateRisk) && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                mb: 1,
                mr: 2,
                position: "relative",
                borderRadius: "3px",
                overflow: "hidden",
                width: `${totalWidth}px`,
                height: `${height}px`,
                boxShadow: 1,
                background: getBackground(),
              }}
            >
              <svg width={totalWidth} height={height}>
                <text
                  x={xPosition}
                  y="55%"
                  dominantBaseline="middle"
                  textAnchor={textAnchor}
                  fontSize="16"
                  fontFamily="Roboto"
                  fontWeight="500"
                  fill={textColor}
                >
                  {text}
                </text>
                {children}
              </svg>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                mb: 1,
                mr: 2,
                position: "relative",
                borderRadius: "3px",
                overflow: "hidden",
                width: `${totalWidth}px`,
                height: `${height}px`,
                boxShadow: 1,
              }}
            >
              <svg width={totalWidth} height={height}>
                {/* Main rectangle */}
                <rect
                  x={isModerateRisk ? smallBoxWidth : 0}
                  width={mainRectWidth}
                  height={height}
                  fill={color}
                  rx="3"
                  ry="3"
                />
                {/* Small box for low or moderate risk */}
                <rect
                  x={isLowRisk ? width : 0}
                  y={0}
                  width={smallBoxWidth}
                  height={height}
                  fill={gradient}
                  stroke="black" // Add a stroke with the same color as the main rectangle
                  strokeWidth="2" // Set the width of the stroke
                  strokeDasharray="5,5" // Create a dashed effect: 5px dash, 5px gap
                />

                {/* Text */}
                <text
                  x={xPosition + (isModerateRisk ? smallBoxWidth : 0)}
                  y="55%"
                  dominantBaseline="middle"
                  textAnchor={textAnchor}
                  fontSize="16"
                  fontFamily="Roboto"
                  fontWeight="500"
                  fill={textColor}
                >
                  {text}
                </text>
                {children}
              </svg>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                mb: 1,
                mr: 2,
                position: "relative",
                borderRadius: "3px",
                overflow: "hidden",
                width: `${width}px`,
                height: `${height}px`,
                boxShadow: 1,
              }}
            >
              <svg width={width} height={height}>
                {/* Main rectangle */}
                <rect width={width} height={height} fill={color} rx="3" ry="3" />

                {/* Small box for low or moderate risk */}
                <rect
                  x={isLowRisk ? width - smallBoxWidth : 0}
                  y={0}
                  width={smallBoxWidth}
                  height={height}
                  fill={gradient}
                />

                {/* Text */}
                <text
                  x={xPosition}
                  y="55%"
                  dominantBaseline="middle"
                  textAnchor={textAnchor}
                  fontSize="16"
                  fontFamily="Roboto"
                  fontWeight="500"
                  fill={textColor}
                >
                  {text}
                </text>
                {children}
              </svg>
            </Box>
          </>
        )
      }
    </Box >
  );
}
