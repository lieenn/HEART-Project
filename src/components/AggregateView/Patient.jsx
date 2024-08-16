import React from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell, Box, Typography, Container } from "@mui/material";
import PatientRisks from "./PatientRisks";
import { highestRiskColor } from "../Utils/Calculator";

/**
 * Represents each row of the table.
 * Shows the patient's name room number.
 * and a component for the patient's risk status.
 * @param {Object} patient - Current patient's data
 * @returns {JSX.Element} - The rendered table row
 */
export default function Patient({ patient }) {
  const [nameColor, infoColor] = highestRiskColor(patient);

  return (
    <TableRow>
      <TableCell
        sx={{
          width: "12%",
          textAlign: "center",
          alignItems: "center",
          border: "none",
        }}
      >
        {/* Link to the patient's detail page */}
        <Link
          to={`/${patient.PatientName}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="h5"
            sx={{ bgcolor: nameColor, fontWeight: "bold" }}
          >
            {patient.PatientName}
          </Typography>
        </Link>
        {/* Patient's id and room number */}
        <Container sx={{ bgcolor: infoColor, width: "80%", mt: "5px" }}>
          <Box sx={{ fontWeight: "bold" }}>{patient.PID}</Box>
          <Box sx={{ fontWeight: "bold" }}>Room {patient.roomNumber}</Box>
        </Container>
      </TableCell>
      {/* Adverse Risk Statuses */}
      <TableCell
        sx={{
          width: "100%",
          borderLeft: "3px solid #000",
          borderBottom: "none",
        }}
      >
        <PatientRisks adverseEvents={patient.adverseEvents} />
      </TableCell>
    </TableRow>
  );
}
