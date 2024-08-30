import React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import PatientRisks from "./PatientRisks";
import { highestRiskColor } from "../Utils/Calculator";
import { filterRelevantAndOtherEvents } from "../Utils/FilterFunctions";

/**
 * A component that represents a single row in the patient grid.
 * Displays the patient's name, room number, and risk status.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.patient - The data of the patient to be displayed.
 * @param {Array<number>} props.riskRange - The dynamic range of risk scores.
 *
 * @returns {JSX.Element} The rendered patient component.
 */
export default function Patient({
  patient,
  riskRange,
  selectedAdverseEvents,
  showFilteredOutcomes,
}) {
  const [nameColor, infoColor] = highestRiskColor(patient, riskRange);
  const [relevant, others] = filterRelevantAndOtherEvents(
    selectedAdverseEvents,
    patient.adverseEvents,
    riskRange
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2} sx={{ borderRight: " 1.5px solid #000" }}>
        <Box sx={{ m: 2 }}>
          <Box sx={{ textAlign: "center", m: 2 }}>
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
            <Box
              sx={{
                bgcolor: infoColor,
                mt: 1,
                width: "70%",
                pr: 2,
                pl: 2,
                mx: "auto",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {patient.PID}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Room {patient.roomNumber}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      {showFilteredOutcomes && (
        <Grid item xs={12} md={4} sx={{ borderRight: " 1.5px dashed #000" }}>
          <Box sx={{ p: 2 }}>
            <PatientRisks adverseEvents={relevant} riskRange={riskRange} />
          </Box>
        </Grid>
      )}

      <Grid item xs={12} md={showFilteredOutcomes ? 6 : 10}>
        <Box sx={{ p: 2 }}>
          <PatientRisks adverseEvents={others} riskRange={riskRange} />
        </Box>
      </Grid>
    </Grid>
  );
}
