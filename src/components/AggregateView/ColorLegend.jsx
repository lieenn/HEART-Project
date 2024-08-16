import React from "react";
import { Box, Typography } from "@mui/material";
import { colorScale } from "../Utils/Calculator";

/**
 * Color legend for the risk status of patients.
 * @returns {JSX.Element} - Color legend
 */
export default function ColorLegend() {
  const labels = [
    "Minimal Risk",
    "Moderate Risk",
    "Moderate High Risk",
    "High Risk",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Color Legend
      </Typography>
      {labels.map((label) => (
        // Display the color and label
        <Box
          key={label}
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 0.5,
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              backgroundColor: colorScale(label)[0],
              border: "1.5px solid black",
            }}
          />
          <Typography
            variant="body2"
            sx={{ fontSize: "16px", fontWeight: "500" }}
          >
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
