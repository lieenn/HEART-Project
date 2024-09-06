import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Patient from "./Patient";
import ColorLegend from "../ColorLegend";
import { GetUniqueAdverseEvents } from "../Utils/FilterFunctions";
import { SortByGiven, SortByHighest } from "../Utils/SortFunctions";
import TableHeader from "./TableHeader";

export default function MainView({ riskRange, patientData }) {
  const [selectedAdverseEvents, setSelectedAdverseEvents] = useState([]);
  const [sortingOption, setSortingOption] = useState("");
  const [showFilteredOutcomes, setShowFilteredOutcomes] = useState(false);
  const [favoritePatients, setFavoritePatients] = useState([]);

  const adverseEventsList = GetUniqueAdverseEvents(patientData);

  const handleToggleFavorite = (patientId) => {
    setFavoritePatients((prev) => {
      if (prev.includes(patientId)) {
        return prev.filter((id) => id !== patientId);
      } else {
        return [...prev, patientId];
      }
    });
  };

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

  // Sort patients, putting favorited patients at the top
  const finalSortedData = [
    ...sortedData.filter((patient) => favoritePatients.includes(patient.PID)),
    ...sortedData.filter((patient) => !favoritePatients.includes(patient.PID)),
  ];

  useEffect(() => {
    const hasRelevantOutcomes = selectedAdverseEvents.length > 0;
    setShowFilteredOutcomes(hasRelevantOutcomes);
  }, [selectedAdverseEvents]);

  return (
    <Box>
      <Box sx={{ border: "1.5px solid #000", mt: 0 }}>
        <TableHeader
          setSortingOption={setSortingOption}
          showFilteredOutcomes={showFilteredOutcomes}
          adverseEventsList={adverseEventsList}
          selectedAdverseEvents={selectedAdverseEvents}
          setSelectedAdverseEvents={setSelectedAdverseEvents}
        />
        {finalSortedData.map((patient) => (
          <Patient
            key={patient.PID}
            patient={patient}
            riskRange={riskRange}
            selectedAdverseEvents={selectedAdverseEvents}
            showFilteredOutcomes={showFilteredOutcomes}
            isFavorite={favoritePatients.includes(patient.PID)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </Box>
      <ColorLegend riskRange={riskRange} />
    </Box>
  );
}
