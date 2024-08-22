import React from "react";
import { TableContainer, Table, Box, TableBody } from "@mui/material";
import Patient from "./Patient";
import ColorLegend from "./ColorLegend";
import FilterSortFunctions from "./FilterSortFunctions";
import { GetUniqueAdverseEvents } from "../Utils/FilterFunctions";
import {
  SortByGiven,
  SortAndFilter,
  SortByHighest,
} from "../Utils/SortFunctions";

/**
 * Renders the main view of the application.
 * Includes a color legend and a table that lists all patients.
 * Passes the dynamic risk range to child components.
 *
 * @param {Object} props - Component props
 * @param {Array<number>} props.riskRange - The dynamic range of risk scores.
 * @returns {JSX.Element} The rendered main view component.
 */
export default function MainView({ riskRange, patientData }) {
  const [selectedAdverseEvents, setSelectedAdverseEvents] = React.useState([]);
  const [sortingOption, setSortingOption] = React.useState("Sort");

  const adverseEventsList = GetUniqueAdverseEvents(patientData);

  // Determine the sorted data based on the selected sorting option
  let sortedData = [];
  if (sortingOption === "Sort") {
    sortedData = SortByGiven(selectedAdverseEvents, patientData, riskRange);
  } else if (sortingOption === "Sort + Filter") {
    sortedData = SortAndFilter(selectedAdverseEvents, patientData, riskRange);
  } else if (sortingOption === "Sort by highest") {
    sortedData = SortByHighest(selectedAdverseEvents, patientData, riskRange);
  } else {
    sortedData = patientData;
  }
  if (selectedAdverseEvents.length === 0) {
    sortedData = patientData;
  }

  console.log(sortedData);

  return (
    <Box>
      {/* Renders the filter and sort options */}
      <FilterSortFunctions
        adverseEventsList={adverseEventsList}
        selectedAdverseEvents={selectedAdverseEvents}
        setSelectedAdverseEvents={setSelectedAdverseEvents}
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
      />
      <ColorLegend riskRange={riskRange} />
      <TableContainer sx={{ border: "1.5px solid #000", mt: 4 }}>
        <Table aria-label="simple table" stickyHeader>
          <TableBody>
            {/* Display a list of patients */}
            {sortedData.map((patient) => (
              <Patient
                key={patient.roomNumber}
                patient={patient}
                riskRange={riskRange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
