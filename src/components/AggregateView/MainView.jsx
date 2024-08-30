import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Patient from "./Patient";
import ColorLegend from "./ColorLegend";
import MultiSelect from "./MultiSelect";
import { GetUniqueAdverseEvents } from "../Utils/FilterFunctions";
import {
  SortByGiven,
  SortAndFilter,
  SortByHighest,
} from "../Utils/SortFunctions";
import SortButtons from "./SortButtons";
import { filterRelevantAndOtherEvents } from "../Utils/FilterFunctions";

export default function MainView({ riskRange, patientData }) {
  const [selectedAdverseEvents, setSelectedAdverseEvents] = useState([]);
  const [sortingOption, setSortingOption] = useState("");
  const [showFilteredOutcomes, setShowFilteredOutcomes] = useState(false);

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

  // Recalculate showFilteredOutcomes when selectedAdverseEvents or patientData changes
  useEffect(() => {
    const hasRelevantOutcomes = selectedAdverseEvents.length > 0;
    setShowFilteredOutcomes(hasRelevantOutcomes);
  }, [selectedAdverseEvents, sortedData, riskRange, patientData]);

  return (
    <Box>
      <MultiSelect
        adverseEventsList={adverseEventsList}
        selectedAdverseEvents={selectedAdverseEvents}
        setSelectedAdverseEvents={setSelectedAdverseEvents}
      />
      <ColorLegend riskRange={riskRange} />

      <Box sx={{ border: "1.5px solid #000", mt: 0 }}>
        <Grid container spacing={2}>
          <SortButtons
            setSortingOption={setSortingOption}
            showFilteredOutcomes={showFilteredOutcomes}
          />
          {sortedData.map((patient) => (
            <Patient
              key={patient.roomNumber}
              patient={patient}
              riskRange={riskRange}
              selectedAdverseEvents={selectedAdverseEvents}
              showFilteredOutcomes={showFilteredOutcomes}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
