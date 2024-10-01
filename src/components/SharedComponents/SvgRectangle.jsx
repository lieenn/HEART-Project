import React from "react";
import { Box, Typography } from "@mui/material";
import {
  calculateColor,
  calculateRisk,
  color as colorPalette,
} from "../Utils/Calculator";

const SvgRectangle = ({
  risk,
  riskRange,
  width,
  height,
  text,
  textAlign,
  isPatientSpecific = false,
  children,
  view,
}) => {
  const isView1 = view === "view1";
  const isView3 = view === "view3";
  const [textColor, color] = calculateColor(risk.riskScore, riskRange);
  const gradient = colorPalette.moderate.main;

  const isLowRisk =
    risk.riskScore < riskRange[0] &&
    calculateRisk(risk.confidenceInterval.high, riskRange) !== "Minimal";

  const smallBoxWidth = isView3 ? 20 : 24;
  const gradientWidth = 12;

  const mainBoxStyle = {
    width: isPatientSpecific ? width : width - smallBoxWidth,
    height,
    backgroundColor: color,
    display: "flex",
    alignItems: "center",
    position: "relative",
    padding: "0 8px",
    justifyContent: textAlign === "center" ? "center" : "flex-start",
  };

  const textStyle = {
    flexGrow: 1,
    textAlign,
    paddingRight: children ? "30px" : "0",
    // fontSize: "1.05rem",
    // textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
  };

  const iconStyle = {
    position: "absolute",
    right: 8,
  };

  const smallBoxStyle = {
    width: smallBoxWidth,
    height,
    backgroundColor: gradient,
    flexShrink: 0,
  };

  const renderGradientBoxes = () => {
    if (isView1) {
      return (
        <>
          <Box
            sx={{
              width: `${gradientWidth}px`,
              background: gradient,
              borderLeft: "1.5px dashed",
            }}
          />
          <Box sx={smallBoxStyle} />
        </>
      );
    } else if (isView3) {
      return (
        <>
          <Box
            sx={{
              width: `${gradientWidth}px`,
              background: `linear-gradient(to right, ${color}, ${gradient})`,
            }}
          />
          <Box sx={smallBoxStyle} />
          <Box
            sx={{
              width: `${gradientWidth}px`,
              background: `linear-gradient(to right, ${gradient}, white)`,
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <Box
            sx={{
              width: `${gradientWidth}px`,
              background: `linear-gradient(to right, ${color}, ${gradient})`,
            }}
          />
          <Box sx={smallBoxStyle} />
        </>
      );
    }
  };

  return (
    <Box
      display="flex"
      mb={1}
      overflow="hidden"
      border="1.5px solid"
      borderRight={isView3 && isLowRisk ? "none" : "1.5px solid"}
      sx={{
        borderRadius: isView1
          ? "3px"
          : isView3 && isLowRisk
          ? "8px 0 0 8px"
          : "8px",
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
      {!isPatientSpecific && isLowRisk && renderGradientBoxes()}
    </Box>
  );
};

export default SvgRectangle;
