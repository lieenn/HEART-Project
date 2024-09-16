import React, { useState } from "react";
import { Typography, Box, useMediaQuery, useTheme, Paper } from "@mui/material";
import SortButton from "./Buttons/SortButton";
import FilterButton from "./Buttons/FilterButton";
import TableRow from "./TableRow";
import SelectedChips from "./SelectedChips";

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
    <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
      <SortButton
        value="Overall highest"
        onSort={handleToggle}
        isActive={activeButton === "Overall highest"}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          ml: 1,
          fontSize: isMobile ? "1.25rem" : "1.5rem",
        }}
      >
        Patient
      </Typography>
    </Box>
  );

  const rightContent = (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      {showFilteredOutcomes && (
        <SortButton
          value="Filtered conditions"
          onSort={handleToggle}
          isActive={activeButton === "Filtered conditions"}
        />
      )}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          ml: showFilteredOutcomes ? 1 : 2,
          fontSize: isMobile ? "1.25rem" : "1.5rem",
        }}
      >
        Predicted Adverse Events
      </Typography>
      {/* <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          ml: 2,
          borderRadius: 10,
        }}
      > */}
      <FilterButton
        adverseEventsList={adverseEventsList}
        selectedAdverseEvents={selectedAdverseEvents}
        setSelectedAdverseEvents={setSelectedAdverseEvents}
      />
      {/* </Paper> */}
      <SelectedChips
        selectedAdverseEvents={selectedAdverseEvents}
        setSelectedAdverseEvents={setSelectedAdverseEvents}
      />
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
