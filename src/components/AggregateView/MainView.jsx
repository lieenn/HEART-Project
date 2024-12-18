import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Patient from "./Patient";
import Legend from "../SharedComponents/Legend";
import { GetUniqueAdverseEvents } from "../Utils/FilterFunctions";
import { SortByGiven, SortByHighest } from "../Utils/SortFunctions";
import TableHeader from "./TableHeader";

export default function MainView({
  riskRange,
  patientData,
  view,
  direction,
  borderline,
  selectedAdverseEvents,
  setSelectedAdverseEvents,
  sortingOption,
  setSortingOption,
  favoritePatients,
  handleToggleFavorite,
  showOnlyPinned,
  handleToggleShowPinned,
  children,
}) {
  const [showFilteredOutcomes, setShowFilteredOutcomes] = useState(false);
  const hasPinnedPatients = favoritePatients.length > 0;
  const adverseEventsList = GetUniqueAdverseEvents(patientData);

  let sortedData = [];
  if (sortingOption === "Overall highest") {
    sortedData = SortByHighest(selectedAdverseEvents, patientData, riskRange);
  } else if (sortingOption === "Filtered conditions") {
    sortedData = SortByGiven(selectedAdverseEvents, patientData, riskRange);
  } else {
    sortedData = patientData;
  }

  if (selectedAdverseEvents.length === 0) {
    sortedData = patientData;
  }

  const finalSortedData = showOnlyPinned
    ? sortedData.filter((patient) =>
        favoritePatients.includes(patient.patientId)
      )
    : [
        ...sortedData.filter((patient) =>
          favoritePatients.includes(patient.patientId)
        ),
        ...sortedData.filter(
          (patient) => !favoritePatients.includes(patient.patientId)
        ),
      ];

  useEffect(() => {
    const hasRelevantOutcomes = selectedAdverseEvents.length > 0;
    setShowFilteredOutcomes(hasRelevantOutcomes);
  }, [selectedAdverseEvents]);

  // Calculate number of columns based on data length
  const getGridColumns = (dataLength) => {
    if (dataLength <= 3) return { xs: 12, sm: 6, md: 4 };
    if (dataLength <= 6) return { xs: 12, sm: 6, md: 4 };
    if (dataLength <= 9) return { xs: 12, sm: 6, md: 4 };
    return { xs: 12, sm: 6, md: 1.5 }; // 4 columns for 10+ items
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Legend riskRange={riskRange} />
        <Box>{children}</Box>
      </Box>
      {direction === "horizontal" ? (
        // Horizontal Layout
        <Box sx={{ border: "1.5px solid #000", m: 0 }}>
          <TableHeader
            setSortingOption={setSortingOption}
            showFilteredOutcomes={showFilteredOutcomes}
            adverseEventsList={adverseEventsList}
            selectedAdverseEvents={selectedAdverseEvents}
            setSelectedAdverseEvents={setSelectedAdverseEvents}
            showOnlyPinned={showOnlyPinned}
            onToggleShowPinned={handleToggleShowPinned}
            hasPinnedPatients={hasPinnedPatients}
          />
          {finalSortedData.map((patient) => (
            <Patient
              key={patient.patientId}
              patient={patient}
              riskRange={riskRange}
              selectedAdverseEvents={selectedAdverseEvents}
              showFilteredOutcomes={showFilteredOutcomes}
              isFavorite={favoritePatients.includes(patient.patientId)}
              onToggleFavorite={handleToggleFavorite}
              view={view}
              direction={direction}
              borderline={borderline}
            />
          ))}
        </Box>
      ) : (
        // Vertical Grid Layout
        <Box sx={{ flexGrow: 0, mt: 2 }}>
          <TableHeader
            setSortingOption={setSortingOption}
            showFilteredOutcomes={showFilteredOutcomes}
            adverseEventsList={adverseEventsList}
            selectedAdverseEvents={selectedAdverseEvents}
            setSelectedAdverseEvents={setSelectedAdverseEvents}
            showOnlyPinned={showOnlyPinned}
            onToggleShowPinned={handleToggleShowPinned}
          />
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            {finalSortedData.map((patient) => (
              <Grid
                item
                key={patient.patientId}
                {...getGridColumns(finalSortedData.length)}
              >
                <Box sx={{ border: "1px solid #000", p: 2, height: "100%" }}>
                  <Patient
                    patient={patient}
                    riskRange={riskRange}
                    selectedAdverseEvents={selectedAdverseEvents}
                    showFilteredOutcomes={showFilteredOutcomes}
                    isFavorite={favoritePatients.includes(patient.patientId)}
                    onToggleFavorite={handleToggleFavorite}
                    view={view}
                    direction={direction}
                    hasPinnedPatients={hasPinnedPatients}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
