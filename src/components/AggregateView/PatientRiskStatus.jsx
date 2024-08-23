import React from "react";
import { Box } from "@mui/material";
import { calculateColor } from "../Utils/Calculator";

/**
 * PatientRiskStatus Component
 *
 * This component renders a single risk status for a patient as a colored rectangle,
 * with the color and text color dynamically calculated based on the risk score and range.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.risk - The data representing the risk event.
 * @param {Array<number>} props.riskRange - The dynamic range of risk scores.
 * @returns {JSX.Element} - The rendered risk status component.
 */
export default function PatientRiskStatus({ risk, riskRange }) {
  // Calculate the text and background colors based on the risk score and range
  const [textColor, color] = calculateColor(risk.riskScore, riskRange);

  // Calculate the width of the rectangle based on the title length, ensuring a minimum width
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
