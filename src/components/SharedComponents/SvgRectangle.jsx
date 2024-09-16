import React from "react";
import { Box, Typography } from "@mui/material";
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
  isPatientSpecific = false,
  children,
  textAlign,
}) => {
  const [textColor, color] = calculateColor(risk.riskScore, riskRange);
  const gradient = borderLineColor(risk.riskScore, riskRange);

  const isLowRisk =
    risk.riskScore < riskRange[0] &&
    calculateRisk(risk.confidenceInterval.high, riskRange) !== "Minimal";

  const smallBoxWidth = 12;
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
    paddingRight: children ? "30px" : "0", // Add padding if there's an icon
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

  return (
    <Box
      display="flex"
      mb={1}
      borderRadius="8px"
      overflow="hidden"
      border="1.5px solid"
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
      {!isPatientSpecific && isLowRisk && (
        <>
          <Box
            sx={{
              width: `${gradientWidth}px`,
              background: `linear-gradient(to right, ${color}, ${gradient})`,
            }}
          />
          <Box sx={smallBoxStyle} />
        </>
      )}
    </Box>
  );
};

export default SvgRectangle;
