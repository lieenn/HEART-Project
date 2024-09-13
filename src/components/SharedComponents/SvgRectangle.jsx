import React from "react";
import { Box } from "@mui/material";
import {
  calculateColor,
  borderLineColor,
  calculateRisk,
} from "../Utils/Calculator";

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
  // const [textColor, color] = ["black", "blue"];
  // const gradient = "green";

  const isLowRisk =
    risk.riskScore < riskRange[0] &&
    calculateRisk(risk.confidenceInterval.high, riskRange) !== "Minimal";
  const isModerateRisk =
    risk.riskScore >= riskRange[0] &&
    risk.riskScore < riskRange[1] &&
    calculateRisk(risk.confidenceInterval.low, riskRange) === "Minimal";
  const smallBoxWidth = 12;

  const totalWidth =
    isLowRisk || isModerateRisk ? width + smallBoxWidth : width;
  const mainRectWidth = isLowRisk
    ? width
    : isModerateRisk
    ? width + smallBoxWidth
    : totalWidth;

  const getGradientId = () => {
    if (isLowRisk) {
      return "gradientLowRisk";
    } else if (isModerateRisk) {
      return "gradientModerateRisk";
    }
    return "";
  };

  const xPosition = mainRectWidth / 2;

  const renderRectangle = (additionalProps = {}) => (
    <rect
      x={0}
      y={0}
      width={mainRectWidth}
      height={height}
      fill={isLowRisk || isModerateRisk ? `url(#${getGradientId()})` : color}
      {...additionalProps}
    />
  );

  const renderSvgContent = () => (
    <>
      {renderRectangle()}
      {isLowRisk && (
        <rect
          x={width}
          y={0}
          width={smallBoxWidth}
          height={height}
          fill={gradient}
        />
      )}
      {isModerateRisk && (
        <rect
          x={0}
          y={0}
          width={smallBoxWidth}
          height={height}
          fill={gradient}
        />
      )}
      <text
        x={xPosition + (isModerateRisk ? smallBoxWidth / 2 : 0)}
        y={height / 2}
        dominantBaseline="central"
        textAnchor={textAnchor}
        fontSize="16"
        fontFamily="sans-serif"
        fontWeight="800"
        fill={textColor}
      >
        {text}
      </text>
      {children}
    </>
  );

  return (
    <>
      <svg
        width={totalWidth}
        height={height}
        viewBox={`0 0 ${totalWidth} ${height}`}
        style={{ display: "block" }}
      >
        <defs>
          {isLowRisk && (
            <linearGradient
              id="gradientLowRisk"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="80%" stopColor={color} />
              <stop offset="100%" stopColor={gradient} />
            </linearGradient>
          )}
          {isModerateRisk && (
            <linearGradient
              id="gradientModerateRisk"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              <stop offset="80%" stopColor={color} />
              <stop offset="90%" stopColor={gradient} />
            </linearGradient>
          )}
        </defs>
        {renderSvgContent()}
      </svg>
    </>
  );
}
