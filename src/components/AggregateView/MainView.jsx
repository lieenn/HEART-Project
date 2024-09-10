import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Patient from "./Patient";
import ColorLegend from "../ColorLegend";
import { GetUniqueAdverseEvents } from "../Utils/FilterFunctions";
import { SortByGiven, SortByHighest } from "../Utils/SortFunctions";
import TableHeader from "./TableHeader";

/**
 * MainView component for displaying patient data.
 * @param {Object} props - Component props
 * @param {Array<number>} props.riskRange - Array of risk thresholds
 * @param {Array<Object>} props.patientData - Array of patient data objects
 * @returns {JSX.Element} The rendered MainView component
 */
export default function MainView({ riskRange, patientData }) {
  /**
   * @constant {Array<string>} selectedAdverseEvents - Selected adverse events state
   * @constant {function} setSelectedAdverseEvents - Function to update selectedAdverseEvents
   */
  const [selectedAdverseEvents, setSelectedAdverseEvents] = useState([]);

  /**
   * @constant {string} sortingOption - Current sorting option state
   * @constant {function} setSortingOption - Function to update sortingOption
   */
  const [sortingOption, setSortingOption] = useState("");

  /**
   * @constant {boolean} showFilteredOutcomes - State to control display of filtered outcomes
   * @constant {function} setShowFilteredOutcomes - Function to update showFilteredOutcomes
   */
  const [showFilteredOutcomes, setShowFilteredOutcomes] = useState(false);

  /**
   * @constant {Array<string>} favoritePatients - Array of favorite patient IDs
   * @constant {function} setFavoritePatients - Function to update favoritePatients
   */
  const [favoritePatients, setFavoritePatients] = useState([]);

  /**
   * @constant {Array<string>} adverseEventsList - List of unique adverse events
   */
  const adverseEventsList = GetUniqueAdverseEvents(patientData);

  /**
   * Toggle favorite status for a patient.
   * @param {string} patientId - ID of the patient to toggle favorite status
   */
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
            key={patient.patientId}
            patient={patient}
            riskRange={riskRange}
            selectedAdverseEvents={selectedAdverseEvents}
            showFilteredOutcomes={showFilteredOutcomes}
            isFavorite={favoritePatients.includes(patient.patientId)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </Box>
      <ColorLegend riskRange={riskRange} />
    </Box>
  );
}
