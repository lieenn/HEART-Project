import React from "react";
import { Box } from "@mui/material";
import { calculateColor } from "../Utils/Calculator";

/**
 * Renders a risk status for a patient as a colored rectangle.
 *
 * @param {Object} props - Component props
 * @param {Object} props.risk - The risk data of the patient.
 * @param {Array<number>} props.riskRange - The dynamic range of risk scores.
 * @returns {JSX.Element} The rendered risk status component.
 */
export default function PatientRiskStatus({ risk, riskRange }) {
  // Calculate the color based on the risk score and range
  const [textColor, color] = calculateColor(risk.riskScore, riskRange);

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
