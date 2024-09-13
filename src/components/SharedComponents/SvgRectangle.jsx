import React from "react";
import { Box } from "@mui/material";
import {
  calculateColor,
  borderLineColor,
  calculateRisk,
} from "../Utils/Calculator";

const SvgRectangle = ({
  risk,
  riskRange,
  width,
  height,
  text,
  textAnchor = "middle",
  isPatientSpecific = false,
  children,
}) => {
  const [textColor, color] = calculateColor(risk.riskScore, riskRange);
  const gradient = borderLineColor(risk.riskScore, riskRange);

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
  const mainRectWidth = isLowRisk ? width : totalWidth;

  const getGradientId = () => {
    if (isLowRisk) return "gradientLowRisk";
    if (isModerateRisk) return "gradientModerateRisk";
    return "";
  };

  const renderGradient = () => (
    <defs>
      <linearGradient
        id={getGradientId()}
        x1={isLowRisk ? "0%" : "100%"}
        y1="0%"
        x2={isLowRisk ? "100%" : "0%"}
        y2="0%"
      >
        <stop offset="80%" stopColor={color} />
        <stop offset={isLowRisk ? "100%" : "90%"} stopColor={gradient} />
      </linearGradient>
    </defs>
  );

  const renderMainRect = () => (
    <rect
      x={0}
      y={0}
      width={isPatientSpecific ? width : mainRectWidth}
      height={height}
      fill={
        isPatientSpecific
          ? color
          : isLowRisk || isModerateRisk
          ? `url(#${getGradientId()})`
          : color
      }
    />
  );

  const renderSmallBox = () => {
    if (isPatientSpecific || (!isLowRisk && !isModerateRisk)) return null;
    return (
      <rect
        x={isLowRisk ? width : 0}
        y={0}
        width={smallBoxWidth}
        height={height}
        fill={gradient}
      />
    );
  };

  const renderText = () => (
    <text
      x={
        isPatientSpecific
          ? "5%"
          : mainRectWidth / 2 + (isModerateRisk ? smallBoxWidth / 2 : 0)
      }
      y="50%"
      dominantBaseline="central"
      textAnchor={isPatientSpecific ? "start" : textAnchor}
      fontSize="16"
      fontFamily="sans-serif"
      fontWeight="800"
      fill={textColor}
    >
      {text}
    </text>
  );

  const renderSvgContent = () => (
    <>
      {!isPatientSpecific && renderGradient()}
      {renderMainRect()}
      {renderSmallBox()}
      {renderText()}
      {children}
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        mb: 1,
        borderRadius: "3px",
        overflow: "hidden",
        boxShadow: 1,
      }}
    >
      <svg
        width={isPatientSpecific ? width : totalWidth}
        height={height}
        viewBox={`0 0 ${isPatientSpecific ? width : totalWidth} ${height}`}
        style={{ display: "block" }}
      >
        {renderSvgContent()}
      </svg>
    </Box>
  );
};

export default SvgRectangle;
