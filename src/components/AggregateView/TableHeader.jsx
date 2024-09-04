import React, { useState } from "react";
import { Grid, Typography, Box, ToggleButton } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SortIcon from "@mui/icons-material/Sort";
import FilterButton from "./FilterButton";

export default function TableHeader({
  setSortingOption,
  showFilteredOutcomes,
  adverseEventsList,
  selectedAdverseEvents,
  setSelectedAdverseEvents,
}) {
  const [activeButton, setActiveButton] = useState(null);

  const handleToggle = (option) => {
    setActiveButton(activeButton === option ? null : option);
    setSortingOption(option);
  };

  const commonButtonStyles = {
    borderRadius: 0,
    padding: "4px 6px",
    m: 1,
    "&.Mui-selected": {
      backgroundColor: "primary.main",
      color: "primary.contrastText",
      "&:hover": {
        backgroundColor: "primary.dark",
      },
    },
    "&:not(.Mui-selected)": {
      border: "none",
      outline: "none",
    },
    "&:hover": {
      backgroundColor: "action.hover",
    },
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2}>
        <Box
          sx={{
            mt: 2,
            pt: 2,
            pl: 3,
            borderRight: "1.5px solid #000",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}
          >
            <ToggleButton
              value="Overall highest"
              selected={activeButton === "Overall highest"}
              onChange={() => handleToggle("Overall highest")}
              sx={commonButtonStyles}
            >
              <SwapVertIcon />
              <SortIcon />
            </ToggleButton>
            <Typography variant="h6" sx={{ mt: 0.5, m: 1 }}>
              Patient
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={showFilteredOutcomes ? 10 : 10}>
        <Box
          sx={{
            mt: 2,
            pt: 2,
            ml: 1,
            borderRight: "none",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ToggleButton
              value="Filtered conditions"
              selected={activeButton === "Filtered conditions"}
              onChange={() => handleToggle("Filtered conditions")}
              sx={commonButtonStyles}
            >
              <SwapVertIcon />
              <SortIcon />
            </ToggleButton>
            <FilterButton
              adverseEventsList={adverseEventsList}
              selectedAdverseEvents={selectedAdverseEvents}
              setSelectedAdverseEvents={setSelectedAdverseEvents}
            />
            <Typography variant="h6" sx={{ mt: 0.5, m: 1, mr: 2 }}>
              Predicted Adverse Events
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
