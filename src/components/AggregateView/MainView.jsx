import React from "react";
import { TableContainer, Table, Paper, Box } from "@mui/material";
import aggregate from "../../Json files 2 patients/aggregate.json";
import Patient from "./Patient";
import ColorLegend from "./ColorLegend";

/**
 * Renders an overall aggregate view of all patients.
 * Includes a color legend for risk status.
 * and a table of all patients.
 * @returns {JSX.Element} The rendered table component.
 */
export default function MainView() {
  return (
    <Box>
      <ColorLegend />
      <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          {aggregate.map((patient) => (
            <Patient key={patient.roomNumber} patient={patient} />
          ))}
        </Table>
      </TableContainer>
    </Box>
  );
}
