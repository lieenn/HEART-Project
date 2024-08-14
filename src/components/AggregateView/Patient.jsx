import React from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell, Box } from "@mui/material";
import PatientRisks from "./PatientRisks";

/**
 * Represents each row of the table.
 * Shows the patient's name room number.
 * and a component for the patient's risk status.
 * @param {Object} patient - Current patient's data
 * @returns Current patient's risk status
 */
export default function Patient({ patient }) {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell
        sx={{
          width: "15%",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Link
          to={`/${patient.PatientName}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {patient.PatientName}
        </Link>
        <Box>Room {patient.roomNumber}</Box>
      </TableCell>
      <TableCell sx={{ width: "100%" }}>
        <PatientRisks adverseEvents={patient.adverseEvents} />
      </TableCell>
    </TableRow>
  );
}
