import React, { useState } from "react";
import {
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import FilterButton from "./FilterButton";
import TableRow from "./TableRow";

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

  const commonButtonStyles = {
    borderRadius: "50%",
    padding: "6px",
    minWidth: "auto",
    width: "24px",
    height: "24px",
    border: "none",
    outline: "none",
    color: "action.active",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:focus": {
      outline: "none",
    },
  };

  const SortButton = ({ value }) => (
    <IconButton
      onClick={() => handleToggle(value)}
      sx={{
        ...commonButtonStyles,
        ...(activeButton === value && {
          color: "primary.main",
        }),
      }}
    >
      <SwapVertIcon />
    </IconButton>
  );

  const leftContent = (
    <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
      <SortButton value="Overall highest" />
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
      {showFilteredOutcomes && <SortButton value="Filtered conditions" />}
      <Box sx={{ ml: showFilteredOutcomes ? 0 : 1 }}>
        <FilterButton
          adverseEventsList={adverseEventsList}
          selectedAdverseEvents={selectedAdverseEvents}
          setSelectedAdverseEvents={setSelectedAdverseEvents}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          ml: 1,
          fontSize: isMobile ? "1.25rem" : "1.5rem",
        }}
      >
        Predicted Adverse Events
      </Typography>
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
