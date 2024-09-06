import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { colorScale } from "./Utils/Calculator";

export default function ColorLegend() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

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
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "flex-start" : "center",
        flexWrap: isMediumScreen ? "wrap" : "nowrap",
        gap: 2,
        mt: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Color Legend
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          flexWrap: isMediumScreen ? "wrap" : "nowrap",
          gap: 2,
        }}
      >
        {labels.map((label) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
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
              sx={{ fontSize: { xs: "14px", sm: "16px" }, fontWeight: "500" }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
