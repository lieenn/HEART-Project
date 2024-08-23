import React from "react";
import { TableContainer, Table, Box, TableBody } from "@mui/material";
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

/**
 * The main view of the application that includes a color legend and a table listing all patients.
 * The view allows filtering and sorting of patient data based on selected options.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array<number>} props.riskRange - The dynamic range of risk scores.
 * @param {Array<Object>} props.patientData - The patient data to display.
 *
 * @returns {JSX.Element} The rendered main view component.
 */
export default function MainView({ riskRange, patientData }) {
  const [selectedAdverseEvents, setSelectedAdverseEvents] = React.useState([]);
  const [sortingOption, setSortingOption] = React.useState("");

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

  return (
    <Box>
      <MultiSelect
        adverseEventsList={adverseEventsList}
        selectedAdverseEvents={selectedAdverseEvents}
        setSelectedAdverseEvents={setSelectedAdverseEvents}
      />
      <ColorLegend riskRange={riskRange} />
      <SortButtons setSortingOption={setSortingOption} />
      <TableContainer sx={{ border: "1.5px solid #000", mt: 0 }}>
        <Table aria-label="simple table" stickyHeader>
          <TableBody>
            {sortedData.map((patient) => (
              <Patient
                key={patient.roomNumber}
                patient={patient}
                riskRange={riskRange}
                selectedAdverseEvents={selectedAdverseEvents}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
