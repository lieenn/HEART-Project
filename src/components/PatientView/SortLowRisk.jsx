import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography, Box } from "@mui/material";

export default function ColorToggleButton({ sort, setSort }) {
  const handleChange = (event, newSort) => {
    setSort(newSort);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Typography sx={{ mr: 2 }}>Sort by:</Typography>
      <ToggleButtonGroup
        color="primary"
        value={sort}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        size="small"
        sx={{
          "& .MuiToggleButton-root": {
            padding: "4px 10px",
            textTransform: "none",
            height: "32px",
          },
        }}
      >
        <ToggleButton value="risk">Risk Score</ToggleButton>
        <ToggleButton value="range">Uncertainty Range</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
