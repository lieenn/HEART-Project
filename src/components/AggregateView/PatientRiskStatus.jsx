import React from "react";
import { Box, Typography } from "@mui/material";
import calculateColor from "../Utils/colorScale";

export default function PatientRiskStatus({ risk }) {
  const [color, textColor] = calculateColor(risk.riskScore);
  // Calculate the width of the rectangle based on the title length
  const titleLength = risk.title.length;
  const rectWidth = Math.max(80, titleLength * 10);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        mb: 2,
        mr: 5,
      }}
    >
      <svg width={rectWidth} height="32">
        <rect
          width={rectWidth}
          height="32"
          fill={color}
          stroke="black"
          strokeWidth="4px"
        />
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="16"
          fontFamily="Roboto"
          fontWeight="500"
          fill={textColor}
        >
          {risk.title}
        </text>
      </svg>
      <Typography variant="body2" color="textSecondary">
        {risk.riskScore.toFixed(2)}
      </Typography>
    </Box>
  );
}
