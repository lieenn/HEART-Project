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
      sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
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
            height: "32px", // Explicitly set height
          },
        }}
      >
        <ToggleButton value="risk">Risk</ToggleButton>
        <ToggleButton value="range">Range</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
