import React from "react";
import { TableContainer, Table, Box, TableBody } from "@mui/material";
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
      <TableContainer sx={{ border: "3px solid #000", mt: 4 }}>
        <Table aria-label="simple table" stickyHeader>
          {/* Wrap Patient components in a TableBody */}
          <TableBody>
            {aggregate.map((patient) => (
              <Patient key={patient.roomNumber} patient={patient} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
