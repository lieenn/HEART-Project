import React from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell, Box, Typography, Container } from "@mui/material";
import PatientRisks from "./PatientRisks";
import { highestRiskColor } from "../Utils/Calculator";
import { filterRelevantAndOtherEvents } from "../Utils/FilterFunctions";

/**
 * A component that represents a single row in the patient table.
 * Displays the patient's name, room number, and risk status.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.patient - The data of the patient to be displayed.
 * @param {Array<number>} props.riskRange - The dynamic range of risk scores.
 *
 * @returns {JSX.Element} The rendered patient component.
 */
export default function Patient({ patient, riskRange, selectedAdverseEvents }) {
  // Get colors based on the patient's highest risk score
  const [nameColor, infoColor] = highestRiskColor(patient, riskRange);
  const [relevant, others] = filterRelevantAndOtherEvents(
    selectedAdverseEvents,
    patient.adverseEvents,
    riskRange
  );

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
        {/* Patient's ID and room number */}
        <Container sx={{ bgcolor: infoColor, width: "80%", mt: "5px" }}>
          <Box sx={{ fontWeight: "bold" }}>{patient.PID}</Box>
          <Box sx={{ fontWeight: "bold" }}>Room {patient.roomNumber}</Box>
        </Container>
      </TableCell>
      {/* Renders the patient's adverse risk statuses */}
      <TableCell
        sx={{
          width: "100%",
          borderLeft: "1.5px solid #000",
          borderBottom: "none",
        }}
      >
        <Box
          sx={{
            display: "flex", // Flexbox only applied to this Box, not the TableCell
            flexDirection: "row",
          }}
        >
          <PatientRisks adverseEvents={relevant} riskRange={riskRange} />
          <PatientRisks adverseEvents={others} riskRange={riskRange} />
        </Box>
      </TableCell>
    </TableRow>
  );
}
