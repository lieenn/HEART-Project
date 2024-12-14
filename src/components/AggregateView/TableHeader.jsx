import React, { useState } from "react";
import { Typography, Box, useMediaQuery, useTheme, Paper } from "@mui/material";
import SortButton from "./Buttons/SortButton";
import FilterButton from "./Buttons/FilterButton";
import TableRow from "./TableRow";
import SelectedChips from "./Buttons/SelectedChips";
import HideUnpinButton from "./Buttons/HideUnpinButton";

export default function TableHeader({
  setSortingOption,
  showFilteredOutcomes,
  adverseEventsList,
  selectedAdverseEvents,
  setSelectedAdverseEvents,
  showOnlyPinned,
  onToggleShowPinned,
  hasPinnedPatients,
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
          fontSize: isMobile ? "1rem" : "1.25rem",
        }}
      >
        Patient ID
      </Typography>
      {hasPinnedPatients && (
        <HideUnpinButton
          showOnlyPinned={showOnlyPinned}
          onToggleShowPinned={onToggleShowPinned}
        />
      )}
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
          fontSize: isMobile ? "1rem" : "1.25rem",
        }}
      >
        Predicted Adverse Events
      </Typography>
      <Paper
        sx={{
          display: "flex",
          // alignItems: "center",
          ml: 2,
          mt: 0.5,
          mb: 1,
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
