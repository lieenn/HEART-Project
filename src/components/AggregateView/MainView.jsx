import React from "react";
import { TableContainer, Table, Box, TableBody } from "@mui/material";
import Patient from "./Patient";
import ColorLegend from "./ColorLegend";

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
  return (
    <Box>
      {/* Renders the color legend component */}
      <ColorLegend riskRange={riskRange} />
      <TableContainer sx={{ border: "1.5px solid #000", mt: 4 }}>
        <Table aria-label="simple table" stickyHeader>
          {/* Display a list of patients */}
          <TableBody>
            {patientData.map((patient) => (
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
