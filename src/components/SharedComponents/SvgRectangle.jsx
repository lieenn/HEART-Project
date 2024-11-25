import React from "react";
import { Box, Typography } from "@mui/material";
import {
  calculateColor,
  calculateRisk,
  calculateBorderline,
} from "../Utils/Calculator";

const SvgRectangle = ({
  risk,
  riskRange,
  direction,
  view,
  borderline,
  width,
  maxWidth = direction === "vertical" ? "120px" : "100%",
  height: minHeight,
  text,
  textAlign,
  isPatientSpecific = false,
  children,
}) => {
  const isView1 = view === "view1";
  const isView3 = view === "view3";
  const isView4 = view === "view4";
  const [textColor, color] = calculateColor(risk.riskScore, riskRange);
  const borderlineColors = calculateBorderline(
    risk.confidenceInterval.high,
    riskRange
  );
  const gradient =
    borderline === "borderline2"
      ? borderlineColors[borderlineColors.length - 1]
      : borderlineColors[0];

  const isLowRisk =
    risk.riskScore < riskRange[0] &&
    calculateRisk(risk.confidenceInterval.high, riskRange) !== "Minimal";

  const smallBoxWidth = isView3 ? 20 : 24;
  const gradientWidth = 12;

  // Calculate uncertainty range as a percentage for gradient distribution
  const uncertaintyRange =
    risk.confidenceInterval.high - risk.confidenceInterval.low;
  const totalRange = riskRange[riskRange.length - 1] - riskRange[0];
  const uncertaintyPercentage = Math.min(
    (uncertaintyRange / totalRange) * 100,
    100
  );

  const mainBoxStyle = {
    width: isPatientSpecific ? width : `calc(${width}px - ${smallBoxWidth}px)`,
    maxWidth: maxWidth,
    minHeight,
    background:
      isView4 && isLowRisk
        ? `linear-gradient(to right, ${color} ${
            100 - uncertaintyPercentage
          }%, ${gradient})`
        : color,
    display: "flex",
    alignItems: "center",
    position: "relative",
    padding: "6px",
    justifyContent: textAlign === "center" ? "center" : "flex-start",
    border: isView1 && isLowRisk ? "1.5px solid" : "none",
    borderRadius: "3px 0 0 3px",
  };

  const textStyle = {
    flexGrow: 1,
    textAlign,
    paddingRight: children ? "30px" : "0",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    whiteSpace: "normal",
  };

  const iconStyle = {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
  };

  const smallBoxes = borderlineColors.map((borderColor, index) => (
    <Box
      key={index}
      sx={{
        width: `${smallBoxWidth / borderlineColors.length}px`,
        minHeight,
        backgroundColor: borderColor,
        borderLeft: index > 0 ? "1px solid rgba(0,0,0,0.1)" : "none",
      }}
    />
  ));

  const smallBoxStyle = () => {
    if (borderline === "borderline3") {
      return (
        <Box
          sx={{
            display: "flex",
            width: smallBoxWidth,
            minHeight,
            border: isView1 ? "2px dashed" : "none",
            borderLeft: "none",
            borderRadius: "0 3px 3px 0",
          }}
        >
          {smallBoxes}
        </Box>
      );
    }
    return (
      <Box
        sx={{
          width: isView1 ? smallBoxWidth + gradientWidth : smallBoxWidth,
          minHeight,
          backgroundColor: gradient,
          ...(isView1 && {
            border: "2px dashed",
            borderLeft: "none",
            borderRadius: "0 3px 3px 0",
          }),
        }}
      />
    );
  };

  const renderGradientBoxes = () => {
    if (isView1) {
      return smallBoxStyle();
    } else if (isView3) {
      return (
        <>
          <Box
            sx={{
              width: `${gradientWidth}px`,
              minHeight,
              background: `linear-gradient(to right, ${color}, ${gradient})`,
            }}
          />
          {smallBoxStyle()}
          <Box
            sx={{
              width: `${gradientWidth}px`,
              minHeight,
              background: `linear-gradient(to right, ${gradient}, white)`,
            }}
          />
        </>
      );
    } else if (!isView4) {
      return (
        <>
          <Box
            sx={{
              width: `${gradientWidth}px`,
              minHeight,
              background: `linear-gradient(to right, ${color}, ${gradient})`,
              flexShrink: 0,
              margin: 0,
              padding: 0,
            }}
          />
          {smallBoxStyle()}
        </>
      );
    }
    return null;
  };

  return (
    <Box
      display="flex"
      mb={1}
      border={isView1 && isLowRisk ? "none" : "1.5px solid"}
      borderRight={(isView3 || isView1) && isLowRisk ? "none" : "1.5px solid"}
      sx={{
        borderRadius: isView3 && isLowRisk ? "3px 0 0 3px" : "3px",
        maxWidth: maxWidth,
        alignItems: "stretch",
      }}
    >
      <Box sx={mainBoxStyle}>
        <Typography
          variant="body1"
          fontWeight="bold"
          color={textColor}
          sx={textStyle}
        >
          {text}
        </Typography>
        {children && <Box sx={iconStyle}>{children}</Box>}
      </Box>
      {!isPatientSpecific && isLowRisk && !isView4 && renderGradientBoxes()}
    </Box>
  );
};

export default SvgRectangle;
