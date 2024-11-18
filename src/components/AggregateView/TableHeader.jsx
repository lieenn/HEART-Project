import React, { useState } from "react";
import { Typography, Box, useMediaQuery, useTheme, Paper } from "@mui/material";
import SortButton from "./Buttons/SortButton";
import FilterButton from "./Buttons/FilterButton";
import TableRow from "./TableRow";
import SelectedChips from "./Buttons/SelectedChips";

export default function TableHeader({
  setSortingOption,
  showFilteredOutcomes,
  adverseEventsList,
  selectedAdverseEvents,
  setSelectedAdverseEvents,
}) {
  const [activeButton, setActiveButton] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleToggle = (option) => {
    setActiveButton(activeButton === option ? null : option);
    setSortingOption(option);
  };

  const leftContent = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        mt: 0.5,
      }}
    >
      <SortButton
        value="Overall highest"
        onSort={handleToggle}
        isActive={activeButton === "Overall highest"}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          ml: 1,
          fontSize: isMobile ? "1.25rem" : "1.3rem",
        }}
      >
        Patient ID
      </Typography>
    </Box>
  );

  const rightContent = (
    <Box
      sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", mt: 0.5 }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          ml: showFilteredOutcomes ? 2 : 2,
          fontSize: isMobile ? "1rem" : "1.3rem",
        }}
      >
        Predicted Adverse Events
      </Typography>
      <Paper
        sx={{
          display: "flex",
          // alignItems: "center",
          ml: 2,
          borderRadius: 10,
        }}
        variant="outlined"
      >
        {showFilteredOutcomes && (
          <SortButton
            value="Filtered conditions"
            onSort={handleToggle}
            isActive={activeButton === "Filtered conditions"}
          />
        )}
        <FilterButton
          adverseEventsList={adverseEventsList}
          selectedAdverseEvents={selectedAdverseEvents}
          setSelectedAdverseEvents={setSelectedAdverseEvents}
        />

        <SelectedChips
          selectedAdverseEvents={selectedAdverseEvents}
          setSelectedAdverseEvents={setSelectedAdverseEvents}
        />
      </Paper>
    </Box>
  );

  return (
    <TableRow
      leftContent={leftContent}
      rightContent={rightContent}
      isHeader={true}
    />
  );
}
