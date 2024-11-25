import React from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { colorScale } from "../Utils/Calculator";

const ColorLegend = ({ riskRange = [0.4, 0.6, 0.8, 1] }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const labels = [
    "Minimal Risk",
    "Moderate Risk",
    "Moderate High Risk",
    "High Risk",
  ];

  // Calculate range descriptions
  const getRangeDescription = (index) => {
    if (index === 0) return `0 - ${(riskRange[0] * 100).toFixed(0)}%`;
    if (index === labels.length - 1)
      return `>${(riskRange[index - 1] * 100).toFixed(0)}%`;
    return `${(riskRange[index - 1] * 100).toFixed(0)}% - ${(
      riskRange[index] * 100
    ).toFixed(0)}%`;
  };

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
        {labels.map((label, index) => (
          <Tooltip
            key={label}
            title={`Risk Range: ${getRangeDescription(index)}`}
            arrow
            placement="top"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                cursor: "help",
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
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default ColorLegend;
