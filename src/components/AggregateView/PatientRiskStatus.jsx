import React from "react";
import { Box, Typography } from "@mui/material";
import { calculateColor } from "../Utils/Calculator";

/**
 * Renders a risk status for a patient.
 * @param {Object} param0 - The risk of the given patient
 * @returns {JSX.Element} - The rendered risk status
 */
export default function PatientRiskStatus({ risk }) {
  const [textColor, color] = calculateColor(risk.riskScore);
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
        mr: 2,
      }}
    >
      <svg width={rectWidth} height="32">
        <rect
          width={rectWidth}
          height="32"
          fill={color}
          stroke="black"
          strokeWidth="3px"
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
    </Box>
  );
}
