import React from "react";
import { Box, Popover, Typography } from "@mui/material";
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

  // Popover state management
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        mb: 2,
        mr: 2,
        position: "relative",
      }}
    >
      <svg
        width={rectWidth}
        height="32"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <rect
          width={rectWidth}
          height="32"
          fill={color}
          stroke="black"
          strokeWidth="3px"
        />
        <text
          x="50%"
          y="50%"
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

      {/* Popover */}
      <Popover
        id="risk-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
      >
        <Typography sx={{ p: 2 }}>Risk: {risk.riskScore * 100}%</Typography>
      </Popover>
    </Box>
  );
}
