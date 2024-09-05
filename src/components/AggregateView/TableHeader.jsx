import React, { useState } from "react";
import { Grid, Typography, Box, ToggleButton } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
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
    borderRadius: "50%",
    m: 1,
    padding: "6px",
    minWidth: "auto",
    width: "32px",
    height: "32px",
    border: "none",
    outline: "none",
    "&.Mui-selected": {
      backgroundColor: "primary.main",
      color: "primary.contrastText",
      "&:hover": {
        backgroundColor: "primary.dark",
      },
    },
    "&:hover": {
      backgroundColor: "action.hover",
    },
    "&:focus": {
      outline: "none",
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
            </ToggleButton>
            <Typography variant="h5" sx={{ mt: 0.5, m: 1, fontWeight: 600 }}>
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
            </ToggleButton>
            <FilterButton
              adverseEventsList={adverseEventsList}
              selectedAdverseEvents={selectedAdverseEvents}
              setSelectedAdverseEvents={setSelectedAdverseEvents}
            />
            <Typography
              variant="h5"
              sx={{ mt: 0.5, m: 1, mr: 2, fontWeight: 600 }}
            >
              Predicted Adverse Events
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
